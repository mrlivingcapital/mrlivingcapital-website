import ScrollReveal from '../components/ScrollReveal'

const pillars = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'NO CONFLICTS',
    description: 'Fee-only advisory. No developer commissions.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7H5a2 2 0 01-2-2V5a2 2 0 012-2h14v5" />
        <path d="M21 12v5H5a2 2 0 00-2 2v1a2 2 0 002 2h14v-5" />
        <path d="M3 5v14" />
      </svg>
    ),
    title: 'DATA FIRST',
    description: 'Every decision backed by verified market data.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    title: 'MULTILINGUAL',
    description: 'English, Arabic, Farsi. No barriers.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'FULL TRANSPARENCY',
    description: 'You see what we see. Always.',
  },
]

export default function FounderSection() {
  return (
    <section
      id="founder"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#0A1F1A',
        padding: '120px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 64,
          alignItems: 'start',
        }}
      >
        {/* Left: Portrait */}
        <ScrollReveal direction="left" distance={60}>
          <div>
            <div
              style={{
                borderRadius: 8,
                overflow: 'hidden',
                border: '1px solid rgba(201, 168, 124, 0.2)',
                marginBottom: 24,
              }}
            >
              <img
                src="/images/founder-portrait.jpg"
                alt="Masoud R., Founder"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className="font-caption" style={{ color: '#C9A87C', marginBottom: 4 }}>
              MASOUD R. / FOUNDER
            </div>
            <div className="font-caption" style={{ color: '#5A7A72', fontSize: 12 }}>
              Dubai, UAE · BRN: 94316
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Content */}
        <div>
          <ScrollReveal>
            <span className="font-caption" style={{ color: '#C9A87C', display: 'block', marginBottom: 16 }}>
              THE APPROACH
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#E8DDD0', marginBottom: 24 }}>
              STRATEGIC DISCIPLINE,
              <br />
              <span style={{ color: '#C9A87C' }}>NOT SALES PRESSURE</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.6)', fontSize: 16, lineHeight: 1.7, marginBottom: 16 }}>
              A Dubai-based real estate investment advisory with 20 years of career experience at one of the MENA region's largest financial institutions.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.6)', fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
              Every strategy is built around one question: what does this specific investor actually need? Not market averages. Not developer projections. A structured, tailor-made approach aligned to your capital, your timeline, and your return expectations — with no agenda beyond getting the answer right.
            </p>
          </ScrollReveal>

          {/* Pillars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 24,
            }}
          >
            {pillars.map((p, i) => (
              <ScrollReveal key={i} delay={0.4 + i * 0.1}>
                <div
                  style={{
                    padding: '20px',
                    borderRadius: 8,
                    border: '1px solid rgba(90, 122, 114, 0.15)',
                    background: 'rgba(90, 122, 114, 0.05)',
                  }}
                >
                  <div style={{ marginBottom: 12 }}>{p.icon}</div>
                  <h4 style={{ color: '#E8DDD0', fontSize: 14, fontWeight: 500, marginBottom: 6, fontFamily: 'Space Grotesk, sans-serif' }}>
                    {p.title}
                  </h4>
                  <p style={{ color: 'rgba(232, 221, 208, 0.5)', fontSize: 13, lineHeight: 1.5 }}>
                    {p.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}