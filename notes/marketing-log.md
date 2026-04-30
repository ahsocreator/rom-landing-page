# ROM Landing Page — Marketing Branch Log

Branch: `marketing/api-character`
Forked from: `main` at commit `286cfd1` (iter 12 of awwwards loop + matrix layering fix + opacity bumps)

## Direction

Reframe the landing from IP-creator narrative ("Your IP. Your story. Your money.") to a **developer/API pitch** that leads with the OUTCOME (IP that earns money) and treats simple code as the closer, not the protagonist.

The user's brief: *"the narrative should focus on use simple code to generate money and IP not give the code is the narrative."*

## Final shape (commit `a2b2b61`)

### Hero left column
- Badge: `[ Make IP // Make Money // In One Call ]`
- Headline trio:
  - `Make IP.` (binary scramble)
  - `Make money.` (gradient-arcade + glitch — climax)
  - `In one call.` (hex+signal scramble — closer)
- Subhead 1: *"Original characters that own their lineage and earn from every render. Solana-native, on-chain from the first call. ROM turns simple code into IP that pays."*
- Subhead 2: *"No stack. No contracts. **Code that earns.**"*
- CTAs: **Start earning** (primary) · Read the docs (ghost)
- Stats: `1` call · live earning IP / `100%` on-chain · auto revenue / `∞` characters · zero glue code

### Hero center (unchanged)
- TiltFloat → MainAssetCard with the existing scan-cursor `data-cursor="scan"` integration

### Hero right (unchanged)
- LineageColumn

### TickerBar
| | |
|---|---|
| `Code2` | 1 Line · Live Character |
| `∞` | ∞ Mints · One Endpoint |
| `Workflow` | Revenue Routing · Auto |
| `Coins` | 4 Minutes · Wallet Earning |

### `index.html`
- Title: `ROM — One API. Character to Revenue on Solana.`
- Description: *"ROM is the API for AI character creation and on-chain monetization on Solana. One call: tradable character, lineage, revenue routing. One line of code makes it real."*

## Iteration trail

### Commit 1 — `b52fcc4` (initial reframe)
- Replaced "Your IP / Your story / Your money" with "One call. / Your character. / Real money."
- Added a **prominent code-snippet card** under the buttons showing the literal `rom.create({ seed: "Vela" })` call
- New CTAs: "Get an API key" + "Read the docs"
- TickerBar reframed
- Meta updated

### Commit 2 — `0766aec` (outcome-led narrative)
*User feedback: "the code shouldn't BE the story; outcome is the story."*
- Headline: "Make IP. / Make money. / From simple code."
- Demoted code snippet from prominent card to a footnote-style block under the stats with caption *"↓ that's all the code it takes"*
- Subhead leads with what comes OUT (characters that own lineage, earn from every render); ROM described as "turns simple code into IP that pays"
- CTA: "Start earning" replaces "Get an API key" (outcome > mechanism)
- Stats: 1 call · live earning IP / 100% on-chain · auto split / ∞ chars

### Commit 3 — `a2b2b61` (layout cleanup)
*User feedback: "layout is so bad bro"*
- Headline line 3: "From simple code." (4 words, off-rhythm) → **"In one call."** (3 words, matches "Make IP." / "Make money." beat)
- **Dropped the code snippet entirely** — it bloated the left column past the center asset card height, breaking the 3-column visual balance
- Stats label trim: "auto revenue split" → "auto revenue" for cleaner row width

## Lessons recorded

1. **Lead with outcome, not mechanism.** Code/API/tech-stack details are the punchline, not the headline. The headline must answer "what do I get?" before "how do I get it?"
2. **Headline lines need rhythmic balance.** When using a 3-line scrambled headline pattern, all three lines should be similar length / syllable count. "From simple code." (4 words) broke the rhythm of "Make IP." (3 words) / "Make money." (2 words). "In one call." (3 words) reads correct.
3. **Don't bloat columns past center balance.** A code-snippet block under stats made the left col taller than the center asset card. The 3-col layout needs heights to roughly match.

## Open follow-ups (NOT shipped on this branch)

- HowItWorks, MakeMoney, DeveloperCTA, MonetizationFlow sections still carry the original IP-creator narrative — they read inconsistently with the new hero. Worth a second pass if this branch is the chosen direction.
- AssetAnatomy, ContentUniverse, IPShowcase, SeriesProtocol — same.
- Footer copy — unchecked.
- The `MainAssetCard` in the hero center still says "The Last Signal" by `0xA1cF...7e3B` etc. — that's IP-narrative content. For consistency, the asset card could show a "character" creation result instead (e.g., "Vela · seed: Vela · just minted").

## Branches at the time of this log

- `main` — original IP-creator narrative + 12-iter background animation system + matrix layering fix. Live at https://ahsocreator.github.io/rom-landing-page/
- `marketing/api-character` (this branch) — developer/API pitch. PR-able at https://github.com/ahsocreator/rom-landing-page/pull/new/marketing/api-character
