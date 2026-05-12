import ScrollReveal from '../components/ScrollReveal'
import DataCanvas from '../components/DataCanvas'
import { useState, useEffect } from 'react'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

const corridorLabels = [
  { name: 'DUBAI', color: '#C9A87C' },
  { name: 'ABU DHABI', color: '#D4F1F4' },
  { name: 'RAS AL KHAIMAH', color: '#5A7A72' },
]

export default function ExplorerSection() {
  const isMobile = useIsMobile()
  return (
    <section
      id="explorer"
      style={{
        position: 'relative',
        zIndex: 2,
        height: '100vh',
        minHeight: 600,
        overflow: 'hidden',
      }}
    >
      <DataCanvas />

      {/* Overlay Content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 2,
          padding: '0 24px',
        }}
      >
        <ScrollReveal>
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              color: '#E8DDD0',
              textAlign: 'center',
              marginBottom: 16,
              textShadow: '0 2px 20px rgba(10, 31, 26, 0.8)',
            }}
          >
            LET&apos;S TALK PRIVATELY
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p
            className="font-body"
            style={{
              color: 'rgba(232, 221, 208, 0.6)',
              fontSize: 16,
              textAlign: 'center',
              maxWidth: 400,
              marginBottom: 48,
              textShadow: '0 1px 10px rgba(10, 31, 26, 0.8)',
            }}
          >
            Tap and drag to trace investment pathways. Tap to reveal opportunity zones. Or reach out directly below.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px 32px',
              justifyContent: 'center',
            }}
          >
            {corridorLabels.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: c.color,
                    display: 'inline-block',
                  }}
                />
                <span className="font-caption" style={{ color: '#5A7A72', fontSize: 12 }}>
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Mobile CTA */}
        {isMobile && (
          <ScrollReveal delay={0.6}>
            <a
              href="https://wa.me/971585899112"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 32px',
                background: '#C9A87C',
                color: '#0A1F1A',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.08em',
                borderRadius: 4,
                textDecoration: 'none',
                marginTop: 32,
                pointerEvents: 'auto',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WHATSAPP US
            </a>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}