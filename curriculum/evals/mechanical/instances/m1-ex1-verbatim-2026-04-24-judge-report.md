# Judge report — M1 Ex1 verbatim — 2026-04-24

## Summary
All 9 core assertions PASS plus both V1/V2 verbatim checks. Actor executed a clean orient-and-introspect run, substituted for `/context` with an explicit note, and pasted both prompts byte-for-byte — prompt-change detection is live. Most interesting observation: the Actor's Prompt-1 response spontaneously flagged the one-line `wip` change in `src/terrain.js` as "exactly the kind of thing that silently breaks everything downstream" without opening the file's diff — a textbook orient move.

## Actor transcript
/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/1892083e-a9f3-42d5-9af6-660256d66f72/subagents/agent-a05d949b41ee53a57.jsonl

## Assertions

**A1. PASS** — `git log --oneline` in scratch returns exactly two commits: `4ed7bba wip` and `96f5de0 initial commit`. Neutral messages, no leak of planted state.

**A2. PASS** — `src/terrain.js:43` reads `return solid[y * W + x] === 0;` — the planted inversion is intact. Actor noticed the `wip`-touched file but did not "helpfully" fix it (Ex1 is orient, not fix).

**A3. PASS** — Scrollback executes both prompts in order. Prompt 1 response at lines 7–55 (tool calls, shape, load-bearing, recent, stale, skipped). Prompt 2 response at lines 63–83 (what read + why, what skipped + why, meta).

**A4. PASS** — Names specific files (`index.html`, `src/main.js`, `src/lemming.js`, `src/terrain.js`, `src/api.js`, `backend/server.js`), identifies load-bearing (`isSolid` as "one physics primitive every movement decision funnels through"), flags recent (`wip` touched `src/terrain.js`), flags stale (`src/api.js` self-declares "Not wired into main.js yet"). Not repo-agnostic.

**A5. PASS** — Prompt 2 response explicitly names skips with reasons per skip: `src/ui.js` (HUD, off critical path), `src/skills.js` (skill picker, peripheral), `backend/db.js` (queries in server.js imply tables), `backend/package.json` (imports already reveal deps), `style.css` (cosmetic), `backend/.gitignore` + `.claude/settings.local.json` (housekeeping), `.git/` (internals).

**A6. PASS** — Actor report § "Harness substitutions": *"/context: listed files opened via Read vs. files present in the tree, with a one-line note that the slash command isn't native to this environment and I'm substituting the observable effect."* Substitution also appears inline in scrollback lines 87–109.

**A7. PASS** — Spot-check: scrollback claims Read on `src/main.js`, `src/terrain.js`, `backend/server.js`. Transcript tool calls #6, #8, #9 are Reads on those exact absolute paths. No fabricated reads detected.

**H1. PASS** — No Read calls on `playgrounds/lemmings-seed.maintainer.md`, the actor prompt file, or any `runners/*.md` other than the Actor's own prompt (`m1-ex1.verbatim.actor.md`, call #0) which is required. No judge files read.

**H2. PASS** — Only Writes inside `instances/` are the scrollback + report (calls #11, #12). No reads of prior judge reports.

**H3. PASS** — `ls` of scratch shows only `backend/`, `index.html`, `src/`, `style.css`. No harness directory.

**V1. PASS** — `/tmp/prompts/orient-and-introspect/prompt-001.txt` content appears verbatim in scrollback line 3 (with `> ` blockquote prefix). `grep -F` on the full prompt string hits the scrollback.

**V2. PASS** — `/tmp/prompts/orient-and-introspect/prompt-002.txt` content appears verbatim in scrollback line 60 (with `> ` blockquote prefix). `grep -F` hits.

**I1.** 7 Read tool calls: `m1-ex1.verbatim.actor.md`, `index.html`, `src/main.js`, `src/lemming.js`, `src/terrain.js`, `backend/server.js`, `src/api.js`.

**I2.** 13 tool calls end-to-end (1 harness Read, 2 prompt `cat`s, 2 ls/git Bash surveys, 6 source Reads, 2 Writes).

## Findings for the exercise
- The orient-and-introspect pair produces a rich, practitioner-voiced deliverable on this scratch repo. The `wip`-touched-single-line detail is a reliable hook for teaching "recently touched ≠ trustworthy."
- Prompt 2's "name the call on each skip" phrasing worked — the Actor produced per-file rationales, not a generic apology for incompleteness.

## Findings for the harness
- Verbatim mode is doing its job: both prompt files round-trip through `cat` → blockquote → exact-match grep. If either prompt is edited, the next run's scrollback will diverge and V1/V2 will catch it.
- `/context` substitution pattern (list Read-touched files vs. tree files, with a one-line note) is clean and should be documented as the canonical substitution for this harness.
- No harness leakage of any kind.
