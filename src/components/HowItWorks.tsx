import { motion } from 'framer-motion'
import { Lightbulb, MessageCircle, Sparkles, Coins } from 'lucide-react'
import { GlowIcon } from './ui/GlowIcon'
import { Section } from './ui/Section'
import { SectionIndex } from './ui/SectionIndex'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const steps = [
  {
    n: '01',
    icon: Lightbulb,
    title: 'You have an idea.',
    body: '"A horror short-film channel for TikTok with 5 recurring characters." "A cyberpunk soap opera." "A music-video factory for indie artists." That\'s the entire brief.',
    chip: 'The idea',
  },
  {
    n: '02',
    icon: MessageCircle,
    title: 'You tell Claude.',
    body: 'Open Claude, Codex, Cursor, or Windsurf. Drop this page in the chat. Ask for the channel you want — plain English, no code, no setup, no installs.',
    chip: 'The chat',
  },
  {
    n: '03',
    icon: Sparkles,
    title: 'Claude wires it up.',
    body: 'Your AI writes everything between you and ROM in one conversation. No code for you to read. No technical decisions to make. The AI does the engineering.',
    chip: 'The build',
  },
  {
    n: '04',
    icon: Coins,
    title: 'You earn from every render.',
    body: 'ROM ships the cinematics — same character every episode, frame one to frame infinity. Solana auto-routes the revenue to your wallet. Every render. Forever.',
    chip: 'The money',
  },
]

const tools = ['Claude', 'Codex', 'Cursor', 'Windsurf', 'Copilot']

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionIndex index="01" label="How it actually works in 2026">
        <h2 className="display-2 font-mono">
          You chat.
          <br />
          <span className="gradient-text-arcade glitch-hover" data-text="Claude builds.">
            Claude builds.
          </span>
          <br />
          ROM ships. You earn.
        </h2>
      </SectionIndex>

      <p className="-mt-2 max-w-2xl text-[16px] md:text-[18px] leading-[1.6] text-rom-fg-dim">
        Four steps. One afternoon. No code to write, no contracts to sign, no team to hire. The AI did the engineering — you just have to know what you want.
      </p>

      {/* The big workflow */}
      <div className="relative mt-20 md:mt-28">
        {/* Vertical connector spine — full-bleed glow */}
        <span
          aria-hidden
          className="absolute left-[34px] md:left-[100px] top-12 bottom-12 w-px bg-gradient-to-b from-rom-green/0 via-rom-green/50 to-rom-green/0"
        />

        <div className="space-y-24 md:space-y-32">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, ease }}
              className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start"
            >
              {/* Big number + icon node */}
              <div className="md:col-span-4 flex items-start gap-4 md:gap-6">
                <div className="relative grid size-16 md:size-[88px] place-items-center rounded-2xl border border-rom-green/50 bg-rom-card flex-shrink-0 z-10 border-glow">
                  <GlowIcon icon={s.icon} size={36} intensity="lg" />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="text-[80px] md:text-[140px] xl:text-[180px] font-mono font-bold leading-[0.85] text-rom-green/25 tracking-[-0.04em]">
                    {s.n}
                  </div>
                  <div className="mt-3 micro-label font-mono text-rom-green text-[10.5px] tracking-[0.28em]">
                    {s.chip}
                  </div>
                </div>
              </div>

              {/* Big title + body */}
              <div className="md:col-span-8">
                <h3 className="text-[36px] md:text-[52px] xl:text-[64px] font-mono font-bold leading-[1.05] tracking-[-0.025em] text-rom-fg">
                  {s.title}
                </h3>
                <p className="mt-6 max-w-[640px] text-[16px] md:text-[19px] leading-[1.55] text-rom-fg-dim">
                  {s.body}
                </p>
                {i < steps.length - 1 && (
                  <div className="mt-9 flex items-center gap-3 text-rom-green/60">
                    <span className="micro-label font-mono text-[10px] tracking-[0.3em]">Then</span>
                    <span className="h-px w-12 bg-rom-green/40" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Faux Claude chat — concrete proof of the workflow */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
        className="mt-28 md:mt-36 max-w-3xl mx-auto rounded-2xl border border-rom-green/40 bg-rom-card overflow-hidden border-glow-subtle"
      >
        <div className="flex items-center justify-between px-5 md:px-6 py-3.5 border-b border-rom-green/20 bg-rom-bg/40">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-rom-green pulse-dot" />
            <span className="micro-label font-mono text-[10px] tracking-[0.22em] text-rom-green">
              CLAUDE · LIVE SESSION
            </span>
          </div>
          <span className="micro-label font-mono text-[10px] tracking-[0.18em] text-rom-fg-muted">
            08:42 · 4 min ago
          </span>
        </div>
        <div className="px-5 md:px-7 py-5 md:py-6 space-y-5 font-mono text-[13px] md:text-[14.5px] leading-[1.6]">
          <div>
            <div className="micro-label text-[10px] tracking-[0.22em] text-rom-fg-muted mb-2">
              YOU
            </div>
            <div className="text-rom-fg-dim">
              Build me a horror short-film channel for TikTok. Five recurring characters. Solana revenue split. I want it shipping by tonight.
            </div>
          </div>
          <div className="border-t border-rom-green/15 pt-5">
            <div className="micro-label text-[10px] tracking-[0.22em] text-rom-green mb-2">
              CLAUDE
            </div>
            <div className="text-rom-fg">
              On it. Wiring four functions —{' '}
              <span className="text-rom-cyan">generate</span> →{' '}
              <span className="text-rom-cyan">poll</span> →{' '}
              <span className="text-rom-cyan">download</span> → publish loop. Pre-registering 5 Series IDs so the cast stays consistent across every episode. Adding a Solana payout split to your wallet — no escrow. Want me to deploy the cron now or run it locally first?
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tool chip row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease, delay: 0.2 }}
        className="mt-12 flex items-center justify-center gap-3 flex-wrap"
      >
        <span className="micro-label font-mono text-[10.5px] text-rom-fg-muted tracking-[0.22em]">
          Tested with every major AI assistant ·
        </span>
        {tools.map((tool) => (
          <span
            key={tool}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-rom-green/35 bg-rom-card text-[11px] font-mono uppercase tracking-[0.18em] text-rom-fg-dim hover:text-rom-green hover:border-rom-green/70 transition-colors"
          >
            <span className="size-1.5 rounded-full bg-rom-green/70" />
            {tool}
          </span>
        ))}
      </motion.div>
    </Section>
  )
}
