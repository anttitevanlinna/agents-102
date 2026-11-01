# Demo: Agent loop, raw

Ask the agent three questions in your own session. Ask which tools it can use right now.

{{prompt:agent-loop-raw-1}}

Ask how it chooses among those tools.

{{prompt:agent-loop-raw-2}}

Ask how its text becomes an action.

{{prompt:agent-loop-raw-3}}

Read the answers as mechanism. Each tool has a name, a description and an input format. The context makes one description look relevant, and the model writes a structured request. The runtime turns that text into a real tool call, and another system does the work.

A tool call is text crossing a boundary into action. If the tool description is vague, the context misleading or the request aimed at the wrong system, the action inherits the problem. That is why Module 4 cares about boundaries.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Time:** 6 minutes.

**Trainer:** run the three prompts one at a time on the projected session and read each return out loud; the room watches. The self-run invitation lands later in the body, deliberately after the mechanism has been named (`check_lectures.md` §6).

**Role in Module 4:** Short Claude Code demo before the risk lecture. Shows raw agent mechanics: tools available, tool selection via descriptions and schemas, text becoming action through runtime mediation. Keep it live when possible. If runtime answers vary, treat the variance as the lesson: tools are environment-specific, the loop shape is stable.
