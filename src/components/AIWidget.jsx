import { useState, useRef } from 'react'
import { Sparkles, X, Send } from 'lucide-react'

const RESPONSES = {
  'what is vyral': 'Vyral is your creator command center. Connect YouTube, TikTok, Instagram, and X — see all your data in one place, know what works, and never run out of ideas. → <a href="/features" style="color:#7B2FFF">See all features</a>',
  'pricing': 'Starter at $19/mo (1 account/platform, 50 AI credits/mo), Pro at $49/mo (3 accounts/platform, 300 AI credits + competitor analysis), Agency at $99/mo (10 accounts/platform, unlimited credits). All plans include a 14-day free trial. → <a href="/pricing" style="color:#7B2FFF">See pricing</a>',
  'platforms': 'Vyral supports YouTube, TikTok, Instagram, and X — all four in one dashboard.',
  'voice': 'Paste 5+ samples of your content. Vyral\'s AI extracts your writing style, vocabulary patterns, tone, and even your Arabic/English ratio. Every AI output from that point sounds like you wrote it.',
  'launch': 'We\'re in early access. <a href="/join" style="color:#7B2FFF">Join the waitlist</a> and be first when we launch.',
}

function getResponse(msg) {
  const m = msg.toLowerCase()
  if (m.includes('vyral') || m.includes('what')) return RESPONSES['what is vyral']
  if (m.includes('pric') || m.includes('cost') || m.includes('plan')) return RESPONSES['pricing']
  if (m.includes('platform') || m.includes('support')) return RESPONSES['platforms']
  if (m.includes('voice') || m.includes('fingerprint') || m.includes('tone')) return RESPONSES['voice']
  if (m.includes('launch') || m.includes('when') || m.includes('release')) return RESPONSES['launch']
  return 'Great question — <a href="/join" style="color:#7B2FFF">join the waitlist</a> and ask us directly. We\'d love to hear from you.'
}

export default function AIWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ from: 'ai', text: 'Hey! I\'m Vyral AI. Ask me anything about the product.' }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const inputRef = useRef()

  function send() {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages(m => [...m, { from: 'user', text: userMsg }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(m => [...m, { from: 'ai', text: getResponse(userMsg) }])
    }, 1200)
  }

  return (
    <>
      {/* Panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 90, right: 24, width: 340, zIndex: 2000,
          background: '#0F0F1A', border: '1px solid #3A3A4A', borderRadius: 20,
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #1A1A2E', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E5FF', boxShadow: '0 0 10px rgba(0,229,255,0.6)', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 14, color: '#F4F4FF' }}>Vyral AI</span>
              <span style={{ fontFamily: '"Space Mono"', fontSize: 10, color: '#64748B' }}>Online</span>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}><X size={16} /></button>
          </div>

          {/* Messages */}
          <div style={{ padding: 16, flex: 1, maxHeight: 300, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%', padding: '10px 14px', borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: m.from === 'user' ? '#7B2FFF' : '#1A1A2E',
                  fontSize: 13, color: '#F4F4FF', lineHeight: 1.5,
                }} dangerouslySetInnerHTML={{ __html: m.text }} />
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', gap: 4, padding: '10px 14px', background: '#1A1A2E', borderRadius: '16px 16px 16px 4px', width: 'fit-content' }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#64748B', animation: `bounce 1s ${i*0.2}s infinite` }} />)}
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #1A1A2E', display: 'flex', gap: 8 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask anything..."
              style={{ flex: 1, background: '#080810', border: '1px solid #3A3A4A', borderRadius: 10, padding: '8px 12px', color: '#F4F4FF', fontSize: 13, outline: 'none' }}
            />
            <button onClick={send} style={{ background: '#7B2FFF', border: 'none', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', color: '#fff' }}><Send size={14} /></button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button onClick={() => setOpen(o => !o)} style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 2000,
        width: 56, height: 56, borderRadius: '50%',
        background: '#7B2FFF', border: 'none', cursor: 'pointer',
        boxShadow: '0 0 30px rgba(123,47,255,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        <Sparkles size={22} color="#fff" />
      </button>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
      `}</style>
    </>
  )
}
