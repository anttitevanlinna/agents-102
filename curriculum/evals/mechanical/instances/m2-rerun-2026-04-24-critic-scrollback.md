## Phase 3a

### Push-back 1 — soft step

You quote, in Step 4:

> "2. Decode the token to get `user.id` — the JWT payload has `{ id, email, role }`. Use a small `decodeJwt` helper (three-line base64url decode of the middle segment) rather than pulling in a library."

This reads fine and skips the failure case the helper creates. A three-line base64url decode against an arbitrary string in `localStorage` is a trust boundary, not a utility. If the token is malformed, truncated, from an older schema (no `id`), or from a different backend someone pointed the page at, the decode either throws or returns an object without `.id`, and `submitScore(undefined, null, state.saved)` fires a POST that fails the backend's schema validation — and the swallow-and-continue logic in sub-step 3 hides it. The end-screen renders, the score is gone, no one knows.

Step 4 should include: the helper returns `null` on any parse failure or missing `id`; a `null` user treats this run the same as `hasToken() === false` (call `ensureIdentity`, re-decode, or fall through to public `top` only); and the three unit tests cover malformed base64, a two-segment string, and a payload with no `id`. Also drop the stale `lemmings_token` from storage on parse failure so the next win re-prompts instead of silently looping.

### Push-back 2 — committed change

You quote, in the decision block:

> "Default in this plan: add a minimal sign-in-or-register prompt shown on first win only, token persisted in `localStorage` (the `api.js` helpers already do this). Alternative you may prefer: a guest-name flow that does not require the current auth backend (would need a backend change — out of scope of 'frontend doesn't call it yet')."

You're treating "backend already exists" as a hard fence, and then Step 5 admits the cost directly — "adding an auth UI is more surface than the task literally asked for." That's the whole game. The task is leaderboard-on-win. The plan answers it with an email+password account, a `<dialog>`, register/login/error paths, four JSDOM tests, a password field in a game nobody has a password for, and a credentials UI shipped in a Tiny Lemmings page. The guest flow was ruled out because it "would need a backend change" — but `backend/server.js` is in this repo, the change is `display_name` on `POST /scores` with no `auth` middleware, and it collapses Step 5 entirely (no dialog, no register, no login, no `decodeJwt`, no `loadToken` read path for a JWT).

I'd take the guest-name flow. One backend edit versus a whole identity surface the task didn't ask for. The "frontend doesn't call it yet" line describes where `api.js` is today, not a scope constraint on what we ship — and the local rule about pairing persistence with a decode path applies far more cleanly to a `lemmings_display_name` string than to a JWT we have to parse to use. If auth lands later (level uploading probably wants it), it lands as its own feature, with its own UI budget. Ship the leaderboard without building an account system under it.
