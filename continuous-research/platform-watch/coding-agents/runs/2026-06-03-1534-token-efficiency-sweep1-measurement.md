---
type: run-log
domain: coding
evidence_level: L3
platforms: [anthropic, coding-agents]
nordic: false
updated: 2026-06-03
cycle: token-eff-s1
---

# Token / Context Efficiency — Sweep 1: Measurement, Definition, Degradation-with-Length (quality angle)

Lens: how token/context efficiency is DEFINED and MEASURED, plus the strongest argument that a fuller context window produces WORSE output (not merely slower/costlier). Freshness window: ~2025-12-03 → 2026-06-03. Academic benchmarks predating the window are kept as dated historical context and flagged.

---

## A. The degradation-with-length evidence (quality angle)

### A1. Chroma Research — "Context Rot: How Increasing Input Tokens Impacts LLM Performance"
- **Who:** Kelly Hong, Anton Troynikov, Jeff Huber (Chroma). URL: https://research.trychroma.com/context-rot (redirects to https://www.trychroma.com/research/context-rot)
- **Source type:** [academic/research] — independent lab report, original empirical work. NOTE: Chroma is a vendor (vector DB), so motivated reasoning toward "retrieval/curation matters" exists; the empirical method is open and reproducible, so treat the *measurements* as evidence and the *framing* as interested.
- **Date:** 2025-07-14. **DATED relative to the 6-month window (~11 months old).** Keep as the foundational/historical benchmark; it is still the most-cited primary source and remains the reference all 2026 practitioner pieces point back to.
- **What:** Tested **18 frontier models** (5 Anthropic: Opus 4, Sonnet 4, Sonnet 3.7/3.5, Haiku 3.5; 7 OpenAI: o3, GPT-4.1/mini/nano, GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo; 3 Google: Gemini 2.5 Pro/Flash, 2.0 Flash; 3 Alibaba Qwen3). Core claim: every model degrades as **input length** grows even on trivially simple tasks, and **even when far from the window limit** (degradation visible at 50K inside a 200K window).
- **Evidence level:** L3 (18-model convergence in one rigorous study; cross-checked by NoLiMa below = L3→L4 territory on the underlying pattern).
- **Methodology / sample sizes (capture for benchmark hygiene):**
  - *Needle-Question similarity:* 8 needles/haystack, cosine-sim ranges (PG essays 0.445–0.775; arXiv 0.521–0.829), across 8 input lengths × 11 needle positions.
  - *Distractors:* high-sim needle + 0/1/4 distractors, randomly positioned.
  - *Repeated-words task:* 1,090 variations per word combination, input lengths 25→10,000 words (12 steps), 7 word-pair combos, scored by normalized Levenshtein distance.
  - *LongMemEval:* 306 prompts, ~113k tokens full vs ~300 tokens "focused."
- **Exact verifiable claims / quotes:**
  - "Across all experiments, model performance consistently degrades with increasing input length."
  - "Even on tasks as simple as non-lexical retrieval or text replication, we see increasing non-uniformity in performance as input length grows."
  - **Counterintuitive, quotable:** all 18 models performed **better on *shuffled* haystacks than on logically structured ones** — coherent long context hurt more than randomized text.
  - LongMemEval focused (~300 tok) vs full (~113k tok): significant gap across all families; **Claude Opus 4 and Sonnet 4 showed the most pronounced gap** (relevant to our Anthropic-platform readers).
  - Refusal/garbage-output rates on repeated-words: GPT-3.5 Turbo 60.29%, Qwen3-8B 4.21%, Claude Opus 4 2.89%, GPT-4.1 2.55%.

### A2. NoLiMa — "Long-Context Evaluation Beyond Literal Matching"
- **Who:** Modarressi, Deilamsalehy, Dernoncourt, Bui, Rossi, Yoon, Schütze (Adobe Research + LMU Munich). URL: https://arxiv.org/abs/2502.05167 (ICML 2025).
- **Source type:** [academic/research], peer-reviewed (ICML 2025).
- **Date:** 2025-02. **DATED (~16 months).** Historical context — but it is the methodological backbone of the NIAH critique and corroborates Chroma independently.
- **What:** Rebuilds needle-in-a-haystack to **remove literal lexical overlap** between question and needle (forces "latent associative reasoning," e.g. ask about "Dresden" when the needle says "Semper Opera House"). Exposes that classic NIAH ~100% scores were inflated by keyword matching.
- **Evidence level:** L3.
- **Exact verifiable claims (capture methodology — these are the load-bearing numbers):**
  - 12 primary models (+3 reasoning: o1, o3-mini, DeepSeek-R1), all claiming ≥128K context.
  - **At 32K tokens, 10 of 12 models fell to ≤50% of their short-context (<1K) baseline.**
  - **GPT-4o: 99.3% → 69.7%** at 32K.
  - **Llama 3.1 70B: 94.3% → 42.7%** at 32K; Llama 3.3 70B already at 87.4% by **2K** (from 97.3%).
- **Why it matters for our thesis:** the degradation is attributed to attention struggling when surface lexical cues are absent — i.e. real-world coding context (semantic, not keyword-matched) is exactly the hard case.

### A3. 2026 follow-up — "Not All Needles Are Found…" (fact distribution + hallucination)
- **Who:** Amirali Ebrahimzadeh, Seyyed M. Salili. URL: https://arxiv.org/abs/2601.02023 (arXiv 2601.02023v1).
- **Source type:** [academic/research] preprint (not yet peer-reviewed — single preprint, treat as supporting).
- **Date:** 2026-01-06. **IN WINDOW.** This is the freshest academic follow-up in the lineage.
- **What:** Varies *where* facts sit in long context and tests literal extraction vs logical inference vs hallucination, plus "Don't Make It Up" (DMIU) prompts as a mitigation. Cites "Lost in the Middle" lineage.
- **Evidence level:** L2 (single preprint, supporting). Finding: degradation is **non-uniform by fact position**, and **prompt-level mitigation (DMIU) cannot fully compensate** for poor fact positioning. Adds the *hallucination-risk* dimension on top of recall loss.
- **Caveat:** I could NOT cleanly extract the model list / sample sizes from the PDF (compressed streams). Needs a follow-up read before citing specific numbers. Flag as [methodology-incomplete].

---

## B. How practitioners DEFINE token / context efficiency

### B1. Anthropic — "attention budget" / "smallest set of high-signal tokens" (the canonical definition)
- URL: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- **Source type:** [vendor engineering blog] — **L0 as evidence**, but this is the *definition* practitioners have adopted verbatim, so it earns a place as the canonical framing, not as proof of a claim.
- **Date:** formalized Sept 2025 (still the reference definition in 2026 pieces; the page is maintained).
- **Definition (quotable):** context engineering = "the set of strategies for curating and maintaining the optimal set of tokens during LLM inference"; **"finding the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome."**
- **Frame:** LLMs have a finite **"attention budget"**; "every new token introduced depletes this budget by some amount." Context = "finite resource with diminishing marginal returns." This is the signal-to-noise framing that downstream practitioners use as their working definition of efficiency.

### B2. Cost-per-task as the executive definition (the money definition)
- **Source A (vendor, label honestly):** Vantage — Casey Harding, 2026-04-15. URL: https://www.vantage.sh/blog/agentic-coding-costs. **[vendor case study / L0]** (Vantage sells cost tooling). Use ONLY for the bare illustrative arithmetic, not as proof.
  - Working definition surfaced: **"cost per task" = total spend per successfully completed end-to-end task**, described as "the single metric worth defending in executive reviews."
  - Illustrative 50-turn session: ~1M input tokens + ~40K output tokens → **~25:1 input:output ratio**. Quote: "Input tokens outnumber output by 20-25x. The input price is the number that actually drives your bill." → implication: efficiency work should target *input* (context) tokens, not output.
  - Cost-per-task spread (illustrative, vendor figures — UNVERIFIED, single-source): Claude Opus 4.6 ~$6.00 vs Composer 2 ~$0.60 per 50-turn session ("a 10x gap").
- **Source B (glossary, corroborating the metric trio):** digitalapplied.com token-economics glossary (2026). [domain trade publication]. Names the working metric set practitioners report on: **cost per task** (executive), **blended rate** (forecasting), **cache hit rate** (optimization lever). Cached input ≈ 10% of normal input rate across Anthropic/OpenAI/Bedrock → cache hit rate is "the most important single cost optimization in agentic workflows."

**Synthesis of B:** practitioners run two definitions in parallel — (1) a *quality* definition (signal-to-noise / smallest high-signal token set, from the attention-budget frame) and (2) a *money* definition (cost-per-completed-task, with cache-hit-rate as the main lever). Tokens-per-task is the raw count; cost-per-task is the defensible KPI; cache-hit-rate is the dial you turn.

---

## C. How practitioners MEASURE it day-to-day

- **`/context` breakdown (Claude Code):** the in-session command showing token allocation (system prompt, tools, files, transcript). Repeatedly cited as the primary day-to-day instrument. [practitioner analysis] via claudefa.st guide (https://claudefa.st/blog/guide/mechanics/context-management). [tech press]-grade; corroborated by multiple guides.
- **Auto-compact threshold watching:** Claude Code auto-compacts at **~83.5% of the window**; buffer reduced to **~33K tokens (16.5%)** in early 2026. Threshold is configurable (1–100). API-level compaction beta header: `compact-2026-01-12`. Sources: claudefa.st (https://claudefa.st/blog/guide/mechanics/context-buffer-management) [tech press] + Anthropic docs (https://platform.claude.com/docs/en/build-with-claude/compaction) [vendor docs, for the feature fact only]. **The 83.5% / 33K figures are single-guide-sourced — mark [UNVERIFIED STAT] until cross-checked against Anthropic docs directly.**
- **ccusage:** community CLI for daily token consumption + cost breakdown ("shows exactly where your tokens go"). [practitioner tool], widely referenced. (Need a named user + URL before quoting adoption — see not-found.)
- **StatusLine / ccstatusline:** real-time context metric in the status bar, configurable warning thresholds. [practitioner tool]. (Matches our own AE101 ccstatusline aside — internal corroboration.)
- **Token budgets per phase (observational):** Vantage's phase table (exploration ~5K in/turn → implementation ~20K → testing ~35K) is the clearest published picture of *where* context bloats across a session, even though it's vendor/illustrative.

---

## D. The strongest "smaller window = better OUTPUT, not just cheaper" statements (last 6 months)

### D1. Calvin French-Owen — "Coding Agents in Feb 2026" — STRONGEST PRACTITIONER SOURCE
- **Who:** Calvin French-Owen (co-founder Segment; has worked inside frontier-lab agent work). URL: https://calv.info/agents-feb-2026. **[practitioner direct]** (own byline, own blog).
- **Date:** 2026-02-17. **IN WINDOW.**
- **Evidence level:** L1 opinion, but a high-credibility named practitioner — context, not proof, yet quotable.
- **Quotes (the quality-not-just-cost argument):**
  - "Results will tend to be better when the context window is 'less full'." + "It's generally easier to train on short-context data vs long-context data."
  - "Compaction is a lossy technique… more compaction tends to lead to more degradation in performance." → even the *fix* (compaction) trades quality.
  - "If the problem you are trying to solve is 'too big' for the context window, the agent is going to spin on it for a long time and give you poor results."
  - Efficiency-of-mechanism datapoint: **"Skills tend to be ~50-100 tokens"** vs MCP calls that "take up thousands of tokens" — a concrete signal-to-noise design lever.

### D2. Aurimas Griciūnas — "State of Context Engineering in 2026"
- URL: https://www.newsletter.swirlai.com/p/state-of-context-engineering-in-2026. **[practitioner analysis]** (own byline, practitioner newsletter). Date: 2026-03-22. **IN WINDOW.** L1.
- **Quotes:**
  - "every token in the context window competes for that attention. As context grows, precision drops, reasoning weakens." (quality, not cost)
  - "Loading all instructions upfront wastes most of the context window on irrelevant guidance." (argues against the maximal-AGENTS.md / dump-everything instinct)
- Names skill token costs conceptually (~80 tok median/skill, ~1,700 at discovery) but **no measurement tooling**.

### D3. SWE-Pruner — quantified proof that pruning *improves* success, not just cost
- URL: https://arxiv.org/abs/2601.16746 (v4 2026-05-08). Authors: Wang, Shi, Yang, Zhang, He, Lian, Chen, Ye, Cai, Gu. **[academic/research]** preprint. **IN WINDOW.** L2 (single study, supporting).
- **The killer claim for our thesis (quote abstract verbatim):** "**23-54% token reduction on agent tasks like SWE-Bench Verified while even improving success rates**" and "up to **14.84x compression** on single-turn tasks like LongCodeQA with minimal performance impact."
- Method: lightweight **0.6B-param** "neural skimmer" doing self-adaptive context pruning; tested across multiple models (Claude, GLM) on four benchmarks.
- **Significance:** this is the cleanest L2 evidence that *removing* tokens can *raise* task success rate — the empirical backbone for "smaller window for quality, not just cost." Pair with Chroma (mechanism) + French-Owen (practitioner voice).

---

## E. Counter-evidence / confirmation-bias guard

- The whole lineage is funded/framed by parties with a curation interest (Chroma = vector DB; SWE-Pruner = a pruning method paper; Anthropic = sells the model). None is disinterested. The empirical NIAH numbers (Chroma + NoLiMa, independent teams, converging) are the part that survives the bias discount.
- **Genuine counter-signal:** 1M-token context windows (Claude beta, Gemini) are being marketed and adopted — the market is *buying* bigger windows even as the research says use them sparingly. The honest synthesis is "capacity ≠ effective working set"; bigger windows raise the ceiling, not the optimal operating point. (Did not find a strong 2026 [practitioner direct] piece arguing "fuller is genuinely better for output quality" — see not-found; absence of that counter-piece is itself weak evidence the convergence is real.)
- SWE-Pruner "improves success rates" is a single preprint with a method-author's incentive; do not over-cite. Chroma's "shuffled beats coherent" is striking but task-specific (retrieval), not a coding-task result — don't overgeneralize to "structure your repo randomly."

---

## What I looked for but did NOT find

1. **A named, in-window (post-Dec-2025) [practitioner direct] case study with before/after numbers** on a real coding team (e.g. "we cut context from X to Y tokens and resolve-rate went from A% to B%"). The strongest real numbers remain SWE-Pruner (benchmark, not field) and Chroma (synthetic tasks). Field evidence on coding teams is the gap.
2. **A crisp, citable practitioner *definition* of "signal-to-noise ratio" as a measurable quantity** — everyone uses the phrase; nobody publishes a formula or a measured S/N number.
3. **Named individuals attesting ccusage / ccstatusline adoption** with a URL — the tools are referenced generically; I have no first-person "I watch ccusage and here's what I do" quote with a verifiable byline.
4. **A direct, verifiable Anthropic-doc confirmation of the 83.5% auto-compact / 33K-buffer figures** — only single guide (claudefa.st) carried the exact numbers; marked [UNVERIFIED STAT].
5. **Model list + sample sizes for the 2026 "Not All Needles Are Found" paper** — PDF compression blocked extraction; needs a re-read.
6. **A 2026 *direct replication/extension of Chroma's Context Rot* on coding-specific contexts** (the existing follow-ups are general long-context, not code-repo context). This is an obvious open research lane worth flagging to the synthesis layer.
7. **Any Nordic practitioner source** on this topic — none found (nordic: false stands).
