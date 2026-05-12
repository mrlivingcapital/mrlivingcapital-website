import { useRef, useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'

const emirates = [
  {
    tag: 'DUBAI',
    name: 'THE GLOBAL GATEWAY',
    growth: '+31% YoY (Q1 2026)',
    yield: '5-8%',
    description: 'AED 252 billion in Q1 2026 transactions across 60,303 deals. The UAE\'s most liquid property market with the deepest developer ecosystem and the strongest infrastructure pipeline. From Dubai South\'s Al Maktoum Airport (AED 128B) to the Metro Gold Line (18 stations, 2032), capital appreciation is infrastructure-led.',
    bullets: [
      'Al Maktoum Airport: 5x capacity by 2030 — 750,000+ jobs created',
      'Metro Gold Line: 18 stations, completion 2032, AED 15B+ investment',
      'Etihad Rail passenger launch Q2 2026: Dubai-Abu Dhabi in 57 minutes',
      'Dubai 2040: Five urban centres, 60% nature reserve, 5.8M population target',
      'D33 Agenda: AED 32 trillion GDP target by 2033 — 1M new jobs',
      'Freehold: 100% foreign ownership in designated zones, full title deed at DLD',
    ],
    accentColor: '#C9A87C',
    stats: { transactions: '60,303', value: 'AED 252B', priceSqft: 'AED 800-3,000+', population: '3.8M → 5.8M (2040)' },
  },
  {
    tag: 'ABU DHABI',
    name: 'THE CAPITAL OF CAPITAL',
    growth: '+18% YoY (2025)',
    yield: '5-7%',
    description: 'The UAE\'s capital is undergoing its most aggressive expansion in history. Saadiyat Island\'s Cultural District (Guggenheim, Zayed National Museum, Natural History Museum) is drawing global attention. Aldar\'s AED 25B pipeline, IMKAN\'s innovation-driven communities, and government-backed master planning make this the most stable allocation in the UAE.',
    bullets: [
      'Saadiyat Cultural District: Guggenheim Abu Dhabi, Natural History Museum opening 2025',
      'Zayed International Airport: Expanded capacity, new terminal for 45M passengers',
      'Aldar Properties: AED 25B development pipeline, 15,000+ new units by 2028',
      'Abu Dhabi Economic Vision 2030: Diversification away from oil, $1.1T non-oil GDP target',
      'No property tax, no income tax, 100% foreign ownership in investment zones',
      'Etihad Rail direct link: Abu Dhabi-Dubai in 57 minutes from Q2 2026',
    ],
    accentColor: '#D4F1F4',
    stats: { transactions: '12,500+', value: 'AED 71B', priceSqft: 'AED 900-2,500', population: '3.8M → 5M (2030)' },
  },
  {
    tag: 'RAS AL KHAIMAH',
    name: 'THE HIGH-YIELD FRONTIER',
    growth: '+35% YoY (2025)',
    yield: '7-9%',
    description: 'The UAE\'s highest-yielding emirate with the lowest entry point. Wynn Al Marjan — the first integrated gaming resort in the GCC — opens 2027 and will transform RAK into a global tourism destination. Entry at AED 500-900/sqft with 7-9% gross yields and zero taxes makes this the purest risk-adjusted play in the UAE.',
    bullets: [
      'Wynn Al Marjan: First GCC gaming resort, AED 12B investment, opening 2027',
      'Al Marjan Island: 4.5 km of beachfront, master-planned tourism destination',
      'RAK Central: New business district, government offices, healthcare hub',
      'Highest yields in UAE: 7-9% gross rental, lowest entry: AED 500-900/sqft',
      'Population growing 400K → 600K by 2030 — 50% increase in housing demand',
      'No property tax, no income tax, 100% foreign ownership, streamlined DLD process',
    ],
    accentColor: '#5A7A72',
    stats: { transactions: '3,200+', value: 'AED 8.5B', priceSqft: 'AED 500-900', population: '400K → 600K (2030)' },
  },
]

const topDevelopers = [
  { emirate: 'DUBAI', developers: [
    { name: 'Emaar', units: 28000, color: '#C9A87C' },
    { name: 'DAMAC', units: 22000, color: '#B8986C' },
    { name: 'Sobha', units: 8500, color: '#A7885C' },
    { name: 'MERAAS', units: 12000, color: '#97804C' },
    { name: 'Nakheel', units: 15000, color: '#87703C' },
  ]},
  { emirate: 'ABU DHABI', developers: [
    { name: 'Aldar', units: 15000, color: '#D4F1F4' },
    { name: 'IMKAN', units: 6000, color: '#B4D1D4' },
    { name: 'Reportage', units: 4500, color: '#94B1B4' },
    { name: 'Bloom', units: 3500, color: '#749194' },
    { name: 'Eagle Hills', units: 5000, color: '#647174' },
  ]},
  { emirate: 'RAK', developers: [
    { name: 'RAK Properties', units: 4000, color: '#5A7A72' },
    { name: 'Al Hamra', units: 2800, color: '#4A6A62' },
    { name: 'Marjan', units: 3200, color: '#3A5A52' },
    { name: 'RAK Central', units: 1500, color: '#2A4A42' },
    { name: 'Riviera', units: 800, color: '#1A3A32' },
  ]},
]

function DeveloperBarChart({ emirateData }: { emirateData: typeof topDevelopers[0] }) {
  const maxUnits = Math.max(...emirateData.developers.map(d => d.units))
  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ color: '#C9A87C', fontSize: 11, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.12em', marginBottom: 16, fontWeight: 600 }}>
        {emirateData.emirate}
      </div>
      {emirateData.developers.map((d, i) => (
        <div key={i} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="dev-label" style={{ width: 80, color: 'rgba(232,221,208,0.5)', fontSize: 11, fontFamily: 'Space Grotesk, sans-serif', textAlign: 'right', flexShrink: 0 }}>
            {d.name}
          </div>
          <div style={{ flex: 1, height: 20, background: 'rgba(90,122,114,0.08)', borderRadius: 4, overflow: 'hidden' }}>
            <div
              style={{
                width: `${(d.units / maxUnits) * 100}%`,
                height: '100%',
                background: d.color,
                borderRadius: 4,
                transition: 'width 1s ease',
              }}
            />
          </div>
          <div style={{ width: 50, color: '#E8DDD0', fontSize: 11, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>
            {(d.units / 1000).toFixed(0)}K
          </div>
        </div>
      ))}
    </div>
  )
}

export default function CorridorsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeEmirate, setActiveEmirate] = useState(0)

  return (
    <section
      ref={sectionRef}
      id="corridors"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#0A1F1A',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="font-caption" style={{ color: '#C9A87C', display: 'block', marginBottom: 16, fontSize: 12, letterSpacing: '0.12em' }}>
              CAPITAL ALLOCATION
            </span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#E8DDD0' }}>
              THREE <span style={{ color: '#C9A87C' }}>EMIRATES.</span>
              <br />
              ONE <span style={{ color: '#C9A87C' }}>ALLOCATION STRATEGY.</span>
            </h2>
            <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.6)', maxWidth: 700, margin: '24px auto 0', fontSize: 16 }}>
              Dubai for liquidity and infrastructure. Abu Dhabi for stability and cultural capital. Ras Al Khaimah for yield and the Wynn catalyst. Each emirate serves a different function in a diversified UAE portfolio.
            </p>
          </div>
        </ScrollReveal>

        {/* Emirate Selector Tabs */}
        <ScrollReveal delay={0.15}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
            {emirates.map((e, i) => (
              <button
                key={i}
                onClick={() => setActiveEmirate(i)}
                style={{
                  padding: '12px 28px',
                  borderRadius: 4,
                  border: activeEmirate === i ? '1px solid #C9A87C' : '1px solid rgba(90,122,114,0.2)',
                  background: activeEmirate === i ? 'rgba(201,168,124,0.08)' : 'transparent',
                  color: activeEmirate === i ? '#C9A87C' : '#5A7A72',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {e.tag}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Active Emirate Detail */}
        <ScrollReveal delay={0.2}>
          <div
            className="glass-card"
            style={{
              padding: '40px 48px',
              borderLeft: `3px solid ${emirates[activeEmirate].accentColor}`,
              marginBottom: 48,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24, marginBottom: 20 }}>
              <div>
                <div className="font-caption" style={{ color: '#C9A87C', fontSize: 12, marginBottom: 8 }}>
                  {emirates[activeEmirate].tag}
                </div>
                <h3 className="font-heading" style={{ fontSize: 28, color: '#E8DDD0', textTransform: 'uppercase' }}>
                  {emirates[activeEmirate].name}
                </h3>
              </div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ color: '#5A7A72', fontSize: 10, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.1em' }}>GROWTH</div>
                  <div style={{ color: '#C9A87C', fontSize: 16, fontWeight: 600 }}>{emirates[activeEmirate].growth}</div>
                </div>
                <div>
                  <div style={{ color: '#5A7A72', fontSize: 10, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.1em' }}>YIELD</div>
                  <div style={{ color: '#C9A87C', fontSize: 16, fontWeight: 600 }}>{emirates[activeEmirate].yield}</div>
                </div>
              </div>
            </div>

            <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.65)', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
              {emirates[activeEmirate].description}
            </p>

            {/* Key Stats Row */}
            <div className="emirate-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24, padding: '16px 0', borderTop: '1px solid rgba(90,122,114,0.1)', borderBottom: '1px solid rgba(90,122,114,0.1)' }}>
              {Object.entries(emirates[activeEmirate].stats).map(([key, value]) => (
                <div key={key} style={{ textAlign: 'center' }}>
                  <div className="stat-label" style={{ color: '#5A7A72', fontSize: 9, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  <div className="stat-value" style={{ color: '#E8DDD0', fontSize: 13, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>{value}</div>
                </div>
              ))}
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {emirates[activeEmirate].bullets.map((b, i) => (
                <li key={i} style={{ color: 'rgba(232, 221, 208, 0.6)', fontSize: 14, marginBottom: 8, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: '#C9A87C', fontSize: 12, marginTop: 2 }}>✦</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Developer Bar Charts */}
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="font-caption" style={{ color: '#C9A87C', fontSize: 12, letterSpacing: '0.12em', display: 'block', marginBottom: 16 }}>
              TOP DEVELOPERS BY PIPELINE
            </span>
            <h3 className="font-heading" style={{ fontSize: 'clamp(20px, 3vw, 32px)', color: '#E8DDD0', marginBottom: 8 }}>
              WHO IS <span style={{ color: '#C9A87C' }}>BUILDING</span> THE FUTURE
            </h3>
            <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.5)', fontSize: 14, maxWidth: 600, margin: '0 auto' }}>
              Units in pipeline by top developer per emirate. Data sourced from DLD, Abu Dhabi DMT, and RAK DLD.
            </p>
          </div>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
          }}
          className="developer-charts-grid"
        >
          {topDevelopers.map((ed, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="glass-card" style={{ padding: '24px 28px', height: '100%' }}>
                <DeveloperBarChart emirateData={ed} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .developer-charts-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
