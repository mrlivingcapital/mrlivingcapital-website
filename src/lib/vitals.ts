import type { Metric } from 'web-vitals'

type VitalSnapshot = Pick<Metric, 'value' | 'rating'>
type VitalName = 'CLS' | 'INP' | 'LCP'

declare global {
  interface Window {
    __MRLC_VITALS__?: Partial<Record<VitalName, VitalSnapshot>>
    gtag?: (...args: unknown[]) => void
  }
}

const PRODUCTION_HOSTS = new Set(['mrlivingcapital.com', 'www.mrlivingcapital.com'])

export async function startVitals() {
  try {
    const { onCLS, onINP, onLCP } = await import('web-vitals')
    const productionHost = PRODUCTION_HOSTS.has(window.location.hostname)
    const demoMode = new URLSearchParams(window.location.search).get('phase1-demo') === '1'
    const report = (metric: Metric) => {
      window.__MRLC_VITALS__ = {
        ...window.__MRLC_VITALS__,
        [metric.name]: { value: metric.value, rating: metric.rating },
      }

      if (!productionHost || demoMode) return

      // Deliberately limited to anonymous performance fields; no form or visitor data.
      window.gtag?.('event', 'web_vitals', {
        metric_name: metric.name,
        value: metric.value,
        metric_rating: metric.rating,
        page_path: window.location.pathname,
        non_interaction: true,
      })
    }

    onCLS(report)
    onINP(report)
    // Local/demo views update as LCP candidates arrive; production sends only its final value.
    onLCP(report, { reportAllChanges: !productionHost || demoMode })
  } catch {
    // Metrics are optional; blocked or unsupported collection must not affect the site.
  }
}
