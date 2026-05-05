import romLogo from '../assets/rom-logo.png'
import solanaLogo from '../assets/solana-sol-logo.png'

export function Nav() {
  // Anchors point to the actual `id` on each section component:
  //   HowRomWorks → id="how-it-works"
  //   ExampleFlow → id="example-flow"
  //   ApiExample  → id="api-example"
  //   WhyRom      → id="why-rom"
  const links = [
    { label: 'HOW IT WORKS', href: '#how-it-works' },
    { label: 'EXAMPLE', href: '#example-flow' },
    { label: 'API', href: '#api-example' },
    { label: 'WHY ROM', href: '#why-rom' },
  ]
  return (
    <header className="sticky top-0 z-50 border-b border-rom-border-dim/20 bg-rom-bg/80 backdrop-blur-xl">
      <div className="flex w-full items-center justify-between gap-6 px-6 py-4 md:px-10 lg:px-16">
        <a href="#top" className="flex items-center gap-3 group">
          <img src={romLogo} alt="ROM Logo" className="h-10 w-auto" />
          <span className="font-sans text-2xl font-bold tracking-tight text-white transition-colors">
            ROM
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-mono tracking-widest">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-rom-fg-dim hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Built on SOLANA badge — replaces the old LAUNCH APP button */}
        <div className="hidden md:inline-flex items-center gap-2.5 px-3.5 py-2 rounded border border-rom-green/35 bg-rom-green/[0.04] text-[11px] md:text-[12px] font-mono uppercase tracking-[0.18em] text-rom-fg-dim">
          <span>Built on</span>
          <img src={solanaLogo} alt="Solana" className="h-3.5 w-auto" />
          <span className="text-white font-bold tracking-[0.12em]">SOLANA</span>
        </div>
      </div>
    </header>
  )
}
