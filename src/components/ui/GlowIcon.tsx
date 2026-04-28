import type { LucideIcon } from 'lucide-react'

type Intensity = 'sm' | 'md' | 'lg' | 'pulse'

const glowMap: Record<Intensity, string> = {
  sm: 'icon-glow-sm',
  md: 'icon-glow',
  lg: 'icon-glow-lg',
  pulse: 'icon-glow icon-glow-pulse',
}

export function GlowIcon({
  icon: Icon,
  size = 20,
  intensity = 'md',
  strokeWidth = 1.6,
  className = '',
}: {
  icon: LucideIcon
  size?: number
  intensity?: Intensity
  strokeWidth?: number
  className?: string
}) {
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className={`text-rom-green ${glowMap[intensity]} ${className}`}
    />
  )
}
