// Anime character image — raw, no filters, no overlays.
// Uses thisanimedoesnotexist.ai (3D-influenced anime characters via
// StyleGAN trained on Crunchyroll-style art). Higher psi = more
// stylized/cool, lower psi = more diverse/varied. Free direct URLs.
//
// Seed string deterministically maps to a stable image.

const PSIS = ['0.4', '0.5', '0.6', '0.7'] as const

function seedToHash(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 131 + seed.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
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
  const h = seedToHash(seed)
  const psi = PSIS[h % PSIS.length]
  const num = 1 + (h % 9999)
  const padded = String(num).padStart(4, '0')
  const url = `https://thisanimedoesnotexist.ai/results/psi-${psi}/seed${padded}.png`
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
