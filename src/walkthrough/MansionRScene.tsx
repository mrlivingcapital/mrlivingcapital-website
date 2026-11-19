import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { buildMansionModel } from './mansion/model'
import './MansionRScene.css'

type Selection = { level: number; label: string } | null
type MansionPart = {
  label: string
  level: number
  order: number
  home: THREE.Vector3
  object: THREE.Object3D
}

type MansionModel = {
  scene: THREE.Scene
  parts: MansionPart[]
  dispose: () => void
}

type MaterialObject = THREE.Object3D & { material: THREE.Material | THREE.Material[] }
const hasMaterial = (object: THREE.Object3D): object is MaterialObject => 'material' in object && Boolean(object.material)

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const ease = (value: number) => { const x = clamp(value); return x * x * (3 - 2 * x) }

function MansionRig({ progress, selection, hovered, onHover, onSelect, onComponentsChange }: {
  progress: number
  selection: Selection
  hovered: MansionPart | null
  onHover: (part: MansionPart | null) => void
  onSelect: (part: MansionPart) => void
  onComponentsChange: (count: number) => void
}) {
  const [model, setModel] = useState<MansionModel | null>(null)
  const modelRef = useRef<MansionModel | null>(null)
  const scatter = useRef(new Map<MansionPart, THREE.Vector3>())
  const { camera } = useThree()
  const cameraRef = useRef(camera)
  const hoverMaterial = useMemo(() => {
    const material = new THREE.LineBasicMaterial({ color: '#91dac5', transparent: true, opacity: 1 })
    material.name = 'MansionR · Cursor proximity highlight'
    return material
  }, [])

  useEffect(() => {
    let active = true
    const loader = new GLTFLoader()
    void buildMansionModel({ loadCar: async (url: string) => {
      const result = await loader.loadAsync(url)
      return { object: result.scene }
    } }).then((built) => {
      if (!active) { built.dispose(); return }
      built.parts.forEach((part, index) => {
        const angle = index * 2.399963
        const radius = 30 + (index % 7) * 3.2
        part.object.userData.mansionPart = part
        part.object.userData.homeRotation = part.object.rotation.clone()
        if (hasMaterial(part.object)) part.object.userData.homeMaterial = part.object.material
        part.object.position.copy(part.home)
        scatter.current.set(part, new THREE.Vector3(
          Math.cos(angle) * radius,
          part.home.y + 5 + (index % 5) * 1.6,
          Math.sin(angle) * radius,
        ))
      })
      onComponentsChange(built.parts.length)
      modelRef.current = built
      setModel(built)
    }).catch((error) => console.error('MansionR model could not load', error))
    return () => {
      active = false
      modelRef.current?.dispose()
      modelRef.current = null
    }
  }, [onComponentsChange])

  useEffect(() => {
    if (!hovered) return
    const originals: Array<{ object: MaterialObject; material: THREE.Material | THREE.Material[] }> = []
    hovered.object.traverse((object) => {
      if (hasMaterial(object)) {
        originals.push({ object, material: object.material })
        object.material = hoverMaterial
      }
    })
    return () => originals.forEach(({ object, material }) => { object.material = material })
  }, [hovered, hoverMaterial])

  useEffect(() => () => hoverMaterial.dispose(), [hoverMaterial])

  useFrame((_, delta) => {
    if (!model) return
    const alpha = 1 - Math.exp(-5.5 * delta)
    model.parts.forEach((part) => {
      const scattered = scatter.current.get(part) || part.home
      const local = ease(progress * 1.35 - part.order * 0.35)
      const target = scattered.clone().lerp(part.home, local)
      if (selection?.level === part.level) target.x += 13
      if (hovered === part) target.y += 0.65
      part.object.position.lerp(target, alpha)
      const homeRotation = part.object.userData.homeRotation as THREE.Euler
      part.object.rotation.x = THREE.MathUtils.damp(part.object.rotation.x, homeRotation.x, 5, delta)
      part.object.rotation.y = THREE.MathUtils.damp(part.object.rotation.y, homeRotation.y, 5, delta)
      part.object.rotation.z = THREE.MathUtils.damp(part.object.rotation.z, homeRotation.z, 5, delta)
    })
    if ('zoom' in cameraRef.current) {
      cameraRef.current.zoom = THREE.MathUtils.damp(cameraRef.current.zoom, 0.68 + progress * 0.32, 4, delta)
      cameraRef.current.updateProjectionMatrix()
    }
  })

  if (!model) return null
  const partFromEvent = (object: THREE.Object3D): MansionPart | undefined => {
    let current: THREE.Object3D | null = object
    while (current) {
      if (current.userData.mansionPart) return current.userData.mansionPart as MansionPart
      current = current.parent
    }
  }
  return <>
    <primitive
      object={model.scene}
      onPointerOver={(event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); const part = partFromEvent(event.object); if (part) onHover(part) }}
      onPointerOut={() => onHover(null)}
      onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); const part = partFromEvent(event.object); if (part) onSelect(part) }}
    />
    <OrbitControls makeDefault target={window.innerWidth < 768 ? [0, 10, 0] : [0, 5, 0]} enableDamping dampingFactor={0.07} minZoom={0.45} maxZoom={2.5} />
  </>
}

export default function MansionRScene() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0)
  const [selection, setSelection] = useState<Selection>(null)
  const [hovered, setHovered] = useState<MansionPart | null>(null)
  const [componentCount, setComponentCount] = useState(0)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.querySelector('[data-slide="mansionr"]')?.setAttribute('data-assembly', String(progress))
  }, [progress])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || reducedMotion) return
    const onWheel = (event: globalThis.WheelEvent) => {
      if ((progress === 0 && event.deltaY < 0) || (progress === 1 && event.deltaY > 0)) return
      event.preventDefault()
      event.stopPropagation()
      setProgress((current) => clamp(current + event.deltaY * 0.0022))
    }
    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => stage.removeEventListener('wheel', onWheel)
  }, [progress, reducedMotion])

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }
  }
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!touch.current || reducedMotion) return
    const dx = event.changedTouches[0].clientX - touch.current.x
    const dy = event.changedTouches[0].clientY - touch.current.y
    touch.current = null
    if (Math.abs(dy) < 42 || Math.abs(dy) < Math.abs(dx) * 1.2) return
    if ((progress === 0 && dy > 0) || (progress === 1 && dy < 0)) return
    event.stopPropagation()
    setProgress((current) => clamp(current - dy * 0.006))
  }
  const selectFacility = (level: number, label: string) => setSelection({ level, label })
  const mobile = window.innerWidth < 768
  const frustumWidth = mobile ? 86 : 56 * (window.innerWidth / window.innerHeight)

  return (
    <div ref={stageRef} className="mansionr-stage" data-native-scroll onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="mansionr-copy">
        <span className="slide-eyebrow">MANSIONR · THE ARCHITECTURE OF LIVING CAPITAL</span>
        <h2>The architecture of<br /><em>living capital.</em></h2>
        <p>A modular G+2 residence, assembled around you. Move through the structure to discover the architecture, facilities and landscape.</p>
        <div className="mansionr-property"><strong>MANSIONR</strong><span>ARCHITECTURAL GAMIFICATION & ILLUSTRATION</span><small>Independent concept experience · not a real-estate project</small></div>
      </div>

      <div className="mansionr-canvas" aria-label="Interactive modular G+2 mansion">
        {reducedMotion ? <img src="/images/mansionr-assembled.png" alt="Assembled teal G+2 mansion with rooftop, glazing, pool and garden" /> : <Canvas orthographic camera={{ position: [58, 42, 64], zoom: 0.68, left: -frustumWidth / 2, right: frustumWidth / 2, top: 38, bottom: -38, near: 0.1, far: 500 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[20, 35, 25]} intensity={2.4} color="#a7d8ca" />
          <MansionRig progress={progress} selection={selection} hovered={hovered} onHover={setHovered} onSelect={(part) => selectFacility(part.level, part.label)} onComponentsChange={setComponentCount} />
        </Canvas>}
      </div>

      <div className="mansionr-view-controls" aria-label="Facility views">
        <span>EXPLORE FACILITIES</span>
        <button type="button" onClick={() => selectFacility(2, 'Pool & gardens')}>Pool & gardens</button>
        <button type="button" onClick={() => selectFacility(1, 'Private gym')}>Private gym</button>
        <button type="button" onClick={() => selectFacility(5, 'Cinema & spa')}>Cinema & spa</button>
        <button type="button" onClick={() => selectFacility(6, 'Rooftop sky lounge')}>Rooftop sky lounge</button>
        <button type="button" onClick={() => { setProgress(1); setSelection(null) }}>Assembled view</button>
      </div>

      <div className="mansionr-progress" aria-live="polite">
        <span>{progress === 0 ? 'RADIAL ASSEMBLY' : progress === 1 ? 'FULLY ASSEMBLED' : `${Math.round(progress * 100)}% ASSEMBLED`}</span>
        <i><b style={{ transform: `scaleX(${progress})` }} /></i>
        <small>{componentCount || '—'} COMPONENTS · SCROLL / SWIPE TO ASSEMBLE</small>
      </div>

      {selection && <aside className="mansionr-facility" aria-label={`${selection.label} details`}>
        <button type="button" aria-label="Close facility view" onClick={() => setSelection(null)}>×</button>
        <span>FACILITY VIEW</span>
        <h3>{selection.label}</h3>
        <p>The selected architectural level moves away from the structure so its internal layout and component relationships can be inspected.</p>
      </aside>}
    </div>
  )
}
