// Plain anime-character image. No overlays, no tints, no animations.
// Uses thiswaifudoesnotexist.net for free, stable, AI-generated anime
// character portraits. Seed string deterministically maps to an image.

function seedToNumber(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0
  }
  return Math.abs(hash) % 99999
}

export function AssetImage({
  seed,
  alt = '',
  className = '',
}: {
  seed: string
  alt?: string
  className?: string
  intensity?: 'soft' | 'med' | 'hard' // ignored; kept for API compatibility
}) {
  const n = seedToNumber(seed)
  const url = `https://www.thiswaifudoesnotexist.net/example-${n}.jpg`
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={url}
        alt={alt}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  )
}
