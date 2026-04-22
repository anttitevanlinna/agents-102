---
type: synthesis
domain: platform
updated: 2026-04-22
answers: ["platform direction", "who leads", "platform comparison", "horizontal platforms"]
---

# Platform Trajectories (April 2026)

## Upcoming Events — Critical Watch Window
- **April 15-16:** Salesforce TDX — COMPLETED. Key reveal: "Headless 360" (60+ MCP tools, Agent Script open-source, Vibes 2.0 with Claude Sonnet 4.5 default, AgentExchange 13K+ listings). Agentforce Grid = Beta prototyping tool (not GA). No new independent Finance/HR/Operations deployments announced. See `vertical-saas/runs/2026-04-16-cycle103.md` for full post-event analysis.
- **April 22-24:** Google Cloud Next — IN PROGRESS (Day 1 scanned, cycle 107). Key Day 1 findings: Gemini 3.1 Pro NOT GA'd (still preview). A2A Protocol 1.0 confirmed at Linux Foundation (pre-event, TSC includes Microsoft + AWS + Salesforce + SAP). Workspace Studio Day 34 silence, no new customers. Deep Research Max announced April 21 (pre-event). AG-UI/BRK3-024/Mattel PQA sessions pending Day 2-3. **Follow-up cycle April 23-25 mandatory.**
- **May 1:** Microsoft Agent 365 GA.

**Platform deployment evidence as of April 22 (cycle 107):**
- Salesforce: Level 2-3 (Engine, Williams-Sonoma, IRS, UK police Bobby — multiple industries; Grupo Globo/Vibes 2.0 as dev tooling). Beyond-CS frontier still needs independent Finance/HR/Operations evidence.
- Microsoft: Level 2 — **BREAKING SILENCE:** Capital Group and Coca-Cola Beverages Africa cited as first Cowork deployments (vendor-sourced, unverified)
- Anthropic Cowork: **UPGRADED Level 2** — Cowork GA April 2026 (RBAC, group spend limits, connectors); Managed Agents first practitioner reports Level 2 (Zalta: positive, unicodeveloper: critical-honest); Shopify Sidekick on Vertex AI (vendor-sourced, Level 1). Promotion path (personal→team→company) **first designed path on any platform**. See `coding-agents/state.md` cycle 101 section.
- OpenAI Frontier: Level 0 (21st consecutive zero for independent deployment evidence)
- ServiceNow AW: Level 0 (self-report only; external GA Q2)
- Google Workspace/ADK: Day 1 scanned. Studio Day 34 silence confirmed. Gemini 3.1 Pro NOT GA. A2A Protocol 1.0 at Linux Foundation (multi-vendor). Developer layer (ADK/Vertex) advancing; business-user layer (Studio) structurally limited. Full verdict after April 23-25.

**Nobody leads.** OpenAI's own COO confirmed (Feb 2026): "We have not yet really seen enterprise AI penetrate enterprise business process." MIT NANDA: 95% of custom/task-specific GenAI tools report no measurable P&L impact (July 2025, N=52 interviews — directional, not precise. See cycle 80 audit).

## Microsoft: Azure of Agents

Governance teeth, zero deployment evidence post-GA, trust deficit quantified. Strategy: own the governance/identity/security layer, not the apps. Nadella: "SaaS will dissolve into agents on CRUD databases."

- **User preference collapsed:** Only 8% choose Copilot when alternatives available (Recon Analytics, 150K respondents). Accuracy NPS: -19.8.
- **Copilot Cowork:** 39 consecutive zeros for independent reviews. Mollick (Wharton): "cannot figure out any way to trigger agentic actions." Thompson (Stratechery): model-agnosticism is dead for agentic work.
- **Foundry Agent Service GA (March 16):** Multi-model, private networking. Zero new independently verified deployments post-GA. Reliability concerns (JSON parsing, Code Interpreter failures).
- **Agent 365 (May 1):** Shadow agent detection (found 500K agents inside Microsoft). Strongest differentiator but Microsoft-ecosystem-only.
- **Security surface expanding:** DLP bypass Level 3, CVE cascade (3 in one month), Copilot Studio misconfigurations validated by Tenable.
- **Nordic:** Tenth consecutive zero for M365 agent deployments.

See `../platform-watch/microsoft-365/state.md` for full evidence.

## OpenAI: Agent Operating System

Most ambitious full-stack vision, widest execution gap, enterprise ground accelerating loss. IPO now driving strategy.

- **Stack:** Open Responses spec → Agents SDK (19K stars) → Codex → ChatGPT Agent → Frontier → AgentKit.
- **Frontier:** Eleventh+ consecutive check with zero independent deployment evidence. PE joint venture ($10B) = implicit admission Frontier can't self-serve.
- **Enterprise decline:** Anthropic captures ~80% of API spend (was ~5% July 2025). Largest single-month subscription decline. Super-app merge defensive, not offensive.
- **EEA/Nordic:** Agent mode NOT available in EEA. Worst platform for Nordic business agents.
- **Deployment gap = Level 3 convergence:** 95% of custom/task-specific GenAI tools report no measurable P&L impact (MIT NANDA, N=52, directional — see cycle 80 audit), 46% cite integration.

See `../platform-watch/openai/state.md` for full evidence.

## Anthropic: Standards + Best Engine

Quietly building the full stack. Three layers becoming four: standards → engine → business surface → hosting.

- **Standards adopted by everyone:** MCP (97M monthly SDK downloads, 10K+ servers) + Agent Skills.
- **Antspace (hidden PaaS):** General-purpose managed agent runtime, not just web app host. BYOC on K8s = first designed promotion path (personal → company). Still staging.
- **Claude Cowork feature velocity:** Persistent threads, scheduled tasks, M365 MCP, 11 plugins, marketplace + admin controls — all shipped March 2026.
- **Enterprise momentum:** 73% of new enterprise buyers (Ramp, March 2026). $1B ARR run-rate (Claude Code) in 6 months.
- **Risk:** Infrastructure fragility Level 3 (109 incidents/90d, 99.34% uptime = ~6 hours downtime/month).

See `../platform-watch/claude-anthropic/state.md` for full evidence.

## Google: Strong Architecture, Weak Execution

Governance contradiction, practitioner silence, credit cliff.

- **Workspace Studio (GA March 19):** First real no-code agent builder. But capacity errors active, hard limits (50 exec/day), Karcher STILL the only named customer after 4+ months.
- **Practitioner silence Level 3:** 3+ months post-availability, 20M+ tasks claimed, zero independent deployment reports.
- **Governance contradiction:** CISO published shadow agent warnings while Studio is ON by default for all users.
- **ADK 2.0 Alpha:** Strongest open-source framework but production challenges documented (1/30 success at 15-20 concurrent agents).
- **Nordic:** Zero enterprise agents for seventh+ consecutive cycle. Presence = education + hackathons only.

See `../platform-watch/google-workspace/state.md` for full evidence.

## Vertical SaaS: Ahead in Their Lanes

Strong in customer service, immature everywhere else.

- **Salesforce Agentforce:** $800M ARR, 29K deals, 12K deployed customers. First independent evidence beyond CS (IRS, Williams-Sonoma). But sub-20% workflow adoption, architectural limits (15 topics/20 agents), technical debt inheritance.
- **Zendesk-Forethought:** Deal pending close. Resolution Learning Loop. 1B+ monthly interactions.
- **ServiceNow AW:** Genuinely agentic (Diginomica confirmed). Weaker than marketed: single specialist, self-referential metrics.
- **SAP Joule:** Zero evidence → NEGATIVE evidence (Bloomberg: VW "not sufficiently mature," 60% skip Joule).
- **Nordic:** Finnair (80% chat, independently verified) and reMarkable remain the only showcases.

See `../platform-watch/vertical-saas/state.md` for full evidence.

## The Fifth Path: Open-Source Frameworks

- **Ruflo:** 21.6K stars, zero independent enterprise adoption despite 500K claimed downloads.
- **Mastra:** TypeScript-first, first open-source framework with RBAC/ACL. $13M seed, 1.77M NPM monthly downloads.
- **AutoGen dead** — merged into Microsoft Agent Framework.
- **ALL remain developer tools.** No framework addresses business users. Business-domain agents live inside proprietary SaaS.

## The Sixth Path: NVIDIA Infrastructure Layer

- **OpenShell:** Open-source agent sandbox (Apache 2.0). 15+ enterprise partners (Adobe, Atlassian, SAP, Salesforce, ServiceNow). Security at the infrastructure layer. Still alpha.
