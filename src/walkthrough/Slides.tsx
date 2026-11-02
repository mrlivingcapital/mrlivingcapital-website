import { useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, Mail, MessageCircle, Plus } from 'lucide-react'
import Globe3D from '../components/Globe3D'
import { DecisionLab } from '../architecture/components/DecisionLab'
import '../architecture/architecture.css'

export type Navigate = (id: string) => void

function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="slide-eyebrow reveal-item">{children}</div>
}

function TextLink({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return <button type="button" className="text-link reveal-item" onClick={onClick}>{children}<ArrowRight size={16} /></button>
}

export function OpeningSlide({ onNext }: { onNext: () => void }) {
  return (
    <div className="slide-layout opening-layout">
      <div className="opening-copy">
        <Eyebrow>INDEPENDENT REAL ESTATE INVESTMENT INTELLIGENCE</Eyebrow>
        <h1 className="opening-title reveal-item">Property is the asset.<br /><em>Intelligence is the edge.</em></h1>
        <p className="slide-lead reveal-item">We find what others miss. Market insight, first-party research and experience applied to exceptional real estate opportunities.</p>
        <TextLink onClick={onNext}>Enter the intelligence</TextLink>
      </div>
      <div className="tower-annotation reveal-item">
        <span>MRLC SIGNATURE STUDY · 001</span>
        <strong>THE INTELLIGENCE TOWER</strong>
        <small>Original architectural concept · digital veil study</small>
      </div>
      <div className="opening-index reveal-item"><span>FORM / LIGHT / EVIDENCE</span><i /></div>
    </div>
  )
}

export function FounderSlide({ onNavigate }: { onNavigate: Navigate }) {
  return (
    <div className="slide-layout founder-layout">
      <div className="founder-portrait">
        <div className="portrait-mask">
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/masoud-founder-portrait-2026.webp" type="image/webp" />
            <source srcSet="/images/masoud-founder-chess-2026.webp" type="image/webp" />
            <img
              src="/images/masoud-founder-chess-2026.jpg"
              alt="Masoud Rahemi, Founder of MR Living Capital"
              width="2048"
              height="2048"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </div>
        <span>MASOUD RAHEMI · FOUNDER</span>
      </div>
      <div className="founder-copy">
        <Eyebrow>THE FOUNDER · LIVING PROOF. LASTING LEGACY.</Eyebrow>
        <h2 className="slide-title reveal-item">The name is<br /><em>the thesis.</em></h2>
        <p className="slide-lead reveal-item">Living capital is capital that outlives the transaction. The asset is the start of the relationship, not the end of a sale.</p>
        <p className="slide-body-copy reveal-item">Thirty-five years in Dubai. Own-money investing across three countries. The discipline to protect capital first and grow it second.</p>
        <div className="founder-stats reveal-item">
          <div><strong>35</strong><span>YEARS IN DUBAI</span></div>
          <div><strong>03</strong><span>COUNTRIES · OWN-MONEY INVESTOR</span></div>
          <div><strong>03</strong><span>CONTINENTS · MARKET CYCLES</span></div>
        </div>
        <TextLink onClick={() => onNavigate('inquiry')}>Start a private conversation</TextLink>
      </div>
    </div>
  )
}

const PILLARS = [
  { n: '01', title: 'First-party data over narrative', line: 'Measure the market. Publish the scoreboard. Let evidence challenge the pitch.', target: 'lets-talk' },
  { n: '02', title: 'Timing is priced, not felt', line: 'Define the trigger, the deadline and the proof before emotion enters the decision.', target: 'decision-lab' },
  { n: '03', title: 'Delivery over announcement', line: 'Separate what exists, what is funded and what is still only a rendering.', target: 'corridors' },
  { n: '04', title: 'The plan is the product', line: 'Entry structure, cash flow and downside matter as much as the address.', target: 'decision-lab' },
]

export function ThesisSlide({ onNavigate }: { onNavigate: Navigate }) {
  return (
    <div className="slide-layout thesis-layout">
      <div className="thesis-heading">
        <Eyebrow>INVESTOR INTELLIGENCE · HOW WE INVEST</Eyebrow>
        <h2 className="slide-title reveal-item">Conviction is a sequence.<br /><em>Not a feeling.</em></h2>
      </div>
      <div className="pillar-list">
        {PILLARS.map((pillar) => (
          <button type="button" className="pillar-row reveal-item" key={pillar.n} onClick={() => onNavigate(pillar.target)}>
            <span>{pillar.n}</span><strong>{pillar.title}</strong><p>{pillar.line}</p><ArrowUpRight size={20} />
          </button>
        ))}
      </div>
    </div>
  )
}

const LAYERS = [
  { n: '01', title: 'Market & Transactions', desc: 'Historical evidence, pricing and actual activity establish the baseline before a narrative is accepted.', tags: ['PRICING', 'LIQUIDITY', 'ACTIVITY'], visual: 'market' },
  { n: '02', title: 'Infrastructure', desc: 'Transport, utilities and delivery timelines are reviewed as physical commitments, not brochure promises.', tags: ['CONNECTIVITY', 'DELIVERY', 'ACCESS'], visual: 'infrastructure' },
  { n: '03', title: 'Districts & Communities', desc: 'Demand, liveability and neighbourhood context reveal who uses the asset and why they stay.', tags: ['DEMAND', 'COMMUNITY', 'CONTEXT'], visual: 'districts' },
  { n: '04', title: 'Capital & Risk', desc: 'Financing, liquidity and scenario pressure test whether the decision survives outside the base case.', tags: ['DOWNSIDE', 'SCENARIOS', 'CAPITAL'], visual: 'risk' },
  { n: '05', title: 'Property Intelligence', desc: 'The individual asset brings the thesis back to unit quality, value, income and exit optionality.', tags: ['ASSET', 'VALUE', 'YIELD'], visual: 'property' },
]

function IntelligenceChart({ type }: { type: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.35, vectorEffect: 'non-scaling-stroke' as const }
  return (
    <svg className={`intelligence-chart intelligence-chart-${type}`} viewBox="0 0 100 56" aria-hidden="true">
      <path d="M4 46H96M4 28H96M4 10H96" {...common} opacity=".12" />
      {type === 'market' && <>
        {[12, 20, 16, 29, 24, 36].map((height, index) => <rect key={index} x={8 + index * 14} y={46 - height} width="7" height={height} fill="currentColor" opacity={index === 5 ? '.34' : '.13'} />)}
        <path className="data-flow" d="M7 39L20 34L33 36L47 24L61 27L75 16L91 11" {...common} strokeWidth="1.8" />
        <g className="node-pulse"><circle cx="91" cy="11" r="4" {...common} /><circle cx="91" cy="11" r="1.4" fill="currentColor" /></g>
      </>}
      {type === 'infrastructure' && <>
        <path d="M50 28L14 12M50 28L14 45M50 28L86 12M50 28L86 45M50 28V5" {...common} opacity=".36" />
        <path className="data-flow" d="M14 12L50 28L86 12M14 45L50 28L86 45" {...common} />
        <circle cx="50" cy="28" r="13" {...common} opacity=".38" />
        <g className="node-pulse"><path d="M44 35V22L50 18L56 22V35L50 39Z M44 22L50 26L56 22M50 26V39" {...common} /></g>
        {[[14,12],[14,45],[86,12],[86,45],[50,5]].map(([x,y]) => <g key={`${x}-${y}`}><circle cx={x} cy={y} r="4" {...common} /><circle cx={x} cy={y} r="1.3" fill="currentColor" /></g>)}
      </>}
      {type === 'districts' && <>
        {[0.08,0.14,0.24,0.13,0.12,0.3,0.42,0.2,0.08,0.22,0.34,0.16].map((opacity, index) => <rect key={index} x={7 + (index % 4) * 11} y={8 + Math.floor(index / 4) * 12} width="9" height="10" fill="currentColor" opacity={opacity} />)}
        <circle cx="25" cy="26" r="22" {...common} strokeDasharray="2 4" opacity=".55" />
        <g className="node-pulse"><circle cx="25" cy="26" r="5" {...common} /><circle cx="25" cy="26" r="1.5" fill="currentColor" /></g>
        {[29,21,34,26].map((width, index) => <g key={index}><rect x="60" y={10 + index * 10} width="32" height="4" fill="currentColor" opacity=".08" /><rect x="60" y={10 + index * 10} width={width} height="4" fill="currentColor" opacity={index === 2 ? '.65' : '.34'} /></g>)}
      </>}
      {type === 'risk' && <>
        <path d="M8 46H94M8 20H94" {...common} strokeDasharray="3 4" opacity=".35" />
        {[{x:17,y:34,h:12},{x:42,y:20,h:26},{x:67,y:8,h:38}].map((bar, index) => <g key={bar.x}><rect x={bar.x} y={bar.y} width="14" height={bar.h} fill="currentColor" opacity={0.16 + index * 0.14} /><path d={`M${bar.x - 3} ${bar.y}H${bar.x + 17}M${bar.x + 7} ${bar.y - 4}V47`} {...common} opacity=".7" /></g>)}
        <path className="data-flow" d="M24 34L49 20L74 8" {...common} strokeWidth="1.8" />
        <g className="node-pulse"><circle cx="74" cy="8" r="3.5" {...common} /></g>
      </>}
      {type === 'property' && <>
        <path d="M12 45V16L36 7L60 16V45L36 53Z M12 16L36 25L60 16M36 25V53" {...common} opacity=".65" />
        {[0,1,2].map((index) => <path key={index} d={`M12 ${24 + index * 8}L36 ${33 + index * 7}L60 ${24 + index * 8}`} {...common} opacity={index === 1 ? '.9' : '.25'} />)}
        <path className="node-pulse" d="M37 33L49 29V37L37 41Z" fill="currentColor" opacity=".35" />
        <path d="M67 43V12M67 43H95" {...common} opacity=".35" />
        <path className="data-flow" d="M69 37L76 32L82 34L89 20L94 16" {...common} />
        <circle className="node-pulse" cx="94" cy="16" r="3" {...common} />
      </>}
    </svg>
  )
}

export function LayersSlide({ step, onStep }: { step: number; onStep: (step: number) => void }) {
  const activeLayer = LAYERS[step]
  const handleLayerKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % LAYERS.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + LAYERS.length) % LAYERS.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = LAYERS.length - 1
    else return
    event.preventDefault()
    event.stopPropagation()
    onStep(next)
    event.currentTarget.closest('[role="tablist"]')?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
  }

  return (
    <div className="slide-layout layers-layout command-layout">
      <div className="command-heading">
        <div>
          <Eyebrow>FIVE INTELLIGENCE LAYERS · ONE COMMAND CENTER</Eyebrow>
          <h2 className="slide-title reveal-item">Five signals.<br /><em>One decision.</em></h2>
        </div>
        <span>ILLUSTRATIVE LIVE-STYLE SIGNALS · NOT MARKET DATA</span>
      </div>

      <div className="command-center reveal-item">
        <svg className="command-connections" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
          <path className="command-orbit" d="M500 75L835 200L710 500L290 500L165 200Z" />
          <path className="command-feed data-flow" d="M500 75L500 310M835 200L500 310M710 500L500 310M290 500L500 310M165 200L500 310" />
          <circle className="command-core-ring node-pulse" cx="500" cy="310" r="96" />
          {[[500,194],[668,255],[605,405],[395,405],[332,255]].map(([x,y]) => <circle key={`${x}-${y}`} className="command-feed-node node-pulse" cx={x} cy={y} r="4" />)}
        </svg>

        <div className="command-core" aria-label="MR Living Capital Intelligence command center">
          <span>MR LIVING CAPITAL</span>
          <strong>INTELLIGENCE</strong>
          <i />
          <small>COMMAND CENTER</small>
        </div>

        <div className="command-nodes" role="tablist" aria-label="Intelligence layers">
          {LAYERS.map((layer, index) => (
            <button
              type="button"
              role="tab"
              id={`layer-tab-${index}`}
              aria-controls="layer-detail"
              aria-selected={step === index}
              tabIndex={step === index ? 0 : -1}
              className={`command-node command-node-${index + 1} ${step === index ? 'active' : ''}`}
              key={layer.n}
              onClick={() => onStep(index)}
              onKeyDown={(event) => handleLayerKey(event, index)}
            >
              <span className="command-node-number">{layer.n}</span>
              <IntelligenceChart type={layer.visual} />
              <strong>{layer.title}</strong>
              <small>{layer.tags[0]} · {layer.tags[1]}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="command-detail reveal-item" id="layer-detail" role="tabpanel" aria-labelledby={`layer-tab-${step}`} aria-live="polite">
        <span>{activeLayer.n} / 05</span>
        <div><h3>{activeLayer.title}</h3><p>{activeLayer.desc}</p></div>
        <div className="command-detail-tags">{activeLayer.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </div>
  )
}

const MARKET_STATS = [
  { value: 'AED 419.9B', label: 'H1 2026 total transactions', source: 'Dubai Land Department · H1 2026' },
  { value: '112,850', label: 'Transactions in the same period', source: 'Dubai Land Department · H1 2026' },
  { value: '49%', label: 'Off-plan share of sales value', source: 'DLD · H1 2026 · inherited editorial figure' },
]

export function MarketSlide() {
  return (
    <div className="slide-layout market-layout">
      <div className="market-heading">
        <Eyebrow>MARKET INTELLIGENCE · EVIDENCE BEFORE ENTHUSIASM</Eyebrow>
        <h2 className="slide-title reveal-item">Read the sequence.<br /><em>Not the headline.</em></h2>
        <p className="slide-lead reveal-item">A number becomes useful when its period, source and context survive scrutiny. We connect transaction evidence to the asset, the corridor and the decision.</p>
        <a className="text-link reveal-item" href="/blog/">Explore the research library<ArrowRight size={16} /></a>
      </div>
      <div className="market-ledger reveal-item">
        <div className="ledger-topline"><span>MARKET LEDGER / H1 2026</span><span>SOURCE FIRST</span></div>
        {MARKET_STATS.map((stat, index) => (
          <div className="ledger-row" key={stat.label}>
            <span>0{index + 1}</span><strong>{stat.value}</strong><div><p>{stat.label}</p><small>{stat.source}</small></div>
          </div>
        ))}
        <p className="ledger-note">Editorial figures are carried over from the existing website. Independent live-source re-verification remains a pre-publication check.</p>
      </div>
    </div>
  )
}

export function DecisionLabSlide() {
  return (
    <div className="slide-scroll decision-slide" data-native-scroll>
      <div className="experience integrated-decision-lab">
        <DecisionLab />
        <div className="decision-lab-actions">
          <span>Educational scenario model · no data is transmitted or stored.</span>
          <a href="https://wa.me/971585899112?text=I%20ran%20an%20illustrative%20scenario%20and%20want%20to%20discuss%20the%20assumptions" target="_blank" rel="noopener noreferrer">Discuss your assumptions →</a>
        </div>
      </div>
    </div>
  )
}

const CORRIDORS = [
  { tag: 'DUBAI', title: 'Liquidity and global connectivity', line: 'Review transaction depth, district fundamentals and the difference between announced infrastructure and delivered infrastructure.' },
  { tag: 'ABU DHABI', title: 'Institutions and long-range planning', line: 'Assess cultural destinations, community quality and capital with a longer investment horizon.' },
  { tag: 'RAS AL KHAIMAH', title: 'Tourism and waterfront growth', line: 'Examine the tourism thesis alongside supply, entry basis and realistic exit liquidity.' },
]

export function CorridorsSlide() {
  const [active, setActive] = useState(0)
  return (
    <div className="slide-layout corridors-layout">
      <div className="corridor-globe reveal-item"><Globe3D /><span>DRAG TO ROTATE · ALLOCATION CORRIDORS</span></div>
      <div className="corridors-copy">
        <Eyebrow>CAPITAL ALLOCATION · WHY THESE CORRIDORS?</Eyebrow>
        <h2 className="slide-title reveal-item">Three markets.<br /><em>Different functions.</em></h2>
        <div className="corridor-tabs reveal-item" role="tablist" aria-label="Allocation corridors">
          {CORRIDORS.map((corridor, index) => <button type="button" role="tab" aria-selected={active === index} className={active === index ? 'active' : ''} onClick={() => setActive(index)} key={corridor.tag}>{corridor.tag}</button>)}
        </div>
        <div className="corridor-detail reveal-item" aria-live="polite">
          <span>0{active + 1} / 03</span><h3>{CORRIDORS[active].title}</h3><p>{CORRIDORS[active].line}</p>
        </div>
        <a className="text-link reveal-item" href="/corridors/index.html">Read the corridor briefings<ArrowRight size={16} /></a>
      </div>
    </div>
  )
}

const CONVERSATION_PATHS = [
  { label: 'HIDDEN GEMS', title: 'Start with your criteria.', line: 'Overlooked fundamentals, timing and potential—not a predefined district list.', cta: 'Let’s talk' },
  { label: 'PRIVATE / OFF-MARKET OPPORTUNITIES', title: 'Discuss what never reaches the portals.', line: 'A direct, criteria-led conversation for serious acquisition objectives.', cta: 'Let’s talk' },
  { label: 'RESEARCH / FIELD NOTES', title: 'Bring the question behind the headline.', line: 'Define the market, comparison or assumption you want examined with evidence.', cta: 'Let’s talk' },
  { label: 'MR XAI · COLLABORATIONS', title: 'Build the intelligence with us.', line: 'Research, data and advisory collaborations while our in-house system develops.', cta: 'Let’s talk about collaborations' },
]

export function LetsTalkSlide({ onNavigate }: { onNavigate: Navigate }) {
  const [openFaq, setOpenFaq] = useState(-1)
  return (
    <div className="slide-layout conversation-layout">
      <div className="conversation-heading">
        <Eyebrow>ONE CONVERSATION · FOUR WAYS TO BEGIN</Eyebrow>
        <h2 className="slide-title reveal-item">Bring the objective.<br /><em>Let’s talk.</em></h2>
        <p className="slide-lead reveal-item">Choose the starting point. Every path leads to a direct conversation with Masoud.</p>
      </div>
      <div className="conversation-list">
        {CONVERSATION_PATHS.map((item, index) => (
          <button type="button" className="conversation-row reveal-item" key={item.label} onClick={() => onNavigate('inquiry')}>
            <span>0{index + 1}</span>
            <div><small>{item.label}</small><h3>{item.title}</h3><p>{item.line}</p></div>
            <strong>{item.cta}<ArrowUpRight size={19} /></strong>
          </button>
        ))}
      </div>
      <aside className="conversation-faq reveal-item" aria-label="Common questions">
        <div className="conversation-faq-heading"><span>BEFORE WE TALK</span><strong>Common questions</strong></div>
        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={faq.q}>
              <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                <span>0{index + 1}</span><strong>{faq.q}</strong><Plus size={18} />
              </button>
              <div className="faq-answer"><p>{faq.a}</p></div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}

const FAQS = [
  { q: 'What does independent advisory mean here?', a: 'The conversation begins with your objectives, evidence and downside—not with a predefined district or a generic property list.' },
  { q: 'Can we review both off-plan and ready assets?', a: 'Yes. The comparison includes entry structure, delivery risk, income timing, liquidity and the condition of the individual asset.' },
  { q: 'Do you work with international investors?', a: 'Yes. Advisory conversations are available in English and Farsi. Cross-border tax and legal matters should be confirmed with qualified advisers in the relevant jurisdictions.' },
  { q: 'How do I begin?', a: 'Share your objectives, capital range, timing and liquidity requirements. Masoud reviews each inquiry personally before the first discussion.' },
]

type ContactStatus = 'idle' | 'sending' | 'done' | 'error'

export function ContactSlide() {
  const [status, setStatus] = useState<ContactStatus>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' })

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const response = await fetch('https://formspree.io/f/xkokazvz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, source: 'Cinematic Walkthrough Inquiry', _subject: 'New Inquiry - MR Living Capital' }),
      })
      if (!response.ok) throw new Error('Inquiry failed')
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="slide-layout contact-layout">
      <div className="contact-copy">
        <Eyebrow>THE PARTNERSHIP CONVERSATION · PRIVATE & DIRECT</Eyebrow>
        <h2 className="contact-title reveal-item">Let’s talk<br /><em>numbers.</em></h2>
        <p className="slide-lead reveal-item">Bring the objective, the timing and the constraints. The first conversation is about whether there is a decision worth making.</p>
        <div className="direct-contact reveal-item">
          <a href="mailto:Masoud@mrlivingcapital.com"><Mail size={17} />Masoud@mrlivingcapital.com</a>
          <a href="https://wa.me/971585899112" target="_blank" rel="noopener noreferrer"><MessageCircle size={17} />WhatsApp Masoud directly</a>
        </div>
        <small className="contact-location reveal-item">DUBAI, UAE · ENGLISH / FARSI</small>
      </div>
      <div className="contact-form-wrap reveal-item">
        {status === 'done' ? (
          <div className="contact-success" role="status"><span>INQUIRY RECEIVED</span><h3>Thank you.</h3><p>Your inquiry has been sent for personal review.</p><button type="button" className="text-link" onClick={() => { setForm({ name: '', email: '', phone: '', interest: '', message: '' }); setStatus('idle') }}>Send another inquiry<ArrowRight size={16} /></button></div>
        ) : (
          <form className="contact-form" onSubmit={submit}>
            <div className="form-topline"><span>PRIVATE INQUIRY</span><span>ALL FIELDS MARKED * ARE REQUIRED</span></div>
            <div className="form-row">
              <label>Name *<input required name="name" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
              <label>Email *<input required type="email" name="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
            </div>
            <div className="form-row">
              <label>Phone / WhatsApp<input type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
              <label>Investment interest *
                <select required name="interest" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                  <option value="" disabled>Select one</option><option>Off-plan acquisition</option><option>Ready / secondary market</option><option>Portfolio strategy</option><option>Research conversation</option>
                </select>
              </label>
            </div>
            <label>Objective or additional context<textarea name="message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
            {status === 'error' && <p className="form-error" role="alert">The inquiry could not be sent. Please use WhatsApp or email directly.</p>}
            <button type="submit" className="submit-inquiry" disabled={status === 'sending'}>{status === 'sending' ? 'SENDING…' : 'SUBMIT PRIVATE INQUIRY'}<ArrowUpRight size={17} /></button>
            <small>No test submissions are made by the website. Your inquiry is sent only when you submit this form.</small>
          </form>
        )}
      </div>
    </div>
  )
}
