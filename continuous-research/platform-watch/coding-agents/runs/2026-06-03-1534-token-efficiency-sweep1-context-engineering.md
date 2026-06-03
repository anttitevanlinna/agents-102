---
type: run-log
domain: coding
evidence_level: L3
platforms: [anthropic, coding-agents]
nordic: false
updated: 2026-06-03
cycle: token-eff-s1
---

# Token / context efficiency — Sweep 1: Anthropic guidance + the "context engineering" discipline

Lens: Anthropic's own engineering guidance + the origin and meaning of "context engineering" as a named discipline. Sibling-disjoint from practitioner-convergence and cross-platform sweeps.

## Findings

### F1 — Anthropic coins its operational definition of "context engineering" (the named-discipline anchor)
- **Who:** Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, Jeremy Hadfield (Anthropic) — bylined authors.
- **URL:** https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- **Source type:** [practitioner direct, vendor venue] — Anthropic engineering blog. Structural/operational claims = evidence; treat any self-reported metric as vendor-self-reported.
- **Date:** 2025-09-29 (historical context, >6mo — the *definition* is durable; cite as origin, not fresh).
- **What:** Anthropic frames context engineering as the successor discipline to prompt engineering for multi-turn agents. The piece introduces "attention budget," "context rot," and a hierarchy of long-horizon techniques (compaction, structured note-taking, sub-agent architectures, just-in-time retrieval).
- **Evidence level:** L1 framing / L2 for the mechanism descriptions (single vendor venue). The definition is widely adopted → use as the canonical *definition*, not as proof of effect.
- **Verbatim claims:**
  - Context engineering = "the set of strategies for curating and maintaining the optimal set of tokens (information) during LLM inference, including all the other information that may land there outside of the prompts."
  - Prompt engineering = "methods for writing and organizing LLM instructions for optimal outcomes."
  - "Context refers to the set of tokens included when sampling from a large-language model (LLM)."
  - Context rot: "as the number of tokens in the context window increases, the model's ability to accurately recall information from that context decreases."
  - Attention budget: "Every new token introduced depletes this budget by some amount, increasing the need to carefully curate the tokens available to the LLM."
  - Core principle: "good context engineering means finding the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome."
  - Just-in-time retrieval: agents "maintain lightweight identifiers and dynamically load data at runtime using tools, rather than pre-processing all relevant data upfront."
- **Numbers:** None self-reported here; the value is the framework + vocabulary.

### F2 — Origin of the term "context engineering" (Karpathy + Lütke, June 2025)
- **Who:** Andrej Karpathy (popularized + most-cited definition); Tobi Lütke / Shopify CEO (earliest framing). Curated by Simon Willison.
- **URLs:**
  - Karpathy: https://x.com/karpathy/status/1937902205765607626 [practitioner direct]
  - Willison's writeup: https://simonwillison.net/2025/jun/27/context-engineering/ [practitioner direct]
- **Source type:** [practitioner direct] for both.
- **Date:** Karpathy tweet 2025-06-25; Willison 2025-06-27 (historical — term-origin context, explicitly dated, NOT fresh evidence).
- **What:** Karpathy endorsed "context engineering" over "prompt engineering" and gave the most-cited definition. Lütke framed it earlier as providing "all the context for the task to be plausibly solvable." Willison predicted the term would stick because its *inferred* meaning matches the real work, where "prompt engineering" got hijacked by casual-chatbot connotations.
- **Evidence level:** L1 (opinion/coinage) — use only to attribute the term's origin, never as evidence of efficacy.
- **Verbatim claims:**
  - Karpathy: "+1 for 'context engineering' over 'prompt engineering'. People associate prompts with short task descriptions you'd give an LLM in your day-to-day use. When in every industrial-strength LLM app, context engineering is the delicate art and science of filling the context window with just the right information for the next step."
  - Lütke (via Willison): "the art of providing all the context for the task to be plausibly solvable by the LLM."
  - Willison: "I like it. I think this one may have sticking power." / "inferred definitions are the ones that stick."

### F3 — Claude Cookbook: MEASURED context-mechanism savings (the strongest single-source numbers)
- **Who:** Anthropic, Claude Cookbook (context-engineering tools recipe).
- **URL:** https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools
- **Source type:** [practitioner direct, vendor venue]. Numbers are from a vendor's own reproducible notebook on a fixed ~329K-token corpus → label vendor-self-reported, single-case (L2), but reproducible.
- **Date:** mechanism IDs dated `compact_20260112`, `clear_tool_uses_20250919`, `memory_20250818` → API features current as of 2026; treat as fresh.
- **What:** A runnable benchmark comparing three mechanisms against a baseline on the same corpus. This is the most concrete numeric anchor in the whole sweep.
- **Evidence level:** L2 (single reproducible case, vendor venue).
- **Verbatim / numbers (all vendor-self-reported, single-corpus):**
  - **Corpus baseline:** total ~328,955 tokens; 8 documents ~41,000 tokens each. Baseline run peak = **335,279 tokens**. On a 200K-window model, baseline hard-stops at turn 3 after 168,242 tokens.
  - **Compaction** (`compact_20260112`): peak 335,279 → **169,164 tokens (~50% peak reduction)**. Trigger min 50K; example trigger 180,000 input tokens. A compaction event = "~2,783-token summary replaces prior turns." Quality probe: "high-level 3/3 preserved" (lifespans, organism IDs) but "obscure 0/3 preserved" (appendix-table specifics) — i.e. compaction trades fine-grained recall for budget.
  - **Tool-result clearing** (`clear_tool_uses_20250919`): peak 335,279 → **173,137 tokens (~48% reduction)**, with **zero inference cost** (mechanical edit; replaces old `tool_result` with "[cleared to save context]" while keeping the `tool_use` record). Demo: message-list "~128,740 → ~43,060 tokens (67% reduction)" clearing 2 of 3 file reads. Config knobs: `keep` (e.g. 4 tool uses), `clear_at_least` (e.g. 10,000 tokens).
  - **Memory tool** (`memory_20250818`): a ~2,999-token curated note file lets Session 2 reconstruct knowledge "without re-reading all 320K tokens of source documents" — cross-session persistence, six commands (view/create/str_replace/insert/delete/rename).
  - **Relative read:** clearing ≈ compaction on peak reduction but clearing is free (no summarization inference); compaction better for accumulated dialogue; memory for multi-session.

### F4 — Claude Code docs: concrete cost-reduction playbook + cost baselines
- **Who:** Anthropic, Claude Code documentation ("Manage costs effectively").
- **URL:** https://code.claude.com/docs/en/costs
- **Source type:** [practitioner direct, vendor venue] — product docs. Operational facts = evidence; the spend figures = vendor-self-reported aggregate.
- **Date:** live as of 2026-06-03 (fresh).
- **What:** Anthropic's own list of token-reduction levers for Claude Code, plus enterprise cost baselines.
- **Evidence level:** L1/L2 — operational guidance, vendor-aggregated cost stats.
- **Numbers (vendor-self-reported):**
  - Enterprise avg **~$13 per developer per active day**; **$150–250 per developer per month**; "below $30 per active day for 90% of users." [aggregate, methodology/sample not disclosed → flag if quoted to a customer]
  - **Agent teams use ~7x more tokens** than standard sessions when teammates run in plan mode (each teammate = own context window). [UNVERIFIED multiplier — round-ish; no methodology given]
  - Background idle token usage "typically under $0.04 per session."
  - Extended thinking budget can be "tens of thousands of tokens per request"; `MAX_THINKING_TOKENS=8000` to cap.
  - Recommends keeping CLAUDE.md "under 200 lines" (loaded every session start).
- **Verbatim levers (the curriculum-usable list):**
  - "Token costs scale with context size."
  - `/clear` "to start fresh when switching to unrelated work. Stale context wastes tokens on every subsequent message."
  - Prompt caching "reduces costs for repeated content like system prompts"; auto-compaction "summarizes conversation history when approaching context limits."
  - MCP tool definitions are "deferred by default, so only tool names enter context until Claude uses a specific tool." "Prefer CLI tools when available" (gh, aws, gcloud) — "more context-efficient than MCP servers because they don't add any per-tool listing."
  - Hooks can preprocess: "Instead of Claude reading a 10,000-line log file to find errors, a hook can grep for ERROR and return only matching lines, reducing context from tens of thousands of tokens to hundreds."
  - "Move instructions from CLAUDE.md to skills" — CLAUDE.md is loaded at start; skills load on-demand.
  - "Delegate verbose operations to subagents so the verbose output stays in the subagent's context while only a summary returns to your main conversation." (= subagent context isolation.)
  - `/context` to see what's consuming space; model selection (Sonnet default, Opus reserved, `model: haiku` for simple subagents).

### F5 — Anthropic's later primitives: context editing + memory tool as platform features (Sept 2025 → 2026 GA)
- **Who:** Anthropic (referenced across the cookbook + docs above; also F1).
- **URL:** https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents (+ cookbook F3).
- **Source type:** [practitioner direct, vendor venue].
- **What:** Anthropic shipped context engineering from blog framing into API primitives — `context editing` (tool-result clearing) and a server-side `memory tool`. Confirms the discipline is now productized, not just advice. Simon-Willison-adjacent search corroborated a server-side Memory tool (public beta) and async consolidation ("Dreaming") around April–May 2026, but those are second-hand summaries — flagged below as not-primary-confirmed.
- **Evidence level:** L1 (existence of features confirmed by vendor docs F3/F4).

### F6 — Counter-evidence: the skeptic case ("context engineering is overhyped / rebrand")
- **URLs (context only, NOT cited as evidence):**
  - https://blog.innogames.com/why-context-engineering-is-overhyped-and-how-automation-fixes-it/ [practitioner blog / opinion]
  - https://community.openai.com/t/prompt-engineering-is-dead-and-context-engineering-is-already-obsolete-... [forum opinion]
- **Source type:** [practitioner analysis]/[L1 opinion].
- **What:** The honest counter-frame: hand-curating context is "a productivity sink that breaks coding flow" and "scales poorly for complex codebases"; the real gains are in *automated systems around the AI* (hooks, retrieval pipelines) rather than cleverer manual context. Note this does NOT contradict Anthropic — it actually *agrees* with F4's hook/skill/subagent automation levers. The disagreement is about manual vs. systematized context curation, not about whether context is the bottleneck.
- **Evidence level:** L1. Use as the tension/nuance, not a claim.

## Cross-cutting reportable pattern (L3 candidate)
Convergence across Anthropic blog + cookbook + Claude Code docs + Karpathy/Willison/Lütke: **the bottleneck has moved from prompt wording to context curation, and the winning moves are subtractive** — clear/compact, isolate verbose work in subagents, defer tool definitions, push CLAUDE.md weight into on-demand skills, preprocess with hooks. "Smallest possible set of high-signal tokens" is the unifying principle. This is L3-eligible once joined with the sibling sweeps' independent (non-Anthropic) practitioners; on its own this lens is Anthropic-heavy (L1/L2).

## What I looked for but did NOT find
- **Simon Willison fresh (post-2025-12) prompt-caching posts.** His prompt-caching tag page surfaced only 2025 entries (Gemini implicit caching 75% discount, May 2025; Anthropic auto-cache-point simplification, Jan 2025). No in-window (last-6-mo) Willison primary on caching numbers. The "context engineering" coinage is June 2025 = historical.
- **Independent (non-vendor) reproduction of the cookbook's ~50% / ~48% mechanism savings.** All concrete numbers trace to Anthropic's own notebook on one synthetic corpus. No third-party benchmark of compaction/clearing peak-reduction found in window.
- **Methodology behind the "$13/dev/day" and "7x agent-team token" figures.** Vendor-aggregate, no sample size or measurement window disclosed → both flagged UNVERIFIED for any customer-facing use.
- **Primary Anthropic confirmation of "Dreaming" / async memory consolidation.** Only second-hand search summaries (April–May 2026 dating). No primary blog URL captured this run — needs a dedicated fetch before any claim.
- **A precise published auto-compaction trigger threshold for Claude Code** (the % of context window at which it fires). Docs say "when approaching context limits" without a number; cookbook gives API-level triggers (min 50K) but those are the SDK feature, not the CLI's auto-compaction default.
- **Hard recall/quality-loss numbers from compaction beyond the cookbook's tiny "3/3 vs 0/3" probe** — no statistically-meaningful study of compaction-induced quality loss in window.
