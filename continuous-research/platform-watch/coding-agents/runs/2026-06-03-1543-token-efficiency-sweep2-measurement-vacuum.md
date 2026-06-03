---
type: run-log
domain: coding
evidence_level: L2-L3 (anecdotal field numbers + one genuine before/after; org-level claim unsourced)
platforms: [anthropic, coding-agents]
nordic: false
updated: 2026-06-03
cycle: token-eff-s2
---

# Token / context efficiency in agentic coding — Sweep 2: hunting the measurement vacuum

**Mission:** Sweep 1 found that every hard number in this space is synthetic or benchmark — NO team has published a real before/after token/cost scoreboard despite the tooling (ccusage, ccstatusline) existing. This sweep either finds the field numbers or confirms the absence rigorously.

**Verdict: The vacuum is REAL, with three documented exceptions — none of which is the thing Sweep 1 said is missing.** The missing artifact is specifically: *a named engineering team publishing a controlled before/after token/$ delta from a deliberate context-discipline change on a real coding project, with methodology.* That artifact still does not exist after an aggressive disproof attempt. What DOES exist: (a) scattered individual ccusage-derived bills posted in comment threads (L2 anecdote, no controlled change), (b) one genuine before/after with cache-hit-rate from an autonomous-agent product that is *adjacent* to coding, not coding, and (c) a vendor-internal operational KPI disclosure (cache-hit-rate as a SEV). The scoreboard for *coding teams* is empty.

---

## FINDINGS (what I DID find)

### F1 — Anthropic treats prompt cache-hit-rate as an operational KPI with SEV-level alerting [practitioner direct, L1/vendor-internal]
- **Who:** Thariq Shafi, Claude Code engineer at Anthropic.
- **URL (primary):** X post `https://x.com/...status/2024574133011673516` (referenced by implicator.ai; original is Shafi's own X thread, ~mid-May 2026). Secondary write-ups: `https://www.implicator.ai/anthropic-says-cache-misses-are-production-incidents-reveals-caching-shaped-claude-code/` (dated 2026-02-20 per page — but the 300M-tokens framing is republished 2026-05-23 by KuCoin: `https://www.kucoin.com/news/flash/anthropic-engineer-shares-claude-code-cache-tips-to-save-300m-tokens-weekly`). **Note date conflict — see caveat.**
- **What:** Shafi states Anthropic "builds our entire harness around prompt caching" and monitors prompt cache hit rate such that "if it drops too low, it triggers an alert — even a SEV-level incident." Republished figures: ~300M tokens saved weekly via caching; "91 million cached tokens are billed at approximately the equivalent of 9 million tokens" (the 10x cache discount).
- **Evidence:** L1 practitioner-direct opinion/disclosure (it's the vendor describing its own internal practice — useful as the ONLY concrete statement of cache-hit-rate-as-KPI, but it is vendor-self-reported and carries no published target number).
- **Exact verifiable claims:** cache-hit-rate is alerted on; a low value is SEV-class. **No specific target % is stated by Shafi** in any source I reached. The widely-circulated "treat anything below 90% as SEV" and "two-point drop triggers a pager" figures (e.g. agentsroom.dev, towardsai) are **aggregator embellishments I could NOT trace to Shafi's own words** — mark [UNVERIFIED STAT].
- **Flag:** vendor-self-reported. The KPI *practice* is the finding; the specific threshold is not substantiated.
- **Caveat:** implicator.ai page reads "2026-02-20" but references the 300M framing that KuCoin republished 2026-05-23 — likely a stale page date or a re-up. Within 6-month window either way.

### F2 — ProjectDiscovery: a GENUINE before/after with cache-hit-rate — but autonomous-agent product, NOT coding agent [practitioner direct, L2 single-case]
- **Who:** ProjectDiscovery (Parth Malhotra et al.), on their product "Neo" — an autonomous *security-testing* multi-agent system.
- **URL:** `https://projectdiscovery.io/blog/how-we-cut-llm-cost-with-prompt-caching` (published 2026-04-10).
- **What:** Real own-product before/after from deliberately re-architecting cache breakpoints (static system prompt BP1 1h TTL, tool defs BP3, sliding-window conversation BP2 5m TTL; the "relocation trick" — moving dynamic content outside the cacheable prefix — was the single biggest lever).
- **Evidence:** L2 single-case, but it is the **closest thing to the missing scoreboard** — real product, real numbers, real methodology, named author.
- **Exact verifiable claims (DIRECT NUMBERS):**
  - Cache hit rate **7% → 84%**.
  - Cost: "baseline −59%" overall; "−66%" since Feb 16; "−70%" last 10 days.
  - One task: **67.5M tokens across 1,225 steps at 91.8% cache rate**, vs a comparable **66.8M-token task at 3.2% cache rate** before — "~60x cost difference" on that task.
- **Flag:** Self-reported (own product). **Domain adjacency caveat: this is autonomous security testing, not coding-agent spend.** Mechanically identical (long agent loops, prompt caching, breakpoint placement), so it's a strong *analog* — but it is NOT a coding team's scoreboard. Cite as cross-domain analog, label clearly.

### F3 — Pragmatic Engineer 2026 AI-tooling survey: real survey field data, but per-tool spend buckets, not before/after [practitioner analysis, L3]
- **Who:** Gergely Orosz, The Pragmatic Engineer (survey of software engineers + leaders).
- **URL:** `https://newsletter.pragmaticengineer.com/p/the-impact-of-ai-on-software-engineers-2026`
- **What:** Self-reported survey, **900+ responses**. Strongest *independent* field dataset on real spend, but it's distributional, not a controlled before/after.
- **Evidence:** L3 convergence (survey of many practitioners) — but self-reported perceived spend, not audited token logs.
- **Exact verifiable claims:** Company-funded Max plans ~$100–200/mo per engineer; some companies budget only $20/mo; one CPTO: "I ran up several monthly bills of $600 with Cursor"; **~30% of respondents reported hitting usage limits** (majority on $20 plans). Claude Code dominates tool usage; staff+ engineers are the heaviest agent users.
- **Flag:** Self-reported survey. **No Uber-specific data in this article** (despite aggregators attributing Uber numbers to Pragmatic Engineer — see F4).

### F4 — Uber org-level spend ($500–$2,000/engineer/mo; whole 2026 AI budget in 4 months) — REAL claim, but I could NOT reach a primary source [tech press / aggregator → UNVERIFIED at primary]
- **URLs checked:** `https://www.briefs.co/news/uber-torches-entire-2026-ai-budget-on-claude-code-in-four-months/` (2026-04-17), `https://news.ycombinator.com/item?id=47976415` (HN thread). Also humai.blog, byteiota, ai2.work.
- **What aggregators claim:** Adoption 32%→84% of ~5,000 engineers (Dec 2025→Mar 2026); per-engineer $500–$2,000/mo; "70% of committed code from AI"; entire 2026 AI budget exhausted in 4 months; CTO Praveen Neppalli Naga cited.
- **Evidence problem:** **briefs.co names no CTO, links no Forbes piece, cites no earnings call.** The "$3.4B budget" number appears only on byteiota. HN thread does NOT surface the primary source either. The Pragmatic Engineer survey (the most likely real origin of the adoption %s) does NOT contain the Uber per-engineer $ figures (F3). **Treat the per-engineer $500–$2,000 and $3.4B as [UNVERIFIED STAT] until a primary (Forbes/CTO/earnings) is located.** The *adoption-%* trajectory is plausibly Pragmatic-Engineer-derived; the *dollar* figures are not traced.
- **Flag:** Republished PR / aggregator chain (L0 for the dollar figures). Genuinely strong IF sourced — worth a targeted follow-up to find the Forbes/CTO primary.

### F5 — Individual ccusage-derived bills posted in the wild [practitioner direct, L2 anecdote × several]
HN thread `https://news.ycombinator.com/item?id=47976415` — engineers posting their OWN numbers, tool-attributed:
- **adastra22:** "$450/day for the last week"; estimates "$2k–$4k at API prices" monthly on subscription. **Methodology stated: checked via `ccusage`.** ← the cleanest "real person + real tool + real number."
- **jfrbfbreudh:** "$3k/month" effective value on Claude Max (subsidized), running "3–6 agents simultaneously on the same feature."
- **bostik:** "$1–$5 daily" for email/analysis; "$25/day" during deep refactor (enterprise contract).
- **Evidence:** L2 anecdote each — real, tool-grounded, but NO controlled before/after and NO context-discipline change measured. Useful as "this is what daily agentic spend actually looks like," labeled single-case.
- Separately, Luong Nguyen (`https://medium.com/@luongnv89/...9ec4e6932d6e`, Apr 2026): debugged a cache spike — one prompt = "9% of session budget"; iteration 165 recreated 350k tokens / 350,901 cache reads. Tools: Custats + context-stats. **No before/after hit-rate %, no target.** Visibility win, not a scoreboard.

### F6 — Tooling baseline (context, not evidence)
- **ccusage** (ryoppippi): `https://github.com/ryoppippi/ccusage` — 15.5k stars, last release v20.0.6 2026-05-29. Reports cost in USD + cache-creation/cache-read tokens **separately, but does NOT compute a cache-hit-rate metric.** This is itself a notable gap: the tool everyone cites does not surface the very KPI Anthropic alerts on.
- **arXiv 2509.14744** "On the Use of Agentic Coding Manifests: An Empirical Study of Claude Code" (2025-09-19) — empirical CLAUDE.md study, but PDF body not text-extractable in this run; appears to analyze manifest *structure* (header counts), not token-cost before/after. [academic/research] — flagged for a dedicated fetch, but predates the 6-month window's center and likely does not carry $ deltas.

---

## WHAT I LOOKED FOR BUT DID NOT FIND (the defensible absence)

The specific missing artifact — **a named engineering team publishing a controlled before/after token/$ delta from a deliberate coding-context-discipline change (added subagents / moved CLAUDE.md → skills / switched model tier) on a real coding project, with methodology** — was NOT found. Disproof attempts and the empty venues:

1. **Subagent before/after, dollars-measured, coding:** Direct search returned ZERO team case studies. Search engine itself volunteered "the search results don't contain a blog post with a specific before/after measured-in-dollars case study about cutting costs in half with subagents." Aggregators only restate the generic "subagents can use ~7x tokens" and "use when saved clutter > startup overhead" heuristics — no measured project.
2. **"Cut my cost in half" posts (Samuel Lawrentz, Medium "50% with one file"):** Qualitative claims only. Lawrentz "roughly in half" — **no before/after token counts, no $ figures, no methodology** despite recommending weekly dashboard checks. The "one file" Medium piece is the same shape.
3. **Engineering-org blogs (Intercom, Ramp, Sourcegraph/Amp):** No first-party coding-agent spend-per-dev / spend-per-PR disclosure with methodology found in this sweep. The only org-blog before/after located (ProjectDiscovery, F2) is an autonomous-agent product, not coding.
4. **Cache-hit-rate as a tracked KPI with a published target on a real coding team:** Only Anthropic's own internal practice (F1, vendor) and ProjectDiscovery's own product (F2, non-coding). **No independent coding team published a target + actual.** And the dominant tool (ccusage, F6) doesn't even compute hit-rate.
5. **"Real bill breakdown" listicles (FindSkill, CloudZero, Finout, Verdent, SSDNodes):** All explicitly hypothetical/worked-example. FindSkill states outright: "The worked numbers above are realistic ranges, not a quote." No `/cost` output, no API logs, no named individual's itemized bill.
6. **Vantage / getDX cost-per-PR content:** Frameworks for HOW to compute cost-per-merged-PR (GitHub API for PR count ÷ attributed spend) — but the worked tables use named-as-hypothetical "Developer A spends $1,200 / 38 PRs." **Method without a single published result.**
7. **Reddit r/ClaudeAI ccusage screenshots:** Search returned no indexable results for posted screenshots with monthly token + cache-hit numbers (US-only WebSearch limitation; not a hard absence — flag for a manual Reddit pass).

**Headline for synthesis:** The field has *converged on the instruments* (ccusage 15.5k stars, ccstatusline, cache breakpoints) and even on the *KPI* (cache hit rate) — but the *scoreboard for coding teams is empty*. The richest real numbers are (a) Anthropic talking about its own internals, (b) an adjacent autonomous-agent product, and (c) individuals venting daily bills in HN comments. Nobody has published the controlled coding before/after. **A confirmed, well-bounded absence — and itself the most publishable finding: "Everyone measures; nobody reports."**

---

## Source verification
- F1 Shafi X post: [checked:2026-06-03 result:PARTIAL — secondary write-ups reached; primary X status referenced but not opened directly due:2026-09-03] — primary X fetch + exact-quote pull is the open item.
- F2 ProjectDiscovery: [checked:2026-06-03 result:OK due:2026-09-03]
- F3 Pragmatic Engineer: [checked:2026-06-03 result:OK (paywall-partial) due:2026-09-03]
- F4 Uber dollar figures: [checked:2026-06-03 result:UNVERIFIED-AT-PRIMARY — aggregator chain only; Forbes/CTO primary not located due:2026-07-03] — high-value follow-up.
- F5 HN bills: [checked:2026-06-03 result:OK due:2026-09-03]
- F6 ccusage repo: [checked:2026-06-03 result:OK due:2026-09-03]

## Follow-ups for next cycle
1. Open Shafi's X thread directly; pull the exact-quote target % (if any) — kills/confirms the "90% SEV" zombie.
2. Find the Uber primary (Forbes / earnings / CTO talk) — converts F4 from L0 to citable.
3. Manual Reddit r/ClaudeAI + r/Anthropic pass for posted ccusage screenshots (WebSearch can't index these).
4. Decompress arXiv 2509.14744 to confirm whether it carries any token-cost deltas.
5. The publishable angle: pitch/seed the missing artifact — a real Bosser-or-partner coding before/after with ccusage + a hit-rate computation. The gap is an IP opportunity, not just a research note.
