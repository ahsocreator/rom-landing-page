// Corner brackets — terminal-style frame decoration
export function Brackets({ className = '' }: { className?: string }) {
  return (
    <>
      <span aria-hidden className={`pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-rom-green/60 ${className}`} />
      <span aria-hidden className={`pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-rom-green/60 ${className}`} />
      <span aria-hidden className={`pointer-events-none absolute left-0 bottom-0 h-3 w-3 border-l border-b border-rom-green/60 ${className}`} />
      <span aria-hidden className={`pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-r border-b border-rom-green/60 ${className}`} />
    </>
  )
}
