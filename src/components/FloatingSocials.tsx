export default function FloatingSocials() {
  const socials = [
    {
      href: 'https://wa.me/971585899112?app_absent=0',
      label: 'WhatsApp',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21l1.65-3.8a9 9 0 113.4 2.9L3 21" />
          <path d="M9 12a1 1 0 001 0h0" />
          <path d="M15 12a1 1 0 001 0h0" />
          <path d="M10 15c.5 1 2.5 1.5 3.5 0" />
        </svg>
      ),
    },
    {
      href: 'https://instagram.com/mrlivingcapital',
      label: 'Instagram',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      href: 'https://t.me/mrlivingcapital',
      label: 'Telegram',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.2 3.2L2.5 10.8c-.7.3-.7 1.2.1 1.5l4.7 1.5 1.8 5.6c.2.5.8.7 1.2.3l2.5-2.5 4.9 3.6c.6.4 1.4.1 1.5-.6L21.9 4c.1-.7-.6-1.3-1.2-.9l-6.5 4.5-4.6-1.5c-.5-.2-.5-.8 0-1l10.4-1.9z" />
        </svg>
      ),
    },
    {
      href: 'https://www.linkedin.com/in/mrlivingcapital/',
      label: 'LinkedIn',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ]

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          title=""
          style={{
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#5A7A72',
            background: 'rgba(10, 31, 26, 0.6)',
            backdropFilter: 'blur(8px)',
            borderLeft: '1px solid rgba(90, 122, 114, 0.2)',
            borderTop: '1px solid rgba(90, 122, 114, 0.2)',
            borderBottom: '1px solid rgba(90, 122, 114, 0.2)',
            borderRadius: '4px 0 0 4px',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#C9A87C'
            e.currentTarget.style.background = 'rgba(201, 168, 124, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#5A7A72'
            e.currentTarget.style.background = 'rgba(10, 31, 26, 0.6)'
          }}
        >
          {s.icon}
        </a>
      ))}
    </div>
  )
}