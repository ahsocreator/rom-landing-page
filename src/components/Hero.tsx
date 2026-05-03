import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Hexagon, Zap } from 'lucide-react'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { GlowIcon } from './ui/GlowIcon'
import { AssetImage } from './ui/AssetImage'
import { TiltFloat } from './ui/TiltFloat'
import { ScrambleText } from './ui/ScrambleText'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

// Lineage = on-chain episode chain. Each entry carries a Solana tx hash
// and an episode number — no abstract "REMIX" tags.
const lineage = [
  { tag: 'EP_001', title: 'The Last Signal', tx: '5xN9...e7Aq', tone: 'green' as const },
  { tag: 'EP_002', title: 'Echoes of Tomorrow', tx: '8mP2...f3Cd', tone: 'amber' as const },
  { tag: 'EP_003', title: 'New Horizons', tx: 'kQ4w...a1Bc', tone: 'cyan' as const },
]

// Live revenue feed for the asset card — rotates every 2.4s.
const liveEvents = [
  { id: 0, label: 'Render · TikTok 9:16', tx: '7xN9...e7Aq', amount: '+ ◎ 0.012', usd: '$0.04' },
  { id: 1, label: 'Render · YouTube 16:9', tx: '8mP2...f3Cd', amount: '+ ◎ 0.025', usd: '$0.09' },
  { id: 2, label: 'License · Brand spot', tx: 'kQ4w...a1Bc', amount: '+ ◎ 0.350', usd: '$1.20' },
  { id: 3, label: 'Render · Reel 9:16', tx: 'pH8x...c2De', amount: '+ ◎ 0.018', usd: '$0.06' },
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
              <Badge>[ Claude writes the code // ROM writes the show // You bank the money ]</Badge>
            </motion.div>

            {/* Solana-native chip — built-on signal directly in hero */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease, delay: 0.05 }}
              className="mt-3 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md border border-rom-cyan/45 bg-rom-cyan/[0.06] text-[10.5px] font-mono uppercase tracking-[0.22em] text-rom-cyan-bright"
            >
              <Zap size={11} className="icon-glow-sm" strokeWidth={2.4} />
              <span>Native to Solana</span>
              <span className="text-rom-fg-muted">·</span>
              <span className="text-rom-fg-dim">Sub-second finality</span>
              <span className="text-rom-fg-muted">·</span>
              <span className="text-rom-fg-dim">$0 gas politics</span>
            </motion.div>

            <h1 className="mt-7 text-[44px] md:text-[60px] xl:text-[72px] leading-[0.96] font-mono font-bold tracking-[-0.025em] text-rom-fg">
              <RevealLine delay={0.18}>
                <ScrambleText text="Your IP." charset="binary" duration={950} startDelay={180} />
              </RevealLine>
              <RevealLine
                delay={0.32}
                className="gradient-text-arcade glitch-hover"
                dataText="Your story."
              >
                Your story.
              </RevealLine>
              <RevealLine delay={0.46}>
                <ScrambleText text="Your money." charset={['hex', 'signal']} duration={1100} startDelay={460} />
              </RevealLine>
            </h1>

            <motion.p
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-7 max-w-[520px] text-[14.5px] md:text-[16px] leading-[1.6] text-rom-fg-dim"
            >
              Write a sentence. ROM ships the cinematic — characters, scenes, voices, on-chain. <span className="text-rom-cyan-bright font-semibold">Solana</span> ships the revenue, instantly, to your wallet. Same face every episode, every drop.
            </motion.p>
            <motion.p
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.7, delay: 0.72 }}
              className="mt-4 max-w-[540px] text-[14px] md:text-[15.5px] leading-[1.7] font-mono text-rom-fg"
            >
              No engineer? Paste the docs into <span className="text-rom-cyan font-semibold">Claude</span> or <span className="text-rom-cyan font-semibold">Codex</span> — <span className="gradient-text-arcade font-semibold">ship a money-making channel tonight.</span>
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
              <Button variant="ghost">Read the API docs</Button>
            </motion.div>

            {/* AI assistants chip — proof above the fold */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-mono uppercase tracking-[0.22em] text-rom-fg-muted"
            >
              <span>↳ tested with</span>
              {['Claude', 'Codex', 'Cursor', 'Windsurf'].map((tool, i, arr) => (
                <span key={tool} className="flex items-center gap-3">
                  <span className="text-rom-green">{tool}</span>
                  {i < arr.length - 1 && <span className="text-rom-fg-muted/50">·</span>}
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-4"
            >
              {[
                ['25', 'credits per drop · refund on fail', 'green'],
                ['10m', 'sentence in · MP4 out', 'green'],
                ['6', 'content types · 4 aspects', 'green'],
                ['⚡', 'Solana-native · auto royalties', 'cyan'],
              ].map(([n, l, tone]) => (
                <div key={l}>
                  <div
                    className={`text-[22px] md:text-[26px] font-mono font-bold text-glow leading-none ${
                      tone === 'cyan' ? 'text-rom-cyan-bright' : 'text-rom-green'
                    }`}
                  >
                    {n}
                  </div>
                  <div className="mt-1.5 micro-label font-mono text-rom-fg-muted">{l}</div>
                </div>
              ))}
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
  // Live revenue ticker — rotates through liveEvents every 2.4s
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % liveEvents.length), 2400)
    return () => clearInterval(id)
  }, [])
  const event = liveEvents[idx] ?? liveEvents[0]!

  return (
    <div data-cursor="scan" className="relative rounded-3xl border border-rom-green/55 bg-rom-card overflow-hidden border-glow">
      {/* Header — live status + Solana badge */}
      <div className="flex items-center justify-between px-5 md:px-6 py-3.5 border-b border-rom-green/20">
        <div className="flex items-center gap-2 text-rom-green">
          <span className="size-2 rounded-full bg-rom-green pulse-dot" />
          <span className="micro-label font-mono text-[11px] tracking-[0.18em]">ROM ASSET · LIVE</span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-rom-cyan/45 bg-rom-cyan/[0.06] text-[10px] font-mono uppercase tracking-[0.22em] text-rom-cyan-bright">
          <Zap size={10} strokeWidth={2.4} />
          On Solana
        </span>
      </div>

      {/* Image */}
      <div className="px-5 md:px-6 pt-4 pb-3">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-rom-green/40 bg-rom-bg">
          <AssetImage seed="rom-last-signal-hero" alt="Vela · Episode 12" className="size-full" />
        </div>
      </div>

      {/* Title + Series ID + Episode */}
      <div className="px-5 md:px-6 pt-2 pb-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[24px] md:text-[28px] font-mono font-semibold text-rom-green-bright leading-tight truncate">
            Vela
          </h3>
          <p className="mt-1 text-[12px] font-mono text-rom-fg-muted">
            Series · <span className="text-rom-fg-dim">SR_7x3f...9aE1</span> · Episode 12
          </p>
        </div>
        <div className="grid size-11 place-items-center rounded-xl border border-rom-green/40 bg-rom-card-elevated flex-shrink-0">
          <GlowIcon icon={Hexagon} size={20} intensity="md" />
        </div>
      </div>

      {/* Solana mint stripe — concrete on-chain proof */}
      <div className="flex items-center justify-between gap-3 px-5 md:px-6 py-2.5 border-t border-rom-cyan/25 bg-rom-cyan/[0.04]">
        <div className="flex items-center gap-2 min-w-0">
          <Zap size={11} strokeWidth={2.4} className="text-rom-cyan-bright icon-glow-sm flex-shrink-0" />
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-rom-cyan-bright flex-shrink-0">
            Minted ·
          </span>
          <span className="text-[11px] font-mono text-rom-fg truncate">5xN9k...e7Aq</span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-rom-fg-muted flex-shrink-0">
          slot 287,492,103
        </span>
      </div>

      {/* Live revenue ticker — rotating event stream */}
      <div className="px-5 md:px-6 py-3.5 border-t border-rom-green/20 bg-rom-bg/40">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1.5 micro-label font-mono text-[10px] tracking-[0.22em] text-rom-green">
            <span className="size-1.5 rounded-full bg-rom-green pulse-dot" />
            Live revenue · 24h
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-rom-fg-muted">
            $48.21 earned
          </span>
        </div>
        <div className="relative h-[40px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.42, ease }}
              className="absolute inset-0 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span className="size-1.5 rounded-full bg-rom-cyan-bright flex-shrink-0" />
                <span className="text-[12.5px] font-mono text-rom-fg truncate">
                  {event.label}
                </span>
                <span className="text-[10px] font-mono text-rom-fg-muted truncate hidden sm:inline">
                  {event.tx}
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 flex-shrink-0">
                <span className="text-[14px] font-mono font-semibold text-rom-green-bright">
                  {event.amount}
                </span>
                <span className="text-[10px] font-mono text-rom-fg-muted">
                  {event.usd}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* On-chain stats */}
      <div className="grid grid-cols-3 border-t border-rom-green/30">
        {[
          { l: 'Renders', v: '1,247' },
          { l: '24h Rev', v: '$48' },
          { l: 'Royalty', v: '100%' },
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
                <div className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-mono text-rom-fg-muted truncate">
                  <Zap size={8} strokeWidth={2.4} className="text-rom-cyan-bright flex-shrink-0" />
                  <span className="truncate">{it.tx}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <a
        href="#anatomy"
        className="mt-4 flex items-center justify-between rounded-2xl border border-rom-green/45 bg-rom-card px-3.5 py-3 hover:bg-rom-green/[0.06] transition-colors group"
      >
        <span className="micro-label font-mono text-rom-green tracking-[0.22em] text-[10.5px]">On-chain tree</span>
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
