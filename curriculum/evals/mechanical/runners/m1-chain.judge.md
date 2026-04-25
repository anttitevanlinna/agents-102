# Judge — M1 chain

You are grading an Actor subagent that executed AE101 Module 1 on a scratch repo. You did not run the exercise; the Actor did. Your inputs are two artefacts: the scratch file state (post-run), and the Actor's full transcript `.jsonl` with every tool call and message.

## Inputs (the dispatcher passes these — substitute into the paths below)

- **Scratch path:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>` — a `.jsonl` under `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/<session>/subagents/agent-*.jsonl`. If the dispatcher didn't fill this in, find it: `ls -t ~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/*/subagents/agent-*.jsonl | head -1`.
- **Actor report:** `curriculum/evals/mechanical/instances/m1-chain-actor-report.md`.

## How to read the transcript

It's JSONL, one object per line. Each line has `type` (user / assistant), `message.content` (array of text / tool_use / tool_result blocks). To inspect:

```
jq -c 'select(.type=="assistant") | .message.content[] | select(.type=="tool_use") | {name: .name, input: .input}' <path>
```

Or grep for specific things:
```
grep -o '"name":"Bash"' <path> | wc -l          # bash calls count
grep -o '"file_path":"[^"]*"' <path> | sort -u  # files written
```

Read the transcript end-to-end before grading. Evidence from the transcript always outranks Actor self-reports.

## Assertions

Binary PASS / FAIL with evidence (file path + contents, transcript line + quoted content, or `git log` output). Every fail quotes the evidence that made it fail.

### Chain state

- **A1.** `<scratch>/.git/` exists; `git log --oneline | wc -l` ≥ 3.
- **A2.** A test file exists for the fixed module (likely `src/terrain.test.js`).
- **A3.** The fix is a minimal diff. Quote the `isSolid` hunks from both the bug commit and the fix commit. Flag if the "fix" is larger than 5 lines on the production code path.
- **A4.** After fix: `npm test` exits 0 OR equivalent test runner passes. Run it: `cd <scratch> && npm test`.

### Ex3 file-system outputs

- **A5.** `<scratch>/CLAUDE.local.md` exists.
- **A6.** Non-empty. Contains at least one rule that references a concrete moment from Ex1 or Ex2. Quote the sentence. A rule that could appear on any engineer's CLAUDE.md without this session is NOT evidence of compounding from session evidence — fail it.
- **A7.** No `[BRACKET]` placeholders. `grep -n '\[[A-Z]' <scratch>/CLAUDE.local.md`.
- **A8.** `<scratch>/.gitignore` contains `CLAUDE.local.md` OR `git check-ignore <scratch>/CLAUDE.local.md` succeeds via a global excludesFile. If it only succeeds via global, FLAG — not guaranteed on a fresh-laptop student.
- **A9.** `<scratch>/.claude/settings.local.json` is valid JSON.
- **A10.** JSON contains `additionalDirectories` array with `/Users/anttitevanlinna/Projects/agents-102/content`.

### Summary quality

- **A11.** Ex3 compound summary (in the transcript, find the assistant message after the compound prompt) is 3–5 paragraphs, each under 60 words. Count paragraphs with `awk 'BEGIN{RS=""; n=0} {n++} END{print n}'` on the extracted text, or quote the paragraphs.
- **A12.** Summary cites specific session moments (quoted phrase, file path, or exercise move). Quote two.
- **A13.** No generic filler — no unanchored *"always verify output,"* *"follow best practices,"* or motivational sentences. If any appear, FAIL and quote them.

### Prompt-chain integrity

- **A14.** No prompt stalled on a value the Actor was not prompted to supply mid-chain. Transcript evidence: every prompt paste was followed by an assistant response that acted on it, not a stuck question.
- **A15.** No question-dump. For any prompt in the exercise that says *"one at a time"* or similar: check the assistant response in the transcript. FAIL if the assistant fired multiple questions when the prompt required one.
- **A16.** Ex3's `CLAUDE.local.md` is written/integrated, not appended. Check for a *"retro notes"* section heading, a *"session X log"* appendix, or obvious boilerplate tacked on. FAIL if found.

### Cross-exercise state

- **A17.** Ex2 execution referenced Ex1's orientation or introspection. Transcript evidence: Actor's Ex2 response should mention what was read in Ex1 OR explicitly reason about the window mapped in Ex1.
- **A18.** Ex3's compound summary references BOTH Ex1 and Ex2 moments. Quote one of each from the transcript.

### Harness leakage checks (new — surface harness-level bugs)

- **H1.** Actor did NOT read the seed maintainer doc (`lemmings-seed.maintainer.md` or any file documenting planted state). Transcript grep: no Read call with that path.
- **H2.** Actor did NOT read its own assertion list. (This file.) Transcript grep: no Read call on `runners/*.judge.md`.
- **H3.** Actor's Arrange commit messages are neutral. Quote each from `git log`. FAIL if any names the planted state (*"bug: X inverted,"* *"planted: Y"*).
- **H4.** No harness-internal files written inside `<scratch>` that the Actor then read. (The Actor may write an `instances/` report — that's fine, it's outside scratch.) FAIL if `.mechanical-test/` or similar appears inside scratch.

### Harness substitutions (informational)

- **A19.** List every harness substitution the Actor used, with the transcript line that triggered it. This is not pass/fail — it tells the Auditor where harness fidelity is thinnest.

## Report

Write `curriculum/evals/mechanical/instances/m1-chain-judge-report.md`.

Shape:

```markdown
# Judge report — M1 chain

## Summary
<2–3 lines: pass count, most interesting failure, one transcript surprise.>

## Actor transcript
<absolute path to .jsonl>

## Scratch
<absolute path>

## Assertions
A1. PASS — <evidence>
A2. FAIL — <evidence + what broke>
...
A19. <list of substitutions, not graded>

## Harness leakage
H1. PASS/FAIL — <evidence>
...

## Findings for the exercises (ordered by severity)
- <one bullet per finding, pointing at file:line or transcript line>

## Findings for the harness
- <one bullet per harness-level issue, if any>
```

Under 600 words. Long quotes go in fenced blocks — keep them short. Leave scratch in place; the Auditor may want to read it.
