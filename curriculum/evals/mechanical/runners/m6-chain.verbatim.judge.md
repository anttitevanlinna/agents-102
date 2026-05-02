# Judge — M6 chain verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

You are grading whether M6's chain (spot-gaps-build-the-loop + arc-retrospective) ran end-to-end on a scratch inherited from M3 → M4 → M5 and whether file artefacts have the expected SHAPE. You are NOT grading whether the gap diff is sharp, the second skill is well-shaped, the invocation findings are insightful, or the arc note captures real patterns.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m6`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>`
- **Actor report:** `curriculum/evals/mechanical/instances/m6-chain-verbatim-actor-report.md`
- **Actor scrollback:** `curriculum/evals/mechanical/instances/m6-chain-verbatim-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/spot-gaps-build-the-loop/prompt-00{1,2,3,4}.txt`, `/tmp/prompts/arc-retrospective/prompt-001.txt`
- **Substitute transcripts:** `/tmp/m5-substitute-transcript.md`, `/tmp/m6-m5-rerun-transcript.md`
- **Authored skill path:** Actor reports it (under `~/.claude/skills/<name>/SKILL.md`).
- **Arc note:** `<scratch>/.claude/memory/arc-note.md`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` — V-checks
- `curriculum/evals/mechanical/bin/prompt-source-audit.sh <slug>` — P/E checks
- `jq` on `.jsonl` for transcript inspection

## Method

For every assertion: run the named script, capture exit code + first line of output. No quoting, no narration, no taste calls. If you find yourself reading scrollback to judge whether content is "good," stop — that's not your job.

## Assertions

### Verbatim round-trip (V1–V5)

For each of 5 prompt files: `verbatim-check.sh <prompt> <scrollback>`. Report exit code + prefix.

### Ex1 Phase 1 — diff

- **A3.** Actor read both substitute transcripts: `jq` Reads of `/tmp/m5-substitute-transcript.md` AND `/tmp/m6-m5-rerun-transcript.md` between Prompt 1 and Prompt 2 paste markers.

### Ex1 Phase 2 — author

- **A8.** One question at a time: between Prompt 2 paste and Prompt 3 paste, count assistant turns containing `?`. Expect ≥ 5. FAIL if any single turn contains ≥ 4 questions.
- **A9.** SKILL.md exists at `~/.claude/skills/<name>/SKILL.md` (Actor reports the path): `test -f <reported-path>`.
- **A10.** Frontmatter has `name` + `description`: `head -20 <SKILL.md> | grep -E '^name:|^description:'` ≥ 2.
- **A12.** No `[BRACKET]` placeholders: `grep -nE '\[[A-Z][A-Z_]+\]' <SKILL.md>` && FAIL.

### Ex1 Phase 4 — invoke

- **A14.** Actor Read `<scratch>/docs/tasks/auth-ux-wiring/reference.md` AND files on `send-off/auth-ux-packaged` branch between Prompt 4 paste and Prompt 5 paste: `jq` Read tool calls.

### Ex2 — arc-retrospective

- **A17.** Actor Read across the arc — at minimum: 3+ of {`CLAUDE.local.md`, `.claude/memory/observations.md`, ADR, both skills, both run branches}. `jq` Read tool calls between Prompt 5 paste and end of scrollback.
- **A20.** Arc note saved at `<scratch>/.claude/memory/arc-note.md`: `test -f`.
- **A21.** Arc note is roughly one page: `wc -w <arc-note>` between 200 and 1500 words.

### Prompt-chain integrity

- **A22.** Ex1 → Ex2 separation: scrollback has distinct headers for Ex1 and Ex2 (grep for `Ex2` or `arc-retrospective` heading after Prompt 4 response).

### Cross-module artefact contract

- **A18.** Inherited artefacts present at start: `test -f <scratch>/docs/adr/0001-strip-email-from-leaderboard.md` AND `test -f <scratch>/docs/tasks/auth-ux-wiring/reference.md` AND `test -f <scratch>/docs/tasks/auth-ux-wiring/plan.md`.
- **A19.** Both branches exist: `git -C <scratch> branch | grep -E 'send-off/auth-ux($|-packaged)'` shows two.

### Harness leakage (H1–H6)

- **H1.** No Read of `*.maintainer.md`.
- **H2.** No Read of judge or sibling actor runner (own `m6-chain.verbatim.actor.md` allowed).
- **H3.** No Read under `curriculum/exercises/`.
- **H4.** Commit messages neutral.
- **H5.** No harness-internal files inside `<scratch>` re-Read.
- **H6.** Actor did NOT walk `~/.claude/projects/`: `grep -o '"file_path":"[^"]*\.claude/projects/[^"]*"' <jsonl>` → empty.

### Prompt-source audit

Run once per slug:
- `bin/prompt-source-audit.sh spot-gaps-build-the-loop`
- `bin/prompt-source-audit.sh arc-retrospective`

Capture exit code + verdict. PASS if `READY` or `READY-WITH-FLAGS`; FAIL if `BLOCK`.

## Report

Write `curriculum/evals/mechanical/instances/m6-chain-verbatim-judge-report.md`:

```markdown
# Judge report — M6 chain verbatim

## Summary
Verdict: PASS | FAIL (N/M). Sev-1 from prompt-source-audit: K.

## V1–V5
V1: PASS — <prefix>
...

## A-series
A3: PASS — <evidence>
...

## H-series
H1: PASS — <evidence>
...

## Prompt-source audit
- spot-gaps-build-the-loop: <verdict>
- arc-retrospective: <verdict>
```

Under 600 words. Leave artifacts in place.

## What you must NOT do

- Quote a diff dimension and judge if it's "specific."
- Decide whether the SKILL.md body is "codebase-tuned" or "generic."
- Decide whether self-critique is "substantive."
- Decide whether the arc note "names a real pattern."
- Read source files to evaluate gap analysis or arc reflection content.

If an assertion can't be reduced to a script call or a `jq`/`grep` one-liner, drop it and flag the gap — that's a script-ratchet TODO, not a Judge job.
