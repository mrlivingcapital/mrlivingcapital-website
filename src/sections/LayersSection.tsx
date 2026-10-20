import { useEffect, useRef, useState } from 'react'

const LAYERS = [
  { n: '01', title: 'Market & Transactions', desc: 'Historical data, pricing, activity.' },
  { n: '02', title: 'Infrastructure', desc: 'Transport, utilities, development.' },
  { n: '03', title: 'Districts & Communities', desc: 'Demand, sentiment, growth.' },
  { n: '04', title: 'Capital & Risk', desc: 'Liquidity, sentiment, scenarios.' },
  { n: '05', title: 'Property Intelligence', desc: 'Unit level, value, yield.' },
]

/**
 * THE 5 LAYERS: signature scroll section.
 * A sticky dark stage where five glass plates separate from a single stack
 * as the visitor scrolls, mirroring the MRLC intelligence model:
 * one market, five connected layers, no listing-only view.
 */
export default function LayersSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = outerRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
        setProgress(p)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', checkMobile)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Spread curve: ease out so plates snap apart early then settle
  const eased = 1 - Math.pow(1 - progress, 2)
  const activeIdx = Math.min(LAYERS.length - 1, Math.floor(progress * LAYERS.length))

  const spread = isMobile ? 56 : 92
  const plateW = isMobile ? 'min(300px, 78vw)' : 'min(480px, 44vw)'
  const deckOffset = isMobile ? 9 : 14

  return (
    <section id="intelligence-layers" ref={outerRef} style={{ position: 'relative', height: isMobile ? '260vh' : '340vh', zIndex: 2 }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: 'linear-gradient(160deg, #0D2723 0%, #123B37 55%, #0B2925 100%)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* ambient glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 72% 50%, rgba(87, 169, 159, 0.10) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 1280,
            margin: '0 auto',
            padding: isMobile ? '80px 20px' : '0 48px',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 32 : 64,
            alignItems: 'center',
          }}
        >
          {/* Left: copy + layer list */}
          <div>
            <div className="font-caption" style={{ color: '#57A99F', fontSize: 11, letterSpacing: '0.22em', marginBottom: 18 }}>
              THE 5 LAYERS
            </div>
            <h2
              className="font-display"
              style={{
                color: '#F6F1E7',
                fontSize: isMobile ? 'clamp(28px, 7.5vw, 38px)' : 'clamp(34px, 4vw, 54px)',
                lineHeight: 1.12,
                fontWeight: 500,
                margin: '0 0 18px',
              }}
            >
              A complete view.
              <br />
              <span style={{ color: '#57A99F' }}>Not just a listing.</span>
            </h2>
            <p className="font-body" style={{ color: 'rgba(246, 241, 231, 0.62)', fontSize: 15, lineHeight: 1.7, maxWidth: 440, margin: '0 0 32px' }}>
              Our intelligence connects five layers of data to give you a clearer picture, deeper insight, and better investment decisions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {LAYERS.map((l, i) => {
                const active = i === activeIdx
                return (
                  <div
                    key={l.n}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 16,
                      padding: '11px 0',
                      borderBottom: '1px solid rgba(87, 169, 159, 0.14)',
                      transition: 'opacity 0.4s ease',
                      opacity: active ? 1 : 0.45,
                    }}
                  >
                    <span className="font-caption" style={{ color: active ? '#B08D4A' : '#57A99F', fontSize: 11, letterSpacing: '0.14em', minWidth: 24 }}>
                      {l.n}
                    </span>
                    <div>
                      <div className="font-nav" style={{ color: '#F6F1E7', fontSize: isMobile ? 14 : 16, letterSpacing: '0.04em' }}>
                        {l.title}
                      </div>
                      <div className="font-body" style={{ color: 'rgba(246, 241, 231, 0.5)', fontSize: 12.5, marginTop: 2 }}>
                        {l.desc}
                      </div>
                    </div>
                    <span
                      style={{
                        marginLeft: 'auto',
                        width: 28,
                        height: 1,
                        background: active ? '#B08D4A' : 'rgba(87, 169, 159, 0.25)',
                        transition: 'background 0.4s ease',
                        alignSelf: 'center',
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: the separating stack */}
          <div
            style={{
              position: 'relative',
              height: isMobile ? 340 : 560,
              perspective: 1200,
              perspectiveOrigin: '50% 45%',
            }}
          >
            {LAYERS.map((l, i) => {
              const center = i - (LAYERS.length - 1) / 2
              const y = center * deckOffset + center * spread * eased
              const z = -Math.abs(center) * 60 * (1 - eased) + center * 40 * eased
              const rotX = 52 - eased * 18
              const opacity = 0.55 + eased * 0.45
              return (
                <div
                  key={l.n}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: plateW,
                    aspectRatio: '16 / 10',
                    transform: `translate(-50%, -50%) translateY(${y}px) translateZ(${z}px) rotateX(${rotX}deg)`,
                    transformStyle: 'preserve-3d',
                    opacity,
                    transition: 'opacity 0.3s ease',
                    border: `1px solid ${i === activeIdx ? 'rgba(176, 141, 74, 0.7)' : 'rgba(87, 169, 159, 0.45)'}`,
                    borderRadius: 8,
                    background: 'linear-gradient(160deg, rgba(13, 39, 35, 0.72) 0%, rgba(18, 59, 55, 0.6) 100%)',
                    backdropFilter: 'blur(2px)',
                    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
                    overflow: 'hidden',
                  }}
                >
                  {/* grid lines */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage:
                        'repeating-linear-gradient(0deg, rgba(87, 169, 159, 0.16) 0 1px, transparent 1px 28px), repeating-linear-gradient(90deg, rgba(87, 169, 159, 0.16) 0 1px, transparent 1px 28px)',
                    }}
                  />
                  {/* city image on the middle plate */}
                  {i === 2 && (
                    <img
                      src="/images/living-map-intelligence.jpg"
                      alt="Dubai intelligence layer, aerial view with data overlays"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.72 }}
                    />
                  )}
                  {/* plate label */}
                  <div
                    className="font-caption"
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 12,
                      fontSize: 10,
                      letterSpacing: '0.18em',
                      color: i === activeIdx ? '#B08D4A' : '#57A99F',
                      background: 'rgba(11, 41, 37, 0.82)',
                      border: `1px solid ${i === activeIdx ? 'rgba(176, 141, 74, 0.55)' : 'rgba(87, 169, 159, 0.4)'}`,
                      padding: '3px 9px',
                      borderRadius: 3,
                    }}
                  >
                    LAYER {l.n} · {l.title.toUpperCase()}
                  </div>
                  {/* corner ticks */}
                  <div style={{ position: 'absolute', bottom: 8, right: 12, display: 'flex', gap: 3 }}>
                    {[0, 1, 2].map((d) => (
                      <span key={d} style={{ width: 14, height: 2, background: i === activeIdx ? '#B08D4A' : 'rgba(87, 169, 159, 0.5)', opacity: 1 - d * 0.3 }} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* progress rail */}
        <div style={{ position: 'absolute', right: isMobile ? 12 : 28, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {LAYERS.map((l, i) => (
            <span
              key={l.n}
              style={{
                width: 3,
                height: i === activeIdx ? 26 : 10,
                borderRadius: 2,
                background: i === activeIdx ? '#B08D4A' : 'rgba(87, 169, 159, 0.35)',
                transition: 'all 0.35s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
