import { ArrowRight, Code2, Box } from 'lucide-react'
import { motion } from 'framer-motion'
import { GlowIcon } from './ui/GlowIcon'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function BuildOnRom() {
  return (
    <section id="build" className="relative px-6 md:px-10 lg:px-16 py-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease }}
        className="mx-auto max-w-[1800px]"
      >
        <div className="rounded-2xl border border-rom-green/40 bg-rom-card border-glow-subtle">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-5">
            {/* LEFT — Build on ROM label + tagline */}
            <div className="md:col-span-6 flex items-center gap-4">
              <div className="flex items-center gap-3">
                <GlowIcon icon={Code2} size={22} intensity="md" />
                <span className="text-[20px] md:text-[22px] font-mono font-semibold text-rom-fg">
                  Build on ROM
                </span>
              </div>
              <span className="hidden md:block h-6 w-px bg-rom-green/30" />
              <p className="hidden md:block text-[13px] font-mono text-rom-fg-dim">
                Integrate programmable media into your app or protocol.
              </p>
            </div>

            {/* RIGHT — CTAs */}
            <div className="md:col-span-6 flex items-center justify-end gap-5 md:gap-7">
              <a
                href="#"
                className="inline-flex items-center gap-2 micro-label font-mono uppercase tracking-[0.22em] text-rom-green hover:text-rom-green-bright transition-colors group"
              >
                <span>View the API</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-rom-green/50 micro-label font-mono uppercase tracking-[0.22em] text-rom-green hover:bg-rom-green/[0.06] transition-colors"
              >
                <span>Join the Ecosystem</span>
                <Box size={14} className="text-rom-green icon-glow-sm" strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
