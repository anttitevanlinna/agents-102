# Curriculum Alignment Strategy

Curriculum files evolve bit by bit. Small edits land without seeing the compendium or the sibling files they're supposed to seed or follow. This strategy keeps them tight. Two loops, triggered by edit type, run on a recurring cadence.

**Sibling to `module-design-long-running-strategy.md`.** That file governs *generation* (producing new lectures and exercises end-to-end). This file governs *alignment* (keeping what exists consistent with the rules and with its neighbours). Different loops, same compound-on-itself spine.

**This file compounds.** Every full run closes with a Compound step that rewrites the rules below. Skip it and the strategy stops learning.

## Why this exists

Curriculum has three forms of drift:

1. **Rule drift.** A file was clean when shipped. A compendium amendment landed later (rule 14, no em-dashes). The file is now silently non-compliant.
2. **Neighbour drift.** A module's opening changed. The prework or the prior module's bridge didn't. The student arrives with the wrong setup.
3. **Voice drift.** Small edits smuggle later-module voice backward (M2 plan-mode language in prework, M5 long-running voice in M3). Invisible in any single edit.

No facilitator catches these live. Students catch them by getting stuck. This file is the recurring check that runs before they do.

## Surfaces this covers

- **Prework** — the one surface students meet alone; highest stakes for clean setup.
- **Module files** — spine + Connections + What-You'll-Learn + Debrief + Bridge.
- **Exercises** (shared library) — one file per exercise, reused across trainings.
- **Lectures** (shared library) — one file per lecture.
- **Reference pages** — `curriculum/reference/*.md`.
- **Supplementaries** — `curriculum/supplementary/*.md`.

Scope per run: name the surface. A single prework edit triggers compliance for `prework.md`. A module spine change triggers compliance for the module + alignment with its included exercises/lectures + alignment with prior/next modules.

## The session shape

One run of this strategy, start to finish.

1. **Open** (1 turn, ~2 min): Antti names the target file(s) and the trigger. I restate: *"Target: X. Trigger: Y. Loop A + Loop B, or A only? Neighbours in scope for B: [list]."* Antti confirms or adjusts. No third turn of back-and-forth.
2. **Dispatch** (long-running, ~3–6 min wall clock): Launch the loops in parallel. Loop A = four subagents (student_facing, writing, pedagogy, platform) writing to disk. Loop B = one neighbour-alignment agent writing a table to disk. Loop C = three persona-simulation agents (mid-competent / opinionated-senior / fast-operator) writing reports to disk — auto-fires when the edit is significant (shape, opening, artifact, or voice changed; not for typos). All disjoint files; no overwrites. Antti is elsewhere.
3. **Synthesize** (1 turn): Read the output files. Produce one punch list for Antti — severity-ordered, with file + line + quoted snippet + proposed fix. Alignment table inline. Persona mood aggregate at the top (per-persona + convergence).
4. **Reshape** (variable turns): Antti accepts, rejects, or redirects each item. I apply the accepted fixes. Proposed compendium amendments ship via `/compound`.
5. **Compound** (1 turn, before commit): rewrite the *Rules the file has learned* section per the Compound section below. Append one line to *Run history*. Cross-surface corrections → `/compound`.

## The three loops

### Loop A: compliance check (run on every substantive edit)

Four subagents in parallel, disjoint scopes, write-to-disk. ~2 min wall clock.

Agent 1 — **student_facing compendium.** Load `memory/check_student_facing.md`. Score the target file against each of the 14 items. Flag violations with line number, quoted snippet, proposed fix.

Agent 2 — **writing compendium.** Load `memory/check_writing.md`. Grep banned words (`honest`, `delve`, `landscape` as verb, `importantly`, `crucial`, `substrate`, `ritual`, `practice` as noun, `ceremony`). No em-dashes in student-facing surfaces (student_facing rule 14; internal/maintainer sections exempt per `check_sales_copy.md § 9`). No stale markers. Register match against the voice guide.

Agent 3 — **pedagogy compendium.** Load `memory/check_pedagogy.md`. Check delegation boundaries, student-brings-candidates-Claude-screens, n≥2-instances-with-contrast for pattern-recognition LOs, one-exercise-per-module, emergent-knowledge ordering (concepts after exercises).

Agent 4 — **platform claims.** Every sentence asserting Claude Code behavior, `CLAUDE.md` layer semantics, connector/action/tool capability, or Anthropic infra gets verified against `curriculum/reference/claude-code-for-engineers.md` and, for load-bearing claims, a WebFetch to the official docs. Trust-but-verify the capability-check agent (see `compounded/` entry on platform-verify-at-assertion).

Output: four files at `curriculum/_compliance-<target-slug>-<YYYY-MM-DD>-<agent>.md`. Main thread synthesizes a single punch list for Antti.

### Loop B: neighbour alignment check (run when shape/opening/artifact changes)

One agent reads the target file + its neighbours (see below) and produces an alignment table.

**Neighbours per surface:**

| Edited surface | Neighbours to align against |
|---|---|
| Prework | All modules in the training (M1 → Mn), especially M1 opening |
| Module file | Prior module's Bridge, next module's Connections, module's included exercises + lectures, content-strategy section for this module |
| Exercise (shared) | Every module that includes it (across trainings) — the opening framing the module gives, the Debrief that follows |
| Lecture (shared) | Every module that includes it |
| Reference page | Every curriculum file that links to it |
| Supplementary | Every module that assigns it as prework/homework |

**Alignment table columns:**
- **Neighbour** — file name, what role it plays.
- **Neighbour assumes** — what it expects the student arrived with, or the artifact's shape.
- **Target ships** — what the edited file actually produces / leaves behind.
- **Gap** — what's needed that isn't shipped, OR what's shipped but unused.
- **Where earned elsewhere** — if gap exists, which other surface already covers it (may be fine).
- **Proposed fix** — edit target, edit neighbour, or leave (intentional gap).

Output: `curriculum/_alignment-<target-slug>-<YYYY-MM-DD>.md`. Internal artifact.

### Loop C: persona simulation (auto-fires on significant edits)

Three subagents in parallel, one persona each, write-to-disk. ~1–2 min wall clock.

**Personas** (canonical set from `.claude/skills/content-creation/SKILL.md` § Simulation protocol):
- **Mid-competent** — follows instructions, catches structural gaps, lowest LLM fluency in the audience range. Lands mood scores closest to the typical student.
- **Opinionated senior** — rejects scripted moves, catches register smell, quotes lines they'd argue with. Catches what mid-competent misses.
- **Fast operator** — reads for value-add vs. remediation, catches where content condescends to already-competent practice.

Each agent:
1. Role-plays end to end through the target file.
2. Scores mood 1–10 at each phase-end and close. 8+/10 is the bar. 7 is the facilitator-premium signature — *"find what's stealing the mood,"* not *"good enough."*
3. Reports: top breakage points, top ambiguous lines, condescension-to-competence smells, register smells, "this-is-me" rating, would-they-do-it.

**Trigger (auto-fire) vs. skip:**
| Edit type | Fire Loop C? |
|---|---|
| Phase structure changed | yes |
| Learning objectives changed | yes |
| Mood contract changed | yes |
| New practitioner artifact / skill / connector integrated | yes |
| Student-facing opener or call-to-action rewritten | yes |
| Sentence-level polish within unchanged phases | no |
| Typo / punctuation cleanup | no |
| Maintainer-section edits | no |

When in doubt, fire. The cost is one parallel dispatch; the cost of shipping un-sim'd structure is a wasted review turn.

Output: three files at `curriculum/_sim-<target-slug>-<YYYY-MM-DD>-<persona>.md`. Synthesize mood aggregate + convergent findings into the punch list. Persona findings often catch what Loops A and B miss (register smell, condescension, felt-experience).

**LLM-as-judge vs. persona sim:** When verdicts disagree, trust the personas. LLM-judge catches rule violations (Loops A and B do this); personas catch felt-experience smells. *"LLM-judge is procedural compliance; persona sim is the authoritative mood signal."*

## Re-run cadence

| Trigger | Loop A | Loop B | Loop C |
|---|---|---|---|
| Substantive edit to any curriculum file (beyond typo) | yes | only if shape / artifact / opening changes | only if significant (see Loop C trigger table) |
| Compendium amendment touching items used by the surface | yes | no | no |
| Exercise or lecture included by a module changes | no | yes, for that module | yes, for that exercise |
| Prior/next module's opening or bridge changes | no | yes | no |
| Before each new cohort | yes (all surfaces in scope) | yes (all surfaces in scope) | yes (student-facing surfaces only) |
| Monthly | yes (sampled) | yes (sampled) | yes (sampled) |

**Substantive vs. typo.** Substantive = wording that teaches, instructs, or names an artifact. Typo = grammar, punctuation (including em-dash cleanup that doesn't change meaning), format. When in doubt, run Loop A.

## Failure modes to pre-empt

- **Dead-end path in prework/setup.** Fails on a Sunday evening with no recovery. Fallbacks live in maintainer notes, never in body.
- **Ghost file reference.** Cites a file that doesn't exist yet.
- **Register drift backward.** A module smuggles later-module voice (plan-mode in M1, long-running in M3, test-and-learn in M2).
- **Register drift forward.** A module still speaks in the prior module's voice (M4 still sounds like M3).
- **Student as mechanic.** Any step that asks an editor or terminal primitive as forcing function.
- **Pre-fabricated state.** Any *"create file X with content Y"* for something the student could generate in conversation.
- **Opening mismatch.** Module assumes artifact X. Prior module or prework produces Y. Invisible without Loop B.
- **Wasted setup.** Prework produces an artifact no module uses. Prior module introduces vocabulary the next module never calls back to.
- **Compendium rule not firing.** The rule exists but lands after generation. Escalate via `/compound` severity bump.

## How this file compounds

After each full run (Loop A + Loop B + Antti's reshape):

1. **Read** the punch list, the alignment table, and the diff of what Antti actually changed vs. what the agents proposed.
2. **Diagnose** — which compliance agent missed a real violation? Which alignment row missed a real gap? What rule-of-thumb would have caught it?
3. **Rewrite** the *Rules the file has learned* section below. Integrate, don't append.
4. **Rewrite** *Failure modes to pre-empt* if new modes surfaced.
5. **Append** one entry to *Run history*: date, target, trigger, biggest lesson.
6. **Cross-surface → `/compound`.** Any correction that applies beyond this strategy itself (writing-surface leak, student_facing violation, pedagogy failure, platform claim) gets promoted via `/compound`. Rule of thumb: if the correction would apply to another curriculum surface too, it belongs in `/compound`.

## Context for a fresh session picking this up

- **Project root:** `/Users/anttitevanlinna/Projects/agents-102/`
- **Curriculum root:** `curriculum/`
- **Compendiums:** `memory/check_student_facing.md`, `memory/check_writing.md`, `memory/check_pedagogy.md`, `memory/check_platform_and_boundaries.md`, `memory/check_research_claims.md`, `memory/check_sales_copy.md`
- **Content strategy per training:** `curriculum/content-strategy.md` (Bootstrap), `curriculum/content-strategy-agentic-engineering-101.md`, `curriculum/content-strategy-engineering-management.md`
- **Sibling strategy (generation, not alignment):** `curriculum/module-design-long-running-strategy.md`
- **Generation rules:** `.claude/skills/content-creation/SKILL.md` — read before editing any curriculum surface.

## Rules the file has learned

*(Rewritten at each close. Integrate-don't-append.)*

- **Auto-fire Loop C on student-facing surfaces without a facilitator catch.** Prework runs alone. Skipping persona sim is the highest-regret miss because the only catch is the real student getting stuck. Default to "fire C" on prework, exercise openings, and any standalone-readable lecture.
- **Convergent findings across loops are probably real, and the fix layer matches the convergence.** When all three loops (A + B + C) converge on the same item, the fix layer is usually NOT text — it's ops (the zip that doesn't exist), a dependency (the sponsor contract), or a cross-file contract (the five-artifact model). Text-polish on a non-text problem wastes the cycle.
- **Earn every primitive on first use, including before first use.** If a module phase earns a primitive through practice (M1 P2 creates `CLAUDE.local.md`), don't pre-explain the primitive in prework. Pre-explanation reads as condescension-to-competence and breaks the "earn every term" contract. Preview the anxiety the primitive resolves, not the primitive itself.
- **Loop B catches sponsor/contract gaps Loop A can't see.** Loop A is per-file; per-file can't notice that a module's exercise needs a sponsor-stated artifact the pre-engagement contract doesn't ask about. Loop B reading module+exercise+strategy together caught the five-artifact-not-four gap. Keep Loop B in scope on any edit touching sponsor-stated artifacts.
- **Synthesis mood aggregate belongs at the top of the punch list.** Per-persona scores + convergence pattern are the load-bearing signal. Mid-competent below the 8+ bar on N of M steps surfaces blocker severity faster than reading individual reports.
- **Cross-surface corrections propagate via `/compound` + compendium amendment at write time — not via SKILL.md alone.** Meta-rule confirmed twice this session (placeholder rule AND action lead-in rule both lived only in SKILL.md, both missed by Loop A, both caught by Antti after). SKILL.md is descriptive; compendiums are what Loop A loads at generation time. When a rule matters for alignment, mirror it into the matching `check_*.md` in the same edit. Two-instance pattern = severity:high on the SKILL-invisible compounded entry.
- **Dispatch parallel subagents for batch edits, not just audits.** Em-dash sweep (239 instances across 10 files) was handled by two parallel agents with disjoint 5-file ownership using Edit directly, not by synthesizing-then-applying. Right shape when the fix rule is clear and the scale is large. Keep: each agent gets disjoint file list, writes a brief report to disk, commits edits itself.
- **Multi-wave sessions compound fast when rules land fast.** This session: em-dash rule led to sessions-are-the-unit led to placeholder-in-prompt led to action-lead-in led to action-headers led to closed-TODO-no-retrospective led to TODO re-delete. Each rule surfaced the next violation in the file. Rules landing fast pulled more scope into the session — healthy, not drift. Keep going when the waves keep surfacing.
- **Don't over-index on "fixed" retrospectives.** A closed TODO gets deleted. The compounded entry + git log carry the history; the file tracks current state. Clean TODO lists surface open work. Annotated TODO lists surface edit archaeology.

## Run history

*(One entry per full run: date, target, trigger, biggest lesson.)*

- **2026-04-23 am — file created.** Prework finalise session surfaced em-dash violations and the question *is this file compliant with any of our rules?* The question itself was the prompt for this strategy. First scoped at prework only; generalized to all curriculum surfaces on Antti's note.
- **2026-04-23 pm — first full execution on `prework.md`.** Trigger: the strategy's own first run + accumulated edits across three prior sessions + em-dash cleanup. Dispatched Loops A (4 compliance agents: student_facing, writing, pedagogy, platform) + B (neighbour alignment vs. M1–M4) in parallel. Loop C (3 persona sims: mid-competent, opinionated-senior, fast-operator) dispatched second after Antti prompted — Loop C was missing from the strategy; now codified. Biggest lesson: **premature-primitive-introduction.** Prework opened with a four-sentence `CLAUDE.local.md` explanation that M1 Phase 2 earns through practice (the exercise creates the file and `.gitignore`s it inline). Removal cleaned a fast-operator condescension smell and restored student_facing rule 2 ("earn every technical term on first use"). Secondary lessons: (a) convergent findings across loops are probably real — all 8 agents named the content-folder-zip-doesn't-exist blocker; ops fix, not text; (b) Loop B caught a sponsor-contract gap (ticket tracker = fifth artifact) that per-file Loop A couldn't see; updated pre-engagement contract + sponsor worksheet + content-strategy in the same cycle; (c) auto-fire Loop C on prework-class surfaces where no facilitator catch exists. Punch list: 14 items, 1 blocker (ops), 2 high (gitignored truth + Claude-as-discovery flip), 3 medium, 8 low. 11 applied; 3 deferred to Antti's taste call and accepted; 0 rejected.

- **2026-04-23 late — AE101 M1 first fixing pass (split mega-exercise + closing lecture + prework↔M1 alignment).** Trigger: first full fixing pass on the M1 module file after several rounds of prior structural work. Arc: started with Loop A1 (student_facing compliance, 15 PASS / 2 FLAG — both CLAUDE.md layer unqualified); Antti interrupted before full dispatch and named the structural move: split `ship-trivial-bug.md` mega-exercise into three shared-library exercises (`orient-and-introspect` / `fix-tests-first` / `compound-and-close`). Three-exercise shape matches M3's three-on-one-feature pattern; end-to-end narrative survives via artifact chaining. Then added M1 closing lecture (`how-this-training-was-built` — story of how the training was compounded); Antti redirected from opener to closer (meta-frame only lands after the student lives the loop). Mid-session correction: consolidated the compound step from split-across-Ex2-and-Ex3 to single move at Ex3. Final Loop B pass: prework↔M1 alignment clean at the artifact chain; fixed six drift items in M1 (P1/P2/P3→Ex1/Ex2/Ex3 labels, Debrief "extends"→"writes," link format, TODO phrasing). Three compounded entries produced: (1) student_facing: inline links use target title not filename (high severity — happened twice in the same session, same file); (2) pedagogy: split a mega-exercise when phases are distinct skills with distinct artifacts; (3) pedagogy: meta-frame lectures are closers, not openers. Three compendium amendments: `check_student_facing.md § 18` (links rule); `check_pedagogy.md § 16` (split mega-exercise); `check_pedagogy.md § 17` (meta-frame closers). Biggest lesson: **structural moves surface through asking, not through audit loops.** Antti named the split and the lecture-placement fix directly; Loop A compliance was running but wouldn't have caught either (both are design judgement calls, not rule violations). Loops audit compliance; strategic steering comes from the domain expert looking at the shape. Keep Loop A for compliance drift, keep human steering for structural judgement — they are not substitutes.

- **2026-04-23 evening — cascade session on prework + AE101 sweep.** Trigger: Antti's eye during prework finalise surfaced a chain of violations, each landing a new rule that exposed the next. Session produced 6 new compendium rules and 7 compounded entries in one sitting. Biggest lesson: **SKILL-only rules are invisible to Loop A; promote at write time.** Pattern fired TWICE this session (placeholder-in-prompt rule + action-lead-in rule both lived only in `.claude/skills/content-creation/SKILL.md`, both missed by Loop A's compendium loader, both caught by Antti after). Severity on the compounded entry bumped medium → high for recurrence. Rule shipped: every cross-surface rule added to SKILL.md gets a mirror entry in the matching `check_*.md` in the same edit. Secondary lessons: (a) no em-dashes in student-facing study material (`check_student_facing.md § 14`), extends `check_sales_copy.md § 9` site ban; (b) sessions are the unit of work — write "start a new Claude Code session in X," never "open Claude Code in X" (`check_platform_and_boundaries.md § 7`); (c) no placeholders inside fenced prompt blocks (`check_student_facing.md § 15`); (d) every prompt block gets a one-sentence action lead-in with command verb under 20 words (`check_student_facing.md § 16`); (e) action-section headers use command verbs when the section is about doing something — exercises and Debriefs especially (`check_student_facing.md § 17`); (f) closed TODOs get deleted, not annotated as "fixed" (`check_writing.md § 3` extended). Mechanical corrections: removed redundant prework item 4 (ticket tracker — sponsor contract already carries it via Nerd surfacing at M1 P3); removed premature CLAUDE.local.md explanation from prework step 2 (M1 P2 earns it through practice); added fifth-artifact row (ticket tracker) to pre-engagement contract + sponsor worksheet + content-strategy in the same cycle. AE101 cascade sweep: two parallel em-dash agents dispatched (disjoint 5-file ownership, direct Edit) against ~239 em-dashes across 10 files; substrate banned-word sweep complete (10+ hits fixed across 3 files + content-strategy). Still-deferred from this cycle: 3 declarative action headers, 1 placeholder in `map-the-access-surface.md:20`, 14 weak + 7 missing prompt lead-ins — queued for next pass (em-dash agents own those files in this run; collision-avoidance). New alignment-strategy rule codified: dispatch parallel subagents for BATCH EDITS, not just audits, when the fix rule is clear and scale is large — em-dash sweep validated the pattern.
