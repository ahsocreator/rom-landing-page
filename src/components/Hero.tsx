import { motion } from 'framer-motion'
import { ArrowRight, Code } from 'lucide-react'
import { Button } from './ui/Button'
import { AssetImage } from './ui/AssetImage'
import pepeMain from '../assets/pepe_main.png'

export function Hero() {
  return (
    <section className="relative w-full px-6 md:px-10 lg:px-16 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl lg:text-[84px] font-sans font-bold leading-[1.1] tracking-tight text-rom-fg"
          >
            Meme will become<br />
            the decentralized<br />
            <span className="text-rom-green">new religion</span><br />
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
            <Button variant="primary" className="flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-md">
              BUILD ON ROM <ArrowRight size={20} />
            </Button>
            <Button variant="ghost" className="flex items-center gap-2 px-8 py-4 text-base font-semibold border border-rom-border rounded-md hover:bg-rom-card-hover transition-colors">
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
          className="relative aspect-square w-full max-w-[650px] mx-auto lg:ml-auto mt-10 lg:mt-0"
        >
           {/* Connection Lines (連結) */}
           <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" aria-hidden>
              <g stroke="rgba(0, 255, 120, 0.3)" strokeWidth="1" strokeDasharray="4 4">
                <line x1="18%" y1="28%" x2="50%" y2="50%" />
                <line x1="18%" y1="72%" x2="50%" y2="50%" />
                <line x1="82%" y1="32%" x2="50%" y2="50%" />
                <line x1="82%" y1="72%" x2="50%" y2="50%" />
              </g>
              <g stroke="rgba(0, 255, 120, 0.8)" strokeWidth="1" fill="none">
                {/* Crosshairs at joints — split into <line> elements so we
                    can use % coordinates (path `d` doesn't accept %). */}
                {/* Top-left */}
                <line x1="16%" y1="28%" x2="20%" y2="28%" />
                <line x1="18%" y1="26%" x2="18%" y2="30%" />
                {/* Bottom-left */}
                <line x1="16%" y1="72%" x2="20%" y2="72%" />
                <line x1="18%" y1="70%" x2="18%" y2="74%" />
                {/* Top-right */}
                <line x1="80%" y1="32%" x2="84%" y2="32%" />
                <line x1="82%" y1="30%" x2="82%" y2="34%" />
                {/* Bottom-right */}
                <line x1="80%" y1="72%" x2="84%" y2="72%" />
                <line x1="82%" y1="70%" x2="82%" y2="74%" />
              </g>
           </svg>

           {/* Center Pepe */}
           <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <motion.img 
                src={pepeMain} 
                alt="Pepe Main" 
                className="w-[75%] md:w-[65%] h-auto object-contain drop-shadow-[0_0_50px_rgba(0,255,120,0.2)]"
                animate={{ y: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />
           </div>

           {/* Top Left Card */}
           <motion.div
              className="absolute w-[26%] md:w-[24%] aspect-[3/4] border border-rom-green/40 rounded-lg bg-[#020503]/80 backdrop-blur-md p-1.5 md:p-2 flex flex-col z-20 overflow-hidden box-shadow-glow"
              style={{ top: '8%', left: '2%', transformPerspective: 1000 }}
              animate={{ 
                y: [0, -12, 0], 
                rotateY: [15, 25, 15], 
                rotateX: [5, 15, 5] 
              }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0 }}
            >
              <div className="text-[7px] md:text-[9px] text-rom-green font-mono mb-1 uppercase opacity-80">Episode_01</div>
              <div className="flex-1 w-full rounded overflow-hidden mb-1 relative border border-rom-green/20">
                <AssetImage seed="origin" alt="ep1" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
              </div>
              <div className="text-[9px] md:text-[11px] text-rom-green font-bold font-mono tracking-tight">The Origin</div>
           </motion.div>

           {/* Bottom Left Card */}
           <motion.div
              className="absolute w-[26%] md:w-[24%] aspect-[3/4] border border-rom-green/40 rounded-lg bg-[#020503]/80 backdrop-blur-md p-1.5 md:p-2 flex flex-col z-20 overflow-hidden box-shadow-glow"
              style={{ bottom: '25%', left: '0%', transformPerspective: 1000 }}
              animate={{ 
                y: [0, 12, 0], 
                rotateY: [20, 30, 20], 
                rotateX: [-10, -5, -10] 
              }}
              transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1 }}
            >
              <div className="text-[7px] md:text-[9px] text-rom-green font-mono mb-1 uppercase opacity-80">Episode_02</div>
              <div className="flex-1 w-full rounded overflow-hidden mb-1 relative border border-rom-green/20">
                <AssetImage seed="trade" alt="ep2" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
              </div>
              <div className="text-[9px] md:text-[11px] text-rom-green font-bold font-mono tracking-tight">The Trade</div>
           </motion.div>

           {/* Top Right Card */}
           <motion.div
              className="absolute w-[26%] md:w-[24%] aspect-[3/4] border border-rom-green/40 rounded-lg bg-[#020503]/80 backdrop-blur-md p-1.5 md:p-2 flex flex-col z-20 overflow-hidden box-shadow-glow"
              style={{ top: '15%', right: '2%', transformPerspective: 1000 }}
              animate={{ 
                y: [0, -10, 0], 
                rotateY: [-15, -25, -15], 
                rotateX: [10, 15, 10] 
              }}
              transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="text-[7px] md:text-[9px] text-rom-green font-mono mb-1 uppercase opacity-80">Episode_03</div>
              <div className="flex-1 w-full rounded overflow-hidden mb-1 relative border border-rom-green/20">
                <AssetImage seed="takeover" alt="ep3" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
              </div>
              <div className="text-[9px] md:text-[11px] text-rom-green font-bold font-mono tracking-tight">The Takeover</div>
           </motion.div>

           {/* Bottom Right Card */}
           <motion.div
              className="absolute w-[26%] md:w-[24%] aspect-[3/4] border border-rom-green/40 rounded-lg bg-[#020503]/80 backdrop-blur-md p-1.5 md:p-2 flex flex-col z-20 overflow-hidden box-shadow-glow"
              style={{ bottom: '22%', right: '0%', transformPerspective: 1000 }}
              animate={{ 
                y: [0, 10, 0], 
                rotateY: [-20, -30, -20], 
                rotateX: [-10, -5, -10] 
              }}
              transition={{ repeat: Infinity, duration: 6.8, ease: "easeInOut", delay: 1.5 }}
            >
              <div className="text-[7px] md:text-[9px] text-rom-green font-mono mb-1 uppercase opacity-80">Episode_04</div>
              <div className="flex-1 w-full rounded overflow-hidden mb-1 relative border border-rom-green/20">
                <AssetImage seed="religion" alt="ep4" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
              </div>
              <div className="text-[9px] md:text-[11px] text-rom-green font-bold font-mono tracking-tight">The Religion</div>
           </motion.div>

           {/* Network Box (Top Right Corner) */}
           <div className="absolute top-[-5%] md:top-0 right-[-2%] md:right-0 border border-rom-green/20 bg-[#020503]/80 backdrop-blur-md p-2 md:p-3 rounded text-[8px] md:text-[10px] font-mono text-rom-fg-dim z-20 box-shadow-glow">
              <div className="flex items-center gap-2 mb-1.5"><span className="text-rom-green opacity-80">NETWORK:</span> <SolanaLogo /></div>
              <div className="opacity-80">SPEED: 65,000 TPS</div>
              <div className="opacity-80 mt-0.5">FINALITY: 400MS</div>
           </div>

           {/* Now Viewing Box (Bottom Center) */}
           <div className="absolute bottom-[-10%] md:bottom-[-5%] left-[2%] right-[2%] border border-rom-green/40 bg-[#020503]/90 backdrop-blur-xl p-3 md:p-4 rounded-xl z-30 flex flex-col gap-1 box-shadow-glow">
              <div className="flex justify-between items-start">
                 <div>
                    <div className="text-[9px] md:text-[10px] text-rom-green font-mono uppercase tracking-widest opacity-80 mb-1">NOW VIEWING</div>
                    <div className="text-sm md:text-lg text-rom-green font-bold font-mono tracking-wide">Cyberpunk Frog Trader</div>
                    <div className="text-[9px] md:text-xs text-rom-fg-dim font-mono mt-0.5 opacity-70">Owned by 0xF8...3A7c</div>
                 </div>
                 <div className="hidden sm:block">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-rom-green opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                       <circle cx="12" cy="12" r="10" />
                       <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                 </div>
              </div>
              
              <div className="flex items-center gap-2 md:gap-3 mt-3 border-t border-rom-green/10 pt-3">
                 <span className="border border-rom-green/30 text-rom-green text-[8px] md:text-[9px] px-2 py-1 rounded bg-rom-green/5">IP NFT</span>
                 <span className="border border-rom-green/30 text-rom-green text-[8px] md:text-[9px] px-2 py-1 rounded bg-rom-green/5">ERC-721</span>
                 <span className="border border-rom-border text-white text-[8px] md:text-[9px] px-2 py-1 rounded flex items-center gap-1.5 bg-white/5">
                   <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                     <rect y="4" width="24" height="3" />
                     <rect y="10.5" width="24" height="3" />
                     <rect y="17" width="24" height="3" />
                   </svg>
                   ROM
                 </span>
                 
                 <div className="ml-auto flex items-center gap-1.5 md:gap-2">
                    <span className="text-[8px] md:text-[9px] text-rom-green font-mono opacity-60">NETWORK</span>
                    <SolanaLogo />
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
