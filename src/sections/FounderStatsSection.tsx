import ScrollReveal from '../components/ScrollReveal'
import StatCounter from '../components/StatCounter'

const founderStats = [
  { value: 20, suffix: '+', label: 'YEARS CAREER EXPERIENCE' },
  { value: 35, suffix: '', label: 'YEARS IN DUBAI' },
  { value: 3, suffix: '', label: 'COUNTRIES — PORTFOLIO' },
  { value: 100, suffix: '%', label: 'CLIENT-FIRST' },
]

export default function FounderStatsSection() {
  return (
    <section
      id="founder-stats"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#0A1F1A',
        padding: '80px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 32,
          textAlign: 'center',
        }}
      >
        {founderStats.map((stat, i) => (
          <ScrollReveal key={i} delay={i * 0.12}>
            <div>
              <div
                style={{
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: 700,
                  color: '#C9A87C',
                  fontFamily: 'Space Grotesk, sans-serif',
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                <StatCounter end={stat.value} duration={2.5} />
                <span style={{ fontSize: '0.6em' }}>{stat.suffix}</span>
              </div>
              <div className="font-caption" style={{ color: '#5A7A72', fontSize: 11 }}>
                {stat.label}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}