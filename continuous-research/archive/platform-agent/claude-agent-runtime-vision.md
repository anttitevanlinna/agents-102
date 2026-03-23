# The Missing Runtime: What Claude Code-Level Agents Actually Need

*Research synthesis, February 2026. Grounded in what Anthropic, AWS, Microsoft, Google, Cloudflare, and LangChain have actually shipped -- not speculative roadmaps.*

---

## The Gap

Claude Code is the most capable autonomous agent in production today. It runs a single-threaded master loop -- `while(tool_call) -> execute tool -> feed results -> repeat` -- enhanced with real-time steering, 18 built-in tools, subagent orchestration, automatic context compaction, and file checkpointing. It operates in multi-turn sessions spanning hundreds of tool calls, backtracks when approaches fail, manages its own TODO lists, compresses its context when approaching limits, and delegates parallel work to subagents with isolated context windows. With the experimental Agent Teams feature (shipped with Opus 4.6), it can coordinate 16+ concurrent agent instances working on different parts of the same problem.

Nothing can host this at scale.

The gap is specific and measurable. Claude Code runs on your laptop. It uses your filesystem, your shell, your git. The agent *is* the runtime -- there is no separation between the reasoning engine and its execution environment. This is what makes it powerful and what makes it impossible to operationalize. You cannot put 50 Claude Code instances in a Kubernetes cluster, give each one a sandboxed filesystem, route MCP tool calls across a network, persist their state across days of work, observe their decisions, enforce budget limits, and coordinate their outputs. Not today. Not with any single platform.

The cloud providers are building pieces of this. Bedrock AgentCore offers microVM isolation and 8-hour execution windows. Azure Foundry provides managed memory and multi-agent workflows. Cloudflare has Durable Objects for stateful agents. LangGraph has durable execution with checkpointing. But none of them were designed for an agent that reasons like Claude Code -- one that autonomously plans, backtracks, manages its own context, and produces artifacts over extended sessions. They were designed for LLM pipelines: request in, response out, maybe with some tool calls in between.

The distance between "run a Claude agent that calls a few tools" and "run a Claude Code-level autonomous agent in production" is the story of what needs to be built next.

---

## What Exists Today

### The Claude Agent SDK

The Claude Agent SDK (renamed from Claude Code SDK in September 2025) is an open-source, production-grade framework that exposes the same infrastructure powering Claude Code as a programmable library. It provides:

- **The agent loop.** The core `while(tool_call)` pattern with automatic tool execution, result feeding, and continuation. Not a DAG, not a workflow -- a genuine reasoning loop where the model decides what to do next based on everything it has observed so far.

- **Subagent orchestration.** First-class support for spawning subagents with isolated context windows. Subagents serve two purposes: parallelization (multiple subagents working different tasks simultaneously) and context isolation (each subagent processes information in its own window and returns only relevant findings to the orchestrator). Anthropic's own research system uses this pattern -- Claude Opus 4 as lead researcher with Sonnet 4 subagents -- and demonstrated 90%+ improvement over single-agent approaches, with gains strongly linked to the ability to spread reasoning across multiple independent context windows.

- **Session management.** Session creation, resumption, and forking. When you resume a session, the SDK loads conversation history and context so the agent continues where it left off. You can also fork sessions -- creating new branches from a resumed state -- enabling exploration of different approaches from the same checkpoint.

- **File checkpointing.** The SDK creates backups of files before modification, allowing programmatic restoration to any previous state in the conversation.

- **MCP extensibility.** Native integration with Model Context Protocol servers for tool access, enabling agents to discover and use tools dynamically.

### Claude Code's Internal Architecture

Understanding what a runtime needs to support requires understanding how Claude Code actually works. Reverse engineering efforts and Anthropic's own documentation reveal a system operating on three layers:

1. **System-level behavior modification.** CLAUDE.md files, output style controls, and project-level instructions that shape agent behavior across all interactions.

2. **Message-level content injection.** Slash commands, skills, and contextual system messages injected between turns. After each tool use, the system injects the current TODO list state, preventing the model from losing track of objectives in long conversations.

3. **Conversation-level delegation.** Three subagent types (Plan, Explore, Task) that handle different modes of work. The system prompt instructs the agent to use the Task tool with `subagent_type=Explore` for codebase exploration rather than running search commands directly, keeping the main context window clean.

**Context compaction** is the critical mechanism for long sessions. When the context window reaches approximately 92% capacity, the Compressor triggers automatic summarization. The message history is summarized while preserving critical state -- architectural decisions, unresolved bugs, implementation details, and the five most recently accessed files. This is what enables sessions spanning hundreds of tool calls without losing coherence.

**The tools are deliberately minimal.** Claude Code ships with 18 built-in tools, not 80 specialized ones. Anthropic chose regex-based search (GrepTool) over vector databases or embeddings -- the model already understands code structure well enough to craft sophisticated regex patterns, eliminating the complexity of maintaining search indices. This design philosophy -- few powerful primitives over many narrow tools -- is itself an architectural statement about what agent runtimes should optimize for.

### Container Hosting Patterns

Anthropic's hosting documentation defines three patterns for running agents in production:

1. **Ephemeral containers per task.** Spin up a container, run the agent, destroy it when done. Best for one-off tasks where the user may interact while work completes, but nothing persists after completion.

2. **Persistent containers.** Long-running container instances, often running multiple Claude Agent processes based on demand. Best for proactive agents that act without user input, serve content, or process high message volumes.

3. **Stateful ephemeral containers (hydrated ephemeral).** Ephemeral containers that are hydrated with history and state from a database or the SDK's session resumption features. Best for intermittent interaction patterns -- spin up when needed, spin down when idle, resume with full context later. This is the pattern most relevant to Claude Code-level agents.

For security and isolation, Anthropic recommends sandboxed container environments providing process isolation, resource limits, network control, and ephemeral filesystems.

### The Long-Running Agent Harness

Anthropic's engineering blog post on "Effective harnesses for long-running agents" addresses the central challenge: complex projects cannot be completed within a single context window. Their solution decomposes the problem into two specialized agents:

- **Initializer agent.** Runs only in the first session. Creates foundational infrastructure: an `init.sh` script, a `claude-progress.txt` file (session-to-session log of completed work), an initial git commit as baseline, and a comprehensive feature list (JSON format) expanding the user's high-level prompt into hundreds of specific, testable requirements.

- **Coding agent.** Runs in every subsequent session. Its first actions: `pwd` to orient, read git logs and progress files to understand recent work, read the features list, and choose the highest-priority incomplete feature. Each session ends by updating `claude-progress.txt` and committing to git.

This pattern -- file-based state persistence between context windows, with structured artifacts that new sessions can rapidly ingest -- is the closest thing to a production architecture for long-running Claude agents. It is also entirely manual. There is no platform that automates this harness.

### Agent Teams (Experimental)

Shipped with Opus 4.6, Agent Teams allow coordinating multiple Claude Code instances with one session as team lead. Unlike subagents (which run within a single session and report back), teammates work independently with their own context windows and can communicate directly with each other. Users can interact with individual teammates without going through the lead.

In a stress test, 16 agents produced a 100,000-line Rust-based C compiler across nearly 2,000 sessions. But the feature carries known limitations: session resumption does not restore in-progress teammates, only one team per session, and no nested teams. These limitations map directly to missing runtime infrastructure.

---

## The Architecture of a Real Agent Runtime

What follows is derived from what Claude Code actually does in practice -- the requirements of a runtime that could host agents of this caliber, not theoretical capabilities.

### 1. Session Persistence Across Context Windows

Claude Code agents work across many context windows. The current approach -- `claude-progress.txt` plus git history -- is effective but manual. A real runtime would make this a first-class primitive:

- **Automatic state serialization** between context windows, preserving not just conversation history but structured state: TODO lists, decisions made, files modified, approaches tried and abandoned.
- **Rapid rehydration** when a new session begins, so the agent can orient in seconds rather than spending 10-15% of each new context window reading progress files.
- **Session branching and merging** -- forking a session to explore different approaches, with the ability to compare outcomes and merge the better branch.

LangGraph provides the closest existing primitive with its checkpointer system (PostgresSaver, DynamoDBSaver), which saves state at every node execution and supports resumption from any checkpoint. But LangGraph's model assumes a DAG of nodes, not a free-form reasoning loop. The checkpointing is structural -- save state at each node boundary. Claude Code's state is conversational -- save the compressed understanding of everything that has happened, including abandoned approaches and reasoning about why they were abandoned.

### 2. Sandboxed Execution Environments

Every Claude Code agent needs its own filesystem, shell, and network context. The agent reads files, writes files, runs commands, installs packages, starts servers, and verifies work by running tests. These are not API calls -- they are direct interactions with an operating environment.

**What exists:**
- Bedrock AgentCore runs each user session in a dedicated microVM with isolated CPU, memory, and filesystem resources. This is the right isolation model.
- Docker Sandboxes (released 2025-2026) provide microVM-based isolation specifically for coding agents. Workspace directories sync between host and sandbox at the same absolute path. Network isolation supports allow/deny lists.
- Cloudflare's Durable Objects provide stateful micro-servers that scale to tens of millions, with built-in SQL databases per instance, but these are lightweight compute environments, not full development containers.

**What's missing:** A standard for "agent workspace" that combines filesystem isolation with the ability to install system packages, run arbitrary processes, and persist workspace state across sessions. Bedrock AgentCore comes closest but caps execution at 8 hours and is designed for API-serving agents, not development agents that need persistent workspace evolution over days.

### 3. Tool Orchestration via MCP

MCP (Model Context Protocol) has won. Donated to the Linux Foundation in December 2025, adopted by OpenAI, Google DeepMind, and every major framework. The ecosystem grew from approximately 100,000 server downloads in November 2024 to over 8 million by April 2025, with 5,800+ MCP servers and 300+ MCP clients.

For an agent runtime, MCP solves tool discovery and invocation -- but creates new requirements:

- **Dynamic tool registration.** Agents need to discover and connect to MCP servers at runtime, not just at initialization. A coding agent that realizes it needs a database tool halfway through a task should be able to discover and connect to one.
- **Tool access control.** Not every agent should have access to every MCP server. The runtime needs per-agent, per-session tool permissions.
- **Tool-level observability.** Every MCP call should be traced: what tool, what arguments, what result, how long, what it cost. This is where OpenTelemetry semantic conventions for AI agents become critical.
- **Network-transparent tool calls.** MCP servers may run locally, in a sidecar container, or across a network boundary. The runtime should abstract this topology.

KubeCon Europe 2026 (Amsterdam, March 2026) is hosting the first "Agentics Day: MCP + Agents" -- a full co-located event focused on MCP in production. This signals that the cloud-native community recognizes MCP as infrastructure, not just a protocol specification.

### 4. Agent-to-Agent Communication

Claude Code Agent Teams demonstrate the need. Google's A2A protocol (April 2025, now under the Linux Foundation) provides the specification: capability discovery via Agent Cards (JSON), task lifecycle management, context sharing between client and remote agents, and transport bindings for JSON-RPC, gRPC, and REST.

But A2A was designed for inter-organizational agent communication -- your agent talks to my agent. What Claude Code Agent Teams need is *intra-system* coordination: shared filesystem awareness, work partitioning, merge conflict avoidance, progress visibility across teammates. This is closer to a distributed computing problem than a protocol problem.

**The gap:** No protocol or runtime addresses the case where 5-16 agents are working on different parts of the same codebase simultaneously, each with their own context window, needing to avoid stepping on each other's work while occasionally sharing discoveries. This is exactly what Agent Teams does manually today.

### 5. Context Window Management as Infrastructure

Claude Code's compaction strategy -- rolling summarization at 92% capacity, preserving critical state -- works. But it is baked into Claude Code itself, not externalized as runtime infrastructure. A real runtime would provide:

- **Pluggable compression strategies.** Different agents need different compression. A research agent should preserve sources and citations; a coding agent should preserve file modifications and test results; a planning agent should preserve decision rationale.
- **External memory tiers.** Letta/MemGPT's model is instructive: core memory (in-context, analogous to RAM), archival memory (searchable long-term storage, analogous to disk), and recall memory (conversation history, automatically persisted). All state persisted in a database, never lost even when evicted from context.
- **Cross-session memory.** Azure Foundry's memory feature (public preview) extracts, consolidates, and retrieves user preferences and context across sessions -- no custom embedding database or retrieval pipeline required. This is the right level of abstraction, but it is designed for user preferences, not for agent work state.

Factory AI's evaluation of context compression strategies across 36,000+ production messages found all methods scored between 2.19 and 2.45 out of 5.0 on artifact tracking -- knowing which files were created, modified, or examined. This is a hard, unsolved problem that probably requires specialized handling beyond summarization: a separate artifact index, or explicit file-state tracking in the agent scaffolding.

### 6. Observability

LangChain's State of Agent Engineering survey (1,340 respondents, December 2025) found quality is the top barrier to production (32% of respondents). You cannot improve quality without observability.

OpenTelemetry has published semantic conventions for AI agent observability, and frameworks are beginning to emit telemetry using these conventions. LangSmith provides tracing, real-time monitoring, alerting, and cost/latency/quality dashboards. But these tools are designed for pipeline observability -- request traces through a chain of LLM calls.

Claude Code-level agents need session-level observability:
- **Decision traces.** Not just "the model called this tool" but "the model tried approach A, it failed because X, it backtracked and tried approach B." The reasoning, not just the actions.
- **Cost attribution per task.** An agent working on a project for 6 hours across multiple context windows -- what did each feature cost? Which tasks caused the most backtracking?
- **Progress tracking.** Is the agent making progress or looping? This is trivially visible when you watch Claude Code in a terminal. It is invisible when running 50 agents headlessly.
- **Quality signals.** Did the agent's tests pass? Did it leave the codebase in a clean state? Did it achieve its stated objective?

### 7. Guardrails and Control Planes

Agents that reason autonomously need governance that is not merely "confirm each tool call." The control plane pattern is emerging: a deterministic code layer that intercepts agent actions before they reach enterprise systems.

**What practitioners are building:**
- Budget limits that kill a run if token spend exceeds a threshold.
- Action classification: autonomous (agent decides), approval-required (human confirms), prohibited (hard block).
- Risk-adaptive gates: low-confidence or high-blast-radius actions route to human review.
- Draft mode: agent generates intent to act but execution is suppressed, allowing audit without risk.
- Staged rollout: thin-agents with reversible actions first, then managed autonomy in sandboxes, then production with guardrails.

**What's missing:** A standard guardrail specification. Every team builds their own approval gates, budget checks, and action classifiers. There is no equivalent of MCP for guardrails -- no protocol that lets you define "this agent can modify files but not delete them, can spend up to $50 per session, and must get approval for any database writes."

---

## What the Ecosystem Is Building Toward

The puzzle pieces are scattered across vendors, but the picture is becoming visible.

### MCP + A2A = The Communication Layer

MCP handles agent-to-tool communication. A2A handles agent-to-agent communication. Together, they provide the interoperability layer: agents can discover tools and other agents, invoke them over standard transports, and receive structured results. Both are now under the Linux Foundation. Both have broad vendor adoption.

What is forming is the equivalent of HTTP + REST for agents. Not as mature, not as battle-tested, but filling the same architectural role: a standard way for software components to find and talk to each other.

### Bedrock AgentCore = The Isolation Layer

AWS's approach is the most operationally mature for running agents. MicroVM-per-session isolation, consumption-based pricing (no charges during I/O wait, which is 30-70% of agentic workloads), framework-agnostic (supports LangGraph, CrewAI, Strands, custom frameworks), supports both real-time and 8-hour async workloads, and bidirectional streaming for conversational agents. Direct code deployment (Python) eliminates container image management.

The limitation: AgentCore is a hosting platform, not an agent development platform. It runs your agent code in isolation, but it does not help you build the long-running harness, manage context across sessions, or coordinate multiple agents.

### Azure Foundry = The Enterprise Integration Layer

Microsoft's approach emphasizes enterprise readiness: managed memory (long-term user context across sessions), multi-agent workflows (visual designer and programmatic orchestration), native identity/governance/observability through Azure's existing stack, and support for open frameworks (Microsoft Agent Framework, LangGraph, CrewAI) alongside their own.

Foundry's managed memory -- extracting and consolidating context across sessions without custom embedding pipelines -- points toward the right abstraction for session persistence. But it is designed for enterprise application agents (customer service, knowledge workers), not for autonomous development agents that need full filesystem access.

### Cloudflare = The Edge Runtime

Cloudflare's Agents SDK runs on Durable Objects -- stateful micro-servers with built-in SQL databases, WebSocket support, task scheduling, and automatic state synchronization between agent and clients. The free tier makes experimentation accessible.

This is the right model for lightweight, always-on agents (monitoring, notification, coordination) rather than compute-intensive development agents. But the architecture -- each agent is a stateful object with its own storage, addressable over the network -- is a compelling primitive for agent runtime design.

### LangGraph = The State Machine Layer

LangGraph's durable execution model (checkpointing at every node, configurable persistence backends, human-in-the-loop interruption) is the most mature approach to agent state management. LangGraph 1.0 (October 2025) is production-ready and deployed on DynamoDB, PostgreSQL, SQLite, and Couchbase.

The limitation is structural: LangGraph models agents as graphs with nodes and edges. Claude Code is not a graph -- it is a free-form reasoning loop where the model decides what to do next. Imposing graph structure on a Claude Code-level agent would constrain the very autonomy that makes it effective.

### Letta = The Memory Layer

Letta (evolved from MemGPT) provides the most sophisticated agent memory architecture: core memory (in-context, individually persisted blocks with unique IDs), archival memory (searchable long-term storage), recall memory (conversation history, automatically persisted), and Context Repositories (git-based versioning of memory, introduced February 2026). Every piece of state -- memories, messages, reasoning, tool calls -- is persisted in a database and never lost.

Letta's memory hierarchy is the closest analog to what Claude Code's context compaction does, but externalized as infrastructure rather than baked into the agent. The Conversations API (January 2026) enables shared memory across parallel experiences -- directly relevant to Agent Teams.

---

## The Five Missing Pieces

Based on what exists and what Claude Code-level agents actually need, these are the gaps that no current platform fills.

### 1. The Session Continuum

**What's missing:** A first-class primitive for "agent work sessions" that span hours or days across multiple context windows, with automatic state serialization, rapid rehydration, branching, and merging.

Today, long-running agents use Anthropic's initializer/coding agent pattern: write state to `claude-progress.txt`, read it at the start of each new context window, use git as the ledger. This works but is entirely manual. No platform automates the serialization of agent understanding -- the compressed knowledge of what has been tried, what failed, what decisions were made and why -- into a form that can rapidly rehydrate a new context window.

LangGraph checkpointing saves graph state. Letta persists memory blocks. Azure Foundry manages user preferences. None of them persist *agent work state* -- the structured understanding that enables a new session to continue a multi-day project without re-reading everything from scratch.

### 2. Concurrent Agent Workspace Coordination

**What's missing:** Infrastructure for multiple agents working on the same codebase simultaneously without stepping on each other.

Agent Teams demonstrated this is possible (16 agents, 100,000-line compiler) but with severe limitations. No workspace awareness, no automatic conflict resolution, no shared understanding of "who is working on what." When a session is resumed, the lead may try to message teammates that no longer exist.

This is a distributed systems problem that requires: workspace partitioning (file-level or module-level locking), shared state about work assignment, merge strategies when agents modify overlapping code, and graceful degradation when agents fail mid-task.

No existing platform -- not Bedrock AgentCore, not Azure Foundry, not LangGraph -- addresses concurrent agent collaboration on shared artifacts.

### 3. The Agent Control Plane

**What's missing:** A standardized, declarative way to define agent governance: permissions, budgets, action policies, escalation rules, and audit requirements.

Every production deployment builds this ad hoc. There is no "guardrails protocol" equivalent to MCP. The result: organizations either over-restrict agents (requiring human approval for every action, defeating the purpose) or under-restrict them (no budget limits, no action classification, hoping for the best).

A control plane specification would define: per-agent capability boundaries (can read but not write, can modify but not delete), per-session budget envelopes (token spend, API call count, wall-clock time), action classification (autonomous/approval/prohibited) based on risk scoring, escalation paths when agents encounter uncertainty or high-stakes decisions, and audit trails with decision rationale, not just action logs.

Bedrock AgentCore's Policy feature (preview, December 2025) and Azure Foundry's governance integration are early moves, but neither provides a portable, framework-agnostic specification.

### 4. Artifact Lifecycle Management

**What's missing:** A system for tracking, versioning, and persisting the artifacts that agents produce -- files, data, analysis, decisions, reports -- beyond the conversation that created them.

Agents produce work products. Claude Code creates and modifies source files, writes tests, generates documentation, makes architectural decisions. These artifacts outlive the agent session. Today, they persist because they live on a filesystem (your laptop). In a hosted runtime, artifacts need explicit lifecycle management:

- **Versioning.** Which version of a file did which agent session produce? What changed between versions?
- **Provenance.** Which agent made this decision? What was the reasoning? What information was it working from?
- **Handoff.** When one agent session ends and another begins, which artifacts need to be carried forward? Which can be archived?
- **Output routing.** Agent produces a report -- where does it go? Into a knowledge base? An email? A dashboard? A PR?

Factory AI's evaluation found artifact tracking scores between 2.19 and 2.45 out of 5.0 across all compression methods. This is not a compression problem -- it is a missing abstraction. Artifacts need to be tracked separately from conversation history.

### 5. Elastic Compute for Reasoning Workloads

**What's missing:** Infrastructure optimized for the unique compute profile of autonomous agents: long idle periods (waiting for LLM responses) punctuated by bursts of local computation (running tests, building code, processing results).

Bedrock AgentCore's consumption-based pricing acknowledges this (no charges during I/O wait). But the compute model is still fundamentally container-shaped: provision resources, run workload, tear down. Agent workloads are different:

- A 6-hour coding session might use 30 minutes of CPU and 5.5 hours of waiting for API responses.
- Peak compute needs are unpredictable -- an agent that decides to run a full test suite needs very different resources than one that is reading files.
- Multiple agents on the same project share compute context (same codebase, same build tools) but need execution isolation.

The right model is closer to serverless than containers, but with persistent state and workspace. Cloudflare's Durable Objects (stateful, scale-to-zero, per-instance storage) point in the right direction but lack the raw compute capacity for development workloads.

---

## What This Means in 6-12 Months

### What will exist by early 2027:

**MCP becomes table stakes.** Every agent framework, every cloud provider, every enterprise tool will expose an MCP server. Tool discovery and invocation will be a solved problem. The March 2026 KubeCon Agentics Day is the inflection point -- when the cloud-native community treats MCP as infrastructure, adoption accelerates from "supported" to "expected."

**Managed agent runtimes mature.** Bedrock AgentCore, Azure Foundry, and Cloudflare Agents will each add capabilities the others have. Expect AgentCore to add longer execution windows and persistent workspaces. Expect Foundry to add stronger isolation and framework flexibility. Expect Cloudflare to add heavier compute options. Convergence, not differentiation.

**Session persistence becomes a platform feature.** The initializer/coding agent pattern is too effective to remain manual. At least one major platform will ship automatic session state serialization and rehydration -- likely Anthropic themselves, built into the Agent SDK. Letta's Context Repositories (git-based memory versioning) is a leading indicator of this direction.

**OpenTelemetry for agents standardizes.** The semantic conventions for AI agent observability will mature, and platforms will emit traces in a standard format. Cost attribution per agent session will become possible without custom instrumentation.

### What will NOT exist by early 2027:

**A unified agent runtime.** No single platform will host Claude Code-level agents with all five missing pieces solved. The ecosystem will remain fragmented: use Bedrock for isolation, LangGraph for state management, MCP for tools, and build your own coordination and governance layers.

**Standardized guardrails.** The control plane problem is harder than the communication problem. MCP and A2A succeeded because they solve clean, bounded problems (tool invocation, agent discovery). Guardrails require domain-specific risk models, organization-specific policies, and context-dependent decision-making. No protocol will capture this in 12 months.

**Seamless multi-agent coordination.** The concurrent workspace problem is genuinely hard -- it is a subset of the distributed systems problem, and distributed systems remain difficult after 40 years of research. Agent Teams will improve, but the "16 agents on one codebase" scenario will still require careful orchestration and human oversight.

**Agent artifact management as infrastructure.** File and decision tracking will remain the responsibility of the agent harness (progress files, git commits) rather than the runtime. This is the sleeper requirement -- it will not feel urgent until organizations try to audit agent decisions at scale.

### The trajectory:

The market is moving from "agent as API wrapper" to "agent as workload." The CNCF's Agentics Day, Bedrock AgentCore's microVM model, and Azure Foundry's managed runtime all signal the same shift: agents are not applications that call LLMs. They are a new class of compute workload with distinct requirements for isolation, persistence, observability, and governance.

Gartner predicts 40% of enterprise applications will embed AI agents by end of 2026. But LangChain's survey shows only 57% of respondents have agents in production, with quality as the #1 barrier. The gap between "embedded" and "production-quality" is exactly the runtime gap described in this article.

The winner will be the platform that treats agents the way Kubernetes treats containers: not as applications to deploy, but as a workload primitive with its own scheduling, isolation, networking, storage, and observability requirements.

---

## For the Builder

If you want to run Claude Code-level agents in production today, here is the most pragmatic path, ordered by what you should solve first.

### Start with the harness, not the platform.

Implement Anthropic's initializer/coding agent pattern. Use `claude-progress.txt` and git as your state persistence layer. This is not elegant, but it works, and it is what Anthropic themselves use. Your agent should always be able to orient itself in a new context window within 30 seconds of starting.

### Use Docker Sandboxes for isolation.

Docker's microVM-based sandboxes provide filesystem isolation, network control, and workspace syncing with the host at the same absolute paths. This solves the "agent needs a real development environment" problem without building custom container infrastructure.

### Deploy on Bedrock AgentCore for managed execution.

If you need cloud-hosted agents, AgentCore provides the best isolation model (microVM per session), consumption-based pricing (critical for agents that spend 30-70% of time in I/O wait), and framework flexibility. Accept the 8-hour execution limit and design your harness for multi-session work.

### Use MCP for tool access.

Do not build custom tool integrations. Use MCP servers for everything -- file operations, database access, API calls, search. The ecosystem has 5,800+ servers. If a tool you need does not have an MCP server, build one -- it is a better investment than a custom integration.

### Build your own observability.

Use OpenTelemetry semantic conventions for agent traces. Track token usage, tool call latency, and error rates. But also track agent-level metrics: tasks completed per session, backtracking frequency, context compaction events. These are the signals that tell you whether your agent is working effectively or thrashing.

### Build your own guardrails.

There is no standard to adopt. Build a control plane layer between your agent and its tools. Classify actions (autonomous/approval/prohibited). Set budget limits. Log decisions with rationale. Start restrictive and relax as you gain confidence -- it is much harder to tighten controls after an agent has caused damage than to loosen them after proving safety.

### Do not try to build multi-agent coordination yet.

Unless you have a specific, well-understood coordination problem (like the C compiler stress test), run agents independently on separate tasks. The infrastructure for coordinating agents on shared work does not exist. Independent agents with clear task boundaries and shared artifact stores (git repositories, databases) will outperform poorly coordinated agent teams.

### Watch these signals:

- **Anthropic shipping session persistence as a platform feature.** When the Agent SDK automates the initializer/coding agent pattern, the productivity gain for long-running agents will be substantial.
- **Bedrock AgentCore extending execution windows beyond 8 hours.** This is the gate for truly long-running autonomous agents in the cloud.
- **A guardrails protocol emerging.** When someone proposes the "MCP for governance" -- a standard way to define agent permissions, budgets, and escalation policies -- pay attention. This will unlock enterprise adoption.
- **KubeCon Agentics Day outcomes.** The March 2026 event will reveal whether the cloud-native community is building for real agent workloads or just wrapping LLM calls in containers. The sessions on MCP in production will be the leading indicator.

---

## Sources

### Anthropic Documentation and Engineering
- [Building agents with the Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk)
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Building Effective AI Agents](https://www.anthropic.com/research/building-effective-agents)
- [Introducing advanced tool use](https://www.anthropic.com/engineering/advanced-tool-use)
- [Agent SDK overview](https://platform.claude.com/docs/en/agent-sdk/overview)
- [Hosting the Agent SDK](https://platform.claude.com/docs/en/agent-sdk/hosting)
- [Session Management](https://platform.claude.com/docs/en/agent-sdk/sessions)
- [Agent Teams documentation](https://code.claude.com/docs/en/agent-teams)
- [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works)

### Architecture Analysis
- [Claude Code: Behind-the-scenes of the master agent loop (PromptLayer)](https://blog.promptlayer.com/claude-code-behind-the-scenes-of-the-master-agent-loop/)
- [Claude Code Architecture - Reverse Engineered (vrungta)](https://vrungta.substack.com/p/claude-code-architecture-reverse)
- [Claude Code agent architecture: Single-threaded master loop (ZenML)](https://www.zenml.io/llmops-database/claude-code-agent-architecture-single-threaded-master-loop-for-autonomous-coding)
- [Claude Code system prompts repository (Piebald-AI)](https://github.com/Piebald-AI/claude-code-system-prompts)
- [Claude Code Swarms (Addy Osmani)](https://addyosmani.com/blog/claude-code-agent-teams/)

### Cloud Runtimes
- [Amazon Bedrock AgentCore](https://aws.amazon.com/bedrock/agentcore/)
- [A Practitioner's Guide to Bedrock, AgentCore, and Beyond](https://builder.aws.com/content/37j0ql3ZfI6mE0SDYxxGvq18YCM/building-ai-agents-on-aws-in-2025-a-practitioners-guide-to-bedrock-agentcore-and-beyond)
- [Foundry Agent Service (Microsoft)](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/overview?view=foundry-classic)
- [Foundry Agent Service Long-Term Memory Preview (InfoQ)](https://www.infoq.com/news/2025/12/foundry-agent-memory-preview/)
- [Cloudflare Agents SDK](https://developers.cloudflare.com/agents/)
- [Making Cloudflare the best platform for building AI Agents](https://blog.cloudflare.com/build-ai-agents-on-cloudflare/)

### Protocols and Standards
- [Announcing the Agent2Agent Protocol (Google)](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
- [A2A Protocol specification](https://a2a-protocol.org/latest/)
- [Why the Model Context Protocol Won (The New Stack)](https://thenewstack.io/why-the-model-context-protocol-won/)
- [One Year of MCP (MCP Blog)](http://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/)
- [The State of MCP - Adoption, Security & Production Readiness (Zuplo)](https://zuplo.com/mcp-report)

### Frameworks and Memory
- [LangGraph durable execution](https://docs.langchain.com/oss/python/langgraph/durable-execution)
- [State of Agent Engineering (LangChain)](https://www.langchain.com/state-of-agent-engineering)
- [Letta - Stateful agents platform](https://www.letta.com/)
- [Rearchitecting Letta's Agent Loop (Letta blog)](https://www.letta.com/blog/letta-v1-agent)
- [Memory Blocks: The Key to Agentic Context Management (Letta)](https://www.letta.com/blog/memory-blocks)

### Sandbox and Isolation
- [Docker Sandboxes for coding agent safety](https://www.docker.com/blog/docker-sandboxes-a-new-approach-for-coding-agent-safety/)
- [How to sandbox AI agents in 2026 (Northflank)](https://northflank.com/blog/how-to-sandbox-ai-agents)

### Industry Analysis
- [AI 2026: Infrastructure, Agents, and the Next Cloud-Native Shift (Jimmy Song)](https://jimmysong.io/blog/ai-2026-infra-agentic-runtime/)
- [5 Key Trends Shaping Agentic Development in 2026 (The New Stack)](https://thenewstack.io/5-key-trends-shaping-agentic-development-in-2026/)
- [KubeCon Europe 2026 Agentics Day (CNCF)](https://www.cncf.io/blog/2026/02/20/kubecon-cloudnativecon-europe-2026-co-located-event-deep-dive-agentics-day-mcp-agents/)
- [AI Agents in Production 2025 (Cleanlab)](https://cleanlab.ai/ai-agents-in-production-2025/)
- [Evaluating Context Compression for AI Agents (Factory AI)](https://factory.ai/news/evaluating-compression)
- [AI Agent Observability - Evolving Standards (OpenTelemetry)](https://opentelemetry.io/blog/2025/ai-agent-observability/)
- [The agent control plane (CIO)](https://www.cio.com/article/4130922/the-agent-control-plane-architecting-guardrails-for-a-new-digital-workforce.html)
- [Agentic AI strategy (Deloitte)](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html)
