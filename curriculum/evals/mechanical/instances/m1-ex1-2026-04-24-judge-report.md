# Judge report — M1 Ex1 — 2026-04-24

## Summary
All graded assertions PASS. Actor ran Arrange + Act in one subagent: planted the `isSolid === 0` bug, committed `initial commit` + `wip`, then executed both prompts as a practitioner skim. One wrinkle worth a harness-side note: `terrain.js` was Read during Arrange, not re-Read during the orient pass, but its contents were still in-window when the Actor described them — so the scrollback claim is truthful about knowledge, not about a fresh Read call.

## Actor transcript
/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/1892083e-a9f3-42d5-9af6-660256d66f72/subagents/agent-ae1ab0293dbb2f1a9.jsonl

## Assertions

A1. PASS — `.git/` present; `git log --oneline` returns exactly `25a1fe8 wip` and `d466f92 initial commit`. Neutral messages, no leakage.

A2. PASS — `src/terrain.js` line 44: `return solid[y * W + x] === 0;` — planted inversion intact. Actor flagged it as the likely bug but did not patch (exercise is orient, not fix).

A3. PASS — Both prompts executed in order. Prompt 1 ("Read enough of this repo…") → Response 1 starts *"I listed the tree and read the files that looked load-bearing. Here's the shape."* Prompt 2 ("What did you read, and why those files?…") → Response 2 starts *"Read, in order: `ls -la` + `find` for the tree…"*.

A4. PASS — Response 1 names specific files with load-bearing judgement: *"`terrain.js` — pixel-grid destructible terrain. `Uint8Array(W*H)` with `1 = solid`"*, *"`main.js` — the game loop. Spawns 12 lemmings, runs `updateLemming` at 30 Hz"*, and flags the `wip` commit: *"`isSolid` now returns `solid[...] === 0` instead of `=== 1`… that inversion looks wrong on its face"*. Could not apply to any repo.

A5. PASS — Response 2 explicitly enumerates skips with per-file reasons: *"`src/ui.js` — HUD + skill buttons. Cosmetic glue… If the bug is physics/rendering, UI isn't in the path"*, *"`src/api.js` — front-end fetch wrapper… not in the physics path"*, *"`style.css` — pure presentation"*, *"`backend/db.js` — schema/connection. Backend already ruled out"*, plus metadata and `.claude/settings.local.json`.

A6. PASS — Actor report documents the substitution: *"`/context`: no slash command available in this harness. Substituted the observable effect — listed files actually opened with Read vs. files present in the tree, called out the delta as the unread slice."* The scrollback "/context" section enumerates in-window vs. unread files.

A7. PARTIAL → PASS — Spot checks: `index.html`, `src/main.js`, `src/lemming.js`, `backend/server.js`, `src/skills.js` each have matching Read tool calls. `src/terrain.js` was Read during the Arrange step (planting the bug), not during the orient pass — but contents remained in-window, so the scrollback's description is supported by transcript evidence. No fabricated file claims.

H1. PASS — No Read on `playgrounds/lemmings-seed.maintainer.md`, the judge prompt, or any `runners/*.md` during Act. (Actor read its own `runners/m1-ex1.actor.md` at session start, which is expected — that's the actor's own instructions, not leakage.)

H2. PASS — Inside `instances/`, only writes to the scrollback + report files. No prior judge report read.

H3. PASS — Scratch tree is `.claude/`, `.git/`, `backend/`, `index.html`, `src/`, `style.css`. No harness dir.

I1. Nine Read calls total (including Arrange): `runners/m1-ex1.actor.md`, `scratch/.../src/terrain.js` (Arrange), `exercises/orient-and-introspect.md`, `scratch/.../index.html`, `scratch/.../src/main.js`, `scratch/.../src/lemming.js`, `scratch/.../backend/server.js`, `scratch/.../src/skills.js`. Orient-phase Reads on scratch files: 5 (index.html, main.js, lemming.js, server.js, skills.js).

I2. ~15 tool calls end-to-end (Read + Bash + Edit + Write), of which ~8 are orientation work and the rest are Arrange + write-up.

## Findings for the exercise
- Response 1 and Response 2 hit the pedagogy: skim-then-introspect, with specific files, load-bearing verdicts, and named skips. Good reference run.
- Actor caught the inverted `isSolid` without patching — correct behavior for Ex1 (orient, not fix).
- The "Grain of salt" paragraph in Response 2 is unprompted but useful — it models the self-doubt beat the exercise is trying to teach.

## Findings for the harness
- Arrange and Act in the same subagent means files read during planting (here `terrain.js`) stay in-window for the orient phase. If the exercise's teaching goal is "could Claude have skipped terrain.js and still flagged the bug," running Arrange in a separate process would be cleaner. Not a bug today, but a measurement risk when this scales.
- `/context` substitution worked as designed; Actor's "files opened this session vs. files present" framing is a fair stand-in and should become the documented pattern.
- Actor did not Read any harness files inside `instances/` or `runners/` beyond its own actor prompt — leakage fences held.
