(() => {
  const root = document.querySelector('article') || document.querySelector('main')
  if (!root) return

  const slug = (text, index) => `${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'}-${index + 1}`
  const headings = Array.from(root.querySelectorAll('h2')).filter((heading) => heading.textContent.trim())
  headings.forEach((heading, index) => { if (!heading.id) heading.id = slug(heading.textContent, index) })
  if (!headings.length) return

  if (location.pathname.startsWith('/corridors/')) document.documentElement.dataset.readingTheme = 'dark'
  const words = (root.textContent || '').trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 220))

  const progress = document.createElement('div')
  progress.className = 'mrlc-reading-progress'
  progress.setAttribute('role', 'progressbar')
  progress.setAttribute('aria-label', 'Reading progress')
  progress.setAttribute('aria-valuemin', '0')
  progress.setAttribute('aria-valuemax', '100')
  progress.innerHTML = '<i></i>'
  document.body.appendChild(progress)

  const tools = document.createElement('div')
  tools.className = 'mrlc-reading-tools'
  tools.innerHTML = `
    <div class="mrlc-reading-meta"><span class="mrlc-reading-time">${minutes} min read</span><button type="button" class="mrlc-print">Print / save PDF</button></div>
    <details class="mrlc-reading-toc" ${window.matchMedia('(min-width: 701px)').matches ? 'open' : ''}><summary>On this page <span>${headings.length} sections</span></summary><nav aria-label="On this page">${headings.map((heading, index) => `<a href="#${heading.id}"><span>${String(index + 1).padStart(2, '0')}</span>${heading.textContent.trim()}</a>`).join('')}</nav></details>`
  root.parentNode.insertBefore(tools, root)

  const related = document.createElement('nav')
  related.className = 'mrlc-related-links'
  related.setAttribute('aria-label', 'Continue your research')
  related.innerHTML = '<strong>Continue your research</strong><a href="/blog/">Research library</a><a href="/corridors/">Corridor briefings</a><a href="/#inquiry">Private inquiry</a>'
  root.parentNode.insertBefore(related, root.nextSibling)

  const mandate = document.createElement('aside')
  mandate.className = 'mrlc-mandate-cta'
  mandate.setAttribute('aria-label', 'Private investor mandate')
  mandate.innerHTML = `
    <strong>PRIVATE INVESTOR MANDATE</strong>
    <p>Bring your objectives, capital range, timing and constraints. Start with an evidence-first scenario, then book a direct investor-fit call if the numbers merit a conversation.</p>
    <div><a data-mandate-link data-mandate-source="research" href="/#decision-lab">Start Your Private Mandate</a><a data-booking-source="research" href="https://wa.me/971585899112?text=Hello%20Masoud%2C%20I%20would%20like%20to%20book%20a%2020-minute%20investor-fit%20call.%20My%20preferred%20date%2C%20time%20and%20time%20zone%20are%3A%20" target="_blank" rel="noopener noreferrer">Book a 20-minute investor-fit call</a></div>`
  root.parentNode.insertBefore(mandate, related)
  if (!document.querySelector('script[src="/research/mandate-events.js"]')) {
    const events = document.createElement('script')
    events.src = '/research/mandate-events.js'
    document.head.appendChild(events)
  }

  if (!document.querySelector('link[href="/research/social-rail.css"]')) {
    const styles = document.createElement('link')
    styles.rel = 'stylesheet'
    styles.href = '/research/social-rail.css'
    document.head.appendChild(styles)
  }
  if (!document.querySelector('script[src="/research/social-rail.js"]')) {
    const socials = document.createElement('script')
    socials.src = '/research/social-rail.js'
    document.body.appendChild(socials)
  }

  tools.querySelector('.mrlc-print').addEventListener('click', () => window.print())
  let scheduled = false
  const update = () => {
    const available = document.documentElement.scrollHeight - window.innerHeight
    const value = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 100
    progress.firstElementChild.style.transform = `scaleX(${value / 100})`
    progress.setAttribute('aria-valuenow', String(Math.round(value)))
    scheduled = false
  }
  const requestUpdate = () => {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(update)
  }
  window.addEventListener('scroll', requestUpdate, { passive: true })
  window.addEventListener('resize', requestUpdate, { passive: true })
  update()
})()
