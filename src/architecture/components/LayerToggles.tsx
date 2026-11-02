import { DATA_LAYERS } from '../data/landmarks'
import type { DataLayerId } from '../types'

interface LayerTogglesProps {
  active: DataLayerId[]
  onChange: (layers: DataLayerId[]) => void
}

export function LayerToggles({ active, onChange }: LayerTogglesProps) {
  const toggle = (id: DataLayerId) => {
    onChange(active.includes(id) ? active.filter((layer) => layer !== id) : [...active, id])
  }

  return (
    <div className="layer-toggles">
      {DATA_LAYERS.map((layer) => (
        <button
          type="button"
          key={layer.id}
          className={active.includes(layer.id) ? 'active' : ''}
          onClick={() => toggle(layer.id)}
          aria-pressed={active.includes(layer.id)}
          title={layer.description}
        >
          <span className="layer-indicator" />
          {layer.label}
        </button>
      ))}
    </div>
  )
}
