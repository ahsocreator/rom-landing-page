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
