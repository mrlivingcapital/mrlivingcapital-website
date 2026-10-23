import { useState } from 'react'

const HOTSPOTS = [
  { id: 'infra', x: 30, y: 30, label: 'INFRASTRUCTURE', value: '+12% Value Uplift', note: 'Metro expansion, road corridors, utility upgrades priced into district growth.' },
  { id: 'trans', x: 62, y: 38, label: 'TRANSACTIONS', value: 'AED 8.4M Avg Price', note: '+18% year on year. Volume and velocity tell us where the money actually goes.' },
  { id: 'flows', x: 24, y: 55, label: 'CAPITAL FLOWS', value: '+25% Capital Inflow', note: 'Quarter on quarter. Funds and family offices rotating into prime corridors.' },
  { id: 'dist', x: 55, y: 66, label: 'DISTRICTS', value: 'Dubai Marina · High Growth', note: 'Supply pipeline, absorption rates and rental depth scored district by district.' },
  { id: 'risk', x: 44, y: 84, label: 'RISK', value: 'Stable · Low Volatility', note: 'Market, political and environmental scenarios stress tested before we proceed.' },
]

/**
 * THE LIVING MAP: the intelligence layer made visible.
 * Full-bleed dark stage with the Dubai intelligence dashboard and
 * interactive data hotspots. Hover or tap a node to read the layer.
 */
export default function LivingMapSection() {
  const [active, setActive] = useState<string | null>('trans')
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const activeSpot = HOTSPOTS.find((h) => h.id === active) || null

  return (
    <section id="living-map" style={{ position: 'relative', zIndex: 2, background: '#0A211E', padding: 0 }}>
      <style>{`
        @keyframes mrlc-pulse {
          0% { box-shadow: 0 0 0 0 rgba(87, 169, 159, 0.5); }
          70% { box-shadow: 0 0 0 14px rgba(87, 169, 159, 0); }
          100% { box-shadow: 0 0 0 0 rgba(87, 169, 159, 0); }
        }
        @keyframes mrlc-pulse-gold {
          0% { box-shadow: 0 0 0 0 rgba(176, 141, 74, 0.5); }
          70% { box-shadow: 0 0 0 14px rgba(176, 141, 74, 0); }
          100% { box-shadow: 0 0 0 0 rgba(176, 141, 74, 0); }
        }
      `}</style>

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: isMobile ? '80px 20px' : '110px 48px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '0.9fr 1.1fr', gap: isMobile ? 36 : 64, alignItems: 'center' }}>
        {/* Copy */}
        <div>
          <div className="font-caption" style={{ color: '#57A99F', fontSize: 11, letterSpacing: '0.22em', marginBottom: 18 }}>
            THE LIVING MAP
          </div>
          <h2 className="font-display" style={{ color: '#F6F1E7', fontSize: isMobile ? 'clamp(28px, 7vw, 36px)' : 'clamp(34px, 3.6vw, 50px)', lineHeight: 1.14, fontWeight: 500, margin: '0 0 16px' }}>
            See the city.
            <br />
            <span style={{ color: '#57A99F' }}>See the connections.</span>
          </h2>
          <p className="font-body" style={{ color: 'rgba(246, 241, 231, 0.62)', fontSize: 15, lineHeight: 1.7, maxWidth: 440, margin: '0 0 28px' }}>
            A dynamic layer of property, infrastructure, transactions, capital and risk, all connected so you can make smarter decisions. Touch the nodes to read each layer.
          </p>

          {/* Active hotspot readout */}
          <div style={{ minHeight: 108, padding: '18px 20px', borderRadius: 10, border: '1px solid rgba(87, 169, 159, 0.25)', background: 'rgba(13, 39, 35, 0.6)', transition: 'border-color 0.3s ease' }}>
            {activeSpot ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span className="font-caption" style={{ color: '#B08D4A', fontSize: 10, letterSpacing: '0.18em' }}>{activeSpot.label}</span>
                  <span style={{ flex: 1, height: 1, background: 'rgba(87, 169, 159, 0.2)' }} />
                  <span className="font-nav" style={{ color: '#57A99F', fontSize: 13 }}>{activeSpot.value}</span>
                </div>
                <p className="font-body" style={{ color: 'rgba(246, 241, 231, 0.65)', fontSize: 13, lineHeight: 1.65, margin: 0 }}>{activeSpot.note}</p>
              </>
            ) : (
              <p className="font-body" style={{ color: 'rgba(246, 241, 231, 0.45)', fontSize: 13, margin: 0 }}>Select a node on the map to read the layer.</p>
            )}
          </div>

          <div style={{ marginTop: 28 }}>
            <a
              href="#inquiry"
              className="font-caption"
              style={{ display: 'inline-block', color: '#0A211E', background: '#57A99F', fontSize: 11, letterSpacing: '0.14em', padding: '13px 24px', borderRadius: 5, textDecoration: 'none', fontWeight: 600 }}
            >
              EXPLORE THE FULL MAP →
            </a>
          </div>
        </div>

        {/* Map stage with hotspots */}
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(87, 169, 159, 0.28)', boxShadow: '0 34px 90px rgba(0, 0, 0, 0.45)' }}>
          <img src="/images/living-map-dashboard.jpg" alt="Dubai living map with connected intelligence layers" style={{ display: 'block', width: '100%', height: 'auto' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10, 33, 30, 0.05) 0%, transparent 30%, transparent 70%, rgba(10, 33, 30, 0.35) 100%)', pointerEvents: 'none' }} />
          {HOTSPOTS.map((h) => (
            <button
              key={h.id}
              type="button"
              aria-label={`${h.label}: ${h.value}`}
              onClick={() => setActive(h.id)}
              onMouseEnter={() => setActive(h.id)}
              style={{
                position: 'absolute',
                left: `${h.x}%`,
                top: `${h.y}%`,
                transform: 'translate(-50%, -50%)',
                width: 16,
                height: 16,
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                background: active === h.id ? '#B08D4A' : '#57A99F',
                animation: `${active === h.id ? 'mrlc-pulse-gold' : 'mrlc-pulse'} 2.4s infinite`,
                outline: `3px solid ${active === h.id ? 'rgba(176, 141, 74, 0.25)' : 'rgba(87, 169, 159, 0.2)'}`,
              }}
            />
          ))}
          <span className="font-caption" style={{ position: 'absolute', bottom: 10, right: 14, fontSize: 9, letterSpacing: '0.16em', color: 'rgba(246, 241, 231, 0.55)', background: 'rgba(10, 33, 30, 0.7)', padding: '3px 8px', borderRadius: 3 }}>
            DUBAI · 25.2048° N, 55.2708° E
          </span>
        </div>
      </div>
    </section>
  )
}
