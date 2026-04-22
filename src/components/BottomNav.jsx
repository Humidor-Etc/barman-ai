import React from 'react'
import { t } from '../i18n'

const icons = {
  scan: (active) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/>
      <path d="M14 14h2m3 0h2m-4 3v2m0 3v-1"/>
    </svg>
  ),
  recipes: (active) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round">
      <path d="M8 3v4M12 3v4M16 3v4"/>
      <path d="M4 7h16v2c0 5-2 9-8 10C6 18 4 14 4 9V7z"/>
      <path d="M9 13l2 2 4-4"/>
    </svg>
  ),
  favs: (active) => (
    <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  ),
}

export default function BottomNav({ tab, setTab, lang }) {
  const items = [
    { id: 'scan',    label: t(lang, 'navScan') },
    { id: 'recipes', label: t(lang, 'navRecipes') },
    { id: 'favs',    label: t(lang, 'navFavs') },
  ]
  return (
    <nav className="bottom-nav">
      {items.map(item => (
        <button key={item.id} className={`nav-btn ${tab === item.id ? 'active' : ''}`} onClick={() => setTab(item.id)}>
          {icons[item.id](tab === item.id)}
          {item.label}
        </button>
      ))}
    </nav>
  )
}
