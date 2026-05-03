import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// Background = circuit-board animation only.
// Pre-existing matrix rain / depth glyphs / flux veil / mood overlays were
// removed per user direction — they wanted ONLY the circuit board on the
// page background. The wrap still drives a parallax transform on the
// circuit traces (consumed via --matrix-mx/--matrix-my CSS vars).
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
    let tx = 0
    let ty = 0
    let raf = 0

    const onMove = (e: PointerEvent) => {
      mx = (e.clientX - window.innerWidth / 2) / window.innerWidth
      my = (e.clientY - window.innerHeight / 2) / window.innerHeight
    }

    const tick = () => {
      tx += (mx - tx) * 0.06
      ty += (my - ty) * 0.06
      wrap.style.setProperty('--matrix-mx', tx.toFixed(4))
      wrap.style.setProperty('--matrix-my', ty.toFixed(4))
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none iter-3-matrix-wrap"
    >
      {/* Circuit board SVG — the only background animation now */}
      <div className="iter-3-matrix-layer iter-3-matrix-traces">
        <CircuitTraces />
      </div>
    </div>
  )
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

      {/* Static faint trace lines — all coordinates snapped to 32px grid so
          they ride EXACTLY on grid lines / intersections. Light traces along
          these literally light up the grid. */}
      <g stroke="oklch(0.65 0.22 145 / 0.18)" strokeWidth="1" fill="none">
        {/* Horizontals (y on 32-multiples) with grid-aligned diagonal corners */}
        <path d="M 0 128 L 480 128 L 544 192 L 1088 192 L 1152 128 L 1920 128" />
        <path d="M 0 288 L 320 288 L 384 224 L 768 224 L 832 288 L 1920 288" />
        <path d="M 0 544 L 192 544 L 256 608 L 1664 608 L 1728 544 L 1920 544" />
        <path d="M 0 800 L 640 800 L 704 864 L 1248 864 L 1312 800 L 1920 800" />
        <path d="M 0 960 L 384 960 L 448 1024 L 1472 1024 L 1536 960 L 1920 960" />

        {/* Verticals (x on 32-multiples) */}
        <path d="M 256 0 L 256 224 L 320 288 L 320 736 L 256 800 L 256 1080" />
        <path d="M 736 0 L 736 384 L 800 448 L 800 704 L 736 768 L 736 1080" />
        <path d="M 1184 0 L 1184 320 L 1248 384 L 1248 896 L 1184 960 L 1184 1080" />
        <path d="M 1664 0 L 1664 480 L 1600 544 L 1600 928 L 1664 992 L 1664 1080" />

        {/* Diagonal connectors at corners (32-multiple step) */}
        <path d="M 0 0 L 256 256" />
        <path d="M 1920 0 L 1664 256" />
        <path d="M 1920 1080 L 1600 768" />
      </g>

      {/* Glowing junction nodes — at grid intersections that the traces cross */}
      <g fill="oklch(0.92 0.24 145)" filter="url(#trace-glow)">
        {[
          [256, 224], [1184, 320], [1664, 480],
          [320, 736], [832, 736], [1248, 896],
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

      {/* Animated lightning energy traveling along grid-aligned traces.
          Higher strokeWidth + brighter gradient peak → these LITERALLY light
          up the grid lines they ride on. */}
      <g stroke="url(#trace-grad)" strokeWidth="3" fill="none" filter="url(#trace-glow)" opacity={reduce ? 0.4 : 1}>
        <path d="M 0 288 L 320 288 L 384 224 L 768 224 L 832 288 L 1920 288" strokeDasharray="80 1800" strokeDashoffset="0">
          {!reduce && <animate attributeName="stroke-dashoffset" from="1880" to="0" dur="6s" repeatCount="indefinite" />}
        </path>
        <path d="M 256 0 L 256 224 L 320 288 L 320 736 L 256 800 L 256 1080" strokeDasharray="60 1200" strokeDashoffset="0">
          {!reduce && <animate attributeName="stroke-dashoffset" from="0" to="1260" dur="8s" repeatCount="indefinite" />}
        </path>
        <path d="M 0 800 L 640 800 L 704 864 L 1248 864 L 1312 800 L 1920 800" strokeDasharray="100 1900" strokeDashoffset="0">
          {!reduce && <animate attributeName="stroke-dashoffset" from="2000" to="0" dur="10s" repeatCount="indefinite" />}
        </path>
        <path d="M 1184 0 L 1184 320 L 1248 384 L 1248 896 L 1184 960 L 1184 1080" strokeDasharray="70 1100" strokeDashoffset="0">
          {!reduce && <animate attributeName="stroke-dashoffset" from="1170" to="0" dur="7s" repeatCount="indefinite" />}
        </path>
        <path d="M 0 544 L 192 544 L 256 608 L 1664 608 L 1728 544 L 1920 544" strokeDasharray="90 1700" strokeDashoffset="0">
          {!reduce && <animate attributeName="stroke-dashoffset" from="1790" to="0" dur="9s" repeatCount="indefinite" />}
        </path>
        <path d="M 1664 0 L 1664 480 L 1600 544 L 1600 928 L 1664 992 L 1664 1080" strokeDasharray="55 1100" strokeDashoffset="0">
          {!reduce && <animate attributeName="stroke-dashoffset" from="0" to="1155" dur="7.5s" repeatCount="indefinite" />}
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
