# Demo: Agent that takes action

Same agent, second boundary.

In Module 2, the scheduled agent read context and wrote an output inside the training folder. Now it runs again with one new permission: post one message to a demo Slack channel.

This is still text work. The prompt is text. The guardrail is text. The proposed Slack message is text. The difference is that this text can now leave the folder and make another system do something.

The action is deliberately small. The channel is a trainer-owned demo channel. The message contains no customer data, no private names, no commitments, and no decision. The agent writes the exact message first, the trainer says go, and the agent sends that message. If the channel is missing or the message needs judgment, the agent stops.

That is the difference between an output and an action. Writing a file changes your folder. Sending to Slack changes another system. Same agent, same context, same schedule, one new boundary.

Module 3 now asks the next question: if one agent can act, what changes when several agents split the work?

**Time:** 3-5 minutes.

<!-- maintainer -->

**Quality:** draft 2026-04-30

**Role in Module 3:** Short trainer demo before the first exercise. Re-runs the Module 2 scheduled-agent shape with one external action: send a low-stakes Slack message to a trainer-owned demo channel. Keep the action tiny and pre-approved. If Slack is unavailable, use the customer's equivalent team-chat demo channel only if the same guardrails hold; otherwise show a recorded run and keep the lesson on action boundary.
