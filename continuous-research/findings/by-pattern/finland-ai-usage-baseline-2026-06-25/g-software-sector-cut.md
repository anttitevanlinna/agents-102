---
type: finding
domain: ai-adoption-baseline
evidence_level: 3
scope: "Software / ICT (NACE-J) sector-specific AI-adoption cut — the honest denominator for a software-company audience, vs the misleading 38% all-sector average"
parent_thread: "finland-ai-usage-baseline-2026-06-25 (a-finnish-official-statistics.md established 38%/37.8% all-enterprise)"
run_date: 2026-06-25
freshness_cutoff: 2025-12-25
answers:
  - "What % of SOFTWARE / ICT / 'Information and communication' (NACE-J) enterprises use AI, in Finland vs EU-27 vs US?"
  - "What is the honest number to put on a slide aimed at software companies, instead of the 38% all-sector average?"
  - "In software/ICT firms specifically, does the 'it's just chat' collapse hold, or does this one sector break it (deeper integration, coding agents)?"
---

# G — The Software / ICT Sector Cut (NACE-J): the honest number is ~80%, not 38%

**Why this fragment exists:** the parent thread pinned the all-enterprise headline at **38% (Statistics Finland) / 37.8% (Eurostat)** — but that is a *cross-sector average*, dragged down by construction (24%), transport (13%) and hospitality (24%). The maintainer (a builder leader at a software company) correctly flagged that this is far too low for software firms. It is. The sector-specific cell is roughly **double** the all-sector average.

**One-line verdict:** In Finland, **~80% of "Information and communication" (NACE-J — the sector that contains software/IT services) enterprises used AI in spring 2025** — confirmed two ways: **79.79%** (Eurostat harmonised, indicator `E_AI_TANY`) and **80%** (Statistics Finland's own release). The honest software-company denominator is **8 in 10**, not 4 in 10. (Level: official statistics — definitional, above the L0–L4 commercial ladder.)

---

## (a) Sector-cut table

NACE Section **J = "Information and communication"** is the standard statistical home for software publishers, IT/computer-services, telecoms and data/hosting (sub-classes J62_J63 = computer programming, consultancy and information-service activities — i.e. software firms). It is the single top-adopting sector in every release below.

| Geography | Sector (NACE / label) | % using AI | vs all-sector avg | Year | Definition (short) | URL | Label |
|---|---|---|---|---|---|---|---|
| **Finland** | **Information & communication (NACE J)** | **79.79%** | all-FI **37.8%** → **+42 pp / 2.1×** | 2025 | enterprise used ≥1 of 8 listed AI technologies; 10+ persons employed | [isoc_eb_ain2 API, E_AI_TANY, nace_r2=J](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ain2?format=JSON&time=2025&unit=PC_ENT&nace_r2=J&indic_is=E_AI_TANY&geo=FI) | [official statistics] |
| **Finland** | **Information & communication** *(national release, same survey)* | **80%** | all-FI **38%** → **+42 pp / 2.1×** | spring 2025 | same definition; "tekoälyteknologioita käytti 80 % informaation ja viestinnän toimialan yrityksistä" | [stat.fi (FI)](https://stat.fi/julkaisu/cm1hnps701dbm07w59uo0jw6u) · [stat.fi (EN)](https://stat.fi/en/publication/cm1hnps701dbm07w59uo0jw6u) | [official statistics] |
| Finland | Professional, scientific & technical (NACE M) | **74.75%** (national: **75%**) | +37 pp / 2.0× | 2025 | same | [isoc_eb_ain2 API, nace_r2=M, FI](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ain2?format=JSON&time=2025&unit=PC_ENT&nace_r2=M&indic_is=E_AI_TANY&geo=FI) · [stat.fi](https://stat.fi/julkaisu/cm1hnps701dbm07w59uo0jw6u) | [official statistics] |
| **EU-27** | **Information & communication (NACE J)** | **62.52%** | all-EU **20.0%** → **+42 pp / 3.1×** | 2025 | same | [Eurostat Statistics Explained](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Use_of_artificial_intelligence_in_enterprises) · [isoc_eb_ain2 API, nace_r2=J, EU27](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ain2?format=JSON&time=2025&unit=PC_ENT&nace_r2=J&indic_is=E_AI_TANY&geo=EU27_2020) | [official statistics] |
| EU-27 | Professional, scientific & technical (NACE M) | **40.43%** | +20 pp / 2.0× | 2025 | same | [Eurostat Statistics Explained](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Use_of_artificial_intelligence_in_enterprises) | [official statistics] |
| Sweden | Information & communication (NACE J) | **87.87%** | (all-SE 35.0%) → 2.5× | 2025 | same | [isoc_eb_ain2 API, nace_r2=J, SE](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ain2?format=JSON&time=2025&unit=PC_ENT&nace_r2=J&indic_is=E_AI_TANY&geo=SE) | [official statistics] |
| Denmark | Information & communication (NACE J) | **79.08%** | (all-DK 42.0%) → 1.9× | 2025 | same | [isoc_eb_ain2 API, nace_r2=J, DK](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ain2?format=JSON&time=2025&unit=PC_ENT&nace_r2=J&indic_is=E_AI_TANY&geo=DK) | [official statistics] |
| **US** | **Information sector (NAICS 51)** — *all firms in sector* | **39.7%** | all-US ~19.8% → 2.0× | May 2026 (BTOS) | "used AI in any business function," last 2 wks; all firm sizes | [Census story, May 2026](https://www.census.gov/library/stories/2026/05/ai-use-businesses.html) | [official statistics] |
| US | **Very large** firms in Information / Professional / Finance | **50–60%** (60–70% employment-weighted) | vs 18% all-firm / 32% emp-wtd | Nov 2025–Jan 2026 | "used AI in a business function"; 2026 BTOS AI supplement | [Census WP CES-26-25](https://www.census.gov/library/working-papers/2026/adrm/CES-WP-26-25.html) | [academic/research] |

**Size-class context (all-sector, not J-only — the cross-tab of NACE-J × size is not published in the fetchable table):**
- EU-27 by size: small (10–49) **17%**, medium (50–249) **30.4%**, large (250+) **55.0%** — [Eurostat Statistics Explained](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Use_of_artificial_intelligence_in_enterprises), [official statistics].
- Finland: **68%** of enterprises with **100+** persons employed used AI — [stat.fi](https://stat.fi/julkaisu/cm1hnps701dbm07w59uo0jw6u), [official statistics].
- Implication (inference, not a published cell): a *large Finnish software firm* sits at the intersection of the two highest-adoption strata (NACE-J **80%** × large-firm **68%**), so its true rate is **at or above 80%** — i.e. AI use is effectively universal among large Finnish software companies. Flagged as inference because Eurostat does not publish the J×250+ cross-tab in the fetchable surface.

---

## (b) The headline replacement

> **The honest number for software companies is ~80%, not 38%.**
> 38% is the *all-sector* Finnish average — it averages software in with construction, transport and hospitality, which is why it is useless on a slide aimed at software firms. The sector-specific figure for **Information & communication (the software/IT sector) is 80%** in Finland — and it survives the strongest sourcing test available, because **two independent extractions of the same official survey agree**: Eurostat's harmonised cell reads **79.79%** and Statistics Finland's own release reads **80%**. For the EU-27 as a whole the software-sector figure is **62.52%** (vs 20% all-sector). In plain terms: **four in five Finnish software firms — and roughly six in ten across the EU — already touch AI.** Among *large* software firms it is effectively universal.

**Strongest single citation to put under the slide:** Statistics Finland, *Use of IT in enterprises 2025* — "80% of enterprises in information and communication used AI technologies" ([stat.fi](https://stat.fi/julkaisu/cm1hnps701dbm07w59uo0jw6u)), cross-checked against the Eurostat harmonised cell **79.79%** ([isoc_eb_ain2](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ain2?format=JSON&time=2025&unit=PC_ENT&nace_r2=J&indic_is=E_AI_TANY&geo=FI)). Both [official statistics].

**The framing caveat that keeps it honest:** 80% is the *same low-bar denominator* as the 38% — "used ≥1 of 8 AI technologies, self-reported, no intensity threshold." So the move from 38%→80% changes the *audience-appropriate base rate*, **not** the definition. It says "almost every software firm has touched AI," not "almost every software firm runs integrated/agentic AI." The depth question is §(c) — and it is where software actually does separate from the pack.

---

## (c) Does the chat-collapse hold or break in software?

The parent thread established (Level 3) that the fat "we use AI" headline collapses everywhere into *mostly conversational writing/info-seeking, ≤3 functions, single-digit fully-scaled tail*. **Question: is software the one sector where that partially breaks?** Honest answer: **the breadth-collapse still applies to the 80% denominator, but software is the one sector with independent evidence of a genuinely deeper — agentic, integrated-into-the-pipeline — layer underneath.** Two distinct things, kept separate:

1. **The 80% itself is still mostly broad/shallow.** Statistics Finland's type-split is the same language/text/generative shape sector-wide (text analysis 29%, media generation 22%, language/code generation 20%). The survey has no depth question; an 80%-of-software-firms figure is "touched ≥1 AI tech," same caveat as everywhere. Do **not** read 80% as "80% run agentic workflows."

2. **But software is where the deeper layer is independently measured — and it is real, not just chat.** This is the honest break in the pattern:
   - **DORA 2025 (Google Cloud, ~5,000 tech professionals):** **90% of developers use AI** in daily work (+14 pp YoY), **median 2 hours/day**, **65% rely on it** moderately-to-heavily. Adoption among *developers* runs ~90%, well above the 80% firm-level cell. [dora.dev](https://dora.dev/dora-report-2025/) · [Google blog](https://blog.google/innovation-and-ai/technology/developers-tools/dora-report-2025/) — [survey, commercial venue] (Google's own dev-tooling report; self-interested — but huge N, and trust is reported *low* at 24%, which cuts against pure boosterism).
   - **Anthropic 2026 Agentic Coding Trends Report:** reports a sharp rise in multi-file, multi-step Claude Code sessions over 2025 (per the report's summary, **~78% of Q1-2026 sessions involve multi-file edits, up from ~34% a year earlier**, with mean session length growing several-fold from the autocomplete era). This is the integration signal — multi-file, tool-calling work, not single-prompt chat. [resources.anthropic.com](https://resources.anthropic.com/2026-agentic-coding-trends-report) — [survey, commercial venue] (Anthropic's own product telemetry; self-interested — treat the *direction* (chat→agentic) as the signal, not the exact %). *Exact figures are from the report's published summary; the primary PDF was not text-extractable at audit time, so the percentages are reported as "per the report," not independently re-derived.*
   - **Practitioner developer surveys (2026):** ~**55% of engineers regularly use AI agents**, with staff+ engineers highest at **~63.5%**; Claude Code + Cursor are >half of primary-tool choices, and most developers run a *three-tool* stack. [Pragmatic Engineer, *AI Tooling for Software Engineers in 2026*](https://newsletter.pragmaticengineer.com/p/ai-tooling-2026) — [domain trade publication] (practitioner survey write-up). *(Separately, Stack Overflow's own 2026 read — ["Agents on a leash"](https://stackoverflow.blog/2026/05/27/agents-on-a-leash-agentic-ai-remains-mostly-monitored-at-work/), [domain trade publication] — cuts the other way: agentic AI at work is still mostly single-agent and human-monitored, a useful counter-weight to the "agents at scale" read.)*
   - **Cross-system corroboration (US Census):** the BTOS working paper names **IT as a leading *function* of AI use (41%)** alongside Sales/Marketing and Strategy — and software-dev is the one domain commercial surveys (Bain) put at the *top* of pilot→production conversion (~40% vs 20–33% elsewhere, per parent-thread `d-`). [Census WP](https://www.census.gov/library/working-papers/2026/adrm/CES-WP-26-25.html) — [academic/research].

**Verdict on the break:** The chat-collapse is a statement about *breadth* — and it holds: most of the 80% is shallow, language-shaped use. But software/ICT is the sector where the *agentic/integrated tail is thickest* — coding agents (Claude Code, Codex, Cursor) put genuine multi-step, multi-file, test-running work into daily practice for a majority of developers. So the accurate slide line is: **"In software, AI isn't just chat — it's the sector furthest along into agentic, in-the-pipeline use. ~80% of software firms touch AI; ~90% of developers use it daily; and the agentic share is rising fast."** Note the honest counter-weight: Stack Overflow's 2026 read finds workplace agentic AI is still *mostly single-agent and human-monitored* — so "furthest along" is not "fully autonomous at scale." The defensible claim is **"software has the thickest agentic tail and is moving fastest,"** not "software runs autonomous agent fleets in production." The depth lives *specifically* in the sector that builds software, because that is where coding agents live.

**Honesty guard:** the depth evidence is *developer-level* and two of its three legs (DORA = Google's own report, Anthropic = own telemetry) are *self-interested commercial venues*; the third (Pragmatic Engineer) is a practitioner-survey write-up, with Stack Overflow as a counter-weight. So this is **convergence of direction across a thin, partly-vendor set — softer than a clean Level-3** (which wants 10–20 *independent* practitioner reports). Treat it as "the chat→agentic shift is real and software-concentrated" (well-supported direction), **not** as a hard numeric claim. The official 80%/79.79% firm-level figure is the load-bearing, primary-statistics claim; the agentic-depth layer is supporting, direction-only evidence.

---

## (d) Freshness note

- **Primary cells (Finland 80%/79.79%, EU-27 62.52%, M-sector, Sweden/Denmark J):** spring-2025 reference data; Statistics Finland published **2025-11-27**, Eurostat table `isoc_eb_ain2` last updated **2026-06-15** (extracted today). Inside the 6-month window (cutoff 2025-12-25) — **not** dated baseline context.
- **US Census BTOS / working paper:** May 2026 story + Nov 2025–Jan 2026 supplement. Current.
- **Depth layer (DORA 2025, Anthropic 2026 report, Stack Overflow/Pragmatic 2026):** all 2025–2026; current. DORA published late 2025; the Anthropic agentic-coding report is Q1-2026-referenced.
- **Cadence:** the Eurostat/stat.fi enterprise survey is **annual** — next J-sector cell ~late 2026 (spring-2026 reference). Until then, **80% is the standing official software-sector number.**

---

## (e) What we did NOT find

- **A published NACE-J × size-class (250+) cross-tab.** Eurostat publishes J-sector and size-class *separately* but the fetchable table did not return the *intersection* (large software firms specifically). The "≥80% among large Finnish software firms" line in §(a) is therefore a **defensible inference** from the two marginals (J=80%, 100+=68%), not a single published cell. A maintainer with the Eurostat DB UI or bulk TSV can pull `isoc_eb_ain2` filtered to nace_r2=J × size_emp to confirm.
- **A J62_J63-only cut (software/IT services *excluding* telecoms/media).** The sub-class breakdown exists in the dataset dimension but was not extracted; NACE-J as reported includes telecoms (J61) and publishing/media — so "software sector" via NACE-J is slightly broader than pure software houses. Direction is unaffected (software is the highest-adopting J sub-class), but the exact pure-software cell is not pinned.
- **An official "agentic vs chat" depth split for the software sector.** As with the all-sector finding, no statistical agency decomposes the 80% into chat-vs-integrated-vs-agentic. The depth read in §(c) is convergent practitioner/telemetry evidence, not an official cell.
- **Norway / Iceland J-sector cells.** Same EFTA gap as the parent thread — not in the fetched extract.

---

## (f) Inline four-persona audit

- **Source-type:** PASS (after correction). The headline software-sector cells are **primary official statistics** — Eurostat `isoc_eb_ain2` (API, indicator `E_AI_TANY`, nace_r2=J) and Statistics Finland, both [official statistics], and they **independently agree (79.79% ≈ 80%)** — the strongest possible sourcing for the load-bearing number. US figures are Census [official statistics] + Census ADRM working paper [academic/research]. The depth layer (DORA, Anthropic, Pragmatic Engineer, Stack Overflow) is explicitly labelled [survey, commercial venue] / [domain trade publication] and used only for the *convergent direction*, never as the primary number. *Correction applied in review:* the ~55%/63.5% agent-use figures were initially mis-attributed to "Stack Overflow" — they are from the **Pragmatic Engineer** survey; Stack Overflow's own 2026 piece is a separate (counter-weight) source, now cited as such. No Level-0 vendor rewrite carries any cell.
- **Zombie-stat:** PASS. The 80% is traced to its definition (≥1 of 8 listed AI technologies, self-reported, 10+ employees, spring-2025 reference, EU Reg. 2024/1883 legal basis) — the *same low-bar denominator* as the 38%, explicitly flagged in §(b) so the 38%→80% swap is read as "audience-appropriate base rate," not "deeper definition." The 62.52% EU-27 and 79.79%/40.43%/74.75% cells are exact, not round, taken from the dataset value object (not a press rounding). DORA's 90% and Anthropic's ~78%/~34% carry their N/venue, are leveled as commercial point estimates (not L3-grade alone), and the Anthropic figures are explicitly marked "per the report's summary" because the primary PDF was not text-extractable at audit time.
- **Freshness:** PASS. All primary cells spring-2025 reference, published Nov 2025 / table updated June 2026 — inside the window. Depth layer 2025–2026. Nothing dated drives a headline.
- **Evidence-ladder:** PASS (after correction). The sector-cut table = **official statistics** (definitional, above the ladder). The "software has the thickest agentic tail / is moving fastest" claim was **downgraded in review from a hard Level-3 label to "convergent direction across a thin, partly-vendor set"** — two of its three depth legs (DORA = Google, Anthropic = own telemetry) are self-interested venues, short of the 10–20 *independent* practitioner reports a clean L3 wants; Stack Overflow's counter-weight is now included. The earlier slide line ("the **only** sector where agents are already in the pipeline **at scale**") was softened to "furthest along / thickest agentic tail," and "autonomous at scale" is explicitly disclaimed. The "≥80% among large software firms" intersection remains labelled **inference**, not a published cell.
