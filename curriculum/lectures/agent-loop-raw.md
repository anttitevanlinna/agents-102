# Demo: Agent loop, raw

Before the security loop, look at the agent loop without polish.

The raw loop takes three plain questions. No special setup. No hidden vocabulary. Just the model explaining how it sees its own working surface.

Ask these one at a time:

{{prompt:agent-loop-raw-1}}

{{prompt:agent-loop-raw-2}}

{{prompt:agent-loop-raw-3}}

Read the answers as mechanism, not magic. The model has a tool list. Each tool comes with a name, description, and input shape. The prompt and context make one description look relevant. The model writes a structured request. The runtime turns that text into a real tool call. Another system reads the call and does the work.

That is why Module 4 cares about boundaries. A tool call is not a new species of work. It is text crossing a boundary into action. If the tool description is vague, the context is misleading, or the request is pointed at the wrong system, the action inherits the problem.

You can try the same three prompts in your own session. The goal is not to memorize the exact answer. The goal is to see the loop in the open: context, tool choice, textual command, runtime action, result back to the agent.

<!-- maintainer -->

**Quality:** draft 2026-04-30

**Time:** 4-6 minutes.

**Role in Module 4:** Short Claude Code demo before the risk lecture. Shows raw agent mechanics: tools available, tool selection via descriptions and schemas, text becoming action through runtime mediation. Keep it live when possible. If runtime answers vary, treat the variance as the lesson: tools are environment-specific, the loop shape is stable.
