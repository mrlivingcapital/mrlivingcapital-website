/**
 * MRLC MOTION SYSTEM (2026-10-26)
 * GSAP + Lenis smooth scroll core for the main site.
 * Additive only: existing CSS/IntersectionObserver reveals stay as the
 * no-JS and reduced-motion fallback. Elements opt in via attributes:
 *   data-parallax        -> image drifts slower than scroll (depth)
 *   data-reveal="up"     -> fade/slide in on enter (uses ScrollTrigger)
 *   data-reveal-delay    -> optional stagger delay in seconds
 */
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initMotion() {
  if (reducedMotion()) return () => {}

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })
  window.__lenis = lenis

  lenis.on('scroll', ScrollTrigger.update)
  const raf = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  // Parallax drift on opted-in images
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const strength = parseFloat(el.dataset.parallax || '0.12')
    gsap.fromTo(
      el,
      { yPercent: -strength * 50 },
      {
        yPercent: strength * 50,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
  })

  // Reveal on enter
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 36 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        delay: parseFloat(el.dataset.revealDelay || '0'),
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    )
  })

  return () => {
    gsap.ticker.remove(raf)
    lenis.destroy()
    ScrollTrigger.getAll().forEach((t) => t.kill())
    window.__lenis = undefined
  }
}

/** Anchor navigation that respects Lenis when it is active. */
export function scrollToElement(el: HTMLElement) {
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: 0, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
