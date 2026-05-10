import { useState, useRef, useCallback } from 'react'
import ScrollReveal from '../components/ScrollReveal'

interface CorridorInfo {
  name: string
  tag: string
  color: string
  stats: { label: string; value: string }[]
}

const corridorData: Record<string, CorridorInfo> = {
  dubaiSouth: {
    name: 'DUBAI SOUTH',
    tag: 'THE AIRPORT CITY',
    color: '#C9A87C',
    stats: [
      { label: 'Entry', value: '~AED 800/sqft' },
      { label: 'Yield', value: '5-8%' },
      { label: 'Growth', value: '+25% YoY' },
    ],
  },
  jvc: {
    name: 'JVC',
    tag: 'THE GOLD LINE',
    color: '#D4F1F4',
    stats: [
      { label: 'Entry', value: '~AED 1,000/sqft' },
      { label: 'Yield', value: '7-8%' },
      { label: 'Growth', value: '7-10%' },
    ],
  },
  mbrc: {
    name: 'MBRC',
    tag: 'THE FOREST SANCTUARY',
    color: '#5A7A72',
    stats: [
      { label: 'Entry', value: '~AED 2,000/sqft' },
      { label: 'Yield', value: '6-7.4%' },
      { label: 'Sales', value: 'AED 6.1B' },
    ],
  },
  meydan: {
    name: 'MEYDAN',
    tag: 'THE RACING HEART',
    color: '#C9A87C',
    stats: [
      { label: 'Entry', value: '~AED 2,800/sqft' },
      { label: 'Yield', value: '6%' },
      { label: 'Event', value: 'World Cup' },
    ],
  },
}

type MapMode = 'uae' | 'dubai'

/* ─── corridor pin positions (percent of image: x%, y%) ─── */
const corridorPins = {
  dubaiSouth: { x: 30, y: 76, label: 'DUBAI SOUTH', color: '#C9A87C' },
  jvc:        { x: 43, y: 58, label: 'JVC',         color: '#D4F1F4' },
  mbrc:       { x: 52, y: 42, label: 'MBRC',        color: '#5A7A72' },
  meydan:     { x: 54, y: 36, label: 'MEYDAN',      color: '#C9A87C' },
}

export default function DubaiMapSection() {
  const [hoveredCorridor, setHoveredCorridor] = useState<string | null>(null)
  const [mapMode, setMapMode] = useState<MapMode>('uae')
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const activeCorridorKey = hoveredCorridor ?? 'dubaiSouth'
  const activeInfo = corridorData[activeCorridorKey]

  const switchMode = useCallback((mode: MapMode) => {
    setMapMode(mode)
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
    setHoveredCorridor(null)
  }, [])

  /* ─── zoom ─── */
  const zoomIn = useCallback(() => setZoomLevel((z) => Math.min(z + 0.4, 3)), [])
  const zoomOut = useCallback(() => {
    setZoomLevel((z) => {
      const nz = Math.max(z - 0.4, 0.6)
      if (nz <= 0.6) setPanOffset({ x: 0, y: 0 })
      return nz
    })
  }, [])
  const resetView = useCallback(() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }) }, [])

  /* ─── pan ─── */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoomLevel > 0.6) { setIsPanning(true); setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y }) }
  }, [zoomLevel, panOffset])
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) setPanOffset({ x: e.clientX - panStart.x, y: e.clientY - panStart.y })
  }, [isPanning, panStart])
  const handleMouseUp = useCallback(() => setIsPanning(false), [])

  /* ─── wheel zoom ─── */
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.15 : 0.15
    setZoomLevel((z) => { const nz = Math.max(0.6, Math.min(3, z + delta)); if (nz <= 0.6) setPanOffset({ x: 0, y: 0 }); return nz })
  }, [])

  const mapImage = mapMode === 'uae' ? '/images/uae-map.png' : '/images/dubai-map-zoom.png'

  return (
    <section id="dubai-map" style={{ position: 'relative', zIndex: 2, background: '#0A1F1A', padding: '120px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="font-caption" style={{ color: '#C9A87C', display: 'block', marginBottom: 16, fontSize: 12 }}>
              INTERACTIVE MAP
            </span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#E8DDD0', marginBottom: 12 }}>
              DUBAI <span style={{ color: '#C9A87C' }}>INVESTMENT</span> CORRIDORS
            </h2>
            <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.5)', fontSize: 15, maxWidth: 560, margin: '0 auto 20px' }}>
              {mapMode === 'uae'
                ? 'Accurate UAE emirate boundaries. Click "Zoom to Dubai" to explore districts and corridors.'
                : 'Zoom and pan to explore Dubai districts. Hover over highlighted corridors for key metrics.'}
            </p>
            {/* Mode switcher */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 8 }}>
              <button onClick={() => switchMode('uae')} style={{
                padding: '8px 20px', borderRadius: 6, fontSize: 12, fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '0.04em', cursor: 'pointer', border: '1px solid rgba(90,122,114,0.3)',
                background: mapMode === 'uae' ? '#C9A87C' : 'transparent', color: mapMode === 'uae' ? '#0A1F1A' : '#E8DDD0',
                transition: 'all 0.25s ease', fontWeight: 600,
              }}>UAE OVERVIEW</button>
              <button onClick={() => switchMode('dubai')} style={{
                padding: '8px 20px', borderRadius: 6, fontSize: 12, fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '0.04em', cursor: 'pointer', border: '1px solid rgba(90,122,114,0.3)',
                background: mapMode === 'dubai' ? '#C9A87C' : 'transparent', color: mapMode === 'dubai' ? '#0A1F1A' : '#E8DDD0',
                transition: 'all 0.25s ease', fontWeight: 600,
              }}>ZOOM TO DUBAI</button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div
            ref={containerRef}
            style={{
              position: 'relative', width: '100%', maxWidth: 900, margin: '0 auto',
              borderRadius: 8, border: '1px solid rgba(90, 122, 114, 0.15)',
              overflow: 'hidden', background: '#0D1F1A', userSelect: 'none',
            }}
          >
            {/* Map Image with zoom/pan */}
            <div
              style={{
                position: 'relative', width: '100%', paddingTop: mapMode === 'uae' ? '56.25%' : '75%',
                cursor: isPanning ? 'grabbing' : zoomLevel > 0.6 ? 'grab' : 'default',
                overflow: 'hidden',
              }}
              onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp} onWheel={handleWheel}
            >
              <img
                src={mapImage}
                alt={mapMode === 'uae' ? 'UAE Emirates Map' : 'Dubai Districts Map'}
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  objectFit: 'cover',
                  transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                  transformOrigin: 'center center',
                  transition: isPanning ? 'none' : 'transform 0.3s ease',
                }}
                draggable={false}
              />

              {/* Interactive corridor pins (Dubai zoom mode only) */}
              {mapMode === 'dubai' && (
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                  {Object.entries(corridorPins).map(([key, pin]) => (
                    <div
                      key={key}
                      style={{
                        position: 'absolute',
                        left: `${pin.x}%`,
                        top: `${pin.y}%`,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'auto',
                        cursor: 'pointer',
                        zIndex: 10,
                      }}
                      onMouseEnter={() => setHoveredCorridor(key)}
                      onMouseLeave={() => setHoveredCorridor(null)}
                    >
                      {/* Pulse ring */}
                      <div style={{
                        position: 'absolute', width: 48, height: 48, borderRadius: '50%',
                        border: `1.5px solid ${pin.color}`,
                        opacity: hoveredCorridor === key ? 0.5 : 0.2,
                        animation: 'mapPulse 2.5s ease-in-out infinite',
                        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                      }} />
                      {/* Center dot */}
                      <div style={{
                        width: 12, height: 12, borderRadius: '50%',
                        background: pin.color,
                        boxShadow: `0 0 12px ${pin.color}80`,
                        transition: 'all 0.3s ease',
                        transform: hoveredCorridor === key ? 'scale(1.3)' : 'scale(1)',
                      }} />
                      {/* Label */}
                      <div style={{
                        position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap', color: pin.color, fontSize: 9,
                        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
                        letterSpacing: '0.06em', textShadow: '0 1px 4px rgba(10,31,26,0.9)',
                      }}>{pin.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* "Zoom to Dubai" CTA on UAE map */}
              {mapMode === 'uae' && (
                <button
                  onClick={() => switchMode('dubai')}
                  style={{
                    position: 'absolute', left: '50%', top: '38%', transform: 'translate(-50%, -50%)',
                    padding: '8px 18px', borderRadius: 6,
                    background: 'rgba(201,168,124,0.15)', border: '1px solid rgba(201,168,124,0.35)',
                    color: '#C9A87C', fontSize: 10, fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 600, letterSpacing: '0.04em', cursor: 'pointer',
                    backdropFilter: 'blur(4px)', transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,168,124,0.25)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(201,168,124,0.15)' }}
                >ZOOM TO DUBAI</button>
              )}
            </div>

            {/* Zoom controls */}
            <div style={{
              position: 'absolute', bottom: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 4,
              background: 'rgba(10,31,26,0.90)', backdropFilter: 'blur(8px)', borderRadius: 6,
              border: '1px solid rgba(90,122,114,0.20)', padding: 4, zIndex: 20,
            }}>
              <button onClick={zoomIn} title="Zoom In" style={{
                width: 32, height: 32, borderRadius: 4, border: '1px solid rgba(90,122,114,0.20)',
                background: 'transparent', color: '#E8DDD0', fontSize: 18, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>+</button>
              <button onClick={resetView} title="Reset" style={{
                width: 32, height: 32, borderRadius: 4, border: '1px solid rgba(90,122,114,0.20)',
                background: 'transparent', color: '#E8DDD0', fontSize: 10, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk',
              }}>{Math.round(zoomLevel * 100)}%</button>
              <button onClick={zoomOut} title="Zoom Out" style={{
                width: 32, height: 32, borderRadius: 4, border: '1px solid rgba(90,122,114,0.20)',
                background: 'transparent', color: '#E8DDD0', fontSize: 18, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>-</button>
            </div>

            {/* Back to UAE button (Dubai mode) */}
            {mapMode === 'dubai' && (
              <button
                onClick={() => switchMode('uae')}
                style={{
                  position: 'absolute', top: 16, right: 60, zIndex: 20,
                  padding: '8px 16px', borderRadius: 6,
                  background: 'rgba(10,31,26,0.85)', border: '1px solid rgba(201,168,124,0.30)',
                  color: '#C9A87C', fontSize: 10, fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600, letterSpacing: '0.04em', cursor: 'pointer',
                  backdropFilter: 'blur(8px)', transition: 'all 0.25s ease',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,168,124,0.15)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(10,31,26,0.85)' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A87C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                BACK TO UAE MAP
              </button>
            )}

            {/* Corridor info card (Dubai mode) */}
            {mapMode === 'dubai' && activeInfo && (
              <div className="glass-card" style={{
                position: 'absolute', top: 16, left: 16, padding: '20px 24px', minWidth: 190,
                pointerEvents: 'none', zIndex: 20, maxWidth: 240,
              }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, fontWeight: 600,
                  color: activeInfo.color, marginBottom: 2,
                }}>{activeInfo.name}</div>
                <div className="font-caption" style={{ color: '#5A7A72', fontSize: 10, marginBottom: 12 }}>{activeInfo.tag}</div>
                {activeInfo.stats.map((s, j) => (
                  <div key={j} style={{ marginBottom: 6 }}>
                    <div style={{ color: '#5A7A72', fontSize: 9 }}>{s.label}</div>
                    <div style={{ color: '#D4F1F4', fontSize: 13, fontWeight: 500 }}>{s.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Source citation */}
            <div style={{
              position: 'absolute', bottom: 12, left: 12, padding: '6px 10px',
              background: 'rgba(10,31,26,0.80)', backdropFilter: 'blur(4px)',
              border: '1px solid rgba(90,122,114,0.12)', borderRadius: 4, zIndex: 20,
            }}>
              <span style={{ color: 'rgba(232,221,208,0.35)', fontSize: 9, fontFamily: 'Inter, sans-serif' }}>
                {mapMode === 'uae' ? 'UAE emirate boundaries' : 'Dubai districts & corridors'}
              </span>
            </div>

            <style>{`
              @keyframes mapPulse {
                0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
                50% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
              }
            `}</style>
          </div>
        </ScrollReveal>

        {/* Corridor summary cards */}
        <ScrollReveal delay={0.3}>
          <div className="corridor-summary-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, maxWidth: 900,
            margin: '32px auto 0',
          }}>
            {Object.values(corridorData).map((c, i) => (
              <div key={i} className="glass-card" style={{
                padding: '16px', textAlign: 'center', borderTop: `2px solid ${c.color}`, transition: 'all 0.3s ease',
              }}>
                <div style={{
                  color: c.color, fontSize: 11, fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600, marginBottom: 4, letterSpacing: '0.04em',
                }}>{c.name}</div>
                <div style={{ color: '#D4F1F4', fontSize: 13, fontWeight: 500 }}>{c.stats[0].value}</div>
                <div style={{ color: '#5A7A72', fontSize: 10, marginTop: 2 }}>{c.stats[1].value} yield</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <p className="font-body" style={{
          color: 'rgba(90, 122, 114, 0.5)', fontSize: 11, textAlign: 'center', marginTop: 16, fontStyle: 'italic',
        }}>
          Map data sourced from CIA World Factbook &amp; DXB Interact. All boundaries approximate for illustrative purposes.
        </p>
      </div>
    </section>
  )
}