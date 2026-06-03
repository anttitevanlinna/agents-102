---
type: run-log
domain: coding
evidence_level: L3
platforms: [coding-agents]
nordic: false
updated: 2026-06-03
cycle: token-drivers-sweep1
---

> **⟳ SWEEP 2 CORRECTIONS (2026-06-03-1700, applied) — read before trusting claims below.**
> Confirm file: `2026-06-03-1700-token-drivers-sweep2-context-tax.md`.
> - **CONFIRMED L3** for existence + mechanism, but real distinct-practitioner count is **~6–7 (the floor of L3, NOT 10–20).** Don't cite as a tight 10–20 cluster.
> - **Author misattribution:** issue **#44703 author is @wishacloud**, not @spilist (@spilist = #22699). Fix before quoting.
> - The **80% / 98% savings percentages are noisy/inflated** (run-to-run variance per Semble's HN testers) — illustrative only, not verified stats. Driver itself unrefuted.
> - **Anthropic's own engineering posts are labelled [practitioner direct] in the body, but their efficacy CLAIMS are vendor self-interest (L0)** — trust them for "this is how the harness works," not for "and it saves X." Nesler's 60-80%/70-95% figures are tool-author (CartoGopher) self-estimates with a conflict of interest — illustrative, not measured.

# Token Drivers Sweep 1 — Driver #2: Fat tool outputs / verbose returns

## Focus

Hypothesis: tools that dump large outputs into context — reading whole files instead of ranges, unfiltered grep/ls of huge dirs, full test-suite or build logs, large command stdout, verbose stack traces, sub-agent conversation dumps — burn tokens once AND ride along in context on every subsequent turn (the per-turn re-processing tax). Looking for practitioners naming verbose tool output / large reads / log dumps as a token-context driver, or deliberately constraining tool output to save context. Counter-evidence sought: "big context windows make this moot."

## Queries Used

- Claude Code context bloat reading whole files tool output verbose tokens practitioner
- agent context window pollution large tool output grep logs token cost Simon Willison Armin Ronacher
- coding agent read file offset limit narrow grep save context tokens discipline
- Anthropic engineering effective context engineering agents tool results token-efficient compact tool output
- Geoffrey Huntley OR Peter Steinberger agent tool output context window large file read tokens grep dump
- why reading full files is fine for agents context not a problem counter-argument token cost overstated

## Findings

### 1. Anthropic Engineering — "Effective context engineering for AI agents" / "Writing tools for agents"
- **Source URL:** https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents and https://www.anthropic.com/engineering/writing-tools-for-agents
- **Label:** [practitioner direct] — platform engineering team writing on its own venue about the harness they build. NOTE: vendor-affiliated; treat the *prescriptions* as practitioner-direct engineering, the *claims of efficacy* as L0 self-interest. Used here as design-evidence, not outcome-evidence.
- **Date:** 2025 (refreshed; cited live 2026-06-03)
- **What:** Anthropic's own guidance explicitly names oversized tool returns as a context-pollution driver and prescribes pagination / range selection / filtering / truncation. Confirms Claude Code's harness caps a single tool response at **25,000 tokens by default**, and that sub-agents return a distilled **1,000–2,000 token** summary rather than their full exploration.
- **Evidence level:** L1 (design opinion from the harness vendor) — but high-signal because it documents an actual shipped guardrail.
- **Key claims (close paraphrase):** "find the smallest set of high-signal tokens that maximize the likelihood of your desired outcome"; tools "should be designed for token efficiency"; implement "pagination, range selection, filtering, and/or truncation with sensible default parameter values" for tool responses that "could use up lots of context"; default response cap "25,000 tokens" in Claude Code; sub-agents "return only a condensed, distilled summary... (often 1,000–2,000 tokens)."

### 2. Claude Code Issue #22699 — "Size-aware file reading" (practitioner feature request)
- **Source URL:** https://github.com/anthropics/claude-code/issues/22699
- **Label:** [practitioner direct] — user @spilist filing on the tool's own tracker from real usage.
- **Date:** 2026-02-03
- **What:** Names large file reads as silent context floods; the agent learns the file was too big only *after* tokens are spent. Proposes pre-flight size tiers (≤500 read; 500–2000 advise offset/limit; >2000 block + guide).
- **Evidence level:** L2 (single practitioner, concrete mechanism).
- **Key claims (exact):** "A single `Read` call on a large file (e.g., 5000+ lines) can consume a significant portion of the context window. The agent discovers the file is too large only _after_ the tokens are already spent." / "For a 300-line file, full read is fine. For a 3000-line file, `offset`/`limit` or `Grep` would be far more efficient." Also references #6780: "large file reads can corrupt sessions irreversibly." (Closed as not planned.)

### 3. Claude Code Issue #44703 — TaskOutput deprecation → sub-agent dump (practitioner bug report)
- **Source URL:** https://github.com/anthropics/claude-code/issues/44703
- **Label:** [practitioner direct] — user reporting real impact on Claude Code v2.1.92.
- **Date:** 2026-04-07
- **What:** Cleanest single data point for the "fat tool output rides along every turn" thesis. A deprecation note pushed agents to Read a task's `.output` file; for local-agent tasks that file is the full sub-agent conversation JSON (80K+ chars), not a summary. Result: autocompact thrashing.
- **Evidence level:** L2 (single case) — but it is a *measured* contrast, which is rare.
- **Key claims (exact):** "the .output file contains the full raw conversation history JSON of the sub-agent, which can be 80K+ characters." / measured contrast — "Agent tool return value : 4,087 chars (summarized result, appropriate)" vs ".output file via Read : 87,286 chars (full conversation history JSON, 21x larger)." / failure mode: "Autocompact is thrashing: the context refilled to the limit within 3 turns of the previous compact, 3 times in a row."

### 4. Jake Nesler — "Your AI Coding Agent Wastes 80% of Its Tokens Just Finding Things"
- **Source URL:** https://medium.com/@jakenesler/context-compression-to-reduce-llm-costs-and-frequency-of-hitting-limits-e11d43a26589
- **Label:** [practitioner direct] — own Medium, building CartoGopher; note tool-author self-interest on the savings numbers.
- **Date:** 2026-02-28
- **What:** Observed Claude Code reading 25 files to answer a question about three functions. Argues 60–80% of tokens go to *orientation* (finding where things are), much of it whole-file reads, not the answer.
- **Evidence level:** L2 (single practitioner + a partial SWE-bench measurement).
- **Key claims (exact):** "60 to 80% of the tokens consumed go toward figuring out where things are." / "That single question cost me about 12,000 tokens. The answer required maybe 800." / SWE-bench Verified w/ Opus 4.5 gave "roughly 20% average token savings" (he flags benchmark tasks "narrowly scoped"); comprehension-question savings "70 to 95%." [The 60–80% and 40–95% figures are tool-author estimates, not independently methodologized — treat as illustrative, not a verified stat.]

### 5. Show HN: Semble — "code search for agents that uses 98% fewer tokens than grep"
- **Source URL:** https://news.ycombinator.com/item?id=48169874
- **Label:** submitter "bibabomas" = [practitioner direct] but tool-author self-interest; commenters "freakynit" and "aadishv" = [practitioner analysis] (independent testers).
- **Date:** 2026 (HN thread; cited live 2026-06-03)
- **What:** The mechanism named precisely: the cost isn't grep's own output, it's the **grep→read-whole-file loop** that follows. Independent testers report real but variable savings.
- **Evidence level:** L2 submitter claim + L3-flavored corroboration from two independent testers.
- **Key claims (exact):** submitter — "when the agent can't find something directly, it falls back to grep, reading full files or launching subagents. This uses a lot of tokens"; "The 98% is vs the grep+read loop, not grep output alone... agents typically do 'cat file' or reads the whole thing first." Independent tester freakynit reported run-to-run variance (95k/2.9k → 37k/4.0k tokens); aadishv ran controlled rg+fd vs Semble comparisons confirming context-efficiency gains with a speed tradeoff. **This is corroborating counter-balance: the savings are real but noisy, not a clean 98%.**

### 6. Supporting convergence (analysis-tier, names the mechanism)
- **Source URL:** https://arize.com/blog/context-management-in-agent-harnesses/ — [practitioner analysis], 2026. "limit how much of a file or tool result can be read at once," "truncating oversized outputs," "over-retrieved context... wasting tokens and degrading attention. Fix by offloading bulk content to files and returning compact references."
- **Source URL:** https://www.morphllm.com/context-engineering — [vendor/practitioner analysis, treat as L1]. Frame: "Why More Tokens Makes Agents Worse" — supports the per-turn-drag thesis qualitatively.
- **Source URL:** https://www.anthropic.com/.../writing-tools-for-agents docs confirm the 256KB byte cap + 25K-token post-read budget on Read (two-layer defense).

## What I Looked For But Did Not Find

- **Armin Ronacher does NOT name fat tool output as a token driver.** His "Agent Design Is Still Hard" (2025-11-21, lucumr.pocoo.org) and "A Language For Agents" (2026-02-09) were the most-promising practitioner-direct candidates; both discuss greppability and tool design but neither argues verbose tool output / whole-file reads as a context-bloat cause. Recorded as a verified miss, not evidence.
- **Simon Willison** — no direct post found tying tool-output verbosity to token/context bloat within the freshness window (his sub-agents tag exists but the search surfaced no on-point quote). Not used.
- **Geoffrey Huntley / Peter Steinberger / Thorsten Ball / Boris Cherny** — no on-point practitioner-direct quote found this sweep. Steinberger's "MCP was a mistake, Bash is better" is adjacent (favoring lean CLI returns) but not a direct statement on output size.
- **Strong counter-evidence ("just read everything, context is big now") was essentially absent at practitioner tier.** The only counter-argument surfaced ("Gemini 2M / Claude 200K, throw it all in") appears only to be rebutted, and on cost+attention-degradation grounds — which actually *reinforces* the per-turn-drag hypothesis rather than undercutting it. Genuine dissent I found is narrower: that the *magnitude* of vendor/tool-author savings claims (98%, 80%) is inflated/noisy (Semble independent testers), not that the driver is unreal.

## Orientation

This is a **real, practitioner-named token/context driver** — arguably the best-attested of the sweep. Convergence spans an independent feature request (#22699), an independent measured bug report (#44703, 21x contrast), two independent tool-builders observing the same waste pattern (Nesler, Semble) plus two independent HN testers corroborating, and the harness vendor's own guardrail documentation (25K cap, sub-agent summary discipline). The mechanism is consistent across all sources: the cost is not the one-time dump but the **grep/ls → read-whole-file loop and sub-agent/log dumps that then ride along in context every subsequent turn**. Fixes named by practitioners are exactly the hypothesized ones: offset/limit reads, narrow greps, pre-flight size checks, truncation/pagination defaults, offloading bulk to files + returning compact references, sub-agent summarization. Caveat for reporting: the *savings percentages* (80%, 98%) are tool-author marketing-adjacent and should be cited as illustrative, not verified stats; the *existence and mechanism* of the driver clear L3. Cross-link to Sweep driver on sub-agent context isolation (#44703 sits on the boundary).
