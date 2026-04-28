import { ArrowRight, Hexagon, GitFork, Layers } from 'lucide-react'
import { motion } from 'framer-motion'
import { Section } from './ui/Section'
import { SectionIndex } from './ui/SectionIndex'
import { AssetImage } from './ui/AssetImage'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Tone = 'green' | 'amber' | 'cyan' | 'violet'
type LineageNode = { title: string; author: string; date: string; royalty: string; tone: Tone; seed: string }
type LineageBranch = { parent: LineageNode; children: LineageNode[] }

const rootData = {
  title: 'The Last Signal',
  author: '0xA1cF...7e3B',
  date: '3 days ago',
  scenes: 12,
  duration: '01:32',
  resolution: '1080p',
  seed: 'rom-tree-root',
}

const branches: LineageBranch[] = [
  {
    parent: { title: 'Echoes of Tomorrow', author: '0xC91a...3d7C', date: '2 days ago', royalty: '60% / 40%', tone: 'amber', seed: 'rom-tree-echoes' },
    children: [
      { title: 'Memory Fragment', author: '0xB2eD...91fA', date: '14h ago', royalty: '40 / 36 / 24', tone: 'amber', seed: 'rom-tree-memfrag' },
      { title: 'Resurrection', author: '0x4Fa2...c08D', date: '6h ago', royalty: '40 / 36 / 24', tone: 'amber', seed: 'rom-tree-resur' },
    ],
  },
  {
    parent: { title: 'New Horizons', author: '0xD3f2...8b1E', date: '1 day ago', royalty: '60% / 40%', tone: 'cyan', seed: 'rom-tree-horizons' },
    children: [
      { title: 'Reentry', author: '0xE07b...44Ca', date: '9h ago', royalty: '40 / 36 / 24', tone: 'cyan', seed: 'rom-tree-reentry' },
      { title: 'Ground Zero', author: '0x77AB...e1f3', date: '2h ago', royalty: '40 / 36 / 24', tone: 'cyan', seed: 'rom-tree-groundz' },
    ],
  },
  {
    parent: { title: 'Static Bloom', author: '0x91cD...4eaB', date: '20h ago', royalty: '60% / 40%', tone: 'violet', seed: 'rom-tree-static' },
    children: [{ title: 'Aftermath', author: '0xF12E...3007', date: '4h ago', royalty: '40 / 36 / 24', tone: 'violet', seed: 'rom-tree-after' }],
  },
]

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
          Every drop becomes a node in the tree. Fork it, derive it, license it — every relationship verifiable, every royalty traceable.
        </p>
      </SectionIndex>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease }}
        className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { l: 'Total assets', v: '8' },
          { l: 'Generations', v: '3' },
          { l: 'Authors', v: '8' },
          { l: 'Royalty splits', v: 'Auto' },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-rom-green/30 bg-rom-card px-4 py-3.5">
            <div className="micro-label font-mono text-rom-fg-muted text-[10px]">{s.l}</div>
            <div className="mt-1 text-[20px] md:text-[22px] font-mono font-semibold text-rom-green">{s.v}</div>
          </div>
        ))}
      </motion.div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
          className="relative max-w-2xl"
        >
          <RootCard />
        </motion.div>

        <div className="relative mt-2 pl-6 md:pl-12">
          <span
            aria-hidden
            className="absolute left-2 md:left-6 top-0 bottom-16 w-px"
            style={{ background: 'linear-gradient(180deg, oklch(0.85 0.22 145 / 0.6), oklch(0.85 0.22 145 / 0.2))' }}
          />
          {branches.map((branch, i) => (
            <BranchRow key={branch.parent.title} branch={branch} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl border border-rom-green/45 bg-rom-card px-5 py-3 micro-label font-mono uppercase tracking-[0.22em] text-rom-green hover:bg-rom-green/[0.06] transition-colors group"
          >
            <Layers size={14} className="text-rom-green icon-glow-sm" />
            View on Solana Explorer
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <p className="text-[13px] font-mono text-rom-fg-muted max-w-md">
            Royalties auto-split: <span className="text-rom-green">40% root · 36% parent · 24% remixer</span>.
            Every payout enforced by the protocol.
          </p>
        </motion.div>
      </div>
    </Section>
  )
}

function RootCard() {
  return (
    <div className="relative rounded-2xl border border-rom-green/55 bg-rom-card overflow-hidden border-glow">
      <div className="flex items-center justify-between px-5 py-3 border-b border-rom-green/25">
        <div className="flex items-center gap-2 text-rom-green">
          <span className="size-2 rounded-full bg-rom-green pulse-dot" />
          <span className="micro-label font-mono text-[11px] tracking-[0.18em]">Root · Original</span>
        </div>
        <span className="micro-label font-mono text-rom-green text-[11px] tracking-[0.14em]">
          ID: ROM_7x3f...9aE1
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4 p-4 md:p-5">
        <AssetImage seed={rootData.seed} className="aspect-square sm:aspect-auto sm:h-full rounded-lg border border-rom-green/35" />
        <div className="flex flex-col">
          <h3 className="text-[22px] md:text-[26px] font-mono font-semibold text-rom-green-bright leading-tight">
            {rootData.title}
          </h3>
          <p className="mt-1 text-[12px] font-mono text-rom-fg-muted">
            By <span className="text-rom-fg-dim">{rootData.author}</span> · {rootData.date}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
            <Stat l="Scenes" v={String(rootData.scenes)} />
            <Stat l="Duration" v={rootData.duration} />
            <Stat l="Resolution" v={rootData.resolution} />
          </div>
          <div className="mt-auto pt-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em]">
            <Hexagon size={12} className="text-rom-green icon-glow-sm" />
            <span className="text-rom-green">Owns 100% of the lineage tree</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ l, v }: { l: string; v: string }) {
  return (
    <div className="rounded-md border border-rom-green/25 bg-rom-card-elevated px-2.5 py-1.5">
      <div className="micro-label font-mono text-rom-fg-muted text-[9px] tracking-[0.18em]">{l}</div>
      <div className="text-[12px] font-mono font-semibold text-rom-fg mt-0.5">{v}</div>
    </div>
  )
}

function BranchRow({ branch, index }: { branch: LineageBranch; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease, delay: 0.1 + index * 0.12 }}
      className="relative flex flex-col md:flex-row gap-4 md:gap-6 mb-6 md:mb-8 items-stretch md:items-center"
    >
      <span
        aria-hidden
        className="hidden md:block absolute -left-6 md:-left-9 top-1/2 w-6 md:w-9 h-px"
        style={{ background: 'linear-gradient(90deg, oklch(0.85 0.22 145 / 0.5), oklch(0.85 0.22 145 / 0.7))' }}
      />
      <div className="md:w-[280px] flex-shrink-0">
        <RemixCard {...branch.parent} level={1} />
      </div>
      <div className="hidden md:flex flex-col items-center text-rom-green/50 px-1">
        <ArrowRight size={14} className="text-rom-green/60" />
      </div>
      <div className="flex-1 flex flex-col gap-2.5">
        {branch.children.map((c) => (
          <RemixCard key={c.title} {...c} level={2} />
        ))}
      </div>
    </motion.div>
  )
}

function RemixCard({
  title,
  author,
  date,
  royalty,
  seed,
  level,
}: {
  title: string
  author: string
  date: string
  royalty: string
  tone: Tone
  seed: string
  level: 1 | 2
}) {
  const isLevel1 = level === 1
  const size = isLevel1 ? 56 : 44
  return (
    <div className="relative rounded-xl border border-rom-green/40 bg-rom-card hover:border-rom-green hover:bg-rom-card-hover transition-all p-3 flex items-center gap-3">
      <AssetImage
        seed={seed}
        className="rounded-lg border border-rom-green/35 flex-shrink-0"
        // size via inline style since AssetImage takes className for sizing
      />
      <style>{`/* sizing baked via wrapper */`}</style>
      <div className="absolute" />
      {/* sized wrapper above is decorative; actual sizing below */}
      <div className="absolute hidden" />
      <div style={{ width: size, height: size, position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} aria-hidden>
        <AssetImage
          seed={seed}
          className="size-full rounded-lg border border-rom-green/35"
        />
      </div>
      <div style={{ width: size, height: size }} className="flex-shrink-0" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="micro-label font-mono text-rom-green text-[9.5px] tracking-[0.22em]">
            {isLevel1 ? <><GitFork size={9} className="inline mb-0.5 mr-1" />Remix · Gen 1</> : <>Remix · Gen 2</>}
          </span>
        </div>
        <div className={`mt-1 ${isLevel1 ? 'text-[14px]' : 'text-[12.5px]'} font-mono font-semibold text-rom-fg leading-tight truncate`}>
          {title}
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-[10px] font-mono text-rom-fg-muted">
          <span className="truncate">By {author}</span>
          <span className="text-rom-green/40">·</span>
          <span className="truncate">{date}</span>
        </div>
      </div>
      <div className="flex-shrink-0 flex flex-col items-end gap-0.5">
        <span className="micro-label font-mono text-rom-fg-muted text-[8.5px] tracking-[0.22em]">Split</span>
        <span className="text-[11px] font-mono font-semibold text-rom-green">{royalty}</span>
      </div>
    </div>
  )
}
