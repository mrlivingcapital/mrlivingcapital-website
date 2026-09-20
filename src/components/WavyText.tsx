import { useEffect, useRef, useState } from 'react'

interface WavyTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number
  charStagger?: number
  animateOnScroll?: boolean
}

export default function WavyText({
  text,
  className = '',
  style = {},
  delay = 0,
  charStagger = 0.05,
  animateOnScroll = false,
}: WavyTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(!animateOnScroll)

  useEffect(() => {
    if (!animateOnScroll || !containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [animateOnScroll])

  const chars = text.split('')

  return (
    <div ref={containerRef} className={className} style={style} aria-label={text}>
      {chars.map((char, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            animation: visible
              ? `wave 2.5s ease-in-out infinite ${delay + i * charStagger}s, waveIn 0.6s ease forwards ${delay + i * charStagger}s`
              : 'none',
            opacity: visible ? undefined : 0,
            whiteSpace: char === ' ' ? 'pre' : undefined,
            minWidth: char === ' ' ? '0.3em' : undefined,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}