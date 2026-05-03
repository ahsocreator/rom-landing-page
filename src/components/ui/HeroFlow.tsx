import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Sparkles, Wand2, Zap, Coins } from 'lucide-react'

// Animated system flow diagram for the hero center.
// Five nodes (YOU → CLAUDE → ROM → SOLANA → WALLET) connected by curved SVG
// paths with flowing particles. Per-node telemetry (typewriter, progress bar,
// counter) makes the field feel like live system telemetry, not clipart.
//
// Constraints: framer-motion + SVG only, 60fps mid laptop, no new deps.

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const TYPING_TEXT = 'build me a horror channel for tiktok'

interface NodePos {
  // top-left corner % of container, plus width %.
  // Node height comes from intrinsic content.
  x: number
  y: number
  w: number
}

interface NodeDef {
  id: 'you' | 'claude' | 'rom' | 'solana' | 'wallet'
  icon: typeof Lightbulb
  label: string
  sub?: string
  accent: 'green' | 'cyan'
  primary?: boolean
  pos: NodePos
}

const NODES: NodeDef[] = [
  { id: 'you',    icon: Lightbulb, label: 'YOU',     accent: 'green', pos: { x: 3,  y: 4,  w: 62 } },
  { id: 'claude', icon: Sparkles,  label: 'CLAUDE',  sub: 'wires the integration',     accent: 'cyan',  pos: { x: 35, y: 24, w: 62 } },
  { id: 'rom',    icon: Wand2,     label: 'ROM API', sub: 'generates the cinematic',   accent: 'green', primary: true, pos: { x: 3,  y: 46, w: 72 } },
  { id: 'solana', icon: Zap,       label: 'SOLANA',  sub: 'mints + auto revenue',      accent: 'cyan',  pos: { x: 33, y: 70, w: 64 } },
  { id: 'wallet', icon: Coins,     label: 'WALLET',  sub: 'earns per render',          accent: 'green', pos: { x: 5,  y: 88, w: 60 } },
]

// Each connection is from node[i] to node[i+1].
// Start = bottom-center of node[i]; end = top-center of node[i+1].
// Path is a single cubic Bezier with control points pushed vertically for an
// S-curve feel since nodes alternate left/right.
function buildPath(from: NodeDef, to: NodeDef, fromHeightPct: number): string {
  const sx = from.pos.x + from.pos.w / 2
  const sy = from.pos.y + fromHeightPct
  const ex = to.pos.x + to.pos.w / 2
  const ey = to.pos.y
  const midY = (sy + ey) / 2
  // S-curve via two control points
  const c1x = sx
  const c1y = midY
  const c2x = ex
  const c2y = midY
  return `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`
}

const CONNECTIONS = NODES.slice(0, -1).map((from, i) => {
  const to = NODES[i + 1]!
  // Approximate node heights in % of container — primary node is taller.
  const fromH = from.primary ? 18 : 14
  return {
    id: `${from.id}-${to.id}`,
    d: buildPath(from, to, fromH),
    accent: to.accent,
    delay: 0.4 + i * 0.18,
  }
})

export function HeroFlow() {
  return (
    <div
      data-cursor="scan"
      className="relative rounded-3xl border border-rom-green/55 bg-rom-card overflow-hidden border-glow"
    >
      {/* Header */}
      <div className="relative z-20 flex items-center justify-between px-5 md:px-6 py-3.5 border-b border-rom-green/20 bg-rom-bg/50 backdrop-blur">
        <div className="flex items-center gap-2 text-rom-green">
          <span className="size-2 rounded-full bg-rom-green pulse-dot" />
          <span className="micro-label font-mono text-[11px] tracking-[0.18em]">
            SYSTEM · LIVE
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-rom-cyan/45 bg-rom-cyan/[0.06] text-[10px] font-mono uppercase tracking-[0.22em] text-rom-cyan-bright">
          <Zap size={10} strokeWidth={2.4} />
          On Solana
        </span>
      </div>

      {/* Diagram canvas */}
      <div className="relative aspect-[4/5] md:aspect-[5/6]">
        {/* Schematic grid background */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(oklch(0.85 0.22 145) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.22 145) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Corner ticks for "schematic blueprint" feel */}
        <CornerTicks />

        {/* SVG connection layer */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="flow-grad-green" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.22 145 / 0.8)" />
              <stop offset="100%" stopColor="oklch(0.85 0.22 145 / 0.2)" />
            </linearGradient>
            <linearGradient id="flow-grad-cyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.18 200 / 0.8)" />
              <stop offset="100%" stopColor="oklch(0.85 0.18 200 / 0.25)" />
            </linearGradient>
            <filter id="flow-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="0.4" />
            </filter>
          </defs>

          {CONNECTIONS.map((c) => (
            <g key={c.id}>
              {/* Static path — drawn on entrance via stroke-dasharray */}
              <motion.path
                d={c.d}
                fill="none"
                stroke={`url(#flow-grad-${c.accent})`}
                strokeWidth="0.45"
                strokeLinecap="round"
                pathLength={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease, delay: c.delay }}
              />
              {/* Flowing particle on the path */}
              <FlowParticle d={c.d} accent={c.accent} delay={c.delay + 0.6} />
              {/* Trailing particle (offset) */}
              <FlowParticle d={c.d} accent={c.accent} delay={c.delay + 1.4} />
            </g>
          ))}
        </svg>

        {/* Nodes */}
        {NODES.map((n, i) => (
          <NodeCard key={n.id} node={n} index={i} />
        ))}
      </div>

      {/* Footer telemetry strip */}
      <FooterTelemetry />
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// SVG flow particle — runs an offset-distance animation along a hidden path
// using <animateMotion>. Two particles per connection (delayed) give the
// "stream of data" feel without compute cost.

function FlowParticle({
  d,
  accent,
  delay,
}: {
  d: string
  accent: 'green' | 'cyan'
  delay: number
}) {
  const color =
    accent === 'cyan' ? 'oklch(0.92 0.20 200)' : 'oklch(0.92 0.24 145)'
  return (
    <circle r="0.8" fill={color} opacity="0">
      <animate
        attributeName="opacity"
        values="0; 1; 1; 0"
        keyTimes="0; 0.1; 0.85; 1"
        dur="2.6s"
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
      <animateMotion
        path={d}
        dur="2.6s"
        begin={`${delay}s`}
        repeatCount="indefinite"
        rotate="auto"
      />
    </circle>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Node card — absolutely positioned, size driven by % of container.

function NodeCard({ node, index }: { node: NodeDef; index: number }) {
  const Icon = node.icon
  const isCyan = node.accent === 'cyan'
  const colorClasses = isCyan
    ? 'border-rom-cyan/55 bg-rom-cyan/[0.04]'
    : 'border-rom-green/55 bg-rom-green/[0.03]'
  const labelColor = isCyan ? 'text-rom-cyan-bright' : 'text-rom-green-bright'
  const iconBgClasses = isCyan
    ? 'border-rom-cyan/45 bg-rom-cyan/[0.07] text-rom-cyan-bright'
    : 'border-rom-green/45 bg-rom-green/[0.05] text-rom-green-bright'

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? -20 : 20,
        scale: 0.94,
      }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.65,
        ease,
        delay: 0.35 + index * 0.18,
      }}
      className="absolute"
      style={{
        left: `${node.pos.x}%`,
        top: `${node.pos.y}%`,
        width: `${node.pos.w}%`,
      }}
    >
      <div
        className={`relative rounded-xl border ${colorClasses} ${
          node.primary ? 'border-glow-subtle' : ''
        } px-3 py-2.5 md:px-3.5 md:py-3 backdrop-blur-sm`}
      >
        <div className="flex items-center gap-3">
          {/* Icon plate */}
          <span
            className={`grid place-items-center rounded-lg flex-shrink-0 border ${iconBgClasses} ${
              node.primary ? 'size-11' : 'size-9'
            }`}
          >
            <Icon size={node.primary ? 20 : 16} strokeWidth={2} className="icon-glow-sm" />
          </span>

          {/* Label + content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`micro-label font-mono text-[10px] tracking-[0.22em] ${labelColor}`}
              >
                {String(index + 1).padStart(2, '0')} · {node.label}
              </span>
              <span className="size-1.5 rounded-full bg-rom-cyan-bright pulse-dot flex-shrink-0" />
            </div>
            <NodeContent node={node} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Per-node body content. Switch on node.id for specialized telemetry.

function NodeContent({ node }: { node: NodeDef }) {
  if (node.id === 'you') return <Typewriter text={TYPING_TEXT} />
  if (node.id === 'rom') return <RomProgress sub={node.sub ?? ''} />
  if (node.id === 'solana') return <SolanaSlot sub={node.sub ?? ''} />
  if (node.id === 'wallet') return <WalletCounter />
  return (
    <div className="mt-0.5 text-[11px] font-mono text-rom-fg-dim leading-tight truncate">
      {node.sub}
    </div>
  )
}

// Typewriter — varied per-char delay (commas pause, others fast).
function Typewriter({ text }: { text: string }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (i >= text.length) {
      const t = setTimeout(() => setI(0), 2400)
      return () => clearTimeout(t)
    }
    const ch = text[i] ?? ''
    const isPause = ch === ' ' || ch === ','
    const delay = isPause ? 110 + Math.random() * 80 : 38 + Math.random() * 36
    const t = setTimeout(() => setI((v) => v + 1), delay)
    return () => clearTimeout(t)
  }, [i, text])

  return (
    <div className="mt-0.5 text-[11px] font-mono leading-tight">
      <span className="text-rom-fg-muted">"</span>
      <span className="text-rom-fg">{text.slice(0, i)}</span>
      <span className="inline-block w-[2px] h-[10px] bg-rom-green-bright align-middle ml-0.5 animate-pulse" />
      <span className="text-rom-fg-muted">"</span>
    </div>
  )
}

// ROM progress — looping render % bar.
function RomProgress({ sub }: { sub: string }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => (p >= 100 ? 0 : p + 1))
    }, 55)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="mt-0.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[10.5px] font-mono text-rom-fg-dim truncate">
          {sub}
        </span>
        <span className="text-[10px] font-mono tabular-nums text-rom-green-bright">
          {pct}%
        </span>
      </div>
      <div className="mt-1 h-[2px] w-full bg-rom-bg/70 overflow-hidden rounded">
        <div
          className="h-full bg-gradient-to-r from-rom-green to-rom-cyan-bright transition-[width] duration-75"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

// Solana slot — increments every 400ms (~real Solana block time).
function SolanaSlot({ sub }: { sub: string }) {
  const [slot, setSlot] = useState(287_492_103)
  useEffect(() => {
    const id = setInterval(() => setSlot((s) => s + 1), 420)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="mt-0.5 flex items-baseline justify-between gap-2">
      <span className="text-[10.5px] font-mono text-rom-fg-dim truncate">
        {sub}
      </span>
      <span className="text-[10px] font-mono tabular-nums text-rom-cyan-bright">
        slot {slot.toLocaleString()}
      </span>
    </div>
  )
}

// Wallet counter — non-linear ticking. Most ticks small (renders), occasional
// big jump (license sale).
function WalletCounter() {
  const [cents, setCents] = useState(4821)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const big = Math.random() < 0.07
      const delta = big
        ? Math.floor(80 + Math.random() * 220)
        : Math.floor(2 + Math.random() * 12)
      setCents((c) => c + delta)
      timer = setTimeout(tick, 1100 + Math.random() * 900)
    }
    timer = setTimeout(tick, 800)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="mt-0.5 flex items-baseline justify-between gap-2">
      <span className="text-[10.5px] font-mono text-rom-fg-dim">
        earns per render
      </span>
      <span className="text-[15px] font-mono font-bold tabular-nums text-rom-green-bright text-glow leading-none">
        ${(cents / 100).toFixed(2)}
      </span>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Schematic decorations — corner ticks + footer telemetry strip.

function CornerTicks() {
  return (
    <>
      {[
        { top: 8, left: 8 },
        { top: 8, right: 8 },
        { bottom: 8, left: 8 },
        { bottom: 8, right: 8 },
      ].map((pos, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute size-3 border-rom-green/35 pointer-events-none"
          style={{
            ...pos,
            borderLeftWidth: 'left' in pos ? '1px' : 0,
            borderRightWidth: 'right' in pos ? '1px' : 0,
            borderTopWidth: 'top' in pos ? '1px' : 0,
            borderBottomWidth: 'bottom' in pos ? '1px' : 0,
          }}
        />
      ))}
    </>
  )
}

function FooterTelemetry() {
  const [tps, setTps] = useState(2847)
  useEffect(() => {
    const id = setInterval(() => {
      setTps((v) => Math.max(2200, Math.min(3400, v + Math.floor(-40 + Math.random() * 80))))
    }, 700)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="grid grid-cols-3 border-t border-rom-green/30 bg-rom-bg/40">
      {[
        { l: 'Net latency', v: '0.4s' },
        { l: 'Solana TPS', v: tps.toLocaleString(), live: true },
        { l: 'Royalty', v: '100%' },
      ].map((m, i) => (
        <div
          key={m.l}
          className={`px-3 md:px-4 py-2.5 ${i < 2 ? 'border-r border-rom-green/20' : ''}`}
        >
          <div className="micro-label font-mono text-rom-fg-muted text-[9px]">
            {m.l}
          </div>
          <div className="mt-0.5 flex items-baseline gap-1">
            <span className="text-[13px] md:text-[14px] font-mono font-semibold text-rom-fg tabular-nums">
              {m.v}
            </span>
            {m.live && (
              <span className="size-1 rounded-full bg-rom-cyan-bright pulse-dot" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
