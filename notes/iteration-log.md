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

## Iteration 2 — Bespoke ROM cursor (instrument, not trail)
Date: 2026-04-29
Dimension: G. CURSOR
Design intent:
  Hero is electric, the rest reads as documentation — there's no through-line.
  Iter 1 went *inside* content (text decoder); iter 2 escalates to *outside*
  content: the user's own pointer becomes the instrument. Sensor dot (fast
  follower) + lazier ring (slow follower) that morphs by context — default,
  link-target on a/button, scanner reticle with corner brackets over the
  hero asset card. Native cursor hidden only when JS is active and pointer
  is fine; coarse/touch devices keep their native cursor entirely.
Skills used:
  - frontend-design (carryover from iter 1; applied to "instrument > novelty trail")
Awesome-archive consulted:
  - Greppped INDEX.md for: cursor | magnetic | pointer-trail | mouse-follow | reticle | crosshair
  - All "cursor" hits indexed Cursor IDE skills, not custom mouse-cursor patterns. "magnetic-automation" is a SaaS automation skill, not UI magnetism. No relevant entries — bias on craft as intended.
Files touched:
  - src/components/ui/RomCursor.tsx — NEW: top-level cursor component, RAF-lerped dot+ring, pointerover-driven mode evaluator, reduced-motion static-dot path, body[data-rom-cursor] toggles native cursor visibility only when JS active
  - src/index.css — iter-2 block: dot + ring base, [data-mode="link"] expand state, [data-mode="scan"] viewfinder reticle (corner brackets via 8-layer linear-gradient stack matching .corner-frame motif), pressed state, pointer:coarse/hover:none → display:none, reduced-motion → no transition
  - src/App.tsx — import + mount <RomCursor /> as last child of root container
  - src/components/Hero.tsx — data-cursor="scan" on MainAssetCard outer div (only contextual surface for iter 2)
Effects shipped:
  - Sensor dot (6px, signal-green w/ glow halo, mix-blend-mode: screen) — fast lerp 0.5
  - Ring (36px circle, 1px green stroke) — lazy lerp 0.18, screen blend
  - Link-target morph: ring grows to 56px + faint green fill on a/button/[role=button]
  - Scan reticle morph: ring becomes 124×84 rounded rect with 4 corner brackets matching .corner-frame system, transparent border, soft glow
  - Press feedback: brightness(1.25) on pointerdown
  - Native cursor hidden via body[data-rom-cursor] (JS gates it — no flash if JS fails)
  - Inputs/textareas keep cursor:text override
  - Coarse pointer / hover-none → cursor divs display:none, native cursor untouched
  - Reduced-motion → static dot, no follower lerp, no morph transitions
Effects rejected (and why):
  - Trailing dots / particle trail — reads as 2010s portfolio gimmick; chose lerp-pair (dot+ring) for tactile depth instead.
  - Magnetic pull (cursor snapping toward link centers) — felt fussy in mental sim; ring expansion already telegraphs target without overriding user precision.
  - Mode "read" for headlines (cursor as reading bar) — too many states for one iteration; would dilute the scan reticle's signature impact. Banked for later.
  - Pseudo-elements ::before/::after for corner brackets — uglier scaling math than the 8-layer background-gradient stack already proven by .corner-frame.
Verified: build ✅ (CSS +0.49kB gz, JS +0.58kB gz) · dev-spot-check ✅ (Vite HMR clean, no console errors)
Next-iter hint:
  The cursor now ties the page together but the SECTIONS BELOW THE FOLD still read as a flat stack. Iter 3 should push H. TRANSITION (scroll-driven section-to-section morphs / FLIP-style entrances) or A. SPATIAL (scroll-coupled depth/parallax with the matrix backdrop reacting). Avoid more cursor states this round — let iter 2's two morphs breathe before adding "read" mode etc.

## Iteration 3 — 3D depth matrix backdrop (parallax layers, subtle)
Date: 2026-04-29
Dimension: A. SPATIAL  (also lights up the new USER OVERRIDE — BACKGROUND FOCUS in awwwards-loop.txt)
Design intent:
  User pivot: "the background need to be 3D and has depth and matrix feeling but subtle"
  Existing matrix backdrop was a single-layer canvas rain + circuit traces — flat.
  Iter 3 splits the backdrop into FOUR depth tiers (far glyphs, mid canvas rain,
  trace plane, near glyphs), each parallaxing on mouse + scroll with different
  magnitudes so the field reads as a 3D space rather than a flat texture.
  Subtle is non-negotiable: opacities dialed DOWN from prior state, far layer
  blurred 0.5px, density of canvas columns reduced 18%, scatter-text opacity
  curve dropped from (0.2 → 0.7) to (0.15 → 0.55).
Skills used:
  - frontend-design (carryover from iters 1–2; applied to "subtle 3D field, not parallax theatrics")
Awesome-archive consulted:
  - Greppped INDEX.md for: cursor (iter 2) — no relevant matches surfaced for spatial/parallax this iteration; relied on first-principles parallax math (closer = more transform, near layer × 0.04, mid × 0.024, far × 0.012 of viewport-normalized mouse offset).
Files touched:
  - src/components/ui/MatrixBackdrop.tsx — restructured into 4 stacked depth layers; added wrap-level useEffect that runs a single shared RAF lerping mouse + scroll into CSS custom props (--matrix-mx / --matrix-my / --matrix-sy) which all layers consume; new DepthGlyphs component renders sparse animated glyphs for far + near tiers; canvas opacity moved from 0.45 to 0.34, density × 0.82, head-spawn rate 0.04 → 0.035, glow 12 → 10
  - src/index.css — iter-3 utility block: layer base + per-tier transform formulae using calc(var(--matrix-mx) * -Npx); .iter-3-glyph + .iter-3-glyph-drift keyframes (drift up + sideways with custom-prop horizontal offset); reduced-motion → all layer transforms cleared, glyph drift disabled, glyphs hold at 0.32 opacity
  - notes/awwwards-loop.txt — added USER OVERRIDE — BACKGROUND FOCUS section locking iters 3+ to background work until user lifts override; lists in-scope dimensions (A/D/E/C/F/J) and parks B/G/H/I unless integration pass needs them
Effects shipped:
  - Far-depth glyph layer: 32 sparse small glyphs (9–12px), 0.5px blur, opacity 0.42, drift 16–26s, parallax × -8px
  - Mid-depth canvas rain: existing matrix rain at lower density + opacity, parallax × -16px
  - Trace-plane parallax: SVG circuit traces drift × -20px (sits between mid and near)
  - Near-depth glyph layer: 11 large glyphs (22–30px), opacity 0.55, drift 20–32s, parallax × -28px
  - Mouse parallax: pointermove → viewport-normalized → lerped (0.06) → CSS var
  - Scroll parallax: scrollY → lerped (0.10) → CSS var; far drifts 0.04× scroll, near drifts 0.14×
  - Per-glyph custom drift offset via --drift-x: each glyph has its own sideways drift, breaking uniform vertical motion
  - Reduced-motion fallback: all layer transforms cleared, glyph drift disabled
Effects rejected (and why):
  - Real CSS perspective + rotateX on layers — pushed the field into "tilted plane" territory which read as an effect, not depth. Subtle ask favored size+opacity+blur depth cues over geometric perspective.
  - Adding a 4th rain canvas at far depth — performance cost too high (3 canvases × full-viewport fillRect/frame), and the size/opacity/blur grade across the existing far/mid/near already conveys depth without extra canvas work.
  - Mouse-coupled rotate (head-tracking feel) — overrode user's input intent on hover, made the page feel "drunk". Translate-only parallax is calmer.
  - Removing scatter-text from CircuitTraces — would have been simpler but the floating hex/binary IS the matrix-feel signature. Kept, opacity reduced.
  - Increasing canvas rain density — more rain = less subtle, the opposite of the brief.
Verified: build ✅ (CSS +0.34kB gz, JS +0.52kB gz; cumulative across iters 1–3 still under 2kB JS gz growth) · dev-spot-check ✅ (HMR clean — http://localhost:5173/rom-landing-page/ ; background now responds to mouse + scroll with parallax depth, layers visibly separated by size/opacity/blur, overall reads quieter than before)
Next-iter hint:
  Background now has spatial depth. Next push (per BACKGROUND FOCUS override): D. MATERIAL/SHADER — a subtle CSS gradient-shader veil that warps based on scroll velocity (e.g. radial-gradient with animated stops), or E. GENERATIVE — a slow flow-field of glyph drift trajectories tied to a Perlin-noise field. Avoid ADDING more layers; either replace one existing layer with a richer treatment OR enhance an existing layer's material quality.
