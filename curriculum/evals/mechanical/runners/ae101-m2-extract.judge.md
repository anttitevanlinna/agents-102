# Judge — AE101 M2 extract-the-task-shaping-rule

**Dispatch with `model: "haiku"`.** This is an acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

You are grading whether the extract-the-task-shaping-rule chain ran with the right runtime gates and whether the rules file landed at an acceptable path. You are NOT grading whether the proposed rules are sharp, whether anchors are specific, or whether the shape names are well-chosen.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-m2-extract`
- **Actor scrollback:** `curriculum/evals/mechanical/instances/ae101-m2-extract-actor-scrollback.md`
- **Actor transcript:** orchestrator passes the path; if not given, find newest `agent-*.jsonl` in `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/<session-id>/subagents/`.

## Tooling

- `curriculum/evals/mechanical/bin/prompt-source-audit.sh extract-the-task-shaping-rule`
- `jq` / `grep` on transcript and scrollback

## Method

For every assertion: run the named script or one-line grep/jq, capture exit code + first line of output. No quoting, no narration, no taste calls. If you find yourself reading scrollback to judge whether content is "good," stop — that's not your job.

## Assertions

### A1. Phase 1 runtime gate fires (script-detectable)

Actor STOPPED after proposing rules and asked the student which to rewrite/reject — BEFORE the rewrite-and-reject was applied.

**Mechanical check:** in scrollback, between Phase 1 proposal and the orchestrator's rewrite-and-reject paste, there must be at least one assistant turn ending in a `?`. AND in transcript, no Write tool call for the rules file appears before the orchestrator's rewrite-and-reject paste.

`grep -B1 -A20 'Phase 1' <scrollback> | grep -c '?'` ≥ 1; `jq` Write tool calls before the rewrite-and-reject substitution timestamp → 0.

### A3. Phase 2 collaborative decide (script-detectable)

Phase 2 scrollback section contains the substring `recommend` (or `I'd pick` / `I would pick`) BEFORE any Write tool call. AND no Write tool call landed at any path containing `~/.claude/memory/`.

`grep -nE 'recommend|I.d pick|I would pick' <scrollback>` between Phase 2 prompt paste and Write call → ≥ 1; `grep -o '"file_path":"[^"]*\.claude/memory[^"]*"' <jsonl>` → empty.

### A4. Phase 2 file actually written

A file exists at one of the substituted scratch locations: `<scratch>/CLAUDE.local.md`, `<scratch>/.claude-user-stub/CLAUDE.md`, or `<scratch>/.claude-user-stub/rules/task-shaping.md`.

`find <scratch> -name 'CLAUDE.local.md' -o -name 'CLAUDE.md' -o -name 'task-shaping.md' | wc -l` ≥ 1.

### A5. Phase 3 names shapes WITHOUT proposing code

Phase 3 scrollback section has zero ```` ``` ```` code fences. AND zero Write tool calls for any `.js`, `.py`, `.ts`, or scaffold file in transcript during Phase 3.

`awk '/Phase 3/,/^$/' <scrollback> | grep -c '\`\`\`'` → 0; `jq` Write tool calls between Phase 3 paste markers filtered to `.js|.py|.ts` → 0.

### A6. No skill-by-name authoring (mechanical)

Transcript has zero Write tool calls to any path matching `SKILL.md`. Scrollback never proposes creating a skill.

`grep -o '"file_path":"[^"]*SKILL\.md"' <jsonl>` → empty; `grep -ciE 'create.*skill|author.*skill|SKILL\.md' <scrollback>` → 0 (or only in non-proposal context).

### A7. No `~/.claude/memory/task-shaping.md` regression

`grep -c '~/\.claude/memory/' <scrollback>` → 0 in Actor's proposal sections (excluding judge-file references).

### A8. Phase 1 force-engagement applied

After orchestrator delivers rewrite-and-reject, the saved rules file in Phase 2 must NOT contain the rejected rule (rule 4). Mechanical: count headings/numbered items in saved file. If pre-rewrite proposal had 5 rules and saved file has 5+, FAIL. If saved file has ≤ 4 rules, PASS.

`wc -l <saved-file>` AND count of `^[0-9]\.\|^- ` lines.

### Harness leakage

- **H1.** No Read of exercise file: `grep -o '"file_path":"[^"]*curriculum/exercises/extract-the-task-shaping-rule\.md"' <jsonl>` → empty.
- **H2.** No Read of judge runner or sibling: `grep -o '"file_path":"[^"]*runners/[^"]*"' <jsonl> | grep -v 'ae101-m2-extract.actor.md'` → empty.

### Prompt-source audit

`bin/prompt-source-audit.sh extract-the-task-shaping-rule`. Capture exit code + verdict.

## Output

Write `instances/ae101-m2-extract-judge-report.md`:

```markdown
# Judge report — AE101 M2 extract

## Summary
Verdict: READY | READY-WITH-FLAGS | BLOCK (N/8 PASS).

## A-series
A1: PASS — <evidence>
...

## Harness leakage
H1: PASS — <evidence>
H2: PASS — <evidence>

## Prompt-source audit
extract-the-task-shaping-rule: <verdict>
```

Under 400 words. Bottom: harness substitution log (any `<scratch>/.claude-user-stub/` writes noted as substitution-PASS).

Verdict: `READY` if 8/8 PASS AND prompt-source-audit no Sev-1; `BLOCK` if any A-FAIL or Sev-1; `READY-WITH-FLAGS` otherwise.

## What you must NOT do

- Judge whether proposed rules are anchored sharply or generically.
- Judge whether the recommended path's "loading model" reasoning is sound.
- Judge whether the named automation shapes are the "right" shapes.
- Read `prior-session-summary.md` to evaluate rule grounding.

If an assertion can't be reduced to a script call or a `jq`/`grep` one-liner, drop it and flag the gap — that's a script-ratchet TODO, not a Judge job.
