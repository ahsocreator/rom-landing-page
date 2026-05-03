import { useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// iter-6 — module-shared scroll-velocity energy (0..1, smoothed, decays to 0).
// Updated by MatrixBackdrop's parallax tick; consumed by MatrixRain.draw and by
// CSS via --scroll-energy on the wrap (drives flux-band brightness).
const scrollState = { energy: 0 }

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
    // iter-6 — scroll-velocity energy
    let lastSy = window.scrollY
    let lastT = performance.now()
    let energy = 0

    const onMove = (e: PointerEvent) => {
      mx = (e.clientX - window.innerWidth / 2) / window.innerWidth
      my = (e.clientY - window.innerHeight / 2) / window.innerHeight
    }
    const onScroll = () => {
      sy = window.scrollY
    }

    const tick = () => {
      // iter-6 — derive scroll velocity → smoothed energy [0..1]
      const now = performance.now()
      const dt = Math.max(1, now - lastT)
      const dV = Math.abs(sy - lastSy) / dt // px / ms
      const target = Math.min(1, dV / 3) // cap at ~3 px/ms = 100% energy
      energy = energy * 0.88 + target * 0.12
      scrollState.energy = energy
      lastSy = sy
      lastT = now

      // iter-8 — scroll-progress mood: cyan peaks mid-page, amber peaks lower
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(1, Math.max(0, sy / Math.max(1, docH)))
      const moodCyan = Math.max(0, 1 - Math.abs(progress - 0.40) * 2.8)
      const moodAmber = Math.max(0, 1 - Math.abs(progress - 0.75) * 3.0)

      tx += (mx - tx) * 0.06
      ty += (my - ty) * 0.06
      ts += (sy - ts) * 0.10
      wrap.style.setProperty('--matrix-mx', tx.toFixed(4))
      wrap.style.setProperty('--matrix-my', ty.toFixed(4))
      wrap.style.setProperty('--matrix-sy', ts.toFixed(2))
      wrap.style.setProperty('--scroll-energy', energy.toFixed(3))
      wrap.style.setProperty('--mood-cyan', moodCyan.toFixed(3))
      wrap.style.setProperty('--mood-amber', moodAmber.toFixed(3))
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
      {/* No solid base / vignette here — Backdrop owns those (renders below this).
          This component is the motion layer only; Backdrop's atmosphere shows through
          our translucent matrix content. */}

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

      {/* iter-4 — continuous vertical signal-flux band sweeping every pixel */}
      <div className="iter-4-flux-band" aria-hidden />
      <div className="iter-4-flux-band iter-4-flux-band-counter" aria-hidden />

      {/* iter-8 — scroll-progress mood overlays (cyan mid, amber lower) */}
      <div className="iter-8-mood iter-8-mood-cyan" aria-hidden />
      <div className="iter-8-mood iter-8-mood-amber" aria-hidden />

      {/* Vignette is owned by Backdrop (deep layer) — no duplicate here */}
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
    // iter-9 — per-column lead intensity [0..1]; resets to 1 on cycle wrap, decays per-frame
    let leadIntensities: number[] = []
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
      // iter-9 — start columns at varied lead intensities so first paint isn't uniform
      leadIntensities = Array.from({ length: columns }, () => Math.random() * 0.3)
    }

    function draw() {
      const w = c.width / (window.devicePixelRatio || 1)
      const h = c.height / (window.devicePixelRatio || 1)
      // Higher fade alpha → trails decay faster → canvas stays mostly
      // transparent so the page grid below shows through.
      g.fillStyle = 'oklch(0.05 0.005 150 / 0.18)'
      g.fillRect(0, 0, w, h)
      g.font = `${fontSize}px "JetBrains Mono", monospace`

      // iter-5: two-sine traveling flow field couples column speeds into a slow
      // horizontal current. ±~38% speed modulation, two phase-decoupled waves
      // → emergent organic banding without Perlin overhead.
      // iter-6: tactileBoost from scroll-velocity energy bumps every column's
      // effective speed up to +45% during fast scroll, decays naturally to 0.
      const t = performance.now()
      const flowA = t * 0.00045
      const flowB = t * 0.00027
      const tactileBoost = 1 + scrollState.energy * 0.45

      for (let i = 0; i < columns; i++) {
        const xn = i / columns
        const wave = Math.sin(xn * 6 + flowA) * 0.25 + Math.sin(xn * 13 + flowB) * 0.13
        const x = xn * w
        const drop = drops[i] ?? 0
        const speed = (speeds[i] ?? 0.5) * (1 + wave) * tactileBoost
        const y = drop * fontSize
        const ch = chars[Math.floor(Math.random() * chars.length)] ?? '0'

        // iter-9 — lead intensity tier picks color + glow per column, gives each
        // falling column a consistent head→tail chromatic cascade (cyan-green
        // pop at top, bright green mid, dim green tail).
        let lead = (leadIntensities[i] ?? 0) * 0.985 // decay each frame
        let drawColor: string
        let blur: number
        if (lead > 0.7) {
          drawColor = 'oklch(0.96 0.18 175 / 0.95)' // cyan-shifted bright head
          blur = 11
        } else if (lead > 0.3) {
          drawColor = 'oklch(0.85 0.22 145 / 0.78)' // bright green mid
          blur = 6
        } else {
          drawColor = 'oklch(0.65 0.22 145 / 0.50)' // dim green tail
          blur = 3
        }

        if (y > 0 || lead > 0.3) {
          g.fillStyle = drawColor
          g.shadowColor = 'oklch(0.85 0.22 145)'
          g.shadowBlur = blur
          g.fillText(ch, x, y)
        }

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0
          lead = 1 // freshly reset → full head intensity
        }
        drops[i] = drop + speed
        leadIntensities[i] = lead
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
  // iter-12 — gate SMIL animations under prefers-reduced-motion via conditional
  // render. SMIL doesn't auto-respect the media query so we have to skip the
  // <animate> children when reduce is true (per Josh Comeau / framer-motion docs).
  const reduce = useReducedMotion()
  return (
    <svg
      className="absolute inset-0 size-full pointer-events-none"
      preserveAspectRatio="none"
      viewBox="0 0 1920 1080"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="trace-grad" x1="0" y1="0" x2="1" y2="0">
          {/* iter-11 — cyan-tipped peak so visible dash heads carry the
              same head-pop signature as rain heads (iter-9) and depth glyphs (iter-10) */}
          <stop offset="0%" stopColor="oklch(0.85 0.22 145 / 0)" />
          <stop offset="40%" stopColor="oklch(0.88 0.22 145 / 0.85)" />
          <stop offset="55%" stopColor="oklch(0.95 0.18 178 / 1)" />
          <stop offset="70%" stopColor="oklch(0.88 0.22 145 / 0.85)" />
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

      {/* Glowing junction nodes — iter-7: cut from 12 to 6 for less competing pulse focus */}
      <g fill="oklch(0.92 0.24 145)" filter="url(#trace-glow)">
        {[
          [240, 220], [1180, 320], [1660, 460],
          [300, 720], [820, 720], [1240, 880],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" opacity={reduce ? 0.7 : 0.9}>
            {!reduce && (
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur={`${2 + (i % 4)}s`}
                repeatCount="indefinite"
                begin={`${(i % 5) * 0.4}s`}
              />
            )}
            {/* iter-11 — fill cyan-shifts at pulse peak alongside opacity peak */}
            {!reduce && (
              <animate
                attributeName="fill"
                values="oklch(0.92 0.24 145);oklch(0.95 0.18 178);oklch(0.92 0.24 145)"
                dur={`${2 + (i % 4)}s`}
                repeatCount="indefinite"
                begin={`${(i % 5) * 0.4}s`}
              />
            )}
          </circle>
        ))}
      </g>

      {/* Animated pulsing energy along selected traces — iter-12: opacity-dimmed
          when reduce, <animate> children skipped, dashes hold static at offset 0 */}
      <g stroke="url(#trace-grad)" strokeWidth="2" fill="none" filter="url(#trace-glow)" opacity={reduce ? 0.4 : 1}>
        <path d="M 0 280 L 320 280 L 380 220 L 760 220 L 820 280 L 1920 280" strokeDasharray="80 1800" strokeDashoffset="0">
          {!reduce && <animate attributeName="stroke-dashoffset" from="1880" to="0" dur="6s" repeatCount="indefinite" />}
        </path>
        <path d="M 240 0 L 240 220 L 300 280 L 300 720 L 240 780 L 240 1080" strokeDasharray="60 1200" strokeDashoffset="0">
          {!reduce && <animate attributeName="stroke-dashoffset" from="0" to="1260" dur="8s" repeatCount="indefinite" />}
        </path>
        <path d="M 0 800 L 660 800 L 720 860 L 1260 860 L 1320 800 L 1920 800" strokeDasharray="100 1900" strokeDashoffset="0">
          {!reduce && <animate attributeName="stroke-dashoffset" from="2000" to="0" dur="10s" repeatCount="indefinite" />}
        </path>
        <path d="M 1180 0 L 1180 320 L 1240 380 L 1240 880 L 1180 940 L 1180 1080" strokeDasharray="70 1100" strokeDashoffset="0">
          {!reduce && <animate attributeName="stroke-dashoffset" from="1170" to="0" dur="7s" repeatCount="indefinite" />}
        </path>
      </g>

      {/* Floating hex/binary scatter — iter-7: peak opacity 0.55 → 0.32 for true subtlety */}
      <g
        fontFamily='"JetBrains Mono", monospace'
        fontSize="11"
        fill="oklch(0.65 0.22 145 / 0.32)"
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
          <text key={i} x={t.x} y={t.y} opacity={reduce ? 0.18 : 0.32}>
            {t.text}
            {!reduce && (
              <animate
                attributeName="opacity"
                values="0.10;0.32;0.10"
                dur={`${4 + (i % 5)}s`}
                repeatCount="indefinite"
                begin={`${(i % 6) * 0.5}s`}
              />
            )}
          </text>
        ))}
      </g>
    </svg>
  )
}
