import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, ArrowRight, Zap, BarChart2, Brain, Layers, Repeat, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ─── Dashboard Mockup (Hero right panel) ────────────────────────────────────

function useAnimatedCounter(target, duration = 2000) {
  const [value, setValue] = useState(0)
  const started = useRef(false)
  const ref = useRef()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const step = (now) => {
          const pct = Math.min((now - start) / duration, 1)
          setValue(Math.floor(pct * target))
          if (pct < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return [value, ref]
}

function StatCard({ label, value, suffix = '', color = '#7B2FFF', live = false }) {
  const [count, ref] = useAnimatedCounter(value)
  return (
    <div ref={ref} style={{
      background: '#080810', borderRadius: 12, padding: '14px 16px',
      border: '1px solid #1A1A2E', flex: 1, minWidth: 0,
    }}>
      <div style={{ fontFamily: '"Space Mono"', fontSize: 10, color: '#64748B', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
        {live && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'inline-block', animation: 'pulse 2s infinite' }} />}
        {label}
      </div>
      <div style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 22, color }}>
        {count.toLocaleString()}{suffix}
      </div>
    </div>
  )
}

function DashboardMockup() {
  const platforms = [
    { name: 'YouTube', color: '#FF0000', pct: 78 },
    { name: 'TikTok', color: '#00E5FF', pct: 92 },
    { name: 'Instagram', color: '#E1306C', pct: 65 },
    { name: 'X', color: '#F4F4FF', pct: 54 },
  ]
  return (
    <div style={{
      background: '#0F0F1A', border: '1px solid rgba(123,47,255,0.3)', borderRadius: 24,
      padding: 24, boxShadow: '0 0 60px rgba(123,47,255,0.15)', width: '100%', maxWidth: 420,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.6)', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 13, color: '#F4F4FF' }}>Vyral Dashboard</span>
        </div>
        <span style={{ fontFamily: '"Space Mono"', fontSize: 10, color: '#64748B' }}>LIVE</span>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <StatCard label="SUBSCRIBERS" value={248600} color="#A855F7" live />
        <StatCard label="VIEWS" value={1240000} suffix="" color="#00E5FF" />
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <StatCard label="ENGAGEMENT" value={8} suffix="%" color="#10B981" />
        <StatCard label="POSTS" value={312} color="#F4F4FF" />
      </div>

      {/* Platform bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {platforms.map(p => (
          <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: '"Space Mono"', fontSize: 10, color: '#64748B', width: 70, flexShrink: 0 }}>{p.name}</span>
            <div style={{ flex: 1, background: '#1A1A2E', borderRadius: 100, height: 6, overflow: 'hidden' }}>
              <div style={{
                width: `${p.pct}%`, height: '100%', borderRadius: 100,
                background: `linear-gradient(90deg, ${p.color}88, ${p.color})`,
                transition: 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }} />
            </div>
            <span style={{ fontFamily: '"Space Mono"', fontSize: 10, color: p.color, width: 28, textAlign: 'right' }}>{p.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Feature Visual Components ───────────────────────────────────────────────

function DashboardPreview() {
  const rows = [
    { platform: 'YouTube', color: '#FF0000', subs: 248600, views: 1240000 },
    { platform: 'TikTok', color: '#00E5FF', subs: 512000, views: 3800000 },
    { platform: 'Instagram', color: '#E1306C', subs: 189000, views: 920000 },
    { platform: 'X', color: '#F4F4FF', subs: 84000, views: 440000 },
  ]
  return (
    <div style={{ background: '#080810', borderRadius: 16, padding: 20, border: '1px solid #1A1A2E' }}>
      <div style={{ fontFamily: '"Space Mono"', fontSize: 10, color: '#64748B', marginBottom: 14 }}>PLATFORM OVERVIEW</div>
      {rows.map(r => (
        <div key={r.platform} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1A1A2E' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.color }} />
            <span style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 13, color: '#F4F4FF' }}>{r.platform}</span>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: '"Space Mono"', fontSize: 9, color: '#64748B' }}>SUBS</div>
              <div style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 13, color: r.color }}>{(r.subs / 1000).toFixed(0)}K</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: '"Space Mono"', fontSize: 9, color: '#64748B' }}>VIEWS</div>
              <div style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 13, color: '#F4F4FF' }}>{(r.views / 1000000).toFixed(1)}M</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function BarChartViz() {
  const [mounted, setMounted] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setMounted(true); observer.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const bars = [
    { label: 'YouTube', color: '#FF0000', value: 78 },
    { label: 'TikTok', color: '#00E5FF', value: 95 },
    { label: 'Instagram', color: '#E1306C', value: 64 },
    { label: 'X', color: '#F4F4FF', value: 48 },
  ]

  return (
    <div ref={ref} style={{ background: '#080810', borderRadius: 16, padding: 20, border: '1px solid #1A1A2E' }}>
      <div style={{ fontFamily: '"Space Mono"', fontSize: 10, color: '#64748B', marginBottom: 16 }}>PERFORMANCE SCORE</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {bars.map(b => (
          <div key={b.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#94A3B8' }}>{b.label}</span>
              <span style={{ fontFamily: '"Space Mono"', fontSize: 11, color: b.color }}>{b.value}</span>
            </div>
            <div style={{ background: '#1A1A2E', borderRadius: 100, height: 8, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 100,
                background: `linear-gradient(90deg, ${b.color}66, ${b.color})`,
                width: mounted ? `${b.value}%` : '0%',
                transition: 'width 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CardShuffler() {
  const [active, setActive] = useState(0)
  const ideas = [
    { title: 'Why most creators quit at 1K', tag: '#HOOK', color: '#7B2FFF' },
    { title: '5 tools I use to make content 10x faster', tag: '#LISTICLE', color: '#00E5FF' },
    { title: 'The algorithm is broken — here\'s proof', tag: '#OPINION', color: '#E1306C' },
  ]

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % ideas.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ position: 'relative', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {ideas.map((idea, i) => {
        const offset = (i - active + ideas.length) % ideas.length
        const isActive = offset === 0
        return (
          <div key={i} style={{
            position: 'absolute',
            background: isActive ? '#0F0F1A' : '#080810',
            border: `1px solid ${isActive ? idea.color + '66' : '#1A1A2E'}`,
            borderRadius: 16, padding: '20px 24px', width: '90%',
            transform: `translateY(${offset === 0 ? 0 : offset === 1 ? 20 : 40}px) scale(${offset === 0 ? 1 : offset === 1 ? 0.95 : 0.9})`,
            opacity: offset > 2 ? 0 : 1 - offset * 0.25,
            transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            zIndex: 10 - offset,
          }}>
            <div style={{ fontFamily: '"Space Mono"', fontSize: 10, color: idea.color, marginBottom: 8 }}>{idea.tag}</div>
            <div style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 15, color: '#F4F4FF' }}>{idea.title}</div>
          </div>
        )
      })}
    </div>
  )
}

function TypewriterVoice() {
  const sample = "The truth about consistency nobody talks about — it's not about showing up every day. It's about showing up when it's hard."
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const ref = useRef()
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let i = 0
        const t = setInterval(() => {
          setDisplayed(sample.slice(0, i + 1))
          i++
          if (i >= sample.length) { clearInterval(t); setTimeout(() => setDone(true), 600) }
        }, 30)
      }
    }, { threshold: 0.4 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ background: '#080810', borderRadius: 16, padding: 24, border: '1px solid #1A1A2E' }}>
      <div style={{ fontFamily: '"Space Mono"', fontSize: 10, color: '#64748B', marginBottom: 12 }}>VOICE SAMPLE ANALYSIS</div>
      <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#94A3B8', lineHeight: 1.7, marginBottom: 16, minHeight: 80 }}>
        {displayed}<span style={{ borderRight: '2px solid #7B2FFF', animation: 'blink 1s infinite', marginLeft: 1 }}>&nbsp;</span>
      </p>
      {done && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: '"Space Mono"', fontSize: 11, color: '#00E5FF', animation: 'fadeIn 0.5s ease' }}>
          <CheckCircle size={14} color="#00E5FF" />
          Voice fingerprint extracted ✓
        </div>
      )}
      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  )
}

function FormatFanout() {
  const [hovered, setHovered] = useState(false)
  const formats = [
    { label: 'YouTube Long-form', color: '#FF0000', icon: '▶' },
    { label: 'TikTok Short', color: '#00E5FF', icon: '♪' },
    { label: 'Thread', color: '#F4F4FF', icon: '#' },
    { label: 'Newsletter', color: '#A855F7', icon: '✉' },
  ]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: '#080810', borderRadius: 16, padding: 24, border: '1px solid #1A1A2E', minHeight: 200 }}
    >
      <div style={{ fontFamily: '"Space Mono"', fontSize: 10, color: '#64748B', marginBottom: 16 }}>ONE IDEA → ALL FORMATS</div>
      {/* Source card */}
      <div style={{
        background: '#0F0F1A', border: '1px solid #7B2FFF44', borderRadius: 12, padding: '12px 16px', marginBottom: 16,
        fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 13, color: '#F4F4FF',
        transition: 'all 0.3s',
      }}>
        💡 Original Idea
      </div>
      {/* Format cards fan */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: hovered ? 10 : 4,
        transition: 'gap 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}>
        {formats.map((f, i) => (
          <div key={i} style={{
            background: '#0F0F1A', border: `1px solid ${f.color}44`, borderRadius: 10, padding: '10px 12px',
            opacity: hovered ? 1 : 0.5,
            transform: hovered ? 'translateY(0) scale(1)' : `translateY(${i % 2 === 0 ? -6 : 6}px) scale(0.95)`,
            transition: `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.05}s`,
          }}>
            <div style={{ fontSize: 16, marginBottom: 4 }}>{f.icon}</div>
            <div style={{ fontFamily: 'Inter', fontSize: 11, color: f.color }}>{f.label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: '"Space Mono"', fontSize: 10, color: '#3A3A4A', marginTop: 12, textAlign: 'center' }}>
        {hovered ? '✓ 4 formats generated' : 'Hover to expand'}
      </div>
    </div>
  )
}

function ProductionSteps() {
  const [activeStep, setActiveStep] = useState(-1)
  const ref = useRef()
  const steps = ['Idea', 'Script', 'Hooks', 'Thumbnail', 'Caption', 'Hashtags']

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        steps.forEach((_, i) => {
          setTimeout(() => setActiveStep(i), i * 350 + 300)
        })
        observer.disconnect()
      }
    }, { threshold: 0.4 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ background: '#080810', borderRadius: 16, padding: 24, border: '1px solid #1A1A2E' }}>
      <div style={{ fontFamily: '"Space Mono"', fontSize: 10, color: '#64748B', marginBottom: 16 }}>PRODUCTION PIPELINE</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {steps.map((step, i) => (
          <div key={step} style={{
            padding: '8px 16px', borderRadius: 100,
            background: i <= activeStep ? '#7B2FFF' : '#1A1A2E',
            border: `1px solid ${i <= activeStep ? '#7B2FFF' : '#3A3A4A'}`,
            boxShadow: i <= activeStep ? '0 0 16px rgba(123,47,255,0.4)' : 'none',
            fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 12,
            color: i <= activeStep ? '#F4F4FF' : '#64748B',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            {i <= activeStep && <CheckCircle size={12} />}
            {step}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, fontFamily: '"Space Mono"', fontSize: 10, color: '#64748B' }}>
        {activeStep >= 5 ? '✓ CONTENT READY TO PUBLISH' : `STEP ${activeStep + 2} / ${steps.length}`}
      </div>
    </div>
  )
}

// ─── Scroll Reveal Wrapper ────────────────────────────────────────────────────

function RevealOnScroll({ children, delay = 0 }) {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    )
  }, [delay])
  return <div ref={ref}>{children}</div>
}

// ─── Main Home Component ─────────────────────────────────────────────────────

export default function Home() {
  const heroRef = useRef()

  useEffect(() => {
    // Hero entrance
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-line1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 })
      gsap.fromTo('.hero-line2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 })
      gsap.fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 })
      gsap.fromTo('.hero-logos', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.0 })
      gsap.fromTo('.hero-ctas', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.2 })
      gsap.fromTo('.hero-mockup', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.9 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const features = [
    {
      num: '01', label: 'UNIFIED DASHBOARD', icon: <Layers size={20} color="#00E5FF" />,
      heading: 'All four platforms. One command center.',
      desc: 'Stop tab-switching between YouTube Studio, TikTok analytics, Instagram Insights, and X. Vyral pulls everything into a single, real-time view — subscribers, views, engagement, and growth trends across all four platforms simultaneously.',
      visual: <DashboardPreview />,
    },
    {
      num: '02', label: 'PERFORMANCE ANALYTICS', icon: <BarChart2 size={20} color="#00E5FF" />,
      heading: 'Know exactly what\'s working. And why.',
      desc: 'Vyral doesn\'t just show you numbers — it tells you what they mean. See which content types drive growth, which hooks retain viewers, and which posting times outperform your average. Intelligence, not just data.',
      visual: <BarChartViz />,
    },
    {
      num: '03', label: 'AI IDEA ENGINE', icon: <Zap size={20} color="#00E5FF" />,
      heading: 'Never stare at a blank page again.',
      desc: 'Vyral\'s AI analyzes your top-performing content, current trends, and your niche to generate a constant stream of high-potential ideas. Ranked by viral probability. Ready to create.',
      visual: <CardShuffler />,
    },
    {
      num: '04', label: 'VOICE FINGERPRINT', icon: <Brain size={20} color="#00E5FF" />,
      heading: 'AI that actually sounds like you.',
      desc: 'Paste 5+ samples of your content. Vyral\'s AI extracts your writing style, sentence structure, vocabulary patterns, and tone signature. Every script, caption, and hook it generates from then on is undeniably you.',
      visual: <TypewriterVoice />,
    },
    {
      num: '05', label: 'FORMAT FANOUT', icon: <Repeat size={20} color="#00E5FF" />,
      heading: 'One idea. Every format.',
      desc: 'Write one idea and watch Vyral instantly expand it into a YouTube script, TikTok hook, Twitter thread, and newsletter section — all in your voice. Create once, publish everywhere.',
      visual: <FormatFanout />,
    },
    {
      num: '06', label: 'PRODUCTION PIPELINE', icon: <CheckCircle size={20} color="#00E5FF" />,
      heading: 'From idea to publish-ready in minutes.',
      desc: 'Vyral walks you through every step: Idea → Script → Hooks → Thumbnail concepts → Caption → Hashtags. Each step AI-assisted. Each output in your voice. No bottlenecks, no friction.',
      visual: <ProductionSteps />,
    },
  ]

  const testimonials = [
    { initials: 'AS', name: 'Ahmed S.', handle: '@ahmedcreates', followers: '240K followers', platform: 'YouTube + TikTok', quote: 'I went from posting twice a week to posting every day — without burning out. Vyral\'s AI sounds like me in a way I didn\'t think was possible.' },
    { initials: 'LM', name: 'Luna M.', handle: '@lunacontent', followers: '180K followers', platform: 'Instagram + X', quote: 'The cross-platform analytics alone saved me 4 hours a week. Now I know exactly which content to double down on and which to cut.' },
    { initials: 'KR', name: 'Kai R.', handle: '@kaibuilds', followers: '95K followers', platform: 'TikTok + YouTube', quote: 'I tested 10 AI tools. None of them sounded like me. Vyral\'s voice fingerprint is the only one that actually cracked it.' },
  ]

  const pricingTiers = [
    {
      name: 'Starter', price: '$19', period: '/mo', featured: false,
      desc: 'Perfect for creators just getting serious.',
      features: ['2 platforms connected', 'Unified analytics dashboard', '50 AI content ideas/mo', 'Basic voice training', 'Email support'],
    },
    {
      name: 'Pro', price: '$49', period: '/mo', featured: true,
      desc: 'Everything you need to go full-time.',
      features: ['All 4 platforms connected', 'Advanced analytics + trends', 'Unlimited AI ideas', 'Full voice fingerprint', 'Format fanout (all formats)', 'Production pipeline', 'Priority support'],
    },
    {
      name: 'Team', price: '$99', period: '/mo', featured: false,
      desc: 'For agencies and creator studios.',
      features: ['Everything in Pro', 'Up to 5 team members', '3 brand voice profiles', 'White-label reports', 'API access', 'Dedicated account manager'],
    },
  ]

  return (
    <div>
      {/* ── A. HERO ── */}
      <section ref={heroRef} style={{
        minHeight: '100dvh', position: 'relative', display: 'flex', alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* BG image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1800&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.25)',
        }} />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(8,8,16,0.95) 40%, rgba(123,47,255,0.12) 100%)',
        }} />
        {/* Noise */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }}>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '120px 40px 80px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 60,
          width: '100%', flexWrap: 'wrap',
        }}>
          {/* Left */}
          <div style={{ flex: '1 1 500px', maxWidth: 620 }}>
            {/* Badge */}
            <div className="hero-line1" style={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(123,47,255,0.12)', border: '1px solid rgba(123,47,255,0.3)', borderRadius: 100, padding: '6px 14px', marginBottom: 32 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E5FF', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: '"Space Mono"', fontSize: 11, color: '#A855F7' }}>Now in early access</span>
            </div>

            <h1 className="hero-line1" style={{
              opacity: 0,
              fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 'clamp(40px, 6vw, 72px)',
              color: '#F4F4FF', lineHeight: 1.05, marginBottom: 16, letterSpacing: '-0.03em',
            }}>
              Stop flying blind.
            </h1>
            <h2 className="hero-line2" style={{
              opacity: 0,
              fontFamily: '"DM Serif Display"', fontStyle: 'italic', fontWeight: 400,
              fontSize: 'clamp(52px, 9vw, 110px)',
              background: 'linear-gradient(135deg, #7B2FFF 0%, #A855F7 50%, #00E5FF 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              lineHeight: 1.0, marginBottom: 28, letterSpacing: '-0.02em',
            }}>
              Go viral.
            </h2>

            <p className="hero-sub" style={{ opacity: 0, fontFamily: 'Inter', fontSize: 18, color: '#94A3B8', lineHeight: 1.6, marginBottom: 36, maxWidth: 480 }}>
              One dashboard. Four platforms. The AI that sounds like you.
            </p>

            {/* Platform badges */}
            <div className="hero-logos" style={{ opacity: 0, display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
              {[
                { label: 'YouTube', color: '#FF0000', bg: 'rgba(255,0,0,0.1)' },
                { label: 'TikTok', color: '#00E5FF', bg: 'rgba(0,229,255,0.1)' },
                { label: 'Instagram', color: '#E1306C', bg: 'rgba(225,48,108,0.1)' },
                { label: 'X', color: '#F4F4FF', bg: 'rgba(244,244,255,0.08)' },
              ].map(p => (
                <div key={p.label} style={{
                  padding: '6px 14px', borderRadius: 100,
                  background: p.bg, border: `1px solid ${p.color}44`,
                  fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 12, color: p.color,
                }}>
                  {p.label}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-ctas" style={{ opacity: 0, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <button className="btn-primary" style={{ fontSize: 15 }}>
                Start for free <ArrowRight size={16} />
              </button>
              <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
                <Play size={16} fill="#F4F4FF" /> See how it works ↓
              </button>
            </div>
          </div>

          {/* Right — Dashboard Mockup */}
          <div className="hero-mockup" style={{ opacity: 0, flex: '1 1 360px', display: 'flex', justifyContent: 'center' }}>
            <DashboardMockup />
          </div>
        </div>

        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
      </section>

      {/* ── B. PROBLEM SECTION ── */}
      <section id="features" style={{ background: '#0F0F1A', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealOnScroll>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div style={{ fontFamily: '"Space Mono"', fontSize: 11, color: '#00E5FF', marginBottom: 16 }}>// THE PROBLEM</div>
              <h2 style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#F4F4FF', letterSpacing: '-0.03em' }}>
                You're working hard.<br />You just can't see what's working.
              </h2>
            </div>
          </RevealOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              {
                code: '// NO_VISIBILITY', heading: "You're posting everywhere, tracking nothing.",
                desc: 'YouTube Studio. TikTok Analytics. Instagram Insights. X Dashboard. Four tabs, four logins, four incomplete pictures — none of them talking to each other.',
              },
              {
                code: '// NO_CLARITY', heading: 'Your best posts are buried in the noise.',
                desc: 'That video that got 300K views? You don\'t actually know why it worked. You\'re guessing. Most creators never crack the code of their own success.',
              },
              {
                code: '// NO_DIRECTION', heading: 'You\'re creating content. Not growing an audience.',
                desc: 'The algorithm rewards consistency and strategy. You\'re doing one. Vyral gives you both — plus the AI horsepower to actually scale.',
              },
            ].map((card, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div style={{
                  background: '#080810', borderRadius: 20, padding: 32,
                  borderLeft: '3px solid #00E5FF',
                  border: '1px solid #1A1A2E', borderLeftColor: '#00E5FF', borderLeftWidth: 3,
                  height: '100%',
                }}>
                  <div style={{ fontFamily: '"Space Mono"', fontSize: 11, color: '#00E5FF', marginBottom: 16 }}>{card.code}</div>
                  <h3 style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 20, color: '#F4F4FF', marginBottom: 12, lineHeight: 1.3 }}>{card.heading}</h3>
                  <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#64748B', lineHeight: 1.7 }}>{card.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── C. FEATURES SECTION ── */}
      <section style={{ background: '#080810', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealOnScroll>
            <div style={{ textAlign: 'center', marginBottom: 80 }}>
              <div style={{ fontFamily: '"Space Mono"', fontSize: 11, color: '#00E5FF', marginBottom: 16 }}>// FEATURES</div>
              <h2 style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#F4F4FF', letterSpacing: '-0.03em', marginBottom: 16 }}>
                Everything you need to go viral.
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#64748B', maxWidth: 480, margin: '0 auto' }}>
                Six AI-powered features. One seamless workflow. Zero excuses.
              </p>
            </div>
          </RevealOnScroll>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
            {features.map((f, i) => (
              <RevealOnScroll key={i} delay={0.1}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap',
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                }}>
                  {/* Text */}
                  <div style={{ flex: '1 1 320px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                      {f.icon}
                      <span style={{ fontFamily: '"Space Mono"', fontSize: 11, color: '#00E5FF' }}>{f.num} / {f.label}</span>
                    </div>
                    <h3 style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 'clamp(22px, 3vw, 34px)', color: '#F4F4FF', lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.02em' }}>
                      {f.heading}
                    </h3>
                    <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#64748B', lineHeight: 1.8 }}>{f.desc}</p>
                  </div>
                  {/* Visual */}
                  <div style={{ flex: '1 1 320px' }}>
                    {f.visual}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── D. STATS BAR ── */}
      <section style={{ background: '#0F0F1A', borderTop: '1px solid #1A1A2E', borderBottom: '1px solid #1A1A2E', padding: '60px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
          {[
            { number: 4, suffix: '', label: 'Platforms Connected' },
            { number: 6, suffix: '', label: 'AI-Powered Features' },
            { number: 1, suffix: '', label: 'Dashboard to Rule Them All' },
            { number: 99, suffix: '+', label: 'Ideas Generated per Month' },
          ].map((stat, i) => {
            const [count, ref] = useAnimatedCounter(stat.number)
            return (
              <div key={i} ref={ref} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 'clamp(40px, 5vw, 64px)', color: '#7B2FFF', letterSpacing: '-0.04em', marginBottom: 8 }}>
                  {stat.number === 99 ? '∞' : count}{stat.suffix}
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: 13, color: '#64748B' }}>{stat.label}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── E. HOW IT WORKS ── */}
      <section style={{ background: '#080810', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <RevealOnScroll>
            <div style={{ textAlign: 'center', marginBottom: 70 }}>
              <div style={{ fontFamily: '"Space Mono"', fontSize: 11, color: '#00E5FF', marginBottom: 16 }}>// HOW IT WORKS</div>
              <h2 style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#F4F4FF', letterSpacing: '-0.03em' }}>
                Three steps. Infinite content.
              </h2>
            </div>
          </RevealOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {[
              { step: '01', title: 'Connect', desc: 'Link your YouTube, TikTok, Instagram, and X accounts in under 2 minutes. Vyral immediately begins pulling your analytics, top posts, and audience data.', color: '#7B2FFF' },
              { step: '02', title: 'Analyze', desc: 'Vyral processes your historical performance, identifies your top-performing formats, extracts your voice fingerprint, and maps your growth patterns across all platforms.', color: '#A855F7' },
              { step: '03', title: 'Create', desc: 'Generate ideas ranked by viral potential, turn one idea into scripts, hooks, captions, and threads — all in your voice. Publish. Repeat.', color: '#00E5FF' },
            ].map((s, i) => (
              <RevealOnScroll key={i} delay={i * 0.15}>
                <div style={{
                  background: '#0F0F1A', borderRadius: 24, padding: 36,
                  border: '1px solid #1A1A2E',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + '66'; e.currentTarget.style.boxShadow = `0 0 40px ${s.color}22` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1A1A2E'; e.currentTarget.style.boxShadow = 'none' }}>
                  <div style={{ fontFamily: '"Space Mono"', fontSize: 48, color: s.color, opacity: 0.2, marginBottom: 16, lineHeight: 1 }}>{s.step}</div>
                  <h3 style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 24, color: '#F4F4FF', marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>{s.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── F. PRICING ── */}
      <section id="pricing" style={{ background: '#0F0F1A', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealOnScroll>
            <div style={{ textAlign: 'center', marginBottom: 70 }}>
              <div style={{ fontFamily: '"Space Mono"', fontSize: 11, color: '#00E5FF', marginBottom: 16 }}>// PRICING</div>
              <h2 style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#F4F4FF', letterSpacing: '-0.03em', marginBottom: 12 }}>
                Start free. Scale when ready.
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#64748B' }}>All plans include a 14-day free trial. No credit card required.</p>
            </div>
          </RevealOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}>
            {pricingTiers.map((tier, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div style={{
                  background: '#080810', borderRadius: 24, padding: 36,
                  border: tier.featured ? '2px solid #7B2FFF' : '1px solid #1A1A2E',
                  boxShadow: tier.featured ? '0 0 60px rgba(123,47,255,0.2)' : 'none',
                  position: 'relative',
                }}>
                  {tier.featured && (
                    <div style={{
                      position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                      background: '#7B2FFF', borderRadius: 100, padding: '4px 16px',
                      fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 11, color: '#F4F4FF',
                      whiteSpace: 'nowrap',
                    }}>Most Popular</div>
                  )}
                  <div style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 20, color: '#F4F4FF', marginBottom: 8 }}>{tier.name}</div>
                  <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#64748B', marginBottom: 24 }}>{tier.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 28 }}>
                    <span style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 48, color: tier.featured ? '#A855F7' : '#F4F4FF', letterSpacing: '-0.04em' }}>{tier.price}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#64748B' }}>{tier.period}</span>
                  </div>
                  <button className={tier.featured ? 'btn-primary' : 'btn-ghost'} style={{ width: '100%', justifyContent: 'center', marginBottom: 28 }}>
                    {tier.featured ? 'Start Pro Free' : 'Get Started'}
                  </button>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {tier.features.map((feat, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <CheckCircle size={14} color={tier.featured ? '#7B2FFF' : '#3A3A4A'} />
                        <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#94A3B8' }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── G. TESTIMONIALS ── */}
      <section style={{ background: '#080810', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealOnScroll>
            <div style={{ textAlign: 'center', marginBottom: 70 }}>
              <div style={{ fontFamily: '"Space Mono"', fontSize: 11, color: '#00E5FF', marginBottom: 16 }}>// CREATORS</div>
              <h2 style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#F4F4FF', letterSpacing: '-0.03em' }}>
                Early access. Real results.
              </h2>
            </div>
          </RevealOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
            {testimonials.map((t, i) => (
              <RevealOnScroll key={i} delay={i * 0.12}>
                <div style={{
                  background: '#0F0F1A', borderRadius: 24, padding: 32,
                  border: '1px solid #1A1A2E',
                  transition: 'border-color 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#7B2FFF44'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#1A1A2E'}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7B2FFF, #00E5FF)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 15, color: '#F4F4FF',
                    }}>{t.initials}</div>
                    <div>
                      <div style={{ fontFamily: '"Space Grotesk"', fontWeight: 700, fontSize: 15, color: '#F4F4FF' }}>{t.name}</div>
                      <div style={{ fontFamily: '"Space Mono"', fontSize: 10, color: '#64748B' }}>{t.handle} · {t.followers}</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: '"Space Mono"', fontSize: 10, color: '#7B2FFF', marginBottom: 14 }}>{t.platform}</div>
                  <p style={{ fontFamily: '"DM Serif Display"', fontStyle: 'italic', fontSize: 17, color: '#94A3B8', lineHeight: 1.7 }}>
                    "{t.quote}"
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── H. CTA STRIP ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0F0F1A 0%, #1A0A2E 50%, #0F0F1A 100%)',
        padding: '100px 40px', textAlign: 'center',
        borderTop: '1px solid #1A1A2E',
      }}>
        <RevealOnScroll>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ fontFamily: '"Space Mono"', fontSize: 11, color: '#00E5FF', marginBottom: 20 }}>// YOUR MOVE</div>
            <h2 style={{
              fontFamily: '"DM Serif Display"', fontStyle: 'italic', fontWeight: 400,
              fontSize: 'clamp(32px, 5vw, 64px)', color: '#F4F4FF', marginBottom: 20, lineHeight: 1.2,
            }}>
              Your next viral post is in there.
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#64748B', marginBottom: 40, lineHeight: 1.7 }}>
              Join thousands of creators who stopped guessing and started growing. Free to start. No credit card needed.
            </p>
            <button className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>
              Get Early Access — It's Free <ArrowRight size={18} />
            </button>
            <p style={{ fontFamily: '"Space Mono"', fontSize: 11, color: '#3A3A4A', marginTop: 20 }}>
              14-day free trial · Cancel anytime · No credit card required
            </p>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  )
}
