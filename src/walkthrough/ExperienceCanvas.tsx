import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

const TOWER_HEIGHT = 33
const CAPTURE = new URLSearchParams(window.location.search).has('capture')
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches

type PointerInput = { current: { x: number; y: number } }

function seededRandom(seed: number) {
  let value = seed >>> 0
  return () => {
    value += 0x6D2B79F5
    let t = value
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function signedPow(value: number, power: number) {
  return Math.sign(value) * Math.pow(Math.abs(value), power)
}

function towerPoint(t: number, theta: number, offset = 0) {
  const width = 5.2 * (1 - 0.5 * t) + Math.sin(t * Math.PI) * 0.34
  const depth = 3.7 * (1 - 0.4 * t)
  const exponent = 2 / 3.5
  const flute = 1 + Math.cos(theta * 8) * 0.026
  const localX = signedPow(Math.cos(theta), exponent) * (width * 0.5 + offset) * flute
  const localZ = signedPow(Math.sin(theta), exponent) * (depth * 0.5 + offset) * flute
  const twist = -0.16 + t * 0.54
  const cos = Math.cos(twist)
  const sin = Math.sin(twist)
  return new THREE.Vector3(
    localX * cos - localZ * sin + Math.sin(t * Math.PI * 0.85) * 0.72,
    t * TOWER_HEIGHT,
    localX * sin + localZ * cos + Math.sin(t * Math.PI * 1.3) * 0.18,
  )
}

function createTowerGeometry() {
  const radial = 72
  const levels = 108
  const positions: number[] = []
  const indices: number[] = []
  for (let level = 0; level <= levels; level += 1) {
    for (let segment = 0; segment < radial; segment += 1) {
      const point = towerPoint(level / levels, (segment / radial) * Math.PI * 2)
      positions.push(point.x, point.y, point.z)
    }
  }
  for (let level = 0; level < levels; level += 1) {
    for (let segment = 0; segment < radial; segment += 1) {
      const next = (segment + 1) % radial
      const a = level * radial + segment
      const b = level * radial + next
      const c = (level + 1) * radial + next
      const d = (level + 1) * radial + segment
      indices.push(a, b, d, b, c, d)
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

function createFacadeBands() {
  const positions: number[] = []
  const radial = 72
  for (let floor = 1; floor < 61; floor += 1) {
    const t = floor / 62
    for (let segment = 0; segment < radial; segment += 1) {
      const a = towerPoint(t, (segment / radial) * Math.PI * 2, 0.018)
      const b = towerPoint(t, ((segment + 1) / radial) * Math.PI * 2, 0.018)
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  return geometry
}

function createFin(theta: number, crown = false, sweep = 0) {
  const points = Array.from({ length: 42 }, (_, index) => {
    const t = index / 41
    return towerPoint(t, theta + Math.sin(t * Math.PI) * 0.025 + sweep * t, 0.07)
  })
  if (crown) {
    const last = points[points.length - 1]
    points.push(last.clone().add(new THREE.Vector3(Math.cos(theta) * 0.32, 2.4, Math.sin(theta) * 0.32)))
  }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 96, crown ? 0.055 : 0.036, 5, false)
}

function createSkyDeck(t: number) {
  const points = Array.from({ length: 72 }, (_, index) => towerPoint(t, (index / 72) * Math.PI * 2, 0.13))
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, true), 128, t > 0.95 ? 0.085 : 0.065, 6, true)
}

type HelipadConfig = {
  side: -1 | 1
  level: number
}

type CompanionProps = {
  position: [number, number, number]
  height: number
  width: number
  depth: number
  variant: number
  rotation: number
  secondary?: boolean
  helipad?: HelipadConfig
}

function companionPoint(t: number, theta: number, { height, width, depth, variant }: CompanionProps, offset = 0) {
  const taper = variant === 0 ? 1 - 0.3 * t
    : variant === 1 ? 1 - 0.14 * t
      : variant === 2 ? 1 - 0.5 * t
        : variant === 4 ? 1 - 0.34 * t
          : variant === 5 ? 1 - 0.22 * t
            : 1 - 0.18 * t
  const terrace = variant === 1
    ? (t > 0.88 ? 0.68 : t > 0.68 ? 0.82 : t > 0.42 ? 0.92 : 1)
    : variant === 2
      ? (t > 0.88 ? 0.76 : 1)
      : variant === 3
        ? (t > 0.78 ? 0.76 : t > 0.5 ? 0.9 : 1)
        : variant === 4
          ? (t > 0.8 ? 0.62 : t > 0.55 ? 0.78 : t > 0.28 ? 0.9 : 1)
          : variant === 5
            ? (t > 0.86 ? 0.72 : 1)
            : 1
  const exponent = variant === 2 ? 0.38 : variant === 1 || variant === 4 ? 0.44 : variant === 5 ? 0.32 : 0.5
  const localX = signedPow(Math.cos(theta), exponent) * (width * 0.5 * taper * terrace + offset)
  const localZ = signedPow(Math.sin(theta), exponent) * (depth * 0.5 * taper * terrace + offset)
  const twist = variant === 0 ? 0.72 * t : variant === 2 ? -0.48 * t : variant === 3 ? 0.08 * t : variant === 4 ? -0.18 * t : variant === 5 ? 0.34 * t : 0
  const cos = Math.cos(twist)
  const sin = Math.sin(twist)
  const sculpt = variant === 3 ? Math.sin(t * Math.PI) * 0.55
    : variant === 2 ? Math.sin(t * Math.PI) * 0.3
      : variant === 5 ? Math.sin(t * Math.PI * 0.85) * 0.48
        : 0
  return new THREE.Vector3(
    localX * cos - localZ * sin + sculpt,
    t * height,
    localX * sin + localZ * cos,
  )
}

function createCompanionGeometry(props: CompanionProps) {
  const radial = props.secondary ? 32 : 64
  const levels = props.secondary ? 28 : 52
  const positions: number[] = []
  const indices: number[] = []
  for (let level = 0; level <= levels; level += 1) {
    for (let segment = 0; segment < radial; segment += 1) {
      const point = companionPoint(level / levels, (segment / radial) * Math.PI * 2, props)
      positions.push(point.x, point.y, point.z)
    }
  }
  for (let level = 0; level < levels; level += 1) {
    for (let segment = 0; segment < radial; segment += 1) {
      const next = (segment + 1) % radial
      const a = level * radial + segment
      const b = level * radial + next
      const c = (level + 1) * radial + next
      const d = (level + 1) * radial + segment
      indices.push(a, b, d, b, c, d)
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

function createCompanionBands(props: CompanionProps) {
  const positions: number[] = []
  const radial = props.secondary ? 32 : 64
  const floors = Math.round(props.height * 1.65)
  for (let floor = 1; floor < floors; floor += 1) {
    const t = floor / floors
    for (let segment = 0; segment < radial; segment += 1) {
      const a = companionPoint(t, (segment / radial) * Math.PI * 2, props, 0.025)
      const b = companionPoint(t, ((segment + 1) / radial) * Math.PI * 2, props, 0.025)
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  return geometry
}

function createCap(pointAt: (theta: number) => THREE.Vector3, radial = 64) {
  const ring = Array.from({ length: radial }, (_, index) => pointAt((index / radial) * Math.PI * 2))
  const center = ring.reduce((sum, point) => sum.add(point), new THREE.Vector3()).multiplyScalar(1 / radial)
  const positions: number[] = []
  for (let index = 0; index < radial; index += 1) {
    const next = ring[(index + 1) % radial]
    const current = ring[index]
    positions.push(center.x, center.y, center.z, next.x, next.y, next.z, current.x, current.y, current.z)
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.computeVertexNormals()
  return geometry
}

function createCompanionDeck(props: CompanionProps, t: number) {
  const radial = props.secondary ? 32 : 64
  const points = Array.from({ length: radial }, (_, index) => companionPoint(t, (index / radial) * Math.PI * 2, props, 0.09))
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, true), props.secondary ? 48 : 96, 0.055, 5, true)
}

function CompanionCrown({ config: props }: { config: CompanionProps }) {
  const cap = useMemo(() => createCap((theta) => companionPoint(1, theta, props, 0.01), props.secondary ? 32 : 64), [props])
  const roofMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: props.variant === 2 ? '#b9a171' : '#9dbbb0', metalness: 0.9, roughness: 0.24,
  }), [props.variant])
  const h = props.height
  const w = props.width
  const d = props.depth
  return (
    <group>
      <mesh geometry={cap} material={roofMaterial} />
      {props.variant === 0 && <>
        <mesh position={[0, h + 0.28, 0]} rotation={[0, Math.PI / 4 + 0.72, 0]} material={roofMaterial}>
          <cylinderGeometry args={[w * 0.25, w * 0.34, 0.56, 4]} />
        </mesh>
        <mesh position={[0, h + 1.35, 0]} material={roofMaterial}><cylinderGeometry args={[0.045, 0.12, 2.2, 8]} /></mesh>
      </>}
      {props.variant === 1 && <>
        <mesh position={[0, h + 0.28, 0]} material={roofMaterial}><boxGeometry args={[w * 0.54, 0.56, d * 0.54]} /></mesh>
        <mesh position={[0, h + 0.78, 0]} material={roofMaterial}><boxGeometry args={[w * 0.38, 0.46, d * 0.38]} /></mesh>
        <mesh position={[0, h + 1.18, 0]} material={roofMaterial}><boxGeometry args={[w * 0.22, 0.36, d * 0.22]} /></mesh>
        <mesh position={[0, h + 2.05, 0]} material={roofMaterial}><cylinderGeometry args={[0.035, 0.1, 1.55, 8]} /></mesh>
      </>}
      {props.variant === 2 && <>
        <mesh position={[-w * 0.12, h + 0.85, 0]} rotation={[0, 0, -0.2]} material={roofMaterial}><boxGeometry args={[w * 0.17, 1.8, d * 0.4]} /></mesh>
        <mesh position={[w * 0.12, h + 0.85, 0]} rotation={[0, 0, 0.2]} material={roofMaterial}><boxGeometry args={[w * 0.17, 1.8, d * 0.4]} /></mesh>
        <mesh position={[0, h + 0.2, 0]} material={roofMaterial}><boxGeometry args={[w * 0.55, 0.22, d * 0.55]} /></mesh>
      </>}
      {props.variant === 3 && <>
        <mesh position={[0, h + 0.16, 0]} material={roofMaterial}><boxGeometry args={[w * 0.66, 0.32, d * 0.66]} /></mesh>
        <mesh position={[0.25, h + 0.62, -0.1]} material={roofMaterial}><boxGeometry args={[w * 0.28, 0.62, d * 0.3]} /></mesh>
        <mesh position={[-w * 0.18, h + 1.12, 0]} material={roofMaterial}><cylinderGeometry args={[0.035, 0.08, 1.25, 8]} /></mesh>
      </>}
      {props.variant === 4 && <>
        <mesh position={[0, h + 0.16, 0]} material={roofMaterial}><boxGeometry args={[w * 0.52, 0.32, d * 0.52]} /></mesh>
        <mesh position={[-w * 0.12, h + 0.58, 0]} rotation={[0, 0.22, 0]} material={roofMaterial}><boxGeometry args={[w * 0.3, 0.52, d * 0.34]} /></mesh>
        <mesh position={[w * 0.19, h + 0.42, 0]} material={roofMaterial}><boxGeometry args={[w * 0.12, 0.7, d * 0.44]} /></mesh>
      </>}
      {props.variant === 5 && <>
        <mesh position={[-w * 0.08, h + 0.85, 0]} rotation={[0, 0, -0.24]} material={roofMaterial}><boxGeometry args={[w * 0.24, 1.9, d * 0.5]} /></mesh>
        <mesh position={[w * 0.18, h + 0.32, 0]} rotation={[0, 0.34, 0]} material={roofMaterial}><boxGeometry args={[w * 0.16, 0.72, d * 0.42]} /></mesh>
        <mesh position={[-w * 0.25, h + 1.92, 0]} material={roofMaterial}><cylinderGeometry args={[0.025, 0.06, 0.9, 6]} /></mesh>
      </>}
    </group>
  )
}

function FacadeLightTrails({
  pointAt, count, animate, phase = 0, warm = false, secondary = false,
}: {
  pointAt: (t: number, theta: number) => THREE.Vector3
  count: number
  animate: boolean
  phase?: number
  warm?: boolean
  secondary?: boolean
}) {
  const headsRef = useRef<THREE.InstancedMesh>(null)
  const headDummy = useMemo(() => new THREE.Object3D(), [])
  const geometries = useMemo(() => Array.from({ length: count }, (_, index) => {
    const theta = (index / count) * Math.PI * 2
    const segments = secondary ? 40 : 64
    const points = Array.from({ length: segments }, (_, pointIndex) => pointAt(pointIndex / (segments - 1), theta))
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), secondary ? 48 : 88, secondary ? 0.048 : 0.04, 5, false)
  }), [pointAt, count, secondary])
  const materials = useMemo(() => geometries.map((_, index) => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    uniforms: {
      uTime: { value: 0 },
      uPhase: { value: phase + index / count },
      uSpeed: { value: (index % 2 ? -1 : 1) * (0.055 + (index % 3) * 0.009) },
      uColor: { value: new THREE.Color(warm && index % 3 === 0 ? '#d7b880' : '#91dac5') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uPhase;
      uniform float uSpeed;
      uniform vec3 uColor;
      void main() {
        float head = fract(uTime * uSpeed + uPhase);
        float distanceToHead = abs(fract(vUv.x - head + 0.5) - 0.5);
        float trail = smoothstep(0.17, 0.0, distanceToHead);
        float core = smoothstep(0.038, 0.0, distanceToHead);
        float alpha = trail * 0.76 + core * 0.24;
        gl_FragColor = vec4(uColor * (1.05 + core * 2.1), alpha);
      }
    `,
  })), [geometries, count, phase, warm])

  useFrame(({ clock }) => {
    const time = animate ? clock.getElapsedTime() : 0
    materials.forEach((material) => { material.uniforms.uTime.value = time })
    const heads = headsRef.current
    if (!heads) return
    for (let index = 0; index < count; index += 1) {
      const speed = (index % 2 ? -1 : 1) * (0.055 + (index % 3) * 0.009)
      const progress = ((time * speed + phase + index / count) % 1 + 1) % 1
      headDummy.position.copy(pointAt(progress, (index / count) * Math.PI * 2))
      headDummy.updateMatrix()
      heads.setMatrixAt(index, headDummy.matrix)
    }
    heads.instanceMatrix.needsUpdate = true
  })

  return <group>
    {geometries.map((geometry, index) => <group key={index}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={warm ? '#c7aa74' : '#91dac5'} transparent opacity={secondary ? 0.4 : 0.34} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh geometry={geometry} material={materials[index]} />
    </group>)}
    <instancedMesh ref={headsRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[secondary ? 0.15 : 0.13, 8, 8]} />
      <meshBasicMaterial color={warm ? '#ffe0a8' : '#c8fff0'} toneMapped={false} transparent opacity={0.96} depthWrite={false} />
    </instancedMesh>
  </group>
}

function StructuralBeam({
  start, end, radius, material,
}: {
  start: [number, number, number]
  end: [number, number, number]
  radius: number
  material: THREE.Material
}) {
  const from = new THREE.Vector3(...start)
  const to = new THREE.Vector3(...end)
  const direction = to.clone().sub(from)
  const position = from.clone().add(to).multiplyScalar(0.5)
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.clone().normalize(),
  )
  return (
    <mesh position={position} quaternion={quaternion} material={material}>
      <cylinderGeometry args={[radius, radius, direction.length(), 6]} />
    </mesh>
  )
}

function SideHelipad({ config: props, helipad }: { config: CompanionProps; helipad: HelipadConfig }) {
  const lightsRef = useRef<THREE.InstancedMesh>(null)
  const model = useMemo(() => {
    const radius = props.secondary ? 1.25 : 1.6
    const theta = helipad.side > 0 ? 0 : Math.PI
    const anchor = companionPoint(helipad.level, theta, props, 0.08)
    const center = anchor.clone().add(new THREE.Vector3(helipad.side * radius * 0.92, 0.18, 0))
    return { radius, anchor, center, deckY: center.y }
  }, [props, helipad])
  const deck = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#263b34', metalness: 0.82, roughness: 0.3,
  }), [])
  const metal = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#9dbbb0', emissive: '#294d43', emissiveIntensity: 0.5, metalness: 0.88, roughness: 0.25,
  }), [])
  const marking = useMemo(() => new THREE.MeshBasicMaterial({ color: '#d7e9df', toneMapped: false }), [])
  const perimeter = useMemo(() => Array.from({ length: 12 }, (_, index) => {
    const angle = (index / 12) * Math.PI * 2
    return new THREE.Vector3(
      model.center.x + Math.cos(angle) * model.radius * 0.86,
      model.deckY + 0.22,
      model.center.z + Math.sin(angle) * model.radius * 0.86,
    )
  }), [model])

  useEffect(() => {
    const lights = lightsRef.current
    if (!lights) return
    const dummy = new THREE.Object3D()
    perimeter.forEach((position, index) => {
      dummy.position.copy(position)
      dummy.updateMatrix()
      lights.setMatrixAt(index, dummy.matrix)
    })
    lights.instanceMatrix.needsUpdate = true
  }, [perimeter])

  const { anchor, center, deckY, radius } = model
  const bridgeLength = Math.abs(center.x - anchor.x)
  return (
    <group>
      <StructuralBeam
        start={[anchor.x, anchor.y - 1.35, anchor.z - 0.42]}
        end={[center.x + helipad.side * radius * 0.52, deckY - 0.16, center.z - 0.42]}
        radius={0.075}
        material={metal}
      />
      <StructuralBeam
        start={[anchor.x, anchor.y - 1.35, anchor.z + 0.42]}
        end={[center.x + helipad.side * radius * 0.52, deckY - 0.16, center.z + 0.42]}
        radius={0.075}
        material={metal}
      />
      <mesh position={[(anchor.x + center.x) * 0.5, deckY - 0.04, anchor.z]} material={metal}>
        <boxGeometry args={[bridgeLength + 0.28, 0.16, 0.72]} />
      </mesh>
      <mesh position={[center.x, deckY, center.z]} material={deck}>
        <cylinderGeometry args={[radius, radius * 0.93, 0.22, 40]} />
      </mesh>
      <mesh position={[center.x, deckY + 0.14, center.z]} rotation={[Math.PI / 2, 0, 0]} material={metal}>
        <torusGeometry args={[radius * 0.96, 0.035, 6, 48]} />
      </mesh>
      <mesh position={[center.x, deckY + 0.125, center.z]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 0.7, radius * 0.74, 48]} />
        <meshBasicMaterial color="#91dac5" transparent opacity={0.72} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh position={[center.x - radius * 0.22, deckY + 0.135, center.z]} material={marking}>
        <boxGeometry args={[radius * 0.1, 0.025, radius * 0.82]} />
      </mesh>
      <mesh position={[center.x + radius * 0.22, deckY + 0.135, center.z]} material={marking}>
        <boxGeometry args={[radius * 0.1, 0.025, radius * 0.82]} />
      </mesh>
      <mesh position={[center.x, deckY + 0.135, center.z]} material={marking}>
        <boxGeometry args={[radius * 0.48, 0.025, radius * 0.1]} />
      </mesh>
      <instancedMesh ref={lightsRef} args={[undefined, undefined, perimeter.length]} frustumCulled={false}>
        <sphereGeometry args={[props.secondary ? 0.055 : 0.07, 6, 6]} />
        <meshBasicMaterial color="#ffe0a8" toneMapped={false} />
      </instancedMesh>
    </group>
  )
}

function CompanionTower({ config: props, animate }: { config: CompanionProps; animate: boolean }) {
  const geometry = useMemo(() => createCompanionGeometry(props), [props])
  const bands = useMemo(() => createCompanionBands(props), [props])
  const finCount = props.secondary ? 4 : 8
  const finGeometry = useMemo(() => {
    const segments = props.secondary ? 24 : 40
    const fins = Array.from({ length: finCount }, (_, index) => {
      const points = Array.from({ length: segments }, (_, pointIndex) => {
        const t = pointIndex / (segments - 1)
        const sweep = props.variant === 2 ? (index % 2 ? 1 : -1) * t * 1.3 : props.variant === 0 ? t * 0.18 : props.variant === 5 ? t * 0.22 : 0
        return companionPoint(t, (index / finCount) * Math.PI * 2 + sweep, props, 0.065)
      })
      return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), props.secondary ? 32 : 56, props.variant === 2 || props.variant === 5 ? 0.038 : 0.032, 5, false)
    })
    return mergeGeometries(fins)
  }, [props, finCount])
  const deckGeometry = useMemo(() => {
    const levels = props.variant === 1 ? [0.42, 0.68, 0.88, 1]
      : props.variant === 3 ? [0.5, 0.78, 1]
        : props.variant === 2 ? [0.88, 1]
          : props.variant === 4 ? [0.28, 0.55, 0.8, 1]
            : props.variant === 5 ? [0.58, 0.86, 1]
              : [0.72, 1]
    return mergeGeometries(levels.map((level) => createCompanionDeck(props, level)))
  }, [props])
  const glass = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: props.variant % 2 ? '#23473e' : '#193a32', metalness: 0.72, roughness: 0.25,
    clearcoat: 0.95, clearcoatRoughness: 0.18, emissive: '#081b16', emissiveIntensity: 0.48, flatShading: true,
  }), [props.variant])
  const metal = useMemo(() => new THREE.MeshStandardMaterial({
    color: props.variant === 2 || props.variant === 5 ? '#c0a575' : '#91b3a6', metalness: 0.9, roughness: 0.25,
  }), [props.variant])
  const lightPath = useMemo(() => (t: number, theta: number) => companionPoint(t, theta, props, 0.115), [props])

  return (
    <group position={props.position} rotation={[0, props.rotation, 0]}>
      <mesh geometry={geometry} material={glass} />
      <lineSegments geometry={bands}>
        <lineBasicMaterial color={props.variant === 2 ? '#d0b783' : '#8bd6c1'} transparent opacity={0.28} depthWrite={false} />
      </lineSegments>
      <mesh geometry={finGeometry} material={metal} />
      <mesh geometry={deckGeometry} material={metal} />
      {props.helipad && <SideHelipad config={props} helipad={props.helipad} />}
      <FacadeLightTrails pointAt={lightPath} count={props.secondary ? 3 : 5} animate={animate} phase={props.variant * 0.13} warm={props.variant === 2 || props.variant === 5} secondary={props.secondary} />
      <CompanionCrown config={props} />
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[props.width * 1.2, 0.55, props.depth * 1.2]} />
        <meshStandardMaterial color="#172923" metalness={0.64} roughness={0.34} />
      </mesh>
      <mesh position={[0, -0.58, 0]}>
        <boxGeometry args={[props.width * 1.42, 0.24, props.depth * 1.42]} />
        <meshStandardMaterial color="#243a32" metalness={0.52} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.3, props.depth * 0.62]}>
        <boxGeometry args={[props.width * 0.48, 0.12, 0.85]} />
        <meshStandardMaterial color="#9dbbb0" metalness={0.85} roughness={0.28} />
      </mesh>
      <pointLight position={[0, props.height * 0.72, 1.5]} color={props.variant === 2 ? '#d7b880' : '#79c8b5'} intensity={9} distance={10} decay={2} />
    </group>
  )
}

const COMPANIONS: CompanionProps[] = [
  { position: [-8.7, 0, 2.8], height: 17, width: 3.5, depth: 3.1, variant: 0, rotation: 0.22 },
  { position: [-11.8, 0, -3.4], height: 21, width: 3.1, depth: 2.8, variant: 1, rotation: -0.28, helipad: { side: 1, level: 0.76 } },
  { position: [7.8, 0, 2.4], height: 19.5, width: 3.2, depth: 3.2, variant: 2, rotation: 0.38, helipad: { side: 1, level: 0.74 } },
  { position: [11.2, 0, -3.2], height: 15.5, width: 4, depth: 2.7, variant: 3, rotation: -0.18 },
  { position: [-17.2, 0, 2.8], height: 11.5, width: 5.2, depth: 3.5, variant: 4, rotation: 0.34, secondary: true },
  { position: [-20.2, 0, -3.8], height: 14.5, width: 2.5, depth: 4.1, variant: 5, rotation: -0.42, secondary: true },
  { position: [15.8, 0, 2.6], height: 10.5, width: 5.4, depth: 3.4, variant: 4, rotation: -0.28, secondary: true },
  { position: [19.2, 0, -3.5], height: 14.5, width: 2.6, depth: 4, variant: 5, rotation: 0.45, secondary: true, helipad: { side: -1, level: 0.72 } },
  { position: [-24.4, 0, 1.4], height: 8.5, width: 4.4, depth: 3.2, variant: 3, rotation: 0.18, secondary: true },
  { position: [-25.2, 0, -6.6], height: 11, width: 2.8, depth: 3.3, variant: 1, rotation: -0.36, secondary: true },
  { position: [23.7, 0, 1.8], height: 8.8, width: 4.2, depth: 3.1, variant: 0, rotation: -0.24, secondary: true },
  { position: [25.1, 0, -6.2], height: 11.5, width: 3, depth: 3.2, variant: 3, rotation: 0.32, secondary: true },
]

function WindowLights() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const lights = useMemo(() => {
    const random = seededRandom(417)
    const result: Array<{ position: THREE.Vector3; normal: THREE.Vector3; warm: boolean; scale: number }> = []
    for (let floor = 2; floor < 58; floor += 1) {
      for (let column = 0; column < 18; column += 1) {
        if (random() > 0.24) continue
        const theta = (column / 18) * Math.PI * 2 + (floor % 2) * 0.025
        const position = towerPoint(floor / 62, theta, 0.045)
        const normal = new THREE.Vector3(position.x, 0, position.z).normalize()
        result.push({ position, normal, warm: random() > 0.78, scale: 0.7 + random() * 0.65 })
      }
    }
    return result
  }, [])

  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    const dummy = new THREE.Object3D()
    const forward = new THREE.Vector3(0, 0, 1)
    lights.forEach((light, index) => {
      dummy.position.copy(light.position)
      dummy.quaternion.setFromUnitVectors(forward, light.normal)
      dummy.scale.set(light.scale, light.scale, light.scale)
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
      mesh.setColorAt(index, new THREE.Color(light.warm ? '#d7b880' : '#79c8b5'))
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [lights])

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, lights.length]} frustumCulled={false}>
      <planeGeometry args={[0.24, 0.055]} />
      <meshBasicMaterial toneMapped={false} transparent opacity={0.82} depthWrite={false} />
    </instancedMesh>
  )
}

function SignatureTower({ active, animate, input }: { active: boolean; animate: boolean; input: PointerInput }) {
  const groupRef = useRef<THREE.Group>(null)
  const { size } = useThree()
  const mobile = size.width < 768
  const portraitTablet = !mobile && size.width < 1200 && size.height > size.width
  const compactLandscape = !mobile && !portraitTablet && size.width < 1200
  const horizontalOffset = mobile ? 6 : portraitTablet ? 16 : compactLandscape ? 26 : 23
  const verticalOffset = mobile ? -10.5 : portraitTablet ? -16 : -3.2
  const skylineScale = mobile ? 0.68 : portraitTablet ? 0.5 : compactLandscape ? 0.78 : 1
  const towerGeometry = useMemo(() => createTowerGeometry(), [])
  const bandGeometry = useMemo(() => createFacadeBands(), [])
  const fins = useMemo(() => Array.from({ length: 10 }, (_, index) => createFin((index / 10) * Math.PI * 2)), [])
  const structuralFins = useMemo(() => [0.4, 1.95, 3.55, 5.1].map((theta, index) => createFin(theta, false, index % 2 ? -0.32 : 0.32)), [])
  const skyDecks = useMemo(() => [0.26, 0.51, 0.76, 0.975].map((t) => createSkyDeck(t)), [])
  const crownFins = useMemo(() => [0.18, Math.PI * 0.58, Math.PI * 1.08, Math.PI * 1.58].map((theta) => createFin(theta, true)), [])
  const towerCap = useMemo(() => createCap((theta) => towerPoint(1, theta, 0.01), 72), [])
  const glass = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#1b3b34', metalness: 0.72, roughness: 0.22, clearcoat: 1,
    clearcoatRoughness: 0.16, emissive: '#071713', emissiveIntensity: 0.5,
  }), [])
  const metal = useMemo(() => new THREE.MeshStandardMaterial({ color: '#8fa99c', metalness: 0.92, roughness: 0.25 }), [])
  const crownMetal = useMemo(() => new THREE.MeshStandardMaterial({ color: '#b79b67', metalness: 0.9, roughness: 0.24 }), [])
  const deckMetal = useMemo(() => new THREE.MeshStandardMaterial({ color: '#b8d8ca', emissive: '#4b9b88', emissiveIntensity: 0.72, metalness: 0.82, roughness: 0.22 }), [])
  const lightPath = useMemo(() => (t: number, theta: number) => towerPoint(t, theta, 0.13), [])

  useFrame(({ clock }) => {
    const group = groupRef.current
    if (!group || !active) return
    const time = animate ? clock.getElapsedTime() : 0
    const target = -0.08 + (animate ? Math.sin(time * 0.12) * 0.025 + input.current.x * 0.025 : 0)
    group.rotation.y = animate ? group.rotation.y + (target - group.rotation.y) * 0.035 : target
  })

  return (
    <group ref={groupRef} visible={active} position={[horizontalOffset, verticalOffset, 0]} scale={skylineScale} rotation={[0, -0.08, 0]}>
      <mesh geometry={towerGeometry} material={glass} />
      <lineSegments geometry={bandGeometry}>
        <lineBasicMaterial color="#8ad3c0" transparent opacity={0.18} depthWrite={false} />
      </lineSegments>
      {fins.map((geometry, index) => <mesh key={index} geometry={geometry} material={metal} />)}
      {structuralFins.map((geometry, index) => <mesh key={index} geometry={geometry} material={crownMetal} />)}
      {skyDecks.map((geometry, index) => <mesh key={index} geometry={geometry} material={deckMetal} />)}
      {crownFins.map((geometry, index) => <mesh key={index} geometry={geometry} material={crownMetal} />)}
      <FacadeLightTrails pointAt={lightPath} count={8} animate={animate} phase={0.21} />
      <mesh geometry={towerCap} material={crownMetal} />
      <group position={[0.32, TOWER_HEIGHT, -0.12]}>
        <mesh position={[0, 0.2, 0]} material={crownMetal}>
          <cylinderGeometry args={[1.2, 1.42, 0.4, 8]} />
        </mesh>
        <mesh position={[0, 0.65, 0]} material={metal}>
          <cylinderGeometry args={[0.88, 1.1, 0.5, 8]} />
        </mesh>
        <mesh position={[0, 1.08, 0]} material={crownMetal}>
          <cylinderGeometry args={[0.56, 0.78, 0.36, 8]} />
        </mesh>
        <mesh position={[0, 1.48, 0]} material={deckMetal}>
          <cylinderGeometry args={[0.38, 0.48, 0.48, 8]} />
        </mesh>
        <mesh position={[0, 2.45, 0]} material={crownMetal}>
          <cylinderGeometry args={[0.035, 0.11, 1.55, 10]} />
        </mesh>
      </group>
      <mesh position={[0, 0.32, 2.35]} material={metal}><boxGeometry args={[2.2, 0.18, 1.25]} /></mesh>
      {COMPANIONS.map((config, index) => <CompanionTower key={index} config={config} animate={animate} />)}
      <WindowLights />
      <mesh position={[0, -0.32, 0]} scale={[1.45, 0.3, 1.1]}>
        <cylinderGeometry args={[3.5, 3.85, 1.1, 72]} />
        <meshStandardMaterial color="#101c19" metalness={0.62} roughness={0.34} />
      </mesh>
      <mesh position={[0, -0.88, 0]} scale={[1.7, 0.18, 1.32]}>
        <cylinderGeometry args={[4.1, 4.35, 0.8, 72]} />
        <meshStandardMaterial color="#1d2c27" metalness={0.48} roughness={0.42} />
      </mesh>
      <mesh position={[0, -1.18, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.45, 1.05, 1]}>
        <ringGeometry args={[4.3, 6.6, 96]} />
        <meshPhysicalMaterial color="#102d29" metalness={0.82} roughness={0.1} clearcoat={1} />
      </mesh>
      <pointLight position={[0, 1, 4]} color="#8de0c8" intensity={38} distance={18} decay={2} />
      <pointLight position={[0.5, TOWER_HEIGHT + 1.2, 0.5]} color="#d7b880" intensity={18} distance={12} decay={2} />
    </group>
  )
}

function DigitalVeil({ active, animate, input }: { active: boolean; animate: boolean; input: PointerInput }) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const size = 103
  const count = size * size
  const base = useMemo(() => {
    const values = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (index % size - size / 2) * 0.9
      values[index * 3 + 1] = -2.1
      values[index * 3 + 2] = (Math.floor(index / size) - size / 2) * 0.9
    }
    return values
  }, [count, size])
  const positions = useMemo(() => new Float32Array(base), [base])
  const colors = useMemo(() => {
    const values = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = 0.16
      values[index * 3 + 1] = 0.62
      values[index * 3 + 2] = 0.52
    }
    return values
  }, [count])

  useFrame(({ clock }) => {
    const material = materialRef.current
    const targetOpacity = active ? 0.38 : 0.64
    if (material) material.opacity = animate ? material.opacity + (targetOpacity - material.opacity) * 0.04 : targetOpacity
    if (!animate) return
    const geometry = geometryRef.current
    if (!geometry) return
    const positionAttribute = geometry.attributes.position
    const colorAttribute = geometry.attributes.color
    const positionValues = positionAttribute.array as Float32Array
    const colorValues = colorAttribute.array as Float32Array
    const time = clock.getElapsedTime()
    const mouseX = input.current.x * 24
    const mouseZ = -input.current.y * 20
    for (let index = 0; index < count; index += 1) {
      const x = base[index * 3]
      const z = base[index * 3 + 2]
      const distance = Math.hypot(x - mouseX, z - mouseZ)
      const interaction = Math.max(0, 1 - distance / 11)
      positionValues[index * 3 + 1] = -2.1
        + Math.sin(x * 0.19 + time * 0.58) * 0.52
        + Math.cos(z * 0.16 - time * 0.42) * 0.38
        - interaction * 1.8
      const glow = 0.44 + interaction * 0.56
      colorValues[index * 3] = 0.12 * glow
      colorValues[index * 3 + 1] = 0.68 * glow
      colorValues[index * 3 + 2] = 0.57 * glow
    }
    positionAttribute.needsUpdate = true
    colorAttribute.needsUpdate = true
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={materialRef} size={0.08} vertexColors transparent opacity={0.46} depthWrite={false} sizeAttenuation toneMapped={false} />
    </points>
  )
}

function CameraRig({ active, animate, input }: { active: boolean; animate: boolean; input: PointerInput }) {
  const { camera, size } = useThree()
  const lookAtRef = useRef(new THREE.Vector3())
  const desiredRef = useRef(new THREE.Vector3())
  const lookAt = lookAtRef.current
  const desired = desiredRef.current
  const mobile = size.width < 768
  const fieldOfView = mobile ? 48 : 42
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera) || camera.fov === fieldOfView) return
    Object.assign(camera, { fov: fieldOfView })
    camera.updateProjectionMatrix()
  }, [camera, fieldOfView])

  useFrame(({ clock }) => {
    if (active) {
      desired.set(mobile ? 22 : 25, mobile ? 25 : 21, mobile ? 115 : 88)
      if (animate) {
        desired.x += input.current.x * 0.65 + Math.sin(clock.getElapsedTime() * 0.1) * 0.32
        desired.y += input.current.y * 0.35
      }
      lookAt.set(mobile ? 6 : 4.5, mobile ? 28 : 12.2, -1)
    } else {
      desired.set(0, 14, 43)
      lookAt.set(0, -0.8, 0)
    }
    camera.position.lerp(desired, animate ? 0.035 : 1)
    camera.lookAt(lookAt)
  })
  return null
}

function ReadySignal() {
  const frames = useRef(0)
  const { gl } = useThree()
  useFrame(() => {
    frames.current += 1
    if (frames.current === 3) {
      window.__SCENE_READY__ = true
      window.__CITY_METRICS__ = () => ({
        drawCalls: gl.info.render.calls,
        triangles: gl.info.render.triangles,
        landmarks: COMPANIONS.length + 1,
        fps: 0,
        quality: 'high',
      })
    }
  })
  return null
}

function ExperienceScene({ activeSlide }: { activeSlide: number }) {
  const input = useRef({ x: 0, y: 0 })
  const active = activeSlide === 0
  const animate = !REDUCED && !CAPTURE

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      input.current.x = (event.clientX / window.innerWidth) * 2 - 1
      input.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => window.removeEventListener('pointermove', onPointer)
  }, [])

  return (
    <>
      <color attach="background" args={['#060d0b']} />
      <fog attach="fog" args={['#060d0b', 48, 155]} />
      <ambientLight intensity={0.7} color="#a7c8ba" />
      <hemisphereLight args={['#b8d9ca', '#07110e', 1.25]} />
      <directionalLight position={[-12, 26, 18]} intensity={3.2} color="#d7c5a0" />
      <directionalLight position={[20, 12, -14]} intensity={4.1} color="#62c8b2" />
      <directionalLight position={[2, 4, 24]} intensity={1.4} color="#b8d7ca" />
      <DigitalVeil active={active} animate={animate} input={input} />
      <SignatureTower active={active} animate={animate} input={input} />
      <CameraRig active={active} animate={animate} input={input} />
      <ReadySignal />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.46} luminanceThreshold={0.78} luminanceSmoothing={0.58} mipmapBlur />
      </EffectComposer>
    </>
  )
}

export default function ExperienceCanvas({ activeSlide }: { activeSlide: number }) {
  return (
    <div className="experience-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [25, 21, 88], fov: 42, near: 0.1, far: 180 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.08
          gl.outputColorSpace = THREE.SRGBColorSpace
        }}
      >
        <ExperienceScene activeSlide={activeSlide} />
      </Canvas>
    </div>
  )
}
