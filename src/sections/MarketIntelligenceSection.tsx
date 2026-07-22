import ScrollReveal from '../components/ScrollReveal'
import StatCounter from '../components/StatCounter'

const stats = [
  {
    value: 252,
    prefix: 'AED ',
    suffix: 'B',
    label: 'Q1 2026 Total Transactions',
    source: 'UAE Land Departments — Q1 2026',
  },
  {
    value: 73,
    suffix: '%',
    label: 'Off-Plan Market Share',
    source: 'DXB Interact / DLD — Q1 2026',
  },
  {
    value: 60303,
    suffix: '',
    label: 'Sales Transactions Q1',
    source: 'UAE Land Departments — Q1 2026',
  },
  {
    value: 26,
    prefix: '+', suffix: '%',
    label: 'Foreign Investment Growth',
    source: 'Dubai Land Department — Q1 2026 YoY',
  },
  {
    value: 48448,
    suffix: '',
    label: 'Total Investors',
    source: 'UAE Land Departments — Q1 2026',
  },
]

const offPlanEvolution = [
  { year: '2021', share: 42 },
  { year: '2024', share: 55 },
  { year: '2025', share: 65 },
  { year: 'Q1 2026', share: 73 },
]

const topDevelopers = [
  { rank: '01', name: 'Emaar Properties', units: '18,500+', color: '#0F6B62' },
  { rank: '02', name: 'Damac', units: '12,300+', color: '#2E8A80' },
  { rank: '03', name: 'Sobha Realty', units: '9,800+', color: '#7D8A86' },
  { rank: '04', name: 'Azizi Developments', units: '7,200+', color: '#93A39F' },
  { rank: '05', name: 'Binghatti', units: '6,100+', color: '#0D5F57' },
  { rank: '06', name: 'Ellington Properties', units: '4,500+', color: '#85A19B' },
  { rank: '07', name: 'MAG Lifestyle', units: '3,800+', color: '#93A39F' },
  { rank: '08', name: 'Nshama', units: '3,200+', color: '#77958D' },
  { rank: '09', name: 'Dubai Properties', units: '2,900+', color: '#57A99F' },
  { rank: '10', name: 'Select Group', units: '2,400+', color: '#5F9087' },
  { rank: '11', name: 'Others (80+ developers)', units: '295,300+', color: '#3A5A50' },
]

const totalDeveloperUnits = '366,000+'

const propertyTypeSplit = [
  { pct: 80, label: 'Apartments', desc: 'Studios, 1–4 BR, penthouses', note: 'Primary market driver' },
  { pct: 15, label: 'Townhouses', desc: '2–4 BR, gated communities', note: 'Family-focused growth' },
  { pct: 5, label: 'Villas', desc: 'Luxury standalone estates', note: 'Premium ultra-HNW segment' },
]

export default function MarketIntelligenceSection() {
  return (
    <section
      id="market-intelligence"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#F6F1E7',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="font-caption" style={{ color: '#0F6B62', display: 'block', marginBottom: 16, fontSize: 12 }}>
              MARKET INTELLIGENCE
            </span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 56px)', color: '#5A6662', marginBottom: 16 }}>
              THE NUMBERS BEHIND <span style={{ color: '#0F6B62' }}>THE UAE 2026</span>
            </h2>
            <p className="font-body" style={{ color: 'rgba(90, 102, 98, 0.6)', fontSize: 16, maxWidth: 700, margin: '0 auto' }}>
              Dubai leads with AED 252B in Q1 transactions. Abu Dhabi accelerates with AED 71B in 2025 and Saadiyat Cultural District. Ras Al Khaimah delivers 7-9% yields — the highest in the UAE. Off-plan now dominates 70–73% of all transactions. This is a structural shift across all three emirates.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 20,
            marginBottom: 80,
            alignItems: 'stretch',
          }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                className="glass-card"
                style={{ padding: '28px 16px', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 140 }}
              >
                <div style={{ color: '#0F6B62', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 6, lineHeight: 1 }}>
                  {stat.prefix && <span style={{ fontSize: '0.6em' }}>{stat.prefix}</span>}
                  <StatCounter end={stat.value} decimals={stat.value < 100 ? 0 : 0} duration={2.5} />
                  {stat.suffix && <span style={{ fontSize: '0.6em' }}>{stat.suffix}</span>}
                </div>
                <div className="font-caption" style={{ color: '#5A6662', fontSize: 11, marginBottom: 4 }}>{stat.label}</div>
                <div style={{ color: '#7D8A86', fontSize: 10 }}>{stat.source}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Off-Plan Market Share Evolution */}
        <ScrollReveal>
          <div style={{ marginBottom: 80 }}>
            <h3 className="font-heading" style={{ fontSize: 20, color: '#5A6662', textAlign: 'center', marginBottom: 32 }}>
              OFF-PLAN MARKET SHARE <span style={{ color: '#0F6B62' }}>EVOLUTION</span>
            </h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 24, height: 200 }}>
              {offPlanEvolution.map((item, i) => {
                const colors = ['rgba(125, 138, 134, 0.5)', 'rgba(125, 138, 134, 0.6)', 'rgba(15, 107, 98, 0.45)', 'rgba(15, 107, 98, 0.85)']
                return (
                  <div key={i} style={{ textAlign: 'center', flex: 1, maxWidth: 160 }}>
                    <div style={{ color: '#0F6B62', fontSize: 24, fontWeight: 700, fontFamily: 'Space Grotesk', marginBottom: 8 }}>
                      <StatCounter end={item.share} suffix="%" duration={1.5} />
                    </div>
                    <div
                      style={{
                        height: `${item.share * 2}px`,
                        background: colors[i],
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 1.5s ease',
                        maxHeight: 146,
                      }}
                    />
                    <div className="font-caption" style={{ color: '#7D8A86', fontSize: 11, marginTop: 8 }}>{item.year}</div>
                  </div>
                )
              })}
            </div>
            <p className="font-body" style={{ color: 'rgba(125, 138, 134, 0.6)', fontSize: 12, textAlign: 'center', marginTop: 16, fontStyle: 'italic' }}>
              Source: DXB Interact, Dubai Land Department — Q1 2026 data
            </p>
          </div>
        </ScrollReveal>

        {/* Top Developers */}
        <ScrollReveal>
          <div style={{ marginBottom: 80 }}>
            <h3 className="font-heading" style={{ fontSize: 20, color: '#5A6662', textAlign: 'center', marginBottom: 8 }}>
              TOP DEVELOPERS — <span style={{ color: '#0F6B62' }}>UNITS UNDER CONSTRUCTION</span>
            </h3>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <span className="font-caption" style={{ color: '#7D8A86', fontSize: 11 }}>
                TOTAL PIPELINE: <span style={{ color: '#0F6B62', fontWeight: 500 }}>{totalDeveloperUnits}</span> UNITS TO 2028
              </span>
            </div>
            <div style={{ maxWidth: 700, margin: '0 auto' }}>
              {topDevelopers.map((dev, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '30px 20px 1fr 80px',
                    gap: 12,
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: i === topDevelopers.length - 1 ? '1px solid rgba(15, 107, 98, 0.12)' : '1px solid rgba(125, 138, 134, 0.1)',
                  }}
                >
                  <span style={{ color: '#7D8A86', fontSize: 12, fontFamily: 'Space Grotesk, sans-serif' }}>{dev.rank}</span>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      background: dev.color,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 9,
                      fontWeight: 700,
                      color: '#F6F1E7',
                      fontFamily: 'Space Grotesk, sans-serif',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {dev.name.split(' ').map((w) => w[0]).join('').substring(0, 2).toUpperCase()}
                  </div>
                  <span style={{ color: dev.rank === '11' ? '#7D8A86' : '#5A6662', fontSize: 14, fontStyle: dev.rank === '11' ? 'italic' : undefined }}>
                    {dev.name}
                  </span>
                  <span style={{ color: dev.rank === '11' ? '#7D8A86' : '#0F6B62', fontSize: 13, fontWeight: 500, textAlign: 'right', fontFamily: 'Space Grotesk, sans-serif' }}>
                    <StatCounter end={parseInt(dev.units.replace(/,/g, '').replace(/\+/g, ''))} suffix="+" duration={1.5} />
                  </span>
                </div>
              ))}
            </div>
            <p className="font-body" style={{ color: 'rgba(125, 138, 134, 0.6)', fontSize: 12, textAlign: 'center', marginTop: 16, fontStyle: 'italic' }}>
              Source: DXB Interact — Top Property Developers Under Construction, Dubai 2026
            </p>
          </div>
        </ScrollReveal>

        {/* Property Type Split */}
        <ScrollReveal>
          <div>
            <h3 className="font-heading" style={{ fontSize: 20, color: '#5A6662', textAlign: 'center', marginBottom: 32 }}>
              OFF-PLAN MARKET BY <span style={{ color: '#0F6B62' }}>PROPERTY TYPE</span>
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 20,
                maxWidth: 800,
                margin: '0 auto',
              }}
            >
              {propertyTypeSplit.map((pt, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{ padding: '28px 20px', textAlign: 'center' }}
                >
                  <div style={{ fontSize: 36, fontWeight: 700, color: i === 0 ? '#0F6B62' : '#0F6B62', fontFamily: 'Space Grotesk', marginBottom: 8 }}>
                    <StatCounter end={pt.pct} suffix="%" duration={1.5} />
                  </div>
                  <div style={{ color: '#5A6662', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{pt.label}</div>
                  <div style={{ color: 'rgba(90, 102, 98, 0.5)', fontSize: 12, marginBottom: 4 }}>{pt.desc}</div>
                  <div style={{ color: '#7D8A86', fontSize: 11 }}>{pt.note}</div>
                </div>
              ))}
            </div>
            <p className="font-body" style={{ color: 'rgba(125, 138, 134, 0.6)', fontSize: 12, textAlign: 'center', marginTop: 16, fontStyle: 'italic' }}>
              Source: DXB Interact, Dubai Land Department — Off-Plan Transaction Analysis 2026
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}