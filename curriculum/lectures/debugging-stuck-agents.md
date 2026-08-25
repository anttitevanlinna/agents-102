# Debugging Stuck Agents

Agents get stuck. They use the wrong source. They average three views into mush. They write the file you asked for, but not the one the next agent needed. They sound confident right before the handoff fails.

Do not start by tracing everything by hand.

Start by prompting your own stuck system to find the root cause.

{{prompt:debugging-stuck-agents-1}}

This is rather long. Make your own variant. The important move is not the wording; it is asking Claude to diagnose whether the bug lives in the sources, the processing, or the boundary before you start fixing things.

Then use the answer.

1. **If it is the sources, fix the sources.** Add the missing file. Remove the stale one. Split contradictory material so the agent can see the conflict instead of smoothing it. Do not write a cleverer prompt to compensate for bad ground.

2. **If it is the processing, fix the processing.** Rewrite the prompt, the role, the handoff, or the output shape. If one agent was doing two jobs, split it. If three agents were pretending to be different, collapse them.

3. **If it is the boundary, fix the boundary.** Narrow the agent's job. Remove the tool. Add a human gate. Move the risky step from "do" to "propose."

4. **Shrink the rerun.** Do not rerun the whole system first. Rerun the smallest step that should now behave differently: one retriever, one stance, one synthesis, one file.

5. **Write down the lesson.** If the same failure could happen again, add a rule to `./CLAUDE.md`: what to read first, what not to smooth over, what file shape the next agent must produce, or when to stop and ask.

Start with diagnosis before repair. That's the habit.

The agent is part of the debugging loop too.

<!-- maintainer -->

**§6 carve-out, the answer must be theirs (checked 2026-08-20).** Logged in `pre-cohort-todos.md` as a lecture prompt owing the trainer-demo sweep. It is not: it is the recovery move for the multi-agent system the student just watched fail, and the beat ends by having them write the lesson into their own `./CLAUDE.md`. A trainer demo returns the wrong machine's answer. The body now names the student's own stuck system beside the prompt, which is §6's tell. Leave it student-run.


**Time:** 5 minutes.

**Placement:** Agents 101 Module 3 outro callout/mini-lecture, after `when-to-split-an-agent.md` and before Debrief.

**Strategic role:** Gives students a recovery move after first multi-agent coordination. The module's lesson is not "multi-agent works"; it is "multi-agent systems fail at seams you can inspect and improve."

**Voice target:** numbered practical tips. No grand theory.

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
