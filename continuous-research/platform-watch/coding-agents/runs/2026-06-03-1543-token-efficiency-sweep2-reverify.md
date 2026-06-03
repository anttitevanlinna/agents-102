---
type: run-log
domain: coding
evidence_level: mixed
platforms: [anthropic, coding-agents]
nordic: false
updated: 2026-06-03
cycle: token-eff-s2
---

# OODA Sweep 2 — Token/Context Efficiency Re-verification

Mandate: turn Sweep 1's fragile/secondary-sourced LOAD-BEARING claims into primary, or flag clearly. Six claims re-opened at the primary source. Trust-but-verify.

---

## Claim 1 — Boris Cherny: Claude Code dropped vector-RAG for grep/glob agentic search

**VERDICT: confirmed-primary** (upgraded from secondary-only).

Primary source located and opened: Gergely Orosz's own write-up of the interview.

- **Exact wording (Orosz, summarizing/quoting Cherny):** "Claude Code's 'agentic search' is really just glob and grep, and it outperformed RAG." Team tried "local vector databases, recursive model-based indexing, and other ... approaches"; all had downsides (stale indexes, permission complexity). "Plain glob and grep, driven by the model, beat everything." Origin anecdote: Cherny observed Instagram engineers search code by hand when Meta's in-house editor's click-to-definition broke.
- **URL:** https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny
- **Source type:** [domain trade publication] — Gergely Orosz byline (specialist), interview of Cherny (the builder). NOT [practitioner direct] — the framing/prose is Orosz's. Attribute as "Orosz on Cherny, *Building Claude Code with Boris Cherny*." The phrasings above are largely Orosz's paraphrase; the only near-verbatim Cherny line widely circulated is the glob/grep > RAG claim.
- **Date:** 2026-03-04. Fresh (<6mo).
- **Note:** the original x.com/bcherny post still 402s and was NOT needed — the Pragmatic Engineer interview is the stronger primary anyway. Sweep 1's secondary captures (Vadim's blog, rust-trends, SmartScope, zerofilter Medium) are now demotable to "corroborating, not load-bearing." LOAD-BEARING claim now rests on a named-byline specialist interview of the builder. Good.

---

## Claim 2 — Auto-compaction trigger threshold (~83.5% / 33K-token buffer) for Claude Code CLI

**VERDICT: corrected → no official numeric threshold disclosed. The 83.5%/33K number is UNVERIFIED and NOT in Anthropic docs.**

- Checked code.claude.com/docs/en/costs. Verbatim, the ONLY disclosure: "auto-compaction, which summarizes conversation history **when approaching context limits**." No percentage. No token buffer. No "83.5%", no "33K".
- **URL:** https://code.claude.com/docs/en/costs
- **Source type:** [vendor docs] (L0 for claims, but authoritative for "what the vendor states"). Date: current (June 2026 live).
- **Ruling:** Do NOT cite a numeric Claude Code auto-compact threshold as vendor-confirmed. If a number is needed, the only sourced figure is the COMMUNITY-reverse-engineered "~95%" from the badlogic gist (Claim 5) — which the gist itself flags as community-sourced, not Anthropic-official. The 83.5%/33K figure from Sweep 1 has no traceable origin; treat as [UNVERIFIED STAT] and drop unless a primary surfaces.

---

## Claim 3 — SWE-Pruner (arXiv 2601.16746): "23–54% token reduction while improving success rate"

**VERDICT: confirmed-primary, with scope caveats.**

- **Title:** "SWE-Pruner: Self-Adaptive Context Pruning for Coding Agents."
- **Authors:** Yuhang Wang, Yuling Shi, Mo Yang, Rongrui Zhang, Shilin He, Heng Lian, Yuting Chen, Siyu Ye, Kai Cai, Xiaodong Gu.
- **Date:** submitted 2026-01-23, v4 revised 2026-05-07. Fresh.
- **URL:** https://arxiv.org/abs/2601.16746
- **What is pruned:** long interaction context, via a lightweight 0.6B-param "neural skimmer" that removes code *lines* selectively per task goal. (Line-level pruning, not message/turn-level.)
- **Exact claim (abstract):** "achieving 23–54% token reduction on agent tasks like SWE-Bench Verified while even improving success rates, and up to 14.84x compression on single-turn tasks like LongCodeQA with minimal performance impact."
- **Benchmarks:** SWE-Bench Verified (multi-turn agent), LongCodeQA (single-turn). Two further benchmarks referenced but unnamed in the abstract.
- **Source type:** [academic/research]. L2→L3 borderline: single paper, authors' own framework → treat as single-experiment supporting evidence, NOT convergence.
- **Claimed vs demonstrated / GAPS:** abstract does not name the base coding-agent model(s); per-benchmark success-rate deltas not quantified in the abstract; no sample sizes pulled (abstract only). The "23–54%" is a RANGE across conditions, not a single headline number — cite as a range and attribute to SWE-Bench Verified specifically. The 14.84x figure is LongCodeQA (single-turn) and must not be conflated with the agentic 23–54%. Authors have a stake in their own method → independent replication absent.

---

## Claim 4 — "Not All Needles Are Found" (arXiv 2601.02023): model list + core result

**VERDICT: confirmed-primary.**

- **Title:** "Not All Needles Are Found: How Fact Distribution and Don't-Make-It-Up Prompts Shape Literal Extraction, Logical Inference, and Hallucination Risks in Long-Context LLMs."
- **Authors:** Amirali Ebrahimzadeh, Seyyed M. Salili.
- **Date:** submitted 2026-01-05. Fresh.
- **URL:** https://arxiv.org/abs/2601.02023
- **Models evaluated (the list Sweep 1 couldn't pull):** Gemini-2.5-flash, ChatGPT-5-mini, Claude-4.5-haiku, Deepseek-v3.2-chat. (Note: all small/fast tier models — generalization to frontier models is NOT established by this paper.)
- **Core result:** "longer contexts alone do not guarantee better performance and can be detrimental when relevant evidence is diluted or widely dispersed"; some models show "severe degradation under realistic conditions"; anti-hallucination ("don't make it up") prompts can make models "overly conservative, sharply reducing accuracy in literal extraction and logical inference."
- **Source type:** [academic/research]. L2 single-study. Useful as: context-rot / "more tokens ≠ better" support, AND a caution that naive anti-hallucination prompting has an accuracy cost.
- **GAP:** abstract-level only; no single clean headline percentage was published in the abstract — the finding is qualitative-with-per-model-variance. Do not invent a round number for it.

---

## Claim 5 — badlogic / Mario Zechner gist: cross-tool compaction thresholds

**VERDICT: confirmed-primary.**

- **Gist exists, is his, title:** "Context Compaction Research: Claude Code, Codex CLI, OpenCode, Amp."
- **URL:** https://gist.github.com/badlogic/cd2ef65b0697c4dbe2d13fbecb0a0a5f
- **Author:** badlogic = Mario Zechner (confirmed; pi-coding-agent author, mariozechner.at).
- **Date:** 2026-12-02 → correction: **2025-12-02** (Sweep 1's date was correct). The widely-cited Daniel Vaughan / Justin3go / wasnotwas blog posts (April 2026) are SECONDARY write-ups of this gist — do not cite them as independent corroboration.
- **Exact thresholds (verbatim):**
  - Claude Code: "Auto: Triggers at ~95% context capacity" — gist explicitly notes this is **community-sourced, not official Anthropic docs**.
  - Codex CLI: "Default thresholds vary by model (e.g., 180k for some models, 244k for others)"; uses `model_auto_compact_token_limit` with `effective_context_window_percent` = 95% safety margin.
  - OpenCode: "Protects last 40k tokens of tool output (PRUNE_PROTECT constant)"; "Prunes ... if >20k tokens prunable (PRUNE_MINIMUM constant)." (So "OpenCode 40k" in Sweep 1 = the protected buffer, not a trigger threshold — phrase precisely.)
  - Amp: no auto-compaction; "keep conversations short & focused."
- **Source type:** [practitioner direct] — own GitHub gist, reverse-engineered from source/community. STRONG, but two cautions: (a) it's a snapshot of fast-moving CLIs (Dec 2025 — 6mo old now, agent versions have moved; flag as DATED at the 6-month line), (b) the Claude Code 95% is self-flagged as community-reverse-engineered, not vendor-confirmed. Reconciles with Claim 2: nobody has an Anthropic-official Claude Code number.

---

## Claim 6 — LMCache 81% cost-cut / 92% prefix-reuse trace

**VERDICT: confirmed-secondary-only → it is a VENDOR blog with a single self-measured trace + hypothetical cost math. Reclassify L0 for the cost claim.**

- **URL:** https://blog.lmcache.ai/en/2025/12/23/context-engineering-reuse-pattern-under-the-hood-of-claude-code/
- **Publisher:** LMCache Blog, "Initiated and Officially Supported by Tensormesh" → **vendor-affiliated**. Authors: Kobe and Mengbing. Date: 2025-12-23 (DATED at 6mo line).
- **Source type:** [vendor blog] = **Level 0 / NOT EVIDENCE** for the cost-reduction claim. The vendor sells the caching layer the post promotes.
- **92% prefix-reuse:** "Across all phases, the prompt reuse rate is extremely high: 92%." From ONE trace — a single random SWE-bench_Verified task (#80), captured by intercepting their own Claude Code traffic via a self-hosted LiteLLM proxy. N=1.
- **81% cost reduction:** "a savings of $4.85 (81% reduction) over one simple task." This is **hypothetical math** applied to that one trace using Anthropic's published cache pricing ($3/MTok base vs $0.30/MTok cache hit) — NOT a measured bill, NOT independently verified, self-measured by the vendor.
- **Ruling:** the 92% prefix-reuse is a real (if N=1, self-captured) observation and is directionally interesting as "Claude Code traffic is highly cache-reusable." The 81% is vendor self-interested illustrative arithmetic on a single task — **do not cite 81% as a cost-reduction finding.** If used at all, frame as "a vendor (LMCache/Tensormesh) illustrated, on one SWE-bench task, that ~92% of Claude Code's prompt prefix was reusable" and stop there. Independent corroboration absent.

---

## Net effect on Sweep 1 load-bearing claims

| Claim | Before | After |
|---|---|---|
| 1 Cherny grep>RAG | secondary captures | **primary** (PE interview, Orosz/Cherny) |
| 2 auto-compact ~83.5%/33K | single-source/unverified | **corrected: no vendor number; 83.5%/33K = [UNVERIFIED STAT], drop** |
| 3 SWE-Pruner 23–54% | secondary | **primary**, single-study, range+benchmark-scoped, model unnamed |
| 4 Not All Needles | couldn't pull | **primary**, 4 small-tier models, qualitative finding |
| 5 badlogic thresholds | gist | **primary**, his, Dec-2025 (now dated), CC-95% self-flagged community |
| 6 LMCache 81%/92% | source-type unknown | **vendor blog L0; 81% = hypothetical, drop; 92% = N=1 self-trace** |

Two claims got materially weaker on inspection (2 and 6) — both were round-ish numbers that dissolved into "no source" / "vendor arithmetic" when opened. Two got materially stronger (1, 3). Standard pattern: the fragile claims were fragile for a reason.
