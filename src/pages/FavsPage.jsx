import React from 'react'
import { t } from '../i18n'
import RecipeCard from '../components/RecipeCard'

export default function FavsPage({ lang, favs, isFav, toggleFav }) {
  if (!favs.length) {
    return (
      <div className="page-scroll" style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:32, gap:14 }}>
        <div style={{ width:72, height:72, background:'#fef2f2', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E24B4A" strokeWidth="1.5" strokeLinecap="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </div>
        <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:22, fontWeight:700, color:'#1a0a00', textAlign:'center' }}>
          {t(lang, 'noFavs')}
        </p>
        <p style={{ fontSize:14, color:'#a07850', textAlign:'center', lineHeight:1.6 }}>
          {t(lang, 'noFavsSub')}
        </p>
      </div>
    )
  }
  return (
    <div className="page-scroll" style={{ flex:1, padding:'16px 16px 16px' }}>
      <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:21, fontWeight:700, color:'#1a0a00', marginBottom:14 }}>
        {t(lang, 'favCount', favs.length)}
      </p>
      {favs.map((recipe, i) => (
        <RecipeCard key={i} recipe={recipe} lang={lang} isFav={isFav(recipe)} onToggleFav={toggleFav} />
      ))}
    </div>
  )
}
