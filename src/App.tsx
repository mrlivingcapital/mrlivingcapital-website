import { Suspense, lazy } from 'react'
import Navigation from './components/Navigation'
import ChapterRail from './components/ChapterRail'
import FloatingSocials from './components/FloatingSocials'
import MarketTicker from './components/MarketTicker'
import HeroSection from './sections/HeroSection'
import FounderStatsSection from './sections/FounderStatsSection'
import FounderLetterSection from './sections/FounderLetterSection'
import ThesisSection from './sections/ThesisSection'
import LayersSection from './sections/LayersSection'
import DecisionLabSection from './sections/DecisionLabSection'
import MarketIntelligenceSection from './sections/MarketIntelligenceSection'
import CorridorsSection from './sections/CorridorsSection'
import InfrastructureSection from './sections/InfrastructureSection'
import BlogSection from './sections/BlogSection'
import FAQSection from './sections/FAQSection'
import LeadMagnetSection from './sections/LeadMagnetSection'
import DistressDealsSection from './sections/DistressDealsSection'
import CorridorBriefSection from './sections/CorridorBriefSection'
import HiddenGemsSection from './sections/HiddenGemsSection'
import LivingMapSection from './sections/LivingMapSection'
import IntelligenceTeaserSection from './sections/IntelligenceTeaserSection'
import InquirySection from './sections/InquirySection'
import FooterSection from './sections/FooterSection'

const ParticleGrid = lazy(() => import('./components/ParticleGrid'))

/**
 * SECTION SEQUENCE v2:Lean conversion spine (July 2026 optimization)
 *
 * 1. HOOK (Hero):First impression
 * 2. CREDIBILITY (Founder Stats):instant trust
 * 3. TRUST (Founder's Letter):the man behind the brand
 * 4. AUTHORITY (Market Intelligence):DLD-verified data (developer leaderboard removed:scroll tax)
 * 5. GATED REPORT (Lead Magnet):H1 2026 brief, email + mobile mandatory:strikes while data intent is hot
 * 6. PRODUCT (Corridors):the allocation zones
 * 7. HIGH-INTENT CAPTURE (Distress Deals):serious buyers leave email/phone, no freebie
 * 8. WHY (Infrastructure):Government strategy, 2040 plan
 * 9. INTELLIGENCE (Blog):Regional briefings
 * 10. OBJECTIONS (FAQ):Handle concerns
 * 11. HARD CONVERSION (Inquiry):Full partnership conversation form
 * 12. REINFORCE (Market Ticker):Live data scrolling
 * 13. SOFT CAPTURE (Corridor Brief):Weekly email subscription closer
 *
 * Removed: ExplorerSection (interactive canvas:heavy, low conversion), Top Developers
 * leaderboard (directory data, not advisory value). Every remaining section earns its scroll.
 */

function App() {
  return (
    <div style={{ background: '#F6F1E7', minHeight: '100vh' }}>
      <Suspense fallback={null}>
        <ParticleGrid />
      </Suspense>

      <Navigation />
      <ChapterRail />
      <FloatingSocials />

      <main>
        {/* CHAPTER 01 · THE HOOK */}
        <div className="chapter" id="ch-01-hook">
          <HeroSection />
        </div>

        {/* CHAPTER 02 · THE MAN:instant trust, then the story behind the brand */}
        <div className="chapter" id="ch-02-the-man">
          <FounderStatsSection />
          <FounderLetterSection />
        </div>

        {/* CHAPTER 03 · THE METHOD:the four pillars, then the 5 layers scroll stage */}
        <div className="chapter" id="ch-03-the-method">
          <ThesisSection />
          <LayersSection />
        </div>

        {/* CHAPTER 04 · THE PROOF:DLD-verified data, then the Living Map */}
        <div className="chapter" id="ch-04-the-proof">
          <MarketIntelligenceSection />
          <LivingMapSection />
        </div>

        {/* CHAPTER 05 · THE LAB:interactive scenario model */}
        <div className="chapter" id="ch-05-the-lab">
          <DecisionLabSection />
        </div>

        {/* CHAPTER 06 · THE OPPORTUNITIES:allocation corridors, then the hidden gems */}
        <div className="chapter" id="ch-06-opportunities">
          <CorridorsSection />
          <HiddenGemsSection />
        </div>

        {/* CHAPTER 07 · THE KNOWLEDGE:the why, field notes, then what's next */}
        <div className="chapter" id="ch-07-knowledge">
          <InfrastructureSection />
          <BlogSection />
          <IntelligenceTeaserSection />
        </div>

        {/* CHAPTER 08 · THE CONVERSATION:everything conversion, one closing chapter */}
        <div className="chapter" id="ch-08-conversation">
          <LeadMagnetSection />
          <DistressDealsSection />
          <FAQSection />
          <InquirySection />
          <MarketTicker />
          <CorridorBriefSection />
        </div>
      </main>

      <FooterSection />
    </div>
  )
}

export default App
