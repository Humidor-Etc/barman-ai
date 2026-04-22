import React, { useState } from 'react'
import { useStore } from './useStore'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import ScanPage from './pages/ScanPage'
import RecipesPage from './pages/RecipesPage'
import FavsPage from './pages/FavsPage'

export default function App() {
  const store = useStore()
  const [showSplash, setShowSplash] = useState(() => {
    try { return !localStorage.getItem('barman_seen') } catch { return true }
  })

  const dismissSplash = () => {
    try { localStorage.setItem('barman_seen', '1') } catch {}
    setShowSplash(false)
  }
  return (
    <div style={{ height:'100dvh', display:'flex', flexDirection:'column', background:'var(--bg)', overflow:'hidden' }}>
      <Header lang={store.lang} setLang={store.setLang} />
{showSplash && (
        <div style={{ position:'fixed', inset:0, background:'rgba(28,10,0,0.97)', zIndex:500, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:32, gap:24 }}>
          <svg width="64" height="64" viewBox="0 0 34 34" fill="none">
            <polygon points="5,4 29,4 19,18 19,28" fill="rgba(253,230,138,0.25)" stroke="#FDE68A" strokeWidth="1.5" strokeLinejoin="round"/>
            <line x1="19" y1="28" x2="12" y2="28" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="10" cy="10" r="3" fill="#D97706" opacity="0.8"/>
          </svg>
          <div style={{ textAlign:'center' }}>
            <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:36, fontWeight:700, color:'#FDE68A', marginBottom:4, letterSpacing:'1px' }}>Barman.AI</p>
            <p style={{ fontFamily:"'Nunito', sans-serif", fontSize:13, color:'rgba(253,230,138,0.7)', fontWeight:600, letterSpacing:'1px', marginBottom:24 }}>
              {store.lang === 'fr' ? 'par Paul Genest' : 'by Paul Genest'}
            </p>
            <p style={{ fontFamily:"'Nunito', sans-serif", fontSize:16, color:'#fff', lineHeight:1.7, marginBottom:8 }}>
              {store.lang === 'fr'
                ? 'Prends des photos de ton bar — l\'IA détecte tes bouteilles et crée des cocktails sur mesure en quelques secondes!'
                : 'Take photos of your bar — AI detects your bottles and creates custom cocktails in seconds!'}
            </p>
            <p style={{ fontFamily:"'Nunito', sans-serif", fontSize:13, color:'#D97706', lineHeight:1.6 }}>
              {store.lang === 'fr'
                ? '📷 Scanne · 🤖 Analyse · 🍸 Cocktail'
                : '📷 Scan · 🤖 Analyze · 🍸 Cocktail'}
            </p>
          </div>
          <button onClick={dismissSplash} style={{ marginTop:8, padding:'14px 40px', background:'#FDE68A', color:'#7C2D12', border:'none', borderRadius:14, fontFamily:"'Cormorant Garamond', serif", fontSize:18, fontWeight:700, cursor:'pointer', letterSpacing:'0.3px' }}>
            {store.lang === 'fr' ? 'Commencer' : 'Get started'}
          </button>
          <p style={{ fontFamily:"'Nunito', sans-serif", fontSize:11, color:'rgba(255,255,255,0.3)' }}>
            {store.lang === 'fr' ? 'Ne s\'affiche qu\'une seule fois' : 'Only shown once'}
          </p>
        </div>
      )}
      <div style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column', paddingBottom:'var(--nav-h)' }}>
        {store.tab === 'scan' && (
          <ScanPage
            lang={store.lang} scanTab={store.scanTab} setScanTab={store.setScanTab}
            slots={store.slots} totalPhotos={store.totalPhotos} filledSlots={store.filledSlots}
            addPhotosToSlot={store.addPhotosToSlot} removePhotoFromSlot={store.removePhotoFromSlot}
            manualIngr={store.manualIngr} addManualIngr={store.addManualIngr} removeManualIngr={store.removeManualIngr}
            detectedIngr={store.detectedIngr} setDetectedIngr={store.setDetectedIngr}
            analyzing={store.analyzing} analyzePhotos={store.analyzePhotos} analyzeError={store.analyzeError}
            generating={store.generating} generateRecipes={store.generateRecipes} genError={store.genError}
            style={store.style} setStyle={store.setStyle}
            servings={store.servings} setServings={store.setServings}
          />
        )}
        {store.tab === 'recipes' && (
          <RecipesPage
            lang={store.lang} recipes={store.recipes}
            isFav={store.isFav} toggleFav={store.toggleFav}
            setTab={store.setTab} onRefresh={store.generateRecipes}
          />
        )}
        {store.tab === 'favs' && (
          <FavsPage lang={store.lang} favs={store.favs} isFav={store.isFav} toggleFav={store.toggleFav} />
        )}
      </div>
      <BottomNav tab={store.tab} setTab={store.setTab} lang={store.lang} />
    </div>
  )
}
