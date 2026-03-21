import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)',
      zIndex: 1000, width: 'min(900px, calc(100vw - 40px))',
      padding: '12px 24px',
      borderRadius: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(8,8,16,0.85)' : 'rgba(8,8,16,0.4)',
      backdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
      border: '1px solid rgba(123,47,255,0.2)',
      transition: 'all 0.3s ease',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%', background: '#00E5FF',
          boxShadow: '0 0 10px rgba(0,229,255,0.6)',
          animation: 'pulse 2s infinite',
        }} />
        <span style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 20, color: '#F4F4FF', letterSpacing: '-0.03em' }}>
          Vyral
        </span>
      </div>

      {/* Desktop nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden-mobile">
        {['Features', 'Analytics', 'Pricing', 'About'].map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} style={{ fontFamily: 'Inter', fontSize: 14, color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#F4F4FF'}
            onMouseLeave={e => e.target.style.color = '#94A3B8'}>
            {link}
          </a>
        ))}
        <a href="https://vyral.vercel.app/login" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ padding: '10px 20px', fontSize: 13 }}>
            Log In
          </button>
        </a>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: 'none', background: 'none', border: 'none', color: '#F4F4FF', cursor: 'pointer', fontSize: 24 }}
        className="show-mobile">
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 8,
          background: 'rgba(8,8,16,0.97)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(123,47,255,0.2)', borderRadius: 20,
          padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {['Features', 'Analytics', 'Pricing', 'About'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Inter', fontSize: 15, color: '#94A3B8', textDecoration: 'none' }}>
              {link}
            </a>
          ))}
          <a href="https://vyral.vercel.app/login" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Log In
            </button>
          </a>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media(max-width:640px) { .hidden-mobile{display:none!important} .show-mobile{display:block!important} }
      `}</style>
    </nav>
  )
}
