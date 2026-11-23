import './SocialRail.css'

const socials = [
  {
    network: 'whatsapp',
    href: 'https://wa.me/971585899112',
    label: 'WhatsApp · @mrlivingcapital',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21l1.65-3.8a9 9 0 113.4 2.9L3 21" /><path d="M9 12a1 1 0 001 0h0M15 12a1 1 0 001 0h0M10 15c.5 1 2.5 1.5 3.5 0" /></svg>,
  },
  {
    network: 'linkedin',
    href: 'https://www.linkedin.com/in/mrlivingcapital/',
    label: 'LinkedIn · @mrlivingcapital',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
  },
  {
    network: 'telegram',
    href: 'https://t.me/mrlivingcapital',
    label: 'Telegram · @mrlivingcapital',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>,
  },
  {
    network: 'instagram',
    href: 'https://instagram.com/mrlivingcapital',
    label: 'Instagram · @mrlivingcapital',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>,
  },
]

export default function SocialRail() {
  return (
    <nav className="mrlc-social-rail walkthrough-social-rail" aria-label="MR Living Capital social channels">
      {socials.map((social) => (
        <a key={social.network} data-network={social.network} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Contact MR Living Capital on ${social.label}`} title={social.label}>
          {social.icon}
        </a>
      ))}
    </nav>
  )
}
