## Phase 2

> Work in plan mode on the task I'm about to describe in my next message. Explore the files you need to understand the scope. Write the plan to a plan file. I'm going to push back on it before approving, and then run a second-pass read that walks down unresolved branches, so give me enough detail in each step that I can actually read it. Files touched, shape of the change, what you'd check before declaring it done. Don't optimize for short.

> I want to wire the leaderboard into the game. When the player wins (state.done with saved >= goal), submit their score to POST /scores and show the top 10 from GET /scores/top on a simple end-screen. The backend already exists in backend/ but the frontend doesn't call it yet. I need a plan before I run anything.

Reading first. Ack on the plan-mode contract: no edits, no running code, plan as text.

Files read:
- `CLAUDE.local.md` — orient-before-fixing, tests-first even on small changes, diff review with pushback, note that `src/api.js` is imported-but-unwired and backend is WIP.
- `index.html` — single canvas, `#hud`, `#skills`, `#status` paragraph, one module entrypoint `src/main.js`.
- `src/main.js` — game loop, `state` object, the win/lose message already writes to `#status` inside `step()` at the `state.done` transition. This is the hook point.
- `src/api.js` — `BACKEND_URL = 'http://localhost:3000'`, `token` in `localStorage`, `submitScore(userId, levelId, score)`, `topScores()`, plus `register`/`login`/`uploadLevel`/`listLevels`. Not imported by `main.js`.
- `src/ui.js` — owns `#hud` and `#skills`. Does NOT own `#status`. No end-screen scaffolding exists.
- `src/lemming.js` — confirms `state.saved` semantics (count of lemmings in `'saved'` state, tallied each tick).
- `backend/server.js` — `POST /scores` requires `Bearer` auth, body `{ user_id, level_id, score }`. `GET /scores/top` is public, returns up to 20 rows `{ score, created_at, email }` ordered DESC. Note: server returns 20, the ask is top 10 — slice on the client.
- `backend/db.js` — `scores` table has `user_id`, `level_id` (nullable), `score`, `created_at`. Only one `level_id` currently — the built-in level has no id, so sending `null` is correct.

Two things I want to name before the plan, because they'll shape steps:

1. **Auth is load-bearing and there's no login UI.** `POST /scores` requires a Bearer token. `api.js` stores the token in `localStorage` after `register`/`login`, but nothing in the game calls either. "Wire the leaderboard" as stated assumes a logged-in user. Either (a) we add a minimal email/password prompt on the end-screen before submit, (b) we auto-register an anonymous user on first win, or (c) the player plays the game logged out and we only show the top 10 (no submit). I'll propose (a) as the default and flag (b) and (c) as branches for the walk-down.

2. **`user_id` is sent from the client.** The server trusts `req.body.user_id` rather than reading it from the JWT — that's a real bug in `backend/server.js`, not my problem today, but worth flagging. For this plan I'll pass the `user.id` that `login`/`register` returned.

---

### Plan: wire leaderboard into Tiny Lemmings

**Goal.** On win (`state.done && state.saved >= state.goal`), submit the score to `POST /scores` and render the top 10 from `GET /scores/top` in a simple end-screen overlay. Lose state unchanged.

**Files touched**
- `src/main.js` — add a single end-of-game hook at the `state.done` transition. Call into a new module (step 3). Keep the existing `#status` text.
- `src/endscreen.js` — **new file.** Owns the end-screen DOM node, the submit call, the leaderboard fetch, and the render. Pure function surface: `showEndScreen(state)`. Hides details of auth from `main.js`.
- `src/api.js` — minor: add a tiny `getCurrentUser()` helper that returns `{ id, email }` from `localStorage` (we'll store the user object alongside the token on login/register). No behavioural change to existing exports.
- `index.html` — add a single empty `<div id="endscreen" hidden></div>` after `#status`. The styling is CSS-only; the screen is toggled from JS via the `hidden` attribute.
- `style.css` — add an `#endscreen` block: overlay inside the game container, leaderboard table, input row, submit button, play-again link. Keep it minimal; this isn't a design exercise.
- `src/endscreen.test.js` — **new.** Node `--test` harness following the pattern `CLAUDE.local.md` already established for `terrain.test.js`. Test targets: (a) leaderboard renders correct rows given a mock `topScores` response, (b) top-10 slicing actually slices (server can return 20), (c) submit is gated on win condition, not called on lose.

**Shape of the change, step by step**

1. **Extend `api.js` with `getCurrentUser` and persist the user.** `register` and `login` already return `{ token, user }`. Today we only persist the token. Add two lines on the success path to persist `JSON.stringify(j.user)` under `lemmings_user`. Export `getCurrentUser()` returning the parsed object or `null`. This keeps `main.js` and `endscreen.js` ignorant of storage.

2. **Add `src/endscreen.js`.** One export: `async function showEndScreen(state)`. Flow:
   - Read `getCurrentUser()`. If `null`, render the overlay in "login first" mode: email + password inputs, a Submit button that calls `login` then `register` as fallback (mirroring what `api.js` already supports), then re-enters the win path. Do not auto-register silently — the user should see the email they're leaderboard-ing under.
   - If a user exists, call `submitScore(user.id, null, state.saved)`. Use `state.saved` as the score (the ask: "submit their score on win"; `saved` is the natural integer). Not `state.saved / state.total`; the backend column is INTEGER.
   - Await `topScores()`, `.slice(0, 10)`, render as a `<table>` with rank, email, score, date. Current user's row bolded if email matches.
   - Show the overlay by removing `hidden` on `#endscreen`.
   - Include a "Play again" link that reloads the page. The existing code already tells the loser to refresh — consistent.
   - Network errors: catch, render "Couldn't reach leaderboard — your score wasn't submitted." Don't crash the game. Existing `#status` message still stands.

3. **Wire `main.js` to call `showEndScreen` on win.** Inside the `if (!state.done && ...)` block, after setting `state.done = true` and writing `#status`, branch on `state.saved >= state.goal`. On win, `import('./endscreen.js').then(m => m.showEndScreen(state))` — dynamic import keeps the leaderboard code out of the hot game loop's initial parse. On lose, nothing changes. Do not await inside `step()`; fire-and-forget is correct here (the game loop is 30fps, we don't want to stall it).

4. **`index.html`: add `<div id="endscreen" hidden></div>`.** After the `<p id="status">`. No other markup — the overlay's inner HTML is owned by `endscreen.js`.

5. **`style.css`: overlay styling.** Position relative to `#game`, semi-opaque backdrop, centered card, table with `text-align: left` for the email column, right for score. Tab-order: email input → password → submit. Keep it plain; no animations.

6. **Tests (`src/endscreen.test.js`).** Using the same `document`-stub pattern `CLAUDE.local.md` flags as a team-worthy candidate:
   - **Test 1 — top-10 slicing.** Stub `topScores` to return 20 rows. Call the rendering function (refactor `endscreen.js` so the render step is its own exported function that takes an array). Assert the rendered table has exactly 10 `<tr>` rows (plus header).
   - **Test 2 — submit is gated on win.** Call `showEndScreen` with `state.saved = 3, state.goal = 8`. Assert `submitScore` stub was NOT called. (Or: `showEndScreen` is only called on win by construction — in that case, test the main-loop branch by pulling the `state.done` decision into a small pure function `shouldSubmit(state)` and unit-testing it. This is cleaner — I'd rather prove the decision than mock the game loop.)
   - **Test 3 — empty leaderboard.** `topScores` returns `[]`. Table renders header plus a "Be the first" row. No crash.

7. **Manual check steps** (the `CLAUDE.local.md` "verify against instrument" move):
   - Start the backend (`cd backend && npm install && node server.js`). Confirm :3000 responds.
   - In another terminal, serve the frontend (Python `http.server` or similar from the repo root). Load `index.html`.
   - Play once with the dev console open. Watch network tab: no `/scores` request until win. Force a win (or lower `state.goal` to 1 temporarily — revert before commit). Confirm POST 200, GET 200, overlay renders.
   - Play once and lose. Confirm no POST, no overlay — existing lose message still shows in `#status`.
   - Log out (`localStorage.clear()`). Win again. Confirm the overlay demands login, register flow works, then score submits.
   - Refresh the page. Overlay gone, `localStorage` still has token + user, next win submits silently.

**What I'd check before declaring it done**

- Tests green (`node --test src/*.test.js`).
- The backend's `user_id` trust-the-client bug is noted but unchanged — out of scope; flag a separate ticket. (In `CLAUDE.local.md` under "Quality gates flagged for later.")
- `api.js` is no longer the "imported exist but unused" file `CLAUDE.local.md` flags. Update that note — it's now wired for scores + auth; level-sharing remains unwired.
- No hardcoded backend URL drift. `BACKEND_URL` still lives only in `api.js`.
- CORS: the backend sets `Access-Control-Allow-Origin: *`, so serving the frontend from any localhost port works. Confirmed by reading `server.js`.
- The score submitted is `state.saved`, not `state.saved / state.total` or a timed score. If the product wants time-to-win as the real score, that's a separate decision I want to surface in the push-back round — the backend column is INTEGER so we could encode time-seconds, but the ask says "their score" which is ambiguous.
- One-line diff review per `CLAUDE.local.md`: push back on at least one line. Candidate: whether dynamic-import of `endscreen.js` is worth the complexity vs. a plain import at the top of `main.js`. Leaning toward plain import — the "keep it out of the hot loop" reason is weak because the import happens once at parse time either way.

**Branches I've left unresolved for the walk-down**

- **Auth UX.** Login form on end-screen vs. silent anonymous auto-register vs. no-submit-show-only-top-10. Default in this plan: login form. (Push-back candidate.)
- **What counts as "score".** `state.saved` (integer 0–12) vs. `saved * 100 + (timeBudget - tick)` vs. time-to-finish. Default: `state.saved`. The backend column is INTEGER.
- **Level id.** Single built-in level has no id; `level_id` is nullable. Sending `null`. If level sharing (from `api.js`'s `uploadLevel`) is meant to ride in on this PR, the plan grows — but the ask is "wire the leaderboard," not levels.
- **End-screen vs. toast vs. in-HUD.** The ask says "a simple end-screen." Going with a modal overlay. If "end-screen" means "replace the canvas with a results view," that's a bigger change.
- **Top 10 vs. top 20.** Server returns 20. Ask is 10. Slicing on the client. Could instead change the server query, but the plan avoids backend edits.
- **Test harness growth.** If `endscreen.test.js` is the second frontend test, `CLAUDE.local.md` says extract the `document` stub to `test/helpers/canvas-stub.js` (or a DOM-stub equivalent — canvas isn't needed here, just `getElementById` / `createElement`). I'll extract on this PR since it's the forcing-function moment.
- **Dynamic import in main.js.** Noted above — leaning toward cutting it.

Ready for push-back.
