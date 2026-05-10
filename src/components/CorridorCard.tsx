import { useRef, useState } from 'react'
import ScrollReveal from './ScrollReveal'

interface CorridorCardProps {
  tag: string
  name: string
  price: string
  growth: string
  yield: string
  description: string
  bullets: string[]
  accentColor: string
  delay?: number
}

export default function CorridorCard({
  tag,
  name,
  price,
  growth,
  yield: yieldVal,
  description,
  bullets,
  accentColor,
  delay = 0,
}: CorridorCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTransform(`perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.01, 1.01, 1.01)`)
  }

  const handleMouseLeave = () => {
    setTransform('perspective(800px) rotateY(0) rotateX(0) scale3d(1, 1, 1)')
  }

  return (
    <ScrollReveal delay={delay} direction="right" distance={60}>
      <div
        ref={cardRef}
        className="glass-card"
        style={{
          padding: '32px',
          transform: transform || 'perspective(800px)',
          transition: 'transform 0.15s ease-out, border-color 0.3s ease',
          transformStyle: 'preserve-3d',
          cursor: 'default',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          style={{
            width: 3,
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            background: accentColor,
            borderRadius: '3px 0 0 3px',
          }}
        />

        <div className="font-caption" style={{ color: '#C9A87C', marginBottom: 8, fontSize: 12 }}>
          {tag}
        </div>

        <h3
          className="font-heading"
          style={{
            fontSize: 24,
            color: '#E8DDD0',
            marginBottom: 16,
            textTransform: 'uppercase',
          }}
        >
          {name}
        </h3>

        <div className="flex flex-wrap" style={{ gap: 16, marginBottom: 20 }}>
          {[
            { label: 'ENTRY PRICE', value: price },
            { label: 'GROWTH', value: growth },
            { label: 'INCOME', value: yieldVal },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-caption" style={{ color: '#5A7A72', fontSize: 11, marginBottom: 2 }}>
                {stat.label}
              </div>
              <div style={{ color: '#C9A87C', fontSize: 14, fontWeight: 500 }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.6)', fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
          {description}
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {bullets.map((b, i) => (
            <li
              key={i}
              style={{
                color: 'rgba(232, 221, 208, 0.6)',
                fontSize: 14,
                marginBottom: 6,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
              }}
            >
              <span style={{ color: '#C9A87C', fontSize: 12, marginTop: 2 }}>✦</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  )
}