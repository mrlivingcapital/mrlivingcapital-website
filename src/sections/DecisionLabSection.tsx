import { useMemo, useState } from 'react'

const HOLDING_OPTIONS = [3, 5, 7, 10]
const RISK_OPTIONS = ['CONSERVATIVE', 'BALANCED', 'AGGRESSIVE'] as const
const YIELD_OPTIONS = [5, 6, 7, 8, 9]

/**
 * INVESTMENT DECISION LAB: interactive scenario model.
 * Visitor tunes holding period, risk tolerance and target yield,
 * the panel returns an illustrative scenario readout.
 * All figures are clearly labelled as an illustrative model.
 */
export default function DecisionLabSection() {
  const [holdingIdx, setHoldingIdx] = useState(1) // 5 years
  const [riskIdx, setRiskIdx] = useState(1) // Balanced
  const [yieldIdx, setYieldIdx] = useState(2) // 7%

  const result = useMemo(() => {
    const holding = HOLDING_OPTIONS[holdingIdx]
    const riskBonus = riskIdx * 0.9 // 0 / 0.9 / 1.8
    const yieldPick = YIELD_OPTIONS[yieldIdx]
    const yieldBonus = (yieldPick - 6) * 0.35
    const horizonBonus = (holding - 5) * 0.15
    const roi = 6.4 + riskBonus + yieldBonus + horizonBonus
    const rentalYield = Math.min(9.2, Math.max(5.4, yieldPick + riskIdx * 0.3 - (holding > 7 ? 0.4 : 0)))
    const appreciation = Math.max(0.8, roi - rentalYield)
    const payback = 100 / roi
    const scenario = riskIdx === 0 ? 'BASE CASE' : riskIdx === 1 ? 'BALANCED' : 'GROWTH CASE'
    const verdict = roi >= 8.4 ? 'ACT' : roi >= 7.4 ? 'WATCH' : 'HOLD'
    const verdictNote =
      verdict === 'ACT'
        ? 'Strong fundamentals at these settings. Worth a conversation.'
        : verdict === 'WATCH'
          ? 'Solid profile. Monitor supply and entry pricing.'
          : 'Conservative profile. Prioritise capital preservation.'
    return { holding, roi, rentalYield, appreciation, payback, scenario, verdict, verdictNote, yieldPick }
  }, [holdingIdx, riskIdx, yieldIdx])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const sliderRow = (
    label: string,
    value: string,
    idx: number,
    max: number,
    onChange: (v: number) => void,
  ) => (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span className="font-caption" style={{ color: 'rgba(246, 241, 231, 0.75)', fontSize: 11, letterSpacing: '0.14em' }}>{label}</span>
        <span className="font-nav" style={{ color: '#57A99F', fontSize: 13, letterSpacing: '0.04em' }}>{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        step={1}
        value={idx}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        style={{ width: '100%', accentColor: '#57A99F', cursor: 'pointer', height: 20 }}
      />
    </div>
  )

  return (
    <section id="decision-lab" style={{ position: 'relative', zIndex: 2, background: 'linear-gradient(150deg, #0B2925 0%, #0E2F2B 60%, #123B37 100%)', padding: isMobile ? '80px 20px' : '110px 48px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 45% 55% at 80% 30%, rgba(87, 169, 159, 0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.05fr 1fr', gap: isMobile ? 44 : 72, alignItems: 'center' }}>
        {/* Left: copy + controls */}
        <div>
          <div className="font-caption" style={{ color: '#57A99F', fontSize: 11, letterSpacing: '0.22em', marginBottom: 18 }}>
            INVESTMENT DECISION LAB
          </div>
          <h2 className="font-display" style={{ color: '#F6F1E7', fontSize: isMobile ? 'clamp(28px, 7vw, 36px)' : 'clamp(34px, 3.6vw, 50px)', lineHeight: 1.14, fontWeight: 500, margin: '0 0 16px' }}>
            Different inputs.
            <br />
            <span style={{ color: '#57A99F' }}>Different outcomes.</span>
          </h2>
          <p className="font-body" style={{ color: 'rgba(246, 241, 231, 0.62)', fontSize: 15, lineHeight: 1.7, maxWidth: 460, margin: '0 0 36px' }}>
            Adjust the priorities, explore the scenarios, see how the numbers change. A clearer way to think about your next move.
          </p>

          <div style={{ padding: isMobile ? '22px 18px' : '28px 26px', borderRadius: 10, border: '1px solid rgba(87, 169, 159, 0.25)', background: 'rgba(11, 41, 37, 0.5)' }}>
            <div className="font-caption" style={{ color: 'rgba(246, 241, 231, 0.5)', fontSize: 10, letterSpacing: '0.2em', marginBottom: 20 }}>
              ADJUST YOUR PRIORITIES
            </div>
            {sliderRow('HOLDING PERIOD', `${result.holding} years`, holdingIdx, HOLDING_OPTIONS.length - 1, setHoldingIdx)}
            {sliderRow('RISK TOLERANCE', RISK_OPTIONS[riskIdx], riskIdx, RISK_OPTIONS.length - 1, setRiskIdx)}
            {sliderRow('TARGET YIELD', `${result.yieldPick}%+`, yieldIdx, YIELD_OPTIONS.length - 1, setYieldIdx)}
          </div>
        </div>

        {/* Right: results panel */}
        <div style={{ borderRadius: 12, border: '1px solid rgba(87, 169, 159, 0.3)', background: 'linear-gradient(165deg, rgba(13, 39, 35, 0.85) 0%, rgba(18, 59, 55, 0.7) 100%)', padding: isMobile ? '24px 20px' : '34px 30px', boxShadow: '0 30px 80px rgba(0, 0, 0, 0.35)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 }}>
            <span className="font-caption" style={{ color: 'rgba(246, 241, 231, 0.55)', fontSize: 10, letterSpacing: '0.2em' }}>SCENARIO OUTPUT</span>
            <span className="font-caption" style={{ color: '#B08D4A', fontSize: 10, letterSpacing: '0.16em', padding: '4px 10px', border: '1px solid rgba(176, 141, 74, 0.45)', borderRadius: 3, background: 'rgba(176, 141, 74, 0.08)' }}>
              {result.scenario}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 24 }}>
            <div>
              <div className="font-caption" style={{ color: 'rgba(246, 241, 231, 0.5)', fontSize: 10, letterSpacing: '0.14em', marginBottom: 6 }}>EST. ANNUAL ROI</div>
              <div className="font-stat" style={{ color: '#57A99F', fontSize: isMobile ? 38 : 46 }}>{result.roi.toFixed(1)}%</div>
            </div>
            <div>
              <div className="font-caption" style={{ color: 'rgba(246, 241, 231, 0.5)', fontSize: 10, letterSpacing: '0.14em', marginBottom: 6 }}>PAYBACK PERIOD</div>
              <div className="font-stat" style={{ color: '#F6F1E7', fontSize: isMobile ? 38 : 46 }}>{result.payback.toFixed(1)} <span style={{ fontSize: '0.45em', color: 'rgba(246,241,231,0.6)' }}>YRS</span></div>
            </div>
          </div>

          {[
            { label: 'RENTAL YIELD', value: result.rentalYield, display: `${result.rentalYield.toFixed(1)}%`, max: 10 },
            { label: 'CAPITAL APPRECIATION', value: result.appreciation, display: `${result.appreciation.toFixed(1)}%`, max: 6 },
          ].map((bar) => (
            <div key={bar.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span className="font-caption" style={{ color: 'rgba(246, 241, 231, 0.55)', fontSize: 10, letterSpacing: '0.14em' }}>{bar.label}</span>
                <span className="font-nav" style={{ color: '#F6F1E7', fontSize: 13 }}>{bar.display}</span>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: 'rgba(87, 169, 159, 0.15)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(100, (bar.value / bar.max) * 100)}%`, borderRadius: 3, background: 'linear-gradient(90deg, #0F6B62, #57A99F)', transition: 'width 0.5s ease' }} />
              </div>
            </div>
          ))}

          <div style={{ marginTop: 24, padding: '16px 18px', borderRadius: 8, background: 'rgba(87, 169, 159, 0.07)', border: '1px solid rgba(87, 169, 159, 0.2)', display: 'flex', gap: 14, alignItems: 'center' }}>
            <span className="font-nav" style={{ color: result.verdict === 'ACT' ? '#B08D4A' : '#57A99F', fontSize: 20, letterSpacing: '0.1em', minWidth: 76 }}>{result.verdict}</span>
            <span className="font-body" style={{ color: 'rgba(246, 241, 231, 0.65)', fontSize: 13, lineHeight: 1.55 }}>{result.verdictNote}</span>
          </div>

          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span className="font-body" style={{ color: 'rgba(246, 241, 231, 0.4)', fontSize: 11 }}>Illustrative model for demonstration. Not financial advice.</span>
            <a
              href="https://wa.me/971585899112?text=I%20ran%20a%20scenario%20in%20the%20Decision%20Lab%20and%20want%20to%20talk%20numbers"
              target="_blank"
              rel="noopener noreferrer"
              className="font-caption"
              style={{ color: '#0B2925', background: '#57A99F', fontSize: 11, letterSpacing: '0.14em', padding: '10px 18px', borderRadius: 5, textDecoration: 'none', fontWeight: 600 }}
            >
              RUN MY REAL NUMBERS →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
