import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// Reduced grid for smaller, more subtle particles
const GRID_SIZE = 140
const INSTANCE_COUNT = GRID_SIZE * GRID_SIZE

interface GridCell {
  x: number
  y: number
  z: number
  speed: number
}

function ParticleField() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const { grid, dummy } = useMemo(() => {
    const grid: GridCell[] = []
    for (let i = 0; i < INSTANCE_COUNT; i++) {
      const col = i % GRID_SIZE
      const row = Math.floor(i / GRID_SIZE)
      grid.push({
        x: col - GRID_SIZE / 2,
        y: row - GRID_SIZE / 2,
        z: 0,
        speed: 0,
      })
    }
    return { grid, dummy: new THREE.Object3D() }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return

    const time = state.clock.getElapsedTime()

    // Slower, subtler camera sway
    groupRef.current.rotation.x += (mouseRef.current.y * 0.03 - groupRef.current.rotation.x) * 0.03
    groupRef.current.rotation.y += (mouseRef.current.x * 0.03 * -1 - groupRef.current.rotation.y) * 0.03

    const mx = mouseRef.current.x * 60
    const my = mouseRef.current.y * 60

    const colorArray = (meshRef.current.geometry.getAttribute('color') as THREE.InstancedBufferAttribute)?.array as Float32Array

    for (let i = 0; i < INSTANCE_COUNT; i++) {
      const cell = grid[i]

      // Gentler sine wave
      const currentWave = Math.sin(cell.x / 2 - time * 0.8) * 4
      cell.z += (currentWave - cell.z) * 0.2

      // Smaller mouse influence radius
      const dx = cell.x - mx
      const dy = cell.y - my
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 10) {
        const force = (10 - dist) / 10
        cell.z -= force * 3 * 0.2
        cell.speed += force * 3 * 0.2
      }

      cell.speed *= 0.92

      // Subtler brightness
      const brightness = Math.max(0.25, 1 - Math.abs(cell.z) / 8)

      const ci = i * 3
      if (cell.speed > 0.01 && colorArray) {
        colorArray[ci] = 0.8 + cell.speed * 0.1
        colorArray[ci + 1] = 0.68 + cell.speed * 0.08
        colorArray[ci + 2] = 0.5 + cell.speed * 0.08
      } else if (colorArray) {
        colorArray[ci] = 0.6 * brightness
        colorArray[ci + 1] = 0.48 * brightness
        colorArray[ci + 2] = 0.32 * brightness
      }

      dummy.position.set(cell.x, cell.y, cell.z)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
    if (colorArray) {
      (meshRef.current.geometry.getAttribute('color') as THREE.InstancedBufferAttribute).needsUpdate = true
    }
  })

  const colors = useMemo(() => {
    const c = new Float32Array(INSTANCE_COUNT * 3)
    for (let i = 0; i < INSTANCE_COUNT; i++) {
      c[i * 3] = 0.6
      c[i * 3 + 1] = 0.48
      c[i * 3 + 2] = 0.32
    }
    return c
  }, [])

  return (
    <group ref={groupRef}>
      <fog attach="fog" args={['#0A1F1A', 50, 140]} />
      <instancedMesh ref={meshRef} args={[undefined, undefined, INSTANCE_COUNT]}>
        <planeGeometry args={[0.2, 0.2]}>
          <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
        </planeGeometry>
        <meshBasicMaterial vertexColors toneMapped={false} />
      </instancedMesh>
    </group>
  )
}

export default function ParticleGrid() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: 'radial-gradient(ellipse at center, #0F2A23 0%, #0A1F1A 70%)',
      }}
    >
      <Canvas
        camera={{ position: [0, -15, 60], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
      >
        <ParticleField />
        <EffectComposer>
          <Bloom intensity={0.8} luminanceThreshold={0.5} luminanceSmoothing={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}