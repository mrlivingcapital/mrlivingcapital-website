import { Suspense, lazy } from 'react'
import Navigation from './components/Navigation'
import FloatingSocials from './components/FloatingSocials'
import MarketTicker from './components/MarketTicker'
import HeroSection from './sections/HeroSection'
import FounderStatsSection from './sections/FounderStatsSection'
import MarketIntelligenceSection from './sections/MarketIntelligenceSection'
import CorridorsSection from './sections/CorridorsSection'
import AboutSection from './sections/AboutSection'
import CalculatorSection from './sections/CalculatorSection'
import InfrastructureSection from './sections/InfrastructureSection'
import FAQSection from './sections/FAQSection'
import BlogSection from './sections/BlogSection'
import LeadMagnetSection from './sections/LeadMagnetSection'
import InquirySection from './sections/InquirySection'
import ExplorerSection from './sections/ExplorerSection'
import LandmarksSection from './sections/LandmarksSection'
import FooterSection from './sections/FooterSection'

const ParticleGrid = lazy(() => import('./components/ParticleGrid'))

/**
 * SECTION SEQUENCE — Optimized for Engagement → Inquiry → Lead Generation
 *
 * The flow follows a proven conversion funnel:
 * 1. HOOK (Hero) — First impression, brand promise
 * 2. DIFFERENTIATE (Philosophy) — "We don't chase trends" — separates from competitors
 * 3. CREDIBILITY (Founder Stats) — 35 years, 3 countries — instant trust
 * 4. ABOUT (Founder Photo + Value Props) — Deep trust: who we are, why us, 4 reasons
 * 5. AUTHORITY (Market Intelligence) — DLD data, developer rankings — proof we know the market
 * 6. PRODUCT (Corridors) — The 4 investment zones — what we actually offer
 * 7. ENGAGEMENT (Calculator) — Self-qualification tool — "What's my ROI?"
 * 8. VISION (Infrastructure + Globe) — Why these corridors — Dubai 2040, future-proof
 * 9. OBJECTIONS (FAQ) — Handle concerns BEFORE asking for contact
 * 10. SOFT CAPTURE (Lead Magnet) — Low-friction email capture for PDF
 * 11. HARD CONVERSION (Inquiry Form) — Full form — the money shot
 * 12. DELIGHT (Explorer Canvas) — Interactive reward — memorable exit
 * 13. TRUST (Landmarks) — Visual proof we know Dubai
 * 14. REINFORCE (Market Ticker) — Live data scrolling — credibility stamp
 *
 * Key insight: Lead capture happens at #10-11, AFTER trust is built and objections handled.
 * Interactive elements (#7, #12) keep users engaged longer.
 * FAQ at #9 handles objections right before conversion — critical placement.
 */

function App() {
  return (
    <div style={{ background: '#0A1F1A', minHeight: '100vh' }}>
      <Suspense fallback={null}>
        <ParticleGrid />
      </Suspense>

      <Navigation />
      <FloatingSocials />

      <main>
        {/* 1. HOOK — Emotional first impression */}
        <HeroSection />
        <div className="section-divider" />

        {/* 2-3. CREDIBILITY — Founder stats right after brand promise */}
        <FounderStatsSection />
        <div className="section-divider" />

        {/* 4. ABOUT — Founder photo + 4 value propositions */}
        <AboutSection />
        <div className="section-divider" />

        {/* 5. AUTHORITY — DLD-verified market data */}
        <MarketIntelligenceSection />
        <div className="section-divider" />

        {/* 6. PRODUCT — The 4 investment corridors */}
        <CorridorsSection />
        <div className="section-divider" />

        {/* 6.5 BLOG — Regional market reports for 5 geographies */}
        <BlogSection />
        <div className="section-divider" />

        {/* 7. ENGAGEMENT — Self-qualification ROI calculator */}
        <CalculatorSection />
        <div className="section-divider" />

        {/* 8. VISION — Dubai 2040, infrastructure, globe */}
        <InfrastructureSection />
        <div className="section-divider" />

        {/* 9. OBJECTIONS — Handle concerns BEFORE conversion */}
        <FAQSection />
        <div className="section-divider" />

        {/* 10. SOFT CAPTURE — Email for PDF */}
        <LeadMagnetSection />
        <div className="section-divider" />

        {/* 11. HARD CONVERSION — Full inquiry form */}
        <InquirySection />
        <div className="section-divider" />

        {/* 12. DELIGHT — Interactive reward (post-conversion) */}
        <ExplorerSection />
        <div className="section-divider" />

        {/* 13. TRUST — Landmarks we know */}
        <LandmarksSection />

        {/* 14. REINFORCE — Live data ticker (sticky credibility) */}
        <MarketTicker />
      </main>

      <FooterSection />
    </div>
  )
}

export default App
