import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'

// 3D mouse-tilt + slow ambient floating wrapper.
// Wrap a card to make it look like it's floating in space and reactive
// to the cursor. Skill consulted: 3d-web-experience (davila7) — for the
// CSS perspective + parallax-by-cursor pattern (no Three.js needed).
export function TiltFloat({
  children,
  maxTilt = 11,
  floatY = 8,
  floatDuration = 6,
  className = '',
}: {
  children: ReactNode
  maxTilt?: number
  floatY?: number
  floatDuration?: number
  className?: string
}) {
  const x = useMotionValue(0) // -0.5 .. 0.5
  const y = useMotionValue(0)

  // Spring smoothing for a buttery feel
  const sx = useSpring(x, { stiffness: 130, damping: 18 })
  const sy = useSpring(y, { stiffness: 130, damping: 18 })

  // Map cursor position → rotation (inverted on Y-axis for natural tilt)
  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt])
  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt])

  // Light reflection — translate a sheen overlay opposite to tilt
  const sheenX = useTransform(sx, [-0.5, 0.5], ['25%', '-25%'])
  const sheenY = useTransform(sy, [-0.5, 0.5], ['25%', '-25%'])

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={className}
      style={{ perspective: '1400px' }}
      animate={{ y: [0, -floatY, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={reset}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        {/* Bottom shadow that grows when card lifts forward */}
        <motion.div
          aria-hidden
          className="absolute -inset-2 -z-10 rounded-3xl"
          style={{
            background:
              'radial-gradient(ellipse 70% 40% at 50% 90%, oklch(0.85 0.22 145 / 0.35), transparent 60%)',
            filter: 'blur(16px)',
            translateZ: -40,
          }}
        />
        {children}
        {/* Sheen overlay tracking the cursor — gives glass-like reflection */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-3xl pointer-events-none mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at var(--sx, 50%) var(--sy, 50%), oklch(0.92 0.24 145 / 0.18), transparent 60%)',
            // Use motion values via custom CSS variables
            ['--sx' as never]: sheenX,
            ['--sy' as never]: sheenY,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
