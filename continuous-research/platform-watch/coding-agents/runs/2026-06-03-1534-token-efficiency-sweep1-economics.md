---
type: run-log
domain: coding
evidence_level: L3
platforms: [anthropic, coding-agents]
nordic: false
updated: 2026-06-03
cycle: token-eff-s1
---

# Token / context efficiency in agentic coding — economics lens (sweep 1)

Lens: **the economics of token spend in agentic coding.** Prompt caching in practice, model routing for cost, cost-per-task / cost-per-PR thinking, and the "tokens are cheap" vs "context bloat makes the model dumber" debate. People-first.

Note on the field: the top of every search is SEO/affiliate vendor-blog content (KissAPI, AI Magicx, claudebuddy, primeline, findskill, etc.) — **L0, treated as not-evidence**. The findings below are filtered to named practitioners with bylines, primary tooling/repos, and one vendor-engineering venue flagged as such.

---

## 1. Prompt caching in practice

### F1 — Simon Willison: Opus 4.7 tokenizer silently inflates the bill ~40% [practitioner direct, L2 single-case-measured]
- **Who:** Simon Willison (own tool, own measurement). **URL:** https://simonwillison.net/2026/Apr/20/claude-token-counts/ (+ https://x.com/simonw/status/2046029612820594962). **Date:** 2026-04-20.
- **What:** Upgraded his Claude token-counter tool to compare models; pasted the Opus 4.7 system prompt and found Opus 4.7's tokenizer emits **1.46x the tokens** of Opus 4.6 for text and **3.01x for a high-res image**. Per-token price unchanged ($5/$25 per Mtok), so the tokenizer change is a **silent ~40% price bump** for the same content.
- **Quote:** *"Opus 4.7 does appear to use 1.46x times the tokens for text and up to 3x the tokens for images — it's priced the same as Opus 4.6 on a per-token basis so this is actually a pretty big price bump."*
- **Why it matters for our lens:** token spend is not just a function of how you prompt — the *tokenizer itself* is a cost variable across model versions. Cost-per-task comparisons must hold the tokenizer constant.

### F2 — claude-code-cache-fix: resumed sessions silently bust the cache, up to 20x cost [practitioner direct, L2/L3 community-validated]
- **Who:** cnighswonger + contributors (@bilby91, @ArkNill, @fgrosswig), built on ~30 tracked CC issues. **URL:** https://github.com/cnighswonger/claude-code-cache-fix. **Date:** 2026 (active).
- **What:** Using `--resume`/`/resume` breaks the prompt-cache prefix silently; the API rebuilds cached tokens from scratch every turn. Three root causes: partial-block scatter, `cc_version` fingerprint instability, non-deterministic tool ordering.
- **Quote (concrete $):** *"A session that should cost ~$0.50/hour can burn through $5–10/hour with no visible indication anything is wrong."* Repo headline: **"up to 20x cost increase on resumed sessions."**
- **Why it matters:** cache hit rate is fragile and invisible. The cost lever is real but breaks under ordinary workflows (session resume), and you only catch it if you *measure*.

### F3 — LMCache teardown: how Claude Code engineers the prefix for reuse [practitioner analysis, L2 single-trace-measured]
- **Who:** Kobe & Mengbing (LMCache blog — they build a KV-cache layer, so adjacent-vendor; the *trace measurement* is independent). **URL:** https://blog.lmcache.ai/en/2025/12/23/context-engineering-reuse-pattern-under-the-hood-of-claude-code/. **Date:** 2025-12-23.
- **What:** Traced 92 LLM calls in a real CC run. Measured **92% prefix reuse overall**, **97.83%** in execution phase, **93.23%** in the plan-subagent phase. CC runs **warm-up calls** that input nothing but the tool list / subagent prompts to prime cache. Main system prompt is **20,000+ tokens** (git state + full tool specs). Subagents get a **subset (10/18) of the tool list** — role-specific context isolates and preserves prefix.
- **Quote (concrete $):** *"2M input tokens without caching would cost $6.00 … with prefix caching, the cost drops to just $1.152"* — **81% reduction**.
- **Mechanism (corroborates structural facts):** CC appends mid-session updates via `system-reminder` tags rather than editing the system prompt, keeping the prefix byte-stable. (Same append-only mechanism the env wraps this very task in.)

### F4 — Anthropic structural facts on caching (VENDOR VENUE — structural only) [vendor docs, L0 for metrics]
- **URL:** https://code.claude.com/docs/en/prompt-caching ; https://claude.com/blog/lessons-from-building-claude-code-prompt-caching-is-everything.
- **Structural facts (usable):** cache-read priced at ~10% of normal input; `cache_control` goes on the last block whose prefix is identical across requests; anything volatile in the cached prefix (timestamps, user-specific content) busts the cache. **TTL changed from 60 min → 5 min in early 2026** (corroborated by multiple secondary write-ups) — a structural change that *raises* effective cost for intermittent workflows.
- **Flag:** the "prompt caching is everything" framing is vendor self-narrative; the *60–90% cost reduction* numbers floating in SEO posts are vendor/affiliate-sourced — **do not cite as evidence.**

---

## 2. Model routing for cost

### F5 — Steven Gonsalvez: practitioner routing ladder [practitioner direct, L1/L2]
- **Who:** Steven Gonsalvez, engineer at EE (London). First-person. **URL:** https://dev.to/stevengonsalvez/token-optimisation-101-stop-burning-money-on-ai-coding-agents-4mce. **Date:** 2026-04-26 (ed. 2026-05-19).
- **Routing rule (quote):** *"Haiku for throwaway questions. Sonnet for daily work. `/model opusplan` for architecture (Opus thinks, Sonnet executes). Opus for the genuinely hard stuff."*
- **Other measured-ish claims:** message-cost scaling *"Message 1 costs 1x. Message 10 costs 10x. Message 30 costs 31x more than message 1"* (the quadratic re-send cost of a growing transcript); recommends resetting at **15–20 messages**; thinking budget *"Max effort can use up to 10x more tokens than low effort"*; Playwright MCP alone *"15,000 tokens"*; cached tokens *"roughly 10% of uncached."*
- **Why it matters:** clean articulation of "the transcript is the cost, not the question" — every turn re-pays for the whole prefix unless cached, so message count is the spend driver.

### F6 — Subagents pinned to Haiku by default + the routing-quality reversal [practitioner analysis, L1/L2]
- **Source set:** Claude Code subagent docs (structural) + community routing guides. CC integrates **Haiku 4.5 as the default sub-agent model** — fast/parallel execution while the primary (Opus/Sonnet) plans. URLs: https://code.claude.com/docs/en/sub-agents ; https://dev.to/bruce_he/sub-agent-architecture-for-ai-coding-harnesses-when-to-spawn-how-to-route-what-it-costs-1bno.
- **Counter-intuitive practitioner claim (Bruce He, single-case L2):** restructuring from "Opus orchestrator + Sonnet workers" to **"Sonnet orchestrator + Opus *writer* + Haiku *searchers*"** dropped end-to-end token cost **~60%** *and* improved output quality — i.e. cost and quality moved together, not against each other.
- **Caveat quote (route by complexity, not price):** *"Haiku reading 100K tokens of logs to emit a 200-token classification is great. Haiku writing 2,000 lines of production code is malpractice."*
- **Price spread (structural, Anthropic pricing):** Haiku $1/Mtok input ≈ 3x cheaper than Sonnet, ~5x cheaper than Opus; cache-read $0.10/Mtok. (Secondary "15x cheaper than Opus" / "save 80%" figures are vendor/affiliate — flagged, not cited.)

---

## 3. Cost-per-task / cost-per-PR / token-budget thinking

### F7 — Faros AI: per-developer Claude Code cost from product telemetry [practitioner analysis / vendor-adjacent, L2]
- **Who:** Thierry Donneau-Golencer, Head of Product, Faros AI (sells eng-analytics — vendor-adjacent, but reports aggregate customer-deployment figures). **URL:** https://www.faros.ai/blog/claude-code-token-limits. **Date:** 2025-12-04 (upd. 2026-05).
- **Figures (quote):** *"The average cost for Claude Code is approximately $6 per developer per day, with 90% of users staying below $12 per day."* API team deployments on Sonnet 4.5: **~$100–200 / developer / month.**
- **Token-window facts:** Pro ~44k tok / 5-hr window; Max5 ~88k; Max20 ~220k.
- **Flag:** Faros attributes to "our analysis" but does not publish the underlying telemetry — treat the $6/day as supporting, not settled. Round numbers ($6, $12, $100–200) → partial **[UNVERIFIED STAT]** on provenance.

### F8 — ccusage: the de-facto practitioner cost-measurement tool [practitioner direct, tooling]
- **Who:** ryoppippi (ryo) + contributors. **URL:** https://github.com/ryoppippi/ccusage ; https://ccusage.com/guide/monthly-reports. **Date:** active 2026.
- **What:** Reads CC's local JSONL files; produces daily/weekly/monthly/session reports broken down by model, input/output tokens, **cache-creation and cache-read tokens** separately, total tokens, and USD cost. The monthly report makes cache-read share visible — which is *how* a practitioner would actually measure cache hit rate locally.
- **Ecosystem:** ccusage-web (web dashboard), claude-usage (phuryn, local dashboard w/ Pro/Max progress bar), ccflare. CC's own `/usage` command now attributes spend to skills/subagents/plugins/MCP servers as % of total — i.e. per-feature token accounting is becoming first-class.
- **Why it matters:** "cost-per-task" thinking has tooling now. Cache-read vs cache-creation as separate line items is the metric to watch — the gap between them is your effective cache hit rate.

### F9 — The 10B-tokens / $15k-vs-$800 subscription-arbitrage anecdote [tech press / secondary, L1 — flagged]
- **Claim circulating:** one developer used ~10B tokens over 8 months; API-equivalent >$15,000 vs ~$800 on Max — a ~93% saving via subscription vs API. Surfaced via pricing-guide aggregators (verdent / ssdnodes / cloudzero) — **secondary, original byline not located.** Round numbers → **[UNVERIFIED STAT]**. Captured as a *directional* claim only: for heavy daily users the Max subscription dominates API metered billing — corroborated qualitatively by Gonsalvez and the pricing-guide consensus, but the exact figure is unsourced.

---

## 4. "Tokens are cheap" vs "context bloat makes the model dumber" — BOTH sides

### F10 — Anthropic Applied AI: context as a finite attention budget (the "spend matters for QUALITY" side) [vendor engineering venue — flag self-reported, structural reasoning usable]
- **Who:** Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, Jeremy Hadfield (Anthropic Applied AI). **URL:** https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents. **Date:** 2025-09-29 (slightly outside the 6-mo window — included as the canonical framing the in-window practitioner pieces all cite back to).
- **Core claims (quotes):** *"LLMs have an 'attention budget' that they draw on when parsing large volumes of context"*; *"as the number of tokens in the context window increases, the model's ability to accurately recall information from that context decreases"* (context rot); *"find the smallest set of high-signal tokens that maximize the likelihood of some desired outcome."*
- **Position:** spend matters because tokens are a *quality* resource, not only a cost line. This is the intellectual anchor of the "context bloat makes the model dumber" camp — coming from the vendor itself, so flagged, but the context-rot mechanism is independently replicated in academic work (arxiv 2602.16069, "Limits of Long-Context Reasoning in Automated Bug Fixing").

### F11 — "trimming context improves cost AND quality — same lever" (the synthesis position) [practitioner analysis, L1/L2]
- **Sources:** morphllm context-engineering essay (https://www.morphllm.com/context-engineering — "Why More Tokens Makes Agents Worse"); Gonsalvez (F5) measuring quality drop *"once you've burned past about 60% of the context window."*
- **Key reframe:** the "tokens are cheap vs spend matters" debate is a false binary for agents — *"trimming that context usually improves both quality and cost simultaneously — they're the same lever."* Unlike chat, where cheap tokens are harmless, in long agent loops bloat both raises the bill *and* degrades the output, so the two objectives align.
- **Counter to "tokens are cheap":** *"When tokens were effectively free, agent accuracy didn't really matter"* — the lazy pattern was "agent gambling" (thin prompt, throw context, hope). Every miss then triggers fix cycles / reruns / burned human attention — the *real* cost is downstream of the token bill.

### F12 — "tokens cheap relative to engineer time" — the OTHER side (counter-evidence sought, weakly sourced)
- **Status:** This stance is *widely asserted in passing* ("a 7,000-token harness is 3.5% of a 200k window before you write a line of code" — Armin Ronacher's Pi framing, via byteiota digest) but I did **not** find a strong in-window practitioner piece making the full argument *"don't optimise tokens, optimise for engineer throughput, the spend is noise vs salary."* The closest is the implicit Max-plan-arbitrage logic (F9): if $200/mo replaces $15k of API spend AND saves engineer hours, token micro-optimisation is rounding error. **Captured as a gap** — see below. The strongest *synthesis* (F11) actually dissolves this side: for agents, you rarely have to choose.

---

## What I looked for but did NOT find

1. **A named senior engineer publishing their actual monthly Claude Code bill with a per-PR / per-feature breakdown** (e.g. "this feature cost me $4.20 in tokens"). The tooling exists (ccusage, `/usage`) but I found no in-window first-person *"here is my dashboard for the quarter"* post with the numbers shown. The closest aggregate is Faros (vendor-adjacent, no raw telemetry).
2. **Measured cache-hit-rate as a tracked team KPI** with a target and a before/after. The 92% / 99.5% figures exist but come from single traces / interceptor demos, not a team treating "keep cache hit rate >X%" as an operational metric over time.
3. **A rigorous head-to-head cost-per-task A/B** (same task, Opus-only vs routed Haiku/Sonnet/Opus) with $ and pass-rate both reported. Bruce He's ~60% / "quality improved" claim is the nearest but is single-case and lacks the eval harness detail.
4. **A clean, well-sourced statement of the "tokens are cheap, stop optimising, ship faster" camp** from a credible practitioner. It's assumed everywhere, argued nowhere in-window. (Possibly because in agentic loops the synthesis position — F11 — has largely won the practitioner argument: bloat costs money *and* quality, so almost no one defends spend-indifference for long-running agents.)
5. **Nordic practitioners** on this topic — none surfaced. (nordic: false.)
6. **Independent (non-vendor) confirmation of the headline "60–90% caching cost reduction"** — every clean instance traces to Anthropic docs or SEO/affiliate blogs. The independent measured figure I trust most is LMCache's **81% on a real 2M-token trace** (F3), and Gonsalvez's structural "cache read ≈ 10% of uncached" (F5).

## Evidence-ladder summary
- Strongest (L2 measured, practitioner-direct): Willison tokenizer (F1), claude-code-cache-fix (F2), LMCache trace (F3), Gonsalvez (F5), ccusage tooling (F8).
- Convergence (L3) on one claim: **cache-read ≈ 10% of input cost** appears in Anthropic docs + Gonsalvez + LMCache + multiple secondaries — structurally solid.
- Flagged vendor/self-reported: Anthropic caching framing (F4, F10), Faros $/dev (F7), all "60–90%" / "15x cheaper" / "save 80%" SEO figures (omitted as evidence).
- [UNVERIFIED STAT]: the 10B-token/$15k-vs-$800 anecdote (F9), Faros round-number $/dev provenance (F7).
