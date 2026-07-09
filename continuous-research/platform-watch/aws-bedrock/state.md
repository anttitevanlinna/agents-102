# AWS Bedrock AgentCore — Platform State

Last updated: 2026-07-09 (cycle 158)
OODA cycles: 5

**Cycle 158 updates (July 9, 2026) — Clearwater Analytics L2 deployment confirmed (public company, 800+ agents, $10T AUM); practitioner failure class taxonomy; Day 21 independent write-up gap persists:**

**Clearwater Analytics (NASDAQ: CWAN) — Level 2 AgentCore deployment (investor-grade metrics).** 800+ AI agents + 500 tools deployed on AgentCore, covering $10T in client assets. Results: manual reconciliations down 90%, regulatory reporting 80% faster, financial close cycles 50% shorter. Announced at AWS re:Invent November 2025; referenced in 2026 AWS context. Evidence level: Level 2 — CWAN is NASDAQ-listed; 800 agent count and $10T AUM are investor-grade disclosures, verifiable against CIR filings. This is the most credible AgentCore production evidence in the knowledge base. Beachhead confirmed: financial services compliance + reconciliation (high-structure, auditability-mandatory). Note: pre-GA deployment; cited at Summit context in AWS materials. ([cwan.com Nov 2025](https://cwan.com/press-releases/cwan-reports-800-ai-agents-now-available-for-deployment-across-10-trillion-in-client-assets/) — [vendor press release, public company])

**Seven production failure classes — practitioner taxonomy.** Pre-GA practitioner guide (konishi.com, Apr 28, 2026): model throttling, content-filter rejection, tool timeouts, runtime cold starts, memory extraction lag, identity failures, network partitions. Four-signal observability model required: operational metrics + logs + traces + quality evaluations. "Skipping the fourth [quality evaluations] is the most common mistake when porting traditional APM mental models onto agentic systems." Model routing achieves 30–60% cost reductions vs single-large-model baseline. ([hidekazu-konishi.com Apr 2026](https://hidekazu-konishi.com/entry/amazon_bedrock_agentcore_production_guide.html) — [practitioner direct])

**Day 21 post-GA: independent write-up gap persists.** Zero named companies have published independent practitioner accounts of post-GA (June 18+) AgentCore deployments. Druva (68% autonomous resolution, 3,000+ users) and CloudZero (5x faster TTFT, 50x growth) are AWS-curated vendor press releases (L0). The pattern from pre-GA continues: vendor-sourced names without independent confirmation.

**Watch: First post-GA independent practitioner account; CWAN Q2 FY2026 earnings for any AgentCore metric update; Nordic AgentCore signal (still absent).**

**Cycle 156 updates (July 7, 2026) — AgentCore 5x quota increase (July 2); deployment evidence gap persists at Day 19:**

**AWS AgentCore runtime quotas raised 5x (July 2, 2026).** Concurrent sessions US East/West: 1,000 → 5,000 (5x). Other regions: 500 → 2,500 (5x). Token processing per agent: 25 → 200 tokens/second (8x). Session creation rate: 100 → 400 TPM (4x). Forrester analyst (Charlie Dai): shift "from single-task copilots to multiple production-grade agents serving larger user populations." Gartner analyst (Ashish Banerjee): higher defaults reduce "operational friction of scaling AI agents from pilot to production." Interpretation: AWS scaling infrastructure ahead of named production workloads — consistent with preparing for enterprise deployments, not confirming they exist. Zero named end-user organizations in any July 2-7 coverage. Nasdaq/Visa/Experian remain AWS-sourced from the AWS Summit June 18 context only — no independent confirmation found. No GA-era practitioner account (post June 18) found as of Day 19. Only pre-GA Rackspace review (October 2025) in the public record. ([infoworld.com Jul 2 2026](https://www.infoworld.com/article/4192220/aws-raises-agentcore-runtime-quotas-by-up-to-5x-to-help-enterprises-scale-ai-agents.html) — domain trade publication)

**Watch: First independent practitioner account of AgentCore post-GA; named enterprise confirmation of Nasdaq/Visa/Experian summit-cited deployments; Nordic signal (still absent).**

**Cycle 155 updates (July 6, 2026) — AWS AgentCore GA confirmed June 18 at AWS Summit NYC — MISSED during 18-cycle Fable 5 ban tracking period:**

**AWS AgentCore hit GA at AWS Summit NYC June 18, 2026 — entirely missed during cycles 136-153.** Janakiram MSV (Forbes Tech, independent cloud infrastructure analyst) published June 21: classified as "a big deal for enterprise adoption" due to two-API abstraction lowering infrastructure complexity. AWS claims 15x agent task volume growth in 6 months — vendor claim, unverified. Named customers in production context at Summit: Nasdaq, Visa, Experian — all AWS-sourced, not independently confirmed. No independent practitioner blog posts or trade press interviews from these companies found. Evidence level: Level 1 (analyst assessment + vendor-sourced named customers). Two-API model (deploy / invoke) is a significant developer experience improvement over the multi-step pre-GA setup. Hosted agents with sandboxed sessions confirmed at GA. ([forbes.com Jun 21 2026](https://www.forbes.com/sites/janakirammsv/2026/06/21/why-aws-agentcore-harness-is-a-big-deal-for-enterprise-agents/) — domain trade publication [Janakiram MSV = cloud infrastructure specialist at Forbes Tech])

**Status update: GA confirmed June 18, 2026.** Previously tracked in cycle 24 (April 2026) as "partially pre-adoption with IaC gap closure." The April 2026 vendor-claimed deployments (Epsilon, Ericsson, Southwest, PwC) were Level 0 vendor-sourced. The June 18 GA event adds Nasdaq/Visa/Experian as AWS Summit context customers (Level 1 — independent analyst reporting on vendor claims). The deployment evidence gap pattern documented in April continues: no named company has published an independent practitioner account of running production workloads on AgentCore.

**Watch: Independent post-GA practitioner posts from non-AWS sources; Nasdaq/Visa/Experian posts confirming Summit-cited deployments; Nordic AgentCore signal (still absent after 3 cycles).**

## Focus

AWS Bedrock AgentCore as an enterprise agent runtime. Not a business user surface — this is pure infrastructure for developers building business agents. Tracked because AgentCore is the first managed runtime supporting all three emerging protocols (MCP + A2A + AG-UI).

## Key Verdict (as of 2026-07-06)

**GA confirmed June 18, 2026 (AWS Summit NYC) — independent deployment evidence gap persists.** Janakiram MSV (Forbes Tech) classified the GA as "a big deal" due to two-API abstraction. AWS-claimed production customers: Nasdaq, Visa, Experian (AWS Summit context, Level 1). Prior April 2026 vendor-claimed customers (Epsilon, Ericsson, PwC) remain Level 0. No independent practitioner has published a production deployment account. The pattern from pre-GA tracking continues at GA: vendor-sourced customer names without independent confirmation. Lock-in risk (Kai Waehner "Risky and Captured" quadrant, April 2026) is now a GA-context finding.

**Previous verdict (2026-04-17):** Pre-adoption status partially updated — CloudFormation IaC support, Agent Registry (preview), Spring AI SDK GA, vendor-sourced claims (Epsilon, Ericsson, Southwest Airlines — all Level 0). CVE-2026-4269 fixed in v0.1.13.

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
- `../cross-platform/runs/2026-07-06-cycle155.md` — AgentCore GA June 18 at AWS Summit NYC confirmed (Finding 5); Nasdaq/Visa/Experian named customers (vendor-sourced L1); missed during 18-cycle Fable 5 tracking period
