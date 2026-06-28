---
type: finding
domain: cross-domain
evidence_level: 3
platforms: [coding-agents]
practitioners: [METR, "Denisov-Blanch (Stanford)", "Noda (DX)", "Orosz (Pragmatic Engineer)", "Raad (OpenCode)", "Mathews (Electric SQL)", "Conn (Connsulting)", "Faros AI", DORA, "Challapally (MIT NANDA)"]
nordic: false
updated: 2026-06-25
answers:
  - "does a 2X coding productivity gain compound to 4X or 8X, or does it plateau?"
  - "why is the second 2X harder than the first?"
  - "is the perceived AI productivity gain larger than the measured one?"
  - "what is the structural ceiling on AI delivery speedup (Amdahl / Little's Law)?"
  - "do more PRs / more code convert to more shipped business value?"
  - "is '95% of AI projects fail' a real statistic?"
---

# The Ceiling & Counter-Evidence — Why the Second 2X Is Harder Than the First

**Evidence level:** Level 3 (10+ independent sources converge: measurement illusion + structural ceiling + output≠outcome) | **Last updated:** 2026-06-25 | **Skeptic brief.** Job: refute the optimistic "4–8X" story. Extends `findings/by-pattern/absorption-bottleneck.md` (the absorption finding is the *mechanism*; this file is the *math of the ceiling* a builder leader needs to defend a 2X-honest number against a 4–8X deck).

Companion files in this batch carry the upside case. This file carries only the counter-evidence: where the multipliers come from measurement error, where the structural ceiling sits, and why the first doubling does not predict the second.

---

## 1. THE METR RCT — the single strongest "perceived vs. actual" datapoint

**Claim:** Experienced developers using early-2025 AI tools took **19% LONGER** to complete real tasks — while believing they had been sped up by 20%.
**URL:** https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ · paper https://arxiv.org/abs/2507.09089
**Label:** [academic/research] — RCT, the gold-standard design; METR is an independent non-profit, not a vendor.
**Date:** 2025-07-10. **Historical — cite explicitly dated** (~mid-2025; see "what's changed" below).
**Level:** L2 as a single experiment, but methodologically the strongest single datapoint in the whole debate (randomized, real tasks, measured not self-reported).
**Methodology:** 16 experienced open-source developers, 246 real issues on their OWN mature repos (avg 22k+ stars, 1M+ lines, contributed for years). Tasks ~2h each. Tools: Cursor Pro + Claude 3.5/3.7 Sonnet (frontier at the time). Randomized AI-allowed vs AI-disallowed per task; time measured directly.

**The perception gap — the load-bearing number:**
- Before: developers expected AI to speed them up **24%**.
- Forecasters/ML experts predicted speedups too.
- Actual: **19% slowdown**.
- After experiencing it: developers STILL believed AI had sped them up **~20%**.

A ~39-point gap between perceived (+20%) and measured (−19%) productivity, *persisting after the fact*. This is the empirical anchor for "your honest 2X self-report is itself suspect — measure it."

**Caveats METR states (cite these, don't oversell):** authors explicitly "do not claim our developers or repositories represent a majority of software work." The slowdown is specific to *experts on codebases they know cold*, where AI's value-add is smallest and the cost of reviewing/correcting its output is highest. Does NOT generalize to juniors or unfamiliar codebases — where gains are real.

**What's changed since (~12 months):** Models are stronger (this was 3.5/3.7 Sonnet; harness + agentic loops have improved materially since). The headline number would likely be smaller today. But the *direction* — measured < perceived, and worst on expert/brownfield work — is the durable finding, and it is independently reproduced by the perceived-vs-actual and brownfield evidence below. Use METR as the *mechanism proof*, dated; do not present "−19%" as a current figure.

---

## 2. PERCEIVED-VS-ACTUAL GAP — self-report inflates measured gains

**Claim (DX / Abi Noda):** Time AI saves in code *generation* is largely re-spent downstream on review, fact-checking and remediation → **net-zero** for many developers. Measured median lift ~10%, far below headline claims.
**URL:** https://getdx.com/blog/why-arent-ai-productivity-gains-higher/ (Noda, 2026-03-19) · DORA discussion https://newsletter.getdx.com/p/doras-2025-research-on-the-impact
**Label:** [practitioner analysis] — DX builds developer-productivity measurement for engineering orgs; qualitative interviews across many companies (no single N stated).
**Date:** 2026-03-19 (current). **Level:** L2→L3 (converges with METR + Faros + Stanford).
**Methodology note:** Thematic interviews, not an RCT. Noda's own framing of METR: developers "feel the magic of these AI tools and conflate that with actual time savings." His prescription — cross-validate self-report against telemetry/systems data — exists *because* the two diverge.

**Claim (Stanford, Denisov-Blanch):** Median measured productivity lift from AI is **~15–20%** (some cuts ~10–15%), "much lower than widely cited numbers like the 60% gains in early industry studies."
**URL:** https://www.yegordb.com/ · talk https://getcoai.com/video/does-ai-actually-boost-developer-productivity-100k-devs-study-yegor-denisov-blanch-stanford/ · summary https://www.aviator.co/podcast/ai-developer-productivity-stanford-study
**Label:** [academic/research] — Stanford; ~100,000 engineers across 600+ companies; expert-panel code evaluation (complexity/maintainability) used to train ML models that score real diffs, *not* commits/LOC. The strongest methodology against the "count more PRs = more productivity" illusion. *Source caveat:* figures are from Denisov-Blanch's talks/podcast appearances (yegordb.com, conference video, podcast write-up) — no peer-reviewed primary paper is public yet; treat as a single large research program, not 10+ independents.
**Date:** ongoing through 2025–2026. **Level:** L2 (one study, however large — it contributes to the file-level L3 convergence, but is not itself L3).

**Together:** Three independent measurement shops (METR experimental, DX qualitative+telemetry, Stanford expert-panel-at-scale) all land in the same place — *real* gains are a fraction of *claimed* gains, and self-report is the inflation source. The "4–8X" deck number is almost certainly a perceived/self-reported figure, or a narrow greenfield slice (see §3), not a measured end-to-end delivery figure.

---

## 3. STRUCTURAL CEILING — Amdahl / Little's Law caps delivery speedup regardless of model

**Claim (the keystone fraction):** Coding is only **~16% of a developer's time** (Microsoft research, *cited by* DX — original Microsoft study not opened here; secondary citation, verify before headlining). Even infinite coding speed cannot move the other ~84%.
**URL:** https://getdx.com/blog/why-arent-ai-productivity-gains-higher/
**Label:** [practitioner analysis] citing Microsoft research. **Date:** 2026-03-19. **Level:** L2 (single fraction, secondary-cited, but it sets the Amdahl bound). The Amdahl *argument* holds at any plausible coding fraction; the exact 16% is the soft point.

**Claim (Amdahl math, made explicit):** Max speedup = **1/H**, where H = fraction of the workflow needing human judgment. 50% human → 2x ceiling; 30% → 3.3x; 20% → 5x; 10% → 10x. "When an agent takes 30 seconds and you still spend 30 minutes reviewing, suddenly YOU are the bottleneck."
**URL:** https://electric.ax/blog/2026/02/19/amdahls-law-for-ai-agents (Kyle Mathews, Electric SQL CTO)
**Label:** [practitioner direct]. **Date:** 2026-02-19. **Level:** L2 (formal model, not measured at scale, but mechanically sound — it's Amdahl's Law, undisputed).
**Why it bites the 8X deck:** To get an 8X *delivery* speedup you need H ≤ 12.5% — i.e. ≤12.5% of the end-to-end cycle can be human review/decision/coordination/deploy. With coding at ~16% of time and review *growing* under AI (§4), real-world H is nowhere near that low. The 8X is arithmetically unreachable through coding acceleration alone.

**Claim (bottleneck-relocation):** "Speed up one stage in a constrained system, and the bottleneck moves." Faster code generation congests review/test/deploy rather than speeding delivery.
**URL:** https://www.connsulting.io/blog/amdahls-law (Brian Conn, 2026-05-26)
**Label:** [practitioner analysis]. **Date:** 2026-05-26. **Level:** L2.

**Claim (decision-making is the true serial fraction):** "Even with AI agents, the daily bottleneck is still deciding what you should do, not doing it." — Dax Raad (OpenCode co-founder), surfaced by Gergely Orosz.
**URL:** https://x.com/GergelyOrosz/status/2060379273689526727
**Label:** [practitioner direct]. **Date:** 2026 (current). **Level:** L1 (named-practitioner opinion, but it names the H term Amdahl predicts).

This is Little's Law / Amdahl stated four independent ways: the part AI accelerates was never the dominant term. The first 2X harvested the coding fraction; the next 2X must come from review, verification, coordination and decision-making — which AI *worsens* before it helps (§4).

---

## 4. OUTPUT-VS-OUTCOME GAP — more PRs ≠ more shipped value

**Claim (Faros AI — the keystone "evaporation" datapoint):** Individual output explodes but **"No significant correlation between AI adoption and improvements at the company level"** — gains "evaporate at the company level."
**Numbers (10,000+ developers, 1,255 teams):** +98% PRs merged, +47% PRs/day, +21% tasks completed — BUT **+91% PR review time**, +154% PR size, +9% bugs/developer.
**URL:** https://www.faros.ai/blog/ai-software-engineering
**Label:** [practitioner analysis] — large telemetry dataset, but vendor-adjacent (Faros sells engineering-intelligence). **Date:** 2025-07-23 (~11 months old — past the 6-month freshness line; carried as dated corroboration, not fresh primary; the fresher DORA 2025 + CircleCI 2026 + DX 2026 do the load-bearing work). **Level:** L2 (one telemetry study — contributes to file-level L3 convergence, not L3 alone).

**Claim (DORA 2025):** "AI does not fix systems; it intensifies what already exists." "Increased code volume without improved review systems slows overall throughput." Code review becomes the dominant bottleneck. The four key DORA metrics measure delivery *outcomes*, and AI adoption does not lift them on its own.
**URL:** https://dora.dev/research/2025/dora-report/ · discussion https://newsletter.getdx.com/p/doras-2025-research-on-the-impact (2025-11-21)
**Label:** [academic/research] (DORA program). **Date:** 2025 report. **Level:** L3.

**Claim (CircleCI 2026, already in absorption-bottleneck.md — restated as outcome evidence):** +59% workflow runs (generation up) but −7% median main-branch throughput (delivery DOWN) and 70.8% success rate (5-yr low). Only 1 in 20 teams scaled both generation and delivery.
**URL:** https://circleci.com/blog/five-takeaways-2026-software-delivery-report/ · critique https://blog.robbowley.net/2026/04/02/...
**Label:** [domain trade publication] — CircleCI's own platform report (vendor-published telemetry; the descriptive 8M-PR dataset is the value, not CircleCI's framing of it). Bowley's "95% of teams" is his round-number restatement of CircleCI's "1 in 20" — directionally fair, but a vendor-report-derived round number, not an independent measurement. **Date:** 2026. **Level:** L2 (one platform dataset; convergence with Faros/DORA/DX is what makes the cluster L3).

**Convergence:** Four independent datasets (Faros telemetry, DORA program research, CircleCI platform-scale, DX interviews) agree: throughput of *output* rises sharply; throughput of *delivered value* does not, and main-branch delivery can go *negative*. The PR count — the very metric the deck's "2X" likely rests on — is the metric most inflated and least correlated with outcome.

---

## 5. ZOMBIE-STAT HYGIENE — do NOT propagate "95% fail"

**Claim under audit:** "95% of AI projects/pilots fail."
**Trace:** MIT NANDA, "The GenAI Divide: State of AI in Business 2025," lead Aditya Challapally. Reported by Fortune 2025-08-18 (https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/).
**Methodology reality:** 150 leader interviews + 350 employee surveys + 300 public deployments — but the **"zero return" / 95% figure rests on ~52 interviews**, which the report itself calls only "directionally accurate based on individual interviews rather than official company reporting." "Failure" = "no measurable P&L impact / didn't reach rapid revenue acceleration" — excludes efficiency gains, cost reduction, churn, etc.
**Verdict: ZOMBIE STAT.** Round number, tiny effective N (≈52), self-admitted directional, narrow failure definition. **Do not cite as evidence.** It is *also* an enterprise-pilot statistic, not a coding-productivity statistic — irrelevant to the "does 2X compound" question even if it were sound. Note: Bowley's "95% of teams" (absorption-bottleneck.md) is a *different, well-sourced* number (CircleCI, 8M+ PRs — teams failing to scale both gen+delivery); keep them separate, do not let the zombie borrow the real one's credibility.

---

## WHY THE SECOND 2X IS HARDER THAN THE FIRST — synthesis

The first 2X is real and cheap: it harvests the coding fraction — the ~16% of cycle time spent typing code, the part AI accelerates most and where review cost is lowest. That doubling shows up in PR throughput because PR *creation* is exactly what got faster. The second 2X is not on the same curve. By Amdahl's Law the ceiling is 1/H, and H — review, verification, decision-making, coordination, deployment — is now the dominant term *and is growing*: Faros measures +91% review time and zero company-level correlation; CircleCI measures −7% delivery throughput against +59% generation; DORA finds AI "intensifies what already exists" rather than lifting delivery; Stanford finds the gains collapse from 30–40% on greenfield boilerplate to 0–10% on the high-complexity brownfield work that is most of real engineering. The METR RCT supplies the mechanism for why builders *believe* otherwise: a measured 19% slowdown experienced as a 20% speedup — a ~39-point perception gap that survives the experience. So the honest answer to "does 2X compound to 8X?" is: **no, not from coding acceleration.** The first doubling drains the one fast pool; each further doubling must come from the slow human pool, where AI currently *adds* load (more code, bigger PRs, more bugs to review) before it removes any. 8X delivery requires H ≤ 12.5% — review/decision/coordination compressed to one-eighth of the cycle — which no measured organization has reached and which more code, reviewed by the same humans, moves *away from*, not toward. The plateau is structural, not a tooling gap: the next gain has to be *engineered* (agent-reviews-agent, scalar-metric constraints, spec-driven generation, tiered review — see absorption-bottleneck.md §"What Actually Works"), bought deliberately at the review/verification layer, and *measured against delivery outcomes rather than PR counts* — because PR count is the one number that already doubled and the one least correlated with shipped value.
