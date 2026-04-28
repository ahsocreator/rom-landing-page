import type { ReactNode } from 'react'

type BadgeVariant = 'outline' | 'solid' | 'ghost'

export function Badge({
  children,
  variant = 'outline',
  className = '',
}: {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}) {
  const base =
    'inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] font-medium uppercase tracking-[0.18em] font-mono'
  const variants: Record<BadgeVariant, string> = {
    outline: 'border border-rom-green/50 text-rom-green bg-rom-green/[0.04]',
    solid: 'bg-rom-green text-rom-bg',
    ghost: 'text-rom-fg-dim border border-rom-border-dim',
  }
  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>
}
