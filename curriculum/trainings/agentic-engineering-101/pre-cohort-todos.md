# Pre-cohort punchlist — AE101 M1–M4

Everything that needs to land before the first paying cohort. Grouped by kind of work, not by module. Module files carry zero TODOs — this file is the single tracking surface.

Delete items when done. Git is the history; this file is current state.

## 1. Three-persona sim sweep

Mandatory for AE101 modules per `.claude/skills/content-creation/SKILL.md`. Dispatch Maija (mid-competent) / Greg (opinionated senior) / Jin (fast operator) against the relevant surface; archive per-persona reports under `curriculum/evals/instances/sims/agentic-engineering-101--<slug>--<persona>.md`.

**M1 — three exercises.** `orient-and-introspect` / `fix-tests-first` / `compound-and-close`. Focus: Ex1 introspection feel + `/context` surprise, Ex2 tests-first pressure + diff push-back, Ex3 compound move + MCP gate realism, register-drift (Greg catches residual training-author warmth the grep scan misses).

**M2 — `push-back-on-the-plan` + `when-a-plan-is-good` lecture.** Already run once on v3; re-sim any Pass 3 register adjustments.

**M3 — three exercises + `skills-from-the-frontier` lecture.** `map-the-access-surface` / `threat-model-with-stride` / `author-test-strategy-skill`. Greg will argue STRIDE is dated — exercise survives because the authoring move stands. Authoring exercise (Ex3) most likely to surface default-acceptance + generic-pyramid failure modes.

**M4 — `walk-and-send-off` exercise + `test-and-learn` lecture.** Re-sim after 2026-04-23 reshape. Also paired sim against M5's return exercise — does the un-packaged artifact give M5 enough surface for diagnosis-by-contrast?

## 2. Capability checks (dispatch `claude-code-guide`)

- **Plan-mode UX on cohort Claude Code version.** Verify *keep planning with feedback* flow; verify whether softening-on-regeneration (Claude acknowledges push-back but re-softens the step) is a reliable pattern. If yes → named failure mode in M2's watch-fors. If not → drop from watch-fors.
- **Skill invocation UX.** Where skills live in the content folder; how students invoke from there; any changes to personal-skill discovery at `~/.claude/skills/`.
- **Skill file format.** Confirm current frontmatter schema (required fields, valid values) before first cohort reads authored SKILL.md.

(Session-persistence overnight + MCP install surface + Huryn freshness — verified 2026-04-23, landed in the reference files.)

## 3. Worked examples to write

- **Surface-map output snippet** (`map-the-access-surface.md`) — what Claude returns for a realistic feature. Defer to first sim; use a real cohort output if clean.
- **First-pass SKILL.md** (`author-test-strategy-skill.md`) — a good authored test-strategy skill for a Node.js service with Jest + Playwright + Docker-Postgres. Ship inline or link to reference file.
- **STRIDE invocation 30-sec snippet** (`skills-from-the-frontier.md`) — decide: lecture or exercise opener? First sim picks.
- **Task shapes by engineer archetype** at `curriculum/reference/picking-a-first-long-task.md` — backend / frontend / platform / data. 3–4 shape-examples.

## 4. Register polish

- **`the-wizard-move.md`** — Greg-persona sim (2026-04-21) hallucinated pep-talk lines; trim residual training-author warmth. Grep scan clean; the deeper read rolls into the M1 three-persona sim (item 1).

## 5. Opener mechanics

- **M2 wizard-demo choice.** Does the trainer demo plan-mode push-back on a volunteer repo? Menu of 2–3 options for cohort flexibility. Antti reviews.

## 6. Self-study variants

- **M1 Connections self-study variant.** Nerd collects and reflects thematic tendencies from the student's shared tricks (in-room move doesn't apply solo).

## 7. Cross-cutting ops

- **Team-kit home runbook** — if sponsor answered "we don't have one" on the pre-engagement contract, who creates the default shared repo, when, how students get access. Ops-side, before Day 1. Cross-cutting; not M3-specific even though Ex3 is where it first lands.

## 8. M5 freshness dependency

- **Ronacher's three-pattern source.** Must be within 6 months when M5 drafts. If not, swap for a named convergence pattern from the research KB. (`test-and-learn.md` flags this inline.)

---

**Canonical home:** this file. Module files carry zero TODOs — all pre-cohort open items route here.

**When an item closes:** delete the bullet. Git log carries the history. Don't annotate "done" — closed = gone.

**When a new item surfaces mid-session:** add it here, not in the module file.
