import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
      }}
    >
      {/* Dark vignette overlay for text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(10, 31, 26, 0.88) 0%, rgba(10, 31, 26, 0.4) 50%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ textAlign: 'center', maxWidth: 720, padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Logo + brand */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
            marginBottom: 10,
          }}
        >
          <img
            src="/images/logo-transparent.png"
            alt="MR Living Capital"
            style={{
              height: 'clamp(140px, 20vw, 260px)',
              width: 'auto',
              display: 'block',
              margin: '0 auto',
            }}
          />
          <div style={{ width: 40, height: 1, background: 'rgba(201, 168, 124, 0.3)', margin: '10px auto 0' }} />
        </div>

        {/* Main Headline */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(25px)',
            transition: 'opacity 1s ease 0.6s, transform 1s ease 0.6s',
            marginBottom: 10,
          }}
        >
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(44px, 8vw, 88px)',
              color: '#E8DDD0',
              marginBottom: 4,
              textShadow: '0 2px 30px rgba(10, 31, 26, 0.8)',
            }}
          >
            LIVING PROOF.
          </h1>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(44px, 8vw, 88px)',
              color: '#C9A87C',
              textShadow: '0 2px 30px rgba(10, 31, 26, 0.8)',
            }}
          >
            LASTING LEGACY.
          </h1>
        </div>

        {/* Tagline */}
        <p
          className="font-body"
          style={{
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            fontStyle: 'italic',
            color: 'rgba(232, 221, 208, 0.75)',
            marginBottom: 6,
            textShadow: '0 1px 10px rgba(10, 31, 26, 0.9)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.8s ease 1s, transform 0.8s ease 1s',
          }}
        >
          The numbers make sense — or we don't proceed.
        </p>

        <p
          className="font-body"
          style={{
            fontSize: 15,
            color: 'rgba(232, 221, 208, 0.55)',
            marginBottom: 24,
            textShadow: '0 1px 8px rgba(10, 31, 26, 0.9)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.8s ease 1.2s, transform 0.8s ease 1.2s',
          }}
        >
          Backed by two decades in strategic financial management.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.8s ease 1.4s, transform 0.8s ease 1.4s',
          }}
        >
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-nav"
            style={{
              padding: '14px 28px',
              borderRadius: 4,
              background: '#C9A87C',
              color: '#0A1F1A',
              textDecoration: 'none',
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.3s ease',
              letterSpacing: '0.06em',
              fontWeight: 600,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#D4B896'
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#C9A87C'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21l1.65-3.8a9 9 0 113.4 2.9L3 21" />
              <path d="M9 12a1 1 0 001 0h0" />
              <path d="M15 12a1 1 0 001 0h0" />
              <path d="M10 15c.5 1 2.5 1.5 3.5 0" />
            </svg>
            WHATSAPP US
          </a>

          <a
            href="#inquiry"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="font-nav"
            style={{
              padding: '14px 28px',
              borderRadius: 4,
              background: 'transparent',
              color: '#E8DDD0',
              border: '1px solid rgba(90, 122, 114, 0.4)',
              textDecoration: 'none',
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.3s ease',
              letterSpacing: '0.06em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201, 168, 124, 0.5)'
              e.currentTarget.style.color = '#C9A87C'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(90, 122, 114, 0.4)'
              e.currentTarget.style.color = '#E8DDD0'
            }}
          >
            START A CONVERSATION
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: loaded ? 0.5 : 0,
            transition: 'opacity 1s ease 2s',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5A7A72" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}