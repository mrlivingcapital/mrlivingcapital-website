import * as THREE from 'three'
import { MANSION_LEVELS } from './spec.js'

const TEAL = '#57A99F'
const TEAL_DARK = '#17423F'

export async function buildMansionModel({ loadCar }) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#000000')
  const camera = new THREE.OrthographicCamera(-48, 48, 38, -38, 0.1, 500)
  camera.position.set(58, 42, 64)
  camera.zoom = 1.0
  camera.lookAt(0, 5, 0)
  scene.add(camera)

  const parts = []
  const primary = new THREE.LineBasicMaterial({ color: TEAL, transparent: true, opacity: 0.92 })
  primary.name = 'Estate · MRLC teal primary'
  const secondary = new THREE.LineBasicMaterial({ color: TEAL_DARK, transparent: true, opacity: 0.82 })
  secondary.name = 'Estate · MRLC teal secondary'
  const glassMaterial = new THREE.MeshPhysicalMaterial({ color: TEAL, transparent: true, opacity: 0.2, roughness: 0.06, metalness: 0, depthWrite: false })
  glassMaterial.name = 'Estate · Framed architectural glazing'
  const waterMaterial = new THREE.MeshBasicMaterial({ color: TEAL, transparent: true, opacity: 0.32, depthWrite: false })
  waterMaterial.name = 'Estate · Infinity pool water'
  const geometries = {
    box: new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)),
    cylinder: new THREE.EdgesGeometry(new THREE.CylinderGeometry(0.5, 0.5, 1, 10)),
    sphere: new THREE.EdgesGeometry(new THREE.SphereGeometry(0.5, 10, 6)),
  }
  const bottleMaterial = new THREE.MeshBasicMaterial({ color: TEAL, wireframe: true })
  bottleMaterial.name = 'Estate · 800 wine bottles'

  function add(label, position, scale, level = 1, kind = 'box', emphasis = false, rotation = [0, 0, 0]) {
    const object = new THREE.LineSegments(geometries[kind], emphasis ? primary : secondary)
    object.position.set(...position); object.scale.set(...scale); object.rotation.set(...rotation)
    object.name = label
    const lift = level <= 0 ? 0 : 3.5 + level * 4.8
    parts.push({ label, object, home: new THREE.Vector3(...position), direction: new THREE.Vector3(0, lift, 0), level, order: 0 })
  }
  function addSurface(label, position, scale, level, material) {
    const object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)
    object.position.set(...position); object.scale.set(...scale); object.name = label
    parts.push({ label, object, home: new THREE.Vector3(...position), direction: new THREE.Vector3(0, 3.5 + level * 4.8, 0), level, order: 0 })
  }
  function addObject(label, object, position, level = 1) {
    object.position.set(...position); object.name = label
    const lift = level <= 0 ? 0 : 3.5 + level * 4.8
    parts.push({ label, object, home: new THREE.Vector3(...position), direction: new THREE.Vector3(0, lift, 0), level, order: 0 })
  }
  function room(label, x, y, z, w, d, level) {
    add(`${label} · rear`, [x, y + 1.4, z - d / 2], [w, 2.8, 0.12], level, 'box', true)
    add(`${label} · left`, [x - w / 2, y + 1.4, z], [0.12, 2.8, d], level)
    add(`${label} · right`, [x + w / 2, y + 1.4, z], [0.12, 2.8, d], level)
  }
  function bed(label, x, y, z, level) {
    add(`${label} · bed base`, [x, y + 0.28, z], [3.1, 0.5, 4.0], level, 'box', true)
    add(`${label} · headboard`, [x, y + 1.0, z - 1.9], [3.2, 1.8, 0.18], level)
    for (const dx of [-0.75, 0.75]) add(`${label} · pillow`, [x + dx, y + 0.68, z - 1.2], [1.15, 0.22, 0.7], level)
    for (const dx of [-2.0, 2.0]) add(`${label} · nightstand`, [x + dx, y + 0.35, z - 1.2], [0.75, 0.7, 0.75], level)
    add(`${label} · wardrobe`, [x + 3.0, y + 1.25, z], [0.65, 2.5, 3.3], level)
  }
  function sofa(label, x, y, z, level) {
    add(`${label} · sofa base`, [x, y + 0.35, z], [3.3, 0.55, 1.25], level, 'box', true)
    add(`${label} · sofa back`, [x, y + 0.85, z - 0.52], [3.3, 0.8, 0.25], level)
    for (const dx of [-1.5, 1.5]) add(`${label} · sofa arm`, [x + dx, y + 0.65, z], [0.25, 0.65, 1.25], level)
    add(`${label} · table`, [x, y + 0.35, z + 2], [2.0, 0.25, 1.2], level)
  }
  function counter(label, x, y, z, w, d, level) {
    add(label, [x, y + 0.5, z], [w, 1.0, d], level, 'box', true)
  }
  function chair(label, x, y, z, level) {
    add(`${label} · seat`, [x, y + 0.45, z], [0.75, 0.16, 0.75], level)
    add(`${label} · back`, [x, y + 0.9, z - 0.3], [0.75, 0.75, 0.14], level)
  }
  function palm(label, x, z) {
    const group = new THREE.Group()
    const foliage = new THREE.MeshBasicMaterial({ color: TEAL, transparent: true, opacity: 0.86 })
    foliage.name = 'Estate · Palm fronds'
    const trunk = new THREE.LineSegments(geometries.cylinder, primary)
    trunk.scale.set(0.35, 8.5, 0.35); trunk.position.y = 4.25; group.add(trunk)
    for (let i = 0; i < 9; i++) {
      const a = i * Math.PI * 2 / 9
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 8.5, 0),
        new THREE.Vector3(Math.sin(a) * 2.1, 9.35, Math.cos(a) * 2.1),
        new THREE.Vector3(Math.sin(a) * 4.1, 7.65, Math.cos(a) * 4.1),
      )
      const frond = new THREE.Mesh(new THREE.TubeGeometry(curve, 12, 0.055, 4, false), foliage)
      group.add(frond)
    }
    addObject(label, group, [x, 0, z], 1)
  }

  // Plot outline: 48.2 × 48.2 m ≈ 25,000 sqft.
  add('25,000 sqft plot · front boundary', [0, 0, 24.1], [48.2, 0.12, 0.12], 0, 'box', true)
  add('25,000 sqft plot · rear boundary', [0, 0, -24.1], [48.2, 0.12, 0.12], 0, 'box', true)
  add('25,000 sqft plot · left boundary', [-24.1, 0, 0], [0.12, 0.12, 48.2], 0, 'box', true)
  add('25,000 sqft plot · right boundary', [24.1, 0, 0], [0.12, 0.12, 48.2], 0, 'box', true)

  // Basement, ground, first and second floors with a furnished rooftop.
  const floors = MANSION_LEVELS.filter((level) => level.id !== 'roof').map((level) => level.y)
  floors.forEach((y, i) => {
    const level = i + 1
    add(`Level ${level} · floor plate`, [0, y - 0.16, 0], [29, 0.32, 23], level, 'box', true)
    add(`Level ${level} · rear envelope`, [0, y + 1.5, -11.4], [29, 3.0, 0.22], level)
    add(`Level ${level} · left envelope`, [-14.4, y + 1.5, 0], [0.22, 3.0, 23], level)
    add(`Level ${level} · right envelope`, [14.4, y + 1.5, 0], [0.22, 3.0, 23], level)

    // Individually selectable glazing and mullions across the front and side façades.
    for (let bay = 0; bay < 7; bay++) {
      const x = -12 + bay * 4
      addSurface(`Level ${level} · front glazing ${bay + 1}`, [x, y + 1.55, 11.53], [3.55, 2.65, 0.04], level, glassMaterial)
      add(`Level ${level} · front mullion ${bay + 1}`, [x - 1.9, y + 1.55, 11.58], [0.09, 2.95, 0.12], level, 'box', true)
    }
    for (let bay = 0; bay < 5; bay++) {
      const z = -8.5 + bay * 4.2
      addSurface(`Level ${level} · side glazing ${bay + 1}`, [14.53, y + 1.55, z], [0.04, 2.65, 3.65], level, glassMaterial)
      add(`Level ${level} · side mullion ${bay + 1}`, [14.58, y + 1.55, z - 2], [0.12, 2.95, 0.09], level, 'box', true)
    }
    for (const x of [-13.6, 13.6]) for (const z of [-10.6, 10.6]) add(`Level ${level} · structural column`, [x, y + 1.5, z], [0.28, 3.0, 0.28], level, 'box', true)

    if (level >= 3) {
      add(`Level ${level} · balcony slab`, [0, y + 0.02, 12.6], [26, 0.18, 2.2], level, 'box', true)
      add(`Level ${level} · balcony handrail`, [0, y + 1.15, 13.65], [26, 0.09, 0.09], level, 'box', true)
      for (let post = -12; post <= 12; post += 3) add(`Level ${level} · balcony baluster`, [post, y + 0.6, 13.65], [0.07, 1.15, 0.07], level)
    }
  })
  add('Lift · continuous ground-to-roof shaft', [0, 3.8, -1.8], [2.3, 14.0, 2.3], 5, 'box', true)
  add('Lift · rooftop arrival', [0, 10.95, -1.8], [2.3, 0.3, 2.3], 5, 'box', true)

  // A recognizable cantilevered roof, skylights and furnished rooftop sky lounge.
  const roofY = MANSION_LEVELS.find((level) => level.id === 'roof').y
  add('Roof · cantilevered crown', [0, roofY, 0], [30.5, 0.28, 24.5], 6, 'box', true)
  add('Roof · floating upper plane', [-2.5, roofY + 0.55, -1], [24, 0.16, 19], 6, 'box', true)
  for (const x of [-7, 5]) {
    add(`Roof · skylight frame ${x}`, [x, roofY + 0.72, -2], [5.5, 0.12, 7], 6, 'box', true)
    addSurface(`Roof · skylight glazing ${x}`, [x, roofY + 0.76, -2], [5.1, 0.04, 6.6], 6, glassMaterial)
  }
  for (const x of [-11, 11]) for (const z of [-8, 8]) add('Roof · sky lounge pergola post', [x, roofY + 1.65, z], [0.18, 3.3, 0.18], 6, 'box', true)
  add('Roof · sky lounge pergola crown', [0, roofY + 3.3, 0], [23, 0.18, 17], 6, 'box', true)
  sofa('Roof · sky lounge west', -6, roofY + 0.25, 3, 6)
  sofa('Roof · sky lounge east', 6, roofY + 0.25, 3, 6)
  for (let x = -13; x <= 13; x += 2.6) add('Roof · terrace rail post', [x, roofY + 0.75, 11.6], [0.08, 1.4, 0.08], 6)
  add('Roof · terrace handrail', [0, roofY + 1.45, 11.6], [28, 0.09, 0.09], 6, 'box', true)

  // BASEMENT: eight cars in two rows of four, clear central aisle.
  for (let row = 0; row < 2; row++) for (let col = 0; col < 4; col++) {
    const x = -10.2 + col * 6.8, z = -0.5 + row * 8.5
    add(`Garage · bay ${row * 4 + col + 1}`, [x, -3.1, z], [3.2, 0.08, 5.4], 1)
  }
  const carAsset = await loadCar('/models/car.glb')
  function outlinedCar(source) {
    const group = new THREE.Group(); source.updateMatrixWorld(true)
    source.traverse((object) => {
      if (!object.isMesh) return
      const line = new THREE.LineSegments(new THREE.EdgesGeometry(object.geometry, 24), primary)
      line.applyMatrix4(object.matrixWorld); group.add(line)
    })
    return group
  }
  for (let row = 0; row < 2; row++) for (let col = 0; col < 4; col++) {
    const index = row * 4 + col + 1
    const car = outlinedCar(carAsset.object)
    car.rotation.y = Math.PI / 2
    addObject(`Car ${index} · CC0 real-scale`, car, [-10.2 + col * 6.8, -3.05, -0.5 + row * 8.5], 1)
  }

  // Wine cellar: ten rack bays × eight shelves × ten bottles = exactly 800.
  room('Wine cellar', -10.5, -3.2, -8, 6.5, 5.5, 1)
  for (let bay = 0; bay < 10; bay++) {
    const x = -13.2 + (bay % 5) * 1.35, z = bay < 5 ? -10.2 : -6.0
    for (let shelf = 0; shelf < 8; shelf++) add(`Wine rack ${bay + 1} · shelf ${shelf + 1}`, [x, -2.85 + shelf * 0.31, z], [1.1, 0.07, 0.45], 1)
  }
  const bottles = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.035, 0.035, 0.24, 6), bottleMaterial, 800)
  const dummy = new THREE.Object3D(); let bottleIndex = 0
  for (let bay = 0; bay < 10; bay++) for (let shelf = 0; shelf < 8; shelf++) for (let slot = 0; slot < 10; slot++) {
    const x = -13.65 + (bay % 5) * 1.35 + slot * 0.1, z = bay < 5 ? -10.2 : -6.0
    dummy.position.set(x, -2.67 + shelf * 0.31, z); dummy.rotation.set(Math.PI / 2, 0, 0); dummy.updateMatrix()
    bottles.setMatrixAt(bottleIndex++, dummy.matrix)
  }
  bottles.instanceMatrix.needsUpdate = true
  addObject('Wine cellar · exactly 800 bottles', bottles, [0, 0, 0], 1)

  // Cold store and gym, separated from the garage by the rear service wall.
  room('Cold store', -3.5, -3.2, -8, 5, 5.5, 1)
  for (let i = 0; i < 4; i++) add(`Cold store · shelving ${i + 1}`, [-4.8 + i * 0.85, -2.0, -9.5], [0.65, 2.2, 0.55], 1)
  add('Cold store · insulated door', [-3.5, -1.9, -5.2], [1.5, 2.5, 0.18], 1, 'box', true)
  room('Gym', 8.5, -3.2, -8, 9.5, 5.5, 1)
  for (let i = 0; i < 3; i++) {
    add(`Gym · treadmill ${i + 1} belt`, [5.2 + i * 2.4, -2.85, -8.5], [1.0, 0.25, 2.2], 1)
    add(`Gym · treadmill ${i + 1} console`, [5.2 + i * 2.4, -2.0, -9.4], [0.9, 0.7, 0.25], 1)
  }
  add('Gym · weight bench', [11.5, -2.65, -6.5], [1.0, 0.35, 2.2], 1)
  add('Gym · dumbbell rack', [11.5, -2.1, -9.5], [2.4, 1.6, 0.55], 1)
  for (let i = 0; i < 8; i++) add(`Gym · dumbbell ${i + 1}`, [10.6 + (i % 4) * 0.55, -2.55 + Math.floor(i / 4) * 0.6, -9.5], [0.35, 0.22, 0.35], 1, 'cylinder')

  // GROUND: guest suite, large master, big hall and open/closed kitchens.
  room('Ground guest room', -10, 0, 5.5, 7, 8, 2); bed('Ground guest room', -10, 0, 5.5, 2)
  room('Ground large master bedroom', -10, 0, -5.5, 7, 8, 2); bed('Ground large master bedroom', -10, 0, -5.5, 2)
  sofa('Ground big hall · lounge A', -2.8, 0, 5.5, 2); sofa('Ground big hall · lounge B', 3.5, 0, 5.5, 2)
  room('Open kitchen', 9, 0, -3.5, 8, 5.5, 2)
  counter('Open kitchen · island', 9, 0, -3.5, 4.5, 1.5, 2)
  counter('Open kitchen · rear counter', 9, 0, -5.7, 6.5, 0.8, 2)
  room('Closed kitchen', 9, 0, -8.5, 8, 4, 2)
  counter('Closed kitchen · worktop', 9, 0, -9.5, 6.5, 0.8, 2)
  add('Closed kitchen · door', [5.2, 1.25, -7], [0.15, 2.5, 1.4], 2, 'box', true)

  // Seven-metre-high entrance portal and suspended chandelier.
  add('Entrance · 7m-high portal', [0, 3.5, 11.45], [3.4, 7.0, 0.3], 2, 'box', true)
  add('Entrance · double door', [0, 1.8, 11.6], [3.0, 3.6, 0.16], 2)
  for (let ring = 0; ring < 3; ring++) add(`Entrance chandelier · ring ${ring + 1}`, [0, 4.9 - ring * 0.55, 8.4], [2.8 - ring * 0.6, 0.15, 2.8 - ring * 0.6], 2, 'cylinder', true)
  add('Entrance chandelier · suspension', [0, 5.8, 8.4], [0.12, 2.2, 0.12], 2, 'cylinder', true)
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4
    add(`Entrance chandelier · pendant ${i + 1}`, [Math.sin(a) * 1.2, 4.2, 8.4 + Math.cos(a) * 1.2], [0.18, 0.7, 0.18], 2, 'cylinder')
  }

  // FIRST FLOOR: four master bedrooms and central big hall.
  for (const [label, x, z] of [['Master 1', -9, -5.5], ['Master 2', 9, -5.5], ['Master 3', -9, 5.5], ['Master 4', 9, 5.5]]) {
    room(`First floor · ${label}`, x, 3.6, z, 7, 8, 3); bed(`First floor · ${label}`, x, 3.6, z, 3)
  }
  sofa('First floor · big hall A', -3, 3.6, 0, 3); sofa('First floor · big hall B', 3, 3.6, 0, 3)

  // SECOND FLOOR: two master bedrooms and hall.
  room('Second floor · Master 6', -7, 7.2, -3, 9, 12, 4); bed('Second floor · Master 6', -7, 7.2, -3, 4)
  room('Second floor · Master 7', 7, 7.2, -3, 9, 12, 4); bed('Second floor · Master 7', 7, 7.2, -3, 4)
  sofa('Second floor · hall', 0, 7.2, 5.5, 4)

  // ROOFTOP: private cinema, wellness spa and entertainment lounge.
  room('Rooftop · private cinema', -8, 10.8, -3, 10, 12, 5)
  add('Rooftop · cinema screen', [-8, 12.25, -8.8], [7.5, 2.2, 0.12], 5, 'box', true)
  for (let row = 0; row < 3; row++) for (let seat = 0; seat < 4; seat++) chair(`Rooftop · cinema seat ${row * 4 + seat + 1}`, -11 + seat * 2, 10.8, -5 + row * 2, 5)
  room('Rooftop · wellness spa', 8, 10.8, -3, 10, 12, 5)
  add('Rooftop · spa treatment bed', [8, 11.25, -5.5], [3.2, 0.55, 1.4], 5, 'box', true)
  add('Rooftop · spa plunge', [8, 11.15, 0], [5.2, 0.7, 4.2], 5, 'cylinder', true)
  addSurface('Rooftop · spa water', [8, 11.53, 0], [4.5, 0.04, 3.5], 5, waterMaterial)
  sofa('Rooftop · entertainment lounge', 0, 10.8, 5.5, 5)

  // FOREGROUND TERRACE: infinity pool, open jacuzzi, sunken fire lounge, separate BBQ and three shaded benches.
  add('Terrace · infinity pool basin', [0, -0.7, 17], [24, 1.4, 7], 2, 'box', true)
  addSurface('Terrace · infinity water plane', [0, 0.02, 17], [23.6, 0.05, 6.6], 2, waterMaterial)
  add('Terrace · infinity rear edge', [0, 0.1, 20.5], [24.5, 0.25, 0.25], 2, 'box', true)
  add('Terrace · open jacuzzi', [15, 0.35, 17], [5.5, 0.7, 5.5], 2, 'cylinder', true)
  add('Terrace · jacuzzi water', [15, 0.72, 17], [4.8, 0.05, 4.8], 2, 'cylinder')
  add('Fire lounge · sunken floor', [-17, -0.65, 17], [7, 0.25, 7], 2, 'box', true)
  for (const [x, z, w, d] of [[-17, 21, 7, 1], [-17, 13, 7, 1], [-20, 17, 1, 5], [-14, 17, 1, 5]]) add('Fire lounge · sunken seating', [x, -0.2, z], [w, 0.65, d], 2)
  add('Fire lounge · fireplace', [-17, -0.15, 17], [1.5, 0.65, 1.5], 2, 'cylinder', true)
  counter('BBQ · separate counter', 19, 0, 13, 4, 1.4, 2)
  add('BBQ · grill', [19, 1.1, 13], [2.2, 0.35, 1.1], 2)
  for (let i = 0; i < 3; i++) {
    const x = -7 + i * 7
    add(`Sunbath bench ${i + 1}`, [x, 0.35, 13], [2.2, 0.35, 4.2], 2, 'box', true)
    add(`Sunbath shade ${i + 1} · canopy`, [x, 3.2, 13], [3.2, 0.15, 4.8], 2)
    for (const dx of [-1.4, 1.4]) for (const dz of [-2.2, 2.2]) add(`Sunbath shade ${i + 1} · post`, [x + dx, 1.6, 13 + dz], [0.12, 3.2, 0.12], 2)
  }

  // Garden around all four sides: instanced bushes and twelve tall palms.
  const bushMaterial = new THREE.MeshBasicMaterial({ color: TEAL, transparent: true, opacity: 0.58, wireframe: false })
  bushMaterial.name = 'Estate · Perimeter bushes'
  const bushPositions = []
  for (let v = -21; v <= 21; v += 3) {
    bushPositions.push([-22, v], [22, v], [v, -22], [v, 22])
  }
  const bushes = new THREE.InstancedMesh(new THREE.SphereGeometry(0.8, 8, 5), bushMaterial, bushPositions.length)
  bushPositions.forEach(([x, z], i) => { dummy.position.set(x, 0.8, z); dummy.scale.set(1.65, 1.15, 1.35); dummy.updateMatrix(); bushes.setMatrixAt(i, dummy.matrix) })
  bushes.instanceMatrix.needsUpdate = true
  addObject('Garden · perimeter bushes', bushes, [0, 0, 0], 1)
  const palmPositions = [[-21, -21], [0, -22], [21, -21], [-22, -10], [22, -10], [-22, 2], [22, 2], [-22, 13], [22, 13], [-20, 22], [0, 22], [20, 22]]
  palmPositions.forEach(([x, z], i) => palm(`Garden · tall palm ${i + 1}`, x, z))

  const ordered = [...parts].sort((a, b) => a.home.y - b.home.y)
  ordered.forEach((part, i) => { part.order = i / Math.max(1, parts.length - 1) })
  const mansion = new THREE.Group(); mansion.name = `MansionR · ${parts.length} independent assemblies`
  for (const part of parts) mansion.add(part.object)
  scene.add(mansion)
  const grid = new THREE.GridHelper(90, 45, TEAL_DARK, '#081C1A'); grid.position.y = -3.55
  grid.material.name = 'Estate · Technical grid'; scene.add(grid)

  return {
    scene, camera, parts,
    dispose() {
      for (const g of Object.values(geometries)) g.dispose()
      primary.dispose(); secondary.dispose(); glassMaterial.dispose(); waterMaterial.dispose(); bottleMaterial.dispose(); bushMaterial.dispose(); grid.geometry.dispose(); grid.material.dispose()
    },
  }
}
