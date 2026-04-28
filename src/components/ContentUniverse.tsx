import { Film, Newspaper, Music2, UserCircle2, MonitorPlay, Megaphone, ImageIcon } from 'lucide-react'
import { GlowIcon } from './ui/GlowIcon'
import { MotionFade, MotionStagger } from './ui/Motion'
import { Section } from './ui/Section'
import { SectionIndex } from './ui/SectionIndex'

// Asymmetric 12-col bento. No row-span/aspect conflicts.
// Row 1: [HERO span-7][NORMAL span-5]
// Row 2: [span-3][span-3][span-3][span-3]
const formats: { icon: typeof Film; type: string; tag: string; body: string; span: string }[] = [
  { icon: Film, type: 'cinematic_story', tag: 'Feature franchise', body: 'Long-form arcs. Your character carries the storyline. Stack episodes, build a fandom that follows you across drops.', span: 'sm:col-span-2 md:col-span-7' },
  { icon: Newspaper, type: 'news_analysis', tag: 'Explainer channel', body: 'Your IP becomes the anchor. Daily takes. Sponsorships per episode.', span: 'sm:col-span-2 md:col-span-5' },
  { icon: Music2, type: 'music_video', tag: 'Music collab', body: 'Indie artists pay for visual IP. Same character, every release.', span: 'sm:col-span-1 md:col-span-3' },
  { icon: UserCircle2, type: 'persona_channel', tag: 'Persona channel', body: 'Your character runs its own channel. Audience compounds, merch follows.', span: 'sm:col-span-1 md:col-span-3' },
  { icon: MonitorPlay, type: 'youtube_clone', tag: 'YouTube series', body: 'Native episodes. AdSense + sponsorships + back-catalog forever.', span: 'sm:col-span-1 md:col-span-3' },
  { icon: Megaphone, type: 'ad_spot', tag: 'Brand licensing', body: 'Brands need ownable creative. License your IP, charge per spot.', span: 'sm:col-span-1 md:col-span-3' },
]

export function ContentUniverse() {
  return (
    <Section id="content" className="relative overflow-hidden">
      <SectionIndex index="02" label="One IP · Six revenue streams">
        <h2 className="display-2 font-mono">
          One character.
          <br />
          <span className="gradient-text-arcade glitch-hover" data-text="Six ways it earns.">
            Six ways it earns.
          </span>
        </h2>
        <p className="mt-6 max-w-2xl text-[15px] md:text-[17px] leading-[1.6] text-rom-fg-dim">
          Your IP doesn't need six artists, six contracts, six platforms. ROM ships your character into every format and every payout.
        </p>
      </SectionIndex>

      <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-5">
        {formats.map((f) => (
          <MotionFade
            key={f.type}
            className={`group relative flex flex-col rounded-2xl border border-rom-green/30 bg-rom-card overflow-hidden hover:border-rom-green/70 hover:-translate-y-1 transition-all duration-500 ${f.span}`}
          >
            {/* Image placeholder — uniform 16:9 across all 6 */}
            <div className="relative aspect-[16/9] overflow-hidden border-b border-rom-green/25 bg-rom-card-elevated">
              <div className="absolute inset-0 grid-floor opacity-25" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-2.5">
                <GlowIcon icon={ImageIcon} size={36} intensity="lg" />
                <span className="micro-label font-mono text-rom-green">
                  Sample · {f.tag}
                </span>
              </div>
              {/* corner brackets */}
              <span className="absolute left-3 top-3 size-3 border-l border-t border-rom-green" />
              <span className="absolute right-3 top-3 size-3 border-r border-t border-rom-green" />
              <span className="absolute left-3 bottom-3 size-3 border-l border-b border-rom-green" />
              <span className="absolute right-3 bottom-3 size-3 border-r border-b border-rom-green" />
            </div>

            <div className="flex-1 p-6 md:p-7 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="grid size-10 place-items-center rounded-lg border border-rom-green/40 bg-rom-card-elevated">
                  <GlowIcon icon={f.icon} size={18} intensity="md" />
                </span>
                <span className="micro-label font-mono text-rom-green">{f.tag}</span>
              </div>
              <code className="block text-[13px] md:text-[14px] font-mono text-rom-green font-semibold mb-2 truncate">
                {f.type}
              </code>
              <p className="text-[13.5px] leading-[1.6] text-rom-fg-dim flex-1">{f.body}</p>
            </div>
          </MotionFade>
        ))}
      </MotionStagger>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { v: '16:9', l: 'YouTube · TV' },
          { v: '9:16', l: 'TikTok · Reels' },
          { v: '1:1', l: 'Instagram feed' },
          { v: '4:5', l: 'Portrait post' },
        ].map((r) => (
          <div key={r.v} className="flex items-center justify-between rounded-xl border border-rom-green/30 bg-rom-card px-4 py-4 hover:border-rom-green/60 transition-colors">
            <code className="text-[18px] font-mono font-bold text-rom-green text-glow">{r.v}</code>
            <span className="micro-label font-mono text-rom-fg-muted text-right">{r.l}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}
