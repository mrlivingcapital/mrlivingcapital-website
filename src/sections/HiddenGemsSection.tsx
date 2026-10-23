const GEMS = [
  {
    img: '/images/decision-lab-palm.jpg',
    district: 'Palm Jumeirah, Dubai',
    tag: 'LEGACY ASSET',
    note: 'Waterfront scarcity, branded residences, deep end-user demand.',
  },
  {
    img: '/images/decision-lab-marina.jpg',
    district: 'Dubai Marina',
    tag: 'PRIME DISTRICT',
    note: 'Liquid resale market, deep rental demand, metro linked.',
  },
  {
    img: '/images/decision-lab-bay.jpg',
    district: 'Business Bay',
    tag: 'VALUE ENTRY',
    note: 'Central business corridor repriced, strong yield on entry.',
  },
]

/**
 * THE HIDDEN GEMS: curated opportunity cards.
 * Snapshot districts we track closely. Full briefs go to qualified
 * conversations, not to open downloads.
 */
export default function HiddenGemsSection() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <section id="hidden-gems" style={{ position: 'relative', zIndex: 2, background: '#0B2925', padding: isMobile ? '80px 20px' : '110px 48px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 40% 50% at 15% 20%, rgba(87, 169, 159, 0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: isMobile ? 36 : 52 }}>
          <div>
            <div className="font-caption" style={{ color: '#57A99F', fontSize: 11, letterSpacing: '0.22em', marginBottom: 16 }}>
              THE HIDDEN GEMS
            </div>
            <h2 className="font-display" style={{ color: '#F6F1E7', fontSize: isMobile ? 'clamp(28px, 7vw, 36px)' : 'clamp(34px, 3.6vw, 50px)', lineHeight: 1.14, fontWeight: 500, margin: 0 }}>
              Curated insights.
              <br />
              <span style={{ color: '#57A99F' }}>Exceptional properties.</span>
            </h2>
          </div>
          <p className="font-body" style={{ color: 'rgba(246, 241, 231, 0.6)', fontSize: 14, lineHeight: 1.7, maxWidth: 380, margin: 0 }}>
            Districts and assets we track closely right now. The full thesis behind each goes to serious conversations, not open downloads.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 20 : 24 }}>
          {GEMS.map((g) => (
            <div
              key={g.district}
              style={{
                borderRadius: 10,
                overflow: 'hidden',
                border: '1px solid rgba(87, 169, 159, 0.22)',
                background: 'rgba(13, 39, 35, 0.6)',
                transition: 'transform 0.35s ease, border-color 0.35s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(176, 141, 74, 0.5)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(87, 169, 159, 0.22)' }}
            >
              <div style={{ position: 'relative', height: isMobile ? 180 : 210, overflow: 'hidden' }}>
                <img src={g.img} alt={`${g.district} aerial intelligence view`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.9, transition: 'transform 0.5s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(11, 41, 37, 0.9) 100%)' }} />
                <span
                  className="font-caption"
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    fontSize: 9,
                    letterSpacing: '0.18em',
                    color: '#B08D4A',
                    background: 'rgba(11, 41, 37, 0.82)',
                    border: '1px solid rgba(176, 141, 74, 0.45)',
                    padding: '4px 9px',
                    borderRadius: 3,
                  }}
                >
                  {g.tag}
                </span>
              </div>
              <div style={{ padding: '20px 20px 24px' }}>
                <div className="font-nav" style={{ color: '#F6F1E7', fontSize: 16, letterSpacing: '0.04em', marginBottom: 8 }}>
                  {g.district}
                </div>
                <p className="font-body" style={{ color: 'rgba(246, 241, 231, 0.58)', fontSize: 13, lineHeight: 1.65, margin: '0 0 16px' }}>
                  {g.note}
                </p>
                <a
                  href={`https://wa.me/971585899112?text=${encodeURIComponent(`I want the full brief on ${g.district}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-caption"
                  style={{ color: '#57A99F', fontSize: 10.5, letterSpacing: '0.16em', textDecoration: 'none', borderBottom: '1px solid rgba(87, 169, 159, 0.4)', paddingBottom: 2 }}
                >
                  REQUEST THE BRIEF →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
