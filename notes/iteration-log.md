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
