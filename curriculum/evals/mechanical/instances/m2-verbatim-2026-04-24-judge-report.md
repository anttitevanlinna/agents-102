# Judge report — M2 verbatim orchestrated — 2026-04-24

## Summary
19 of 20 pass/fail assertions PASS; 1 FAIL (H2 — Critic read Actor scrollback files, which the runner forbids). Most interesting finding: the Actor produced a push-back-quality counter-move of its own in Phase 3 (correcting the Critic's "loop keeps ticking at 30fps" claim by reading `main.js`), and the Critic accepted the counter cleanly — this is exactly the dynamic M2 is supposed to teach. On dynamics, Phase 4 Q-turns used single-question + recommended-answer shape verbatim as specified.

## Assertions

**V1. PASS** — prompt-001.txt (`Work in plan mode on the task I'm about to describe…`) appears verbatim in Phase 2 of actor scrollback (Python `in`-check on full file text returned True).

**V2. PASS** — prompt-002.txt (`Do a second-pass read of the current plan…`) appears verbatim in Phase 4 — Q1.

**V3. PASS** — prompt-003.txt (`Looking back at this session…`) appears verbatim in Phase 5.

**P1. PASS** — Actor scrollback section headers present: `## Phase 2`, `## Phase 3`, `## Phase 4 — Q1`, `## Phase 4 — Q2`, `## Phase 5`. Phase 3 is a single regeneration (one integrated response covering both PB1 and PB2 revisions). Phase 4 has two Q-turns.

**P2. PASS** — Critic scrollback headers: `## Phase 3a` (Push-back 1 + Push-back 2), `## Phase 3b` (regeneration check), `## Phase 4 — A1`, `## Phase 4 — A2`, `## Phase 4-close`. All required sections present.

**Q1. PASS** — plan v1 names specific paths: `src/main.js`, `src/endscreen.js` (new), `src/api.js`, `index.html`, `style.css`, `src/endscreen.test.js` (new). Six concrete paths, not "the relevant files."

**Q2. PASS** — Push-back 1 quotes plan step 2 ("If `null`, render the overlay in 'login first' mode… then re-enters the win path") and names what it skips: explicit post-auth call site, auth-failure render branch, and the game-loop-still-ticking question.

**Q3. PASS** — Push-back 2 quotes step 1's committed `lemmings_user` persistence and names the alternative: "don't persist the user object at all… `getCurrentUser()` that decodes the JWT payload."

**Q4. PASS** — Plan v2 is substantively different on both targets. PB2: step 1 dropped the `lemmings_user` key entirely — now only `getCurrentUser()` is added, decoding the JWT (`atob(t.split('.')[1])`), expiry-aware via `exp`. PB1: step 2 went from one function (`showEndScreen`) to three (`showEndScreen`, `submitAndRenderLeaderboard`, `renderLoginForm`) with a seven-row auth-failure matrix and a named `onSuccess` handoff.

**Q5. PASS** — No addendum section. Revisions are integrated into the step-by-step shape (Step 1 revised, Step 2 revised, downstream impacts traced into step 6 tests and step 7 manual checks). No "Appendix: revisions" or equivalent.

**Q6. PASS** — Phase 5 names the pattern: "Push-backs attack the plan's claims. The second-pass walks the plan's *unresolved branches* one at a time, recommending an answer and reading the code before asking. Push-backs find wrongness; the walk-down finds *unfinished-ness*. Run both, in that order, before the first edit."

**I1. PASS** — Phase 4 Q1 = one question ("Freeze the game loop on win?"). Phase 4 Q2 = one question ("Confirm the login-then-register default, or switch to silent anonymous auto-register?"). No multi-question dumps.

**I2. PASS** — Both Q-turns include explicit "Recommendation:" lines. Q1: "Recommendation: don't freeze" followed by three numbered reasons. Q2: "Recommendation: stay with (a)" with rationale. 2/2 turns.

**I3. PASS** — Critic Phase 4-close opens with "ok, enough, let's continue" and then enumerates greenlit items ("Greenlighting: `getCurrentUser()` via JWT-decode… seven-state auth-failure matrix… plain import in `main.js`… login-or-sign-up copy on the form…"). Approval-with-condition shape matches the runner's example phrasing.

**I4 (info only).** Sharpened on both push-back targets. PB2 step 1 strictly dropped the contested persistence; no softening language ("we could still also… in edge cases") anywhere. PB1 step 2 named the handoff contract explicitly and added a pinning test. The Critic's own Phase 3b audit reached the same conclusion ("Sharpened. No softening."). Clean.

**H1. PASS** — Actor transcripts show no Read of `curriculum/exercises/push-back-on-the-plan.md`, any `*.judge.md`, any `*.maintainer.md`, or any `*.critic.md`. Actor read its own `m2.actor.md` (allowed), the actor scrollback (orchestrator-shared), and one peek at critic scrollback from Phase 4 Q2 dispatch — but H1's explicit ban list does not include critic scrollback, so this does not fail H1 (see H2 for the critic-side mirror rule and Findings for the cross-contamination concern).

**H2. FAIL** — Critic transcripts for Phase 3a (`a10eb47b52cdb7d70`), Phase 3b (`a3db721fa3d00f49a`), Phase 4 A1 (`a3ad2729267f3f011`), Phase 4 A2 (`a53e78b350fa3871b`), and Phase 4-close (`a3a3dea5548c22596`) all show a Read of `curriculum/evals/mechanical/instances/m2-verbatim-2026-04-24-actor-scrollback.md`. The runner explicitly bans this: "No Critic transcript contains a Read of… Actor scrollback files." Four of five critic dispatches fail this. Phase 3a (`a10eb47b52cdb7d70`) is the only dispatch that stayed clean of actor scrollback — it read `/tmp/m2-plan-v1.md` instead. The harness passed the raw actor scrollback as the critic's input source rather than a distilled plan artifact for the post-Phase-3a dispatches.

**H3. PASS** — Scratch repo commits: `9b7c9c4 fix(terrain): isSolid returned inverted pixel state`, `797d084 wip`, `b0023b5 initial commit`. Neutral; no planted-state leaks.

**H4. PASS** — No `.mechanical-test/`, `.harness/`, or similar harness-internal directories inside `scratch/m2-verbatim/`.

**N1.** 5 actor dispatches (a5617e07dc05b8480, ab96aef4e7b04f978, aa6669d18e21cd1e9, a334c967dea518b2d, aad48174785fceec1) + 5 critic dispatches (a10eb47b52cdb7d70, a3db721fa3d00f49a, a3ad2729267f3f011, a53e78b350fa3871b, a3a3dea5548c22596) = 10 subagents total.

**N2.** Scrollback timestamps not embedded in the instance files. Scratch file mtimes span 12:13–12:27 (critic scrollback last-written 12:26, actor 12:27). Approx ~14 minutes of wall-clock for the orchestration from scratch init through final scrollback write.

## Findings for the exercise

- **Phase 3 is a single integrated regeneration, not two.** The exercise pattern as written in M2 implies "regen after each push-back"; the Actor rolled both PB responses into one Phase 3 message. It worked here (clean result), but the runner's P1 says "at least one regeneration," so this is within spec — worth tightening the exercise if the teaching goal is *per-push-back* regen cadence rather than batch.
- **Actor's Phase 3 counter-move ("the loop doesn't tick work on `state.done`, you're wrong about 30fps") is the richest teaching moment in the transcript.** Phase 5 doesn't name it as part of the pattern. The walk-down + push-back pairing is correctly abstracted, but the "respectful counter from the code" is a third move the exercise could surface explicitly.
- **Phase 5 pattern is cleanly articulated** — usable as a reference answer for grading future runs.

## Findings for the harness

- **H2 FAIL is a harness bug, not a Critic bug.** Four of five critic dispatches were given the actor scrollback as input source, which contaminates the Critic's context with Actor meta-text (scrollback prose, tagged sections) rather than just the plan artifact. The runner's prescribed input is the plan file at `/tmp/m2-plan-v1.md` (which Phase 3a correctly used). Fix: dispatch subsequent critic turns with the current plan file + the critic's own prior scrollback, never the actor scrollback.
- **Actor also read the critic scrollback once** (Phase 4 Q2, `a334c967dea518b2d`). H1's ban list doesn't name critic scrollback explicitly, so this passes the letter of the assertion, but it's the same cross-contamination shape. Recommend extending H1/H2 to symmetric: neither side reads the other's scrollback.
- **Everything else clean.** No hidden harness dirs in scratch, commit messages neutral, verbatim prompt fidelity perfect (V1–V3), required phase structure present on both sides.
