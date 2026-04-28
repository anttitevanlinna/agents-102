# Judge — M1 chain verbatim

You are grading an Actor subagent that executed AE101 Module 1 end-to-end (3 exercises on the same bug / same repo) by pasting each exercise prompt verbatim from disk. You did not run the exercise; the Actor did. Inputs: final scratch state, the Actor's full `.jsonl` transcript, the Actor's scrollback file, and the six extracted prompt files on disk.

## Inputs

- **Scratch path:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain-verbatim`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>` (the dispatcher fills it in; if blank, find the newest under `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/*/subagents/agent-*.jsonl`).
- **Actor report:** `curriculum/evals/mechanical/instances/m1-chain-verbatim-actor-report.md`.
- **Actor scrollback:** `curriculum/evals/mechanical/instances/m1-chain-verbatim-actor-scrollback.md`.
- **Prompt files:** `/tmp/prompts/orient-and-introspect/prompt-00{1,2}.txt`, `/tmp/prompts/fix-tests-first/prompt-001.txt`, `/tmp/prompts/compound-and-close/prompt-00{1,2,3}.txt`.

## How to read the transcript

```
jq -c 'select(.type=="assistant") | .message.content[] | select(.type=="tool_use") | {name: .name, input: .input}' <path>
grep -o '"file_path":"[^"]*"' <path> | sort -u
```

## Assertions

Binary PASS / FAIL with evidence. Every fail quotes the evidence.

### Verbatim round-trip (the regression test)

- **V1.** `prompt-001.txt` from orient-and-introspect appears verbatim somewhere in the actor scrollback (Python: full file text `in` scrollback text). Quote the 40-char prefix as evidence.
- **V2.** `prompt-002.txt` from orient-and-introspect appears verbatim.
- **V3.** `prompt-001.txt` from fix-tests-first appears verbatim.
- **V4.** `prompt-001.txt` from compound-and-close appears verbatim. This is the prompt whose gitignore instruction was tightened in 9f575c8 — confirm the tightened line ("Ensure `.claude/settings.local.json` is gitignored — if this repo's local `.gitignore` doesn't cover it, add it.") is present.
- **V5.** `prompt-002.txt` from compound-and-close appears verbatim.
- **V6.** `prompt-003.txt` from compound-and-close appears verbatim.

### Chain state

- **A1.** `<scratch>/.git/` exists; `git log --oneline | wc -l` ≥ 3.
- **A2.** A test file exists for the fixed module (likely `src/terrain.test.js`).
- **A3.** Fix is minimal. Quote the `isSolid` hunks from both bug commit and fix commit. Flag if the "fix" is larger than 5 lines on the production code path.
- **A4.** After fix: `npm test` exits 0 OR equivalent test runner passes. Run: `cd <scratch> && npm test` (may need `npm install` first; note if so).

### Ex3 file-system outputs

- **A5.** `<scratch>/CLAUDE.local.md` exists.
- **A6.** Non-empty. Contains at least one rule referencing a concrete moment from Ex1 or Ex2. Quote the sentence. A generic rule that could appear anywhere without this session is NOT evidence of compounding — fail it.
- **A7.** No `[BRACKET]` placeholders. `grep -n '\[[A-Z]' <scratch>/CLAUDE.local.md`.
- **A8.** `<scratch>/.gitignore` contains `CLAUDE.local.md` (or equivalent pattern that matches it) **OR** `git check-ignore <scratch>/CLAUDE.local.md` succeeds via a global excludesFile. **This tests the gitignore prompt fix (9f575c8).** If only global works, FLAG — the tightened prompt should have driven a local .gitignore edit on a fresh student laptop.
- **A9.** `<scratch>/.claude/settings.local.json` is valid JSON.
- **A10.** JSON contains `additionalDirectories` array with `/Users/anttitevanlinna/Projects/agents-102/content`.

### Summary quality

- **A11.** Ex3 compound summary (in the transcript, after the first Ex3 prompt paste) is 3–5 paragraphs, each under 60 words.
- **A12.** Summary cites specific session moments (quoted phrase, file path, or exercise move). Quote two.
- **A13.** No generic filler — no unanchored *"always verify output,"* *"follow best practices,"* or motivational sentences. FAIL and quote if any appear.

### Prompt-chain integrity

- **A14.** No prompt stalled on a value the Actor was not prompted to supply mid-chain. Every prompt paste was followed by an assistant response that acted, not a stuck question.
- **A15.** No question-dump where the prompt implies "one at a time."
- **A16.** Ex3's `CLAUDE.local.md` is integrated, not appended. Check for "retro notes," "session X log" heading, or boilerplate tacked on.

### Cross-exercise state

- **A17.** Ex2 execution referenced Ex1's orientation/introspection. Transcript: Ex2 response should mention what was read in Ex1 OR reason about the window mapped in Ex1.
- **A18.** Ex3's compound summary references BOTH Ex1 and Ex2 moments. Quote one of each.

### Harness leakage

- **H1.** Actor did NOT read the seed maintainer doc (`lemmings-seed.maintainer.md`) or any file documenting planted state. Transcript grep: no Read call with that path.
- **H2.** Actor did NOT read any judge runner or other actor runner. Transcript grep: no Read on `runners/*.judge.md` or `runners/m[^1]*.actor.md`. Reading its own `m1-chain.verbatim.actor.md` is allowed.
- **H3.** Actor did NOT read any exercise file under `curriculum/exercises/`. Transcript grep. The verbatim protocol requires all prompt content came from `/tmp/prompts/`.
- **H4.** Arrange commit messages are neutral. Quote each from `git log`. FAIL if any names the planted state.
- **H5.** No harness-internal files written inside `<scratch>` that the Actor then read.

### Harness substitutions (informational)

- **A19.** List every harness substitution the Actor used with the transcript line that triggered it. Not pass/fail — informs where harness fidelity is thin.

## Report

Write `curriculum/evals/mechanical/instances/m1-chain-verbatim-judge-report.md`.

Shape:

```markdown
# Judge report — M1 chain verbatim

## Summary
<2–3 lines: pass count, most interesting failure, one surprise from the transcript.>

## Actor transcript
<absolute path>

## Scratch
<absolute path>

## Assertions

V1. PASS/FAIL — <evidence>
...
V6. PASS/FAIL — <evidence>

A1. PASS/FAIL — <evidence>
...
A19. <list of substitutions>

## Harness leakage
H1. PASS/FAIL — <evidence>
...
H5. PASS/FAIL — <evidence>

## Findings for the exercises
- <severity-ordered bullets>

## Findings for the harness
- <severity-ordered bullets, if any>

### Prompt-source audit
<P/E results>
```

Under 900 words. Keep quotes short. Leave scratch in place.

### Prompt-source audit

Run the dimension defined in `curriculum/evals/mechanical/runners/_prompt-source-audit.md` against:

- **Fenced prompts:** `/tmp/prompts/orient-and-introspect/prompt-*.txt`, `/tmp/prompts/fix-tests-first/prompt-*.txt`, `/tmp/prompts/compound-and-close/prompt-*.txt`
- **Exercise bodies:** `curriculum/exercises/orient-and-introspect.md`, `curriculum/exercises/fix-tests-first.md`, `curriculum/exercises/compound-and-close.md` (clip each at `<!-- maintainer -->`)

Apply P1–P5 to fenced content; E1–E7 to body-ex-maintainer. Severities and verdict ladder per the shared doc. M1 is in the AE101 M1–M3 carve-out range — `practice` (noun) is BANNED (E6). Module-specific note: M1 has no upstream module, so E4 cross-module references should be absent; if any appear, FAIL Sev-1 (source defect).
