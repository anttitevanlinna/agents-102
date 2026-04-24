# Close-out note — isSolid inversion

**Ticket:** isSolid reports solid pixels as empty and empty pixels as solid; lemmings appear to ignore terrain.

**Root cause:** `src/terrain.js` `isSolid(x, y)` returned `solid[y * W + x] === 0`. The storage convention is `1 = solid` (see `fillRect` which sets `solid[...] = 1`), so the comparison was inverted. Every caller got the opposite answer — platforms read as empty, empty sky read as solid. That's why lemmings fell through platforms and stalled in open air.

**Fix:** One character. `=== 0` → `=== 1`. Commit `9b7c9c4`.

**Tests added:** `src/terrain.test.js` — three `node --test` cases: (1) solid inside a filled platform, (2) empty in open sky, (3) false outside world bounds. Stubbed `document.createElement('canvas')` so `terrain.js` imports under node. Tests went red first (confirmed the inversion), then green after the fix.

**PR:** no remote configured on this scratch; commit is on `main` locally. In a real repo this would link to the PR.

**Follow-ups:** the frontend had no test infrastructure before this — worth a short team PR to land a shared canvas stub if more frontend tests follow.
