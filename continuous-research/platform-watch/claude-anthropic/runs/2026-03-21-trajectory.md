# Anthropic Platform Trajectory Analysis — 2026-03-21

**Focus area:** What is Anthropic building toward? Platform strategy, business user surface, competitive position.

## Key Finding: Anthropic Is Building a Three-Layer Platform

NOT "Intel Inside" only. Three simultaneous strategies:

1. **Open standards as infrastructure** — MCP (connectivity) + Agent Skills (capability). Both adopted by competitors.
2. **Model + runtime engine** — Claude models + Agent SDK. Powers own products AND partner surfaces.
3. **Business user surface** — Claude Cowork + plugins + private marketplaces + B2B marketplace.

## Findings

### 1. Agent Skills — Second Open Standard (after MCP)
**Source:** https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills — [vendor engineering blog, Level 0]
**Additional:** https://thenewstack.io/agent-skills-anthropics-next-bid-to-define-ai-standards/ — [tech press, Feb/Mar 2026]
**Additional:** https://simonwillison.net/2025/Dec/19/agent-skills/ — [practitioner direct, Dec 2025]
**Date:** Dec 2025, updated Feb 2026
**What:** Agent Skills = folders containing SKILL.md + scripts + resources. "Deliciously tiny specification." Adopted by Microsoft (VS Code, GitHub), OpenAI (ChatGPT, Codex), Cursor, Atlassian, Figma. Partner skills from Canva, Stripe, Notion, Zapier. OpenAI quietly adopted structurally identical architecture.
**Key claims:** Two open standards (MCP + Skills); cross-competitor adoption; "MCP provides connectivity, Skills provide procedural knowledge."

### 2. Cowork + Plugins = Business User Surface
**Source:** https://claude.com/blog/cowork-plugins-across-enterprise — [vendor blog, Feb 24, 2026]
**Additional:** https://techcrunch.com/2026/02/24/anthropic-launches-new-push-for-enterprise-agents-with-plugins-for-finance-engineering-and-design/ — [tech press, Feb 24, 2026]
**Additional:** https://www.cio.com/article/4137146/anthropic-targets-core-business-systems-with-new-claude-plug-ins.html — [tech press, Feb 2026]
**Date:** Feb 24, 2026
**What:** Cowork = "Claude Code for the rest of your work." Desktop agent working across computer environment. Plugins = "mini apps" — skill+connector bundles for domain-specific agent work. Private enterprise marketplaces. Department-specific: finance, HR, legal. Connectors for Google Workspace, DocuSign, FactSet, MSCI, LegalZoom. Matt Piccolella (product officer): "We believe future of work means everybody having their own custom agent." Envisions enterprises building "dozens, hundreds, or even thousands" of plugins.
**Key claims:** Cowork is a business product not just dev tool; plugins as mini-apps; private marketplaces; named connectors.

### 3. Microsoft Copilot Cowork — "Intel Inside" AND Own Platform
**Source:** https://www.microsoft.com/en-us/microsoft-365/blog/2026/03/09/copilot-cowork-a-new-way-of-getting-work-done/ — [vendor blog, Mar 9, 2026]
**Additional:** https://fortune.com/2026/03/09/microsoft-copilot-cowork-ai-agents-anthropic-e7-m365-saas/ — [general press, Mar 9, 2026]
**Additional:** https://www.geekwire.com/2026/microsofts-new-copilot-cowork-integrates-anthropics-claude-in-rollout-of-new-e7-licensing-tier/ — [tech press, Mar 2026]
**Date:** March 9, 2026
**What:** Microsoft built Copilot Cowork using Claude model AND same agentic harness as Claude Cowork. Despite $13B in OpenAI, Microsoft built its newest M365 flagship on Claude. $30B Azure compute deal (Nov 2025) + Claude Opus 4.6 in Foundry (Feb 2026) + now Copilot Cowork. Part of E7 ($99/user/mo). Research Preview, broader access late March 2026.
**Key claims:** Same harness as Claude Cowork; E7 pricing; deepening relationship despite OpenAI.

### 4. MCP Enterprise Roadmap — Not Shipped Yet
**Source:** https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/ — [project official blog, David Soria Parra, Mar 9, 2026]
**Additional:** https://thenewstack.io/model-context-protocol-roadmap-2026/ — [tech press, Mar 2026]
**Additional:** https://github.com/agentic-community/mcp-gateway-registry — [practitioner direct, current]
**Date:** March 9, 2026
**What:** Four priorities: transport scalability, agent communication, governance maturation, enterprise readiness. Enterprise items: SSO-integrated auth, gateway/proxy patterns, configuration portability. NO dedicated enterprise working group yet. Community building stopgaps (gateway registries, Keycloak/Entra integration).
**Key claims:** Enterprise governance on roadmap, not shipped; no enterprise working group; community building workarounds.

### 5. Infrastructure Fragility — Serious Enterprise Concern
**Source:** https://www.webpronews.com/claudes-infrastructure-crisis-what-the-chatgpt-exodus-really-means-for-anthropic/ — [tech press, Mar 2026]
**Additional:** https://techcrunch.com/2026/03/02/anthropics-claude-reports-widespread-outage/ — [tech press, Mar 2, 2026]
**Date:** March 2026
**What:** When ChatGPT went down, users flooded Claude. API response times spiked 300%. Enterprise Team/Business tier got timeout errors. 14 incidents between Feb 27 and Mar 5. Major global outage Mar 2 (42% chat, 34% app). Plans to spend $5B on compute in 2026. Enterprise architect at major financial services firm: "raised red flags about single-provider risk."
**Key claims:** 300% API spike; 14 incidents in 7 days; $5B compute spend planned.

### 6. Security Vulnerabilities in Claude Code
**Source:** https://devops.com/security-flaws-in-anthropics-claude-code-risk-stolen-data-system-takeover/ — [domain trade, 2026]
**Date:** 2026
**What:** Check Point found three flaws. CVE-2026-21852 (5.3 severity) — manipulation of repo-controlled config to steal API keys. Another flaw allows automatic execution of arbitrary shell commands in untrusted repos.
**Key claims:** Named CVE; API key theft via config; shell command execution.

### 7. B2B Marketplace + Certifications
**Source:** https://www.digitalcommerce360.com/2026/03/16/anthropic-launches-claude-b2b-marketplace-enterprise-ai-applications/ — [trade publication, Mar 16, 2026]
**Additional:** https://intuitionlabs.ai/articles/claude-enterprise-deployment-training-guide-2026 — [third-party guide, 2026]
**Date:** March 2026
**What:** Marketplace with apps from Snowflake, GitLab, Harvey AI, Replit, Rogo, Lovable. "Claude Certified Architect, Foundations" exam launched March 12. Additional certs planned. Mirrors AWS/Kubernetes certification playbook.
**Key claims:** Named marketplace partners; certification program launched Mar 12.

### 8. $100M Partner Network
**Source:** https://www.anthropic.com/news/claude-partner-network — [vendor announcement, 2026]
**Date:** 2026
**What:** $100M investment. Partners: Accenture (training 30,000 professionals), Deloitte (350,000 associates), PwC, Infosys.
**Key claims:** Dollar amount; named partners; scale numbers.

### 9. Political Risk — Pentagon Dispute
**Source:** https://www.cnbc.com/2026/02/26/anthropic-pentagon-ai-amodei.html — [general press, Feb 26, 2026]
**Date:** Feb 26, 2026
**What:** Pentagon dispute over AI safeguards. Potential "supply-chain threat" designation. Federal agencies told to stop using Anthropic products.
**Key claims:** Supply-chain threat designation risk; federal agency guidance.

### 10. Computer Use as Legacy Integration Play
**Source:** https://brainroad.com/claude-computer-use-what-it-means-for-ai-agents-in-2026/ — [tech blog, 2026]
**Date:** 2026
**What:** 61.4% on OSWorld vs competitors' 7.8%. 94% on Pace Insurance Benchmark. "Zoom Action" for high-res UI inspection. Human-level on spreadsheet navigation and multi-step web forms. Strategic significance: turns desktop into integration layer for systems with no API — mainframes, Citrix, legacy ERPs.
**Key claims:** OSWorld score; Pace benchmark; Zoom Action feature.

### 11. Dario Amodei — Vision Is Safety, Not Platform
**Source:** https://www.darioamodei.com/essay/the-adolescence-of-technology — [practitioner direct, 2026]
**Date:** 2026
**What:** Focuses on capabilities, safety, societal impact. "Technological adolescence" — powerful but not integrated with social/legal frameworks. Platform strategy articulated by Scott Jensen, Matt Piccolella, Kate Jensen — not by Dario.
**Key claims:** Dario writes about safety not enterprise strategy; platform GTM run by others.

## What I Looked For But Did Not Find
- **Managed agent hosting** — no "Anthropic cloud for agents." SDK is self-host only.
- **Agent Teams** — referenced as forthcoming, no ship date.
- **Token efficiency improvements** — no evidence of addressing 3-4x overhead.
- **Enterprise deployment case studies** — lots of pilots, zero "Company X deployed and measured Y."
- **Direct enterprise sales motion** — unclear how enterprises buy beyond partners.

## Orientation

Anthropic is running a dual strategy: own platform (Cowork + plugins + marketplace) AND power others (Microsoft Copilot Cowork). This is more ambitious than "Intel Inside" — it's "Intel Inside AND we make our own computers." The open standards play (MCP + Agent Skills, both adopted by competitors) is the strongest strategic position of any vendor. Computer Use is the sleeper — it solves the "no API" problem for legacy enterprise systems. But infrastructure fragility, no managed hosting, political risk, and no enterprise deployment evidence are real gaps. The platform is emerging fast but the execution risks are high.
