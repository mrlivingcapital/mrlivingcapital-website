import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  alpha: number
  life: number
  maxLife: number
  color: string
  bright: boolean
}

export default function DataCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const PARTICLE_DENSITY = 1
    const MOUSE_SMOOTHING = 0.15
    const vanishingPoint = { x: 0.5, y: 0.3 }
    const perspective = 0.6
    const baseSpeed = 1.0
    const spawnRate = 3

    const colors = ['#C9A87C', '#D4B896', '#B8956A', '#E8DDD0']
    let particles: Particle[] = []
    let mouse = { x: -1, y: -1 }
    let cursor = { x: 0.5, y: 0.5 }
    let smoothSpeed = 0
    let animId: number

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const w = container.offsetWidth
      const h = container.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
    }

    resize()
    window.addEventListener('resize', resize)

    const spawnParticle = (x: number, y: number, vx?: number, vy?: number, isBurst?: boolean) => {
      const count = isBurst ? 1 : Math.ceil(spawnRate * PARTICLE_DENSITY)
      for (let i = 0; i < count; i++) {
        const bright = Math.random() > 0.9

        particles.push({
          x: x + (Math.random() - 0.5) * 0.01,
          y: y + (Math.random() - 0.5) * 0.01,
          z: Math.random() * 0.3,
          vx: vx ?? (Math.random() - 0.5) * 0.2,
          vy: vy ?? (-baseSpeed - Math.random() * 0.8),
          vz: 0,
          size: 1.5 + Math.random() * 2.5,
          alpha: 0.6 + Math.random() * 0.4,
          life: 0,
          maxLife: 200 + Math.random() * 300,
          color: bright ? '#D4F1F4' : colors[Math.floor(Math.random() * colors.length)],
          bright,
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) / rect.width
      mouse.y = (e.clientY - rect.top) / rect.height
      cursor.x += (mouse.x - cursor.x) * MOUSE_SMOOTHING
      cursor.y += (mouse.y - cursor.y) * MOUSE_SMOOTHING

      const speed = Math.abs(mouse.x - cursor.x) + Math.abs(mouse.y - cursor.y)
      smoothSpeed += (speed - smoothSpeed) * 0.1

      if (mouse.x >= 0 && mouse.y >= 0) {
        spawnParticle(cursor.x, cursor.y)
      }
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 3 + 1
        spawnParticle(x, y, Math.cos(angle) * speed * 0.01, Math.sin(angle) * speed * 0.01, true)
      }
    }

    container.addEventListener('mousemove', handleMouseMove, { passive: true })
    container.addEventListener('click', handleClick)

    // Ambient particles from bottom
    let ambientCounter = 0

    const draw = () => {
      const w = container.offsetWidth
      const h = container.offsetHeight

      // Fade trail
      ctx.fillStyle = 'rgba(10, 31, 26, 0.15)'
      ctx.fillRect(0, 0, w, h)

      // Spawn ambient particles
      ambientCounter++
      if (ambientCounter % 3 === 0) {
        spawnParticle(Math.random(), 1 + Math.random() * 0.1, 0, -baseSpeed * 0.005)
      }

      // Update and draw particles
      particles = particles.filter((p) => {
        p.vy -= 0.0003 // gentle upward acceleration
        p.vx *= 0.998
        p.vy *= 0.998
        p.x += p.vx
        p.y += p.vy
        p.z += (1 - p.z) * 0.001
        p.life++

        const scale = perspective / (perspective + p.z * 0.5)
        const screenX = (p.x * scale + (vanishingPoint.x - 0.5) * (1 - scale)) * w
        const screenY = (p.y * scale + (vanishingPoint.y - 0.5) * (1 - scale)) * h
        const screenSize = p.size * scale * w * 0.003

        if (screenY < -20 || p.life > p.maxLife) return false

        const lifeRatio = 1 - p.life / p.maxLife
        const alpha = p.alpha * lifeRatio * (0.2 + Math.min(smoothSpeed, 1) * 0.8)

        ctx.beginPath()
        ctx.arc(screenX, screenY, screenSize, 0, Math.PI * 2)

        if (p.bright) {
          ctx.shadowBlur = 8
          ctx.shadowColor = p.color
        } else {
          ctx.shadowBlur = 0
        }

        ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()
        ctx.shadowBlur = 0

        return true
      })

      // Radial vignette
      const gradient = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.8)
      gradient.addColorStop(0, 'rgba(10, 31, 26, 0)')
      gradient.addColorStop(1, 'rgba(10, 31, 26, 0.8)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        background: '#0A1F1A',
        cursor: 'crosshair',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}