import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Sparkles, Wand2, Zap, Coins, ArrowDown } from 'lucide-react'

// Horizontal animated system flow for the hero.
// 5 nodes in a row: YOU → CLAUDE → ROM → SOLANA → WALLET.
// SVG connectors with flowing particles between nodes (desktop only).
// Mobile: vertical stack with ↓ arrows between cards.

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

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
      className="relative"
    >
      {/* Header */}


      {/* Diagram canvas */}
      <div className="relative px-4 md:px-8 py-10 md:py-14">
        {/* Schematic grid background */}


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
      <div className="relative flex flex-col items-center text-center px-2.5 py-2 md:px-3">
        {/* Step index pill (top-right) */}


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


      </div>
    </motion.div>
  )
}

