# Scrollback — Bootstrap M5 scorer Actor — 2026-04-24

Working directory: `curriculum/evals/mechanical/scratch/bootstrap-m5`.

Phase 0 (setup) and Phase 1 (five detectors) completed before this run. Inputs on disk: `module-5/benchmark.md`, `module-5/detectors/{source-triangulation,entailment,citation-integrity,self-consistency,counter-evidence}.md`, `module-5/briefing.md`, plus `sources/*.md`, `module-3/retrievals/*.md`, `module-3/stances/*.md`.

---

## Phase 2 — scorer

Prompt pasted verbatim (prompt-004):

> You are the scorer for a five-way detector benchmark. Your inputs:
>
> - Benchmark: module-5/benchmark.md (five claims, my verdicts)
> - Five detector outputs: module-5/detectors/*.md
>
> Your job: score each detector against my benchmark, produce a scoreboard, name a winner.
>
> For each detector:
> 1. Match detector findings to benchmark claims by strict substring match. Each of my five claims was quoted verbatim from the briefing. If you can't find the verbatim phrase from the benchmark claim in the detector's output, count as MISS — do not reason about semantic similarity, do not paraphrase-match, do not accept "close enough."
> 2. For each benchmark claim, check whether the detector flagged it. If I said "not grounded," the detector should have flagged it; count as a hit. If I said "grounded," the detector should NOT have flagged it; a flag is a false positive.
> 3. Compute precision (hits / total flagged) and recall (hits / total I said were not grounded). Coverage = how many of my five claims the detector even looked at.
> 4. One line of qualitative notes — what this detector caught that others missed, what it missed, where its method is strong, where it's weak.
>
> Save the scoreboard to module-5/scoreboard.md as a table:
>
> | Detector | Precision | Recall | Coverage | Hits | False positives | Misses | Notes |
>
> After the table, name ONE winner. Do not return "all five are useful" — force the pick. If top two are within 10% precision and 10% recall of each other, name the single winner first, THEN propose a two-method ensemble and say what each catches that the other doesn't. Maximum ensemble cap: two methods. Never three.
>
> At the bottom, add a one-line recommendation naming the detector or ensemble and the reason it won for output of this shape.

### Benchmark claim phrases (verbatim substrings to match)

- C1 (no): `"Wolt has made agentic ops its 2026 priority, targeting 50% of on-call runbooks executable by supervised agents by Q4."`
- C2 (no): `"Supercell is standardising on a centralised agent-platform team this year, with H2 2026 focused on shipping a shared internal MCP registry across game teams."`
- C3 (yes): `"Principled dissent is a feature, not a bug, if it produces a written bar the agents are tested against."`
- C4 (no): `"The Nordic enterprise agentic-tooling market is projected to reach €2.4B in 2026, growing 47% YoY, with platform-engineering teams accounting for roughly a third of spend."`
- C5 (yes): `"Paavo-signed acceptance criteria document delivered to Tuomas by Friday"`

### Per-detector grep results

- **source-triangulation.md:** verbatim hits on C1 (Wolt, 50%, Q4), C2 (Supercell, MCP registry), C4 (€2.4B, 47% YoY). C3 explicitly in "passed." C5 phrase not present. → Hits 3, FP 0, Miss 0, Cov 4/5.
- **entailment.md:** verbatim hits on C1, C2, C4 (all flagged OVERREACH). C3 in "passed." C5 not present. → Hits 3, FP 0, Miss 0, Cov 4/5.
- **citation-integrity.md:** flags Gartner/Forrester/McKinsey/IDC citations + "three independent documents" — none of these strings match C1/C2/C4 verbatim phrases. C3 in "passed" (match). C5 not present. → Hits 0, FP 0, Miss 3, Cov 2/5.
- **self-consistency.md:** verbatim hits on C1, C2, C4 (flagged UNSTABLE). C3 in "passed." C5 verbatim phrase "Paavo-signed acceptance criteria document delivered to Tuomas by Friday" found in "Claims NOT flagged" list. → Hits 3, FP 0, Miss 0, Cov 5/5.
- **counter-evidence.md:** verbatim hits on C1, C2, C4 (flagged CRUMBLES). C3 in "passed." C5 not present. → Hits 3, FP 0, Miss 0, Cov 4/5.

Scoreboard written to `module-5/scoreboard.md`.

Winner: **self-consistency.** Four-way tie on precision/recall; coverage (5/5) is the tiebreaker — it's the only detector that explicitly re-derives C5.

Ensemble (within-10% top two): self-consistency + counter-evidence. Self-consistency fails to reproduce fabrications; counter-evidence catches laundered attributions (the IDC "20 minutes" line that traces back to Maija's own stance document — technically present in the corpus, just re-speakered).

---

## Phase 2b — classic-way contrast

Prompt pasted verbatim (prompt-005):

> Three lines, in the chat:
> 1. What the classic way to quality-check this briefing would have been.
> 2. Whether it would have been faster or slower than this benchmark.
> 3. Why.

1. Classic way: Maija reads the draft top-to-bottom with a highlighter, marks claims that feel off, and pings Paavo/Sari/Anneli on Slack to verify the ones she's not sure about.
2. Slower — probably by a factor of 3-5× and less reliable.
3. Because the fabrications in this briefing (Wolt 50%-by-Q4, Supercell MCP registry, €2.4B market size) look plausible at skim-speed — they read like the kind of sentence a competent analyst would write, which is exactly why the LLM wrote them. Maija would catch the ones where her gut pinged; the re-derivation judge catches every claim that can't be reproduced from the corpus, plausibility-proof included. Humans can't out-grep a judge that reads every source file for every claim.

---

## Phase 3 — save judge

Prompt pasted verbatim (prompt-006):

> Take the winning detector (or the ensemble) from module-5/scoreboard.md. Rewrite it as a portable judge prompt. The judge should:
>
> 1. Take any output file and the relevant source files as inputs.
> 2. Flag ungrounded claims using the method(s) that won the benchmark.
> 3. Return a short structured list — claim flagged, category, one-line reasoning.
> 4. Not classify claims I didn't ask about. Stay narrow. A judge that tries to do everything does nothing well.
>
> Write the judge as a markdown file to judges/groundedness-judge.md — a short heading, one paragraph describing what it checks and why, then the prompt itself (the thing I'd paste at Claude to run the judge). Keep the judge prompt under 20 lines. Prompts that sprawl get ignored.
>
> At the end of the file, add a one-line "Known limit:" — the failure mode this judge doesn't catch, based on what lost the benchmark.

Judge saved to `judges/groundedness-judge.md`. Encodes self-consistency re-derivation + counter-evidence attribution check. Under 20 lines. Known limit named: missing external citations (Gartner/Forrester) read the same as fabricated ones when the SOURCES set is incomplete — which is what lost citation-integrity the bake-off.

---

## Close — still-uncertain

`module-5/still-uncertain.md` written — one line naming re-derivation as the check Maija wants running on every briefing from here on.

---

[harness substitution — take-home prompt-007 truncated; kit setup belongs to post-session homework, not mechanical run]
