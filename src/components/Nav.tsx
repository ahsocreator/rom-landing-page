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
          <div className="hidden lg:flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-[0.18em] text-rom-fg-dim">
            <span>Built on</span>
            <SolanaLogo />
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

function SolanaLogo() {
  // Official 3-bar Solana mark + wordmark, tinted green to match the site palette.
  return (
    <span className="inline-flex items-center gap-1.5 text-rom-green icon-glow-sm">
      {/* Logomark — 3 angled stripes */}
      <svg viewBox="0 0 120 95" className="h-3.5 w-auto" fill="currentColor" aria-hidden>
        <path d="M93.94 75.15H1.81c-1.65 0-2.49-2-1.32-3.18L18.93 53.4a2 2 0 0 1 1.41-.59h92.13c1.65 0 2.49 2 1.32 3.18L95.35 74.56a2 2 0 0 1-1.41.59zM18.93 1.34A2 2 0 0 1 20.34.75h92.13c1.65 0 2.49 2 1.32 3.18L95.35 22.51a2 2 0 0 1-1.41.59H1.81c-1.65 0-2.49-2-1.32-3.18L18.93 1.34zM95.35 37.39a2 2 0 0 0-1.41-.59H1.81c-1.65 0-2.49 2-1.32 3.18L18.93 58.55a2 2 0 0 0 1.41.59h92.13c1.65 0 2.49-2 1.32-3.18L95.35 37.39z" />
      </svg>
      {/* Wordmark */}
      <span className="text-rom-green font-mono font-semibold tracking-[0.06em] normal-case text-[12px]">
        Solana
      </span>
    </span>
  )
}
