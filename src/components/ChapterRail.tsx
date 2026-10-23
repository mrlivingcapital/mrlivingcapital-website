import { useEffect, useState } from 'react'

/**
 * CHAPTER RAIL: fixed edge navigation for the story structure.
 * Tracks the active chapter via IntersectionObserver and lets the
 * visitor jump between chapters. Desktop only; mobile keeps native scroll.
 */
const CHAPTERS = [
  { id: 'ch-01-hook', num: '01', label: 'The Hook' },
  { id: 'ch-02-the-man', num: '02', label: 'The Man' },
  { id: 'ch-03-the-method', num: '03', label: 'The Method' },
  { id: 'ch-04-the-proof', num: '04', label: 'The Proof' },
  { id: 'ch-05-the-lab', num: '05', label: 'The Lab' },
  { id: 'ch-06-opportunities', num: '06', label: 'Opportunities' },
  { id: 'ch-07-knowledge', num: '07', label: 'The Knowledge' },
  { id: 'ch-08-conversation', num: '08', label: 'The Conversation' },
]

export default function ChapterRail() {
  const [active, setActive] = useState('ch-01-hook')
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const check = () => setHidden(window.innerWidth < 1100)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  if (hidden) return null

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      aria-label="Chapters"
      style={{
        position: 'fixed',
        left: 18,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 35,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {CHAPTERS.map((c) => {
        const exists = typeof document !== 'undefined' && document.getElementById(c.id)
        const isActive = active === c.id
        return (
          <button
            key={c.id}
            type="button"
            disabled={!exists}
            onClick={() => jump(c.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'none',
              border: 'none',
              cursor: exists ? 'pointer' : 'default',
              padding: 0,
              opacity: exists ? (isActive ? 1 : 0.55) : 0.22,
              transition: 'opacity 0.3s ease',
            }}
          >
            <span
              className="font-caption"
              style={{
                fontSize: 9,
                letterSpacing: '0.12em',
                color: isActive ? '#B08D4A' : '#7D8A86',
                minWidth: 16,
                textAlign: 'right',
              }}
            >
              {c.num}
            </span>
            <span
              style={{
                width: isActive ? 26 : 14,
                height: 1,
                background: isActive ? '#B08D4A' : 'rgba(125, 138, 134, 0.6)',
                transition: 'width 0.35s ease, background 0.35s ease',
              }}
            />
            <span
              className="font-caption"
              style={{
                fontSize: 9,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: isActive ? '#38413E' : '#7D8A86',
                opacity: isActive ? 1 : 0,
                width: isActive ? 'auto' : 0,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                transition: 'opacity 0.3s ease, width 0.3s ease',
              }}
            >
              {c.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
