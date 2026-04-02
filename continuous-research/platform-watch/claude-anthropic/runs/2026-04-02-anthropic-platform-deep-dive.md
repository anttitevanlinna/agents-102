# Anthropic Platform Deep Dive — April 2, 2026

**Research focus:** Is Anthropic building Claude Code / Claude Agent SDK into a general-purpose agent platform, not just a coding tool? Map the full picture: what's shipped, what's building, what's rumoured, strategic logic.

**Method:** Web search across 8 research tracks. Source-typed and evidence-leveled per project rules.

---

## Executive Summary

**The answer is unambiguously yes — and it's already happening.** Anthropic has systematically evolved from "model provider" to "agent platform" across six reinforcing vectors: Cowork (business user surface), Agent SDK (developer harness), Antspace (hosting/runtime), MCP + Agent Skills (open standards), Computer Use + Dispatch (desktop automation), and the Claude Partner Network (enterprise distribution). The IPO timeline (Q4 2026, $60B target) creates urgency to demonstrate platform revenue, not just API consumption. The competitive data is striking: Anthropic captured 73% of new enterprise AI spend in the past 10 weeks (Ramp data, March 2026).

**The strategic logic is clear:** Claude Code was the proof-of-concept for a general-purpose agent harness. Cowork extends it to business users. Antspace extends it to hosting. The Agent SDK lets enterprises build their own. MCP and Agent Skills let it all interoperate. Computer Use solves legacy integration. Every piece reinforces the others.

---

## Track 1: Product Announcements and Roadmap (Oct 2025 - Apr 2026)

### What has shipped

| Date | Product | Significance |
|------|---------|-------------|
| Nov 2025 | Opus 4.5 | Major coding leap. Thompson: "could accomplish tasks — some taking hours — correctly." |
| Dec 2025 | Agent Skills open standard | Portable skill bundles across platforms. Adopted by Microsoft, OpenAI, Cursor, Atlassian, Figma. |
| Jan 12, 2026 | **Claude Cowork** (research preview) | "Claude Code for the rest of your work." Desktop agent for business users. |
| Jan 30, 2026 | Cowork plugins (11 initial) | Finance, HR, legal, productivity domain bundles. |
| Feb 4, 2026 | Ad-free commitment | Advertising incompatible with helpful AI. |
| Feb 5, 2026 | **Opus 4.6 + Sonnet 4.6** | 1M context. Agent Teams (research preview). 14.5h METR horizon. |
| Feb 24, 2026 | Cowork enterprise upgrade | Private plugin marketplaces, 10 new plugins, 12 MCP connectors, cross-app workflows, "Customize" admin controls. |
| Feb 25, 2026 | Vercept acquisition ($50M) | Computer vision team (Ross Girshick). Purpose-built for Computer Use. |
| Mar 6, 2026 | B2B Marketplace | Enterprise-only. GitLab, Harvey, Lovable, Replit, Rogo, Snowflake. |
| Mar 9, 2026 | **Copilot Cowork** (Microsoft) | Claude model + agentic harness in M365 E7 ($99/user/mo). |
| Mar 12, 2026 | Claude Partner Network ($100M) | Accenture, Deloitte, PwC, Infosys. First certification: "Claude Certified Architect." |
| Mar 14, 2026 | Agent SDK v2.1.76 | MCP elicitation support, tool search/lazy loading. SDK renamed from "Claude Code SDK" to "Claude Agent SDK." |
| Mar 17, 2026 | **Dispatch** (research preview) | Assign tasks from iPhone, Claude executes on Mac desktop. Persistent cross-device conversation. |
| Mar 23, 2026 | **Computer Use** (research preview) | Claude controls Mac: opens apps, clicks, types, navigates. 72.5% OSWorld (human-level). Pro/Max. |
| Mar 24, 2026 | Self-serve Enterprise plans | Any org can purchase directly. No sales team required. |
| ~Mar 31, 2026 | Claude Code source leak | 500K lines, 1,900 files accidentally included in NPM package. Process error, not breach. |
| ~Mar 26, 2026 | **Claude Mythos leak** | Next-gen model. "Step change" in capabilities. Cybersecurity concerns. Not released. |

**Source types:** [Anthropic blog — vendor direct], [CNBC — general press, bare facts], [Simon Willison — practitioner direct], [The New Stack — domain trade publication], [TechCrunch — tech press, bare facts]

**Evidence level:** Level 2 (shipped products, independently verifiable). Cowork enterprise deployment evidence still Level 0 (vendor claims only).

### The "Madcap March" shipping velocity

The New Stack counted 14+ launches in March 2026 alone, alongside 5 outages. This is not a company refining a single product — this is platform-building at speed. The infrastructure fragility is the cost.
- Source: [The New Stack roundup](https://thenewstack.io/anthropic-march-2026-roundup/) [domain trade publication]

---

## Track 2: Antspace and Deployment Infrastructure

### Antspace — from staging to strategic necessity

No new public information since AprilNEA's March 18 reverse-engineering. Still in staging. No Anthropic acknowledgment.

**But the strategic logic has tightened:**
- Claude Code source leak (Mar 31) exposed the full agent harness architecture. Competitors can now study it.
- Antspace is the missing piece that completes the "natural language to deployed app" pipeline.
- BYOC support in the binary confirms enterprise-grade ambitions — this isn't just a Vercel clone for hobbyists.

**The deployment flow:** User describes app → Baku generates it → Supabase provisions database → Antspace hosts it. All within Anthropic's ecosystem. BYOC allows enterprise deployment in their own infrastructure with Anthropic API orchestration.

**Technical details (unchanged from cycle 69):** Firecracker microVMs, 4 vCPU/16GB/252GB, Go binary with full debug symbols, three-stage deploy protocol, Kubernetes integration for BYOC.

**$50B infrastructure investment** announced for American AI infrastructure (data centers with Fluidstack in Texas and New York, first sites live in 2026). This isn't just training compute — at this scale, it must include inference and hosting infrastructure.
- Source: [Anthropic announcement](https://www.anthropic.com/news/anthropic-invests-50-billion-in-american-ai-infrastructure) [vendor direct]

**Evidence level:** Level 2 (single practitioner reverse-engineering, independently verifiable binary analysis). Infrastructure investment is Level 0 (vendor announcement).

---

## Track 3: Claude Cowork Evolution

### The "bigger than Code" signal

**Bloomberg, April 1, 2026:** Anthropic CCO Paul Smith says Cowork has seen "stronger adoption in the first few weeks" than Claude Code did in its comparable early period. Expects Cowork to reach a "wider market" because engineering is 2-5% of a company's staff while Cowork targets the other 95-98%.
- Source: [Bloomberg](https://www.bloomberg.com/news/articles/2026-04-01/anthropic-executive-sees-cowork-agent-as-bigger-than-claude-code) [general press — executive quote, treat as vendor claim until independently verified]

**Claude Code revenue context:** $2.5B annualized by February 2026, doubling since January 1. If Cowork tracks faster, Anthropic is looking at a potential revenue inflection from business users.

### Cowork feature progression

1. **Jan 12:** Basic desktop agent (research preview, Max only)
2. **Jan 30:** 11 starter plugins
3. **Feb 24:** Private marketplaces, 21 plugins, 12 MCP connectors, cross-app Excel/PowerPoint, admin controls
4. **Mar 17:** Dispatch (mobile → desktop task assignment)
5. **Mar 23:** Computer Use integration (can control any Mac app)

**The trajectory is unmistakable:** Cowork went from "chat with files" to "autonomous desktop agent you can command from your phone" in 10 weeks.

### Scheduled tasks — the automation primitive

Cowork now supports recurring scheduled tasks: daily, weekly, hourly, on-demand. Each task spins up its own session. Set up via `/schedule` or sidebar UI.

**Why this matters:** This is the bridge from "assistant" to "autonomous agent." A scheduled Cowork task that runs every morning, pulls metrics, and formats a report is not a chatbot — it's a process automation agent. This is the primitive that makes Cowork a business process platform.
- Source: [The Decoder](https://the-decoder.com/anthropic-turns-claude-code-into-a-background-worker-with-local-scheduled-tasks/) [domain trade publication]

**Evidence level:** Level 2 (features shipped and independently described). Zero enterprise deployment evidence.

---

## Track 4: Claude Agent SDK Direction

### The renaming tells the story

"Claude Code SDK" → "Claude Agent SDK" is not a rebrand. It's a strategic declaration. The SDK page now describes it as "a powerful, general-purpose agent harness adept at coding, as well as other tasks."

Anthropic's own engineering blog: "At Anthropic, [Claude Code] has been used for deep research, video creation, and note-taking, among countless other non-coding applications, and has begun to power almost all of their major agent loops."
- Source: [Anthropic engineering](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) [vendor direct — but engineering blog, substantive technical detail]

### SDK capabilities (as of v2.1.76)

- Agent loop with tool calling, context management, client-side compaction
- MCP elicitation support
- Tool search / lazy loading (discover tools by context, not pre-load all)
- Python and TypeScript
- Self-host only — no managed hosting (Antspace could change this)

### Agent Skills as the portability layer

Skills work across Claude.ai, Claude Code, Agent SDK, and API. Partners: Atlassian, Figma, Canva, Stripe, Notion, Zapier. Open standard at agentskills.io.

**Strategic significance:** If you build a skill for Claude, it works in Cowork, in Code, in the SDK, in Copilot Cowork. One investment, every surface. This is platform thinking.
- Source: [Anthropic engineering](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) [vendor direct]

**Evidence level:** Level 2 (shipped SDK, independently usable). "General-purpose" usage claims are Level 1 (Anthropic's own experience, not independent convergence).

---

## Track 5: Business Strategy and IPO

### IPO timeline: Q4 2026, $60B+

- Anthropic considering IPO as soon as October 2026 — The Information, March 27
- Target raise: $60B+
- Current valuation: $380B (February 2026 round, $30B raised)
- Source: [The Information via Investing.com](https://www.investing.com/news/stock-market-news/anthropic-considers-ipo-as-soon-as-q4-2026-the-information-4584016) [general press — financial reporting, bare fact]

### Revenue trajectory

- $19B annualized revenue by March 2026 (up from $9B at year-end 2025)
- Revenue doubled in ~2 months
- 80% enterprise revenue mix
- Claude Code alone: $2.5B annualized (Feb 2026)
- Gross margins improving toward ~40% in 2026
- Capital efficiency: $0.23 ARR per dollar raised (vs OpenAI $0.11)
- Source: [Let's Data Science](https://letsdatascience.com/blog/anthropic-revenue-doubled-60-billion-ipo-october-2026) [tech blog — aggregating financial reports]

### Enterprise penetration

- 8 of Fortune 10 are Claude customers
- 300,000+ business customers
- 500+ spending $1M+ annually
- Enterprise penetration 44%, up 25 percentage points since May 2025
- Source: [TechResearchOnline](https://techresearchonline.com/blog/anthropics-rise-enterprise-ai-shift-2026/) [tech press]

### What the IPO timeline means for platform strategy

**An October 2026 IPO creates a 6-month window to demonstrate platform revenue growth, not just API consumption.** Cowork + Antspace + marketplace + Partner Network are all platform revenue plays. The IPO narrative needs to be "we're a platform" not "we sell tokens."

**Evidence level:** Revenue figures are Level 2 (multiple independent sources reporting similar numbers). Enterprise customer claims are Level 0-1 (vendor claims, partially confirmed by Ramp data).

---

## Track 6: Partnerships and Enterprise Deals

### Multi-cloud + own platform (the tension)

Anthropic is the only frontier AI model on all three major clouds:
- **AWS:** Project Rainier (hundreds of thousands of AI chips), Amazon Trainium for training/inference
- **Google Cloud:** Up to 1M TPUs, deal "worth tens of billions," >1 GW compute capacity in 2026
- **Microsoft:** $30B Azure deal (Nov 2025), Copilot Cowork integration

**The strategic tension:** Anthropic sells through cloud partners AND builds its own platform surfaces (Cowork, Antspace, marketplace). This is the Intel vs. Apple playbook — sell the chip AND sell the computer. It works until the distribution partners feel threatened.

### Claude Partner Network ($100M)

- Accenture (30K consultants), Deloitte (350K), PwC, Infosys, Cognizant
- 5x scaling of partner-facing team
- Applied AI engineers for live customer deals
- First certification: Claude Certified Architect
- International go-to-market support
- Source: [Anthropic](https://www.anthropic.com/news/claude-partner-network) [vendor direct]

**Evidence level:** Partnership announcements are Level 0 (vendor). Multi-cloud availability is Level 2 (independently verifiable).

---

## Track 7: Rumours, Leaks, and Forward Signals

### Claude Mythos (leaked March 26, 2026)

- Next-generation model, above Opus tier — "entirely new capability class"
- "Step change" in performance, "most capable we've built to date"
- "Dramatically higher" than Opus 4.6 on coding, reasoning, cybersecurity benchmarks
- "Currently far ahead of any other AI model in cyber capabilities"
- Anthropic privately warning government officials about cybersecurity implications
- Available only to select clients for cybersecurity defense use cases
- Not publicly released, no timeline
- Discovered via misconfigured data store exposing ~3,000 internal assets
- Source: [Fortune exclusive](https://fortune.com/2026/03/26/anthropic-says-testing-mythos-powerful-new-ai-model-after-data-leak-reveals-its-existence-step-change-in-capabilities/) [general press — but first-hand leak reporting]; [CoinDesk](https://www.coindesk.com/markets/2026/03/27/anthropic-s-massive-claude-mythos-leak-reveals-a-new-ai-model-that-could-be-a-cybersecurity-nightmare/) [general press]

**Evidence level:** Level 2 (leaked internal documents, independently reported by multiple outlets). Claims about capabilities are vendor self-assessment, not independent benchmarks.

### Claude Code source leak (March 31, 2026)

- 500K lines, 1,900 files accidentally included in NPM package
- "Process error" due to fast release cycle
- Became fastest-growing GitHub repo in history before DMCA takedowns
- DMCA was overbroad, hit thousands of unrelated repos, later scaled back
- Security risk: competitors can reverse-engineer the agent harness architecture
- Source: [Bloomberg](https://www.bloomberg.com/news/articles/2026-04-01/anthropic-accidentally-releases-source-code-for-claude-ai-agent) [general press — financial]; [BleepingComputer](https://www.bleepingcomputer.com/news/artificial-intelligence/claude-code-source-code-accidentally-leaked-in-npm-package/) [domain trade — security]; [Fortune](https://fortune.com/2026/03/31/anthropic-source-code-claude-code-data-leak-second-security-lapse-days-after-accidentally-revealing-mythos/) [general press]

**Evidence level:** Level 3 (multiple independent sources, independently verifiable event).

### Two leaks in one week — the operational risk signal

Mythos leak (Mar 26) + Claude Code source leak (Mar 31) = two major security incidents in 5 days. Both from operational process failures, not external attacks. This is the infrastructure fragility pattern manifesting at the organizational level, not just the technical level. For an IPO-bound company that brands on safety, this is a credibility risk.

---

## Track 8: Competitive Picture

### Ramp data — the hard numbers

**March 2026 Ramp AI Index:**
- Anthropic captured **73% of new enterprise AI spend** in past 10 weeks
- 24.4% of businesses on Ramp now pay for Claude (up from ~4% a year ago)
- 4.9% month-over-month adoption growth (largest monthly gain ever tracked)
- 55% of orgs with a generative AI vendor use Anthropic (up 32pp YoY)
- New businesses choosing AI for the first time: ~70% choose Anthropic
- Source: [Ramp AI Index March 2026](https://ramp.com/velocity/ai-index-march-2026) [practitioner data — Ramp's own spend data, not a survey]

**Evidence level:** Level 3 (convergence — Ramp data represents actual spend across thousands of businesses). This is the strongest evidence in the entire research set.

### The positioning difference

- **Anthropic:** Safety as infrastructure. Enterprise first. Open standards (MCP, Agent Skills). Own platform + power others.
- **OpenAI:** Vertical integration. Own the whole stack (Stargate, $600B compute). Consumer + enterprise. Closed ecosystem tendency.
- **Google:** Cost efficiency. Infrastructure advantage (TPUs). Workspace integration. But less focused on agents.

### Key competitive metrics

| Metric | Anthropic | OpenAI |
|--------|-----------|--------|
| New enterprise AI spend share | 73% | 27% |
| Enterprise penetration (survey) | 44% | ~60% (declining share) |
| Capital efficiency (ARR/$ raised) | $0.23 | $0.11 |
| GitHub commit share | 4% (rising to 20%+) | — |
| Consumer scale | ~220M monthly visits | ~200M weekly actives |
| IPO target | $60B (Q4 2026) | ~$300B (already structured) |

---

## The Platform Picture: Connecting the Dots

### The six vectors of the general-purpose agent platform

```
1. COWORK (business user surface)
   └─ Plugins, marketplace, scheduled tasks, Dispatch

2. AGENT SDK (developer harness)
   └─ Python/TypeScript, tool calling, context management

3. ANTSPACE (hosting/runtime)  ← not yet public
   └─ BYOC, Firecracker microVMs, Supabase integration

4. MCP + AGENT SKILLS (open standards)
   └─ 97M installs, adopted by all major platforms

5. COMPUTER USE + DISPATCH (desktop automation)
   └─ macOS control, mobile assignment, human-level OSWorld

6. PARTNER NETWORK (enterprise distribution)
   └─ $100M, Accenture/Deloitte/PwC, certifications
```

### How they connect

- **Cowork** uses the **Agent SDK** harness internally
- **Cowork** connects to enterprise systems via **MCP**
- **Cowork** loads domain capabilities via **Agent Skills**
- **Cowork** controls legacy systems via **Computer Use**
- **Cowork** receives tasks remotely via **Dispatch**
- **Cowork** runs scheduled autonomous workflows
- **Antspace** could host apps built by Cowork/Code
- **BYOC** lets enterprises run the whole thing in their cloud
- **Partner Network** distributes it all through SI channels
- **Copilot Cowork** distributes through Microsoft's M365

### The "natural language to running business process" pipeline

Today (April 2026), a Max subscriber can:
1. Tell Cowork what they want (natural language)
2. Cowork builds it using plugins + MCP connectors
3. Schedule it to run recurring (hourly/daily/weekly)
4. Assign new tasks from their phone via Dispatch
5. Cowork controls their Mac desktop to interact with any app
6. Computer Use handles legacy systems with no API

What's missing:
- **Managed hosting** (Antspace, not yet public)
- **Team/company deployment** (private marketplaces exist, but no evidence of team-scale agent workflows)
- **Enterprise deployment evidence** (zero independent reports of measurable business outcomes)

---

## Risks and Counter-Evidence

### 1. Infrastructure fragility is getting worse, not better
109 incidents in 90 days. 5+ outages in March alone. Own SRE says "Claude goes down more often than any of us would like." For an enterprise platform play, this is the #1 blocker. No amount of features matter if the system is down.
- **Evidence level:** Level 3 (convergence — multiple independent reports, StatusGator data, SRE's own admission)

### 2. Two security leaks in one week (Mythos + source code)
An IPO-bound company branding on safety had two major data exposure incidents in 5 days. Both were operational process failures. This undermines the safety narrative.
- **Evidence level:** Level 3 (independently verified events)

### 3. Zero independent enterprise deployment evidence for Cowork
Every enterprise claim (Thomson Reuters, NYSE, Epic) is vendor-channeled from launch events. Zero practitioner reports. Zero independent case studies. Zero measurable outcomes. Cowork's enterprise story is currently Level 0.
- **Evidence level:** The absence itself is Level 3 evidence (we've looked systematically across multiple cycles and found nothing independent).

### 4. Pentagon / government conflict
Federal "supply chain risk" designation, lawsuit, court injunction. While Anthropic won the injunction, the conflict is ongoing. Government contracts are a significant enterprise revenue stream, and this creates uncertainty.
- **Evidence level:** Level 3 (independently verified legal proceedings)

### 5. Token efficiency gap
Claude Code uses 3-4x more tokens than competitors per equivalent task. At enterprise scale, this is a cost problem. $5B compute spend addresses capacity but not per-unit economics.
- **Evidence level:** Level 2 (practitioner reports)

### 6. Antspace is still staging
The most strategically important piece (managed hosting) has no public announcement, no timeline, and still runs with `staging-` version prefixes.

### 7. Model commoditization risk
Ben Thompson notes AI models are commoditizing "faster than anyone predicted." If models commoditize, the platform layer matters more — but Anthropic's platform (Cowork, Antspace) is newer and less proven than Microsoft's or Google's.

---

## Key Finding: The Platform Thesis Is Real, But Unproven at Enterprise Scale

**What we can say with confidence (Level 3):**
- Anthropic is winning new enterprise AI spend (73% of new spend, Ramp data)
- The product surface has expanded from "coding tool" to "general-purpose agent platform" in 6 months
- MCP and Agent Skills are becoming industry-wide standards (97M installs, adopted by competitors)
- Revenue growth is extraordinary ($9B → $19B annualized in ~3 months)
- Infrastructure reliability is a serious, documented problem

**What we can say with moderate confidence (Level 2):**
- Antspace exists and is enterprise-grade in ambition (BYOC, Kubernetes)
- The Agent SDK rename signals general-purpose intent
- Cowork's early adoption outpaces Claude Code's comparable period (single executive claim)
- Claude Mythos represents a significant capability step (leaked internal assessment)

**What remains unproven (Level 0-1):**
- Enterprise Cowork deployments with measurable business outcomes
- Antspace production readiness or timeline
- Whether the "own platform + power others" strategy creates unsustainable channel conflict
- Whether infrastructure reliability will improve fast enough for enterprise trust
- Whether Cowork's broader market potential translates to actual enterprise revenue

---

## Implications for Our Framework

### For the CTO answer
Anthropic's platform play changes the answer from "Claude is the best model, use it via API or partner platforms" to "Claude is becoming a platform itself — and you need to decide whether to build on it, use it through Microsoft, or both."

### For training
Module needed: "Understanding Claude's platform layers — when to use Cowork vs. Agent SDK vs. partner integrations (Copilot Cowork)"

### For the competence-first thesis
Anthropic's strategy validates our core argument: the platform doesn't matter if you don't have agent competence. Cowork lowers the barrier for business users, but someone still needs to decide WHICH processes to automate, WHAT success looks like, and HOW to structure the work. That's the competence gap.

### For the coding agents as meta-platform thesis
The Agent SDK rename + Antspace + source code leak collectively confirm: Claude Code IS the meta-platform. It built Cowork. It built itself. It's building Antspace. The self-referential loop is exactly what we predicted.
