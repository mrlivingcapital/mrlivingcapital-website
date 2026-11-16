import type * as THREE from 'three'

export declare function buildMansionModel({ loadCar }: {
  loadCar: (url: string) => Promise<{ object: THREE.Object3D }>
}): Promise<{
  scene: THREE.Scene
  camera: THREE.OrthographicCamera
  parts: Array<{
    label: string
    object: THREE.Object3D
    home: THREE.Vector3
    direction: THREE.Vector3
    level: number
    order: number
  }>
  dispose: () => void
}>
