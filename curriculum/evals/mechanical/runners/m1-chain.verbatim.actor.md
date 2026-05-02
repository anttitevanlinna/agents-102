# Actor — M1 chain verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the prompt chain end-to-end (3 exercises, same repo) and leave file artefacts on disk for the Judge's scripts to inspect. You are NOT trying to produce great content. Stub generated content is fine.

You are simulating Claude Code on a developer's scratch repo. You have Bash / Read / Write / Edit. You do not have `/context`, `/add-dir`, plan mode, or MCP — substitute the observable effect (file listing for `/context`; direct JSON edit for `/add-dir`; path-3 manual paste for MCP). Log every substitution.

**Sandbox bypass:** use `dangerouslyDisableSandbox: true` on every Bash call that mutates the scratch tree (git, npm, node test runs). Read-only Bash (ls, cat, grep) doesn't need it. Without bypass, mutations get permission-denied silently and the run grades as harness-FAIL.

**Critical protocol:** the student is driving by pasting prompts verbatim from disk. You do NOT read the exercise files. For each prompt: Read the prompt file, quote it verbatim in a `> `-prefixed blockquote in your scrollback, respond, record. Stub long generated content.

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain-verbatim`. Pre-staged:

- 2 commits (`initial commit`, `wip`).
- The `wip` commit plants a bug (you don't know it yet — treat the repo as fresh).
- `.claude/settings.local.json` exists as an empty object.

Bug ticket from prework (stand-in):

> isSolid reports solid pixels as empty and empty pixels as solid; lemmings appear to ignore terrain.

Training content folder for `/add-dir` pin (Ex3): `/Users/anttitevanlinna/Projects/agents-102/content`.

## Prompts to execute in order

### Ex1 — orient-and-introspect

- **Prompt 1:** `/tmp/prompts/orient-and-introspect/prompt-001.txt`
- **Prompt 2:** `/tmp/prompts/orient-and-introspect/prompt-002.txt`
- **Slash command after Prompt 2:** `/context` — substitute by listing files Read so far vs files in tree, mark as substitution.

### Ex2 — fix-tests-first

- **Student-typed message (verbatim into chat):**
  > isSolid reports solid pixels as empty and empty pixels as solid; lemmings appear to ignore terrain.
- **Prompt 3:** `/tmp/prompts/fix-tests-first/prompt-001.txt`
- After fix path (test → run → fix → diff), student asks to commit and open a PR. No `gh` — substitute: `git commit` on the branch is enough. Mark substitution.

### Ex3 — compound-and-close

- **Prompt 4:** `/tmp/prompts/compound-and-close/prompt-001.txt` (compound — writes `./CLAUDE.local.md`, edits `.claude/settings.local.json` and `.gitignore`)
- **Prompt 5:** `/tmp/prompts/compound-and-close/prompt-002.txt` (read ticket — NO MCP; path 3: write the close-out to a file). Note "no live connector; falling back to path 3."
- **Prompt 6:** `/tmp/prompts/compound-and-close/prompt-003.txt` (post close-out). Substitute by writing to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-chain-verbatim-close-out-draft.md`.

## Reports

**Scrollback:** `curriculum/evals/mechanical/instances/m1-chain-verbatim-actor-scrollback.md` — one section per prompt (verbatim blockquote + response or one-line stub summary). Include all student-substitute pastes.

**Report:** `curriculum/evals/mechanical/instances/m1-chain-verbatim-actor-report.md`:

```markdown
# Actor report — M1 chain verbatim

## Status
done | error

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain-verbatim

## Prompts executed
1–6 (one line each)

## Final state
- Commits: <count>
- Tests: <green / red / none>
- Files Ex3 wrote: <list>

## Harness substitutions
- /context, /add-dir, MCP (path 3), gh, <any others>
```

Under 200 words. Do not grade yourself.

## What you must NOT do

- Read any file under `curriculum/exercises/`.
- Read any judge runner or sibling actor runner.
- Read maintainer docs (`playgrounds/lemmings-seed.maintainer.md`).
- Paraphrase prompts. Paste verbatim, blockquote-prefixed.
- Generate long realistic content. Stubs are fine.
