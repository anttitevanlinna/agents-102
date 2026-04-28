---
name: content-creation
description: Create or revise curriculum content for Agents 102 (modules, exercises, lectures). Use when writing a new module/exercise/lecture, reshaping existing content, creating a new training variant, or reviewing whether content follows project rules. Enforces the three-pass build, the one-exercise-per-module principle, include-link conventions, and content-strategy ↔ module file alignment.
---

# Content Creation — Agents 102 Curriculum

Generation-time rules for curriculum work. For architecture (directory structure, include-links, material distribution, Claude Code behavior verification), see `curriculum/CLAUDE.md`. For pedagogy (Bloom, 4 Cs, emergent knowledge/control/leadership, audience, throughlines, module reusability), see `curriculum/lecture-guardrails.md`.

Invoke when the user asks to write or revise curriculum content: a module, exercise, lecture, new training variant, or review pass.

## REQUIRED PRECONDITION — `bosser-strategy` skill must be installed

**This skill cannot generate curriculum content without the private `bosser-strategy` skill present in the user's environment.** Strategic context (module Big Ideas, mood contracts, per-training arc, buyer profiles, competitive positioning) lives outside this public repo. The `bosser-strategy` skill is a personal skill at `~/.claude/skills/bosser-strategy/SKILL.md` that resolves `bosser-strategy:<filename>` references to the private location.

**Preflight at the top of every invocation** — before reading PDCA Step 1:

1. Check whether the `bosser-strategy` skill is in the available-skills list for this session.
2. If not: **STOP**. Output: *"This generation system requires the `bosser-strategy` personal skill, which loads private strategic context. The skill is not installed in this environment. The public repo intentionally does not carry the strategic docs. Without them, generation cannot proceed — you'd be writing curriculum without the mood contract, Big Idea, or buyer profile that define what each piece is supposed to do. Contact the maintainer."*
3. If yes: proceed with PDCA Step 1.

This is by design. The public repo carries the curriculum-as-published-product. The strategic IPR (what makes each piece land for which buyer with which mood) is private. Anyone forking the repo gets the lectures and exercises; nobody but Antti gets the strategic spine. Any generation work that wants to extend the curriculum requires both halves.

**Cross-references in this repo** to strategic docs use the form `` `bosser-strategy:<filename>` `` — read those via the bosser-strategy skill on demand (not pre-loaded). Examples: `` `bosser-strategy:content-strategy.md` ``, `` `bosser-strategy:content-strategy-agentic-engineering-101.md` ``.

## Firing-moment router — load what you need

This SKILL.md is the always-loaded core (session orientation + PDCA cadence + mood arc). Load companion files when you hit their firing moment:

- Writing a prompt block the student copies → **`prompts.md`** (mirrored at ship time by `memory/check_prompts.md`)
- Writing body prose / voice / structure for any student-facing file → **`writing.md`** (voice, jargon, debrief, sharing strategies, three-pass build, structural + pedagogical rules, variants, verification, red flags)
- Running the simulate/test step of the PDCA loop → **`simulation.md`** (sim protocol + Claude-behavior patterns + prework-specific patterns)

Plus the matching `memory/check_*.md` compendium per `.claude/rules/content-rules.md` (surface-detector hook preloads these).

## Session shape default — apply the training's own pattern to producing the training

Default to the shape of the training's own pattern applied to the meta-task. If the training teaches a move, the work of producing the training content should be doing that move.

- Generating M5 content → run M5's *diagnose / package / re-send* on the session. The initial proposal is the un-packaged run; the reference-artefact + plan + verifier are the packaging; the subagent dispatch + loop is the re-send.
- Generating M6 content → run M6's exercise prompts (diff two runs + name gaps + author encoding skill) on the session's own artefacts.
- Updating this SKILL.md → run the SKILL.md's own PDCA loop on the SKILL.md update.
- Generating a Bootstrap exercise → run the exercise's own forcing function on the design of the exercise.

**The Rory test:** the filter for whether we understand a pattern is whether we can run it on ourselves. If the session can't apply the pattern to its own generation, we don't yet understand the pattern well enough to ship it. Apply the default at session-open so the first 3–5 turns aren't spent re-discovering the meta-move every cycle.

## Strategy-first generation — non-negotiable

**Every piece of content aligns to strategy before you touch words.** Strategy-first is the frame around every step. Before drafting a lecture, exercise, prework, or homework, you must already know:

1. **Which module** this belongs to, and its *big idea* from `bosser-strategy:content-strategy.md`.
2. **Which mood** this module is engineered to produce — see the "Mood (deliberate)" paragraph per module + the mood arc below. Mood is the contract; resolving a mood early steals the next module's teaching moment.
3. **Where it sits in the 8-module rhythm.** Each module's mood feeds the next.
4. **Which canonical strategic structures** it honours when the module has them. M7 ships the **four sharing strategies** (see `writing.md`). When a module's strategy section names a canonical structure, use it verbatim; don't reinvent.

If you can't answer those four questions before writing, stop and read `bosser-strategy:content-strategy.md` until you can. Strategy isn't the frame you impose on content after drafting; it's the frame that decides what to draft.

## Rule files to load before generating

Before writing any student-facing surface, ALSO read:
- `.claude/rules/content-rules.md` — routes you to the right compendium for today's surface (writing / sales_copy / student_facing / prompts / lectures / strategy_tie_in / pedagogy / research_claims / platform_and_boundaries)
- The specific `memory/check_*.md` compendium(s) it names

These are the rules that fire at generation time. Loading them after drafting catches half of what loading them before drafting would have prevented.

**Compendium + SKILL.md growth rule.** When a rule-surface crosses ~15 items (compendium) or ~400 lines (SKILL.md), split by firing moment — the editing context that triggers loading it (writing a prompt block, placing a lecture, naming a Big Idea, running a PDCA cycle) — not by urgency tier or sub-topic. Firing-moment splits map to what the loader can observe; urgency tiers force a severity judgment the loader can't make. Reference: this SKILL.md itself was split from 534 lines into a 122-line core + three on-demand companions.

**Pre-split rule-doc rule.** Files predating the 2026-04-24 firing-moment split (`lecture-guardrails.md`, `module-design-long-running-strategy.md`, the content-creation skill companions, eval templates, `content-style-guide.md`, etc.) are reference docs, not generation-time authority. New rule content goes to `memory/compounded/` + `memory/check_*.md`, never to these files. When opening one to edit, grep `memory/check_*.md` for the topic first; if the compendium owns it, edit there. The pre-split file shrinks or dies — never grows. Architecture-flavoured rules (training-platform definition, file shape, directory layout) stay in their architectural file (`curriculum/CLAUDE.md`) with a one-line cross-reference from compendium pointing back. Canonical source: `memory/compounded/2026-04-27-content_creation-pre-split-rule-docs-shrink-or-die.md`.

## Session start — read this first

Before touching anything, read in this order:

1. **`bosser-strategy:content-strategy.md`** — Training-level arc + mood-arc synthesis + per-module "Big idea" and "Mood (deliberate)". The strategic contract everything else serves.
2. **`curriculum/CLAUDE.md`** — architectural rules (directory structure, module file shape, include-links, F-Secure fence, material distribution, Claude Code behavior verification).
3. **`curriculum/lecture-guardrails.md`** — pedagogical rules (Bloom, TBR 4 Cs, emergent knowledge/control/leadership, audience, throughlines).
4. **`bosser-strategy:philosophy.md`** (repo root) — the 19 beliefs. Philosophy is the spine. Callouts are sparing.

Then check `continuous-research/insights.md` and relevant domain findings.

**Verify locally:** ask Claude to start `python3 -m http.server 8000` at repo root; open `http://localhost:8000/site/curriculum.html`.

## Two generation modes

Pick deliberately at session start.

**Strategy-session mode** (iterative small turns): Antti types a design move, I capture, we iterate per-turn. Right for shaping strategy, making design decisions, reshaping structure. The PDCA loop below describes this mode's cadence.

**Long-running generation mode** (plan → walk away → return): Antti pins a plan in two turns, I generate a full lecture or exercise end-to-end while he's elsewhere, he comes back to review a 70%-there draft + simulation report + my self-eval. Right for producing content when strategy is stable and the reference artifact is populated. Strategy lives in `curriculum/module-design-long-running-strategy.md` — read it before starting a long-running session.

The PDCA loop covers both modes — same steps — but long-running mode compresses Plan into two turns with explicit sign-off, and Do/Test/Check run without Antti in the loop until handoff.

## The canonical generation pattern (PDCA loop)

Every piece of curriculum content goes through this loop. Skipping a step is how sessions drift.

**Plan:**
1. **Antti's input** — what to build, why, any constraints or principles he's adding this turn.
2. **Strategy alignment (mandatory first)** — read the relevant module's section in `bosser-strategy:content-strategy.md`, INCLUDING its *Big idea* and *Mood (deliberate)* paragraphs. If this piece changes the arc, update content-strategy in the same edit. **Mood check:** state in one sentence what emotional state the student should leave this piece in, and how it sets up the next piece. If you can't state it, you haven't read enough strategy yet. Sibling files (module spine, content-strategy, eval instance) update in the same edit, not later.
3. **Check / agree on evals** — propose the eval judges (contributory ones inferred from patterns; primary "leap test" steered by Antti). Update the eval template (`curriculum/evals/lecture.md` or `exercise.md`) if a missing judge is discovered. Save the filled instance to `curriculum/evals/instances/<training>--<slug>.md`. **Mood-aware eval:** if the module's mood is unease or complexity, the eval's "leap test" should reward the unease, not punish it.
4. **Check learning goals** — pull the Bloom-tagged LOs verbatim from the module file into the eval instance. LOs are the contract; the eval is the measure; the content must satisfy both.

**Do:**
5. **Generate / edit** — write, following `writing.md`. For prompts participants copy, follow `prompts.md`.

**Test:**
6. **Simulate / test** — run through the artifact as if you were a student. Full protocol in `simulation.md`. **Auto-fire rule: after any significant rewrite — phase structure changed, LOs changed, mood contract changed, new practitioner artifact/skill integrated, or forcing-function mechanic changed — invoke the `curriculum-pre-ship-audit` skill by name on the file list. The skill dispatches three-persona simulation + LLM-as-judge eval + source verification + Claude Code capability check + Quality-state tag check in parallel BEFORE handoff. No user ask required.** Polish within unchanged phases doesn't trigger. The auto-fire rule evaluates the CYCLE as a whole — if any turn in the cycle met the criteria, the skill fires at end of cycle even if the final turn was sentence-level polish. Cannot be deferred as a *"pre-first-cohort TODO"* by the reference artefact's Done-means criterion.

**Check:**
7. **Eval** — run the LLM-as-judge on the draft. Antti does the taste review on top. Three verdicts: **APPROVE**, **APPROVE WITH TODOs** (essentials pass, contributory deferred — good enough, ship), **REVISE**. Subject to the same auto-fire rule as step 6.

**Act:**
8. **Learning + system improvement** — if simulation or eval missed something Antti caught, or a new principle emerged, update the system in the same turn: eval template, simulation protocol, this SKILL.md, `curriculum/CLAUDE.md`, `memory/self-review-protocol.md`, `memory/MEMORY.md`. **Then invoke `/compound`** for any correction that applies beyond this cycle. `/compound` writes a schema-validated entry in `memory/compounded/` and (for content/pedagogy/sales/prompts/lectures/strategy_tie_in surfaces) proposes a one-line amendment to the matching `check_*.md` compendium. Without step 8's `/compound`, corrections stay trapped in this cycle's artifact.

   **Also update the Quality line** in each touched file's maintainer block per `curriculum/CLAUDE.md` § *Quality-state tagging*. If the cycle cleared the audit, write `**Quality:** compendium-audited <today>` with a dimension-log row naming the compendium versions and audits applied. If the cycle introduced a sim or mechanical pass, add the corresponding dimension-log row and update the top-state line to the highest valid tier. Mechanical-tested provenance MUST include a git short-SHA pin: `mechanical-tested <date> (<judge-report-path> @ <short-sha>) PASS`. The `curriculum-pre-ship-audit` skill blocks GO without these.

**This pattern generalizes beyond curriculum.** Articles, research findings, future trainings all follow the same shape: *input → plan → measure → contract → make → evaluate → improve*.

**TODO hygiene — when a maintainer-block TODO bullet is closed, DELETE the line in the same edit cycle.** Don't strikethrough, don't keep with `Done <date>` annotation. Maintainer-block TODOs are forward-looking; closed ones get removed. Completion provenance lives in git history (`git log` / `git blame`) and the Quality dimension-log. A maintainer block carrying struck-through bullets accretes sediment a future reader has to skim past every audit. Diagnostic: if the TODO list grows monotonically across cycles, the rule is being violated. Carve-out: when a closed item carries a non-obvious lesson the next maintainer needs (an unusual interpretation, a scope choice that would be re-litigated), capture the lesson in the Quality dimension-log entry for the cycle that closed it, then delete the TODO line. Pairs with `memory/compounded/2026-04-25-content_creation-no-dated-session-reports.md` (latest-only beats append-only). Canonical source: `memory/compounded/2026-04-28-content_creation-remove-done-todos-not-strikethrough.md`.

**TODO vs DEFERRED — two labels, clean grep target.** **TODO** = active, autonomous-fixable, sweepable; every cycle the question is *can this close now?* **DEFERRED** = explicitly held, close-condition outside autonomous reach (Antti-held structural call, time-defer to a future cohort, upstream-infra dependency not yet built, ops decision pending). Autonomous sweep greps `TODO` only; DEFERRED items don't churn each pass. Re-promote DEFERRED → TODO by maintainer when the gating condition resolves; do not autonomously promote. Pairs with the rule above (active list shrinks as work ships; DEFERRED list is a small carry-forward register, not a graveyard). Canonical source: `memory/compounded/2026-04-28-content_creation-todo-vs-deferred-marker.md`.

**Autonomous TODO sweep — default verb is EVALUATE, not DEFER.** Two-step check on every TODO bullet: (1) read the close-condition the bullet names; (2) check current artifact state against that condition. Three outcomes: **close** (delete the bullet — done), **keep TODO** (still active), **relabel DEFERRED** (close-condition outside autonomous reach, with evidence). DEFERRED requires evidence (Antti-held call, time-defer, upstream-infra), not reflex. Default-defer without evaluation is the lazy path; leaves work on the table and treats every TODO as out-of-scope by reflex. Diagnostic: if the autonomous sweep reports >50% of TODOs as DEFERRED on first pass, the default verb has slipped from *evaluate* to *defer* — re-run with the close-condition-first discipline. Canonical source: `memory/compounded/2026-04-28-content_creation-evaluate-dont-default-defer.md`.

## The mood arc — load-bearing constraint

The 8-module Bootstrap arc has an engineered emotional progression. Authors MUST honour it; resolving a mood early steals the next module's teaching moment.

| Module | Mood | Quote | Failure mode (wrong edit) |
|---|---|---|---|
| M1 | Joyful creation | *"I made this. It's me."* | Making it feel like a technical warm-up |
| M2 | Satisfied compounding | *"It runs while I sleep."* | Making it feel like tool setup |
| M3 | Unsettled competence | *"I wonder if this is right?"* | Resolving the doubt with verification or a clean artifact |
| M4 | Deepened unease | *"Damn, this is complex stuff."* | Making security feel tidy or solved |
| M5 | Mechanical rescue | *"Ahh, this is actually fixable."* | Premature rescue (M3/M4 haven't stewed long enough) |
| M6 | Unleashed leverage | *"We can automate the loop."* | Making evals feel like compliance testing |
| M7 | Generous impulse | *"This is starting to work. I wonder if others could benefit?"* | Making sharing feel like a governance chore |
| M8 | Awe and curiosity | *"Oh shit. Where is this all going?"* | Making it feel like a tidy graduation ceremony |

**One-line rhythm:** joy → compound → unease → deeper unease → rescue → leverage → generosity → awe. Build, doubt, fix, scale, wonder.

**In practice:**
- Before writing a Debrief, Close, or Bridge, check which mood this module must leave the student in, and which mood the next module picks up.
- *"Does it feel right to be uncertain here?"* is a valid design question when the strategic mood is unease.
- Do not add verification, check-this-URL, or fix-the-bug steps to a module whose mood is sustained doubt. Checking resolves doubt; doubt is the curriculum.
- Do not front-load the rescue. M5 is the rescue module; M3/M4 are not.
