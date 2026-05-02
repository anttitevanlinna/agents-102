# Judge — Claude Basics M3 find-the-crux verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

You are grading whether the M3 prompt chain ran end-to-end across three phases and whether the file artefacts have the expected SHAPE. Not grading whether the divergence is "real," the crux is "sharp," or the rollout strategy "sounds right."

## Inputs

- **Scratch:** `curriculum/evals/mechanical/scratch/claude-basics-m3`
- **Actor scrollback:** `curriculum/evals/mechanical/instances/claude-basics-m3-verbatim-actor-scrollback.md`
- **Actor report:** `curriculum/evals/mechanical/instances/claude-basics-m3-verbatim-actor-report.md`
- **Prompt files:** `/tmp/prompts/find-the-crux/prompt-00{1,2,3}.txt`
- **Substitutes:** `/tmp/claude-basics-m3-substitutes/{divergence-interview-answers,group-synthesis-pushback,cross-group-pushback}.txt`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` — V-checks
- `curriculum/evals/mechanical/bin/prompt-source-audit.sh find-the-crux` — P/E checks (static lint)

## Method

For every assertion below: run the named script, capture exit code + first line of output, paste into the report. No quoting, no narration, no taste calls.

## Assertions

### Verbatim round-trip (V1–V3)

For each `prompt-00N.txt` (N = 1..3): `verbatim-check.sh <prompt> <scrollback>`. Report exit code + prefix.

### File-existence (mechanics)

- **A1.** Three Actor-written artifacts present: `test -f group-1/divergence-antti.md`, `test -f group-1/group-crux-1.md`, `test -f rollout-strategy.md`.
- **A2.** Pre-staged files untouched. Compare mtimes against scratch baseline OR `diff` against a reference copy if available. Targets: `group-1/divergence-{marja,juhani,petra}.md`, `group-{2,3,4}/group-crux-{2,3,4}.md`. Heuristic: `find <scratch> -newer <prompt-001.txt> -name 'divergence-marja.md'` → must be empty.
- **A3.** `divergence-antti.md` has ≥ 3 distinct difficulty sections: `grep -cE '^##|^###|^- |^[0-9]+\.' group-1/divergence-antti.md` ≥ 3.
- **A4.** `group-crux-1.md` contains ≥ 4 quote markers attributable to the four divergence sources: `grep -cE '^>|"' group-1/group-crux-1.md` ≥ 4. AND filename references to all four sources present somewhere in the file: `grep -qE 'marja|juhani|petra|antti'` (count ≥ 3 of 4 names).
- **A5.** `rollout-strategy.md` has three sections present by named-string: `grep -iqE 'priorities?' && grep -iqE 'deferrals?' && grep -iqE 'question'`. Push-back integration markers: `grep -iqE 'training material' && grep -iqE 'IT Director'`.
- **A6.** No placeholder leaks: `grep -rE '\[[A-Z][A-Z_]+\]|<my-|<group-|<antti>|<your-'` across saved artifacts (`divergence-antti.md`, `group-crux-1.md`, `rollout-strategy.md`). Zero hits.

### Cross-phase Reads (transcript)

- **A7.** Phase 2 Read of all four `group-1/` divergence files: `jq -c 'select(.message.content[]?.input.file_path? | test("group-1/divergence-(marja|juhani|petra|antti)\\.md$"))' <jsonl>` shows ≥ 4 distinct Reads after prompt-002 paste.
- **A8.** Phase 3 Read of all four `group-N/group-crux-N.md` files: same jq for `group-[1-4]/group-crux-[1-4]\\.md$`, ≥ 4 distinct Reads after prompt-003 paste.

### One-at-a-time / order assertions

- **A9.** Phase 1 one-question-at-a-time: between prompt-001 paste and Write of `divergence-antti.md`, count distinct assistant turns that ask a single interview question. Expect ≥ 3. FAIL if a single assistant turn fires ≥ 2 questions.
- **A10.** Phase 2 propose-then-save: between prompt-002 paste and the group-synthesis-pushback substring, no `Write` tool call on `group-crux-1.md`. After push-back, ≥ 1 Write. `jq` filter.
- **A11.** Phase 3 propose-then-save: between prompt-003 paste and the cross-group-pushback substring, no `Write` tool call on `rollout-strategy.md`. After push-back, ≥ 1 Write.

### Substitution log (open-hook landings)

- **A12.** `group-1/` open-hook landed: scrollback contains `group-1/` within ~5 lines after prompt-001 paste (heuristic `grep -A5` after prompt's last line).
- **A13.** Phase 2 group-synthesis-pushback landed: `verbatim-check.sh /tmp/claude-basics-m3-substitutes/group-synthesis-pushback.txt scrollback`.
- **A14.** Phase 3 cross-group-pushback landed: `verbatim-check.sh /tmp/claude-basics-m3-substitutes/cross-group-pushback.txt scrollback`.

### Banned-shape leak detector (C-block)

- **C1.** Grep saved scratch files for: `tell the person`, `sitting next to you`, `share with your neighbor`, `tell the room`, `sit with`, `take a moment`, `let it land`. Zero hits.

### Harness leakage (H1–H5)

Run `jq` on transcript for any Read of:
- `curriculum/trainings/claude-basics/exercises/find-the-crux.md` → H1 FAIL.
- Any judge runner or sibling actor runner (own actor allowed) → H2 FAIL.
- Any `*.maintainer.md` → H3 FAIL.
- Any harness-internal file inside `<scratch>` Read unexpectedly (e.g. re-Read after Write) → H4 FAIL.
- `ls <scratch>` and subdirs match expected set: pre-staged files + the three new artifacts. Anything else → H5 FAIL.

### Prompt-source audit

Run: `bin/prompt-source-audit.sh find-the-crux`. Capture exit code + verdict. PASS if `Verdict: READY` or `READY-WITH-FLAGS`; FAIL if `BLOCK`.

## Report

Write `curriculum/evals/mechanical/instances/claude-basics-m3-verbatim-judge-report.md`:

```markdown
# Judge report — Claude Basics M3 verbatim

## Summary
Verdict: PASS | FAIL (N/M assertions). Sev-1 from prompt-source-audit: K.

## V1–V3 (verbatim-check.sh)
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

- Quote a sentence from `divergence-antti.md` and judge if the difficulty is "real" or in "participant voice."
- Decide whether the crux is "sharp enough" or whether the rollout strategy "would actually work."
- Read saved files to evaluate voice, framing, or content quality.
- Compare phases qualitatively beyond named-string presence, count thresholds, and Read-trace assertions.

If an assertion can't be reduced to a script call or a `jq`/`grep` one-liner, drop it from this judge and flag the gap in the report — that's a script-ratchet TODO, not a Judge job.
