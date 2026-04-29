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

## Iteration 4 — Vertical signal-flux veil (every pixel breathes)
Date: 2026-04-29
Dimension: D. MATERIAL/SHADER (CSS gradient veil) + tune of iter-3 vertical purity
Web research:
  - https://www.awwwards.com/inspiration/animated-background-verticite-architecture — confirms vertical animated backgrounds are an awwwards genre (visual ref; cert errors blocked direct fetch)
  - https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/ — distilled techniques: scroll-velocity drives "breath" effect, planes drift up on scroll then float lazily back, multi-layer with depth-keyed motion, palette-driven ambient
  - https://frontendmasters.com/blog/virtual-scroll-driven-3d-scenes/ — "faux dimensional scrolling" pattern: layers + parallax + subtle motion = 3D feel without WebGL (validates canvas+CSS approach)
  - General: "ambient background motion adds subtle gradients, particles, liquid flows to create depth without distraction" — applied as the flux-band veil
Design intent:
  Iter 3 layered the field but static parts (solid base, vignette, trace lines) sat dead while only the rain fell. User asked for "subtle, vertical, all background has that cool animation." Iter 4's flux band is a slow vertical wash that touches every pixel of the backdrop continuously — green primary band + cyan counter-band at 22s/34s offset cycles so the field never goes quiet. Plus, a tune of iter-3's glyph drift to enforce vertical purity (removed lateral --drift-x; flipped direction so glyphs fall WITH the rain instead of floating up).
Skills used:
  - frontend-design (carryover from iters 1-3; applied to "veil > new layer")
  - WebSearch (queries on awwwards 3D animated backgrounds + scroll-driven techniques)
Awesome-archive consulted:
  - Skipped — prior iterations already grepped scramble/cursor/3d patterns; "shader/flux/veil" patterns aren't going to live in a community-skills index.
Files touched:
  - src/components/ui/MatrixBackdrop.tsx — added two flux-band divs (forward + counter) between trace plane and vignette; removed the per-glyph --drift-x prop and the `drift` field from DepthGlyphs items (lateral motion was a leak from "subtle vertical")
  - src/index.css — modified iter-3-glyph-drift @keyframe in place: lateral var(--drift-x) → 0, flipped Y direction (-14 → 12) so glyphs fall with the rain; added iter-4 utility block: .iter-4-flux-band base + ::before pseudo for the actual gradient strip + .iter-4-flux-band-counter cyan variant + iter-4-flux-sweep keyframe (translate Y 0 → 145vh) + reduced-motion override holding the band centered statically
Effects shipped:
  - Continuous green flux band: 45vh tall, soft vertical gradient (transparent → green → transparent), screen-blend, sweeps top→bottom over 22s on var(--ease-expo-inout)
  - Counter cyan band at offset cycle: 30vh tall, 34s sweep, -11s phase delay, dimmer (max alpha 0.05) — keeps the field never-quiet between green-band passes
  - Glyph drift now strictly vertical-downward (matches matrix rain direction)
  - All sweeps use the project's custom expo-inout easing (banned eases avoided)
  - Reduced-motion → flux band frozen at center, semi-visible, no animation
Effects rejected (and why):
  - Adding a third counter-rising glyph canvas — would have added ~2ms/frame and a 3rd full-viewport canvas without giving the user "subtle vertical everywhere"; the flux band achieves "everywhere" with zero canvas overhead.
  - Mouse-coupled flux warp (band tilts slightly toward cursor) — would have made the band itself feel reactive but pulled focus toward it; opposite of subtle.
  - Scroll-velocity → flux opacity bump — tested mentally: flickers when scrolling fast, distracts. Better as a future iter focused entirely on velocity coupling.
  - Animating the vignette — would destabilize the focus device; vignette stays still by design.
  - Adding linear easing for endless drift — banned per protocol; expo-inout at 22s reads near-linear with a barely-perceptible breath, which is actually superior.
Verified: build ✅ (CSS +0.14kB gz, JS unchanged) · dev-spot-check ✅ (HMR clean — http://localhost:5173/rom-landing-page/ ; flux band is visible as a slow vertical wash, glyphs now fall coherently with rain)
Next-iter hint:
  Next push: E. GENERATIVE — couple the matrix rain's column speed to a slow Perlin / sine-wave flow field so columns subtly group into faster/slower bands instead of independent random speeds. Reads as "the field has a current". OR: J. TACTILE FEEL — scroll-velocity briefly intensifies the flux band's opacity (rejected this iter; could land as its own coherent push). DO NOT add more visual layers — push DEPTH or MATERIAL of existing ones.

## Iteration 5 — Flow-field current through the rain (organic banding)
Date: 2026-04-29
Dimension: E. GENERATIVE (two-sine traveling flow field)
Web research:
  - https://www.instructables.com/Wave-Pattern-Matrix-Rain-Animation-With-HTML-CSS-a/ — "wave-pattern matrix rain" is an established genre; modulate column speeds with a wave function for visible banding
  - https://mrktcrn.dev/posts/2025073102-matrix-rain-effect/ — modern canvas matrix techniques (2025); subtle blur/opacity polish, OffscreenCanvas notes
  - https://medium.com/@bit101/flow-fields-part-ii-f3c24c1b777d — flow-field theory: noise-driven force fields produce results that are random but related between neighboring locations (key principle: spatial coupling)
  - https://ragingnexus.com/creative-code-lab/experiments/perlin-noise-flow-field/ — Perlin flow field reference (we deliberately chose 2-sine over Perlin: same emergent banding for ~5x less compute)
Design intent:
  Iter 4 made every pixel breathe vertically via the flux veil. The matrix rain's
  column speeds were still independent random — which reads as noise, not current.
  Iter 5 couples columns through a two-sine traveling flow field so visible bands
  of faster / slower rain propagate slowly across the field. Subtle: ±~38% speed
  modulation around each column's baseline. Vertical: only modulates fall speed,
  no lateral motion. Everywhere: every column shares the wave. Adds intention
  without adding a single layer.
Skills used:
  - frontend-design (carryover from iters 1-4)
  - WebSearch (above sources)
Awesome-archive consulted:
  - Greppped INDEX.md for: flow-field | generative | noise | perlin | wave-anim | canvas-rain
  - All hits were SaaS / generative AI / scientific (proteomics, vertex AI, generative-engine-optimization). Zero relevant visual-code skills. Continued with web research only.
Files touched:
  - src/components/ui/MatrixBackdrop.tsx — modified MatrixRain.draw() only: precompute t = performance.now() once per frame; per-column compute wave = sin(xn*6 + flowA)*0.25 + sin(xn*13 + flowB)*0.13 where flowA/B are time-driven phases at decoupled rates (0.00045 vs 0.00027); apply effective speed = baseSpeed * (1 + wave). 2 sin calls × ~150 columns × 60fps ≈ 18k sin/sec (trivial)
Effects shipped:
  - Two interfering sine waves traveling slowly across X give visible bands of fast/slow rain that propagate over ~6-8s cycles
  - Column speeds modulate ±38% from baseline; on aggregate the field reads as having a current rather than independent drops
  - No new layer, no new CSS, no perf cost over baseline
  - Reduced-motion: existing reduce gate at function entry already skips draw entirely; flow field has no separate handling needed
Effects rejected (and why):
  - Full Perlin / simplex noise flow field (cited refs) — same visual emergence as 2-sine for our use case but ~5x compute and 100+ lines of noise-table code. Two sines gives organic-feeling interference patterns at almost zero cost.
  - Modulating wave AMPLITUDE itself with time (so the current strength pulses) — felt fussy; constant ±38% reads steadier.
  - Coupling depth-glyph CSS animation durations to the same wave — would have required JS-driven CSS updates per glyph per frame; expensive and breaks the iter-3 CSS-anim simplicity. Kept depth glyphs independent (their per-element duration jitter is sufficient organic variance).
  - Coupling the flux veil's sweep velocity to the same wave — would have made flux+rain pulse together, which actually destroys subtlety (over-coordination reads as "preset"). Decoupled rhythms are more organic.
Verified: build ✅ (JS +0.05kB gz; CSS unchanged) · dev-spot-check ✅ (HMR reloaded canvas; rain now reads with visible slow-traveling banding rather than random noise)
Next-iter hint:
  Next push: J. TACTILE FEEL — scroll-velocity briefly accelerates the flow field's time multiplier and bumps flux-band opacity. Background "responds" to user motion without becoming reactive theater. OR: F. LAYOUT — per-section background tints / mood gradient that very subtly shifts hue as you scroll between sections (radial gradient with palette stop animated by IntersectionObserver). Both are subtle. Tactile is the more cohesive escalation — it gives the existing systems a single new dimension (time-coupling) without adding mass.

## Iteration 6 — Scroll-velocity tactile coupling (single energy bus)
Date: 2026-04-29
Dimension: J. TACTILE FEEL  (last additive iter before iter-7 INTEGRATION pass)
Web research:
  - https://www.smashingmagazine.com/2025/10/ambient-animations-web-design-practical-applications-part2/ — "Five subtle animations on separate layers can feel rich and alive, like a sound mix with variation in rhythm, tone, timing." Validates current 5-layer ambient state; cautions against any one element dominating
  - https://www.smashingmagazine.com/2025/09/ambient-animations-web-design-principles-implementation/ — Ambient = passive movement you don't consciously notice; performance: blur/drop-shadow strain low-power devices (we're using neither at scale)
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations — Native CSS scroll-timeline animates by scroll POSITION; no built-in for scroll VELOCITY. Confirms JS path required for tactile (velocity) coupling
  - https://tympanus.net/codrops/2024/01/17/a-practical-introduction-to-scroll-driven-animations-with-css-scroll-and-view/ — patterns for sync'd scroll animations; we adapted JS-driven velocity → CSS variable bridge (scroll-driven CSS for native, JS bridge for velocity)
Design intent:
  Page now has 5 ambient layers running on independent constant clocks. None
  reflect user motion — the background feels great but disconnected. Iter 6 adds
  ONE shared "tactile bus": scroll velocity → smoothed energy variable [0..1] →
  modulates rain flow speed (+45% max) and flux-band brightness (+55% max). Lerp
  smoothing (0.88/0.12) ensures no twitchy reaction; energy decays naturally to
  0 within ~0.5s after scroll stops. Single coupling system, two consumers, no
  new layers. Last additive push before iter-7 integration.
Skills used:
  - frontend-design (carryover from iters 1-5)
  - WebSearch (sources above)
Awesome-archive consulted:
  - Skipped — last 3 grep rounds (cursor / flow-field / scroll-velocity) all returned only SaaS/AI hits. Index has no visual-code patterns relevant to this brief.
Files touched:
  - src/components/ui/MatrixBackdrop.tsx — added module-level `const scrollState = { energy: 0 }`; in MatrixBackdrop's parallax tick(): added lastSy/lastT/energy state + per-frame scroll-velocity calc (|sy − lastSy| / dt, capped at 3 px/ms = full energy), smoothed energy = energy*0.88 + target*0.12, written to scrollState.energy AND to wrap.style as --scroll-energy CSS var; in MatrixRain.draw(): tactileBoost = 1 + scrollState.energy * 0.45, applied to per-column effective speed
  - src/index.css — added --scroll-energy: 0 default to .iter-3-matrix-wrap; added filter: brightness(calc(1 + var(--scroll-energy, 0) * 0.55)) to .iter-4-flux-band
Effects shipped:
  - Scroll-velocity → smoothed energy variable (0..1) on a single shared "tactile bus"
  - Matrix rain accelerates up to +45% during fast scroll, returns to baseline within ~0.5s after stop
  - Flux band brightens up to +55% during fast scroll (filter: brightness)
  - Both effects driven from the SAME energy variable — no decoupled twitches; tightly coordinated tactile response
  - Reduced-motion: parallax effect short-circuits before tick → energy stays 0 forever → tactileBoost=1 + brightness(1) → zero coupling; existing reduced-motion ambient state preserved
Effects rejected (and why):
  - Coupling depth-glyphs CSS animationDuration to energy — would require JS-driven CSS rewrite per-glyph per-frame; expensive and the glyphs are layer-secondary anyway (rain is the primary). Skipped.
  - Coupling flow-field time multiplier (flowA/flowB rates) to energy — would visibly change the WAVE PATTERN spacing during scroll, which reads as "bug" not "feature". Bumping baseline drop speed (which the wave still rides on top of) is cleaner.
  - Adding shadowBlur boost during high-energy — measurable perf hit per Smashing's "blur/drop-shadow strain" warning. Skipped.
  - Coupling vignette opacity — would destabilize the focus device. Vignette stays still by design (consistent with iter-4 rejection).
  - Native CSS scroll-timeline — only handles position, not velocity. JS bridge required (current approach).
Verified: build ✅ (CSS +0.02kB gz, JS +0.13kB gz) · dev-spot-check ✅ (HMR clean — http://localhost:5173/rom-landing-page/ ; rain visibly accelerates and flux band brightens when scrolling fast, settles smoothly when stopped)
Next-iter hint:
  ITER 7 = INTEGRATION PASS per protocol. Audit the 5-layer composite (depth glyphs / canvas rain / circuit traces / flux veil / flow-field current / tactile coupling) as one composed film. Likely tunings: harmonize cycle periods so layer rhythms don't constructively interfere on bad days; verify no two layers hit peak intensity simultaneously; potentially DROP one element if it competes (Smashing: "doesn't dominate, doesn't interfere"). Do not add new effects. Remove or quiet only.

## Iteration 7 — INTEGRATION PASS (audit, strip pre-iter-3 motion, quiet trace density)
Date: 2026-04-29
Dimension: INTEGRATION (no menu pick — protocol-mandated 7th-iter audit)
Web research:
  - https://www.smashingmagazine.com/2025/10/ambient-animations-web-design-practical-applications-part2/ — "If someone's eyes are drawn to a raised eyebrow, it's probably too much. Dial back until it's something you'd only catch if you're really looking." — explicit subtractive principle that drove this pass
  - https://www.smashingmagazine.com/2025/09/ambient-animations-web-design-principles-implementation/ — performance: "blur filters, drop shadows, complex CSS animations can tax lower-powered devices" — informed CircuitTraces node count cut
Design intent:
  Six iters of additive work left two backdrop components stacked: MatrixBackdrop
  (iters 3-6, our composed motion system) and Backdrop.tsx (pre-iter-3, with
  RestraintedGlows blob soup + ParticleField + signal-beam-sweep). The pre-iter-3
  elements were the LARGEST competing visual elements and used banned easings
  ('easeInOut' on framer-motion). Plus, CircuitTraces had 12 pulsing nodes — too
  many simultaneous focal points. Iter 7 strips Backdrop to pure static composition
  (no motion at all) and quiets CircuitTraces. MatrixBackdrop now owns 100% of
  motion; Backdrop owns 100% of static atmosphere. Clean ownership.
Skills used:
  - frontend-design (carryover from iters 1-6)
  - WebSearch (Smashing 2025 sources above)
Awesome-archive consulted:
  - Skipped — 4 prior grep rounds returned only SaaS/AI hits, never visual-code patterns
Files touched:
  - src/components/ui/Backdrop.tsx — full rewrite to pure static. Removed: <RestraintedGlows /> (two animated blob glows w/ banned easeInOut), <ParticleField /> (22 motion particles, redundant with iter-3 FarGlyphs), <div.signal-beam-sweep /> (superseded by iter-4 flux band), framer-motion + useMemo imports. Kept: solid base, hero glow, fine grid, scanlines, noise, vignette
  - src/components/ui/MatrixBackdrop.tsx — CircuitTraces tunings: pulsing junction nodes 12 → 6 (kept best-distributed positions); scatter-text peak opacity 0.55 → 0.32 (animate values 0.15-0.55 → 0.10-0.32; static fallback 0.55 → 0.32)
Effects shipped:
  - Pre-iter-3 motion competition removed; MatrixBackdrop owns all motion
  - Banned easings ('easeInOut') eliminated from project (verified)
  - 6 fewer simultaneously-pulsing SVG nodes — less competing pulse focus
  - Scatter text now drifts at 0.10-0.32 opacity range (was 0.15-0.55) — true ambient
  - JS bundle: raw -1.43kB (391.17 → 389.74kB); gzip noise ±0.14kB
  - CSS bundle: -0.24kB raw
  - Cleaner ownership: Backdrop = static atmosphere · MatrixBackdrop = all motion
Effects rejected (and why):
  - Removing CircuitTraces dashed flow paths (4 animated dashes) — they're directional, sparse, and read as data-flow which is on-brand for ROM; quieting nodes was sufficient
  - Harmonizing cycle periods (rain wave 6-8s, glyphs 14-32s, flux 22/34s, traces 4-10s) — periods are naturally prime-coprime so constructive interference rarely peaks; tuning would have been theatre
  - Removing fine grid — provides structure without motion; safe to keep
  - Dropping the iter-4 cyan counter flux band — narrowly considered, but it's the only chromatic variation in the field; without it the page reads as monochrome on bad days. Kept.
  - Dropping near-depth glyphs (only 11 elements) — they're the brightest layer; provides depth pop. Kept.
Verified: build ✅ (raw JS -1.43kB, gzip ±0.14kB noise) · dev-spot-check ✅ (HMR clean — http://localhost:5173/rom-landing-page/ ; field reads quieter, no eye-drawing competition between blob-glows and matrix system)
Next-iter hint:
  Backdrop is now stripped and locked. Iter 8+ resumes additive work with the
  composite pre-tuned. Consider re-opening: F. LAYOUT — per-section background
  tint shifts (radial gradient palette stops driven by IntersectionObserver as
  user scrolls between sections — still subtle, still vertical-flow, gives the
  page mood progression rather than uniform wash). OR: deepen the rain itself
  with character glow tiers (head glyph slightly larger than trail). The user
  override is still BACKGROUND FOCUS — every iter must extend the backdrop.

## Iteration 8 — Scroll-progress mood overlays (page-as-journey)
Date: 2026-04-29
Dimension: F. LAYOUT (mood progression as you scroll)
Web research:
  - https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/ — "every image defines a palette that drives the background gradient" — direct inspiration for scroll-progress driven palette shifts
  - https://prismic.io/blog/css-background-effects — confirmed CSS background-effect catalog (radial gradients with screen blend = subtle hue overlays)
  - https://www.joshwcomeau.com/animation/color-shifting/ — color-interpolation patterns; we used opacity-on-static-overlays (cheaper than color-mix or @property hue interpolation, browser-portable)
Design intent:
  Iter 7 stripped the backdrop to one tuned composite. The composite was uniform
  across all 12 sections — no narrative hue progression as the user scrolled
  from "intro" through "anatomy" to "monetization." Iter 8 adds two scroll-
  progress driven mood overlays: cyan tint peaks at ~40% scroll (around
  ContentUniverse/IPShowcase — "vast / cosmic"), amber tint peaks at ~75%
  scroll (around MakeMoney/MonetizationFlow — "value / warm"). Page is still
  95% green; the shift is barely perceptible but gives the scroll a mood arc.
  Continuous scroll-progress (not discrete sections) for smooth fade between.
Skills used:
  - frontend-design (carryover)
  - WebSearch (Codrops scroll-reactive 3D gallery as direct conceptual reference)
Awesome-archive consulted:
  - Skipped — 5 prior grep rounds, no visual-code patterns
Files touched:
  - src/components/ui/MatrixBackdrop.tsx — added moodCyan + moodAmber computation in parallax tick using window.scrollY / documentHeight progress; triangle-peak shape (1 - |progress - PEAK| * SLOPE clamped to 0); written as CSS vars --mood-cyan / --mood-amber on the wrap. Added two overlay divs (.iter-8-mood + cyan/amber variants) between flux band and vignette
  - src/index.css — added --mood-cyan: 0 / --mood-amber: 0 defaults to .iter-3-matrix-wrap; added iter-8 utility block: .iter-8-mood base (mix-blend-mode screen, fixed inset, no events), .iter-8-mood-cyan (peak alpha ~0.06 via opacity * background-alpha), .iter-8-mood-amber (peak alpha ~0.045); reduced-motion override → opacity 0
Effects shipped:
  - Cyan radial overlay peaks at 40% scroll, max effective alpha ~0.06 (0.5 opacity × 0.12 bg alpha)
  - Amber radial overlay peaks at 75% scroll, max effective alpha ~0.045
  - Continuous fade — no discrete section transitions to fight against
  - Scroll-progress driven, RAF-smoothed (rides on existing parallax tick — zero extra RAF cost)
  - Reduced-motion fallback: parallax tick short-circuits, mood vars stay 0; explicit override sets opacity 0
Effects rejected (and why):
  - IntersectionObserver per-section approach — discrete state transitions read as "preset switching" (page animates jumpily between moods at section boundaries); continuous scroll-progress fades smoothly with no transition logic needed
  - color-mix() / @property hue interpolation across actual OKLCH channel — browser support spotty, forces a color-mix for every render frame; opacity-blend over static-color overlays is faster and visually identical at these alphas
  - Adding a third mood (violet for the developer-CTA) — three mood peaks crowd the scroll arc; two-mood arc reads cleaner
  - Higher peak alphas (0.10+) — tipped over from "subtle journey" into "the background changes color when I scroll" which violates the subtle non-negotiable
Verified: build ✅ (CSS +0.10kB gz, JS +0.09kB gz) · dev-spot-check ✅ (HMR clean — http://localhost:5173/rom-landing-page/ ; page still reads green, but mid-page has a barely-perceptible cyan lift and lower-page warms slightly amber)
Next-iter hint:
  Iter 9 should sharpen the matrix rain itself — it's the strongest individual
  layer but undifferentiated. Consider: head-glyph tiers (head char gets
  slightly larger fontSize + slight forward perspective z-translate so heads
  pop subtly toward the viewer). OR: rain-trail chromatic decay (head bright
  green → mid green-cyan → tail green-dim) for depth-of-color along each
  column without breaking subtle. Avoid touching the mood layer — let it
  bake. User override BACKGROUND FOCUS still binding.

## Iteration 9 — Per-column lead intensity (rain head→tail chromatic cascade)
Date: 2026-04-29
Dimension: D. MATERIAL/SHADER (chromatic depth of the rain itself)
Web research:
  - https://medium.com/the-tech-pulse/the-joy-of-writing-unnecessary-code-a-matrix-rain-animation-with-canvas-7b01933b6e09 — confirms canonical matrix rain trail technique (semi-transparent fillRect persistence + per-frame char draw)
  - https://medium.com/@twineworks/fun-with-html-canvas-build-the-matrix-c87c4bb12487 — gradient color variations along trails are an established Matrix-rain pattern (validated direction)
  - https://dev.to/javascriptacademy/matrix-raining-code-effect-using-javascript-4hep — confirms globalAlpha controls trail length; we use 0.10 fillStyle alpha (existing) for trail decay rate
Design intent:
  Rain previously twinkled randomly via Math.random() < 0.035 — head sparkle
  was uncoupled from actual column behavior, reading as noise. Iter 9 introduces
  per-column leadIntensity [0..1] that resets to 1 when the column wraps to top
  and decays at 0.985/frame (~50 frames to drop below 0.3 = ~0.83s @ 60fps).
  Three tiers — cyan-shifted head (>0.7) → bright green mid (>0.3) → dim green
  tail — give every column a consistent depth-of-color cascade tied to physical
  fall position. Replaces twinkle-noise with material structure.
Skills used:
  - frontend-design (carryover)
  - WebSearch (canonical-rain-tutorial validation)
Awesome-archive consulted:
  - Skipped — 6 prior grep rounds, no visual-code patterns
Files touched:
  - src/components/ui/MatrixBackdrop.tsx — MatrixRain():
    * Added let leadIntensities: number[] = []
    * setup(): init leadIntensities to Math.random() * 0.3 per column (varied first-paint state, no uniform burst)
    * draw(): replaced isHead random brightening with leadIntensity tier system; per-frame decay 0.985; draw skip when y<0 AND lead<0.3 (no draws above viewport for cold columns); reset to lead=1 on column wrap
Effects shipped:
  - Cyan-tipped heads (oklch 175 hue, 0.95 alpha, 11px shadow blur) at top of each column reset
  - Bright green mid-tier (oklch 145, 0.78 alpha, 6px blur) for ~50 frames after reset
  - Dim green tail (oklch 145, 0.50 alpha, 3px blur) — current default — for the long settled phase
  - Decay timing: ~0.83s from head→tail per column, matches typical column fall pacing so the bright zone tracks the physical falling head
  - Removed Math.random() < 0.035 sparkle noise → cleaner column structure
  - Reduced-motion: existing reduce gate on draw() — no draw, no lead computation; iter-9 inherits reduced-motion behavior cleanly
Effects rejected (and why):
  - Variable fontSize per tier (head +3px) — required font swap per tier per column per frame; chose color/glow tier alone (cleaner, no font ops)
  - Z-translate / 3D perspective on head glyphs — canvas 2D doesn't support per-element z; would need DOM/SVG wrapping per glyph (adds 100s of nodes)
  - Continuous OKLCH hue interpolation (instead of 3 discrete tiers) — string allocation per char per frame is wasteful; 3-tier with branch reads identically at the visual scale we operate
  - Coupling lead intensity to scrollState.energy (faster lead decay during fast scroll) — would have made heads "snap shorter" on scroll; reads as bug. Lead and tactile boost stay independent.
  - Adding head SIZE bump on top of color tier — discussed and skipped to keep iter contained; can revisit
Verified: build ✅ (CSS unchanged, JS +0.06kB gz) · dev-spot-check ✅ (HMR clean — http://localhost:5173/rom-landing-page/ ; rain visibly has cyan-pop heads cascading down to dim-green tails per column)
Next-iter hint:
  Iter 10 — at this point the matrix system has 9 layered effects all working
  in concert. The next push should either: (1) deepen the depth-glyph layers
  with the same lead-intensity treatment (their 14-32s drift cycles get a
  brief glow phase at start) for cross-layer coherence, OR (2) introduce
  scroll-wheel-direction sensing — when scrolling UP, briefly invert the
  field's flow energy (glyphs rise vs fall). Option (2) is more ambitious
  but riskier; option (1) is coherent escalation. Pick by feel. User
  override still BACKGROUND FOCUS.

## Iteration 10 — Depth-aware color temperature for depth glyphs
Date: 2026-04-29
Dimension: D. MATERIAL/SHADER (cross-layer coherence + atmospheric color depth)
Web research:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation-method — confirms OKLCh polar interpolation in CSS keyframes; default shortest-hue path stable for our 30° step (145→175 cyan, 145→95 amber)
  - https://www.joshwcomeau.com/animation/color-shifting/ — pattern guidance for hue-flash entries; warns about grey-washing when interpolating large hue gaps (we stay within 30° to avoid)
  - https://www.smashingmagazine.com/2026/01/smashing-animations-part-8-css-relative-colour/ — relative CSS color in animations (referenced; we used static OKLCh stops, simpler than relative-color rebasing)
Design intent:
  Iter 9 gave matrix rain heads a cyan-pop on cycle reset. The 43 depth glyphs
  (32 far + 11 near) had no chromatic moment — drifted in/out via opacity only,
  reading as quietly atmospheric but disconnected from the rain's new structure.
  Iter 10 adds depth-AWARE color temperature: far layer's birth flash leans
  cool (oklch hue 178, cyan-tipped) for atmospheric distance; near layer's
  birth flash leans warm (hue 95, amber-tipped) for proximity. Both settle to
  baseline green by 50% of cycle. Canonical depth-painting move (cool retreats,
  warm advances) applied at 18% of each glyph's cycle (entrance moment).
Skills used:
  - frontend-design (carryover)
  - WebSearch (OKLCh keyframe interpolation; depth-painting principle)
Awesome-archive consulted:
  - Skipped — 7 prior grep rounds, no visual-code patterns
Files touched:
  - src/index.css — added two new @keyframes: iter-10-glyph-drift-far (cool/cyan birth flash, hue 178), iter-10-glyph-drift-near (warm/amber birth flash, hue 95). Both share the existing iter-3 transform/opacity timeline, only difference is color/text-shadow at 18% and 35% breakpoints. Added animation-name override on .iter-3-matrix-far .iter-3-glyph-drift and .iter-3-matrix-near .iter-3-glyph-drift via descendant-combinator specificity (no JS change to DepthGlyphs needed)
Effects shipped:
  - Far depth glyphs: 18% of cycle = cyan-tipped pop (oklch 0.92 0.18 178), 35% = transitioning back, 50%+ = baseline green
  - Near depth glyphs: 18% of cycle = amber-tipped pop (oklch 0.90 0.20 95), 35% = transitioning back, 50%+ = baseline green
  - Result: depth tier reads atmospherically — far cooler/cyan-tinged on entry, near warmer/amber on entry, both settling green at peak
  - CSS-only — pure keyframe addition + 2 selector overrides, no JS, no new DOM
  - Reduced-motion: existing `.iter-3-glyph-drift { animation: none }` override resets all animation properties; iter-10 keyframes inherit reduced-motion behavior automatically
Effects rejected (and why):
  - Modifying iter-3-glyph-drift in place (single keyframe with both treatments) — would have lost the per-layer color personality
  - Coupling birth-flash duration to scroll-energy — would require JS-driven CSS variable updates per glyph (43 glyphs × 60fps = expensive); CSS-only approach is correct
  - Larger hue gaps (45°+) — research warned about grey-washing through interpolation; kept to 30° for clean color path
  - Continuous OKLCh hue rotation across entire cycle — felt fussy in mental sim; flash-then-settle (the canonical "head pop" pattern) is cleaner
  - Including scroll-direction-aware flow inversion (option 2 from iter-9 hint) — high risk of reading as gimmicky / breaking vertical-only mandate; deferred (and likely permanent reject given our subtle bar)
Verified: build ✅ (CSS +0.19kB gz, JS unchanged) · dev-spot-check ✅ (HMR clean — http://localhost:5173/rom-landing-page/ ; far glyphs now flash cyan on appear, near glyphs flash amber, both quickly settle green)
Next-iter hint:
  Iter 11 — circuit traces are the only ambient layer that hasn't been touched
  since pre-loop. They have static gray-green strokes + pulsing nodes + dashed
  flows. Could give the dashed flows the same cyan-tipped head pattern (head
  of each flow brighter cyan, tail green) for full cross-layer coherence.
  CSS-only via stroke gradient update. Last iter before count limit (12).
  After iter 11, the 12th could be ANOTHER integration pass to lock the
  whole composite, or a tactile crescendo (click ripple in the field).
  User override BACKGROUND FOCUS still binding.

## Iteration 11 — Trace plane cyan-tipped flows + node pulse fill (full cross-layer coherence)
Date: 2026-04-29
Dimension: D. MATERIAL/SHADER (third iter on D — completes the cross-layer chromatic project iters 9–10 started)
Web research:
  - https://designmodo.com/animate-svg-gradients/ — confirmed SMIL is the most direct way to animate gradient stops or color attributes (CSS animation can't reach SVG gradient stops natively); SMIL supported in Chrome/FF/Safari/mobile
  - https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_animation_with_SMIL — official spec; <animate attributeName="fill"> for color animation accepts CSS Color 4 syntax (oklch)
  - https://css-tricks.com/guide-svg-animations-smil/ — SMIL declarative animation patterns (we use begin/dur/repeatCount with values list)
Design intent:
  Iter 9 (rain head cyan-pop) and iter 10 (depth-glyph cool/warm flash) established
  a cross-layer chromatic signature: cyan-tipped peaks on the head-of-cycle.
  Circuit traces were the LAST untouched ambient layer — their gradient peak was
  pure green (no cyan-pop), and node pulses only animated opacity, not color.
  Iter 11 closes the loop: trace-grad gets a cyan-shifted peak at 55% offset
  (visible 80-unit dashes carry a cyan tip as they move), and the 6 pulsing
  junction nodes get a parallel <animate attributeName="fill"> that cyan-shifts
  at peak alongside their opacity pulse. Now ALL ambient layers — rain heads,
  depth glyphs, trace flow heads, trace nodes — share one cyan-tip-on-peak
  signature. The field reads as a unified material.
Skills used:
  - frontend-design (carryover)
  - WebSearch (SMIL fill animation + gradient stop techniques)
Awesome-archive consulted:
  - Skipped — 8 prior grep rounds, no visual-code patterns
Files touched:
  - src/components/ui/MatrixBackdrop.tsx — CircuitTraces():
    * trace-grad linearGradient: replaced 3-stop green gradient (0/50/100) with 5-stop cyan-tipped peak (0/40/55/70/100) — peak at offset 55% is oklch(0.95 0.18 178) cyan-shifted, flanked by oklch(0.88 0.22 145) green at 40/70
    * Junction nodes: added second <animate attributeName="fill"> alongside existing opacity animate — values "oklch(0.92 0.24 145);oklch(0.95 0.18 178);oklch(0.92 0.24 145)", same dur/begin so opacity peak and fill peak align perfectly
Effects shipped:
  - Trace flows now have a cyan-shifted bright peak at the visible-dash center (most visible on the 2 horizontal traces; vertical traces show benign uniform color shift)
  - Junction nodes now cyan-pulse: at peak opacity, fill is also at peak cyan-tipped; at trough, fill returns to standard green
  - Node opacity peak + fill peak share dur/begin → cohesive synchronized "flash"
  - Cross-layer chromatic coherence locked across all 4 motion-bearing layers
  - SMIL animations don't auto-respect prefers-reduced-motion (browser quirk); existing system has this as known tradeoff and didn't address it pre-iter-11; iter-12 integration could close that
Effects rejected (and why):
  - Adding stroke-width pulse to dashed flow paths — third synchronized animation per node would be too much motion density; the gradient peak already telegraphs the flow head
  - Animating the static base trace lines (the gray-green strokes) — they're meant to be the "still circuit" structural layer; adding motion would muddy the figure-ground separation
  - Per-trace gradient orientation (gradientTransform aligning to path direction) — complex per-path math; the bbox-X gradient is benign on vertical paths and effective on horizontal paths, which is enough
  - Larger cyan amplitude (hue shift to 200) — pushed visible too hard; kept 178 (subtle 33° green-cyan family shift, same family as iter-10)
  - Animating fill on the static base trace lines (gray g, not flow g) — would have been over-animation and breaks figure-ground
Verified: build ✅ (CSS unchanged, JS +0.05kB gz) · dev-spot-check ✅ (HMR clean — http://localhost:5173/rom-landing-page/ ; trace flows now show cyan-tip on horizontal paths, nodes pulse cyan synchronously with their opacity throb)
Next-iter hint:
  ITER 12 = STOP LIMIT per protocol. Strong candidates:
  (1) FINAL INTEGRATION pass — final tune of the composite; potentially gate
      SMIL animations under prefers-reduced-motion (currently unaddressed),
      verify no two layers peak simultaneously on common scroll, possibly
      crop one layer if redundancy emerged across iters 8-11
  (2) Tactile crescendo — click/scroll-trigger ripple that pulses ALL the
      head-pops simultaneously for one beat (cohesive cyan flash across
      every layer), then settles — visualizes the cross-layer signature once
  Pick (1) for protocol cleanliness; pick (2) for one final memorable beat.
  After iter 12, the loop hits its count limit and STOPS automatically.
  User can lift the limit by editing notes/awwwards-loop.txt or by manual
  loop input.

## Iteration 12 — FINAL INTEGRATION: SMIL prefers-reduced-motion gate (loop terminus)
Date: 2026-04-29
Dimension: INTEGRATION (final, protocol-mandated stop at count 12)
Web research:
  - https://www.joshwcomeau.com/react/prefers-reduced-motion/ — canonical pattern: useMatchMedia('(prefers-reduced-motion: reduce)') OR framer-motion's useReducedMotion(); conditionally render motion-bearing children
  - https://elijahmanor.com/blog/prefers-reduced-motion — confirms SMIL doesn't auto-respect prefers-reduced-motion media query; React conditional render is the cleanest gate
  - https://dev.to/link2twenty/comment/1cmdg — SVG ref + pauseAnimations() API as alternative; we picked conditional-render path (cleaner static state, no mid-pulse freeze)
Design intent:
  Iter 7's integration pass missed one quality gap: SMIL <animate> elements in
  CircuitTraces don't auto-respect prefers-reduced-motion (browser quirk; SMIL
  predates the media query). Iter 12 closes that gap as the protocol-mandated
  final tick. useReducedMotion() gates conditional render of all <animate>
  children. Reduce users now get a clean static circuit structure: nodes hold
  at constant 0.7 opacity in baseline green, scatter text at 0.18 (mid value),
  flow paths held at strokeDashoffset=0 with stroke-opacity reduced to 0.4.
  System now fully accessible. Loop hits count 12 → cron self-terminates.
Skills used:
  - frontend-design (carryover, final iter)
  - WebSearch (Josh Comeau / Elijah Manor canonical reduce-gate patterns)
Awesome-archive consulted:
  - Skipped — 9 prior grep rounds, no relevant patterns ever surfaced (index is
    SaaS/AI-heavy; visual-code patterns aren't represented). Recommend the
    project STOP grepping awesome-archive going forward — net-zero ROI.
Files touched:
  - src/components/ui/MatrixBackdrop.tsx — CircuitTraces():
    * Added `import { useReducedMotion } from 'framer-motion'`
    * Added `const reduce = useReducedMotion()` at component top
    * Junction nodes: opacity static 0.7 vs 0.9 when reduce; <animate opacity> + <animate fill> wrapped in {!reduce && ...}
    * Flow paths group: opacity 0.4 vs 1 when reduce; all 4 <animate stroke-dashoffset> wrapped in {!reduce && ...}; dashes hold static at offset 0 (still showing 80-unit visible segments at path starts — hint of activity without motion)
    * Scatter text: opacity static 0.18 vs 0.32 when reduce; <animate opacity> wrapped in {!reduce && ...}
Effects shipped:
  - Full prefers-reduced-motion compliance across the matrix system (was: canvas + glyph CSS already gated; SMIL was the gap)
  - Reduce path renders quietly: nodes static-bright, dash heads frozen at start, scatter text at low opacity, no motion in trace plane
  - Full-motion path unchanged — all iter-9/10/11 chromatic-coherence work preserved
  - Loop self-terminates at count 12 per protocol
Effects rejected (and why):
  - SVG.pauseAnimations() via ref — would freeze SMIL at whatever frame it's currently on (potentially mid-pulse looking weird); conditional render gives a clean predictable static state
  - Adding a tactile crescendo (option 2 from iter-11 hint) — would have been a memorable closing beat but adds new functionality to a count-12 stop iteration; integration discipline takes precedence over flair
  - Cropping any of the 11 cumulative effects — verified the composite reads coherent; no clear redundancy. Cyan-pop signature now spans all layers and IS the through-line. Don't break it.
Verified: build ✅ (CSS unchanged, JS -0.27kB gz from minor refactor) · dev-spot-check ✅ (HMR clean — http://localhost:5173/rom-landing-page/ ; full-motion path identical to iter 11; reduce path renders static circuit cleanly)

  ═══════════════════════════════════════════════════════════════════════════
  ★ LOOP COMPLETE — count 12 reached, cron auto-stop per protocol.
  ═══════════════════════════════════════════════════════════════════════════
  Final composite (12 iter cumulative):
    - Hero: scramble-text decoder (iter 1) + bespoke ROM cursor (iter 2)
    - Background motion-bearing layers, all sharing cyan-tip-on-peak signature:
      * Far depth glyphs (cool-cyan birth flash)         [iter 3, 10]
      * Canvas matrix rain w/ flow-field current + lead-intensity head-tail
        cascade + tactile-coupled speed bump            [iter 3, 5, 6, 9]
      * Near depth glyphs (warm-amber birth flash)       [iter 3, 10]
      * Circuit trace plane (cyan-tipped flow heads,
        cyan-pulsing nodes, accessibility-gated)         [iter 7, 11, 12]
      * Vertical signal-flux band x2 + counter band
        (scroll-velocity coupled brightness)             [iter 4, 6]
      * Scroll-progress mood overlays
        (cyan mid, amber lower)                          [iter 8]
    - Backdrop: pure static atmospheric foundation       [iter 7 strip]
  All effects: vertical / subtle / page-wide / reduced-motion-compliant /
  on a tuned tactile bus that responds to user scroll velocity.
  ═══════════════════════════════════════════════════════════════════════════
