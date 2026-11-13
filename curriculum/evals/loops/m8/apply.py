#!/usr/bin/env python3
"""apply.py <checkout> <variant>: M8 Big Idea alignment variants (agents-building-agents thread, 2026-11-13).
Exact (old, new) pairs; a miss fails loudly."""
import sys, pathlib
root = pathlib.Path(sys.argv[1]) / "curriculum"; v = sys.argv[2]
MOD = "trainings/agents-101/agents-building-agents.md"; LEC = "lectures/where-is-this-all-going.md"; EX = "exercises/extend-your-system.md"
A = [
 (MOD, "- **Describe** a new agent and have your agent build it into your system", "- **Describe** a new agent and have an agent build it into your system"),
 (MOD, "Your agent can build agents. Describe the agent you want: the gap, what it reads, what it writes. Your agent writes the instructions, runs the new agent, and fixes it when you push back.\n\nYour agent builds as far as you can describe the job and judge the result.",
       "An agent can build agents. Describe the agent you want: the gap, what it reads, what it writes. It writes the instructions, runs the new agent, and fixes it when you push back.\n\nIt shares its parts with every agent it builds, so each one you describe makes the next one quicker."),
 (MOD, "The three moves run again at room scale on the sponsor challenge.", "The room's agents improve each other's proposals on the sponsor challenge, using the three moves."),
 (MOD, "- Describe the agent; the coding agent builds it.", "- Describe an agent and an agent builds it."),
 (MOD, "- What multiplies your work is how fast you learn, not how many agents you own.", "- The tool that builds tools compounds: each agent makes the next one quicker."),
 (MOD, "Every improvement your agents make is learning that compounds.", "Every agent your agents build or improve makes the next one quicker to build."),
 (LEC, "Your coding agent assembles them from your description.\n\nYour coding agent is itself an agent, so the builder sharpens its own tools.", "An agent assembles them from your description.\n\nThe agent that assembles them is itself an agent, so it can sharpen its own tools."),
 (LEC, "Your agent builds it; you test it on your own work", "An agent builds it; you test it on your own work"),
 (EX, "You describe an agent; your agent builds it.", "You describe an agent; an agent builds it."),
]
B = [x for x in A if not x[1].startswith("Your agent builds it; you test")] + [
 (LEC, "Your agent builds it; you test it on your own work", "An agent builds it, and you test it on your own work"),
 (LEC, "The same loop can improve the agent that improves your agents, as long as the judge stays out of its reach. The SHA check in Module 6 was that rule.", "The same loop can improve the agent that improves your agents. Every agent it builds after that starts from a better builder."),
 (LEC, "Agents that improve agents speed up that learning as far as a check measures it.", "Agents that improve agents speed it up: each fix makes the next agent quicker to build."),
]
FOR = "exercises/joint-double-diamond.md"; SL = "slides/learn-faster-than-the-model.md"
C = A + [
 (FOR, "keeps the rejected alternatives. Pushback rounds were the work.", "keeps the rejected alternatives. Agents improved each other's work in every pushback round."),
 (SL, "gets better only when somebody writes it down and somebody else picks it up.", "gets better only when somebody writes it down and an agent builds on it."),
]
D = C + [
 (MOD, "How far this goes depends on how fast you and your organisation learn.", "How far this goes depends on how fast your agents improve your agents."),
 (LEC, "What multiplies your work is how fast you and your organisation learn. Agents that improve agents speed up that learning as far as a check measures it.", "What multiplies your work is how fast your agents improve your agents, and how fast your organisation learns from it."),
]
VARIANTS = {"v1": A, "v2": B, "v3": C, "v4": D}
for f, old, new in VARIANTS[v]:
    p = root / f; t = p.read_text()
    if t.count(old) != 1: sys.exit(f"miss in {f}: {old[:60]}")
    p.write_text(t.replace(old, new))
print(f"[m8 apply] {v}")
