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
import DistressDealsSection from './sections/DistressDealsSection'
import CorridorBriefSection from './sections/CorridorBriefSection'
import InquirySection from './sections/InquirySection'
import FooterSection from './sections/FooterSection'

const ParticleGrid = lazy(() => import('./components/ParticleGrid'))

/**
 * SECTION SEQUENCE v2 — Lean conversion spine (July 2026 optimization)
 *
 * 1. HOOK (Hero) — First impression
 * 2. CREDIBILITY (Founder Stats) — instant trust
 * 3. TRUST (Founder's Letter) — the man behind the brand
 * 4. AUTHORITY (Market Intelligence) — DLD-verified data (developer leaderboard removed — scroll tax)
 * 5. GATED REPORT (Lead Magnet) — H1 2026 brief, email + mobile mandatory — strikes while data intent is hot
 * 6. PRODUCT (Corridors) — the allocation zones
 * 7. HIGH-INTENT CAPTURE (Distress Deals) — serious buyers leave email/phone, no freebie
 * 8. WHY (Infrastructure) — Government strategy, 2040 plan
 * 9. INTELLIGENCE (Blog) — Regional briefings
 * 10. OBJECTIONS (FAQ) — Handle concerns
 * 11. HARD CONVERSION (Inquiry) — Full partnership conversation form
 * 12. REINFORCE (Market Ticker) — Live data scrolling
 * 13. SOFT CAPTURE (Corridor Brief) — Weekly email subscription closer
 *
 * Removed: ExplorerSection (interactive canvas — heavy, low conversion), Top Developers
 * leaderboard (directory data, not advisory value). Every remaining section earns its scroll.
 */

function App() {
  return (
    <div style={{ background: '#F6F1E7', minHeight: '100vh' }}>
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

        {/* 5. GATED REPORT — H1 2026 brief, email + mobile required */}
        <LeadMagnetSection />
        <div className="section-divider" />

        {/* 6. PRODUCT — Generational Wealth Allocation Zones */}
        <CorridorsSection />
        <div className="section-divider" />

        {/* 7. HIGH-INTENT CAPTURE — Distress deals, serious buyers only */}
        <DistressDealsSection />
        <div className="section-divider" />

        {/* 8. WHY — Government strategy immediately after corridors */}
        <InfrastructureSection />
        <div className="section-divider" />

        {/* 9. INTELLIGENCE — Regional market briefings */}
        <BlogSection />
        <div className="section-divider" />

        {/* 10. OBJECTIONS — Handle concerns before conversion */}
        <FAQSection />
        <div className="section-divider" />

        {/* 11. HARD CONVERSION — Partnership conversation */}
        <InquirySection />
        <div className="section-divider" />

        {/* 12. REINFORCE — Live data ticker */}
        <MarketTicker />
        <div className="section-divider" />

        {/* 13. SOFT CAPTURE — Corridor Brief email subscription */}
        <CorridorBriefSection />
      </main>

      <FooterSection />
    </div>
  )
}

export default App
