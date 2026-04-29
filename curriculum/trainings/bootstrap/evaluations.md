# Evaluations

## Big Idea
The eval that ran once in Module 5 now runs on every output, and the work tightens under it. The judge stays fixed; that's the integrity of the loop. The generator sharpens against feedback the same judge keeps applying. You walk away. You come back to a sharper generator the same yardstick can't fault.

## Prework

**Setup:** Start this module at the training-directory root. Module 6 consumes `judges/groundedness-judge.md` from Module 5, writes run artifacts under `module-6/`, keeps the judge fixed, and sharpens `./generation-tactic.md`.

Ethan Mollick, "Garbage Can and Bitter Lesson." Plus the still-uncertain line you wrote in Module 5 (the thing you flagged a grounded briefing still couldn't reach). That's Module 6's starting point.

## What You'll Learn
After this module, you will be able to:
- **Construct** a self-improving eval loop: the main Claude session runs the loop, generation and judging happen in separate agents, and the judge from Module 5 scores each round unchanged
- **Evaluate** how the generator's tactic sharpens across rounds by reading the tactic changes and final eval notes
- **Create** eval infrastructure that holds the judge fixed and tightens the work under it: on disk, re-runnable, sharper outputs each cycle
- **Distinguish** the one-off judge you picked in Module 5 from one that runs on every output as a fixed yardstick the work tightens against

## Start here
Did you read Ethan Mollick's *The Bitter Lesson versus The Garbage Can*?

His question is the right opener for Module 6: will the bitter lesson apply inside your company? Can agents get better if you define the outcome and let them find the path, or does the organisational mess still matter too much?

Module 5 ended with a winner out of four detectors: the judge that now sits in the judges folder. What gets fed to that judge is the thing that changes at Module 6.

The question shifts at Module 6. What if the work kept getting sharper, not because you edited it, but because the same judge kept catching what slipped past and the system kept absorbing the catches? What if *you weren't in the room* while that happened?

[Lecture: Evals as steering](lectures/evals-as-steering.md)

> We work on text again because text is easy to inspect. The same pattern applies to actions. An agent action starts as text: a proposed mail, a ticket update, a CRM change, a query, a command. Check the proposal before it becomes the action.
>
> Keep adding connectors to your key systems. Some of the biggest wow happens when your agent starts combining insight across systems. Progress from you taking actions the agent proposes, to letting the agent take safe actions itself. Stay safe. Start small. Then scale.

[Exercise: The eval loop runs itself](exercises/eval-loop.md)

[Closing: The new human role in the loop](lectures/new-human-role-in-the-loop.md)

## Key Concepts
- **Eval as infrastructure.** The judge moves from object to live machinery. It's not inspected, it's watched.
- **Role separation.** Generation and judging happen in separate agents. The generator does not grade itself.
- **Walk-away autonomy.** The first true leave-the-chair moment. The system runs; you come back to the notes.
- **The work gets sharper because the judge stays still.** The main session reads what the judge flagged each round and rewrites `./generation-tactic.md`. The judge doesn't move. That's why round 3's score has anything to say about round 1's. A yardstick you rewrite is not a yardstick.
- **Loop ownership.** One session owns the loop: dispatch generator, dispatch judge, update tactic, repeat. The shape the student recognizes from Module 3's fan-out, now running a quality discipline instead of a content discipline.

## Debrief

Five minutes. Claude reviews the eval loop's run and sharpens the generator's tactic file one more time. The evidence is the round-by-round trail: what changed in the tactic, what the judge kept catching, what the tactic never absorbed. Claude reviews, rewrites the tactic in place, reports what changed. The judge file stays untouched. That's the integrity of the loop. You push back on anything that's off.

Ask Claude to read the round trail and sharpen the generator's tactic beyond what the loop reached.

**Prompt** *(Claude Code)*

```
Review this session and sharpen the generator's tactic beyond what the loop reached. Read ./generation-tactic.md in its current state, then scan module-6/runs/ and module-6/eval-notes.md. The judge file at judges/groundedness-judge.md did not move; that is the integrity of the loop. Look back over the session: which tactic change helped, which one did not help and should be removed or rewritten, what specific boundary case did the loop never test, where did the generator keep missing the same thing across multiple rounds, and what did the judge flag that the tactic never absorbed?

Then rewrite ./generation-tactic.md. Integrate, don't append. Add the tactic rule the loop never reached, sharpen a rule that stayed too vague, remove a rule that fired on the wrong thing. The tactic file is infrastructure now. Every rule should name the failure class it pre-empts. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: what you added, what you sharpened, what you removed, and why, grounded in specific rounds. Name one boundary case the next run should test.
```


Read Claude's summary. Push back where it's wrong. *"That rule is too vague, make it observable"* / *"you added a rule the tactic already had after round 2."* The artifact: the sharpened `./generation-tactic.md` plus one line added to the Module 6 eval-notes file naming the first always-on eval you'll run when work resumes. This is the module's thesis made literal. The work got sharper across rounds because the same judge kept catching the same kinds of misses and the tactic kept absorbing them.

## Next
You just built an eval that improves itself. The system can now keep pressure on its own output when you are not watching every step. The close is not "trust the agent." The close is "trust the loop you can inspect."

## Homework after Module 6

Glance through [What is an Agent](supplementary/what-is-an-agent.md) end to end. The words should now point at things you have actually built: context, memory, tools, other agents, boundaries, judges, loops, and autonomy rungs.

Use [Agent Trigger List](supplementary/agent-trigger-list.md) to make Monday's first five agent calls explicit. Pick one call that should run through the eval loop before anyone relies on it, and write the trigger into your working notes.

<!-- maintainer -->

**Quality:** draft 2026-04-29 (maintainer contract incomplete; needs compendium audit, sim, and mechanical test)

**Meta (trainer):**
- **Primary Bloom's level:** Create
- **Materials (trainer):** `judges/groundedness-judge.md` handoff from Module 5's benchmark winner. Pre-flight capability check on generation/judging agent separation and tactic rewrite reliability.
- **Plug points:** the topic for the generation run (defaults to the Module 3 system's primary output); starting tactic; number of rounds.

**Plug Points (trainer):**
- **Topic for the generation run.** Default: the Module 3 system's primary output. The student has been working this memory all week; the eval loop bites on real material.
- **Starting tactic.** Default minimal. Regulated-industry cohorts may seed 2-3 non-negotiable rules.
- **Number of rounds.** Default 3. Compressed variants may use 2, but the trajectory is thinner.
- **Walk-away duration.** Default 25-30 min. Compressed variants trim to 15 min + 2 rounds; note this costs some of the mood.

**Mood contract:** unleashed leverage — *"we can automate the loop."* The walk-away window + notes-on-return are load-bearing. Do not let the student sit through the whole run.

**Supersedes:** the previous M6 split across a manual groundedness loop and a separate steering exercise. The manual loop violated the "agents do the heavy lifting" rule from M2 onward by feeding judge output back to generator by hand. The new exercise automates the groundedness loop. Steering stays as a closing prompt, not a second full exercise.

**Why one exercise, not two:** M6 is the core arc's closing magic beat. Splitting focus across two exercises dilutes the magic. The eval loop exercise carries both disciplines: convergence happens in the scoring, steering happens in what `./generation-tactic.md` comes to encode across rounds against a fixed judge. The student ends with infrastructure that pairs the M5 judge (fixed, groundedness-aware, reusable) with a generator tactic shaped to their own material's failure modes.

**Strategic close:** Keep the grounded eval loop snappy as the main event. `new-human-role-in-the-loop.md` adds steering eval as a closing prompt: Claude asks questions, offers example dimensions to choose from, keeps asking until the dimension is judgeable, then saves `./goal-nudger-eval.md`. The distinction is floor/ceiling: grounded/fidelity evals keep work attached to evidence, brief, or policy; steering/excellence evals create positive pressure to overperform on a chosen dimension.

**Capability checks owed (before first delivery):** see `exercises/eval-loop.md` maintainer section: generation/judging agent separation, file-write reliability, judge immutability, and tactic rewrite reliability.

**Source-verification owed (pre-first-cohort):**
- Ethan Mollick, "Garbage Can and Bitter Lesson" — add URL to the One Useful Thing post.
- LLM-as-judge canonical reference (Zheng et al., MT-Bench 2023) — maintainer-only cite for facilitator prep if asked in-room where the term comes from.

**Dependency on M5:** hard. `judges/groundedness-judge.md` must exist on disk as the benchmark winner before this module runs. M5's facilitator closing must name the handoff: *"That judge you just picked — tomorrow it becomes infrastructure."*
