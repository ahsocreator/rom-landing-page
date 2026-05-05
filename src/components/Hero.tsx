import { motion } from 'framer-motion'
import { ArrowRight, Code } from 'lucide-react'
import { Button } from './ui/Button'
import pepeMain from '../assets/pepe_main.png'
import pepeWarVideo from '../assets/pepe_war.mp4'
import pepeGunVideo from '../assets/pepe_gun.mp4'
import pepeFixVideo from '../assets/pepe_fix.mp4'
import pepeBoxingVideo from '../assets/pepe_boxing.mp4'

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100dvh-80px)] flex items-center px-6 md:px-10 lg:px-16 py-12 lg:py-0">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 items-center">
        {/* Left Content */}
        <div className="space-y-8 max-w-[800px] lg:col-span-5 z-20 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-[76px] font-sans font-bold leading-[1.1] tracking-tight text-rom-fg"
          >
            Meme will become<br />
            the decentralized<br />
            <span className="text-rom-green drop-shadow-[0_0_20px_rgba(0,255,120,0.3)]">new religion</span><br />
            of the AI era
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-rom-fg-dim max-w-[600px] leading-relaxed"
          >
            ROM turns ideas into programmable IP that people can own, evolve, and earn from.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button variant="primary" className="flex items-center gap-2 px-8 py-4 text-base md:text-lg font-bold rounded-md">
              BUILD ON ROM <ArrowRight size={20} />
            </Button>
            <Button variant="ghost" className="flex items-center gap-2 px-8 py-4 text-base md:text-lg font-bold border border-rom-border rounded-md hover:bg-rom-card-hover transition-colors">
              READ DOCS <Code size={20} />
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-8 flex items-center gap-4"
          >
            <span className="text-[13px] md:text-sm font-mono tracking-[0.2em] uppercase text-rom-fg-muted">Built on</span>
            <SolanaLogo />
          </motion.div>
        </div>

        {/* Right Content - 3D Floating Hero */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative aspect-square w-full mx-auto lg:col-span-7 mt-10 lg:mt-0 z-10"
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
                className="w-[85%] md:w-[85%] xl:w-[90%] h-auto object-contain drop-shadow-[0_0_60px_rgba(0,255,120,0.25)]"
                animate={{ y: [-12, 12, -12] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />
           </div>

           {/* Top Left Card (9:16) */}
           <motion.div
              className="absolute w-[28%] md:w-[26%] xl:w-[28%] border border-rom-green/40 rounded-lg bg-[#020503]/80 backdrop-blur-md p-1.5 md:p-2 xl:p-3 flex flex-col z-20 box-shadow-glow"
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
              className="absolute w-[55%] md:w-[48%] xl:w-[55%] border border-rom-green/40 rounded-lg bg-[#020503]/80 backdrop-blur-md p-1.5 md:p-2 xl:p-3 flex flex-col z-20 box-shadow-glow"
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
              className="absolute w-[36%] md:w-[33%] xl:w-[38%] border border-rom-green/40 rounded-lg bg-[#020503]/80 backdrop-blur-md p-1.5 md:p-2 xl:p-3 flex flex-col z-20 box-shadow-glow"
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
              className="absolute w-[36%] md:w-[32%] xl:w-[38%] border border-rom-green/40 rounded-lg bg-[#020503]/80 backdrop-blur-md p-1.5 md:p-2 xl:p-3 flex flex-col z-20 box-shadow-glow"
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

           {/* Now Viewing Box (Bottom Center) */}
           <div className="absolute bottom-[-5%] md:bottom-[0%] xl:bottom-[-5%] left-1/2 -translate-x-1/2 w-[90%] md:w-[75%] xl:w-[65%] border border-rom-green/40 bg-[#020503]/90 backdrop-blur-xl p-2.5 md:p-3 xl:p-4 rounded-xl z-30 flex flex-col gap-1 box-shadow-glow">
              <div className="flex justify-between items-start">
                 <div>
                    <div className="text-[7px] md:text-[9px] xl:text-[10px] text-rom-green font-mono uppercase tracking-widest opacity-80 mb-0.5">NOW VIEWING</div>
                    <div className="text-xs md:text-sm xl:text-base text-rom-green font-bold font-mono tracking-wide uppercase">CYBERPUNK FROG TRADER</div>
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
        </motion.div>
      </div>
    </section>
  )
}

function SolanaLogo() {
  return (
    <span className="inline-flex items-center gap-2">
      <svg viewBox="0 0 120 95" className="h-4 w-auto text-white" fill="currentColor" aria-hidden>
        <path d="M93.94 75.15H1.81c-1.65 0-2.49-2-1.32-3.18L18.93 53.4a2 2 0 0 1 1.41-.59h92.13c1.65 0 2.49 2 1.32 3.18L95.35 74.56a2 2 0 0 1-1.41.59zM18.93 1.34A2 2 0 0 1 20.34.75h92.13c1.65 0 2.49 2 1.32 3.18L95.35 22.51a2 2 0 0 1-1.41.59H1.81c-1.65 0-2.49-2-1.32-3.18L18.93 1.34zM95.35 37.39a2 2 0 0 0-1.41-.59H1.81c-1.65 0-2.49 2-1.32 3.18L18.93 58.55a2 2 0 0 0 1.41.59h92.13c1.65 0 2.49-2 1.32-3.18L95.35 37.39z" />
      </svg>
      <span className="text-white font-sans font-bold tracking-wider text-sm">
        SOLANA
      </span>
    </span>
  )
}
