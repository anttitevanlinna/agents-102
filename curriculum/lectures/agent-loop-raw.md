# Demo: Agent loop, raw

Ask your agent three questions. First, ask which tools it can use right now.

{{prompt:agent-loop-raw-1}}

Then ask how it chooses among those tools.

{{prompt:agent-loop-raw-2}}

Then ask how its text becomes an action.

{{prompt:agent-loop-raw-3}}

The answers describe one mechanism. Each tool has a name, a description and an input format. The model picks the tool whose description fits the context and writes a structured request. The runtime turns that request into an action, and the tool does the work.

A tool call is text that becomes an action. If the tool description is vague, the context is misleading or the request goes to the wrong system, the action is wrong in the same way.

<!-- maintainer -->

**Quality:** compendium-audited 2026-11-26 (writing@78d17fc9 story@78d17fc9 technical@78d17fc9 behavior@725101ec pedagogy@78d17fc9 strategy@78d17fc9 slides@78d17fc9)
- judges @78d17fc9: writing PASS (2 findings see instances/agents-101--lecture--agent-loop-raw.writing.json), story PASS (1 finding see instances/agents-101--lecture--agent-loop-raw.story.json), technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Time:** 6 minutes.

**Trainer:** run the three prompts one at a time on the projected session and read each return out loud; the room watches. The self-run invitation lands later in the body, deliberately after the mechanism has been named (`check_lectures.md` §6).

**Role in Module 4:** Short Claude Code demo before the risk lecture. Shows raw agent mechanics: tools available, tool selection via descriptions and schemas, text becoming action through runtime mediation. Keep it live when possible. If runtime answers vary, treat the variance as the lesson: tools are environment-specific, the loop shape is stable.
