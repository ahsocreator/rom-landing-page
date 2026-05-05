import { MessageSquare, Sparkles, Users } from 'lucide-react'

function SolIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 95" className={className} aria-hidden>
      <defs>
        <linearGradient id="sol-grad-how" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14F195" />
          <stop offset="100%" stopColor="#9945FF" />
        </linearGradient>
      </defs>
      <path
        d="M93.94 75.15H1.81c-1.65 0-2.49-2-1.32-3.18L18.93 53.4a2 2 0 0 1 1.41-.59h92.13c1.65 0 2.49 2 1.32 3.18L95.35 74.56a2 2 0 0 1-1.41.59zM18.93 1.34A2 2 0 0 1 20.34.75h92.13c1.65 0 2.49 2 1.32 3.18L95.35 22.51a2 2 0 0 1-1.41.59H1.81c-1.65 0-2.49-2-1.32-3.18L18.93 1.34zM95.35 37.39a2 2 0 0 0-1.41-.59H1.81c-1.65 0-2.49 2-1.32 3.18L18.93 58.55a2 2 0 0 0 1.41.59h92.13c1.65 0 2.49-2 1.32 3.18L95.35 37.39z"
        fill="url(#sol-grad-how)"
      />
    </svg>
  )
}

const steps = [
  {
    num: '01',
    title: 'PROMPT',
    desc: 'Describe your idea in natural language.',
    icon: MessageSquare,
  },
  {
    num: '02',
    title: 'GENERATE',
    desc: 'ROM generates consistent stories, images, videos, audio & more.',
    icon: Sparkles,
  },
  {
    num: '03',
    title: 'OWN',
    desc: 'Mint your IP on Solana. You own it.',
    icon: SolIcon,
  },
  {
    num: '04',
    title: 'EARN',
    desc: 'Communities evolve it, and you earn as it grows.',
    icon: Users,
  },
]

export function HowRomWorks() {
  return (
    <section id="how-it-works" className="w-full py-10 md:py-16 px-6 md:px-10 lg:px-16 border-t border-rom-border-dim/30">
      <div className="text-center mb-16 md:mb-24">
        <h3 className="text-rom-green font-mono text-sm tracking-[0.2em] uppercase mb-4">How Rom Works</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 items-start gap-8 md:gap-4 relative max-w-[1200px] mx-auto">
        {steps.map((step) => (
          <div key={step.num} className="relative flex-1 flex flex-col items-center group">
            
            <div className="w-full relative z-10 flex flex-col items-center text-center">
              <div className="flex w-full justify-center relative mb-6 md:mb-8">
                 {/* Number top-left */}
                 <span className="absolute left-2 sm:left-6 md:left-2 lg:left-6 top-0 text-rom-green text-sm font-mono font-bold tracking-wider">{step.num}</span>
                 {/* Icon */}
                 <div className="text-rom-green drop-shadow-[0_0_15px_rgba(0,255,120,0.4)] transform transition-transform duration-500 group-hover:scale-110">
                   <step.icon strokeWidth={1.5} className="w-12 h-12 md:w-14 md:h-14" />
                 </div>
              </div>
              
              <h4 className="text-white font-sans font-bold text-[18px] md:text-xl tracking-wide mb-2 md:mb-3 uppercase leading-none break-words w-full">{step.title}</h4>
              <p className="text-rom-fg-dim text-[13px] md:text-[14px] leading-[1.5] max-w-full md:max-w-[200px] mx-auto break-words px-2">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
