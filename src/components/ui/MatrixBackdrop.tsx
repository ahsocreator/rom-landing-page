import { useEffect, useMemo, useRef } from 'react'

// 3-layer parallax matrix backdrop. Far / Mid (canvas rain) / Near.
// Mouse + scroll drive a shared transform per layer (different magnitudes).
// Subtle by design — texture, not competition.
export function MatrixBackdrop() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let mx = 0
    let my = 0
    let sy = 0
    let tx = 0
    let ty = 0
    let ts = 0
    let raf = 0

    const onMove = (e: PointerEvent) => {
      mx = (e.clientX - window.innerWidth / 2) / window.innerWidth
      my = (e.clientY - window.innerHeight / 2) / window.innerHeight
    }
    const onScroll = () => {
      sy = window.scrollY
    }

    const tick = () => {
      tx += (mx - tx) * 0.06
      ty += (my - ty) * 0.06
      ts += (sy - ts) * 0.10
      wrap.style.setProperty('--matrix-mx', tx.toFixed(4))
      wrap.style.setProperty('--matrix-my', ty.toFixed(4))
      wrap.style.setProperty('--matrix-sy', ts.toFixed(2))
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none iter-3-matrix-wrap"
    >
      {/* Solid base */}
      <div className="absolute inset-0" style={{ background: 'oklch(0.05 0.005 150)' }} />

      {/* Far depth — small, dim, blurred glyphs that drift slowly */}
      <DepthGlyphs
        depth="far"
        count={32}
        sizeMin={9}
        sizeMax={12}
        durMin={16}
        durMax={26}
      />

      {/* Mid depth — canvas matrix rain (the heart of the matrix feel) */}
      <div className="iter-3-matrix-layer iter-3-matrix-mid">
        <MatrixRain />
      </div>

      {/* Near depth — larger, brighter glyphs, more responsive parallax */}
      <DepthGlyphs
        depth="near"
        count={11}
        sizeMin={22}
        sizeMax={30}
        durMin={20}
        durMax={32}
      />

      {/* Circuit board SVG traces with pulsing glow */}
      <div className="iter-3-matrix-layer iter-3-matrix-traces">
        <CircuitTraces />
      </div>

      {/* Subtle radial vignette to focus content */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, oklch(0.04 0.005 150 / 0.85) 100%)',
        }}
      />
    </div>
  )
}

interface DepthGlyphsProps {
  depth: 'far' | 'near'
  count: number
  sizeMin: number
  sizeMax: number
  durMin: number
  durMax: number
}

function DepthGlyphs({ depth, count, sizeMin, sizeMax, durMin, durMax }: DepthGlyphsProps) {
  const items = useMemo(() => {
    const farChars = '01ABCDEF◆◇·∞アカサタナハマヤラワン'.split('')
    const nearChars = 'ROM◆▣◉⏃⌁∿01ｱｶｻｭ'.split('')
    const chars = depth === 'far' ? farChars : nearChars
    return Array.from({ length: count }, (_, i) => ({
      ch: chars[Math.floor(Math.random() * chars.length)] ?? '0',
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: sizeMin + Math.random() * (sizeMax - sizeMin),
      delay: -Math.random() * durMax,
      dur: durMin + Math.random() * (durMax - durMin),
      drift: (Math.random() - 0.5) * 18,
      key: i,
    }))
  }, [depth, count, sizeMin, sizeMax, durMin, durMax])

  return (
    <div className={`iter-3-matrix-layer iter-3-matrix-${depth}`}>
      {items.map((g) => (
        <span
          key={g.key}
          className="iter-3-glyph iter-3-glyph-drift"
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            fontSize: `${g.size}px`,
            animationDelay: `${g.delay}s`,
            animationDuration: `${g.dur}s`,
            ['--drift-x' as string]: `${g.drift}px`,
          }}
        >
          {g.ch}
        </span>
      ))}
    </div>
  )
}

function MatrixRain() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const c = canvas
    const g = ctx

    const reduce =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let columns = 0
    let drops: number[] = []
    let speeds: number[] = []
    const fontSize = 14
    const chars =
      '01ABCDEF·∞◆◇▣▢▪▫アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'.split('')

    function setup() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      c.width = w * dpr
      c.height = h * dpr
      c.style.width = `${w}px`
      c.style.height = `${h}px`
      g.scale(dpr, dpr)

      // Subtler: slightly fewer columns than width / fontSize
      columns = Math.floor((w / fontSize) * 0.82)
      drops = Array.from({ length: columns }, () => Math.random() * -50)
      speeds = Array.from({ length: columns }, () => 0.32 + Math.random() * 0.78)
    }

    function draw() {
      const w = c.width / (window.devicePixelRatio || 1)
      const h = c.height / (window.devicePixelRatio || 1)
      g.fillStyle = 'oklch(0.05 0.005 150 / 0.10)'
      g.fillRect(0, 0, w, h)
      g.font = `${fontSize}px "JetBrains Mono", monospace`

      for (let i = 0; i < columns; i++) {
        const x = (i / columns) * w
        const drop = drops[i] ?? 0
        const speed = speeds[i] ?? 0.5
        const y = drop * fontSize
        const ch = chars[Math.floor(Math.random() * chars.length)] ?? '0'
        const isHead = Math.random() < 0.035
        if (isHead || y > 0) {
          g.fillStyle = isHead
            ? 'oklch(0.95 0.24 145 / 0.92)'
            : 'oklch(0.65 0.22 145 / 0.50)'
          g.shadowColor = 'oklch(0.85 0.22 145)'
          g.shadowBlur = isHead ? 10 : 3
          g.fillText(ch, x, y)
        }

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] = drop + speed
      }

      raf = requestAnimationFrame(draw)
    }

    setup()
    if (!reduce) draw()
    const onResize = () => {
      cancelAnimationFrame(raf)
      setup()
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" />
}

function CircuitTraces() {
  // Static SVG circuit-board pattern with animated dash flow on key traces.
  return (
    <svg
      className="absolute inset-0 size-full pointer-events-none"
      preserveAspectRatio="none"
      viewBox="0 0 1920 1080"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="trace-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.85 0.22 145 / 0)" />
          <stop offset="50%" stopColor="oklch(0.92 0.24 145 / 1)" />
          <stop offset="100%" stopColor="oklch(0.85 0.22 145 / 0)" />
        </linearGradient>
        <filter id="trace-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Static faint trace lines (background grid feel) */}
      <g stroke="oklch(0.65 0.22 145 / 0.15)" strokeWidth="1" fill="none">
        <path d="M 0 120 L 480 120 L 540 180 L 1100 180 L 1160 120 L 1920 120" />
        <path d="M 0 280 L 320 280 L 380 220 L 760 220 L 820 280 L 1920 280" />
        <path d="M 0 540 L 200 540 L 260 600 L 1660 600 L 1720 540 L 1920 540" />
        <path d="M 0 800 L 660 800 L 720 860 L 1260 860 L 1320 800 L 1920 800" />
        <path d="M 0 960 L 380 960 L 440 1020 L 1480 1020 L 1540 960 L 1920 960" />

        <path d="M 240 0 L 240 220 L 300 280 L 300 720 L 240 780 L 240 1080" />
        <path d="M 720 0 L 720 380 L 780 440 L 780 700 L 720 760 L 720 1080" />
        <path d="M 1180 0 L 1180 320 L 1240 380 L 1240 880 L 1180 940 L 1180 1080" />
        <path d="M 1660 0 L 1660 460 L 1600 520 L 1600 920 L 1660 980 L 1660 1080" />

        <path d="M 0 0 L 240 240" />
        <path d="M 1920 0 L 1660 260" />
        <path d="M 1920 1080 L 1600 760" />
      </g>

      {/* Glowing junction nodes */}
      <g fill="oklch(0.92 0.24 145)" filter="url(#trace-glow)">
        {[
          [240, 220], [720, 380], [1180, 320], [1660, 460],
          [300, 720], [780, 700], [1240, 880], [1600, 920],
          [380, 220], [820, 280], [820, 720], [1320, 800],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" opacity="0.9">
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur={`${2 + (i % 4)}s`}
              repeatCount="indefinite"
              begin={`${(i % 5) * 0.4}s`}
            />
          </circle>
        ))}
      </g>

      {/* Animated pulsing energy along selected traces */}
      <g stroke="url(#trace-grad)" strokeWidth="2" fill="none" filter="url(#trace-glow)">
        <path d="M 0 280 L 320 280 L 380 220 L 760 220 L 820 280 L 1920 280" strokeDasharray="80 1800" strokeDashoffset="0">
          <animate attributeName="stroke-dashoffset" from="1880" to="0" dur="6s" repeatCount="indefinite" />
        </path>
        <path d="M 240 0 L 240 220 L 300 280 L 300 720 L 240 780 L 240 1080" strokeDasharray="60 1200" strokeDashoffset="0">
          <animate attributeName="stroke-dashoffset" from="0" to="1260" dur="8s" repeatCount="indefinite" />
        </path>
        <path d="M 0 800 L 660 800 L 720 860 L 1260 860 L 1320 800 L 1920 800" strokeDasharray="100 1900" strokeDashoffset="0">
          <animate attributeName="stroke-dashoffset" from="2000" to="0" dur="10s" repeatCount="indefinite" />
        </path>
        <path d="M 1180 0 L 1180 320 L 1240 380 L 1240 880 L 1180 940 L 1180 1080" strokeDasharray="70 1100" strokeDashoffset="0">
          <animate attributeName="stroke-dashoffset" from="1170" to="0" dur="7s" repeatCount="indefinite" />
        </path>
      </g>

      {/* Floating hex/binary scatter — subtler than before */}
      <g
        fontFamily='"JetBrains Mono", monospace'
        fontSize="11"
        fill="oklch(0.65 0.22 145 / 0.42)"
      >
        {[
          { x: 80, y: 220, text: '0xA1cF' },
          { x: 1480, y: 140, text: 'ROM_7x3f' },
          { x: 540, y: 380, text: '0x77AB' },
          { x: 1620, y: 540, text: '0xE07b' },
          { x: 200, y: 660, text: '01001011' },
          { x: 1380, y: 720, text: '11001101' },
          { x: 880, y: 940, text: '0xD3f2' },
          { x: 60, y: 980, text: 'NODE_042' },
          { x: 1220, y: 200, text: 'BLOCK_304M' },
          { x: 380, y: 880, text: 'CHAR_VELA' },
        ].map((t, i) => (
          <text key={i} x={t.x} y={t.y} opacity="0.55">
            {t.text}
            <animate
              attributeName="opacity"
              values="0.15;0.55;0.15"
              dur={`${4 + (i % 5)}s`}
              repeatCount="indefinite"
              begin={`${(i % 6) * 0.5}s`}
            />
          </text>
        ))}
      </g>
    </svg>
  )
}
