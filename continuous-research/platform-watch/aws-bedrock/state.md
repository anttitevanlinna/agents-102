# AWS Bedrock AgentCore — Platform State

Last updated: 2026-03-21 (cycle 23)
OODA cycles: 1

## Focus

AWS Bedrock AgentCore as an enterprise agent runtime. Not a business user surface — this is pure infrastructure for developers building business agents. Tracked because AgentCore is the first managed runtime supporting all three emerging protocols (MCP + A2A + AG-UI).

## Key Verdict (as of 2026-03-21)

**Most architecturally complete managed agent runtime — but pre-adoption.** Five features shipped March 2026: Policy GA (Cedar-based), stateful MCP, AG-UI protocol, memory streaming, shell command API. First platform supporting all three interaction protocols. But: zero independent deployment evidence, Python-only SDK, no IaC support, runtime reliability issues, and a high-severity CVE in the starter toolkit. For AWS-native companies, this is the natural choice. For business users, it offers nothing directly.

## Platform Architecture

### AgentCore Runtime
- Managed container hosting for agents (Docker → ECR → AgentCore)
- Stateful sessions (MCP session persistence)
- Memory streaming
- Shell command API
- Multi-model: Claude, GPT, Gemini, Llama, Mistral via Bedrock
- **Python-only SDK** — no JavaScript/TypeScript yet
- **No IaC support** — no CloudFormation, CDK, or Terraform (source: runs/2026-03-21-cycle23.md)

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

- **SailPoint partnership:** Preferred identity governance for agentic AI on AWS. Agent discovery, human-agent attribution, lifecycle governance. Announcement only (Level 0). ([GlobeNewsWire](https://www.globenewswire.com/news-release/2026/03/16/3256338/0/en/), Mar 2026)
- **Cedar vs OPA:** Cedar = deterministic, formally verified. OPA = dynamic, broader ecosystem. Different tools for different governance philosophies. ([Natoma](https://natoma.ai/blog/mcp-access-control-opa-vs-cedar-the-definitive-guide))

## Personal → Team → Company Progression

| Level | AgentCore product | Maturity | Evidence |
|-------|------------------|----------|----------|
| Personal | None | N/A | No business user surface |
| Team | None | N/A | No team collaboration features |
| Company | AgentCore Runtime + Policy GA | Shipping (GA) | Zero independent deployment evidence |
| Promotion path | N/A | N/A | Not applicable — this is infrastructure, not user-facing |

## Comparison: AgentCore vs Azure Foundry

| Dimension | AgentCore | Azure Foundry |
|-----------|-----------|---------------|
| Approach | Code-first (Docker/Python) | Declarative/YAML-first |
| Governance | Cedar Policy GA (formal verification) | Entra Agent ID, Purview |
| Protocol support | MCP + A2A + AG-UI (all three) | MCP + custom |
| Multi-model | All Bedrock models | OpenAI + Claude + Grok + Nemotron |
| Customer claims | Zero | 10,000+ (vendor-sourced) |
| Independent evidence | Zero | Zero (Corvus Energy named, no metrics) |
| Business user surface | None | Copilot Studio (low-code) |
| Infrastructure lock-in | AWS | Azure |

## What We Need To Learn

- [ ] Independent enterprise deployment evidence — anyone building production business agents on AgentCore?
- [ ] SailPoint integration reality — when does it ship? Does it work?
- [ ] Cedar Policy adoption — are enterprises actually writing Cedar policies for agents, or just using defaults?
- [ ] Multi-system orchestration — anyone connecting 5+ business systems through AgentCore?
- [ ] Nordic signal — any Nordic companies deploying on AgentCore?
- [ ] Python-only SDK — when does JS/TS support arrive?
- [ ] IaC support — when do CloudFormation/CDK/Terraform arrive?

## Sources

See `runs/` for detailed research:
- `runs/2026-03-21-cycle23.md` — Initial research: practitioner reports, AG-UI correction, Cedar analysis, reliability issues
