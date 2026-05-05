import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

// "The next belief system won't be centralized" CTA card.
// Dark near-black background with a purple stroke + wireframe globe on
// the right. "It will be memetic." pops in fuchsia. Subtle ambient
// animations only — purple shimmer at the edges, gentle glow pulse on
// the button + nodes on the globe.
export function FooterCTA() {
  return (
    <section className="w-full py-12 md:py-20 px-6 md:px-10 lg:px-16 mt-4 md:mt-8">
      <div className="relative rounded-2xl overflow-hidden p-10 md:p-16 bg-[#070213] border border-[#8B5CF6]/45 shadow-[0_0_40px_-12px_rgba(139,92,246,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]">

        {/* Subtle aurora shimmer along the top edge — gentle ambient motion */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.85) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
          transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
        />

        {/* Wireframe globe in upper-right (the original look) */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-60 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, ease: 'linear', repeat: Infinity }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] rounded-full border border-[#8B5CF6]/40 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.10)_0%,transparent_70%)]" />
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] rounded-full border border-[#8B5CF6]/30" />
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] rounded-full border border-[#8B5CF6]/25" />
            <div
              className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-[#8B5CF6]/30"
              style={{ transform: 'translate(-25%, -50%) rotateX(75deg)' }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-[#8B5CF6]/30"
              style={{ transform: 'translate(-25%, -50%) rotateY(75deg)' }}
            />
          </motion.div>

          {/* Glowing star nodes scattered on the globe */}
          {[
            { top: '32%', left: '52%', size: 1.5, delay: 0 },
            { top: '50%', left: '36%', size: 1, delay: 0.4 },
            { top: '58%', left: '60%', size: 2, delay: 0.8 },
            { top: '62%', left: '48%', size: 1.5, delay: 1.2 },
            { top: '26%', left: '66%', size: 1, delay: 1.6 },
            { top: '44%', left: '74%', size: 1.25, delay: 2.0 },
          ].map((star, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#A855F7]"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size * 4}px`,
                height: `${star.size * 4}px`,
                boxShadow: `0 0 ${star.size * 6}px ${star.size * 1.4}px rgba(168,85,247,0.7)`,
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, ease, repeat: Infinity, delay: star.delay }}
            />
          ))}
        </div>

        {/* Foreground content */}
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-10">
          <div className="max-w-3xl">
            <h2 className="text-[40px] md:text-[52px] lg:text-[64px] font-sans font-bold text-white mb-5 leading-[1.06] tracking-tight">
              The next belief system
              <br />
              won't be centralized.
              <br />
              <span className="text-[#A855F7] drop-shadow-[0_0_24px_rgba(168,85,247,0.6)]">
                It will be memetic.
              </span>
            </h2>
            <p className="text-rom-fg-dim text-[13px] md:text-[14px] font-sans tracking-wide">
              Build the future. Own the culture. Join the movement.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-6 shrink-0 mt-2 lg:mt-0">
            <motion.a
              href="#"
              whileTap={{ scale: 0.97 }}
              className="btn-glitch px-8 py-4 md:px-10 md:py-5 inline-flex items-center gap-2.5 text-sm md:text-base font-bold text-white rounded relative overflow-hidden tracking-wider"
              style={{
                background:
                  'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                boxShadow:
                  '0 0 32px rgba(139,92,246,0.55), inset 0 1px 0 rgba(255,255,255,0.18), 0 0 0 1px rgba(168,85,247,0.4)',
              }}
            >
              JOIN THE MOVEMENT <ArrowRight size={18} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
