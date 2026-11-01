# Debugging Stuck Agents

Agents get stuck: wrong source, three views averaged into mush, the wrong file written, confident right before a failed handoff.

## Diagnose before repair

Prompt your stuck system to diagnose whether the bug lives in the sources, the processing, or the boundary between agents.

{{prompt:debugging-stuck-agents-1}}

Make your own variant.

## Sources, processing, boundary

1. **Sources:** add the missing file, remove the stale one, split contradictory material so the agent sees the conflict.

2. **Processing:** rewrite the prompt, role, handoff, or output format. Split an agent doing two jobs.

3. **Boundary:** narrow the agent's job, remove the tool, add a human gate, move the risky step from "do" to "propose."

4. **Shrink the rerun:** rerun only the smallest step that should now differ.

5. **Write down the lesson:** add a rule to CLAUDE.md: what to read first, what not to smooth over, which output format to produce, when to stop and ask.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**§6 carve-out, the answer must be theirs (checked 2026-08-20).** Logged in `pre-cohort-todos.md` as a lecture prompt owing the trainer-demo sweep. It is not: it is the recovery move for the multi-agent system the student just watched fail, and the beat ends by having them write the lesson into their own `./CLAUDE.md`. A trainer demo returns the wrong machine's answer. The body now names the student's own stuck system beside the prompt, which is §6's tell. Leave it student-run.


**Slides (2026-09-23, blend § Titles M3):** Two `##` slides, `## Diagnose before repair` over the prompt beat and `## Sources, processing, boundary` over the five moves. The second header names the three places the diagnosis can land; moves 4 and 5 apply to all three.

**Time:** 5 minutes.

**Placement:** Agents 101 Module 3 outro callout/mini-lecture, after `when-to-split-an-agent.md` and before Debrief.

**Strategic role:** Gives students a recovery move after first multi-agent coordination. The module's lesson is not "multi-agent works"; it is "multi-agent systems fail at seams you can inspect and improve."

**Voice target:** numbered practical tips. No grand theory.
