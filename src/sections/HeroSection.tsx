import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
        background: '#161C1B',
        overflow: 'hidden',
      }}
    >
      {/* Right-side intelligence globe visual */}
      <div
        className="hero-globe-wrap"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '58%',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.6s ease 0.4s',
          pointerEvents: 'none',
        }}
      >
        <img
          src="/images/AI-dubai-network-hero.png"
          alt="Dubai as a living intelligence network"
          data-parallax="0.10"
          style={{
            width: '100%',
            height: '112%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'saturate(1.05)',
          }}
        />
        {/* Fade the globe into the graphite ground */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, #161C1B 0%, rgba(22, 28, 27, 0.85) 22%, rgba(22, 28, 27, 0.25) 55%, rgba(22, 28, 27, 0.05) 100%), linear-gradient(0deg, #161C1B 0%, transparent 22%), linear-gradient(180deg, rgba(22, 28, 27, 0.6) 0%, transparent 20%)',
          }}
        />
        {/* Soft teal ambience */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 55% 45% at 70% 45%, rgba(87, 169, 159, 0.10) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          padding: '140px 24px 90px',
        }}
      >
        <div style={{ maxWidth: 700 }}>
          {/* Kicker */}
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(15px)',
              transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
              marginBottom: 28,
            }}
          >
            <span
              className="font-nav"
              style={{
                color: '#C2A878',
                fontSize: 11,
                letterSpacing: '0.28em',
                fontWeight: 600,
              }}
            >
              INDEPENDENT REAL ESTATE INVESTMENT INTELLIGENCE
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(25px)',
              transition: 'opacity 1s ease 0.55s, transform 1s ease 0.55s',
              marginBottom: 26,
            }}
          >
            <h1
              className="font-hero"
              style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                color: '#F7F2E8',
                lineHeight: 1.08,
                marginBottom: 6,
              }}
            >
              Property is the asset.
            </h1>
            <h1
              className="font-hero"
              style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                color: '#57A99F',
                lineHeight: 1.08,
                textShadow: '0 0 42px rgba(87, 169, 159, 0.35)',
              }}
            >
              Intelligence is the edge.
            </h1>
          </div>

          {/* Sub-copy */}
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              color: 'rgba(247, 242, 232, 0.72)',
              lineHeight: 1.75,
              maxWidth: 480,
              marginBottom: 14,
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(15px)',
              transition: 'opacity 0.8s ease 0.9s, transform 0.8s ease 0.9s',
            }}
          >
            We find what others miss. Market insight, first-party data and experience
            applied to exceptional real estate opportunities, today and tomorrow.
          </p>

          <p
            className="font-nav"
            style={{
              fontSize: 12,
              letterSpacing: '0.18em',
              color: 'rgba(194, 168, 120, 0.85)',
              marginBottom: 36,
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.8s ease 1.05s',
            }}
          >
            DUBAI · 25.2048° N, 55.2708° E
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(15px)',
              transition: 'opacity 0.8s ease 1.2s, transform 0.8s ease 1.2s',
            }}
          >
            <button
              onClick={() => scrollTo('market-intelligence')}
              className="font-nav"
              style={{
                padding: '15px 30px',
                borderRadius: 4,
                background: '#0F6B62',
                color: '#F7F2E8',
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'all 0.3s ease',
                letterSpacing: '0.08em',
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2E8A80'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0F6B62'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              EXPLORE THE INTELLIGENCE
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>

            <button
              onClick={() => scrollTo('founder-letter')}
              className="font-nav"
              style={{
                padding: '15px 30px',
                borderRadius: 4,
                background: 'transparent',
                color: 'rgba(247, 242, 232, 0.85)',
                border: '1px solid rgba(194, 168, 120, 0.45)',
                cursor: 'pointer',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'all 0.3s ease',
                letterSpacing: '0.08em',
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C2A878'
                e.currentTarget.style.color = '#F7F2E8'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(194, 168, 120, 0.45)'
                e.currentTarget.style.color = 'rgba(247, 242, 232, 0.85)'
              }}
            >
              MEET THE FOUNDER
            </button>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="font-nav"
        style={{
          position: 'absolute',
          bottom: 28,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 28,
          fontSize: 10,
          letterSpacing: '0.24em',
          color: 'rgba(247, 242, 232, 0.4)',
          zIndex: 2,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s ease 1.6s',
          padding: '0 24px',
          flexWrap: 'wrap',
        }}
      >
        <span>REAL DATA</span>
        <span style={{ color: 'rgba(194, 168, 120, 0.5)' }}>/</span>
        <span>REAL ANALYSIS</span>
        <span style={{ color: 'rgba(194, 168, 120, 0.5)' }}>/</span>
        <span>SMARTER DECISIONS</span>
      </div>

      {/* Responsive: soften globe on small screens */}
      <style>{`
        @media (max-width: 900px) {
          .hero-globe-wrap {
            width: 100% !important;
            opacity: 0.28 !important;
          }
        }
      `}</style>
    </section>
  )
}
