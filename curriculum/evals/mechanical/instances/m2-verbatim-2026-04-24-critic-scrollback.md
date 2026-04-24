## Phase 3a

### Push-back 1 — soft step

You wrote, in step 2:

> If `null`, render the overlay in "login first" mode: email + password inputs, a Submit button that calls `login` then `register` as fallback (mirroring what `api.js` already supports), then re-enters the win path.

"Re-enters the win path" is doing an enormous amount of work in four words. The step skips the actual state handoff: at the moment the user finishes logging in, `state.done` is already `true`, `step()` has already written `#status`, and the game loop is still ticking at 30fps in the background. What does "re-enter" mean concretely? Do you:

- Call `submitScore(user.id, null, state.saved)` directly from the login handler, using the `state` closed over at `showEndScreen(state)` entry?
- Re-dispatch through `showEndScreen(state)` recursively?
- Freeze the game loop while the overlay is up (nothing in the plan pauses the loop — `state.done` gates the win logic but the loop keeps running and lemming ticks still tally)?

It also skips the failure mode the login path obviously has: `login` fails, fallback `register` fails too (email taken, password too short, backend down). What does the overlay render then? The step needs, minimum: (a) the explicit post-auth call site, using the captured `state.saved` snapshot, not a re-read; (b) the error-render branch for auth failure, parallel to the "couldn't reach leaderboard" branch you already have for the top-10 fetch; (c) a sentence on whether the game loop keeps running behind the overlay or whether setting `state.done` is enough to idle it (reading `main.js`: `step()` early-returns on `state.done`, so the loop is fine — but say so, because the next reader won't know).

### Push-back 2 — committed change

You committed to this in step 1:

> `register` and `login` already return `{ token, user }`. Today we only persist the token. Add two lines on the success path to persist `JSON.stringify(j.user)` under `lemmings_user`.

This is a load-bearing change to `api.js` sold as "minor." `api.js` is the shared client for scores, auth, AND level upload/list — the plan itself notes level-sharing is still unwired. You're mutating the auth persistence contract for every future caller of `login`/`register`, not just the leaderboard path. A future level-upload flow that expects `localStorage.lemmings_user` to be fresh will get a stale object if the token is rotated and the user re-logs elsewhere; conversely, any code path that clears the token but not `lemmings_user` (and vice versa) now has a split-brain auth state. Two keys, two truths.

The alternative: don't persist the user object at all. `api.js` gets a `getCurrentUser()` that decodes the JWT payload (it's a JWT — the `sub`/`email` claims are right there, no network call, no second storage key) OR calls a cheap `/me` endpoint if you'd rather not trust the client-side decode. One source of truth (the token), and `getCurrentUser()` is a pure function over it.

I'd take the JWT-decode version. Your current `api.js` already has `atob` available in browsers; a five-line `parseJwt` helper is less surface than a second localStorage key you now have to keep in sync on every login, logout, and register path across the app. The "two lines on the success path" framing undersells it — it's a new invariant across three entry points and every future caller.

## Phase 3b

**PB2 (JWT-decode): sharpened.** Step 1 now adds only `getCurrentUser()`, no `lemmings_user` key, no writes to the register/login success path. Single source of truth, expiry-aware via `exp`. Downstream impact explicitly traced (manual check, test harness, CLAUDE.local.md note). No softening.

**PB1 (re-enters the win path): sharpened.** Step 2 now exposes three functions (`showEndScreen`, `submitAndRenderLeaderboard`, `renderLoginForm`), names the explicit handoff (`onSuccess = () => submitAndRenderLeaderboard(getCurrentUser())`), and ships an auth-failure render matrix covering seven states (authed/unauthed × submit-200/4xx/throw, wrong-password, login-throw, login→register success). Test 4 pins the handoff contract.

**Actor counter on PB1 — fair.** Actor pushed back on my claim that "the game loop keeps running at 30fps" by reading `main.js` and correcting: the loop keeps firing but `step()` early-returns on `state.done`, so the one-shot work runs once. Overlay sits on a still-ticking-but-idle loop. That's a correct read of the code; my phrasing ("lemming ticks still tally") was wrong. Counter accepted. Actor also offered `clearInterval` as an optional separate step rather than silently dropping the concern — clean.

One new branch surfaced for walk-down: freeze-the-loop-on-win. Noted.

## Phase 4 — A1

Confirmed. Don't freeze. Your three reasons hold, and the codebase read backs them: the loop ticks but `step()` early-returns on `state.done`, so there's no wasted work and no visible motion behind the overlay. Capturing a handle to `clearInterval` on win-only also introduces a win/lose asymmetry the leaderboard feature doesn't need to justify. Keep the PR scoped to the ask; if CPU or distraction complaints surface post-ship, add the handle then.

Sharpened on both. No re-softening.

## Phase 4 — A2

Confirmed. Stay with (a). The `email` column on `/scores/top` is the tell — a leaderboard of `lemmings-7f3a@anon.local` rows is anti-social and kills the reason the feature ships. (b) also quietly lies about persistence: clear cookies, account gone, no recovery, and the player never knew they had one. (c) drops the core ask. The ~30 lines are already specced in Step 2's matrix, including wrong-password and network-throw renders. One correction: copy on the form should say "Log in or sign up to record your score" — the register-fallback is silent in the current draft, and first-time players deserve to know a new account is being created for them.

## Phase 4-close

ok, enough, let's continue. Greenlighting: `getCurrentUser()` via JWT-decode (single key, expiry-aware), `showEndScreen`/`submitAndRenderLeaderboard`/`renderLoginForm` split with the named `onSuccess` handoff and seven-state auth-failure matrix, `state.saved` as the integer score with `level_id: null`, client-side slice to 10, loop keeps ticking, plain import in `main.js`, login-or-sign-up copy on the form, and `endscreen.test.js` pinning top-10 slicing + `shouldSubmit(state)` + empty-leaderboard + auth-handoff. Score-definition branch (saved vs. time-weighted) stays deferred — noted, not blocking.
