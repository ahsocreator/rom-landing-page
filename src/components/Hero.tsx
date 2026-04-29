import { motion } from 'framer-motion'
import { ArrowRight, Hexagon } from 'lucide-react'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { GlowIcon } from './ui/GlowIcon'
import { AssetImage } from './ui/AssetImage'
import { TiltFloat } from './ui/TiltFloat'
import { ScrambleText } from './ui/ScrambleText'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const lineage = [
  { tag: 'ORIGINAL', title: 'The Last Signal', author: '0xA1cF...7e3B', tone: 'green' as const },
  { tag: 'REMIX', title: 'Echoes of Tomorrow', author: '0xC91a...3d7C', tone: 'amber' as const },
  { tag: 'REMIX', title: 'New Horizons', author: '0xD3f2...8b1E', tone: 'cyan' as const },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[40%] grid-floor opacity-40" />

      <div className="relative mx-auto w-full max-w-[1800px] px-6 md:px-10 lg:px-16 pt-16 md:pt-20 pb-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT — IP narrative */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
            className="lg:col-span-5 xl:col-span-5"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease }}
            >
              <Badge>[ Make IP // Make Money // From Simple Code ]</Badge>
            </motion.div>

            <h1 className="mt-7 text-[44px] md:text-[60px] xl:text-[72px] leading-[0.96] font-mono font-bold tracking-[-0.025em] text-rom-fg">
              <RevealLine delay={0.18}>
                <ScrambleText text="Make IP." charset="binary" duration={950} startDelay={180} />
              </RevealLine>
              <RevealLine
                delay={0.32}
                className="gradient-text-arcade glitch-hover"
                dataText="Make money."
              >
                Make money.
              </RevealLine>
              <RevealLine delay={0.46}>
                <ScrambleText text="From simple code." charset={['hex', 'signal']} duration={1100} startDelay={460} />
              </RevealLine>
            </h1>

            <motion.p
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-7 max-w-[520px] text-[14.5px] md:text-[16px] leading-[1.6] text-rom-fg-dim"
            >
              Original characters that own their lineage and earn from every render. Solana-native, on-chain from the first call. ROM turns simple code into IP that pays.
            </motion.p>
            <motion.p
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.7, delay: 0.72 }}
              className="mt-4 max-w-[520px] text-[13.5px] md:text-[14.5px] leading-[1.7] font-mono text-rom-fg"
            >
              No stack. No contracts. <span className="gradient-text-arcade font-semibold">Code that earns.</span>
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, delay: 0.85, ease }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button variant="primary" className="magnetic">
                Start earning
                <ArrowRight size={16} strokeWidth={2.4} />
              </Button>
              <Button variant="ghost">Read the docs</Button>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-4"
            >
              {[
                ['1', 'call · live earning IP'],
                ['100%', 'on-chain · auto revenue split'],
                ['∞', 'characters · zero glue code'],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-[22px] md:text-[26px] font-mono font-bold text-rom-green text-glow leading-none">
                    {n}
                  </div>
                  <div className="mt-1.5 micro-label font-mono text-rom-fg-muted">{l}</div>
                </div>
              ))}
            </motion.div>

            {/* Footnote-style code snippet — the call is supporting detail, not the story */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, delay: 1.15, ease }}
              className="mt-8 max-w-[560px]"
            >
              <div className="micro-label font-mono text-[10px] tracking-[0.22em] text-rom-fg-muted mb-2">
                ↓ that's all the code it takes
              </div>
              <pre className="font-mono text-[12px] md:text-[13px] leading-relaxed text-rom-fg-dim rounded-xl border border-rom-border-dim bg-rom-bg/40 px-4 py-3 overflow-x-auto">
                <span className="text-rom-fg-dim">await </span>
                <span className="text-rom-green-bright">rom</span>
                <span className="text-rom-fg-dim">.</span>
                <span className="text-rom-cyan">create</span>
                <span className="text-rom-fg-dim">{"({ "}</span>
                <span className="text-rom-amber">seed</span>
                <span className="text-rom-fg-dim">: </span>
                <span className="text-rom-magenta">"Vela"</span>
                <span className="text-rom-fg-dim">{" })"}</span>
              </pre>
            </motion.div>
          </motion.div>

          {/* CENTER — ROM Asset card with 3D tilt + floating */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease }}
            className="lg:col-span-5 xl:col-span-5"
          >
            <TiltFloat>
              <MainAssetCard />
            </TiltFloat>
          </motion.div>

          {/* RIGHT — Lineage column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.4, ease }}
            className="lg:col-span-2 xl:col-span-2"
          >
            <LineageColumn />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function RevealLine({
  children,
  delay,
  className = '',
  dataText,
}: {
  children: React.ReactNode
  delay: number
  className?: string
  dataText?: string
}) {
  return (
    <span className="block reveal-mask">
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.8, delay, ease }}
        className={`block ${className}`}
        data-text={dataText}
      >
        {children}
      </motion.span>
    </span>
  )
}

function MainAssetCard() {
  return (
    <div data-cursor="scan" className="relative rounded-3xl border border-rom-green/55 bg-rom-card overflow-hidden border-glow">
      <div className="flex items-center justify-between px-5 md:px-6 py-3.5 border-b border-rom-green/20">
        <div className="flex items-center gap-2 text-rom-green">
          <span className="size-2 rounded-full bg-rom-green pulse-dot" />
          <span className="micro-label font-mono text-[11px] tracking-[0.18em]">ROM ASSET ℕ</span>
        </div>
        <span className="micro-label font-mono text-rom-green text-[11px] tracking-[0.14em]">
          ID: ROM_7x3f...9aE1
        </span>
      </div>

      <div className="px-5 md:px-6 pt-4 pb-3">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-rom-green/40 bg-rom-bg">
          <AssetImage seed="rom-last-signal-hero" alt="The Last Signal" className="size-full" />
        </div>
      </div>

      <div className="px-5 md:px-6 pt-2 pb-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[24px] md:text-[28px] font-mono font-semibold text-rom-green-bright leading-tight truncate">
            The Last Signal
          </h3>
          <p className="mt-1 text-[12px] font-mono text-rom-fg-muted">
            By <span className="text-rom-fg-dim">0xA1cF...7e3B</span> · 3 days ago
          </p>
        </div>
        <div className="grid size-11 place-items-center rounded-xl border border-rom-green/40 bg-rom-card-elevated flex-shrink-0">
          <GlowIcon icon={Hexagon} size={20} intensity="md" />
        </div>
      </div>

      <div className="grid grid-cols-3 border-t border-rom-green/30">
        {[
          { l: 'Scenes', v: '12' },
          { l: 'Duration', v: '01:32' },
          { l: 'Resolution', v: '1080p' },
        ].map((m, i) => (
          <div key={m.l} className={`px-5 md:px-6 py-3.5 ${i < 2 ? 'border-r border-rom-green/20' : ''}`}>
            <div className="micro-label font-mono text-rom-fg-muted text-[10px]">{m.l}</div>
            <div className="mt-1 text-[16px] md:text-[17px] font-mono font-semibold text-rom-fg">{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LineageColumn() {
  return (
    <div className="relative">
      <div className="micro-label font-mono text-rom-green mb-3 tracking-[0.22em]">Lineage</div>

      <div className="space-y-3">
        {lineage.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.12, ease }}
            className="relative rounded-2xl border border-rom-green/45 bg-rom-card p-3 hover:border-rom-green hover:bg-rom-card-hover transition-all"
          >
            <span aria-hidden className="hidden lg:block absolute right-full top-1/2 -translate-y-1/2 h-px w-4 xl:w-6 bg-gradient-to-r from-transparent to-rom-green/70" />
            <div className="flex items-start gap-3">
              <LineageThumb tone={it.tone} index={i} />
              <div className="min-w-0 flex-1">
                <div className="micro-label font-mono text-rom-green text-[10px] tracking-[0.22em]">{it.tag}</div>
                <div className="mt-1 text-[13px] font-mono font-semibold text-rom-fg leading-tight truncate">
                  {it.title}
                </div>
                <div className="mt-0.5 text-[10.5px] font-mono text-rom-fg-muted truncate">By {it.author}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <a
        href="#anatomy"
        className="mt-4 flex items-center justify-between rounded-2xl border border-rom-green/45 bg-rom-card px-3.5 py-3 hover:bg-rom-green/[0.06] transition-colors group"
      >
        <span className="micro-label font-mono text-rom-green tracking-[0.22em] text-[10.5px]">View Full Tree</span>
        <ArrowRight size={14} className="text-rom-green group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  )
}

function LineageThumb({ index }: { tone: 'green' | 'amber' | 'cyan'; index: number }) {
  const seeds = ['rom-lineage-1', 'rom-lineage-2', 'rom-lineage-3']
  return (
    <AssetImage
      seed={seeds[index] || `rom-l-${index}`}
      className="size-14 rounded-lg border border-rom-green/35 flex-shrink-0"
      intensity="hard"
    />
  )
}
