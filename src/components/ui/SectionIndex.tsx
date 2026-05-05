import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

// Numbered section header with massive type index next to a label.
// Awwwards-style "section as architecture" — visible numbering as design.
export function SectionIndex({
  index,
  label,
  children,
}: {
  index: string // e.g. "01"
  label: string // e.g. "How it works"
  children?: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.85, ease }}
      className="relative flex items-end gap-6 md:gap-10 mb-10 md:mb-14"
    >
      {index && <span className="section-index font-mono">{index}</span>}
      <div className="flex-1 pb-3 md:pb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px flex-1 bg-rom-green/30 max-w-[200px]" />
          <span className="micro-label font-mono text-rom-green">// {label}</span>
        </div>
        {children}
      </div>
    </motion.div>
  )
}
