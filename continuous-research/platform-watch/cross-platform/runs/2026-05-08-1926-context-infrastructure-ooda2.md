---
type: run-log
domain: coding
evidence_level: 2
platforms: [mcp, claude, codex, cursor, github-copilot, plugin-marketplaces]
nordic: false
updated: 2026-05-08
cycle: 124
---

# Context Infrastructure OODA 2 — 2026-05-08 19:26

**Focus area:** Second back-to-back pass: does context infrastructure converge beyond the obvious Cloudflare/Spotify/OpenAI cases, and what counter-evidence appears?
**Research mode:** Practitioner discovery / cross-platform pattern.
**Why this focus:** OODA 1 mapped the artifact stack. OODA 2 tests whether this is an idiosyncratic pattern or a broader adoption mechanism.

## Queries Used

- `Contextual Agent Playbooks and Tools LinkedIn CAPT MCP 70% faster issue triage 3x data insight 500 skills`
- `CAPT LinkedIn MCP 500+ community-authored skills`
- `organizational context layer AI agents LinkedIn MCP`
- `Ajay Prakash Context Engineering LinkedIn MCP`
- `Agent Skills data-driven analysis Claude Skills 40285 marketplace software engineering workflows`
- `Claude Code plugin marketplace enterprise managed settings approved marketplaces`
- `Every compound engineering plugin skills Claude Code 2026 Kieran Klaassen`
- `Ramp Claude Code PM skill product shaping agent context 2026 Geoff Charles`

## Findings

### LinkedIn CAPT is the strongest new convergence case

**Source:** [LinkedIn Engineering, "Contextual agent playbooks and tools: How LinkedIn gave AI coding agents organizational context"](https://www.linkedin.com/blog/engineering/ai/contextual-agent-playbooks-and-tools-how-linkedin-gave-ai-coding-agents-organizational-context) — [practitioner direct]
**Date:** 2026-01-27
**Agent level:** company
**What:** LinkedIn built CAPT (Contextual Agent Playbooks & Tools) to give off-the-shelf AI coding agents organizational context. CAPT combines MCP access to internal systems with executable playbooks that encode institutional workflows. It powers AI-assisted development for 1,000+ LinkedIn engineers, has 500+ authored playbooks, reduces issue triage time about 70% in many areas, and makes common data-analysis workflows roughly 3x faster.
**Evidence level:** Level 2
**Key claims:**
- CAPT uses MCP to expose code search, data platforms, observability tools, documents, and tickets.
- Playbooks define purpose, inputs, file references, and step-by-step instructions; agents invoke them as tools.
- CAPT supports central and local playbooks.
- A small meta-tool surface lets agents discover and invoke hundreds/thousands of underlying tools by tags.
- Every tool/playbook invocation is instrumented for adoption and failure analysis.
- More than 1,000 engineers use CAPT; over 500 playbooks have been authored.
- Issue triage down about 70%; data analysis roughly 3x faster.

### QCon makes "organizational context layer" a named practitioner topic

**Source:** [QCon AI Boston 2026 session, "Context Engineering at LinkedIn: How We Built an Organizational Context Layer for AI Agents with MCP"](https://boston.qcon.ai/presentation/boston2026/context-engineering-linkedin-how-we-built-organizational-context-layer-ai) — [conference program / practitioner talk listing]
**Date:** 2026-06-01 scheduled
**Agent level:** company
**What:** Ajay Prakash's QCon session frames the same CAPT system as an "organizational context layer." The talk page states that generic coding agents cannot navigate services, frameworks, data systems, or organizational processes without a company context layer, and that LinkedIn's MCP-based two-layer system grew into a context platform for all of LinkedIn.
**Evidence level:** Level 1-2 context
**Key claims:**
- CAPT is described as a two-layer architecture: meta-tools plus skills.
- Engineers use it for debugging, code review, querying internal systems, and navigating infrastructure.
- Product managers and designers use it for prototyping and converting ideas into production code.
- The same MCP infrastructure serves multiple roles because organizational context is shared.

### Skills/playbooks are becoming an infrastructure layer, not just prompts

**Source:** [Ling et al., "Agent Skills: A Data-Driven Analysis of Claude Skills for Extending Large Language Model Functionality"](https://arxiv.org/abs/2602.08004) — [academic/research]
**Date:** 2026-02-08
**Agent level:** ecosystem
**What:** This paper studies 40,285 publicly listed skills and frames skills as reusable, program-like modules defining triggering conditions, procedural logic, and tool interactions. It finds skill content concentrated in software engineering workflows and identifies both redundancy and safety risks, including state-changing/system-level actions.
**Evidence level:** Level 2
**Key claims:**
- 40,285 skills analyzed.
- Skills function as reusable procedural modules, not just prompt snippets.
- Software engineering workflows dominate skill content.
- Marketplace supply/demand imbalance and intent-level redundancy exist.
- Skills introduce safety risks when they enable state-changing or system-level actions.

### Enterprise plugin marketplaces expose governance as context-infrastructure need

**Source:** [Claude Code docs, "Create and distribute a plugin marketplace"](https://code.claude.com/docs/en/plugin-marketplaces) — [official documentation]
**Date:** 2026
**Agent level:** company/ecosystem
**What:** Claude Code's marketplace documentation shows the governance side of context infrastructure: organizations can restrict marketplaces, allow approved internal repos, pin release channels, validate plugin manifests, and auto-distribute approved plugins. This matters because skills/playbooks become executable institutional knowledge; if they are infrastructure, enterprises need supply-chain controls.
**Evidence level:** Level 1-2 context
**Key claims:**
- `strictKnownMarketplaces` restricts which marketplaces users can add.
- `extraKnownMarketplaces` can make approved marketplaces available automatically.
- Marketplaces can be pinned by repo/ref/version.
- Validation and local testing workflows exist.
- Governance is applied before install/update/refresh operations.

### Every and Ramp show skill/playbook mechanics outside infra teams

**Source:** [Every, "Compound Engineering Camp: Every Step, From Scratch"](https://every.to/source-code/compound-engineering-camp-every-step-from-scratch) — [domain trade publication / practitioner-interview write-up]
**Date:** 2026-03-13, updated 2026-04-07
**Agent level:** team
**What:** Every's compound engineering loop is a skills/playbooks system for small-team software work: brainstorm, plan, work, review, compound. The compound step stores lessons as artifacts future agents can discover. The core move is turning bugs, preferences, code review findings, and architecture decisions into persistent context.
**Evidence level:** Level 2, small-company
**Key claims:**
- Compound engineering plugin had 10,000+ GitHub stars at publication.
- Plan produces detailed implementation plans with data models, file references, architectural decisions, and sources.
- Review produces findings/to-dos.
- Compound stores lessons for future sessions.
- Community users include engineers at Google and Amazon, per the article.

**Source:** [Peter Yang on Geoff Charles/Ramp, "Inside Ramp, the $32B Company Where AI Agents Run Everything"](https://creatoreconomy.so/p/inside-ramp-the-32b-company-ai-agents-geoff-charles) — [practitioner-interview write-up]
**Date:** 2026-03-15
**Agent level:** company
**What:** Ramp's product-shaping Claude Code skill shows context infrastructure reaching product management. The skill frames the problem, launches parallel research across competitors, Gong calls, Zendesk tickets, and the codebase, then shapes a spec grounded in evidence. This is not just coding-agent work; it is organizational context being packaged into reusable product-discovery workflow.
**Evidence level:** Level 2, caveated by interview/paywall surface
**Key claims:**
- Ramp uses a Claude Code PM skill for product shaping.
- Research agents scan competitors, call transcripts, tickets, and codebase.
- Output is a concise spec with context, design principles, requirements, alternatives, and open questions.
- Ramp applies an L0-L3 framework to move employees from AI use to building with AI.

## What I Looked For But Did Not Find

- A clean counterexample where a software org achieved team/company AI throughput without any context infrastructure, playbook layer, or verification substrate.
- A settled ownership model. Cases split across Developer Productivity (Cloudflare), engineering platform/Fleet Management (Spotify), AI agent platform (LinkedIn), product leadership (Ramp), and small-team self-built plugins (Every).
- A clean safety story for skill/playbook marketplaces. The skill ecosystem is growing faster than governance; academic analysis already flags state-changing/system-level risks.

## Orientation

The pattern upgrades from "strong Level 2 cases" toward Level 3 component convergence. At least seven independent sources point at the same mechanism: OpenAI/harness engineering, Cloudflare/internal AI engineering stack, Spotify/Honk context engineering, LinkedIn/CAPT, Every/compound engineering, Ramp/product-shaping skill, and AGENTS.md/AAIF standardization. The full packaged "AI engineering substrate" is not yet Level 3 as a measured outcome across 10-20 companies, but the component stack is converging.
