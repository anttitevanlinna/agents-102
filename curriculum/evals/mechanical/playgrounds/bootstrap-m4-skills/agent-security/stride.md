# Agent-STRIDE — category definitions

## Spoofing

The agent presents as a trusted party it isn't. In agent systems:
- Memory page cites a source that doesn't exist; appears authoritative.
- Agent writes with a stylistic fingerprint that mimics a named human.
- Subagent output is attributed to "the team" rather than "agent X."

## Tampering

The agent modifies state in ways that stay, and later reads as truth.
- Silent edits to CLAUDE.md that shift rule meanings.
- A memory page that was integrated from one source now reads as if it
  had always said the second source's framing.
- Rules file appended rather than integrated, so old rules linger below
  new ones.

## Repudiation

No audit trail for agent actions.
- Agent wrote a file but no record of which agent / which session /
  which prompt sequence.
- Output ends up in a shared drive with no "authored by agent X" marker.
- Session transcripts deleted or unreachable.

## Information disclosure

Content the agent was told to hold gets revealed.
- Personal note referenced as "a source" and its content paraphrased
  in output.
- Confidential-class file content appearing in a memory-page claim.
- Cross-domain bleed: an agent scoped to challenge A includes material
  from challenge B's memory.

## Denial of service

Agent behaviour locks out the human.
- Infinite regeneration loops, token exhaustion.
- Subagent spawn sprawl — dozens of sessions spun up before the human
  can cancel.
- Memory growth unbounded; every session adds without integration.
- Context-window collapse from too-large files being read every session.

## Elevation of privilege

An agent ends up with more capability than it should.
- Agent invokes a sub-agent that has wider connectors scope.
- Agent writes to paths outside its declared output directory.
- Agent chains through a tool that has implicit permissions the agent
  doesn't carry explicitly.
- Subagent sprawl: agent #1 dispatches agent #2 with broader access
  than agent #1 has.
