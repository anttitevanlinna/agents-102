# Bug ticket close-out (draft) — isSolid inverted predicate

> No live tracker connector available in this session (no MCP / no `gh`). Falling back to path 3 per runner spec: writing the close-out as a file the user can paste into the tracker by hand.

## Ticket (as known to me)

> isSolid reports solid pixels as empty and empty pixels as solid; lemmings appear to ignore terrain.

(No tracker found in this scratch repo. If the ticket doesn't already exist, create it with the title *"isSolid inverted predicate causes lemmings to ignore terrain"* and paste the close-out below as the resolution comment.)

## Close-out

**Root cause.** `src/terrain.js` line 43 returned `solid[y * W + x] === 0` instead of `=== 1`. The `solid` Uint8Array stores `1` for filled pixels and `0` for empty, so the predicate was inverted — filled pixels reported as not-solid and vice versa. Every consumer (`groundAt`, `wallAhead`, the body-clear check in walk) saw the opposite answer for the whole frame, which is why lemmings appeared to ignore terrain.

**Fix.** Single-character correction: `=== 0` → `=== 1`. Shipped on `main` as commit `24242af`.

**Verification.** Added `src/__tests__/terrain.test.mjs` (node:test, no framework dep). Three cases: filled-rect pixel returns true, empty-space pixel returns false, out-of-bounds returns false. The tests reproduced the symptom on the buggy code (assertion errors matched the ticket wording), then went green after the fix.

**PR.** No remote / no `gh` in this session; the fix was committed directly to `main` as `24242af`. When pushed, the PR URL belongs here.

## What I wrote (3-line summary)

Drafted a close-out naming the inverted-predicate root cause at `src/terrain.js:43`, the one-character fix, and the new node:test coverage in `src/__tests__/terrain.test.mjs`. Cited commit `24242af`. Flagged the missing PR link as a path-3 gap — paste the URL once the branch reaches a remote.
