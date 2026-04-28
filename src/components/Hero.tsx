import { motion } from 'framer-motion'
import { Film, Sparkles, Globe2, ArrowRight, Play, ImageIcon, Command, Activity, Hexagon } from 'lucide-react'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { GlowIcon } from './ui/GlowIcon'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden min-h-[100svh] flex flex-col">
      {/* hero-only grid floor */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[40%] grid-floor opacity-40" />

      <div className="relative flex-1 mx-auto w-full max-w-[1800px] px-6 md:px-10 lg:px-16 pt-20 md:pt-28 pb-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT — Manifesto, 7 cols, asymmetric */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
            className="lg:col-span-7"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease }}
            >
              <Badge>[ Build IP // Build Story // Build Money ]</Badge>
            </motion.div>

            <h1 className="mt-8 display-1 font-mono text-rom-fg">
              <RevealLine delay={0.18}>Your IP.</RevealLine>
              <RevealLine
                delay={0.32}
                className="gradient-text-arcade glitch-hover"
                dataText="Your story."
              >
                Your story.
              </RevealLine>
              <RevealLine delay={0.48}>Your money.</RevealLine>
            </h1>

            <motion.p
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.7, delay: 0.62 }}
              className="mt-8 max-w-[560px] text-[15px] md:text-[17px] leading-[1.55] text-rom-fg-dim"
            >
              ROM is the protocol for owning IP. Drop a character. Lock the canonical look. Spin out a franchise. Every drop is yours, every license earns you.
            </motion.p>

            <motion.p
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.7, delay: 0.72 }}
              className="mt-5 max-w-[540px] text-[13.5px] leading-[1.7] text-rom-fg-muted"
            >
              Studios used to gatekeep IP. Platforms used to keep the upside. ROM hands both back.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, delay: 0.85, ease }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button variant="primary" className="magnetic">
                Start your IP
                <ArrowRight size={16} strokeWidth={2.4} />
              </Button>
              <Button variant="secondary" className="magnetic">
                See it work
                <Play size={14} strokeWidth={2} />
              </Button>
              <span className="hidden sm:inline-flex items-center gap-2 ml-2 text-rom-fg-muted">
                <span className="micro-label font-mono">or</span>
                <kbd className="inline-flex items-center gap-1.5 rounded-md border border-rom-green/30 bg-rom-card px-2.5 py-1.5 text-[11px] font-mono text-rom-green">
                  <Command size={11} strokeWidth={2.4} /> K
                </kbd>
              </span>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="mt-12 flex flex-wrap gap-x-10 gap-y-5"
            >
              {[
                ['1', 'character locks the IP'],
                ['25', 'credits per drop · refund on fail'],
                ['6', 'revenue formats · ∞ drops'],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-[28px] md:text-[34px] font-mono font-bold text-rom-green text-glow leading-none">
                    {n}
                  </div>
                  <div className="mt-2 micro-label font-mono text-rom-fg-muted">{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — IP slot, 5 cols, with bleed */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, delay: 0.32, ease }}
            className="lg:col-span-5 lg:-mr-6 xl:-mr-12"
          >
            <HeroSlate />
          </motion.div>
        </div>
      </div>

      {/* Bottom status bar — hero anchor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2, ease }}
        className="relative mx-auto w-full max-w-[1800px] px-6 md:px-10 lg:px-16 pb-6"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-rom-green/20 pt-4 text-rom-green">
          <span className="flex items-center gap-2 micro-label font-mono">
            <span className="size-1.5 rounded-full bg-rom-green pulse-dot" />
            Mainnet Live
          </span>
          <span className="micro-label font-mono text-rom-fg-muted">·</span>
          <span className="micro-label font-mono">Block 304_991_402</span>
          <span className="micro-label font-mono text-rom-fg-muted">·</span>
          <span className="micro-label font-mono">14_237 IPs locked</span>
          <span className="micro-label font-mono text-rom-fg-muted">·</span>
          <span className="micro-label font-mono">2.4M drops shipped</span>
          <span className="ml-auto micro-label font-mono text-rom-fg-muted">v1.0.0 · uptime 99.97%</span>
        </div>
      </motion.div>
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

function HeroSlate() {
  return (
    <div className="relative">
      {/* Outer holo ring */}
      <div className="relative rounded-[24px] holo-frame">
        <div className="relative aspect-[5/6] lg:aspect-[4/5] overflow-hidden rounded-[24px] border border-rom-green/50 bg-rom-card">
          <div className="absolute inset-0 grid-floor opacity-30" />

          {/* Top header bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-rom-green/25 px-4 py-3 micro-label font-mono">
            <div className="flex items-center gap-2 text-rom-green">
              <span className="size-1.5 rounded-full bg-rom-green pulse-dot" />
              <span>IP_LOCKED · Series_001</span>
            </div>
            <span className="text-rom-green">ROM_7x3f...9aE1</span>
          </div>

          {/* Drop in your IP — center */}
          <div className="absolute inset-0 flex items-center justify-center px-8 pt-12 pb-32">
            <div className="relative w-full max-w-[78%] aspect-[3/4]">
              <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-rom-green/45 bg-rom-card flex flex-col items-center justify-center text-center px-6">
                <GlowIcon icon={ImageIcon} size={36} intensity="lg" />
                <p className="mt-3 micro-label font-mono text-rom-green">
                  Drop your IP
                </p>
                <p className="mt-2 text-[11px] font-mono leading-[1.55] text-rom-fg-muted max-w-[260px]">
                  Character. Look. Voice. Locked as a canonical record on Solana.
                </p>
              </div>
              {/* corner brackets */}
              <span className="absolute -left-2 -top-2 size-4 border-l border-t border-rom-green" />
              <span className="absolute -right-2 -top-2 size-4 border-r border-t border-rom-green" />
              <span className="absolute -left-2 -bottom-2 size-4 border-l border-b border-rom-green" />
              <span className="absolute -right-2 -bottom-2 size-4 border-r border-b border-rom-green" />
            </div>
          </div>

          {/* Lower readout strip */}
          <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2">
            {[
              { l: 'Drops', v: '042' },
              { l: 'Royalty 24h', v: '0.42 SOL' },
              { l: 'Drift', v: '0.00%' },
            ].map((m) => (
              <div key={m.l} className="rounded-lg border border-rom-green/30 bg-rom-card px-3 py-2">
                <div className="micro-label font-mono text-rom-fg-muted text-[9px]">{m.l}</div>
                <div className="mt-0.5 text-[12px] font-mono font-bold text-rom-green">{m.v}</div>
              </div>
            ))}
          </div>

          {/* Top-right ID chip */}
          <div className="absolute right-4 top-14 px-2 py-1 rounded-md border border-rom-green/40 bg-rom-card micro-label font-mono text-rom-green flex items-center gap-1.5">
            <Hexagon size={10} className="icon-glow-sm text-rom-green" />
            CHAR_VELA
          </div>
        </div>
      </div>

      {/* Floating lineage chip */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-3 -bottom-4 z-10 hidden md:block"
      >
        <div className="rounded-xl border border-rom-green/45 bg-rom-card px-3 py-2 shadow-[0_8px_30px_oklch(0.85_0.22_145/0.18)]">
          <div className="micro-label font-mono text-rom-fg-muted text-[9px]">Lineage</div>
          <div className="mt-1 flex items-center gap-1.5">
            {[Film, Sparkles, Globe2].map((Icon, i) => (
              <div key={i} className="grid size-7 place-items-center rounded-md border border-rom-green/30 bg-rom-card">
                <GlowIcon icon={Icon} size={12} intensity="md" />
              </div>
            ))}
            <span className="ml-1 micro-label font-mono text-rom-green text-[10px]">+39</span>
          </div>
        </div>
      </motion.div>

      {/* Floating live earnings chip */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute -right-2 -top-3 z-10 hidden md:block"
      >
        <div className="rounded-xl border border-rom-green/45 bg-rom-card px-3 py-2 shadow-[0_8px_30px_oklch(0.85_0.22_145/0.18)]">
          <div className="flex items-center gap-2 micro-label font-mono text-rom-green">
            <Activity size={11} className="icon-glow-pulse" strokeWidth={2.4} />
            +0.42 SOL today
          </div>
        </div>
      </motion.div>
    </div>
  )
}
