import ScrollReveal from '../components/ScrollReveal'
import StatCounter from '../components/StatCounter'

const founderStats = [
  { value: 2, suffix: '', label: 'DECADES INSTITUTIONAL FINANCE' },
  { value: 3, suffix: '', label: 'COUNTRIES — OWN-MONEY INVESTOR' },
  { value: 3, suffix: '', label: 'EMIRATES — ALLOCATION COVERAGE' },
  { value: 100, suffix: '%', label: 'STEWARD OF CAPITAL' },
]

export default function FounderStatsSection() {
  return (
    <section
      id="founder-stats"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#F6F1E7',
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
                  color: '#0F6B62',
                  fontFamily: 'Space Grotesk, sans-serif',
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                <StatCounter end={stat.value} duration={2.5} />
                <span style={{ fontSize: '0.6em' }}>{stat.suffix}</span>
              </div>
              <div className="font-caption" style={{ color: '#7D8A86', fontSize: 11 }}>
                {stat.label}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <p className="font-caption" style={{ textAlign: 'center', color: 'rgba(125, 138, 134, 0.75)', fontSize: 11, marginTop: 40, letterSpacing: '0.12em' }}>
        LICENSED ADVISOR — STRADA UAE · BRN 94316 · DLD-VERIFIED RESEARCH
      </p>
    </section>
  )
}