import { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'

const faqs = [
  {
    question: 'What is the minimum investment required?',
    answer: 'Considering current market conditions, entry points for off-plan and new-to-market secondary properties start from approximately AED 650,000–750,000. We structure recommendations based on your capital, timeline, and risk tolerance. Note: Recent regulatory changes have removed the minimum AED 750,000 investment mandate for residency visas — investors now have greater flexibility in entry-level property selection.',
  },
  {
    question: 'How do you verify your market data?',
    answer: 'All statistics are sourced directly from Dubai Land Department (DLD) transaction records, DXB Interact analytics platform, and verified developer disclosures. Every figure on this site includes its source citation. We do not use unverified projections or developer marketing materials as data.',
  },
  {
    question: 'What is the Golden Visa and how does property investment qualify?',
    answer: 'Under the 2026 Federal Decree-Law update, ANY real estate purchase in the UAE now qualifies the investor, spouse, children, and both parents for a 10-year renewable Golden Visa. The previous AED 750,000 and AED 2 million minimum thresholds have been removed. This is a game-changer for entry-level investors. We advise on both the property selection and the visa application process.',
  },
  {
    question: 'Can foreign investors own property in Dubai?',
    answer: 'Yes. Dubai allows 100% freehold ownership for foreign nationals in designated areas. All four of our priority corridors — Dubai South, JVC, MBRC, and Meydan — are located within freehold zones where foreigners can own outright with full title deed registration at DLD.',
  },
  {
    question: 'What payment plans are typically available?',
    answer: 'Most off-plan developers offer post-handover payment plans. Common structures include 40/60 (40% during construction, 60% over 2-3 years post-handover), 50/50, and in some cases, 25% upfront with the remainder spread over 5-7 years. Ready properties typically require 25% down with mortgage options available.',
  },
  {
    question: 'How long until I see rental income?',
    answer: 'For off-plan properties, rental income begins approximately 2-3 months after handover, once snagging is complete and the unit is tenanted. Ready properties can generate income within 30-60 days of purchase. Dubai rental yields range from 6-8% gross annually depending on corridor and unit type.',
  },
  {
    question: 'What currencies can I invest in?',
    answer: 'Property transactions in Dubai are conducted in UAE Dirhams (AED), which is pegged to the US Dollar at 3.67:1. We work with clients transferring USD, EUR, GBP, CHF, and other major currencies through regulated exchange partners. All financial advice is bilingual in English, Arabic, and Farsi.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      style={{
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(180deg, #0A1F1A 0%, #0D2420 50%, #0A1F1A 100%)',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="font-caption" style={{ color: '#C9A87C', display: 'block', marginBottom: 16, fontSize: 12 }}>
              COMMON QUESTIONS
            </span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#E8DDD0' }}>
              WHAT INVESTORS <span style={{ color: '#C9A87C' }}>ASK US</span>
            </h2>
          </div>
        </ScrollReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div
                  className="glass-card"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    border: isOpen ? '1px solid rgba(201, 168, 124, 0.25)' : undefined,
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      background: 'none',
                      border: 'none',
                      color: '#E8DDD0',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 15,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                    }}
                  >
                    <span>{faq.question}</span>
                    <span
                      style={{
                        color: '#C9A87C',
                        fontSize: 20,
                        transition: 'transform 0.3s ease',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                        flexShrink: 0,
                        marginLeft: 16,
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? 300 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.4s ease',
                    }}
                  >
                    <div
                      style={{
                        padding: '0 24px 20px',
                        color: 'rgba(232, 221, 208, 0.6)',
                        fontSize: 14,
                        lineHeight: 1.7,
                      }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
