export type ZoneId = 'dubai' | 'abu-dhabi' | 'ras-al-khaimah'

export type LandmarkKind =
  | 'burj-khalifa'
  | 'sail'
  | 'museum'
  | 'frame'
  | 'emirates'
  | 'marina'
  | 'wheel'
  | 'palm'
  | 'atlantis'
  | 'mosque'
  | 'louvre'
  | 'etihad'
  | 'palace'
  | 'island'
  | 'resort'

export type DevelopmentStatus = 'existing' | 'under-construction' | 'conceptual'

export interface Landmark {
  id: string
  name: string
  zone: ZoneId
  location: string
  category: string
  kind: LandmarkKind
  status: DevelopmentStatus
  position: [number, number, number]
  height: number
  summary: string
  topics: string[]
  research: string
}

export type DataLayerId =
  | 'property'
  | 'transactions'
  | 'infrastructure'
  | 'comparables'
  | 'risk'
  | 'capital'

export type DrawerId =
  | 'investor'
  | 'intelligence'
  | 'founder'
  | 'notes'
  | 'next'
  | 'index'
  | 'decision-lab'
  | null

export interface HoverState {
  landmark: Landmark
  x: number
  y: number
}

export interface SceneMetrics {
  fps: number
  drawCalls: number
  triangles: number
  landmarks: number
  quality: string
}
