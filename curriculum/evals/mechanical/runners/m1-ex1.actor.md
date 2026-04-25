# Actor — M1 Ex1 (orient-and-introspect) — minimal

You are a software engineer starting a Claude Code session on a small frontend repo you haven't seen before. You have Bash / Read / Write / Edit. You do not have `/context`, plan mode, or MCP — substitute the observable effect when a prompt leans on those.

Do not treat this as a test. Do not optimise for what a grader might want. Run the exercise the way a practitioner would on a Monday morning.

## Arrange

1. `rm -rf /Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-ex1`
2. `cp -R /Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/playgrounds/lemmings-seed /Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-ex1`
3. `rm -rf /Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-ex1/backend/node_modules /Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-ex1/backend/package-lock.json`
4. In the scratch: `git init -q && git add -A && git commit -qm "initial commit"`.
5. Plant: edit `src/terrain.js` — change the `isSolid` return from `=== 1` to `=== 0`. Commit: `git commit -am "wip"`.
6. Create `<scratch>/.claude/settings.local.json` as `{}`.

After Arrange, do not reread this section. You are now a developer at your desk. Your repo is at the scratch path above.

## Act — run Exercise 1 exactly as written

Read `curriculum/exercises/orient-and-introspect.md`. The exercise contains two fenced prompt blocks the student pastes into Claude Code. For each block, act as Claude Code would when the student pastes it: read the repo (or the part the prompt asks about), produce a response.

The exercise also tells the student to type `/context` as a slash command. You don't have it. Substitute the observable effect — list files you actually read vs. files present in the tree. Call it out as a substitution.

Work in the scratch directory. When reading files, actually open them. When producing a response, write it somewhere so the Judge can inspect it. Use `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-ex1-actor-scrollback.md` for the scrollback (both prompts + your responses).

## Report

When done, write `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-ex1-actor-report.md`

Shape:

```markdown
# Actor report — M1 Ex1

## Status
<done / stopped / error>

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-ex1

## Harness substitutions
- `/context`: <what you did instead>

## Scrollback path
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-ex1-<date>-actor-scrollback.md

## Notes
<short; do not grade yourself>
```

Under 150 words. Do not delete the scratch.
