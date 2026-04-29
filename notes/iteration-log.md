# ROM Landing Page — Awwwards Escalation Log

## Iteration 1 — Hero scramble decoder
Date: 2026-04-29
Dimension: B. KINETIC TYPE
Design intent:
  Page currently *lands*; doesn't *decode*. Hero reveal is mask-up only — type
  moves but doesn't transform. Iter 1 pushes the headline trio from "produced"
  to "what is this site doing in the first 1.5 seconds": per-character cascade
  through a custom charset (binary / hex+signal-glyph), left-to-right lock with
  jittered stagger so it reads organic not mechanical, brief chromatic punch
  on each lock-in, replays on scroll-back via IntersectionObserver.
Skills used:
  - frontend-design (inline guidance — committed to refined kinetic type, not "matrix rain")
Awesome-archive consulted:
  - Greppped INDEX.md for: scramble | kinetic | text-effect | glyph | decode | typography | type-anim
  - No targeted hits; only tangential (web-typography, visual-design-foundations) — neither covers scramble patterns. Bias was on craft over pattern lift, as intended.
Files touched:
  - src/components/ui/ScrambleText.tsx — NEW: imperative RAF scramble primitive with per-char span DOM, IO-driven replay, useReducedMotion fallback, sr-only mirror for a11y
  - src/index.css — added .iter-1-scramble-char + .iter-1-landed + @keyframes iter-1-chroma-punch under @layer utilities; cyan/magenta chromatic split + signal-green glow on lock-in; reduced-motion override
  - src/components/Hero.tsx — wired ScrambleText into RevealLine for "Your IP." (binary charset) and "Your money." ([hex, signal] charset). Middle line "Your story." kept as-is to preserve gradient-text-arcade + glitch-hover signature.
Effects shipped:
  - Per-char glyph cascade with jittered lock stagger
  - Charset varies per line (binary → hex+signal) to build narrative
  - 360ms chromatic punch on each lock (cyan/magenta split + green glow → none)
  - IntersectionObserver replays scramble on scroll-back into hero
  - sr-only resolved text + aria-hidden visual track for screen readers
  - prefers-reduced-motion → instant resolved render, no scramble, no punch
Effects rejected (and why):
  - Applying scramble to middle line "Your story." — would fight the existing gradient-text-arcade + glitch-hover. Cleaner to let line 2 stay as the established signature.
  - startDelay-as-placeholder ("·····" before scramble) — read as cheap "loading state". Replaced with immediate scramble that simply starts lock-in countdown after startDelay.
  - Uniform per-char timing — felt mechanical in mental simulation. Jittered ±45ms per char gives the human-organic decode feel.
  - Pure A-Z0-9 charset — reads as "matrix rain" cliché. Custom charsets (katakana / signal glyphs / binary / hex) carry brand voice.
Verified: build ✅ · dev-spot-check ✅ (Vite HMR clean, no console errors; user should see http://localhost:5173/rom-landing-page/ — refresh for scramble)
Next-iter hint:
  Hero is now the strongest section. The page below feels visually quieter by comparison. Iter 2 should push a NEW dimension below the fold — strong candidates: H. TRANSITION (section-to-section morphs / scroll-jacked sequences for HowItWorks → ContentUniverse) or G. CURSOR (custom contextual cursor as a tool, not a trail). Cursor would tie the whole page together; transition would solve the "stack of demos" risk early.
