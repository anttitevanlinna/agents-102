# Pre-cohort punchlist — AE101 M1–M6

Everything that needs to land before the first paying cohort. Grouped by kind of work, not by module. Module files carry zero TODOs — this file is the single tracking surface.

Delete items when done. Git is the history; this file is current state.

## 1. Three-persona sim sweep

Mandatory for AE101 modules per `.claude/skills/content-creation/SKILL.md`. Dispatch Maija (mid-competent) / Greg (opinionated senior) / Jin (fast operator) against the relevant surface; archive per-persona reports under `curriculum/evals/instances/sims/agentic-engineering-101--<slug>--<persona>.md`.

**M1 — three exercises.** `orient-and-introspect` / `fix-tests-first` / `compound-and-close`. Focus: Ex1 introspection feel + `/context` surprise, Ex2 tests-first pressure + diff push-back, Ex3 compound move + MCP gate realism, register-drift (Greg catches residual training-author warmth the grep scan misses).

**M2 — `push-back-on-the-plan` + `when-a-plan-is-good` lecture.** Already run once on v3; re-sim any Pass 3 register adjustments.

**M3 — three exercises + `skills-from-the-frontier` lecture.** `map-the-access-surface` / `threat-model-with-stride` / `author-test-strategy-skill`. Greg will argue STRIDE is dated — exercise survives because the authoring move stands. Authoring exercise (Ex3) most likely to surface default-acceptance + generic-pyramid failure modes.

**M4 — `walk-and-send-off` exercise + `test-and-learn` lecture.** Re-sim. Paired sim against M5's return exercise — does the un-packaged artifact give M5 enough surface for diagnosis-by-contrast?

**M5 — `diagnose-and-resend` + `reading-the-return` / `learning-through-contrast` / `what-packaging-is` lectures + `learn-from-the-test` module.** Three-persona sim; confirm mood-at-end clears 8 across Maija/Greg/Jin. Paired sim against M4 send-off artifact. Greg+Jin re-sim of the closing lecture.

**M6 — `spot-gaps-build-the-loop` + `arc-retrospective` + `story-of-module-6` / `the-loop-has-a-name` lectures + module file.** Three-persona sim: does the Story opener land permission-giving rather than credibility-performance? Does the Debrief round close on practitioner fluency without drifting into performance?

## 2. Capability checks (dispatch `claude-code-guide`)

- **Plan-mode UX on cohort Claude Code version.** Verify *keep planning with feedback* flow; verify whether softening-on-regeneration (Claude acknowledges push-back but re-softens the step) is a reliable pattern. If yes → named failure mode in M2's watch-fors. If not → drop from watch-fors.
- **Skill invocation UX.** Where skills live in the content folder; how students invoke from there; any changes to personal-skill discovery at `~/.claude/skills/`.
- **Skill file format.** Confirm current frontmatter schema (required fields, valid values) before first cohort reads authored SKILL.md.
- **Hook mechanics depth.** Decide whether AE101 should own the advanced hook treatment that Bootstrap may not carry: practical hook examples, stop-hook boundaries, and the simpler command-loop alternative where the agent runs verification and loops back without a hook.
- **M5 prior-session scrollback read.** Claude Code reading `~/.claude/projects/<project>/` reliably enough for a fresh M5 session to ground Phase 1 diagnosis in the M4 transcript. If unreliable, route through repo-state only (commits + file changes + branch).
- **M5 Phase 1b double four-subagent batch.** Two sequential four-subagent spawns in one session (detectors then regenerators); confirm the second batch fires cleanly after the first returns. If throttled, run Phase 1b sequentially and note in body.
- **M5 in-turn text alongside Agent dispatches.** Confirm Claude streams the three-paragraph self-consistency brief between regenerator dispatch and collation return.
- **M5 scorer stability.** Scoreboard precision/recall computation stable across runs; tighten prompt if numbers swing.

(Session-persistence overnight + MCP install surface + Huryn freshness — verified, landed in reference files.)

## 3. Worked examples to write

- **Surface-map output snippet** (`map-the-access-surface.md`) — what Claude returns for a realistic feature. Defer to first sim; use a real cohort output if clean.
- **First-pass SKILL.md** (`author-test-strategy-skill.md`) — a good authored test-strategy skill for a Node.js service with Jest + Playwright + Docker-Postgres. Ship inline or link to reference file.
- **STRIDE invocation 30-sec snippet** (`skills-from-the-frontier.md`) — decide: lecture or exercise opener? First sim picks.

## 4. Register polish

- **`the-wizard-move.md`** — Greg-persona sim hallucinated pep-talk lines; trim residual training-author warmth. Grep scan clean; the deeper read rolls into the M1 three-persona sim (item 1).

## 5. Opener mechanics

- **M2 wizard-demo choice.** Does the trainer demo plan-mode push-back on a volunteer repo? Menu of 2–3 options for cohort flexibility. Antti reviews.

## 6. Self-study variants

- **M1 Connections self-study variant.** Nerd collects and reflects thematic tendencies from the student's shared tricks (in-room move doesn't apply solo).

## 7. Cross-cutting ops

- **Team-kit home runbook** — if sponsor answered "we don't have one" on the pre-engagement contract, who creates the default shared repo, when, how students get access. Ops-side, before Day 1. Cross-cutting; not M3-specific even though Ex3 is where it first lands. Assumption: unresolved team-kit debate does not block Modules 4–6; students can continue in personal clones/worktrees, flag team-worthy candidates, and promote later once the home is decided.
- **Team-practices storage depth** — decide where AE101 teaches shared engineering practices to live: repo `CLAUDE.md`, `CLAUDE.local.md`, personal or team skills, plugins, ADRs, contribution docs, review checklists, or a team-kit repo. Tie the answer to ownership and PR review, not convenience.
- **Architecture integrity reference** — add the engineering-depth version of the ADR note: ADRs are one effective pattern, but the load-bearing question is how the team preserves architectural intent while agents make local changes quickly.

## 8. M5 freshness dependency

- **Ronacher's three-pattern source.** Must be within 6 months when M5 drafts. If not, swap for a named convergence pattern from the research KB. (`test-and-learn.md` flags this inline.)

## 9. Source verification (per citation-carrying file)

- **M5 closing lecture numbers:** Ronacher MiniJinja, Cherny three-shape framing, Curran 2x figures, Sourcegraph Amp counter-philosophy specifics.
- **M5 Cherny's three-shape taxonomy** — confirm it's his actual framing in the cited interview, not synthesised. If synthesised, soften Phase 3 menu language to "three shapes practitioners use."
- **M6 closing lecture numbers:** Ramp Dojo 350-skill marketplace (verify against `continuous-research/observations/ramp.md`); Intercom Tier 1/2/3 (19.2% auto-approved / 14.6 vs 75.8 min / 86% ≤20 lines / 500-person R&D; verify against `https://ideas.fin.ai/p/2x-nine-months-later`).

## 10. Eval instances to fill before first cohort

- `curriculum/evals/instances/agentic-engineering-101--learn-from-the-test.md`
- `curriculum/evals/instances/agentic-engineering-101--diagnose-and-resend.md`
- `curriculum/evals/instances/agentic-engineering-101--spot-gaps-build-the-loop.md`

## 11. Worked-example references

- Reference + plan.md pair per engineer archetype (backend / frontend / platform / data) for Nerd's M5 reference library.

---

**Canonical home:** this file. Module files carry zero TODOs — all pre-cohort open items route here.

**When an item closes:** delete the bullet. Git log carries the history. Don't annotate "done" — closed = gone.

**When a new item surfaces mid-session:** add it here, not in the module file.
