import ScrollReveal from '../components/ScrollReveal'
import DataCanvas from '../components/DataCanvas'

const corridorLabels = [
  { name: 'DUBAI SOUTH', color: '#C9A87C' },
  { name: 'JVC', color: '#D4F1F4' },
  { name: 'MBRC', color: '#5A7A72' },
  { name: 'MEYDAN', color: '#C9A87C' },
]

export default function ExplorerSection() {
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
            EXPLORE THE CORRIDORS
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
            Move your cursor to trace investment pathways. Click to reveal opportunity zones.
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
      </div>
    </section>
  )
}