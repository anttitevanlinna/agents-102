# Evaluations

## Big Idea
The Module 5 eval now runs on every output. The judge stays fixed, so the loop's score means something. The generator sharpens against that feedback while you walk away.

## Prework

[Ethan Mollick, *The Bitter Lesson versus The Garbage Can*](https://www.oneusefulthing.org/p/the-bitter-lesson-versus-the-garbage). Start with the judge you saved at the close of Module 5.

## What You'll Learn
After this module, you will be able to:
- **Build** a self-improving eval loop: separate agents generate and judge, the Module 5 judge scores each round unchanged
- **Read** how the generator's tactic sharpens across rounds in the final eval notes
- **Distinguish** the one-off Module 5 judge from one that runs on every output

## Start here

Start a fresh session or task at `~/Documents/agents-101/`.

Read Ethan Mollick's [*The Bitter Lesson versus The Garbage Can*](https://www.oneusefulthing.org/p/the-bitter-lesson-versus-the-garbage).

His question: will the bitter lesson apply inside your company? Can agents improve if you define the outcome and let them find the path, or does organisational mess still matter too much?

## Run the loop without you in it

The same judge keeps catching what slipped past, and the system absorbs the catches without your edits.

[Lecture: Evals as steering](lectures/evals-as-steering.md)

> The same pattern applies to actions. An agent action starts as text: a proposed mail, ticket update, CRM change or command. Check the proposal before it becomes the action.

[Exercise: The eval loop runs itself](exercises/eval-loop.md)

[Lecture: When the score stops moving](lectures/when-the-score-stops-moving.md)

[Closing: The new human role in the loop](lectures/new-human-role-in-the-loop.md)

## Debrief

Five minutes. The agent reads the round-by-round trail and rewrites the generator's tactic file in place: it adds a rule the loop never reached, cuts one that fired on the wrong thing, credits no change smaller than noise, and reports what changed. The judge file stays untouched.

{{prompt:a101-m6-debrief-tactic-sharpen}}

## Push back on the summary

Read the agent's summary and push back: *"That rule is too vague, make it observable"* / *"you added a rule the tactic already had after round 2."*

If it sounds too kind, ask: *"Which rule did you claim to remove but keep under another name? Quote both lines."*

The artifact: the sharpened `./generation-tactic.md` plus one line in the Module 6 eval-notes naming the first always-on eval you'll run next.

## Key Concepts
- Groundedness protects the floor; steering raises the ceiling.
- The judge stays fixed and separate from the generator, so the score means something.
- A flat score is information about the judge or the work. Check both.
- You design the loop and own the yardstick.

## Bring to Module 7

**Your first five agent calls at work, written down**, using [Agent Trigger List](../../trainings/agents-101/supplementary/agent-trigger-list.md). Pick one call the eval loop's checks could let run without you, and write the trigger into your working notes.

The [Cookbook for Agent System Design](../../trainings/agents-101/supplementary/cookbook-for-agent-system-design.md) and [What is an Agent](../../trainings/agents-101/supplementary/what-is-an-agent.md) are optional references.

Once the trigger is written, end this module's session or task. Module 7 starts fresh at `~/Documents/agents-101/`.

## Next
The judge stays fixed, so the loop keeps pressure on the generator while you are away.

<!-- maintainer -->

**Red thread (2026-11-13, Antti).** "It is not to add sentences. It is to align on common theme. Say it in different ways without adding more content." Added openers, four-ideas slides and own-agent callouts were tried and removed the same evening. Align existing lines; add none.

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@4d9c4af2 slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @12bf0d81: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,personal-to-team,agents-building-agents]

**Key Concepts minimal (2026-09-24, Antti-directed).** A glance list of handles, nothing born here: every law on it is earned in the lecture that follows the exercise, `evals-as-steering.md`, `when-the-score-stops-moving.md` and `new-human-role-in-the-loop.md`.

**Story blend, M6 (2026-09-23).** The callout beside `lectures/evals-as-steering.md` carries one paragraph, the agent-action-starts-as-text point, per `module-design/a101-story-proposals/blend.md` § Titles, M6. The connector encouragement is not part of the module: it is a different module's advice arriving mid-loop, and *start small then scale* is sales register in a student body (`check_writing.md` §13).

**Mood target:** Unleashed leverage — the student sees the loop improve work while the human owns the yardstick and boundary.

**Push-back moves / Watch-fors / Decision points:** [M6 run sheet](trainer-modules.md#m6-glance) owns the live cues, recovery paths, protected beats, and cut order.

**Meta (trainer):**
- **Transitions:** connections 5 @start "Connections" · debrief 5 @end "Debrief" · bridge 3 @end "Bridge"
- **Where these numbers come from:** debrief from the body ("Five minutes."); connections is an estimate. Every beat here has no file of its own, so nothing else prices it.
- **Primary Bloom's level:** Create
- **Materials (trainer):** `judges/groundedness-judge.md` handoff from Module 5's benchmark winner. Pre-flight capability check on generation/judging agent separation and tactic rewrite reliability.
- **Plug points:** the topic for the generation run (defaults to the Module 3 system's primary output); starting tactic; number of rounds.

**Plug Points (trainer):**
- **Topic for the generation run.** Default: the Module 3 system's primary output. The student has been working this memory all week; the eval loop bites on real material.
- **Starting tactic.** Default minimal. Regulated-industry cohorts may seed 2-3 non-negotiable rules.
- **Number of rounds.** Default 3. Compressed variants may use 2, but the trajectory is thinner.
- **Walk-away duration.** Default 25-30 min. Compressed variants trim to 15 min + 2 rounds; note this costs some of the mood.

**Mood contract:** unleashed leverage — *"we can automate the loop."* The walk-away window + notes-on-return are load-bearing. Do not let the student sit through the whole run.

**Artefact contracts**
| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Fixed groundedness judge | `judges/groundedness-judge.md` | M5 benchmark winner | M6 eval loop; M6 Debrief integrity check; M7-M8 quality infrastructure |
| Generation tactic | `./generation-tactic.md` | M6 eval-loop setup and Debrief rewrite | M6 repeated rounds; post-training always-on eval work |
| Module 6 eval trail | `module-6/runs/`, `module-6/eval-notes.md` | M6 eval-loop run | M6 Debrief; M7 sharing diagnosis; post-training loop tuning |
| Steering eval seed | `./goal-nudger-eval.md` | M6 closing prompt when run | Post-training excellence/steering eval work |

**Supersedes:** the previous M6 split across a manual groundedness loop and a separate steering exercise. The manual loop violated the "agents do the heavy lifting" rule from M2 onward by feeding judge output back to generator by hand. The new exercise automates the groundedness loop. Steering stays as a closing prompt, not a second full exercise.

**Why one exercise, not two:** M6 is the core arc's closing magic beat. Splitting focus across two exercises dilutes the magic. The eval loop exercise carries both disciplines: convergence happens in the scoring, steering happens in what `./generation-tactic.md` comes to encode across rounds against a fixed judge. The student ends with infrastructure that pairs the M5 judge (fixed, groundedness-aware, reusable) with a generator tactic shaped to their own material's failure modes.

**Strategic close:** Keep the grounded eval loop snappy as the main event. `new-human-role-in-the-loop.md` adds steering eval as a closing prompt: Claude asks questions, offers example dimensions to choose from, keeps asking until the dimension is judgeable, then saves `./goal-nudger-eval.md`. The distinction is floor/ceiling: grounded/fidelity evals keep work attached to evidence, brief, or policy; steering/excellence evals create positive pressure to overperform on a chosen dimension.

**Sources:**
- `[checked:2026-08-23 result:OK due:none]` https://www.oneusefulthing.org/p/the-bitter-lesson-versus-the-garbage — [practitioner direct] Mollick (pub 2025-07-28), framing of bitter-lesson scaling against the organisational "garbage can" problem used in the opener. `due:none` under the Theory-construct variant (Antti, 2026-09-01) — named constructs cited for the question they frame, not for currency, no capability claim; dated check owned by `run-the-first-experiment.md`. fallback: retain the question and remove the named attribution.
- `[checked:2026-08-23 result:OK due:none]` https://arxiv.org/abs/2306.05685 — [primary research, historical concept] Zheng et al.'s MT-Bench paper as the maintainer-only origin reference for LLM-as-judge. fallback: keep the plain "judge agent" term without the research attribution.

**Dependency on M5:** hard. `judges/groundedness-judge.md` must exist on disk as the benchmark winner before this module runs. M5's facilitator closing must name the handoff: *"That judge you just picked — tomorrow it becomes infrastructure."*
