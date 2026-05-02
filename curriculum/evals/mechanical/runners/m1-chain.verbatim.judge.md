# Judge — M1 chain verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

You are grading whether the M1 chain (3 exercises, same repo) ran end-to-end and whether file artefacts have the expected SHAPE. You are NOT grading whether the fix is elegant, the rules read well, or summaries are insightful.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain-verbatim`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>` (if blank, find newest under `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/*/subagents/agent-*.jsonl`).
- **Actor report:** `curriculum/evals/mechanical/instances/m1-chain-verbatim-actor-report.md`
- **Actor scrollback:** `curriculum/evals/mechanical/instances/m1-chain-verbatim-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/orient-and-introspect/prompt-00{1,2}.txt`, `/tmp/prompts/fix-tests-first/prompt-001.txt`, `/tmp/prompts/compound-and-close/prompt-00{1,2,3}.txt`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` — V-checks
- `curriculum/evals/mechanical/bin/prompt-source-audit.sh <slug>` — P/E checks
- `jq -c 'select(.type=="assistant") | .message.content[] | select(.type=="tool_use") | {name: .name, input: .input}' <jsonl>` — transcript inspection

## Method

For every assertion: run the named script, capture exit code + first line of output. No quoting, no narration, no taste calls. If you find yourself reading scrollback to judge whether content is "good," stop — that's not your job.

## Assertions

### Verbatim round-trip (V1–V6)

For each `prompt-00N.txt`: `verbatim-check.sh <prompt> <scrollback>`. Report exit code + prefix.

### Chain state

- **A1.** `<scratch>/.git/` exists; `git log --oneline | wc -l` ≥ 3.
- **A2.** A test file exists for the fixed module: `find <scratch> -name '*terrain*test*' -o -name '*test*terrain*'`.
- **A3.** After fix: `cd <scratch> && npm test` exits 0 (may need `npm install` first; note if so).

### Ex3 file-system outputs

- **A5.** `<scratch>/CLAUDE.local.md` exists: `test -f`.
- **A7.** No `[BRACKET]` placeholders: `grep -nE '\[[A-Z][A-Z_]+\]' <scratch>/CLAUDE.local.md` && FAIL.
- **A8.** `<scratch>/.gitignore` covers `CLAUDE.local.md` (or equivalent that matches it) OR `git check-ignore <scratch>/CLAUDE.local.md` succeeds via global excludesFile. If only global, FLAG.
- **A9.** `<scratch>/.claude/settings.local.json` is valid JSON: `jq . <path>`.

### One-at-a-time (anti-question-dump)

- **A15.** No prompt that says "one at a time" was followed by a question-dump. Mechanical: between each prompt paste and the next, count assistant turns that fire ≥ 3 questions in one turn. FAIL if any. (Currently: chain prompts don't have explicit one-at-a-time directives — covered if any future prompt adds it.)

### Continuation between exercises

- **A17.** Ex2 references Ex1 work: transcript has a Read of any file Ex1 Read (e.g., a source file from orient phase). `jq` filter on `.jsonl` for Read tool calls between Ex1 and Ex2 boundaries.
- **A18.** Ex3 compound prompt response references Ex1 OR Ex2 file paths: `grep` Ex3 section in scrollback for any path mentioned earlier in scrollback.

### Harness leakage (H1–H5)

`jq` on transcript for any Read of:
- `curriculum/exercises/orient-and-introspect.md`, `fix-tests-first.md`, `compound-and-close.md` → H3 FAIL.
- Any judge runner or sibling actor runner (own actor file allowed) → H2 FAIL.
- `lemmings-seed.maintainer.md` or any `*.maintainer.md` → H1 FAIL.
- Any harness-internal file inside `<scratch>` that the Actor then Read again → H5 FAIL.
- Commit messages: `git -C <scratch> log --oneline | grep -iE 'planted|harness|drift'` → H4 FAIL.

### Prompt-source audit

Run once per exercise slug:
- `bin/prompt-source-audit.sh orient-and-introspect`
- `bin/prompt-source-audit.sh fix-tests-first`
- `bin/prompt-source-audit.sh compound-and-close`

Capture exit code + verdict for each. PASS if `Verdict: READY` or `READY-WITH-FLAGS`; FAIL if `BLOCK`.

## Report

Write `curriculum/evals/mechanical/instances/m1-chain-verbatim-judge-report.md`:

```markdown
# Judge report — M1 chain verbatim

## Summary
Verdict: PASS | FAIL (N/M assertions). Sev-1 from prompt-source-audit: K.

## V1–V6
V1: PASS — <prefix>
...

## A-series
A1: PASS — <evidence>
...

## H-series
H1: PASS — <evidence>
...

## Prompt-source audit
- orient-and-introspect: <verdict>
- fix-tests-first: <verdict>
- compound-and-close: <verdict>
```

Under 500 words. No quoting beyond what scripts emit. Leave artifacts in place.

## What you must NOT do

- Quote a sentence from `CLAUDE.local.md` and judge if the rule is "grounded."
- Decide whether the fix is "minimal" or the summary is "specific."
- Read source files to evaluate the diff quality.
- Judge whether commit messages are "well-written" beyond the H4 leak grep.

If an assertion can't be reduced to a script call or a `jq`/`grep` one-liner, drop it from this judge and flag the gap in the report — that's a script-ratchet TODO, not a Judge job.
