import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { TiltFloat } from './ui/TiltFloat'
import { ScrambleText } from './ui/ScrambleText'
import { HeroFlow } from './ui/HeroFlow'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

// New hero layout: 2 columns. The animated system flow diagram is the
// VISUAL FOCUS (col-7, left on desktop). Text is a compact sidebar on the
// right (col-5). On mobile both stack — text first to orient, then the
// diagram below to demonstrate.
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[40%] grid-floor opacity-40" />

      <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16 pt-14 md:pt-20 pb-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* FLOW (focus) — desktop LEFT col-7, mobile order-2 (below text) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease }}
            className="order-2 lg:order-1 lg:col-span-7"
          >
            <TiltFloat>
              <HeroFlow />
            </TiltFloat>
          </motion.div>

          {/* TEXT SIDEBAR — desktop RIGHT col-5, mobile order-1 (top) */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
            }}
            className="order-1 lg:order-2 lg:col-span-5"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease }}
            >
              <Badge>[ Claude writes the code · ROM writes the show · You bank the money ]</Badge>
            </motion.div>

            {/* Solana-native chip */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease }}
              className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-rom-cyan/45 bg-rom-cyan/[0.06] text-[10.5px] font-mono uppercase tracking-[0.22em] text-rom-cyan-bright"
            >
              <Zap size={11} className="icon-glow-sm" strokeWidth={2.4} />
              <span>Native to Solana</span>
              <span className="text-rom-fg-muted">·</span>
              <span className="text-rom-fg-dim">sub-second finality</span>
            </motion.div>

            {/* Headline trio — kept verbatim; sized for col-5 */}
            <h1 className="mt-6 text-[40px] md:text-[52px] xl:text-[64px] leading-[0.96] font-mono font-bold tracking-[-0.025em] text-rom-fg">
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

            {/* Subhead 1 */}
            <motion.p
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-6 text-[14.5px] md:text-[15.5px] leading-[1.6] text-rom-fg-dim"
            >
              Write a sentence. ROM ships the cinematic. <span className="text-rom-cyan-bright font-semibold">Solana</span> auto-routes the revenue to your wallet — same character every episode, every drop.
            </motion.p>

            {/* Subhead 2 — the Claude/Codex hook */}
            <motion.p
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-3 text-[13.5px] md:text-[14.5px] leading-[1.7] font-mono text-rom-fg"
            >
              No engineer? Paste the docs into <span className="text-rom-cyan font-semibold">Claude</span> or <span className="text-rom-cyan font-semibold">Codex</span> — <span className="gradient-text-arcade font-semibold">ship a money-making channel tonight.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, delay: 0.78, ease }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Button variant="primary" className="magnetic">
                Start earning
                <ArrowRight size={16} strokeWidth={2.4} />
              </Button>
              <Button variant="ghost">Read the API docs</Button>
            </motion.div>

            {/* AI assistants chip */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.6, delay: 0.88 }}
              className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] font-mono uppercase tracking-[0.22em] text-rom-fg-muted"
            >
              <span>↳ tested with</span>
              {['Claude', 'Codex', 'Cursor', 'Windsurf'].map((tool, i, arr) => (
                <span key={tool} className="flex items-center gap-3">
                  <span className="text-rom-green">{tool}</span>
                  {i < arr.length - 1 && <span className="text-rom-fg-muted/50">·</span>}
                </span>
              ))}
            </motion.div>

            {/* Stats — 2x2 grid for narrow sidebar, with framing border */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.7, delay: 0.95 }}
              className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 max-w-[440px] pt-6 border-t border-rom-green/20"
            >
              {[
                { n: '25', l: 'credits per drop · refund on fail', tone: 'green' },
                { n: '10m', l: 'sentence in · MP4 out', tone: 'green' },
                { n: '6', l: 'content types · 4 aspects', tone: 'green' },
                { n: '⚡', l: 'Solana-native · auto royalties', tone: 'cyan' },
              ].map(({ n, l, tone }) => (
                <div key={l}>
                  <div
                    className={`text-[22px] md:text-[26px] font-mono font-bold text-glow leading-none ${
                      tone === 'cyan' ? 'text-rom-cyan-bright' : 'text-rom-green'
                    }`}
                  >
                    {n}
                  </div>
                  <div className="mt-1.5 micro-label font-mono text-rom-fg-muted text-[10px] leading-tight">
                    {l}
                  </div>
                </div>
              ))}
            </motion.div>
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
