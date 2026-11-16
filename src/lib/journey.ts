export const CORRIDOR_NAMES = ['Dubai', 'Abu Dhabi', 'Ras Al Khaimah'] as const
export type CorridorName = typeof CORRIDOR_NAMES[number]
export type ScenarioName = 'stress' | 'base' | 'upside'

export interface LabInputs {
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

export interface LabContext {
  scenario: ScenarioName
  inputs: LabInputs
}

export interface JourneyContext {
  corridor?: CorridorName
  lab?: LabContext
}

const STORAGE_KEY = 'mrlc-journey'
const EVENT_NAME = 'mrlc:journey'

export function readJourney(): JourneyContext {
  try {
    const value = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}') as JourneyContext
    return {
      corridor: CORRIDOR_NAMES.includes(value.corridor as CorridorName) ? value.corridor : undefined,
      lab: value.lab && ['stress', 'base', 'upside'].includes(value.lab.scenario) && value.lab.inputs ? value.lab : undefined,
    }
  } catch {
    return {}
  }
}

function updateJourney(next: JourneyContext) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // The custom event keeps the current page functional when storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent<JourneyContext>(EVENT_NAME, { detail: next }))
}

export function saveCorridor(corridor: CorridorName) {
  updateJourney({ ...readJourney(), corridor })
}

export function saveLab(lab: LabContext) {
  updateJourney({ ...readJourney(), lab })
}

export function clearJourneyPart(part: keyof JourneyContext) {
  const next = { ...readJourney() }
  delete next[part]
  updateJourney(next)
}

export function onJourneyChange(callback: (context: JourneyContext) => void) {
  const listener = (event: Event) => callback((event as CustomEvent<JourneyContext>).detail)
  window.addEventListener(EVENT_NAME, listener)
  return () => window.removeEventListener(EVENT_NAME, listener)
}

export function labSummary(context: LabContext) {
  const { inputs, scenario } = context
  const scenarioLabel = scenario === 'base' ? 'Base case' : scenario === 'stress' ? 'Stress' : 'Upside'
  return `${scenarioLabel} · ${inputs.category} · AED ${inputs.price.toLocaleString('en-AE')} purchase · AED ${inputs.rent.toLocaleString('en-AE')} annual rent · ${inputs.years} years · ${inputs.appreciation}% appreciation · ${inputs.deposit}% equity · ${inputs.rate}% financing`
}
