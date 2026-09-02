# Vocabulary, the controlled terms

Canonical registry for the trainings' terms of art. Fourth sibling of `backing-format.md` (claim-readiness), `quality-format.md` (code-readiness) and `source-freshness-format.md` (source-readiness): this one stamps **word-readiness**, what a term means here, its boundary, where the student earns it, and which check rule enforces it.

**Why it exists.** Vocabulary decisions used to live scattered: a compendium clause here, a maintainer note there, a chat agreement nowhere durable. A term change is a decision about one word made in one place, this file is that place, and it is the mapping authority any sweep runs on.

**Not student-facing.** Never linked from body prose. Bodies earn terms per arc (`check_student_facing.md §2`); they don't cite registries.

## Authority order

1. **Platform vocabulary wins for product primitives**, the word on the student's screen (session, skill, subagent, plan mode, `CLAUDE.md`). We align to Claude Code's own docs, not the other way.
2. **This file** defines the controlled terms and their boundaries.
3. **`check_*.md` rules** carry the firing moments and diagnostics; each points here rather than carrying a second copy.
4. **Strategy docs** (`bosser-strategy:content-strategy*.md`) carry per-training arc placement, where a term is earned.

## The work, session · task · run

| term | means | boundary |
|---|---|---|
| **session** | one sitting of the agent on one task; the platform's own word | law: **one session, one task**, never the converse. A task may take several sessions (diagnose-and-resend = one task, two sessions) |
| **task** | the work item; prefer the concrete noun in prose (the ticket, the feature, the bug) | the task **lands**; the session **sits** |
| **run** (noun) | reserved | legal only as: test/CI/eval executions (*the test run*, *an eval run*); the completed delegated execution read from outside (*the un-packaged run*, *a run you weren't watching*, *mid-run* of a send-off), the execution-record sense, sibling of the test run; verbatim quotes (Ronacher's *"Agent run duration: 10 hours"*); artifact/path/branch names (`RUN-NOTES.md`, `m4/<slug>`); **long-running** as the field adjective (*a long-running session*) |
| run (verb) | unrestricted | *run the prompt*; the module title *Run the first experiment* |

Noun-run for the agent sitting is banned in student-facing body, engineers don't say it. The boundary test: are you in it, or reading its return? In it → *session*; examining the completed delegated execution (its return, transcript, artifacts) → *run* is legal, same family as the CI run. `diagnose-and-resend.md` holds both senses correctly and is the exemplar for each. Enforcement: `check_student_facing.md §21b`.

## The kit, skill · workflow · composition

| term | means | notes | earned in |
|---|---|---|---|
| **skill** | a named move you reach for: single purpose, reusable, invoked by name; lives at `.claude/skills/<name>/SKILL.md` or the team-kit home | platform primitive; collision: team-kit skill vs installed skill, disambiguate on first authored write (`check_student_facing.md §20`) | `skills-from-the-frontier` |
| **move** | chart-register synonym for skill (the sea-passage chart) | defined once at the chart; body prose prefers *skill* (avoids the moves-verb/move-noun collision) | `composing-the-workflow` slide 1 |
| **workflow** | skills in the right order around one task — student-facing definition owed since 2026-09-02 (the `composing-the-workflow` bullet that defined it was cut; the Dino / Pocock example slides will re-earn it) | the concept is **skills-to-workflow composition**: variety first (called by hand / chained through files / authored wiring), one documented kit as specimen, never a closed field taxonomy | `composing-the-workflow` |
| **pilot** / **orchestrator** | one skill whose whole job is running the others, stopping on a bad check, re-invoked until the task lands — student-facing definition owed since 2026-09-02 (the `composing-the-workflow` bullet that defined it was cut; the Dino / Pocock example slides will re-earn it) | pilot = chart register, orchestrator = field register, bridged once; many workflows keep zero | `composing-the-workflow` |
| **leaf** | a skill that does one job and calls nothing — student-facing definition owed since 2026-09-02 (the `composing-the-workflow` bullet that defined it was cut; the Dino / Pocock example slides will re-earn it) | you invoke it by name, no chain | `composing-the-workflow` |
| **verifier** | the external check in the three-pattern | earns its full name at the M5 closer; the M6 closer earns *eval* from it; shapes menu under House coinages | `what-packaging-is` |
| **kit** | the set the practitioner owns: rules file, skills, verifier, the map of moves worth packaging next | assembled progressively; team kit = the shared layer | threaded from `earn-the-trust` |
| **walk-down** | the second-pass branch-walking interview against a plan (Pocock's grill-me, abbreviated, credited) | | `push-back-on-the-plan`; named in `skills-from-the-frontier` |
| **send-off** | launching a long-running session you walk away from | the first send-off is deliberately un-packaged, packaging is what the re-send adds | `walk-and-send-off` |
| **the passage** | the sea-chart spine: one long-running session drawn as a passage | chart callbacks say *the passage*, never "the run" | `what-packaging-is` chart; re-annotated in `composing-the-workflow` |
| **the map** | the six-phase compounding-engine diagram (closed-loop, borrow: control theory), every task's cycle, not only the long-running arc | a distinct image from the passage; don't blend the two spines | `the-whole-map`, `the-map-filled-in` |

## The system, memory · context · agent

| term | rule | canonical |
|---|---|---|
| **memory** vs **context** | memory = persistent artifact (survives session close, compounds); context = ambient runtime state (dies at session close, feeds memory). One line: *memory compounds, context feeds it* | strategy doc § Terminology; `check_student_facing.md §4` |
| **LLM** / **the agent** / **Claude** | thinking → the LLM; acting → the agent; product, addressee or UI → Claude / Claude Code | `check_student_facing.md §21` |
| **`CLAUDE.md` layers** | always name the layer: `./CLAUDE.md` (team, PR-gated) · `./CLAUDE.local.md` (personal, gitignored) · `~/.claude/CLAUDE.md` (user-level) | `check_student_facing.md §13` |
| **subagent** | Code's word; Cowork's UI says *agent*, runtime forks may differ, pedagogy never does | `check_prompts.md §25, §10` |
| **Teacher Claude** / **Builder Claude** | the self-study personas: Teacher facilitates, Builder executes exercises | `.claude/skills/self-study/SKILL.md`; self-study surfaces only |
| **the loop** / **compounding** | the compound loop (Klaassen lineage): taught in full once at the first module, varied after, never repeated as ceremony | `check_student_facing.md §7`; `compound-and-close` |
| **compound engineering** / **compounding** (definition) | Klaassen, verbatim: *"each unit of engineering work should make subsequent units easier, not harder"*; features *"teach the system new capabilities"*, bug fixes *"eliminate entire categories of future bugs"*, codified patterns *"become tools for future work"*; over time *"the codebase becomes easier to understand, easier to modify, and easier to trust"*. Object = the system that does the next work: codebase, tests, docs, checks, artefacts, instructions. A rules file is the first instance taught (M1), never the class. Body prose never narrows *compound* to *write the rules file*; when a verifier, reference artefact, doc fix or test is produced, it may be named as compounding. Source stamp lives in `getting-going.md` | `the-machine-you-just-met` (definition on surface); `compound-and-close` (first instance) |

## House coinages, named concepts

Names the training assembled or embargoes. One rule governs them all: **a house coinage is ours, never write it as field vocabulary** (*"practitioners converge on…"* launders our naming into evidence; `check_research_claims.md §1`).

| name | what it names | contract | home |
|---|---|---|---|
| **the three failure modes** | goal drift · context rot · plausible-but-wrong, taught as a set | the SET is our curation, never cite the set as field convergence; each name carries its own sourcing ledger | `reading-the-return` + its backing block |
| **the three-pattern** | reference artefact · plan.md · verifier, the packaging keystone | word embargo before the M5 closer covers TEACHING, not glimpses (Antti 2026-08-18): absence enumerations (*"no plan.md, no verifier, no reference artefact"*) and map labels may show the names; where the mechanism is being explained, paraphrase, the closer earns the definitions. They are our names, not Ronacher's | `what-packaging-is` |
| **verifier shapes** | LLM judge · deterministic shell hook · Ralph re-feed | the menu is a synthesis of practitioner-lived moves ("the menu form is the synthesis"), attribute the menu to the training, the moves to their practitioners | `what-packaging-is` |
| **eval** (the word) | the M6-earned name for the ranked check; definition under revision toward measurement-over-runs, not verdict-on-one (2026-09-02, `pre-cohort-todos.md`) | embargoed until `the-loop-has-a-name` earns it from the M5 verifier + ranked check-menu; don't pre-plant | `the-loop-has-a-name` |
| **backpressure** | downstream feedback that slows, stops, or redirects production when the next stage cannot safely accept more | earned once after the M4 send-off; later lectures prefer checks, gates, review bandwidth, reach, and workflow seams | `what-keeps-a-long-running-session-going` |
| **done-done** | the real finish line, past code-complete: shipped, closed, visible where the team reads | NOT a house coinage and needs no earning, the audience already has it from agile practice (maintainer-attested 2026-08-12, overruling a registry-derived flag against it). Preferred over *end-to-end*, which is flatter and says less. Fine in student body from M1 | `close-the-ticket` § The point |
| **slop-sharing** | pushing an unvetted agent-authored artefact into the shared team kit | *slop* is the field's own word for low-grade agent output and needs no earning; the compound is ours, so never write *slop-sharing* as field vocabulary. Maintainer-supplied 2026-08-13. Lands once, in M3's Key Concepts, where the kit first crosses from you to the team, a second use anywhere makes it a theme and owes a teaching beat rather than a bullet | `earn-the-trust` § Key Concepts |
| **pre-read** | the between-module reading surface (AE101) | the pre-read carries depth; the opener restates for the room, don't expand opener explanations, don't leak embargoed names there | `reading-the-return` maintainer contract (carried from the dissolved `learning-through-contrast`, 2026-08-25) |

## Register bans and conventions (pointers, not copies)

- *ritual / ceremony* → **exercise**, banned everywhere. *practice*(n) → **OK in AE101 student-facing body, sparingly (Antti-decided 2026-08-15).** No earning beat owed, the M4 opener sentence is gone and stays gone; the noun needs no arc position, only dosage. Sparingly = a handful of load-bearing uses across the whole arc; the two live instances (`learn-from-the-test` *"what becomes durable practice"*, `spot-gaps-build-the-loop` *"Practice is core"*) are the calibration, ambient use is not. Ordinary-English senses (*a practitioner's practice*, *best practice* as a quoted field term) never counted against the ban. Agents 101 retains the absolute practice(n) ban. The cultivated character noun is still **practitioner** (AE101 end-state) → `check_writing.md §2`; `lecture-guardrails.md`
- Banned-word greps (*honest, delve, leverage*(v), *substrate*, …) → `check_writing.md §1`
- Business-audience jargon ban (Agents 101 surfaces) → `curriculum/evals/lints/jargon-ban.md` (canonical list + SVP test)
- Module abbreviations: bare `MN` earned by Module 2; full forms in prework + M1 → `check_student_facing.md §2`
- Student artifacts default `.md` → `check_student_facing.md §25`
- Vocabulary-as-evidence (*"practitioners converge on"*, *"the field named"*) is a research claim, not a register choice → `check_research_claims.md §1`
- **codify** (canonical), turning what the student already does into a written rule. **Accepted variant: *rule extraction*** (the expert-systems term; use it when the agent is doing the pulling). **Not *name the rules***, naming is the teacher's verb, it labels the student's behaviour from outside and casts them as the one being taught; the student already holds the rule, so the move is writing it down, not being told what it is (Antti, 2026-08-14). Lineage, for maintainers only, never body: *externalization* (Nonaka & Takeuchi's tacit→explicit conversion), *tacit knowledge* (Polanyi), *knowledge elicitation* (expert systems). Landed in `extract-the-task-shaping-rule` (H1, Phase 1 heading, opening bullet).
- **read vs scan**, *read* a short artifact end-to-end (a ticket, a diff, an ADR, a ranked list); *scan* a long one for the parts that matter (a plan, session output, backlog history). Picking the wrong verb teaches the wrong move: this training argues against consuming agent output line by line, so a heading that says *read* over a section instructing selective attention contradicts both the section and the doctrine. Two catches, both Antti: `orient-and-introspect`'s *"you read line by line"* and `push-back-on-the-plan`'s `## Read the plan before you push back` → `## Scan…` (2026-08-12). Headings are where this lands, check the verb against what the bullets actually ask (`check_slides.md` §6).

## Changing a term

A vocabulary change is a maintainer decision, then ONE pass under the same commit discipline:

1. Amend the row here FIRST, this file is the sweep's mapping authority.
2. Amend the matching `check_*.md` rule (firing moment + diagnostic, pointing here).
3. Grep the corpus, classify every hit, sweep student-facing bodies; prompt bodies go through the card gate (`check_prompts.md §22/§26`).
4. Re-pin backing anchors quoting swept phrases in the same edits.
5. Gates on touched files: `check-slide-size.js`, `validate-backing.js`; then `scan-stale-classes.js` for the re-eval plan.
6. Strategy doc naming the term updates in the same pass (Alignment: strategy and module file change in the same edit).

A term change that skips the sweep is a fork, not a decision.
