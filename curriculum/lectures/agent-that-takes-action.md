# Demo: Agent that takes action

In Module 2, the scheduled agent read context and wrote an output inside the training folder. Now it runs again with one new permission: post one message to a demo Slack channel.

The action is deliberately small. The channel is a demo channel. The message contains no customer data, no private names, no commitments, and no decision. The agent writes the exact message first and sends only after approval. If the channel is missing or the message needs judgment, the agent stops.

Writing a file changes your folder. Sending to Slack changes another system. Same agent, same context, same schedule, one new boundary.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Time:** 5 minutes.

**Role in Module 3:** Short trainer demo before the first exercise. Re-runs the Module 2 scheduled-agent shape with one external action: send a low-stakes Slack message to a trainer-owned demo channel. Keep the action tiny and pre-approved. If Slack is unavailable, use the customer's equivalent team-chat demo channel only if the same guardrails hold; otherwise show a recorded run and keep the lesson on action boundary.
