# Judge — Claude Basics M1 build-your-system verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

You are grading whether the M1 prompt chain ran end-to-end on a clean scratch and whether the file artefacts have the expected SHAPE. You are NOT grading whether the response.md is good or whether the CLAUDE.md rules read well. Those are eval-system concerns.

## Inputs

- **Scratch:** `curriculum/evals/mechanical/scratch/claude-basics-m1`
- **Actor scrollback:** `curriculum/evals/mechanical/instances/claude-basics-m1-verbatim-actor-scrollback.md`
- **Actor report:** `curriculum/evals/mechanical/instances/claude-basics-m1-verbatim-actor-report.md`
- **Prompt files:** `/tmp/prompts/build-your-system/prompt-00{1,2,3,4,5}.txt`
- **Substitutes:** `/tmp/claude-basics-m1-substitutes/{it-director-question,wrong-claim}.txt`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` — V-checks
- `curriculum/evals/mechanical/bin/prompt-source-audit.sh build-your-system` — P/E checks (static lint)

## Method

For every assertion below: run the named script, capture exit code + first line of output, paste into the report. No quoting, no narration, no taste calls. If you find yourself reading scrollback to judge whether content is "good," stop — that's not your job.

## Assertions

### Verbatim round-trip (V1–V5)

For each `prompt-00N.txt` (N = 1..5): `verbatim-check.sh <prompt> <scrollback>`. Report exit code + prefix.

### File-existence (mechanics)

- **A1.** All seven snapshot files exist: `test -f` for `response.md`, `response.md.v1-baseline`, `.v2-claude-md`, `.v3-rule-added`, `.v4-final`, `CLAUDE.md`, `CLAUDE.md.v1-initial`, `CLAUDE.md.v2-rule-added`.
- **A2.** OneDrive runtime line present in all three CLAUDE.md snapshots: `grep -q 'You are working in a OneDrive-synced folder. Assume eventual consistency on cross-folder reads.'` on each of `CLAUDE.md`, `CLAUDE.md.v1-initial`, `CLAUDE.md.v2-rule-added`. Also assert it lands within the first 5 non-empty lines of final `CLAUDE.md` (`grep -n` + `head`).
- **A3.** CLAUDE.md grew across phases: `[ $(wc -l < CLAUDE.md.v2-rule-added) -gt $(wc -l < CLAUDE.md.v1-initial) ]`. Final has ≥ 4 distinct rule lines (`grep -cE '^[0-9]+\.|^- '`).
- **A4a.** `response.md.v4-final` does NOT contain the wrong-claim strings: `grep -q 'Microsoft Forms' response.md.v4-final && FAIL`; same for `data protection officer`.
- **A4b.** v1→v4 diff: `diff -u response.md.v1-baseline response.md.v4-final | grep -cE '^[+-]'` ≥ 20.
- **A5.** Final `response.md.v4-final` contains at least one team-specific marker: `grep -qE 'Jira|Confluence|ServiceNow|M365 admin'`. Single named-string presence is enough.
- **A6.** No placeholder leaks: `grep -rE '\[[A-Z][A-Z_]+\]|<my-|<group-|<your-|\[paste here\]|\[your task\]'` across scratch files. Zero hits.

### Continuation between phases

- **A7.** v2→v3 diff continuity: `diff response.md.v2-claude-md response.md.v3-rule-added | wc -l` > 0 AND < 80% of `wc -l response.md.v2-claude-md`.

### Cross-phase Reads (transcript)

- **A8.** Phase 3 Re-Read of `response.md` and `CLAUDE.md`: `jq -c 'select(.message.content[]?.input.file_path? | test("response\\.md$|CLAUDE\\.md$"))' <jsonl>` shows Reads after the prompt-002 paste and before prompt-003 save. Single jq call, count ≥ 2.
- **A9.** Phase 4 Re-Read of `response.md` after rule add: same jq, after prompt-004 paste.

### One-at-a-time / order assertions

- **A10.** Phase 2 propose-then-save: between prompt-002 paste and the *"Rule 2 is too generic"* push-back substring, no `Write` tool call on `CLAUDE.md` in transcript. `jq` filter. After the push-back, ≥ 1 Write of `CLAUDE.md`.
- **A11.** Phase 3 diff-summary in chat before save: between prompt-003 paste and Write of `response.md`, scrollback contains ≥ 3 lines starting with a numbered list marker or a bullet.
- **A12.** Phase 5 names three specifics: scrollback Phase-5 segment contains ≥ 3 backtick spans or quoted strings before the *"All three look right"* push-back substring.

### Substitution log (open-hook landings)

- **A13.** IT-Director question landed: `verbatim-check.sh /tmp/claude-basics-m1-substitutes/it-director-question.txt scrollback`.
- **A14.** Wrong-claim landed: `verbatim-check.sh /tmp/claude-basics-m1-substitutes/wrong-claim.txt scrollback`.

### Banned-shape leak detector (C-block)

- **C1.** Grep saved scratch files for: `tell the person`, `sitting next to you`, `share with your neighbor`, `tell the room`, `sit with`, `take a moment`, `let it land`. Zero hits. (Leak detector for prompt smuggling — not a writing-register check.)

### Harness leakage (H1–H5)

Run `jq` on transcript for any Read of:
- `curriculum/trainings/claude-basics/exercises/build-your-system.md` → H1 FAIL.
- Any judge runner or sibling actor runner (own actor allowed) → H2 FAIL.
- Any `*.maintainer.md` → H3 FAIL.
- Any harness-internal file inside `<scratch>` that the Actor then Read again unexpectedly → H4 FAIL.
- `ls <scratch>` should match expected set (response.md + 4 snapshots + CLAUDE.md + 2 snapshots + .keep). Anything else → H5 FAIL.

### Prompt-source audit

Run: `bin/prompt-source-audit.sh build-your-system`. Capture exit code + verdict. PASS if `Verdict: READY` or `READY-WITH-FLAGS`; FAIL if `BLOCK`.

## Report

Write `curriculum/evals/mechanical/instances/claude-basics-m1-verbatim-judge-report.md`:

```markdown
# Judge report — Claude Basics M1 verbatim

## Summary
Verdict: PASS | FAIL (N/M assertions). Sev-1 from prompt-source-audit: K.

## V1–V5 (verbatim-check.sh)
V1: PASS — <prefix>
...

## A-series (mechanics + continuation + cross-phase Reads)
A1: PASS — files present
...

## C-series (banned-shape leaks)
C1: PASS — zero hits
...

## H-series (harness leakage)
H1: PASS — no Read of curriculum/trainings/claude-basics/exercises/
...

## Prompt-source audit
<paste the script's stdout>
```

Under 400 words. No quoting beyond what scripts emit. Leave artifacts in place.

## What you must NOT do

- Quote a sentence from `response.md` and judge if it's "grounded" or team-specific enough.
- Decide whether the CLAUDE.md rules are "well-written" or "would actually catch the failure mode."
- Read the response.md or CLAUDE.md snapshots to evaluate voice, framing, or content quality.
- Compare phases qualitatively beyond the diff-bound continuity check and named-string presence checks.

If an assertion can't be reduced to a script call or a `jq`/`grep` one-liner, drop it from this judge and flag the gap in the report — that's a script-ratchet TODO, not a Judge job.
