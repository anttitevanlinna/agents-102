# Evaluations

## Big Idea
The eval that ran once in Module 5 now runs on every output, and the work tightens under it. The judge stays fixed; that's the integrity of the loop. The generator sharpens against feedback the same judge keeps applying. You walk away. You come back to a sharper generator the same yardstick can't fault.

## Prework

[Ethan Mollick, *The Bitter Lesson versus The Garbage Can*](https://www.oneusefulthing.org/p/the-bitter-lesson-versus-the-garbage). Walk in with the judge you saved at the close of Module 5. That's Module 6's starting point.

## What You'll Learn
After this module, you will be able to:
- **Build** a self-improving eval loop: main session runs it, generation and judging happen in separate agents, the Module 5 judge scores each round unchanged
- **Read** how the generator's tactic sharpens across rounds in the tactic changes and final eval notes
- **Create** eval infrastructure that holds the judge fixed and tightens the work under it: on disk, re-runnable, sharper outputs each cycle
- **Distinguish** the one-off Module 5 judge from one that runs on every output, the fixed yardstick the work tightens against

## Start here

Start a fresh <span class="rt-code">Claude Code session</span><span class="rt-cowork">Cowork task</span> at `~/Documents/agents-101/`.

Did you read Ethan Mollick's [*The Bitter Lesson versus The Garbage Can*](https://www.oneusefulthing.org/p/the-bitter-lesson-versus-the-garbage)?

His question is the right opener for Module 6: will the bitter lesson apply inside your company? Can agents get better if you define the outcome and let them find the path, or does the organisational mess still matter too much?

Module 5 ended with a winner out of four detectors: the judge that now sits in the judges folder. What gets fed to that judge is the thing that changes at Module 6.

## Run the loop without you in it

The question shifts at Module 6. What if the work kept getting sharper, not because you edited it, but because the same judge kept catching what slipped past and the system kept absorbing the catches? What if *you weren't in the room* while that happened?

[Lecture: Evals as steering](lectures/evals-as-steering.md)

> Text is easy to inspect, so this module uses it again. The same pattern applies to actions. An agent action starts as text: a proposed mail, a ticket update, a CRM change, a query, a command. Check the proposal before it becomes the action.

[Exercise: The eval loop runs itself](exercises/eval-loop.md)

[Lecture: When the score stops moving](lectures/when-the-score-stops-moving.md)

[Closing: The new human role in the loop](lectures/new-human-role-in-the-loop.md)

## Debrief

Five minutes. Claude reviews the eval loop's run and sharpens the generator's tactic file one more time. The evidence is the round-by-round trail: what changed in the tactic, what the judge kept catching, what the tactic never absorbed. Claude reviews, rewrites the tactic in place, reports what changed. The judge file stays untouched. That's the integrity of the loop. You push back on anything that's off.

Ask Claude to read the round trail and sharpen the generator's tactic beyond what the loop reached.

{{prompt:a101-m6-debrief-tactic-sharpen}}


## Push back on the summary

Read Claude's summary. Push back where it's wrong. *"That rule is too vague, make it observable"* / *"you added a rule the tactic already had after round 2."* The artifact: the sharpened `./generation-tactic.md` plus one line added to the Module 6 eval-notes file naming the first always-on eval you'll run when work resumes. This is the module's thesis made literal. The work got sharper across rounds because the same judge kept catching the same kinds of misses and the tactic kept absorbing them.

This is Claude auditing a tactic it helped sharpen. That is acceptable here because the round files and judge notes are the evidence. If the summary sounds too kind, ask the sharper follow-up: *"Which rule did you claim to remove but actually kept under another name? Quote both lines."*

## Key Concepts
- Groundedness protects the floor; steering raises the ceiling.
- The judge stays fixed and separate from the generator; that is why the score means anything.
- A flat score is information about the judge, not the work.
- You design the loop; you no longer sit inside it.

## Bring to Module 7

**Monday's first five agent calls, written down**, using [Agent Trigger List](../../trainings/agents-101/supplementary/agent-trigger-list.md). Pick one call that should run through the eval loop before anyone relies on it, and write the trigger into your working notes. Module 7 is about handing work to other people, and it needs real calls to hand over.

Come to Module 7 without five real agent calls and you'll be inventing a handoff while the sharing exercise is already underway. Your call.

The [Cookbook for Agent System Design](../../trainings/agents-101/supplementary/cookbook-for-agent-system-design.md) is an optional practitioner reference after this module. Eight recipes map to the modules you ran. Three canonical dishes show recipe composition in production. When the next Monday-shaped problem lands, this is where the moves live without the training scaffolding around them.

Keep [What is an Agent](../../trainings/agents-101/supplementary/what-is-an-agent.md) as an optional lookup. Its words now point at things you have actually built: context, memory, tools, other agents, boundaries, judges, loops, and autonomy rungs. Neither document is Module 7 prework; the single access-without-use example is the whole load.

Once the trigger is written, end this module's <span class="rt-code">session</span><span class="rt-cowork">task</span>; Module 7 starts fresh at `~/Documents/agents-101/`.

## Next
You just built an eval that improves itself. The system can now keep pressure on its own output when you are not watching every step. The close is not "trust the agent." The close is "trust the loop you can inspect."

<!-- maintainer -->
**Key Concepts minimal (2026-09-24, Antti-directed).** A glance list of handles, nothing born here: every law on it is earned in the lecture that follows the exercise, `evals-as-steering.md`, `when-the-score-stops-moving.md` and `new-human-role-in-the-loop.md`.


**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@4d9c4af2 slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @12bf0d81: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,personal-to-team,agents-building-agents]

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
