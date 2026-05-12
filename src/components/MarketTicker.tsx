import { useEffect, useRef } from 'react'

const tickerItems = [
  { label: 'AED/USD', value: '3.67', change: '0.00%' },
  { label: 'DLD Q1 2026', value: 'AED 252B', change: '+26% YoY' },
  { label: 'Off-Plan Share', value: '73%', change: 'Record High' },
  { label: 'Transactions Q1', value: '60,303', change: '+41% YoY' },
  { label: 'Total Investors', value: '48,448', change: '+35% YoY' },
  { label: 'Avg Price/Sqft', value: 'AED 1,550', change: '+15% YoY' },
  { label: 'Mortgage Rate', value: '5.25%', change: 'Stable' },
  { label: 'Gold Line', value: '18 Stations', change: '2032 Target' },
  { label: 'Etihad Rail', value: 'Q2 2026', change: 'Launch' },
  { label: 'Population 2040', value: '5.8M', change: '+45%' },
]

export default function MarketTicker() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let pos = 0
    const speed = 0.5
    let raf: number

    const animate = () => {
      pos -= speed
      const width = track.scrollWidth / 2
      if (Math.abs(pos) >= width) pos = 0
      track.style.transform = `translateX(${pos}px)`
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  const content = (
    <>
      {tickerItems.map((item, i) => (
        <span
          key={i}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 24px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          <span className="ticker-label" style={{ color: '#5A7A72', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>{item.label}</span>
          <span className="ticker-value" style={{ color: '#E8DDD0', fontSize: 12, fontWeight: 500, fontFamily: 'Space Grotesk, sans-serif' }}>{item.value}</span>
          <span
            className="ticker-change"
            style={{
              color: item.change.includes('+') || item.change.includes('High') || item.change.includes('Launch') ? '#D4F1F4' : 'rgba(90, 122, 114, 0.6)',
              fontSize: 10,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {item.change}
          </span>
          <span style={{ color: 'rgba(90, 122, 114, 0.15)', marginLeft: 8 }}>|</span>
        </span>
      ))}
    </>
  )

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        background: 'rgba(10, 31, 26, 0.95)',
        borderTop: '1px solid rgba(90, 122, 114, 0.1)',
        borderBottom: '1px solid rgba(90, 122, 114, 0.1)',
        padding: '10px 0',
        overflow: 'hidden',
      }}
      className="market-ticker"
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {content}
        {content}
      </div>
    </div>
  )
}
