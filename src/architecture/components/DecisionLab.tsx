import { useMemo, useState } from 'react'
import { Calculator, Info, RotateCcw } from 'lucide-react'

const currency = new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 })
const number = new Intl.NumberFormat('en-AE', { maximumFractionDigits: 1 })

interface LabInputs {
  category: string
  price: number
  rent: number
  expenses: number
  years: number
  appreciation: number
  deposit: number
  rate: number
  risk: string
  liquidity: string
}

const DEFAULTS: LabInputs = {
  category: 'Residential apartment',
  price: 2500000,
  rent: 180000,
  expenses: 25000,
  years: 5,
  appreciation: 3,
  deposit: 40,
  rate: 4.5,
  risk: 'Balanced',
  liquidity: 'Medium',
}

type Scenario = 'stress' | 'base' | 'upside'

export function DecisionLab() {
  const [inputs, setInputs] = useState<LabInputs>(DEFAULTS)
  const [scenario, setScenario] = useState<Scenario>('base')
  const [showFormulas, setShowFormulas] = useState(false)
  const [mobilePanel, setMobilePanel] = useState<'assumptions' | 'results' | 'sensitivity'>('assumptions')

  const update = <K extends keyof LabInputs>(key: K, value: LabInputs[K]) => {
    setInputs((current) => ({ ...current, [key]: value }))
  }

  const results = useMemo(() => calculate(inputs, scenario), [inputs, scenario])
  const sensitivity = useMemo(() => [-3, 0, 3].map((delta) => ({ delta, result: calculate(inputs, 'base', delta) })), [inputs])

  return (
    <div className="decision-lab" data-mobile-panel={mobilePanel}>
      <div className="drawer-heading">
        <span className="technical-label">INVESTMENT DECISION LAB · ILLUSTRATIVE</span>
        <h2>Different inputs.<br /><em>Different outcomes.</em></h2>
        <p>Explore a hypothetical scenario using transparent formulas. This is an educational model—not personalised financial advice, a valuation, or a promise of returns.</p>
        <span className="lab-compact-note">Illustrative educational model · not financial advice.</span>
      </div>

      <div className="scenario-tabs" aria-label="Scenario selection">
        {(['stress', 'base', 'upside'] as Scenario[]).map((item) => (
          <button key={item} type="button" className={scenario === item ? 'active' : ''} onClick={() => setScenario(item)} aria-pressed={scenario === item}>
            {item === 'stress' ? 'Stress' : item === 'base' ? 'Base case' : 'Upside'}
          </button>
        ))}
      </div>
      <p className="scenario-note">Stress: appreciation −3 pts and expenses +10%. Upside: appreciation +2 pts. Base case uses your exact inputs.</p>
      <span className="scenario-compact-note">Stress: −3 pts / +10% expenses · Upside: +2 pts · Base: exact inputs.</span>

      <div className="lab-mobile-nav" aria-label="Decision Lab views">
        {(['assumptions', 'results', 'sensitivity'] as const).map((panel) => (
          <button type="button" key={panel} className={mobilePanel === panel ? 'active' : ''} aria-pressed={mobilePanel === panel} onClick={() => setMobilePanel(panel)}>
            {panel === 'assumptions' ? 'Assumptions' : panel === 'results' ? 'Results' : 'Sensitivity'}
          </button>
        ))}
      </div>

      <div className="lab-layout">
        <section className="lab-controls" aria-labelledby="assumptions-title">
          <div className="section-title-row">
            <h3 id="assumptions-title">Inputs</h3>
            <button type="button" className="text-button" onClick={() => { setInputs(DEFAULTS); setScenario('base') }}>
              <RotateCcw size={15} /> Reset
            </button>
          </div>
          <label className="field-label">
            Asset category
            <select value={inputs.category} onChange={(event) => update('category', event.target.value)}>
              <option>Residential apartment</option>
              <option>Villa / townhouse</option>
              <option>Commercial asset</option>
              <option>Hospitality asset</option>
            </select>
          </label>
          <RangeField label="Illustrative purchase price" value={inputs.price} min={500000} max={20000000} step={50000} display={currency.format(inputs.price)} onChange={(value) => update('price', value)} />
          <RangeField label="Expected annual rental income" value={inputs.rent} min={0} max={1500000} step={5000} display={currency.format(inputs.rent)} onChange={(value) => update('rent', value)} />
          <RangeField label="Estimated annual expenses" value={inputs.expenses} min={0} max={400000} step={2500} display={currency.format(inputs.expenses)} onChange={(value) => update('expenses', value)} />
          <RangeField label="Holding period" value={inputs.years} min={1} max={20} step={1} display={`${inputs.years} years`} onChange={(value) => update('years', value)} />
          <RangeField label="Annual capital appreciation assumption" value={inputs.appreciation} min={-10} max={15} step={0.5} display={`${number.format(inputs.appreciation)}%`} onChange={(value) => update('appreciation', value)} />
          <RangeField label="Buyer equity / deposit" value={inputs.deposit} min={20} max={100} step={5} display={`${inputs.deposit}%`} onChange={(value) => update('deposit', value)} />
          <RangeField label="Financing rate assumption" value={inputs.rate} min={0} max={15} step={0.25} display={`${number.format(inputs.rate)}%`} onChange={(value) => update('rate', value)} />
          <div className="field-grid">
            <label className="field-label">Risk tolerance
              <select value={inputs.risk} onChange={(event) => update('risk', event.target.value)}><option>Conservative</option><option>Balanced</option><option>High</option></select>
            </label>
            <label className="field-label">Liquidity requirement
              <select value={inputs.liquidity} onChange={(event) => update('liquidity', event.target.value)}><option>Low</option><option>Medium</option><option>High</option></select>
            </label>
          </div>
          <aside className="live-report-box">
            <span>LIVE PROJECT EVALUATION</span>
            <p>Contact us for a live report on any project : residential, commercial etc. for a live evaluation before investing, we will give you the investor thesis</p>
          </aside>
        </section>

        <section className="lab-results" aria-live="polite" aria-label="Scenario outputs">
          <div className="result-primary">
            <span>ILLUSTRATIVE NET YIELD</span>
            <strong>{number.format(results.netYield)}%</strong>
            <small>{scenario.toUpperCase()} · {inputs.category}</small>
          </div>
          <div className="result-grid">
            <Result label="Gross rental yield" value={`${number.format(results.grossYield)}%`} />
            <Result label="Net operating income" value={currency.format(results.noi)} />
            <Result label="Initial capital requirement" value={currency.format(results.initialCapital)} />
            <Result label="Annual debt service" value={currency.format(results.debtService)} />
            <Result label="Annual post-debt cash flow" value={currency.format(results.cashFlow)} tone={results.cashFlow < 0 ? 'negative' : undefined} />
            <Result label={`Estimated value after ${inputs.years} yrs`} value={currency.format(results.projectedValue)} />
            <Result label="Illustrative equity outcome" value={currency.format(results.equityOutcome)} tone={results.equityOutcome < 0 ? 'negative' : undefined} />
            <Result label="Simple cash-flow payback" value={results.payback ? `${number.format(results.payback)} yrs` : 'Not positive'} />
          </div>
          <div className={`lab-watch ${results.cashFlow < 0 ? 'negative' : ''}`}>
            <Info size={18} />
            <p><strong>{results.cashFlow < 0 ? 'Cash-flow pressure' : 'Review the assumptions'}</strong>{results.cashFlow < 0 ? ' Estimated net operating income does not cover annual debt service in this scenario.' : ` The result is highly sensitive to entry price, rent, expenses and financing. Your ${inputs.liquidity.toLowerCase()} liquidity requirement and ${inputs.risk.toLowerCase()} risk tolerance should be assessed separately.`}</p>
          </div>
        </section>
      </div>

      <section className="sensitivity-section">
        <h3>Capital appreciation sensitivity</h3>
        <p>Equity outcome when the base-case annual appreciation assumption changes. All other inputs remain constant.</p>
        <div className="sensitivity-grid">
          {sensitivity.map(({ delta, result }) => (
            <div key={delta}>
              <span>{delta > 0 ? '+' : ''}{delta} pts</span>
              <strong>{currency.format(result.equityOutcome)}</strong>
              <small>{number.format(inputs.appreciation + delta)}% annual assumption</small>
            </div>
          ))}
        </div>
      </section>

      <button type="button" className="formula-toggle" onClick={() => setShowFormulas((value) => !value)} aria-expanded={showFormulas}>
        <Calculator size={17} /> {showFormulas ? 'Hide formulas & limitations' : 'Show formulas & limitations'}
      </button>
      {showFormulas && (
        <div className="formula-panel">
          <p><strong>NOI</strong> = annual rent − annual expenses.</p>
          <p><strong>Net yield</strong> = NOI ÷ purchase price × 100.</p>
          <p><strong>Debt service</strong> = amortising monthly payment over 30 years × 12; zero when 100% equity is used.</p>
          <p><strong>Initial capital</strong> = buyer equity + an illustrative 4% acquisition allowance.</p>
          <p><strong>Projected value</strong> = price × (1 + appreciation)<sup>years</sup>.</p>
          <p><strong>Equity outcome</strong> = projected sale value − estimated remaining loan + cumulative post-debt cash flow − initial capital. Selling costs, taxes, vacancies, changing rates, maintenance shocks and transaction timing are not modelled.</p>
        </div>
      )}
    </div>
  )
}

function RangeField({ label, value, min, max, step, display, onChange }: { label: string; value: number; min: number; max: number; step: number; display: string; onChange: (value: number) => void }) {
  const id = `lab-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`
  return (
    <div className="range-field">
      <label htmlFor={id}><span>{label}</span><strong>{display}</strong></label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </div>
  )
}

function Result({ label, value, tone }: { label: string; value: string; tone?: 'negative' }) {
  return <div className={`result-item ${tone ?? ''}`}><span>{label}</span><strong>{value}</strong></div>
}

function calculate(inputs: LabInputs, scenario: Scenario, appreciationDelta = 0) {
  const scenarioAppreciation = scenario === 'stress' ? -3 : scenario === 'upside' ? 2 : 0
  const scenarioExpenses = scenario === 'stress' ? 1.1 : 1
  const appreciation = (inputs.appreciation + scenarioAppreciation + appreciationDelta) / 100
  const expenses = inputs.expenses * scenarioExpenses
  const noi = inputs.rent - expenses
  const grossYield = inputs.price > 0 ? (inputs.rent / inputs.price) * 100 : 0
  const netYield = inputs.price > 0 ? (noi / inputs.price) * 100 : 0
  const loan = inputs.price * (1 - inputs.deposit / 100)
  const initialCapital = inputs.price - loan + inputs.price * 0.04
  const monthlyRate = inputs.rate / 100 / 12
  const payments = 360
  const monthlyPayment = loan <= 0 ? 0 : monthlyRate === 0 ? loan / payments : loan * monthlyRate / (1 - Math.pow(1 + monthlyRate, -payments))
  const debtService = monthlyPayment * 12
  const cashFlow = noi - debtService
  const paidPayments = Math.min(payments, inputs.years * 12)
  const remainingLoan = loan <= 0 ? 0 : monthlyRate === 0
    ? Math.max(0, loan - monthlyPayment * paidPayments)
    : loan * Math.pow(1 + monthlyRate, paidPayments) - monthlyPayment * ((Math.pow(1 + monthlyRate, paidPayments) - 1) / monthlyRate)
  const projectedValue = inputs.price * Math.pow(1 + appreciation, inputs.years)
  const equityOutcome = projectedValue - remainingLoan + cashFlow * inputs.years - initialCapital
  const payback = cashFlow > 0 ? initialCapital / cashFlow : null
  return { noi, grossYield, netYield, loan, initialCapital, debtService, cashFlow, remainingLoan, projectedValue, equityOutcome, payback }
}
