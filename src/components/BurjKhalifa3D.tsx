import { useRef, useEffect } from 'react'

/**
 * CSS-Only Burj Khalifa Silhouette
 * Accurate stepped profile with Y-plan base, full height visibility
 */
export default function BurjKhalifa3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = () => {
      rotationRef.current += 0.3
      if (containerRef.current) {
        containerRef.current.style.transform = `perspective(600px) rotateX(-8deg) rotateY(${rotationRef.current}deg)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // 29 tiers — real Burj Khalifa proportions (width %, height px)
  const tiers = [
    { w: 42, h: 8 }, { w: 40, h: 7 }, { w: 38, h: 7 }, { w: 36, h: 7 },
    { w: 34, h: 7 }, { w: 32, h: 7 }, { w: 30, h: 7 }, { w: 28, h: 7 },
    { w: 26, h: 6 }, { w: 24, h: 6 }, { w: 22, h: 6 }, { w: 20, h: 6 },
    { w: 18, h: 6 }, { w: 16, h: 6 }, { w: 14, h: 6 }, { w: 12, h: 6 },
    { w: 11, h: 6 }, { w: 10, h: 6 }, { w: 9, h: 6 }, { w: 8, h: 6 },
    { w: 7, h: 5 }, { w: 6, h: 5 }, { w: 5, h: 5 }, { w: 4, h: 5 },
    { w: 3.5, h: 5 }, { w: 3, h: 5 }, { w: 2.5, h: 5 }, { w: 2, h: 5 },
    { w: 1, h: 30 }, // Spire
  ]

  const totalHeight = tiers.reduce((s, t) => s + t.h, 0)

  return (
    <div
      style={{
        width: '100%',
        height: 400,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'relative',
        paddingBottom: 20,
      }}
    >
      {/* Reflection */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 20,
          background: 'radial-gradient(ellipse, rgba(201, 168, 124, 0.08), transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* 3D Container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: totalHeight,
          transform: 'perspective(600px) rotateX(-8deg) rotateY(0deg)',
        }}
      >
        {/* Back faces (dimmer, creates depth) */}
        {tiers.map((tier, i) => (
          <div
            key={`back-${i}`}
            style={{
              width: `${tier.w * 0.8}%`,
              height: tier.h,
              background: i === tiers.length - 1
                ? 'linear-gradient(180deg, rgba(212, 241, 244, 0.3), rgba(212, 241, 244, 0.6))'
                : `linear-gradient(180deg, rgba(201, 168, 124, ${0.06 + i * 0.008}), rgba(201, 168, 124, ${0.1 + i * 0.01}))`,
              transform: 'translateZ(-10px)',
              borderLeft: i === tiers.length - 1
                ? '1px solid rgba(212, 241, 244, 0.2)'
                : '1px solid rgba(201, 168, 124, 0.08)',
              borderRight: i === tiers.length - 1
                ? '1px solid rgba(212, 241, 244, 0.2)'
                : '1px solid rgba(201, 168, 124, 0.08)',
            }}
          />
        ))}

        {/* Front faces (brighter) */}
        {tiers.map((tier, i) => (
          <div
            key={`front-${i}`}
            style={{
              position: 'absolute',
              bottom: tiers.slice(0, i).reduce((s, t) => s + t.h, 0),
              width: `${tier.w}%`,
              height: tier.h,
              background: i === tiers.length - 1
                ? 'linear-gradient(180deg, rgba(212, 241, 244, 0.15), rgba(212, 241, 244, 0.5))'
                : `linear-gradient(180deg, rgba(201, 168, 124, ${0.08 + i * 0.012}), rgba(201, 168, 124, ${0.15 + i * 0.015}))`,
              borderLeft: `1px solid ${i === tiers.length - 1 ? 'rgba(212, 241, 244, 0.25)' : 'rgba(201, 168, 124, 0.15)'}`,
              borderRight: `1px solid ${i === tiers.length - 1 ? 'rgba(212, 241, 244, 0.25)' : 'rgba(201, 168, 124, 0.15)'}`,
              borderBottom: i > 0 ? `1px solid rgba(201, 168, 124, 0.06)` : 'none',
              boxShadow: i === tiers.length - 1 ? '0 0 15px 2px rgba(212, 241, 244, 0.2)' : 'none',
            }}
          />
        ))}

        {/* Spire glow tip */}
        <div
          style={{
            position: 'absolute',
            top: -4,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: '#D4F1F4',
            boxShadow: '0 0 12px 4px rgba(212, 241, 244, 0.5)',
            transform: 'translateZ(2px)',
          }}
        />

        {/* Side faces (left and right for 3D depth) */}
        {tiers.slice(0, -1).map((tier, i) => {
          const bottom = tiers.slice(0, i).reduce((s, t) => s + t.h, 0)
          return (
            <div key={`left-${i}`}>
              <div
                style={{
                  position: 'absolute',
                  bottom,
                  left: `50%`,
                  width: 8,
                  height: tier.h,
                  background: `linear-gradient(90deg, rgba(201, 168, 124, ${0.05 + i * 0.005}), transparent)`,
                  transform: `translateX(-50%) translateX(-${tier.w / 2}%) rotateY(-90deg)`,
                  transformOrigin: 'left center',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom,
                  left: `50%`,
                  width: 8,
                  height: tier.h,
                  background: `linear-gradient(-90deg, rgba(201, 168, 124, ${0.05 + i * 0.005}), transparent)`,
                  transform: `translateX(-50%) translateX(${tier.w / 2}%) rotateY(90deg)`,
                  transformOrigin: 'right center',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          bottom: 4,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <span className="font-caption" style={{ color: '#5A7A72', fontSize: 9 }}>
          BURJ KHALIFA · 828M · 163 FLOORS
        </span>
      </div>
    </div>
  )
}