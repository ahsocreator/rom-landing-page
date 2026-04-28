import { ArrowRight, Hexagon, ImageIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { GlowIcon } from './ui/GlowIcon'
import { Section } from './ui/Section'
import { SectionIndex } from './ui/SectionIndex'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const lineage = [
  { tag: 'ORIGINAL', title: 'The Last Signal', author: '0xA1cF...7e3B', tone: 'green' },
  { tag: 'REMIX', title: 'Echoes of Tomorrow', author: '0xC91a...3d7C', tone: 'amber' },
  { tag: 'REMIX', title: 'New Horizons', author: '0xD3f2...8b1E', tone: 'cyan' },
] as const

export function AssetAnatomy() {
  return (
    <Section id="anatomy" className="relative overflow-hidden">
      <SectionIndex index="06" label="Anatomy of an IP">
        <h2 className="display-2 font-mono">
          One asset.
          <br />
          <span className="gradient-text-arcade glitch-hover" data-text="Provable lineage.">
            Provable lineage.
          </span>
        </h2>
        <p className="mt-6 max-w-2xl text-[15px] md:text-[17px] leading-[1.6] text-rom-fg-dim">
          Every drop ROM ships becomes an on-chain asset with metadata, provenance, and a remix tree. Fork it, derive it, license it — every relationship is verifiable.
        </p>
      </SectionIndex>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease }}
        className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
      >
        {/* MAIN ASSET CARD */}
        <div className="lg:col-span-9">
          <MainAssetCard />
        </div>

        {/* LINEAGE COLUMN */}
        <div className="lg:col-span-3 relative">
          <LineageColumn />
        </div>
      </motion.div>
    </Section>
  )
}

function MainAssetCard() {
  return (
    <div className="relative rounded-3xl border border-rom-green/55 bg-rom-card overflow-hidden border-glow">
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-7 py-4 border-b border-rom-green/20">
        <div className="flex items-center gap-2.5 text-rom-green">
          <span className="size-2 rounded-full bg-rom-green pulse-dot" />
          <span className="micro-label font-mono text-[12px] tracking-[0.18em]">ROM ASSET ℕ</span>
        </div>
        <span className="micro-label font-mono text-rom-green text-[12px] tracking-[0.14em]">
          ID: ROM_7x3f...9aE1
        </span>
      </div>

      {/* Hero image area */}
      <div className="px-6 md:px-7 pt-5 pb-3">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-rom-green/40 bg-rom-bg">
          <CyberpunkScenePlaceholder />
        </div>
      </div>

      {/* Title row */}
      <div className="px-6 md:px-7 pt-3 pb-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[28px] md:text-[34px] font-mono font-semibold text-rom-green-bright leading-tight truncate">
            The Last Signal
          </h3>
          <p className="mt-1 text-[12.5px] font-mono text-rom-fg-muted">
            By <span className="text-rom-fg-dim">0xA1cF...7e3B</span> · 3 days ago
          </p>
        </div>
        <div className="grid size-12 place-items-center rounded-xl border border-rom-green/40 bg-rom-card-elevated flex-shrink-0">
          <GlowIcon icon={Hexagon} size={22} intensity="md" />
        </div>
      </div>

      {/* Bottom metadata strip */}
      <div className="grid grid-cols-3 border-t border-rom-green/30">
        {[
          { l: 'Scenes', v: '12' },
          { l: 'Duration', v: '01:32' },
          { l: 'Resolution', v: '1080p' },
        ].map((m, i) => (
          <div
            key={m.l}
            className={`px-6 md:px-7 py-4 ${i < 2 ? 'border-r border-rom-green/20' : ''}`}
          >
            <div className="micro-label font-mono text-rom-fg-muted text-[10.5px]">{m.l}</div>
            <div className="mt-1 text-[18px] md:text-[20px] font-mono font-semibold text-rom-fg">
              {m.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Stylized placeholder that evokes the cyberpunk-green hero scene from the spec.
// User will swap this with their actual key art.
function CyberpunkScenePlaceholder() {
  return (
    <>
      {/* Base radial gradient — matrix-green undertone */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 35%, oklch(0.55 0.25 145 / 0.55) 0%, oklch(0.20 0.08 150) 55%, oklch(0.07 0.012 150) 100%)',
        }}
      />

      {/* Vertical "rain" streaks — animated */}
      <RainStreaks />

      {/* Center glowing ring portal */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: '8%' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
          className="relative"
        >
          <div
            className="size-44 md:size-48 rounded-full border-[3px] border-rom-green-bright"
            style={{
              boxShadow:
                '0 0 80px oklch(0.92 0.24 145 / 0.85), inset 0 0 40px oklch(0.92 0.24 145 / 0.45)',
              borderStyle: 'dashed',
            }}
          />
          <div className="absolute inset-3 rounded-full border border-rom-green/50" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: '0 0 60px oklch(0.92 0.24 145 / 0.6)',
            }}
          />
        </motion.div>
      </div>

      {/* Silhouette figure at center-bottom */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center" style={{ paddingBottom: '6%' }}>
        <div
          className="w-12 md:w-14 h-32 md:h-36 rounded-t-[40%]"
          style={{
            background:
              'linear-gradient(180deg, oklch(0.05 0.005 150) 0%, oklch(0.03 0.005 150) 70%, oklch(0.10 0.012 150) 100%)',
            boxShadow: '0 -10px 30px oklch(0.92 0.24 145 / 0.3)',
          }}
        />
      </div>

      {/* "Dropzone" hint corner */}
      <div className="absolute right-3 bottom-3 flex items-center gap-2 px-2 py-1 rounded-md border border-rom-green/30 bg-rom-card text-[9px] font-mono uppercase tracking-[0.22em] text-rom-fg-muted">
        <ImageIcon size={11} className="text-rom-green icon-glow-sm" strokeWidth={1.5} />
        Swap with key art
      </div>

      {/* Subtle scanlines */}
      <div className="absolute inset-0 scanlines opacity-30" />
    </>
  )
}

function RainStreaks() {
  // 14 streaks at varied x positions, lengths, speeds — looks like Matrix rain
  const streaks = Array.from({ length: 14 }, (_, i) => ({
    x: (i / 14) * 100 + (Math.random() - 0.5) * 3,
    h: 28 + Math.random() * 60,
    delay: Math.random() * 6,
    dur: 5 + Math.random() * 6,
    opacity: 0.18 + Math.random() * 0.35,
  }))
  return (
    <div className="absolute inset-0 overflow-hidden">
      {streaks.map((s, i) => (
        <motion.div
          key={i}
          initial={{ y: '-30%', opacity: 0 }}
          animate={{ y: '130%', opacity: [0, s.opacity, s.opacity, 0] }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute"
          style={{
            left: `${s.x}%`,
            width: 1,
            height: `${s.h}%`,
            background:
              'linear-gradient(180deg, transparent, oklch(0.92 0.24 145 / 0.85), transparent)',
          }}
        />
      ))}
    </div>
  )
}

function LineageColumn() {
  return (
    <div className="relative">
      <div className="micro-label font-mono text-rom-green mb-4 tracking-[0.22em]">// Lineage</div>

      <div className="space-y-4">
        {lineage.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease }}
            className="relative rounded-2xl border border-rom-green/45 bg-rom-card p-3.5 hover:border-rom-green hover:bg-rom-card-hover transition-all"
          >
            {/* Inbound arrow */}
            <ArrowConnector />

            <div className="flex items-center gap-3.5">
              <LineageThumb tone={it.tone} index={i} />
              <div className="min-w-0 flex-1">
                <div className="micro-label font-mono text-rom-green text-[10px] tracking-[0.22em]">
                  {it.tag}
                </div>
                <div className="mt-1 text-[15px] font-mono font-semibold text-rom-fg leading-tight truncate">
                  {it.title}
                </div>
                <div className="mt-1 text-[11px] font-mono text-rom-fg-muted truncate">
                  By {it.author}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <a
        href="#"
        className="mt-5 flex items-center justify-between rounded-2xl border border-rom-green/45 bg-rom-card px-4 py-3.5 hover:bg-rom-green/[0.06] transition-colors group"
      >
        <span className="micro-label font-mono text-rom-green tracking-[0.22em]">View Full Tree</span>
        <ArrowRight size={16} className="text-rom-green group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  )
}

function ArrowConnector() {
  // Tiny stub line + arrowhead on the left edge of each lineage card,
  // suggesting the connection back to the main asset card.
  return (
    <span aria-hidden className="hidden lg:block absolute right-full top-1/2 -translate-y-1/2 mr-0">
      <span className="block h-px w-6 xl:w-10 bg-gradient-to-r from-transparent to-rom-green/70 -mr-px" />
    </span>
  )
}

function LineageThumb({ tone, index }: { tone: 'green' | 'amber' | 'cyan'; index: number }) {
  const tones: Record<string, string> = {
    green: 'oklch(0.55 0.20 145 / 0.55)',
    amber: 'oklch(0.65 0.20 60 / 0.55)',
    cyan: 'oklch(0.55 0.18 220 / 0.55)',
  }
  return (
    <div className="relative size-16 rounded-lg overflow-hidden border border-rom-green/35 flex-shrink-0">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${tones[tone]} 0%, oklch(0.10 0.012 150) 75%)`,
        }}
      />
      <div className="absolute inset-0 grid-floor opacity-30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="size-6 rounded-full border border-rom-green-bright"
          style={{ boxShadow: '0 0 12px oklch(0.92 0.24 145 / 0.7)' }}
        />
      </div>
      {/* Different silhouette per index for variety */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-1">
        <div
          className={`${index === 0 ? 'w-2.5 h-5' : index === 1 ? 'w-3 h-4' : 'w-2 h-6'} rounded-t-full bg-black/85`}
        />
      </div>
    </div>
  )
}
