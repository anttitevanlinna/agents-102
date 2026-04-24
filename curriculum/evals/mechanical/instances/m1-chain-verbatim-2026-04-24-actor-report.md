# Actor report — M1 chain verbatim — 2026-04-24

## Status
done

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain-verbatim

## Prompts executed
1. Ex1 prompt-001 — oriented by reading src/* + backend/* + shell; skipped node_modules/, package-lock.json, .git/.
2. Ex1 prompt-002 — named each file read and each skipped with the call made on it.
3. /context (substituted) — listed Read-vs-present files.
4. Ex2 bug restatement (student-typed) — pasted into chat verbatim.
5. Ex2 prompt-001 — wrote tests/terrain.test.mjs (red), fixed src/terrain.js `=== 0` → `=== 1` (green), showed diff, committed on branch.
6. gh PR (substituted) — branch fix/is-solid-inverted + commit 8206897 stand in; no gh in harness.
7. Ex3 prompt-001 (compound) — wrote ./CLAUDE.local.md + ./.gitignore; settings.local.json write DENIED by sandbox (documented).
8. Ex3 prompt-002 (read ticket, path 3) — no connector; searched repo, no ticket file; noted in close-out.
9. Ex3 prompt-003 (post close-out, path 3) — wrote close-out draft file.

## Final state
- Commits: 3 (initial, wip, fix)
- Tests: green (tests/terrain.test.mjs)
- Files Ex3 wrote: ./CLAUDE.local.md, ./.gitignore, instances/m1-chain-verbatim-2026-04-24-close-out-draft.md
- Files Ex3 intended but sandbox denied: ./.claude/settings.local.json (additionalDirectories pin)

## Scrollback path
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-chain-verbatim-2026-04-24-actor-scrollback.md

## Harness substitutions
- /context: listed Read files vs. files-in-tree.
- /add-dir: skipped at prework time; the Ex3 prompt tried to pin the content folder into `.claude/settings.local.json` → sandbox denied the write ("self-modification of agent permissions"). The intended config is recorded in scrollback and close-out; a real session with user confirmation would land the edit.
- MCP connector: path 3 (no live ticketing tool — wrote close-out to file).
- gh: not installed; branch + commit on `fix/is-solid-inverted` stand in for the PR.
