export default function FooterSection() {
  const socials = [
    { label: 'WhatsApp', href: 'https://wa.me/971585899112?app_absent=0' },
    { label: 'Instagram', href: 'https://instagram.com/mrlivingcapital' },
    { label: 'Telegram', href: 'https://t.me/mrlivingcapital' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mrlivingcapital/' },
  ]

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#081A16',
        padding: '64px 24px 32px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div className="font-nav" style={{ color: '#E8DDD0', fontSize: 16, marginBottom: 8, letterSpacing: '0.1em' }}>
              MR LIVING CAPITAL
            </div>
            <p className="font-body" style={{ color: '#5A7A72', fontSize: 14, lineHeight: 1.6 }}>
              Living Proof. Lasting Legacy.
              <br />
              Serious investors navigating the UAE market.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-caption" style={{ color: '#C9A87C', marginBottom: 16, fontSize: 11 }}>QUICK LINKS</div>
            {['Market Data', 'Corridors', 'Intelligence', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                className="font-body block"
                style={{
                  color: '#5A7A72',
                  fontSize: 14,
                  textDecoration: 'none',
                  marginBottom: 8,
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A87C')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#5A7A72')}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Connect */}
          <div>
            <div className="font-caption" style={{ color: '#C9A87C', marginBottom: 16, fontSize: 11 }}>CONNECT</div>
            <a
              href="mailto:Masoud@mrlivingcapital.com"
              className="font-body block"
              style={{ color: '#D4F1F4', fontSize: 14, textDecoration: 'none', marginBottom: 8, transition: 'color 0.3s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A87C')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#D4F1F4')}
            >
              Masoud@mrlivingcapital.com
            </a>
            <div className="font-body" style={{ color: '#5A7A72', fontSize: 14, marginBottom: 12 }}>
              Dubai, UAE · BRN: 94316
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-caption"
                  style={{ color: '#5A7A72', fontSize: 11, textDecoration: 'none', transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A87C')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#5A7A72')}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div
          style={{
            borderTop: '1px solid rgba(90, 122, 114, 0.15)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <span className="font-caption" style={{ color: 'rgba(90, 122, 114, 0.5)', fontSize: 10 }}>
            © 2026 MR Living Capital. All rights reserved. Dubai, UAE.
          </span>
          <span className="font-caption" style={{ color: 'rgba(90, 122, 114, 0.5)', fontSize: 10 }}>
            BRN: 94316 · mrlivingcapital.com
          </span>
        </div>
      </div>
    </footer>
  )
}