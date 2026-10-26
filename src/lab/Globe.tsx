import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * LIVING GLOBE (Motion Lab edition): real country borders on a draggable
 * 3D sphere, gold capital arcs out of Dubai, pulsing markers, atmosphere
 * glow. Raw three.js, no postprocessing, capped DPR for mobile.
 */

const TEAL = 0x57a99f
const TEAL_DIM = 0x1d4a43
const GOLD = 0xb08d4a
const IVORY = 0xf6f1e7

function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = ((lon + 180) * Math.PI) / 180
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

const HUBS = [
  { name: 'DUBAI', lat: 25.2048, lon: 55.2708, color: GOLD, hub: true },
  { name: 'LONDON', lat: 51.5074, lon: -0.1278, color: TEAL },
  { name: 'TORONTO', lat: 43.6532, lon: -79.3832, color: TEAL },
]

function buildArc(a: THREE.Vector3, b: THREE.Vector3): THREE.CatmullRomCurve3 {
  const dist = a.distanceTo(b)
  const mid = a
    .clone()
    .add(b)
    .multiplyScalar(0.5)
    .normalize()
    .multiplyScalar(1 + dist * 0.32)
  return new THREE.CatmullRomCurve3([a, mid, b])
}

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 20)
    camera.position.set(0, 0, 2.75)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    mount.appendChild(renderer.domElement)

    const world = new THREE.Group()
    scene.add(world)

    // dotted base sphere
    const sphereGeo = new THREE.SphereGeometry(1, 110, 110)
    const dots = new THREE.Points(
      sphereGeo,
      new THREE.PointsMaterial({ color: TEAL_DIM, size: 0.011, transparent: true, opacity: 0.85 })
    )
    world.add(dots)

    // country borders (merged line segments)
    fetch('/assets/globe/borders.json')
      .then((r) => r.json())
      .then((polys: number[][][]) => {
        const verts: number[] = []
        polys.forEach((ring) => {
          for (let i = 0; i < ring.length - 1; i++) {
            const [lon1, lat1] = ring[i]
            const [lon2, lat2] = ring[i + 1]
            if (Math.abs(lon2 - lon1) > 180) continue // skip dateline jumps
            const v1 = latLonToVec3(lat1, lon1, 1.004)
            const v2 = latLonToVec3(lat2, lon2, 1.004)
            verts.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z)
          }
        })
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
        const borders = new THREE.LineSegments(
          geo,
          new THREE.LineBasicMaterial({ color: TEAL, transparent: true, opacity: 0.42 })
        )
        world.add(borders)
      })
      .catch(() => {})

    // atmosphere glow: soft radial-gradient sprite behind the globe
    const glowCanvas = document.createElement('canvas')
    glowCanvas.width = glowCanvas.height = 256
    const gctx = glowCanvas.getContext('2d')!
    const grad = gctx.createRadialGradient(128, 128, 60, 128, 128, 128)
    grad.addColorStop(0, 'rgba(87, 169, 159, 0.28)')
    grad.addColorStop(0.55, 'rgba(87, 169, 159, 0.10)')
    grad.addColorStop(1, 'rgba(87, 169, 159, 0)')
    gctx.fillStyle = grad
    gctx.fillRect(0, 0, 256, 256)
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(glowCanvas),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    )
    glow.scale.setScalar(3.6)
    glow.position.z = -0.4
    scene.add(glow)

    // hubs, arcs, travelling pulses
    const pulses: { mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; offset: number }[] = []
    const dubai = latLonToVec3(HUBS[0].lat, HUBS[0].lon, 1.012)

    HUBS.forEach((h) => {
      const pos = latLonToVec3(h.lat, h.lon, 1.012)
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(h.hub ? 0.016 : 0.01, 12, 12),
        new THREE.MeshBasicMaterial({ color: h.color })
      )
      marker.position.copy(pos)
      world.add(marker)
      const ringGeo = new THREE.RingGeometry(0.02, 0.026, 32)
      const ring = new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({ color: h.color, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
      )
      ring.position.copy(pos.clone().multiplyScalar(1.001))
      ring.lookAt(pos.clone().multiplyScalar(2))
      ring.userData.pulse = true
      world.add(ring)

      if (!h.hub) {
        const curve = buildArc(dubai.clone(), pos)
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(curve.getPoints(72)),
          new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.55 })
        )
        world.add(line)
        const pulse = new THREE.Mesh(
          new THREE.SphereGeometry(0.008, 8, 8),
          new THREE.MeshBasicMaterial({ color: IVORY })
        )
        world.add(pulse)
        pulses.push({ mesh: pulse, curve, offset: Math.random() })
      }
    })

    // face the Gulf at load
    world.rotation.y = 2.45
    world.rotation.x = 0.28

    // drag with inertia
    let dragging = false
    let px = 0
    let py = 0
    let velY = 0
    let velX = 0
    const onDown = (e: PointerEvent) => {
      dragging = true
      px = e.clientX
      py = e.clientY
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      velY = (e.clientX - px) * 0.004
      velX = (e.clientY - py) * 0.003
      px = e.clientX
      py = e.clientY
    }
    const onUp = () => (dragging = false)
    renderer.domElement.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    renderer.domElement.style.cursor = 'grab'

    const resize = () => {
      const w = mount.clientWidth || 1
      const h = mount.clientHeight || 1
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    let raf = 0
    const clock = new THREE.Clock()
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      if (!dragging) {
        velY *= 0.94
        velX *= 0.94
        world.rotation.y += 0.0012 // idle spin
      }
      world.rotation.y += velY
      world.rotation.x = THREE.MathUtils.clamp(world.rotation.x + velX, -0.9, 0.9)
      pulses.forEach((p) => {
        const u = (t * 0.12 + p.offset) % 1
        p.mesh.position.copy(p.curve.getPoint(u))
        ;(p.mesh.material as THREE.MeshBasicMaterial).opacity = Math.sin(u * Math.PI)
      })
      world.children.forEach((c) => {
        if (c.userData.pulse) {
          const s = 1 + 0.35 * Math.sin(t * 2.2)
          c.scale.setScalar(s)
          ;(c as THREE.Mesh).lookAt(camera.position)
        }
      })
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      renderer.domElement.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%', minHeight: 340 }} aria-label="Interactive 3D globe with country borders and capital arcs from Dubai" />
}
