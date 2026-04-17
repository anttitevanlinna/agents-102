# Multi-Agent Systems

## Big Idea
Split the work. Each agent does one step and passes it forward.

## Meta
- **Primary Bloom's level:** Analyze → Create
- **Prework:** agent memory (agentic RAG vs. traditional RAG, filesystem as memory); agent tools and MCP
- **Homework:** selected "What is an Agent" sections (multi-agent coordination)
- **Materials (trainer):** three-agent scaffold (roles, handoff format), sample synthesis prompt
- **Plug points:** customer insights data, list of public review platforms, list of key competitors — pre-agreed with sponsor

## What You'll Learn
After this module, you will be able to:
- **Design** an assembly-line agent pipeline: three agents, sequential handoffs
- **Build** three specialized agents, each reading a different slice of reality
- **Analyze** handoff failure modes — noise, bias, mis-categorization at the seams
- **Synthesize** cross-agent findings that no single agent could produce
- **Evaluate** when a single agent beats three

## Lectures
- **Setting Up Proper Competitor Analysis** — what works, what doesn't, what breaks. Synthesis techniques: turning noisy multi-source data into findings that hold up.

## Exercises
- **Assembly-line sentiment analysis** — Build three specialised agents that each see a different slice of reality: direct customer feedback (support tickets, NPS, feedback forms), public reviews (G2, App Store, Trustpilot, Reddit), and competitor remarks (same public sources, different lens). Run each agent for two rounds — round two shows the brain sharpening as new sources confirm, contradict, or deepen round one. Synthesize across all three. The finding no single agent could produce: "customers complain about X, competitor Y is praised for X." Internal perception vs. external reality.

## Key Concepts (Emergent)
- **Assembly line**, not a mesh. Sequential hand-offs before orchestration.
- **Seams are where it fails.** Multi-agent coordination is a handoff problem.
- **Three agents here because they see genuinely different data** — not because splitting is inherently better. Anthropic's warning: only 3 situations where multi-agent wins.

## Plug Points
- **Customer insights data.** Support tickets, NPS, feedback forms — or similar. Must pre-exist.
- **Review platforms + competitors.** Sponsor names them before training.

## Bridge
You built something that works. But can you trust it? Tomorrow we break it.
