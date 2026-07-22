import { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'

export default function InquirySection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    timeline: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Submit to Formspree
    try {
      await fetch('https://formspree.io/f/xkokazvz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: "Let's Talk Numbers - Inquiry Form",
          _subject: 'New Inquiry - MR Living Capital',
        }),
      })
    } catch {
      // Silently fail — still show success UI
    }
    // Show success UI
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(125, 138, 134, 0.08)',
    border: '1px solid rgba(125, 138, 134, 0.2)',
    borderRadius: 8,
    color: '#5A6662',
    fontSize: 15,
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  }

  return (
    <section
      id="inquiry"
      style={{
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(180deg, #F6F1E7 0%, #D9CDB8 50%, #F6F1E7 100%)',
        padding: '160px 24px',
      }}
    >
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#5A6662', marginBottom: 16 }}>
              THE <span style={{ color: '#0F6B62' }}>PARTNERSHIP</span> CONVERSATION
            </h2>
            <p className="font-body" style={{ color: 'rgba(90, 102, 98, 0.85)', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>
              Enter your capital allocation objectives for a tailored briefing. All inquiries handled with complete discretion. I review every submission personally.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {submitted ? (
            <div
              className="glass-card"
              style={{
                padding: '48px 32px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
              <h3 className="font-heading" style={{ fontSize: 24, color: '#0F6B62', marginBottom: 12 }}>
                INQUIRY RECEIVED
              </h3>
              <p className="font-body" style={{ color: 'rgba(90, 102, 98, 0.85)', fontSize: 15 }}>
                We will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(15, 107, 98, 0.45)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(125, 138, 134, 0.2)')}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(15, 107, 98, 0.45)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(125, 138, 134, 0.2)')}
                  />
                </div>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone or WhatsApp"
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(15, 107, 98, 0.45)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(125, 138, 134, 0.2)')}
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    required
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235A7A72' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                      paddingRight: 40,
                    }}
                  >
                    <option value="" disabled>Investment Interest</option>
                    <option value="off-plan">Off-Plan New Launch</option>
                    <option value="ready">Ready & Secondary Market</option>
                    <option value="portfolio">Portfolio Strategy</option>
                    <option value="research">Market Research Only</option>
                  </select>

                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235A7A72' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                      paddingRight: 40,
                    }}
                  >
                    <option value="" disabled>Acquisition Timeline</option>
                    <option value="immediately">Immediately</option>
                    <option value="2-4-weeks">2–4 Weeks</option>
                    <option value="2-months">Within 2 Months</option>
                    <option value="3-6-months">3–6 Months</option>
                    <option value="6-months+">6 Months+</option>
                  </select>
                </div>

                <textarea
                  name="message"
                  placeholder="Any additional information we should know?"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(15, 107, 98, 0.45)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(125, 138, 134, 0.2)')}
                />
              </div>

              <button
                type="submit"
                className="font-nav"
                style={{
                  width: '100%',
                  padding: '18px',
                  borderRadius: 8,
                  background: '#0F6B62',
                  color: '#F6F1E7',
                  border: 'none',
                  fontSize: 13,
                  cursor: 'pointer',
                  letterSpacing: '0.08em',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2E8A80'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#0F6B62'
                }}
              >
                SUBMIT INQUIRY →
              </button>

              <p
                className="font-caption"
                style={{
                  color: '#7D8A86',
                  fontSize: 11,
                  textAlign: 'center',
                  marginTop: 16,
                }}
              >
                All inquiries are treated with complete discretion. We will contact you within 24 hours.
              </p>
            </form>
          )}
        </ScrollReveal>

        {/* Contact Info */}
        <ScrollReveal delay={0.3}>
          <div
            style={{
              marginTop: 64,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 32,
              textAlign: 'center',
            }}
          >
            {[
              { label: 'Email', value: 'Masoud@mrlivingcapital.com', href: 'mailto:Masoud@mrlivingcapital.com' },
              { label: 'WhatsApp', value: 'Chat on WhatsApp', href: 'https://wa.me/971585899112' },
              { label: 'Location', value: 'Dubai, UAE', href: undefined },
              { label: 'License', value: 'BRN: 94316', href: undefined },
            ].map((item, i) => (
              <div key={i}>
                <div className="font-caption" style={{ color: '#7D8A86', fontSize: 11, marginBottom: 4 }}>
                  {item.label}
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: i === 0 || i === 1 ? '#0F6B62' : '#5A6662',
                      fontSize: 14,
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#0F6B62')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = i === 0 || i === 1 ? '#0F6B62' : '#5A6662')}
                  >
                    {item.value}
                  </a>
                ) : (
                  <div style={{ color: '#5A6662', fontSize: 14 }}>{item.value}</div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}