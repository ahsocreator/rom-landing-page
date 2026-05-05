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
// Step 5 — connection lines draw in + nodes pulse + new connections appear
function CommunityStep() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  const lines = [
    { x1: '25%', y1: '10%', x2: '85%', y2: '45%', delay: 0.2 },
    { x1: '85%', y1: '45%', x2: '40%', y2: '85%', delay: 0.4 },
    { x1: '40%', y1: '85%', x2: '25%', y2: '10%', delay: 0.6 },
    { x1: '85%', y1: '45%', x2: '70%', y2: '90%', delay: 0.8 },
    { x1: '40%', y1: '85%', x2: '70%', y2: '90%', delay: 1.0 },
  ]

  const nodes = [
    { className: 'top-[5%] left-[15%] size-6 2xl:size-8', seed: 'f1', opacity: 'opacity-60', delay: 0.15 },
    { className: 'top-[35%] right-[5%] size-8 2xl:size-10', seed: 'f2', opacity: '', delay: 0.25, glow: true },
    { className: 'bottom-[10%] left-[25%] size-7 2xl:size-9', seed: 'f3', opacity: 'opacity-80', delay: 0.35 },
    { className: 'bottom-[5%] right-[40%] size-5 2xl:size-6', seed: 'f4', opacity: 'opacity-50', delay: 0.45 },
  ]

  return (
    <div
      ref={ref}
      className="h-48 xl:h-[220px] 2xl:h-[280px] border border-rom-border/50 rounded-xl bg-[#040a06] p-3 flex items-center justify-center relative overflow-hidden"
    >
      <div className="relative w-full h-[80%] max-w-[120px] 2xl:max-w-[150px] mx-auto xl:max-w-none">
        {nodes.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.45, ease, delay: n.delay }}
            className={`absolute ${n.className} rounded-full border border-rom-green bg-black z-10 overflow-hidden ${
              n.glow ? 'shadow-[0_0_12px_rgba(0,255,120,0.4)]' : ''
            }`}
          >
            <AssetImage seed={n.seed} alt="f" className={`w-full h-full object-cover ${n.opacity}`} />
            {/* Pulse ring */}
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full pointer-events-none border border-rom-green/60"
              animate={{ scale: [1, 1.4, 1.4], opacity: [0.7, 0, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease,
                delay: i * 0.4,
              }}
            />
          </motion.div>
        ))}
        <svg className="absolute inset-0 w-full h-full" stroke="rgba(0,255,120,0.4)" strokeWidth="1.5">
          {lines.map((l, i) => (
            <motion.line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease, delay: l.delay }}
            />
          ))}
        </svg>
      </div>
    </div>
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

      <div className="absolute bottom-3 left-0 right-0 h-16 2xl:h-20 px-3 opacity-90">
        <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad-graph" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FF78" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {/* Filled area — fades in after line draws */}
          <motion.path
            d="M0,30 L10,25 L20,35 L40,15 L50,20 L70,5 L85,15 L100,0 L100,40 L0,40 Z"
            fill="url(#grad-graph)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.25 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.2 }}
          />
          {/* Line — draws in */}
          <motion.path
            d="M0,30 L10,25 L20,35 L40,15 L50,20 L70,5 L85,15 L100,0"
            fill="none"
            stroke="rgba(0,255,120,0.85)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.2 }}
          />
          {/* Tip pulse on the final point */}
          <motion.circle
            cx="100"
            cy="0"
            r="2"
            fill="#00FF78"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: [0, 1, 1], scale: [0, 1.4, 1] } : { opacity: 0 }}
            transition={{ duration: 0.6, ease, delay: 1.6 }}
          />
        </svg>
      </div>
    </div>
  )
}
