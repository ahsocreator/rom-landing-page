import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { MotionFade, MotionStagger } from './ui/Motion'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function DeveloperCTA() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 grid-floor opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease }}
        className="relative mx-auto max-w-[1800px] px-6 md:px-10 lg:px-16 py-28 md:py-40 text-center"
      >
        <Badge>[ Stop renting. Start owning. ]</Badge>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-rom-green/40" />
          <span className="micro-label font-mono text-rom-green">// 06 · The Close</span>
          <span className="h-px w-16 bg-rom-green/40" />
        </div>

        <h2 className="mt-8 display-mega font-mono max-w-[1400px] mx-auto">
          <span className="block">Your IP.</span>
          <span className="block gradient-text-arcade glitch-hover" data-text="Your story.">Your story.</span>
          <span className="block">Your money.</span>
        </h2>

        <p className="mt-10 max-w-2xl mx-auto text-[17px] md:text-[19px] leading-[1.55] text-rom-fg-dim">
          One character becomes a franchise. One franchise becomes a business. One business compounds for years.
          ROM is the layer. <span className="gradient-text-arcade font-semibold">You bring the IP.</span>
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" className="text-[14px] px-7 py-4">
            Claim 100 credits free
            <ArrowRight size={18} strokeWidth={2.4} />
          </Button>
          <Button variant="secondary" className="text-[14px] px-7 py-4">
            See it in action
            <Sparkles size={16} strokeWidth={2} />
          </Button>
        </div>

        <p className="mt-7 text-[12px] font-mono uppercase tracking-[0.22em] text-rom-fg-muted">
          No credit card · No subscription · Your IP, your wallet, your terms
        </p>

        <MotionStagger className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {[
            ['1', 'character locks the IP'],
            ['25', 'credits per drop'],
            ['6', 'revenue formats'],
            ['∞', 'drops · forever yours'],
          ].map(([n, l]) => (
            <MotionFade
              key={l}
              className="rounded-2xl border border-rom-green/30 bg-rom-card px-4 py-6 text-center hover:border-rom-green/60 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-[36px] md:text-[44px] font-mono font-bold gradient-text-arcade leading-none">
                {n}
              </div>
              <div className="mt-2 text-[10.5px] font-mono uppercase tracking-[0.22em] text-rom-fg-muted">
                {l}
              </div>
            </MotionFade>
          ))}
        </MotionStagger>
      </motion.div>
    </section>
  )
}
