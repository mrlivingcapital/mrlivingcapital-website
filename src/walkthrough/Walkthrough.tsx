import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import {
  ContactSlide, CorridorsSlide, DecisionLabSlide,
  FounderSlide, LayersSlide, LetsTalkSlide, MarketSlide,
  OpeningSlide, ThesisSlide,
} from './Slides'
import './Walkthrough.css'

const ExperienceCanvas = lazy(() => import('./ExperienceCanvas'))

const SLIDES = [
  { id: 'architecture', label: 'Introduction', short: 'Opening', steps: 1 },
  { id: 'founder-letter', label: 'The Founder', short: 'Founder', steps: 1 },
  { id: 'investor-intelligence', label: 'Investor Intelligence', short: 'Method', steps: 1 },
  { id: 'intelligence-layers', label: 'The Intelligence Layer', short: 'Five Layers', steps: 5 },
  { id: 'market-intelligence', label: 'Market Intelligence', short: 'Evidence', steps: 1 },
  { id: 'decision-lab', label: 'Investment Decision Lab', short: 'Decision Lab', steps: 1 },
  { id: 'corridors', label: 'Why These Corridors', short: 'Corridors', steps: 1 },
  { id: 'lets-talk', label: 'Let’s Talk & Common Questions', short: 'Let’s Talk', steps: 1 },
  { id: 'inquiry', label: 'The Partnership Conversation', short: 'Contact', steps: 1 },
]

const ALIASES: Record<string, string> = {
  'founder-stats': 'founder-letter', thesis: 'investor-intelligence',
  blog: 'lets-talk', 'field-notes': 'lets-talk', 'lead-magnet': 'lets-talk',
  'hidden-gems': 'lets-talk', 'private-opportunities': 'lets-talk',
  'distress-deals': 'lets-talk', 'whats-next': 'lets-talk', faq: 'lets-talk',
  market: 'market-intelligence', contact: 'inquiry', 'corridor-brief': 'inquiry',
}

function indexForHash(hash: string) {
  const raw = hash.replace('#', '')
  const id = ALIASES[raw] || raw
  const index = SLIDES.findIndex((slide) => slide.id === id)
  return index >= 0 ? index : 0
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export default function Walkthrough() {
  const rootRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const lockTimer = useRef<number | undefined>(undefined)
  const historyReady = useRef(false)
  const touchStart = useRef({ x: 0, y: 0 })
  const [active, setActive] = useState(() => indexForHash(window.location.hash))
  const [step, setStep] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [webgl] = useState(supportsWebGL)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const lock = useCallback((duration: number) => {
    window.clearTimeout(lockTimer.current)
    lockTimer.current = window.setTimeout(() => { lockTimer.current = undefined }, duration)
  }, [])

  const navigate = useCallback((direction: number) => {
    if (lockTimer.current !== undefined || menuOpen) return
    const maxStep = SLIDES[active].steps - 1
    if (direction > 0 && step < maxStep) {
      setStep((current) => Math.min(maxStep, current + 1))
      lock(reducedMotion ? 80 : 640)
      return
    }
    if (direction < 0 && step > 0) {
      setStep((current) => Math.max(0, current - 1))
      lock(reducedMotion ? 80 : 640)
      return
    }
    const next = Math.max(0, Math.min(SLIDES.length - 1, active + direction))
    if (next === active) return
    setActive(next)
    setStep(0)
    lock(reducedMotion ? 80 : 1080)
  }, [active, step, menuOpen, reducedMotion, lock])

  const goTo = useCallback((id: string) => {
    const resolved = ALIASES[id] || id
    const index = SLIDES.findIndex((slide) => slide.id === resolved)
    if (index < 0) return
    setMenuOpen(false)
    setActive(index)
    setStep(0)
    lock(reducedMotion ? 80 : 1080)
  }, [reducedMotion, lock])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const root = rootRef.current
    const holdTrackOrigin = () => {
      if (!root || (root.scrollLeft === 0 && root.scrollTop === 0)) return
      root.scrollLeft = 0
      root.scrollTop = 0
    }
    document.body.style.overflow = 'hidden'
    root?.addEventListener('scroll', holdTrackOrigin, { passive: true })
    return () => {
      document.body.style.overflow = previousOverflow
      root?.removeEventListener('scroll', holdTrackOrigin)
      window.clearTimeout(lockTimer.current)
    }
  }, [])

  useEffect(() => {
    const id = SLIDES[active].id
    const root = rootRef.current
    if (root) {
      root.scrollLeft = 0
      root.scrollTop = 0
    }
    if (window.location.hash !== `#${id}`) {
      const url = `${window.location.pathname}${window.location.search}#${id}`
      if (historyReady.current) history.pushState(null, '', url)
      else history.replaceState(null, '', url)
    }
    historyReady.current = true
  }, [active])

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#lab') return
      const next = indexForHash(window.location.hash)
      setActive(next)
      setStep(0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const onWheel = (event: WheelEvent) => {
      if (menuOpen || event.ctrlKey || event.metaKey) return
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      if (Math.abs(delta) < 12) return
      const target = event.target instanceof Element ? event.target : null
      const nativeScroll = target?.closest<HTMLElement>('[data-native-scroll], .slide-layout')
      if (nativeScroll && nativeScroll.scrollHeight > nativeScroll.clientHeight + 2) {
        const canMove = delta > 0
          ? nativeScroll.scrollTop + nativeScroll.clientHeight < nativeScroll.scrollHeight - 2
          : nativeScroll.scrollTop > 2
        if (canMove) return
      }
      event.preventDefault()
      navigate(delta > 0 ? 1 : -1)
    }
    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      touchStart.current = { x: touch.clientX, y: touch.clientY }
    }
    const onTouchEnd = (event: TouchEvent) => {
      if (menuOpen) return
      const touch = event.changedTouches[0]
      const dx = touch.clientX - touchStart.current.x
      const dy = touch.clientY - touchStart.current.y
      if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.2) navigate(dx < 0 ? 1 : -1)
    }
    root.addEventListener('wheel', onWheel, { passive: false })
    root.addEventListener('touchstart', onTouchStart, { passive: true })
    root.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      root.removeEventListener('wheel', onWheel)
      root.removeEventListener('touchstart', onTouchStart)
      root.removeEventListener('touchend', onTouchEnd)
    }
  }, [navigate, menuOpen])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        return
      }
      const target = event.target instanceof HTMLElement ? event.target : null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return
      if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); navigate(1) }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); navigate(-1) }
      if (event.key === 'Home') { event.preventDefault(); goTo('architecture') }
      if (event.key === 'End') { event.preventDefault(); goTo('inquiry') }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, goTo, menuOpen])

  useEffect(() => {
    if (!menuOpen || !menuRef.current) return
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const menu = menuRef.current
    const focusable = () => Array.from(menu.querySelectorAll<HTMLElement>('button, a[href]')).filter((element) => !element.hasAttribute('disabled'))
    focusable()[0]?.focus()
    const trap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const items = focusable()
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    menu.addEventListener('keydown', trap)
    return () => { menu.removeEventListener('keydown', trap); previous?.focus() }
  }, [menuOpen])

  const renderSlide = (index: number) => {
    switch (SLIDES[index].id) {
      case 'architecture': return <OpeningSlide onNext={() => navigate(1)} />
      case 'founder-letter': return <FounderSlide onNavigate={goTo} />
      case 'investor-intelligence': return <ThesisSlide onNavigate={goTo} />
      case 'intelligence-layers': return <LayersSlide step={step} onStep={(next) => setStep(Math.max(0, Math.min(4, next)))} />
      case 'market-intelligence': return <MarketSlide />
      case 'decision-lab': return <DecisionLabSlide />
      case 'corridors': return <CorridorsSlide />
      case 'lets-talk': return <LetsTalkSlide onNavigate={goTo} />
      case 'inquiry': return <ContactSlide />
      default: return null
    }
  }

  const isLayerStep = SLIDES[active].id === 'intelligence-layers' && step < 4

  return (
    <main ref={rootRef} className={`walkthrough ${menuOpen ? 'menu-is-open' : ''}`} aria-label="MR Living Capital cinematic walkthrough">
      {webgl ? <Suspense fallback={<div className="scene-loading">FORMING THE INTELLIGENCE TOWER…</div>}><ExperienceCanvas activeSlide={active} /></Suspense> : <div className={`tower-fallback ${active === 0 ? 'active' : ''}`} aria-hidden="true"><i /><i /><i /></div>}
      <div className="scene-shade" aria-hidden="true" />
      <div className="scene-grain" aria-hidden="true" />

      <header className="walk-header">
        <button type="button" className="walk-brand" onClick={() => goTo('architecture')} aria-label="MR Living Capital — opening scene"><img src="/images/mr-living-capital-logo.png" alt="MR Living Capital" /></button>
        <nav className="walk-desktop-nav" aria-label="Primary navigation">
          <button type="button" onClick={() => goTo('founder-letter')}>FOUNDER</button>
          <button type="button" onClick={() => goTo('intelligence-layers')}>INTELLIGENCE</button>
          <button type="button" onClick={() => goTo('corridors')}>CORRIDORS</button>
          <button type="button" onClick={() => goTo('lets-talk')}>LET’S TALK</button>
        </nav>
        <div className="walk-header-actions">
          <button type="button" className="header-inquiry" onClick={() => goTo('inquiry')}>PRIVATE INQUIRY<ArrowRight size={14} /></button>
          <button type="button" className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open scene menu"><Menu size={20} /></button>
        </div>
      </header>

      <div className="walk-track" style={{ transform: `translate3d(-${active * 100}vw, 0, 0)` }}>
        {SLIDES.map((slide, index) => (
          <section
            id={`scene-${slide.id}`}
            data-slide={slide.id}
            key={slide.id}
            className={`walk-slide walk-slide-${index} ${active === index ? 'is-active' : ''}`}
            data-active={active === index}
            aria-label={`${index + 1} of ${SLIDES.length}: ${slide.label}`}
            aria-hidden={active !== index}
            inert={active !== index}
          >
            {renderSlide(index)}
          </section>
        ))}
      </div>

      <div className="walk-progress" aria-label="Walkthrough progress">
        <span>{String(active + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}</span>
        <div className="progress-scenes">{SLIDES.map((slide, index) => <button type="button" key={slide.id} className={active === index ? 'active' : ''} onClick={() => goTo(slide.id)} aria-label={`Go to ${slide.label}`} aria-current={active === index ? 'step' : undefined}><i /></button>)}</div>
        <strong>{SLIDES[active].short}{SLIDES[active].steps > 1 ? ` · ${step + 1}/5` : ''}</strong>
      </div>

      <div className={`gesture-cue ${active === SLIDES.length - 1 ? 'is-complete' : ''}`} aria-hidden="true">
        <span>{isLayerStep ? `NEXT LAYER · ${step + 1}/5` : active === SLIDES.length - 1 ? 'THE CONVERSATION STARTS HERE' : 'SCROLL · SWIPE TO EXPLORE'}</span>
        {active !== SLIDES.length - 1 && <div className="gesture-line"><i /><i /><i /></div>}
      </div>

      <div className="scene-mode" aria-hidden="true"><i />{webgl ? 'LIVE FORM + DIGITAL VEIL' : 'LIGHTWEIGHT MODE'}</div>
      <div className="sr-only" aria-live="polite">{SLIDES[active].label}{SLIDES[active].steps > 1 ? `, layer ${step + 1} of 5` : ''}</div>

      {menuOpen && (
        <div className="scene-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Scene navigation">
          <div className="menu-topline"><span>MR LIVING CAPITAL · SCENE INDEX</span><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close scene menu"><X size={22} /></button></div>
          <nav>{SLIDES.map((slide, index) => <button type="button" key={slide.id} className={active === index ? 'active' : ''} onClick={() => goTo(slide.id)}><span>{String(index + 1).padStart(2, '0')}</span>{slide.label}<ArrowRight size={18} /></button>)}</nav>
          <div className="menu-footer"><span>WHEEL / SWIPE / ARROW KEYS</span><a href="/blog/">RESEARCH LIBRARY</a></div>
        </div>
      )}
    </main>
  )
}
