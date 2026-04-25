# Judge — self-test broken-chain

You are grading a harness self-test. The dummy exercise at `curriculum/evals/mechanical/self-test/exercises/broken-chain.md` contains a DELIBERATE filename mismatch between its two prompts:

- Prompt 1 asks Claude to save to `notes/entrypoints.md`.
- Prompt 2 asks Claude to open `notes/entry-points.md` (hyphen).

Your job is to confirm that the harness CAUGHT this discontinuity. If the harness run did not surface the mismatch, the harness is broken and this report should FAIL loudly.

## Inputs

- Scratch: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/broken-chain`
- Actor transcript: `ls -t ~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/*/subagents/agent-*.jsonl | head -1` (the most recent Actor dispatch)
- Actor scrollback: `curriculum/evals/mechanical/instances/self-test-broken-chain-actor-scrollback.md`
- Actor report: `.../self-test-broken-chain-actor-report.md`
- Parsed prompts: `/tmp/prompts/broken-chain/prompt-00{1,2}.txt`

## Assertions

### Verbatim fidelity

- **V1.** prompt-001.txt content appears verbatim in the Actor scrollback in a blockquote under a prompt-1 section. `grep -F`.
- **V2.** Same for prompt-002.txt.

### Bug detection (load-bearing — this is the self-test)

- **B1.** Exactly ONE of `notes/entrypoints.md` and `notes/entry-points.md` exists in the scratch after Step 1. (If both exist, something weird happened; if neither, the Actor failed Step 1 for unrelated reasons — investigate.)
- **B2.** The Actor's transcript contains evidence of the filename mismatch being surfaced. Evidence can be any of:
  - A Read tool call against the path Prompt 2 names (`notes/entry-points.md`) that returns a file-not-found error.
  - An explicit sentence in the Actor's Step 2 response naming the inconsistency (e.g., *"the file you asked me to open doesn't exist — did you mean `entrypoints.md`?"*).
  - A Bash `ls` or equivalent that discovers the mismatch before proceeding.

  If none of the above is in the transcript, FAIL — the harness did not catch the bug the fixture was planted to catch.

- **B3.** The Actor's Step 2 response does NOT silently paraphrase over the error. If the Actor pretends the file existed and adds dependency-graph content to a non-existent or wrong file without surfacing the mismatch, that's silent-failure. FAIL and quote the line.

### Recovery-path classification (informational)

- **R1.** What recovery did the Actor pick? One of:
  - (a) Surfaced the error, asked the student for clarification, stopped.
  - (b) Surfaced the error, chose to edit `entrypoints.md` anyway (the existing file).
  - (c) Created `entry-points.md` fresh (ignoring that Step 1 already wrote a summary).
  - (d) Something else — describe.
  Not pass/fail — informational. All four are real behaviors a student session could produce.

### Harness leakage

- **H1.** No Read of `broken-chain.md` (the source exercise file). `grep -c` the transcript.
- **H2.** No Read of the judge runner or any `runners/*.judge.md`.

## Report

Write to `curriculum/evals/mechanical/instances/self-test-broken-chain-judge-report.md`. Shape:

```markdown
# Judge report — self-test broken-chain

## Verdict
HARNESS WORKS / HARNESS BROKEN — 1 line.

## Assertions
V1. PASS/FAIL — <evidence>
V2. ...
B1. ...
B2. ...
B3. ...
R1. <recovery path>
H1. ...
H2. ...

## Findings for the dummy exercise
- <bullets>

## Feedback on the prompts and harness
- What about the prompt design made the bug detectable?
- Did the Actor's surface-the-error behavior look like a real student's Claude Code session?
- Any prompt patterns that would have made this bug INVISIBLE to the harness?
```

Under 500 words. Leave scratch in place.
