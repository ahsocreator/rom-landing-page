import { Code2, Infinity as InfinityIcon, Workflow, Coins } from 'lucide-react'
import { GlowIcon } from './ui/GlowIcon'

const items = [
  { icon: Code2, label: '1 Line · Live Character' },
  { icon: InfinityIcon, label: '∞ Mints · One Endpoint' },
  { icon: Workflow, label: 'Revenue Routing · Auto' },
  { icon: Coins, label: '4 Minutes · Wallet Earning' },
]

export function TickerBar() {
  return (
    <div className="px-6 md:px-10 lg:px-16 py-6 relative">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl border border-rom-green/40 bg-rom-card p-2 border-glow-subtle">
          {items.map((it) => (
            <div
              key={it.label}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 hover:bg-rom-green/[0.05] transition-colors group"
            >
              <span className="grid size-10 place-items-center rounded-lg border border-rom-green/40 bg-rom-green/[0.04] group-hover:bg-rom-green/[0.10] transition-colors">
                <GlowIcon icon={it.icon} size={18} intensity="md" />
              </span>
              <span className="text-[11px] md:text-[12px] font-mono uppercase tracking-[0.18em] text-rom-fg-dim group-hover:text-rom-fg transition-colors">
                {it.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
