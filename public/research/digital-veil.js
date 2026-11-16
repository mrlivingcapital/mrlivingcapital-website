(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const canvas = document.createElement('canvas')
  canvas.className = 'mrlc-digital-veil'
  canvas.setAttribute('aria-hidden', 'true')
  canvas.dataset.motion = reduced ? 'static' : 'animated'
  document.body.prepend(canvas)
  const context = canvas.getContext('2d')
  if (!context) return

  const size = 55
  const points = Array.from({ length: size * size }, (_, index) => ({
    x: (index % size - size / 2) * 0.9,
    z: (Math.floor(index / size) - size / 2) * 0.9,
  }))
  const pointer = { x: 0, y: 0 }
  let width = 0
  let height = 0
  let frame = 0

  const resize = () => {
    width = window.innerWidth
    height = window.innerHeight
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(height * ratio)
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
  }
  const onPointer = (event) => {
    pointer.x = event.clientX / Math.max(1, width) * 2 - 1
    pointer.y = -(event.clientY / Math.max(1, height) * 2 - 1)
  }
  window.addEventListener('resize', resize, { passive: true })
  window.addEventListener('pointermove', onPointer, { passive: true })
  resize()

  const draw = (milliseconds) => {
    const time = reduced ? 0 : milliseconds / 1000
    context.clearRect(0, 0, width, height)
    const scale = Math.min(width, height) / 58
    const centerX = width * 0.57
    const centerY = height * 0.64
    for (const point of points) {
      const wave = Math.sin(point.x * 0.19 + time * 0.58) * 0.52 + Math.cos(point.z * 0.16 - time * 0.42) * 0.38
      const distance = Math.hypot(point.x - pointer.x * 24, point.z + pointer.y * 20)
      const interaction = Math.max(0, 1 - distance / 11)
      const x = centerX + point.x * scale
      const y = centerY + (point.z * 0.48 + wave * 1.8 - interaction * 1.8) * scale
      const glow = 0.22 + interaction * 0.7 + Math.max(0, wave) * 0.12
      context.fillStyle = `rgba(100,195,179,${glow})`
      const radius = 0.55 + interaction * 0.75
      context.fillRect(x, y, radius, radius)
    }
    if (!reduced && !document.hidden) frame = requestAnimationFrame(draw)
  }
  draw(0)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !reduced) {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(draw)
    }
  })
})()
