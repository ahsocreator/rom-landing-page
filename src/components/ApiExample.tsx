import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

// Animated API code-block: shows a real ROM API call (POST /v1/stories) with
// request body + response, terminal-styled. Each block staggers in on
// scroll, a continuous scan-line sweep + blinking caret on the prompt
// line keeps the card "alive."
export function ApiExample() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <section
      id="api-example"
      className="w-full py-20 md:py-28 px-4 md:px-8 lg:px-16"
    >
      <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — marketing context */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="order-2 lg:order-1"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <span className="size-1.5 rounded-full bg-rom-green pulse-dot" />
            <h3 className="text-rom-green font-mono text-[11px] md:text-xs tracking-[0.24em] uppercase">
              For Developers
            </h3>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight leading-[1.05]">
            One API call.
            <br />
            <span className="text-rom-green drop-shadow-[0_0_24px_rgba(0,255,120,0.3)]">
              Cinematic IP.
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-rom-fg-dim leading-relaxed mt-6 max-w-[520px]">
            REST endpoint. Bearer auth. JSON in, video out. Drop the docs into{' '}
            <span className="text-rom-green-bright font-semibold">Claude</span> or{' '}
            <span className="text-rom-green-bright font-semibold">Codex</span> —
            the AI wires the integration in one chat.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] md:text-xs font-mono uppercase tracking-[0.18em] text-rom-fg-muted">
            <span className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-rom-green" />
              REST + JSON
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-rom-green" />
              Bearer auth
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-rom-green" />
              Solana payouts
            </span>
          </div>
        </motion.div>

        {/* Right — ROM API code block */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease, delay: 0.1 }}
          className="order-1 lg:order-2 relative"
        >
          <ApiCard inView={inView} />
        </motion.div>
      </div>
    </section>
  )
}

function ApiCard({ inView }: { inView: boolean }) {
  return (
    <div
      className="relative border border-rom-green/40 rounded-2xl bg-[#020503] p-6 md:p-8 box-shadow-glow font-mono text-[12px] md:text-[13.5px] text-rom-fg-dim overflow-hidden"
      style={{
        boxShadow:
          '0 0 0 1px oklch(0.85 0.22 145 / 0.15), 0 24px 60px -12px oklch(0.05 0.005 150 / 0.7), 0 0 40px oklch(0.85 0.22 145 / 0.06)',
      }}
    >
      {/* Continuous diagonal scan-line sweep */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 w-[40%] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, oklch(0.85 0.22 145 / 0.05) 50%, transparent 100%)',
          mixBlendMode: 'screen',
        }}
        initial={{ x: '-50%' }}
        animate={{ x: '250%' }}
        transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatDelay: 4 }}
      />

      {/* Faint horizontal scan-grid behind text */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(oklch(0.85 0.22 145) 1px, transparent 1px)',
          backgroundSize: '100% 14px',
        }}
      />

      <div className="relative">
        {/* Card header */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-rom-green/20">
          <span className="text-rom-green font-bold tracking-[0.18em] text-[11px] md:text-[12.5px]">
            ROM API <span className="text-rom-fg-muted">//</span> EXAMPLE
          </span>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-rom-green/60" />
            <span className="size-1.5 rounded-full bg-rom-green/40" />
            <span className="size-1.5 rounded-full bg-rom-green/30" />
          </div>
        </div>

        {/* POST line + status */}
        <Line idx={0} inView={inView}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span>
              <span className="text-rom-green-bright">POST</span>{' '}
              <span className="text-rom-fg">/v1/stories</span>
            </span>
            <span className="text-rom-green-bright text-[11px] md:text-[12px]">
              200 OK
            </span>
          </div>
        </Line>

        {/* Request body */}
        <Line idx={1} inView={inView}>
          <div className="mt-5 leading-[1.85]">
            <Brace>{'{'}</Brace>
            <KV k="title" v='"Cyberpunk Frog Trader"' />
            <KV k="theme" v='"cyberpunk"' />
            <KV k="characters" v='["frog_trader"]' />
            <KV k="style" v='"anime"' />
            <KV k="episodes" v="4" type="num" last />
            <Brace>{'}'}</Brace>
          </div>
        </Line>

        {/* Response label */}
        <Line idx={2} inView={inView}>
          <div className="mt-6 text-rom-fg-muted text-[11.5px] md:text-[12.5px] tracking-[0.05em]">
            Response
          </div>
        </Line>

        {/* Response body */}
        <Line idx={3} inView={inView}>
          <div className="mt-3 leading-[1.85]">
            <Brace>{'{'}</Brace>
            <KV k="story_id" v='"rom_7x1q9..."' />
            <KV k="status" v='"created"' last />
            <Brace>{'}'}</Brace>
          </div>
        </Line>

        {/* Tagline footer */}
        <Line idx={4} inView={inView}>
          <div className="mt-8 pt-5 border-t border-rom-green/15 leading-[1.5]">
            <div className="text-rom-green-bright font-bold tracking-[0.04em] text-[12px] md:text-[13.5px]">
              <span className="inline-flex items-baseline gap-1.5">
                {'>'}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  className="inline-block w-[6px] h-[10px] md:h-[12px] bg-rom-green-bright align-baseline -mb-[1px]"
                />
              </span>
              <span className="ml-1.5">ROM IS PROGRAMMABLE MEDIA.</span>
              <br />
              <span className="text-rom-green ml-[14px]">
                NOT JUST GENERATION. <span className="text-rom-green-bright">EXECUTION.</span>
              </span>
            </div>
          </div>
        </Line>
      </div>
    </div>
  )
}

// Stagger-reveal each block on scroll-in
function Line({
  idx,
  inView,
  children,
}: {
  idx: number
  inView: boolean
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.5, ease, delay: 0.3 + idx * 0.22 }}
    >
      {children}
    </motion.div>
  )
}

function Brace({ children }: { children: React.ReactNode }) {
  return <div className="text-rom-green">{children}</div>
}

// Decorative ":" gutter prefix mimics the screenshot's indentation guideline.
function KV({
  k,
  v,
  type = 'str',
  last,
}: {
  k: string
  v: string
  type?: 'str' | 'num'
  last?: boolean
}) {
  const valueColor = type === 'num' ? 'text-rom-cyan-bright' : 'text-rom-amber'
  return (
    <div className="pl-4 md:pl-5 flex items-baseline">
      <span className="text-rom-fg-muted/60 mr-3 select-none">:</span>
      <span>
        <span className="text-rom-green-bright">"{k}"</span>
        <span className="text-rom-fg-muted">: </span>
        <span className={valueColor}>{v}</span>
        {!last && <span className="text-rom-fg-muted">,</span>}
      </span>
    </div>
  )
}
