import { Sparkles } from 'lucide-react'
import { MotionFade, MotionStagger } from './ui/Motion'
import { Section } from './ui/Section'
import { SectionIndex } from './ui/SectionIndex'
import { AssetImage } from './ui/AssetImage'

// Asymmetric magazine grid with anime-character placeholders.
const tiles: { label: string; span: string; seed: string }[] = [
  { label: 'Character · Lead', span: 'col-span-2 md:col-span-1 md:row-span-2', seed: 'rom-ip-lead' },
  { label: 'Hero shot', span: 'col-span-2', seed: 'rom-ip-hero' },
  { label: 'Key visual', span: 'col-span-1', seed: 'rom-ip-keyvis' },
  { label: 'Character · Side', span: 'col-span-1', seed: 'rom-ip-side' },
  { label: 'Showreel still', span: 'col-span-2', seed: 'rom-ip-showreel' },
  { label: 'Prop / item', span: 'col-span-1', seed: 'rom-ip-prop' },
  { label: 'Mood · color', span: 'col-span-1', seed: 'rom-ip-mood' },
  { label: 'World establish', span: 'col-span-2', seed: 'rom-ip-world' },
]

export function IPShowcase() {
  return (
    <Section id="ip-showcase" className="relative overflow-hidden">
      <div className="relative">
        <SectionIndex index="03" label="Your IP · The whole universe">
          <h2 className="display-2 font-mono">
            Your characters.
            <br />
            <span className="gradient-text-arcade glitch-hover" data-text="Your worlds.">
              Your worlds.
            </span>
            <br />
            Your franchise.
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] md:text-[17px] leading-[1.6] text-rom-fg-dim">
            Drop in your art. ROM locks it as a canonical record. Every drop after this is provably yours — license it, syndicate it, monetize it forever.
          </p>
        </SectionIndex>

        <MotionStagger
          className="mt-4 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4"
          style={{ gridAutoFlow: 'dense' }}
        >
          {tiles.map((t, i) => (
            <MotionFade
              key={i}
              className={`relative ${t.span} group`}
            >
              <div className="absolute inset-0 rounded-2xl border border-rom-green/40 hover:border-rom-green bg-rom-card overflow-hidden transition-all duration-500">
                <AssetImage seed={t.seed} className="absolute inset-0 size-full" />
                {/* Label overlay (functional UI, not a tint layer) */}
                <span className="absolute left-2 bottom-2 z-10 px-2 py-1 rounded-md border border-rom-green/40 bg-rom-card/85 backdrop-blur micro-label font-mono text-rom-green text-[9px]">
                  {t.label}
                </span>
                {/* corner brackets */}
                <span className="absolute left-2 top-2 size-3 border-l border-t border-rom-green z-10" />
                <span className="absolute right-2 top-2 size-3 border-r border-t border-rom-green z-10" />
                <span className="absolute left-2 bottom-2 size-3 border-l border-b border-rom-green z-10" />
                <span className="absolute right-2 bottom-2 size-3 border-r border-b border-rom-green z-10" />
              </div>
            </MotionFade>
          ))}
        </MotionStagger>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-rom-green/40 bg-rom-green/[0.05] text-[11px] font-mono uppercase tracking-[0.22em] text-rom-green">
            <Sparkles size={12} className="icon-glow" />
            One IP · Every drop
          </span>
          <p className="text-[14px] leading-[1.65] text-rom-fg-dim max-w-2xl">
            One reference image becomes your canonical IP.{' '}
            <span className="gradient-text-arcade font-semibold">
              Your franchise compounds. Your fans recognize them. Every license is yours to sign.
            </span>
          </p>
        </div>
      </div>
    </Section>
  )
}
