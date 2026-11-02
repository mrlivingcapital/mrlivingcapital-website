import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Building2, ChevronRight, Mail, MapPin, MessageCircle, RotateCcw, X } from 'lucide-react'
import { FIELD_NOTES, FOUNDER_PARAGRAPHS, NAV_ITEMS, RESEARCH_PRINCIPLES } from '../data/content'
import { landmarksForZone, ZONES } from '../data/landmarks'
import type { DataLayerId, DrawerId, Landmark, ZoneId } from '../types'
import { DecisionLab } from './DecisionLab'
import { LayerToggles } from './LayerToggles'

interface ContentDrawerProps {
  drawer: DrawerId
  onClose: () => void
  onDrawer: (drawer: DrawerId) => void
  onSelectLandmark: (landmark: Landmark) => void
  onZone: (zone: ZoneId) => void
  onReplay: () => void
  selectedLandmark: Landmark | null
  activeLayers: DataLayerId[]
  onLayers: (layers: DataLayerId[]) => void
}

export function ContentDrawer(props: ContentDrawerProps) {
  const { drawer, onClose } = props
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [openNote, setOpenNote] = useState<string | null>(FIELD_NOTES[0].id)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [drawer])

  useEffect(() => {
    if (!drawer) return
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab' && panelRef.current) {
        const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button, a[href], input, select, [tabindex]:not([tabindex="-1"])')).filter((element) => !element.hasAttribute('disabled'))
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [drawer, onClose])

  if (!drawer) return null
  const label = drawer === 'index' ? 'City Index' : drawer === 'decision-lab' ? 'Investment Decision Lab' : NAV_ITEMS.find((item) => item.id === drawer)?.label ?? 'MR Living Capital'

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className={`content-drawer ${drawer === 'decision-lab' || drawer === 'founder' ? 'drawer-wide' : ''}`} ref={panelRef} role="dialog" aria-modal="true" aria-label={label}>
        <div className="drawer-topbar">
          <span>{label}</span>
          <button type="button" className="icon-button" onClick={onClose} ref={closeRef} aria-label="Close panel"><X size={20} /></button>
        </div>
        <div className="drawer-scroll" ref={scrollRef}>
          {drawer === 'investor' && <InvestorContent {...props} />}
          {drawer === 'intelligence' && <IntelligenceContent activeLayers={props.activeLayers} onLayers={props.onLayers} />}
          {drawer === 'founder' && <FounderContent />}
          {drawer === 'notes' && <NotesContent openNote={openNote} setOpenNote={setOpenNote} onSelectLandmark={props.onSelectLandmark} />}
          {drawer === 'next' && <NextContent />}
          {drawer === 'index' && <IndexContent {...props} />}
          {drawer === 'decision-lab' && <DecisionLab />}
        </div>
      </aside>
    </div>
  )
}

function InvestorContent({ selectedLandmark, onSelectLandmark }: ContentDrawerProps) {
  return (
    <div>
      <div className="drawer-heading">
        <span className="technical-label">LAYER 01 · INVESTOR INTELLIGENCE</span>
        <h2>Evidence before<br /><em>the opportunity.</em></h2>
        <p>Research is connected to place. Select a structure to reveal its context, available notes and the status of its research layer.</p>
      </div>
      {selectedLandmark && (
        <div className="research-spotlight">
          <span className="technical-label">SELECTED LOCATION</span>
          <h3>{selectedLandmark.name}</h3>
          <p>{selectedLandmark.research}</p>
          <span className="honest-status">RESEARCH STATUS · TRANSPARENT PLACEHOLDER</span>
        </div>
      )}
      <div className="principle-list">
        {RESEARCH_PRINCIPLES.map((principle, index) => (
          <div key={principle.title}><span>0{index + 1}</span><section><h3>{principle.title}</h3><p>{principle.text}</p></section></div>
        ))}
      </div>
      <h3 className="section-kicker">AVAILABLE LOCATION NOTES</h3>
      <div className="article-list">
        {FIELD_NOTES.map((note) => {
          const landmark = landmarksForZone('dubai').concat(landmarksForZone('ras-al-khaimah')).find((item) => item.id === note.related)
          return <button type="button" key={note.id} onClick={() => { if (landmark) onSelectLandmark(landmark) }}><span>{note.category}</span><strong>{note.title}</strong><ChevronRight size={18} /></button>
        })}
      </div>
    </div>
  )
}

function IntelligenceContent({ activeLayers, onLayers }: { activeLayers: DataLayerId[]; onLayers: (layers: DataLayerId[]) => void }) {
  return (
    <div>
      <div className="drawer-heading">
        <span className="technical-label">LAYER 02 · THE INTELLIGENCE LAYER</span>
        <h2>See the city.<br /><em>See the connections.</em></h2>
        <p>Toggle conceptual data layers to see how property, districts, infrastructure, comparables, risk and capital could relate inside one spatial interface.</p>
      </div>
      <div className="concept-notice"><span>CONCEPTUAL DEMONSTRATION</span><p>No live market feed, proprietary AI model or real transaction database is connected. Markers illustrate the intended information architecture only.</p></div>
      <LayerToggles active={activeLayers} onChange={onLayers} />
      <div className="layer-explanation">
        <h3>One model. Multiple reading modes.</h3>
        <p>Property retains the architectural model. Transactions adds illustrative markers. Infrastructure and Capital add visible connections. Comparables introduces potential research nodes. Risk adds district rings without calculating an unverified score.</p>
        <p>Close this panel to inspect the active layers in the city, or use the same controls at the bottom of the main screen.</p>
      </div>
    </div>
  )
}

function FounderContent() {
  return (
    <div className="founder-layout">
      <div className="founder-image"><img src="/images/masoud-rahemi.jpg" alt="Masoud Rahemi, Founder of MR Living Capital" /><span>MASOUD RAHEMI · FOUNDER</span></div>
      <div className="drawer-heading">
        <span className="technical-label">LAYER 03 · THE FOUNDER</span>
        <h2>Systems thinking.<br /><em>Creative judgment.</em></h2>
      </div>
      {FOUNDER_PARAGRAPHS.map((paragraph) => <p className="editorial-paragraph" key={paragraph}>{paragraph}</p>)}
      <blockquote>“Property is the asset.<br />Intelligence is the edge.”</blockquote>
      <div className="founder-disciplines"><span>STRATEGY</span><span>INVESTMENT</span><span>ARCHITECTURE</span><span>PHOTOGRAPHY</span><span>MUSIC</span><span>DESIGN</span></div>
    </div>
  )
}

function NotesContent({ openNote, setOpenNote, onSelectLandmark }: { openNote: string | null; setOpenNote: (id: string | null) => void; onSelectLandmark: (landmark: Landmark) => void }) {
  return (
    <div>
      <div className="drawer-heading">
        <span className="technical-label">LAYER 04 · FIELD NOTES</span>
        <h2>Observations from<br /><em>the living city.</em></h2>
        <p>Editorial notes on investment thinking, architecture, technology and the systems around a location.</p>
      </div>
      <div className="notes-list">
        {FIELD_NOTES.map((note, index) => {
          const landmark = landmarksForZone('dubai').concat(landmarksForZone('ras-al-khaimah')).find((item) => item.id === note.related)
          const open = openNote === note.id
          return (
            <article key={note.id} className={open ? 'open' : ''}>
              <button type="button" onClick={() => setOpenNote(open ? null : note.id)} aria-expanded={open}>
                <span>0{index + 1} · {note.category}</span><h3>{note.title}</h3><p>{note.excerpt}</p><ChevronRight size={20} />
              </button>
              {open && <div className="note-body"><p>{note.body}</p>{landmark && <button type="button" className="outline-button" onClick={() => onSelectLandmark(landmark)}><MapPin size={16} /> Open related location</button>}</div>}
            </article>
          )
        })}
      </div>
    </div>
  )
}

function NextContent() {
  return (
    <div>
      <div className="drawer-heading">
        <span className="technical-label">LAYER 05 · WHAT’S NEXT</span>
        <h2>A serious conversation<br /><em>starts with context.</em></h2>
        <p>For property investors, family offices, strategic partners and technology collaborators who want to discuss advisory work or the longer-term intelligence platform.</p>
      </div>
      <div className="contact-pathways">
        <a href="mailto:Masoud@mrlivingcapital.com?subject=Property%20investment%20conversation"><Mail size={20} /><span><strong>Property investment</strong><small>Discuss your brief with Masoud</small></span><ArrowUpRight size={18} /></a>
        <a href="https://wa.me/971585899112" target="_blank" rel="noreferrer"><MessageCircle size={20} /><span><strong>Direct conversation</strong><small>Continue through WhatsApp</small></span><ArrowUpRight size={18} /></a>
        <a href="mailto:Masoud@mrlivingcapital.com?subject=Strategic%20or%20PropTech%20collaboration"><Mail size={20} /><span><strong>Strategic & PropTech</strong><small>Partnership and technology conversations</small></span><ArrowUpRight size={18} /></a>
        <a href="https://www.linkedin.com/in/mrlivingcapital/" target="_blank" rel="noreferrer"><span className="contact-monogram">in</span><span><strong>LinkedIn</strong><small>Connect with MR Living Capital</small></span><ArrowUpRight size={18} /></a>
      </div>
      <p className="privacy-note">These links open your email, WhatsApp or LinkedIn. This release does not silently collect or store your information through a fabricated enquiry form.</p>
    </div>
  )
}

function IndexContent({ onZone, onSelectLandmark, onDrawer, onReplay }: ContentDrawerProps) {
  return (
    <div>
      <div className="drawer-heading">
        <span className="technical-label">ACCESSIBLE NON-3D ROUTE</span>
        <h2>The complete<br /><em>city index.</em></h2>
        <p>Every essential destination is available here without hover, drag or WebGL.</p>
      </div>
      <nav className="index-layer-nav" aria-label="Five intelligence layers">
        {NAV_ITEMS.map((item) => <button type="button" key={item.id} onClick={() => onDrawer(item.id)}><span>{item.index}</span>{item.label}<ChevronRight size={16} /></button>)}
      </nav>
      {(Object.keys(ZONES) as ZoneId[]).map((zone) => (
        <section className="index-zone" key={zone}>
          <button type="button" className="index-zone-title" onClick={() => onZone(zone)}><span>{ZONES[zone].label}</span><small>{ZONES[zone].coordinates}</small></button>
          <div className="index-landmarks">
            {landmarksForZone(zone).map((landmark) => <button type="button" key={landmark.id} onClick={() => onSelectLandmark(landmark)}><Building2 size={15} /><span>{landmark.name}<small>{landmark.location}</small></span><ChevronRight size={16} /></button>)}
          </div>
        </section>
      ))}
      <div className="index-actions">
        <button type="button" className="outline-button" onClick={() => onDrawer('decision-lab')}>Open Decision Lab</button>
        <button type="button" className="text-button" onClick={onReplay}><RotateCcw size={15} /> Replay architectural reveal</button>
      </div>
    </div>
  )
}
