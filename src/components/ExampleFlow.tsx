import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { AssetImage } from './ui/AssetImage'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
const PROMPT_TEXT = 'Cyberpunk Frog Trader'

export function ExampleFlow() {
  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-10 2xl:px-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease }}
        className="w-full max-w-[1800px] mx-auto border border-rom-border-dim/40 rounded-2xl p-6 md:p-8 bg-[#020503] relative overflow-hidden"
      >
        {/* Subtle horizontal scan-line sweep across the whole card */}
        <motion.div
          aria-hidden
          className="absolute inset-y-0 w-[40%] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, oklch(0.85 0.22 145 / 0.05) 50%, transparent 100%)',
            mixBlendMode: 'screen',
          }}
          initial={{ x: '-50%' }}
          animate={{ x: '250%' }}
          transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatDelay: 3 }}
        />

        {/* Header — title + live indicator */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-3">
          <h3 className="text-rom-green font-mono text-lg md:text-xl tracking-[0.1em] uppercase font-semibold">
            Example: Cyberpunk Frog Trader
          </h3>
          <div className="flex items-center gap-2 text-rom-green">
            <span className="size-1.5 rounded-full bg-rom-green pulse-dot" />
            <span className="micro-label font-mono text-[10px] tracking-[0.24em]">
              PIPELINE · LIVE
            </span>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row w-full gap-2 lg:gap-3 2xl:gap-4 items-center xl:items-start justify-between">
          <Step index={0} className="xl:w-[13%]" title="1. You Prompt">
            <PromptStep />
          </Step>

          <FlowArrow index={0} />

          <Step index={1} className="xl:w-[22%]" title="2. ROM Structures It">
            <StructureStep />
          </Step>

          <FlowArrow index={1} />

          <Step index={2} className="xl:w-[24%]" title="3. AI Generates">
            <GenerateStep />
          </Step>

          <FlowArrow index={2} />

          <Step index={3} className="xl:w-[13%]" title="4. Mint on Solana">
            <MintStep />
          </Step>

          <FlowArrow index={3} />

          <Step index={4} className="xl:w-[15%]" title="5. Community Evolves">
            <CommunityStep />
          </Step>

          <FlowArrow index={4} />

          <Step index={5} className="xl:w-[13%]" title="6. You Earn">
            <EarnStep />
          </Step>
        </div>
      </motion.div>
    </section>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Generic step shell — entrance stagger + responsive sizing.
function Step({
  index,
  title,
  className = '',
  children,
}: {
  index: number
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease, delay: 0.15 + index * 0.1 }}
      className={`flex flex-col gap-3 w-full max-w-[400px] xl:max-w-none ${className}`}
    >
      <h4 className="text-white font-sans text-sm xl:text-[11px] 2xl:text-sm tracking-widest uppercase whitespace-nowrap font-semibold">
        {title}
      </h4>
      {children}
    </motion.div>
  )
}

// Connector arrow with flowing pulse — staggered entrance per index.
function FlowArrow({ index }: { index: number }) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, ease, delay: 0.3 + index * 0.1 }}
      className="text-rom-green text-lg font-mono rotate-90 xl:rotate-0 my-2 xl:mt-[6.5rem] 2xl:mt-[8.5rem] shrink-0 relative"
    >
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease,
          delay: index * 0.25,
        }}
        className="inline-block"
      >
        →
      </motion.span>
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Step 1 — typewriter on "Cyberpunk Frog Trader" with blinking cursor
function PromptStep() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (i >= PROMPT_TEXT.length) {
      const t = setTimeout(() => setI(0), 2500)
      return () => clearTimeout(t)
    }
    const ch = PROMPT_TEXT[i] ?? ''
    const isPause = ch === ' '
    const delay = isPause ? 130 + Math.random() * 60 : 50 + Math.random() * 35
    const t = setTimeout(() => setI((v) => v + 1), delay)
    return () => clearTimeout(t)
  }, [i])

  return (
    <div className="h-48 xl:h-[220px] 2xl:h-[280px] border border-rom-border/50 rounded-xl bg-[#040a06] p-4 flex items-center justify-start relative overflow-hidden">
      {/* Faint scan grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(oklch(0.85 0.22 145) 1px, transparent 1px)',
          backgroundSize: '100% 12px',
        }}
      />
      <span className="text-rom-green text-sm xl:text-[11px] 2xl:text-sm font-mono leading-relaxed pl-2 relative">
        {'> '}
        <span>{PROMPT_TEXT.slice(0, i)}</span>
        <span className="inline-block w-[7px] h-[1em] bg-rom-green-bright align-middle ml-0.5 animate-pulse" />
      </span>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Step 2 — character image with glow + staggered trait reveal
function StructureStep() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  const traits = [
    { l: 'Character', v: 'Frog Trader' },
    { l: 'World', v: 'Cyberpunk City' },
    { l: 'Traits', v: 'Bold, Greedy, Visionary' },
    { l: 'Episodes', v: '4' },
  ]

  return (
    <div
      ref={ref}
      className="h-48 xl:h-[220px] 2xl:h-[280px] border border-rom-border/50 rounded-xl bg-[#040a06] p-3 flex gap-3 2xl:gap-4 relative overflow-hidden"
    >
      <div className="h-full w-[45%] xl:w-[45%] rounded-lg overflow-hidden border border-rom-green/20 shrink-0 relative">
        <AssetImage seed="frog-trader" alt="Frog" className="w-full h-full object-cover" />
        {/* Pulsing border glow on the character */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{
            boxShadow: [
              '0 0 0 0 oklch(0.85 0.22 145 / 0.0) inset',
              '0 0 18px 2px oklch(0.85 0.22 145 / 0.35) inset',
              '0 0 0 0 oklch(0.85 0.22 145 / 0.0) inset',
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease }}
        />
      </div>
      <div className="flex flex-col justify-center gap-2 2xl:gap-3 text-[10px] 2xl:text-xs font-sans text-rom-fg-dim overflow-hidden flex-1">
        {traits.map((t, idx) => (
          <motion.p
            key={t.l}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.45, ease, delay: 0.2 + idx * 0.15 }}
            className="truncate"
          >
            <span className="text-rom-green">{t.l}:</span> {t.v}
          </motion.p>
        ))}
      </div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Step 3 — 3 frames cross-fade between candidates + animated waveform
function GenerateStep() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.3 })

  // Waveform bar heights — deterministic per index, animated per RAF
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setTick((t) => t + 1), 90)
    return () => clearInterval(id)
  }, [inView])

  return (
    <div
      ref={ref}
      className="h-48 xl:h-[220px] 2xl:h-[280px] border border-rom-border/50 rounded-xl bg-[#040a06] p-3 flex flex-col justify-between relative overflow-hidden"
    >
      <div className="flex gap-2 h-[75%] w-full">
        <motion.div
          className="flex-1 rounded overflow-hidden"
          animate={{ opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity, ease, delay: 0 }}
        >
          <AssetImage seed="frog-1" alt="g1" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          className="flex-1 rounded overflow-hidden border border-rom-green/40 relative"
          animate={{
            boxShadow: [
              '0 0 0 0 oklch(0.85 0.22 145 / 0)',
              '0 0 22px 2px oklch(0.85 0.22 145 / 0.5)',
              '0 0 0 0 oklch(0.85 0.22 145 / 0)',
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease }}
        >
          <AssetImage seed="frog-2" alt="g2" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease }}
              className="size-8 2xl:size-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center"
            >
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-[2px]"></div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="flex-1 rounded overflow-hidden"
          animate={{ opacity: [0.65, 0.4, 0.65] }}
          transition={{ duration: 2.6, repeat: Infinity, ease, delay: 1.3 }}
        >
          <AssetImage seed="frog-3" alt="g3" className="w-full h-full object-cover" />
        </motion.div>
      </div>
      {/* Animated waveform — heights drift with `tick` for an "audio playing" feel */}
      <div className="flex items-end justify-between px-1 h-[20%] opacity-90 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => {
          // Sinusoidal + per-bar offset gives organic motion
          const phase = tick * 0.18 + i * 0.5
          const h = 35 + Math.abs(Math.sin(phase)) * 55 + Math.abs(Math.sin(phase * 1.7)) * 10
          return (
            <div
              key={i}
              className="w-[2px] 2xl:w-[3px] bg-rom-green rounded-full"
              style={{ height: `${Math.min(100, h)}%` }}
            />
          )
        })}
      </div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Step 4 — NFT card with shimmer sweep + "MINTED" stamp slide-in
function MintStep() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <div
      ref={ref}
      className="h-48 xl:h-[220px] 2xl:h-[280px] border border-rom-green/40 rounded-xl bg-[#040a06] p-3 flex flex-col justify-center items-center relative box-shadow-glow overflow-hidden"
    >
      {/* Shimmer sweep across the card */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(115deg, transparent 30%, oklch(0.92 0.24 145 / 0.18) 50%, transparent 70%)',
        }}
        initial={{ x: '-100%' }}
        animate={inView ? { x: '120%' } : { x: '-100%' }}
        transition={{ duration: 1.4, ease, delay: 0.3 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.55, ease, delay: 0.1 }}
        className="w-[85%] aspect-square xl:aspect-[4/5] rounded-md mb-2 overflow-hidden border border-rom-green/30 relative"
      >
        <AssetImage seed="frog-card" alt="Card" className="w-full h-full object-cover" />
        {/* MINTED stamp — slides + rotates in once on view */}
        <motion.div
          initial={{ opacity: 0, scale: 1.4, rotate: -25 }}
          animate={
            inView
              ? { opacity: 1, scale: 1, rotate: -12 }
              : { opacity: 0, scale: 1.4, rotate: -25 }
          }
          transition={{ duration: 0.45, ease, delay: 0.85, type: 'spring', stiffness: 220 }}
          className="absolute right-1 top-1 px-1.5 py-0.5 rounded border border-rom-green/80 bg-rom-bg/70 backdrop-blur text-[7.5px] 2xl:text-[8.5px] font-mono uppercase tracking-[0.18em] text-rom-green-bright"
        >
          MINTED
        </motion.div>
      </motion.div>

      <p className="text-[10px] 2xl:text-xs text-white text-center leading-tight font-sans mt-2 relative">
        Cyberpunk
        <br />
        Frog Trader
      </p>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease }}
        className="absolute bottom-2 left-3 text-[9px] 2xl:text-[10px] text-rom-fg-dim font-mono"
      >
        #0001
      </motion.div>

      {/* Solana Logo with subtle gradient pulse */}
      <motion.div
        animate={{ filter: ['brightness(1)', 'brightness(1.4)', 'brightness(1)'] }}
        transition={{ duration: 2.6, repeat: Infinity, ease }}
        className="absolute bottom-2 right-3"
      >
        <svg viewBox="0 0 120 95" className="h-2.5 2xl:h-3 w-auto" aria-hidden>
          <defs>
            <linearGradient id="sol-grad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14F195" />
              <stop offset="100%" stopColor="#9945FF" />
            </linearGradient>
          </defs>
          <path
            d="M93.94 75.15H1.81c-1.65 0-2.49-2-1.32-3.18L18.93 53.4a2 2 0 0 1 1.41-.59h92.13c1.65 0 2.49 2 1.32 3.18L95.35 74.56a2 2 0 0 1-1.41.59zM18.93 1.34A2 2 0 0 1 20.34.75h92.13c1.65 0 2.49 2 1.32 3.18L95.35 22.51a2 2 0 0 1-1.41.59H1.81c-1.65 0-2.49-2-1.32-3.18L18.93 1.34zM95.35 37.39a2 2 0 0 0-1.41-.59H1.81c-1.65 0-2.49 2-1.32 3.18L18.93 58.55a2 2 0 0 0 1.41.59h92.13c1.65 0 2.49-2 1.32 3.18L95.35 37.39z"
            fill="url(#sol-grad3)"
          />
        </svg>
      </motion.div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Step 5 — Community Evolves: floating nodes, glowing halos, ambient
// particles, drawn-in connection web. Mix of green + cyan accents for vivid
// depth. Nodes bob in place independently so the field feels alive.
const COMMUNITY_BOB_EASE = [0.45, 0.05, 0.55, 0.95] as [number, number, number, number]

function CommunityStep() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  const nodes = [
    {
      id: 1, seed: 'f1', accent: 'green' as const,
      pos: { top: '8%', left: '14%' }, size: 'size-8 2xl:size-10',
      bobY: 6, bobDur: 3.6, bobDelay: 0, glow: 14, ringDelay: 0,
    },
    {
      id: 2, seed: 'f2', accent: 'cyan' as const,
      pos: { top: '34%', right: '6%' }, size: 'size-10 2xl:size-12',
      bobY: 8, bobDur: 4.2, bobDelay: 0.6, glow: 22, ringDelay: 0.4,
    },
    {
      id: 3, seed: 'f3', accent: 'green' as const,
      pos: { bottom: '12%', left: '22%' }, size: 'size-9 2xl:size-11',
      bobY: 7, bobDur: 3.9, bobDelay: 1.1, glow: 18, ringDelay: 0.8,
    },
    {
      id: 4, seed: 'f4', accent: 'cyan' as const,
      pos: { bottom: '6%', right: '36%' }, size: 'size-6 2xl:size-7',
      bobY: 5, bobDur: 4.7, bobDelay: 1.6, glow: 12, ringDelay: 1.2,
    },
    {
      id: 5, seed: 'f5', accent: 'green' as const,
      pos: { top: '52%', left: '4%' }, size: 'size-5 2xl:size-7',
      bobY: 5, bobDur: 5.0, bobDelay: 2.1, glow: 10, ringDelay: 1.6,
    },
  ]

  // Lines connect node anchor positions (% of container). Floats are small
  // so the lines stay visually attached to the nodes throughout the bob.
  const center = (n: (typeof nodes)[number]) => {
    const x =
      'left' in n.pos
        ? parseFloat(n.pos.left as string)
        : 100 - parseFloat(n.pos.right as string)
    const y =
      'top' in n.pos
        ? parseFloat(n.pos.top as string)
        : 100 - parseFloat(n.pos.bottom as string)
    return { x, y }
  }

  const lines = [
    { from: 1, to: 2, delay: 0.3 },
    { from: 2, to: 3, delay: 0.5 },
    { from: 3, to: 1, delay: 0.7 },
    { from: 2, to: 4, delay: 0.9 },
    { from: 3, to: 4, delay: 1.1 },
    { from: 5, to: 1, delay: 1.3 },
    { from: 5, to: 3, delay: 1.5 },
  ]

  return (
    <div
      ref={ref}
      className="h-48 xl:h-[220px] 2xl:h-[280px] border border-rom-border/50 rounded-xl bg-[#040a06] p-3 flex items-center justify-center relative overflow-hidden"
    >
      {/* Ambient drift particles — give the empty space a "living" feel */}
      <AmbientParticles inView={inView} />

      <div className="relative w-full h-full">
        {/* Connection web — lines draw in via stroke-dashoffset */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="comm-line-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.22 145 / 0.55)" />
              <stop offset="100%" stopColor="oklch(0.85 0.18 200 / 0.55)" />
            </linearGradient>
          </defs>
          {lines.map((l, i) => {
            const a = nodes.find((n) => n.id === l.from)!
            const b = nodes.find((n) => n.id === l.to)!
            const ca = center(a)
            const cb = center(b)
            return (
              <motion.line
                key={i}
                x1={ca.x}
                y1={ca.y}
                x2={cb.x}
                y2={cb.y}
                stroke="url(#comm-line-grad)"
                strokeWidth="0.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  inView
                    ? { pathLength: 1, opacity: 0.85 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 0.85, ease, delay: l.delay }}
              />
            )
          })}
        </svg>

        {/* Floating nodes */}
        {nodes.map((n) => {
          const halo =
            n.accent === 'cyan'
              ? 'oklch(0.85 0.18 200 / 0.55)'
              : 'oklch(0.85 0.22 145 / 0.55)'
          const ring =
            n.accent === 'cyan'
              ? 'oklch(0.85 0.18 200 / 0.7)'
              : 'oklch(0.85 0.22 145 / 0.7)'
          const border =
            n.accent === 'cyan' ? 'border-rom-cyan-bright/70' : 'border-rom-green/70'
          return (
            <div key={n.id} className="absolute" style={n.pos}>
              <motion.div
                className={`relative ${n.size} rounded-full border-[1.5px] ${border} bg-black z-10 overflow-hidden`}
                style={{ boxShadow: `0 0 ${n.glow}px ${halo}` }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  inView
                    ? { opacity: 1, scale: 1, y: [0, -n.bobY, 0] }
                    : { opacity: 0, scale: 0.5, y: 0 }
                }
                transition={{
                  opacity: { duration: 0.55, delay: 0.15 + n.id * 0.08, ease },
                  scale: { duration: 0.55, delay: 0.15 + n.id * 0.08, ease },
                  y: {
                    duration: n.bobDur,
                    delay: 0.6 + n.bobDelay,
                    repeat: Infinity,
                    ease: COMMUNITY_BOB_EASE,
                  },
                }}
              >
                <AssetImage seed={n.seed} alt="" className="w-full h-full object-cover" />
                {/* Concentric ping ring */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full pointer-events-none border-[1.5px]"
                  style={{ borderColor: ring }}
                  animate={{ scale: [1, 1.7, 1.7], opacity: [0.7, 0, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease,
                    delay: n.ringDelay,
                  }}
                />
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// 12 small drift particles, mixed green+cyan, drift up + sideways.
function AmbientParticles({ inView }: { inView: boolean }) {
  // Stable random per render — useMemo would also work; this re-runs only
  // when the parent re-renders (rare for this tile).
  const particles = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.7 + Math.random() * 1.3,
      driftY: 6 + Math.random() * 10,
      driftX: -3 + Math.random() * 6,
      duration: 7 + Math.random() * 7,
      delay: -Math.random() * 12,
      accent: Math.random() > 0.55 ? 'cyan' : 'green',
    }))
  ).current

  return (
    <>
      {particles.map((p) => {
        const color =
          p.accent === 'cyan' ? 'oklch(0.92 0.20 200)' : 'oklch(0.92 0.24 145)'
        return (
          <motion.span
            key={p.id}
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: color,
              boxShadow: `0 0 ${p.size * 4}px ${color}`,
            }}
            initial={{ opacity: 0 }}
            animate={
              inView
                ? {
                    y: [0, -p.driftY, 0],
                    x: [0, p.driftX, 0],
                    opacity: [0.15, 0.65, 0.15],
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: COMMUNITY_BOB_EASE,
            }}
          />
        )
      })}
    </>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Step 6 — count-up SOL value + animated chart line draw
function EarnStep() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const target = 12.47
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const dur = 1600
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView])

  return (
    <div
      ref={ref}
      className="h-48 xl:h-[220px] 2xl:h-[280px] border border-rom-border/50 rounded-xl bg-[#040a06] p-4 flex flex-col justify-start items-center text-center relative overflow-hidden"
    >
      <p className="text-[10px] 2xl:text-[11px] text-white font-sans uppercase tracking-widest mb-2 mt-4 xl:mt-8 opacity-90 font-semibold">
        Royalties Earned
      </p>
      <p className="text-2xl 2xl:text-3xl font-sans text-rom-green font-bold tracking-tight tabular-nums">
        {val.toFixed(2)} SOL
      </p>

      <div className="absolute bottom-3 left-0 right-0 h-16 2xl:h-20 px-3 opacity-95">
        <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad-graph" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FF78" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="grad-graph-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00FF78" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#00FF78" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#9CFFCB" stopOpacity="1" />
            </linearGradient>
            {/* Path used for the filled area (curve + bottom corners back to baseline) */}
            <path
              id="earn-curve-fill"
              d="M0,30 C4,29 6,25 10,25 C14,25 16,35 20,35 C28,35 32,15 40,15 C44,15 46,20 50,20 C58,20 62,5 70,5 C76,5 79,15 85,15 C92,15 95,2 100,0 L100,40 L0,40 Z"
            />
            {/* Path used for the line (just the curve) — also serves as the
                tracer dot's motion path. */}
            <path
              id="earn-curve-line"
              d="M0,30 C4,29 6,25 10,25 C14,25 16,35 20,35 C28,35 32,15 40,15 C44,15 46,20 50,20 C58,20 62,5 70,5 C76,5 79,15 85,15 C92,15 95,2 100,0"
              fill="none"
            />
          </defs>

          {/* Filled gradient area — fades in once line is drawn */}
          <motion.use
            href="#earn-curve-fill"
            fill="url(#grad-graph)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.32 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.2 }}
          />

          {/* Soft glow under the line */}
          <motion.use
            href="#earn-curve-line"
            stroke="#00FF78"
            strokeWidth="4"
            strokeOpacity="0.18"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.2 }}
          />

          {/* Line — draws in with a gradient stroke, then idles */}
          <motion.use
            href="#earn-curve-line"
            stroke="url(#grad-graph-line)"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.2 }}
          />

          {/* Tracer dot — continuously walks along the curve once it's drawn.
              Uses SMIL animateMotion via mpath referencing the line path. */}
          <circle r="1.4" fill="#9CFFCB" filter="url(#earn-tip-glow)">
            <animate
              attributeName="opacity"
              values="0; 1; 1; 0"
              keyTimes="0; 0.05; 0.95; 1"
              dur="3.4s"
              begin="1.7s"
              repeatCount="indefinite"
            />
            <animateMotion dur="3.4s" begin="1.7s" repeatCount="indefinite">
              <mpath href="#earn-curve-line" />
            </animateMotion>
          </circle>

          <filter id="earn-tip-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pulsing dot anchored at the line's tip (final value) */}
          <motion.circle
            cx="100"
            cy="0"
            r="1.6"
            fill="#9CFFCB"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: [0, 1, 1], scale: [0, 1.4, 1] } : { opacity: 0 }}
            transition={{ duration: 0.6, ease, delay: 1.6 }}
          />
          {/* Outer pulse ring on the tip */}
          <motion.circle
            cx="100"
            cy="0"
            r="2.4"
            fill="none"
            stroke="#00FF78"
            strokeWidth="0.6"
            initial={{ opacity: 0 }}
            animate={
              inView
                ? { opacity: [0, 0.7, 0], r: [2.4, 5, 5] }
                : { opacity: 0 }
            }
            transition={{
              duration: 2,
              ease,
              delay: 1.8,
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
          />
        </svg>
      </div>
    </div>
  )
}
