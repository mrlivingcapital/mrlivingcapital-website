import ScrollReveal from '../components/ScrollReveal'

const reasons = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F6B62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Institutional Discipline, Not Sales Pressure',
    desc: 'Every allocation is stress-tested against verified DLD data and your risk profile before a single dirham is committed. The same process I forged over two decades within financial institutions and private portfolio management.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F6B62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Stewardship, Not Commission-Chasing.',
    desc: 'Brokers push inventory that pays them best. We independently verify every corridor and developer — allocating only where DLD data confirms generational outperformance. Your capital is the priority, never the transaction.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F6B62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
      </svg>
    ),
    title: 'First-Mover, Institutional-Grade',
    desc: 'We identify corridors before they hit the mainstream — the same institutional foresight I developed over two decades. Our partners enter at pre-launch pricing while others browse listed inventory.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F6B62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Multilingual. Multicultural.',
    desc: 'Fluent in English and Persian. Operating across UAE, Europe, and the Gulf with deep cultural fluency that shapes every allocation decision and negotiation strategy.'
  },
]

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{ position: 'relative', zIndex: 2, background: '#F6F1E7', padding: '120px 24px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* LEFT — Content */}
          <div>
            <ScrollReveal>
              <span
                className="font-caption"
                style={{ color: '#0F6B62', fontSize: 12, letterSpacing: '0.12em', display: 'block', marginBottom: 20 }}
              >
                ABOUT
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2
                className="font-heading"
                style={{
                  fontSize: 'clamp(26px, 4vw, 40px)',
                  lineHeight: 1.2,
                  marginBottom: 24,
                }}
              >
                <span style={{ color: '#5A6662' }}>THE ARCHITECT,</span>
                <br />
                <span style={{ color: '#0F6B62' }}>NOT THE BROKER.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p
                className="font-body"
                style={{ color: 'rgba(90, 102, 98, 0.6)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}
              >
                I spent two decades designing and implementing strategies within financial institutions and freelance private portfolio management, managing capital across three continents. I survived what should have killed me. Then I built MR Living Capital to bring that same institutional discipline to serious investors building real wealth in the UAE. Cold-blooded analysis. Zero sales agenda.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p
                className="font-body"
                style={{ color: 'rgba(90, 102, 98, 0.5)', fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}
              >
                Every engagement begins with one question: what does your capital need to achieve? From there, we build a tailor-made investment roadmap — not a sales pitch. The same rigorous process I forged over two decades, now applied across the UAE&apos;s highest-growth corridors in Dubai, Abu Dhabi, and Ras Al Khaimah.
              </p>
            </ScrollReveal>

            {/* Reason cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {reasons.map((r, i) => (
                <ScrollReveal key={i} delay={0.3 + i * 0.1}>
                  <div
                    className="glass-card"
                    style={{
                      padding: '20px 24px',
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                      borderLeft: '2px solid #0F6B62',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderLeftWidth = '3px'
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderLeftWidth = '2px'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    <div style={{ flexShrink: 0, marginTop: 2 }}>{r.icon}</div>
                    <div>
                      <div
                        style={{
                          color: '#5A6662',
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: 'Space Grotesk, sans-serif',
                          marginBottom: 6,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {r.title}
                      </div>
                      <div style={{ color: 'rgba(90, 102, 98, 0.45)', fontSize: 13, lineHeight: 1.6 }}>
                        {r.desc}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* RIGHT — Founder Photo */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ScrollReveal delay={0.2}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 420,
                  margin: '0 auto',
                }}
              >
                {/* Outer frame */}
                <div
                  style={{
                    borderRadius: 24,
                    border: '1px solid rgba(15, 107, 98, 0.25)',
                    padding: 10,
                    transition: 'all 0.5s ease',
                  }}
                >
                  {/* Inner frame */}
                  <div
                    style={{
                      borderRadius: 16,
                      border: '1px solid rgba(15, 107, 98, 0.4)',
                      padding: 8,
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    {/* Photo */}
                    <img
                      src="/images/masoud-founder.jpg"
                      alt="Masoud - Founder, MR Living Capital"
                      style={{
                        width: '100%',
                        aspectRatio: '3/4',
                        objectFit: 'cover',
                        borderRadius: 10,
                        display: 'block',
                        filter: 'brightness(0.95) contrast(1.05)',
                      }}
                    />
                    {/* Subtle overlay gradient */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 8,
                        borderRadius: 10,
                        background: 'linear-gradient(180deg, transparent 60%, rgba(246, 241, 231, 0.5) 100%)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Glow effect behind the frame */}
                <div
                  style={{
                    position: 'absolute',
                    inset: -20,
                    borderRadius: 32,
                    background: 'radial-gradient(ellipse at center, rgba(15, 107, 98, 0.06) 0%, transparent 70%)',
                    zIndex: -1,
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </ScrollReveal>

            {/* Name below photo */}
            <ScrollReveal delay={0.4}>
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <div
                  style={{
                    color: '#0F6B62',
                    fontSize: 18,
                    fontWeight: 600,
                    fontFamily: 'Space Grotesk, sans-serif',
                    letterSpacing: '0.12em',
                    marginBottom: 4,
                  }}
                >
                  MASOUD
                </div>
                <div
                  style={{
                    color: '#7D8A86',
                    fontSize: 12,
                    fontFamily: 'Space Grotesk, sans-serif',
                    letterSpacing: '0.1em',
                    fontWeight: 500,
                  }}
                >
                  FOUNDER
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
         