import { motion } from 'framer-motion'
import { ArrowRight, Code } from 'lucide-react'
import { Button } from './ui/Button'
import pepeMain from '../assets/pepe_main.png'
import pepeWarVideo from '../assets/pepe_war.mp4'
import pepeGunVideo from '../assets/pepe_gun.mp4'
import pepeFixVideo from '../assets/pepe_fix.mp4'
import pepeBoxingVideo from '../assets/pepe_boxing.mp4'
import solanaLogo from '../assets/solana-sol-logo.png'

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100dvh-80px)] flex items-center px-6 md:px-10 lg:px-16 py-4 md:py-8 lg:py-0">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 lg:gap-4 items-center">
        {/* Left Content */}
        <div className="space-y-5 md:space-y-8 max-w-[800px] lg:col-span-5 z-20 relative order-2 lg:order-1 mt-6 lg:mt-0 text-center lg:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl xl:text-[76px] font-sans font-bold leading-[1.15] md:leading-[1.1] tracking-tight text-rom-fg"
          >
            Meme will become<br />
            the decentralized<br />
            <span className="text-rom-green drop-shadow-[0_0_20px_rgba(0,255,120,0.3)] glitch-hover" data-text="new religion">new religion</span><br />
            of the AI era
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl lg:text-2xl text-rom-fg-dim max-w-[600px] leading-relaxed mx-auto lg:mx-0"
          >
            ROM turns ideas into programmable IP that people can own, evolve, and earn from.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4"
          >
            <Button variant="primary" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 text-sm md:text-base lg:text-lg font-bold rounded-md">
              BUILD ON ROM <ArrowRight size={18} />
            </Button>
            <Button variant="ghost" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 text-sm md:text-base lg:text-lg font-bold border border-rom-border rounded-md hover:bg-rom-card-hover transition-colors">
              READ DOCS <Code size={18} />
            </Button>
          </motion.div>
          
          {/* Removed Solana Logo from here, now entirely in the card */}
        </div>

        {/* Right Content - 3D Floating Hero */}
        <div className="relative w-full lg:col-span-7 z-10 order-1 lg:order-2 mt-2 lg:mt-0 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative aspect-square w-[70%] sm:w-[65%] md:w-[60%] lg:w-full mx-auto"
            style={{ maxWidth: 'min(100%, 75vh)' }}
          >
           {/* Connection Lines (連結) */}
           <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" aria-hidden>
              <g stroke="rgba(0, 255, 120, 0.3)" strokeWidth="1" strokeDasharray="4 4">
                <line x1="6%" y1="18%" x2="50%" y2="50%" />
                <line x1="-5%" y1="87%" x2="50%" y2="50%" />
                <line x1="94%" y1="24%" x2="50%" y2="50%" />
                <line x1="99%" y1="81%" x2="50%" y2="50%" />
              </g>
              <g stroke="rgba(0, 255, 120, 0.8)" strokeWidth="1" fill="none">
                {/* Crosshairs at joints */}
                <path d="M 4% 18% L 8% 18% M 6% 16% L 6% 20%" />
                <path d="M -7% 87% L -3% 87% M -5% 85% L -5% 89%" />
                <path d="M 92% 24% L 96% 24% M 94% 22% L 94% 26%" />
                <path d="M 97% 81% L 101% 81% M 99% 79% L 99% 83%" />
              </g>
           </svg>

           {/* Center Pepe */}
           <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <motion.img 
                src={pepeMain} 
                alt="Pepe Main" 
                className="w-[100%] md:w-[105%] xl:w-[115%] h-auto object-contain drop-shadow-[0_0_60px_rgba(0,255,120,0.25)]"
                animate={{ y: [-12, 12, -12] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />
           </div>

           {/* Top Left Card (9:16) */}
           <motion.div
              className="absolute w-[28%] md:w-[26%] xl:w-[28%] border border-rom-green/40 rounded-lg bg-[#020503]/80 backdrop-blur-md p-1.5 md:p-2 xl:p-3 flex flex-col z-40 box-shadow-glow"
              style={{ top: '2%', left: '-8%', transformPerspective: 1000 }}
              animate={{ 
                y: [0, -15, 0], 
                rotateY: [15, 25, 15], 
                rotateX: [5, 15, 5] 
              }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0 }}
            >
              <div className="text-[8px] md:text-[10px] xl:text-[12px] text-rom-green font-mono mb-1.5 uppercase opacity-80">Episode_01</div>
              <div className="w-full aspect-[9/16] rounded overflow-hidden mb-1.5 relative border border-rom-green/20">
                <video src={pepeGunVideo} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 mix-blend-screen" />
              </div>
              <div className="text-[10px] md:text-[12px] xl:text-[14px] text-rom-green font-bold font-mono tracking-tight uppercase">THE ENFORCER</div>
           </motion.div>

           {/* Bottom Left Card (16:9) */}
           <motion.div
              className="absolute w-[55%] md:w-[48%] xl:w-[55%] border border-rom-green/40 rounded-lg bg-[#020503]/80 backdrop-blur-md p-1.5 md:p-2 xl:p-3 flex flex-col z-40 box-shadow-glow"
              style={{ bottom: '-2%', left: '-32%', transformPerspective: 1000 }}
              animate={{ 
                y: [0, 15, 0], 
                rotateY: [20, 30, 20], 
                rotateX: [-10, -5, -10] 
              }}
              transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1 }}
            >
              <div className="text-[8px] md:text-[10px] xl:text-[12px] text-rom-green font-mono mb-1.5 uppercase opacity-80">Episode_02</div>
              <div className="w-full aspect-video rounded overflow-hidden mb-1.5 relative border border-rom-green/20">
                <video src={pepeWarVideo} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 mix-blend-screen" />
              </div>
              <div className="text-[10px] md:text-[12px] xl:text-[14px] text-rom-green font-bold font-mono tracking-tight uppercase">WARZONE 2077</div>
           </motion.div>

           {/* Top Right Card (4:3) */}
           <motion.div
              className="absolute w-[36%] md:w-[33%] xl:w-[38%] border border-rom-green/40 rounded-lg bg-[#020503]/80 backdrop-blur-md p-1.5 md:p-2 xl:p-3 flex flex-col z-40 box-shadow-glow"
              style={{ top: '6%', right: '-14%', transformPerspective: 1000 }}
              animate={{ 
                y: [0, -12, 0], 
                rotateY: [-15, -25, -15], 
                rotateX: [10, 15, 10] 
              }}
              transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="text-[8px] md:text-[10px] xl:text-[12px] text-rom-green font-mono mb-1.5 uppercase opacity-80">Episode_03</div>
              <div className="w-full aspect-[4/3] rounded overflow-hidden mb-1.5 relative border border-rom-green/20">
                <video src={pepeBoxingVideo} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 mix-blend-screen" />
              </div>
              <div className="text-[10px] md:text-[12px] xl:text-[14px] text-rom-green font-bold font-mono tracking-tight uppercase">NEON BLOODSPORT</div>
           </motion.div>

           {/* Bottom Right Card (1:1) */}
           <motion.div
              className="absolute w-[36%] md:w-[32%] xl:w-[38%] border border-rom-green/40 rounded-lg bg-[#020503]/80 backdrop-blur-md p-1.5 md:p-2 xl:p-3 flex flex-col z-40 box-shadow-glow"
              style={{ bottom: '5%', right: '-18%', transformPerspective: 1000 }}
              animate={{ 
                y: [0, 12, 0], 
                rotateY: [-20, -30, -20], 
                rotateX: [-10, -5, -10] 
              }}
              transition={{ repeat: Infinity, duration: 6.8, ease: "easeInOut", delay: 1.5 }}
            >
              <div className="text-[8px] md:text-[10px] xl:text-[12px] text-rom-green font-mono mb-1.5 uppercase opacity-80">Episode_04</div>
              <div className="w-full aspect-square rounded overflow-hidden mb-1.5 relative border border-rom-green/20">
                <video src={pepeFixVideo} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 mix-blend-screen" />
              </div>
              <div className="text-[10px] md:text-[12px] xl:text-[14px] text-rom-green font-bold font-mono tracking-tight uppercase">THE MECHANIC</div>
           </motion.div>

          </motion.div>

          {/* Now Viewing Box (Bottom Center) */}
          <div className="relative md:absolute mt-4 md:mt-0 bottom-auto md:bottom-[0%] xl:bottom-[-5%] left-auto md:left-1/2 md:-translate-x-1/2 w-[85%] sm:w-[70%] md:w-[60%] xl:w-[50%] border border-rom-green/40 bg-[#020503]/90 backdrop-blur-xl p-2 md:p-2.5 xl:p-3 rounded-xl z-30 flex flex-col gap-1 box-shadow-glow">
              <div className="flex justify-between items-start">
                 <div>
                    <div className="text-[7px] md:text-[9px] xl:text-[10px] text-rom-green font-mono uppercase tracking-widest opacity-80 mb-0.5">NOW VIEWING</div>
                    <div className="text-xs md:text-sm xl:text-base text-rom-green font-bold font-mono tracking-wide uppercase">CYBERPUNK PEPE</div>
                    <div className="text-[7px] md:text-[9px] xl:text-[10px] text-rom-fg-dim font-mono mt-0.5 opacity-70">Owned by 0xF8...3A7c</div>
                 </div>
                 <div className="hidden sm:block">
                    <svg className="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8 text-rom-green opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                       <circle cx="12" cy="12" r="10" />
                       <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                 </div>
              </div>
              
              <div className="flex items-center gap-1.5 md:gap-2 mt-2 border-t border-rom-green/10 pt-2">
                 <span className="border border-rom-green/30 text-rom-green text-[7px] md:text-[8px] xl:text-[9px] px-1.5 py-0.5 rounded bg-rom-green/5">IP NFT</span>
                 <span className="border border-rom-green/30 text-rom-green text-[7px] md:text-[8px] xl:text-[9px] px-1.5 py-0.5 rounded bg-rom-green/5">ERC-721</span>
                 <span className="border border-rom-border text-white text-[7px] md:text-[8px] xl:text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1 bg-white/5">
                   <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="currentColor">
                     <rect y="4" width="24" height="3" />
                     <rect y="10.5" width="24" height="3" />
                     <rect y="17" width="24" height="3" />
                   </svg>
                   ROM
                 </span>
                 
                 <div className="ml-auto flex items-center gap-1.5">
                    <span className="text-[7px] md:text-[8px] xl:text-[9px] text-rom-green font-mono opacity-60">NETWORK</span>
                    <div className="scale-75 origin-right"><SolanaLogo /></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}

function SolanaLogo() {
  return (
    <span className="inline-flex items-center gap-2">
      <img src={solanaLogo} alt="Solana" className="h-4 w-auto" />
      <span className="text-white font-sans font-bold tracking-wider text-sm">
        SOLANA
      </span>
    </span>
  )
}
