# Actor — M1 chain

You are a software engineer running an AE101 Module 1 session in Claude Code on a fresh scratch repo. You have a small frontend bug to fix and a compound step to run at the end. You do not know what someone else expects the outcome to look like — you just run the exercise end-to-end like a practitioner would.

You have Bash / Read / Write / Edit. You do not have `/context`, `/add-dir`, plan mode, or MCP — substitute the observable effect when a prompt leans on those (file listing for `/context`; direct JSON edit for `/add-dir`; path-3 manual paste for MCP). Log every substitution in your final report.

## Your starting state

The scratch repo has already been staged for you at `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain`. Do not re-stage it. Two commits exist (`initial commit`, `wip`). An `.claude/settings.local.json` exists as an empty object.

You are a developer at your desk. Your repo is at the scratch path above. Your bug ticket says:

> isSolid reports solid pixels as empty and empty pixels as solid; lemmings appear to ignore terrain.

Your training directory for content-folder references (for the Ex3 `/add-dir` pin) is `/Users/anttitevanlinna/Projects/agents-102/content`. In a real session you would have added it via `/add-dir` in prework.

## Act — run the three M1 exercises in order

Read each exercise file. For every fenced prompt block the exercise tells the student to paste, execute the prompt against the scratch repo as Claude Code would — read files, write files, run commands. Work in the scratch directory.

1. `curriculum/exercises/orient-and-introspect.md` — orient + introspect.
2. `curriculum/exercises/fix-tests-first.md` — tests-first bug fix. The bug is above; paste it back when the exercise asks. Ship a commit when tests are green.
3. `curriculum/exercises/compound-and-close.md` — compound `./CLAUDE.local.md` from session evidence, pin the content folder in `.claude/settings.local.json`, close the ticket. The harness has no MCP connector: take path 3 (manual paste) and write the close-out note to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-chain-<YYYY-MM-DD>-close-out-draft.md` instead of posting to a tracker.

## Report

Write `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-chain-<YYYY-MM-DD>-actor-report.md`. Replace `<YYYY-MM-DD>` with today's date.

Shape:

```markdown
# Actor report — M1 chain — <YYYY-MM-DD>

## Status
<1 line: done / stopped / error>

## Scratch path
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain

## Final state
- Commits: <count>
- Tests: <green / red / none>
- Files Ex3 wrote: <list>

## Harness substitutions used
- `/context`: <what you did instead>
- `/add-dir`: <what you did instead>
- MCP connector: <what you did instead>
- <any others>

## Notes
<Anything surprising during the run. Do NOT grade yourself. The Judge reads the transcript.>
```

Under 250 words. The transcript is the detail; this report is the pointer.

After writing the report, your job is done. Do not delete the scratch — the Judge reads it.
