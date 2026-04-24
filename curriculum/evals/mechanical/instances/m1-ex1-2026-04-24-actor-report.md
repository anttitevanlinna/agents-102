# Actor report — M1 Ex1 — 2026-04-24

## Status
done

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-ex1

## Harness substitutions
- `/context`: no slash command available in this harness. Substituted the observable effect — listed files actually opened with Read vs. files present in the tree, called out the delta as the unread slice.

## Scrollback path
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-ex1-2026-04-24-actor-scrollback.md

## Notes
Ran the two prompts as Claude Code would: a skim-then-introspect pass. Read entry point + terrain + lemming state machine + main loop + skills + backend server to rule out blast radius. Skipped `ui.js`, `api.js`, `style.css`, `backend/db.js`, and metadata. The `wip` commit inverted `isSolid` from `=== 1` to `=== 0` against a `1 = solid` convention — flagged as the likely planted bug but did not fix it (exercise is orientation, not repair). Scratch left in place for the Judge.
