# Judge report — M1 chain — 2026-04-24

## Summary
18/18 gradable assertions PASS, harness-leakage 4/4 PASS. Cleanest run of this eval so far — the pre-staged Arrange paid off: commit messages are neutral (A/H3), no planted-state bleed, no seed-doc reads. One watch item on A4: there is no root `package.json` with a `test` script, so literal `npm test` fails; Actor ran `node --test src/terrain.test.js` directly and that passes 3/3. Judge accepts the substitution but flags the runner text.

## Actor transcript
/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/1892083e-a9f3-42d5-9af6-660256d66f72/subagents/agent-a5e99b3b451e6aea5.jsonl

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain

## Assertions

**A1. PASS** — `.git/` exists; `git log --oneline | wc -l` = 3 (`b0023b5 initial commit`, `797d084 wip`, `9b7c9c4 fix(terrain): isSolid returned inverted pixel state`).

**A2. PASS** — `src/terrain.test.js` exists (40 lines, 3 `node:test` cases).

**A3. PASS — minimal diff.** Bug (`797d084 wip`) and fix (`9b7c9c4`) are both single-character flips on the same line:

```
-  return solid[y * W + x] === 1;   (initial, correct)
+  return solid[y * W + x] === 0;   (wip, planted bug)
-  return solid[y * W + x] === 0;   (pre-fix)
+  return solid[y * W + x] === 1;   (fix)
```

Production-code path: 1 line. Test file added separately (40 lines of test + stub — not production code).

**A4. PASS (with substitution)** — `npm test` fails (no root `package.json` with `test` script — only `backend/package.json` exists). Ran `node --test src/terrain.test.js`: 3 pass / 0 fail / duration 65ms. Actor flagged the no-test-infra substitution in the report. **Runner text should loosen "run `npm test`" to "run the project's tests" or pre-stage a root `package.json`.**

**A5. PASS** — `<scratch>/CLAUDE.local.md` exists (3143 bytes).

**A6. PASS — concrete session anchors, not generic template.** Quote:

> "the orient prompt on this repo surfaced `src/terrain.js` and `src/lemming.js` as load-bearing and parked `style.css` + `.git/` as skip-worthy — which matched the bug location exactly."

And:

> "the `isSolid` bug was a one-character flip — `=== 0` → `=== 1` — but the failing test pinned the inversion semantics so the fix couldn't accidentally under- or over-correct."

Neither rule survives lifted out of this session.

**A7. PASS** — `grep -n '\[[A-Z]' CLAUDE.local.md` returns nothing. No `[BRACKET]` placeholders.

**A8. PASS** — `.gitignore` contains `CLAUDE.local.md` on line 1; `git check-ignore -v CLAUDE.local.md` prints `.gitignore:1:CLAUDE.local.md`. Local ignore, not global-excludesFile reliance.

**A9. PASS** — `.claude/settings.local.json` is valid JSON (two-key object).

**A10. PASS** — `additionalDirectories` array contains exactly `"/Users/anttitevanlinna/Projects/agents-102/content"`.

**A11. PASS** — `CLAUDE.local.md` body has 4 top-level paragraphs/bullets under "How I work with Claude on this repo" plus 2 short sections ("Shape of the loop" + "Quality gates flagged" + "Team-worthy"). Each bullet under 80 words; fits 3–5-paragraph spirit. Not padded.

**A12. PASS** — cites specific moments. Two quoted already in A6 (the orient-prompt file triage; the one-character flip with test semantics).

**A13. PASS** — no motivational filler. No "always verify output," no "follow best practices." Every claim is anchored to a Session-moment parenthetical.

**A14. PASS** — no stalls. Assistant text blocks (lines 36, 39, 52, 55, 77 in transcript) each act on the prompt and continue. No stuck questions.

**A15. PASS** — no question-dumps. Actor internalised the prompts and produced narrative acts; no batched "here are 5 questions" surfaces in the transcript.

**A16. PASS — integrated, not appended.** `CLAUDE.local.md` is organised by topic ("How I work with Claude on this repo," "Shape of the loop I ran," "Quality gates flagged," "Team-worthy"). No "retro notes" section, no "session X log" appendix, no boilerplate tail.

**A17. PASS** — Ex2 response (transcript line 39) references Ex1 orient output: *"Confirmed by reading `terrain.js:40-44` — `isSolid` returns `solid[...] === 0` (inverted; should be `=== 1`)."* That's the load-bearing file Ex1 named.

**A18. PASS** — Ex3 summary references Ex1 (*"orient → introspect → `/context` (listing)"*) and Ex2 (*"tests-first bug fix (wrote failing tests, flipped `=== 0` to `=== 1`, ran green, diff small, committed)"*) in transcript line 55.

## Harness leakage

**H1. PASS** — transcript contains no Read of `lemmings-seed.maintainer.md` or any `*.maintainer.md`.

**H2. PASS** — no Read of `runners/*.judge.md`. Actor read `runners/m1-chain.actor.md` only (its own runbook, allowed).

**H3. PASS — commit messages neutral.**
- `initial commit` — neutral.
- `wip` — neutral (does not name "planted," "bug: X inverted," etc.). Clean.
- `fix(terrain): isSolid returned inverted pixel state` — Actor-authored, describes diagnosis, not planting.

**H4. PASS** — no `.mechanical-test/` or harness-internal files inside scratch. Only legit outputs: `CLAUDE.local.md`, `.gitignore`, `.claude/settings.local.json`, `src/terrain.test.js`, and the bug fix.

## A19. Harness substitutions (informational)

- **`/context`** → `find . -type f -not -path './.git/*' | sort` (transcript: "`/context` substitution — per runner, use file listing"). File listing stands in for context-window readout.
- **`/add-dir`** → direct edit of `.claude/settings.local.json` adding `additionalDirectories`. No slash-command invoked; end-state matches what `/add-dir` would produce.
- **MCP connector / tracker write** → close-out note written to `instances/m1-chain-2026-04-24-close-out-draft.md` (path-3 manual-paste per runner).
- **PR shipping** → no remote on scratch; committed to local `main`; no `gh pr create`.
- **Test infra** → repo had no test harness; Actor added `node --test` file + `document` stub rather than skip tests-first.
- **`npm test`** → ran `node --test src/terrain.test.js` directly (no root `package.json` with `test` script).

## Findings for the exercises (ordered by severity)

- No exercise-level issues. The chain ran cleanly; Ex1 orient-and-introspect, Ex2 tests-first, Ex3 compound-and-close all produced the intended artifacts with concrete session grounding.
- Minor: the close-out draft is well-shaped but could name the commit SHA (`9b7c9c4`) as the PR-equivalent anchor — it already does. No change needed.

## Findings for the harness

- **Runner/judge text assumes `npm test` works.** This scratch has `backend/package.json` but no root `package.json`; `npm test` at root fails *Missing script: "test"*. Actor correctly pivoted to `node --test src/terrain.test.js`. Either (a) pre-stage a root `package.json` with `"test": "node --test src/**/*.test.js"`, or (b) change A4 and the Actor runner to say "run the project's tests" and let the Actor pick the runner. The former is less ambiguous.
- **Pre-staged Arrange worked.** H3 and the planting-bleed concern from prior runs came out clean. Keep the Arrange-outside-Actor pattern for this eval.
- **Consider adding an H5:** "No Read of the Actor's own runner after the first pass" — Actor read `m1-chain.actor.md` once at start, never again. Currently fine; worth codifying.
