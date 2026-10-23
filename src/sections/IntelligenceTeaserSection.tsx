/**
 * THE INTELLIGENCE BEHIND IT (WHAT'S NEXT): the XAI engine teaser.
 * Positions the proprietary engine behind the advisory without
 * overpromising: in development, demo by conversation.
 */
export default function IntelligenceTeaserSection() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <section id="whats-next" style={{ position: 'relative', zIndex: 2, background: 'linear-gradient(160deg, #123B37 0%, #0B2925 100%)', padding: isMobile ? '80px 20px' : '110px 48px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 45% 55% at 85% 45%, rgba(87, 169, 159, 0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', gap: isMobile ? 36 : 64, alignItems: 'center' }}>
        <div>
          <div className="font-caption" style={{ color: '#57A99F', fontSize: 11, letterSpacing: '0.22em', marginBottom: 18 }}>
            WHAT&apos;S NEXT · THE INTELLIGENCE BEHIND IT
          </div>
          <h2 className="font-display" style={{ color: '#F6F1E7', fontSize: isMobile ? 'clamp(28px, 7vw, 36px)' : 'clamp(34px, 3.6vw, 50px)', lineHeight: 1.14, fontWeight: 500, margin: '0 0 18px' }}>
            XAI is learning
            <br />
            <span style={{ color: '#57A99F' }}>this market.</span>
          </h2>
          <p className="font-body" style={{ color: 'rgba(246, 241, 231, 0.65)', fontSize: 15, lineHeight: 1.75, maxWidth: 500, margin: '0 0 28px' }}>
            Behind every brief we publish sits XAI, our intelligent engine in development. It connects property, transactions, infrastructure, capital and risk into one living model of the market, built from first-party data and two decades of on-the-ground execution in Dubai.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="font-caption" style={{ color: '#B08D4A', fontSize: 10, letterSpacing: '0.18em', padding: '8px 14px', border: '1px solid rgba(176, 141, 74, 0.5)', borderRadius: 4, background: 'rgba(176, 141, 74, 0.08)' }}>
              IN DEVELOPMENT
            </span>
            <span className="font-body" style={{ color: 'rgba(246, 241, 231, 0.55)', fontSize: 13 }}>
              Early demos go to advisory clients first.
            </span>
          </div>
        </div>

        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(87, 169, 159, 0.28)', boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)' }}>
          <img src="/images/intelligence-layers.jpg" alt="XAI intelligence layers over Dubai aerial view" style={{ display: 'block', width: '100%', height: 'auto', opacity: 0.92 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(11, 41, 37, 0.85) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18 }}>
            <div className="font-caption" style={{ color: '#57A99F', fontSize: 9.5, letterSpacing: '0.18em', marginBottom: 6 }}>
              PROPERTY · TRANSACTIONS · INFRASTRUCTURE · CAPITAL · RISK
            </div>
            <div className="font-nav" style={{ color: '#F6F1E7', fontSize: 15, letterSpacing: '0.04em' }}>
              One engine. Five layers. A clearer picture.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
