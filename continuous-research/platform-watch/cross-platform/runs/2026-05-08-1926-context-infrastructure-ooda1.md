---
type: run-log
domain: coding
evidence_level: 2
platforms: [claude, codex, cursor, github-copilot, mcp, agents-md]
nordic: true
updated: 2026-05-08
cycle: 123
---

# Context Infrastructure OODA 1 — 2026-05-08 19:26

**Focus area:** What concrete artifacts make agentic throughput possible inside software organizations?
**Research mode:** Cross-platform pattern.
**Why this focus:** The software OODA pass suggested the winning organizations do not just deploy coding agents; they build a context/verification substrate around them. This OODA maps the recurring artifacts.

## Queries Used

- `context engineering coding agents AGENTS.md software engineering teams 2026`
- `AI coding agents context engineering internal platform AGENTS.md Backstage MCP 2026`
- `coding agent harness engineering skills MCP sub-agents hooks 2026`
- `OpenAI harness engineering AGENTS.md 2026 coding agents`
- `AGENTS.md standard Linux Foundation Agentic AI Foundation OpenAI Cursor Google Jules Factory 2026`
- `Spotify background coding agents context engineering verification MCP`
- `Cloudflare internal AI engineering stack Backstage AGENTS.md MCP Portal`

## Findings

### OpenAI names the discipline: harness engineering

**Source:** [OpenAI, "Harness engineering: leveraging Codex in an agent-first world"](https://openai.com/index/harness-engineering/) — [practitioner direct]
**Date:** 2026-02-11
**Agent level:** team
**What:** OpenAI reports building an internal product with no manually written code: roughly 1M lines across application logic, tests, CI, docs, observability, and tooling; roughly 1,500 PRs by a small team over five months; internal daily users and external alpha testers. The important artifact finding is not "AI wrote code"; it is that the human job became environment design, intent specification, feedback loops, repository knowledge as system-of-record, architecture/taste enforcement, and agent legibility.
**Evidence level:** Level 2
**Key claims:**
- The first scaffold included repo structure, CI, formatting, package manager setup, framework, and AGENTS.md.
- Engineers asked "what capability is missing, and how do we make it legible and enforceable for the agent?"
- Repository knowledge became the system of record.
- Agent legibility became the design goal.
- Throughput changed merge philosophy and required garbage collection against entropy.

### Cloudflare publishes the full internal AI engineering stack

**Source:** [Cloudflare, "The AI engineering stack we built internally — on the platform we ship"](https://blog.cloudflare.com/internal-ai-engineering-stack/) — [practitioner direct]
**Date:** 2026-04-20
**Agent level:** company
**What:** Cloudflare's stack separates the context substrate into layers: access/authentication, AI Gateway/model routing, MCP Portal, sandbox/runtime, Backstage service catalog, AGENTS.md, Engineering Codex standards, telemetry, and AI code review. The key artifact is a company-level machine-readable engineering environment, not a set of individual prompts.
**Evidence level:** Level 2
**Key claims:**
- 3,683 internal users used AI coding tools in 30 days; 93% of R&D.
- 295 teams used agentic tools/coding assistants.
- MCP Portal gives a managed route to internal tools.
- Backstage MCP lets agents look up service ownership, dependencies, API specs, and Tech Insights.
- AGENTS.md generation pulls from Backstage metadata and repo analysis.
- AI Code Reviewer can flag when AGENTS.md should be updated.

### Spotify shows context engineering as production discipline

**Source:** [Spotify Engineering, "Background Coding Agents: Context Engineering (Honk, Part 2)"](https://engineering.atspotify.com/2025/11/context-engineering-background-coding-agents-part-2) — [practitioner direct]
**Date:** 2025-11-20
**Agent level:** company
**What:** Spotify's Honk system makes context engineering a repeatable production discipline: clear task setup, version-controlled prompts, examples, desired end states, limited tools, build/format/test verifiers, and one-change-at-a-time constraints. Claude Code became the top-performing agent only after the surrounding context and verifier harness existed.
**Evidence level:** Level 2
**Key claims:**
- About 50 migrations had used Claude Code by publication time.
- The majority of background-agent PRs merged into production used Claude Code.
- Spotify limited tools/hooks to preserve predictability.
- Prompt quality, examples, and end-state specification are operational artifacts.
- A custom verify tool closes the feedback loop with build/test/format output.

### AGENTS.md crossed from convention to open standard

**Source:** [Linux Foundation / Agentic AI Foundation, "Linux Foundation Announces the Formation of the Agentic AI Foundation"](https://aaif.io/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation-aaif-anchored-by-new-project-contributions-including-model-context-protocol-mcp-goose-and-agents-md/) — [standards body / ecosystem announcement]
**Date:** 2025-12-09
**Agent level:** ecosystem
**What:** AGENTS.md is now a Linux Foundation / AAIF project alongside MCP and goose. The announcement says AGENTS.md gives coding agents project-specific guidance across repositories and toolchains, has 60,000+ open-source project adoptions, and is supported by Amp, Codex, Cursor, Devin, Factory, Gemini CLI, GitHub Copilot, Jules, and VS Code.
**Evidence level:** Level 2 for standardization/adoption, not deployment outcomes
**Key claims:**
- AGENTS.md provides consistent project-specific guidance for AI coding agents.
- 60,000+ open-source projects had adopted AGENTS.md by the announcement.
- Multiple agent frameworks and IDE agents support the convention.
- AGENTS.md, MCP, and goose are inaugural AAIF projects.

### Academic evidence confirms the context-file layer is emerging but immature

**Source:** [Mohsenimofidi et al., "Context Engineering for AI Agents in Open-Source Software"](https://arxiv.org/abs/2510.21413) — [academic/research]
**Date:** 2026-02-05 revised version
**Agent level:** ecosystem
**What:** The MSR 2026 paper studies context files in 466 open-source projects and finds AGENTS.md emerging as a standard that consolidates tool-specific formats. It also finds no established content structure yet; context is provided in descriptive, prescriptive, prohibitive, explanatory, and conditional forms.
**Evidence level:** Level 2
**Key claims:**
- AI agents require context about architecture, interfaces, guidelines, workflows, and policies.
- Version-controlled Markdown context files are recommended by popular agentic tools.
- AGENTS.md is emerging as a standard.
- The structure of these files is still unsettled.
- Context-file evolution can be studied as real-world context engineering.

## What I Looked For But Did Not Find

- A stable canonical taxonomy for context infrastructure. Practitioners use overlapping terms: harness engineering, context engineering, organizational context layer, playbooks, skills, AGENTS.md, MCP, and internal AI engineering stack.
- Strong evidence that repo instructions alone are enough. The successful cases combine instructions with tools, verification, telemetry, and ownership.
- Clean non-engineering equivalents yet. The software stack is legible because code already has tests, CI, repos, service catalogs, ownership metadata, and deployment systems.

## Orientation

The artifact pattern is stronger than the company pattern. The recurring stack is: repo/project instructions, executable skills/playbooks, tool access through MCP or equivalent, service/knowledge catalogs, sandbox/runtime constraints, deterministic verifiers, AI/human review gates, telemetry, and internal platform ownership. This is the "AI engineering substrate" that turns individual skill into team throughput.
