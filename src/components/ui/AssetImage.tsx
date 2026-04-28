// Anime / illustrated character image — raw, no filters, no overlays.
//
// Source: DiceBear `adventurer` collection (illustrated character art with
// cool poses) + `lorelei` (anime-style portraits). Free, stable direct
// SVG URLs. Each seed produces a unique deterministic character.
//
// Override per-seed via CURATED map, or pass `src` to drop in real art.

// Hand-picked stable URLs for specific seeds (override the auto-generated one).
// Add entries: 'rom-last-signal-hero': 'https://your-cdn.com/last-signal.jpg'
const CURATED: Record<string, string> = {}

// Available DiceBear styles — cycle by seed for visual variety
const STYLES = ['adventurer', 'lorelei', 'notionists', 'personas'] as const

function seedToHash(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 131 + seed.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

function autoUrl(seed: string): string {
  const h = seedToHash(seed)
  const style = STYLES[h % STYLES.length]
  // Encode the seed itself (DiceBear reseed) so the same seed string is stable
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(
    seed
  )}&size=512&backgroundColor=0a0a0a,0d2818,071810,001f12&radius=0`
}

export function AssetImage({
  seed,
  src,
  alt = '',
  className = '',
}: {
  seed: string
  src?: string
  alt?: string
  className?: string
  intensity?: 'soft' | 'med' | 'hard' // ignored
}) {
  const finalSrc = src ?? CURATED[seed] ?? autoUrl(seed)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={finalSrc}
        alt={alt}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  )
}
