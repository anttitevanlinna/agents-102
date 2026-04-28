# Actor report — M1 chain verbatim

## Status
done

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain-verbatim

## Prompts executed
1. Ex1 prompt-001 — orient: read entry-point, terrain, lemming, main, backend/package.json, settings; flagged wip-touched terrain.js as load-bearing.
2. Ex1 prompt-002 — introspection: named files Read with reasons, listed skipped files (backend body, ui/skills/api, style.css, lockfiles) with the call on each.
3. /context (substituted) — listed Read-list vs tree-listing.
4. Ex2 bug restatement (student-typed) — pasted verbatim into chat.
5. Ex2 prompt-001 — wrote node:test against isSolid (3 cases, document stub), watched 2 fail with the ticket's failure shape, fixed `=== 0` -> `=== 1` at terrain.js:43, re-ran green, showed diff before commit.
6. gh PR (substituted) — committed on main as 24242af; no remote / no gh.
7. Ex3 prompt-001 (compound) — created ./.gitignore, wrote ./CLAUDE.local.md (TDD loop, cited Kent Beck), settings.local.json edit blocked by harness, flagged 2 team-worthy candidates.
8. Ex3 prompt-002 (read ticket, path 3) — no connector; reported what I could see; no in-repo ticket found.
9. Ex3 prompt-003 (post close-out, path 3) — wrote close-out draft to instances/m1-chain-verbatim-close-out-draft.md.

## Final state
- Commits: 3 (a971c46 initial, 6f4907e wip, 24242af fix)
- Tests: green (3/3 in src/__tests__/terrain.test.mjs)
- Files Ex3 wrote: ./CLAUDE.local.md, ./.gitignore (new), instances/m1-chain-verbatim-close-out-draft.md

## Scrollback path
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-chain-verbatim-actor-scrollback.md

## Harness substitutions
- /context: listed Read-list vs tree-listing in scrollback.
- /add-dir: not exercised in this run (prompts didn't lean on the content-folder pin).
- MCP connector: path 3 — close-out written to instances/m1-chain-verbatim-close-out-draft.md instead of posted.
- gh: skipped PR; committed on main (24242af).
- .claude/settings.local.json edit: blocked by harness Edit/Write permission; recorded as no-op (CLAUDE.local.md and .gitignore writes succeeded).
