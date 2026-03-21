import { Github, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#080810', borderTop: '1px solid #1A1A2E', padding: '60px 40px 40px', borderRadius: '3rem 3rem 0 0', marginTop: 0 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40 }}>
        <div>
          <div style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 22, color: '#F4F4FF', marginBottom: 8 }}>Vyral</div>
          <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>Create less. Grow more.</p>
          <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
            {[Twitter, Instagram, Youtube, Github].map((Icon, i) => (
              <a key={i} href="#" style={{ color: '#3A3A4A', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#7B2FFF'}
                onMouseLeave={e => e.currentTarget.style.color = '#3A3A4A'}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 13, color: '#F4F4FF', marginBottom: 16 }}>Product</p>
          {['Features', 'Analytics', 'Pricing', 'Changelog'].map(l => (
            <a key={l} href="#" style={{ display: 'block', fontSize: 13, color: '#64748B', marginBottom: 10, textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <div>
          <p style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 13, color: '#F4F4FF', marginBottom: 16 }}>Company</p>
          {['About', 'Blog', 'Careers', 'Contact'].map(l => (
            <a key={l} href="#" style={{ display: 'block', fontSize: 13, color: '#64748B', marginBottom: 10, textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <div>
          <p style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 13, color: '#F4F4FF', marginBottom: 16 }}>Legal</p>
          {['Privacy', 'Terms', 'Cookies'].map(l => (
            <a key={l} href="#" style={{ display: 'block', fontSize: 13, color: '#64748B', marginBottom: 10, textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: '40px auto 0', paddingTop: 24, borderTop: '1px solid #1A1A2E', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <p style={{ fontFamily: '"Space Mono"', fontSize: 11, color: '#3A3A4A' }}>© 2025 Vyral. All rights reserved.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: '"Space Mono"', fontSize: 11, color: '#3A3A4A' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.6)', animation: 'pulse 2s infinite' }} />
          All systems operational
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </footer>
  )
}
