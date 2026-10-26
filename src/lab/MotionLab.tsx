import { useEffect, useRef, useState } from 'react'
import Globe from './Globe'

/**
 * MOTION LAB: the next-level preview of mrlivingcapital.com.
 * Four acts: cinematic hero, the living globe, the motion system,
 * find the gems. Runs as a full-screen overlay off the main site.
 */

const TEAL = '#57A99F'
const GOLD = '#B08D4A'
const IVORY = '#F6F1E7'

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (setSeen(true), obs.disconnect())),
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateY(0)' : 'translateY(34px)',
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

function Letters({ text, className, style, step = 0.035 }: { text: string; className?: string; style?: React.CSSProperties; step?: number }) {
  return (
    <span className={className} style={style} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            display: 'inline-block',
            animation: `lab-rise 0.9s cubic-bezier(0.22,1,0.36,1) ${i * step}s both`,
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  )
}

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      style={{ display: 'inline-block', transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)' }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        ref.current!.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.28}px, ${(e.clientY - r.top - r.height / 2) * 0.34}px)`
      }}
      onMouseLeave={() => (ref.current!.style.transform = 'translate(0,0)')}
    >
      {children}
    </div>
  )
}

function TiltCard({ title, line }: { title: string; line: string }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      style={{
        flex: '0 0 280px',
        padding: '26px 22px',
        borderRadius: 10,
        border: '1px solid rgba(87,169,159,0.3)',
        background: 'linear-gradient(160deg, rgba(13,39,35,0.8), rgba(18,59,55,0.6))',
        transition: 'transform 0.2s ease, border-color 0.3s ease',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -10
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 12
        ref.current!.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`
        ref.current!.style.borderColor = 'rgba(176,141,74,0.55)'
      }}
      onMouseLeave={() => {
        ref.current!.style.transform = 'perspective(700px) rotateX(0) rotateY(0)'
        ref.current!.style.borderColor = 'rgba(87,169,159,0.3)'
      }}
    >
      <div className="font-caption" style={{ color: GOLD, fontSize: 10, letterSpacing: '0.2em', marginBottom: 10 }}>MOTION SYSTEM</div>
      <div className="font-nav" style={{ color: IVORY, fontSize: 17, marginBottom: 8 }}>{title}</div>
      <div className="font-body" style={{ color: 'rgba(246,241,231,0.6)', fontSize: 13, lineHeight: 1.65 }}>{line}</div>
    </div>
  )
}

function GemHunt() {
  const [found, setFound] = useState<string[]>([])
  const gems = [
    { id: 'g1', x: 16, y: 30 },
    { id: 'g2', x: 62, y: 58 },
    { id: 'g3', x: 83, y: 22 },
  ]
  const done = found.length === 3
  return (
    <div style={{ position: 'relative', height: 340, borderRadius: 12, border: `1px solid ${done ? 'rgba(176,141,74,0.6)' : 'rgba(87,169,159,0.25)'}`, background: 'radial-gradient(ellipse at 50% 120%, rgba(15,107,98,0.25), rgba(10,33,30,0.9))', overflow: 'hidden', transition: 'border-color 0.5s ease' }}>
      {!done &&
        gems
          .filter((g) => !found.includes(g.id))
          .map((g) => (
            <button
              key={g.id}
              type="button"
              aria-label="Find the gem"
              onClick={() => setFound((f) => [...f, g.id])}
              style={{
                position: 'absolute',
                left: `${g.x}%`,
                top: `${g.y}%`,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                animation: 'lab-float 3.4s ease-in-out infinite',
                filter: 'drop-shadow(0 0 10px rgba(87,169,159,0.7))',
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L21 9L12 22L3 9L12 2Z" fill={TEAL} opacity="0.9" />
                <path d="M3 9H21M12 2L8 9L12 22L16 9L12 2Z" stroke="#0A211E" strokeWidth="0.8" />
              </svg>
            </button>
          ))}
      <div style={{ position: 'absolute', top: 18, left: 22 }} className="font-caption">
        <span style={{ color: 'rgba(246,241,231,0.55)', fontSize: 10, letterSpacing: '0.2em' }}>GEMS FOUND </span>
        <span style={{ color: GOLD, fontSize: 13 }}>{'◆'.repeat(found.length)}{'◇'.repeat(3 - found.length)}</span>
      </div>
      {done ? (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, animation: 'lab-rise 0.8s cubic-bezier(0.22,1,0.36,1) both' }}>
          <div className="font-display" style={{ color: GOLD, fontSize: 'clamp(22px, 3.4vw, 34px)' }}>All gems found.</div>
          <div className="font-body" style={{ color: 'rgba(246,241,231,0.7)', fontSize: 14 }}>On the live site, this unlocks a priority WhatsApp line and an exclusive brief.</div>
          <a href="https://wa.me/971585899112" target="_blank" rel="noopener noreferrer" className="font-caption" style={{ color: '#0A211E', background: GOLD, padding: '12px 22px', borderRadius: 5, textDecoration: 'none', fontSize: 11, letterSpacing: '0.14em', fontWeight: 600 }}>CLAIM THE REWARD →</a>
        </div>
      ) : (
        <div className="font-body" style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center', color: 'rgba(246,241,231,0.45)', fontSize: 12 }}>
          Three gems are hidden in this panel. Find them all.
        </div>
      )}
    </div>
  )
}

export default function MotionLab({ onClose }: { onClose: () => void }) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      if (ringRef.current) ringRef.current.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, background: '#0A211E', overflowY: 'auto', overflowX: 'hidden', cursor: 'none' }}>
      <style>{`
        @keyframes lab-rise { from { opacity: 0; transform: translateY(0.6em); } to { opacity: 1; transform: translateY(0); } }
        @keyframes lab-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes lab-cue { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.9; } }
        @keyframes lab-spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* custom cursor */}
      <div ref={cursorRef} style={{ position: 'fixed', width: 8, height: 8, borderRadius: '50%', background: GOLD, zIndex: 99, pointerEvents: 'none', mixBlendMode: 'difference' }} />
      <div ref={ringRef} style={{ position: 'fixed', width: 36, height: 36, borderRadius: '50%', border: `1px solid ${TEAL}`, zIndex: 99, pointerEvents: 'none', opacity: 0.55, transition: 'transform 0.12s ease-out' }} />

      <button
        type="button"
        onClick={onClose}
        className="font-caption"
        style={{ position: 'fixed', top: 20, right: 24, zIndex: 95, background: 'rgba(11,41,37,0.8)', border: '1px solid rgba(87,169,159,0.4)', color: IVORY, padding: '10px 16px', borderRadius: 5, fontSize: 10, letterSpacing: '0.18em', cursor: 'none' }}
      >
        ← BACK TO SITE
      </button>

      {/* ACT 1 · cinematic hero */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', padding: '0 24px', background: 'radial-gradient(ellipse 70% 55% at 50% 110%, rgba(15,107,98,0.22), transparent 60%)' }}>
        <div style={{ position: 'absolute', width: 560, height: 560, borderRadius: '50%', border: '1px solid rgba(87,169,159,0.14)', animation: 'lab-spin-slow 60s linear infinite' }} />
        <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', border: `1px dashed rgba(176,141,74,0.2)`, animation: 'lab-spin-slow 40s linear infinite reverse' }} />
        <div className="font-caption" style={{ color: TEAL, fontSize: 11, letterSpacing: '0.3em', marginBottom: 26 }}>
          <Letters text="THE NEXT LEVEL OF MRLIVINGCAPITAL.COM" step={0.018} />
        </div>
        <h1 className="font-hero" style={{ fontSize: 'clamp(40px, 7.5vw, 88px)', lineHeight: 1.08, margin: '0 0 10px', color: IVORY, fontWeight: 500 }}>
          <Letters text="Property is the asset." step={0.03} />
          <br />
          <span style={{ color: TEAL }}>
            <Letters text="Intelligence is the edge." step={0.03} />
          </span>
        </h1>
        <p className="font-body" style={{ color: 'rgba(246,241,231,0.6)', fontSize: 16, maxWidth: 520, marginTop: 18, animation: 'lab-rise 1s ease 1.1s both' }}>
          A preview of what your website becomes. Cinematic motion. Real 3D. Play that qualifies leads.
        </p>
        <div style={{ position: 'absolute', bottom: 34, animation: 'lab-cue 2.4s ease-in-out infinite' }} className="font-caption">
          <span style={{ color: 'rgba(246,241,231,0.6)', fontSize: 10, letterSpacing: '0.26em' }}>SCROLL ↓</span>
        </div>
      </section>

      {/* ACT 2 · the living globe */}
      <section style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'center', maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        <div>
          <Reveal>
            <div className="font-caption" style={{ color: TEAL, fontSize: 11, letterSpacing: '0.26em', marginBottom: 16 }}>ACT 02 · THE LIVING GLOBE</div>
            <h2 className="font-display" style={{ color: IVORY, fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.12, margin: '0 0 16px' }}>
              Your market,
              <br />
              <span style={{ color: TEAL }}>from orbit.</span>
            </h2>
            <p className="font-body" style={{ color: 'rgba(246,241,231,0.62)', fontSize: 15, lineHeight: 1.75, maxWidth: 440 }}>
              Real country borders. Capital arcs out of Dubai to the cities your investors come from. Drag it. This replaces the static hero image and the old basic globe, in your exact palette.
            </p>
            <div className="font-caption" style={{ color: GOLD, fontSize: 10, letterSpacing: '0.2em', marginTop: 22 }}>DUBAI · 25.2048° N, 55.2708° E — CAPITAL OF THE MAP</div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div style={{ height: 'min(66vh, 560px)' }}>
            <Globe />
          </div>
        </Reveal>
      </section>

      {/* ACT 3 · motion system */}
      <section style={{ minHeight: '100vh', maxWidth: 1200, margin: '0 auto', padding: '80px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Reveal>
          <div className="font-caption" style={{ color: TEAL, fontSize: 11, letterSpacing: '0.26em', marginBottom: 16 }}>ACT 03 · THE MOTION SYSTEM</div>
          <h2 className="font-display" style={{ color: IVORY, fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.12, margin: '0 0 34px' }}>
            What visitors <span style={{ color: TEAL }}>feel.</span>
          </h2>
        </Reveal>
        <div className="no-scrollbar" style={{ display: 'flex', gap: 18, overflowX: 'auto', scrollSnapType: 'x proximity', paddingBottom: 10 }}>
          {[
            { title: 'Magnetic calls to action', line: 'Buttons lean toward the cursor and snap back on release. Small detail, memorable feel, more clicks on Book a Call.' },
            { title: 'Depth cards', line: 'Cards tilt in 3D under the pointer with perspective shading. Used for Hidden Gems and Field Notes.' },
            { title: 'Cinematic reveals', line: 'Every chapter headline assembles letter by letter as it enters view. The brand speaks before the visitor reads.' },
            { title: 'The digital veil', line: 'Your signature particle field, upgraded to a GPU flow that reacts to the mouse and glows through the light chapters.' },
            { title: 'The chapter rail', line: 'The 01–08 story rail becomes a live journey map: position, progress, one-click chapter jumps.' },
          ].map((c, i) => (
            <div key={i} style={{ scrollSnapAlign: 'start' }}>
              <TiltCard title={c.title} line={c.line} />
            </div>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div style={{ marginTop: 34 }}>
            <Magnetic>
              <a href="#lab-gems" onClick={(e) => { e.preventDefault(); document.getElementById('lab-gems')?.scrollIntoView({ behavior: 'smooth' }) }} className="font-caption" style={{ display: 'inline-block', color: '#0A211E', background: TEAL, padding: '15px 28px', borderRadius: 6, textDecoration: 'none', fontSize: 11, letterSpacing: '0.16em', fontWeight: 600 }}>
                TRY THE LAST ACT ↓
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </section>

      {/* ACT 4 · find the gems */}
      <section id="lab-gems" style={{ minHeight: '100vh', maxWidth: 900, margin: '0 auto', padding: '80px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Reveal>
          <div className="font-caption" style={{ color: TEAL, fontSize: 11, letterSpacing: '0.26em', marginBottom: 16 }}>ACT 04 · FIND THE GEMS</div>
          <h2 className="font-display" style={{ color: IVORY, fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.12, margin: '0 0 14px' }}>
            Play that <span style={{ color: GOLD }}>qualifies leads.</span>
          </h2>
          <p className="font-body" style={{ color: 'rgba(246,241,231,0.62)', fontSize: 15, lineHeight: 1.75, maxWidth: 560, marginBottom: 30 }}>
            Your identity is Finding Gems. On the live site, five gems hide across the eight chapters. Visitors who find them all unlock a priority WhatsApp line and an exclusive brief. Engagement becomes intent.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <GemHunt />
        </Reveal>
        <Reveal delay={0.2}>
          <div className="font-caption" style={{ textAlign: 'center', marginTop: 44, color: 'rgba(246,241,231,0.45)', fontSize: 10, letterSpacing: '0.22em' }}>
            MRLC MOTION LAB · THIS IS WHAT SHIPS WHEN YOU SAY GO
          </div>
        </Reveal>
      </section>
    </div>
  )
}
