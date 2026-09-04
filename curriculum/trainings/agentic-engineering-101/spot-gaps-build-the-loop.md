# Spot gaps, build the loop

## Big Idea
Every gap you found belongs somewhere durable, or you will find it again next week.

## Prework
<!--tier:3-->

Optional pre-read before this module: Kieran Klaassen, [My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) (Aug 2025). He measures a verifier before trusting it and runs several in parallel.

## What You'll Learn
After this module, you will be able to:
- **Diagnose** the gaps two sessions of the same task surface, and read where each belongs: memory, sharper verifier, or new skill
- **Cut** one rule from `./CLAUDE.local.md` the diagnosis killed
- **Read** the checks you built as evals: a pass rate, not a pass
- **Turn** the work you repeat across sessions into a handoff prompt that builds one skill and the checks on its work

## Start here

Open a fresh session in the Module 5 worktree, `../<repo-name>-m5`.

You walk in holding two sessions of the same task. The un-packaged Module 4 send-off. The packaged Module 5 re-send.

> **Packaged session thin or missing?** You can still rescue it. If the M5 session is alive but stalled, nudge it once; a *"continue"*-prompt is usually enough. If it crashed or never started, paste the packaged re-send against your worktree fresh; let it catch up while you read on. M6 starts by reading; before it writes, decide whether to wait, stop M5, or accept the partial session as the artefact. If the room starts the lecture while you are still getting a session going, stay with the rescue and read the lecture afterwards.

> **Just can't get the M5 session working?** You lose a bit of value but you can still do this module's exercises. Despair not.

[The two frontiers](lectures/the-2-frontiers.md)

[Map the gaps, cut the rule](exercises/spot-gaps-build-the-loop.md)

[Composing the workflow](lectures/composing-the-workflow.md)

[Read your stack, draw what recurs](exercises/read-your-stack.md)

[Agents that build agents](lectures/the-handoff-prompt.md)

[Story of Module 6](lectures/story-of-module-6.md)

## Human close
<!--tier:2-->

This slot is a human round: talk, compare, no prompts.

[There is no last turn](lectures/agents-that-build-agents.md)

## Optional challenges
<!--tier:1-->

- Build a universal skill loader that works from any directory, finds every skill available to the current project, and loads the one the task needs.
- Write an eval for system-design quality and architectural compliance. Make it a required PR check that blocks changes which violate your architecture.
- Ship one skill for your team and get it adopted. Two teammates must use it on real work and send back one improvement each.
- Build a system that shows which skills, hooks, and rules in your kit fired across recent sessions, and which never fired at all.

<!-- maintainer -->

**`## Next` cut whole (Antti 2026-09-02).** The send-off paragraph, the *going deeper* link to `supplementary/how-the-best-do-ci-cd.md`, the *Keep on learning and sharing* line and the author sign-off: in git at `fe8fde13`. Terminal-module exception to `module-shape.md`; the CI/CD supplementary has no in-module link. Do not restore.

**`## Key Concepts` cut whole (Antti 2026-09-02: *"nobody wants to come back to that at end of full training"*).** Terminal-module exception to `module-shape.md` § Key Concepts and `check_strategy_tie_in.md` §§5–6; judges should not re-flag. The six bullets are in git at `fedd3bdc`. The subtraction doctrine (*add, sharpen, delete*) is carried by the rule cut and the second-loop figure's *add a rule · cut a rule*; the independence kernel (*a check proves something only where it could say no*) has no M6 home by decision (no loop-diagnosis exercise; Antti 2026-09-02). Do not re-home either.

**Lean pass (2026-08-25, Antti-directed M3/M6 shorten, free hands):** Start-here cut *"The contrast is the material."* Do not restore.

**The confidence after-measurement fires at this module's Human close but lives OUTSIDE the workbook.** The measurement system is deliberately not in student-facing body; the trainer administers it. Canonical wording in `theory-plan.md` § Baseline instrument — verbatim-identical to the before-measurement or the delta measures the wording. Target delta +3. Do not add a rating beat to this file's body.

**The rescue callout's lecture line is triage, not a ranking of lectures against exercises (2026-08-15, Antti).** The line is scoped to the moment: *"If the room starts the lecture while you are still getting a session going, stay with the rescue and read the lecture afterwards."* The room-parallelism is the point — others sit the lecture while this student fixes a session — so keep the line, and keep it conditional. Do not widen it into a lectures-are-skippable doctrine, and do not cut the beat: a stranded student needs permission to spend room time on the rescue.


**Backpressure vocabulary:** da Costa's essay is the M3→M4 gap read and M4's closing lecture names the term in the room, two modules back by the time the student arrives here. M6 assigns no reading on it and does not restate the word: the `## Prework` echo carries Klaassen, and the M6 close stays concrete about checks at workflow seams. M6 carries no recap of generation speed, review bandwidth and evals buying capacity back either; do not re-add one (Antti 2026-09-02, read against the frame and declined). The deep treatment is `supplementary/how-the-best-do-ci-cd.md`.

**M6 opener rescue + accept-loss callouts — deliberate exception to `check_student_facing.md` rule 5 (golden path only in body).** Two consecutive blockquotes in `## Start here` carry the rescue paths (nudge / re-send fresh / skip the opener) and the accept-the-loss floor ("you can still do the module's exercises"). Rule 5 normally bans recovery branches in body; here the structural risk (M5 run crashed during lunch in 2-day delivery) is named with scoped rescue, then a softer floor for the case where rescue fails entirely. The blockquote shape isolates both from the golden-path narrative for prepared students. The two blockquote leads (**Packaged session thin or missing?** / **Just can't get the M5 session working?**) are accepted menu-style handles under `check_slides.md` §9's reading-list carve-out. Future judges should not re-flag.

**Human close's "talk, compare, no prompts" stays in body — `check_pedagogy.md` §27 mode-defining-cue carve-out (maintainer call).** The cue defines the slot's mode against a training that is otherwise prompts; the round's form (pairs, whole-room, write-then-share) stays the trainer's per the strategy doc's M6 Debrief spec. Future judges should not re-flag.

**`## Human close` is a pre-close beat, not the module's ending (2026-08-19, Antti-directed: *"human close can be a beat before actual full closing. It is deliberately there to have the time for closing conversations."*).** The slot buys room time for the closing conversation while the closing lecture and `## Optional challenges` still follow. A story judge scoring close mood may read that trailing material as an ending that will not end and file `check_strategy_tie_in.md` §1 against the beat's own framing (*"talk, compare, no prompts"*). Do not move the beat later, and do not soften its framing to acknowledge what follows — the conversation needs a named slot, and the name is what makes a trainer stop for it. Future judges should not re-flag.

**Quality:** compendium-audited 2026-09-03 (writing@54577f39 story@94fcca2d technical@94fcca2d behavior@1c765f2 pedagogy@4e0370bc strategy@54577f39 slides@54577f39)
- judges @54577f39: writing PASS (1 todo see instances/ae101--module--spot-gaps-build-the-loop.writing.json), story PASS, technical PASS, behavior PASS, pedagogy PASS (1 todo see instances/ae101--module--spot-gaps-build-the-loop.pedagogy.json), strategy PASS, slides PASS
- cross_module @54577f39: PASS — set=[run-the-first-experiment,learn-from-the-test,spot-gaps-build-the-loop]; 2 pairs, 0 blocking; see instances/ae101--module-set--m4-m5-m6.cross_module.json

**Leap test** (per `check_pedagogy.md` rule 45; M6 is an arc-mood exercise so the test names artefact + use, not activity):
- The student has read their own Claude Code history back across the stack and holds a set of mermaid diagrams of the work they repeat. The dominant gap now sits inside a recognised work-shape, not floating alone.
- The student's `./CLAUDE.local.md` shows at least one rule deleted (compound-by-subtraction), born from the two-run diagnosis. Observable in the file itself and in the student's account of what went — the file is gitignored from M1 on (`prompts/compound-and-close-1.md`), so there is no deletion commit to look for.
- The student now holds a standalone handoff prompt, written by the agent from the recurring-work shapes mapped in the exercise, that scans their whole stack, builds one skill picked with the agent, and puts checks on its work when run later. The encode-move generalised from one task to all their work.

**Artefact contracts** (per `check_cross_module.md` §5 — every produced artefact with a stable identifier gets a contract row):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Two-run gap map | Ranked gap list in M6 session scrollback; optionally copied to `observations/` if the student wants it durable | Exercise *Map the gaps, cut the rule* (diff un-packaged M4 vs packaged M5, quote both runs, rank dominant gap) | The same exercise's rule cut (reads the ranked list for the rule the diagnosis killed); future post-cohort team-kit conversation |
| Recurring-work shapes | Repeated-work inventory + mermaid diagrams (≤30 nodes each) in M6 session scrollback | Exercise *Read your stack, draw what recurs*: study prompt (scan `~/.claude/projects/` across the stack) + shapes prompt (draw the top recurring patterns) | The handoff lecture (`the-handoff-prompt.md`): the shapes carry into the handoff prompt |
| Stale-rule deletion | `./CLAUDE.local.md` in the M5 worktree, with one rule cut in place if diagnosis killed it | Exercise *Map the gaps, cut the rule*, the rule-cut prompt | Every future session in the worktree; post-M6 merge-back decision into the original repo's personal rules |
| Workflow-skills handoff prompt | Standalone prompt in the close scrollback; student saves it where they choose (repo note or `~/.claude/`) | The handoff lecture (`the-handoff-prompt.md`): the agent reads the recurring-work shapes and writes a cold-runnable prompt | The student's own later sessions: run cold to scan their stack, pick one skill with the agent and build it, then put checks on its work |

**Failure modes + escape hatches per phase** (per `check_pedagogy.md` rule 47; one row per forcing function shipping in the exercise):
- **Map the gaps: the diff.** Failure: both-runs collapse — student treats the packaged run as the only material worth diagnosing, the un-packaged baseline fades. Escape: trainer asks for quoted moments from each run separately before any synthesis.
- **Map the gaps: the rule cut.** Failure: addition-only compounding — student only adds rules, never subtracts. Escape: forcing prompt names a specific rule the two-run diagnosis killed; if the student can't name one, the diagnosis wasn't sharp enough — back to the diff's quoted-moments check.
- **Read your stack, draw what recurs: the scan.** Failure: scan-sprawl — the study reads the whole stack and throws back a wall the student catalogues instead of ranks. Escape: the body steer (*read for the few at the top you actually repeat*) plus trainer push to the ranked head; depth is the student's call, not a mandate.

**Meta (trainer):**
- **Primary Bloom's level:** Analyze + Evaluate + Create
- **Pacing:** Runtime is computed — `node scripts/calculate-time.js spot-gaps-build-the-loop`. The slack is the Debrief and the exercise's scan-depth steer; the lecture-dense close is not where to find it. Trainer demos slowly, room copy-pastes concurrently.
- **Transitions:** re-entry 10 @start · debrief 12 @after:spot-gaps-build-the-loop · debrief 6 @after:read-your-stack · bridge 3 @end
- **Prep / bridge timing:** optional Klaassen verifier article 10 min; human close 10–15 min.
- **Mood target:** practitioner fluency — *"I know how to test, I know how to learn, I know how to encode."* Not confidence-as-performance; competence-as-posture. Failure shapes that steal the mood: compliance-feel (*"build the eval, pass the gate"*), paperwork-feel, credibility-performance (*"we live what we teach"*), trainer-monologue retrospective. If any beat reads like one of those, revise.
- **Delivery architecture:** canonical in training-architecture.md §Working directory model / §Session boundaries / §Material distribution (no training-dir state, no `module-N/` folders). Not restated here. Module-specific: M6 opens a fresh session in the M5 worktree at `../<repo-name>-m5` where both runs already live, then reads, routes, and maps in-place. The handoff prompt from `the-handoff-prompt.md` is the take-home; skill candidates it surfaces later ship personal-first, team-PR via human conversation — not auto-promoted.
- **Pre-read placement:** none. M6 deck order (2026-09-02): the-2-frontiers → exercise `spot-gaps-build-the-loop` (diff + rule cut) → composing-the-workflow (control loop, Eval, cadence, skills, the Dino / Pocock examples, the filled-in map figure) → exercise `read-your-stack` → the-handoff-prompt (titled *Agents that build agents*) → story-of-module-6 → Human close → agents-that-build-agents (titled *There is no last turn*, last).

**Push-back moves** (trainer delivers):
- **Connections blocker** — student walks in without one of the two artefacts accessible (laptop closed between M5 and M6, scrollback gone, repo state unclear on the packaged run). Trainer push: *"both artefacts are whatever's there. Commits between M4 and M5 send-offs, files modified during each run, scrollback at `~/.claude/projects/<project>/` if the sessions closed — if M4 and M5 share a cwd, recency alone can grab the wrong attempt; filter by a phrase unique to that send-off's opening prompt instead. Open a fresh Claude Code session in the repo and ask it to surface what each run touched."*
- **Over-diagnosis in the diff** — student lists a long catalogue of gaps across both runs. Trainer push: *"two runs, maybe three gaps each. Pick the three that cost the most, dominant first."*
- **Scan-drown in the stack scan** — the study throws back a wall and the student starts cataloguing. Trainer push: *"read the ranked head. The few you actually repeat are the map; the rest is inventory."*

**Watch-fors (cross-phase):**
- Gap-home confusion — the diff prompt calls everything a skill candidate because skills feel like "the answer." Push back on the output: some gaps belong in memory, some in a sharper existing verifier, some in a new skill.
- Closing-lecture-as-pre-read — if the closing names something the student already heard, the opener or exercise leaked. Three-persona sim catches this; ship-pass eval also.

**Decision points (pacing):**
- **Diff runs short (<10 min):** student didn't engage both runs. Diagnostic: did they quote specific moments from each, or summarise generically? If summary, redo with quote-required prompt.
- **Diff runs long (>20 min):** student is over-diagnosing. Force ranking — top three gaps, dominant first.
- **Stack scan runs short (<10 min):** the scan skimmed. Diagnostic: does the shapes output name work the student recognises as theirs? If it reads generic, re-run study with a narrower pointer.
- **Stack scan runs long (>15 min):** cataloguing. Force the ranked head, draw two or three shapes, skip the sidestep.
- **Whole-room mood below 7:** practitioner fluency isn't landing. Check the diff: did the diagnosis name SPECIFIC gaps with quoted moments from BOTH runs? Specificity-across-two-runs is where this mood lives.

**Plug points (trainer):**
- The student's two run artefacts (the diff's input material)
- Team-kit home, if the team has one (destination for skills authored from the handoff prompt after the module)
- Memory home (where gaps-belong-in-memory land)
- The team's rule-review cadence (named so team promotion of a skill does not become the compound-loop bottleneck)

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**

- `[checked:2026-05-25 result:CAVEAT due:none]` https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it — [practitioner direct, vendor venue] Klaassen 2025-08-18; the `## Prework` gap pre-read. Dated origin, well outside the window; pre-read for recognition, never current practice; `due:none` per the dated-origin variant, matching `learn-from-the-test.md` § Source verification (`check_research_claims.md §11a` bans `checked`+6mo computed dues). fallback: drop the Klaassen pre-read; Module 4 and Module 5 still carry the checks mechanism.

**First-cohort observation questions:**
- Two-run reading stamina — does the two-session diff hold, or does the second run fade?
- Primitives sidestep — how many rooms take the optional beat, and does the menu pair recognisably with the shapes students draw when they do?
- Debrief round form — which works best with this mood (pair / whole-room / silent write-then-share)?

Pre-cohort open items for M6: see `pre-cohort-todos.md`.

**`Story of Module 6` lands after the handoff lecture, before the Human close (Antti 2026-08-30 / 2026-09-02).** The memo reads once the work is done; the module's front carries no nine-minute block. The module file is the decision; do not reorder to match a strategy-doc copy.

**Cut (2026-07-05, Antti):** the *Steering the wiring* lecture and the *Arc-named retrospective* exercise (`arc-retrospective`). Do not restore either.
