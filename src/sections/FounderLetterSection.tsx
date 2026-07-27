import ScrollReveal from '../components/ScrollReveal'

export default function FounderLetterSection() {
  return (
    <section
      id="founder-letter"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#F6F1E7',
        padding: '120px 24px',
      }}
    >
      {/* Subtle texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 20% 50%, rgba(15, 107, 98, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span
              className="font-caption"
              style={{ color: '#0F6B62', fontSize: 12, letterSpacing: '0.15em', display: 'block', marginBottom: 16 }}
            >
              THE FOUNDER&apos;S LETTER
            </span>
            <h2
              className="font-heading"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#5A6662', marginBottom: 12 }}
            >
              INSTITUTIONAL <span style={{ color: '#0F6B62' }}>DISCIPLINE.</span>
              <br />
              PERSONAL <span style={{ color: '#0F6B62' }}>CONVICTION.</span>
            </h2>
            <p
              className="font-body"
              style={{ color: 'rgba(90, 102, 98, 0.8)', fontSize: 15, maxWidth: 560, margin: '0 auto' }}
            >
              Why institutional discipline matters in every allocation decision.
            </p>
          </div>
        </ScrollReveal>

        {/* Founder Photo */}
        <ScrollReveal delay={0.12}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div
              style={{
                display: 'inline-block',
                position: 'relative',
              }}
            >
              <img
                src="/images/masoud-founder.jpg"
                alt="Masoud, Founder of MR Living Capital"
                style={{
                  width: 200,
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 20,
                  border: '2px solid #0F6B62',
                  boxShadow: '0 0 30px rgba(15, 107, 98, 0.12)',
                }}
                loading="eager"
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 4,
                  right: 4,
                  width: 20,
                  height: 20,
                  background: '#0F6B62',
                  borderRadius: '50%',
                  border: '3px solid #F6F1E7',
                }}
              />
            </div>
            <p
              className="font-body"
              style={{ color: 'rgba(90, 102, 98, 0.3)', fontSize: 12, marginTop: 12, fontStyle: 'italic' }}
            >
              Two decades of institutional financial DNA.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div
            className="glass-card"
            style={{
              padding: '56px 48px',
              position: 'relative',
              borderLeft: '3px solid #0F6B62',
            }}
          >
            {/* Decorative quote mark */}
            <div
              style={{
                position: 'absolute',
                top: 24,
                left: 36,
                fontSize: 96,
                color: 'rgba(15, 107, 98, 0.08)',
                fontFamily: 'Georgia, serif',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              &ldquo;
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p
                className="font-body"
                style={{ color: 'rgba(90, 102, 98, 0.7)', fontSize: 16, lineHeight: 1.85, marginBottom: 20 }}
              >
                I spent two decades designing and implementing strategies within financial institutions and freelance private portfolio management — navigating market cycles across three continents, and learning how big money actually moves. Not how it talks. How it moves.
              </p>

              <p
                className="font-body"
                style={{ color: 'rgba(90, 102, 98, 0.7)', fontSize: 16, lineHeight: 1.85, marginBottom: 20 }}
              >
                I started working at fourteen. Not because I had to — because I understood early that how you steward capital defines the life you live and the legacy you leave. Today, MR Living Capital exists because I believe investors deserve the same institutional-grade discipline that the big institutions use — but accessible to serious individuals and families building real wealth.
              </p>

              <p
                className="font-body"
                style={{ color: 'rgba(90, 102, 98, 0.7)', fontSize: 16, lineHeight: 1.85, marginBottom: 28 }}
              >
                This is not a property shop. This is real estate investment advisory engineered by someone who spent two decades inside the machine — designing strategies and managing private portfolios. I don&apos;t chase commissions. I architect capital. If the numbers don&apos;t make sense, we don&apos;t proceed. That is the only rule.
              </p>

              {/* Signature */}
              <div
                style={{
                  borderTop: '1px solid rgba(125, 138, 134, 0.15)',
                  paddingTop: 24,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      color: '#0F6B62',
                      fontSize: 18,
                      fontWeight: 600,
                      fontFamily: 'Space Grotesk, sans-serif',
                      letterSpacing: '0.08em',
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
                    }}
                  >
                    FOUNDER
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      color: 'rgba(90, 102, 98, 0.35)',
                      fontSize: 11,
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontStyle: 'italic',
                    }}
                  >
                    Dubai, UAE · BRN: 94316
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
