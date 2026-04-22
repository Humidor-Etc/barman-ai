import { useState, useCallback } from 'react'

const FAVS_KEY = 'barman_ai_favs'
const API_KEY = 'METS_TA_CLE_ICI'
const API_URL = 'https://api.anthropic.com/v1/messages'

const API_HEADERS = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
  'anthropic-version': '2023-06-01',
  'anthropic-dangerous-direct-browser-access': 'true',
}

function loadFavs() {
  try { return JSON.parse(localStorage.getItem(FAVS_KEY) || '[]') } catch { return [] }
}
function saveFavs(favs) {
  try { localStorage.setItem(FAVS_KEY, JSON.stringify(favs)) } catch {}
}

const resizeImage = (file) => new Promise(resolve => {
  const reader = new FileReader()
  reader.onload = e => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const MAX = 1024
      let w = img.width, h = img.height
      if (w > h && w > MAX) { h = h * MAX / w; w = MAX }
      else if (h > MAX) { w = w * MAX / h; h = MAX }
      canvas.width = w; canvas.height = h
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      const compressed = canvas.toDataURL('image/jpeg', 0.8)
      resolve({ preview: compressed, base64: compressed.split(',')[1], mediaType: 'image/jpeg' })
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
})

export function useStore() {
  const [lang, setLang] = useState('fr')
  const [tab, setTab] = useState('scan')
  const [scanTab, setScanTab] = useState('photo')

  const [slots] = useState(() => {
    try {
      const saved = sessionStorage.getItem('barman_slots')
      if (saved) return JSON.parse(saved)
    } catch {}
    return [
      { photos: [] }, { photos: [] }, { photos: [] },
      { photos: [] }, { photos: [] }, { photos: [] },
    ]
  })

  const [, forceUpdate] = useState(0)
  const refresh = () => forceUpdate(n => n + 1)

  const [manualIngr, setManualIngr] = useState([])
  const [detectedIngr, setDetectedIngr] = useState([])
  const [recipes, setRecipes] = useState([])
  const [analyzing, setAnalyzing] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [analyzeError, setAnalyzeError] = useState(null)
  const [genError, setGenError] = useState(null)
  const [favs, setFavs] = useState(loadFavs)
  const [style, setStyle] = useState('')
  const [servings, setServings] = useState('2 personnes')

  const addPhotosToSlot = useCallback((idx, files) => {
    files.forEach(async file => {
      const photo = await resizeImage(file)
      slots[idx].photos.push(photo)
      setDetectedIngr([])
      try { sessionStorage.setItem('barman_slots', JSON.stringify(slots)) } catch {}
      refresh()
    })
  }, [slots])

  const removePhotoFromSlot = useCallback((slotIdx, photoIdx) => {
    slots[slotIdx].photos.splice(photoIdx, 1)
    setDetectedIngr([])
    try { sessionStorage.setItem('barman_slots', JSON.stringify(slots)) } catch {}
    refresh()
  }, [slots])

  const totalPhotos = slots.reduce((a, s) => a + s.photos.length, 0)
  const filledSlots = slots.filter(s => s.photos.length > 0).length

  const addManualIngr = useCallback((raw) => {
    const items = raw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
    setManualIngr(prev => {
      const next = [...prev]
      items.forEach(i => { if (!next.includes(i)) next.push(i) })
      return next
    })
  }, [])

  const removeManualIngr = useCallback((item) => {
    setManualIngr(prev => prev.filter(i => i !== item))
  }, [])

  const analyzePhotos = useCallback(async () => {
    const allPhotos = slots.flatMap(s => s.photos)
    if (!allPhotos.length) return
    setAnalyzing(true)
    setAnalyzeError(null)
    const all = []
    for (const photo of allPhotos) {
      try {
        const resp = await fetch(API_URL, {
          method: 'POST', headers: API_HEADERS,
          body: JSON.stringify({
            model: 'claude-opus-4-5', max_tokens: 300,
            messages: [{ role: 'user', content: [
              { type: 'image', source: { type: 'base64', media_type: photo.mediaType, data: photo.base64 } },
              { type: 'text', text: lang === 'fr'
                ? 'Liste toutes les bouteilles d\'alcool, sirops, jus et ingrédients de bar visibles. Réponds UNIQUEMENT avec un JSON array: ["vodka","citron"]. Rien d\'autre.'
                : 'List all visible alcohol bottles, syrups, juices and bar ingredients. Reply ONLY with a JSON array: ["vodka","lemon"]. Nothing else.'
              }
            ]}]
          })
        })
        const data = await resp.json()
        if (data.error) { alert('Erreur API: ' + data.error.message); break }
        const raw = data.content[0].text.trim()
        const match = raw.match(/\[[\s\S]*?\]/)
        if (match) {
          JSON.parse(match[0]).forEach(item => {
            if (!all.includes(item.toLowerCase())) all.push(item.toLowerCase())
          })
        }
      } catch (e) { alert('Erreur: ' + e.message) }
    }
    setAnalyzing(false)
    if (all.length) setDetectedIngr(all)
    else setAnalyzeError(true)
  }, [slots, lang])

  const generateRecipes = useCallback(async () => {
    const ingredientList = scanTab === 'photo' ? detectedIngr : manualIngr
    if (!ingredientList.length) return
    setGenerating(true)
    setGenError(null)

    const prompt = lang === 'fr'
      ? `Tu es un barman expert. Ingrédients disponibles: ${ingredientList.join(', ')}. Style: ${style || 'tous styles'}, ${servings}. Génère exactement 3 recettes de cocktails créatifs. Réponds UNIQUEMENT avec un tableau JSON valide, rien d'autre:\n[{"nom":"Nom cocktail","temps":"5 min","difficulte":"Facile","portions":"${servings}","ingredients":["50ml vodka"],"etapes":["Étape 1"],"astuce":"Conseil du barman"}]`
      : `You are an expert barman. Available ingredients: ${ingredientList.join(', ')}. Style: ${style || 'all styles'}, ${servings}. Generate exactly 3 creative cocktail recipes. Reply ONLY with a valid JSON array, nothing else:\n[{"nom":"Cocktail name","temps":"5 min","difficulte":"Easy","portions":"${servings}","ingredients":["50ml vodka"],"etapes":["Step 1"],"astuce":"Barman tip"}]`

    try {
      const resp = await fetch(API_URL, {
        method: 'POST', headers: API_HEADERS,
        body: JSON.stringify({ model: 'claude-opus-4-5', max_tokens: 1500, messages: [{ role: 'user', content: prompt }] })
      })
      const data = await resp.json()
      if (data.error) { alert('Erreur API: ' + data.error.message); setGenError(true) }
      else {
        const raw = data.content[0].text.trim()
        const match = raw.match(/\[[\s\S]*\]/)
        if (!match) { alert('Format inattendu, réessaie!'); setGenError(true) }
        else {
          try { setRecipes(JSON.parse(match[0])); setTab('recipes') }
          catch (e) { alert('Erreur parsing, réessaie!'); setGenError(true) }
        }
      }
    } catch (e) { alert('Erreur réseau: ' + e.message); setGenError(true) }
    setGenerating(false)
  }, [scanTab, detectedIngr, manualIngr, lang, style, servings])

  const toggleFav = useCallback((recipe) => {
    setFavs(prev => {
      const exists = prev.some(r => r.nom === recipe.nom)
      const next = exists ? prev.filter(r => r.nom !== recipe.nom) : [recipe, ...prev]
      saveFavs(next)
      return next
    })
  }, [])

  const isFav = useCallback((recipe) => favs.some(r => r.nom === recipe.nom), [favs])

  return {
    lang, setLang, tab, setTab, scanTab, setScanTab,
    slots, totalPhotos, filledSlots,
    addPhotosToSlot, removePhotoFromSlot,
    manualIngr, addManualIngr, removeManualIngr,
    detectedIngr, setDetectedIngr,
    analyzing, analyzePhotos, analyzeError,
    generating, generateRecipes, genError,
    recipes, style, setStyle, servings, setServings,
    favs, toggleFav, isFav,
  }
}
