import { useRef, useEffect, useState } from 'react'

/**
 * Revolving globe with real country outlines (Natural Earth data, self-hosted
 * at /assets/globe/borders.json). Dependency-free canvas orthographic projection:
 * zero CDN reliance, graceful fallback to a static sphere if data or canvas
 * is unavailable. Brand-locked: ivory sphere, turquoise borders, teal glow.
 */

type BorderLine = number[][][] // array of lines, points as [lng*10, lat*10]

const MARKERS: Array<[number, number]> = [
  [55.27, 25.2], // Dubai
  [-0.12, 51.5], // London
  [-79.38, 43.65], // Toronto
]

function RealGlobe() {
  const holderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const holder = holderRef.current
    if (!holder) return

    let disposed = false
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let rot = 0
    let vel = 0.16
    let dragging = false
    let lastX = 0
    let lastInteract = 0
    let t = 0
    let borders: BorderLine | null = null

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.style.cursor = 'grab'

    const fit = () => {
      const w = holder.clientWidth || 300
      const h = holder.clientHeight || 420
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
    }

    const proj = (lng: number, lat: number, R: number, cx: number, cy: number): [number, number, number] => {
      const lam = ((lng + rot) * Math.PI) / 180
      const phi = (lat * Math.PI) / 180
      const x = Math.cos(phi) * Math.sin(lam)
      const y = Math.sin(phi)
      const z = Math.cos(phi) * Math.cos(lam)
      return [cx + R * x, cy - R * y, z]
    }

    const draw = () => {
      if (disposed) return
      raf = requestAnimationFrame(draw)
      t += 0.016
      if (!dragging) {
        if (Date.now() - lastInteract > 1800) vel += (0.16 - vel) * 0.02
        rot += vel
      }
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2
      const R = Math.min(w, h) * 0.36

      /* Atmosphere glow */
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.14, 0, 6.2832)
      const glow = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.18)
      glow.addColorStop(0, 'rgba(87,169,159,0)')
      glow.addColorStop(0.55, 'rgba(87,169,159,0.16)')
      glow.addColorStop(1, 'rgba(87,169,159,0)')
      ctx.fillStyle = glow
      ctx.fill()

      /* Ivory sphere with soft shading */
      const shade = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.1, cx, cy, R)
      shade.addColorStop(0, '#FBF8F1')
      shade.addColorStop(0.75, '#F6F1E7')
      shade.addColorStop(1, '#EDE5D6')
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, 6.2832)
      ctx.fillStyle = shade
      ctx.fill()
      ctx.strokeStyle = 'rgba(15,107,98,0.25)'
      ctx.lineWidth = dpr
      ctx.stroke()

      /* Country outlines */
      if (borders) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy, R, 0, 6.2832)
        ctx.clip()
        ctx.strokeStyle = 'rgba(15,107,98,0.42)'
        ctx.lineWidth = 0.7 * dpr
        ctx.beginPath()
        for (let i = 0; i < borders.length; i++) {
          const line = borders[i]
          for (let j = 0; j < line.length - 1; j++) {
            const a = proj(line[j][0] / 10, line[j][1] / 10, R, cx, cy)
            const b = proj(line[j + 1][0] / 10, line[j + 1][1] / 10, R, cx, cy)
            if (a[2] > 0 && b[2] > 0) {
              ctx.moveTo(a[0], a[1])
              ctx.lineTo(b[0], b[1])
            }
          }
        }
        ctx.stroke()
        ctx.restore()
      }

      /* Focus-city markers with pulse rings */
      MARKERS.forEach(([lng, lat], m) => {
        const p = proj(lng, lat, R, cx, cy)
        if (p[2] <= 0) return
        const ph = (t + m * 0.9) % 1.6
        ctx.beginPath()
        ctx.arc(p[0], p[1], (2.2 + ph * 4) * dpr, 0, 6.2832)
        ctx.strokeStyle = `rgba(87,169,159,${Math.max(0, 0.7 - ph * 0.44).toFixed(2)})`
        ctx.lineWidth = dpr
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(p[0], p[1], 2 * dpr, 0, 6.2832)
        ctx.fillStyle = '#0F6B62'
        ctx.fill()
      })
    }

    const onDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - lastX
      lastX = e.clientX
      rot += dx * 0.4
      vel = dx * 0.12
      lastInteract = Date.now()
    }
    const onUp = () => {
      dragging = false
      lastInteract = Date.now()
    }

    canvas.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)

    fetch('/assets/globe/borders.json')
      .then((r) => r.json())
      .then((d: BorderLine) => {
        if (!disposed) borders = d
      })
      .catch(() => {
        /* offline: sphere + markers still render */
      })

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(holder)
    holder.innerHTML = ''
    holder.appendChild(canvas)
    draw()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      if (canvas.parentNode === holder) holder.removeChild(canvas)
    }
  }, [])

  return (
    <div
      ref={holderRef}
      style={{
        width: '100%',
        height: 'clamp(350px, 50vh, 480px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    />
  )
}

/** Static fallback sphere, used only if canvas is unavailable */
function FallbackGlobe() {
  return (
    <div
      style={{
        width: '100%',
        height: 'clamp(350px, 50vh, 480px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: 240,
          height: 240,
          borderRadius: '50%',
          border: '1.5px solid rgba(15, 107, 98, 0.2)',
          background: 'radial-gradient(circle at 35% 35%, rgba(15, 107, 98, 0.06), transparent 65%)',
          boxShadow: '0 0 60px rgba(15, 107, 98, 0.06)',
        }}
      />
    </div>
  )
}

export default function Globe3D() {
  const [canvasOk, setCanvasOk] = useState(true)
  useEffect(() => {
    try {
      const c = document.createElement('canvas')
      const cx = c.getContext('2d')
      if (!cx) setCanvasOk(false)
    } catch (e) {
      setCanvasOk(false)
    }
  }, [])
  return canvasOk ? <RealGlobe /> : <FallbackGlobe />
}
