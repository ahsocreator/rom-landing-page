import { useEffect, useState, Fragment } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Sparkles, Wand2, Zap, Coins, ArrowDown } from 'lucide-react'

// Horizontal animated system flow for the hero.
// 5 nodes in a row: YOU → CLAUDE → ROM → SOLANA → WALLET.
// SVG connectors with flowing particles between nodes; per-node live
// telemetry (typewriter, progress bar, slot counter, $$ counter) running
// on independent clocks. No outer border — frame-less, polished card.

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
const TYPING_TEXT = 'horror channel for tiktok'

interface NodeDef {
  id: 'you' | 'claude' | 'rom' | 'solana' | 'wallet'
  icon: typeof Lightbulb
  label: string
  accent: 'green' | 'cyan'
  primary?: boolean
}

const NODES: NodeDef[] = [
  { id: 'you',    icon: Lightbulb, label: 'YOU',     accent: 'green' },
  { id: 'claude', icon: Sparkles,  label: 'CLAUDE',  accent: 'cyan' },
  { id: 'rom',    icon: Wand2,     label: 'ROM API', accent: 'green', primary: true },
  { id: 'solana', icon: Zap,       label: 'SOLANA',  accent: 'cyan' },
  { id: 'wallet', icon: Coins,     label: 'WALLET',  accent: 'green' },
]

export function HeroFlow() {
  return (
    <div
      data-cursor="scan"
      className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-rom-card via-rom-card-elevated to-rom-card"
      style={{
        boxShadow:
          '0 0 0 1px oklch(0.85 0.22 145 / 0.10), 0 24px 80px oklch(0.05 0.005 150 / 0.6), 0 4px 16px oklch(0.85 0.22 145 / 0.04)',
      }}
    >
      {/* Header */}
      <div className="relative z-20 flex items-center justify-between px-6 md:px-8 py-4 border-b border-rom-green/15">
        <div className="flex items-center gap-2.5 text-rom-green">
          <span className="size-2 rounded-full bg-rom-green pulse-dot" />
          <span className="micro-label font-mono text-[10.5px] tracking-[0.24em]">
            SYSTEM · LIVE
          </span>
          <span className="text-rom-fg-muted">/</span>
          <span className="micro-label font-mono text-[10.5px] tracking-[0.24em] text-rom-fg-muted">
            prompt → revenue
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-rom-cyan/40 bg-rom-cyan/[0.05] text-[10px] font-mono uppercase tracking-[0.24em] text-rom-cyan-bright">
          <Zap size={10} strokeWidth={2.4} />
          On Solana
        </span>
      </div>

      {/* Diagram canvas */}
      <div className="relative px-4 md:px-8 py-10 md:py-14">
        {/* Schematic grid background */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(oklch(0.85 0.22 145) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.22 145) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Subtle radial glow behind the primary node (ROM API) */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 30% 40% at 50% 50%, oklch(0.85 0.22 145 / 0.07), transparent 70%)',
          }}
        />

        {/* SVG horizontal connector layer — desktop only.
            On mobile the nodes stack vertically with ↓ arrows between them. */}
        <svg
          aria-hidden
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hflow-grad-green" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.85 0.22 145 / 0.15)" />
              <stop offset="50%" stopColor="oklch(0.92 0.24 145 / 0.7)" />
              <stop offset="100%" stopColor="oklch(0.85 0.22 145 / 0.15)" />
            </linearGradient>
            <linearGradient id="hflow-grad-cyan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.85 0.18 200 / 0.15)" />
              <stop offset="50%" stopColor="oklch(0.92 0.20 200 / 0.7)" />
              <stop offset="100%" stopColor="oklch(0.85 0.18 200 / 0.15)" />
            </linearGradient>
          </defs>

          {/* 4 horizontal connectors at the vertical midpoint of nodes (50%) */}
          {/* Node centers at x = 10, 30, 50, 70, 90 (in % of canvas) */}
          {([
            { from: 10, to: 30, accent: 'cyan',  delay: 0.5 },
            { from: 30, to: 50, accent: 'green', delay: 0.7 },
            { from: 50, to: 70, accent: 'cyan',  delay: 0.9 },
            { from: 70, to: 90, accent: 'green', delay: 1.1 },
          ] as const).map((c, i) => {
            // Path: from (x = from + 6, y = 50) to (x = to - 6, y = 50)
            // 6% padding so line doesn't touch node edges
            const sx = c.from + 6
            const ex = c.to - 6
            const d = `M ${sx} 50 L ${ex} 50`
            return (
              <g key={i}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke={`url(#hflow-grad-${c.accent})`}
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  pathLength={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease, delay: c.delay }}
                />
                {/* Static arrowhead at the end of each connector */}
                <motion.polygon
                  points={`${ex},48.4 ${ex + 1.4},50 ${ex},51.6`}
                  fill={
                    c.accent === 'cyan'
                      ? 'oklch(0.92 0.20 200)'
                      : 'oklch(0.92 0.24 145)'
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.4, ease, delay: c.delay + 0.5 }}
                />
                {/* Two phase-offset particles flowing along the path */}
                <FlowParticle d={d} accent={c.accent} delay={c.delay + 0.6} />
                <FlowParticle d={d} accent={c.accent} delay={c.delay + 1.4} />
              </g>
            )
          })}
        </svg>

        {/* Node layout: stacked vertical on mobile (with ↓ between nodes),
            5-column horizontal on md+ */}
        <div className="relative flex flex-col gap-2 md:grid md:grid-cols-5 md:gap-3">
          {NODES.map((n, i) => (
            <Fragment key={n.id}>
              <NodeCard node={n} index={i} />
              {i < NODES.length - 1 && (
                <div
                  aria-hidden
                  className="md:hidden flex justify-center py-0.5"
                >
                  <ArrowDown
                    size={14}
                    strokeWidth={2.4}
                    className="text-rom-cyan-bright icon-glow-sm"
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Footer telemetry */}
      <FooterTelemetry />
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Flow particle along an SVG path (SMIL animateMotion).
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
    <circle r="0.7" fill={color} opacity="0">
      <animate
        attributeName="opacity"
        values="0; 1; 1; 0"
        keyTimes="0; 0.1; 0.85; 1"
        dur="2.2s"
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
      <animateMotion
        path={d}
        dur="2.2s"
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
    </circle>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Node card — frame-less, vertical content layout.

function NodeCard({ node, index }: { node: NodeDef; index: number }) {
  const Icon = node.icon
  const isCyan = node.accent === 'cyan'
  const labelColor = isCyan ? 'text-rom-cyan-bright' : 'text-rom-green-bright'
  const iconBgClasses = isCyan
    ? 'bg-rom-cyan/[0.08] text-rom-cyan-bright'
    : 'bg-rom-green/[0.06] text-rom-green-bright'
  const ringColor = isCyan ? 'oklch(0.85 0.18 200)' : 'oklch(0.85 0.22 145)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.55,
        ease,
        delay: 0.35 + index * 0.12,
      }}
      className="relative"
    >
      <div
        className={`relative flex flex-col items-center text-center rounded-xl px-2.5 py-4 md:px-3 md:py-5 ${
          node.primary ? 'bg-rom-bg/60' : 'bg-rom-bg/40'
        }`}
        style={{
          boxShadow: node.primary
            ? `inset 0 0 0 1px ${ringColor}33, 0 0 28px ${ringColor}1a`
            : `inset 0 0 0 1px ${ringColor}1f`,
        }}
      >
        {/* Step index pill (top-right) */}
        <span className="absolute right-2 top-2 text-[8.5px] font-mono uppercase tracking-[0.22em] text-rom-fg-muted">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Icon plate */}
        <span
          className={`relative grid place-items-center rounded-lg ${iconBgClasses} ${
            node.primary ? 'size-12' : 'size-10'
          }`}
        >
          <Icon
            size={node.primary ? 22 : 18}
            strokeWidth={2}
            className="icon-glow-sm"
          />
          {/* Pulse ring on primary */}
          {node.primary && (
            <span
              aria-hidden
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{ boxShadow: `0 0 0 0 ${ringColor}66`, animation: 'pulse-rom 2.4s ease-in-out infinite' }}
            />
          )}
        </span>

        {/* Label */}
        <div
          className={`mt-3 micro-label font-mono text-[10px] md:text-[11px] tracking-[0.24em] ${labelColor}`}
        >
          {node.label}
        </div>

        {/* Telemetry */}
        <div className="mt-2 w-full min-h-[28px] flex items-center justify-center">
          <NodeContent node={node} />
        </div>
      </div>
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Per-node telemetry — switch on node.id.

function NodeContent({ node }: { node: NodeDef }) {
  if (node.id === 'you') return <Typewriter text={TYPING_TEXT} />
  if (node.id === 'claude') return <ClaudeStatus />
  if (node.id === 'rom') return <RomProgress />
  if (node.id === 'solana') return <SolanaSlot />
  if (node.id === 'wallet') return <WalletCounter />
  return null
}

function Typewriter({ text }: { text: string }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (i >= text.length) {
      const t = setTimeout(() => setI(0), 2200)
      return () => clearTimeout(t)
    }
    const ch = text[i] ?? ''
    const isPause = ch === ' '
    const delay = isPause ? 110 + Math.random() * 70 : 38 + Math.random() * 30
    const t = setTimeout(() => setI((v) => v + 1), delay)
    return () => clearTimeout(t)
  }, [i, text])

  return (
    <div className="text-[10.5px] md:text-[11px] font-mono text-rom-fg leading-tight px-1">
      <span className="text-rom-fg-muted">"</span>
      <span>{text.slice(0, i)}</span>
      <span className="inline-block w-[2px] h-[10px] bg-rom-green-bright align-middle ml-0.5 animate-pulse" />
      <span className="text-rom-fg-muted">"</span>
    </div>
  )
}

function ClaudeStatus() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-[10.5px] md:text-[11px] font-mono text-rom-fg-dim leading-tight">
        wires the API
      </div>
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1 rounded-full bg-rom-cyan-bright"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.18,
              ease,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function RomProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => (p >= 100 ? 0 : p + 1))
    }, 55)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="w-full px-1">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] md:text-[10.5px] font-mono text-rom-fg-dim">
          render
        </span>
        <span className="text-[10px] font-mono tabular-nums text-rom-green-bright">
          {pct}%
        </span>
      </div>
      <div className="mt-1 h-[2px] w-full bg-rom-bg/80 overflow-hidden rounded">
        <div
          className="h-full bg-gradient-to-r from-rom-green to-rom-cyan-bright"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function SolanaSlot() {
  const [slot, setSlot] = useState(287_492_103)
  useEffect(() => {
    const id = setInterval(() => setSlot((s) => s + 1), 420)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="text-[10px] md:text-[10.5px] font-mono text-rom-fg-dim leading-tight">
        slot
      </div>
      <div className="text-[10.5px] md:text-[11px] font-mono tabular-nums text-rom-cyan-bright leading-tight">
        {slot.toLocaleString()}
      </div>
    </div>
  )
}

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
    <div className="flex flex-col items-center gap-0.5">
      <div className="text-[10px] font-mono text-rom-fg-dim leading-tight">
        today
      </div>
      <div className="text-[14px] md:text-[15px] font-mono font-bold tabular-nums text-rom-green-bright text-glow leading-none">
        ${(cents / 100).toFixed(2)}
      </div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
function FooterTelemetry() {
  const [tps, setTps] = useState(2847)
  useEffect(() => {
    const id = setInterval(() => {
      setTps((v) =>
        Math.max(2200, Math.min(3400, v + Math.floor(-40 + Math.random() * 80)))
      )
    }, 700)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-6 md:px-8 py-4 border-t border-rom-green/15 bg-rom-bg/30">
      {[
        { l: 'Net latency', v: '0.4s' },
        { l: 'Solana TPS', v: tps.toLocaleString(), live: true },
        { l: 'Royalty', v: '100%' },
      ].map((m) => (
        <div key={m.l} className="flex items-baseline gap-2">
          <span className="micro-label font-mono text-[9.5px] tracking-[0.22em] text-rom-fg-muted">
            {m.l}
          </span>
          <span className="text-[12px] md:text-[13px] font-mono font-semibold text-rom-fg tabular-nums">
            {m.v}
          </span>
          {m.live && (
            <span className="size-1 rounded-full bg-rom-cyan-bright pulse-dot" />
          )}
        </div>
      ))}
    </div>
  )
}
