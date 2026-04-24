# Lemmings playground seed

Vanilla-JS Lemmings-style prototype + a WIP Node/SQLite backend. The seed for the mechanical-execution test harness at `curriculum/evals/mechanical/`.

**For the maintainer — not student-facing.** Each runner's Arrange step copies this seed to `scratch/<runner>/`, `git init`s it, and patches in module-specific state. The seed itself stays clean.

## Shape

```
lemmings-seed/
├── index.html           frontend entry, vanilla JS
├── style.css
├── src/
│   ├── main.js          game loop + spawner
│   ├── lemming.js       entity + movement
│   ├── skills.js        skill assignment (Basher only, so far)
│   ├── terrain.js       destructible pixel grid
│   ├── ui.js            toolbar + cursor
│   └── api.js           WIP: backend client, not wired into main.js yet
└── backend/             Node + Express + SQLite + JWT
    ├── package.json
    ├── db.js            schema: users, scores, levels
    ├── server.js        routes: /auth/* /scores /levels/*
    └── .gitignore
```

## The Heroku-shaped backend

One directory, one `npm install && npm start`, SQLite file as the database, JWT-based auth. No Docker, no infra, no cloud. The stack — Express + better-sqlite3 + bcryptjs + jsonwebtoken — mirrors what most Nordic engineering teams run in production on managed PaaS. Familiar enough for any backend engineer to read in ten minutes; small enough that M3's STRIDE pass completes inside a cohort slot.

## Planted security state (for M3's STRIDE exercise)

These issues are planted deliberately. Comments in the code do **not** flag them — students and Claude discover them during the exercise. STRIDE should find at least one target per category.

| STRIDE | Planted issue | Where |
|---|---|---|
| **S**poofing | `POST /scores` trusts client-sent `user_id` instead of deriving from the JWT | `server.js` /scores handler |
| **S**poofing | `POST /auth/login` has no rate limit, no lockout — credential stuffing wide open | `server.js` /auth/login |
| **T**ampering | `POST /scores` accepts any integer (negative, `Number.MAX_SAFE_INTEGER`) with no validation | `server.js` /scores |
| **T**ampering | `DELETE /levels/:id` does not check `uploader_id` against `req.user.id` — any logged-in user deletes any level | `server.js` /levels/:id |
| **R**epudiation | No audit-log table; no write path records who did what when | `db.js` schema |
| **I**nformation disclosure | `GET /levels` returns `uploader_email` for every level regardless of `is_public` flag | `server.js` /levels |
| **I**nformation disclosure | `GET /scores/top` leaks every user's email in the leaderboard | `server.js` /scores/top |
| **I**nformation disclosure | CORS set to `*` — any origin reads the API | `server.js` CORS middleware |
| **D**enial of service | No rate limit anywhere — `/auth/login` and `/scores` both trivially flood-able | all routes |
| **D**enial of service | `express.json({ limit: '1mb' })` on `/levels` upload, but level data goes in as-is | `server.js` |
| **E**levation of privilege | `role` column exists on `users`, `role` is signed into the JWT, but no route actually checks `req.user.role === 'admin'` — role is dead, admin endpoints don't exist, promotion path is SQL `UPDATE users SET role='admin'` | `db.js` + `server.js` |
| **E**levation | JWT secret is hardcoded (`'lemming-secret'`) and committed — anyone forges a valid admin token | `server.js` `JWT_SECRET` |
| **E**levation | bcrypt cost factor 8 (below modern 10–12) — offline cracking is cheap | `server.js` register |

Non-STRIDE planted issues (surface for test-strategy authoring in M3 Ex3):
- No tests in `backend/`.
- Frontend `src/api.js` is unused — imported nowhere in `main.js`. The "feature we're shipping this week" is the wiring itself.
- No input validation library (no Zod, no Joi, no ajv) — every route trusts `req.body`.
- SQLite file path is relative — running from a different cwd creates a separate DB silently.

## M1 planted state (frontend-only)

M1's runner (`runners/m1-chain.md`) inverts `isSolid` in `src/terrain.js` (`=== 1` → `=== 0`) as its Arrange step. The backend is ignored for M1 — the student is fixing a trivial frontend bug and doesn't touch the server.

## Provenance

Copied 2026-04-24 from `~/Projects/lemmings/` (Antti's prototype; not in git there). Backend added the same day as the M3 security surface.
