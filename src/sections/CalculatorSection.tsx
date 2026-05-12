import { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'

interface CorridorResult {
  name: string
  entryPrice: number
  yield: number
  appreciation: number
  match: number
}

const budgetRanges = [
  { label: '1M – 3M', min: 1000000, max: 3000000 },
  { label: '3M – 5M', min: 3000000, max: 5000000 },
  { label: '5M – 10M', min: 5000000, max: 10000000 },
  { label: '10M+', min: 10000000, max: 50000000 },
]

const propertyTypes = [
  { label: 'Apartment' },
  { label: 'Villa' },
  { label: 'Townhouse' },
  { label: 'Off-Plan' },
]

const corridorData: Record<string, CorridorResult[]> = {
  'Apartment': [
    { name: 'Dubai — JVC', entryPrice: 1142, yield: 7.5, appreciation: 20, match: 95 },
    { name: 'Dubai — Dubai Hills', entryPrice: 1900, yield: 6.5, appreciation: 18, match: 90 },
    { name: 'Abu Dhabi — Al Reem', entryPrice: 1150, yield: 6.0, appreciation: 15, match: 88 },
    { name: 'RAK — Al Marjan Island', entryPrice: 650, yield: 8.5, appreciation: 35, match: 92 },
  ],
  'Villa': [
    { name: 'Dubai — Dubai Hills', entryPrice: 1600, yield: 5.5, appreciation: 18, match: 94 },
    { name: 'Dubai — MBR City', entryPrice: 2000, yield: 6.0, appreciation: 20, match: 90 },
    { name: 'Abu Dhabi — Saadiyat', entryPrice: 2200, yield: 5.5, appreciation: 22, match: 88 },
    { name: 'RAK — Al Marjan Island', entryPrice: 550, yield: 7.5, appreciation: 30, match: 85 },
  ],
  'Townhouse': [
    { name: 'Dubai — JVC', entryPrice: 1000, yield: 7.2, appreciation: 19, match: 93 },
    { name: 'Dubai — Dubai Hills', entryPrice: 1700, yield: 6.2, appreciation: 17, match: 89 },
    { name: 'Abu Dhabi — Yas Island', entryPrice: 1500, yield: 6.0, appreciation: 18, match: 86 },
    { name: 'RAK — Mina Al Arab', entryPrice: 750, yield: 8.0, appreciation: 28, match: 90 },
  ],
  'Off-Plan': [
    { name: 'Dubai — Dubai South', entryPrice: 800, yield: 8.0, appreciation: 30, match: 96 },
    { name: 'Abu Dhabi — Saadiyat', entryPrice: 1800, yield: 6.5, appreciation: 25, match: 92 },
    { name: 'RAK — Al Marjan Island', entryPrice: 600, yield: 9.0, appreciation: 40, match: 94 },
    { name: 'Dubai — JVC', entryPrice: 1050, yield: 8.0, appreciation: 25, match: 91 },
  ],
}

export default function CalculatorSection() {
  const [step, setStep] = useState(0)
  const [budget, setBudget] = useState<string | null>(null)
  const [propertyType, setPropertyType] = useState<string | null>(null)
  const [results, setResults] = useState<CorridorResult[] | null>(null)

  const bestMatch = results?.reduce((best, r) => (r.match > best.match ? r : best), results[0])

  const handleBudgetSelect = (label: string) => {
    setBudget(label)
    setStep(1)
  }

  const handlePropertySelect = (label: string) => {
    setPropertyType(label)
    const data = corridorData[label]
    if (data) {
      setResults(data)
    }
    setStep(2)
  }

  const reset = () => {
    setStep(0)
    setBudget(null)
    setPropertyType(null)
    setResults(null)
  }

  return (
    <section
      id="calculator"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#0A1F1A',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="font-caption" style={{ color: '#C9A87C', display: 'block', marginBottom: 16, fontSize: 12 }}>
              INVESTMENT CALCULATOR
            </span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#E8DDD0', marginBottom: 12 }}>
              FIND YOUR <span style={{ color: '#C9A87C' }}>OPTIMAL</span> CORRIDOR
            </h2>
            <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.6)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
              Answer 2 quick questions. See projected returns across all 4 corridors.
            </p>
          </div>
        </ScrollReveal>

        {/* Progress Bar */}
        <div style={{ maxWidth: 300, margin: '0 auto 48px', display: 'flex', gap: 8, alignItems: 'center' }}>
          {[0, 1, 2].map((s) => (
            <div key={s} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  border: `2px solid ${step >= s ? '#C9A87C' : 'rgba(90, 122, 114, 0.3)'}`,
                  background: step >= s ? 'rgba(201, 168, 124, 0.15)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 600,
                  color: step >= s ? '#C9A87C' : '#5A7A72',
                  fontFamily: 'Space Grotesk, sans-serif',
                  flexShrink: 0,
                  transition: 'all 0.4s ease',
                }}
              >
                {s + 1}
              </div>
              {s < 2 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    background: step > s ? '#C9A87C' : 'rgba(90, 122, 114, 0.2)',
                    transition: 'background 0.4s ease',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <ScrollReveal>
          <div
            className="glass-card"
            style={{ padding: 'clamp(32px, 4vw, 48px)', maxWidth: 640, margin: '0 auto', minHeight: 320 }}
          >
            {/* STEP 1: Budget */}
            {step === 0 && (
              <div>
                <h3 className="font-heading" style={{ fontSize: 18, color: '#E8DDD0', marginBottom: 6, textAlign: 'center' }}>
                  WHAT'S YOUR INVESTMENT BUDGET?
                </h3>
                <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.5)', fontSize: 13, textAlign: 'center', marginBottom: 28 }}>
                  Select a range in AED
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                  {budgetRanges.map((b) => (
                    <button
                      key={b.label}
                      onClick={() => handleBudgetSelect(b.label)}
                      style={{
                        padding: '20px 12px',
                        borderRadius: 8,
                        border: budget === b.label ? '1.5px solid #C9A87C' : '1px solid rgba(90, 122, 114, 0.25)',
                        background: budget === b.label ? 'rgba(201, 168, 124, 0.1)' : 'rgba(90, 122, 114, 0.05)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'center',
                      }}
                      onMouseEnter={(e) => {
                        if (budget !== b.label) {
                          e.currentTarget.style.borderColor = 'rgba(201, 168, 124, 0.4)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (budget !== b.label) {
                          e.currentTarget.style.borderColor = 'rgba(90, 122, 114, 0.25)'
                        }
                      }}
                    >
                      <div style={{ color: '#E8DDD0', fontSize: 16, fontWeight: 500, marginBottom: 4 }}>{b.label}</div>
                      <div style={{ color: '#5A7A72', fontSize: 11 }}>AED</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Property Type */}
            {step === 1 && (
              <div>
                <h3 className="font-heading" style={{ fontSize: 18, color: '#E8DDD0', marginBottom: 6, textAlign: 'center' }}>
                  PROPERTY TYPE?
                </h3>
                <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.5)', fontSize: 13, textAlign: 'center', marginBottom: 28 }}>
                  What are you looking to invest in?
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                  {propertyTypes.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => handlePropertySelect(p.label)}
                      style={{
                        padding: '20px 12px',
                        borderRadius: 8,
                        border: propertyType === p.label ? '1.5px solid #C9A87C' : '1px solid rgba(90, 122, 114, 0.25)',
                        background: propertyType === p.label ? 'rgba(201, 168, 124, 0.1)' : 'rgba(90, 122, 114, 0.05)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'center',
                      }}
                      onMouseEnter={(e) => {
                        if (propertyType !== p.label) {
                          e.currentTarget.style.borderColor = 'rgba(201, 168, 124, 0.4)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (propertyType !== p.label) {
                          e.currentTarget.style.borderColor = 'rgba(90, 122, 114, 0.25)'
                        }
                      }}
                    >
                      <div style={{ color: '#E8DDD0', fontSize: 15, fontWeight: 500 }}>{p.label}</div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(0)}
                  style={{
                    marginTop: 24,
                    background: 'none',
                    border: 'none',
                    color: '#5A7A72',
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'block',
                    margin: '24px auto 0',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  ← Back
                </button>
              </div>
            )}

            {/* STEP 3: Results */}
            {step === 2 && results && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <div className="font-caption" style={{ color: '#C9A87C', marginBottom: 6, fontSize: 11 }}>
                    YOUR OPTIMAL MATCH
                  </div>
                  <h3 className="font-heading" style={{ fontSize: 24, color: '#E8DDD0' }}>
                    {bestMatch?.name}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 12 }}>
                    <div>
                      <div style={{ color: '#D4F1F4', fontSize: 22, fontWeight: 700, fontFamily: 'Space Grotesk' }}>
                        {bestMatch?.yield}%
                      </div>
                      <div className="font-caption" style={{ color: '#5A7A72', fontSize: 10 }}>Est. Yield</div>
                    </div>
                    <div>
                      <div style={{ color: '#D4F1F4', fontSize: 22, fontWeight: 700, fontFamily: 'Space Grotesk' }}>
                        +{bestMatch?.appreciation}%
                      </div>
                      <div className="font-caption" style={{ color: '#5A7A72', fontSize: 10 }}>Appreciation</div>
                    </div>
                    <div>
                      <div style={{ color: '#C9A87C', fontSize: 22, fontWeight: 700, fontFamily: 'Space Grotesk' }}>
                        {bestMatch?.match}%
                      </div>
                      <div className="font-caption" style={{ color: '#5A7A72', fontSize: 10 }}>Match Score</div>
                    </div>
                  </div>
                </div>

                <div className="font-caption" style={{ color: '#5A7A72', marginBottom: 12, fontSize: 10 }}>
                  ALL CORRIDORS COMPARISON
                </div>
                {results.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 60px 60px 60px',
                      gap: 8,
                      alignItems: 'center',
                      padding: '8px 0',
                      borderBottom: '1px solid rgba(90, 122, 114, 0.1)',
                    }}
                  >
                    <span style={{ color: '#E8DDD0', fontSize: 13 }}>{r.name}</span>
                    <span style={{ color: '#D4F1F4', fontSize: 12, textAlign: 'right' }}>{r.yield}%</span>
                    <span style={{ color: '#D4F1F4', fontSize: 12, textAlign: 'right' }}>+{r.appreciation}%</span>
                    <span style={{ color: '#C9A87C', fontSize: 12, textAlign: 'right', fontWeight: 500 }}>{r.match}%</span>
                  </div>
                ))}

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
                  <a
                    href="#inquiry"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="font-nav"
                    style={{
                      padding: '12px 24px',
                      borderRadius: 8,
                      background: '#C9A87C',
                      color: '#0A1F1A',
                      textDecoration: 'none',
                      fontSize: 11,
                      letterSpacing: '0.08em',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    TALK TO US →
                  </a>
                  <button
                    onClick={reset}
                    style={{
                      padding: '12px 20px',
                      borderRadius: 8,
                      background: 'transparent',
                      border: '1px solid rgba(90, 122, 114, 0.3)',
                      color: '#5A7A72',
                      fontSize: 11,
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Recalculate
                  </button>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}