# Close-out draft — isSolid inversion bug (path 3, no live MCP connector)

## Ticket lookup
No live ticketing connector installed — following path 3: writing the close-out to this file instead of posting.

Searched scrollback/repo for a matching ticket by keyword ("isSolid", "terrain", "lemmings ignore terrain"): no ticket file in the repo, no connector to query. Treating the bug report pasted into chat as the ticket itself.

## Proposed close-out (what I would post)

**Status:** Fixed on branch `fix/is-solid-inverted`, commit `8206897`.

**Root cause:** `src/terrain.js` — `isSolid(x, y)` returned `solid[y * W + x] === 0`, i.e. inverted. Solid pixels reported empty and empty pixels reported solid, so lemmings walked through platforms and bounced off thin air.

**Fix:** one-character change — comparison flipped to `=== 1`. Added `tests/terrain.test.mjs` covering (a) solid pixel inside the upper platform, (b) empty pixel in the death pit, (c) out-of-bounds → false. Test goes red on the pre-fix code and green after.

**PR:** local commit only — no `gh` in this environment, so no PR URL. In a real setup this line would link to the opened PR.

## Waiting on
User review of the diff + merge.
