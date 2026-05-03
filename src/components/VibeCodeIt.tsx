import { motion } from 'framer-motion'
import { ClipboardPaste, Bot, Coins, ArrowRight } from 'lucide-react'
import { Section } from './ui/Section'
import { SectionIndex } from './ui/SectionIndex'
import { GlowIcon } from './ui/GlowIcon'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const steps = [
  {
    icon: ClipboardPaste,
    label: 'Paste',
    title: 'Drop the API docs.',
    body: "Copy ROM's OpenAPI spec into Claude, Codex, Cursor, or Windsurf. One paste — full context. No tutorials. No reading.",
  },
  {
    icon: Bot,
    label: 'Prompt',
    title: 'Ask for the channel.',
    body: '"Build me a horror short-film generator for TikTok with 5 recurring characters and a Solana revenue split." That\'s the whole brief.',
  },
  {
    icon: Coins,
    label: 'Earn',
    title: 'Ship in one chat.',
    body: 'Your AI writes the integration. ROM ships the cinematics. Your wallet earns from the first render. No engineer. No team. No stack.',
  },
]

const tools = ['Claude', 'Codex', 'Cursor', 'Windsurf', 'Copilot']

export function VibeCodeIt() {
  return (
    <Section id="vibecode" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 h-1/3 grid-floor opacity-20" />

      <SectionIndex index="✦" label="No engineer required">
        <h2 className="display-2 font-mono">
          Don't write the code.
          <br />
          <span className="gradient-text-arcade glitch-hover" data-text="Vibe it.">
            Vibe it.
          </span>
        </h2>
      </SectionIndex>

      <p className="-mt-4 max-w-3xl text-[16px] md:text-[18px] leading-[1.6] text-rom-fg-dim">
        Paste ROM's API docs into Claude, Codex, Cursor, or Windsurf. Ask for the channel you want.
        Your AI assistant ships the integration. ROM ships the cinematics.{' '}
        <span className="gradient-text-arcade font-semibold">Your wallet earns from the first render.</span>{' '}
        Tested with every major AI coding assistant.
      </p>

      {/* 3-step flow */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 relative">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease, delay: i * 0.12 }}
            className="relative"
          >
            <div className="group relative h-full rounded-2xl border border-rom-green/40 bg-rom-card p-7 md:p-8 hover:border-rom-green hover:-translate-y-1 transition-all duration-300 border-glow-subtle">
              <div className="flex items-center gap-3 mb-6">
                <span className="grid size-12 place-items-center rounded-xl border border-rom-green/40 bg-rom-bg/40">
                  <GlowIcon icon={s.icon} size={22} intensity="lg" />
                </span>
                <span className="micro-label font-mono text-rom-green text-[10px] tracking-[0.28em]">
                  {String(i + 1).padStart(2, '0')} · {s.label}
                </span>
              </div>
              <h3 className="text-[22px] md:text-[26px] font-mono font-semibold text-rom-fg leading-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] md:text-[15px] leading-[1.6] text-rom-fg-dim">
                {s.body}
              </p>
            </div>

            {/* Inter-card arrow on md+ */}
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="hidden md:flex absolute right-[-12px] top-1/2 -translate-y-1/2 z-10 size-6 items-center justify-center rounded-full bg-rom-bg border border-rom-green/50"
              >
                <ArrowRight size={12} className="text-rom-green icon-glow-sm" />
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Tool chip row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease, delay: 0.3 }}
        className="mt-14 flex items-center justify-center gap-3 flex-wrap"
      >
        <span className="micro-label font-mono text-[10.5px] text-rom-fg-muted tracking-[0.22em]">
          Tested with
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

      {/* Faux chat exchange — concrete proof of the workflow */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease, delay: 0.2 }}
        className="mt-14 max-w-3xl mx-auto rounded-2xl border border-rom-green/40 bg-rom-card overflow-hidden border-glow-subtle"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-rom-green/20 bg-rom-bg/40">
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
        <div className="px-5 md:px-6 py-5 md:py-6 space-y-4 font-mono text-[12.5px] md:text-[13.5px] leading-[1.6]">
          <div>
            <div className="micro-label text-[10px] tracking-[0.22em] text-rom-fg-muted mb-1.5">
              YOU
            </div>
            <div className="text-rom-fg-dim">
              Here are ROM's API docs. Build me an AI horror short-film channel for TikTok with 5 recurring characters and Solana revenue routing.
            </div>
          </div>
          <div className="border-t border-rom-green/15 pt-4">
            <div className="micro-label text-[10px] tracking-[0.22em] text-rom-green mb-1.5">
              CLAUDE
            </div>
            <div className="text-rom-fg">
              Wiring it now. Four functions:{' '}
              <span className="text-rom-cyan">generate</span> →{' '}
              <span className="text-rom-cyan">poll</span> →{' '}
              <span className="text-rom-cyan">download</span> → publish loop. Pre-registering 5 Series IDs so the cast stays consistent. Adding a Solana payout split — your wallet, no escrow. Want me to deploy the cron now?
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
