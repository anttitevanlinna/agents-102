# ae101-m1-seed playground

Tiny Node library — the stand-in "student's chosen repo" for the AE101 prework + M1 mechanical runners. Lives parallel to `lemmings-seed/` (which serves Agents 101).

**For the maintainer — not student-facing.** Each runner's stage step copies this seed to `scratch/ae101-m1/`, `git init`s it, plants the bug, and commits with a neutral message.

## Shape

```
ae101-m1-seed/
├── package.json           "test": "node --test tests/"
├── README.md              repo description — orient-and-introspect target
├── .gitignore             node_modules + .DS_Store only — Ex3 adds CLAUDE.local.md
├── src/
│   ├── index.js           public surface (re-exports)
│   ├── totals.js          sum, mean, dailyTotals — THE BUG lives here
│   └── adjustments.js     parseAdjustment — auxiliary, gives the repo size
├── tests/
│   ├── totals.test.js     5 passing tests; no negative-input coverage
│   └── adjustments.test.js 2 passing tests
└── docs/tickets/
    └── AE-42.md           pre-existing ticket — compound-and-close's path-3 close-out target
```

Node 20+ built-in `node --test`. No deps, no `npm install` needed — the Actor `git init`s the seed and `npm test` runs immediately.

## Planted bug (for M1 Ex2 fix-tests-first)

`src/totals.js`'s `sum()` skips negatives:

```js
for (const n of arr) {
  if (n < 0) continue;   // ← the bug
  total += n;
}
```

Existing tests only cover `sum([1, 2, 3])`, `sum([])`. No negative-input test. The bug fails silently until a test names it. AE-42 in `docs/tickets/` describes the user-visible symptom (daily totals overstated when refunds are present).

**The fix the Actor should arrive at:** remove the `if (n < 0) continue;` line. Add a test like `sum([1, -2, 3]) === 2` that catches the bug.

**Phase 2 ("root cause or surface?") angle:** the deeper read is that `sum`'s contract didn't say what to do with negatives, and the function silently dropped them — a "null filter" comment in the bug's repro reveals the original author's intent (filter nulls, not negatives). The "deeper" edit is to validate inputs or to make the contract explicit. The Actor can stub Phase 3 with any plausible TDD second-pass — Judge does not grade quality.

## Why this shape, not `lemmings-seed`

`lemmings-seed` was built for Agents 101 — it carries the M3 STRIDE surface and is structured around a vanilla-JS game prototype with no test infrastructure. AE101 M1 needs a repo where `npm test` works and a failing test fits naturally. Easier to build a small fresh seed than to retrofit. The two seeds stay isolated.

## Provenance

Created 2026-05-14 specifically for the AE101 mechanical battery (prework + M1). Owner: this directory.
