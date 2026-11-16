const requested = new Set<string>()

export function prefetchHtmlOnIntent(element: HTMLAnchorElement | null, url: string) {
  if (!element || url.endsWith('.pdf')) return () => {}
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (connection?.saveData) return () => {}

  const prefetch = () => {
    if (requested.has(url)) return
    requested.add(url)
    void fetch(url, { credentials: 'same-origin', headers: { Accept: 'text/html' } }).catch(() => {
      requested.delete(url)
    })
  }
  element.addEventListener('pointerenter', prefetch, { once: true })
  element.addEventListener('focus', prefetch, { once: true })
  return () => {
    element.removeEventListener('pointerenter', prefetch)
    element.removeEventListener('focus', prefetch)
  }
}
