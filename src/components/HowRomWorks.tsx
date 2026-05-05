import { MessageSquare, Sparkles, Users } from 'lucide-react'
import solanaLogo from '../assets/solana-sol-logo.png'

function SolIcon({ className }: { className?: string }) {
  return <img src={solanaLogo} alt="Solana" className={className} />
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
