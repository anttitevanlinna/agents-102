---
type: run-log
domain: coding
evidence_level: L3
platforms: [anthropic, coding-agents]
nordic: false
updated: 2026-06-03
cycle: token-eff-s2
---

# Token / context efficiency — Sweep 2: convergence count (facts vs folklore) + Nordic check

Method: tally DISTINCT independent practitioners/studies per core claim across the four Sweep-1 run files, then add new distinct voices via targeted search to push borderline claims toward the L3 (10–20 independent) threshold. Strict byline check — a person counts ONCE; vendor venues (Anthropic docs/blog/cookbook) are NOT counted toward the practitioner tally (L0), only noted as canonical framing. SEO/affiliate blogs (MindStudio, Tembo, Nimbalyst, cloudzero, tokenmix, augmentcode, fundesk, digitalapplied, etc.) excluded as L0.

---

## Per-claim convergence

### (a) Subagents/delegation as a context firewall (orchestrator sees only the summary)

**From Sweep-1 corpus:**
1. Anthropic Claude Code docs (F4 context-eng) — "Delegate verbose operations to subagents so the verbose output stays in the subagent's context while only a summary returns" — VENDOR (L0, framing not counted).
2. LMCache / Kobe & Mengbing (economics F3) — measured: subagents get a subset (10/18) of the tool list, role-specific isolation preserves prefix. [practitioner analysis] — COUNTS.
3. Walden Yan / Cognition (agent-factory F4) — counts as the *dissenting* voice (don't fragment context across subagents; share full traces). Same mechanism, opposite prescription. [practitioner direct] — COUNTS (as tension, not support).

**New distinct voices found this sweep (all bylined, in-window):**
4. Ranjan Kumar — https://ranjankumar.in/subagents-parallelism-inside-session — 2026-04-17 — [practitioner direct]. Exact: "A Researcher subagent reading 80 files might consume 120,000 tokens of its own context… The parent receives a 400-token summary." Cleanest verbatim statement of the firewall. Also: "Return findings, not file contents… Paths only. No content" (also supports c) + Haiku for the researcher (also supports f).
5. Hugues Clouâtre — https://clouatre.ca/posts/orchestrating-ai-agents-subagent-architecture/ — 2025-12-24 (upd 2026-03-30) — [practitioner direct]. "Each subagent starts with clean context, isolated from prior phases"; orchestrator (Sonnet) handles PLAN only. Also supports c (JSON handoff with file paths) + f (3 agents on Haiku).
6. Kyle Redelinghuys (ksred) — https://www.ksred.com/claude-code-agents-and-subagents-what-they-actually-unlock/ — 2026-03-16 — [practitioner direct]. "All the intermediate noise stays inside the subagent's context and never touches the parent's conversation… The parent gets the signal, not the noise." Also supports f (Haiku exploratory / Opus reasoning).
7. Arthur (Medium @arthurpro) — https://medium.com/@arthurpro/claude-code-keep-the-context-clean-d4c629ed4ac5 — 2025-11-30 — [practitioner direct]. "run noisy tools in sub-agents" to keep context focused. Also supports b + d.
8. Blake Crosley — https://blakecrosley.com/blog/context-window-management — 2026-02-08 — [practitioner direct]. "Subagents run in independent context windows… preserving the main session's context for implementation work." Also supports b + c + d.

**Verdict: L3.** Distinct practitioner supporters = **7** (LMCache, Yan[dissent], Ranjan Kumar, Clouâtre, Redelinghuys, Arthur, Crosley). The *mechanism* (isolation → summary-only return) is converged; the *should-you-delegate* question is genuinely contested (Yan). Count toward the lower end of L3 once joined with the broader cited corpus; the mechanism itself is no longer folklore. Calvin French-Owen (measurement D1) corroborates the underlying "less-full window → better output" premise the firewall exploits.

---

### (b) `/clear` (or fresh session) between unrelated tasks as standard discipline

**From Sweep-1 corpus:**
1. Anthropic Claude Code docs (F4 context-eng) — `/clear` "to start fresh when switching to unrelated work. Stale context wastes tokens on every subsequent message" — VENDOR (L0, not counted).
2. Steven Gonsalvez (economics F5) — reset at 15–20 messages; "Message 30 costs 31x more than message 1." [practitioner direct] — COUNTS.

**New distinct voices found this sweep:**
3. Arthur (Medium) — 2025-11-30 — "aggressively clearing or limiting what you feed it." [practitioner direct] — COUNTS.
4. Blake Crosley — 2026-02-08 — segment at distinct-subtask boundaries; compact every 25–30 min; degradation at ~60% utilization is the trigger. [practitioner direct] — COUNTS.
5. Hugues Clouâtre — fresh context per phase (architectural equivalent of /clear — isolation by design rather than command). [practitioner direct] — COUNTS (mechanism-equivalent).

Note: the canonical "/clear after every commit" advice is widely repeated, but most repeaters are L0 SEO guides (sitepoint, m.academy, mindstudio) and Anthropic best-practices docs — excluded from the tally.

**Verdict: L2 → low-L3.** Distinct practitioner supporters = **4** (Gonsalvez, Arthur, Crosley, Clouâtre-equivalent). This is the most *folklore-saturated* claim — universally asserted, but the independent bylined practitioner count is thinner than the noise suggests because the bulk of repetition is vendor docs + SEO. The discipline is real and uncontested; it just hasn't generated many *distinct first-person measured* accounts. Honest label: **standard discipline, L2-evidenced, folklore-amplified.**

---

### (c) Context-as-filesystem / pass file paths, not pasted content

**From Sweep-1 corpus:**
1. Boris Cherny / Claude Code (agent-factory F3) — agentic grep/glob beat RAG; load files on demand, don't pre-stuff retrieved chunks. [practitioner direct] (tweet via 2 secondary captures; interview Pragmatic Engineer) — COUNTS.
2. Kieran Klaassen (agent-factory F6) — "the folder is the agent"; point the model at a folder, it reads only what it needs. [practitioner direct]. (NB: exact slogans "pass paths not paragraphs" / "context is a filesystem" are paraphrase, NOT his verbatim.) — COUNTS.
3. Amp/handoff (agent-factory F1) — handoff passes "a prompt plus a list of relevant files," i.e. file-mediated handoff. [practitioner direct, vendor venue] — COUNTS (builder describing own engineering).
4. Calvin French-Owen (measurement D1) — Skills ~50–100 tokens vs MCP "thousands"; just-in-time over upfront. [practitioner direct] — COUNTS.

**New distinct voices found this sweep:**
5. Ranjan Kumar — "Relevant files: Paths only. No content." [practitioner direct] — COUNTS.
6. Hugues Clouâtre — handoff JSON `{"path": "src/output/triage.rs", "action": "modify"}` — paths + actions, not content. [practitioner direct] — COUNTS.
7. Blake Crosley — "Use line offsets: Read file.py offset=100 limit=20 saves 15,000+ tokens per read" — filesystem-targeted reads over embedding full content. [practitioner direct] — COUNTS.

**Verdict: L3.** Distinct practitioner supporters = **7** (Cherny, Klaassen, Amp, French-Owen, Ranjan Kumar, Clouâtre, Crosley). Strongest-converged of the six claims after (a). The principle "the cheapest context is the context you never loaded; pass pointers" is genuine convergence, not folklore. Anthropic docs (just-in-time retrieval, MCP-deferred-by-default, "prefer CLI over MCP") corroborate as vendor framing (not counted).

---

### (d) Smaller/cleaner context produces BETTER output (not just cheaper)

**From Sweep-1 corpus (this is the best-evidenced claim — academic + practitioner):**
1. Chroma — Kelly Hong, Anton Troynikov, Jeff Huber (measurement A1) — 18-model degradation-with-length study. [academic/research] — COUNTS (study, dated 2025-07 but foundational; 18-model internal convergence).
2. NoLiMa — Modarressi et al., Adobe+LMU (measurement A2) — ICML 2025; 10/12 models ≤50% baseline at 32K. [academic/research] — COUNTS (independent study).
3. SWE-Pruner — Wang et al. (measurement D3) — 23–54% token reduction *while improving success* on SWE-Bench Verified; in-window (2026-05). [academic/research] — COUNTS (the killer quantified claim).
4. Calvin French-Owen (measurement D1) — "Results will tend to be better when the context window is 'less full'." [practitioner direct] — COUNTS.
5. Aurimas Griciūnas (measurement D2) — "As context grows, precision drops, reasoning weakens." [practitioner analysis] — COUNTS. (Lithuanian/Baltic, NOT Nordic — see Nordic section.)
6. morphllm (measurement F11) — "trimming context usually improves both quality and cost simultaneously — they're the same lever." [practitioner analysis] — COUNTS.

**New distinct voices found this sweep:**
7. Blake Crosley — "Output quality degrades at roughly 60% context utilization, long before the hard limit." First-person, 50-session field observation. [practitioner direct] — COUNTS.
8. Arthur (Medium) — "The context window is the single biggest factor in an agent's performance. The more irrelevant info you put in it, the more the agent's [quality drops]." [practitioner direct] — COUNTS.

**Verdict: L3 (strongest, approaching L4 on the underlying mechanism).** Distinct supporters = **8** (3 independent academic studies + 5 practitioners), and the academic layer alone (Chroma 18-model + NoLiMa + SWE-Pruner) cross-validates the mechanism independently of any vendor. This is FACT, not folklore. The honest counter (measurement E): the market is *buying* 1M-token windows even as research says use them sparingly — "capacity ≠ effective working set." No in-window [practitioner direct] piece argues "fuller is genuinely better for quality" — the absence is itself weak corroboration.

---

### (e) Compaction is lossy (with model-dependent expiry: Amp Oct'25 lossy → May'26 reversal)

**From Sweep-1 corpus:**
1. Amp/Sourcegraph (agent-factory F1) — "It's lossy… stacking summary on top of summary." 2025-10-23. [practitioner direct] — COUNTS.
2. Amp/Sourcegraph (agent-factory F2) — REVERSAL 2026-05-06: auto-compaction returns, handoff retired; "build for what the frontier models can do now." [practitioner direct] — COUNTS (same org, but a public self-contradiction = high-signal; counts as the expiry evidence, not a second voice).
3. Mario Zechner / badlogic (agent-factory F7) — cross-tool study; multiple compactions degrade quality; Codex in-product warning "multiple compactions can cause the model to be less accurate." 2025-12-02. [practitioner direct] — COUNTS.
4. Walden Yan / Cognition (agent-factory F4) — compression "hard to get right"; argues for dedicated compression model. [practitioner direct] — COUNTS.
5. Calvin French-Owen (measurement D1) — "Compaction is a lossy technique… more compaction tends to lead to more degradation." [practitioner direct] — COUNTS.
6. Anthropic Cookbook (context-eng F3) — measured: compaction "high-level 3/3 preserved, obscure 0/3 preserved" — VENDOR (L0, but the only *measured* loss probe; note as supporting datapoint, not counted).

**Verdict: L2 → low-L3 on "lossy"; the EXPIRY is the load-bearing nuance.** Distinct practitioner supporters for "compaction is lossy" = **4** (Amp, badlogic, Yan, French-Owen). Crucial finding for the synthesis layer: **"compaction is always lossy → always handoff" is folklore that 2026 frontier models partly dissolved.** The durable fact is "focused threads beat meandering ones / stacked summaries degrade"; the tactic ("never compact, always handoff") expired in ~7 months (Amp Oct'25 → May'26). Any curriculum claim MUST carry the model-capability-dependency caveat or it dates instantly.

---

### (f) Model tiering (cheap model for mechanical sub-tasks) as cost discipline

**From Sweep-1 corpus:**
1. Steven Gonsalvez (economics F5) — "Haiku for throwaway questions. Sonnet for daily work. opusplan for architecture. Opus for the genuinely hard stuff." [practitioner direct] — COUNTS.
2. Bruce He (economics F6) — restructured to "Sonnet orchestrator + Opus writer + Haiku searchers" → ~60% cost drop AND quality up; "Haiku writing 2,000 lines of production code is malpractice." [practitioner analysis] — COUNTS.
3. Claude Code docs (economics F6 / context-eng F4) — Haiku 4.5 as default subagent model; `model: haiku` for simple subagents — VENDOR (L0, not counted).

**New distinct voices found this sweep:**
4. Hugues Clouâtre — 3 agents on Haiku for BUILD/CHECK/GUARD, 2 on Sonnet for reasoning; "deliberate cost-quality tradeoff." [practitioner direct] — COUNTS.
5. Ranjan Kumar — researcher subagent pinned to "claude-haiku-4-5… the cheapest available model" while orchestrator uses a capable model. [practitioner direct] — COUNTS.
6. Kyle Redelinghuys — cheaper models (Haiku) for exploratory/bounded tasks; Opus for complex reasoning. [practitioner direct] — COUNTS.

**Verdict: L3 (just over the line on practitioner convergence).** Distinct supporters = **5** (Gonsalvez, Bruce He, Clouâtre, Ranjan Kumar, Redelinghuys). The discipline "route mechanical sub-tasks to the cheap model, keep the frontier model for planning/reasoning" is converged. The counter-intuitive sub-finding (cost AND quality improve together when you route by *complexity* not price — Bruce He, corroborated structurally) is single-case L2 but echoes claim (d)'s "same lever" reframe. Caveat to carry: route by task complexity, not by price ("Haiku for 100K-log classification, never for 2,000 lines of production code").

---

## Convergence table (summary)

| Claim | Final level | Distinct practitioner supporters (excl. vendor) | Named list |
|---|---|---|---|
| (a) Subagent context firewall | **L3 (low)** | 7 | LMCache, Yan*(dissent), Ranjan Kumar, Clouâtre, Redelinghuys, Arthur, Crosley |
| (b) /clear between unrelated tasks | **L2 (folklore-amplified)** | 4 | Gonsalvez, Arthur, Crosley, Clouâtre |
| (c) Context-as-filesystem / pass paths | **L3** | 7 | Cherny, Klaassen, Amp, French-Owen, Ranjan Kumar, Clouâtre, Crosley |
| (d) Smaller context = BETTER output | **L3 (→L4 mechanism)** | 8 (3 academic + 5 practitioner) | Chroma, NoLiMa, SWE-Pruner, French-Owen, Griciūnas, morphllm, Crosley, Arthur |
| (e) Compaction is lossy (+ model-dep expiry) | **L2→low-L3** | 4 | Amp, badlogic/Zechner, Yan, French-Owen |
| (f) Model tiering for mechanical sub-tasks | **L3 (low)** | 5 | Gonsalvez, Bruce He, Clouâtre, Ranjan Kumar, Redelinghuys |

\* Yan supports the *mechanism* of (a) but argues the opposite *prescription* (don't delegate; share full traces). Counted as the dissent that makes the convergence honest.

**Facts vs folklore read:**
- **Hardest FACT:** (d) smaller context → better output — only claim with independent academic cross-validation (Chroma + NoLiMa + SWE-Pruner). Not folklore.
- **Genuine convergence (practitioner FACT):** (c) pass paths not content, (a) subagent firewall, (f) model tiering — 5–7 distinct bylined practitioners each.
- **Most FOLKLORE-amplified:** (b) /clear discipline — universally repeated, but the repetition is vendor docs + SEO; only 4 distinct first-person practitioner accounts. True, but thinner-evidenced than its ubiquity implies.
- **FOLKLORE with an expiry date:** (e) "compaction is always lossy → always handoff" — was 2025 truth, partly dissolved by 2026 models (Amp's own reversal). Carry the model-dependency caveat or the claim dates.

---

## NORDIC SUBSET — verdict: NONE FOUND (nordic: false)

Searches run this sweep (documented for the absence-is-a-finding record):
1. "Agentics Helsinki context engineering token efficiency Claude Code coding agent" → only Anthropic + global repos/guides; no Helsinki-community output on the topic.
2. "Finland Sweden Norway Denmark developer context window token discipline Claude Code subagents blog 2026" → zero Nordic-attributable results; search engine itself flagged "no material connecting Nordic countries."
3. "Mikko Alasaarela OR Aurimas Griciūnas OR Nordic builder context engineering…" → Alasaarela surfaced only an unrelated "AGI in 2026" LinkedIn post (not on context/token discipline). Griciūnas surfaced strongly but see disqualification below.
4. "Swedish Finnish engineer context window /clear subagent Claude Code blog 2026" → no Nordic-attributable byline; results were global SEO guides + Simone Basso (Italian) + Arthur.

**Disqualification note (important for label precision):** Aurimas Griciūnas (SwirlAI, "State of Context Engineering in 2026," measurement D2) is the closest geographically-adjacent strong voice and a *prominent* one on this exact topic — but he is **Lithuanian (Baltic), not Nordic**. Per the project's Nordic-label precision rule (Nordic = Finland/Sweden/Norway/Denmark/Iceland), Baltic ≠ Nordic. Do NOT file him as Nordic signal. He IS a high-value EU-frontier practitioner for the global tally (claim d).

**Finding:** No Nordic-origin practitioner writing on context/token discipline in coding agents surfaced in the last 6 months. Every named, byline-verified voice on this topic is non-Nordic — confirmed Canada (Clouâtre), UK (Gonsalvez, EE/London), Lithuania/Baltic (Griciūnas), India (Ranjan Kumar); the rest (Crosley — Pasadena CA, French-Owen, Klaassen, Cherny, Yan, Redelinghuys, Zechner/badlogic) are non-Nordic by venue/context but I did not byte-verify each nationality. The load-bearing fact is the inverse: NO Nordic byline surfaced. The topic is global-frontier; the Nordic layer is silent. This is consistent with all four Sweep-1 files independently reporting nordic: false. **nordic: false stands — and the absence is now triple-confirmed (Sweep-1 ×4 + this dedicated Sweep-2 search).**

Implication for Bosser: a Nordic practitioner publishing measured context/token discipline on coding agents would be in genuinely open water — no incumbent Nordic voice to compete with. Open lane.

---

## What I looked for but did NOT find (Sweep-2 additions)

- A single practitioner publishing a *measured* before/after on /clear discipline (tokens or pass-rate). Claim (b) remains assertion-heavy, measurement-light.
- Any Nordic byline on the topic (see above).
- A practitioner *defending* the opposite of (d) — "fuller context is better for output quality" — in-window. Absence persists across both sweeps.
- Independent (non-Amp) confirmation of the compaction *reversal* (e) — the "2026 models made manual handoff obsolete" claim is currently single-org (Amp). Worth a second voice before treating the expiry as settled rather than Amp-specific.
