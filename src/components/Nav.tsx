import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import romLogo from '../assets/rom-logo.png'
import solanaLogo from '../assets/solana-sol-logo.png'

const LINKS = [
  { label: 'HOW IT WORKS', href: '#how-it-works' },
  { label: 'EXAMPLE', href: '#example-flow' },
  { label: 'API', href: '#api-example' },
  { label: 'WHY ROM', href: '#why-rom' },
] as const

export function Nav() {
  // Track which section is currently in view so we can highlight that nav link
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((s): s is HTMLElement => s !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the visible section with the highest intersection ratio.
        // We don't reset on `isIntersecting=false` so the last active section
        // sticks until the next one takes over (avoids flicker between sections).
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0 && visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        // Top offset for the sticky nav (~80px) + bottom offset so a section
        // is "active" once it has scrolled past the upper third of viewport.
        rootMargin: '-80px 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.6, 0.85, 1],
      }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-rom-border-dim/20 bg-rom-bg/80 backdrop-blur-xl">
      <div className="flex w-full items-center justify-between gap-6 px-6 py-4 md:px-10 lg:px-16">
        <motion.a
          href="#top"
          className="flex items-center gap-3 group"
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 420, damping: 22 }}
        >
          <img src={romLogo} alt="ROM Logo" className="h-10 w-auto" />
          <span className="font-sans text-2xl font-bold tracking-tight text-white transition-colors">
            ROM
          </span>
        </motion.a>

        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-mono tracking-widest">
          {LINKS.map((l) => {
            const id = l.href.slice(1)
            const isActive = activeId === id
            return (
              <motion.a
                key={l.label}
                href={l.href}
                data-active={isActive ? 'true' : undefined}
                className="nav-link text-rom-fg-dim"
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              >
                {l.label}
              </motion.a>
            )
          })}
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
