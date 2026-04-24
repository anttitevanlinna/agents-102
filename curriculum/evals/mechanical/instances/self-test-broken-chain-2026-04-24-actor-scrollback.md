# Actor scrollback — self-test broken-chain — 2026-04-24

## Prompt 1

> Read the repo and summarize the main entry points — which files get loaded first, what they do, which module each depends on. Save your summary to notes/entrypoints.md so you can refer to it later.

**Response:**

Explored the repo via `find` + `ls`, then read `index.html`, `src/main.js`, `src/terrain.js`, `src/lemming.js`, `src/ui.js`, `src/skills.js`, `src/api.js`, `backend/server.js`, `backend/db.js`, and `backend/package.json`.

Identified two entry points:

1. **Frontend:** `index.html` loads `style.css` and `src/main.js` (ES module), which pulls in `terrain.js`, `lemming.js`, `ui.js`; `ui.js` uses `skills.js`; `lemming.js` uses `terrain.js`. `src/api.js` is an orphan flagged "WIP: backend integration. Not wired into main.js yet."
2. **Backend:** `backend/server.js` (Express on :3000, JWT auth, CORS wildcard) uses `backend/db.js` (better-sqlite3 with `users`/`scores`/`levels` tables). Scripts in `backend/package.json`.

Created `notes/` directory and wrote `notes/entrypoints.md` with the summary.

## Prompt 2

> Open notes/entry-points.md, the file you just created, and extend it with a dependency graph for each entry. Use a simple indented list under each entry's section.

**Response:**

Surfaced a filename mismatch: prompt asked for `notes/entry-points.md` (hyphenated). The file created in prompt 1 was `notes/entrypoints.md` (no hyphen). Listed the notes directory to confirm only `entrypoints.md` exists, flagged the mismatch to the student, and proceeded with the actual file on the assumption that was the intended target.

Edited `notes/entrypoints.md` to add a "## Dependency graph" section with indented-list graphs for:

- Frontend `index.html` — tree rooted at index.html → main.js → {terrain, lemming, ui} → skills, with repeated leaves shown inline; `src/api.js` listed as orphan with its fetch target.
- Backend `backend/server.js` — express / bcryptjs / jsonwebtoken / db.js → better-sqlite3 + lemmings.db; manifest note on package.json.

Section placed above the existing "Summary of dependency direction" block so the summary still closes the file.
