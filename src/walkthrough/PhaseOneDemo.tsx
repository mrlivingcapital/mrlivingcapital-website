import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { SceneMetrics } from '../architecture/types'
import './PhaseOneDemo.css'

const SCENES = [
  ['architecture', 'Introduction'],
  ['founder-letter', 'Founder'],
  ['investor-intelligence', 'Method'],
  ['intelligence-layers', 'Five Layers'],
  ['market-intelligence', 'Evidence'],
  ['decision-lab', 'Decision Lab'],
  ['corridors', 'Corridors'],
  ['mansionr', 'MansionR'],
  ['lets-talk', 'Let’s Talk'],
  ['inquiry', 'Contact'],
] as const

const finalMode = new URLSearchParams(window.location.search).get('final-demo') === '1'
const enabled = finalMode || new URLSearchParams(window.location.search).get('phase1-demo') === '1'

function milliseconds(value?: number) {
  return value === undefined ? 'Pending' : `${Math.round(value).toLocaleString()} ms`
}

export default function PhaseOneDemo({ motionPaused, onToggleMotion }: { motionPaused: boolean; onToggleMotion: () => void }) {
  const [expanded, setExpanded] = useState(true)
  const [metrics, setMetrics] = useState<SceneMetrics | null>(null)
  const [vitals, setVitals] = useState<NonNullable<Window['__MRLC_VITALS__']>>({})

  useEffect(() => {
    if (!enabled) return
    const update = () => {
      setMetrics(window.__CITY_METRICS__?.() ?? null)
      setVitals({ ...window.__MRLC_VITALS__ })
    }
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])

  if (!enabled) return null

  return (
    <aside
      className={`phase-one-demo ${expanded ? 'is-expanded' : ''} ${finalMode ? 'final-review' : ''}`}
      aria-label={finalMode ? 'Final website review' : 'Phase 1 demonstration diagnostics'}
      data-native-scroll
      onWheel={(event) => event.stopPropagation()}
      onTouchEnd={(event) => event.stopPropagation()}
    >
      <div className="phase-one-demo-bar">
        <div>
          <span>{finalMode ? 'PHASES 01—03' : 'PHASE 01'}</span>
          <strong>{finalMode ? 'Final website review' : 'Experience foundation'}</strong>
        </div>
        <button
          type="button"
          aria-label={expanded ? 'Hide Phase 1 diagnostics' : 'Show Phase 1 diagnostics'}
          aria-expanded={expanded}
          aria-controls="phase-one-demo-details"
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      {expanded && <div id="phase-one-demo-details" className="phase-one-demo-details">
        <p className="phase-one-demo-intro">{finalMode ? 'All three enhancement phases on the approved nine-scene website. This review panel is query-only.' : 'The approved nine-scene experience, with a measurable performance and accessibility layer.'}</p>

        <div className="phase-one-features" aria-label="Website enhancements">
          <div><strong>Adaptive rendering</strong><span>Live DPR and frame-rate adjustment</span></div>
          <div><strong>Persistent motion control</strong><span>Pause, resume and reduced-motion support</span></div>
          <div><strong>Self-hosted typography</strong><span>Brand fonts without third-party requests</span></div>
          <div><strong>Privacy-safe Web Vitals</strong><span>LCP, INP and CLS only</span></div>
          {finalMode && <>
            <div><strong>Connected investor journeys</strong><span>Corridor and Decision Lab context in the inquiry</span></div>
            <div><strong>Research reading experience</strong><span>Progress, contents, reading time and print support</span></div>
            <div><strong>Consolidated inquiry handling</strong><span>Validation, safe payload limits and recovery states</span></div>
            <div><strong>Intent-only delivery</strong><span>Corridor HTML prefetch without automatic PDF downloads</span></div>
            <div><strong>Session-only continuity</strong><span>No personal information retained in browser storage</span></div>
          </>}
        </div>

        <dl className="phase-one-metrics">
          <div><dt>Render DPR</dt><dd data-demo-metric="dpr">{metrics?.dpr?.toFixed(2) ?? '—'}</dd></div>
          <div><dt>Frame rate</dt><dd>{metrics ? `${Math.round(metrics.fps)} fps` : '—'}</dd></div>
          <div><dt>Quality</dt><dd>{metrics?.quality ?? '—'}</dd></div>
          <div><dt>Motion</dt><dd>{motionPaused ? 'Paused' : 'Active'}</dd></div>
          <div><dt>LCP</dt><dd>{milliseconds(vitals.LCP?.value)}</dd></div>
          <div><dt>INP</dt><dd>{milliseconds(vitals.INP?.value)}</dd></div>
          <div><dt>CLS</dt><dd>{vitals.CLS?.value.toFixed(3) ?? 'Pending'}</dd></div>
        </dl>

        <button type="button" className="phase-one-motion" onClick={onToggleMotion} aria-pressed={motionPaused}>
          {motionPaused ? 'Resume motion' : 'Pause motion'}
        </button>

        <nav className="phase-one-scenes" aria-label="Phase 1 scene review">
          {SCENES.map(([id, label], index) => (
            <a href={`?${finalMode ? 'final-demo=1' : 'phase1-demo=1'}#${id}`} key={id}>
              <span>{String(index + 1).padStart(2, '0')}</span>{label}
            </a>
          ))}
        </nav>
      </div>}
    </aside>
  )
}
