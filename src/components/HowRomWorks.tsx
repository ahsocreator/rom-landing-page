import { MessageSquare, Blocks, Sparkles, Layers, Users, CircleDollarSign } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'PROMPT',
    desc: 'Describe your idea in natural language.',
    icon: MessageSquare,
  },
  {
    num: '02',
    title: 'STRUCTURE',
    desc: 'ROM structures it into scenes, characters, and lore.',
    icon: Blocks,
  },
  {
    num: '03',
    title: 'GENERATE',
    desc: 'AI generates consistent content: images, videos, audio & more.',
    icon: Sparkles,
  },
  {
    num: '04',
    title: 'OWN',
    desc: 'Mint your IP on Solana. You own it.',
    icon: Layers,
  },
  {
    num: '05',
    title: 'EVOLVE',
    desc: 'Communities extend and remix your IP into new stories.',
    icon: Users,
  },
  {
    num: '06',
    title: 'EARN',
    desc: 'Everyone earns when the meme becomes a movement.',
    icon: CircleDollarSign,
  },
]

export function HowRomWorks() {
  return (
    <section className="w-full py-20 px-6 md:px-10 lg:px-16 border-t border-rom-border-dim/30">
      <div className="text-center mb-16">
        <h3 className="text-rom-green font-mono text-sm tracking-[0.2em] uppercase mb-4">How Rom Works</h3>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight">From idea to immortal IP</h2>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4 lg:gap-2 relative">
        {steps.map((step, i) => (
          <div key={step.num} className="relative flex-1 flex flex-col items-center">
            {/* The box */}
            <div className="w-full bg-[#030604] border border-rom-green/30 rounded-xl p-6 relative z-10 flex flex-col items-center text-center h-full hover:border-rom-green/50 transition-colors">
              <span className="absolute top-4 left-5 text-rom-green text-base md:text-lg font-mono">{step.num}</span>
              
              <div className="mt-6 mb-8 text-rom-green drop-shadow-[0_0_15px_rgba(0,255,120,0.3)]">
                <step.icon size={64} strokeWidth={1.5} />
              </div>
              
              <h4 className="text-white font-mono text-lg md:text-xl tracking-widest mb-4 uppercase">{step.title}</h4>
              <p className="text-rom-fg-dim text-base md:text-lg leading-relaxed max-w-[220px] mx-auto">
                {step.desc}
              </p>
            </div>
            
            {/* The arrow (except last one) */}
            {i < steps.length - 1 && (
              <div className="hidden lg:flex absolute top-1/2 -right-[16px] z-20 -translate-y-1/2 text-rom-green/60 items-center justify-center bg-rom-bg px-1">
                <span className="text-sm tracking-widest opacity-60">--&gt;</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
