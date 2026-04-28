import { Code2, Send, MessageCircle } from 'lucide-react'
import { GlowIcon } from './ui/GlowIcon'

export function Footer() {
  const cols = [
    { title: 'Protocol', links: ['Docs', 'API Reference', 'Asset Graph', 'Permissions'] },
    { title: 'Builders', links: ['Quickstart', 'Series Assets', 'Webhooks', 'Status'] },
    { title: 'Ecosystem', links: ['Explorer', 'Partners', 'Showcase', 'Brand'] },
    { title: 'Legal', links: ['Terms', 'Privacy', 'Security', 'Disclosure'] },
  ]

  return (
    <footer className="border-t border-rom-border-dim">
      <div className="mx-auto max-w-[1800px] px-6 md:px-10 lg:px-16 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-bold tracking-tight text-rom-green text-glow">ROM</span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-rom-fg-dim leading-tight">
                Programmable<br />Media Protocol
              </span>
            </div>
            <p className="mt-5 max-w-xs text-[12px] leading-[1.7] text-rom-fg-muted">
              The on-chain protocol for generating, owning, permissioning, and monetizing video on Solana.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-rom-fg-muted">
              <span className="size-1.5 rounded-full bg-rom-green pulse-dot" />
              <span className="text-rom-green">Mainnet</span>
              <span>·</span>
              <span>v1.0.0</span>
              <span>·</span>
              <span>uptime 99.97%</span>
            </div>

            <div className="mt-8 flex items-center gap-2">
              {[Code2, Send, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid size-10 place-items-center rounded-lg border border-rom-border-dim hover:border-rom-green/60 hover:bg-rom-green/[0.05] transition-all group"
                >
                  <GlowIcon icon={Icon} size={16} intensity="sm" className="group-hover:icon-glow" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.22em] text-rom-green mb-4">
                {c.title}
              </h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[12.5px] font-mono text-rom-fg-dim hover:text-rom-green transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-rom-border-dim flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.18em] text-rom-fg-muted">
          <span>© 2026 ROM Protocol · Built on Solana</span>
          <span className="text-rom-green/70">
            ROM_PROTOCOL // V1.0.0 // BLOCK_HEIGHT 304_991_402
          </span>
        </div>
      </div>
    </footer>
  )
}
