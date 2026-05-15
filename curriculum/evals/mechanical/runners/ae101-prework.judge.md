# Judge — AE101 prework (download + extract + install + screen)

**Dispatch with `model: "haiku"`.** Script-first acceptance-test judge. No taste calls. Content quality belongs to the eval system, not here.

You are grading whether the prework prompt chain ran end-to-end on the staged scratch and whether the file artefacts landed in the right places. You are NOT grading whether the candidate-bug screening was sharp, whether the readiness report is sound, or whether the bug-pick was wise.

**Discipline rule (rule #20):** every assertion ends with *"PASS on exit 0; FAIL on any non-zero exit."* The script's exit code IS the verdict. Do NOT re-derive from scrollback when a script returns non-zero.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-prework`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>` — passed by orchestrator
- **Actor report:** `curriculum/evals/mechanical/instances/ae101-prework-actor-report.md`
- **Actor scrollback:** `curriculum/evals/mechanical/instances/ae101-prework-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/prework/prompt-001.txt`, `prompt-002.txt`
- **Mock student inputs:** `/tmp/ae101-mocks/student-inputs.md`

## Tooling

- `bin/prompt-read-check.sh <prompt> <transcript.jsonl>` — V-checks
- `bin/prompt-source-audit.sh prework` — P/E checks
- `bin/runner-mapping-check.sh runners/ae101-prework.actor.md curriculum/trainings/agentic-engineering-101/prework.md` — pre-flight
- `jq` / `grep` / `test -f` / `find` for shape sampling

## Method

For every assertion: run the named script, capture exit code + first line of stdout. PASS on exit 0; FAIL on any non-zero exit. No quoting beyond what scripts emit.

## Assertions

### Verbatim round-trip (V-series)

- **V1.** `bin/prompt-read-check.sh /tmp/prompts/prework/prompt-001.txt <transcript>`. PASS on exit 0; FAIL on non-zero.
- **V2.** `bin/prompt-read-check.sh /tmp/prompts/prework/prompt-002.txt <transcript>`. Same.

### File-existence + extraction (A-series)

- **A1.** Tarball still in place: `test -f <scratch>/Downloads-stub/ae101-content.tar.gz`. PASS on exit 0.
- **A2.** Content extracted: `test -d <scratch>/Documents-stub/ae101-content/lectures && test -d <scratch>/Documents-stub/ae101-content/exercises && test -d <scratch>/Documents-stub/ae101-content/reference && test -d <scratch>/Documents-stub/ae101-content/supplementary && test -d <scratch>/Documents-stub/ae101-content/content/skills`. PASS on exit 0.
- **A3.** Skill installed: `test -f <scratch>/.claude-user-stub/skills/access-control-analysis/SKILL.md`. PASS on exit 0.
- **A4.** Skill installed: `test -f <scratch>/.claude-user-stub/skills/stride/SKILL.md`. PASS on exit 0.

### One-at-a-time bug screening (B-series)

- **B1.** All three substituted candidate bugs appear in scrollback. `grep -cE 'AE-42|daily totals|refund line|Email notification.*batched refunds|data-migration script' <scrollback>` ≥ 3. PASS on exit 0.
- **B2.** Pick named: `grep -iE 'daily.totals|AE-42' <scrollback>` ≥ 1 in the "pick" / Step 4 conclusion region. PASS on exit 0.
- **B3.** One-at-a-time discipline: the Actor's Step 4 has ≥ 3 distinct assistant turns asking for a bug (heuristic: `grep -cE 'second|third|next.*candidate|next.*bug|other.*candidate' <scrollback>` ≥ 1, AND the three bug pastes are separated by Actor turns). Permissive PASS — the harder anti-question-dump shape is graded on the live cohort, not here. `grep -cE 'one at a time|^### Step 4|first.*bug|second.*bug|third.*bug' <scrollback>` ≥ 1. PASS on exit 0.

### Readiness confirmation (R-series)

- **R1.** Step 5 readiness confirmation present: `grep -cE 'tests? (run|pass)|ready for Module 1|repo is ready|npm test' <scrollback>` ≥ 1. PASS on exit 0.
- **R2.** `npm test` was invoked by the Actor (verified in transcript): `jq -r '.message.content[]? | select(.type=="tool_use" and .name=="Bash") | .input.command' <transcript> | grep -c 'npm test\|node --test'` ≥ 1. PASS on exit 0.

### Substitutions logged (S-series)

- **S1.** Tarball substitution noted: `grep -cE 'harness substitution.*<CONTENT_URL>|harness substitution.*Downloads|pre-staged tarball' <scrollback>` ≥ 1. PASS on exit 0.
- **S2.** Skill-install substitution noted: `grep -cE 'harness substitution.*\.claude|claude-user-stub|claude/skills' <scrollback>` ≥ 1. PASS on exit 0.

### Harness leakage (H-series)

- **H1.** No Read of prework source: `jq -r '.message.content[]? | select(.type=="tool_use" and .name=="Read") | .input.file_path' <transcript> | grep -c 'trainings/agentic-engineering-101/prework\.md\|curriculum/prompts/ae101-prework'` → 0 expected. PASS if 0.
- **H2.** No Read of judge runner: same `jq`, pattern `runners/ae101-prework\.judge\.md`. PASS if 0.
- **H3.** No real `curl` to `<CONTENT_URL>`: `jq -r '.message.content[]? | select(.type=="tool_use" and .name=="Bash") | .input.command' <transcript> | grep -c 'curl.*CONTENT_URL\|curl.*agents102.bosser'` → 0 expected. PASS if 0. (The Actor may still have logged the intended curl as text; the assertion is no actual Bash curl.)

### Pre-flight + prompt-source audit (PF / PS)

- **PF1.** `bin/runner-mapping-check.sh runners/ae101-prework.actor.md curriculum/trainings/agentic-engineering-101/prework.md`. PASS on exit 0.
- **PS1.** `bin/prompt-source-audit.sh prework`. PASS if `READY` or `READY-WITH-FLAGS` in stdout; FAIL on `BLOCK`.

## Report

Write `curriculum/evals/mechanical/instances/ae101-prework-judge-report.md`:

```markdown
# Judge report — AE101 prework

## Summary
Verdict: PASS | FAIL (N/M assertions). Sev-1 from PS audits: K.

## V-series
V1: PASS — <prefix>
V2: PASS — <prefix>

## A-series
A1: PASS — tarball present
...

## B-series (one-at-a-time bug screen)
B1: ...

## R-series (readiness)
R1: ...

## S-series (substitutions logged)
S1: ...

## H-series (harness leakage)
H1: ...

## Pre-flight + prompt-source audits
PF1: ...
PS1: ...
```

Under 500 words. No quoting beyond what scripts emit. Bottom: harness substitution log (the four canonical scratch-path substitutions).

Verdict: `PASS` if every assertion exits 0 AND PS1 is not `BLOCK`; `FAIL` otherwise.

## What you must NOT do

- Quote the candidate-bug paragraphs and judge whether the screening was sharp.
- Decide whether the readiness report is "complete enough."
- Read `prework.md` to evaluate prompt fidelity — `prompt-read-check.sh` against the transcript is the canonical V-check.
- Re-derive an assertion when its script returns non-zero — that's a FAIL by definition (rule #20).
