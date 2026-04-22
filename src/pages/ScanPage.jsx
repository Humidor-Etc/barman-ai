import React, { useState } from 'react'
import { t } from '../i18n'
import SlotModal from '../components/SlotModal'

export default function ScanPage({
  lang, scanTab, setScanTab,
  slots, totalPhotos, filledSlots,
  addPhotosToSlot, removePhotoFromSlot,
  manualIngr, addManualIngr, removeManualIngr,
  detectedIngr, setDetectedIngr,
  analyzing, analyzePhotos, analyzeError,
  generating, generateRecipes, genError,
  style, setStyle, servings, setServings,
}) {
  const [modalSlot, setModalSlot] = useState(null)
  const [ingrInput, setIngrInput] = useState('')
  const slotNames = t(lang, 'slotNames')

  const handleAddIngr = () => {
    if (!ingrInput.trim()) return
    addManualIngr(ingrInput)
    setIngrInput('')
  }

  const ingredientList = scanTab === 'photo' ? detectedIngr : manualIngr
  const canGenerate = ingredientList.length > 0

  return (
    <div className="page-scroll" style={{ flex:1, padding:'16px 16px 16px' }}>
      <div style={{ display:'flex', background:'#f5ede0', borderRadius:12, padding:4, marginBottom:16 }}>
        {['photo','manual'].map(tab => (
          <button key={tab} onClick={() => setScanTab(tab)} style={{
            flex:1, padding:'9px 0', border:'none', borderRadius:9,
            fontSize:13, fontWeight:700,
            background: scanTab===tab ? 'linear-gradient(135deg, #92400E, #D97706)' : 'transparent',
            color: scanTab===tab ? '#fff' : '#a07850',
            cursor:'pointer', transition:'all 0.15s',
          }}>
            {t(lang, tab === 'photo' ? 'tabPhoto' : 'tabManual')}
          </button>
        ))}
      </div>

      {scanTab === 'photo' && (
        <div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:12 }}>
            {slots.map((slot, i) => {
              const hasPhotos = slot.photos.length > 0
              const lastPhoto = slot.photos[slot.photos.length - 1]
              return (
                <div key={i} onClick={() => setModalSlot(i)} style={{
                  borderRadius:12, overflow:'hidden',
                  border: hasPhotos ? '1.5px solid #D97706' : '0.5px solid rgba(120,60,0,0.12)',
                  background:'#fff', cursor:'pointer', position:'relative',
                }}>
                  <div style={{ aspectRatio:'1', position:'relative', background:'#fdf8f0', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:5 }}>
                    {hasPhotos ? (
                      <>
                        <img src={lastPhoto.preview} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
                        {slot.photos.length > 1 && (
                          <div style={{ position:'absolute', bottom:5, right:5, background:'rgba(124,45,18,0.85)', color:'#FDE68A', fontFamily:"'Space Mono',monospace", fontSize:9, fontWeight:700, padding:'2px 6px', borderRadius:10 }}>
                            {slot.photos.length} ×
                          </div>
                        )}
                        <div style={{ position:'absolute', top:5, right:5, width:18, height:18, background:'#D97706', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"><polyline points="2 5 4 7 8 3"/></svg>
                        </div>
                      </>
                    ) : (
                      <div style={{ width:32, height:32, background:'#FEF3C7', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round">
                          <rect x="3" y="3" width="18" height="18" rx="3"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div style={{ padding:'5px 7px' }}>
                    <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:800, color:'#1a0a00', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                      {slotNames[i]}
                    </div>
                    {hasPhotos && (
                      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, fontWeight:700, color:'#D97706', marginTop:1 }}>
                        {slot.photos.length} photo{slot.photos.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {totalPhotos > 0 && (
            <div style={{ background:'#FEF3C7', borderRadius:8, padding:'8px 12px', marginBottom:10, fontSize:12, fontWeight:700, color:'#92400E', display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:7, height:7, background:'#D97706', borderRadius:'50%' }} />
              {t(lang, 'photoCount', filledSlots, totalPhotos)}
            </div>
          )}

          {totalPhotos > 0 && (
            <button className="btn-secondary" style={{ marginBottom:10 }} onClick={analyzePhotos} disabled={analyzing}>
              {analyzing ? (
                <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                  <span className="spinner" style={{ width:16, height:16, borderWidth:2 }} />
                  {t(lang, 'analyzingBtn')}
                </span>
              ) : t(lang, 'analyzeBtn')}
            </button>
          )}

          {detectedIngr.length > 0 && (
            <div className="msg-success" style={{ marginBottom:10 }}>
              <strong>{t(lang, 'detectedTitle')}</strong><br/>
              {detectedIngr.join(', ')}
            </div>
          )}
          {analyzeError && <div className="msg-error" style={{ marginBottom:10 }}>{t(lang, 'errPhoto')}</div>}
        </div>
      )}

      {scanTab === 'manual' && (
        <div>
          <p className="section-label">{t(lang, 'lblIngr')}</p>
          <div style={{ display:'flex', gap:8, marginBottom:10 }}>
            <input className="input-field" style={{ flex:1 }} value={ingrInput}
              placeholder={t(lang, 'ingrPlaceholder')}
              onChange={e => setIngrInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddIngr()}
            />
            <button onClick={handleAddIngr} style={{ padding:'0 16px', background:'#FEF3C7', color:'#92400E', border:'none', borderRadius:8, fontSize:22, fontWeight:800, cursor:'pointer' }}>+</button>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:14, minHeight:32 }}>
            {manualIngr.map(item => (
              <span key={item} className="chip">{item}<button className="chip-x" onClick={() => removeManualIngr(item)}>×</button></span>
            ))}
          </div>
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
        <div>
          <p className="section-label">{t(lang, 'lblStyle')}</p>
          <select className="select-field" value={style} onChange={e => setStyle(e.target.value)}>
            <option value="">{t(lang, 'oNone')}</option>
            <option value={t(lang, 'oClassic')}>{t(lang, 'oClassic')}</option>
            <option value={t(lang, 'oModern')}>{t(lang, 'oModern')}</option>
            <option value={t(lang, 'oLow')}>{t(lang, 'oLow')}</option>
            <option value={t(lang, 'oShort')}>{t(lang, 'oShort')}</option>
          </select>
        </div>
        <div>
          <p className="section-label">{t(lang, 'lblServ')}</p>
          <select className="select-field" value={servings} onChange={e => setServings(e.target.value)}>
            {['oS1','oS2','oS34','oS5'].map(k => (
              <option key={k} value={t(lang, k)}>{t(lang, k)}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="btn-primary" onClick={generateRecipes} disabled={generating || !canGenerate}>
        {generating ? (
          <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
            <span className="spinner" style={{ borderColor:'rgba(255,255,255,0.3)', borderTopColor:'#fff' }} />
            {t(lang, 'genningBtn')}
          </span>
        ) : t(lang, 'genBtn')}
      </button>

      {genError && <div className="msg-error" style={{ marginTop:10 }}>{t(lang, 'errApi')}</div>}

      {modalSlot !== null && (
        <SlotModal slotIdx={modalSlot} slot={slots[modalSlot]} slotName={slotNames[modalSlot]}
          onClose={() => setModalSlot(null)} onAddPhotos={addPhotosToSlot}
          onRemovePhoto={removePhotoFromSlot} lang={lang} />
      )}
    </div>
  )
}
