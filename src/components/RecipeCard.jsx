import React, { useState } from 'react'
import { t } from '../i18n'

export default function RecipeCard({ recipe, lang, isFav, onToggleFav }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="card" style={{ marginBottom:10, border: expanded ? '1.5px solid #B45309' : undefined, transition:'border-color 0.15s' }}>
      <div onClick={() => setExpanded(e => !e)} style={{ padding:'14px 14px 10px', cursor:'pointer', userSelect:'none' }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10 }}>
          <div style={{ flex:1 }}>
            <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:17, fontWeight:700, fontStyle:'italic', color:'#1a0a00', marginBottom:6, lineHeight:1.3 }}>
              {recipe.nom}
            </p>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              <span className="badge badge-time">{recipe.temps}</span>
              <span className="badge badge-diff">{recipe.difficulte}</span>
              <span className="badge badge-serv">{recipe.portions}</span>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, flexShrink:0 }}>
            <button onClick={e => { e.stopPropagation(); onToggleFav(recipe) }} style={{ background: isFav ? '#fef2f2' : '#fdf8f0', border:'none', borderRadius:8, width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill={isFav ? '#E24B4A' : 'none'} stroke={isFav ? '#E24B4A' : '#c0a080'} strokeWidth="2" strokeLinecap="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </button>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c0a080" strokeWidth="2" strokeLinecap="round" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
      </div>
      {expanded && (
        <div style={{ borderTop:'0.5px solid rgba(120,60,0,0.1)', padding:'12px 14px 14px' }}>
          <div style={{ marginBottom:12 }}>
            <p className="section-label">{t(lang, 'ingLabel')}</p>
            <ul style={{ paddingLeft:16, fontSize:14, color:'#6b4c2a', lineHeight:1.8 }}>
              {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
            </ul>
          </div>
          <div style={{ marginBottom:12 }}>
            <p className="section-label">{t(lang, 'stepsLabel')}</p>
            <ol style={{ paddingLeft:16, fontSize:14, color:'#6b4c2a', lineHeight:1.8 }}>
              {recipe.etapes.map((step, i) => <li key={i} style={{ marginBottom:4 }}>{step}</li>)}
            </ol>
          </div>
          {recipe.astuce && (
            <div style={{ background:'#fffbf0', borderLeft:'2.5px solid #D97706', padding:'8px 12px', borderRadius:'0 8px 8px 0', fontSize:13, color:'#6b4c2a', fontStyle:'italic' }}>
              <strong style={{ color:'#B45309', fontStyle:'normal' }}>{t(lang, 'tipLabel')} : </strong>
              {recipe.astuce}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
