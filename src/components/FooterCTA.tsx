import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function FooterCTA() {
  return (
    <section className="w-full py-12 md:py-20 px-6 md:px-10 lg:px-16 mt-4 md:mt-8">
      <div className="relative border border-[#8B5CF6]/20 rounded-2xl p-10 md:p-16 pb-20 md:pb-28 overflow-hidden bg-[#040208]">

        {/* ── Animated Solana-brand gradient at the bottom ──────────────
            Horizontal flow: purple → cyan → green → purple (loop).
            Background-size is 200% of container so backgroundPosition can
            slide a full cycle over 9s for a smooth aurora-like motion.
            Top edge feathers via a vertical mask so the gradient bleeds
            into the dark card body cleanly. */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, #9945FF 0%, #5C7CFF 25%, #14F195 50%, #5C7CFF 75%, #9945FF 100%)',
            backgroundSize: '200% 100%',
            maskImage:
              'linear-gradient(0deg, black 25%, rgba(0,0,0,0.6) 60%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(0deg, black 25%, rgba(0,0,0,0.6) 60%, transparent 100%)',
          }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
          transition={{ duration: 9, ease: 'linear', repeat: Infinity }}
        />

        {/* Counter-flowing slower gradient layer for depth (mix-blend so it
            adds a subtle shimmer rather than over-saturating). */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none mix-blend-overlay"
          style={{
            background:
              'linear-gradient(90deg, #14F195 0%, #9945FF 50%, #14F195 100%)',
            backgroundSize: '180% 100%',
            opacity: 0.55,
            maskImage:
              'linear-gradient(0deg, black 30%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(0deg, black 30%, transparent 100%)',
          }}
          animate={{ backgroundPosition: ['100% 50%', '0% 50%'] }}
          transition={{ duration: 14, ease: 'linear', repeat: Infinity }}
        />

        {/* Soft horizontal grain band right at the bottom edge — gives the
            gradient a hint of texture so it doesn't read as a flat band. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.0) 0px, rgba(0,0,0,0.18) 1px, rgba(0,0,0,0.0) 2px)',
          }}
        />

        {/* Faint wireframe globe in upper-right (kept) */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-50 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] rounded-full border border-[#8B5CF6]/30 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] rounded-full border border-[#8B5CF6]/30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] rounded-full border border-[#8B5CF6]/30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] border border-[#8B5CF6]/30" style={{ transform: 'translate(-25%, -50%) rotateX(75deg)' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] border border-[#8B5CF6]/30" style={{ transform: 'translate(-25%, -50%) rotateY(75deg)' }}></div>

          {/* Glowing nodes */}
          <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 bg-[#A855F7] rounded-full shadow-[0_0_10px_2px_rgba(168,85,247,0.8)]"></div>
          <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-[#A855F7] rounded-full shadow-[0_0_10px_2px_rgba(168,85,247,0.8)]"></div>
          <div className="absolute bottom-[40%] left-[60%] w-2 h-2 bg-[#A855F7] rounded-full shadow-[0_0_12px_3px_rgba(168,85,247,0.8)]"></div>
          <div className="absolute top-[60%] left-[45%] w-1.5 h-1.5 bg-[#A855F7] rounded-full shadow-[0_0_10px_2px_rgba(168,85,247,0.8)]"></div>
          <div className="absolute top-[25%] left-[65%] w-1 h-1 bg-[#A855F7] rounded-full shadow-[0_0_10px_2px_rgba(168,85,247,0.8)]"></div>
        </div>

        {/* Foreground content */}
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="max-w-3xl">
            <h2 className="text-[48px] md:text-[56px] lg:text-[72px] font-sans font-bold text-white mb-6 leading-[1.05] tracking-tight">
              The next belief system<br />
              won't be centralized.<br />
              <span className="text-[#A855F7] drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                It will be memetic.
              </span>
            </h2>
            <p className="text-white/80 text-sm md:text-base font-sans tracking-wide drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]">
              Build the future. Own the culture. Join the movement.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-6 shrink-0 mt-4 lg:mt-0">
            <a
              href="#"
              className="btn-glitch px-8 py-4 md:px-10 md:py-5 flex items-center gap-2 text-sm md:text-base font-bold text-white rounded bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] transition-all shadow-[0_0_28px_rgba(139,92,246,0.45)] tracking-wider relative overflow-hidden"
            >
              JOIN THE MOVEMENT <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
