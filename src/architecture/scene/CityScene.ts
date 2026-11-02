import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { LANDMARKS, landmarksForZone } from '../data/landmarks'
import type { DataLayerId, Landmark, SceneMetrics, ZoneId } from '../types'
import { createContextBuildings, createGround, createLandmarkGeometry, hitSizeFor, PALETTE, seededRandom, wireMaterial } from './geometry'

interface SceneCallbacks {
  onHover: (landmark: Landmark | null, x?: number, y?: number) => void
  onSelect: (landmark: Landmark) => void
  onIntroChange: (complete: boolean) => void
  onMetrics: (metrics: SceneMetrics) => void
}

interface LandmarkObject {
  group: THREE.Group
  material: THREE.LineBasicMaterial | THREE.LineDashedMaterial
  hit: THREE.Mesh
}

interface CameraTween {
  fromPosition: THREE.Vector3
  toPosition: THREE.Vector3
  fromTarget: THREE.Vector3
  toTarget: THREE.Vector3
  start: number
  duration: number
}

const ZONE_VIEWS: Record<ZoneId, { position: THREE.Vector3; target: THREE.Vector3 }> = {
  dubai: { position: new THREE.Vector3(49, 32, 57), target: new THREE.Vector3(-3, 11, 2) },
  'abu-dhabi': { position: new THREE.Vector3(43, 27, 48), target: new THREE.Vector3(0, 7, 1) },
  'ras-al-khaimah': { position: new THREE.Vector3(43, 30, 50), target: new THREE.Vector3(0, 6, 2) },
}

const BASE_COLOURS = {
  existing: PALETTE.teal,
  'under-construction': PALETTE.champagne,
  conceptual: PALETTE.supporting,
}

const clamp = THREE.MathUtils.clamp
const ease = (value: number) => 1 - Math.pow(1 - value, 3)

export class CityScene {
  private container: HTMLElement
  private callbacks: SceneCallbacks
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls
  private raycaster = new THREE.Raycaster()
  private pointer = new THREE.Vector2()
  private zoneGroups = new Map<ZoneId, THREE.Group>()
  private landmarkObjects = new Map<string, LandmarkObject>()
  private hitMeshes: THREE.Mesh[] = []
  private dataLayers = new Map<string, THREE.Group>()
  private currentZone: ZoneId = 'dubai'
  private hoveredId: string | null = null
  private selectedId: string | null = null
  private animationFrame = 0
  private introStart = performance.now()
  private introDuration = 4.8
  private introComplete = false
  private cameraTween: CameraTween | null = null
  private resizeObserver: ResizeObserver
  private disposed = false
  private captureMode = false
  private pointerDown = { x: 0, y: 0, active: false }
  private frames = 0
  private metricsStart = performance.now()
  private lowFpsSamples = 0
  private quality = 'high'
  private activeLayers = new Set<DataLayerId>(['property'])
  private reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  private isMobile = window.matchMedia('(max-width: 767px)').matches
  private tempVector = new THREE.Vector3()
  private pageScroll = false

  constructor(container: HTMLElement, callbacks: SceneCallbacks, allowPageScroll = false) {
    this.container = container
    this.callbacks = callbacks
    this.pageScroll = allowPageScroll
    this.scene.background = new THREE.Color(PALETTE.background)
    this.scene.fog = new THREE.Fog(PALETTE.fog, 72, 205)
    this.camera = new THREE.PerspectiveCamera(this.isMobile ? 54 : 46, 1, 0.1, 700)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.isMobile ? 1.25 : 1.6))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.05
    this.renderer.domElement.setAttribute('aria-label', 'Interactive three-dimensional architectural model of the UAE')
    this.renderer.domElement.setAttribute('role', 'img')
    this.renderer.domElement.className = 'city-canvas'
    container.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.055
    this.controls.enablePan = false
    this.controls.minDistance = 16
    this.controls.maxDistance = 115
    this.controls.minPolarAngle = Math.PI * 0.2
    this.controls.maxPolarAngle = Math.PI * 0.47
    this.controls.rotateSpeed = 0.42
    this.controls.zoomSpeed = 0.65
    if (this.pageScroll) {
      this.controls.enableZoom = false
      this.renderer.domElement.style.touchAction = 'pan-y'
    }
    this.controls.addEventListener('start', () => {
      this.cameraTween = null
      this.callbacks.onHover(null)
    })

    this.buildWorld()
    this.bindEvents()
    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(container)
    this.resize()

    const params = new URLSearchParams(window.location.search)
    const captureTime = params.get('t')
    this.captureMode = params.has('capture') || captureTime !== null
    const returning = window.localStorage.getItem('mrlc-architecture-intro') === 'seen'
    if (this.captureMode || returning || this.reducedMotion) {
      this.skipIntro(false)
      if (captureTime !== null) this.updateReveal(Number(captureTime))
    } else {
      this.prepareIntro()
    }

    this.exposeVerificationHooks()
    this.renderOnce()
    this.callbacks.onMetrics(this.metrics())
    if (!this.captureMode) this.animate()
  }

  private buildWorld() {
    this.scene.add(createGround())
    const zones: ZoneId[] = ['dubai', 'abu-dhabi', 'ras-al-khaimah']
    zones.forEach((zone, zoneIndex) => {
      const group = new THREE.Group()
      group.name = `zone-${zone}`
      group.visible = zone === this.currentZone
      this.zoneGroups.set(zone, group)
      this.scene.add(group)

      const contextMaterial = wireMaterial(PALETTE.forest)
      contextMaterial.opacity = 0.48
      const farMaterial = wireMaterial(PALETTE.muted)
      farMaterial.opacity = 0.24
      group.add(createContextBuildings(100 + zoneIndex * 37, this.isMobile ? 22 : 38, contextMaterial))
      group.add(createContextBuildings(400 + zoneIndex * 53, this.isMobile ? 16 : 30, farMaterial, true))
      group.add(this.createAtmosphere(zoneIndex))

      landmarksForZone(zone).forEach((landmark, landmarkIndex) => {
        const dashed = landmark.status !== 'existing'
        const material = wireMaterial(BASE_COLOURS[landmark.status], dashed)
        if (landmark.status === 'conceptual') {
          material.opacity = 0.5
          if (material instanceof THREE.LineDashedMaterial) {
            material.dashSize = 0.18
            material.gapSize = 0.32
          }
        }
        const landmarkGroup = createLandmarkGeometry(landmark, material)
        landmarkGroup.userData.revealIndex = landmarkIndex
        landmarkGroup.traverse((child) => {
          if (child instanceof THREE.Line || child instanceof THREE.LineSegments) {
            child.userData.revealDelay = landmarkIndex * 0.16
            child.userData.fullVertexCount = child.geometry.attributes.position.count
          }
        })
        group.add(landmarkGroup)

        const hitSize = hitSizeFor(landmark)
        const hit = new THREE.Mesh(
          new THREE.BoxGeometry(...hitSize),
          new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false }),
        )
        hit.position.set(landmark.position[0], landmark.position[1] + hitSize[1] * 0.5, landmark.position[2])
        hit.userData.landmarkId = landmark.id
        hit.userData.zone = zone
        group.add(hit)
        this.hitMeshes.push(hit)
        this.landmarkObjects.set(landmark.id, { group: landmarkGroup, material, hit })
      })

      const layers = this.createDataLayers(zone)
      Object.entries(layers).forEach(([id, layer]) => {
        layer.visible = id === 'property'
        this.dataLayers.set(`${zone}:${id}`, layer)
        group.add(layer)
      })
    })
  }

  private createAtmosphere(seed: number) {
    const random = seededRandom(800 + seed)
    const positions = new Float32Array(240 * 3)
    for (let index = 0; index < 240; index += 1) {
      const angle = random() * Math.PI * 2
      const radius = 12 + random() * 75
      positions[index * 3] = Math.cos(angle) * radius
      positions[index * 3 + 1] = 0.5 + random() * 26
      positions[index * 3 + 2] = Math.sin(angle) * radius
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const material = new THREE.PointsMaterial({ color: PALETTE.teal, size: 0.075, transparent: true, opacity: 0.32, depthWrite: false })
    material.toneMapped = false
    return new THREE.Points(geometry, material)
  }

  private createDataLayers(zone: ZoneId) {
    const layers: Partial<Record<DataLayerId, THREE.Group>> = {}
    const landmarks = landmarksForZone(zone)
    const random = seededRandom(zone.length * 193)
    const layerColours: Record<Exclude<DataLayerId, 'property'>, number> = {
      transactions: PALETTE.champagne,
      infrastructure: PALETTE.teal,
      comparables: PALETTE.ivory,
      risk: PALETTE.supporting,
      capital: PALETTE.champagne,
    }

    const property = new THREE.Group()
    property.name = 'property-layer'
    layers.property = property

    ;(['transactions', 'infrastructure', 'comparables', 'risk', 'capital'] as const).forEach((layerId, layerIndex) => {
      const layer = new THREE.Group()
      layer.name = `${layerId}-layer`
      const positions: number[] = []
      const connections: number[] = []
      landmarks.forEach((landmark, index) => {
        const angle = random() * Math.PI * 2
        const radius = 3 + random() * 4
        const x = landmark.position[0] + Math.cos(angle) * radius
        const y = 1.2 + layerIndex * 0.55 + random() * 1.4
        const z = landmark.position[2] + Math.sin(angle) * radius
        positions.push(x, y, z)
        if (index > 0) {
          const previous = landmarks[index - 1]
          connections.push(previous.position[0], Math.max(1, previous.height * 0.25), previous.position[2], x, y, z)
        }
      })
      const pointsGeometry = new THREE.BufferGeometry()
      pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      const pointMaterial = new THREE.PointsMaterial({ color: layerColours[layerId], size: layerId === 'transactions' ? 0.5 : 0.34, transparent: true, opacity: 0.82, depthWrite: false })
      pointMaterial.toneMapped = false
      layer.add(new THREE.Points(pointsGeometry, pointMaterial))

      if (layerId === 'infrastructure' || layerId === 'capital') {
        const lineGeometry = new THREE.BufferGeometry()
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connections, 3))
        const lineMaterial = wireMaterial(layerColours[layerId], layerId === 'capital')
        lineMaterial.opacity = 0.4
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
        if (lineMaterial instanceof THREE.LineDashedMaterial) lines.computeLineDistances()
        layer.add(lines)
      }

      if (layerId === 'risk') {
        landmarks.forEach((landmark) => {
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(2.2, 0.025, 3, 32),
            new THREE.MeshBasicMaterial({ color: PALETTE.supporting, transparent: true, opacity: 0.5 }),
          )
          ring.rotation.x = Math.PI * 0.5
          ring.position.set(landmark.position[0], 0.18, landmark.position[2])
          layer.add(ring)
        })
      }
      layers[layerId] = layer
    })
    return layers as Record<DataLayerId, THREE.Group>
  }

  private bindEvents() {
    const canvas = this.renderer.domElement
    canvas.addEventListener('pointermove', this.onPointerMove)
    canvas.addEventListener('pointerleave', this.onPointerLeave)
    canvas.addEventListener('pointerdown', this.onPointerDown)
    canvas.addEventListener('pointerup', this.onPointerUp)
    if (this.pageScroll) {
      canvas.addEventListener('wheel', this.onPageWheel, { capture: true, passive: true })
      canvas.addEventListener('touchstart', this.onPageTouch, { capture: true, passive: true })
      canvas.addEventListener('touchend', this.onPageTouch, { capture: true, passive: true })
    }
    window.addEventListener('keydown', this.onKeyDown)
  }

  private onPageWheel = (event: WheelEvent) => {
    this.controls.enableZoom = event.ctrlKey || event.metaKey
  }

  private onPageTouch = (event: TouchEvent) => {
    const multiTouch = event.touches.length > 1
    this.controls.enableRotate = multiTouch
    this.controls.enableZoom = multiTouch
  }

  private onPointerMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || this.pointerDown.active || !this.introComplete) return
    const landmark = this.pick(event)
    if (!landmark) {
      this.setHovered(null)
      return
    }
    const point = this.projectLandmark(landmark)
    this.setHovered(landmark.id)
    this.callbacks.onHover(landmark, point.x, point.y)
  }

  private onPointerLeave = () => {
    this.setHovered(null)
    this.pointerDown.active = false
  }

  private onPointerDown = (event: PointerEvent) => {
    this.pointerDown = { x: event.clientX, y: event.clientY, active: true }
  }

  private onPointerUp = (event: PointerEvent) => {
    const movement = Math.hypot(event.clientX - this.pointerDown.x, event.clientY - this.pointerDown.y)
    this.pointerDown.active = false
    if (movement > 7 || !this.introComplete) return
    const landmark = this.pick(event)
    if (landmark) this.callbacks.onSelect(landmark)
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.selectedId) this.resetCamera()
  }

  private pick(event: PointerEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const candidates = this.hitMeshes.filter((mesh) => mesh.userData.zone === this.currentZone && mesh.visible)
    const intersection = this.raycaster.intersectObjects(candidates, false)[0]
    if (!intersection) return null
    return LANDMARKS.find((landmark) => landmark.id === intersection.object.userData.landmarkId) ?? null
  }

  private projectLandmark(landmark: Landmark) {
    this.tempVector.set(landmark.position[0], landmark.position[1] + Math.max(1, landmark.height * 0.62), landmark.position[2])
    this.tempVector.project(this.camera)
    const rect = this.container.getBoundingClientRect()
    return {
      x: (this.tempVector.x * 0.5 + 0.5) * rect.width,
      y: (-this.tempVector.y * 0.5 + 0.5) * rect.height,
    }
  }

  private setHovered(id: string | null) {
    if (this.hoveredId === id) return
    this.hoveredId = id
    this.renderer.domElement.style.cursor = id ? 'pointer' : 'grab'
    if (!id) this.callbacks.onHover(null)
    this.updateHighlights()
  }

  private updateHighlights() {
    LANDMARKS.forEach((landmark) => {
      const object = this.landmarkObjects.get(landmark.id)
      if (!object) return
      const active = landmark.id === this.hoveredId || landmark.id === this.selectedId
      object.material.color.setHex(active ? (landmark.status === 'under-construction' ? PALETTE.ivory : 0x8affea) : BASE_COLOURS[landmark.status])
      object.material.opacity = active ? 1 : landmark.status === 'conceptual' ? 0.5 : 0.74
    })
  }

  private prepareIntro() {
    this.introComplete = false
    this.introStart = performance.now()
    this.controls.enabled = false
    this.callbacks.onIntroChange(false)
    const group = this.zoneGroups.get(this.currentZone)
    group?.traverse((child) => {
      if (child instanceof THREE.Line || child instanceof THREE.LineSegments) child.geometry.setDrawRange(0, 0)
    })
  }

  private updateReveal(time: number) {
    const group = this.zoneGroups.get(this.currentZone)
    group?.traverse((child) => {
      if (!(child instanceof THREE.Line || child instanceof THREE.LineSegments)) return
      const full = child.userData.fullVertexCount ?? child.geometry.attributes.position.count
      const delay = child.userData.revealDelay ?? 0
      const progress = clamp((time - delay) / 2.7, 0, 1)
      const count = Math.floor((full * ease(progress)) / 2) * 2
      child.geometry.setDrawRange(0, count)
    })
    if (time >= this.introDuration) this.skipIntro()
  }

  skipIntro = (remember = true) => {
    this.introComplete = true
    this.controls.enabled = true
    const group = this.zoneGroups.get(this.currentZone)
    group?.traverse((child) => {
      if (child instanceof THREE.Line || child instanceof THREE.LineSegments) {
        child.geometry.setDrawRange(0, child.geometry.attributes.position.count)
      }
    })
    if (remember) window.localStorage.setItem('mrlc-architecture-intro', 'seen')
    this.callbacks.onIntroChange(true)
    if (this.captureMode) this.renderOnce()
  }

  replayIntro = () => {
    this.resetCamera(false)
    this.prepareIntro()
  }

  selectLandmark = (id: string) => {
    const landmark = LANDMARKS.find((item) => item.id === id)
    if (!landmark) return
    if (landmark.zone !== this.currentZone) this.switchZone(landmark.zone, false)
    this.selectedId = id
    this.setHovered(null)
    this.updateHighlights()
    this.focusCamera(landmark)
  }

  private focusCamera(landmark: Landmark) {
    const target = new THREE.Vector3(landmark.position[0], landmark.position[1] + Math.max(0.8, landmark.height * 0.42), landmark.position[2])
    const direction = this.camera.position.clone().sub(this.controls.target).normalize()
    const distance = clamp(landmark.height * 1.9, 20, 52)
    const position = target.clone().add(direction.multiplyScalar(distance))
    position.y = Math.max(position.y, target.y + distance * 0.25)
    this.startCameraTween(position, target, this.reducedMotion ? 0.01 : 1.35)
  }

  switchZone = (zone: ZoneId, reset = true) => {
    if (!this.zoneGroups.has(zone)) return
    this.selectedId = null
    this.setHovered(null)
    this.currentZone = zone
    this.zoneGroups.forEach((group, id) => { group.visible = id === zone })
    if (reset) this.resetCamera()
    this.setLayers(Array.from(this.activeLayers))
    this.updateHighlights()
  }

  resetCamera = (animate = true) => {
    this.selectedId = null
    this.updateHighlights()
    const view = ZONE_VIEWS[this.currentZone]
    const position = view.position.clone()
    if (this.isMobile) position.multiplyScalar(0.9)
    this.startCameraTween(position, view.target.clone(), animate && !this.reducedMotion ? 1.2 : 0.01)
  }

  private startCameraTween(position: THREE.Vector3, target: THREE.Vector3, duration: number) {
    this.cameraTween = {
      fromPosition: this.camera.position.clone(),
      toPosition: position,
      fromTarget: this.controls.target.clone(),
      toTarget: target,
      start: performance.now(),
      duration: duration * 1000,
    }
  }

  setLayers = (layers: DataLayerId[]) => {
    this.activeLayers = new Set(layers)
    this.dataLayers.forEach((group, key) => {
      const [zone, layer] = key.split(':') as [ZoneId, DataLayerId]
      group.visible = zone === this.currentZone && this.activeLayers.has(layer)
    })
    this.landmarkObjects.forEach((object, id) => {
      const landmark = LANDMARKS.find((item) => item.id === id)
      if (landmark) object.group.visible = this.activeLayers.has('property')
    })
  }

  private updateCameraTween(now: number) {
    if (!this.cameraTween) return
    const tween = this.cameraTween
    const progress = clamp((now - tween.start) / tween.duration, 0, 1)
    const eased = ease(progress)
    this.camera.position.lerpVectors(tween.fromPosition, tween.toPosition, eased)
    this.controls.target.lerpVectors(tween.fromTarget, tween.toTarget, eased)
    if (progress >= 1) this.cameraTween = null
  }

  private animate = () => {
    if (this.disposed || this.captureMode) return
    this.animationFrame = requestAnimationFrame(this.animate)
    const now = performance.now()
    if (!this.introComplete) this.updateReveal((now - this.introStart) / 1000)
    this.updateCameraTween(now)
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
    this.frames += 1
    if (now - this.metricsStart >= 1200) {
      const metrics = this.metrics(now)
      this.callbacks.onMetrics(metrics)
      if (metrics.fps < 28) this.lowFpsSamples += 1
      else this.lowFpsSamples = 0
      if (this.lowFpsSamples >= 2 && this.quality === 'high') {
        this.quality = 'adaptive'
        this.renderer.setPixelRatio(1)
        this.resize()
      }
      this.frames = 0
      this.metricsStart = now
    }
  }

  private metrics(now = performance.now()): SceneMetrics {
    return {
      fps: Math.round((this.frames * 1000) / Math.max(1, now - this.metricsStart)),
      drawCalls: this.renderer.info.render.calls,
      triangles: this.renderer.info.render.triangles,
      landmarks: landmarksForZone(this.currentZone).length,
      quality: this.quality,
    }
  }

  private renderOnce() {
    const view = ZONE_VIEWS[this.currentZone]
    if (!this.cameraTween && this.camera.position.length() === 0) {
      this.camera.position.copy(this.isMobile ? view.position.clone().multiplyScalar(0.9) : view.position)
      this.controls.target.copy(view.target)
    }
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  private resize() {
    const width = Math.max(1, this.container.clientWidth)
    const height = Math.max(1, this.container.clientHeight)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height, false)
    if (this.captureMode) this.renderOnce()
  }

  private exposeVerificationHooks() {
    window.__seek = (time: number) => {
      this.captureMode = true
      cancelAnimationFrame(this.animationFrame)
      this.updateReveal(time)
      this.updateCameraTween(this.cameraTween?.start ?? performance.now())
      this.renderOnce()
    }
    window.__SCENE_READY__ = true
    window.__CITY_METRICS__ = () => this.metrics()
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.animationFrame)
    this.resizeObserver.disconnect()
    const canvas = this.renderer.domElement
    canvas.removeEventListener('pointermove', this.onPointerMove)
    canvas.removeEventListener('pointerleave', this.onPointerLeave)
    canvas.removeEventListener('pointerdown', this.onPointerDown)
    canvas.removeEventListener('pointerup', this.onPointerUp)
    canvas.removeEventListener('wheel', this.onPageWheel, { capture: true })
    canvas.removeEventListener('touchstart', this.onPageTouch, { capture: true })
    canvas.removeEventListener('touchend', this.onPageTouch, { capture: true })
    window.removeEventListener('keydown', this.onKeyDown)
    this.controls.dispose()
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
        object.geometry.dispose()
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material) => material.dispose())
      }
    })
    this.renderer.dispose()
    canvas.remove()
    delete window.__SCENE_READY__
    delete window.__seek
    delete window.__CITY_METRICS__
  }
}

declare global {
  interface Window {
    __SCENE_READY__?: boolean
    __seek?: (time: number) => void
    __CITY_METRICS__?: () => SceneMetrics
  }
}
