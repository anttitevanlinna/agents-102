---
type: run-log
domain: coding
evidence_level: L3
platforms: [coding-agents]
nordic: false
updated: 2026-06-03
cycle: 2
---

# Token / Context / Cost Drivers — Sweep 2 (Confirmation): Cache-Loss + Fan-Out

## Focus

Verify-not-discover pass on two drivers Sweep 1 surfaced as L3 that were NOT in the original four hypotheses:
- **Cache invalidation / cache-loss** (re-pay full input price when cache busts).
- **Multi-agent / parallel fan-out** ("~15x baseline").

Job: confirm headline numbers at primary source, count DISTINCT independent practitioners, hunt counter-evidence, re-check bylines + freshness, and emit back-sweep corrections.

## Queries Used

1. (WebFetch) anthropic.com/engineering/multi-agent-research-system — 15x at source + when-not-worth-it
2. (WebFetch) lucumr.pocoo.org/2026/1/18/agent-psychosis/ — Ronacher Ralph cache-loss verbatim
3. (WebFetch) github.com/anthropics/claude-code/issues/27048 — cache invalidation on resume, real measurement
4. (WebFetch) github.com/cnighswonger/claude-code-cache-fix — trace the "20x" number
5. (WebFetch) github.com/anthropics/claude-code/issues/42338 — second independent resume-cache regression
6. (WebSearch) Claude Code prompt cache invalidation session resume cost practitioner CLAUDE.md busts cache
7. (WebSearch) multi-agent fan-out 15x tokens worth the cost when to use single agent counter

## Confirmation — Driver A: Cache invalidation / cache-loss

**VERDICT: CONFIRMED at L3 (mechanism + flagship bug well-evidenced). The headline "20x on resume" only PARTIALLY holds — downgrade the SOURCE of that number.**

### Headline number — "up to 20x on resume"
- **The 20x as printed by cnighswonger/claude-code-cache-fix is [UNVERIFIED STAT] at that repo.** The repo's own README provides NO methodology/benchmark/A-B for "20x." Its only concrete figure is a `$0.50/hr → $5–10/hr` range — i.e. **10x–20x, not a measured 20x**. The "up to 20x" headline is unsubstantiated *within that document*. https://github.com/cnighswonger/claude-code-cache-fix
- **BUT the underlying ~20x is independently grounded by the real bug report**, anthropics/claude-code **issue #27048** (own measurement, not a round guess): heavy-read sessions drop cache hit-rate **99% → 17%**, with **98K previously-cached tokens not retrieved and 91K re-written** ("complete re-evaluation/rewriting of tool-use content section"). Title: *"[BUG] Prompt Cache Invalidation on Session Resume…"*; opened 2026-02-20; **closed as not planned**. The ~20x-token-waste figure here is attached to a methodology (cache-read vs cache-write deltas), so it is supporting [practitioner direct, issue tracker] — NOT a zombie. https://github.com/anthropics/claude-code/issues/27048
- **Net:** the *mechanism and the ~10–20x cost band are real and measured*; the specific "20x" headline should be cited to **issue #27048's measured 99%→17% / 91K-rewrite**, NOT to the cache-fix repo's unbacked title. Cite the measurement, drop the slogan.

### Ronacher [practitioner direct] — byline + freshness re-checked
- Armin Ronacher, *Agent Psychosis*, lucumr.pocoo.org, **2026-01-18**. Own blog → **[practitioner direct] confirmed.** All four Sweep-1 quotes verified verbatim: Ralph "you restart the loop from scratch each time, which means you lose the ability to use cached tokens or reuse context"; "burn through tokens at staggering rates"; "MiniJinja to Go took only 2.2 million tokens"; "current token pricing is almost certainly subsidized." Freshness: ~4.5 months old → **current** (inside 6-mo window). https://lucumr.pocoo.org/2026/1/18/agent-psychosis/

### Convergence count — DISTINCT independent practitioners naming cache-loss
Honest count of *distinct, independent* sources that name cache-invalidation/cache-loss as a cost driver:
1. Ronacher (blog) — Ralph cache-cold restarts. [practitioner direct]
2. claude-code **issue #27048** reporter — resume + plugin-state cache rewrite, measured. [practitioner direct]
3. claude-code **issue #42338** (NEW this sweep) — *"Session resume (--continue) invalidates entire prompt cache… 400–500k tokens each time."* Controlled tests: `cr:176,193→0`, `cc:0→176,730`; 3 resumes = ~1.43M cache_creation vs ~155k useful output (9x); root cause `deferred_tools_delta` v2.1.69 reorders tool results. Opened 2026-04-02, closed. [practitioner direct, issue tracker] https://github.com/anthropics/claude-code/issues/42338
4. claude-code **issue #51218** (NEW, surfaced) — *"Prompt cache expires during active session, causing massive token spikes on next prompt."* [practitioner direct, issue tracker] https://github.com/anthropics/claude-code/issues/51218
5. cnighswonger cache-fix repo author — same regression, built a patch. [practitioner direct] (number unbacked, but the *phenomenon* corroborates)
6–9. how-to/analysis layer (claudecodecamp, mindstudio, knightli, primeline) on cache mechanics — [domain how-to]/[practitioner analysis], corroborating mechanism not independent incidents.

**Verdict on level:** Sweep 1 claimed "10+ independent practitioners." That is **overstated** — the *named, independent, direct* incident-reporters number **~4–5** (Ronacher + 3–4 distinct GitHub issue reporters), with a how-to corroboration layer behind them. BUT four independent flagship-grade direct reports of the *same mechanism with measurements*, plus a named practitioner, plus convergent how-to coverage, clears the L3 bar for *"cache-loss is a real, named cost driver."* **CONFIRMED-L3** — but tighten the wording from "10+ independent practitioners" to "~4–5 independent direct incident reports + how-to convergence."

## Confirmation — Driver C: Multi-agent / parallel fan-out

**VERDICT: CONFIRMED at L3 for the 15x figure (Anthropic-direct, exact). One important correction: the COMPOUNDING "×10x → 150x" claim is NOT in the primary source.**

### Headline number — "~15x"
- **HELD, verbatim, at primary source.** Anthropic engineering, *How we built our multi-agent research system*: **"In our data, agents typically use about 4× more tokens than chat interactions, and multi-agent systems use about 15× more tokens than chats."** [practitioner direct] (Anthropic's own engineering venue). Byline: Jeremy Hadfield, Barry Zhang, Kenneth Lien, Florian Scholz, Jeremy Fox, Daniel Ford. https://www.anthropic.com/engineering/multi-agent-research-system
- **FRESHNESS FLAG:** publication date **2025-06-13** → ~12 months old → **DATED CONTEXT, not current.** The 15x is a durable architecture datum, fine to cite, but must be labeled as a year-old figure, not fresh signal. Sweep 1 did not flag this.
- **Performance-variance datum (bonus, verified):** "token usage by itself explains 80% of the variance" (BrowseComp eval). [practitioner direct].

### Compounding "×10x → 150x+"
- Sweep 1: *"a subagent that recursively spawns more subagents, or a tool that returns oversized results, can multiply a single query's cost by another 10x or more."* **This specific compounding sentence does NOT appear in the Anthropic primary source** (the post quantifies only the 4x / 15x base multipliers). It reads like a digest-layer extrapolation. Treat the "×10x → 150x" as **[UNVERIFIED — not at primary source]**, directional at best.

### Convergence count
The 15x is a *single primary figure* (Anthropic) restated by many digests (bytebytego, theaiengineer, codingscape/X, beam.ai, finout, fountaincity). Restatements of one source are **not** independent convergence — they are amplification of one [practitioner direct] datum. So Driver C is L3 *on the strength of the Anthropic-direct figure + the fact that fan-out-multiplies-cost is mechanically uncontested*, NOT on practitioner convergence. **Distinct independent practitioners independently MEASURING a fan-out multiplier: ~1 (Anthropic).** Keep at L3 but for the right reason (authoritative direct + mechanically self-evident), and stop implying many independent measurements.

## Counter-evidence

- **Fan-out is often NOT worth it — from Anthropic itself (strongest counter):** "For economic viability, multi-agent systems require tasks where the value of the task is high enough to pay for the increased performance"; "some domains that require all agents to share the same context or involve many dependencies between agents are not a good fit for multi-agent systems today"; **"most coding tasks involve fewer truly parallelizable tasks than research, and LLM agents are not yet great at coordinating and delegating."** → For *agentic CODING* specifically (our domain), the primary source says fan-out is frequently the wrong tool. The 15x is a *conditional* cost driver, not a default. This materially tempers Driver C for the coding audience. https://www.anthropic.com/engineering/multi-agent-research-system
- **Codingscape framing:** "when task value > token cost, multi-agent wins" — i.e. the multiplier is a feature you buy deliberately, not pure waste. [practitioner analysis] https://x.com/codingscape/status/1937503477971697684
- **Cache-loss is being actively mitigated (counter to "negligible? no — but fixable"):** both #27048 and #42338 are CLOSED (root-cause identified: `deferred_tools_delta` reordering, plugin-state rewrites), and a community patch (cache-fix repo) exists. So cache-loss is a **fixable regression, not a permanent tax** — its severity is version-dependent. Cite as a *current/recent* driver, not a structural law.
- **No source found arguing cache-loss is negligible or already fully solved** — searched; the live issues + open patch indicate it was real and recent. Absence-of-disconfirmation noted.

## Back-sweep corrections

BACK-SWEEP NEEDED: In sweep-1 file (Driver A), change "Evidence level for cache-loss overall: L3 (10+ independent practitioners…)" → "L3, but on ~4–5 independent DIRECT incident reports (Ronacher + claude-code issues #27048/#42338/#51218 + cache-fix repo) plus how-to convergence — NOT 10+ independent practitioners."

BACK-SWEEP NEEDED: In sweep-1 file (Driver A), the "20x cost increase on resume" must be re-cited: the cnighswonger repo gives NO methodology (its own figure is a 10–20x range → [UNVERIFIED at that repo]). Re-anchor the ~20x to issue #27048's MEASURED 99%→17% cache hit-rate / 91K-rewrite. Add issues #42338 (measured 9x cache_creation:output, 400–500k re-cache/resume) and #51218 as corroboration.

BACK-SWEEP NEEDED: In sweep-1 file (Driver C), add FRESHNESS label to the Anthropic multi-agent post — dated 2025-06-13 (~12 mo old) = DATED CONTEXT, not current signal.

BACK-SWEEP NEEDED: In sweep-1 file (Driver C), the compounding "×10x → 150x+" sentence is NOT in the Anthropic primary source — relabel as [UNVERIFIED — not at primary], directional only.

BACK-SWEEP NEEDED: In sweep-1 file (Driver C), add Anthropic's OWN counter — "most coding tasks involve fewer truly parallelizable tasks than research" — so the synthesis doesn't present fan-out 15x as a default cost in CODING; it is conditional/high-value-task only.

## Orientation

Both drivers survive as L3 but with tightened wording:
- **Cache-loss (A): CONFIRMED-L3.** Mechanism + ~10–20x cost band are MEASURED (issue #27048: 99%→17%, 91K rewrite; #42338: 9x cache_creation:output). The "20x" slogan from the cache-fix repo is unbacked — cite the issue measurements instead. Real practitioner count ~4–5 direct, not 10+. Caveat: it's a fixable, version-dependent regression (both issues closed, patch exists), not a permanent tax.
- **Fan-out (C): CONFIRMED-L3 for the 15x** (Anthropic-direct, verbatim, but ~12 mo old = dated). The "×10x → 150x" compounding is NOT at primary source. Independent measurements = ~1 (Anthropic); L3 rests on authoritative-direct + mechanical self-evidence, not convergence. Strongest caveat: Anthropic itself says fan-out is the WRONG tool for most coding tasks — for our coding audience this is a conditional, high-value-task driver, not a default.
- Net for synthesis: keep both in the driver list; demote the round-number slogans (20x repo headline, 150x compounding) and replace with the measured figures; freshness-flag the 15x; add the coding-specific "fan-out is conditional" caveat.
