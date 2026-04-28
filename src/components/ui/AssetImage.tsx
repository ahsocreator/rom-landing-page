import { motion } from 'framer-motion'

// Stock image with cyberpunk green treatment + ambient animation.
// Real photo (picsum.photos by stable seed) → green-tinted, scanlines,
// vignette, slow zoom, sweeping highlight — feels "animated character".
export function AssetImage({
  seed,
  alt = '',
  className = '',
  intensity = 'med',
}: {
  seed: string
  alt?: string
  className?: string
  intensity?: 'soft' | 'med' | 'hard'
}) {
  const tintAlpha = { soft: 0.35, med: 0.5, hard: 0.65 }[intensity]

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Real stock photo, slow-zoom-and-drift */}
      <motion.img
        src={`https://picsum.photos/seed/${seed}/960/540`}
        alt={alt}
        loading="lazy"
        animate={{ scale: [1, 1.06, 1], x: [0, -6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 size-full object-cover"
        style={{ filter: 'saturate(0.55) contrast(1.15) brightness(0.7)' }}
        draggable={false}
      />

      {/* Green channel tint */}
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{ background: `oklch(0.55 0.22 145 / ${tintAlpha})` }}
      />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ background: `oklch(0.20 0.15 145 / ${tintAlpha + 0.1})` }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, oklch(0.04 0.005 150 / 0.85) 100%)',
        }}
      />

      {/* Scanlines */}
      <div className="absolute inset-0 scanlines opacity-50" />

      {/* Slow horizontal light sweep — fakes camera movement */}
      <motion.div
        animate={{ x: ['-120%', '220%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-y-0 w-1/3 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, oklch(0.92 0.24 145 / 0.18), transparent)',
        }}
      />

      {/* Bottom green glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent, oklch(0.85 0.22 145 / 0.25))',
        }}
      />
    </div>
  )
}
