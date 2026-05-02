# Judge — Claude Basics M2 the-it-directors-prompt verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

You are grading whether the M2 prompt chain ran end-to-end (Phases 2–5) and whether the file artefacts have the expected SHAPE. Not grading whether the verification claims are accurate or the new CLAUDE.md rule is well-phrased.

## Inputs

- **Scratch:** `curriculum/evals/mechanical/scratch/claude-basics-m2`
- **Actor scrollback:** `curriculum/evals/mechanical/instances/claude-basics-m2-verbatim-actor-scrollback.md`
- **Actor report:** `curriculum/evals/mechanical/instances/claude-basics-m2-verbatim-actor-report.md`
- **Prompt files:** `/tmp/prompts/the-it-directors-prompt/prompt-00{1,2,3,4}.txt`
- **Substitutes:** `/tmp/claude-basics-m2-substitutes/{it-director-prompt,phase-4-verdicts,phase-5-wrong-row}.txt`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` — V-checks
- `curriculum/evals/mechanical/bin/prompt-source-audit.sh the-it-directors-prompt` — P/E checks (static lint)

## Method

For every assertion below: run the named script, capture exit code + first line of output, paste into the report. No quoting, no narration, no taste calls.

## Assertions

### Verbatim round-trip (V1–V4)

For each `prompt-00N.txt` (N = 1..4): `verbatim-check.sh <prompt> <scrollback>`. Report exit code + prefix.

### File-existence (mechanics)

- **A1.** Final artifacts exist: `test -f` for `CLAUDE.md`, `CLAUDE.md.v6-rule-added`, `verification.md`, `verification.md.v1`, `verification-table.md`.
- **A2a.** Final `CLAUDE.md` line count strictly greater than starting (5 rules): compare against `CLAUDE.md.v6-rule-added` baseline if no separate v0 snapshot exists. Final has ≥ 6 distinct rule lines (`grep -cE '^[0-9]+\.|^- '`).
- **A2b.** OneDrive runtime line still rule 1 verbatim: `grep -n 'You are working in a OneDrive-synced folder. Assume eventual consistency on cross-folder reads.' CLAUDE.md` lands within first 5 non-empty lines.
- **A3.** Phase 5 added a Teams-recording rule: `grep -qE 'Teams meeting recordings|recording-storage|Stream' CLAUDE.md`.
- **A4.** `verification-table.md` has 6 rows with all Verdict cells filled. Heuristic: count table rows (`grep -cE '^\|' verification-table.md` minus header/separator) ≥ 6. Verdict-distribution check: `grep -c 'checked-true'` ≥ 2; `grep -c 'checked-wrong'` ≥ 2; `grep -cE "I can't tell|I-can't-tell"` ≥ 2.
- **A5.** Stream wrong-claim seeded: `grep -q 'Stream' verification.md || grep -q 'Stream' verification.md.v1`.
- **A6.** No placeholder leaks: `grep -rE '\[[A-Z][A-Z_]+\]|<my-|<group-|<your-|\[paste here\]|\[your task\]'` across scratch. Zero hits.

### Cross-phase Reads (transcript)

- **A7.** Session-start Read of pre-staged `CLAUDE.md`: `jq -c 'select(.message.content[]?.input.file_path? | test("CLAUDE\\.md$"))' <jsonl>` shows ≥ 1 Read before prompt-001 paste.

### One-at-a-time / order assertions

- **A8.** Phase 3 propose-then-save: between prompt-002 paste and the *"Row 4's source"* push-back substring, no `Write` tool call on `verification-table.md` in transcript. After the push-back, ≥ 1 Write of `verification-table.md`. `jq` filter.
- **A9.** Phase 4 row-by-row dialog: between prompt-003 paste and prompt-004 paste, count distinct assistant turns that print a single row. Expect ≥ 5 (six rows; one batched is tolerated). FAIL if a single assistant turn fires ≥ 3 row prints.
- **A10.** Phase 4 verdict order matches `phase-4-verdicts.txt`: `verbatim-check.sh /tmp/claude-basics-m2-substitutes/phase-4-verdicts.txt scrollback`.

### Substitution log (open-hook landings)

- **A11.** IT-Director-composed prompt landed: `verbatim-check.sh /tmp/claude-basics-m2-substitutes/it-director-prompt.txt scrollback`.
- **A12.** Phase 5 wrong-row landed: `verbatim-check.sh /tmp/claude-basics-m2-substitutes/phase-5-wrong-row.txt scrollback`.

### Banned-shape leak detector (C-block)

- **C1.** Grep saved scratch files for: `tell the person`, `sitting next to you`, `share with your neighbor`, `tell the room`, `sit with`, `take a moment`, `let it land`. Zero hits. (Leak detector — not a writing-register check.)

### Harness leakage (H1–H5)

Run `jq` on transcript for any Read of:
- `curriculum/trainings/claude-basics/exercises/the-it-directors-prompt.md` → H1 FAIL.
- Any judge runner or sibling actor runner (own actor allowed) → H2 FAIL.
- Any `*.maintainer.md` → H3 FAIL.
- Any harness-internal file inside `<scratch>` Read unexpectedly → H4 FAIL.
- `ls <scratch>` matches expected set. Anything else → H5 FAIL.

### Prompt-source audit

Run: `bin/prompt-source-audit.sh the-it-directors-prompt`. Capture exit code + verdict. PASS if `Verdict: READY` or `READY-WITH-FLAGS`; FAIL if `BLOCK`.

## Report

Write `curriculum/evals/mechanical/instances/claude-basics-m2-verbatim-judge-report.md`:

```markdown
# Judge report — Claude Basics M2 verbatim

## Summary
Verdict: PASS | FAIL (N/M assertions). Sev-1 from prompt-source-audit: K.

## V1–V4 (verbatim-check.sh)
V1: PASS — <prefix>
...

## A-series (mechanics + cross-phase Reads + order)
A1: PASS — files present
...

## C-series (banned-shape leaks)
C1: PASS — zero hits

## H-series (harness leakage)
H1: PASS — no Read of curriculum/trainings/claude-basics/exercises/
...

## Prompt-source audit
<paste the script's stdout>
```

Under 400 words. No quoting beyond what scripts emit. Leave artifacts in place.

## What you must NOT do

- Quote a verification.md claim and judge whether it's actually true about M365.
- Decide whether the new CLAUDE.md rule "really would" catch future Stream confusions.
- Read scratch files to evaluate voice, framing, or content quality.
- Compare phases qualitatively beyond the named-string presence and verdict-distribution counts.

If an assertion can't be reduced to a script call or a `jq`/`grep` one-liner, drop it from this judge and flag the gap in the report — that's a script-ratchet TODO, not a Judge job.
