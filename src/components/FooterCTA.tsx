import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

// "The next belief system won't be centralized" CTA card.
// Full-card animated Solana brand gradient (purple → blue → green) layered
// under a dark glass veil — darker, smoother, beautiful. Glass feel comes
// from the subtle top-edge highlight + inner shadow + scanline texture +
// 1px translucent white inset border.
export function FooterCTA() {
  return (
    <section className="w-full py-12 md:py-20 px-6 md:px-10 lg:px-16 mt-4 md:mt-8">
      <div className="relative rounded-2xl overflow-hidden p-10 md:p-16 backdrop-blur-2xl">

        {/* ── Layer 1: full-card animated linear gradient ─────────────
            Periodic gradient (period = 50% in stop space, == one container
            width when bg-size is 200%). Animating bgPosition 0% → 100%
            slides by exactly one period, so the visible state at the end
            of every cycle is IDENTICAL to the start → seamless loop.
            Opacity 0.72 → page background bleeds through. */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(120deg, #9945FF 0%, #5C7CFF 12.5%, #14F195 25%, #5C7CFF 37.5%, #9945FF 50%, #5C7CFF 62.5%, #14F195 75%, #5C7CFF 87.5%, #9945FF 100%)',
            backgroundSize: '200% 100%',
            opacity: 0.72,
          }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        />

        {/* ── Layer 2: counter-flowing radial blobs for depth ────────── */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse 55% 75% at 25% 35%, rgba(20,241,149,0.45) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 75% 65%, rgba(153,69,255,0.45) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.45, 0.7, 0.45],
          }}
          transition={{
            duration: 14,
            ease,
            repeat: Infinity,
          }}
        />

        {/* ── Layer 3: dark glass veil — translucent black mutes saturation
              and adds the "glassy" framing. Bumped down from 0.55 → 0.35
              so the gradient retains color while the page still shows. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none bg-black/35"
        />

        {/* ── Layer 4: scanline texture for film-grain feel ──────────── */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 3px)',
          }}
        />

        {/* ── Layer 5: top-edge highlight line — glass refraction cue ── */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />

        {/* ── Layer 6: inset border + inner shadow stack for glass depth */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.5), inset 0 0 80px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.10)',
          }}
        />

        {/* ── Foreground content ─────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="max-w-3xl">
            <h2 className="text-[44px] md:text-[56px] lg:text-[72px] font-sans font-bold text-white mb-6 leading-[1.05] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
              The next belief system
              <br />
              won't be centralized.
              <br />
              <motion.span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  // Periodic gradient (same color at 0/50/100%) so the
                  // bgPosition slide loops perfectly with no boundary jump.
                  backgroundImage:
                    'linear-gradient(90deg, #C9A4FF 0%, #FFFFFF 25%, #5BF5C5 50%, #FFFFFF 75%, #C9A4FF 100%)',
                  backgroundSize: '200% 100%',
                  filter: 'drop-shadow(0 0 28px rgba(168,85,247,0.45))',
                }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
                transition={{ duration: 9, ease: 'linear', repeat: Infinity }}
              >
                It will be memetic.
              </motion.span>
            </h2>
            <p className="text-white/80 text-sm md:text-base font-sans tracking-wide drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
              Build the future. Own the culture. Join the movement.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-6 shrink-0 mt-4 lg:mt-0">
            <a
              href="#"
              className="btn-glitch px-8 py-4 md:px-10 md:py-5 flex items-center gap-2 text-sm md:text-base font-bold text-white rounded relative overflow-hidden tracking-wider"
              style={{
                background:
                  'linear-gradient(90deg, #9945FF 0%, #7B5BFF 50%, #6D28D9 100%)',
                boxShadow:
                  '0 0 32px rgba(153,69,255,0.55), inset 0 1px 0 rgba(255,255,255,0.18)',
              }}
            >
              JOIN THE MOVEMENT <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
