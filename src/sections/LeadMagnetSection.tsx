import { useState, useRef } from 'react'
import ScrollReveal from '../components/ScrollReveal'

type ReportType = 'q1' | 'cashbuyer'

function validateWhatsApp(num: string): boolean {
  const digits = num.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15 && digits[0] !== '0'
}

export default function LeadMagnetSection() {
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [reportType, setReportType] = useState<ReportType>('q1')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; whatsapp?: string }>({})
  const linkRef = useRef<HTMLAnchorElement>(null)
  const [downloadPath, setDownloadPath] = useState('')

  const reports = {
    q1: {
      title: 'DUBAI Q1 2026',
      subtitle: 'MARKET INTELLIGENCE BRIEF',
      badge: '12 PAGES',
      pdfPath: '/downloads/Dubai-Real-Estate-Brief-Q1-2026.pdf',
      color: '#C9A87C',
    },
    cashbuyer: {
      title: 'CASH BUYER\'S GUIDE',
      subtitle: 'UAE REAL ESTATE 2026',
      badge: '5 PAGES',
      pdfPath: '/downloads/cash-buyer-market-analysis-2026.pdf',
      color: '#D4F1F4',
    },
  }

  const activeReport = reports[reportType]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { email?: string; whatsapp?: string } = {}

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Valid email required'
    }
    if (!whatsapp.trim() || !validateWhatsApp(whatsapp)) {
      newErrors.whatsapp = 'Valid WhatsApp with country code required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    if (submitting) return
    setSubmitting(true)

    // Submit to Formspree
    try {
      await fetch('https://formspree.io/f/xkokazvz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email,
          whatsapp,
          source: `Lead Magnet - ${reportType === 'q1' ? 'Q1 2026 Brief' : 'Cash Buyer Guide'}`,
          _subject: `Download: ${reportType === 'q1' ? 'Q1 2026 Brief' : 'Cash Buyer Guide'}`,
        }),
      })
    } catch {
      // Silently continue
    }

    setDownloadPath(activeReport.pdfPath)
    setSubmitted(true)
    setTimeout(() => linkRef.current?.click(), 600)
  }

  return (
    <section id="lead-magnet" style={{ position: 'relative', zIndex: 2, background: '#0A1F1A', padding: '100px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <ScrollReveal>
          <div className="glass-card" style={{ padding: '48px 40px', position: 'relative', overflow: 'hidden' }}>
            {/* Shimmer */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201, 168, 124, 0.4), transparent)', animation: 'shimmer 3s ease-in-out infinite' }} />

            {!submitted ? (
              <>
                {/* Report selector */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 28, justifyContent: 'center' }}>
                  {(['q1', 'cashbuyer'] as ReportType[]).map((rt) => (
                    <button
                      key={rt}
                      onClick={() => { setReportType(rt); setSubmitted(false); setErrors({}) }}
                      style={{
                        padding: '8px 18px', borderRadius: 6, fontSize: 11,
                        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
                        letterSpacing: '0.04em', cursor: 'pointer',
                        border: reportType === rt ? '1px solid #C9A87C' : '1px solid rgba(90,122,114,0.3)',
                        background: reportType === rt ? 'rgba(201,168,124,0.15)' : 'transparent',
                        color: reportType === rt ? '#C9A87C' : '#5A7A72',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {rt === 'q1' ? 'Q1 2026 BRIEF' : 'CASH BUYER GUIDE'}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
                  {/* PDF Visual */}
                  <div style={{
                    flex: '0 0 160px', height: 200,
                    background: `linear-gradient(160deg, #111F1A 0%, #0A1F1A 60%, ${activeReport.color}15 100%)`,
                    border: `1.5px solid ${activeReport.color}30`, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', boxShadow: `0 8px 32px rgba(10,31,26,0.6), inset 0 1px 0 ${activeReport.color}15`,
                  }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${activeReport.color}, transparent)`, opacity: 0.6 }} />
                    <div style={{ textAlign: 'center', padding: '16px 12px' }}>
                      <div style={{ fontSize: 8, color: '#5A7A72', letterSpacing: '0.15em', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 8 }}>MR LIVING CAPITAL</div>
                      <div className="font-display" style={{ fontSize: 22, color: activeReport.color, lineHeight: 1.15, fontWeight: 700, whiteSpace: 'pre-line' }}>{activeReport.title}</div>
                      <div style={{ fontSize: 10, color: '#E8DDD0', letterSpacing: '0.06em', fontFamily: 'Space Grotesk, sans-serif', marginTop: 6, opacity: 0.7, whiteSpace: 'pre-line' }}>{activeReport.subtitle}</div>
                      <div style={{ width: 24, height: 1, background: `linear-gradient(90deg, transparent, ${activeReport.color}, transparent)`, margin: '10px auto' }} />
                      <div style={{ color: 'rgba(90,122,114,0.7)', fontSize: 9, letterSpacing: '0.1em', fontFamily: 'Space Grotesk, sans-serif' }}>{activeReport.badge}</div>
                      <div style={{ position: 'absolute', bottom: 10, right: 10, padding: '3px 8px', borderRadius: 4, background: `${activeReport.color}15`, border: `1px solid ${activeReport.color}30`, fontSize: 8, color: activeReport.color, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.08em', fontWeight: 600 }}>PDF</div>
                    </div>
                  </div>

                  {/* Form */}
                  <div style={{ flex: 1, minWidth: 260 }}>
                    <h3 className="font-heading" style={{ fontSize: 18, color: '#E8DDD0', marginBottom: 6 }}>
                      {reportType === 'q1' ? 'Dubai Q1 2026 Market Intelligence Brief' : 'The Cash Buyer\'s Guide to UAE Real Estate'}
                    </h3>
                    <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.5)', fontSize: 13, marginBottom: 20 }}>
                      {reportType === 'q1'
                        ? 'Verified DLD data. Institutional-grade corridor analysis. Not public research — partner-only intelligence.'
                        : 'Negotiating below market value. Price per sqft analysis. The same framework forged over two decades.'}
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email address *"
                          required
                          style={{
                            width: '100%', padding: '12px 16px', borderRadius: 6,
                            background: 'rgba(10, 31, 26, 0.5)', border: errors.email ? '1px solid #E74C3C' : '1px solid rgba(90, 122, 114, 0.2)',
                            color: '#E8DDD0', fontSize: 13, outline: 'none',
                          }}
                        />
                        {errors.email && <span style={{ color: '#E74C3C', fontSize: 10, marginTop: 3, display: 'block' }}>{errors.email}</span>}
                      </div>

                      <div>
                        <input
                          type="tel"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="WhatsApp * (with country code, e.g. +97150...)"
                          required
                          style={{
                            width: '100%', padding: '12px 16px', borderRadius: 6,
                            background: 'rgba(10, 31, 26, 0.5)', border: errors.whatsapp ? '1px solid #E74C3C' : '1px solid rgba(90, 122, 114, 0.2)',
                            color: '#E8DDD0', fontSize: 13, outline: 'none',
                          }}
                        />
                        {errors.whatsapp && <span style={{ color: '#E74C3C', fontSize: 10, marginTop: 3, display: 'block' }}>{errors.whatsapp}</span>}
                        <span style={{ color: 'rgba(90,122,114,0.5)', fontSize: 9, marginTop: 3, display: 'block' }}>Required for download. We will WhatsApp you the report.</span>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary"
                        style={{ opacity: submitting ? 0.6 : 1, cursor: submitting ? 'wait' : 'pointer', fontSize: 11, padding: '12px 20px' }}
                      >
                        {submitting ? 'Sending...' : 'DOWNLOAD PDF'}
                      </button>
                    </form>

                    <p className="font-body" style={{ color: 'rgba(90, 122, 114, 0.5)', fontSize: 11, marginTop: 12 }}>
                      No spam. Your details are used to send the report only.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <h3 className="font-heading" style={{ fontSize: 18, color: '#C9A87C', marginBottom: 8 }}>DOWNLOAD STARTED</h3>
                <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.6)', fontSize: 14 }}>
                  Your {reportType === 'q1' ? 'Q1 2026 Market Brief' : 'Cash Buyer Guide'} is downloading. We will also WhatsApp you a copy.
                </p>
                <a ref={linkRef} href={downloadPath} download style={{ display: 'none' }} aria-hidden="true" />
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}
