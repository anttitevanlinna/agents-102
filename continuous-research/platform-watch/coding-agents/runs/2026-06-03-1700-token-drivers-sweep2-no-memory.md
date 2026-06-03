---
type: run-log
domain: coding
evidence_level: L3
platforms: [coding-agents]
nordic: false
updated: 2026-06-03
cycle: 2
---

# Sweep 2 (Confirmation), Driver #4 — No persistent memory → re-derivation/re-reading + flailing loops

Confirmation pass over Sweep 1 (`2026-06-03-1610-token-drivers-sweep1-no-memory-rework.md`). Job = verify, disprove, resolve open flags. Not re-discover.

## Focus

1. Is the convergence really L3 or L2? Count DISTINCT independent practitioners honestly.
2. Resolve the two open flags: the Simon Willison direct-quote, and tracing the "ETH Zurich 3%" to primary.
3. Hunt the honest counter: CLAUDE.md bloat as its own token sink (the bidirectional nuance).
4. Re-check freshness; flag >6mo as historical-context-only.
5. Byline re-check on load-bearing URLs.
6. Back-sweep any label/level corrections.

## Queries Used

- `Simon Willison agent re-reading files context plan.md scratchpad notes tokens coding agent`
- `ETH Zurich study CLAUDE.md context files reduce success rate coding agents`
- `CLAUDE.md bloat too large always loaded every turn token cost context window practitioner`
- `Armin Ronacher OR Harper Reed CLAUDE.md keep small context every token agent 2026`
- Direct fetches: arxiv.org/html/2602.11988v1 ; simonw.substack.com/p/agentic-engineering-patterns ; simonwillison.net/tags/context-engineering/ ; dbreunig.com/2025/06/26/how-to-fix-your-context.html ; thomas-wiegold.com/blog/claude-md-helpful-or-expensive-noise/ ; engineerscodex.com/agents-md-making-ai-worse/

## Confirmation

### Convergence count — honest re-rating: **L3 on existence/shape, NOT on any number. Holds.**

Distinct INDEPENDENT practitioner sources on the *existence/shape* of the memory-gap → re-derivation driver:

1. **Steve Yegge** — [practitioner direct], own Medium, 2025-10-13. "no memory between sessions … Memento … Fifty First Dates"; rediscovery/rework framing. (L2 per-item build, but his problem-framing is the load-bearing anchor.)
2. **Anthropic — context engineering** — [practitioner direct], own venue, 2025-09-29. Names structured note-taking / agentic memory as the persist-outside-window mechanism.
3. **Anthropic — long-running harnesses** — [practitioner direct], own venue, 2025-11-26. "each new session begins with no memory … saves Claude some tokens in every session." Distinct artifact, same author-org as #2 → counts as ONE independent voice for convergence purposes, not two.
4. **Lance Martin** — [practitioner analysis], own blog, 2025-06-23. Context-offloading / scratchpad synthesis; balloon-cost framing.
5. **Drew Breunig** — [practitioner direct], own blog (dbreunig.com), 2025-06-26. NEW this sweep. "Context Offloading is the act of storing information outside the LLM's context"; "Every token in the context influences the model's behavior, for better or worse." This is the actual primary that Sweep 1's "Simon Willison" lead pointed at (see back-sweep).
6. **Armin Ronacher** — [practitioner direct], own blog, 2025-06-12. Flailing-reduction side; not a memory-gap-as-token-cost citation (Sweep 1 was right to hold him as context).
7. **Harper Reed** — [practitioner direct], own dotfiles CLAUDE.md + blog. Supporting: "keeping small context, using the file system as a powerful tool rather than dumping large files into context." Both the write-it-down AND the keep-it-lean sides.

**Honest verdict: VERDICT = CONFIRMED-L3 on the driver's *existence and shape*** — distinct independent practitioner voices = **~5–6** (Yegge, Anthropic[1 org], Lance Martin, Breunig, Ronacher[flailing side], Harper Reed[supporting]). That clears "convergence" qualitatively but sits at the *low end* — it is L3-on-existence, **L2-per-quantified-item**, exactly as Sweep 1 said. NOT enough independent voices to claim a tight 10–20 convergence, and STILL no defensible quantified rework-token figure. Do not inflate to a number.

### Flag 1 — Simon Willison direct quote: **NOT a Willison original. Resolved by re-attribution.**
Fetched both `simonw.substack.com/p/agentic-engineering-patterns` and `simonwillison.net/tags/context-engineering/`. On the memory/offloading/plan.md theme, Willison is **curating/quoting Drew Breunig**, not authoring. The substance ("Context Offloading is the act of storing information outside the LLM's context"; plan.md and memory-tool examples) is Breunig's, dated 2025-06-26, on Breunig's own blog. → The correct load-bearing citation is **Breunig [practitioner direct]**, with Willison as [practitioner analysis] curator if cited at all. (See back-sweep.)

### Flag 2 — ETH Zurich "3%": **TRACED TO PRIMARY. Was [UNVERIFIED STAT]; now verified — with a material correction.**
- Primary: **arXiv 2602.11988v1**, "Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?", **Gloaguen, Mündler, Müller, Raychev, Vechev (ETH Zurich)**, Feb 2026. [academic/research].
- The "3%" is real but NARROW: it is the **LLM-generated** (e.g. `/init`-produced) context-file penalty on AGENTbench (~−3% avg; ~−0.5% on SWE-bench Lite). It is **NOT** "context files reduce success by 3%" full stop — the Medium digest Sweep 1 used (`reliabledataengineering`) overgeneralized.
- Counter-balancing figures from the SAME paper: **developer-written** files ~**+4%** on AGENTbench; ablation (strip all repo docs) → LLM-gen files **+2.7%**. All context files add **~19–23% inference cost**.
- Net reading: the study is NOT "memory files don't work." It's "**LLM-autogenerated** files that duplicate existing docs hurt; human-written, lean files help modestly; either way they raise cost." That actually *supports* the bidirectional nuance, not the "write it down always wins" strawman.

## Counter-evidence (incl. CLAUDE.md-bloat)

The honest counter to "just write it down" is now well-sourced — memory files are themselves always-loaded weight:

- **Thomas Wiegold** — [practitioner direct], own blog, 2026-03-09, "CLAUDE.md: Helpful or Just Expensive Noise?". FRESH (within 6mo). AI/full-stack engineer, 14yr. "Every line you add doesn't just compete with your other CLAUDE.md rules—it competes with Claude Code's core behavioural programming." / "a bloated 300-line CLAUDE.md can actually make Claude *worse* at following its own built-in instructions." Frames the cost as **instruction-budget opportunity cost**, not just raw tokens — a sharper version of the nuance than Sweep 1 had.
- **ETH Zurich (arXiv 2602.11988)** — [academic/research], Feb 2026. The strongest counter-evidence: human-written lean files +4%, but auto-generated/bloated files −3% and **every** file type +~20% cost. Empirical, not anecdotal. Upgrades Sweep 1's "ETH digest, unverified" to a real citation.
- **Drew Breunig** — [practitioner direct], 2025-06-26. The discipline line: "Every token in the context influences the model's behavior, for better or worse" — don't treat context as "a junk drawer." Applies equally to a bloated CLAUDE.md.
- **Harper Reed** — [practitioner direct]. "keeping small context … rather than dumping large files into context" — the lean-file practitioner stance.
- Commercial how-tos (KDnuggets, MindStudio, buildtolaunch, Wiegold-adjacent) converge on "CLAUDE.md loads every turn; keep it ~300–600 tokens; @-include on demand" — [L0/L1], cited as direction-of-consensus only, not evidence.

**Net counter-evidence verdict:** the driver is genuinely **bidirectional and now well-attested on BOTH sides** — absence costs re-derivation (Yegge/Anthropic/Breunig), excess costs every-turn tokens + instruction-budget + (ETH) measurable success-rate drop for auto-gen files. KB should report the driver WITH this nuance, never as "more memory = strictly better."

## Back-sweep corrections

- **BACK-SWEEP NEEDED:** Sweep 1 §"What I Looked For But Did Not Find" deferred a "Simon Willison direct quote." Re-attribute: the offloading/plan.md substance is **Drew Breunig [practitioner direct], dbreunig.com, 2025-06-26**; Willison is a curator [practitioner analysis], not the source. Add Breunig as finding; demote the "need a Willison quote" follow-up to closed.
- **BACK-SWEEP NEEDED:** Sweep 1 §7 ETH Zurich figure was [UNVERIFIED STAT] via a Medium digest. Replace digest URL with primary **arXiv 2602.11988v1 [academic/research]**. Correct the claim: the −3% is the **LLM-generated**-file penalty on AGENTbench, not a blanket "context files reduce success by 3%." Add the offsetting +4% (human-written) and +2.7% (no-docs ablation) and the +~20% cost figures.
- **BACK-SWEEP NEEDED:** Sweep 1 §8 CLAUDE.md-bloat counter rested only on L0 how-tos. Upgrade: add **Thomas Wiegold [practitioner direct], 2026-03-09** and the ETH paper [academic/research] as real counter-evidence; the bloat-as-token-sink nuance is no longer L0-only.
- No change to the core verdict level: still **L3-on-existence, L2-per-quantified-item.** No number attaches.

## Freshness flags (re-check)

Within 6mo window (since 2025-12-03), i.e. CURRENT:
- Thomas Wiegold — 2026-03-09 ✅
- ETH Zurich arXiv — Feb 2026 ✅

Outside window → HISTORICAL-CONTEXT-ONLY:
- Anthropic context-engineering 2025-09-29; Anthropic harnesses 2025-11-26 (just outside); Yegge 2025-10-13; Lance Martin 2025-06-23; Breunig 2025-06-26; Ronacher 2025-06-12; Harper Reed 2025-05/12.
- Confirms Sweep 1's read: the *memory-gap* framing skews Jun–Nov 2025 and has stabilized into accepted practice; the *fresh* (2026) traffic is now on the COUNTER side (when memory files backfire) — itself a signal worth noting in the KB.

## Byline re-check (load-bearing URLs)

- Yegge — own Medium ✅ [practitioner direct]
- Anthropic ×2 — own engineering venue ✅ [practitioner direct]
- Lance Martin — own blog ✅ [practitioner analysis] (synthesis)
- Breunig — own blog ✅ [practitioner direct] (NOT Willison)
- Wiegold — own blog, named engineer ✅ [practitioner direct]
- ETH Zurich — arXiv primary, 5 named authors ✅ [academic/research]
- engineerscodex / reliabledataengineering Medium — write-ups *about* the ETH paper → [general press / digest], use primary instead.

## Orientation

Sweep 1's core read survives confirmation and gets sharper. The driver is real and reports at **L3 on existence/shape** — but on the low end of convergence (~5–6 distinct independent voices), and with **no quantified rework-token figure** that can be defended. Two open flags are now closed: the "Willison quote" was actually Breunig (re-attributed, [practitioner direct]); the "ETH 3%" is traced to arXiv 2602.11988 and corrected (it's the LLM-*generated*-file penalty, offset by +4% for human-written and +2.7% in the no-docs ablation, all at +~20% cost). The honest counter — CLAUDE.md/AGENTS.md bloat as its own token + instruction-budget + success-rate sink — is now backed by a practitioner (Wiegold, fresh) AND a peer-style academic study (ETH), not just L0 how-tos. KB framing for the driver: **bidirectional** — absence costs re-derivation/re-reading; excess costs every-turn tokens and can measurably lower success for auto-generated files. The freshest 2026 signal has migrated from "write it down" to "watch what you write down," which is the maturation tell. Report the driver; attach the nuance; attach no number.
