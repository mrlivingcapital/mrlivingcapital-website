export type ConversionSource = 'header' | 'decision_lab' | 'contact' | 'research'

export function readReferralSource(): string {
  const value = new URLSearchParams(window.location.search).get('utm_source') || ''
  return /^[a-zA-Z0-9._:-]{1,80}$/.test(value) ? value : ''
}

function track(name: string, source: ConversionSource) {
  // Analytics is initialized only on the production hosts; otherwise this is a no-op.
  const referralSource = readReferralSource()
  window.gtag?.('event', name, {
    source,
    page_path: window.location.pathname,
    ...(referralSource ? { referral_source: referralSource } : {}),
  })
}

export const trackMandateClick = (source: ConversionSource) => track('mandate_cta_click', source)
export const trackBookingClick = (source: ConversionSource) => track('booking_click', source)
export const trackDecisionLabComplete = () => track('decision_lab_complete', 'decision_lab')
export const trackInquiryStart = () => track('inquiry_start', 'contact')
export const trackInquirySuccess = () => track('inquiry_success', 'contact')
