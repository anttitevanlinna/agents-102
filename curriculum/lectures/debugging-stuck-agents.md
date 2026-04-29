# Debugging Stuck Agents

Agents get stuck. They use the wrong source. They average three views into mush. They write the file you asked for, but not the one the next agent needed. They sound confident right before the handoff fails.

Do not start by tracing everything by hand.

Start by prompting the system to find the root cause.

**Prompt** *(Claude Code)*

```
Find the root cause of this bug.

Read the relevant files and the recent session context. Tell me whether the failure is mainly:
1. a source problem: missing, stale, contradictory, or unread evidence
2. a processing problem: wrong prompt, wrong role, bad handoff, vague output shape, or synthesis that averaged away disagreement
3. a boundary problem: the agent tried to use data, tools, or authority it should not have had

Do not fix anything yet. Show me the failure chain in 5 bullets: what happened, where it started, where it became visible, what file or prompt caused it, and the smallest fix that would prevent the next run.
```

This is rather long. Make your own variant. The important move is not the wording; it is asking Claude to diagnose whether the bug lives in the sources, the processing, or the boundary before you start fixing things.

Then use the answer.

1. **If it is the sources, fix the sources.** Add the missing file. Remove the stale one. Split contradictory material so the agent can see the conflict instead of smoothing it. Do not write a cleverer prompt to compensate for bad ground.

2. **If it is the processing, fix the processing.** Rewrite the prompt, the role, the handoff, or the output shape. If one agent was doing two jobs, split it. If three agents were pretending to be different, collapse them.

3. **If it is the boundary, fix the boundary.** Narrow the agent's job. Remove the tool. Add a human gate. Move the risky step from "do" to "propose."

4. **Shrink the rerun.** Do not rerun the whole system first. Rerun the smallest step that should now behave differently: one retriever, one stance, one synthesis, one file.

5. **Write down the lesson.** If the same failure could happen again, add a rule to `./CLAUDE.md`: what to read first, what not to smooth over, what file shape the next agent must produce, or when to stop and ask.

The habit is simple: prompt for diagnosis before repair.

The agent is part of the debugging loop too.

<!-- maintainer -->

**Placement:** Bootstrap Module 3 outro callout/mini-lecture, after `when-to-split-an-agent.md` and before Debrief.

**Strategic role:** Gives students a recovery move after first multi-agent coordination. The module's lesson is not "multi-agent works"; it is "multi-agent systems fail at seams you can inspect and improve."

**Voice target:** numbered practical tips. No grand theory.
