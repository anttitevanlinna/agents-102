# Judge — Agents 101 M5 hallucination-benchmark verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

Grading seven Actor dispatches (setup + five detectors + scorer). You are NOT grading whether the briefing reads well, whether the detectors caught the "right" things, whether the judge prompt is well-crafted. You ARE checking that files exist, contain the expected shape, and the prompt-chain ran.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/agents-101-m5`
- **Actor transcripts (7):** orchestrator passes paths for setup, 5 detectors, scorer.
- **Prompt files:** `/tmp/prompts/hallucination-bakeoff/prompt-00{1..7}.txt`
- **Artefacts:** `module-5/{briefing,benchmark,scoreboard,still-uncertain}.md`, `module-5/detectors/*.md`, `judges/groundedness-judge.md`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh`
- `curriculum/evals/mechanical/bin/prompt-source-audit.sh hallucination-bakeoff`
- `jq`, `grep`, `wc -l`, `test -f`

## Method

For every assertion: run the named script, capture exit code + first line. No taste calls. If you find yourself reading scrollback to judge whether content is "good," stop.

## Assertions

### Verbatim round-trip

- **V1.** prompt-001 verbatim in setup scrollback.
- **V2.** prompt-002 verbatim in setup scrollback.
- **V3.** prompt-003 NOT required verbatim (parameterized per dispatch). Substitution log expected.
- **V4-V6.** prompt-004, 005, 006 verbatim in scorer scrollback.
- **V7.** prompt-007 truncation log: `grep -F 'take-home prompt-007 truncated' <scorer-scrollback>`.

### Phase 0a — briefing

- **A1.** `module-5/briefing.md` exists. `wc -l` between 15 and 100.

### Phase 0b — benchmark

- **A2.** Setup Actor walked 5 claim-verdict cycles one at a time. `jq` setup transcript: count distinct assistant turns between prompt-002 paste and `benchmark.md` Write — expect ≥ 5.
- **A3.** `module-5/benchmark.md` exists. Five claim entries: `grep -c '^- ' module-5/benchmark.md` ≥ 5 OR table-row count ≥ 5.
- **A4.** Verdict mix not monotone: both `grep -i 'grounded'` (excluding `not grounded`) AND `grep -iF 'not grounded'` should hit at least once each.

### Phase 1 — five parallel detectors

- **A5.** Five detector files exist: `test -f` on `module-5/detectors/{source-triangulation,entailment,citation-integrity,self-consistency,counter-evidence}.md`. (Allow case/slug variants — `ls module-5/detectors/*.md | wc -l` = 5 sufficient.)
- **A6.** Each detector file has a Method line: `grep -F 'Method:' <file>` per file.
- **A7.** Each detector has 2-7 findings: `grep -c '^- CLAIM:' <file>` per file in [2,7].
- **A8.** Detectors did NOT read sibling detector files. `jq` per detector transcript for Reads of other `module-5/detectors/*.md`.
- **A9.** Detectors did NOT read `module-5/benchmark.md`. `jq` per detector transcript.

### Phase 2 — scorer

- **A10.** `module-5/scoreboard.md` exists with table header containing columns Detector, Precision, Recall, Coverage. `grep -F '| Detector | Precision | Recall | Coverage'`.
- **A11.** Five data rows: `grep -c '^|' module-5/scoreboard.md` minus header/separator ≥ 5.
- **A12.** Winner named below table: `grep -iE 'winner|ensemble' module-5/scoreboard.md`.

### Phase 2b — classic-way contrast

- **A13.** Three-line classic-way contrast in scorer scrollback: `grep -iE 'classic|faster|slower' <scrollback>` ≥ 3 distinct lines.

### Phase 3 — save judge

- **A14.** `judges/groundedness-judge.md` exists. `wc -l` ≤ 30.
- **A15.** Has `Known limit:` line: `grep -F 'Known limit:' judges/groundedness-judge.md`.
- **A16.** No `[BRACKET]` placeholders: `grep -nE '\[[A-Z][A-Z_]+\]' judges/groundedness-judge.md` returns nothing.

### Close

- **A17.** `module-5/still-uncertain.md` exists. ≤ 6 lines.

### Truncations

- **A18.** prompt-007 NOT executed: `jq` scorer transcript for any new file under `judges/` other than `groundedness-judge.md`. FAIL if any.
- **A19.** Debrief NOT executed.

### Harness leakage

- **H1.** No Actor read `curriculum/exercises/`. `jq` per transcript.
- **H2.** No Actor read judge / sibling actor runner.
- **H3.** No Actor read maintainer docs.
- **H4.** No real WebFetch attempts. `jq` for WebFetch tool calls.
- **H5.** No Write to `module-3/*` or `module-4/*` paths. `jq` per transcript.

### Prompt-source audit

Run `bin/prompt-source-audit.sh hallucination-bakeoff`. Capture exit + verdict.

## Report

Write `.../instances/agents-101-m5-verbatim-judge-report.md`:

```markdown
# Judge report — Agents 101 M5 verbatim

## Summary
Verdict: PASS | FAIL (N/M). Sev-1 from prompt-source-audit: K.

## V1–V7
...

## A-series
...

## H-series
...

## Prompt-source audit
<paste stdout>
```

Under 500 words.

## What you must NOT do

- Quote a claim from the briefing and judge if it's "well-fabricated."
- Decide whether the winning detector was the "right" one.
- Read judges/groundedness-judge.md to evaluate prose quality.
- Compare detectors qualitatively beyond the assigned-method check.

If an assertion can't be a script call or grep one-liner, drop it and flag as a script-ratchet TODO.
