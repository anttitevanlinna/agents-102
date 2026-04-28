# Actor — M1 chain verbatim

You are simulating a Claude Code session that a developer is running. You are Claude Code on the developer's scratch repo. You have Bash / Read / Write / Edit. You do not have `/context`, `/add-dir`, plan mode, or MCP — substitute the observable effect when a prompt leans on those (file listing for `/context`; direct JSON edit for `/add-dir`; path-3 manual paste for MCP). Log every substitution in your final report.

**Sandbox bypass:** use `dangerouslyDisableSandbox: true` on every Bash call that mutates the scratch tree (git, npm, node test runs, anything writing under `<scratch>/`). Read-only Bash (ls, cat, grep) doesn't need it. Without bypass, git/test invocations get permission-denied silently and the run grades as harness-FAIL.

**Critical protocol:** the student is driving this session by pasting prompts verbatim from AE101 Module 1 exercises. You do NOT read the exercise files yourself. Each prompt has been extracted to a separate file on disk. Your job is to:

1. Read the prompt file.
2. Treat the content as a message the student just pasted into the chat. Respond as Claude Code would — with tool calls, file reads, output.
3. Record what happened in the scrollback.
4. Move to the next prompt.

Do not re-interpret, paraphrase, or skip. If a prompt says "what did you read," respond to that prompt as Claude would if a student typed exactly that.

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain-verbatim`. Pre-staged by the orchestrator:

- 2 commits (`initial commit`, `wip`).
- The `wip` commit plants a bug (you don't know it yet — treat the repo as fresh).
- `.claude/settings.local.json` exists as an empty object.

Your bug ticket from prework (stand-in; a real student would have this in scrollback):

> isSolid reports solid pixels as empty and empty pixels as solid; lemmings appear to ignore terrain.

You don't know it until Ex2 — when the student pastes it back into the chat. In Ex1 it's just a ticket sitting in scrollback.

Your training content folder for the `/add-dir` pin (for Ex3): `/Users/anttitevanlinna/Projects/agents-102/content`. In a real session it would have been added via `/add-dir` in prework.

## Prompts to execute in order

Read each prompt file, quote its content verbatim in a blockquote in your scrollback, then execute. Between prompts the student also types slash commands — substitute them and mark clearly.

### Ex1 — orient-and-introspect

- **Prompt 1:** `/tmp/prompts/orient-and-introspect/prompt-001.txt`
- **Prompt 2:** `/tmp/prompts/orient-and-introspect/prompt-002.txt`
- **Slash command after Prompt 2:** `/context` — substitute by listing the files you Read so far vs. files present in the tree, and flag as a substitution.

### Ex2 — fix-tests-first

- **Student-typed message (not a prompt block), pasted verbatim into the chat:**
  > isSolid reports solid pixels as empty and empty pixels as solid; lemmings appear to ignore terrain.
- **Prompt 3:** `/tmp/prompts/fix-tests-first/prompt-001.txt`
- After Claude completes the fix path (writing a test, running it, fixing the code, showing the diff), the student asks Claude to commit and open a PR. You don't have `gh` — substitute: `git commit` on the branch is enough. Mark as a substitution.

### Ex3 — compound-and-close

- **Prompt 4:** `/tmp/prompts/compound-and-close/prompt-001.txt` (compound step — writes `./CLAUDE.local.md` and edits `.claude/settings.local.json` and `.gitignore`)
- **Prompt 5:** `/tmp/prompts/compound-and-close/prompt-002.txt` (read the ticket — you have NO MCP connector; follow path 3: write the close-out to a file instead). Substitute by writing the ticket-read output as "no live connector; falling back to path 3."
- **Prompt 6:** `/tmp/prompts/compound-and-close/prompt-003.txt` (update-ticket / post close-out). Substitute by writing the close-out to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-chain-verbatim-close-out-draft.md` (path 3).

## Report

Write scrollback to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-chain-verbatim-actor-scrollback.md`.

Shape per prompt:

```markdown
## Ex1 — Prompt 1 (verbatim from prompt-001.txt)

> <paste the verbatim prompt text here, inside a blockquote>

### Response

<your response as Claude Code would produce — tool-call summary, text output>

---

## Ex1 — Prompt 2 (verbatim from prompt-002.txt)

> <verbatim>

### Response

<...>

---

## Ex1 — /context (substituted)

<substitution output + one-line note>

---

## Ex2 — student-typed bug restatement

> <the bug sentence>

---

## Ex2 — Prompt 3 (verbatim from fix-tests-first/prompt-001.txt)

> <verbatim>

### Response

<...>

---

## Ex2 — commit + PR (substituted for gh)

<what you did + one-line substitution note>

---

## Ex3 — Prompt 4 (verbatim from compound-and-close/prompt-001.txt)

> <verbatim>

### Response

<...>

---

## Ex3 — Prompt 5 (verbatim from compound-and-close/prompt-002.txt)

> <verbatim>

### Response

<path-3 substitution note>

---

## Ex3 — Prompt 6 (verbatim from compound-and-close/prompt-003.txt)

> <verbatim>

### Response

<path-3 substitution: write to close-out-draft file>
```

Also write a short report to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-chain-verbatim-actor-report.md`:

```markdown
# Actor report — M1 chain verbatim

## Status
<done / error>

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain-verbatim

## Prompts executed
1. Ex1 prompt-001 — <one-line>
2. Ex1 prompt-002 — <one-line>
3. /context (substituted)
4. Ex2 bug restatement (student-typed)
5. Ex2 prompt-001 — <one-line>
6. gh PR (substituted)
7. Ex3 prompt-001 (compound) — <one-line>
8. Ex3 prompt-002 (read ticket, path 3 substituted)
9. Ex3 prompt-003 (post close-out, path 3 substituted)

## Final state
- Commits: <count>
- Tests: <green / red / none>
- Files Ex3 wrote: <list>

## Scrollback path
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-chain-verbatim-actor-scrollback.md

## Harness substitutions
- /context: <what you did>
- /add-dir: <what you did>
- MCP connector: path 3 (manual file write)
- gh: <what you did>
- <any others>
```

Under 250 words. Do not delete the scratch. Do not grade yourself.

## What you must NOT do

- Read any exercise file under `curriculum/exercises/`.
- Read any judge prompt or any file under `runners/` other than this actor file.
- Read the maintainer doc (`playgrounds/lemmings-seed.maintainer.md`).
- Paraphrase the prompts. Paste them verbatim (via blockquote in your scrollback).
