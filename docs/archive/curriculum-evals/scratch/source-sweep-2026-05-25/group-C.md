# Source sweep — Group C (quality / contrast / return + run-first-experiment)

**Auditor:** source-verification subagent · **Date:** 2026-05-25 · **Window cutoff:** evidence on/after ~2025-11-25 is current.

**Files:**
- curriculum/lectures/quality-is-grounding.md
- curriculum/lectures/test-and-learn.md
- curriculum/lectures/learning-through-contrast.md
- curriculum/lectures/reading-the-return.md
- curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md

Watch items from brief: **no Intercom/Curran numbers** in any Group C file (Curran/Cherny/Sourcegraph appear only as out-of-scope forward-pointers to the closing lecture, no URLs). **No eval/LLM-judge (hamel.dev) citations** in scope. **500K-lines demo claim present** in quality-is-grounding.md → internal observation, no public URL = NEEDED (see C-1).

---

## C-1 — "500K lines in weeks" demo + first Agentics Helsinki meetup

- **File:line:** curriculum/lectures/quality-is-grounding.md:8 (body); maintainer block lines 21–30.
- **Current body claim:** "Some of the early agentic engineering demos were single devs shipping 500K lines of code in weeks. The first Agentics Helsinki meetup, fall 2025, had a few of them."
- **URL(s):** Event series — https://luma.com/bjg7smsc (verified live). The 500K number — NO public URL (Antti's direct observation at the meetup).
- **Verdict: NEEDED (split)** — event is OK; the 500K number is an unsourced internal observation.
- **Findings:**
  - Event: luma.com/bjg7smsc resolves live. Page = "Helsinki Agentics Meetup," Agentics Foundation, **dated September 2, 2025**, Helsinki, hosted by **Teemu Linna** (note: maintainer block speculates pinging "Mikko Alasaarela or the demoing practitioner" — host of record is Teemu Linna; not body-facing, FYI only). Body's "fall 2025" month-band is defensible against a Sep 2 date and is the intended recall mood. **Freshness:** Sep 2025 is outside the 6-month window as of 2026-05-25 — but body frames it as historical context ("the early agentic engineering demos"), allowed under check_research_claims.md §2. Do NOT auto-flag.
  - 500K number: no public talk recording, deck, or post pinned. This is a load-bearing number ("Nobody reviews 500K lines by hand") with no anchor beyond participant memory. Per brief instruction, internal-observation with no public URL = NEEDED.
- **Proposed body fix (NEEDED — pick one before first cohort):**
  - *Preferred (drops number-precision debt, punchline survives):* `Some of the early agentic engineering demos were single devs shipping hundreds of thousands of lines of code in weeks.` (the maintainer block already pre-authorises this swap, line 25).
  - *If the precise number is kept:* leave body as-is but maintainer must confirm "500K" against memory (300K/500K/1M drift risk flagged in block) before first cohort, OR pin a public reference if the demoing practitioner published one.
- `- ` `[checked:2026-05-25 result:NEEDED due:2026-06-30]` https://luma.com/bjg7smsc — [practitioner observation, summer 2025] 500K-lines-in-weeks single-dev demo, first Agentics Helsinki meetup (Sep 2 2025). fallback: soften "500K lines" → "hundreds of thousands of lines"; keep event as dated historical context.

---

## C-2 — Ronacher MiniJinja Go port (10h / 2.2M tokens / lexer→parser→runtime / snapshot reuse)

- **File:line:** curriculum/lectures/reading-the-return.md:25 (body), :46 (maintainer verify note). Same source underpins test-and-learn.md:62/80 (forward-ref) and the cross-research OODA line 11.
- **Current body claim:** "Armin Ronacher ran a port between two languages in roughly ten hours of agent time, two and a bit million tokens. The run held together because he had something specific in place that catches the failure modes above."
- **URL:** https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/
- **Verdict: OK** — [practitioner direct].
- **Findings:** Page live. Byline **Armin Ronacher**, dated **January 14, 2026** (in window through ~July 2026). Confirmed: **10 hours total agent time (3h supervised)**, **2.2M tokens**, **lexer → parser → runtime** incremental sequence, and **Rust snapshot-test reuse** ("These snapshot tests were what I wanted to use to validate the Go port" / "a pretty good harness with a tight feedback loop"). Body's "roughly ten hours" + "two and a bit million tokens" matches exactly. The "something specific in place that catches the failure modes" = the snapshot-test harness (deliberately unnamed in body, by design — M5 reveals it). Cross-check vs OODA 2026-04-21 line 11 = consistent. No fix.
- `- ` `[checked:2026-05-25 result:OK due:2026-07-14]` https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/ — [practitioner direct] Ronacher MiniJinja Go port, 10h / 2.2M tokens / lexer→parser→runtime / Rust snapshot reuse. fallback: if stale at delivery, swap for a newer Ronacher post or peer practitioner with the same reference-artifact pattern.

---

## C-3 — Ronacher "agentic coding" three-pattern forward-reference

- **File:line:** curriculum/lectures/test-and-learn.md:62 (body forward-ref "Ronacher's three-pattern"), :80 (maintainer verify note naming the source URL).
- **Current body claim (body):** "...learn what packaging adds by watching each piece of Ronacher's three-pattern close a specific gap you just saw." Maintainer note line 80 asserts the URL's "reference / plan / verifier vocabulary still maps to the three-pattern frame."
- **URL:** https://lucumr.pocoo.org/2025/6/12/agentic-coding/
- **Verdict: CAVEAT** — page live, byline + thesis confirmed, but the precise "reference / plan / verifier" three-pattern vocabulary is NOT verbatim on this page; AND the page is out of the freshness window.
- **Findings:** Page live. Byline **Armin Ronacher**, dated **June 12, 2025** — **outside the 6-month window** as of 2026-05-25 (historical context only). The post emphasises *principles* — observability/logging, tool reliability, simplicity, "do the dumbest possible thing that will work" — NOT a labelled triad of "reference artifact / plan file / external verifier." That named three-pattern is a curriculum synthesis (reference = the MiniJinja snapshot corpus from C-2's Jan-2026 post; plan + verifier converge across the OODA). The maintainer note's claim that this June-2025 URL "maps to the three-pattern frame" overstates what is on the page.
  - Body impact is low: test-and-learn.md only *names* "Ronacher's three-pattern" as a forward pointer; M5 owns the teaching, and the maintainer block already carries a descriptive fallback. No body-text edit forced. But the maintainer verify note is inaccurate and the source is stale.
- **Proposed maintainer-note fix (CAVEAT — note only, not body):** Replace line-80 expectation. Current: *"Confirm reference / plan / verifier vocabulary still maps to the three-pattern frame."* → *"NOTE 2026-05-25: the 2025/6/12 agentic-coding post carries Ronacher's principles (observability, tool reliability, simplicity), NOT a labelled reference/plan/verifier triad — and it is now outside the 6-month window (June 2025). The named three-pattern is a curriculum synthesis; the in-window practitioner anchor is the Jan-2026 MiniJinja port (lucumr.pocoo.org/2026/1/14/minijinja-go-port/). Prefer the MiniJinja URL as the live anchor; cite the agentic-coding post only as dated historical principles. Body unaffected — descriptive fallback already in place."*
- `- ` `[checked:2026-05-25 result:CAVEAT due:2026-06-30]` https://lucumr.pocoo.org/2025/6/12/agentic-coding/ — [practitioner direct, historical Jun-2025] Ronacher agentic-coding principles; does NOT carry verbatim reference/plan/verifier triad + out of freshness window. fallback: anchor the three-pattern to the in-window MiniJinja port (C-2); keep this post as dated principles only.

---

## C-4 — Huryn three-block memory

- **File:line:** curriculum/lectures/test-and-learn.md:61 (body language / attribution), :76 + :79 (maintainer verify notes). Body name-attribution actually lands at the M4 exercise (walk-and-send-off.md Phase 3 — out of this group's scope), per design.
- **Current body claim:** "Huryn's three-block memory" — Paweł Huryn [practitioner direct], three blocks = observation→hypothesis→rule / decisions+alternatives / quality criteria.
- **URL:** https://www.productcompass.pm/p/claude-md-snippets
- **Verdict: OK** — [practitioner direct].
- **Findings:** Page live. Byline **Paweł Huryn**, dated **March 31, 2026** (well in window). Three-block frame confirmed: (1) **Knowledge Architecture** — facts/hypotheses/rules with promotion "When a hypothesis gets confirmed 3+ times, promote it to a rule. When a rule gets contradicted... demote it back to hypothesis"; (2) **Decision Journal** — context, alternatives, reasoning, trade-offs, supersession; (3) **Quality Gate** — evaluation criteria (block 3 detail is paywalled but introduced on page). Maps cleanly to the curriculum's observation-rule / decision-with-alternatives / quality-criterion paraphrase. Note: block 3 specifics sit behind the paywall — the page confirms the THREE-block structure and blocks 1–2 fully; block 3 is named but truncated. Attribution and structure verified; no fix.
- `- ` `[checked:2026-05-25 result:OK due:2026-09-30]` https://www.productcompass.pm/p/claude-md-snippets — [practitioner direct] Huryn three-block CLAUDE.md memory (Knowledge Architecture / Decision Journal / Quality Gate), Mar 31 2026. fallback: if removed, paraphrase as observation-rule / decision-with-alternatives / quality-criterion, no name attribution; M4 Phase 3 carries the naming.

---

## C-5 — Klaassen, Compound Engineering: The Definitive Guide (four-step loop pre-read)

- **File:line:** curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md:98 (pre-read body), :169 + :174 (maintainer notes); test-and-learn.md:63/81 + :63 (implicit framing).
- **Current body claim:** "Read (longer), Kieran Klaassen, *Compound Engineering: The Definitive Guide*. The four-step loop (plan, work, review, compound)."
- **URL:** https://every.to/source-code/compound-engineering-the-definitive-guide
- **Verdict: CAVEAT** — [practitioner direct, vendor venue].
- **Findings:** Page live. Byline **Kieran Klaassen**, dated **February 9, 2026** (in window). Confirmed thesis: "each engineering work unit should make subsequent units easier." The explicit **"plan / work / review / compound" four-step list was NOT surfaced verbatim** in the fetched content of this single page. The four-step loop IS Klaassen's framework — the kieran-klaassen.md observation file (line 12) records it as "the through-line of every Klaassen appearance over the last 6 months" (L2, convergence-pending), citing this guide among others. So the pre-read's parenthetical is a fair characterisation of Klaassen's body of work, but the precise four-step naming is a convergence across his appearances, not a quotable line on this exact page. Vendor-venue flag: Every.to is Klaassen's employer — [practitioner direct, vendor venue]; any outcome metrics from it (e.g. "week of coding now happens in hours") are vendor-self-reported (not cited in Group C body, so no action here). Low body impact: it is a pre-read pointer, not a load-bearing classroom claim.
- **Proposed body fix (CAVEAT — optional softening):** Body is defensible as-is. If a maintainer wants the parenthetical to match the page exactly rather than the convergent frame: `The four-step loop (plan, work, review, compound) that runs through his work` — signals it's the through-line, not a verbatim heading. Otherwise no edit needed; maintainer note line 81 ("four-step loop is implicit framing here") already hedges correctly.
- `- ` `[checked:2026-05-25 result:CAVEAT due:2026-08-09]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Klaassen Definitive Guide (Feb 9 2026); core "each unit makes the next easier" thesis verified, explicit plan/work/review/compound naming is convergent-across-appearances not verbatim-on-page. fallback: phrase as "the four-step loop that runs through his work"; treat any Every.to outcome metric as vendor-self-reported.

---

## C-6 — Entis on Klaassen, "You're the Bread in the AI Sandwich" (pre-read)

- **File:line:** curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md:96 (pre-read body), :169 (maintainer note, byline already flagged).
- **Current body claim:** "Watch, Laura Entis on Kieran Klaassen, *You're the Bread in the AI Sandwich*. Interview video and write-up."
- **URL:** https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich
- **Verdict: OK** — [practitioner analysis] (writer-on-subject), byline correct.
- **Findings:** Page live. Byline confirmed: **"Laura Entis is a staff writer at Every"** — dated **April 22, 2026** (in window). It is a write-up of Dan Shipper's AI&I podcast conversation with Klaassen ("where humans fit now that AI can generate high-quality code, copy, strategy, and design"). Body already attributes correctly as "Laura Entis on Klaassen" (the writer-on-subject rule) and labels it "write-up" — does NOT mis-attribute to Klaassen as practitioner-direct. Maintainer note line 169 already carries the [practitioner analysis] label. Minor: body calls it "Interview video and write-up" — the page is primarily a newsletter write-up (it also covers Every's internal "Claudie" PM and industry items); the podcast it covers is the video. Accurate enough; no fix needed.
- `- ` `[checked:2026-05-25 result:OK due:2026-08-22]` https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich — [practitioner analysis] Laura Entis (staff writer, Every) on Klaassen's AI&I appearance, Apr 22 2026; "bread in the sandwich" metaphor. fallback: keep "Laura Entis on Klaassen" attribution; if removed, cite the underlying AI&I episode as the practitioner source.

---

## C-7 — ccstatusline (operational tool link)

- **File:line:** curriculum/lectures/learning-through-contrast.md:27.
- **Current body claim:** "[ccstatusline](https://github.com/sirmalloc/ccstatusline) wins on continuous context visibility in your status line."
- **URL:** https://github.com/sirmalloc/ccstatusline
- **Verdict: OK** (operational link, not an evidence claim — verified live anyway).
- **Findings:** Repo live and actively maintained (latest release v2.2.19, May 17 2026; ~9.8k stars). Provides a Claude Code status-line formatter with Context %, Context Window, and Context Bar widgets — matches the body's "continuous context visibility in your status line." Tool-recommendation, not a practitioner-evidence claim, so no source-type label needed; included for completeness.
- `- ` `[checked:2026-05-25 result:OK due:2026-11-17]` https://github.com/sirmalloc/ccstatusline — [operational tool] Claude Code status-line w/ context-usage widgets; live, maintained. fallback: name the capability generically ("a status-line tool that shows live context %") if the repo moves.

---

## No-action items (logged for completeness)

- **learning-through-contrast.md three failure modes + /compact-at-60%:** convergent practitioner vocabulary, sourced via internal OODA runs (2026-04-21-practitioner-long-running.md, 2026-04-23-scaling-session-length-2). No external URL in body; body explicitly states "No external URLs cited." No single-author attribution to verify. **No action** (convergence IS the citation; confirm against pre-read at delivery per existing maintainer note).
- **reading-the-return.md three failure modes (goal drift / context rot / plausible-but-wrong):** same convergent-vocab basis, cross-checked against OODA 2026-04-21 lines 41–43 (consistent). No URL, no single name. **No action.**
- **Curran / Cherny / Sourcegraph Amp (learning-through-contrast.md:71, 82):** forward-pointers to the out-of-scope closing lecture only; no URLs, no numbers in Group C body. **No action in scope** (no Intercom/Curran numbers appear here — watch item clears).
- **test-and-learn.md "gap analysis":** generic business-analysis framework, no single attribution. [cultural-vocab-adjacent / generic]. **No action.**
- **Uncle Bob clean-code-is-steering supplementary (run-the-first-experiment.md:94):** internal supplementary file, not a URL in scope; its own source refs are a different file's audit surface. **No action in scope.**

---

## SUMMARY (5 lines)

1. **Counts:** OK 4 (C-2 Ronacher MiniJinja, C-4 Huryn, C-6 Entis, C-7 ccstatusline) · CAVEAT 2 (C-3 Ronacher agentic-coding triad/staleness, C-5 Klaassen four-step naming) · NEEDED 1 (C-1 500K-lines number) · GONE/STALE/BLOCKED/CORRECT 0. Plus 5 no-action convergent/forward-ref items.
2. **No BLOCKs** (no GONE, no BLOCKED, no fabricated source). All seven external URLs resolve live with correct bylines; all in-window except two explicitly-historical Ronacher/event references that the body already frames as historical context.
3. **Top fix #1 (NEEDED, C-1):** the "500K lines in weeks" demo number has no public anchor — either soften body to "hundreds of thousands of lines" (pre-authorised) or maintainer confirms the exact figure before first cohort.
4. **Top fix #2 (CAVEAT, C-3):** the test-and-learn maintainer note wrongly claims the June-2025 agentic-coding post carries a "reference/plan/verifier" triad; it carries principles and is out of the freshness window — re-anchor the three-pattern to the in-window Jan-2026 MiniJinja port.
5. **Top fix #3 (CAVEAT, C-5):** Klaassen "plan/work/review/compound" four-step isn't verbatim on the Definitive Guide page (it's convergent across his appearances + vendor venue) — optional softening to "the four-step loop that runs through his work"; body is defensible as-is.
