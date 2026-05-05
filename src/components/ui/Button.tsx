import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

export function Button({ variant = 'primary', children, className = '', ...rest }: Props) {
  const base =
    'btn-glitch group relative inline-flex items-center gap-3 px-5 py-3 rounded-lg text-[12px] font-semibold uppercase tracking-[0.18em] font-mono transition-all duration-150 cursor-pointer overflow-hidden'
  const variants: Record<Variant, string> = {
    primary:
      'bg-rom-green text-rom-bg hover:bg-rom-green-bright shadow-[0_0_24px_oklch(0.85_0.22_145_/_0.35)]',
    secondary:
      'border border-rom-green/60 text-rom-green hover:bg-rom-green/10 hover:border-rom-green',
    ghost: 'text-rom-fg-dim hover:text-rom-green',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
