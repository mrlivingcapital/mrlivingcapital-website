import { useState } from 'react'
import { INTEGRATIONS } from '../config/integrations'

interface Props {
  source: string
  dark?: boolean
}

export default function EmailCapture({ source, dark = false }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setStatus('sending')
    try {
      const r = await fetch(INTEGRATIONS.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: `corridor-brief:${source}` }),
      })
      setStatus(r.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const ink = dark ? '#F6F1E7' : '#38413E'
  const mute = dark ? 'rgba(246,241,231,0.65)' : '#7D8A86'

  if (status === 'done') {
    return (
      <p style={{ color: dark ? '#57A99F' : '#0F6B62', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15 }}>
        You're in. First brief lands Monday.
      </p>
    )
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        style={{
          flex: '1 1 240px', maxWidth: 340, padding: '13px 18px', borderRadius: 8,
          border: `1px solid ${dark ? 'rgba(246,241,231,0.3)' : 'rgba(90,102,98,0.35)'}`,
          background: dark ? 'rgba(246,241,231,0.06)' : '#fff',
          color: ink, fontSize: 15, fontFamily: 'Inter, sans-serif', outline: 'none',
        }}
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          padding: '13px 26px', borderRadius: 8, border: 'none', cursor: 'pointer',
          background: '#0F6B62', color: '#F6F1E7', fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600, fontSize: 14, letterSpacing: '0.06em',
          opacity: status === 'sending' ? 0.7 : 1,
        }}
      >
        {status === 'sending' ? 'SUBSCRIBING…' : 'GET THE BRIEF'}
      </button>
      {status === 'error' && (
        <span style={{ width: '100%', color: '#B08D4A', fontSize: 12 }}>
          Something went wrong — try again or WhatsApp us directly.
        </span>
      )}
      <span style={{ width: '100%', color: mute, fontSize: 11 }}>
        Free. Weekly. Unsubscribe anytime.
      </span>
    </form>
  )
}
