import Globe3D from '../components/Globe3D'
import ScrollReveal from '../components/ScrollReveal'

const infrastructureStats = [
  {
    number: '18',
    label: 'METRO GOLD LINE STATIONS',
    sublabel: 'AED 34B · Completion 2032',
  },
  {
    number: 'Q2 2026',
    label: 'ETIHAD RAIL LAUNCH',
    sublabel: 'Dubai-Abu Dhabi · 57 mins',
  },
  {
    number: '4M → 5.8M',
    label: 'POPULATION BY 2040',
    sublabel: '1.8M new residents need homes',
  },
]

const dubai2040Facts = [
  { value: '80%', label: 'Daily Needs Within 20 Minutes', desc: 'The 20-minute city: residents can reach 80% of daily services within 20 min via walking, cycling, or transit' },
  { value: '5', label: 'Urban Centers', desc: 'Dubai 2040 concentrates 60% of population into 5 urban centres: Deira/Bur Dubai, Downtown/Business Bay, Dubai Marina/JBR, Expo City, Dubai Silicon Oasis' },
  { value: '60%', label: 'Protected Nature Reserve', desc: 'Over 60% of the emirate designated as nature reserve — balancing urban growth with environmental preservation' },
  { value: '400%', label: 'Public Beach Expansion', desc: 'Public beach areas to increase by 400%, with total green and leisure areas doubling by 2040' },
  { value: 'AED 65B', label: 'National Housing Investment', desc: '17,000 new affordable housing units. Government-backed policy to meet residential demand across income levels' },
  { value: '+134%', label: 'Hotel & Tourism Land Allocation', desc: 'Tourism land area to increase 134%, commercial land to 168 sq km — driving long-term demand for serviced apartments and short-term rentals' },
]

export default function InfrastructureSection() {
  return (
    <section
      id="infrastructure"
      style={{
        position: 'relative',
        zIndex: 2,
        background: 'radial-gradient(ellipse at center, #0F2A23 0%, #0A1F1A 70%)',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="font-caption" style={{ color: '#C9A87C', display: 'block', marginBottom: 16, fontSize: 12 }}>
              INFRASTRUCTURE CONVERGENCE
            </span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: '#C9A87C', marginBottom: 12 }}>
              WHY THESE CORRIDORS?
            </h2>
            <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.6)', fontSize: 16, maxWidth: 640, margin: '0 auto' }}>
              Dubai 2040 Urban Master Plan: Five urban centres, 20-minute city concept, AED 65 billion in housing infrastructure.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Key Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 32,
            textAlign: 'center',
            marginBottom: 80,
          }}
        >
          {infrastructureStats.map((stat, i) => (
            <ScrollReveal key={i} delay={0.2 + i * 0.12}>
              <div>
                <div
                  className="font-heading"
                  style={{
                    fontSize: 'clamp(32px, 4vw, 48px)',
                    color: '#D4F1F4',
                    marginBottom: 8,
                  }}
                >
                  {stat.number}
                </div>
                <div className="font-caption" style={{ color: '#C9A87C', marginBottom: 4, fontSize: 11 }}>
                  {stat.label}
                </div>
                <div className="font-caption" style={{ color: '#5A7A72', fontSize: 11 }}>
                  {stat.sublabel}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Revolving Globe */}
        <ScrollReveal delay={0.3}>
          <div style={{ marginBottom: 80, display: 'flex', justifyContent: 'center' }}>
            <Globe3D />
          </div>
        </ScrollReveal>

        {/* Dubai 2040 Facts */}
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="font-caption" style={{ color: '#C9A87C', display: 'block', marginBottom: 8, fontSize: 11 }}>
              DUBAI 2040 URBAN MASTER PLAN
            </span>
            <h3 className="font-heading" style={{ fontSize: 'clamp(20px, 3vw, 32px)', color: '#E8DDD0' }}>
              GOVERNMENT <span style={{ color: '#C9A87C' }}>STRATEGY</span> & FACTS
            </h3>
          </div>
        </ScrollReveal>

        <div
          className="dubai2040-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: 20,
            marginBottom: 40,
            alignItems: 'stretch',
          }}
        >
          {dubai2040Facts.map((fact, i) => (
            <ScrollReveal key={i} delay={0.1 + i * 0.08}>
              <div
                className="glass-card dubai2040-card"
                style={{
                  padding: '24px',
                  borderLeft: '3px solid #C9A87C',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  minHeight: 0,
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(24px, 3vw, 32px)',
                    fontWeight: 700,
                    color: '#D4F1F4',
                    fontFamily: 'Space Grotesk, sans-serif',
                    marginBottom: 4,
                    lineHeight: 1,
                  }}
                >
                  {fact.value}
                </div>
                <div
                  style={{
                    color: '#C9A87C',
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: 'Space Grotesk, sans-serif',
                    marginBottom: 8,
                    letterSpacing: '0.02em',
                  }}
                >
                  {fact.label}
                </div>
                <p
                  className="font-body"
                  style={{
                    color: 'rgba(232, 221, 208, 0.55)',
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  {fact.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Source */}
        <p
          className="font-body"
          style={{
            color: 'rgba(90, 122, 114, 0.5)',
            fontSize: 11,
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          Source: Dubai 2040 Urban Master Plan, Government of Dubai. Approved December 2022.
        </p>
      </div>
    </section>
  )
}
