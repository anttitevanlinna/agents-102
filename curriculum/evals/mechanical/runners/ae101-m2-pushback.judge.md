# Judge — AE101 M2 push-back-on-the-plan

**Dispatch with `model: "haiku"`.** Script-first acceptance-test judge. No taste calls. Content quality belongs to the eval system.

You are grading whether the M2 push-back chain ran end-to-end and whether the file artefacts have the expected SHAPE. You are NOT grading whether the plan body is sharp, whether the push-backs are well-phrased, or whether the design-pattern name is well-chosen.

**Discipline rule (rule #20):** every assertion ends with *"PASS on exit 0; FAIL on any non-zero exit."* The script's exit code IS the verdict.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-m2-pushback`
- **Scratch repo:** `<scratch>/repo`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>` — passed by orchestrator
- **Actor scrollback:** `instances/ae101-m2-pushback-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/push-back-on-the-plan/prompt-00{1..4}.txt`
- **Mock student inputs:** `/tmp/ae101-mocks/student-inputs.md`

## Tooling

- `bin/prompt-read-check.sh <prompt> <transcript>` — V-checks
- `bin/prompt-source-audit.sh push-back-on-the-plan` — P/E checks
- `bin/runner-mapping-check.sh <runner> <exercise>` — pre-flight
- `jq` / `grep` / `test -f` for shape sampling

## Method

For every assertion: run the named script, capture exit code + first line of stdout. PASS on exit 0; FAIL on any non-zero exit.

## Assertions

### Verbatim round-trip (V-series)

- **V1.** prompt-001 Read in transcript.
- **V2.** prompt-002 Read in transcript.
- **V3.** prompt-003 Read in transcript.
- **V4.** prompt-004 Read in transcript.

### Plan artefacts (P-series)

- **P1.** Plan file exists: `test -f <scratch>/repo/.claude-plans/groupbyreason-helper.md`.
- **P2.** Plan body has ≥5 numbered steps. `grep -cE '^[0-9]+\.' <scratch>/repo/.claude-plans/groupbyreason-helper.md` ≥ 5.
- **P3.** Sharpened soft item — plan mentions "compose" (not "duplicate"). `grep -ciE 'compose' <scratch>/repo/.claude-plans/groupbyreason-helper.md` ≥ 1.
- **P4.** Plan mentions tests before wiring (tests-first ordering applied). Heuristic: first occurrence of "test" comes before first occurrence of "wire" or "wiring". Use awk on line numbers.

### Push-back discipline (D-series)

- **D1.** Two push-back messages in Phase 3 region of scrollback. `awk '/Phase 2/,/Phase 3/' <scrollback> | grep -ciE 'push.back|soft item|reorder|TDD'` ≥ 2.
- **D2.** Plan mode substitution logged. `grep -cE 'harness substitution.*plan' <scrollback>` ≥ 1.
- **D3.** Five distinct Q&A turns in Phase 3 (second-pass walk-down). `awk '/Phase 3/,/Phase 4/' <scrollback> | grep -ciE '^Q[1-9]|Question [1-9]|^### Q'` ≥ 5.

### Stop discipline (S-series — hard rule)

- **S1.** No `npm test` invocation AFTER the plan landed. The Stop rule: `awk '/Phase 4/,EOF' <scrollback> | grep -cE 'npm test|node --test'` → 0 expected. PASS if 0.
- **S2.** No Write/Edit to `<scratch>/repo/src/` or `<scratch>/repo/tests/` in transcript. `jq -r '.message.content[]? | select(.type=="tool_use" and (.name=="Write" or .name=="Edit")) | .input.file_path' <transcript> | grep -cE 'scratch/ae101-m2-pushback/repo/(src|tests)/'` → 0 expected.

### Pattern naming (N-series)

- **N1.** Phase 4 response names a design pattern. `awk '/Phase 4/,/Phase 5/' <scrollback> | grep -ciE 'design pattern|two.pass|second.pass|plan.read|approval inflation'` ≥ 1.

### CLAUDE.local.md riding answer (C-series)

- **C1.** Phase 5 answers the auto-load question. `awk '/Phase 5/,EOF' <scrollback> | grep -ciE 'auto.load|cold.start|loads at session|concatenate|every session'` ≥ 1.

### Harness leakage (H-series)

- **H1.** No Read of `curriculum/exercises/`. PASS if 0.
- **H2.** No Read of `curriculum/prompts/` (registry). PASS if 0.
- **H3.** No Read of judge runner or `*.maintainer.md`. PASS if 0.

### Pre-flight + prompt-source audit

- **PF1.** `runner-mapping-check.sh` PASS.
- **PS1.** `prompt-source-audit.sh push-back-on-the-plan` not BLOCK.

## Report

Write `instances/ae101-m2-pushback-judge-report.md`. Under 500 words. PASS if every assertion exits 0 AND PS1 not BLOCK.
