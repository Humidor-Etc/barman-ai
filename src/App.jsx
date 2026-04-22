import React from 'react'
import { useStore } from './useStore'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import ScanPage from './pages/ScanPage'
import RecipesPage from './pages/RecipesPage'
import FavsPage from './pages/FavsPage'

export default function App() {
  const store = useStore()
  return (
    <div style={{ height:'100dvh', display:'flex', flexDirection:'column', background:'var(--bg)', overflow:'hidden' }}>
      <Header lang={store.lang} setLang={store.setLang} />
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
