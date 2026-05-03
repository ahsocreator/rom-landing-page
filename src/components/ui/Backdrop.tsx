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

      {/* Page-wide schematic grid — primary visual texture. 32px to match the
          HeroFlow card; bumped to 14% opacity so it reads CLEARLY across the
          whole page. */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(oklch(0.85 0.22 145) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.22 145) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Scanlines — quieted so they don't wash out the grid */}
      <div className="absolute inset-0 scanlines opacity-[0.10]" />

      {/* Noise grain — quieted (was 0.4 default) so the grid reads as the
          dominant texture, not the noise */}
      <div className="absolute inset-0 noise-bg" style={{ opacity: 0.18 }} />

      {/* Edge vignette — softer (start at 55% radius instead of 45%) so the
          grid stays visible further out toward the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 55%, oklch(0.04 0.004 150 / 0.7) 100%)',
        }}
      />
    </div>
  )
}
