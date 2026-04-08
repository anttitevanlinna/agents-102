# PM Communication & Alignment: AI Adoption Research Run

**Date:** 2026-04-08
**Scope:** How product managers use AI agents for communication, alignment, and stakeholder management — NOT coding/prototyping
**Method:** People-first web search. Named practitioners, specific workflows, source-typed and evidence-leveled.

---

## EXECUTIVE SUMMARY

**The honest answer:** PMs are overwhelmingly using AI for *writing acceleration* (PRDs, status updates, release notes) and *feedback synthesis* (clustering support tickets, NPS analysis). Truly agentic communication workflows — where AI autonomously manages stakeholder alignment, cross-functional coordination, or meeting-to-action pipelines — are emerging but remain Level 2 (single experiments by power users), not Level 3 (convergence).

**The convergence signal (Level 3):** The one area approaching convergence is **spec-as-interface** — the shift from human-readable PRDs to agent-consumable specifications. Multiple independent practitioners (Haberlah, Osmani, GitHub Spec Kit team, Kiro/AWS) are independently arriving at the same conclusion: specs must become machine interfaces, not just alignment documents.

**The gap:** Almost nobody is writing about AI for the hardest PM communication work — navigating political dynamics, managing executive expectations in real-time, or handling cross-functional conflict. AI handles the *output artifacts* of communication (docs, summaries, updates) but not the *relational work* of alignment.

---

## 1. PRD AND SPEC WRITING — FROM DRAFTING TO AGENT-CONSUMABLE SPECS

### Finding 1.1: Spec-Driven Development Is Becoming a Practice (approaching Level 3)

Multiple independent sources are converging on the same insight: PRDs must evolve from human alignment artifacts into machine-executable interfaces.

**WHO:** David Haberlah, AI Globalisation Lead at SiteMinder
**WHAT:** Published a practitioner guide on writing PRDs for AI coding agents. Key insight: traditional PRDs are alignment artifacts between humans; AI coding agents require specs that function as "programming interfaces" — precise enough to execute, structured enough to sequence, constrained enough to prevent scope drift. Phase sizing heuristic: each phase = 5-15 minutes of agent work, ending with PM-verifiable functionality. Non-goals become critical because "AI cannot infer from omission."
**SOURCE:** https://medium.com/@haberlah/how-to-write-prds-for-ai-coding-agents-d60d72efb797
**SOURCE TYPE:** [practitioner direct]
**EVIDENCE LEVEL:** Level 2 (single practitioner, detailed methodology)
**DATE:** January 12, 2026

**WHO:** Addy Osmani, Engineering Leader at Google (Chrome team)
**WHAT:** Published "How to Write a Good Spec for AI Agents" — republished on O'Reilly Radar. Recommends three-tier boundary system: "Always do" (agent acts without asking), "Ask first" (requires human approval), "Never do" (hard stops). Key finding: research confirms that as instructions pile up, model adherence to each one drops ("curse of instructions"). Specs should focus on *what* and *why*, not *how*.
**SOURCE:** https://addyosmani.com/blog/good-spec/ and https://www.oreilly.com/radar/how-to-write-a-good-spec-for-ai-agents/
**SOURCE TYPE:** [practitioner direct]
**EVIDENCE LEVEL:** Level 2 (single practitioner, well-documented framework)
**DATE:** January-February 2026

**WHO:** GitHub (corporate initiative, not single practitioner)
**WHAT:** Released Spec Kit — open-source toolkit for spec-driven development. Four-phase process: Specify → Plan → Tasks → Implement. The spec becomes the source of truth that AI agents consume. Key insight from GitHub engineering: "the specification becomes the source of truth and determines what gets built." Now at v0.5.0 with ecosystem adoption (AWS Kiro, IBM adaptation).
**SOURCE:** https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/
**SOURCE TYPE:** [vendor blog] — Level 0 as product announcement, but the open-source toolkit is verifiable and independently adopted
**EVIDENCE LEVEL:** Level 2 moving toward Level 3 (multiple independent adoptions: Kiro, IBM, independent practitioners)
**DATE:** 2025-2026

**WHO:** Thoughtworks (consulting firm, Technology Radar)
**WHAT:** Identified spec-driven development as "an emerging practice as 2025 draws to a close." Academic validation: arXiv paper (Feb 2026) "Spec-Driven Development: From Code to Contract in the Age of AI" frames the core distinction: traditional specs are read by humans, SDD specs execute as validation gates.
**SOURCE:** https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices
**SOURCE TYPE:** [practitioner analysis] — Thoughtworks Technology Radar is practitioner-grounded
**EVIDENCE LEVEL:** Level 2 (industry analysis, not deployment data)
**DATE:** Late 2025

**CONVERGENCE ASSESSMENT:** 4-5 independent sources (Haberlah, Osmani, GitHub, Thoughtworks/arXiv, AWS Kiro) arriving at the same insight. Not yet 10-20 practitioners confirming deployment results, but the *conceptual* convergence is strong. This is the leading edge of a practice shift.

### Finding 1.2: ChatPRD — Most Adopted PM-Specific AI Writing Tool

**WHO:** Claire Vo, CPO at LaunchDarkly / Founder of ChatPRD
**WHAT:** Built ChatPRD as a purpose-built AI for PM documentation — PRDs, user stories, technical specs, go-to-market briefs. Claims 100,000+ PM users. "How I AI" podcast series features named PMs from Zapier, Webflow, Figma, Coinbase, Stripe sharing their actual workflows. Practitioner reviews report 75% reduction in drafting time.
**SOURCE:** https://www.chatprd.ai/ and https://www.chatprd.ai/how-i-ai
**SOURCE TYPE:** [vendor direct] for product claims; [practitioner direct] for the podcast interviews
**EVIDENCE LEVEL:** Level 0 for vendor claims (100K users, 75% time reduction — unverified). Level 2 for the practitioner interviews (named PMs sharing real workflows, but on the vendor's platform).
**DATE:** Ongoing through 2026

---

## 2. STAKEHOLDER COMMUNICATION — STATUS UPDATES, EXECUTIVE SUMMARIES

### Finding 2.1: Sachin Rekhi — The Most Documented PM AI Communication Workflow

**WHO:** Sachin Rekhi, CEO of Notejoy / Author / formerly LinkedIn PM
**WHAT:** Has migrated "nearly all product work" to Claude Code. Built 13 custom skills for PM workflows. Specific communication-relevant workflows:
- **Autonomous NPS reports:** Built a Claude Code agent that produces *weekly* NPS survey reports without manual intervention — executive report with NPS scores, trend graphs, segmentation analysis, verbatim themes, voice-of-customer quotes, product improvement recommendations. Previously at LinkedIn, producing this report quarterly required a team and took a week. Now runs weekly, autonomously.
- **Customer interview synthesis:** Custom skills for synthesizing interview data
- **Product strategy critique:** AI critiques strategy documents before stakeholder presentation
- 1,500 PMs attended his live webinar on these workflows (March 2026)
**SOURCE:** https://www.sachinrekhi.com/p/claude-code-for-product-managers and https://x.com/sachinrekhi/status/2025963914966823066
**SOURCE TYPE:** [practitioner direct]
**EVIDENCE LEVEL:** Level 2 (single practitioner, very detailed, verifiable workflows)
**DATE:** February-March 2026

### Finding 2.2: Mohit Aggarwal — Async Cross-Timezone Stakeholder Communication

**WHO:** Mohit Aggarwal, PM at a sports data provider (global team: engineering in Poland/Slovenia, commercial in London)
**WHAT:** Uses Claude Code + Obsidian as a "living second brain" for PM work. Specific communication workflows:
- Generates PRDs from scattered meeting notes
- Creates stakeholder roadmap presentations by pulling from Notion, spreadsheets, and Slack threads
- Automated competitive analysis workflow
- Published 12 Claude Skills for PMs on GitHub (Jira, Figma, Miro, Notion, Slack integrations)
- Reports the async communication overhead across time zones as a key pain point that AI addresses
**SOURCE:** https://medium.com/all-about-claude/how-i-use-claude-code-obsidian-as-a-product-manager-4-workflows-that-actually-changed-my-work-bc04360b905d
**SOURCE TYPE:** [practitioner direct]
**EVIDENCE LEVEL:** Level 2 (single practitioner, named company context)
**DATE:** March 2026

### Finding 2.3: Monday.com Productboard Data on AI for Status Reports

**WHO:** Productboard (product analytics vendor) and Monday.com (work management platform)
**WHAT:** Multiple sources describe AI-generated status updates:
- AI agents programmed to run automatically (e.g., every Sunday evening) producing weekly status updates that land in the PM's inbox Monday morning
- Stakeholder notification systems that adapt depth, focus, and framing based on audience (CPO vs. Eng Lead)
- AI-generated project summaries from board activity, status updates from task completion patterns, risk categorization by urgency and impact
- Productboard reports: 72% of PMs use AI for content generation, 52% for workflow automation, 48% for data analysis, only 18% trust AI for decision support
**SOURCE:** https://www.productboard.com/blog/the-power-of-ai-agents-in-product-operations-workflows/ and https://monday.com/blog/rnd/ai-for-product-managers/
**SOURCE TYPE:** [vendor blog] — these are vendor platforms describing their own capabilities
**EVIDENCE LEVEL:** Level 0 for platform capabilities; the 72%/52%/48%/18% survey data is more credible but sourced from the vendor's own survey
**DATE:** 2025-2026

---

## 3. CROSS-FUNCTIONAL ALIGNMENT

### Finding 3.1: Keren Koshman — Internal AI Innovation at monday.com

**WHO:** Keren Koshman, Internal AI Innovation Lead at monday.com (former Head of Product at a legal-tech startup, engineering + product background)
**WHAT:** Writes about the PM role shift from feature management to "context engineering and orchestrating agentic workflows." Key insight: "Engineering is no longer the bottleneck — product is. If building is faster and cheaper than ever, then the real cost is building the wrong thing." Advocates for building *infrastructure* not one-off integrations: "the infrastructure is the product." Advises hiring "a builder, not a slide deck strategist" for AI innovation roles. Also wrote "AI is Making Product Managers the Bottleneck" — identifying that when engineering velocity increases via AI, the PM's spec/decision speed becomes the constraint.
**SOURCE:** https://medium.com/design-bootcamp/the-product-manager-stack-in-2026-agents-infrastructure-and-how-not-to-fall-behind-559dc7335140 and https://medium.com/design-bootcamp/ai-is-making-product-managers-the-bottleneck-106b5f80c779
**SOURCE TYPE:** [practitioner direct]
**EVIDENCE LEVEL:** Level 1 (opinion/analysis, not deployment evidence — but from a named practitioner at a specific company doing the work)
**DATE:** March 2026

### Finding 3.2: Shareen Pathak — Anthropic's PM Team Has Abandoned Traditional Standups

**WHO:** Shareen Pathak, Product Manager at Anthropic (joined August 2024, Research PM team)
**WHAT:** Published "Product management on the AI exponential" on the Claude blog. Key communication/alignment changes inside Anthropic:
- **Replaced traditional standups with demos:** Team shares demos of new ideas instead of traditional stand-ups. Internal users try them. If engagement is real, they get polished and shared more broadly.
- **Prototype-first over documentation-first:** "Prototyping in an afternoon makes wrong bets cheap."
- **Role blurring:** Designers ship code, engineers make product decisions, PMs build prototypes and evals. Clear strategy and goals let everyone prioritize autonomously.
- **PM role redefined:** "Create clarity in ambiguity from rapid model progress, push teams to think bigger, clear the path to shipping faster."
- **Guiding principle:** "Do the simple thing that works" because model workarounds become unnecessary complexity with the next model.
**SOURCE:** https://claude.com/blog/product-management-on-the-ai-exponential
**SOURCE TYPE:** [practitioner direct] — a PM describing their own team's actual practices. NOTE: published on vendor blog (Anthropic), but the content is first-person team practice description, not product marketing
**EVIDENCE LEVEL:** Level 2 (single company, specific practices described, but Anthropic is an AI-native company and not representative of typical enterprises)
**DATE:** March 19, 2026

### Finding 3.3: Productside Framework — Context Engineering for Team Alignment

**WHO:** Productside / Dean Peters (Principal Consultant and Trainer)
**WHAT:** Productside published "The AI Product Management Workflows Every PM Needs in 2026" covering four AI motions. The alignment-relevant one is **Context Engineering** — using Claude Projects, Google Gems, ChatGPT Projects to build shared team context ("shared memory, not siloed conversations"). Dean Peters also built a Product Manager Skills framework (47 ready-to-use PM skills for Claude Code, Cowork, Codex) on GitHub — includes skills covering the full PM career arc from PM to Director to VP/CPO.
**SOURCE:** https://productside.com/the-ai-product-management-workflows-2026/ and https://github.com/deanpeters/Product-Manager-Skills
**SOURCE TYPE:** [practitioner direct] for the GitHub skills repo; [vendor content] for the Productside article (a training company)
**EVIDENCE LEVEL:** Level 1-2 (framework/tooling, not deployment evidence)
**DATE:** 2026

---

## 4. CUSTOMER COMMUNICATION — CHANGELOG, RELEASE NOTES, ANNOUNCEMENTS

### Finding 4.1: AI Release Notes Automation — Tools Exist, No Practitioner Convergence

**WHO:** Multiple tool vendors (Updated.dev, Changeish, GitHub AI Release Notes Action, Ascend.io)
**WHAT:** AI-powered release notes generation from git commit histories is becoming a standard DevOps automation. Ascend.io published a detailed tutorial on building an AI-powered release notes pipeline with GitHub Actions + Python. Updated.dev (launched late 2025) converts Git commit logs into polished release notes. Granola's "Write PRD" recipe (by Lenny Rachitsky) can transform meeting discussions into specs.

**CRITICAL GAP:** I found NO named product managers describing how they actually use AI for customer-facing communication (changelogs, product announcements, release notes) in their real workflow. The tools exist. The practitioner stories don't — or at least they aren't being published. This is either (a) too boring to write about, (b) not yet adopted at scale, or (c) happening but not being shared publicly.

**SOURCE:** https://www.ascend.io/blog/how-we-built-an-ai-powered-release-notes-pipeline
**SOURCE TYPE:** [practitioner direct] for Ascend's own pipeline; [vendor content] for tool descriptions
**EVIDENCE LEVEL:** Level 1-2 (tools exist, some teams use them, no convergence evidence)
**DATE:** 2025-2026

---

## 5. INTERNAL KNOWLEDGE MANAGEMENT — DECISION LOGS, PRODUCT WIKIS

### Finding 5.1: Teresa Torres — Claude Code as PM Second Brain

**WHO:** Teresa Torres, Author of *Continuous Discovery Habits*, internationally acclaimed PM coach
**WHAT:** Published on Lenny's Newsletter / How I AI podcast describing her Claude Code setup:
- Built a personalized task management system in Claude Code matching her exact workflow
- Migrated from Trello to markdown-based system for "complete control and searchability"
- Automated academic research collection with daily digests of relevant papers
- Organized context files to make Claude more effective without overwhelming it
- Demonstrated that non-developers can leverage AI tools for personalized workflows
**SOURCE:** https://www.lennysnewsletter.com/p/claude-code-for-product-managers
**SOURCE TYPE:** [practitioner direct]
**EVIDENCE LEVEL:** Level 2 (single practitioner, highly credible name in PM community)
**DATE:** January 19, 2026

### Finding 5.2: Claude Code + Obsidian as PM Knowledge Management Pattern

**WHO:** Mohit Aggarwal (see Finding 2.2) and MindStudio (tool vendor)
**WHAT:** The pattern of using Claude Code + Obsidian as a PM second brain is appearing from multiple sources. Claude Code + Obsidian MCP enables Claude to "know your projects, research, decisions, and history while cross-referencing across hundreds of notes instantly." The workflow: maintain a local markdown vault → Claude Code reads/writes to it → context engineering means the AI knows your product history.
**SOURCE:** https://medium.com/all-about-claude/how-i-use-claude-code-obsidian-as-a-product-manager-4-workflows-that-actually-changed-my-work-bc04360b905d and https://www.mindstudio.ai/blog/build-ai-second-brain-claude-code-obsidian
**SOURCE TYPE:** [practitioner direct] for Aggarwal; [vendor content] for MindStudio
**EVIDENCE LEVEL:** Level 2 (2-3 independent sources describing the same pattern, but not yet 10-20)
**DATE:** March 2026

---

## 6. MEETING AUTOMATION — STANDUP SYNTHESIS, DECISION EXTRACTION

### Finding 6.1: Granola — From Notetaker to Enterprise AI Context ($1.5B Valuation)

**WHO:** Granola (company — no single PM practitioner identified)
**WHAT:** Raised $125M Series C at $1.5B valuation (March 2026). Evolved from meeting notetaker to enterprise AI context platform. Key PM-relevant features:
- "Recipes" — saved AI prompts by domain experts that process meeting notes through specific lenses. Example: "Sprint Retro" recipe organizes feedback into what went well, what didn't, and action items. Lenny Rachitsky's "Write PRD" recipe transforms discussions into structured requirements.
- Launched "Spaces" — team workspaces with granular access controls
- Personal API and enterprise API for integrating meeting context into broader AI workflows
- $43M raised May 2025 → $125M March 2026
**SOURCE:** https://techcrunch.com/2026/03/25/granola-raises-125m-hits-1-5b-valuation-as-it-expands-from-meeting-notetaker-to-enterprise-ai-app/
**SOURCE TYPE:** [general press] for funding/valuation; [vendor direct] for feature descriptions
**EVIDENCE LEVEL:** Level 0-1 (funding validates market demand, but no named PM practitioner describing their specific workflow with the tool)
**DATE:** March 2026

### Finding 6.2: Meeting AI Tool Landscape — Fragmented, Commoditizing

**WHO:** Multiple vendors (Fireflies.ai, Otter.ai, read.ai, Avoma, Fathom)
**WHAT:** Meeting AI is mature as a tool category but commoditizing fast. Key differentiation:
- Fireflies.ai excels at structured decision/action item extraction
- Otter.ai has "My Action Items" feature pulling to-dos into one place
- Avoma is purpose-built for product teams
- All offer: transcription → summary → action items → CRM/project tool integration
- The 2026 story is not "who writes the nicest summary" but "who can reliably capture context, turn it into real outputs, and reduce busywork"

**GAP:** I found NO named PMs writing about how AI meeting tools have fundamentally changed their stakeholder alignment or decision-making process. The tools are used for transcription and summary. The *alignment* work remains human.
**SOURCE TYPE:** [vendor content] and [general press reviews]
**EVIDENCE LEVEL:** Level 1 (tool category is mature, but evidence for transformative impact on PM alignment work is thin)
**DATE:** 2025-2026

---

## META-ANALYSIS: NAMED PRACTITIONERS AND THEIR FOCUS

### Practitioner Map

| Person | Role / Company | Focus Area | Communication-Relevant? |
|--------|---------------|------------|------------------------|
| **Sachin Rekhi** | CEO Notejoy / ex-LinkedIn PM | Claude Code for PM workflows (NPS, interviews, strategy) | **YES** — autonomous NPS reports, interview synthesis |
| **Teresa Torres** | Author, *Continuous Discovery Habits* | Claude Code as PM second brain, research automation | **YES** — knowledge management, research digests |
| **Claire Vo** | CPO LaunchDarkly / Founder ChatPRD | AI-powered PRD/spec writing | **YES** — document generation |
| **Mohit Aggarwal** | PM at sports data provider | Claude Code + Obsidian, 12 PM Skills | **YES** — stakeholder presentations, async comms |
| **David Haberlah** | AI Globalisation Lead, SiteMinder | PRDs for AI coding agents, PM transformation research | **YES** — spec-as-interface paradigm |
| **Addy Osmani** | Engineering Leader, Google Chrome | Spec writing for AI agents | **Partially** — spec structure, not PM communication per se |
| **Keren Koshman** | AI Innovation Lead, monday.com | PM role evolution, PM-as-bottleneck | **YES** — cross-functional alignment analysis |
| **Shareen Pathak** | PM, Anthropic | PM practices inside AI-native company | **YES** — demo-over-standup, prototype-first |
| **Tal Raviv** | Ex-Riverside/Patreon/Wix PM | AI agents for PM productivity, workshops | **YES** — PM busywork automation framework |
| **Dean Peters** | Principal Consultant, Productside | 47 PM Skills framework for Claude Code | **YES** — tooling for PM communication workflows |
| **Amy Mitchell** | PM practitioner/writer | Product explainability, PM trends | **Partially** — product-to-market communication |
| **Marty Cagan** | Founder, SVPG | Strategic commentary on PM role evolution | **Opinion only** — Level 1 |

### The Practitioner Funnel

- **Named PM leaders writing about AI:** Many (12+ identified above)
- **Writing about AI for communication/alignment specifically:** Fewer (Rekhi, Torres, Aggarwal, Pathak, Koshman)
- **Describing specific, repeatable AI communication workflows:** Very few (Rekhi's NPS reports, Aggarwal's stakeholder decks, Torres' research digests)
- **Reporting measurable outcomes on communication effectiveness:** Almost none

---

## 7. WHAT WE DID NOT FIND

This section is as important as the findings.

### 7.1: No Practitioner Evidence for AI-Managed Stakeholder Relationships
Nobody is writing about AI that handles the *political* layer of PM communication — navigating executive dynamics, managing conflicting stakeholder priorities, handling escalations. Multiple sources explicitly note: "Stakeholders still want to talk to a person." The relational work remains entirely human.

### 7.2: No Cross-Functional Alignment Automation
Found zero examples of AI autonomously coordinating between sales, marketing, engineering, and support. The tools can *summarize* cross-functional meetings and *generate* updates, but the alignment work — resolving conflicting priorities, building consensus, managing trade-offs — is not being automated. Nobody even claims it should be.

### 7.3: No Product Announcement / Changelog Practitioner Stories
Despite tools existing (Updated.dev, GitHub release notes actions), found zero named PMs describing their AI-powered customer communication workflow. Release notes automation is a DevOps workflow, not a PM communication workflow, in practice.

### 7.4: No Evidence That AI Meeting Tools Change Decision Quality
Meeting AI tools (Granola, Fireflies, Otter) are widely used for transcription and summary. But no practitioner reports that AI meeting tools have improved the *quality* of decisions or the *effectiveness* of stakeholder alignment. The tools make information *accessible* but don't make alignment *happen*.

### 7.5: No Nordic Signal
Found zero Nordic practitioners writing about AI for PM communication workflows. This is a complete blind spot in the current research.

### 7.6: Limited Counter-Evidence / Skepticism
**Saeed Khan** (PM writer) published "AI is NOT going to fix Product Management" — arguing that PM's problems are organizational, not tooling-related. AI handles symptoms (slow documentation) but not root causes (unclear strategy, poor stakeholder alignment processes). **Marty Cagan** (SVPG) warns that the "product owner" role (a delivery-process role) is easy for AI to dent, but the actual PM role — vision, strategy, stakeholder trust — is not.
**SOURCE:** https://swkhan.medium.com/ai-is-not-going-to-fix-product-management-but-you-can-heres-how-7e06f102b35d
**SOURCE TYPE:** [practitioner direct]
**EVIDENCE LEVEL:** Level 1 (informed opinion from experienced PM practitioner)

### 7.7: Survey Data Quality Is Poor
The most-cited stat — "94% of enterprise PMs rely on AI tools daily" from Productboard's 2025 survey (N=379) — comes from a vendor whose business depends on PMs using AI tools. No independent survey found. The "70% use AI daily" stat appears in multiple articles but traces back to the same Productboard source or is unsourced.

---

## 8. CONVERGENCE PATTERNS

### Pattern A: Writing Acceleration (Level 3 — Convergence confirmed)
**What:** PMs using AI to draft PRDs, status updates, meeting summaries, competitive analysis faster
**Evidence:** 10+ independent practitioners confirm this as daily practice
**So what:** This is table stakes. Not an insight. Every PM tool vendor has this.

### Pattern B: Spec-as-Interface (Level 2 → 3 — Approaching convergence)
**What:** PRDs evolving from human alignment documents to machine-executable specifications with boundary systems, phase sizing, and explicit non-goals
**Evidence:** 4-5 independent sources (Haberlah, Osmani, GitHub Spec Kit, Thoughtworks, AWS Kiro)
**So what:** This is the most interesting finding. It changes what a PM *writes* — not just *how fast* they write it. The spec becomes code input, not just human alignment artifact. This has structural implications for the PM-engineering relationship.

### Pattern C: Autonomous Reporting (Level 2 — Single experiments)
**What:** AI agents autonomously generating recurring reports (NPS, status updates, competitive analysis)
**Evidence:** Rekhi's NPS workflow is the strongest example. Monday.com/Productboard describe the capability but lack named practitioner evidence.
**So what:** The shift from "PM writes the report" to "PM reviews the AI-generated report" is real but isolated to power users.

### Pattern D: PM as Bottleneck (Level 2 — Emerging pattern)
**What:** As engineering velocity increases via AI coding tools, PM specification and decision speed becomes the new constraint
**Evidence:** Koshman (monday.com), Pathak (Anthropic), Cagan (SVPG) all identify this independently
**So what:** This inverts the traditional dynamic. Communication artifacts (specs, decisions) need to be produced faster, not just better. Raises the question: does AI help PMs produce specs faster, or does it just make the bottleneck more visible?

### Pattern E: Demo Over Document (Level 2 — Single company)
**What:** Replacing written status updates and standup reports with working demos/prototypes
**Evidence:** Pathak describes this at Anthropic. Productside advocates for it. But only documented at AI-native companies.
**So what:** Interesting but possibly only viable at AI-native companies where everyone can read a prototype. Enterprise PMs still need written artifacts for non-technical stakeholders.

---

## 9. RESEARCH QUALITY NOTES

### Source Distribution
- **Practitioner direct:** 8 sources (Rekhi, Torres, Aggarwal, Haberlah, Osmani, Pathak, Koshman, Khan)
- **Vendor content:** 5 sources (ChatPRD, Monday.com, Productboard, Granola, GitHub)
- **General press:** 1 source (TechCrunch on Granola funding)
- **Practitioner analysis:** 2 sources (Haberlah's 638-voice analysis, Thoughtworks Technology Radar)
- **Academic:** 1 source (arXiv SDD paper)

### Freshness
All findings from October 2025 — April 2026 (within 6-month window).

### Confirmation Bias Check
I actively searched for "AI doesn't work for PM communication" and found Saeed Khan's critique and Cagan's warnings. The honest finding: AI excels at *artifact generation* (the 80% of PM communication that is writing) but has zero traction in *relational alignment* (the 20% that actually determines outcomes). The loudest practitioner voices are enthusiasts building skills/courses (Rekhi, Raviv, Aggarwal) — survivorship bias is real. The silent majority of PMs likely use ChatGPT to clean up a doc occasionally and that's it.
