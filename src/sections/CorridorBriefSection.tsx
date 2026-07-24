import ScrollReveal from '../components/ScrollReveal'
import EmailCapture from '../components/EmailCapture'

export default function CorridorBriefSection() {
  return (
    <section
      id="corridor-brief"
      style={{ position: 'relative', zIndex: 2, background: '#123B37', padding: '72px 24px' }}
    >
      <ScrollReveal>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <p className="font-caption" style={{ color: '#57A99F', fontSize: 11, letterSpacing: '0.2em', marginBottom: 14 }}>
            THE CORRIDOR BRIEF
          </p>
          <h2 className="font-heading" style={{ color: '#F6F1E7', fontSize: 'clamp(24px, 3.4vw, 34px)', fontWeight: 600, marginBottom: 14 }}>
            Dubai's weekly numbers. Before they're headlines.
          </h2>
          <p className="font-body" style={{ color: 'rgba(246,241,231,0.7)', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
            Every Monday: DLD transactions, off-plan launches, corridor pricing and one
            commercial insight — the same data we brief clients on. No noise, no listings spam.
          </p>
          <EmailCapture source="homepage" dark />
        </div>
      </ScrollReveal>
    </section>
  )
}
