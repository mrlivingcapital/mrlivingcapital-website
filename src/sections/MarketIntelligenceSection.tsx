import ScrollReveal from '../components/ScrollReveal'
import StatCounter from '../components/StatCounter'

const stats = [
  {
    value: 419.9,
    prefix: 'AED ',
    suffix: 'B',
    label: 'H1 2026 Total Transactions',
    source: 'Dubai Land Department — H1 2026',
  },
  {
    value: 146.7,
    prefix: 'AED ',
    suffix: 'B',
    label: 'Ready Sales H1 — Largest Share',
    source: 'Dubai Land Department — H1 2026',
  },
  {
    value: 112850,
    suffix: '',
    label: 'Total Transactions H1',
    source: 'Dubai Land Department — H1 2026',
  },
  {
    value: 26,
    prefix: '+', suffix: '%',
    label: 'Foreign Investment Growth',
    source: 'Dubai Land Department — Q1 2026 YoY (latest published)',
  },
  {
    value: 48448,
    suffix: '',
    label: 'Total Investors',
    source: 'Dubai Land Department — H1 2026',
  },
]

const offPlanEvolution = [
  { year: '2021', share: 42 },
  { year: '2024', share: 55 },
  { year: '2025', share: 65 },
  { year: 'H1 2026', share: 49 },
]


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
            <p className="font-body" style={{ color: 'rgba(90, 102, 98, 0.85)', fontSize: 16, maxWidth: 700, margin: '0 auto' }}>
              Dubai recorded AED 419.9B in H1 2026 transactions — and for the first time in years, ready homes (AED 146.7B) outsold off-plan (AED 139.8B) by value. Abu Dhabi accelerates with AED 71B in 2025 and Saadiyat Cultural District. Ras Al Khaimah delivers 7-9% yields — the highest in the UAE. This is a structural maturity shift across all three emirates.
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
              Source: Dubai Land Department — H1 2026 (off-plan share of sales value: AED 139.8B of 286.4B)
            </p>
          </div>
        </ScrollReveal>

        {/* Off-Plan H1 2026: Residential vs Commercial (stacked) */}
        <ScrollReveal>
          <div style={{ marginBottom: 80 }}>
            <h3 className="font-heading" style={{ fontSize: 20, color: '#5A6662', textAlign: 'center', marginBottom: 12 }}>
              OFF-PLAN H1 2026 — <span style={{ color: '#0F6B62' }}>RESIDENTIAL VS COMMERCIAL</span>
            </h3>
            <p className="font-body" style={{ color: '#7D8A86', fontSize: 13, textAlign: 'center', marginBottom: 32 }}>
              Total market: AED 419.9B across residential + commercial (112,850 transactions) · Off-plan sales value: AED 139.8B
            </p>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <div style={{ display: 'flex', height: 64, borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ width: '90.6%', background: '#0F6B62', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F6F1E7', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 'clamp(11px, 1.6vw, 15px)', textAlign: 'center', padding: '0 8px' }}>
                  RESIDENTIAL OFF-PLAN · AED 126.7B · 90.6%
                </div>
                <div style={{ width: '9.4%', background: '#B08D4A' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                <div style={{ borderLeft: '3px solid #B08D4A', paddingLeft: 12, maxWidth: 520 }}>
                  <div style={{ color: '#38413E', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                    COMMERCIAL OFF-PLAN (office-led): AED 13.1B · 1,668 deals
                  </div>
                  <div style={{ color: '#7D8A86', fontSize: 12, lineHeight: 1.5 }}>
                    Record — more than 2019–2025 combined. Off-plan offices overtook ready offices for the first time since 2010.
                  </div>
                </div>
              </div>
            </div>
            <p className="font-body" style={{ color: 'rgba(125, 138, 134, 0.6)', fontSize: 12, textAlign: 'center', marginTop: 16, fontStyle: 'italic' }}>
              Source: Dubai Land Department · Gulf Business · Cavendish Maxwell — H1 2026
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
                  <div style={{ color: 'rgba(90, 102, 98, 0.8)', fontSize: 12, marginBottom: 4 }}>{pt.desc}</div>
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