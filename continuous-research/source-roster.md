# Source Roster — People to Follow

Track these practitioners by name. Their trajectory over time IS the research signal.

## The Signal Flow

```
Solo builders → publish openly → enterprises don't believe →
first teams in proper firms report success → CREDIBILITY SIGNAL →
enterprises start moving
```

**Two segments to watch:**

| Segment | What they tell us | Trust level for CTOs |
|---------|------------------|---------------------|
| **Segment A: Solo builders / small companies** | What's POSSIBLE. The future direction. | Low — "some builder on X.com" |
| **Segment B: First enterprise teams** | What's VIABLE for organizations. The timing signal. | High — "our peers tried it" |

**The article moment** is when Segment B starts confirming what Segment A has been saying for 3-6 months. That's the chasm-crossing signal. We write the article at THAT moment — not when solo builders discover it (too early for our audience) and not when enterprises broadly adopt it (too late, everyone knows).

## How to Use This File

For each person: what's their current position on agents? What did they say 6 months ago? Where did they shift? The shift is the story.

Update this file after each research round. Add new people when they surface. Remove people who go quiet or become irrelevant.

**Discovery method: global first, Nordic subset second.** Start with the global scan — that tells us what's hot and upcoming. Then check for Nordic practitioners doing the same thing — that tells us roll-out speed. If we search Nordic-first, we miss signals because the frontier practitioners are global.

**The roster is thin on business-domain practitioners.** We have coding/infra people (Segment A) and academics (Segment B). We need people doing agent work in operations, finance, HR, compliance, customer service, sales, product. These people publish on LinkedIn and at industry events, not on X.com. The hourly research cycle should opportunistically discover and add them.

---

## Segment A: Solo Builders & Infrastructure Makers

These people build, ship, and publish. They show what's possible before enterprises believe it.

| Person | Role | Where to follow | Why they matter | Current position (as of date) |
|--------|------|----------------|-----------------|-------------------------------|
| **Andrej Karpathy** | Ex-OpenAI, educator | [X.com/@karpathy](https://x.com/karpathy), YouTube, [GitHub/karpathy](https://github.com/karpathy) | Reversed on agents for coding (Dec 2025). His trajectory = the coding agent story. **AutoResearch** (Mar 2026, 42K stars): autonomous ML experiment runner — agent modifies code, runs 5-min experiment, keeps/reverts based on val_bpb metric, loops indefinitely. 700 experiments in 2 days, 20 kept improvements, found bug Karpathy missed in months. Key insight: `program.md` (natural-language research spec) IS the moat. "The researcher's new job is writing the spec." Validated by Tobi Lütke (applied to Shopify Liquid: 53% faster, 61% fewer allocations from 93 automated commits) and SkyPilot (scaled to 16 GPUs). Level 3 convergence within days. **WHY HE MATTERS FOR US:** AutoResearch proves the "context creation is the ceiling" thesis for ML research. `program.md` = the human judgment layer. Same pattern as our `cycle-prompt.md`, Corey Haines' marketing skills, Dan Shipper's compound engineering. The coding agent compounds — the human provides direction. | AutoResearch: autonomous experiment loop. `program.md` as the moat. "All frontier labs will do this." (Mar 2026) |
| **Dario Amodei** | CEO, Anthropic | Blog, interviews | Shapes Claude's direction. MCP was his bet on tool ecosystem. | |
| **Amanda Askell** | Prompt engineering lead, Anthropic | X.com | Claude's "character" designer. Influences how Claude agents behave. | |
| **Simon Willison** | Developer, blogger | simonwillison.net, X.com | Best independent technical analyst of LLM capabilities. Brutally honest. | |
| **Harrison Chase** | CEO, LangChain/LangGraph | X.com, blog | Built the most-used agent framework. Knows where it breaks. | |
| **Itamar Friedman** | CEO, Codium/Qodo | X.com | Building coding agents. Has real production data on what works. | |
| **Scott Wu** | CEO, Cognition (Devin) | X.com, blog | Devin = the first "AI software engineer." Real production data on autonomous agents. | |
| **Thorsten Ball** | Engineer, Anthropic (Claude Code) | X.com, blog | Builds Claude Code. Knows the actual architecture. | |
| **Matt Shumer** | CEO, HyperWrite/OthersideAI | X.com | Builds agent products. Vocal about what works and what doesn't. | |
| **Dan Shipper** | CEO, Every Inc. | [every.to](https://every.to), X.com | Coined "compound engineering" with Kieran Klaassen. Runs 5 products each built by ~1 person using Claude Code. The compound engineering plugin (5,132 stars) is the first named methodology for the coding agent flywheel. Key claim: 1 dev = 5 devs output. **Domain:** business/media, not just coding. **WATCH:** Does compounding evidence scale beyond Every? Do enterprise teams adopt the methodology? | Compound engineering methodology. 80/20 plan-review vs execution. Plugin v2.48.0. (Mar 2026) |
| **Will Larson** | Engineering leader, Imprint. Author of "Staff Engineer" and "An Elegant Puzzle" | [lethain.com](https://lethain.com), X.com | Independently validated compound engineering in Imprint's monorepos. Assessment: "not shocking but extremely effective." First Segment B practitioner to confirm the flywheel. Implementation took ~1 hour. **WATCH:** Does Imprint publish outcomes data? | Implementing compound engineering at Imprint. (Jan 2026) |
| **Reuven Cohen (rUv)** | CTO GenAI, EY Americas / Agentics Foundation | [X.com/@rUv](https://x.com/rUv), [GitHub/ruvnet](https://github.com/ruvnet), [agentics.org](https://agentics.org) | Built Claude Flow/Ruflo (14K stars, multi-agent orchestration). Unique position: solo builder velocity + enterprise context (EY). Could be the one who wires together the gaps nobody has filled (promotion path, multi-system orchestration, agent registry). Distinguishes "agentic engineering" from "vibe coding." Adrian Cockcroft (ex-Netflix/AWS VP) validated Claude Flow — segment 1→2 bridge. **WATCH:** Does Ruflo evolve from dev tool to business platform? | Prolific builder. 1M+ lines generated. Agentic engineering framing. (Mar 2026) |
| **Corey Haines** | SaaS marketer → agentic builder. Founder of Conversion Factory, Swipe Files, Magister Marketing | [X.com/@coreyhainesco](https://x.com/coreyhainesco), [GitHub/coreyhaines31](https://github.com/coreyhaines31), [corey.co](https://www.corey.co/) | **The chasm-crossing practitioner.** Non-engineer who encoded marketing domain expertise into Claude Code skills (Marketing Skills repo, 15.4K stars). Built Magister (autonomous marketing agent) on top. Built "Coding for Marketers" to bridge non-technical people into agentic tools. His trajectory IS the competence-first story: domain expert + coding agent = context creation at speed. Key insight: "The bottleneck holding back marketers from using agentic AI is that no marketing tools come with a CLI." This is the infrastructure gap between what agents can do and what business tools support. **WHY HE MATTERS FOR US:** He is literally doing what we say organizations need to learn — creating structured context (skills = encoded domain knowledge) for agents to use. His 15.4K GitHub stars on a MARKETING repo means he's reaching business people, not just developers. If marketing teams start reporting results from his skills, that's Level 3 convergence for "non-engineers using coding agents for business work." **WATCH:** Does Magister get enterprise adoption? Do independent marketing teams report measurable outcomes? | SaaS marketer → skills builder → platform builder. 34 skills, 52 CLI tools, 31 integration guides. Open source + commercial (Magister). (Mar 2026) |

| **Virat Singh** | Founder, Financial Datasets | [X.com/@virattt](https://x.com/virattt), [GitHub/virattt](https://github.com/virattt) | Built "ai-hedge-fund" (49.4K stars, multi-agent finance system with 6 specialized agents) and "Dexter" (18.1K stars, autonomous financial research agent — "Claude Code for finance"). Stanford background. Self-validation architecture. Ethan Mollick tested it. **Domain:** Finance/research — business domain, not coding. **WATCH:** Does the multi-agent finance pattern get enterprise adoption? | ai-hedge-fund 49K stars. Dexter 18K stars. Building Financial Datasets toward $100M ARR. (Mar 2026) |
| **Omid Ghiam** | Founder, Marketer Milk (ex-Webflow) | [marketermilk.com](https://www.marketermilk.com/blog/ai-marketing-tools), [newsletter](https://www.newsletter.marketermilk.com/) | Building AI agents for marketing ops: SEO content audit, competitor intelligence, AI copy editor. Uses Claude Code + MCP connected to Webflow, Google Drive, Ahrefs. Claims ~50% work time reduction. **Domain:** Marketing/Content Ops. **WATCH:** Does he publish measurable outcomes? | Building marketing agent workflows with Claude Code + MCP. (Mar 2026) |
| **Iain Harper** | Independent practitioner | [iain.so](https://iain.so/security-for-production-ai-agents-in-2026) | Writes deeply about security and production challenges of deploying AI agents in enterprise. Practitioner-grounded analysis of MCP security, agent architecture trade-offs, production readiness. Not a deployer — an analyst-practitioner. **Domain:** Cross-cutting (agent security/governance). | Publishing production agent security analysis. (Jan-Mar 2026) |

## Segment B: First Enterprise Teams & Bridges

These people deploy agents inside real organizations or bridge the gap between builders and enterprises. When they start confirming what Segment A discovered — that's the credibility signal.

| Person | Role | Where to follow | Why they matter | Current position |
|--------|------|----------------|-----------------|-----------------|
| **Ethan Mollick** | Wharton professor | X.com, oneusefulthing.org | Most rigorous academic tracking real-world AI use. Bridge between research and practice. | |
| **Swyx (Shawn Wang)** | Founder, smol.ai / AI Engineer | X.com, latent.space podcast | Runs AI Engineer Summit. Sees what practitioners actually present. | |
| **Chip Huyen** | ML engineer, author | X.com, blog | "Designing Machine Learning Systems" author. Practical, skeptical, evidence-based. | |
| **Arvind Narayanan** | Princeton CS professor | X.com | "AI Snake Oil" author. Best skeptic — when he says something works, it means something. | |
| **Jason Lemkin** | Founder & CEO, SaaStr | [SaaStr blog](https://www.saastr.com/), [X.com/@jasonlk](https://x.com/jasonlk) | **Strongest business agent deployment evidence found.** Deployed 20+ AI agents across entire GTM stack. Replaced 10 SDRs/AEs with 1.2 humans + 20 agents. $1M+ closed revenue from agent-qualified leads. 70K hyper-personalized emails. Platform: Salesforce Agentforce. Key insight: "Training is more important than picking the perfect vendor." Spends 15-20 hrs/week managing agents. **Domain:** Sales/GTM. **WATCH:** Are other media/events companies replicating? If 5+ companies report similar → Level 3. | 20+ agents in production. 1.2 humans + 20 agents = former 10-person team. (Q1 2026) |
| **Amelia Lerutte** | Chief AI Officer, SaaStr | [SaaStr blog](https://www.saastr.com/what-we-actually-learned-deploying-20-ai-agents-across-our-entire-go-to-market-8-months-in/), [GTM AI Podcast](https://www.gtmaipodcast.com/p/2242026-the-secret-sauce-of-saastr) | **The person who actually built and maintains SaaStr's 20+ agent stack.** While Lemkin is the face, Lerutte is the builder. Stack: Salesforce Agentforce, Artisan, Qualified, Clay, Momentum, Gamma, Zapier. Results: $4.8M pipeline, $2.4M closed-won, deal volume doubled, win rates nearly doubled, 60K AI-generated emails, team from 10 to 3 humans. 15-20 hrs/week maintaining agents. **Domain:** Sales/GTM Ops. **WATCH:** Does she publish technical architecture details? | Building and maintaining 20+ agent GTM stack. (Q1 2026) |
| **Marie Myers & Gustav van der Westhuizen** | CFO & COO Finance, HPE | [Fortune](https://fortune.com/2026/02/12/hpe-cfo-used-ai-transform-100-slide-monday-meeting/), [CFO Dive](https://www.cfodive.com/news/hpe-cfo-puts-agentic-ai-center-2026-finance-priorities/812097/) | **Strongest enterprise finance agent deployment.** Built "Alfred" — multi-agent AI platform for finance ops on HPE Private Cloud AI + Deloitte Zora. Four specialized agents (query decomposition, SQL analysis, chart building, report generation) as "mini personas" mirroring analyst roles. Results: 90% reduction in manual effort for weekly financial review, 40% faster reporting, 25% cost reduction, eliminated 100-slide weekly deck. Reskilled 3,000+ finance employees. **Domain:** Finance/FP&A. **WATCH:** Does the pattern spread to other $30B+ companies? | Alfred in production. Finance team reskilled. (Feb 2026) |
| **Kyle Norton** | CRO, Owner.com | [GTMnow](https://gtmnow.com/gtm-163-owner-cro-kyle-norton-scaling-2m-to-50m-arr/), [SaaStr podcast](https://www.saastr.com/ai-sales-gtm-in-2025-2026-this-changes-everything-with-jason-lemkin-and-owner-cro-kyle-norto/) | AI-infused sales team of 100+ humans with AI agents for prospecting/qualification. Results: 3x revenue per AE, 2x productivity per rep, scaled $2M to $50M+ ARR. $1B+ restaurant SaaS platform. **Domain:** Sales. **WATCH:** Does he publish agent architecture details? | AI-augmented sales at scale. (Q1 2026) |
| **Natalia Quintero** | Head of Consulting, Every Inc. | [Every.to](https://every.to/p/i-talked-to-more-than-100-companies-about-ai-here-s-what-s-actually-working) | Worked with 100+ companies (NYT, Walleye Capital $100B+ AUM hedge fund) on AI adoption. Seven-figure consulting business. Key insight: "You're not implementing a tool. You're helping people rethink how they work." CEO's own AI skills directly correlate with org's AI adoption ability. **Domain:** Cross-domain (finance, media, tech). | Synthesizing patterns from 100+ enterprise engagements. (Q1 2026) |
| **Tal Raviv** | PM, previously Patreon/AppsFlyer | [Substack](https://www.talraviv.co/), [Lenny's Newsletter](https://www.lennysnewsletter.com/p/build-your-personal-ai-copilot) | Teaching 20,000+ PM leaders (Apple, Google, Amazon, Microsoft, Meta) to use AI agents for PM workflows. Key insight: "We learned more about how AI products work in three months using Cursor than in three years using ChatGPT." Coding agents expose reasoning = faster PM AI fluency. **Domain:** Product management. | Teaching PM AI agent adoption at scale. (Q1 2026) |
| **Ray Lau & Erik Yao** | CEO & CTO, Leapfin | [Leapfin blog](https://www.leapfin.com/blog/building-luca-an-ai-agent-for-finance-and-accounting-workflows-that-auditors-actually-trust) | Built "Luca" — AI accounting agent using Claude with radical constraints. Production at Reddit, GoodRx, SeatGeek (billions of transactions). SOX-compliant. Key architecture: LLM architects but doesn't execute freely. "Building AI for accounting isn't about a smarter model — it's about forcing reliability." **Domain:** Finance/accounting. **Vendor caveat applies** — but technical depth exceeds typical vendor content. | Luca in production. Constrained LLM architecture. (2026) |

## Segment C: Nordic Practitioners

| Person | Role | Where to follow | Why they matter | Current position |
|--------|------|----------------|-----------------|-----------------|
| **Sebastian Siemiatkowski** | CEO, Klarna (Stockholm) | Public statements, interviews | **The most documented Nordic agent deployment.** AI handles 2/3 of customer service (= 850 human agents). Workforce halved (5,527 → ~2,907). Revenue/employee tripled ($300K → $1.3M). Then admitted quality suffered, started rehiring. **The course correction is more valuable than the initial success** — shows agent limits even at the company that pushed hardest. **Domain:** Customer service, operations. | Deployed → course correction → rehiring humans. The "what happens when you go too fast" story. (Q1 2026) |
| **Bip Thelin & Therese Ruth** | Co-founders, Noru (Stockholm) | [tech.eu](https://tech.eu/2026/03/18/noru-raises-eur560k-to-develop-an-agentic-compliance-platform/) | Building "agentic compliance" platform — AI agents for SOC 2, ISO 27001, GDPR, NIS2 evidence gathering. 560K EUR pre-seed, ~20 pilot customers. Uses MCP. Thelin co-founded Kivra, Ruth founded Hemma. **Domain:** Compliance/governance. **WATCH:** Do they ship before Aug 2 EU AI Act enforcement? | Pre-seed, ~20 pilots, MCP integration. (Mar 2026) |

| **Agaton** (Stockholm) | AI agent for sales conversations | [EU-Startups](https://www.eu-startups.com/2026/02/stockholm-based-agaton-secures-e8-4-million-to-turn-customer-conversations-into-revenue-insights/) | €8.4M funding. Customers: Telenor, Telia, Lendo, Axo Finans. Sales conversions doubled, QA handling time reduced 80%. **Domain:** Sales/customer conversations. | Funded, deployed at named Nordic telcos. (Q1 2026) |

**Gap narrowed but still thin.** Klarna is CEO-level not practitioner-level. Noru, Legora, and Agaton are building products, not deploying governed agents inside enterprises. Still need: Nordic practitioners at enterprises who are building/deploying business agents and publishing about it.

## Organizational Practices Watchlist

Companies worth tracking not for their products, but for how they organize around agents. Organizational-level evidence is mostly absent in March 2026 — we're pre-chasm. These are the early signals to watch for convergence.

| Company | What to watch | Why it matters | What we know (March 2026) |
|---------|--------------|----------------|--------------------------|
| **Tesla** | mobAi — radical organizational practices around AI agents. How work itself is structured when agents are assumed. | If Tesla is reorganizing work around agents (not just using agents within existing structures), that's the organizational transformation signal everyone else is missing. Most companies bolt agents onto existing processes. Tesla may be redesigning the processes themselves. | Thin — need practitioner-level detail. Discovery priority: find Tesla engineers/managers publishing about how their teams actually work with agents. |
| **Anthropic** | Tiny teams, constant re-teaming. The organizational structure that produces Claude. | Anthropic is simultaneously the agent builder AND the most aggressive internal user. If they run with tiny teams that constantly re-form around problems, that's a living example of "agents change the org chart, not just the workflow." The re-teaming pattern may be the organizational equivalent of compound engineering — small units that recombine faster than large teams can coordinate. | Need specifics: how small are the teams? How often do they re-team? What does the internal agent use look like? Discovery priority: Anthropic employees publishing about internal practices, conference talks about org structure. |

**What we're looking for:** Not "company X uses AI" — every company says that. We're looking for companies where agents have changed *how teams are structured, how work is allocated, how people coordinate.* The organizational design signal, not the tool adoption signal. This is the hardest evidence to find because companies don't usually publish org design changes — but it's also the most valuable for our advisory, because it answers "what does the org look like AFTER agents work?"

**Vocabulary warning:** Organizational-level insight won't arrive labeled "agents." People will say "team AI," "collaborative AI," "AI-native teams," "augmented workflows," "AI-first organization," or whatever framing their culture uses. Tesla won't say "we deploy agents" — they'll describe how mobAi changes team structure. Anthropic won't frame re-teaming as "agentic" — they'll talk about team size and velocity. Search for the practices and the org design changes, not for the word "agent."

**Discovery method:** Follow employees, not press releases. Tesla and Anthropic don't publish org design white papers. But their engineers and managers do speak at conferences, post on X.com and LinkedIn, and write blogs. Add individuals to the practitioner segments above as they surface.

## Events to Track

| Event | When | Where | Why |
|-------|------|-------|-----|
| **AI Engineer Summit** | ~June, ~Nov | San Francisco / Virtual | Best practitioner-focused event. Talks reveal real deployments. |
| **Nordic AI meetups** | Ongoing | Helsinki, Stockholm, Copenhagen, Oslo | Local builder community. Where to find Tier 3 people. |
| **Anthropic developer events** | Irregular | Virtual | SDK updates, architecture guidance from the builders. |
| **LangChain/LangGraph community** | Ongoing | Discord, GitHub | Framework users sharing real production experiences. |
| **Latent Space podcast** | Weekly | Podcast | Swyx interviews practitioners. High signal-to-noise. |

## Update Log

| Date | What changed |
|------|-------------|
| 2026-02-21 | Initial roster created. 13 people, 5 events. Nordic practitioners = zero (gap). |
| 2026-03-21 | Added Reuven Cohen (rUv). Claude Flow/Ruflo builder + EY CTO. Watch for framework→platform evolution. |
| 2026-03-22 | Added Dan Shipper (Every, compound engineering originator) and Will Larson (Imprint, independent validation). First named practitioners for the coding agent flywheel thesis. |
| 2026-03-22 | Cycle 38: Added 7 business-domain practitioners. Segment A: Virat Singh (finance, 49K stars). Segment B: Lemkin/SaaStr (GTM, $1M+ revenue), Quintero (100+ companies), Raviv (20K+ PMs), Lau & Yao/Leapfin (accounting, production). Segment C: Siemiatkowski/Klarna (Nordic, course correction), Thelin & Ruth/Noru (Nordic, agentic compliance). First non-coding practitioners on roster. |
| 2026-03-22 | New section: Organizational Practices Watchlist. Tesla (mobAi, radical practices) and Anthropic (tiny teams, constant re-teaming). Tracking companies for org design changes, not product/tool use. |
| 2026-03-22 | Cycle 43: Added Agaton (Stockholm, sales AI, €8.4M, Telenor/Telia customers). Nordic product companies now 3 (Noru, Legora, Agaton). Still zero Nordic enterprise practitioners deploying business agents. |
