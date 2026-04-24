# M1 Ex1 actor scrollback — 2026-04-24

Scratch repo: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-ex1`

---

## Prompt 1

```
Read enough of this repo to tell me what's here: the shape, the structure, what looks load-bearing, what's been touched recently, what looks stale. Don't try to be complete. Read what you judge worth reading; skip what you judge isn't.
```

## Response 1 (Claude Code)

I listed the tree and read the files that looked load-bearing. Here's the shape.

**Top-level.** A tiny browser game plus a small Node backend.
- `index.html` — single page, imports `src/main.js` as a module. 19 lines.
- `style.css` — 38 lines, cosmetic only (didn't read closely).
- `src/` — the game (6 files, ~400 lines total).
- `backend/` — Express + SQLite + JWT auth for scores and user-uploaded levels. `node_modules` and `package-lock.json` are absent; backend isn't installed locally.
- `.claude/settings.local.json` — empty object, fresh.

**The game (`src/`), load-bearing files:**
- `main.js` — the game loop. Spawns 12 lemmings, runs `updateLemming` at 30 Hz, tallies saved/lost, decides win at `saved >= goal` (8).
- `terrain.js` — pixel-grid destructible terrain. `Uint8Array(W*H)` with `1 = solid`. Exports `isSolid`, `clearPixel`, `clearRect`, `drawTerrain`, `buildLevel`. The level is hand-laid rects: upper spawn platform, a death pit at x=200..260, lower-right landing pad, and a wall at x=480 the lemmings have to bash through.
- `lemming.js` — a state machine per lemming: `walk | fall | block | bash | dig | saved | dead`. Reads terrain via `isSolid` / `groundAt` / `wallAhead`. The walk loop handles small rises (1–3 px step-up) and flips direction on a wall.
- `skills.js` — three skills (block/bash/dig) with budgets (2/3/2). Short.
- `ui.js`, `api.js` — didn't fully read. `ui.js` is the HUD + skill-button wiring (53 lines). `api.js` looks like the fetch wrapper to the backend (62 lines).

**Backend (`backend/`):**
- `server.js` — Express routes for `/auth/register`, `/auth/login`, `/scores`, `/scores/top`, `/levels` CRUD. JWT secret is hardcoded ("lemming-secret"). CORS is wide open. Fine for a toy; I'd flag both before this shipped anywhere real.
- `db.js` — 33 lines, presumably the SQLite schema/connection (didn't open).
- `package.json`, `.gitignore` — didn't read.

**Recent activity.**
```
25a1fe8 wip
d466f92 initial commit
```
Two commits. The `wip` on top is a single-line change in `src/terrain.js` — `isSolid` now returns `solid[...] === 0` instead of `=== 1`. Given the module comment *"1 = solid"*, that inversion looks wrong on its face — it would tell every physics query the solid bitmap is the empty space. That's almost certainly the bug picked from prework.

**What looks load-bearing.** `terrain.js` (every physics call goes through `isSolid`), `lemming.js` (the state machine everything animates), `main.js` (the loop). A bug in `terrain.isSolid` ripples through everything: walking, falling, wall detection, bash completion.

**What looks stale / peripheral.** The backend is a self-contained scores/levels service that the game's front-end calls through `api.js`. It's not in the path of the obvious bug. `style.css` is cosmetic. `.claude/settings.local.json` is empty.

---

## Prompt 2

```
What did you read, and why those files? What didn't you read, and why not? Name the specific files or directories you skipped and the call you made on each.
```

## Response 2 (Claude Code)

**Read, in order:**
- `ls -la` + `find` for the tree — orient before opening anything.
- `index.html` — entry point; tells me which JS loads first. Cheap (19 lines).
- `src/main.js` — the loop. The game's spine. 72 lines.
- `src/terrain.js` — because `main.js` imports from it, because the module comment names the solid-bitmap convention, and because the diff-by-eye on the most recent commit lives here. 62 lines.
- `src/lemming.js` — because every tick calls `updateLemming`, and the state machine is where bugs manifest visibly. 134 lines.
- `src/skills.js` — small (20 lines), cheap to finish the game model.
- `backend/server.js` — to know whether the backend was in the bug's blast radius. Judged it wasn't after reading.
- `git log` — to see what's been touched.

**Did not read:**
- `src/ui.js` — HUD + skill buttons. Cosmetic glue between DOM and state. If the bug is physics/rendering, UI isn't in the path. Would read if the skill-button interaction turned out to be involved.
- `src/api.js` — front-end fetch wrapper to the backend. Same call — not in the physics path.
- `style.css` — pure presentation.
- `backend/db.js` — schema/connection. Backend already ruled out; no point.
- `backend/package.json`, `backend/.gitignore` — metadata.
- `.claude/settings.local.json` — `{}`, nothing to learn.
- `.git/` — plumbing.

**Grain of salt.** This is my account of what I chose and why. It's a hypothesis. What actually landed in the window is whatever the `/context` instrument reports — some of what I "read" may have been truncated, and some files the tool auto-pulled may be in there that I didn't list. Verify against the instrument before trusting this as ground truth.

---

## /context (harness substitution)

I don't have the `/context` slash command in this harness. Substituting the observable effect — the files I actually opened with the Read tool during this session vs. the files present in the tree.

**Files opened during this session (in-window):**
- `/Users/anttitevanlinna/Projects/agents-102/curriculum/exercises/orient-and-introspect.md` (exercise text)
- `src/terrain.js`
- `index.html`
- `src/main.js`
- `src/lemming.js`
- `src/skills.js`
- `backend/server.js`

**Files present in the repo but NOT opened:**
- `src/ui.js`
- `src/api.js`
- `style.css`
- `backend/db.js`
- `backend/package.json`
- `backend/.gitignore`
- `.claude/settings.local.json` (content known — `{}`)

That unread slice is where the unread-10% lives. If the bug's root cause isn't in `terrain.js`, the blind spot is most likely `ui.js` (skill wiring) or `api.js` (backend coupling). I'd steer those into the window explicitly before assuming the self-report above is complete.
