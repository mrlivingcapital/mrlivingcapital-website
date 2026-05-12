import { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'

const timelineSteps = [
  {
    month: 'Month 1',
    title: 'RESERVATION',
    desc: 'Reserve with 10% deposit. Sales agreement signed.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    month: 'Month 3',
    title: 'SALES AGREEMENT',
    desc: 'SPA executed. Payment plan activated (40/60 or post-handover).',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    month: 'Month 6',
    title: 'CONSTRUCTION MILESTONE',
    desc: '20% paid. Foundation complete. RERA escrow monitored.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    month: 'Month 12',
    title: 'STRUCTURE COMPLETE',
    desc: '40% paid. Building topped out. Golden Visa eligibility begins.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    month: 'Month 18',
    title: 'HANDOVER',
    desc: '100% paid (or post-handover plan begins). Keys delivered. Snagging complete.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    month: 'Month 20',
    title: 'FIRST RENTAL INCOME',
    desc: 'Property leased. 6-8% gross yield begins. DLD registration complete.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4F1F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
]

export default function TimelineSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section
      id="timeline"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#0A1F1A',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="font-caption" style={{ color: '#C9A87C', display: 'block', marginBottom: 16, fontSize: 12 }}>
              THE INVESTMENT JOURNEY
            </span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#E8DDD0', marginBottom: 12 }}>
              WHAT HAPPENS AFTER YOU <span style={{ color: '#C9A87C' }}>INVEST?</span>
            </h2>
            <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.5)', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
              A clear timeline from reservation to first rental income.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(180deg, #C9A87C, #5A7A72)',
              transform: 'translateX(-50%)',
              opacity: 0.3,
            }}
          />

          {timelineSteps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: i === timelineSteps.length - 1 ? 0 : 32,
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                  gap: 32,
                }}
              >
                {/* Content side */}
                <div
                  style={{
                    flex: 1,
                    textAlign: i % 2 === 0 ? 'right' : 'left',
                  }}
                >
                  <div
                    className="glass-card"
                    style={{
                      padding: '24px',
                      cursor: 'pointer',
                      border: activeStep === i ? '1px solid rgba(201, 168, 124, 0.4)' : undefined,
                    }}
                    onClick={() => setActiveStep(i)}
                  >
                    <div className="font-caption" style={{ color: '#C9A87C', fontSize: 11, marginBottom: 6 }}>
                      {step.month}
                    </div>
                    <div style={{ color: '#E8DDD0', fontSize: 16, fontWeight: 500, marginBottom: 6, fontFamily: 'Space Grotesk, sans-serif' }}>
                      {step.title}
                    </div>
                    <div style={{ color: 'rgba(232, 221, 208, 0.5)', fontSize: 13, lineHeight: 1.5 }}>
                      {step.desc}
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: activeStep === i ? 'rgba(201, 168, 124, 0.2)' : 'rgba(90, 122, 114, 0.1)',
                    border: activeStep === i ? '2px solid #C9A87C' : '1.5px solid rgba(90, 122, 114, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    zIndex: 2,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {step.icon}
                </div>

                {/* Empty side for balance */}
                <div style={{ flex: 1 }} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
