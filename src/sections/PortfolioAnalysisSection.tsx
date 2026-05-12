import ScrollReveal from '../components/ScrollReveal'

const allocations = [
  {
    corridor: 'DUBAI SOUTH',
    country: 'UAE',
    entry: 'AED 680/sqft',
    thesis: 'Al Maktoum Airport (AED 128B) creates a 3-5x appreciation window by 2030. Entry-level pricing with infrastructure not yet priced in.',
    status: 'ACCUMULATING',
    horizon: '2026-2032',
  },
  {
    corridor: 'JVC',
    country: 'UAE',
    entry: 'AED 1,000/sqft',
    thesis: 'Gold Line station (2032) is a free call option on metro infrastructure. 7-8% gross yield funds the hold while waiting for the catalyst.',
    status: 'HOLDING',
    horizon: '2025-2033',
  },
  {
    corridor: 'DUBAI HILLS',
    country: 'UAE',
    entry: 'AED 1,600/sqft',
    thesis: 'Blue-chip stability with 5.5-6.5% yield. Counterweight to speculative positions. Diversification through a proven master community.',
    status: 'HOLDING',
    horizon: 'LONG-TERM',
  },
  {
    corridor: 'MBR CITY / SOBHA',
    country: 'UAE',
    entry: 'AED 2,000/sqft',
    thesis: 'Green corridor premium aligned with Dubai 2040 sustainability mandates. AED 6.1B in 2025 sales validates institutional demand.',
    status: 'SELECTIVE ENTRY',
    horizon: '2026-2030',
  },
]

export default function PortfolioAnalysisSection() {
  return (
    <section
      id="portfolio"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#0A1F1A',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span
              className="font-caption"
              style={{ color: '#C9A87C', fontSize: 12, letterSpacing: '0.12em', display: 'block', marginBottom: 16 }}
            >
              LIVE ALLOCATIONS
            </span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#E8DDD0', marginBottom: 12 }}>
              HOW I <span style={{ color: '#C9A87C' }}>ALLOCATE</span> CAPITAL
            </h2>
            <p
              className="font-body"
              style={{ color: 'rgba(232, 221, 208, 0.5)', fontSize: 15, maxWidth: 620, margin: '0 auto' }}
            >
              Not what I&apos;m selling you — how I manage my own family portfolio through market cycles. This is the same discipline forged over 19 years of institutional financial management.
            </p>
          </div>
        </ScrollReveal>

        {/* Allocation Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {allocations.map((a, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                className="glass-card"
                style={{
                  padding: '28px 32px',
                  borderLeft: `3px solid ${a.status === 'ACCUMULATING' ? '#C9A87C' : a.status === 'SELECTIVE ENTRY' ? '#D4F1F4' : '#5A7A72'}`,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(6px)'
                  e.currentTarget.style.borderLeftWidth = '4px'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.borderLeftWidth = '3px'
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 20,
                    alignItems: 'start',
                  }}
                >
                  {/* Corridor + Country */}
                  <div>
                    <div
                      style={{
                        color: '#C9A87C',
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: 'Space Grotesk, sans-serif',
                        letterSpacing: '0.08em',
                        marginBottom: 4,
                      }}
                    >
                      {a.corridor}
                    </div>
                    <div style={{ color: '#5A7A72', fontSize: 11, fontFamily: 'Space Grotesk, sans-serif' }}>
                      {a.country}
                    </div>
                  </div>

                  {/* Entry Price */}
                  <div>
                    <div
                      style={{
                        color: 'rgba(232, 221, 208, 0.4)',
                        fontSize: 10,
                        fontFamily: 'Space Grotesk, sans-serif',
                        letterSpacing: '0.12em',
                        marginBottom: 4,
                      }}
                    >
                      ENTRY PRICE
                    </div>
                    <div
                      style={{
                        color: '#E8DDD0',
                        fontSize: 14,
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 600,
                      }}
                    >
                      {a.entry}
                    </div>
                  </div>

                  {/* Thesis */}
                  <div style={{ gridColumn: 'span 2' }}>
                    <div
                      style={{
                        color: 'rgba(232, 221, 208, 0.4)',
                        fontSize: 10,
                        fontFamily: 'Space Grotesk, sans-serif',
                        letterSpacing: '0.12em',
                        marginBottom: 4,
                      }}
                    >
                      THESIS
                    </div>
                    <div
                      className="font-body"
                      style={{ color: 'rgba(232, 221, 208, 0.65)', fontSize: 13, lineHeight: 1.6 }}
                    >
                      {a.thesis}
                    </div>
                  </div>

                  {/* Status + Horizon */}
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: 4,
                        background:
                          a.status === 'ACCUMULATING'
                            ? 'rgba(201, 168, 124, 0.12)'
                            : a.status === 'SELECTIVE ENTRY'
                              ? 'rgba(212, 241, 244, 0.08)'
                              : 'rgba(90, 122, 114, 0.12)',
                        border: `1px solid ${a.status === 'ACCUMULATING' ? 'rgba(201, 168, 124, 0.25)' : a.status === 'SELECTIVE ENTRY' ? 'rgba(212, 241, 244, 0.15)' : 'rgba(90, 122, 114, 0.2)'}`,
                        color: a.status === 'ACCUMULATING' ? '#C9A87C' : a.status === 'SELECTIVE ENTRY' ? '#D4F1F4' : '#5A7A72',
                        fontSize: 9,
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        marginBottom: 6,
                      }}
                    >
                      {a.status}
                    </div>
                    <div style={{ color: '#5A7A72', fontSize: 10, fontFamily: 'Space Grotesk, sans-serif' }}>
                      Horizon: {a.horizon}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Disclaimer */}
        <ScrollReveal delay={0.5}>
          <p
            className="font-body"
            style={{
              color: 'rgba(90, 122, 114, 0.5)',
              fontSize: 11,
              textAlign: 'center',
              marginTop: 32,
              fontStyle: 'italic',
            }}
          >
            These allocations reflect the founder&apos;s personal portfolio strategy and are presented for transparency purposes only.
            They do not constitute investment advice. Every investor&apos;s situation is unique.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
