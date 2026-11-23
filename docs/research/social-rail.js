(() => {
  if (document.querySelector('.mrlc-social-rail')) return
  const icons = {
    whatsapp: '<path d="M3 21l1.65-3.8a9 9 0 113.4 2.9L3 21"/><path d="M9 12a1 1 0 001 0h0M15 12a1 1 0 001 0h0M10 15c.5 1 2.5 1.5 3.5 0"/>',
    linkedin: '<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    telegram: '<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>',
  }
  const socials = [
    ['whatsapp', 'https://wa.me/971585899112'],
    ['linkedin', 'https://www.linkedin.com/in/mrlivingcapital/'],
    ['telegram', 'https://t.me/mrlivingcapital'],
    ['instagram', 'https://instagram.com/mrlivingcapital'],
  ]
  const rail = document.createElement('nav')
  rail.className = 'mrlc-social-rail'
  rail.setAttribute('aria-label', 'MR Living Capital social channels')
  socials.forEach(([network, href]) => {
    const label = `${network[0].toUpperCase()}${network.slice(1)} · @mrlivingcapital`
    const link = document.createElement('a')
    link.dataset.network = network
    link.href = href
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.setAttribute('aria-label', `Contact MR Living Capital on ${label}`)
    link.title = label
    link.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[network]}</svg>`
    rail.appendChild(link)
  })
  document.body.appendChild(rail)
})()
