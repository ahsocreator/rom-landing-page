export function Nav() {
  const links: { label: string; href: string }[] = [
    { label: 'Home', href: '#top' },
    { label: 'How', href: '#how-it-works' },
    { label: 'Formats', href: '#content' },
    { label: 'Showcase', href: '#ip-showcase' },
    { label: 'Series', href: '#series' },
    { label: 'Pricing', href: '#pricing' },
  ]
  return (
    <header className="sticky top-0 z-50 border-b border-rom-border-dim/50 bg-rom-card/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-6 px-6 py-4 md:px-10 lg:px-16">
        <a href="#top" className="flex items-center gap-3 group">
          <span className="font-mono text-2xl font-bold tracking-tight text-rom-green text-glow group-hover:text-rom-green-bright transition-colors">
            ROM
          </span>
          <span className="hidden md:inline text-[10px] uppercase tracking-[0.22em] text-rom-fg-dim leading-tight">
            Programmable<br />Media Protocol
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[13px] font-mono">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-rom-fg-dim hover:text-rom-green transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 border border-rom-border-dim rounded-lg text-[11px] font-mono uppercase tracking-[0.18em] text-rom-fg-dim">
            <span>Built on</span>
            <SolanaMark />
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-rom-green/50 rounded-lg px-4 py-2 text-[12px] font-mono font-semibold uppercase tracking-[0.18em] text-rom-green hover:bg-rom-green/10 transition-colors"
          >
            Launch Yoh App
            <span className="text-base">↗</span>
          </a>
        </div>
      </div>
    </header>
  )
}

function SolanaMark() {
  return (
    <svg viewBox="0 0 96 16" className="h-3 w-auto" fill="currentColor" aria-label="Solana">
      <text x="0" y="13" fontFamily="monospace" fontSize="13" fontWeight="700" letterSpacing="0.5" className="fill-rom-green">
        SOLANA
      </text>
    </svg>
  )
}
