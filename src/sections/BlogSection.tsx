import { useState, useRef } from 'react'
import ScrollReveal from '../components/ScrollReveal'

interface BlogPost {
  title: string
  subtitle: string
  geo: string
  pdfPath: string
  color: string
  icon: string
  preview: string[]
}

const blogPosts: BlogPost[] = [
  {
    title: 'Why Dubai\'s 2026 Market Is the Best Entry Point for Cash Buyers',
    subtitle: 'DLD data reveals AED 252B in Q1 transactions. Here is why the window is still open.',
    geo: 'DUBAI',
    pdfPath: '/downloads/blog-dubai-cash-buyers-2026.pdf',
    color: '#0F6B62',
    icon: 'AE',
    preview: ['Q1 2026 DLD transaction breakdown by corridor', 'Cash buyer advantage vs mortgage financing', 'Entry price points per sqft by area', '5-year capital appreciation forecast'],
  },
  {
    title: 'Why British Investors Are Shifting Capital from London to Dubai in 2026',
    subtitle: 'London yields 3-4%. Dubai yields 6-9%. The math is moving money south.',
    geo: 'LONDON',
    pdfPath: '/downloads/blog-london-to-dubai-2026.pdf',
    color: '#0F6B62',
    icon: 'GB',
    preview: ['London vs Dubai yield comparison table', 'Tax implications for UK tax residents', 'Currency hedging strategies (GBP/AED)', 'Best corridors for British investors'],
  },
  {
    title: 'For Canadian Investors: Dubai vs. Toronto Real Estate in 2026',
    subtitle: 'Tax advantages, zero income tax, and price per sqft that Toronto cannot match.',
    geo: 'TORONTO',
    pdfPath: '/downloads/blog-toronto-dubai-comparison-2026.pdf',
    color: '#7D8A86',
    icon: 'CA',
    preview: ['Toronto vs Dubai price per sqft analysis', 'Zero income tax impact on net returns', 'Golden Visa pathway for Canadian families', 'CAD/AED currency considerations'],
  },
  {
    title: 'From the Balkans to Dubai: A Regional Investor\'s Guide to UAE Real Estate',
    subtitle: 'Why investors from Serbia, Croatia, and Bosnia are choosing Dubai corridors.',
    geo: 'BALKANS',
    pdfPath: '/downloads/blog-balkans-dubai-guide-2026.pdf',
    color: '#0F6B62',
    icon: 'RS',
    preview: ['Balkan investor case studies and allocations', 'Flight connectivity and relocation logistics', 'Legal framework for Serbian/Croatian buyers', 'Recommended developers with Balkan community presence'],
  },
  {
    title: 'سرمایه‌گذاری در دبی ۲۰۲۶: راهنمای جامع برای خریداران نقدی',
    subtitle: 'Dubai 2026 Investment Guide for the Farsi Speaking Diaspora. Golden Visa, corridors, and negotiation strategies.',
    geo: 'FARSI',
    pdfPath: '/downloads/blog-farsi-dubai-investment-2026.pdf',
    color: '#0F6B62',
    icon: 'FA',
    preview: ['Farsi-speaking community corridors in Dubai', 'Golden Visa step-by-step for Farsi speakers', 'Negotiation strategies specific to UAE market', 'Currency transfer and banking setup guide'],
  },
]

function validateWhatsApp(num: string): boolean {
  // Remove all non-digits
  const digits = num.replace(/\D/g, '')
  // Must be 10-15 digits, starting with country code (1-3 digits) + number
  return digits.length >= 10 && digits.length <= 15 && digits[0] !== '0'
}

export default function BlogSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; whatsapp?: string }>({})
  const linkRef = useRef<HTMLAnchorElement>(null)
  const [downloadPath, setDownloadPath] = useState('')

  const activePost = activeIndex !== null ? blogPosts[activeIndex] : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { fullName?: string; email?: string; whatsapp?: string } = {}

    if (!fullName.trim()) {
      newErrors.fullName = 'Your name is required'
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email or leave blank'
    }
    if (!whatsapp.trim() || !validateWhatsApp(whatsapp)) {
      newErrors.whatsapp = 'Valid WhatsApp number with country code required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    if (!activePost || submitting) return
    setSubmitting(true)

    // Submit to Formspree
    try {
      await fetch('https://formspree.io/f/xkokazvz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email: email || 'Not provided',
          whatsapp,
          source: `Blog Download - ${activePost.geo}`,
          post_title: activePost.title,
          _subject: `Blog Download: ${activePost.geo}`,
        }),
      })
    } catch {
      // Silently continue
    }

    setSubmitted(true)
    setDownloadPath(activePost.pdfPath)
    setTimeout(() => linkRef.current?.click(), 600)
  }

  const reset = () => {
    setActiveIndex(null)
    setFullName('')
    setEmail('')
    setWhatsapp('')
    setSubmitted(false)
    setSubmitting(false)
    setErrors({})
  }

  return (
    <section id="blog" style={{ position: 'relative', zIndex: 2, background: '#F6F1E7', padding: '120px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="font-caption" style={{ color: '#0F6B62', fontSize: 12, letterSpacing: '0.12em', display: 'block', marginBottom: 16 }}>
              INVESTOR'S DESK
            </span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#5A6662', marginBottom: 12 }}>
              THE <span style={{ color: '#0F6B62' }}>INVESTOR&apos;S DESK</span>
            </h2>
            <p className="font-body" style={{ color: 'rgba(90, 102, 98, 0.5)', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
              Geo-specific market briefings for Dubai, London, Toronto, the Balkans, and the Farsi Speaking Diaspora. Data-driven. DLD-verified.
            </p>
          </div>
        </ScrollReveal>

        {/* Blog Post Grid */}
        {!activePost && (
          <div className="blog-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}>
            {blogPosts.map((post, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  className="glass-card"
                  style={{
                    padding: '28px 24px',
                    cursor: 'pointer',
                    borderTop: `2px solid ${post.color}`,
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderTopWidth = '3px' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderTopWidth = '2px' }}
                >
                  <div>
                    <div style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: 4,
                      background: `${post.color}15`,
                      border: `1px solid ${post.color}30`,
                      color: post.color,
                      fontSize: 10,
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      marginBottom: 14,
                    }}>
                      {post.geo}
                    </div>
                    <h3 style={{
                      color: '#5A6662',
                      fontSize: 16,
                      fontWeight: 600,
                      fontFamily: 'Space Grotesk, sans-serif',
                      lineHeight: 1.4,
                      marginBottom: 10,
                    }}>
                      {post.title}
                    </h3>
                    <p style={{ color: 'rgba(90, 102, 98, 0.45)', fontSize: 13, lineHeight: 1.6 }}>
                      {post.subtitle}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 16,
                    color: '#0F6B62',
                    fontSize: 11,
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0F6B62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    DOWNLOAD PDF
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Download Form Modal */}
        {activePost && !submitted && (
          <ScrollReveal>
            <div className="glass-card" style={{ maxWidth: 520, margin: '0 auto', padding: '40px 36px', position: 'relative' }}>
              <button
                onClick={reset}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'none', border: 'none', color: '#7D8A86',
                  fontSize: 18, cursor: 'pointer', padding: 4,
                }}
              >✕</button>

              <div style={{
                display: 'inline-block', padding: '3px 10px', borderRadius: 4,
                background: `${activePost.color}15`, border: `1px solid ${activePost.color}30`,
                color: activePost.color, fontSize: 10, fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600, letterSpacing: '0.1em', marginBottom: 14,
              }}>{activePost.geo}</div>

              <h3 style={{ color: '#5A6662', fontSize: 20, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 8, lineHeight: 1.3 }}>
                {activePost.title}
              </h3>
              <p style={{ color: 'rgba(90, 102, 98, 0.5)', fontSize: 14, marginBottom: 20 }}>
                {activePost.subtitle}
              </p>

              {/* PDF Preview */}
              <div style={{ marginBottom: 24, padding: '14px 16px', borderRadius: 6, background: 'rgba(15, 107, 98, 0.06)', border: '1px solid rgba(15, 107, 98, 0.12)' }}>
                <p style={{ color: '#0F6B62', fontSize: 10, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 8 }}>WHAT&apos;S INSIDE THIS BRIEF</p>
                <ul style={{ margin: 0, padding: '0 0 0 16px', listStyle: 'none' }}>
                  {activePost.preview.map((item, idx) => (
                    <li key={idx} style={{ color: 'rgba(90, 102, 98, 0.55)', fontSize: 12, lineHeight: 1.6, marginBottom: 4, position: 'relative', paddingLeft: 12 }}>
                      <span style={{ position: 'absolute', left: 0, color: '#0F6B62' }}>&#8250;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Badge */}
              <div style={{ marginBottom: 20, textAlign: 'center' }}>
                <p style={{ color: 'rgba(125, 138, 134, 0.7)', fontSize: 10, fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1.5 }}>
                  All inquiries handled personally by Masoud &middot; BRN: 94316 &middot; Dubai, UAE
                </p>
                <p style={{ color: 'rgba(15, 107, 98, 0.6)', fontSize: 10, fontFamily: 'Space Grotesk, sans-serif', marginTop: 2 }}>
                  2 decades of institutional strategy &amp; private portfolio management
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ color: '#7D8A86', fontSize: 11, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: 6,
                      background: 'rgba(246, 241, 231, 0.5)', border: errors.fullName ? '1px solid #E74C3C' : '1px solid rgba(125, 138, 134, 0.2)',
                      color: '#5A6662', fontSize: 14, outline: 'none',
                    }}
                  />
                  {errors.fullName && <span style={{ color: '#E74C3C', fontSize: 11, marginTop: 4, display: 'block' }}>{errors.fullName}</span>}
                </div>

                <div>
                  <label style={{ color: '#7D8A86', fontSize: 11, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
                    EMAIL ADDRESS (optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: 6,
                      background: 'rgba(246, 241, 231, 0.5)', border: errors.email ? '1px solid #E74C3C' : '1px solid rgba(125, 138, 134, 0.2)',
                      color: '#5A6662', fontSize: 14, outline: 'none',
                    }}
                  />
                  {errors.email && <span style={{ color: '#E74C3C', fontSize: 11, marginTop: 4, display: 'block' }}>{errors.email}</span>}
                </div>

                <div>
                  <label style={{ color: '#7D8A86', fontSize: 11, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
                    WHATSAPP NUMBER * (with country code)
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+971501234567"
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: 6,
                      background: 'rgba(246, 241, 231, 0.5)', border: errors.whatsapp ? '1px solid #E74C3C' : '1px solid rgba(125, 138, 134, 0.2)',
                      color: '#5A6662', fontSize: 14, outline: 'none',
                    }}
                  />
                  {errors.whatsapp && <span style={{ color: '#E74C3C', fontSize: 11, marginTop: 4, display: 'block' }}>{errors.whatsapp}</span>}
                  <span style={{ color: 'rgba(125, 138, 134, 0.6)', fontSize: 10, marginTop: 4, display: 'block' }}>
                    We&apos;ll send you the PDF via WhatsApp within 5 minutes
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '14px 32px', borderRadius: 6,
                    background: submitting ? '#7D8A86' : '#0F6B62', border: 'none',
                    color: '#F6F1E7', fontSize: 12, fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 600, letterSpacing: '0.08em', cursor: submitting ? 'wait' : 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {submitting ? 'SENDING...' : 'DOWNLOAD PDF'}
                </button>
              </form>
            </div>
          </ScrollReveal>
        )}

        {/* Success State */}
        {submitted && activePost && (
          <ScrollReveal>
            <div className="glass-card" style={{ maxWidth: 520, margin: '0 auto', padding: '40px 36px', textAlign: 'center' }}>
              <div style={{ color: '#7D8A86', fontSize: 11, marginBottom: 8 }}>✓ Download Started</div>
              <h3 style={{ color: '#0F6B62', fontSize: 18, marginBottom: 8 }}>{activePost.title}</h3>
              <p style={{ color: 'rgba(90, 102, 98, 0.6)', fontSize: 14, marginBottom: 20 }}>
                Your report is downloading. We will also reach out via WhatsApp shortly.
              </p>
              <button
                onClick={reset}
                style={{
                  padding: '10px 24px', borderRadius: 6,
                  background: 'transparent', border: '1px solid rgba(15, 107, 98, 0.25)',
                  color: '#0F6B62', fontSize: 12, cursor: 'pointer',
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, letterSpacing: '0.06em',
                }}
              >
                BACK TO REPORTS
              </button>
              <a ref={linkRef} href={downloadPath} download style={{ display: 'none' }} aria-hidden="true" />
            </div>
          </ScrollReveal>
        )}

        <style>{`
          @media (max-width: 900px) {
            .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 600px) {
            .blog-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
