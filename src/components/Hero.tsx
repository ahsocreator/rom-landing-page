import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Play, Command } from 'lucide-react'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Story = { title: string; duration: string; type: string; flyThrough?: boolean }

// Stories split across 4 rings (top-inner, top-outer, bottom-inner, bottom-outer)
const topInner: Story[] = [
  { title: 'Pilot Episode', duration: '1:32', type: 'cinematic_story' },
  { title: 'Brand Spot', duration: '0:30', type: 'ad_spot', flyThrough: true },
  { title: 'Music Drop', duration: '2:48', type: 'music_video' },
  { title: 'Q&A Channel', duration: '4:15', type: 'persona_channel' },
]
const topOuter: Story[] = [
  { title: 'Trailer Cut', duration: '1:08', type: 'ad_spot' },
  { title: 'Action Scene', duration: '0:54', type: 'cinematic_story' },
  { title: 'Live Drop', duration: '5:20', type: 'persona_channel' },
  { title: 'Cameo', duration: '0:22', type: 'ad_spot' },
  { title: 'Lore Recap', duration: '2:10', type: 'news_analysis' },
]
const bottomInner: Story[] = [
  { title: 'Behind Scenes', duration: '1:18', type: 'youtube_clone' },
  { title: 'Mood Piece', duration: '0:45', type: 'music_video', flyThrough: true },
  { title: 'Series Finale', duration: '3:02', type: 'cinematic_story' },
  { title: 'Interview', duration: '7:14', type: 'news_analysis' },
]
const bottomOuter: Story[] = [
  { title: 'Reveal Cut', duration: '1:05', type: 'cinematic_story' },
  { title: 'Side Story', duration: '0:38', type: 'ad_spot' },
  { title: 'Promo Drop', duration: '0:24', type: 'ad_spot' },
  { title: 'Origin', duration: '4:50', type: 'cinematic_story' },
  { title: 'Recap', duration: '1:42', type: 'news_analysis' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.6])
  const ringOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.85, 0.25])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.4])

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden min-h-[100svh] flex flex-col items-center justify-center"
    >
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[35%] grid-floor opacity-40" />

      {/* 4 concentric rings: each y-level has inner (sharp) + outer (blurred) */}
      {/* TOP outer (back, blurred, slow) */}
      <Ring
        stories={topOuter}
        yOffset={-300}
        radius={780}
        tilt={-12}
        direction={1}
        speed={88}
        blur={5}
        cardSize={{ w: 144, h: 200 }}
        ringScale={ringScale}
        opacity={ringOpacity}
        zIndex={1}
      />
      {/* BOTTOM outer (back, blurred, slow) */}
      <Ring
        stories={bottomOuter}
        yOffset={300}
        radius={800}
        tilt={12}
        direction={-1}
        speed={94}
        blur={5}
        cardSize={{ w: 144, h: 200 }}
        ringScale={ringScale}
        opacity={ringOpacity}
        zIndex={1}
      />

      {/* TOP inner (sharp, faster) */}
      <Ring
        stories={topInner}
        yOffset={-280}
        radius={420}
        tilt={-15}
        direction={-1}
        speed={48}
        blur={0}
        cardSize={{ w: 168, h: 240 }}
        ringScale={ringScale}
        opacity={ringOpacity}
        zIndex={2}
      />
      {/* BOTTOM inner (sharp, faster) */}
      <Ring
        stories={bottomInner}
        yOffset={280}
        radius={440}
        tilt={15}
        direction={1}
        speed={52}
        blur={0}
        cardSize={{ w: 168, h: 240 }}
        ringScale={ringScale}
        opacity={ringOpacity}
        zIndex={2}
      />

      {/* Centered title + CTAs */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-20 mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease }}
          className="flex justify-center"
        >
          <Badge>[ Build IP // Build Story // Build Money ]</Badge>
        </motion.div>

        <h1 className="mt-8 display-1 font-mono text-rom-fg leading-[0.92]">
          <RevealLine delay={0.2}>Your IP.</RevealLine>
          <RevealLine
            delay={0.36}
            className="gradient-text-arcade glitch-hover"
            dataText="Your story."
          >
            Your story.
          </RevealLine>
          <RevealLine delay={0.52}>Your money.</RevealLine>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 mx-auto max-w-[640px] text-[15px] md:text-[17px] leading-[1.55] text-rom-fg-dim"
        >
          ROM is the protocol for owning IP. Drop a character. Lock the canonical look. Spin out a franchise. Every drop is yours, every license earns you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="primary" className="magnetic">
            Start your IP
            <ArrowRight size={16} strokeWidth={2.4} />
          </Button>
          <Button variant="secondary" className="magnetic">
            See it work
            <Play size={14} strokeWidth={2} />
          </Button>
          <span className="hidden sm:inline-flex items-center gap-2 ml-1 text-rom-fg-muted">
            <span className="micro-label font-mono">or</span>
            <kbd className="inline-flex items-center gap-1.5 rounded-md border border-rom-green/30 bg-rom-card px-2.5 py-1.5 text-[11px] font-mono text-rom-green">
              <Command size={11} strokeWidth={2.4} /> K
            </kbd>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-5"
        >
          {[
            ['1', 'character locks the IP'],
            ['25', 'credits per drop · refund on fail'],
            ['6', 'revenue formats · ∞ drops'],
          ].map(([n, l]) => (
            <div key={l} className="text-left">
              <div className="text-[24px] md:text-[30px] font-mono font-bold text-rom-green text-glow leading-none">
                {n}
              </div>
              <div className="mt-1.5 micro-label font-mono text-rom-fg-muted">{l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2, ease }}
        className="absolute inset-x-0 bottom-0 z-20 w-full mx-auto max-w-[1800px] px-6 md:px-10 lg:px-16 pb-6"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-rom-green/20 pt-4 text-rom-green">
          <span className="flex items-center gap-2 micro-label font-mono">
            <span className="size-1.5 rounded-full bg-rom-green pulse-dot" />
            Mainnet Live
          </span>
          <span className="micro-label font-mono text-rom-fg-muted">·</span>
          <span className="micro-label font-mono">Block 304_991_402</span>
          <span className="micro-label font-mono text-rom-fg-muted">·</span>
          <span className="micro-label font-mono">14_237 IPs locked</span>
          <span className="micro-label font-mono text-rom-fg-muted">·</span>
          <span className="micro-label font-mono">2.4M drops shipped</span>
          <span className="ml-auto micro-label font-mono text-rom-fg-muted">v1.0.0 · uptime 99.97%</span>
        </div>
      </motion.div>
    </section>
  )
}

function RevealLine({
  children,
  delay,
  className = '',
  dataText,
}: {
  children: React.ReactNode
  delay: number
  className?: string
  dataText?: string
}) {
  return (
    <span className="block reveal-mask">
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.8, delay, ease }}
        className={`block ${className}`}
        data-text={dataText}
      >
        {children}
      </motion.span>
    </span>
  )
}

function Ring({
  stories,
  yOffset,
  radius,
  tilt,
  direction,
  speed,
  blur,
  cardSize,
  ringScale,
  opacity,
  zIndex,
}: {
  stories: Story[]
  yOffset: number
  radius: number
  tilt: number
  direction: 1 | -1
  speed: number
  blur: number
  cardSize: { w: number; h: number }
  ringScale: MotionValue<number>
  opacity: MotionValue<number>
  zIndex: number
}) {
  return (
    <motion.div
      aria-hidden
      style={{
        scale: ringScale,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
        zIndex,
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div
        className="relative size-0"
        style={{
          perspective: '1800px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="relative size-0"
          style={{
            transform: `translateY(${yOffset}px) rotateX(${tilt}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            animate={{ rotateY: direction * 360 }}
            transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
            className="relative size-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {stories.map((s, i) => {
              const angle = (i / stories.length) * 360
              const r = s.flyThrough ? radius * 0.55 : radius
              const cardScale = s.flyThrough ? 1.3 : 1.0
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    width: cardSize.w,
                    height: cardSize.h,
                    left: -cardSize.w / 2,
                    top: -cardSize.h / 2,
                    transform: `rotateY(${angle}deg) translateZ(${r}px) scale(${cardScale})`,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="size-full" style={{ transform: `rotateY(${-angle}deg)` }}>
                    <StoryCard story={s} index={i} />
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function StoryCard({ story, index }: { story: Story; index: number }) {
  const tilt = (index % 2 === 0 ? -1 : 1) * (1 + (index % 3))
  return (
    <motion.div
      animate={{ rotate: [tilt, -tilt, tilt] }}
      transition={{ duration: 6 + index, repeat: Infinity, ease: 'easeInOut' }}
      className="relative size-full rounded-2xl border border-rom-green/40 bg-rom-card overflow-hidden shadow-[0_12px_40px_oklch(0.05_0.005_150_/_0.6),0_0_24px_oklch(0.85_0.22_145/0.14)]"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at ${(index * 17) % 100}% ${(index * 31) % 100}%, oklch(0.85 0.22 145 / 0.40), oklch(0.10 0.012 150) 70%)`,
          }}
        />
        <div className="absolute inset-0 grid-floor opacity-25" />
        <motion.div
          animate={{ y: ['-100%', '120%'] }}
          transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
          className="absolute inset-x-0 h-1/2"
          style={{
            background:
              'linear-gradient(180deg, transparent, oklch(0.85 0.22 145 / 0.20), transparent)',
          }}
        />
      </div>

      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-2.5 py-2 micro-label font-mono text-[8px]">
        <span className="flex items-center gap-1 text-rom-green">
          <span className="size-1 rounded-full bg-rom-green pulse-dot" />
          REC
        </span>
        <span className="text-rom-green">{story.duration}</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid size-12 place-items-center rounded-full border border-rom-green/60 bg-rom-bg/60 backdrop-blur-sm">
          <Play size={18} className="text-rom-green icon-glow translate-x-0.5" strokeWidth={2.2} fill="currentColor" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 px-2.5 py-2 bg-gradient-to-t from-rom-bg via-rom-bg/60 to-transparent">
        <div className="text-[10px] font-mono font-semibold text-rom-fg truncate">{story.title}</div>
        <code className="text-[8.5px] font-mono text-rom-green/80 truncate block">{story.type}</code>
        <div className="mt-1.5 h-0.5 w-full bg-rom-green/15 overflow-hidden rounded-full">
          <motion.div
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 8 + (index % 4), repeat: Infinity, ease: 'linear', delay: index * 0.6 }}
            className="h-full bg-rom-green"
          />
        </div>
      </div>

      <span className="absolute left-1.5 top-1.5 size-2 border-l border-t border-rom-green" />
      <span className="absolute right-1.5 top-1.5 size-2 border-r border-t border-rom-green" />
      <span className="absolute left-1.5 bottom-1.5 size-2 border-l border-b border-rom-green" />
      <span className="absolute right-1.5 bottom-1.5 size-2 border-r border-b border-rom-green" />
    </motion.div>
  )
}
