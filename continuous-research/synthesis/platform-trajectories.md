---
type: synthesis
domain: platform
updated: 2026-04-23
answers: ["platform direction", "who leads", "platform comparison", "horizontal platforms"]
---

# Platform Trajectories (April 2026)

## Upcoming Events — Critical Watch Window
- **April 15-16:** Salesforce TDX — COMPLETED. Key reveal: "Headless 360" (60+ MCP tools, Agent Script open-source, Vibes 2.0 with Claude Sonnet 4.5 default, AgentExchange 13K+ listings). Agentforce Grid = Beta prototyping tool (not GA). No new independent Finance/HR/Operations deployments announced. See `vertical-saas/runs/2026-04-16-cycle103.md` for full post-event analysis.
- **April 15-16:** Salesforce TDX — COMPLETED. Headless 360 (60+ MCP tools, React, Agentforce Experience Layer); Agentforce Vibes 2.0 defaults to Claude Sonnet 4.5; builder gap widening (admins vs pro-code). No independent Finance/HR/Operations deployments. See `vertical-saas/runs/2026-04-16-cycle103.md`.
- **April 22-24:** Google Cloud Next — **COMPLETED Day 1-2 (cycle 108).** Key findings: (1) Gemini Enterprise Agent Platform launched (Vertex AI rebrand with governance suite); (2) Gemini 3.1 Pro NOT GA'd — still in preview; (3) Workspace Studio Day 35 silence — Skills added but no second named customer; (4) A2A at 150+ orgs in production, v1.x with cryptographic agent cards, AP2 extension for payments; (5) A2UI v0.9 + AG-UI session held April 23; (6) Apple named Google as preferred cloud for Foundation Models; (7) Independent Level 2 deployments: Danfoss (80% email orders automated, 42h→real-time), Suzano (95% SQL query time reduction). **Watch window: April 28-May 10 for practitioner reactions. May 2-15 for post-GA enterprise reports.**
- **May 1:** Microsoft Agent 365 GA — $15/user/month. Security posture management still in preview on GA day. Practitioner assessment: identity layer sound; commercial model still catching up.

**Platform deployment evidence as of April 23 (cycle 108):**
- Salesforce: Level 2-3 (Engine, Williams-Sonoma, IRS, UK police Bobby — multiple industries; Grupo Globo/Vibes 2.0 as dev tooling). Beyond-CS frontier still needs independent Finance/HR/Operations evidence.
- Microsoft: Level 2 — Capital Group and Coca-Cola Beverages Africa cited as first Cowork deployments (vendor-sourced, unverified). Agent 365 GA May 1.
- Anthropic Cowork: **Level 2** — Cowork GA April 2026 (RBAC, group spend limits, connectors); Managed Agents practitioner reports: lock-in risk confirmed across 3 independent sources. Promotion path (personal→team→company) first designed path on any platform.
- OpenAI Frontier: Level 0 (12 consecutive cycles with zero independent deployment evidence). Workspace Agents in research preview, free until May 6.
- ServiceNow AW: Level 0 (self-report only; external GA Q2)
- Google Workspace/ADK: Day 2 complete. Studio Day 35 silence holds. Gemini 3.1 Pro still preview. Gemini Enterprise Agent Platform announced (governance suite, agent management). A2A Protocol production-confirmed across Microsoft + AWS + Google clouds. Developer layer advancing; business-user layer (Studio) structurally limited. **Two new independent Level 2 deployments at Cloud Next.**

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

## Google: Strong Infrastructure, Business-User Layer Still Thin

Cloud Next confirmed the architecture story; the business adoption story is still unproven.

- **Gemini Enterprise Agent Platform (announced April 22):** Vertex AI rebranded and expanded with Agent Gateway (MCP + A2A governance), Agent Registry, Agent Observability, Agent Designer, Agent Inbox. Full governance suite for developer-tier. Business-user-tier (Studio) did not receive equivalent governance features.
- **Workspace Studio (GA March 19, Day 35 silence):** Kärcher still the ONLY named customer after 5 months. Cloud Next added Skills feature but no second named customer announced. Zenphi (independent) confirmed structural limits: no external triggers, no loops, can't send emails, no Calendar/Meet integration. Product is a "personal automation assistant, not enterprise workflow platform." Silence is product limitation, not awareness gap.
- **A2A Protocol at 150+ orgs in production:** Most independently verifiable signal. Linux Foundation governance. Production confirmed in Azure AI Foundry AND AWS Bedrock AgentCore AND Google Cloud. v1.x with cryptographic agent cards. Named production: Tyson Foods + Gordon Food Service (supply chain agent coordination). Agent Payments Protocol (AP2) extension for 60+ financial organizations. ([thenextweb.com](https://thenextweb.com/news/google-cloud-next-ai-agents-agentic-era) — general press; [linuxfoundation.org](https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project) — independent)
- **Independent Level 2 deployments at Cloud Next:** Danfoss (80% email orders automated, 42h → real-time); Suzano (SQL agent, 95% query time reduction, 50K employees). Both reported by independent press. ([thenextweb.com](https://thenextweb.com/news/google-cloud-next-ai-agents-agentic-era))
- **Gemini 3.1 Pro still in preview** — expectation of GA at Cloud Next broken (2nd consecutive miss).
- **Apple partnership:** Google named Apple's preferred cloud for Foundation Models. Gemini to power future Siri.
- **Nordic:** Zero enterprise agent deployments. World Tour events in Copenhagen/Oslo/Stockholm April-May 2026.

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
