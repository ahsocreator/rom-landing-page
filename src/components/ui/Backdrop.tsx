import { motion } from 'framer-motion'
import { useMemo } from 'react'

// Refined page-wide backdrop. No multi-color aurora (anti-pattern), no blob orbs.
// Composed of: solid base, single signal beam sweep, sparse particles, fine grid, vignette, noise.
export function Backdrop() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Deep solid base */}
      <div className="absolute inset-0" style={{ background: 'oklch(0.07 0.006 150)' }} />

      {/* Single ambient hero glow — top, restrained, owned */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 45% at 50% -10%, oklch(0.85 0.22 145 / 0.13), transparent 65%)',
        }}
      />

      {/* Vertical signal beam sweep — single moving element, not blob soup */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="signal-beam-sweep" />
      </div>

      {/* Two restrained drifting glows — far apart, slow, edge-anchored */}
      <RestraintedGlows />

      {/* Sparse particles — no globs */}
      <ParticleField count={22} />

      {/* Fine global grid — provides structure without competing */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(oklch(0.85 0.22 145) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.22 145) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
        }}
      />

      {/* Subtle scanlines */}
      <div className="absolute inset-0 scanlines opacity-25" />

      {/* Noise grain */}
      <div className="absolute inset-0 noise-bg" />

      {/* Edge vignette — pulls focus inward */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 45%, oklch(0.04 0.004 150 / 0.85) 100%)',
        }}
      />
    </div>
  )
}

function RestraintedGlows() {
  return (
    <>
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute rounded-full blur-3xl"
        style={{
          width: 700,
          height: 700,
          left: '-10%',
          top: '15%',
          background: 'oklch(0.85 0.22 145 / 0.10)',
        }}
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="absolute rounded-full blur-3xl"
        style={{
          width: 800,
          height: 800,
          right: '-15%',
          top: '60%',
          background: 'oklch(0.85 0.22 145 / 0.08)',
        }}
      />
    </>
  )
}

function ParticleField({ count = 22 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.6,
        dur: 12 + Math.random() * 18,
        delay: Math.random() * 8,
        opacity: 0.25 + Math.random() * 0.4,
      })),
    [count]
  )

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{
            y: ['0vh', '-30vh', '0vh'],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: 'oklch(0.92 0.24 145)',
            boxShadow: '0 0 6px oklch(0.85 0.22 145 / 0.6)',
          }}
        />
      ))}
    </>
  )
}
