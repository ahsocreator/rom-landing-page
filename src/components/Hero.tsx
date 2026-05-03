import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { TiltFloat } from './ui/TiltFloat'
import { ScrambleText } from './ui/ScrambleText'
import { HeroFlow } from './ui/HeroFlow'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

// Hero — horizontal-first layout.
// (1) Top meta strip: brand badge + Solana chip + AI tools chip
// (2) HERO FLOW — full-width animated horizontal pipeline (the FOCUS)
// (3) Bottom content: 2-col editorial — headline left, subheads + CTAs right
// (4) Stats row — 4 stats horizontal, full-width
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[40%] grid-floor opacity-40" />

      <div className="relative w-full px-6 md:px-10 lg:px-16 xl:px-20 pt-12 md:pt-16 pb-20 md:pb-24">
        {/* (1) TOP META STRIP */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
          }}
          className="flex flex-wrap items-center gap-3"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease }}
          >
            <Badge>[ Claude writes the code · ROM writes the show · You bank the money ]</Badge>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-rom-cyan/40 bg-rom-cyan/[0.05] text-[10.5px] font-mono uppercase tracking-[0.22em] text-rom-cyan-bright"
          >
            <Zap size={11} className="icon-glow-sm" strokeWidth={2.4} />
            <span>Native to Solana</span>
            <span className="text-rom-fg-muted">·</span>
            <span className="text-rom-fg-dim">sub-second finality</span>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.22em] text-rom-fg-muted"
          >
            <span>↳ tested with</span>
            {['Claude', 'Codex', 'Cursor', 'Windsurf'].map((tool, i, arr) => (
              <span key={tool} className="flex items-center gap-2">
                <span className="text-rom-green">{tool}</span>
                {i < arr.length - 1 && <span className="text-rom-fg-muted/50">·</span>}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* (2) HERO FLOW — the focus */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease }}
          className="mt-8 md:mt-10"
        >
          <TiltFloat>
            <HeroFlow />
          </TiltFloat>
        </motion.div>

        {/* (3) BOTTOM CONTENT — editorial 2-col */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
          {/* Headline left */}
          <div className="lg:col-span-7">
            <h1 className="text-[48px] md:text-[68px] xl:text-[84px] leading-[0.94] font-mono font-bold tracking-[-0.03em] text-rom-fg">
              <RevealLine delay={0.5}>
                <ScrambleText
                  text="Your IP."
                  charset="binary"
                  duration={950}
                  startDelay={500}
                />
              </RevealLine>
              <RevealLine
                delay={0.62}
                className="gradient-text-arcade glitch-hover"
                dataText="Your story."
              >
                Your story.
              </RevealLine>
              <RevealLine delay={0.74}>
                <ScrambleText
                  text="Your money."
                  charset={['hex', 'signal']}
                  duration={1100}
                  startDelay={780}
                />
              </RevealLine>
            </h1>
          </div>

          {/* Subheads + CTAs right */}
          <div className="lg:col-span-5 lg:pb-3">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease }}
              className="text-[15px] md:text-[16.5px] leading-[1.6] text-rom-fg-dim"
            >
              Write a sentence. ROM ships the cinematic.{' '}
              <span className="text-rom-cyan-bright font-semibold">Solana</span>{' '}
              auto-routes the revenue to your wallet — same character every episode, every drop.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95, ease }}
              className="mt-4 text-[13.5px] md:text-[15px] leading-[1.7] font-mono text-rom-fg"
            >
              No engineer? Paste the docs into{' '}
              <span className="text-rom-cyan font-semibold">Claude</span> or{' '}
              <span className="text-rom-cyan font-semibold">Codex</span> —{' '}
              <span className="gradient-text-arcade font-semibold">
                ship a money-making channel tonight.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05, ease }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Button variant="primary" className="magnetic">
                Start earning
                <ArrowRight size={16} strokeWidth={2.4} />
              </Button>
              <Button variant="ghost">Read the API docs</Button>
            </motion.div>
          </div>
        </div>

        {/* (4) STATS — 4 horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15, ease }}
          className="mt-14 md:mt-16 pt-7 border-t border-rom-green/15 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6"
        >
          {[
            { n: '25', l: 'credits per drop · refund on fail', tone: 'green' },
            { n: '10m', l: 'sentence in · MP4 out', tone: 'green' },
            { n: '6', l: 'content types · 4 aspects', tone: 'green' },
            { n: '⚡', l: 'Solana-native · auto royalties', tone: 'cyan' },
          ].map(({ n, l, tone }) => (
            <div key={l}>
              <div
                className={`text-[28px] md:text-[36px] font-mono font-bold text-glow leading-none ${
                  tone === 'cyan' ? 'text-rom-cyan-bright' : 'text-rom-green'
                }`}
              >
                {n}
              </div>
              <div className="mt-2 micro-label font-mono text-rom-fg-muted text-[10px] leading-tight">
                {l}
              </div>
            </div>
          ))}
        </motion.div>
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
