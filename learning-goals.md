# Agents 102 — Learning Goals

## What Graduates Should Be Able To Do

After this training, participants should be able to design, build, and manage real agent systems that create ongoing value in their organization. Not toy demos — working systems they'd stake their reputation on.

## Example Projects (Ambition Level)

These illustrate the kind of projects graduates should be able to take on. Not assignments — real things they'd build for their teams.

1. **Agentic Competitor Research System** — A system that runs periodically, gathers competitive intelligence from multiple sources, synthesizes findings, and delivers structured updates. Not a one-shot report — an ongoing, automated intelligence operation.

2. **Multi-Step Generative Pipeline** — Takes authoritative source material (market data, research, internal docs) and transforms it through multiple agent steps into a finished work product like a product strategy, board memo, or market analysis. Each step adds structure, judgment, and refinement.

3. **Strategy-Informed Generation** — Agents that apply established strategic frameworks (e.g., Playing to Win, Jobs to Be Done, Porter's Five Forces) as part of their generation process. Not just summarizing — actually reasoning through frameworks to produce strategically grounded output.

4. **Agent-Updated Internal Site** — An internal knowledge site or dashboard that agents keep current. Agents monitor sources, update content, flag changes, and maintain a living resource without manual intervention.

5. **Internal GPT/Claude Project with Evals** — A custom AI assistant scoped to organizational needs, with built-in evaluation checks that measure output quality systematically. Not just "it works" but "we know it works because we measure it."

## The Reality Check

Every one of these projects is buildable today, by one person, without a team of engineers.

The tooling is simple and accessible right now:
- **Claude Code** — for creating the agents themselves
- **GitHub Actions** — for running agents on a schedule
- **n8n** — for orchestrating agent workflows with triggers and integrations
- **Claude Code SDK (headless)** — for running agents programmatically, no UI needed

This is not a vision statement. A solopreneur with these tools and enough time could build all five example projects. That's the point. The barrier to building real agent systems has collapsed — most people just haven't realized it yet.

The training doesn't teach something theoretical that might work someday. It teaches what is already possible, with tools that exist, for people willing to start.

## Underlying Capabilities

These projects require a set of core capabilities. These are the actual learning goals:

### Design & Architecture
- Decompose a business problem into agent-solvable steps
- Design multi-step agent pipelines where each step has a clear purpose
- Choose when to use a single agent vs. multi-agent coordination
- Define agent boundaries: what the agent does, what it doesn't, when it escalates

### Building & Implementation
- Create agents using Claude Code and related tools
- Give agents effective instructions, tools, and constraints
- Connect agents to real data sources and APIs
- Build periodic/scheduled agent workflows (not just one-shot)
- Integrate strategic frameworks and domain knowledge into agent behavior

### Quality & Reliability
- Design and implement evals that catch fabrication and quality problems
- Build feedback loops: agent output → evaluation → improvement
- Know the difference between "looks good" and "is verified"
- Set up systematic quality measurement, not just spot-checking

### Security & Trust
- Identify trust boundaries in an agent system
- Prevent common risks: prompt injection, data leakage, unintended actions
- Design agents that are safe to give real access to real systems

### Lifecycle & Operations
- Deploy agents that run continuously or on schedule
- Monitor agent performance over time
- Know when and how to update, retrain, or retire an agent
- Manage the organizational side: ownership, accountability, governance

### Scaling & Multiplication
- Explain what agents are and why they matter — without jargon
- Identify high-value agent opportunities in any business domain
- Guide others through building their first agent
- Create the conditions for agents to improve themselves (the flywheel)

## The Standard

A graduate doesn't need to be a software engineer. But they need to be able to:

- **Describe** what an agent system should do, with enough precision that it can be built
- **Build** a working agent for a real use case, using tools like Claude Code
- **Evaluate** whether an agent's output is trustworthy, using systematic methods
- **Operate** an agent system beyond the demo stage — in production, with real stakes
- **Multiply** — teach someone else to do the same
