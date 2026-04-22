import React, { useRef } from 'react'
import { t } from '../i18n'

export default function SlotModal({ slotIdx, slot, slotName, onClose, onAddPhotos, onRemovePhoto, lang }) {
  const inputRef = useRef()
  const cameraRef = useRef()
  if (slotIdx === null) return null

  const handleFiles = (e) => {
    const files = Array.from(e.target.files)
    if (files.length) onAddPhotos(slotIdx, files)
    e.target.value = ''
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(28,10,0,0.65)', zIndex:200, display:'flex', alignItems:'flex-end' }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background:'#fff', borderRadius:'20px 20px 0 0', width:'100%', maxHeight:'80vh', display:'flex', flexDirection:'column', paddingBottom:'var(--safe-bottom)' }}>
        <div style={{ display:'flex', justifyContent:'center', padding:'10px 0 0' }}>
          <div style={{ width:36, height:4, background:'#f0e0c0', borderRadius:2 }} />
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 16px 12px' }}>
          <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:20, fontWeight:700, color:'#1a0a00' }}>{slotName}</span>
          <button onClick={onClose} style={{ background:'#fdf8f0', border:'none', borderRadius:8, width:32, height:32, fontSize:18, color:'#a07850', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>×</button>
        </div>
        <div style={{ overflowY:'auto', padding:'0 16px 16px', flex:1 }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8 }}>
            {slot.photos.map((photo, pi) => (
              <div key={pi} style={{ position:'relative', aspectRatio:'1', borderRadius:10, overflow:'hidden' }}>
                <img src={photo.preview} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <button onClick={() => onRemovePhoto(slotIdx, pi)} style={{ position:'absolute', top:5, right:5, background:'rgba(0,0,0,0.6)', color:'#fff', border:'none', borderRadius:'50%', width:24, height:24, fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>×</button>
              </div>
            ))}
            <div onClick={() => cameraRef.current?.click()} style={{ aspectRatio:'1', borderRadius:10, border:'1.5px dashed #D97706', background:'#fffbf0', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, cursor:'pointer' }}>
              <span style={{ fontSize:26, color:'#D97706', lineHeight:1 }}>+</span>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#D97706', fontWeight:700 }}>PHOTO</span>
            </div>
          </div>
          <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{ display:'none' }} onChange={handleFiles} />
          <input ref={inputRef} type="file" accept="image/*" multiple style={{ display:'none' }} onChange={handleFiles} />
          <div style={{ display:'flex', gap:8, marginTop:14 }}>
            <button className="btn-secondary" style={{ flex:1 }} onClick={() => cameraRef.current?.click()}>📷 {lang === 'fr' ? 'Caméra' : 'Camera'}</button>
            <button className="btn-secondary" style={{ flex:1 }} onClick={() => inputRef.current?.click()}>🖼️ {lang === 'fr' ? 'Galerie' : 'Gallery'}</button>
          </div>
        </div>
        <div style={{ padding:'0 16px 10px' }}>
          <button className="btn-primary" onClick={onClose}>{t(lang, 'done')}</button>
        </div>
      </div>
    </div>
  )
}
