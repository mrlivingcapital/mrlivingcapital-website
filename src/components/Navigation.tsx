import { useEffect, useState } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  const navItems = [
    { label: 'MY STORY', id: 'founder-letter' },
    { label: 'MARKET DATA', id: 'market-intelligence' },
    { label: 'CORRIDORS', id: 'corridors' },
    { label: 'INTELLIGENCE', id: 'blog' },
    { label: 'CONTACT', id: 'inquiry' },
  ]

  const socials = [
    { label: 'WhatsApp', href: 'https://wa.me/971585899112?app_absent=0' },
    { label: 'Instagram', href: 'https://instagram.com/mrlivingcapital' },
    { label: 'Telegram', href: 'https://t.me/mrlivingcapital' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mrlivingcapital/' },
  ]

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-400"
        style={{
          height: 70,
          backgroundColor: scrolled || mobileOpen ? 'rgba(10, 31, 26, 0.95)' : 'transparent',
          backdropFilter: scrolled || mobileOpen ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled || mobileOpen ? 'blur(12px)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="mx-auto flex items-center justify-between h-full" style={{ maxWidth: 1200, padding: '0 24px' }}>
          {/* Left: empty (logo removed from nav per client request) */}
          <div />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center" style={{ gap: 32 }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-nav transition-colors duration-300"
                style={{ color: '#E8DDD0', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', opacity: 0.85 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A87C'; e.currentTarget.style.opacity = '1' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#E8DDD0'; e.currentTarget.style.opacity = '0.85' }}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => scrollTo('inquiry')}
              className="font-nav transition-all duration-300"
              style={{
                padding: '10px 22px',
                borderRadius: 3,
                background: '#C9A87C',
                border: 'none',
                color: '#0A1F1A',
                fontSize: 11,
                cursor: 'pointer',
                letterSpacing: '0.08em',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#D4B896' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#C9A87C' }}
            >
              BOOK A CALL
            </button>
          </div>

          {/* Mobile: Hamburger + Book A Call */}
          <div className="flex md:hidden items-center" style={{ gap: 12 }}>
            <button
              onClick={() => scrollTo('inquiry')}
              style={{
                padding: '8px 14px',
                borderRadius: 3,
                background: '#C9A87C',
                border: 'none',
                color: '#0A1F1A',
                fontSize: 10,
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.06em',
              }}
            >
              BOOK A CALL
            </button>

            {/* Hamburger Icon */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
              }}
              aria-label="Toggle menu"
            >
              <span style={{
                display: 'block',
                width: 22,
                height: 2,
                background: mobileOpen ? '#C9A87C' : '#E8DDD0',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }} />
              <span style={{
                display: 'block',
                width: 22,
                height: 2,
                background: mobileOpen ? '#C9A87C' : '#E8DDD0',
                transition: 'all 0.3s ease',
                opacity: mobileOpen ? 0 : 1,
              }} />
              <span style={{
                display: 'block',
                width: 22,
                height: 2,
                background: mobileOpen ? '#C9A87C' : '#E8DDD0',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          style={{ top: 70 }}
          onClick={() => setMobileOpen(false)}
        >
          {/* Backdrop */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            animation: 'fadeIn 0.3s ease',
          }} />

          {/* Drawer */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '80%',
              maxWidth: 320,
              height: 'calc(100vh - 70px)',
              background: 'rgba(10, 31, 26, 0.98)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(201, 168, 124, 0.15)',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideIn 0.3s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ flex: 1 }}>
              <div style={{
                color: '#C9A87C',
                fontSize: 10,
                letterSpacing: '0.15em',
                fontFamily: 'Space Grotesk, sans-serif',
                marginBottom: 24,
                fontWeight: 600,
              }}>
                NAVIGATION
              </div>

              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '14px 0',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid rgba(90, 122, 114, 0.15)',
                    color: '#E8DDD0',
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A87C' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#E8DDD0' }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Social Links */}
            <div style={{ marginTop: 'auto' }}>
              <div style={{
                color: '#5A7A72',
                fontSize: 10,
                letterSpacing: '0.15em',
                fontFamily: 'Space Grotesk, sans-serif',
                marginBottom: 16,
                fontWeight: 600,
              }}>
                CONNECT
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#5A7A72',
                      fontSize: 12,
                      textDecoration: 'none',
                      fontFamily: 'Space Grotesk, sans-serif',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A87C' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#5A7A72' }}
                  >
                    {s.label.toUpperCase()}
                  </a>
                ))}
              </div>
              <div style={{
                color: 'rgba(90, 122, 114, 0.4)',
                fontSize: 10,
                marginTop: 20,
                fontFamily: 'Space Grotesk, sans-serif',
              }}>
                Dubai, UAE · BRN: 94316
              </div>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideIn {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}</style>
        </div>
      )}
    </>
  )
}