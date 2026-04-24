# Actor report — self-test broken-chain — 2026-04-24

## What I did

- Read the runner: `curriculum/evals/mechanical/runners/self-test.broken-chain.actor.md`.
- Read both prompts verbatim from `/tmp/prompts/broken-chain/prompt-001.txt` and `prompt-002.txt`.
- Did NOT read the source exercise file, any judge runner, or any maintainer doc.

### Prompt 1

- Explored scratch repo at `curriculum/evals/mechanical/scratch/broken-chain` (find + ls).
- Read all source files: `index.html`, `src/main.js`, `src/terrain.js`, `src/lemming.js`, `src/ui.js`, `src/skills.js`, `src/api.js`, `backend/server.js`, `backend/db.js`, `backend/package.json`.
- Created `notes/` directory.
- Wrote `notes/entrypoints.md` — two-entry-point summary (frontend `index.html` → `src/main.js` tree; backend `backend/server.js` → `db.js`) with per-file one-liners and dependency direction summary. Flagged `src/api.js` as an orphan per its own WIP comment.

### Prompt 2

- Listed `notes/` — only `entrypoints.md` existed. Prompt named `entry-points.md` (hyphenated). Surfaced the filename mismatch to the student in the response, proceeded with the actually-existing file on the assumption that was the intent.
- Edited `notes/entrypoints.md`: added a "## Dependency graph" section with indented-list trees for frontend and backend entries, plus an orphan subsection for `src/api.js` and a manifest note for `backend/package.json`.

## Artifacts produced

- `curriculum/evals/mechanical/scratch/broken-chain/notes/entrypoints.md` (created prompt 1, extended prompt 2)
- `curriculum/evals/mechanical/instances/self-test-broken-chain-2026-04-24-actor-scrollback.md` (this run)
- `curriculum/evals/mechanical/instances/self-test-broken-chain-2026-04-24-actor-report.md` (this file)

## Notes on behavior

The second prompt named a file that did not exist (hyphenated `entry-points.md`). Rather than silently pretend, I listed the directory, named the mismatch explicitly, stated the assumption, and invited correction before continuing. No grading — that is the judge's job.
