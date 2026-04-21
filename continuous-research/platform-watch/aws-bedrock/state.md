# AWS Bedrock AgentCore — Platform State

Last updated: 2026-04-17 (cycle 24)
OODA cycles: 2

## Focus

AWS Bedrock AgentCore as an enterprise agent runtime. Not a business user surface — this is pure infrastructure for developers building business agents. Tracked because AgentCore is the first managed runtime supporting all three emerging protocols (MCP + A2A + AG-UI).

## Key Verdict (as of 2026-04-17)

**Pre-adoption status partially updated — but the "independent deployment evidence" gap persists.** April 2026 brings: CloudFormation IaC support (closes a key gap), Agent Registry (preview, 5 regions), Spring AI SDK GA, and vendor-sourced claims of enterprise deployments (Epsilon, Ericsson, Southwest Airlines). But the Epsilon/Ericsson deployment data comes exclusively from AWS blog posts and AWS partner materials — all Level 0. Independent practitioner confirmation has not been found. CVE-2026-4269 is fixed in v0.1.13. SailPoint integration remains an announced partnership, not a shipping product. Lock-in risk is now explicitly flagged by independent analyst (Kai Waehner) who places AgentCore in "Risky and Captured" quadrant.

**Previous verdict (2026-03-21):** Most architecturally complete managed agent runtime — but pre-adoption. Zero independent deployment evidence, Python-only SDK, no IaC support, runtime reliability issues, and a high-severity CVE in the starter toolkit.

## Platform Architecture

### AgentCore Runtime
- Managed container hosting for agents (Docker → ECR → AgentCore)
- Stateful sessions (MCP session persistence)
- Memory streaming
- Shell command API
- Multi-model: Claude, GPT, Gemini, Llama, Mistral via Bedrock
- **Python-only SDK** — no JavaScript/TypeScript yet
- **CloudFormation support shipped April 2026** — IaC gap partially closed. CDK/Terraform status unknown. ([AWS ML blog](https://aws.amazon.com/blogs/machine-learning/build-ai-agents-with-amazon-bedrock-agentcore-using-aws-cloudformation/), Apr 2026 — [vendor press release])
- **Spring AI SDK GA (April 2026)** — Java/Spring developers can now build on AgentCore. ([AWS ML blog](https://aws.amazon.com/blogs/machine-learning/spring-ai-sdk-for-amazon-bedrock-agentcore-is-now-generally-available/), Apr 2026 — [vendor press release])

### Policy GA (Cedar-Based Agent Governance) — the differentiator
- Default-deny authorization for agent-tool access
- Natural language → Cedar policy conversion via API
- Automated reasoning rejects overly permissive policies (formal verification via Lean)
- CloudWatch audit trails in ENFORCE mode
- Security teams can govern agent-tool access without modifying agent code
- **First managed runtime with formal-verification-backed governance**
- (source: [shinyaz](https://shinyaz.com/en/blog/2026/03/15/bedrock-agentcore-policy-cedar-authorization), Mar 2026 — practitioner direct, AWS-affiliated)

### Three-Protocol Support
- **MCP** (agent-to-tools) — stateful, session persistence
- **A2A** (agent-to-agent) — Google-originated
- **AG-UI** (agent-to-frontend) — CopilotKit-originated, broadly adopted (Microsoft, Oracle, LangGraph, CrewAI, etc.)
- First platform supporting all three natively
- (source: [AG-UI docs](https://docs.ag-ui.com/introduction); [AWS announcements](https://aws.amazon.com/about-aws/whats-new/2026/03/), Mar 2026)

## Reliability & Maturity Issues

- **Latency variance:** 2s to 6s for same prompt during peak hours ([TrueFoundry](https://www.truefoundry.com/blog/our-honest-review-of-amazon-bedrock-2026-edition), Jan 2026)
- **Throttling:** "Shockingly low" default quotas (500 tokens/min). Manual support tickets needed to scale. (source: same)
- **Runtime reliability:** Agents stop mid-execution with no error logs. Silent process restarts. 15-minute default session timeout. ([re:Post](https://repost.aws/questions/QUXrgkw_c_QmC2m9fh-6LIzg/aws-bedrock-agentcore-issues))
- **CVE-2026-4269:** High-severity (CVSS 7.5) code injection in Starter Toolkit via S3 bucket naming. Fixed in 0.1.13. ([DailyCVE](https://dailycve.com/aws-bedrock-agentcore-starter-toolkit-code-injection-cve-2026-4269-high/))
- **Knowledge Bases:** Described as "black box" — teams frequently replace with custom retrieval. (source: TrueFoundry)

## Identity & Governance Ecosystem

- **SailPoint partnership (April 2026 update):** Products (Machine Identity Security, Agent Identity Security) now available on AWS Marketplace — simplifying procurement. Technical integration: SailPoint discovers AI agents in AgentCore and governs them as identities alongside human identities (lifecycle governance, access reviews, automated least-privilege). BUT: "implementation is notoriously difficult, often taking over a year to reach maturity with professional service costs that can triple the initial software price." This is an ecosystem partnership, not a plug-and-play integration. ([Cyber Magazine](https://cybermagazine.com/news/how-sailpoint-advances-identity-security-for-aws-ai-agents), Apr 2026 — [tech press]; [infisign.ai SailPoint review](https://www.infisign.ai/reviews/sailpoint), 2026 — [practitioner analysis])
- **Cedar vs OPA:** Cedar = deterministic, formally verified. OPA = dynamic, broader ecosystem. Different tools for different governance philosophies. ([Natoma](https://natoma.ai/blog/mcp-access-control-opa-vs-cedar-the-definitive-guide))

## New: April 2026 Developments

### Agent Registry (Preview)
- Private catalog for discovering and managing AI agents, tools, skills, MCP servers, custom resources
- Semantic + keyword search, approval workflows, CloudTrail audit trails
- **Currently preview in 5 AWS regions only** — not GA
- **Cross-cloud integration not yet established** — manual registration required for non-AWS agents (could recreate the fragmentation problem it aims to solve)
- Risk of "registry sprawl" if enterprises adopt multiple hyperscaler registries simultaneously
- Named deployers: Southwest Airlines (agent catalog and governance across enterprise — vendor claim, [AWS blog](https://aws.amazon.com/blogs/machine-learning/the-future-of-managing-agents-at-scale-aws-agent-registry-now-in-preview/), Apr 2026 — [vendor press release])
- ([InfoWorld](https://www.infoworld.com/article/4157183/aws-targets-ai-agent-sprawl-with-new-bedrock-agent-registry.html), Apr 2026 — [independent tech journalism] — InfoWorld article is balanced, names no production deployments)

### Vendor-Claimed Enterprise Deployments (Level 0 — unverified)
Three deployments cited in AWS materials. ALL sourced exclusively from AWS blog posts or AWS partner pages. None independently confirmed:
- **Epsilon:** "30% reduction in campaign setup time, 20% increase in personalization, 8 hours/week saved" — marketing automation ([AWS blog](https://aws.amazon.com/blogs/machine-learning/amazon-bedrock-agentcore-is-now-generally-available/), Oct 2025 — [vendor press release])
- **Ericsson:** "Double-digit gains in R&D, workforce of tens of thousands" — AgentCore for R&D operations ([AWS blog](https://aws.amazon.com/blogs/machine-learning/amazon-bedrock-agentcore-is-now-generally-available/), Oct 2025 — [vendor press release]). NOTE: Ericsson's own 2026 AI announcements reference Mistral AI partnership for telecom agents and NetCloud integration — no mention of AgentCore in independent Ericsson press. The Ericsson AgentCore claim appears exclusively in AWS materials.
- **PwC:** Multi-agent system with Supervisor Agent + 4 specialist agents. ([AWS/PwC page](https://www.pwc.com/us/en/technology/alliances/library/deploying-agentic-ai-at-enterprise-scale-with-amazon-bedrock-agentcore.html) — 404 as of April 17, 2026. [vendor press release / partner content])
- **Evidence level for all three: Level 0.** These are AWS co-marketing claims. Until a Epsilon or PwC practitioner independently describes the deployment, these are sales materials.

### SDK Downloads as Proxy (Weak Signal)
AWS claims 2M+ AgentCore SDK downloads in 5 months since preview. This is a download count, not a deployment count — useful only as directional interest signal, not deployment evidence.

### Lock-in Risk (New Independent Assessment)
Kai Waehner (independent enterprise AI/data architect, April 6, 2026) places AgentCore in "Risky and Captured" quadrant: "Enterprises building agentic workflows on AgentCore are not just choosing a model API. They are embedding their agent architecture into AWS's runtime, governance, and observability stack in ways that compound over time and become increasingly difficult to unwind." Model flexibility (multi-LLM via Bedrock) does not reduce dependency on the proprietary agent orchestration layer. ([kai-waehner.de](https://www.kai-waehner.de/blog/2026/04/06/enterprise-agentic-ai-landscape-2026-trust-flexibility-and-vendor-lock-in/), Apr 2026 — [practitioner analysis])

## Personal → Team → Company Progression

| Level | AgentCore product | Maturity | Evidence |
|-------|------------------|----------|----------|
| Personal | None | N/A | No business user surface |
| Team | None | N/A | No team collaboration features |
| Company | AgentCore Runtime + Policy GA + Agent Registry | Shipping (GA); Registry in preview | Vendor-claimed (Level 0) for Epsilon/Ericsson/Southwest/PwC; no independent deployment evidence |
| Promotion path | N/A | N/A | Not applicable — this is infrastructure, not user-facing |

## Comparison: AgentCore vs Azure Foundry

| Dimension | AgentCore | Azure Foundry |
|-----------|-----------|---------------|
| Approach | Code-first (Docker/Python/Java via Spring AI) | Declarative/YAML-first |
| Governance | Cedar Policy GA (formal verification) | Entra Agent ID, Purview |
| Protocol support | MCP + A2A + AG-UI (all three) | MCP + custom |
| Multi-model | All Bedrock models | OpenAI + Claude + Grok + Nemotron |
| IaC support | CloudFormation GA (Apr 2026); CDK/Terraform unknown | ARM templates, Bicep |
| Customer claims | Epsilon, Ericsson, Southwest, PwC (vendor-sourced, Level 0) | 10,000+ (vendor-sourced) |
| Independent evidence | Zero confirmed | Zero (Corvus Energy named, no metrics) |
| Business user surface | None | Copilot Studio (low-code) |
| Infrastructure lock-in | AWS — "Risky and Captured" (Waehner 2026) | Azure |

## What We Need To Learn

- [ ] Independent enterprise deployment evidence — Epsilon and Ericsson are AWS-claimed, not independently confirmed. Need a practitioner blog post or third-party analysis from someone at those companies.
- [ ] SailPoint integration reality — marketplace listing exists; actual deployment in production at an enterprise has not been reported.
- [ ] Cedar Policy adoption — are enterprises actually writing Cedar policies for agents, or just using defaults?
- [ ] Multi-system orchestration — anyone connecting 5+ business systems through AgentCore?
- [ ] Nordic signal — no evidence of any Nordic company on AgentCore found. AWS-native Nordics (Elisa, Telia, Posti) are candidates but no signal found.
- [ ] JS/TypeScript SDK — still Python + Java (Spring AI) only. No JS/TS.
- [ ] CDK / Terraform support — CloudFormation shipped; CDK and Terraform status unknown.
- [ ] Agent Registry cross-cloud — will it discover non-AWS agents? Currently unclear.

## CVE Status (updated)

- **CVE-2026-4269 (High, CVSS 7.5):** S3 bucket squatting attack in Starter Toolkit before v0.1.13. Fixed. Affects only users who built the toolkit between September 24, 2025 and the v0.1.13 release. Users on v0.1.13+ are not affected. ([GitHub Advisory](https://github.com/aws/bedrock-agentcore-starter-toolkit/security/advisories/GHSA-xfhr-q72q-jcrj), Mar 2026)

## Sources

See `runs/` for detailed research:
- `runs/2026-03-21-cycle23.md` — Initial research: practitioner reports, AG-UI correction, Cedar analysis, reliability issues
- `runs/2026-04-17-cycle24.md` — April update: Agent Registry, IaC gap closure, SailPoint marketplace, CVE fix confirmation, lock-in risk assessment, claimed enterprise deployments (Level 0)
