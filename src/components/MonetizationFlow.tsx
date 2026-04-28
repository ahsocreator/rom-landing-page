import { motion } from 'framer-motion'
import { Lock, Zap, Sparkles, Globe2, Coins, ArrowDown, ArrowRight } from 'lucide-react'
import { GlowIcon } from './ui/GlowIcon'
import { Section } from './ui/Section'
import { SectionIndex } from './ui/SectionIndex'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const flowSteps = [
  {
    n: '01',
    icon: Lock,
    title: 'Lock IP',
    desc: 'Drop a character. ROM writes the canonical record on Solana.',
    metric: '1 character',
  },
  {
    n: '02',
    icon: Zap,
    title: 'Generate',
    desc: 'Type a prompt. ROM ships an episode in ~10 minutes.',
    metric: '25 credits',
  },
  {
    n: '03',
    icon: Sparkles,
    title: 'Drop',
    desc: 'Each render is a node in your IP tree. Every drop is yours forever.',
    metric: '∞ drops',
  },
  {
    n: '04',
    icon: Globe2,
    title: 'Distribute',
    desc: 'Ship the same IP to 6 formats and 4 aspects. Every feed.',
    metric: '6 channels',
  },
  {
    n: '05',
    icon: Coins,
    title: 'Earn',
    desc: 'Ad revenue, sponsorships, licenses — paid out on-chain.',
    metric: 'Auto-paid',
  },
]

const splits = [
  { tier: 'Root creator', pct: '40%', who: 'You — the IP owner' },
  { tier: 'Parent remixer', pct: '36%', who: 'First-gen derivative' },
  { tier: 'Active remixer', pct: '24%', who: 'Second-gen and beyond' },
]

export function MonetizationFlow() {
  return (
    <Section id="flow" className="relative overflow-hidden">
      <SectionIndex index="07" label="Money flow · End-to-end">
        <h2 className="display-2 font-mono">
          Every drop is a node.
          <br />
          <span className="gradient-text-arcade glitch-hover" data-text="Every node earns.">
            Every node earns.
          </span>
        </h2>
        <p className="mt-6 max-w-2xl text-[15px] md:text-[17px] leading-[1.6] text-rom-fg-dim">
          Five steps from blank to bank account. Splits enforced by the protocol. No platform between you and the upside.
        </p>
      </SectionIndex>

      {/* HORIZONTAL FLOW */}
      <div className="relative mb-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3">
          {flowSteps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="relative"
            >
              <div className="relative rounded-2xl border border-rom-green/35 bg-rom-card p-5 md:p-6 h-full hover:border-rom-green/70 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <span className="grid size-12 place-items-center rounded-xl border border-rom-green/40 bg-rom-card-elevated">
                    <GlowIcon icon={s.icon} size={20} intensity="lg" />
                  </span>
                  <span className="micro-label font-mono text-rom-green/40 text-[28px] leading-none font-bold">
                    {s.n}
                  </span>
                </div>
                <h3 className="text-[18px] md:text-[20px] font-mono font-semibold text-rom-fg">
                  {s.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-[1.55] text-rom-fg-dim">{s.desc}</p>
                <div className="mt-4 inline-flex rounded-md border border-rom-green/35 bg-rom-card-elevated px-2.5 py-1 micro-label font-mono text-rom-green text-[10px]">
                  {s.metric}
                </div>
              </div>

              {/* Connector arrow on desktop, between cards */}
              {i < flowSteps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 z-10 -translate-y-1/2 size-6 rounded-full bg-rom-bg border border-rom-green/40 items-center justify-center">
                  <ArrowRight size={12} className="text-rom-green" />
                </div>
              )}
              {/* Down arrow on mobile */}
              {i < flowSteps.length - 1 && (
                <div className="md:hidden flex justify-center my-2">
                  <ArrowDown size={14} className="text-rom-green/60" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* SPLIT WATERFALL */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* LEFT: Revenue source aggregator */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-rom-green/40 bg-rom-card p-6 h-full">
            <div className="micro-label font-mono text-rom-green mb-4 tracking-[0.22em]">
              // Revenue inputs
            </div>
            <div className="space-y-3">
              {[
                { label: 'YouTube · AdSense', amt: '+0.18 SOL' },
                { label: 'TikTok · brand spot', amt: '+0.45 SOL' },
                { label: 'Music license', amt: '+1.20 SOL' },
                { label: 'Merch + NFT', amt: '+0.88 SOL' },
                { label: 'Subscription drops', amt: '+0.34 SOL' },
              ].map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between rounded-xl border border-rom-green/25 bg-rom-card-elevated px-4 py-3 hover:border-rom-green/60 transition-colors"
                >
                  <span className="text-[13px] font-mono text-rom-fg-dim">{r.label}</span>
                  <code className="text-[13px] font-mono text-rom-green font-semibold">{r.amt}</code>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-rom-green/25 flex items-center justify-between">
              <span className="micro-label font-mono text-rom-fg-muted">Today · gross</span>
              <code className="text-[20px] md:text-[24px] font-mono font-bold gradient-text-arcade">
                +3.05 SOL
              </code>
            </div>
          </div>
        </div>

        {/* CENTER: arrow + split waterfall */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-rom-green/40 bg-rom-card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="micro-label font-mono text-rom-green tracking-[0.22em]">
                // Auto-split · enforced on-chain
              </div>
              <code className="text-[11px] font-mono text-rom-fg-muted">smart_contract.solana</code>
            </div>

            <div className="space-y-3">
              {splits.map((s, i) => (
                <SplitBar key={s.tier} {...s} index={i} />
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-rom-green/25 grid grid-cols-3 gap-3">
              {[
                { l: 'Latency', v: '<1s' },
                { l: 'Off-chain trust', v: '0' },
                { l: 'Disputes', v: 'None' },
              ].map((m) => (
                <div key={m.l} className="rounded-md bg-rom-card-elevated border border-rom-green/25 px-3 py-2 text-center">
                  <div className="micro-label font-mono text-rom-fg-muted text-[9px]">{m.l}</div>
                  <div className="mt-0.5 text-[14px] font-mono font-semibold text-rom-green">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}

function SplitBar({ tier, pct, who, index }: { tier: string; pct: string; who: string; index: number }) {
  const numericPct = parseInt(pct, 10)
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease, delay: 0.15 + index * 0.1 }}
      className="rounded-xl border border-rom-green/30 bg-rom-card-elevated overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="size-8 grid place-items-center rounded-lg border border-rom-green/40 bg-rom-card text-[11px] font-mono font-bold text-rom-green">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] font-mono font-semibold text-rom-fg leading-tight">{tier}</div>
          <div className="text-[10.5px] font-mono text-rom-fg-muted truncate">{who}</div>
        </div>
        <code className="text-[18px] md:text-[20px] font-mono font-bold text-rom-green">{pct}</code>
      </div>
      <div className="h-1.5 w-full bg-rom-bg/60">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${numericPct}%` }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0, ease, delay: 0.4 + index * 0.12 }}
          className="h-full bg-gradient-to-r from-rom-green/50 to-rom-green-bright"
          style={{ boxShadow: '0 0 12px oklch(0.85 0.22 145 / 0.4)' }}
        />
      </div>
    </motion.div>
  )
}
