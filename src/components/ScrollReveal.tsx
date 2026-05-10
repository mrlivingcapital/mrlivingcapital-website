import { useEffect, useRef, type ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  direction?: 'up' | 'left' | 'right'
  distance?: number
  duration?: number
}

export default function ScrollReveal({
  children,
  className = '',
  style = {},
  delay = 0,
  direction = 'up',
  distance = 40,
  duration = 0.8,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const getInitialTransform = () => {
      switch (direction) {
        case 'left': return `translateX(-${distance}px)`
        case 'right': return `translateX(${distance}px)`
        default: return `translateY(${distance}px)`
      }
    }

    el.style.opacity = '0'
    el.style.transform = getInitialTransform()
    el.style.transition = `opacity ${duration}s ease ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translate(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, direction, distance, duration])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}