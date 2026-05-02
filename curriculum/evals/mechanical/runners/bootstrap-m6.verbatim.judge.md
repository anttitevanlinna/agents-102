# Judge — Bootstrap M6 eval-loop verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

**Load-bearing invariant:** `judges/groundedness-judge.md` must be byte-identical at end as at start. Any change is a CRITICAL FAILURE regardless of how good the dashboard looks.

You are NOT grading whether briefings improved meaningfully, whether per-claim feedback is actionable, whether new generator rules are insightful. You ARE checking files exist with expected shape, the prompt-chain ran, and the judge file is byte-unchanged.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m6`
- **Actor transcripts (2):** setup + run `.jsonl` paths from orchestrator.
- **Prompt files:** `/tmp/prompts/eval-loop/prompt-00{1..6}.txt`
- **Artefacts:** `module-6/{fresh-briefing,first-run-judgment,orchestrator,generator,dashboard,heartbeat,eval-notes}.md`, `module-6/runs/round-{1,2,3}/{briefing,judgment,strategy-diff}.md`, `module-6/runs/round-2/deltas.md`, `judges/groundedness-judge.md`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh`
- `curriculum/evals/mechanical/bin/prompt-source-audit.sh eval-loop`
- `shasum`, `diff`, `grep`, `wc -l`, `test -f`, `jq`

## Method

For every assertion: run the named script, capture exit code + first line. No taste calls.

## Assertions

### Verbatim round-trip

- **V1-V3.** prompt-001..003 verbatim in setup scrollback.
- **V4-V5.** prompt-004, 005 verbatim in run scrollback.
- **V6.** prompt-006 truncation log present in run scrollback: `grep -F 'Prompt-006' <scrollback>`. FAIL if run Actor executed prompt-006.

### Judge-file immutability (CRITICAL — overrides everything below)

- **J1.** `judges/groundedness-judge.md` byte-identical at end vs Phase-2b-start baseline. `shasum` compare. FAIL if any single line differs.
- **J2.** No `Write` or `Edit` tool call targeting `judges/groundedness-judge.md` in either transcript. `jq` filter both `.jsonl`. FAIL on any such call.
- **J3.** `module-6/orchestrator.md` asserts judge file is never written to: `grep -iE 'judge.*never|never.*judge|read-only.*judge|judge.*read-only' module-6/orchestrator.md`.

### Phase 0 — manual judge run

- **A1.** `module-6/fresh-briefing.md` exists. `wc -l` between 15 and 100.
- **A2.** `module-6/first-run-judgment.md` exists. Has per-claim feedback sentences (not verdict-only): `grep -ciE '(would make it groundable|cite|caveat|missing)' module-6/first-run-judgment.md` ≥ 1.

### Phase 1 — orchestrator.md

- **A3.** `module-6/orchestrator.md` exists. Names key elements: `grep -iE 'round 1|round 2|round 3|generator|judge|heartbeat|dashboard'` ≥ 5 distinct hits.
- **A4.** Pseudo-code outline appears in setup scrollback BEFORE orchestrator file Write. `jq` setup transcript ordering.

### Phase 2a — run folders + seeded generator

- **A5.** `module-6/runs/round-{1,2,3}/` exist: `test -d` each.
- **A6.** `module-6/dashboard.md` exists at end of setup: `test -f`.
- **A7.** `module-6/generator.md` exists with seeded text from prompt-003: `test -f` and `wc -l` ≥ 1.

### Phase 2b — orchestrator execution

- **A8.** For each N in {1,2,3}: `test -f module-6/runs/round-N/{briefing,judgment,strategy-diff}.md`.
- **A9.** `module-6/runs/round-2/deltas.md` exists.
- **A10.** `module-6/heartbeat.md` has ≥ 6 lines: `wc -l` ≥ 6.
- **A11.** Each `judgment.md` has top-line flagged-claims count: `grep -F 'Flagged claims:' module-6/runs/round-N/judgment.md` per round.
- **A12.** Each `strategy-diff.md` exists and is non-empty: `wc -l` ≥ 1 per round.
- **A13.** `module-6/generator.md` at end differs from seeded state. `diff` against the seeded version (extractable from prompt-003 text or setup-actor's initial Write). At least 3 added lines: `diff <seed> module-6/generator.md | grep -c '^>'` ≥ 3.
- **A14.** `module-6/dashboard.md` populated: contains trajectory table, rules-per-round, monotonic verdict, judge-integrity line. `grep -iE 'round|trajectory|monotonic|shasum|integrity'` ≥ 4 distinct.

### Phase 3 — two diffs

- **A15.** Run scrollback contains judge diff with zero changes: `grep -iE 'zero changes|byte-identical|judge.*unchanged'` in run scrollback.
- **A16.** Run scrollback contains generator diff listing new rules: `grep -iE 'generator.*diff|new rule'` in run scrollback.

### Phase 4 — eval-notes

- **A17.** `module-6/eval-notes.md` exists. ≤ 30 lines.

### Truncations

- **A18.** Prompt-006 NOT executed. No new orchestrator file outside `module-6/orchestrator.md`. No "pricing memo" or generic-topic scaffold.

### Harness leakage

- **H1.** No Read of `curriculum/exercises/`. `jq` per transcript.
- **H2.** No Read of judge / sibling actor runner.
- **H3.** No Read of maintainer docs.
- **H4.** No real nested Task dispatch. (Inline substitutions logged.)
- **H5.** No real WebFetch.
- **H6.** No Write to `module-3/*`, `module-4/*`, or `module-5/*`. `jq` per transcript.
- **H7.** Setup Actor did NOT write to `judges/groundedness-judge.md`. (Complements J1/J2.)
- **H8.** Run Actor did NOT write to `judges/groundedness-judge.md`. (Complements J1/J2.)

### Prompt-source audit

Run `bin/prompt-source-audit.sh eval-loop`. Capture exit + verdict.

## Report

Write `.../instances/bootstrap-m6-verbatim-judge-report.md`:

```markdown
# Judge report — Bootstrap M6 verbatim

## Summary
Verdict: PASS | FAIL (N/M). Sev-1 from prompt-source-audit: K.
Critical: J1-J3 status (judge immutability).

## V1–V6
...

## J1–J3 (load-bearing)
...

## A-series
...

## H-series
...

## Prompt-source audit
<paste stdout>
```

Under 600 words. Lead with J1-J3 — they override everything below.

## What you must NOT do

- Quote a claim from a briefing and judge if it's "well-fabricated."
- Decide whether the score trajectory is "meaningful improvement."
- Read strategy-diff files to evaluate rule quality.
- Compare rounds qualitatively beyond flagged-count delta.

If an assertion can't be a script call or grep one-liner, drop it and flag as a script-ratchet TODO.
