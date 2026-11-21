import { labSummary, type JourneyContext } from './journey'
import { readReferralSource } from './conversions'

export interface InquiryForm {
  name: string
  email: string
  phone: string
  interest: string
  message: string
  gotcha: string
}

const LIMITS = { name: 120, email: 200, phone: 80, interest: 120, message: 4000 }

export async function submitInquiry(form: InquiryForm, journey: JourneyContext) {
  if (form.gotcha) throw new Error('Inquiry rejected')
  const clean = Object.fromEntries(Object.entries(LIMITS).map(([key, limit]) => [key, form[key as keyof typeof LIMITS].trim().slice(0, limit)]))
  if (!clean.name || !clean.email || !clean.interest) throw new Error('Required inquiry fields are missing')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) throw new Error('A valid email is required')

  const response = await fetch('https://formspree.io/f/xkokazvz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...clean,
      corridor: journey.corridor || '',
      scenario_context: journey.lab ? labSummary(journey.lab) : '',
      referral_source: readReferralSource(),
      source: 'Cinematic Walkthrough Inquiry',
      _subject: 'New Inquiry - MR Living Capital',
      _gotcha: form.gotcha,
    }),
  })
  if (!response.ok) throw new Error('Inquiry failed')
}
