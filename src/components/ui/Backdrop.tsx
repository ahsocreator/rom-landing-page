// iter-7 INTEGRATION — stripped to pure static composition.
// All motion now lives in MatrixBackdrop (iters 3-6). This component provides
// the static atmospheric foundation: deep base, hero glow, grid, scanlines,
// noise, vignette. No motion = nothing here can compete with the matrix system.
//
// Removed in iter-7:
//   - RestraintedGlows (two animated 700-800px blob glows, used banned easeInOut)
//   - ParticleField (redundant with iter-3 FarGlyphs)
//   - signal-beam-sweep (superseded by iter-4 flux band)
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
