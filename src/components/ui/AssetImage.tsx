// Anime character image — raw, no filters, no overlays.
//
// SOURCE PROBLEM: there is no free, reliable, direct-URL service for
// "darker / cool / 3D Japanese anime characters." `thisanimedoesnotexist`
// requires fetching the slider page (no direct image URLs).
// `thiswaifudoesnotexist` works directly but skews bright/cute.
//
// SOLUTION: pass a real image URL via the `src` prop when you have art.
// Otherwise we fall back to thiswaifudoesnotexist (so the page is never
// broken). Drop a curated URL list into `CURATED` to override per-seed.

const FALLBACK_BASE = 'https://www.thiswaifudoesnotexist.net/example-'

// Hand-picked stable URLs for specific seeds.
// Add entries: 'rom-last-signal-hero': 'https://your-cdn.com/last-signal.jpg'
const CURATED: Record<string, string> = {}

function seedToHash(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 131 + seed.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

export function AssetImage({
  seed,
  src,
  alt = '',
  className = '',
}: {
  seed: string
  src?: string // explicit override
  alt?: string
  className?: string
  intensity?: 'soft' | 'med' | 'hard' // ignored
}) {
  const finalSrc =
    src ??
    CURATED[seed] ??
    `${FALLBACK_BASE}${(seedToHash(seed) % 99999)}.jpg`

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
