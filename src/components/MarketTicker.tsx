import { useEffect, useRef } from 'react'

const tickerItems = [
  { label: 'AED/USD', value: '3.67', change: '0.00%' },
  { label: 'DLD H1 2026', value: 'AED 419.9B', change: 'Second-best ever' },
  { label: 'Ready Sales Flip', value: 'AED 146.7B', change: 'H1 largest share' },
  { label: 'Transactions H1', value: '112,850', change: 'DLD 2026' },
  { label: 'Total Investors', value: '48,448', change: '+8% YoY' },
  { label: 'Avg Price/Sqft', value: 'AED 1,841', change: '+8.5% YoY' },
  { label: 'Mortgage Rates', value: '4–6%', change: '2026 range' },
  { label: 'Gold Line', value: '18 Stations', change: '2032 Target' },
  { label: 'Etihad Rail', value: '2026', change: 'Passenger launch' },
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
          <span className="ticker-label" style={{ color: '#7D8A86', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>{item.label}</span>
          <span className="ticker-value" style={{ color: '#5A6662', fontSize: 12, fontWeight: 500, fontFamily: 'Space Grotesk, sans-serif' }}>{item.value}</span>
          <span
            className="ticker-change"
            style={{
              color: item.change.includes('+') || item.change.includes('High') || item.change.includes('Launch') ? '#0F6B62' : 'rgba(125, 138, 134, 0.6)',
              fontSize: 10,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {item.change}
          </span>
          <span style={{ color: 'rgba(125, 138, 134, 0.15)', marginLeft: 8 }}>|</span>
        </span>
      ))}
    </>
  )

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        background: 'rgba(246, 241, 231, 0.95)',
        borderTop: '1px solid rgba(125, 138, 134, 0.1)',
        borderBottom: '1px solid rgba(125, 138, 134, 0.1)',
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
