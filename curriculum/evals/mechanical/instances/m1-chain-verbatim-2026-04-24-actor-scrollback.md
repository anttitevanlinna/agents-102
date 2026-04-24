# Actor scrollback — M1 chain verbatim — 2026-04-24

## Ex1 — Prompt 1 (verbatim from prompt-001.txt)

> Read enough of this repo to tell me what's here: the shape, the structure, what looks load-bearing, what's been touched recently, what looks stale. Don't try to be complete. Read what you judge worth reading; skip what you judge isn't.

### Response

Ran `ls -la` + `git log --oneline`. Two commits (`initial commit`, `wip`), tree has `src/`, `backend/`, `index.html`, `style.css`, `.claude/settings.local.json` (empty `{}`).

Read (load-bearing, recently touched):
- `src/terrain.js` — pixel grid, `isSolid`, `buildLevel`, `clearPixel/Rect`. Core game physics surface.
- `src/lemming.js` — state machine (walk/fall/block/bash/dig); uses `isSolid` heavily.
- `src/main.js` — spawn loop, tick, win/lose condition.
- `src/skills.js` — blocker/basher/digger budgets.
- `src/ui.js` — canvas click routing, HUD.
- `src/api.js` — WIP backend wrapper (leaderboard + level sharing), not wired into `main.js`.
- `backend/server.js` + `backend/db.js` + `backend/package.json` — Express + better-sqlite3 + jsonwebtoken; in-progress.
- `index.html`, `style.css` — thin shell.

Skipped: `backend/node_modules/` (noise), `package-lock.json` (derived). No READMEs, no CI config, no tests — stale-feeling corners are the un-wired `api.js` and the backend (depends on no caller yet).

Shape: vanilla-JS browser game, ES modules, plus a half-built Node/SQLite backend for scores + shared levels. Load-bearing: `terrain.js` (every lemming tick reads it) and `lemming.js` (the state machine).

---

## Ex1 — Prompt 2 (verbatim from prompt-002.txt)

> What did you read, and why those files? What didn't you read, and why not? Name the specific files or directories you skipped and the call you made on each.

### Response

**Read:**
- `src/terrain.js` — every other game file imports from it; pixel-level collision lives here.
- `src/lemming.js` — the update loop; the physics behaviour a user would see.
- `src/main.js` — the spawn/tick entry; fastest way to see what calls what.
- `src/skills.js`, `src/ui.js` — small, gives the click-to-apply flow in two screens.
- `src/api.js` — WIP comment at the top said "not wired yet"; read to confirm it's dormant.
- `backend/server.js`, `backend/db.js`, `backend/package.json` — auth + scores + levels; read to know what's there but it's isolated from the game loop.
- `index.html`, `style.css` — cheap, tells me the canvas contract.

**Skipped:**
- `backend/node_modules/` — build artefact, dependency surface, thousands of files. Judgement: read the deps list in `package.json` if I need transitive info.
- `backend/package-lock.json` — derived from `package.json` + registry. Not worth reading unless debugging an install.
- `.git/` — tooling state, not code.
- The `wip` commit's full diff — the file contents already reflect it; `git show` would be redundant for orientation.

**What looks stale / WIP:** `api.js` (explicit WIP comment, no import in `main.js`) and the backend (no caller yet). **Load-bearing:** `terrain.js` + `lemming.js`.

---

## Ex1 — /context (substituted)

No `/context` available in this harness. Substitution: list of files I Read vs. present-in-tree.

- **Read:** `src/terrain.js`, `src/lemming.js`, `src/main.js`, `src/skills.js`, `src/ui.js`, `src/api.js`, `backend/server.js`, `backend/db.js`, `backend/package.json`, `index.html`, `style.css`, `.claude/settings.local.json`.
- **Present but not Read:** `backend/node_modules/**`, `backend/package-lock.json`, `.git/**`.

Note: substitution for `/context` — the real command reports token budget and pinned directories; here I enumerate the reads.

---

## Ex2 — student-typed bug restatement (pasted verbatim into chat)

> isSolid reports solid pixels as empty and empty pixels as solid; lemmings appear to ignore terrain.

---

## Ex2 — Prompt 3 (verbatim from fix-tests-first/prompt-001.txt)

> Find the root cause of this bug by writing the tests that would reveal it. Run the tests and confirm they fail the way you'd expect. Then fix the root cause, not the symptom. Run the tests again. Show me the diff before you commit.

### Response

1. **Wrote** `tests/terrain.test.mjs` — node-only, DOM-shimmed, three assertions: solid pixel inside the upper platform, empty pixel in the death pit, out-of-bounds returns false.
2. **Ran** `node tests/terrain.test.mjs` → failed on assertion 1 (`expected true, got false`). Matches the ticket: solid pixel reporting empty. Root cause confirmed in `src/terrain.js` `isSolid`: `return solid[y*W+x] === 0` — inverted comparison.
3. **Fixed** `src/terrain.js`: changed `=== 0` to `=== 1` (root cause, not a symptom — no special-case patching of callers).
4. **Re-ran** → one test assertion picked wrong coordinates (y=198 still in platform since it extends to x=280). Adjusted test coordinates to (230, 360) — clearly in the death pit between the two lower pads. Green.
5. **Diff:**

```diff
diff --git a/src/terrain.js b/src/terrain.js
@@ -40,7 +40,7 @@ export function isSolid(x, y) {
   x |= 0; y |= 0;
   if (x < 0 || x >= W || y < 0 || y >= H) return false;
-  return solid[y * W + x] === 0;
+  return solid[y * W + x] === 1;
 }
```

Plus the new `tests/terrain.test.mjs` file.

---

## Ex2 — commit + PR (substituted for gh)

- **Branch:** `fix/is-solid-inverted` (created off `main`).
- **Commit:** `8206897 fix(terrain): isSolid returned inverted value`.
- **PR:** `gh` not installed in this harness — substitution: local branch + commit stand in for the PR. Report notes this.

---

## Ex3 — Prompt 4 (verbatim from compound-and-close/prompt-001.txt)

> Review this session end-to-end: the orientation and introspection, the /context read, the TDD bug fix, the diff push-back. Write ./CLAUDE.local.md at the root of this repo (create it if it doesn't exist; add it to .gitignore if it's not already; if the file already exists, integrate, don't append). This is my personal gitignored rules file, not the team ./CLAUDE.md. Add rules that came from how we actually worked, not rules that sound good. Name the shape of the loop we ran and cite the practitioner who wrote it up if one fits.
>
> Also, separately from ./CLAUDE.local.md: pin the AE101 content folder into `.claude/settings.local.json` under `additionalDirectories` so future sessions auto-load it. Read the current file if it exists, add (don't replace) the absolute path of the content folder I added via /add-dir in prework. Create the file with a single-key object if it doesn't exist. Ensure `.claude/settings.local.json` is gitignored — if this repo's local `.gitignore` doesn't cover it, add it. Machine-global excludesFile coverage isn't guaranteed across laptops. After this, I never need to run /add-dir for this training again.
>
> Keep ./CLAUDE.local.md for session-derived rules only; config lives in settings.local.json.
>
> If any rule is team-worthy (one every engineer on this codebase should know) flag it in the summary below, don't PR it. I'll decide whether to open a separate PR against team ./CLAUDE.md.
>
> Tell me in 3–5 lines: what you wrote and why, grounded in specific session moments. I shouldn't need to open the file to know.

### Response

- Wrote `./CLAUDE.local.md`: orient-before-touch (from Ex1 where I read 11 files, skipped `node_modules/`), TDD-for-bugs red→green (Kent Beck cited — the `isSolid` fix followed exactly that shape), show-diff-before-commit (Ex2's diff block), match-user-concision.
- Created `./.gitignore` covering `CLAUDE.local.md` and `.claude/settings.local.json` (repo had none before).
- **Substitution / sandbox note:** attempted to edit `.claude/settings.local.json` to add `additionalDirectories: ["/Users/anttitevanlinna/Projects/agents-102/content"]`. Sandbox denied the write ("additional directory access self-modification"). The intended config is documented in the close-out draft; a real session with user permission would land this edit. File remains `{}`.
- **Team-worthy flag** (surfaced in the summary block of `CLAUDE.local.md`, not PR'd): "red test before fix" on bug tickets and a small pixel-level predicate test harness — worth discussing with the team.

Shape of the loop: orient → introspect → reproduce-with-test → fix root cause → re-run → show diff → commit. Kent Beck's red-green-refactor.

---

## Ex3 — Prompt 5 (verbatim from compound-and-close/prompt-002.txt)

> Read the ticket for the bug we just fixed. Tell me what it says: the reporter, the description, any comments on it. If you can't find a matching ticket, search by the bug's keywords; if there still isn't one, say so and we'll create one.

### Response

No live ticket connector in this environment — following path 3 (manual file write). Searched repo for a ticket file by keyword ("isSolid", "terrain", "lemmings ignore terrain") — none present. The pasted bug-report sentence in scrollback is the only artefact of the report. Writing the close-out to a file instead of posting.

---

## Ex3 — Prompt 6 (verbatim from compound-and-close/prompt-003.txt)

> Update the ticket: short close-out note naming what the root cause was and how we fixed it, link to the PR you opened earlier. If we needed to create the ticket just now, create it first, then update. Show me what you'll write before you post it.

### Response

Path-3 substitution: wrote the proposed close-out to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-chain-verbatim-2026-04-24-close-out-draft.md`. Names root cause (inverted `=== 0` in `isSolid`), the one-character fix, the new test, commit `8206897` on `fix/is-solid-inverted`. PR URL omitted — no `gh`.
