# Debugging Stuck Agents

Agents get stuck: wrong source, three views averaged into mush, the wrong file written, confident right before a failed handoff.

## Diagnose before repair

Ask the stuck system to diagnose where the problem is: in the sources, in the processing, or at the boundary between agents.

{{prompt:debugging-stuck-agents-1}}

Adapt the prompt to your own system.

## Sources, processing, boundary

1. **Sources:** add the missing file, remove the stale one, split contradictory material so the agent sees the conflict.

2. **Processing:** rewrite the prompt, role, handoff, or output format. Split an agent doing two jobs.

3. **Boundary:** narrow the agent's job, remove the tool, add a human gate, move the risky step from "do" to "propose."

4. **Shrink the rerun:** rerun only the smallest step that should now differ.

5. **Have the agent write the lesson:** a rule for the root instructions file on what to read first, what not to smooth over, which output format to produce, and when to stop and ask.

<!-- maintainer -->

**Quality:** compendium-audited 2026-11-26 (writing@78d17fc9 story@78d17fc9 technical@78d17fc9 behavior@725101ec pedagogy@78d17fc9 strategy@78d17fc9 slides@78d17fc9)
- judges @78d17fc9: writing PASS (1 finding see instances/agents-101--lecture--debugging-stuck-agents.writing.json), story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**§6 carve-out, the answer must be theirs (checked 2026-08-20).** Logged in `pre-cohort-todos.md` as a lecture prompt owing the trainer-demo sweep. It is not: it is the recovery move for the multi-agent system the student just watched fail, and the beat ends by having them write the lesson into their own `./CLAUDE.md`. A trainer demo returns the wrong machine's answer. The body now names the student's own stuck system beside the prompt, which is §6's tell. Leave it student-run.


**Slides (2026-09-23, blend § Titles M3):** Two `##` slides, `## Diagnose before repair` over the prompt beat and `## Sources, processing, boundary` over the five moves. The second header names the three places the diagnosis can land; moves 4 and 5 apply to all three.

**Time:** 5 minutes.

**Placement:** Agents 101 Module 3 outro callout/mini-lecture, after `when-to-split-an-agent.md` and before Debrief.

**Strategic role:** Gives students a recovery move after first multi-agent coordination. The module's lesson is not "multi-agent works"; it is "multi-agent systems fail at seams you can inspect and improve."

**Voice target:** numbered practical tips. No grand theory.
