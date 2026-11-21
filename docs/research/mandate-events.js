(() => {
  const params = new URLSearchParams(location.search)
  const candidate = params.get('utm_source') || ''
  const referral = /^[a-zA-Z0-9._:-]{1,80}$/.test(candidate) ? candidate : ''

  document.querySelectorAll('[data-mandate-link]').forEach((link) => {
    link.setAttribute('href', `${referral ? `/?utm_source=${encodeURIComponent(referral)}` : '/'}#decision-lab`)
  })

  const track = (name, source) => {
    if (typeof window.gtag !== 'function') return
    window.gtag('event', name, {
      source,
      page_path: location.pathname,
      ...(referral ? { referral_source: referral } : {}),
    })
  }

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null
    const mandate = target?.closest('[data-mandate-source]')
    const booking = target?.closest('[data-booking-source]')
    if (mandate) track('mandate_cta_click', mandate.getAttribute('data-mandate-source') || 'research')
    if (booking) track('booking_click', booking.getAttribute('data-booking-source') || 'research')
  })
})()
