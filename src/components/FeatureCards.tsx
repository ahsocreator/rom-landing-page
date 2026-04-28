import { Boxes, GitFork, ShieldCheck, Wallet, ArrowRight } from 'lucide-react'
import { GlowIcon } from './ui/GlowIcon'
import { MotionFade, MotionStagger } from './ui/Motion'
import { Section } from './ui/Section'

const cards = [
  {
    icon: Boxes,
    title: 'Programmable Assets',
    body: 'Videos are structured as composable assets, not static files.',
  },
  {
    icon: GitFork,
    title: 'Remix & Derive',
    body: 'Modify any scene. Every remix creates a traceable on-chain derivative.',
  },
  {
    icon: ShieldCheck,
    title: 'Attribution by Design',
    body: 'Credit flows automatically to creators and contributors across the entire lineage.',
  },
  {
    icon: Wallet,
    title: 'Monetize Natively',
    body: 'Set permissions, prices and splits. Payments are enforced by the protocol.',
  },
]

export function FeatureCards() {
  return (
    <Section id="features" className="!py-12 md:!py-16">
      <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <MotionFade
            key={c.title}
            className="group relative flex flex-col rounded-2xl border border-rom-green/30 bg-rom-card p-6 md:p-7 hover:border-rom-green/60 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="grid size-14 place-items-center rounded-full border border-rom-green/40 bg-rom-green/[0.05] mb-5">
              <GlowIcon icon={c.icon} size={24} intensity="lg" />
            </div>
            <h3 className="text-[18px] md:text-[20px] font-mono font-semibold text-rom-fg">{c.title}</h3>
            <p className="mt-3 text-[13.5px] leading-[1.6] text-rom-fg-dim flex-1">{c.body}</p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-rom-green hover:text-rom-green-bright transition-colors group/cta"
            >
              Learn more
              <ArrowRight size={12} className="group-hover/cta:translate-x-0.5 transition-transform" />
            </a>
          </MotionFade>
        ))}
      </MotionStagger>
    </Section>
  )
}
