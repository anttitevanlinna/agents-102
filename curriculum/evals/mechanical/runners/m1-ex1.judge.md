# Judge — M1 Ex1 (orient-and-introspect) — minimal

You did not run the exercise. An Actor subagent did. Your inputs are: the scratch state, the Actor's transcript `.jsonl`, the Actor's scrollback file, and the exercise file itself.

## Inputs

- **Exercise file (ground truth for what the Actor should have done):** `/Users/anttitevanlinna/Projects/agents-102/curriculum/exercises/orient-and-introspect.md`
- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-ex1`
- **Actor transcript:** find it with `ls -t ~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/*/subagents/agent-*.jsonl | head -1`. This is the most recent subagent `.jsonl`, which should be the Actor you're grading.
- **Actor scrollback:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-ex1-actor-scrollback.md`
- **Actor report:** same directory, `m1-ex1-actor-report.md`

Read the transcript before grading. Transcript evidence outranks Actor self-reports. To inspect:

```
jq -c 'select(.type=="assistant") | .message.content[]? | select(.type=="tool_use") | {name, input}' <path>
```

## Assertions — binary PASS / FAIL with quoted evidence

### Chain state

- **A1.** `<scratch>/.git/` exists. `git log --oneline` returns exactly 2 commits with neutral messages (`initial commit`, `wip` — or similar). FAIL if any commit message names the planted state.
- **A2.** `src/terrain.js` contains the planted bug (`isSolid` returns `=== 0`). This confirms Arrange ran correctly AND Actor did not "helpfully" fix it during Ex1 (Ex1 is orient, not fix).

### Exercise fidelity

- **A3.** Actor executed BOTH prompt blocks from the exercise in order — the "read enough of this repo" prompt AND the "what did you read, and why those files" introspection prompt. Quote the Actor response matching each from the transcript or scrollback.
- **A4.** Actor's response to prompt 1 reads like a practitioner's orientation — references specific files by name, names what looks load-bearing, names what looks stale / recent. A vague summary that could apply to any repo FAILS.
- **A5.** Actor's response to prompt 2 explicitly names files / directories SKIPPED and gives a reason per skip. A response that only re-describes what was read, without naming skips, FAILS.

### Harness substitution

- **A6.** Actor substituted for `/context` (it can't type slash commands). The substitution is logged in the Actor report. Quote the substitution.

### Cross-check: transcript vs. scrollback

- **A7.** Claims in the Actor scrollback match the Actor's tool calls. If the scrollback says *"I read `lemming.js`"* but the transcript has no Read call on that file, FAIL. Spot-check three files named in the scrollback against the transcript.

### Harness leakage checks

- **H1.** Actor did not Read `playgrounds/lemmings-seed.maintainer.md`, this file, the Actor prompt, or any `runners/*.md`. Transcript grep on Read tool calls.
- **H2.** Actor did not Read files inside `instances/` other than the ones it's supposed to write (scrollback + report). FAIL if Actor read a prior judge report.
- **H3.** No harness directory (`.mechanical-test/`, `.harness/`, etc.) appears inside `<scratch>`.

### Informational (not graded)

- **I1.** How many Read tool calls did the Actor make? List the files.
- **I2.** How long (in tool calls) was the Actor's run end-to-end?

## Report

Write `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-ex1-judge-report.md`.

Shape:

```markdown
# Judge report — M1 Ex1

## Summary
<2–3 lines: pass count, most interesting observation.>

## Actor transcript
<absolute path>

## Assertions
A1. PASS — <evidence>
A2. FAIL — <evidence + what broke>
...
I1. <files + count>
I2. <count>

## Findings for the exercise
- <bullets>

## Findings for the harness
- <bullets>
```

Under 400 words. Leave scratch in place.
