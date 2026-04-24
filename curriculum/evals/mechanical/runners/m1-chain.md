# Runner: M1 chain (orient-and-introspect → fix-tests-first → compound-and-close)

You are executing a mechanical-execution test for AE101 Module 1's three-exercise chain on a scratch repo. You are the student's Claude Code session — you paste the prompts, observe Claude's behavior (your own behavior), and act on the scratch file system. You are also the test harness — you arrange state, run, and assert.

Do not role-play a student's emotional state. This test is mechanical: did the chain work on real files, or did it not.

## Context the runner needs

- **Training directory:** the AE101 content folder is at `/Users/anttitevanlinna/Projects/agents-102/content/` (pin this absolute path in `.claude/settings.local.json` inside the scratch).
- **Scratch directory:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain/`. If it exists from a prior run, delete it first.
- **Seed:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/playgrounds/lemmings-seed/`.
- **Exercise files** (read verbatim; the prompt blocks inside are what you paste and act on):
  - `curriculum/exercises/orient-and-introspect.md`
  - `curriculum/exercises/fix-tests-first.md`
  - `curriculum/exercises/compound-and-close.md`
- **Module file** (for Bridge + Debrief framing): `curriculum/trainings/agentic-engineering-101/getting-going.md`.

## Arrange

1. Remove any prior scratch: `rm -rf <scratch>/m1-chain`.
2. Copy seed to scratch: `cp -R <playgrounds>/lemmings-seed <scratch>/m1-chain`.
3. Inside scratch: `git init`, `git add -A`, `git commit -m "seed: clean lemmings"`.
4. Plant the bug. Edit `src/terrain.js` function `isSolid`: change the return to `return solid[y * W + x] === 0;` (inverted from `=== 1`). Commit: `git commit -am "bug: isSolid inverted"`.
5. Create `<scratch>/m1-chain/.claude/settings.local.json` as `{}` (empty object).
6. Record the bug for the Act phase: the student's bug for Ex2 is *"isSolid reports solid pixels as empty and empty pixels as solid; lemmings appear to ignore terrain."* Ex2 must add a failing test, then fix.
7. Capture `git log --oneline` output — you will need the initial commit for the Ex2 diff baseline.

## Act — Ex1: orient-and-introspect

Read `curriculum/exercises/orient-and-introspect.md`. For each fenced prompt block in the exercise body:

1. Quote the prompt to your scrollback log.
2. Execute the prompt as Claude would on the scratch repo. Record what you actually do: which files you read, what you say back.
3. For `/context`-style prompts: the runner does not have `/context`. Simulate the observable effect — report *"runner note: `/context` would surface the context-window use at this point. Harness substitute: list files the scrollback has touched vs. files in the repo."* Then do that listing.
4. Save Claude's response per prompt to `<scratch>/m1-chain/.mechanical-test/ex1-scrollback.md`.

End of Ex1 state: scrollback contains an orientation summary + an introspection read that names the unread slice. No file changes expected beyond the scrollback file you create.

## Act — Ex2: fix-tests-first

Read `curriculum/exercises/fix-tests-first.md`. Same loop.

When the chain reaches test-first: lemmings has no test framework. As Claude would: propose adding a minimal one (Vitest is the cheapest; `npm init -y`, add `vitest`, write one test file at `src/terrain.test.js` that imports `isSolid` via a node-friendly shim — since `terrain.js` uses `document`, stub the canvas bits OR refactor `isSolid` to a pure function that takes the grid as an argument). Write the failing test **against the planted bug** first. Then fix `isSolid`. Run the test. Commit.

Record:
- Test file path and contents.
- The diff that fixes the bug (should be a one-character change).
- `npm test` output before and after the fix.
- Scrollback per prompt appended to `<scratch>/m1-chain/.mechanical-test/ex2-scrollback.md`.

End of Ex2 state: scratch has a failing-then-passing test, a one-line fix committed, and a scrollback log.

## Act — Ex3: compound-and-close

Read `curriculum/exercises/compound-and-close.md`. Execute the Compound prompt block first (writes `./CLAUDE.local.md` + pins `additionalDirectories` in `.claude/settings.local.json`).

For the MCP close-the-ticket section: no MCP is wired in the harness. Simulate path 3 (Manual paste). Write the close-out note to `<scratch>/m1-chain/.mechanical-test/close-out-draft.md`. Do not perform any real network action.

Record the Compound summary Claude returns (3–5 lines) verbatim to `<scratch>/m1-chain/.mechanical-test/ex3-summary.md`. Do not revise it to look better.

## Assert

Every assertion is PASS or FAIL with one line of evidence (a quoted string, a file path, a diff line, or a shell-command output). The assertion list is:

### Chain state

- **A1.** `<scratch>/m1-chain/.git/` exists; `git log --oneline | wc -l` ≥ 3 commits.
- **A2.** Ex2 test file exists (likely `src/terrain.test.js` or equivalent).
- **A3.** Ex2 fix is a minimal diff (one logical change — inverted back or equivalent). Quote the diff hunks for `isSolid`.
- **A4.** After fix: `npm test` exits 0 (or equivalent test runner's pass signal).

### Ex3 file-system outputs

- **A5.** `<scratch>/m1-chain/CLAUDE.local.md` exists.
- **A6.** That file is non-empty and contains at least one rule that references something concrete from Ex1 or Ex2 (quote the sentence that does).
- **A7.** That file contains no `[BRACKET]` placeholders (grep the file for `\[[A-Z]`).
- **A8.** `<scratch>/m1-chain/.gitignore` contains a line matching `CLAUDE.local.md`.
- **A9.** `<scratch>/m1-chain/.claude/settings.local.json` is valid JSON.
- **A10.** That JSON contains an `additionalDirectories` array including the AE101 content-folder absolute path.

### Ex3 summary quality

- **A11.** `ex3-summary.md` is 3–5 lines.
- **A12.** The summary cites at least one specific session moment (quoted phrase or file it references).
- **A13.** The summary does NOT contain generic phrases like *"always verify output"* or *"follow best practices"* without tying them to a session moment.

### Prompt-chain integrity

- **A14.** Every prompt in every exercise executed without asking for a value the student is not prompted to supply mid-prompt (no stuck-on-input). If any prompt stalled, report which and why.
- **A15.** No prompt produced a *question dump* (Claude firing all questions at once when the prompt says *"one at a time"*). If yes, name the prompt.
- **A16.** No prompt produced an *append-when-integrate-was-asked* pattern (Ex3's rules file is integrated / rewritten, not appended with a "retro notes" section).

### Cross-exercise state

- **A17.** Ex2's execution actually referenced Ex1's scrollback (quote the Ex2 prompt line that points back to Ex1, and the Claude response that used it).
- **A18.** Ex3's compound summary references moments from BOTH Ex1 and Ex2 (not just Ex2).

### Harness substitutions used

- **A19.** List every place you substituted for a primitive the runner lacks (`/context`, `/add-dir`, MCP call). One line each. These are informational, not pass/fail — they tell us where the harness is weaker than real Claude Code.

## Report

Write the instance file to `curriculum/evals/mechanical/instances/m1-chain-YYYY-MM-DD.md`.

Shape:

```markdown
# M1 chain runner — <YYYY-MM-DD>

## Summary
<2–3 lines: how many assertions passed, the most interesting failure, one surprise.>

## Scratch
- Path: <scratch path>
- Commits: <count>
- Ended in state: <clean / dirty / error>

## Assertions
A1. PASS — <evidence>
A2. FAIL — <evidence + what broke>
...

## Harness substitutions
- /context: <what the runner did instead>
- /add-dir: <what the runner did instead>
- MCP connector: <what the runner did instead>

## Findings for the exercises (for the author to act on)
- <one bullet per finding, pointing at the file:line or prompt block. Order by severity.>
```

Under 600 words total. Diff snippets in fenced blocks count toward word budget — keep them short.

After writing the report: leave the scratch in place for the author to inspect. Do not delete it. The next run will overwrite.
