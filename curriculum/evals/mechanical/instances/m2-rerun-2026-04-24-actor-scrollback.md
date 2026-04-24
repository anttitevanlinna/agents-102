# m2-rerun actor scrollback — 2026-04-24

## Phase 2 (plan v1)

**Student message 1 (verbatim):**

> Work in plan mode on the task I'm about to describe in my next message. Explore the files you need to understand the scope. Write the plan to a plan file. I'm going to push back on it before approving, and then run a second-pass read that walks down unresolved branches, so give me enough detail in each step that I can actually read it. Files touched, shape of the change, tests you'd write or update before any code lands, what you'd check before declaring it done. Don't optimize for short.

**Student message 2 (verbatim):**

> I want to wire the leaderboard into the game. When the player wins (state.done with saved >= goal), submit their score to POST /scores and show the top 10 from GET /scores/top on a simple end-screen. The backend already exists in backend/ but the frontend doesn't call it yet. I need a plan before I run anything.

**Actor reply:**

Read `CLAUDE.local.md` (rules: pair silent persistence with a decode path; do not fold push-backs as addenda). Read `index.html`, `src/main.js`, `src/api.js`, `src/ui.js`, `src/lemming.js`, `backend/server.js`, `backend/db.js`.

Key observations before drafting:
- `src/api.js` already defines `submitScore` and `topScores`, never imported anywhere.
- `POST /scores` is behind `auth` middleware — submitting a score requires a JWT, and the body wants `user_id`. The task didn't mention login, so auth is an unresolved branch I will flag, not silently resolve.
- `localStorage` token is written by register/login but only read once at module init — local rule says pair persistence with a decode path, so the plan includes splitting that into explicit `loadToken()` / `hasToken()`.
- Score value is ambiguous (`saved` vs speed-weighted); flagging.

Plan written to `/tmp/m2-rerun-plan-v1.md` with six steps (extract end-of-game block → end-screen overlay → api.js token read path → `submitAndShowLeaderboard` wiring → identity prompt → manual smoke). Each step names files, shape, tests-before-code, done-check. Three unresolved branches raised as questions at the top and bottom so plan v2 can integrate answers into the step list rather than append them.

done — plan at /tmp/m2-rerun-plan-v1.md
