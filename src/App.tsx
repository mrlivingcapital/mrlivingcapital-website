import { Suspense, lazy } from 'react'
import Navigation from './components/Navigation'
import FloatingSocials from './components/FloatingSocials'
import MarketTicker from './components/MarketTicker'
import HeroSection from './sections/HeroSection'
import FounderStatsSection from './sections/FounderStatsSection'
import FounderLetterSection from './sections/FounderLetterSection'
import MarketIntelligenceSection from './sections/MarketIntelligenceSection'
import CorridorsSection from './sections/CorridorsSection'
import InfrastructureSection from './sections/InfrastructureSection'
import BlogSection from './sections/BlogSection'
import FAQSection from './sections/FAQSection'
import LeadMagnetSection from './sections/LeadMagnetSection'
import InquirySection from './sections/InquirySection'
import ExplorerSection from './sections/ExplorerSection'
import FooterSection from './sections/FooterSection'

const ParticleGrid = lazy(() => import('./components/ParticleGrid'))

/**
 * SECTION SEQUENCE — Optimized for Engagement → Inquiry → Lead Generation
 *
 * 1. HOOK (Hero) — "I don't advise. I architect capital." — First impression
 * 2. CREDIBILITY (Founder Stats) — 19 years, 3 emirates, survived & scaled — instant trust
 * 3. TRUST (Founder's Letter) — Personal story, signature — the man behind the brand
 * 4. AUTHORITY (Market Intelligence) — DLD-verified data across 3 emirates — proof we know the market
 * 5. PRODUCT (Corridors) — Dubai, Abu Dhabi, RAK — the allocation zones
 * 6. WHY (Infrastructure) — Government strategy, 2040 plan — immediately after corridors
 * 7. ENGAGEMENT (Calculator) — Self-qualification ROI tool — "What's my return?"
 * 8. INTELLIGENCE (Blog) — Regional briefings — AFTER engagement
 * 9. OBJECTIONS (FAQ) — Handle concerns BEFORE conversion
 * 10. PROCESS (Timeline) — "How It Works" — shows the purchase journey
 * 11. SOFT CAPTURE (Lead Magnet) — Low-friction email for PDF
 * 12. HARD CONVERSION (Inquiry) — Full partnership conversation form
 * 13. DELIGHT (Explorer) — Interactive canvas — memorable exit
 * 14. REINFORCE (Market Ticker) — Live data scrolling
 *
 * Key: Lead capture at #11-12 happens AFTER trust is built, objections handled,
 * and the process is shown. Interactive elements (#7, #13) keep users engaged.
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
        {/* 1. HOOK — Institutional DNA first impression */}
        <HeroSection />
        <div className="section-divider" />

        {/* 2. CREDIBILITY — The numbers that matter */}
        <FounderStatsSection />
        <div className="section-divider" />

        {/* 3. TRUST — The story behind the brand */}
        <FounderLetterSection />
        <div className="section-divider" />

        {/* 4. AUTHORITY — DLD-verified data, 3 emirates */}
        <MarketIntelligenceSection />
        <div className="section-divider" />

        {/* 5. PRODUCT — Generational Wealth Allocation Zones */}
        <CorridorsSection />
        <div className="section-divider" />

        {/* 6. WHY — Government strategy immediately after corridors */}
        <InfrastructureSection />
        <div className="section-divider" />

        {/* 7. INTELLIGENCE — Regional market briefings */}
        <BlogSection />
        <div className="section-divider" />

        {/* 8. OBJECTIONS — Handle concerns before conversion */}
        <FAQSection />
        <div className="section-divider" />

        {/* 9. SOFT CAPTURE — Download the briefing */}
        <LeadMagnetSection />
        <div className="section-divider" />

        {/* 10. HARD CONVERSION — Partnership conversation */}
        <InquirySection />
        <div className="section-divider" />

        {/* 11. DELIGHT — Interactive canvas */}
        <ExplorerSection />
        <div className="section-divider" />

        {/* 12. REINFORCE — Live data ticker */}
        <MarketTicker />
      </main>

      <FooterSection />
    </div>
  )
}

export default App
