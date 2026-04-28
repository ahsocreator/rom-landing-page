import { Coins, RefreshCw, TrendingUp, MonitorPlay, Music2, ShoppingBag } from 'lucide-react'
import { Button } from './ui/Button'
import { GlowIcon } from './ui/GlowIcon'
import { MotionFade, MotionStagger } from './ui/Motion'
import { Section } from './ui/Section'
import { SectionIndex } from './ui/SectionIndex'

const moneyMoves = [
  {
    icon: MonitorPlay,
    title: 'Compound a channel',
    body: 'Your character runs its own show. Episode after episode. Ad revenue, sponsorships, back-catalog royalties — all stacking while you sleep.',
    accent: 'magenta',
  },
  {
    icon: Music2,
    title: 'License music collabs',
    body: 'Artists pay $500–$5K for a music video. ROM spins one with your IP for 25 credits. Pocket the spread, keep the rights.',
    accent: 'cyan',
  },
  {
    icon: ShoppingBag,
    title: 'License ad spots',
    body: 'Brands need ownable creative. Your IP becomes the campaign. Charge per spot, retain ownership, license forever.',
    accent: 'green',
  },
  {
    icon: TrendingUp,
    title: 'Build a franchise',
    body: 'Same character. Compounding audience. Merch, NFTs, syndication, sequels — every option opens once your IP has scale.',
    accent: 'magenta',
  },
]

// Borders + strokes always green. Card titles all-green too. Glow color stays multi for ambient personality.
const greenBorder = 'border-rom-green/40 hover:border-rom-green'
const accent: Record<string, { glow: string }> = {
  green: { glow: 'oklch(0.85 0.22 145 / 0.20)' },
  magenta: { glow: 'oklch(0.72 0.32 350 / 0.20)' },
  cyan: { glow: 'oklch(0.85 0.18 200 / 0.18)' },
}

export function MakeMoney() {
  return (
    <Section id="pricing" className="relative overflow-hidden">
      <div className="relative">
        <SectionIndex index="05" label="Pricing · Your IP at work">
          <h2 className="display-2 font-mono">
            <span className="block">Your IP earns.</span>
            <span className="block gradient-text-arcade glitch-hover" data-text="While you sleep.">While you sleep.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] md:text-[17px] leading-[1.6] text-rom-fg-dim">
            25 credits to spin a new drop. If it fails, every credit comes back. No subscriptions. No floor pricing. No "platform owns your IP" small print. The upside compounds your way.
          </p>
        </SectionIndex>

        {/* Pricing card */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Hero pricing */}
          <div className="lg:col-span-5">
            <div className="relative h-full rounded-[28px] holo-frame">
              <div className="relative h-full rounded-[28px] border border-rom-green/40 bg-rom-card p-7 md:p-9 overflow-hidden">
                <div aria-hidden className="absolute inset-0 grid-floor opacity-25" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-rom-green">
                    <span className="size-1.5 rounded-full bg-rom-green pulse-dot" />
                    Per drop
                  </div>
                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="text-[88px] md:text-[112px] font-mono font-bold leading-none gradient-text-arcade">
                      25
                    </span>
                    <span className="text-[16px] font-mono uppercase tracking-[0.22em] text-rom-fg-dim">
                      credits
                    </span>
                  </div>
                  <p className="mt-3 text-[13px] font-mono text-rom-fg-muted">
                    Charged on success. Refunded on failure. You keep the IP either way.
                  </p>

                  <div className="mt-8 space-y-3">
                    {[
                      { icon: Coins, label: '25 credits per drop · locked rate' },
                      { icon: RefreshCw, label: 'Auto-refund on every failure' },
                      { icon: TrendingUp, label: 'You own the IP. Every drop, every license, every cent.' },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center gap-3">
                        <span className="grid size-8 place-items-center rounded-md border border-rom-green/40 bg-rom-green/[0.06]">
                          <GlowIcon icon={row.icon} size={14} intensity="md" />
                        </span>
                        <span className="text-[13.5px] font-mono text-rom-fg">{row.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-9">
                    <Button variant="primary" className="w-full justify-center">
                      Claim 100 credits free
                    </Button>
                    <p className="mt-3 text-center text-[11px] font-mono uppercase tracking-[0.22em] text-rom-fg-muted">
                      First 4 drops on us
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Money moves */}
          <div className="lg:col-span-7">
            <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
              {moneyMoves.map((m) => {
                const a = accent[m.accent]
                return (
                  <MotionFade
                    key={m.title}
                    className={`group relative rounded-2xl border ${greenBorder} bg-rom-card p-6 hover:-translate-y-1 hover:bg-rom-card-hover transition-all duration-300`}
                  >
                    <span
                      aria-hidden
                      className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ boxShadow: `0 0 36px ${a.glow}` }}
                    />
                    <div className="relative">
                      <div className={`grid size-12 place-items-center rounded-xl border ${greenBorder} bg-rom-bg/40 mb-5`}>
                        <GlowIcon icon={m.icon} size={22} intensity="lg" />
                      </div>
                      <h3 className="text-[18px] md:text-[20px] font-mono font-semibold text-rom-green">
                        {m.title}
                      </h3>
                      <p className="mt-2 text-[13.5px] leading-[1.6] text-rom-fg-dim">{m.body}</p>
                    </div>
                  </MotionFade>
                )
              })}
            </MotionStagger>
          </div>
        </div>
      </div>
    </Section>
  )
}
