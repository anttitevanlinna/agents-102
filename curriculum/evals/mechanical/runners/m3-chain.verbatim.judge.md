# Judge — M3 chain verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

You are grading whether the M3 chain (3 exercises: access surface → STRIDE → skill authoring + invocation) ran end-to-end and whether file artefacts have the expected SHAPE. You are NOT grading whether the surface map is insightful, the ADR reads well, or the SKILL.md captures real codebase wisdom.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m3`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>`
- **Actor report:** `curriculum/evals/mechanical/instances/m3-chain-verbatim-actor-report.md`
- **Actor scrollback:** `curriculum/evals/mechanical/instances/m3-chain-verbatim-actor-scrollback.md`
- **Authored skill:** `~/.claude/skills/test-strategy/SKILL.md`
- **Prompt files:** `/tmp/prompts/map-the-access-surface/prompt-00{1,2}.txt`, `/tmp/prompts/threat-model-with-stride/prompt-00{1,2,3}.txt`, `/tmp/prompts/author-test-strategy-skill/prompt-00{1,2,3}.txt`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` — V-checks
- `curriculum/evals/mechanical/bin/prompt-source-audit.sh <slug>` — P/E checks
- `jq -c 'select(.type=="assistant") | .message.content[] | select(.type=="tool_use") | {name: .name, input: .input}' <jsonl>` — transcript inspection

## Method

For every assertion: run the named script, capture exit code + first line of output. No quoting, no narration, no taste calls. If you find yourself reading scrollback to judge whether content is "good," stop — that's not your job.

## Assertions

### Verbatim round-trip (V1–V8)

For each of 8 prompt files: `verbatim-check.sh <prompt> <scrollback>`. Report exit code + prefix.

### Ex1 — access surface

- **A1.** Actor dispatched a subagent via Task tool with `access-control-analysis` in the prompt: `jq` on transcript for `tool_use.name == "Task"` AND grep "access-control-analysis" in input.
- **A2.** Surface map output landed outside `<scratch>` (under `/tmp/` or `$TMPDIR`): grep Actor report for path; `test ! -d <scratch>/<surface-map-path>`.
- **A3.** Surface map file contains `Codebase-tuned delta` heading AND mentions both `CORS` and `db.js` (or relative-path SQLite): `grep -c` on each.

### Ex2 — STRIDE + ADR

- **A4.** Actor dispatched subagent for `stride` skill: same `jq` filter as A1 with "stride".
- **A5.** Threat list exists in temp scratch dir: `test -f`.
- **A6.** ADR exists at `<scratch>/docs/adr/0001-*.md`: `ls <scratch>/docs/adr/0001-*.md`.
- **A7.** ADR contains four section headings: `grep -cE '^## ?(Context|Decision|Consequences|Alternatives)' <ADR>` ≥ 4.
- **A9.** ADR committed: `git -C <scratch> log --oneline --diff-filter=A -- 'docs/adr/0001-*.md' | wc -l` ≥ 1.

### Ex3 — skill authoring

- **A10.** SKILL.md exists at `~/.claude/skills/test-strategy/SKILL.md`: `test -f`.
- **A11.** Has YAML frontmatter with `name` and `description`: `head -20 <SKILL.md> | grep -E '^name:|^description:'` ≥ 2.
- **A13.** No `[BRACKET]` placeholders: `grep -nE '\[[A-Z][A-Z_]+\]' <SKILL.md>` && FAIL.
- **A14.** Phase 1 ran one-question-at-a-time: between Prompt 6 paste and Prompt 7 paste in scrollback, count assistant turns containing `?`. Expect ≥ 5 distinct question turns. FAIL if any single turn contains ≥ 4 questions (`grep -c '?'` on that turn).

### Prompt-chain integrity

- **A18.** Ex2 referenced Ex1's surface map: transcript Read of surface-map-file before STRIDE dispatch (`jq` Read tool calls).
- **A19.** Ex3 Phase 3 referenced ADR: transcript Read of `<scratch>/docs/adr/0001-*.md` after Prompt 8 paste.

### Harness leakage (H1–H5)

- **H1.** No Read of `*.maintainer.md`: `grep -o '"file_path":"[^"]*"' <jsonl> | grep maintainer` → empty.
- **H2.** No Read of judge runner or sibling actor (own `m3-chain.verbatim.actor.md` allowed): `grep -o '"file_path":"[^"]*runners/[^"]*"' <jsonl> | grep -v 'm3-chain.verbatim.actor.md'` → empty.
- **H3.** No Read under `curriculum/exercises/`: `grep -o '"file_path":"[^"]*curriculum/exercises/[^"]*"' <jsonl>` → empty.
- **H4.** Commit messages neutral: `git -C <scratch> log --oneline | grep -iE 'planted|harness'` → empty.
- **H5.** No harness-internal files inside `<scratch>` re-Read: list Actor Writes in `<scratch>` then `jq` Reads after — none should match unintended paths.

### Prompt-source audit

Run once per slug:
- `bin/prompt-source-audit.sh map-the-access-surface`
- `bin/prompt-source-audit.sh threat-model-with-stride`
- `bin/prompt-source-audit.sh author-test-strategy-skill`

Capture exit code + verdict. PASS if `READY` or `READY-WITH-FLAGS`; FAIL if `BLOCK`.

## Report

Write `curriculum/evals/mechanical/instances/m3-chain-verbatim-judge-report.md`:

```markdown
# Judge report — M3 chain verbatim

## Summary
Verdict: PASS | FAIL (N/M). Sev-1 from prompt-source-audit: K.

## V1–V8
V1: PASS — <prefix>
...

## A-series
A1: PASS — <evidence>
...

## H-series
H1: PASS — <evidence>
...

## Prompt-source audit
- map-the-access-surface: <verdict>
- threat-model-with-stride: <verdict>
- author-test-strategy-skill: <verdict>
```

Under 600 words. Leave artifacts in place.

## What you must NOT do

- Quote a sentence from the surface map, ADR, or SKILL.md and judge "is it grounded / specific / codebase-tuned."
- Decide whether the ADR Decision "sounds like a checklist."
- Decide whether the self-critique is "substantive."
- Decide whether the test-strategy invocation output is "good."

If an assertion can't be reduced to a script call or a `jq`/`grep` one-liner, drop it and flag the gap — that's a script-ratchet TODO, not a Judge job.
