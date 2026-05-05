import { Box, Lock, Globe } from 'lucide-react'

export function WhyRom() {
  return (
    <section id="why-rom" className="w-full py-8 md:py-12 px-6 md:px-10 lg:px-16">
      <h3 className="text-rom-green font-mono text-sm tracking-[0.15em] mb-12 uppercase">Why ROM?</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="flex gap-4">
          <div className="shrink-0 mt-1 text-rom-green drop-shadow-[0_0_12px_rgba(0,255,120,0.4)]">
            <Box size={40} strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-white text-xl md:text-2xl font-bold mb-3">Programmable IP</h4>
            <p className="text-base md:text-lg text-rom-fg-dim leading-relaxed">
              ROM is a runtime, not just a tool. Structure once, generate forever.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="shrink-0 mt-1 text-rom-green drop-shadow-[0_0_12px_rgba(0,255,120,0.4)]">
            <Lock size={40} strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-white text-xl md:text-2xl font-bold mb-3">Verifiable Ownership</h4>
            <p className="text-base md:text-lg text-rom-fg-dim leading-relaxed">
              On-chain ownership on Solana. You own it. You control it.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="shrink-0 mt-1 text-rom-green drop-shadow-[0_0_12px_rgba(0,255,120,0.4)]">
            <Globe size={40} strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-white text-xl md:text-2xl font-bold mb-3">Composable Economy</h4>
            <p className="text-base md:text-lg text-rom-fg-dim leading-relaxed">
              Open, composable, and built for the culture economy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
