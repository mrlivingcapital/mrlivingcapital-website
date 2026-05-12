import Globe3D from '../components/Globe3D'
import ScrollReveal from '../components/ScrollReveal'

const infrastructureStats = [
  {
    number: 'AED 128B',
    label: 'AL MAKTOUM AIRPORT EXPANSION',
    sublabel: 'Dubai · 5x capacity · 750K jobs · 2030',
  },
  {
    number: 'AED 12B',
    label: 'WYNN AL MARJAN RESORT',
    sublabel: 'RAK · First GCC gaming · 2027 · 2.5M visitors',
  },
  {
    number: 'AED 25B',
    label: 'ALDAR DEVELOPMENT PIPELINE',
    sublabel: 'Abu Dhabi · 15,000+ units · 2028',
  },
]

const uaeInfrastructureFacts = [
  {
    emirate: 'DUBAI',
    facts: [
      { value: '80%', label: 'Daily Needs Within 20 Minutes', desc: 'Dubai 2040 20-minute city: residents reach 80% of daily services within 20 min via walking, cycling, or transit' },
      { value: '5', label: 'Urban Centers', desc: '60% of population concentrated into 5 urban centres: Deira/Bur Dubai, Downtown/Business Bay, Dubai Marina/JBR, Expo City, Dubai Silicon Oasis' },
      { value: '60%', label: 'Protected Nature Reserve', desc: 'Over 60% of the emirate designated as nature reserve — balancing urban growth with environmental preservation' },
      { value: 'AED 65B', label: 'National Housing Investment', desc: '17,000 new affordable housing units. Government-backed policy to meet residential demand across income levels' },
    ]
  },
  {
    emirate: 'ABU DHABI',
    facts: [
      { value: 'AED 25B', label: 'Aldar Development Pipeline', desc: '15,000+ new residential units across master-planned communities including Saadiyat, Yas Island, and Al Reem Island by 2028' },
      { value: '3 Museums', label: 'Saadiyat Cultural District', desc: 'Guggenheim Abu Dhabi, Zayed National Museum, and Natural History Museum opening 2025-2027 — attracting 5M+ cultural tourists annually' },
      { value: '$1.1T', label: 'Non-Oil GDP Target by 2030', desc: 'Abu Dhabi Economic Vision 2030: diversification away from oil with massive investment in real estate, tourism, and financial services' },
      { value: '45M', label: 'Zayed International Airport', desc: 'Expanded terminal capacity handling 45 million passengers annually — direct boost to short-term rental demand' },
    ]
  },
  {
    emirate: 'RAK',
    facts: [
      { value: 'AED 12B', label: 'Wynn Al Marjan Resort', desc: 'First integrated gaming resort in the GCC, opening 2027. 1,500+ rooms, 24/7 gaming, entertainment venues — projected to attract 2.5M visitors annually' },
      { value: '4.5 KM', label: 'Al Marjan Island Beachfront', desc: 'Master-planned island with 4.5km of beachfront, luxury hotels, residential towers, and marina — the premier tourism destination in Northern Emirates' },
      { value: '+50%', label: 'Population Growth by 2030', desc: 'RAK population growing from 400K to 600K — 50% increase driving housing demand across all segments' },
      { value: '7-9%', label: 'Highest Gross Yields in UAE', desc: 'Lowest entry point (AED 500-900/sqft) combined with highest rental yields makes RAK the purest risk-adjusted play in the UAE' },
    ]
  },
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
              INFRASTRUCTURE & GOVERNMENT STRATEGY
            </span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: '#C9A87C', marginBottom: 12 }}>
              WHY <span style={{ color: '#E8DDD0' }}>THESE</span> CORRIDORS?
            </h2>
            <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.6)', fontSize: 16, maxWidth: 700, margin: '0 auto' }}>
              Our allocation strategy is directly tied to sovereign-backed infrastructure across all three emirates: Dubai 2040, Abu Dhabi Economic Vision 2030, and Ras Al Khaimah's Wynn Al Marjan. Government projects drive capital appreciation — not market speculation.
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

        {/* UAE Infrastructure Facts — All 3 Emirates */}
        {uaeInfrastructureFacts.map((emirateData, emirateIndex) => (
          <div key={emirateIndex}>
            <ScrollReveal>
              <div style={{ marginTop: emirateIndex > 0 ? 48 : 0, marginBottom: 20 }}>
                <span
                  style={{
                    color: '#C9A87C',
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: 'Space Grotesk, sans-serif',
                    letterSpacing: '0.12em',
                  }}
                >
                  {emirateData.emirate}
                </span>
              </div>
            </ScrollReveal>
            <div
              className="dubai2040-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 20,
                marginBottom: 24,
                alignItems: 'stretch',
              }}
            >
              {emirateData.facts.map((fact, i) => (
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
                        fontSize: 'clamp(22px, 2.5vw, 28px)',
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
          </div>
        ))}

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
          Sources: Dubai 2040 Urban Master Plan (Govt of Dubai), Abu Dhabi Economic Vision 2030 (AD Govt), RAK DLD, Aldar Investor Relations, Wynn Resorts.
        </p>
      </div>
    </section>
  )
}
