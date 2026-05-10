import { useState, useEffect, useCallback } from 'react'
import ScrollReveal from '../components/ScrollReveal'

const landmarks = [
  { name: 'Burj Khalifa', location: 'Downtown Dubai', image: '/images/dubai-skyline.jpg' },
  { name: 'Dubai Marina', location: 'Dubai Marina', image: '/images/dubai-marina.jpg' },
  { name: 'Sheikh Zayed Mosque', location: 'Abu Dhabi', image: '/images/landmark-mosque.jpg' },
  { name: 'Dubai Frame', location: 'Zabeel Park', image: '/images/landmark-frame.jpg' },
  { name: 'Palm Jumeirah', location: 'Palm Jumeirah', image: '/images/landmark-palm.jpg' },
  { name: 'Business Bay', location: 'Business Bay', image: '/images/landmark-business-bay.jpg' },
  { name: 'Dubai Creek Harbour', location: 'Dubai Creek', image: '/images/landmark-creek.jpg' },
  { name: 'Louvre Abu Dhabi', location: 'Saadiyat Island', image: '/images/landmark-louvre.jpg' },
  { name: 'Expo City Dubai', location: 'Expo City Dubai', image: '/images/landmark-expo.jpg' },
  { name: 'Museum of the Future', location: 'Sheikh Zayed Road', image: '/images/landmark-museum-future.jpg' },
]

export default function LandmarksSection() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % landmarks.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(next, 2000)
    return () => clearInterval(interval)
  }, [isPaused, next])

  const currentLm = landmarks[current]

  return (
    <section
      id="landmarks"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#0A1F1A',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="font-caption" style={{ color: '#C9A87C', display: 'block', marginBottom: 16, fontSize: 12 }}>
              DUBAI LANDMARKS
            </span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#E8DDD0', marginBottom: 12 }}>
              THE <span style={{ color: '#C9A87C' }}>CITY</span> WE KNOW
            </h2>
            <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.6)', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
              Iconic destinations across Dubai and the UAE — the landscape we navigate for our investors.
            </p>
          </div>
        </ScrollReveal>

        {/* Main Slider */}
        <ScrollReveal delay={0.2}>
          <div
            style={{
              position: 'relative',
              borderRadius: 8,
              overflow: 'hidden',
              border: '1px solid rgba(90, 122, 114, 0.15)',
              aspectRatio: '16/9',
              maxHeight: 480,
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Image */}
            <img
              src={currentLm.image}
              alt={`${currentLm.name} — ${currentLm.location}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'opacity 0.5s ease',
              }}
            />

            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '80px 32px 32px',
                background: 'linear-gradient(transparent, rgba(10, 31, 26, 0.95))',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <div>
                <div style={{ color: '#E8DDD0', fontSize: 28, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 4 }}>
                  {currentLm.name}
                </div>
                <div className="font-caption" style={{ color: '#C9A87C', fontSize: 11 }}>
                  {currentLm.location}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="font-caption" style={{ color: '#5A7A72', fontSize: 10 }}>
                  {String(current + 1).padStart(2, '0')} / {String(landmarks.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + landmarks.length) % landmarks.length)}
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(10, 31, 26, 0.6)',
                border: '1px solid rgba(90, 122, 114, 0.2)',
                color: '#E8DDD0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                backdropFilter: 'blur(4px)',
                transition: 'all 0.3s ease',
                zIndex: 5,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201, 168, 124, 0.4)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(90, 122, 114, 0.2)' }}
            >
              ‹
            </button>
            <button
              onClick={next}
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(10, 31, 26, 0.6)',
                border: '1px solid rgba(90, 122, 114, 0.2)',
                color: '#E8DDD0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                backdropFilter: 'blur(4px)',
                transition: 'all 0.3s ease',
                zIndex: 5,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201, 168, 124, 0.4)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(90, 122, 114, 0.2)' }}
            >
              ›
            </button>

            {/* Progress bar */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'rgba(90, 122, 114, 0.15)',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${((current + 1) / landmarks.length) * 100}%`,
                  background: '#C9A87C',
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Thumbnail strip */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginTop: 16,
            overflowX: 'auto',
            padding: '4px 0',
            scrollbarWidth: 'none',
          }}
        >
          {landmarks.map((lm, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                flexShrink: 0,
                width: 72,
                height: 48,
                borderRadius: 4,
                overflow: 'hidden',
                border: current === i ? '2px solid #C9A87C' : '2px solid transparent',
                opacity: current === i ? 1 : 0.5,
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
            >
              <img
                src={lm.image}
                alt={lm.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}