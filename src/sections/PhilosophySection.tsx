import { useEffect, useRef } from 'react'
import ScrollReveal from '../components/ScrollReveal'

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const wordsContainer = wordsRef.current
    if (!section || !wordsContainer) return

    const wordEls = wordsContainer.querySelectorAll<HTMLSpanElement>('.k-word')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let currentWord = 0
          const totalWords = wordEls.length

          const animateWord = () => {
            if (currentWord >= totalWords) return
            const word = wordEls[currentWord]
            const lineEl = word.querySelector<HTMLDivElement>('.k-line')
            const textAccent = word.querySelector<HTMLSpanElement>('.k-text-accent')

            // Phase 1: Draw line across word (0.6s)
            if (lineEl) {
              lineEl.style.transition = 'width 0.6s linear'
              lineEl.style.width = '100%'
            }

            // Phase 2: Reveal accent text (0.4s, starts mid-line)
            if (textAccent) {
              setTimeout(() => {
                textAccent.style.transition = 'clip-path 0.4s linear'
                textAccent.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
              }, 300)
            }

            // Phase 3: Shrink line to right edge (0.3s)
            setTimeout(() => {
              if (lineEl) {
                lineEl.style.transition = 'left 0.3s ease-in, width 0.3s ease-in'
                lineEl.style.left = '100%'
                lineEl.style.width = '0%'
              }
            }, 600)

            currentWord++
            setTimeout(animateWord, 800)
          }

          animateWord()
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const statement = "WE DON'T CHASE TRENDS. WE READ DATA."
  const words = statement.split(' ')

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#0A1F1A',
        padding: '160px 24px',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <div ref={wordsRef} style={{ marginBottom: 48 }}>
          <div
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              lineHeight: 1.1,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0 16px',
            }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="k-word"
                style={{
                  display: 'inline-block',
                  position: 'relative',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {/* Base text — Warm Cream */}
                <span
                  className="k-text-base"
                  style={{
                    color: '#E8DDD0',
                    display: 'inline-block',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {word}
                </span>

                {/* Accent text — Gold, clipped until line passes */}
                <span
                  className="k-text-accent"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    color: '#C9A87C',
                    clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)',
                    display: 'inline-block',
                    zIndex: 2,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {word}
                </span>

                {/* Strikethrough line */}
                <div
                  className="k-line"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    width: '0%',
                    height: 2,
                    background: '#C9A87C',
                    zIndex: 3,
                    transform: 'translateY(-50%)',
                  }}
                />
              </span>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.3}>
          <p
            className="font-body"
            style={{
              color: 'rgba(232, 221, 208, 0.6)',
              maxWidth: 560,
              margin: '0 auto',
              fontSize: 18,
              lineHeight: 1.7,
            }}
          >
            Two decades of institutional financial management, now applied to Dubai's most dynamic property corridors. Every recommendation backed by verified transaction data, infrastructure timelines, and population forecasts.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}