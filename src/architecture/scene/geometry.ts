import * as THREE from 'three'
import type { Landmark } from '../types'

export const PALETTE = {
  background: 0x050a09,
  fog: 0x07110f,
  teal: 0x19e6c1,
  supporting: 0x0c9382,
  forest: 0x0f6b62,
  ivory: 0xf6f1e7,
  champagne: 0xc9a96a,
  muted: 0x365f56,
}

export function seededRandom(seed: number) {
  let value = seed >>> 0
  return () => {
    value += 0x6d2b79f5
    let t = value
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function wireMaterial(color: number = PALETTE.teal, dashed = false) {
  const material = dashed
    ? new THREE.LineDashedMaterial({ color, transparent: true, opacity: 0.82, dashSize: 0.55, gapSize: 0.32 })
    : new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.74 })
  material.toneMapped = false
  return material
}

function addGeometry(
  parent: THREE.Group,
  geometry: THREE.BufferGeometry,
  material: THREE.LineBasicMaterial | THREE.LineDashedMaterial,
  position: [number, number, number] = [0, 0, 0],
  scale: [number, number, number] = [1, 1, 1],
  rotation: [number, number, number] = [0, 0, 0],
  dense = false,
) {
  const wire = dense ? new THREE.WireframeGeometry(geometry) : new THREE.EdgesGeometry(geometry, 18)
  const line = new THREE.LineSegments(wire, material)
  line.position.set(...position)
  line.scale.set(...scale)
  line.rotation.set(...rotation)
  if (material instanceof THREE.LineDashedMaterial) line.computeLineDistances()
  line.userData.fullVertexCount = wire.attributes.position.count
  parent.add(line)
  geometry.dispose()
  return line
}

function addPath(parent: THREE.Group, points: THREE.Vector3[], material: THREE.LineBasicMaterial | THREE.LineDashedMaterial, closed = false) {
  const geometry = new THREE.BufferGeometry().setFromPoints(closed ? [...points, points[0]] : points)
  const line = new THREE.Line(geometry, material)
  if (material instanceof THREE.LineDashedMaterial) line.computeLineDistances()
  line.userData.fullVertexCount = geometry.attributes.position.count
  parent.add(line)
  return line
}

function box(parent: THREE.Group, size: [number, number, number], at: [number, number, number], material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  return addGeometry(parent, new THREE.BoxGeometry(...size), material, at)
}

function cylinder(
  parent: THREE.Group,
  radiusTop: number,
  radiusBottom: number,
  height: number,
  at: [number, number, number],
  material: THREE.LineBasicMaterial | THREE.LineDashedMaterial,
  sides = 8,
) {
  return addGeometry(parent, new THREE.CylinderGeometry(radiusTop, radiusBottom, height, sides, 1), material, at)
}

function burjKhalifa(height: number, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const group = new THREE.Group()
  const tiers = 8
  const bodyHeight = height * 0.82
  const tierHeight = bodyHeight / tiers
  for (let index = 0; index < tiers; index += 1) {
    const progress = index / tiers
    const lower = THREE.MathUtils.lerp(height * 0.095, height * 0.025, progress)
    const upper = lower * 0.76
    const y = tierHeight * (index + 0.5)
    cylinder(group, upper, lower, tierHeight * 0.96, [0, y, 0], material, 6)
    const ring = new THREE.EllipseCurve(0, 0, lower * 1.04, lower * 1.04, 0, Math.PI * 2)
    const points = ring.getPoints(36).map((point) => new THREE.Vector3(point.x, y - tierHeight * 0.48, point.y))
    addPath(group, points, material, true)
  }
  cylinder(group, 0.025, height * 0.018, height * 0.22, [0, bodyHeight + height * 0.1, 0], material, 6)
  cylinder(group, height * 0.13, height * 0.16, height * 0.025, [0, height * 0.012, 0], material, 12)
  return group
}

function sailTower(height: number, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const group = new THREE.Group()
  const shape = new THREE.Shape()
  shape.moveTo(-height * 0.19, 0)
  shape.lineTo(height * 0.19, 0)
  shape.quadraticCurveTo(height * 0.06, height * 0.48, -height * 0.1, height * 0.92)
  shape.quadraticCurveTo(-height * 0.23, height * 0.48, -height * 0.19, 0)
  addGeometry(group, new THREE.ExtrudeGeometry(shape, { depth: height * 0.09, bevelEnabled: false, curveSegments: 20 }), material, [0, 0, -height * 0.045])
  box(group, [height * 0.5, height * 0.035, height * 0.25], [0, height * 0.017, 0], material)
  addPath(group, [new THREE.Vector3(-height * 0.1, height * 0.88, 0), new THREE.Vector3(-height * 0.1, height * 1.09, 0)], material)
  return group
}

function museum(height: number, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const group = new THREE.Group()
  addGeometry(
    group,
    new THREE.TorusGeometry(height * 0.29, height * 0.085, 5, 26),
    material,
    [0, height * 0.54, 0],
    [1.15, 1.35, 0.82],
    [0.08, 0.12, -0.12],
    true,
  )
  cylinder(group, height * 0.26, height * 0.34, height * 0.09, [0, height * 0.045, 0], material, 24)
  return group
}

function dubaiFrame(height: number, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const group = new THREE.Group()
  const width = height * 0.62
  box(group, [height * 0.1, height, height * 0.12], [-width * 0.45, height * 0.5, 0], material)
  box(group, [height * 0.1, height, height * 0.12], [width * 0.45, height * 0.5, 0], material)
  box(group, [width, height * 0.11, height * 0.12], [0, height * 0.945, 0], material)
  for (let index = 1; index < 7; index += 1) {
    const x = THREE.MathUtils.lerp(-width * 0.4, width * 0.4, index / 7)
    addPath(group, [new THREE.Vector3(x, height * 0.89, 0), new THREE.Vector3(x, height, 0)], material)
  }
  return group
}

function emiratesTowers(height: number, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const group = new THREE.Group()
  cylinder(group, 0.25, height * 0.14, height, [-height * 0.13, height * 0.5, 0], material, 3)
  cylinder(group, 0.2, height * 0.12, height * 0.78, [height * 0.18, height * 0.39, height * 0.05], material, 3)
  box(group, [height * 0.62, height * 0.07, height * 0.28], [0, height * 0.035, 0], material)
  return group
}

function marinaCluster(height: number, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial, seed = 7) {
  const group = new THREE.Group()
  const random = seededRandom(seed)
  const count = 6
  for (let index = 0; index < count; index += 1) {
    const angle = (index / count) * Math.PI * 2
    const radius = height * (0.12 + random() * 0.12)
    const towerHeight = height * (0.55 + random() * 0.45)
    const width = height * (0.08 + random() * 0.055)
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    box(group, [width, towerHeight, width * 0.82], [x, towerHeight * 0.5, z], material)
    const rings = Math.max(3, Math.floor(towerHeight / 2.3))
    for (let floor = 1; floor < rings; floor += 1) {
      const y = (floor / rings) * towerHeight
      addPath(group, [
        new THREE.Vector3(x - width * 0.5, y, z - width * 0.41),
        new THREE.Vector3(x + width * 0.5, y, z - width * 0.41),
        new THREE.Vector3(x + width * 0.5, y, z + width * 0.41),
        new THREE.Vector3(x - width * 0.5, y, z + width * 0.41),
      ], material, true)
    }
  }
  return group
}

function observationWheel(height: number, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const group = new THREE.Group()
  const radius = height * 0.41
  addGeometry(group, new THREE.TorusGeometry(radius, height * 0.012, 4, 48), material, [0, height * 0.55, 0])
  for (let index = 0; index < 16; index += 1) {
    const angle = (index / 16) * Math.PI * 2
    const end = new THREE.Vector3(Math.cos(angle) * radius, height * 0.55 + Math.sin(angle) * radius, 0)
    addPath(group, [new THREE.Vector3(0, height * 0.55, 0), end], material)
    box(group, [height * 0.04, height * 0.025, height * 0.035], [end.x, end.y, 0], material)
  }
  addPath(group, [new THREE.Vector3(-radius * 0.72, 0, 0), new THREE.Vector3(0, height * 0.55, 0), new THREE.Vector3(radius * 0.72, 0, 0)], material)
  return group
}

function palmIsland(material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const group = new THREE.Group()
  addPath(group, [new THREE.Vector3(0, 0.12, -9), new THREE.Vector3(0, 0.12, 3)], material)
  const fronds = 12
  for (let index = 0; index < fronds; index += 1) {
    const angle = THREE.MathUtils.lerp(-Math.PI * 0.82, Math.PI * 0.82, index / (fronds - 1))
    const length = 7.5 + Math.cos(angle) * 3
    const start = new THREE.Vector3(0, 0.12, 2.5)
    const end = new THREE.Vector3(Math.sin(angle) * length, 0.12, 3 + Math.cos(angle) * length)
    const control = start.clone().lerp(end, 0.52).add(new THREE.Vector3(Math.sin(angle) * 1.6, 0, 0))
    addPath(group, new THREE.QuadraticBezierCurve3(start, control, end).getPoints(24), material)
  }
  const crescent = new THREE.EllipseCurve(0, 3, 15, 12, Math.PI * 0.08, Math.PI * 0.92, false, 0)
  addPath(group, crescent.getPoints(64).map((point) => new THREE.Vector3(point.x, 0.12, point.y)), material)
  return group
}

function atlantis(height: number, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const group = new THREE.Group()
  box(group, [height * 0.75, height * 0.35, height * 0.25], [0, height * 0.18, 0], material)
  box(group, [height * 0.18, height * 0.78, height * 0.22], [-height * 0.26, height * 0.39, 0], material)
  box(group, [height * 0.18, height * 0.78, height * 0.22], [height * 0.26, height * 0.39, 0], material)
  box(group, [height * 0.38, height * 0.13, height * 0.22], [0, height * 0.72, 0], material)
  cylinder(group, 0, height * 0.13, height * 0.18, [-height * 0.26, height * 0.87, 0], material, 4)
  cylinder(group, 0, height * 0.13, height * 0.18, [height * 0.26, height * 0.87, 0], material, 4)
  return group
}

function mosque(height: number, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const group = new THREE.Group()
  box(group, [height * 0.95, height * 0.18, height * 0.65], [0, height * 0.09, 0], material)
  addGeometry(group, new THREE.SphereGeometry(height * 0.24, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.5), material, [0, height * 0.18, 0], [1, 1.25, 1], [0, 0, 0], true)
  const minarets = [[-0.55, -0.4], [0.55, -0.4], [-0.55, 0.4], [0.55, 0.4]] as const
  minarets.forEach(([x, z]) => {
    cylinder(group, height * 0.035, height * 0.045, height * 0.78, [x * height, height * 0.39, z * height], material, 8)
    cylinder(group, 0, height * 0.055, height * 0.18, [x * height, height * 0.86, z * height], material, 8)
  })
  return group
}

function louvre(height: number, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const group = new THREE.Group()
  box(group, [height * 1.3, height * 0.22, height * 0.9], [0, height * 0.11, 0], material)
  addGeometry(group, new THREE.SphereGeometry(height * 0.68, 28, 10, 0, Math.PI * 2, 0, Math.PI * 0.5), material, [0, height * 0.2, 0], [1, 0.36, 1], [0, 0, 0], true)
  for (let index = 0; index < 8; index += 1) {
    const angle = (index / 8) * Math.PI * 2
    addPath(group, [new THREE.Vector3(0, height * 0.44, 0), new THREE.Vector3(Math.cos(angle) * height * 0.67, height * 0.2, Math.sin(angle) * height * 0.67)], material)
  }
  return group
}

function etihad(height: number, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const group = new THREE.Group()
  const count = 5
  for (let index = 0; index < count; index += 1) {
    const angle = (index / count) * Math.PI * 2
    const towerHeight = height * (0.68 + index * 0.08)
    const radius = height * 0.2
    cylinder(group, height * 0.04, height * 0.075, towerHeight, [Math.cos(angle) * radius, towerHeight * 0.5, Math.sin(angle) * radius], material, 7)
  }
  return group
}

function palace(height: number, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const group = new THREE.Group()
  box(group, [height * 1.5, height * 0.25, height * 0.45], [0, height * 0.125, 0], material)
  box(group, [height * 0.5, height * 0.38, height * 0.5], [0, height * 0.19, 0], material)
  addGeometry(group, new THREE.SphereGeometry(height * 0.27, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.5), material, [0, height * 0.38, 0], [1, 1.1, 1], [0, 0, 0], true)
  for (const side of [-1, 1]) {
    for (let index = 0; index < 5; index += 1) {
      cylinder(group, height * 0.018, height * 0.018, height * 0.3, [side * height * (0.38 + index * 0.1), height * 0.15, height * 0.25], material, 6)
    }
  }
  return group
}

function marjanIsland(material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const group = new THREE.Group()
  for (let lobe = 0; lobe < 4; lobe += 1) {
    const points: THREE.Vector3[] = []
    const centerX = (lobe - 1.5) * 5.5
    const centerZ = Math.sin(lobe * 1.4) * 3
    for (let index = 0; index < 64; index += 1) {
      const angle = (index / 64) * Math.PI * 2
      const radius = 3.8 + Math.sin(angle * 3 + lobe) * 0.7
      points.push(new THREE.Vector3(centerX + Math.cos(angle) * radius, 0.12, centerZ + Math.sin(angle) * radius * 0.72))
    }
    addPath(group, points, material, true)
  }
  addPath(group, [new THREE.Vector3(-14, 0.12, 0), new THREE.Vector3(14, 0.12, 0)], material)
  return group
}

function resort(height: number, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const group = new THREE.Group()
  cylinder(group, height * 0.09, height * 0.18, height, [0, height * 0.5, 0], material, 10)
  box(group, [height * 0.8, height * 0.13, height * 0.45], [0, height * 0.065, 0], material)
  addPath(group, [new THREE.Vector3(height * 0.35, 0, 0), new THREE.Vector3(height * 0.35, height * 1.08, 0), new THREE.Vector3(-height * 0.25, height * 1.08, 0)], material)
  addPath(group, [new THREE.Vector3(height * 0.35, height * 0.88, 0), new THREE.Vector3(-height * 0.12, height * 1.08, 0)], material)
  return group
}

function compactArchitecturalLines(group: THREE.Group, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const positions: number[] = []
  const append = (line: THREE.Line | THREE.LineSegments, start: number, end: number) => {
    const attribute = line.geometry.attributes.position
    const a = new THREE.Vector3().fromBufferAttribute(attribute, start).applyMatrix4(line.matrix)
    const b = new THREE.Vector3().fromBufferAttribute(attribute, end).applyMatrix4(line.matrix)
    positions.push(a.x, a.y, a.z, b.x, b.y, b.z)
  }
  group.children.forEach((child) => {
    if (!(child instanceof THREE.Line || child instanceof THREE.LineSegments)) return
    child.updateMatrix()
    const count = child.geometry.attributes.position.count
    if (child instanceof THREE.LineSegments) {
      for (let index = 0; index < count; index += 2) append(child, index, index + 1)
    } else {
      for (let index = 0; index < count - 1; index += 1) append(child, index, index + 1)
    }
    child.geometry.dispose()
  })
  group.clear()
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  const line = new THREE.LineSegments(geometry, material)
  if (material instanceof THREE.LineDashedMaterial) line.computeLineDistances()
  line.userData.fullVertexCount = positions.length / 3
  group.add(line)
}

export function createLandmarkGeometry(landmark: Landmark, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial) {
  const { kind, height } = landmark
  const builders: Record<string, () => THREE.Group> = {
    'burj-khalifa': () => burjKhalifa(height, material),
    sail: () => sailTower(height, material),
    museum: () => museum(height, material),
    frame: () => dubaiFrame(height, material),
    emirates: () => emiratesTowers(height, material),
    marina: () => marinaCluster(height, material, landmark.id.length * 31),
    wheel: () => observationWheel(height, material),
    palm: () => palmIsland(material),
    atlantis: () => atlantis(height, material),
    mosque: () => mosque(height, material),
    louvre: () => louvre(height, material),
    etihad: () => etihad(height, material),
    palace: () => palace(height, material),
    island: () => marjanIsland(material),
    resort: () => resort(height, material),
  }
  const group = builders[kind]()
  compactArchitecturalLines(group, material)
  group.position.set(...landmark.position)
  group.userData.landmarkId = landmark.id
  return group
}

export function createContextBuildings(seed: number, count: number, material: THREE.LineBasicMaterial | THREE.LineDashedMaterial, far = false) {
  const group = new THREE.Group()
  const random = seededRandom(seed)
  for (let index = 0; index < count; index += 1) {
    const angle = random() * Math.PI * 2
    const distance = far ? 58 + random() * 55 : 20 + random() * 32
    const width = far ? 2.5 + random() * 4 : 1.2 + random() * 2.8
    const height = far ? 3 + random() * 10 : 2.5 + random() * 12
    const x = Math.cos(angle) * distance
    const z = Math.sin(angle) * distance
    box(group, [width, height, width * (0.6 + random() * 0.6)], [x, height * 0.5 - 0.1, z], material)
  }
  compactArchitecturalLines(group, material)
  return group
}

export function createGround() {
  const group = new THREE.Group()
  const grid = new THREE.GridHelper(360, 120, PALETTE.forest, PALETTE.forest)
  const materials = Array.isArray(grid.material) ? grid.material : [grid.material]
  materials.forEach((material) => {
    material.transparent = true
    material.opacity = 0.16
    material.depthWrite = false
  })
  grid.position.y = -0.12
  group.add(grid)

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(600, 600),
    new THREE.MeshBasicMaterial({ color: PALETTE.background, transparent: true, opacity: 0.94 }),
  )
  plane.rotation.x = -Math.PI * 0.5
  plane.position.y = -0.2
  group.add(plane)
  return group
}

export function hitSizeFor(landmark: Landmark): [number, number, number] {
  const h = Math.max(landmark.height, 3)
  switch (landmark.kind) {
    case 'palm': return [32, 3, 30]
    case 'island': return [34, 3, 20]
    case 'marina': return [h * 0.65, h, h * 0.65]
    case 'mosque': return [h * 1.4, h, h * 1.1]
    case 'louvre': return [h * 1.5, h, h * 1.2]
    case 'palace': return [h * 1.7, h, h * 0.8]
    case 'etihad': return [h * 0.7, h, h * 0.7]
    case 'atlantis': return [h, h, h * 0.5]
    case 'resort': return [h * 0.9, h * 1.1, h * 0.6]
    case 'burj-khalifa': return [h * 0.32, h * 1.05, h * 0.32]
    default: return [h * 0.75, h * 1.1, h * 0.5]
  }
}
