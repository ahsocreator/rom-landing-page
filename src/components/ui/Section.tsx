import type { ReactNode } from 'react'

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`relative w-full px-6 md:px-10 lg:px-16 py-24 md:py-36 ${className}`}>
      <div className="relative mx-auto max-w-[1800px]">{children}</div>
    </section>
  )
}
