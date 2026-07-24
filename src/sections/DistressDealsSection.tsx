import { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import { INTEGRATIONS } from '../config/integrations'

function validEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

function validPhone(v: string): boolean {
  const digits = v.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15 && digits[0] !== '0'
}

export default function DistressDealsSection() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const emailOk = validEmail(email)
    const phoneOk = validPhone(phone)

    if (!emailOk && !phoneOk) {
      setError('Leave a valid email or a phone number with country code — one is enough.')
      return
    }
    setError('')
    if (state === 'sending') return
    setState('sending')

    try {
      const res = await fetch(INTEGRATIONS.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: emailOk ? email.trim() : '',
          phone: phoneOk ? phone.trim() : '',
          source: 'distress-deals',
          _subject: 'Distress Deals — serious inquiry',
        }),
      })
      if (!res.ok) throw new Error('bad status')
      setState('done')
    } catch {
      setState('error')
    }
  }

  return (
    <section id="distress-deals" style={{ position: 'relative', zIndex: 2, background: '#0B2925', padding: '90px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="font-caption" style={{ color: '#B08D4A', fontSize: 11, letterSpacing: '0.18em', marginBottom: 14 }}>
              DISTRESS DEALS
            </div>
            <h2 className="font-heading" style={{ color: '#F6F1E7', fontSize: 28, lineHeight: 1.25, marginBottom: 14 }}>
              THE BEST DEALS NEVER REACH THE PORTALS.
            </h2>
            <p className="font-body" style={{ color: 'rgba(246, 241, 231, 0.68)', fontSize: 15, lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
              Motivated sellers. Below-market entries. Off-market allocations. These move in hours, not weeks —
              and they go to the people already on the list. No free report here. If you're serious, leave your
              details and we talk.
            </p>
          </div>

          {state !== 'done' ? (
            <form onSubmit={handleSubmit} style={{ maxWidth: 520, margin: '0 auto' }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  style={{
                    flex: '1 1 220px', padding: '14px 18px', borderRadius: 6,
                    background: 'rgba(246, 241, 231, 0.06)', border: '1px solid rgba(176, 141, 74, 0.35)',
                    color: '#F6F1E7', fontSize: 14, outline: 'none',
                  }}
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone (with country code)"
                  style={{
                    flex: '1 1 220px', padding: '14px 18px', borderRadius: 6,
                    background: 'rgba(246, 241, 231, 0.06)', border: '1px solid rgba(176, 141, 74, 0.35)',
                    color: '#F6F1E7', fontSize: 14, outline: 'none',
                  }}
                />
              </div>

              {error && (
                <p style={{ color: '#E0A458', fontSize: 12, textAlign: 'center', marginBottom: 12 }}>{error}</p>
              )}
              {state === 'error' && (
                <p style={{ color: '#E0A458', fontSize: 12, textAlign: 'center', marginBottom: 12 }}>
                  Something went wrong — try again or WhatsApp +971 58 589 9112 directly.
                </p>
              )}

              <button
                type="submit"
                disabled={state === 'sending'}
                style={{
                  width: '100%', padding: '15px 24px', borderRadius: 6, border: 'none',
                  background: '#B08D4A', color: '#0B2925',
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 12,
                  letterSpacing: '0.12em', cursor: state === 'sending' ? 'wait' : 'pointer',
                  opacity: state === 'sending' ? 0.6 : 1, transition: 'opacity 0.2s ease',
                }}
              >
                {state === 'sending' ? 'SENDING...' : 'I\'M SERIOUS — LET\'S TALK'}
              </button>

              <p className="font-body" style={{ color: 'rgba(246, 241, 231, 0.4)', fontSize: 11, textAlign: 'center', marginTop: 14 }}>
                Email or phone — one is enough. Serious inquiries get a call, not a newsletter.
              </p>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div className="font-heading" style={{ color: '#B08D4A', fontSize: 20, marginBottom: 10 }}>
                YOU'RE ON THE LIST.
              </div>
              <p className="font-body" style={{ color: 'rgba(246, 241, 231, 0.75)', fontSize: 14, lineHeight: 1.7 }}>
                When the next distress opportunity lands, you hear it before the market does.
                <br />
                Need to move now? <a href={INTEGRATIONS.whatsapp} target="_blank" rel="noopener noreferrer" style={{ color: '#B08D4A', textDecoration: 'none', fontWeight: 600 }}>WhatsApp directly →</a>
              </p>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
