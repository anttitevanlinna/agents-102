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
> Confirm file: `2026-06-03-1700-token-drivers-sweep2-repay-multiply.md`.
> - **Cache-loss: "10+ independent practitioners" is OVERSTATED → ~4–5 direct** (Ronacher + CC issues #27048/#42338/#51218 + cache-fix repo). Mechanism CONFIRMED L3; convergence count is not.
> - **"20x on resume" re-cite:** the cache-fix repo headline is unbacked (no methodology). Re-anchor to **issue #27048's measured figures** (cache hit 99%→17%, 91K re-write) + #42338 (9x cache_creation:output). The ~20x phenomenon survives; the repo's number does not.
> - **Cache-loss is a PATCHED, version-dependent regression** (root-caused, fixed v2.1.69), **not a permanent tax.**
> - **Fan-out 15x:** held VERBATIM at Anthropic primary, BUT that post is **2025-06-13 (~12 mo) = DATED CONTEXT, not fresh evidence**; it's essentially **single-source**; the **"×10x → 150x compounding" is NOT at the primary → [UNVERIFIED].** Anthropic itself says **fan-out is wrong for most coding tasks** → treat 15x as conditional, not default.
> - **Post-review (2026-06-03) source-type fixes (these win over body text below):** add labels — `claudecodecamp.com` images-3x = [domain trade publication] (verify byline); `codeant.ai` output-token = [domain how-to] (verify not vendor); split the ByteByteGo/Anthropic combined cite (Anthropic primary [practitioner direct], ByteByteGo digest [practitioner analysis]); `vantage.sh` and `morphllm.com` are vendor sites = [vendor case study], not [practitioner analysis]. These are honorable-mention drivers (images/3x, output-token, vision/45x), NOT promoted to the supplement's top-6 — label hygiene only.
> - **Where any body figure below conflicts with this header, the header wins** (cache "10+" reads ~4-5; the 150x line is [UNVERIFIED — not at primary]).

# Token / Context / Cost Drivers — Sweep 1, Driver #5 (Open Discovery)

## Focus

Hunt for what practitioners ACTUALLY name as the biggest drivers of excessive token / context / cost consumption in agentic coding, OTHER than raw conversation/context length. Job: ensure the top-6 list isn't missing a driver the four hypothesized agents (codebase hygiene, tool-output bloat, MCP/tool-surface bloat, no-memory/rework) would miss. Capture verbatim, with byline check and evidence level.

## Queries Used

1. coding agent token cost driver output tokens verbose model expensive autonomous run practitioner
2. prompt caching cache invalidation Claude Code cost edits busts cache practitioner
3. multi-agent parallel subagent fan-out token cost 15x Anthropic practitioner expensive
4. wrong model tier Opus vs Sonnet overkill cost agentic coding practitioner
5. Armin Ronacher agents token context tool output cost coding agent burn
6. Geoffrey Huntley ralph wiggum agent loop token cost expensive autonomous
7. Simon Willison long context tool result MCP token cost agent expensive
8. agent retry loop error spiral wasted tokens cost test failing re-run practitioner
9. Peter Steinberger agent token cost context window expensive parallel claude code
10. screenshots images in agent context token cost vision tokens expensive coding agent

## Findings

### DRIVER A — Cache invalidation / cache-loss (prompt-cache misses)
**The strongest non-obvious, practitioner-direct driver. Would be MISSED by all four hypothesized agents.**

- **Armin Ronacher**, *Agent Psychosis* (lucumr.pocoo.org), 2026-01-18. [practitioner direct] (own blog). https://lucumr.pocoo.org/2026/1/18/agent-psychosis/
  - Verbatim: hands-off approaches mean "spinning up agents and letting them run wild—burn through tokens at staggering rates."
  - On Ralph specifically: "you restart the loop from scratch each time, which means you lose the ability to use cached tokens or reuse context."
  - Counterexample of efficiency: "the entire port of MiniJinja to Go took only 2.2 million tokens" with "a well-prepared session with good tooling and context."
  - "current token pricing is almost certainly subsidized. These patterns may not be economically viable for long."
  - Evidence level: **L2→L3** (single named practitioner-direct experiment + mechanism; converges with the caching docs/practitioner guides below).
- Mechanism corroboration (cache mechanics): claudecodecamp.com, mindstudio.ai, knightli.com, primeline.cc — [practitioner analysis] / [domain how-to]. Cache hits cost ~10% of full input price; "Change one character early in the prompt and the entire cache after that point is invalidated." Adding an MCP tool, a timestamp in system prompt, switching models mid-session, or editing CLAUDE.md mid-session each invalidate the cache and can "5x your costs for that turn." 5-minute TTL: idle >5 min rebuilds the prefix from scratch. https://www.claudecodecamp.com/p/how-prompt-caching-actually-works-in-claude-code ; https://knightli.com/en/2026/05/18/claude-code-prompt-cache-token-optimization/
- GitHub corroboration of a real regression: anthropics/claude-code issue #27048 — cache invalidation on session resume; cnighswonger/claude-code-cache-fix claims "up to 20x cost increase on resumed sessions." [practitioner direct] (issue/repo). https://github.com/anthropics/claude-code/issues/27048 ; https://github.com/cnighswonger/claude-code-cache-fix
  - Evidence level for cache-loss overall: **L3** (10+ independent practitioners + a named flagship case + a tracked product bug).

### DRIVER B — Verbose / high output tokens + reasoning-effort tier (output ~4–8x input)
**Partially overlaps tool-output bloat but is distinct: it is the MODEL's own output, not tool results. Would be MISSED.**

- Vantage, Casey Harding, *The Hidden Cost Driver in Agentic Coding*, 2026-04-15. [practitioner analysis] (vendor-adjacent cost-tooling blog; treat cost mechanics as analysis, not the headline number as gospel). https://www.vantage.sh/blog/agentic-coding-costs
  - Verbatim: input tokens "dominate the expense—approximately 85% of total session cost"; ~25:1 input-to-output ratio by turn 50; ~35,000 input tokens/turn by turn 50. (NOTE: this argues input DOMINATES — counter-evidence to an output-tokens-are-the-driver framing; logged in both columns.)
- codeant.ai, *Why Output & Reasoning Tokens Inflate LLM Costs*: output priced 4–8x input; reasoning/effort tokens compound. [domain how-to]. https://www.codeant.ai/blogs/input-vs-output-vs-reasoning-tokens-cost
- Reasoning-effort lever: "Max effort can use up to 10x more tokens than low effort for the same prompt." [domain how-to, search-surfaced — round-ish multiplier, treat as directional]. 
  - Evidence level: **L2** for "verbose output is a top driver" (contested by Vantage's input-dominance claim); **L3** for "reasoning-effort tier is a real lever you control."

### DRIVER C — Multi-agent / parallel fan-out (15x, compounds to 150x+)
**Adjacent to "long autonomous runs" but distinct: it is parallel multiplication, not session length. Partially in scope of none of the four cleanly — flag as a near-miss.**

- Anthropic engineering (How we built our multi-agent research system), amplified widely; "Multi-agent systems use ~15x more tokens than chat." [practitioner direct] for the 15x (Anthropic's own venue) / [practitioner analysis] for the digests (bytebytego, theaiengineer, codingscape/X). https://blog.bytebytego.com/p/how-anthropic-built-a-multi-agent ; https://x.com/codingscape/status/1937503477971697684
  - Compounding: "a subagent that recursively spawns more subagents, or a tool that returns oversized results, can multiply a single query's cost by another 10x or more." → 15x baseline × 10x misbehavior.
  - Evidence level: **L3** (Anthropic-direct figure + many independent practitioner restatements).

### DRIVER D — Long fully-autonomous runs / "let it run wild" (Ralph, OpenClaw)
**This is the closest to a known driver but the COST framing — and the Fast-Mode pricing-tier lever — is worth surfacing.**

- Geoffrey Huntley, Ralph Wiggum technique. [practitioner direct] (ghuntley.com / repo). Sonnet 4.5 on a bash loop ≈ "$10.42 USD an hour"; one $50,000 contract delivered for "$297 in API costs." https://github.com/ghuntley/how-to-ralph-wiggum
  - NOTE: Ralph is cited as BOTH cheap-per-task (Huntley) AND wasteful (Ronacher, via cache loss). The reconciliation: cheap because Sonnet-tier + outcome value high; wasteful because cache-cold restarts. This is the cache-loss driver (A) wearing a different hat.
- Peter Steinberger / OpenClaw: $1,305,088.81 OpenAI bill in one month — 603B tokens, 7.6M requests, 100 agents continuous. [tech press]/[general press] for the number (tomshardware, thenextweb, the-decoder) — bare fact only. https://www.tomshardware.com/tech-industry/artificial-intelligence/openclaw-creator-burns-through-1-3-million-in-openai-api-tokens-in-a-single-month
  - **Pricing-TIER driver surfaced here:** Steinberger said the $1.3M reflects Codex "Fast Mode" pricing; turning Fast Mode off drops raw cost to ~$300,000 (≈4.3x). I.e., the SPEED/PRIORITY tier you pick is itself a top cost multiplier, independent of tokens. [practitioner direct] (his own clarification). 
  - Also from OpenClaw coverage: a "condensation layer" was added "because raw search results were burning through the context window, compressing hundreds of thousands of characters of raw output to a few thousand" — corroborates tool-output bloat (one of the four hypothesized).
  - Evidence level: **L2** for the autonomy-cost link (flagship anecdotes, not convergence); **L2** for Fast-Mode-tier lever (single named source, but specific and credible).

### DRIVER E — Retry / error loops (multiplicative)
**Would be partially caught by "no-memory/rework" but the runaway-loop framing is distinct (same failed tool call, not lack of memory).**

- TianPan.co, *Retry Budgets for LLM Agents*, 2026-04-16: "20% per-step failure doubles your token bill"; multiplicative chains "3^5 = 243 backend calls in the worst case." [practitioner analysis]. https://tianpan.co/blog/2026-04-16-retry-budget-llm-agent-cost-amplification
- anthropics/claude-code July-2025 issue: a single session consumed "1.67 billion tokens in five hours," est. $16k–$50k. [practitioner direct] (issue tracker). 
- "An API format change once caused 200x the baseline token rate ... costing approximately $50 over 40 minutes." [practitioner analysis, search-surfaced]. 
  - Evidence level: **L2→L3** (multiple independent practitioners + a tracked flagship incident; some figures are round/anecdotal).

### DRIVER F — MCP / tool-surface bloat (one of the four hypothesized — CONFIRMED, not a miss)
- Simon Willison, *too many MCP servers...*, 2025-08-22. [practitioner direct] (own blog). Amplifies Huntley: GitHub MCP "defines 93 additional tools and swallows another 55,000" tokens; CLI tools instead cost "close to zero." Later softened: MCP Tool Search makes him say "there's no reason not to connect dozens or hundreds of MCPs." https://simonwillison.net/2025/Aug/22/too-many-mcps/
  - Evidence level: **L3**. (In scope of hypothesized agent; logged for completeness + the Tool-Search counter-update.)

### DRIVER G — Images / screenshots in context (vision tokens)
**Genuinely novel — would be MISSED by all four. Niche but real for GUI/browser/Playwright agents.**

- "Text tokens cost 10–50x less than vision tokens"; a 1000×1000 image ≈ 1,334 tokens on Sonnet 4.6. claudecodecamp.com: high-res images on Opus 4.7/4.8 use "~3x more image tokens than previous models." [domain how-to]. https://www.claudecodecamp.com/p/images-cost-3x-more-tokens-in-claude-opus-4-7
- The Register, 2026-05-07: "AI vision agents use 45x more tokens than APIs in benchmark"; one vision agent ≈ 500,000 input + 38,000 output tokens for one task. [tech press] — bare fact. https://www.theregister.com/ai-and-ml/2026/05/07/ai-vision-agents-use-45x-more-tokens-than-apis-in-benchmark/
  - Evidence level: **L2** (benchmark + how-tos; few NAMED coding practitioners flag it, so it is real but lower-conviction for general agentic coding vs GUI agents specifically).

## What I Looked For But Did Not Find

- A NAMED coding practitioner (Willison/Ronacher/Ball/Cherny tier) putting **verbose model output** at the TOP of their cost list — most practitioner-direct sources put INPUT accumulation / cache loss first (Vantage explicitly: input ≈ 85% of cost). Output-token-as-top-driver is a how-to-blog framing, not a practitioner-convergence claim. Logged B as contested.
- Strong practitioner convergence on **redundant re-planning** as a named distinct driver — it appears only folded into retry-loops (E). No clean independent signal.
- Nordic-specific practitioner signal — none surfaced; nordic: false.
- Did not deep-verify the round multipliers (10x effort, 20x resume, 45x vision, 200x format-change). Flagged inline as directional / [search-surfaced]; trace before any of these enters a synthesis claim. No bare round-number rate was promoted to a headline finding.

## Orientation

Top non-obvious drivers, ranked by practitioner-conviction:
1. **Cache invalidation / cache-loss (A)** — strongest, practitioner-direct (Ronacher), MISSED by all four hypothesized agents. The "Ralph is cheap vs wasteful" tension resolves to this. *This is the gap-filler this sweep exists to find.*
2. **Multi-agent / parallel fan-out (C)** — Anthropic-direct 15x, compounds. Near-miss for the four (not cleanly any of them).
3. **Reasoning-effort tier + speed/priority pricing tier (B + Steinberger's Fast-Mode)** — controllable lever, MISSED. The "Fast Mode = 4.3x" point is a sleeper: cost driver that is NOT tokens at all, it is the SKU.
4. **Retry / error loops (E)** — partially overlaps no-memory/rework but distinct (runaway, not amnesia).
5. **Images/screenshots in context (G)** — genuinely novel, MISSED, but niche to GUI/browser agents.

Confirmed-in-scope (not gaps): MCP/tool-surface bloat (F), tool-output bloat (Steinberger condensation layer corroborates the hypothesized agent).

Counter-evidence noted: Vantage says INPUT accumulation dominates (~85%), arguing against output-tokens-as-top-driver; Willison later reversed his anti-MCP stance after MCP Tool Search. Both logged so the synthesis doesn't overstate B or F.
