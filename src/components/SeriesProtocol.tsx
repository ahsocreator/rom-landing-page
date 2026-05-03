import { motion } from 'framer-motion'
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react'
import { Button } from './ui/Button'
import { Section } from './ui/Section'
import { SectionIndex } from './ui/SectionIndex'
import { AssetImage } from './ui/AssetImage'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function SeriesProtocol() {
  return (
    <Section id="series" className="relative overflow-hidden">
      <SectionIndex index="04" label="Canonical IP · On-chain" />
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
          className="lg:col-span-7"
        >
          <h2 className="display-2 font-mono">
            One face.
            <br />
            <span className="gradient-text-arcade glitch-hover" data-text="One canonical truth.">One canonical truth.</span>
            <br />
            Forever yours.
          </h2>
          <p className="mt-7 max-w-xl text-[16px] leading-[1.6] text-rom-fg-dim">
            Pre-register your character with one Series ID and a reference image. Every story tagged to that ID inherits the same face, the same voice, the same identity. The model can't drift. Episodes 1, 12, 12,000 — visually consistent, mathematically the same character.
          </p>
          <p className="mt-5 max-w-xl text-[14px] leading-[1.7] text-rom-fg-muted">
            The Series ID is a record on Solana. Idempotent. Verifiable. Yours. Every clip the API returns is provably tied to that record — characters, scenes, items, clips, all enumerated. Licensing stops being lawsuits and starts being invoices.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button variant="primary">
              Mint a Series ID
              <ArrowRight size={16} strokeWidth={2.4} />
            </Button>
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-rom-green/40 bg-rom-green/[0.04] text-[11px] font-mono uppercase tracking-[0.22em] text-rom-green">
              <RotateCcw size={12} />
              Series · Drift = 0%
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 28 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="lg:col-span-5"
        >
          <CharacterStrip />
        </motion.div>
      </div>
    </Section>
  )
}

function CharacterStrip() {
  // Three "episodes" of the same character — simulated with three placeholders that visually rhyme
  const episodes = [
    { n: 'EP_001', tag: 'Pilot', accent: 'green' },
    { n: 'EP_012', tag: 'Latest', accent: 'green' },
    { n: 'EP_∞', tag: 'Forever', accent: 'magenta' },
  ]
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-3">
        {episodes.map((ep, i) => (
          <motion.div
            key={ep.n}
            animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-rom-green/40 bg-rom-card"
          >
            <AssetImage seed={`rom-char-${ep.n}`} className="absolute inset-0 size-full" intensity="hard" />
            <div className="absolute left-2 top-2 z-10 px-2 py-0.5 rounded-md border border-rom-green/50 bg-rom-card/80 backdrop-blur text-[8px] font-mono uppercase tracking-[0.22em] text-rom-green">
              {ep.n}
            </div>
            <div className="absolute right-2 top-2 z-10 size-2 rounded-full bg-rom-green pulse-dot" />
            <div className="absolute inset-x-2 bottom-2 z-10 px-2 py-1 rounded-md bg-rom-bg/85 backdrop-blur text-[8px] font-mono uppercase tracking-[0.22em] text-rom-green text-center">
              {ep.tag}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-rom-green/30 bg-rom-card text-[10.5px] font-mono uppercase tracking-[0.22em] text-rom-fg-dim">
        <Sparkles size={12} className="icon-glow text-rom-green" />
        <span>One IP · Drops 1 → ∞</span>
      </div>
    </div>
  )
}
