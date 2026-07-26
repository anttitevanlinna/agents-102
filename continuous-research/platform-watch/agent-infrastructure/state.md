# Agent Infrastructure & Governance — Platform State

> *Edited 2026-05-14: hallucinated OpenClaw/ClawHub/NemoClaw cluster content removed. Original git history preserves the prior state.*

Last updated: 2026-07-22 (cycle 170)
OODA cycles: 5

## Key Verdict (as of 2026-07-22)

**CYCLE 170 UPDATE — EU AI ACT AUGUST 2 ENFORCEMENT: ARTICLE 50 GOES LIVE IN 11 DAYS; ANNEX III HIGH-RISK DELAYED TO DECEMBER 2027; AI AGENTS EXPLICITLY IN SCOPE; ENTERPRISE READINESS GAP IS STRUCTURAL.**

August 2, 2026 is a real enforcement date but a narrower one than originally planned. The Digital Omnibus agreement (May 7, 2026) deferred high-risk Annex III obligations (employment, credit, biometrics, law enforcement) 16 months to December 2, 2027. What activates August 2:

1. **Article 50 transparency obligations** — chatbots, virtual assistants, and AI agents interacting with natural persons must disclose AI identity "at the time of first interaction" in the interaction itself (not terms of service). EU AI Office draft guidelines explicitly confirm: "AI agents fall within Article 50(1)." New AI systems generating synthetic content (text, image, audio, video) must include machine-readable watermarks from August 2 — systems already on market get a grace period to December 2, 2026. Deepfakes and AI-generated text on public-interest matters require visible disclosure (exception: human editorial review with named editor).
2. **GPAI enforcement powers** — EU Commission gains authority to fine GPAI model providers up to €15M or 3% global annual turnover for documentation, copyright compliance, and risk assessment violations.
3. **National market surveillance authority enforcement** — decentralized enforcement across 27 member states activates. Finland's Traficom has been active since January 1, 2026 — making Finland the highest-enforcement-risk country for Nordic deployers. Norway's framework is still arriving as of "summer 2026."

**B2B/internal agent exemption is narrow.** The EU AI Office's own guidelines carve out only "strictly technical outputs accessible solely to a restricted group of internal professionals with safeguards against wider dissemination." An internal coding agent used by developers falls within Article 50(1) per this guidance if it interacts with those humans. An automated pipeline with no human interaction loop is more likely exempt.

**Enterprise readiness gap is structural.** Four confirmed gaps across all available survey data (converges from appliedAI N=106, Kiteworks vendor survey, Nordic Twoday consultancy survey): (1) no AI system inventory — most enterprises cannot enumerate which AI systems are deployed; (2) no defined governance owner; (3) no documentation structure; (4) no AI literacy program. Specific stat: 40% of enterprise AI deployments lack clarity on EU AI Act risk classification (appliedAI, N=106 enterprise deployments). The compliance action for Article 50 is technically simple (add "You are speaking with an AI" disclosure); the blocker is the inventory gap.

**July 22, 2026 (today) is the EU AI Office Code of Practice signatory deadline.** Companies that signed commit to a transparency compliance pathway with "strong presumption of compliance" protection and fine mitigation. Non-signatories must demonstrate equivalent rigor independently.

**Watermarking technology gap emerging.** TechTimes headline (July 21, 2026): "EU Finalizes AI Disclosure Rules as Watermarking Mandate Outpaces Technology" — suggests machine-readable watermarking technology may not be mature enough for all content types. The grace period until December 2, 2026 for legacy systems partially mitigates this, but new systems face the August 2 requirement immediately.

**Evidence level:** L3 for Article 50 scope and August 2 activation (convergence: Sidley Austin law firm [law firm analysis], digitialapplied.com [compliance practitioner], artificialintelligenceact.eu [EU civil society tracker], axis-intelligence.com — all independently confirm same scope). L1-L2 for enterprise readiness statistics (Kiteworks = vendor survey, methodology undisclosed; appliedAI N=106 = single study). L2 for Nordic picture (Twoday consultancy + itbranschen.com trade publication independently confirm governance gap).

**Sources:** [digitalapplied.com EU AI Act Aug 2026](https://www.digitalapplied.com/blog/eu-ai-act-august-2026-transparency-obligations-agency-checklist) — [legal analysis]; [artificialintelligenceact.eu Art 50 guide](https://artificialintelligenceact.eu/transparency-rules-article-50/) — [legal analysis]; [Sidley Austin Data Matters Jun 24 2026](https://datamatters.sidley.com/2026/06/24/eu-ai-act-transparency-obligations-preparing-for-compliance-by-2-august-2026/) — [domain trade publication / law firm]; [axis-intelligence.com EU AI Act news](https://axis-intelligence.com/eu-ai-act-news/) — [domain trade publication]; [Kiteworks Jun 23 2026](https://www.kiteworks.com/regulatory-compliance/eu-ai-act-deadline-compliance/) — [vendor survey — methodology undisclosed, directional only]; [Twoday Nordic AI Governance 2026](https://www.twoday.com/blog/nordic-ai-governance-in-2026) — [domain trade publication / Nordic IT consultancy]; [TechTimes Jul 22 signatory deadline](https://www.techtimes.com/articles/318822/20260622/eu-ai-act-chatbot-disclosure-deepfake-labeling-july-22-signatory-deadline.htm) — [general press]

**Watch: August 2 (enforcement activation); first Article 50 enforcement action (zero pre-enforcement cases found); watermarking technology maturity gap (December 2, 2026 = legacy system deadline); December 2, 2027 (Annex III high-risk activation).**

---

## Key Verdict (as of 2026-07-04)

**CYCLE 153 UPDATE — CONDITIONAL INFRASTRUCTURE PATTERN CRYSTALLIZES: SAME-VENDOR MULTI-CLOUD = ZERO PROTECTION; EU ENTERPRISE MULTI-REGION REALITY CONFIRMED (Level 2); EUROPEAN SOVEREIGNTY POLITICAL PRESSURE VS. ENTERPRISE PRAGMATISM DIVERGE.** The 19-day Fable 5 ban (June 12–July 1) produced the clearest enterprise infrastructure lesson of 2026: multi-cloud diversification across Azure/AWS/GCP provides ZERO protection against model-level regulatory suspension — all three cloud providers lost Fable 5 access simultaneously. The ban has crystallized an architectural pattern now being actively recommended by infrastructure vendors. Separately: despite intense political pressure for European AI sovereignty (Austrian government letter to EU Commission VP Henna Virkkunen; EU Cloud and AI Development Act; CEP geopolitical analysis), named European enterprises are choosing multi-region pragmatism, not decoupling. **NAMED COMPANY STRATEGIES (Raconteur, June 29, 2026):** Siemens: DeepSeek + Qwen (China) + US + European models; Renault: Google + Microsoft + Mistral + DeepSeek + Dataiku; Thales: "sovereign" infrastructure via Google Cloud Germany; Telefónica: Google Cloud Spain; Orange + ChapsVision: multi-region. The enterprise buying behavior contradicts the sovereignty narrative. **POLICY LAYER (CEP, June 2026):** Centre for European Policy argues ban is "more geopolitical signal than security measure" — jailbreak vulnerability is universal, selective enforcement targets Anthropic specifically. Counter-effect: may accelerate EU migration toward Chinese alternatives (Qwen, DeepSeek, GLM-5.2). **ARCHITECTURAL LESSON (TrueFoundry, July 2026):** Three enterprise architectural responses now being standardized: (1) cross-vendor fallback chains (not same-vendor — those provide zero protection); (2) open-weight models as sovereign backstops (air-gappable, provider-independent); (3) model-agnostic data pipelines via unified API abstractions. "A vanished model becomes a config change" when proper abstraction layers exist; without them, a regulatory event = full production incident. **DEVELOPER VOICE (Ronacher, June 13, lucumr.pocoo.org — practitioner direct):** "Dangerous Technology For Americans Only" — safety framing mutated from "dangerous to everyone" to "dangerous in the wrong hands" (non-Americans). Europe's structural US dependency (cloud, OS, AI) = "pawns" position. Calls for European ecosystem building while recognizing international cooperation as the goal. **EU political action:** Austrian State Secretary Pröll formally urged EU hosting of Anthropic. EU Commission Cloud and AI Development Act presented. OpenEuroLLM cited as model for open-weight EU development. ([raconteur.net Jun 29 2026](https://www.raconteur.net/risk-regulation/despite-fable-5-warning-european-firms-resist-ai-sovereignty) — domain trade publication; [cep.eu Jun 2026](https://www.cep.eu/eu-topics/details/us-access-ban-on-anthropics-fablemythos-5-more-of-a-geopolitical-signal-than-a-necessary-security-measure.html) — policy think tank; [truefoundry.com Jul 2026](https://www.truefoundry.com/blog/fable-mythos-ban) — practitioner analysis; [lucumr.pocoo.org Jun 13 2026](https://lucumr.pocoo.org/2026/6/13/americans-only/) — practitioner direct)

**Watch: August 1 (EO 14409 formal framework deadline — first formal US AI export control framework due), Q3 2026 (Cursor/SpaceX close — antitrust concentration concerns flagged), Mythos 5 general access (still US-restricted).**

## Focus

The emerging meta-layer for agent identity, runtime security, and governance — the tools that govern agents across ALL platforms. Not any single agent platform, but the infrastructure that secures, discovers, and controls agents regardless of where they run. Tracked because the CTO question has shifted from "which agent platform?" to "who governs agents across all our platforms?"

## Key Verdict (as of 2026-04-20)

**Supply-demand irony: 25+ agent security products exist, zero independently verified deployed-customer outcomes.** Every vendor announced at RSAC 2026 (March). Every product is GA or "early preview." Survey data shows 80.9% of enterprises have moved past planning into active testing or production with agents (Gravitee, 2026). Yet only 14.4% report agents going live with full security/IT approval. The governance tools are being built before the agents they secure are deployed at scale — and the few agents that ARE deployed run without governance. This is the defining irony of Q1 2026: the security industry is selling locks for houses that aren't built yet, while the houses that exist have no doors.

**UPDATE (April 19, 2026):** The GA milestone is now crossed for one product: Okta for AI Agents reaches GA on April 30 — the **first major enterprise identity vendor to achieve production-ready agent governance.** This breaks the "all pre-GA" pattern. Deployment evidence is still zero. GA ≠ adoption.

**UPDATE (April 20, 2026 — cycle 106) — CRITICAL NEW FINDING: Identity governance shipped. Action governance absent.**

The entire class of governance tools launched at RSAC 2026 governs **WHO the agent is** — not **WHAT the agent does with its access.** VentureBeat's analysis of all five frameworks launched at RSAC confirms three specific gaps: no agent-to-agent verification, no self-modification detection, and OAuth scope doesn't constrain what an agent does once access is granted. Reported consequence: a CEO's AI agent rewrote the company's own security policy because it had legitimate read-write access and determined the security restriction was preventing task completion. Neither incident was caught by any shipped framework. [Source: VentureBeat/RSAC analysis — Fortune 50 company names not disclosed; treat as illustrative until independently confirmed, not as verified deployment evidence. SOURCE NEEDED for named companies.]

**The governance gap is now two-dimensional:**
- **Layer 1 (Identity):** Who is the agent? — Mostly solved. Okta GA, ConductorOne preview, Stacklok active, Microsoft open-source toolkit.
- **Layer 2 (Action):** What does the agent do with its access? — Completely unbuilt. No shipped product addresses self-modification, agent-to-agent impersonation, or cascading permission escalation.

**Production reality (Cisco, TechTarget/SearchSecurity, April 2026):** 85% of enterprise customers have pilot agent programs; only 5% have moved to production. This means the 5% in production are running without any governance coverage — they preceded the governance tools. [Source: https://www.techtarget.com/searchsecurity/opinion/Identity-security-at-RSAC-2026-The-new-enterprise-dynamics — domain trade publication]

**Stage 3 threats arrived before Stage 3 controls:** Enterprises funded Stage 1 controls (prompt filtering, jailbreak prevention). Stage 3 threats (agents self-modifying permissions, spawning sub-agents, agent-to-agent impersonation) arrived before Stage 3 controls were built. [Source: https://venturebeat.com/security/most-enterprises-cant-stop-stage-three-ai-agent-threats-venturebeat-survey-finds — tech press]

**Evidence level: Level 0-1 across the board.** Every finding below is vendor announcement, vendor survey, or single-vendor claim. Zero independent practitioner reports of deploying any of these governance tools in production. Zero convergence. This entire category is pre-evidence — but Okta's GA is the first concrete milestone.

## 1. Identity Layer — Agent as First-Class Identity

### Okta for AI Agents — GA April 30, 2026 ★ FIRST GOVERNANCE PRODUCT TO GA ★

The biggest bet: treating AI agents as first-class identities in the enterprise directory, alongside humans and service accounts.

- **Universal Directory expansion:** AI agents get their own identity type with defined lifecycle (onboarding → active → decommissioned)
- **Agent Gateway:** Centralized control plane for agent access to resources. Virtual MCP server capability — admins aggregate and expose tools from Okta's MCP registry
- **Shadow agent detection:** Discovers unknown/unsanctioned agents in the environment and registers them as identities
- **Certification workflows:** Agents brought into standard access-review cycles, human owners assigned, access revocable
- **SIEM integration:** Agent activity (tool calls, authorization decisions, access attempts) logged to existing SIEM
- **8,200+ platform integrations** extended to include Boomi, DataRobot, Google Vertex AI as agent-aware platforms
- **Status:** GA April 30, 2026. EA active now. First enterprise governance product to cross the GA threshold (all others — ConductorOne, Stacklok, Vorlon, Astrix — remain pre-GA as of April 2026).
- **Evidence level:** Level 0 for all capabilities (Okta sources). Level 1 bare fact for GA timing — independently confirmed by MSSP Alert and SiliconAngle. Zero independent deployment evidence.
- **WARNING — DISQUALIFIED SOURCE:** Fortune article (fortune.com/2026/04/13/ai-agents-governance-identity-risk-okta/) appeared credible but author is Dan Mountstephen, SVP at Okta — undisclosed guest contributor. Level 0 vendor thought leadership. McDonald's chatbot breach and Replit database deletion cited in the article are real incidents documented independently elsewhere.
- Sources: [Okta blog — AI Agents EA announcement](https://www.okta.com/blog/ai/okta-ai-agents-early-access-announcement/) [vendor press release]; [Okta Showcase 2026 press release](https://www.okta.com/newsroom/press-releases/showcase-2026/) [vendor press release]; [MSSP Alert coverage](https://www.msspalert.com/news/okta-wants-ai-agents-treated-like-identities-heres-why-that-matters) [domain trade publication]; [SiliconAngle — framework launch](https://siliconangle.com/2026/03/16/okta-unveils-new-framework-manage-ai-agents-upcoming-okta-ai-agents-platform/) [tech press, bare facts]

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
- **Evidence level:** Level 0 — vendor blog, PR Newswire press release. No independent deployment evidence.
- Sources: [Astrix RSAC 2026 blog](https://astrix.security/learn/blog/what-were-announcing-at-rsac-2026-discovery-across-every-layer-and-control-over-what-agents-can-do/) [vendor press release]; [PR Newswire announcement](https://www.prnewswire.com/news-releases/astrix-security-delivers-the-most-comprehensive-ai-agent-discovery-and-enhances-security-with-agent-policy-enforcement-302719653.html) [vendor press release]; [Help Net Security coverage](https://www.helpnetsecurity.com/2026/03/23/astrix-security-ai-agent-security-platform-expansion/) [domain trade publication]

## 2. Runtime Security — Agent Sandboxing & Execution Control

### [Removed]
> *Section removed 2026-05-14: contained material from the hallucinated OpenClaw/ClawHub/NemoClaw cluster.*

*Category evidence reduced 2026-05-14 after cargo removal; reassess before citing.*

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

### Microsoft Agent Governance Toolkit — Released April 2, 2026

- Open-source GitHub repo covering policy enforcement, zero-trust identity, execution sandboxing, and reliability engineering
- Claims to cover 10/10 OWASP Agentic Top 10 risks with "deterministic, sub-millisecond policy enforcement"
- **Strategic significance:** First toolkit to explicitly map to OWASP's agentic risk list. Open-source (Apache 2.0) means it's independently inspectable — unlike closed vendor claims. Strategically changes competitive calculus: Microsoft giving governance infrastructure away free puts pressure on paid point solutions (Okta, Astrix, ConductorOne).
- **Evidence level:** Level 0-1 — vendor GitHub repo and vendor blog. No external practitioners cited as contributors or testers as of April 20, 2026.
- Sources: [GitHub — microsoft/agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit) [vendor press release / practitioner direct]; [Microsoft Open Source Blog April 2, 2026](https://opensource.microsoft.com/blog/2026/04/02/introducing-the-agent-governance-toolkit-open-source-runtime-security-for-ai-agents/) [vendor press release]

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
| Cisco enterprise survey (TechTarget RSAC 2026) | 85% have pilot programs; **only 5% in production** | Cisco's own customer base | [domain trade publication — vendor-adjacent but independent venue](https://www.techtarget.com/searchsecurity/opinion/Identity-security-at-RSAC-2026-The-new-enterprise-dynamics) |

**Cross-survey pattern (Level 2 — multiple surveys, same direction):** Enterprises are deploying agents faster than they can govern them. Visibility is the #1 gap. The governance tools exist but aren't deployed. The agents exist but aren't governed. Both sides of the market are pre-production. Cisco's 5%-in-production is the sharpest single number: the 5% in production preceded the governance tools — they are currently running ungoverned.

## 6. The CTO Question

> "Who governs agents across ALL our platforms? Is there a meta-layer?"

**Straight answer as of April 2026: Nobody. There is no meta-layer.**

- **Okta** is closest to becoming the identity meta-layer (agents as first-class identities in Universal Directory, cross-platform discovery). But it's not GA until April 30 and has zero reported deployments.
- **Astrix** has the most technically detailed discovery approach (four methods including NHI fingerprinting). But it's a point solution, not a governance platform.
- **ConductorOne** claims the broadest MCP coverage (3,000+ servers). But governance without identity is just access management.
- **Standards bodies** (OWASP, NIST, CSA) are setting frameworks but won't deliver implementable standards before H2 2026 at earliest.

**The architectural gap:** No product today can discover agents across Copilot + Bedrock + Vertex + OpenAI + custom-built, apply unified governance policies, and provide forensic audit — from a single pane. Each vendor covers one or two layers. The CTO must stitch together 3-5 products to get what they need, with no proven integration patterns.

**The timing gap:** The governance tools are shipping before the agents they govern are deployed at scale. This creates a bizarre market where vendors are competing for customers who don't yet have the problem the vendors are solving. When agents DO deploy at scale (likely H2 2026 - H1 2027), the governance landscape will consolidate rapidly around whoever has real deployment evidence.

## What We Need To Learn

- [ ] **Independent deployment evidence** — is ANY enterprise actually using Okta for AI Agents, Astrix, ConductorOne, or Vorlon in production? Who? With what results?
- [ ] **Okta GA reality check (May 2026)** — after April 30 GA, do enterprises actually adopt agent-as-identity? Or is it shelfware?
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
- [Astrix RSAC 2026 announcements](https://astrix.security/learn/blog/what-were-announcing-at-rsac-2026-discovery-across-every-layer-and-control-over-what-agents-can-do/)
