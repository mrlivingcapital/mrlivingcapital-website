import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { CityScene } from '../scene/CityScene'
import type { DataLayerId, Landmark, SceneMetrics, ZoneId } from '../types'

export interface CitySceneHandle {
  selectLandmark: (id: string) => void
  switchZone: (zone: ZoneId) => void
  resetCamera: () => void
  replayIntro: () => void
  skipIntro: () => void
  setLayers: (layers: DataLayerId[]) => void
}

interface CityCanvasProps {
  zone: ZoneId
  selectedId: string | null
  activeLayers: DataLayerId[]
  onHover: (landmark: Landmark | null, x?: number, y?: number) => void
  onSelect: (landmark: Landmark) => void
  onIntroChange: (complete: boolean) => void
  onMetrics: (metrics: SceneMetrics) => void
}

export const CityCanvas = forwardRef<CitySceneHandle, CityCanvasProps>(function CityCanvas(props, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<CityScene | null>(null)
  const callbacksRef = useRef(props)
  const [error, setError] = useState(false)

  useEffect(() => {
    callbacksRef.current = props
  })

  useEffect(() => {
    if (!containerRef.current) return
    try {
      const scene = new CityScene(containerRef.current, {
        onHover: (landmark, x, y) => callbacksRef.current.onHover(landmark, x, y),
        onSelect: (landmark) => callbacksRef.current.onSelect(landmark),
        onIntroChange: (complete) => callbacksRef.current.onIntroChange(complete),
        onMetrics: (metrics) => callbacksRef.current.onMetrics(metrics),
      }, true)
      sceneRef.current = scene
      return () => {
        scene.dispose()
        sceneRef.current = null
      }
    } catch (caught) {
      console.error('The 3D experience could not be initialised.', caught)
      queueMicrotask(() => {
        setError(true)
        callbacksRef.current.onIntroChange(true)
        callbacksRef.current.onMetrics({ fps: 0, drawCalls: 0, triangles: 0, landmarks: 0, quality: 'fallback' })
      })
    }
  }, [])

  useEffect(() => {
    sceneRef.current?.switchZone(props.zone)
  }, [props.zone])

  useEffect(() => {
    if (props.selectedId) sceneRef.current?.selectLandmark(props.selectedId)
    else sceneRef.current?.resetCamera()
  }, [props.selectedId])

  useEffect(() => {
    sceneRef.current?.setLayers(props.activeLayers)
  }, [props.activeLayers])

  useImperativeHandle(ref, () => ({
    selectLandmark: (id) => sceneRef.current?.selectLandmark(id),
    switchZone: (zone) => sceneRef.current?.switchZone(zone),
    resetCamera: () => sceneRef.current?.resetCamera(),
    replayIntro: () => sceneRef.current?.replayIntro(),
    skipIntro: () => sceneRef.current?.skipIntro(),
    setLayers: (layers) => sceneRef.current?.setLayers(layers),
  }), [])

  return (
    <div className="city-stage" ref={containerRef}>
      <div className="atmospheric-glow" aria-hidden="true" />
      {error && (
        <div className="scene-fallback">
          <img src="/images/architectural-reference-wireframe.jpg" alt="Luminous architectural skyline reference" />
          <div className="fallback-message">
            <span className="technical-label">LIGHTWEIGHT EXPERIENCE</span>
            <p>Your browser could not start the live 3D model. Every location, article and tool remains available through the City Index.</p>
          </div>
        </div>
      )}
    </div>
  )
})
