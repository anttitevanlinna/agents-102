# Evaluations

## Big Idea
Put the Module 5 judge in a loop and the work improves by itself. The generator sharpens against the judge's feedback, round after round, while you walk away.

## Prework

[Ethan Mollick, *The Bitter Lesson versus The Garbage Can*](https://www.oneusefulthing.org/p/the-bitter-lesson-versus-the-garbage). Start with the judge you saved at the close of Module 5.

## What You'll Learn
After this module, you will be able to:
- **Run** an eval loop
- **Steer** agents with feedback

## Start here

Start a fresh session or task at `~/Documents/agents-101/`.

**The question, to you:** if you define the outcome and let agents find their own path, do they get better at your company's work, or is your organisation too messy for that? Ethan Mollick asks this in [*The Bitter Lesson versus The Garbage Can*](https://www.oneusefulthing.org/p/the-bitter-lesson-versus-the-garbage).

## Run the loop without you in it

The judge checks every draft, and the agent turns each flag into a rule for the next draft.

[Lecture: Evals as steering](lectures/evals-as-steering.md)

> The same check works for actions. An agent action starts as text: a proposed mail, ticket update, CRM change or command. A judge can check that text before it becomes the action.

[Exercise: The eval loop runs itself](exercises/eval-loop.md)

[Lecture: When the score stops moving](lectures/when-the-score-stops-moving.md)

[Closing: The new human role in the loop](lectures/new-human-role-in-the-loop.md)

## Debrief

Five minutes. The agent reviews every round, rewrites `./generation-tactic.md` once more and adds one line to your <span class="rt-claude-skills">`CLAUDE.md`</span><span class="rt-agent-skills">`AGENTS.md`</span>: every briefing you ask for in this folder follows the rules in that file and is scored by the judge. The judge file stays as it is.

{{prompt:a101-m6-debrief-tactic-sharpen}}

## Push back on the summary

Push back on the agent's summary: *"That rule is too vague, make it observable"* / *"you added a rule the file already had after round 2."*

If the summary sounds too kind, check one removal: *"You said you removed a rule. Quote the old line and show me it is gone from the file."*

## Key Concepts
- The loop improves the work round after round with nobody editing. The judge never changes, so a better score means better work.
- Groundedness protects the floor; steering raises the ceiling.
- A flat score is information about the judge or the work. Check both.
- You design the loop and own the yardstick.

## Bring to Module 7

**Tell the agent five moments at work when you would bring it in.** The [Agent Trigger List](../../trainings/agents-101/supplementary/agent-trigger-list.md) helps you spot them. Pick one where the eval loop's checks would let the agent work without you. The agent writes that trigger into `module-6/trigger.md`.

The [Cookbook for Agent System Design](../../trainings/agents-101/supplementary/cookbook-for-agent-system-design.md) and [What is an Agent](../../trainings/agents-101/supplementary/what-is-an-agent.md) are optional references.

Once the trigger is written, end this module's session or task. Module 7 starts fresh at `~/Documents/agents-101/`.

## Next
Your system now improves its own output. Next, it starts working for someone besides you.

<!-- maintainer -->

**Quality:** compendium-audited 2026-11-26 (writing@cf4fd816 story@78d17fc9 technical@78d17fc9 behavior@78d17fc9 pedagogy@78d17fc9 strategy@78d17fc9 slides@78d17fc9)
- judges @cf4fd816: writing PASS (2 findings see instances/agents-101--module--evaluations.writing.json), story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @12bf0d81: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,personal-to-team,agents-building-agents]
- cross_module @42b9610a: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,agents-building-agents-solo]; 7 pairs, 0 blocking; see instances/agents-101--module-set--agents-101-open-edition.cross_module.json

**Red thread (2026-11-13, Antti).** "It is not to add sentences. It is to align on common theme. Say it in different ways without adding more content." Added openers, four-ideas slides and own-agent callouts were tried and removed the same evening. Align existing lines; add none.

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
| Person trigger | `module-6/trigger.md` | M6 Bring to Module 7 homework | Solo M7 pick-one-person; solo M7 Prework |
| Steering eval seed | `./goal-nudger-eval.md` | M6 closing prompt when run | Post-training excellence/steering eval work |

**Supersedes:** the previous M6 split across a manual groundedness loop and a separate steering exercise. The manual loop violated the "agents do the heavy lifting" rule from M2 onward by feeding judge output back to generator by hand. The new exercise automates the groundedness loop. Steering stays as a closing prompt, not a second full exercise.

**Why one exercise, not two:** M6 is the core arc's closing magic beat. Splitting focus across two exercises dilutes the magic. The eval loop exercise carries both disciplines: convergence happens in the scoring, steering happens in what `./generation-tactic.md` comes to encode across rounds against a fixed judge. The student ends with infrastructure that pairs the M5 judge (fixed, groundedness-aware, reusable) with a generator tactic shaped to their own material's failure modes.

**Strategic close:** Keep the grounded eval loop snappy as the main event. `new-human-role-in-the-loop.md` adds steering eval as a closing prompt: Claude asks questions, offers example dimensions to choose from, keeps asking until the dimension is judgeable, then saves `./goal-nudger-eval.md`. The distinction is floor/ceiling: grounded/fidelity evals keep work attached to evidence, brief, or policy; steering/excellence evals create positive pressure to overperform on a chosen dimension.

**Sources:**
- `[checked:2026-08-23 result:OK due:none]` https://www.oneusefulthing.org/p/the-bitter-lesson-versus-the-garbage — [practitioner direct] Mollick (pub 2025-07-28), framing of bitter-lesson scaling against the organisational "garbage can" problem used in the opener. `due:none` under the Theory-construct variant (Antti, 2026-09-01) — named constructs cited for the question they frame, not for currency, no capability claim; dated check owned by `run-the-first-experiment.md`. fallback: retain the question and remove the named attribution.
- `[checked:2026-08-23 result:OK due:none]` https://arxiv.org/abs/2306.05685 — [primary research, historical concept] Zheng et al.'s MT-Bench paper as the maintainer-only origin reference for LLM-as-judge. fallback: keep the plain "judge agent" term without the research attribution.

**Dependency on M5:** hard. `judges/groundedness-judge.md` must exist on disk as the benchmark winner before this module runs. M5's facilitator closing must name the handoff: *"That judge you just picked — tomorrow it becomes infrastructure."*
