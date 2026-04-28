import { motion } from 'framer-motion'
import { Lock, Sparkles, Coins, ArrowRight } from 'lucide-react'
import { GlowIcon } from './ui/GlowIcon'
import { Section } from './ui/Section'
import { SectionIndex } from './ui/SectionIndex'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const steps = [
  {
    n: '01',
    icon: Lock,
    title: 'Define your IP',
    body: 'Drop a character. Lock the look. Lock the voice. ROM writes the canonical record on-chain. From this moment, your IP is yours forever.',
    chip: 'The lock-in',
  },
  {
    n: '02',
    icon: Sparkles,
    title: 'Spin out content',
    body: 'One prompt becomes an episode. Then a music video. Then an ad. Same character, infinite drops. ROM handles every render so you handle every angle.',
    chip: 'The factory',
  },
  {
    n: '03',
    icon: Coins,
    title: 'Stack the upside',
    body: 'Run a channel. Sell licenses. Cut deals with brands. Your IP earns ad revenue, royalties, sponsorships — every time a drop runs.',
    chip: 'The flywheel',
  },
]

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionIndex index="01" label="How an IP gets built">
        <h2 className="display-2 font-mono">
          One character.
          <br />
          <span className="gradient-text-arcade glitch-hover" data-text="Three steps to a franchise.">
            Three steps to a franchise.
          </span>
        </h2>
      </SectionIndex>

      {/* Editorial vertical layout — alternating sides, no symmetric grid */}
      <div className="relative">
        {/* Vertical connector line */}
        <span aria-hidden className="absolute left-[28px] md:left-[80px] top-12 bottom-12 w-px bg-rom-green/20" />

        <div className="space-y-20 md:space-y-32">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, ease }}
              className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start"
            >
              {/* Left — number + icon node */}
              <div className="md:col-span-3 flex items-start gap-4">
                <div className="relative grid size-14 md:size-[72px] place-items-center rounded-2xl border border-rom-green/40 bg-rom-card flex-shrink-0 z-10">
                  <GlowIcon icon={s.icon} size={28} intensity="lg" />
                </div>
                <div className="flex-1 min-w-0 pt-2">
                  <div className="text-[64px] md:text-[88px] font-mono font-bold leading-none text-rom-green/30">
                    {s.n}
                  </div>
                  <div className="mt-2 micro-label font-mono text-rom-green">{s.chip}</div>
                </div>
              </div>

              {/* Right — title + body */}
              <div className={`md:col-span-9 ${i % 2 === 1 ? 'md:pl-12' : ''}`}>
                <h3 className="display-3 font-mono text-rom-fg">
                  {s.title}
                </h3>
                <p className="mt-5 max-w-[600px] text-[15px] md:text-[17px] leading-[1.6] text-rom-fg-dim">
                  {s.body}
                </p>
                {i === steps.length - 1 ? null : (
                  <div className="mt-8 flex items-center gap-2 micro-label font-mono text-rom-green/60">
                    <span>Next</span>
                    <ArrowRight size={12} strokeWidth={2.4} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
