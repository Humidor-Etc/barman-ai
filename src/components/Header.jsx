import React from 'react'
import { t } from '../i18n'

export default function Header({ lang, setLang }) {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #1C0A00 0%, #7C2D12 35%, #B45309 70%, #D97706 100%)',
      padding: 'calc(var(--safe-top) + 12px) 16px 14px',
      display: 'flex', alignItems: 'center', gap: 12,
      flexShrink: 0, position: 'relative', overflow: 'hidden',
      zIndex: 10,
    }}>
      {/* Cercles décoratifs dorés */}
      <div style={{ position:'absolute', right:-25, top:-25, width:110, height:110, borderRadius:'50%', background:'rgba(217,119,6,0.18)' }} />
      <div style={{ position:'absolute', right:60, bottom:-40, width:85, height:85, borderRadius:'50%', background:'rgba(180,83,9,0.14)' }} />
      <div style={{ position:'absolute', left:-15, bottom:-15, width:70, height:70, borderRadius:'50%', background:'rgba(253,230,138,0.1)' }} />
      <div style={{ position:'absolute', left:60, top:-10, width:40, height:40, borderRadius:'50%', background:'rgba(253,230,138,0.08)' }} />

      {/* Logo verre à cocktail */}
      <div style={{ position:'relative', flexShrink:0, zIndex:1 }}>
        <div style={{
          width:34, height:34,
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <polygon points="5,4 29,4 19,18 19,28" fill="rgba(253,230,138,0.25)" stroke="#FDE68A" strokeWidth="1.5" strokeLinejoin="round"/>
            <line x1="19" y1="28" x2="12" y2="28" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="10" cy="10" r="3" fill="#D97706" opacity="0.8"/>
          </svg>
        </div>
      </div>

      {/* Titres */}
      <div style={{ flex:1, zIndex:1 }}>
        <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:24, fontWeight:700, color:'#FDE68A', lineHeight:1, letterSpacing:'0.5px' }}>
          Barman<span style={{ color:'#fff', opacity:0.9 }}>.AI</span>
        </div>
        <div style={{ fontFamily:"'Nunito', sans-serif", fontSize:11, color:'rgba(253,230,138,0.8)', fontWeight:600, marginTop:1 }}>
          {lang === 'fr' ? 'par Paul Genest' : 'by Paul Genest'}
        </div>
        <div style={{ fontFamily:"'Space Mono', monospace", fontSize:9, color:'rgba(253,230,138,0.6)', fontWeight:700, letterSpacing:'0.8px', textTransform:'uppercase', marginTop:3 }}>
          {t(lang, 'tagline')}
        </div>
      </div>

      {/* Toggle langue */}
      <div style={{ display:'flex', background:'rgba(0,0,0,0.25)', borderRadius:8, overflow:'hidden', zIndex:1, border:'0.5px solid rgba(253,230,138,0.2)' }}>
        {['fr','en'].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{
            padding:'6px 12px', border:'none',
            background: lang===l ? 'rgba(253,230,138,0.2)' : 'transparent',
            fontFamily:"'Space Mono', monospace", fontSize:11, fontWeight:700,
            color: lang===l ? '#FDE68A' : 'rgba(253,230,138,0.45)',
            cursor:'pointer', letterSpacing:'0.5px',
            transition:'all 0.15s',
          }}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  )
}
