# K — Code-DIFF-VOLUME comparators to Anthropic's "8X" (axis A hunt)

**Thread:** finland-ai-usage-baseline-2026-06-25 (verification dig)
**Question:** Has ANY org besides Anthropic published a number on **axis (A)** — *merged-code VOLUME (lines / diff size) per engineer per unit time*, as a multiple or before/after change? Anthropic's 8X ("the typical engineer was merging 8× as much code per day in Q2-2026 vs 2024") and the maintainer's measured ~2X "PR diff-size throughput" both sit on axis (A).
**Date of dig:** 2026-06-27. **Evidence level:** the *negative* is an L3-grade convergence (5 independent measurement shops checked, all land off-axis); the comparator search returns **zero true axis-(A) numbers**.

**Three axes — kept strictly apart throughout:**
- **(A) Diff-VOLUME throughput** = lines / diff-size merged *per engineer per unit time*. ← the hunt.
- **(B) PR/MR COUNT throughput** = number of PRs per dev per week (a count of units, not their size).
- **(C) % code AUTHORED by AI** = a composition share (not a throughput multiple).

---

## (a) Axis-(A) comparator table

| Source | Exact metric published | Value | Really axis A, or B/C? | Year | N | URL | Label |
|---|---|---|---|---|---|---|---|
| **Anthropic** (the incumbent claim) | "typical engineer merging Nx as much **code per day**" — lines/diff volume per eng/day | **8×** (Q2-2026 vs 2024); vendor calls it "almost certainly an overstatement" | **A** — the only clean axis-A number found | 2026 | not disclosed (internal) | (sibling thread `a-anthropic-8x-artifact.md`) | [practitioner direct, vendor venue] — L0/L1, self-disclaimed |
| **DX** | median **PR size** | 44 → 72 lines/PR (Jul-2025 → Jun-2026), ≈ +64% | **near-A but is per-PR UNIT SIZE, not per-eng/time** — size of one unit, no engineer-time denominator | 2026 | 400+ companies, Q2-2026 | [getdx.com](https://getdx.com/blog/ai-authored-code-has-nearly-doubled/) | [survey, commercial venue] — self-report estimate, flag self-interest |
| **DX** | **% code AI-authored** | 27.4% (Q1-26) → 51.9% (Q2-26) | **C** — a share | 2026 | 400+ companies | [getdx.com](https://getdx.com/blog/ai-authored-code-has-nearly-doubled/) | [survey, commercial venue] |
| **Faros AI** | **average PR size** | +51% (≈51.3%) low- vs high-AI-adoption periods | **near-A but per-PR UNIT SIZE** (no eng-time denominator) | 2026 | 22,000 devs / 4,000+ teams, 2yr telemetry | [faros.ai](https://www.faros.ai/blog/ai-acceleration-whiplash-takeaways) | [survey, commercial venue] — telemetry, flag self-interest |
| **Faros AI** | **files touched per developer per month** | +149.9% | **B-like COUNT per eng/time** — files, not line/diff VOLUME (and a count, not a size) | 2026 | 22,000 devs | [faros.ai](https://www.faros.ai/research/ai-acceleration-whiplash) | [survey, commercial venue] |
| **Faros AI** | **PR merge rate per developer** | +16.2% | **B** — PR count per eng | 2026 | 22,000 devs | [faros.ai](https://www.faros.ai/blog/ai-acceleration-whiplash-takeaways) | [survey, commercial venue] |
| **Faros AI** | **code churn** (lines deleted ÷ lines added, merged code/quarter) | **+861%** (≈9.6× prior rate) under high AI adoption | **a RATIO of volumes, not a per-eng VOLUME rate** — diff-level but not axis A | 2026 | 22,000 devs | [faros.ai](https://www.faros.ai/blog/ai-acceleration-whiplash-takeaways) | [survey, commercial venue] |
| **GitClear** | code churn (% of new code revised within 2 weeks) | 5.5% (2020) → 7.9% (2024); baseline ~3.3% → 5.7% (2024) → 7.1% (2025) | **diff QUALITY/composition, not VOLUME-per-eng** | 2025 | **211M changed lines**, 2020-2024 | [gitclear.com](https://www.gitclear.com/ai_assistant_code_quality_2025_research) | [practitioner analysis] — independent diff analysis |
| **GitClear** | duplicated/copy-paste blocks | 8.3% → 12.3% of changed lines (2021→2024); headline "4× clones" | **composition, not VOLUME-per-eng** | 2025 | 211M lines | [gitclear.com](https://www.gitclear.com/ai_assistant_code_quality_2025_research) | [practitioner analysis] |
| **GitClear** | moved/refactored lines (code reuse signal) | 25% (2021) → <10% (2025), ≈ −60% | **composition, not VOLUME-per-eng** | 2025 | 211M lines | [gitclear.com](https://www.gitclear.com/ai_assistant_code_quality_2025_research) | [practitioner analysis] |
| **Stanford / Denisov-Blanch** | **quality-adjusted** productivity (expert-panel ML model on commits) | ~10% median net; 30-40% greenfield; 0-10% brownfield; team *gap* 4.8%→19% over 2yr | **deliberately NOT volume** — author rejects raw LOC ("scoring catches people who commit a lot of nothing") | 2025 | 100k+ devs (cited up to 120k), 600+ companies, 2023-2025 | [yegordb.com](https://www.yegordb.com/) | [academic/research] — strongest academic source, but off-axis by design |
| **METR** | task **completion TIME** (RCT) | AI made devs **19% slower** | **TIME, not volume** — a different axis again | 2025 | 16 devs, 246 tasks | [metr.org](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) | [academic/research] — RCT, the rigorous one |
| **GitHub Octoverse** | total commits / PRs merged (platform-wide) | ~986M commits (+25% YoY); 43.2M PRs merged/month (+23%) | **B (aggregate counts), not per-eng VOLUME** | 2025 | platform-scale | [github.blog](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/) | [practitioner direct, vendor venue] |

---

## (b) GitClear — exact current figures (the closest independent DIFF-LEVEL source)

**Latest edition:** "AI Copilot Code Quality: 2025 Data Suggests 4x Growth in Code Clones" ([gitclear.com](https://www.gitclear.com/ai_assistant_code_quality_2025_research); PDF [gitclear-public S3](https://gitclear-public.s3.us-west-2.amazonaws.com/GitClear-AI-Copilot-Code-Quality-2025.pdf)). No 2026 edition found as of 2026-06-27 — the 2025 edition (covering data through 2024, with some 2025 churn points) is current. (Prior editions: "Coding on Copilot" 2023→2024 projections; an earlier 153M-line cut.)

**N & dates:** **211 million changed lines**, 2020-2024, from repos owned by Google, Microsoft, Meta, and enterprise C-Corps.

**Exact figures:**
- **Code churn / short-term rework:** **7.9% of newly added code revised within two weeks in 2024, vs 5.5% in 2020.** A separate baseline framing: churn ~**3.3% (pre-AI) → 5.7% (2024) → 7.1% (2025)** — roughly a doubling over two years.
- **Copy-pasted code:** **8.3% (2021) → 12.3% (2024)** of changed lines. In 2024, within-commit **copy/paste exceeded moved lines for the first time.** (Headline "4× growth in clones" is the report's framing of the broader clone trend; the disclosed copy-paste line-percentage rise is ≈1.48×, so treat "4×" as a clone-block-frequency claim, not the 8.3→12.3 figure — minor headline/data tension worth flagging.)
- **Moved / refactored lines** (code-reuse signal): **25% of all changes (2021) → under 10% (2025)**, ≈ **−60%**.
- **Duplicated code BLOCK frequency:** reported as up **~8×** in 2024 (block-level, distinct from the line-percentage figure).

**HEADLINE current figure (single best):** **short-term code churn ~doubled — to 7.1% (2025) from a ~3.3% pre-AI baseline — while refactored/"moved" code fell ~60% (25%→<10%).**

**Crucial for this dig:** GitClear publishes diff **QUALITY / COMPOSITION** (what *kind* of code changed), **NOT a per-engineer diff-VOLUME-per-unit-time multiple.** It is the closest independent shop to Anthropic's measurement *substrate* (real git diffs at scale), but it has chosen not to publish anything on axis (A). It can't even be turned into one — it has no per-engineer-per-day denominator.

---

## (c) THE HARD NEGATIVE — is Anthropic alone on axis (A)?

**Verdict: YES. Anthropic's 8X is the only published number on axis (A) — merged-code VOLUME (lines/diff) per engineer per unit time, as a multiple.** No independent organization, vendor, survey shop, or academic group publishes a per-engineer code-volume rate change. Confirmed across the five most-likely sources (GitClear, DX, Faros, Stanford/Denisov-Blanch, METR) plus GitHub Octoverse — every one lands on a *different* axis.

**Near-misses, with their TRUE axis:**
1. **DX median PR size 44→72 lines** — the seductive one. Lines, and growing. But it is the **size of one unit (a PR)**, with *no engineer-time denominator* — it cannot become "lines per engineer per day" without a PR-rate-per-engineer multiplier DX does not supply. Axis: **per-PR unit size (near-A, not A)**. Also self-reported estimate, not a git-measured volume.
2. **Faros average PR size +51%** — identical shape and identical disqualifier: per-PR unit size, no eng-time denominator.
3. **Faros files-touched per developer per month +149.9%** — *does* have the per-eng-per-time shape, but the unit is **files (a count), not lines/diff-VOLUME.** Closest to A in *form*, wrong *unit*. Axis: **B-like count-per-eng/time.**
4. **Faros code churn +861% (≈9.6×)** — diff-level and big, but it's a **ratio of deleted-to-added volume**, not a per-engineer volume rate. Axis: **composition ratio.**
5. **GitHub Octoverse commits +25% YoY** — aggregate platform count, divided by a *growing* developer base, AI-attributable only loosely. Axis: **B aggregate count.**
6. **Anthropic's own sibling "+67% merged PRs per engineer per day"** — same company, but axis **B** (count), and the cleaner figure the sibling synthesis recommends citing instead.

**Why the negative is robust, not just unfound:** the absence is *structural*, not a gap in coverage. The serious measurement shops (DX, Faros, Stanford) have **deliberately moved off** raw code volume because the field treats LOC-as-output as discredited (§d). They publish PR *counts*, AI-authored *shares*, quality-*adjusted* output, and *time* — precisely the axes that *aren't* gameable by verbose AI output. Anthropic publishing a volume multiple is the anomaly; the rest of the field declining to is the norm. That is exactly the maintainer's "the reason nobody else brags on this axis" point.

---

## (d) The discredited-metric note (≤2 sources)

1. **Dijkstra, "On the cruelty of really teaching computing science" (EWD 1036):** *"if we wish to count lines of code, we should not regard them as 'lines produced' but as 'lines spent': the current conventional wisdom is so foolish as to book that count on the wrong side of the ledger."* — i.e. code volume is a **cost**, not output; counting it as productivity is a category error. [cs.utexas.edu/~EWD](https://www.cs.utexas.edu/~EWD/transcriptions/EWD10xx/EWD1036.html) [academic/research — primary archive]
2. **SPACE framework (DX's own venue):** engineering leaders who measure "beyond lines of code or commit frequency" are warned that "activity metrics alone can mislead… [they] fail to capture the complexity of software development." [getdx.com/blog/space-metrics](https://getdx.com/blog/space-metrics/) [practitioner analysis, vendor venue] — note the irony: DX's *framework* arm disowns the very volume axis Anthropic's 8X lives on.

**Takeaway for the maintainer:** the reason no one else publishes axis (A) isn't shyness — it's that the entire post-DORA/SPACE measurement discipline was *built to stop* treating code volume as output. Anthropic's 8X is a metric the field spent 40 years teaching itself not to use. A diff-volume multiple "going up 8×" while AI writes 80% of the lines is closer to a measure of *verbosity* than of *value shipped*.

---

## (e) What we did NOT find

- **No** independent per-engineer code-VOLUME-per-unit-time multiple, anywhere. Not in GitClear, DX, Faros, Stanford, METR, or Octoverse.
- **No** 2026 GitClear edition — 2025 ("4× clones") is the current published research line.
- **No** raw-LOC-volume figure from Stanford/Denisov-Blanch — by design, the model is quality-*adjusted* and explicitly anti-LOC.
- **No** absolute lines-of-code-merged-per-dev figure in the Faros 2026 report; the report itself flags the 861% churn as "the asterisk on every output number."
- **Not** fetched to the deepest level: the full Faros 2026 PDF (pages.faros.ai) and the GitClear 2025 PDF — secondary/blog extractions cross-confirm the figures above, but a page-precise PDF read could add the exact files-per-dev decimal and any buried per-eng line metric. Low expected yield (every blog framing converges on counts/shares/sizes, never axis A).

---

## (f) Four-persona audit (one line each)

- **Source-type:** Anthropic 8X = [practitioner direct, vendor venue], self-disclaimed → L0/L1 (it's the *claim under test*, never used as evidence). GitClear = [practitioner analysis] on real diffs, the only *independent* diff-level shop — note GitClear sells git-analytics so it has a commercial stake, but its findings cut *against* AI hype, so self-interest bias runs opposite to the direction that would inflate axis A (low conflict risk). DX/Faros = [survey, commercial venue] — flag self-interest (both sell measurement). Stanford/METR = [academic/research], the only L3-grade evidence, and both land off axis A. Dijkstra/SPACE = primary + practitioner-analysis for the discredited-metric note. Labels applied inline in every table row.
- **Zombie-stat:** GitClear "4× clones" headline ≠ its disclosed 8.3%→12.3% line figure (~1.48×) — flagged as block-frequency vs line-percentage, not conflated. DX "44→72 lines" traced to Jul-2025→Jun-2026 same-cohort, N=400+ co's, self-report estimate (flagged). Faros figures traced to 22k-dev / 4k-team / 2yr telemetry, low-vs-high-adoption comparison (not calendar before/after). Anthropic 8X has **no disclosed N or methodology** — explicitly marked.
- **Freshness:** cutoff 2025-12-27. **Within window:** DX (Jun-2026), Faros (2026). **Outside window, kept as latest-on-their-exact-axis and labeled dated:** METR (Jul-2025, ~11mo — but the only rigorous RCT on the time axis), Octoverse (~Oct-2025, just outside — the only platform-scale commit-count cut), Denisov-Blanch (through Dec-2025, boundary), GitClear 2025 (data through 2024 — the latest available on diff-composition, no 2026 edition exists). Dijkstra is timeless-by-design (a definitional critique, not a metric). None of the dated sources carries the positive claim; all are off-axis context for the negative.
- **Evidence-ladder:** The *positive* claim "someone else published axis A" = **falsified** — zero instances at any ladder rung. The *negative* ("Anthropic alone on axis A") is an L3-grade convergence: 5 independent measurement organizations + 1 platform report, all checked, all off-axis, with a *structural* reason (the LOC-as-output taboo) explaining the absence rather than mere non-discovery.
