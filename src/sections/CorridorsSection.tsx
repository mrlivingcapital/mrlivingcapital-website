import { useEffect, useRef } from 'react'
import CorridorCard from '../components/CorridorCard'

const corridors = [
  {
    tag: 'THE AIRPORT CITY',
    name: 'DUBAI SOUTH',
    price: '~AED 800/sqft',
    growth: '+25% YoY',
    yield: '5-8%',
    description: 'Al Maktoum Airport — future world\'s largest. 750,000+ jobs. Expo City legacy hosts global exhibitions year-round. Emaar South, MAG 5, The Pulse. Entry-level villas from AED 1.5M.',
    bullets: ['Al Maktoum Airport expansion', 'Expo City — permanent global exhibition zone', 'Etihad Rail Dubai Central station', 'Emaar South from AED 1.5M'],
    accentColor: '#C9A87C',
  },
  {
    tag: 'THE GOLD LINE CORRIDOR',
    name: 'JVC',
    price: '~AED 1,000-1,284/sqft',
    growth: '7-10%',
    yield: '7-8%',
    description: '350+ buildings, 870 hectares, 50+ nationalities. Gold Line station confirmed. Population growing 25K to 300K. Family-friendly master community. 25% below market average.',
    bullets: ['Gold Line station confirmed', '15-25% pre-metro appreciation', '7-8% gross rental yield', '50+ nationalities, deep tenant pool'],
    accentColor: '#5A7A72',
  },
  {
    tag: 'THE FOREST SANCTUARY',
    name: 'MBRC / SOBHA HARTLAND 2',
    price: '~AED 2,000-2,520/sqft',
    growth: 'AED 6.1B sales',
    yield: '6-7.4%',
    description: '8 million sq ft, 35% green space, 2 crystal lagoons. 2,321 off-plan sales worth AED 6.112B in 2025. 15 min from Downtown. Blue Line +15-25% boost. DLD-verified data.',
    bullets: ['AED 6.1B in 2025 sales alone', '35% green space = 2.8M sq ft forest', '6-7.4% DLD-verified rental ROI', 'Blue Line extension coming'],
    accentColor: '#5A7A72',
  },
  {
    tag: 'THE RACING HEART',
    name: 'MEYDAN',
    price: '~AED 2,800+/sqft',
    growth: 'Gold Line station',
    yield: 'Event-driven',
    description: 'Gold Line station at Meydan. Adjacent to MBRC, Dubai Hills. World Cup and global events calendar. Direct Downtown access (10 min). Premium villa and apartment developments.',
    bullets: ['Gold Line station at Meydan', 'World Cup events calendar', '10 minutes from Downtown', 'Dubai 2040 Global Economic Center'],
    accentColor: '#C9A87C',
  },
]

export default function CorridorsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrollProgress = -rect.top / (rect.height - window.innerHeight)
      const clamped = Math.max(0, Math.min(1, scrollProgress))

      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translateY(${clamped * 120}px)`
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translateY(${clamped * 72}px)`
      }
      if (layer3Ref.current) {
        layer3Ref.current.style.transform = `translateY(${clamped * 36}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="corridors"
      style={{
        position: 'relative',
        zIndex: 2,
        minHeight: '150vh',
        overflow: 'hidden',
      }}
    >
      {/* Parallax Background Layers */}
      <div
        ref={layer1Ref}
        style={{
          position: 'absolute',
          inset: '-10% 0',
          backgroundImage: 'url(/images/dubai-south-aerial.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)',
          willChange: 'transform',
        }}
      />
      <div
        ref={layer2Ref}
        style={{
          position: 'absolute',
          inset: '-10% 0',
          backgroundImage: 'url(/images/jvc-community.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.35)',
          opacity: 0.7,
          willChange: 'transform',
        }}
      />
      <div
        ref={layer3Ref}
        style={{
          position: 'absolute',
          inset: '-10% 0',
          backgroundImage: 'url(/images/mbrc-green.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)',
          opacity: 0.5,
          willChange: 'transform',
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #0A1F1A 0%, rgba(10, 31, 26, 0.85) 30%, rgba(10, 31, 26, 0.85) 70%, #0A1F1A 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '120px 24px',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="font-caption" style={{ color: '#C9A87C', display: 'block', marginBottom: 16 }}>
            CORRIDOR STRATEGY
          </span>
          <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#E8DDD0' }}>
            OUR <span style={{ color: '#C9A87C' }}>PRIORITY</span> INVESTMENT
            <br />
            CORRIDORS
          </h2>
          <p className="font-body" style={{ color: 'rgba(232, 221, 208, 0.6)', maxWidth: 600, margin: '24px auto 0', fontSize: 16 }}>
            Four corridors aligned with Dubai 2040's five urban centers, the Metro Gold Line, Etihad Rail, and the 20-minute city initiative.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 24,
          }}
        >
          {corridors.map((c, i) => (
            <CorridorCard key={i} {...c} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}