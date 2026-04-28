// Anime character image, dark+cool tone via direct CSS filter on the img.
// (filter is a CSS property on the image itself, not a separate overlay layer.)
// Source: thiswaifudoesnotexist.net (free, stable, AI-generated). Higher seed
// numbers (10k–80k) skew toward more varied / darker characters.

function seedToNumber(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 131 + seed.charCodeAt(i)) | 0
  }
  // Bias to higher index range — looks darker / less cute / more varied
  return 10000 + (Math.abs(hash) % 70000)
}

export function AssetImage({
  seed,
  alt = '',
  className = '',
}: {
  seed: string
  alt?: string
  className?: string
  intensity?: 'soft' | 'med' | 'hard' // ignored, kept for API compatibility
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
        style={{
          // Darker, cooler tone applied directly to the image
          filter: 'brightness(0.62) contrast(1.20) saturate(0.75) hue-rotate(180deg)',
        }}
      />
    </div>
  )
}
