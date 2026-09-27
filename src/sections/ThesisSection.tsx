import { useEffect, useRef, useState } from 'react'

/**
 * THESIS STRIP (2026-09-27) — the four MRLC messaging pillars.
 * Bridges reel/social traffic into the site argument: each card is one
 * pillar of the unified cross-channel thesis and deep-links to its
 * destination. Copy follows studio lint: no em-dash, no invented stats.
 */

const PILLARS = [
  {
    n: '01',
    title: 'First-Party Data Over Narrative',
    line: 'Everyone quotes the market. We measure it ourselves, and we publish the scoreboard, including the misses.',
    link: '/blog/',
    cta: 'Read the briefings',
  },
  {
    n: '02',
    title: 'Timing Is Priced, Not Felt',
    line: 'Waiting is an option. Options need triggers: name the postcode, set the deadline, pre-decide the proof.',
    link: '/deals/',
    cta: 'See live opportunities',
  },
  {
    n: '03',
    title: 'Delivery Over Announcement',
    line: "Dubai's growth vector is paved and dated. Move before the concrete, not after it.",
    link: '/corridors/',
    cta: 'Explore the corridors',
  },
  {
    n: '04',
    title: 'The Plan Is the Product',
    line: 'You are not buying a property. You are buying a payment plan. The structure decides the return.',
    link: '/off-plan/',
    cta: 'Understand off-plan',
  },
]

export default function ThesisSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="thesis"
      ref={ref}
      style={{ padding: '72px 24px', maxWidth: 1120, margin: '0 auto' }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: 40,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <p
          className="font-nav"
          style={{
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#0F6B62',
            marginBottom: 12,
          }}
        >
          How We Invest
        </p>
        <h2
          className="font-hero"
          style={{ fontSize: 'clamp(26px, 4vw, 40px)', color: '#38413E', marginBottom: 10 }}
        >
          The numbers make sense, or we don't proceed.
        </h2>
        <p className="font-body" style={{ fontSize: 15, color: '#5A6662', maxWidth: 620, margin: '0 auto' }}>
          Four principles, one scoreboard. Everything we publish, from briefings to corridors, runs through them.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: 16,
        }}
      >
        {PILLARS.map((p, i) => (
          <a
            key={p.n}
            href={p.link}
            style={{
              background: '#EEE7DA',
              border: '1px solid rgba(15, 107, 98, 0.12)',
              borderRadius: 6,
              padding: '24px 20px',
              textDecoration: 'none',
              display: 'block',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s, border-color 0.3s ease`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(15, 107, 98, 0.45)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(15, 107, 98, 0.12)'
            }}
          >
            <div
              className="font-nav"
              style={{
                fontSize: 11,
                letterSpacing: '0.18em',
                color: '#B08D4A',
                marginBottom: 10,
              }}
            >
              {p.n}
            </div>
            <h3
              className="font-hero"
              style={{ fontSize: 17, color: '#0F6B62', marginBottom: 10, lineHeight: 1.3 }}
            >
              {p.title}
            </h3>
            <p className="font-body" style={{ fontSize: 13.5, color: '#5A6662', lineHeight: 1.65, marginBottom: 16 }}>
              {p.line}
            </p>
            <span
              className="font-nav"
              style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0F6B62' }}
            >
              {p.cta} →
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
