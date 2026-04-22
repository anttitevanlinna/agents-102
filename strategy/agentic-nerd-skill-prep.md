# Agentic Nerd — skill prep notes

Prep captured while AE101 strategy grew. **No skill file shipped until Antti says go.** Loaded into the strategy doc when needed; not a standing reference.

See `curriculum/content-strategy-agentic-engineering-101.md` § "Facilitation model — the Agentic Nerd, in both modes" for the positioning and the two-skill architecture (`self-study` + `agentic-nerd`).

**Target path** (when created): `.claude/skills/agentic-nerd/SKILL.md`

**One-line purpose:** *"The all-knowing companion that runs alongside every student throughout the training — answers anything, surfaces the right practitioner skill at the moment of the blocker, catches rubber-stamps, runs the per-student Debrief."*

**When it fires:**
- Student opens a session at the start of a module (nerd greets with module context, surfaces the relevant practitioner skill at the pedagogically right moment — not up front)
- Student asks a question (of any kind — codebase, tool, concept, "what should I do next")
- Student completes an exercise artifact (nerd checks for rubber-stamps, pushes back, offers "find me one row the judge got wrong"-style moves)
- Module ends (nerd runs the Debrief — reviews the session, rewrites the rules file in place, reports in 3–5 lines what changed, student pushes back)

**Core behaviours:**
1. **Answer anything** — ask-don't-type mode. No narrow facilitator script; the nerd is genuinely consultable.
2. **Skill surfacing at the blocker** — when the student hits the specific blocker that a curated practitioner skill resolves, the nerd surfaces it at that moment with a short primer and a link to the source practitioner. Not a catalog dumped up front.
3. **Rubber-stamp catches** — when the student accepts an artifact too fast, the nerd offers push-back moves from the content-creation SKILL.md "Known Claude-behavior patterns" list (default-acceptance-on-offered-defaults, plan-mode approval inflation, self-audit charity, etc.).
4. **Per-student Debrief** — canonical M2+ shape: review session → rewrite rules file in place → report in 3–5 lines. Module-specific Debrief prompt arrives with the module.
5. **Mode-aware** — knows whether it's running in self-study (the `self-study` skill is orchestrating) or classroom (human facilitator is in the room) and adjusts (e.g., don't deliver cohort-only beats in classroom; do deliver them in self-study).

**What it does NOT do:**
- Teach (it's not a teacher — the curriculum teaches)
- Act as narrow 4 Cs facilitator (that's `self-study` skill's job in self-study mode; in classroom, the human handles 4 Cs)
- Decide curriculum content (content is authored; the nerd delivers it)

**Relationship to existing skills:**
- `self-study` skill (exists): orchestrates mode-specific delivery — 4 Cs cadence, progress.md, folder switches, cohort-only beats. In self-study mode, `self-study` calls/delegates to `agentic-nerd` for the nerd role. In classroom, `agentic-nerd` runs standalone alongside the human facilitator.
- `content-creation` skill (exists): defines module/exercise/lecture design rules, including Teacher Claude simulation patterns. Those patterns transfer to Agentic Nerd — rename in a later sweep.

**Per-module logic that will live in the skill (or beside it):**
Each module ships with a block that the Agentic Nerd reads — the practitioner skills to surface for this module's expected blockers, the push-back moves for this module's likely rubber-stamps, the Debrief prompt template. Structure TBD. Candidates: module-embedded YAML block, a separate `module-N/nerd.md` per module, or a single curated registry the nerd consults by module slug. Pick during Pass 1.

**The Nerd reads the per-cohort pre-engagement contract.** At population time, the sponsor's answers from [`strategy/ae101-sponsor-prework.md`](./ae101-sponsor-prework.md) are written to `content/pre-engagement-contract.md` in the cohort's content bundle. The Nerd reads this file at the blockers where students would otherwise see `[SPONSOR-STATED HOME — e.g., …]` placeholders (M1 Phase 4, M2 memory setup, M4 team-kit intro), substitutes the actual sponsor answer, and handles overrides — writing *"student X proposed Y instead of the sponsor default Z because W"* to `content/overrides.md` for the trainer's cohort-close memo.

**Content that will feed the skill's skill-surfacing logic:**
- Klaassen's compound-engineering four-step loop → M1, surfaced at the "I fixed the bug, now what?" blocker
- Huryn's three blocks → M1 at the "my CLAUDE.md is six lines" blocker
- Ronacher's plan.md pattern → M3 at the "my agent is drifting after 90 minutes" blocker
- Cherny's file-based practice → M2 at the "my memory is all in scrollback" blocker
- Full list grows as the continuous-research system surfaces new practitioner skills worth curating

**Open for Pass 1 to decide:**
- Does classroom-mode Agentic Nerd share state across students (dashboard for the human trainer) or stay fully private per student?
- When the nerd and the human trainer say different things about the same moment, whose read wins?
- Runtime requirement per student: licensed Claude Code + Agentic Nerd session open. Sales/cost implication per cohort.
- **Bootstrap rename sweep** — Bootstrap materials + `self-study/SKILL.md` + `content-creation/SKILL.md` all reference "Teacher Claude." Decide whether Bootstrap migrates to the Nerd terminology (consistency across portfolio) or keeps "Teacher Claude" (Bootstrap audience is non-technical builder leaders, where "teacher" may read better than "nerd"). Defer until the `agentic-nerd` skill is written.
- Is the nerd a single skill, or a thin shell that dispatches to per-module sub-skills?
- Does it maintain any persistent state between sessions (beyond what the student's own memory files hold) — e.g., nerd-side notes on "this student rubber-stamps a lot, push harder"?
- Is the nerd uniform across cohorts, or does it tune voice per customer (sharper for technical cohorts, gentler for transitioning ones)?
