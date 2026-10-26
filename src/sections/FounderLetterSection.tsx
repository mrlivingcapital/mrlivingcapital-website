import ScrollReveal from '../components/ScrollReveal'

export default function FounderLetterSection() {
  return (
    <section
      id="founder-letter"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#123B37',
        padding: '120px 24px',
        overflow: 'hidden',
      }}
    >
      {/* Ambient teal glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 45% 55% at 18% 40%, rgba(87, 169, 159, 0.10) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1150, margin: '0 auto', position: 'relative' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 420px) 1fr',
            gap: 72,
            alignItems: 'start',
          }}
          className="founder-grid"
        >
          {/* LEFT — Founder photo */}
          <div style={{ position: 'relative' }}>
            <ScrollReveal delay={0.15}>
              <div style={{ position: 'relative', maxWidth: 420, margin: '0 auto' }}>
                {/* Gold hairline frame */}
                <div style={{ borderRadius: 22, border: '1px solid rgba(194, 168, 120, 0.4)', padding: 10 }}>
                  <div style={{ borderRadius: 14, overflow: 'hidden', position: 'relative' }}>
                    <img
                      src="/images/masoud-founder-chess-2026.jpg"
                      alt="Masoud Rahemi, Founder of MR Living Capital"
                      style={{
                        width: '100%',
                        aspectRatio: '4/5',
                        objectFit: 'cover',
                        objectPosition: 'center 20%',
                        display: 'block',
                        filter: 'contrast(1.03) saturate(0.92)',
                      }}
                      loading="lazy"
                    />
                    {/* Dark luxury treatment: graphite grade into the deep teal plate */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, rgba(18, 59, 55, 0.18) 0%, transparent 30%, transparent 62%, rgba(18, 59, 55, 0.62) 100%)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Teal glow behind frame */}
                <div
                  style={{
                    position: 'absolute',
                    inset: -24,
                    borderRadius: 34,
                    background: 'radial-gradient(ellipse at center, rgba(87, 169, 159, 0.12) 0%, transparent 70%)',
                    zIndex: -1,
                    pointerEvents: 'none',
                  }}
                />

                {/* Name block */}
                <div style={{ textAlign: 'center', marginTop: 26 }}>
                  <div
                    className="font-nav"
                    style={{
                      color: '#F7F2E8',
                      fontSize: 18,
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      marginBottom: 6,
                    }}
                  >
                    MASOUD RAHEMI
                  </div>
                  <div
                    className="font-nav"
                    style={{
                      color: '#C2A878',
                      fontSize: 11,
                      letterSpacing: '0.22em',
                      fontWeight: 600,
                    }}
                  >
                    FOUNDER · MR LIVING CAPITAL
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT — The story */}
          <div>
            <ScrollReveal>
              <span
                className="font-nav"
                style={{ color: '#57A99F', fontSize: 11, letterSpacing: '0.28em', display: 'block', marginBottom: 22, fontWeight: 600 }}
              >
                FOUNDER · MR LIVING CAPITAL
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(30px, 3.8vw, 46px)',
                  color: '#F7F2E8',
                  lineHeight: 1.15,
                  marginBottom: 28,
                  fontWeight: 600,
                }}
              >
                THE NAME IS THE THESIS.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p
                className="font-body"
                style={{ color: 'rgba(247, 242, 232, 0.85)', fontSize: 15.5, lineHeight: 1.85, marginBottom: 18 }}
              >
                Living capital is capital that outlives the transaction. A broker sells
                you a unit and closes the file. I built MR Living Capital on the opposite
                idea: the asset is the start of the relationship, not the end of a sale.
                The name carries two obligations. Living: every allocation is
                stress-tested against verified DLD data before a single dirham moves,
                because advice that cannot survive scrutiny is not advice. Capital: your
                money has a job, and my job is to protect it first and grow it second.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p
                className="font-body"
                style={{ color: 'rgba(247, 242, 232, 0.78)', fontSize: 15.5, lineHeight: 1.85, marginBottom: 18 }}
              >
                I am Masoud Rahemi, Founder of MR Living Capital. Thirty-five years in
                Dubai. Own money in the market across three countries. A career spent
                learning how decisions actually get made under uncertainty. Not finance.
                Judgment. That is why I built XAI, our in-house investment engine: so no
                client of mine ever bets life savings on a brochure. The same process I
                run on my own capital, run on yours.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p
                className="font-body"
                style={{ color: 'rgba(247, 242, 232, 0.72)', fontSize: 15.5, lineHeight: 1.85, marginBottom: 34 }}
              >
                The brand line is a biography, not a slogan. When I was forty days old, a
                surgeon told my father I would not survive without an operation, and my
                father said yes. One courageous, informed decision made under the worst
                possible uncertainty, and every decade since has validated it. That is
                what Living Proof. Lasting Legacy. means. Evidence over hope. The
                discipline to let the numbers speak. We bring that same discipline to
                every allocation we architect.
              </p>
            </ScrollReveal>

            {/* Highlight box (one per view, per studio standard) */}
            <ScrollReveal delay={0.5}>
              <div
                style={{
                  display: 'inline-block',
                  background: '#B08D4A',
                  borderRadius: 6,
                  padding: '18px 28px',
                }}
              >
                <span
                  className="font-nav"
                  style={{
                    color: '#181A1C',
                    fontSize: 13,
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                  }}
                >
                  WE DON&apos;T GUESS. WE CALCULATE.
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .founder-grid {
            grid-template-columns: 1fr !important;
            gap: 52px !important;
          }
        }
      `}</style>
    </section>
  )
}
