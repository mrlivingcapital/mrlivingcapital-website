import { useCallback, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowUpRight, Building2, ChevronRight, Layers3, Menu, MousePointer2, RotateCcw, X } from 'lucide-react'
import './architecture.css'
import { CityCanvas, type CitySceneHandle } from './components/CityCanvas'
import { ContentDrawer } from './components/ContentDrawer'
import { LayerToggles } from './components/LayerToggles'
import { NAV_ITEMS } from './data/content'
import { getLandmark, LANDMARKS, ZONES } from './data/landmarks'
import type { DataLayerId, DrawerId, HoverState, Landmark, SceneMetrics, ZoneId } from './types'

export default function ArchitectureExperience() {
  const sceneRef = useRef<CitySceneHandle>(null)
  const [zone, setZone] = useState<ZoneId>('dubai')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hover, setHover] = useState<HoverState | null>(null)
  const [drawer, setDrawer] = useState<DrawerId>(null)
  const [introComplete, setIntroComplete] = useState(false)
  const [activeLayers, setActiveLayers] = useState<DataLayerId[]>(['property'])
  const [metrics, setMetrics] = useState<SceneMetrics>({ fps: 0, drawCalls: 0, triangles: 0, landmarks: 9, quality: 'high' })

  const selectedLandmark = selectedId ? getLandmark(selectedId) ?? null : null
  const sceneFallback = metrics.quality === 'fallback'
  const zoneLandmarks = useMemo(() => LANDMARKS.filter((landmark) => landmark.zone === zone), [zone])

  const selectLandmark = useCallback((landmark: Landmark) => {
    setHover(null)
    setDrawer(null)
    setZone(landmark.zone)
    setSelectedId(landmark.id)
  }, [])

  const switchZone = useCallback((nextZone: ZoneId) => {
    setZone(nextZone)
    setSelectedId(null)
    setHover(null)
    setDrawer(null)
  }, [])

  const closeDrawer = useCallback(() => setDrawer(null), [])
  const openDrawer = (next: DrawerId) => {
    setHover(null)
    setDrawer(next)
  }

  const resetCity = () => {
    setSelectedId(null)
    setHover(null)
    sceneRef.current?.resetCamera()
  }

  const replayIntro = () => {
    setDrawer(null)
    setSelectedId(null)
    setZone('dubai')
    window.setTimeout(() => sceneRef.current?.replayIntro(), 50)
  }

  const hoverPosition = hover ? {
    left: Math.max(12, Math.min(hover.x + 20, window.innerWidth - 282)),
    top: Math.max(84, Math.min(hover.y - 24, window.innerHeight - 240)),
  } : undefined

  return (
    <section id="architecture" aria-label="Interactive UAE architectural intelligence" className={`experience ${introComplete ? 'is-ready' : 'is-intro'}`}>
      <CityCanvas
        ref={sceneRef}
        zone={zone}
        selectedId={selectedId}
        activeLayers={activeLayers}
        onHover={(landmark, x = 0, y = 0) => setHover(landmark ? { landmark, x, y } : null)}
        onSelect={selectLandmark}
        onIntroChange={setIntroComplete}
        onMetrics={setMetrics}
      />

      <header className="site-header">
        <button type="button" className="brand" onClick={resetCity} aria-label="MR Living Capital — return to city view">
          <img src="/images/mr-living-capital-logo.png" alt="MR Living Capital" />
        </button>
        <nav className="desktop-nav" aria-label="Five intelligence layers">
          {NAV_ITEMS.map((item) => <button type="button" key={item.id} onClick={() => openDrawer(item.id)}>{item.label}</button>)}
        </nav>
        <div className="header-actions">
          <button type="button" className="index-button" onClick={() => openDrawer('index')}><Building2 size={16} /><span>City Index</span></button>
          <button type="button" className="icon-button mobile-menu" onClick={() => openDrawer('index')} aria-label="Open city index"><Menu size={20} /></button>
        </div>
      </header>

      {!introComplete && (
        <div className="intro-interface">
          <div className="intro-copy">
            <span>MR LIVING CAPITAL</span>
            <p>Mapping the living city</p>
            <div className="intro-line"><i /></div>
          </div>
          <button type="button" className="skip-intro" onClick={() => sceneRef.current?.skipIntro()}>Skip introduction <ArrowUpRight size={16} /></button>
        </div>
      )}

      {introComplete && !selectedLandmark && !drawer && (
        <section className="explore-prompt" aria-labelledby="explore-title">
          <span className="technical-label">INDEPENDENT REAL ESTATE INVESTMENT INTELLIGENCE</span>
          <h1 id="explore-title">Property is the asset.<br /><em>Intelligence is the edge.</em></h1>
          <p className="hero-summary">We find what others miss. Market insight, first-party research and experience applied to exceptional real estate opportunities.</p>
          <p><MousePointer2 size={15} /> {sceneFallback ? <span>Use the City Index or keyboard location selection to explore every structure.</span> : <><span className="desktop-instruction">Move across the architecture. Select a structure to reveal its intelligence.</span><span className="mobile-instruction">Tap a structure to reveal its intelligence.</span></>}</p>
        </section>
      )}

      {hover && !selectedLandmark && !drawer && (
        <div className="hover-card" style={hoverPosition}>
          <span className="technical-label">{hover.landmark.category}</span>
          <h2>{hover.landmark.name}</h2>
          <p>{hover.landmark.location}</p>
          <div>{hover.landmark.topics.slice(0, 2).map((topic) => <span key={topic}>{topic}</span>)}</div>
          <strong>SELECT TO EXPLORE <ChevronRight size={14} /></strong>
        </div>
      )}

      {selectedLandmark && !drawer && (
        <aside className="landmark-panel" aria-label={`${selectedLandmark.name} information`}>
          <div className="panel-topline">
            <button type="button" className="text-button" onClick={resetCity}><ArrowLeft size={16} /> Full city</button>
            <button type="button" className="icon-button" onClick={resetCity} aria-label="Close location panel"><X size={18} /></button>
          </div>
          <span className={`status-label ${selectedLandmark.status}`}>{selectedLandmark.status.replace('-', ' ')}</span>
          <span className="technical-label">{selectedLandmark.category}</span>
          <h2>{selectedLandmark.name}</h2>
          <p className="panel-location">{selectedLandmark.location}</p>
          <p className="panel-summary">{selectedLandmark.summary}</p>
          <div className="topic-list">{selectedLandmark.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
          <div className="panel-actions">
            <button type="button" className="primary-button" onClick={() => openDrawer('investor')}>Explore location intelligence <ArrowUpRight size={17} /></button>
            <button type="button" className="outline-button" onClick={() => openDrawer('decision-lab')}>Open Decision Lab</button>
          </div>
          <p className="panel-disclaimer">{selectedLandmark.research}</p>
        </aside>
      )}

      {introComplete && (
        <>
          <div className="zone-information">
            <span>{ZONES[zone].short} · {ZONES[zone].coordinates}</span>
            <p>{ZONES[zone].description}</p>
          </div>
          <nav className="zone-selector" aria-label="Geographical zone">
            {(Object.keys(ZONES) as ZoneId[]).map((id, index) => (
              <button type="button" key={id} className={zone === id ? 'active' : ''} onClick={() => switchZone(id)} aria-pressed={zone === id}>
                <span>0{index + 1}</span>{ZONES[id].label}
              </button>
            ))}
          </nav>
          {!sceneFallback && (
            <div className="data-layer-dock">
              <div className="dock-label"><Layers3 size={15} /><span>CONCEPTUAL DATA LAYERS</span></div>
              <LayerToggles active={activeLayers} onChange={setActiveLayers} />
            </div>
          )}
          <div className="scene-instructions">
            {!sceneFallback && <>
              <span className="desktop-instruction">DRAG TO ORBIT · CTRL + SCROLL TO ZOOM · ESC TO RETURN</span>
              <span className="mobile-instruction">TAP TO SELECT · TWO FINGERS TO ORBIT / PINCH</span>
            </>}
            <button type="button" onClick={() => openDrawer('decision-lab')}>DECISION LAB <ArrowUpRight size={13} /></button>
          </div>
          <div className="render-status" title={sceneFallback ? 'WebGL unavailable; lightweight mode active' : 'Live rendering metrics'}>
            <i /> {sceneFallback ? 'LIGHTWEIGHT · WEBGL UNAVAILABLE' : `LIVE 3D · ${metrics.fps || '—'} FPS · ${metrics.drawCalls} CALLS`}
          </div>
          {activeLayers.some((layer) => layer !== 'property') && <div className="concept-flag">ILLUSTRATIVE DATA VIEW · NOT LIVE MARKET DATA</div>}
          <div className="keyboard-landmarks">
            <label htmlFor="landmark-select">Keyboard location selection</label>
            <select id="landmark-select" value={selectedId ?? ''} onChange={(event) => { const landmark = LANDMARKS.find((item) => item.id === event.target.value); if (landmark) selectLandmark(landmark) }}>
              <option value="">Select a structure</option>
              {zoneLandmarks.map((landmark) => <option value={landmark.id} key={landmark.id}>{landmark.name}</option>)}
            </select>
          </div>
        </>
      )}

      <ContentDrawer
        drawer={drawer}
        onClose={closeDrawer}
        onDrawer={openDrawer}
        onSelectLandmark={selectLandmark}
        onZone={switchZone}
        onReplay={replayIntro}
        selectedLandmark={selectedLandmark}
        activeLayers={activeLayers}
        onLayers={setActiveLayers}
      />

      {introComplete && <a className="continue-site" href="#founder-stats">Continue to advisory site <ArrowDown size={15} /></a>}
      {!sceneFallback && <button type="button" className="replay-control" onClick={replayIntro} aria-label="Replay architectural reveal" title="Replay architectural reveal"><RotateCcw size={15} /></button>}
    </section>
  )
}
