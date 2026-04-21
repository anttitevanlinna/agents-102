# Anthropic — official material on agentic patterns — OODA 2026-04-21

**All sources below are Level 0 vendor material.** This maps what Anthropic *says* and *ships* — not what is independently verified to work. Every claim is the vendor's framing of its own product.

## What's officially shipped (bare facts only)

- **Claude Opus 4.7** — positioned for "sustained reasoning over long runs," cross-session memory, multi-day projects. $5/$25 per M tokens. Available on Claude Platform, Bedrock, Vertex AI, Foundry. [vendor press release] https://www.anthropic.com/news/claude-opus-4-7
- **Managed Agents API** — launched April 10, 2026. Cloud-hosted agent runtime. Handles sandboxing, permissions, state, error recovery. $0.08/session-hour on top of token costs. [vendor press release] https://www.theregister.com/2026/04/09/anthropic_offers_to_host_ai/ (general press confirming announcement) + Anthropic framing at [vendor blog] https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk
- **Claude Cowork GA** — April 2026. RBAC, spend limits, OpenTelemetry, Zoom MCP connector, per-tool connector controls. [vendor press release] (same April 9 announcement cluster)
- **Agent Skills** — SKILL.md directories with YAML frontmatter (name, description), loaded dynamically. Pre-built skills ship for PPT/Excel/Word/PDF. [vendor blog] https://www.anthropic.com/news/skills ; [vendor docs] https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- **Subagents in Claude Code / Agent SDK** — custom system prompt, own context window, independent tool access/permissions; `skills` field injects skill content at startup. [vendor docs] https://code.claude.com/docs/en/sub-agents ; https://platform.claude.com/docs/en/agent-sdk/subagents
- **MCP** — donated to Agentic AI Foundation; open protocol for tool/data connection. [vendor press release] https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation
- **Antspace** — referenced as Anthropic's internal deployment path for Claude.ai web surface; no formal public product announcement as of 2026-04-21. [general press, speculative] — NOT shipped as public product.

## Anthropic's positioning on long-running / multi-hour agents

Core piece: **"Effective harnesses for long-running agents"** [vendor blog] https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents. Anthropic's own framing:
- Agents work in **discrete sessions** — each new context window starts with no memory of the last.
- Best-practice harness uses a **different prompt for the first context window** to scaffold environment/context for subsequent windows.
- Three named techniques: **compaction** (summarize + reinitialize), **structured note-taking**, **multi-agent architectures**.

"Context engineering" is Anthropic's branded term for this whole stack: [vendor blog] https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents. Their slogan: *"smallest possible set of high-signal tokens that maximize likelihood of desired outcome."*

## Memory and CLAUDE.md as design surfaces

Anthropic does not publish a dedicated "CLAUDE.md design guide" blog post. CLAUDE.md shows up in [vendor docs] as part of Claude Code setup but is not theorized as a design surface the way we treat it in Agents 102. Memory is positioned at the **model layer** (Opus 4.7 "carries context across sessions") rather than the **file layer** (CLAUDE.md / skills / notes). This is a vendor tilt to watch — Anthropic prefers to sell memory as a model capability, not as a file discipline.

## Multi-agent and MCP guidance

- **"How we built our multi-agent research system"** [vendor blog] https://www.anthropic.com/engineering/multi-agent-research-system. Claim: 90% research time reduction on complex queries (vendor-internal benchmark). Orchestrator + parallel searchers. Named failure patterns: agents spiraling, needing explicit guardrails.
- **"Building Effective AI Agents"** [vendor blog/research] https://www.anthropic.com/research/building-effective-agents — canonical workflows-vs-agents distinction. Core guidance: *start with simple prompts; add agentic complexity only when simpler solutions fall short.*
- **"Code execution with MCP"** [vendor blog] https://www.anthropic.com/engineering/code-execution-with-mcp — load tools on demand, filter data before it reaches the model, execute logic in one step. MCP framed as a context-efficiency layer, not just a connector spec.
- **"Writing tools for agents"** [vendor blog] https://www.anthropic.com/engineering/writing-tools-for-agents — tool descriptions as prompt engineering; small refinements = state-of-the-art deltas.
- **"Seeing like an agent"** [vendor blog] https://claude.com/blog/seeing-like-an-agent — tool design lessons from Claude Code.

## Verification, evals, judges

- **"Demystifying evals for AI agents"** [vendor blog] https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents. Start with **20–50 tasks drawn from real failures**, not hundreds synthesized up front. Automated evals pre-launch + CI; production monitoring for drift; A/B for changes. No dedicated "LLM-as-judge" architecture post — judges are implied, not theorized separately.
- **Bloom** [vendor research] https://alignment.anthropic.com/2025/bloom-auto-evals/ — automated behavioral evals framework.
- **A3** [vendor research] https://alignment.anthropic.com/2026/automated-alignment-agent/ — agent that mitigates safety failures.

## Failure modes Anthropic publicly acknowledges

From **"Our framework for developing safe and trustworthy agents"** [vendor press release] https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents:
- **Mistakes propagate and compound** across turns as agents modify environment state.
- **Cross-context data leakage** — memory carrying sensitive info between tasks.
- **In-context scheming, agentic misalignment, sycophancy** — named explicitly.
- **"Spiraling out of control"** — from the multi-agent research post; required explicit guardrails.

Not directly named in blog posts: **argue-loops / judge-stalemate / hallucination under tool use**. These are practitioner terms; Anthropic talks around them via "mistakes compound" and "need guardrails."

## What I looked for but didn't find

- Dedicated theorization of CLAUDE.md as a design surface.
- A public "how to build an LLM-judge" guide from Anthropic.
- Any official Anthropic content on **hallucination bake-offs / judge-vs-judge evaluation** — absent.
- Public performance numbers on Managed Agents reliability at multi-hour horizons — only positioning language, no production metrics.
- Antspace as a named public product.
- Any admission of the gap between "announced" (Managed Agents, Cowork enterprise features) and production adoption.

## Curriculum implications — held loose (all claims are vendor-labeled)

1. **Agents 102 is aligned with Anthropic's own vocabulary.** Skills, subagents, MCP, context engineering, compaction — Anthropic uses the same nouns we teach. The curriculum will feel native on the platform.
2. **Our CLAUDE.md-as-design-surface frame is a gap Anthropic doesn't fill.** This is differentiation, not duplication. Anthropic tilts toward model-layer memory; we teach file-layer discipline.
3. **Our hallucination bake-off (M5) and orchestrator+eval-loop (M6) extend Anthropic's eval guidance.** Anthropic says "start with 20–50 real-failure tasks"; we teach the loop that writes and selects them.
4. **Managed Agents + Cowork are the M7 "cloud agent platform" branch** — now GA enough to be a real M7 option for prepared buyers. Unprepared buyers still hit the three walls.
5. **Do not upgrade vendor claims.** Opus 4.7's "works coherently for hours" is marketing until a practitioner confirms. Our M2-M8 exercises are the test.

**Word count: ~780.**
