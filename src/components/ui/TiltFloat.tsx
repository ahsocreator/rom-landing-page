import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'

// 3D mouse-tilt + ambient self-tilting + floating wrapper.
// Idle: card drifts through random-feeling tilt angles via summed
// sine frequencies (pseudo-random natural motion).
// Hover: cursor takes over and drives tilt directly.
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

  // Spring-smoothed motion values. Driven by either auto-tilt loop or cursor.
  const sx = useSpring(x, { stiffness: 90, damping: 22 })
  const sy = useSpring(y, { stiffness: 90, damping: 22 })

  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt])
  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt])

  // Light reflection — sheen offset opposite to tilt
  const sheenX = useTransform(sx, [-0.5, 0.5], ['25%', '-25%'])
  const sheenY = useTransform(sy, [-0.5, 0.5], ['25%', '-25%'])

  // Hover state held in a ref so the rAF loop can read it without re-running.
  const hovering = useRef(false)
  // Random phase offsets so each instance drifts differently
  const phaseRef = useRef({
    px: Math.random() * Math.PI * 2,
    py: Math.random() * Math.PI * 2,
  })

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    function tick(now: number) {
      const dt = (now - last) / 1000
      last = now

      if (!hovering.current) {
        // Advance phases at slow rates — feels organic, not predictable
        phaseRef.current.px += dt * 0.35
        phaseRef.current.py += dt * 0.28
        const { px, py } = phaseRef.current

        // Sum 2 sines per axis for non-repeating natural drift
        const ax = Math.sin(px) * 0.24 + Math.sin(px * 1.7 + 1.2) * 0.10
        const ay = Math.cos(py) * 0.24 + Math.sin(py * 1.4 + 0.8) * 0.10

        x.set(ax)
        y.set(ay)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [x, y])

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    hovering.current = true
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function onLeave() {
    // Don't snap to 0 — let the auto-tilt loop pick up smoothly via the spring.
    hovering.current = false
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
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* Soft drop-shadow that hints at depth */}
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
        {/* Sheen overlay tracking the cursor — glass reflection */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-3xl pointer-events-none mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at var(--sx, 50%) var(--sy, 50%), oklch(0.92 0.24 145 / 0.18), transparent 60%)',
            ['--sx' as never]: sheenX,
            ['--sy' as never]: sheenY,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
