import { useRef, useEffect } from 'react'

/**
 * Revolving 3D Globe with Static "MR LIVING CAPITAL" Horizontal Center Text
 */
export default function Globe3D() {
  const globeRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let rotation = 0
    const animate = () => {
      rotation += 0.4
      if (globeRef.current) {
        globeRef.current.style.transform = `perspective(800px) rotateX(-8deg) rotateY(${rotation}deg)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Generate latitude and longitude lines
  const latLines = Array.from({ length: 7 }, (_, i) => i)
  const lngLines = Array.from({ length: 12 }, (_, i) => i)

  return (
    <div
      style={{
        width: '100%',
        height: 'clamp(350px, 50vh, 480px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ground reflection */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 180,
          height: 25,
          background: 'radial-gradient(ellipse, rgba(201, 168, 124, 0.08), transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Globe container */}
      <div
        style={{
          position: 'relative',
          width: 240,
          height: 240,
        }}
      >
        {/* Globe */}
        <div
          ref={globeRef}
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            transform: 'perspective(800px) rotateX(-8deg) rotateY(0deg)',
          }}
        >
          {/* Outer sphere */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1.5px solid rgba(201, 168, 124, 0.2)',
              background: 'radial-gradient(circle at 35% 35%, rgba(201, 168, 124, 0.06), transparent 65%)',
              boxShadow: `
                inset -20px -20px 40px rgba(10, 31, 26, 0.8),
                inset 10px 10px 30px rgba(201, 168, 124, 0.05),
                0 0 60px rgba(201, 168, 124, 0.06)
              `,
            }}
          />

          {/* Latitude lines */}
          {latLines.map((i) => {
            const y = 50 - Math.cos(((i + 1) * Math.PI) / 8) * 50
            const scale = Math.sin(((i + 1) * Math.PI) / 8)
            return (
              <div
                key={`lat-${i}`}
                style={{
                  position: 'absolute',
                  left: `${50 - 50 * scale}%`,
                  top: `${y}%`,
                  width: `${100 * scale}%`,
                  height: 1,
                  borderRadius: '50%',
                  border: '1px solid rgba(201, 168, 124, 0.08)',
                  transform: 'translateY(-50%)',
                }}
              />
            )
          })}

          {/* Longitude lines */}
          {lngLines.map((i) => {
            const rot = (i / 12) * 180
            return (
              <div
                key={`lng-${i}`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '1px solid rgba(201, 168, 124, 0.06)',
                  transform: `rotateY(${rot}deg)`,
                }}
              />
            )
          })}


        </div>

        {/* Static center text — single horizontal line */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              color: '#C9A87C',
              fontSize: 12,
              letterSpacing: '0.25em',
              fontWeight: 600,
              fontFamily: 'Space Grotesk, sans-serif',
              textShadow: '0 0 15px rgba(201, 168, 124, 0.5), 0 2px 10px rgba(10, 31, 26, 0.9)',
              whiteSpace: 'nowrap',
            }}
          >
            MR LIVING CAPITAL
          </span>
        </div>
      </div>
    </div>
  )
}