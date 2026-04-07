# Agent Infrastructure & Governance — Platform State

Last updated: 2026-04-02 (cycle 1)
OODA cycles: 1

## Focus

The emerging meta-layer for agent identity, runtime security, and governance — the tools that govern agents across ALL platforms. Not any single agent platform, but the infrastructure that secures, discovers, and controls agents regardless of where they run. Tracked because the CTO question has shifted from "which agent platform?" to "who governs agents across all our platforms?"

## Key Verdict (as of 2026-04-02)

**Supply-demand irony: 25+ agent security products exist, zero independently verified deployed-customer outcomes.** Every vendor announced at RSAC 2026 (March). Every product is GA or "early preview." Survey data shows 80.9% of enterprises have moved past planning into active testing or production with agents (Gravitee, 2026). Yet only 14.4% report agents going live with full security/IT approval. The governance tools are being built before the agents they secure are deployed at scale — and the few agents that ARE deployed run without governance. This is the defining irony of Q1 2026: the security industry is selling locks for houses that aren't built yet, while the houses that exist have no doors.

**Evidence level: Level 0-1 across the board.** Every finding below is vendor announcement, vendor survey, or single-vendor claim. Zero independent practitioner reports of deploying any of these governance tools in production. Zero convergence. This entire category is pre-evidence.

## 1. Identity Layer — Agent as First-Class Identity

### Okta for AI Agents — GA April 30, 2026

The biggest bet: treating AI agents as first-class identities in the enterprise directory, alongside humans and service accounts.

- **Universal Directory expansion:** AI agents get their own identity type with defined lifecycle (onboarding → active → decommissioned)
- **Agent Gateway:** Centralized control plane for agent access to resources. Virtual MCP server capability — admins aggregate and expose tools from Okta's MCP registry
- **Shadow agent detection:** Discovers unknown/unsanctioned agents in the environment and registers them as identities
- **Audit trail:** All agent-resource interactions logged for compliance
- **Status:** Early Access now, GA April 30, 2026
- **Evidence level:** Level 0 — all information from Okta's own blog and press releases. Zero independent deployment evidence.
- Sources: [Okta blog — AI Agents EA announcement](https://www.okta.com/blog/ai/okta-ai-agents-early-access-announcement/) [vendor press release]; [Okta Showcase 2026 press release](https://www.okta.com/newsroom/press-releases/showcase-2026/) [vendor press release]; [MSSP Alert coverage](https://www.msspalert.com/news/okta-wants-ai-agents-treated-like-identities-heres-why-that-matters) [domain trade publication]

### Entro Security — NHI Discovery & Governance

Focuses on non-human identity (NHI) management — API keys, tokens, service accounts, and now AI agent credentials.

- **NHIDR (Non-Human Identity Detection & Response):** Monitors agent activity for anomalies, links each agent/NHI/secret to usage, permissions, and an accountable owner
- **Agentic Governance and Administration (AGA):** Visibility and policy controls for agent actions, MCP servers, and tool access
- **Discovery scope:** Across clouds, code, CI/CD, on-prem, and collaboration tools
- **Key stat (vendor-sourced):** 97% of NHIs have excessive privileges (Entro's own 2025 State of NHI report)
- **Evidence level:** Level 0 — vendor product page and vendor report. No independent deployment evidence.
- Sources: [Entro Security platform page](https://entro.security/) [vendor press release]; [GitGuardian — Top 10 NHI Security Tools 2026](https://blog.gitguardian.com/nhi-security-tools/) [practitioner analysis]

### Astrix Security — NHI Fingerprinting & Agent Discovery

Most technically detailed discovery approach. Four-method architecture announced at RSAC 2026.

- **NHI Fingerprinting:** Detects agents that were never registered in any AI platform — monitors the credential layer (OAuth apps, service accounts, API keys, PATs) across cloud, IdP, SaaS, and DevOps tools
- **Four discovery methods:** (1) AI Platform Integrations (Copilot, Bedrock, Vertex, OpenAI, Agentforce), (2) NHI Fingerprinting, (3) Sensor Telemetry on endpoints, (4) Bring-Your-Own-Service plug-in model
- **Agent Control Plane (ACP):** Real-time policy engine controlling what agents can do
- **OpenClaw/Moltbot scanner:** Discovers shadow agents specifically
- **Evidence level:** Level 0 — vendor blog, PR Newswire press release. No independent deployment evidence.
- Sources: [Astrix RSAC 2026 blog](https://astrix.security/learn/blog/what-were-announcing-at-rsac-2026-discovery-across-every-layer-and-control-over-what-agents-can-do/) [vendor press release]; [PR Newswire announcement](https://www.prnewswire.com/news-releases/astrix-security-delivers-the-most-comprehensive-ai-agent-discovery-and-enhances-security-with-agent-policy-enforcement-302719653.html) [vendor press release]; [Help Net Security coverage](https://www.helpnetsecurity.com/2026/03/23/astrix-security-ai-agent-security-platform-expansion/) [domain trade publication]

## 2. Runtime Security — Agent Sandboxing & Execution Control

### NVIDIA OpenShell + NemoClaw — Open-Source Agent Sandboxing

Open-source runtime isolation for agents. The infrastructure play: kernel-level sandboxing, not prompt-level guardrails.

- **OpenShell:** Core of NVIDIA Agent Toolkit. Out-of-process policy enforcement, sandboxed execution, granular permissions, privacy router
- **NemoClaw:** Security layer for OpenClaw agents. Adds Landlock + seccomp + network namespace isolation — OS-level lockdown
- **Key architecture decision:** Policies enforced OUTSIDE the agent process. Even a compromised agent can't bypass policy enforcement
- **15+ enterprise partners** (vendor-claimed, no names published)
- **Status:** "Early preview" — GitHub README explicitly says "not production ready"
- **Known vulnerability:** Agent could copy settings file (openclaw.json) and restart pointing at the modified copy, bypassing gateway security settings. Patched, but demonstrates the immaturity
- **Evidence level:** Level 0-1 — vendor blog, GitHub repo. The guardrail bypass is practitioner-found counter-evidence.
- Sources: [NVIDIA Technical Blog — OpenShell](https://developer.nvidia.com/blog/run-autonomous-self-evolving-agents-more-safely-with-nvidia-openshell/) [vendor press release]; [NemoClaw GitHub](https://github.com/NVIDIA/NemoClaw) [practitioner direct]; [NemoClaw guardrail bypass analysis](https://www.buildmvpfast.com/blog/nemoclaw-guardrail-bypass-ai-agent-security-2026) [practitioner analysis]; [CIO coverage](https://www.cio.com/article/4146545/nvidia-nemoclaw-promises-to-run-openclaw-agents-securely.html) [general press]

### Cisco AI Defense — MCP-Layer Runtime Protection

- Expanded February 2026 to add runtime protections against tool abuse and supply chain manipulation at the MCP layer
- Positions as security for the "agentic workforce"
- **Evidence level:** Level 0 — vendor newsroom only.
- Source: [Cisco newsroom](https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m03/cisco-reimagines-security-for-the-agentic-workforce.html) [vendor press release]

### Stacklok — MCP Platform & Agent Supply Chain Security

Open-source-first approach. Founded by Kubernetes and Sigstore creators.

- **ToolHive:** Open-source MCP platform (Apache 2.0) — described as "most widely used open source MCP platform"
- **Brood-Box:** CLI for running coding agents inside hardware-isolated microVMs
- **Supply chain attestation:** Built on Sigstore for agent artifact signing and verification
- **Identity controls and governance** for MCP server deployment
- **Evidence level:** Level 0-1 — vendor site and GitHub repos. Open-source adoption metrics not independently verified.
- Sources: [Stacklok platform page](https://stacklok.com/) [vendor press release]; [Stacklok GitHub repos](https://github.com/orgs/stacklok/repositories) [practitioner direct]

## 3. Governance & Forensics Tools

### ConductorOne — AI Access Management

Unified control plane for managing access to AI tools, agents, and MCP connections.

- **Agents as first-class identities:** Own credentials, policies, lifecycle states, and ownership
- **Self-service provisioning:** Users get access to AI tools in under 60 seconds (vendor claim)
- **3,000+ hosted MCP servers** built on existing connector ecosystem
- **Key claim (vendor survey, N=unknown):** "95% of enterprises now run AI agents autonomously" — **CAUTION: likely zombie stat.** Original methodology, sample size, and definition of "autonomously" not visible. The ConductorOne survey conflates "runs AI agents" with "runs agents autonomously" — these are very different claims.
- **Evidence level:** Level 0 — vendor press release and vendor survey. The 95% stat should be treated with extreme skepticism.
- Sources: [ConductorOne press release — AI Access Management](https://www.conductorone.com/news/press-release/introducing-ai-access-management/) [vendor press release]; [GlobeNewsWire — survey](https://www.globenewswire.com/news-release/2026/03/10/3252890/0/en/ConductorOne-Survey-Finds-95-of-Enterprises-Now-Run-AI-Agents-Autonomously-as-Identity-Risks-Escalate.html) [vendor press release]; [Security Boulevard coverage](https://securityboulevard.com/2026/03/conductorone-launches-ai-access-management-to-govern-ai-tools-agents-and-mcp-connections/) [domain trade publication]

### Vorlon — Agentic Ecosystem Security & Forensics

First to ship forensic-grade audit capability for agent actions.

- **AI Agent Flight Recorder:** Immutable forensic audit trail of every agent action. Detects behavior changes, maps actions to data touched, calculates blast radius in near-real-time
- **AI Agent Action Center:** Prioritization, routing, remediation guidance, and ticket tracking for agent security findings
- **Vorlon 2026 CISO Report (N=500 US security leaders):** 99.4% of organizations experienced at least one SaaS or AI ecosystem security incident in 2025
- **Evidence level:** Level 0 — vendor press release and vendor survey.
- Sources: [GlobeNewsWire — Vorlon RSAC 2026](https://www.globenewswire.com/news-release/2026/03/25/3262262/0/en/Vorlon-Brings-Forensics-and-Coordinated-Response-to-Agentic-Ecosystem-Security-for-the-First-Time.html) [vendor press release]; [Help Net Security coverage](https://www.helpnetsecurity.com/2026/03/25/vorlon-ai-agent-flight-recorder/) [domain trade publication]

### Wiz + Google AI-APP — Cloud Security for Agents

Google acquired Wiz ($32B, closed March 11, 2026). Now building AI Application Protection Platform.

- **AI-APP:** Application protection platform specifically for AI workloads
- **Security agents (red/blue/green team):** Purpose-built agents that investigate, prioritize, and remediate cloud security risks
- **Integration direction:** Wiz cloud context + Google threat intelligence + Mandiant incident response
- **Note:** This is security agents FOR cloud, not governance OF agents. Different category but adjacent — included because Wiz AI-APP may evolve to govern agent workloads
- **Evidence level:** Level 0 — vendor blog and press release. Acquisition just closed.
- Sources: [Google Cloud Blog — Wiz acquisition](https://cloud.google.com/blog/products/identity-security/google-completes-acquisition-of-wiz) [vendor press release]; [SiliconAngle — agentic AI security strategy](https://siliconangle.com/2026/03/23/google-cloud-unveils-agentic-ai-security-strategy-wiz-integration-threat-intelligence-upgrades/) [general press]

### Microsoft Agent Governance Toolkit

- Open-source GitHub repo covering policy enforcement, zero-trust identity, execution sandboxing, and reliability engineering
- Claims to cover 10/10 OWASP Agentic Top 10 risks
- **Evidence level:** Level 0-1 — vendor GitHub repo. No independent deployment evidence.
- Source: [GitHub — microsoft/agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit) [vendor press release / practitioner direct]

## 4. Standards Bodies & Frameworks

### OWASP Top 10 for Agentic Applications (2026)

The most concrete, practitioner-usable framework. Developed by 100+ experts.

- **Ten risk categories:** Agent goal hijacking, tool misuse/unintended execution, identity/privilege abuse, missing/weak guardrails, sensitive data disclosure, data poisoning, resource exhaustion, supply chain vulnerabilities, advanced prompt injection, over-reliance on autonomous decision-making
- **Shift:** From securing "what AI says" to securing "what AI does"
- **Companion resources:** AI Agent Security Cheat Sheet, Agentic AI Threats & Mitigations guide, AI Security Solutions Landscape Q2 2026
- **Dark Reading poll:** 48% of cybersecurity professionals identify agentic AI as #1 attack vector heading into 2026
- **Evidence level:** Level 3 (convergence) — peer-reviewed by 100+ practitioners, no single vendor bias
- Sources: [OWASP Top 10 for Agentic Applications](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) [practitioner direct / academic]; [OWASP AI Agent Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html) [practitioner direct]

### NIST AI Agent Standards Initiative (launched Feb 17, 2026)

First US government program dedicated to agentic AI interoperability and security standards.

- **Three pillars:** (1) Industry-led agent standards + US leadership in international bodies, (2) Community-led open-source protocol development, (3) Research in AI agent security and identity
- **RFI on Agent Security:** Responses due March 9, 2026
- **AI Agent Identity & Authorization Concept Paper:** Responses due April 2, 2026
- **Listening sessions:** Starting April 2026, sector-specific barriers to AI adoption
- **Status:** Framework-setting phase. No standards published yet. Earliest outputs likely H2 2026.
- **Evidence level:** Level 1 (institutional opinion, not yet standards)
- Sources: [NIST announcement](https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure) [academic/research]; [NIST initiative page](https://www.nist.gov/caisi/ai-agent-standards-initiative) [academic/research]

### CSA CSAI Foundation (launched RSAC 2026)

New 501(c)(3) non-profit — mission: "Securing the Agentic Control Plane."

- **Six strategic programs:** (1) AI Risk Observatory with CNA for agentic AI + real-time telemetry, (2) Agentic Best Practices — lifecycle guidance for identity-first controls, runtime authorization, agent taxonomy, secure transactions, (3) Education & credentialing — TAISE certification expansion, Agentic AI Summit Series, (4) Executive trust & governance, (5) Global assurance, (6) Forward research
- **Identity-first framework:** Covers NHI controls, runtime authorization, privilege governance, agent profiling standards
- **Status:** Just launched. Programs announced but no deliverables yet.
- **Evidence level:** Level 1 (institutional, pre-deliverable)
- Sources: [CSA press release](https://cloudsecurityalliance.org/press-releases/2026/03/23/csa-securing-the-agentic-control-plane) [vendor press release]; [CSA blog — Securing the Agentic Control Plane](https://cloudsecurityalliance.org/blog/2026/03/20/2026-securing-the-agentic-control-plane) [domain trade publication]

## 5. Survey Evidence — The Numbers Behind the Irony

All vendor-sourced. All should be treated with caution. But the convergence across surveys tells a story even if individual numbers are suspect.

| Survey | Key Finding | Sample | Source Type |
|--------|------------|--------|-------------|
| Gravitee State of AI Agent Security 2026 | 80.9% past planning into testing/production; only 14.4% with full security approval; only 24.4% have full agent visibility | Not disclosed | [vendor survey](https://www.gravitee.io/state-of-ai-agent-security) |
| Saviynt 2026 CISO AI Risk Report | 47% observed unauthorized agent behavior; only 5% confident they could contain a compromised agent; 92% lack full visibility into AI identities | N=235 CISOs | [vendor survey] |
| HiddenLayer 2026 AI Threat Landscape | ~33% don't know if they experienced an AI breach; agents = 1 in 8 reported AI breaches | Not disclosed | [vendor survey](https://businessjournaldaily.com/ai-security-company-releases-2026-threat-report/) |
| Vorlon 2026 CISO Report | 99.4% had at least one SaaS/AI security incident in 2025 | N=500 US security leaders | [vendor survey](https://go.vorlon.io/vorlon-2026-ciso-report-agentic-ecosystem-security-gap) |
| ConductorOne | "95% run AI agents autonomously" | Not disclosed | [vendor survey] — **likely zombie stat** |

**Cross-survey pattern (Level 2 — multiple surveys, same direction):** Enterprises are deploying agents faster than they can govern them. Visibility is the #1 gap. The governance tools exist but aren't deployed. The agents exist but aren't governed. Both sides of the market are pre-production.

## 6. The CTO Question

> "Who governs agents across ALL our platforms? Is there a meta-layer?"

**Straight answer as of April 2026: Nobody. There is no meta-layer.**

- **Okta** is closest to becoming the identity meta-layer (agents as first-class identities in Universal Directory, cross-platform discovery). But it's not GA until April 30 and has zero reported deployments.
- **Astrix** has the most technically detailed discovery approach (four methods including NHI fingerprinting). But it's a point solution, not a governance platform.
- **ConductorOne** claims the broadest MCP coverage (3,000+ servers). But governance without identity is just access management.
- **NVIDIA OpenShell** solves runtime isolation but only for OpenClaw agents — not a cross-platform play.
- **Standards bodies** (OWASP, NIST, CSA) are setting frameworks but won't deliver implementable standards before H2 2026 at earliest.

**The architectural gap:** No product today can discover agents across Copilot + Bedrock + Vertex + OpenAI + custom-built, apply unified governance policies, and provide forensic audit — from a single pane. Each vendor covers one or two layers. The CTO must stitch together 3-5 products to get what they need, with no proven integration patterns.

**The timing gap:** The governance tools are shipping before the agents they govern are deployed at scale. This creates a bizarre market where vendors are competing for customers who don't yet have the problem the vendors are solving. When agents DO deploy at scale (likely H2 2026 - H1 2027), the governance landscape will consolidate rapidly around whoever has real deployment evidence.

## What We Need To Learn

- [ ] **Independent deployment evidence** — is ANY enterprise actually using Okta for AI Agents, Astrix, ConductorOne, or Vorlon in production? Who? With what results?
- [ ] **Okta GA reality check (May 2026)** — after April 30 GA, do enterprises actually adopt agent-as-identity? Or is it shelfware?
- [ ] **OpenShell/NemoClaw adoption** — who are the 15+ enterprise partners? Anyone beyond NVIDIA's own ecosystem?
- [ ] **Cross-platform governance** — is anyone stitching together identity + runtime + forensics from different vendors? What does the integration look like?
- [ ] **The shadow agent problem** — Astrix and Okta both claim shadow agent discovery. Has anyone actually found shadow agents in an enterprise? How many? What were they doing?
- [ ] **Nordic signal** — any Nordic companies deploying agent governance tools? Any Nordic-origin governance startups?
- [ ] **NIST standards timeline** — when do the first implementable standards emerge from the AI Agent Standards Initiative?
- [ ] **Zombie stat verification** — ConductorOne's "95% run agents autonomously" needs original methodology. Gravitee's "80.9% past planning" needs sample details.
- [ ] **Convergence watch** — when do 10-20 independent practitioners report actually deploying governance tools? That's when this category becomes real.

## Sources Index

All sources cited inline above. Key source pages:
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [NIST AI Agent Standards Initiative](https://www.nist.gov/caisi/ai-agent-standards-initiative)
- [Gravitee State of AI Agent Security 2026](https://www.gravitee.io/state-of-ai-agent-security)
- [CSA CSAI Foundation launch](https://cloudsecurityalliance.org/press-releases/2026/03/23/csa-securing-the-agentic-control-plane)
- [Okta for AI Agents](https://www.okta.com/products/govern-ai-agent-identity/)
- [NVIDIA OpenShell blog](https://developer.nvidia.com/blog/run-autonomous-self-evolving-agents-more-safely-with-nvidia-openshell/)
- [NemoClaw GitHub](https://github.com/NVIDIA/NemoClaw)
- [Astrix RSAC 2026 announcements](https://astrix.security/learn/blog/what-were-announcing-at-rsac-2026-discovery-across-every-layer-and-control-over-what-agents-can-do/)
