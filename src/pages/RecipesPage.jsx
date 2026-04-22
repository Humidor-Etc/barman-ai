import React from 'react'
import { t } from '../i18n'
import RecipeCard from '../components/RecipeCard'

export default function RecipesPage({ lang, recipes, isFav, toggleFav, setTab, onRefresh }) {
  if (!recipes.length) {
    return (
      <div className="page-scroll" style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:32, gap:16 }}>
        <div style={{ width:72, height:72, background:'#FEF3C7', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round">
            <path d="M8 3v4M12 3v4M16 3v4"/>
            <path d="M4 7h16v2c0 5-2 9-8 10C6 18 4 14 4 9V7z"/>
          </svg>
        </div>
        <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:22, fontWeight:700, color:'#1a0a00', textAlign:'center' }}>
          {t(lang, 'noRecipes')}
        </p>
        <p style={{ fontSize:14, color:'#a07850', textAlign:'center', lineHeight:1.6 }}>
          {t(lang, 'noRecipesSub')}
        </p>
        <button className="btn-primary" style={{ width:'auto', padding:'12px 28px' }} onClick={() => setTab('scan')}>
          {t(lang, 'getStarted')}
        </button>
      </div>
    )
  }

  return (
    <div className="page-scroll" style={{ flex:1, padding:'16px 16px 16px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
        <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:21, fontWeight:700, color:'#1a0a00' }}>
          {t(lang, 'resultsTitle', recipes.length)}
        </p>
        <button onClick={onRefresh} style={{ background:'#FEF3C7', color:'#92400E', border:'none', borderRadius:10, padding:'8px 14px', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:"'Nunito', sans-serif" }}>
          ↻ {t(lang, 'refresh')}
        </button>
      </div>
      {recipes.map((recipe, i) => (
        <RecipeCard key={i} recipe={recipe} lang={lang} isFav={isFav(recipe)} onToggleFav={toggleFav} />
      ))}
    </div>
  )
}
