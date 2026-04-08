# PM Discovery & Research with AI — Practitioner Landscape Scan

**Date:** 2026-04-08
**Focus:** How product managers use AI agents for DISCOVERY and RESEARCH work (not prototyping/coding)
**Method:** People-first web search across practitioner blogs, newsletters, podcasts, tool announcements

---

## Executive Summary

AI-assisted PM discovery is real and accelerating — but it is overwhelmingly **tool-assisted synthesis**, not autonomous agent-driven research. The pattern: PMs feed transcripts, survey data, and feedback into AI tools (Dovetail, Granola, Claude Code skills, BuildBetter) and get structured summaries back faster. **No one has shipped a truly autonomous discovery agent that runs the full loop** (recruit → interview → synthesize → prioritize) without heavy human involvement. The closest is Reforge's AI User Interviewer, which conducts AI-moderated interviews at scale but still requires human design of research questions and interpretation of results.

The narrative is dominated by coding agents (Claude Code, Cursor) being repurposed for PM research workflows — which is directly relevant to the Mode 4 thesis. Coding agents are becoming the PM's research infrastructure.

---

## 1. Customer Interview Analysis and Synthesis

### Finding: AI Synthesis of Interview Transcripts Is Now Standard Practice

**Evidence Level: Level 3 (Convergence)** — Multiple independent practitioners report the same workflow.

Multiple named PMs independently describe the same workflow: record interviews → auto-transcribe → AI synthesizes themes, quotes, patterns.

**Named practitioners:**

**Alla Kopylova** — Co-founder & Head of Product at RepairFix
- **Workflow:** Defines research questions and riskiest assumptions → selects user group → runs 3-5 interviews recorded in Granola (AI note-taking) → transcripts go to Dovetail → Dovetail generates one-page insight brief
- **Tools:** Granola, Dovetail, Perplexity, ChatGPT
- **Quote:** "The biggest unlock of AI isn't speed alone — it's focus"
- Source: https://allakopylova.medium.com/product-managers-end-to-end-ai-workflow-from-customer-interviews-to-launch-d68e0b79e663
- Source type: [practitioner direct]
- Published: September 2025
- Evidence level: Level 2 (single experiment)

**Teresa Torres** — Author of Continuous Discovery Habits, Product Talk
- **What she's doing:**
  - Built an AI interview coach using her story-based customer interview methodology, with a rubric covering four dimensions
  - Published "From Customer Interviews to an Opportunity Solution Tree — In Minutes" (February 2026) showing how AI compresses the synthesis step
  - Appeared on "How I AI" podcast (Lenny's network, January 2026) demonstrating Claude Code for research, writing, context libraries
  - Launched AI-powered expert feedback tools for her courses, using AI to provide personalized feedback on student discovery work
  - Became vocal advocate for Claude Code in non-technical workflows: "pair program with everything" even without coding experience
- **Critical nuance:** Torres and Petra Wille initially pushed back on AI for interview analysis (pre-2025), then revisited the topic in December 2025 on All Things Product Podcast — suggesting the tools crossed a quality threshold
- Sources:
  - https://www.producttalk.org/customer-interview-analysis-ai/ [practitioner direct]
  - https://www.producttalk.org/ai-opportunity-solution-trees/ [practitioner direct]
  - https://www.lennysnewsletter.com/p/claude-code-for-product-managers [practitioner direct]
  - https://www.producttalk.org/my-2026-roadmap/ [practitioner direct]
- Evidence level: Level 2 (single practitioner, but highly influential — her methodology shapes how thousands of PMs do discovery)

**Sachin Rekhi** — Former Head of Product at LinkedIn Sales Navigator, now at Reforge
- **What he's doing:** Built 13 Claude Code skills for PM workflows. Specifically for discovery:
  1. Analyzing customer surveys
  2. Automating customer survey programs
  3. Automating feedback rivers
  4. Developing user interview scripts
  5. Synthesizing user interview feedback
  6. Conducting AI-moderated interviews
  7. Generating synthetic user feedback
  8. NPS analysis — built an agent that takes NPS results, runs numerical analysis, generates promoter/detractor verbatim themes, produces HTML report + executive presentation
- **Scale signal:** 1,500 PMs joined his live webinar on Claude Code (March 2026)
- **Quote:** "While AI had already 10x'ed my productivity, Claude Code is giving me at least another 3x"
- Sources:
  - https://www.sachinrekhi.com/p/ai-powered-customer-discovery [practitioner direct]
  - https://www.sachinrekhi.com/p/claude-code-for-product-managers [practitioner direct]
  - https://x.com/sachinrekhi/status/2029620106213621971 [practitioner direct]
- Evidence level: Level 2 (single practitioner, but extremely detailed and specific)

### Convergence Assessment

Three independent, high-credibility practitioners (Kopylova, Torres, Rekhi) describe essentially the same pattern: AI handles transcription and first-pass synthesis, human handles interpretation and strategic framing. The workflow has converged around a small set of tools (Granola/Otter for capture, Dovetail for repository, Claude Code for custom analysis). **This is at Level 3 for the synthesis step specifically.**

---

## 2. User Research at Scale (Automated Surveys, Feedback Mining, Session Analysis)

### Finding: Reforge Launched an AI User Interviewer — the Most Agentic Product in This Space

**Evidence Level: Level 2 (single platform, early)**

**Reforge Research** (Brian Balfour's company)
- **AI User Interviewer:** Conducts hundreds of simultaneous conversational audio interviews that adapt personality to match audiences. Matches research criteria (behavior, segment, feature usage). Available in 14 languages.
- **AI-Powered Surveys:** Long-form surveys with AI-guided creation and in-app triggers
- **Concept Testing:** Newest feature (late January 2026) — stress-tests early concepts at scale
- **Discovery Agent:** Takes product ideas, asks probing questions, surfaces assumptions, builds shared plan before prototyping
- Sources:
  - https://www.reforge.com/blog/ai-user-interviewer [vendor press release — this is Reforge's own product]
  - https://www.reforge.com/blog/concept-testing [vendor press release]
  - https://www.reforge.com/blog/discovery-agent [vendor press release]
- **Caveat:** These are Reforge's own product announcements. No independent practitioner reviews found describing actual usage results. **This is Level 0 for evidence of effectiveness, Level 2 for evidence that the product exists and is being used.**

### Finding: Maze AI Moderator Conducts Dynamic Follow-Up Interviews

**Evidence Level: Level 0 (vendor claim)**

**Maze** — user research platform used by 60,000+ product teams
- AI moderator asks context-driven follow-up questions based on research goals and participant responses
- Auto-generates reports, analysis, and themes
- Source: https://maze.co/ai/ [vendor press release]
- No independent practitioner reports found on actual quality of AI-moderated interviews

### Finding: BuildBetter Auto-Extracts Insights from Customer Calls

**Evidence Level: Level 0 (vendor claim) / Level 1 (mentioned by practitioners)**

- Joins Zoom/Meet/Teams calls, transcribes in real time, identifies feature requests, pain points, competitive mentions, sentiment shifts
- Scored 84/100 in BuildBetter's own ranking (conflict of interest noted)
- Source: https://blog.buildbetter.ai/best-ai-tools-for-product-managers-2026/ [vendor press release]

---

## 3. Competitive Intelligence and Market Research

### Finding: Competitive Analysis Is the Most Common Non-Coding AI Use Case for PMs — But It's ChatGPT/Perplexity, Not Agents

**Evidence Level: Level 3 (convergence — widespread, not deep)**

Multiple practitioners describe using ChatGPT, Perplexity, and Claude for desk research and competitor benchmarking. But the workflow is fundamentally **prompt-and-response**, not agentic. No one describes an agent that continuously monitors competitors, tracks pricing changes, or synthesizes competitive moves autonomously.

**Exception — Crayon** (competitive intelligence tool):
- Provides real-time market intelligence, tracking competitor product updates, pricing changes, customer reviews
- Delivers insights to inbox
- Source: https://www.chatprd.ai/learn/ai-for-product-managers [domain trade publication]
- Evidence level: Level 0 (vendor capability claim)

**Mohit Aggarwal** — PM with 8+ years experience
- Built a Claude Code + Obsidian system that "auto-generates PRDs, preps sprint retros, and does competitive research"
- Source: https://medium.com/all-about-claude/how-i-use-claude-code-obsidian-as-a-product-manager-4-workflows-that-actually-changed-my-work-bc04360b905d [practitioner direct]
- Evidence level: Level 2 (single experiment)
- Published: March 2026

**Dean Peters** — open-source contributor
- Created Product-Manager-Skills GitHub repo with Claude Code skills for discovery, competitive analysis, stakeholder analysis
- Source: https://github.com/deanpeters/Product-Manager-Skills [practitioner direct]
- Evidence level: Level 2 (single experiment, open-source)

---

## 4. Customer Feedback Analysis (Support Tickets, NPS, Reviews)

### Finding: Feedback Analysis Is Where AI for PMs Is Most Mature

**Evidence Level: Level 3 (convergence)**

This is the area with the strongest tool ecosystem and the most practitioner adoption. The pattern: pipe support tickets, NPS verbatims, app reviews, and sales call transcripts into an AI tool that clusters themes, tracks sentiment, and surfaces patterns.

**Named deployments:**

**Vodafone New Zealand** — automated categorization of NPS responses using Thematic's AI, detecting emerging customer concerns
- Source: https://getthematic.com/insights/customer-insights-ai [domain trade publication]
- Evidence level: Level 2 (single case)

**Productboard AI** — auto-categorizes thousands of customer insights into actionable roadmap items
- Source: https://www.productboard.com/blog/ai-in-product-management-report/ [vendor press release]
- Evidence level: Level 0 (vendor claim)

**Sachin Rekhi's NPS Agent** — Claude Code skill that takes raw NPS data, runs analysis, generates themes, produces HTML report and executive presentation
- Source: https://www.sachinrekhi.com/p/ai-powered-customer-discovery [practitioner direct]
- Evidence level: Level 2 (single experiment, detailed)

**Key tools:** Dovetail, Kraftful, Thematic, Productboard, BuildBetter, Zonka Feedback, Sopact

### Convergence Assessment

Feedback analysis has the most independent evidence of actual usage. Multiple tools, multiple practitioners, measurable time savings reported. The Productboard survey (379 enterprise PMs, October 2025) found PMs save ~4 hours per task on activities including feedback analysis. **Level 3 for the category.**

---

## 5. Jobs-to-be-Done / Outcome-Driven Research with AI

### Finding: JTBD + AI Is Mostly Theoretical — No Practitioner-Level Evidence Found

**Evidence Level: Level 1 (opinion)**

Tony Ulwick's JTBD framework is being discussed in the context of AI strategy ("hire AI to achieve specific outcomes"), but **no named practitioner was found describing an AI-assisted JTBD research workflow.** The closest is Teresa Torres' AI-generated Opportunity Solution Trees, which operationalize a related but distinct framework.

The JTBD community appears to be treating AI as a subject to apply JTBD thinking TO ("what job does AI do for the user?") rather than a tool to assist WITH JTBD research.

- Source: https://jobs-to-be-done.com/ [practitioner direct — Tony Ulwick's site]
- Source: https://medium.com/@mikeboysen/ai-strategy-a-practical-framework-using-jobs-to-be-done-jtbd-5e86f3fa7528 [practitioner direct — Mike Boysen]
- Evidence level: Level 1 (opinion and framework application, no deployment evidence)

---

## 6. Synthetic Users / AI-Generated Personas

### Finding: Synthetic Users Are Real but Controversial — Use for Screening, Not for Truth

**Evidence Level: Level 2 (experiments, with strong caveats)**

**The market exists:** Pure-play platforms include Synthetic Users, Simile, Aaru, Ditto, Evidenza, SYMAR, Lakmoos, Artificial Societies.

**Key data points:**
- Synthetic Users has run 30,000+ synthetic interview sessions across 11 industries (as of early 2025)
- Cost: ~$2-27/interview vs. ~$200 for traditional panels
- Stanford and Google DeepMind study: 85% accuracy on social surveys
- Usability theme parity: 85-92% reported by platforms
- Gartner recognized Synthetic Users as a leader

**Critical limitations (well-documented):**
- Tend to be "overly agreeable, emotionally flat, and biased toward Western perspectives"
- NielsenIQ warns outputs "pass a gut check" but aren't backed by real evidence
- Cannot produce genuine behavioral data or capture real human unpredictability
- "Garbage in, garbage out" — only as good as underlying training data

**Practitioner guidance converging on 80/20 model:**
- Use synthetic for first 80% — rapid iterations, message testing, screening bad concepts, building hypotheses
- Reserve human interviews for final 20% — deep emotional insights, edge cases, cultural nuances, go/no-go decisions

**Christopher Silvestri** (Conversion Alchemy) published "The State of Synthetic Research in 2025" — the most comprehensive independent assessment found
- Source: https://christophersilvestri.com/research-reports/state-of-synthetic-research-in-2025/ [practitioner direct]
- Evidence level: Level 2 (research report, not deployment evidence)

---

## 7. The Coding-Agent-as-PM-Tool Pattern (Cross-Cutting)

### Finding: Claude Code Is Becoming the Default PM Research Infrastructure

**Evidence Level: Level 3 (convergence) — this is the strongest signal in the entire scan**

The most striking finding: **coding agents (primarily Claude Code) are being repurposed as general-purpose PM research and analysis tools.** This is not about prototyping or vibe coding — PMs are building custom skills/workflows for discovery work.

**Named practitioners building PM research workflows in Claude Code:**
1. **Sachin Rekhi** (Reforge) — 13 skills, 1,500 webinar attendees, detailed blog posts
2. **Teresa Torres** (Product Talk) — automated research collection, daily academic digests, context libraries
3. **Mohit Aggarwal** — Claude Code + Obsidian "second brain" for competitive research and PRDs
4. **Dean Peters** — open-source PM Skills framework for Claude Code/Codex
5. **Carl Vellotti** — created ccforpms.com, free interactive course
6. **Aman Khan** (Head of Product, Arize AI) + **Eric Xiao** — Maven course on Claude Code for PMs

**Training ecosystem emerging:**
- Sachin Rekhi's AI Productivity course at Reforge (launched April 2026)
- Aman Khan + Eric Xiao Maven course
- Carl Vellotti's ccforpms.com (free, 15-25 hours)
- Dean Peters' open-source GitHub framework
- Claire Vo's "How I AI" podcast on Lenny's network

**This pattern directly validates the "coding agents as meta-platform" thesis.** Claude Code is not just building software — it's building PM research infrastructure: synthesizing interviews, analyzing NPS, monitoring competitors, generating reports. The same structural advantage (compounds, builds the next tool) applies to PM work as it does to engineering work.

---

## 8. Market Context — Adoption Statistics

**Productboard Survey (October 2025)** — 379 enterprise PMs
- 100% use AI tools (zero non-users)
- 94% use AI daily
- ~4 hours saved per task
- Nearly half describe AI as "deeply embedded" in workflows
- Source: https://www.productboard.com/blog/ai-in-product-management-report/ [vendor press release — Productboard is a vendor, but UserEvidence conducted independently]
- Evidence level: Level 2 (single survey, vendor-sponsored but independently conducted)

**BuildBetter stat:** 73% of PMs use at least one AI tool daily (early 2026), nearly double the 45% in 2024
- Source: https://blog.buildbetter.ai/best-ai-tools-for-product-managers-2026/ [vendor press release]
- Evidence level: Level 0 (vendor blog, methodology unclear)

**David Haberlah analysis** (AI Transformation Lead, SiteMinder) — analyzed 349 newsletters + 289 podcast transcripts from Lenny's Newsletter/Podcast (2019-2026)
- AI-related content rose from 4% of output (early 2023) to 67% (Q1 2026)
- Source: https://medium.com/@haberlah/what-638-practitioner-voices-reveal-about-pms-ai-transformation-7d2fd16be10d [practitioner analysis]
- Evidence level: Level 2 (rigorous methodology, single analysis)

---

## What We Did NOT Find

This section is as important as the findings. Absence of evidence is signal.

### 1. No Autonomous Discovery Agents in Production
Nobody described an AI agent that independently runs the full discovery loop: identifies research questions → recruits participants → conducts interviews → synthesizes → prioritizes opportunities. The closest (Reforge AI User Interviewer) still requires heavy human setup and interpretation. **The "act for me" problem in discovery remains unsolved.**

### 2. No JTBD/ODI + AI Practitioners
Zero named practitioners found describing AI-assisted Jobs-to-be-Done research workflows. The JTBD community appears to be applying JTBD thinking TO AI, not using AI to accelerate JTBD research. This is a gap.

### 3. No Named Enterprise PM Teams Describing Their AI Discovery Stack
Every practitioner found is either: (a) an independent consultant/educator (Torres, Rekhi), (b) a startup PM writing on Medium (Kopylova, Aggarwal), or (c) a tool vendor. **No PM at a Fortune 500 company was found publicly describing their team's AI-assisted discovery workflow.** The enterprise adoption evidence comes only from aggregate surveys (Productboard), not from named teams.

### 4. No Nordic PM Discovery Practitioners Found
Zero Nordic-origin practitioner content on AI-assisted PM discovery. The Nordic AI ecosystem is strong (Finland #10 Global AI Index, Sweden leads Europe in advanced AI), but no Nordic PM was found writing about AI-assisted discovery workflows. This could be a language/publication bias (Nordic PMs may write in local languages or share in local communities) or a genuine gap.

### 5. No Evidence of AI Improving Discovery QUALITY (Only Speed)
Every practitioner describes time savings. Nobody presents evidence that AI-assisted discovery produces BETTER insights, FEWER missed opportunities, or HIGHER product success rates. The quality question is entirely unaddressed. This is a critical gap — speed without quality improvement is just faster mediocrity.

### 6. No Counter-Evidence of PMs Abandoning AI for Discovery
Also notable: no practitioner was found saying "I tried AI for discovery and went back to manual methods." The signal is uniformly positive, which could indicate genuine utility or could indicate publication bias (PMs who got poor results didn't write about it). Torres' initial skepticism (pre-2025) followed by adoption (2025-2026) is the closest thing to a trajectory shift.

### 7. Competitive Intelligence Agents Are Vendor-Only
No PM described building or using an autonomous competitive intelligence agent. Crayon exists as a vendor product, but no practitioner review of its actual effectiveness was found. CI remains a prompt-and-response activity, not an agentic one.

---

## Implications for Agentic Transformation Research

### For CTOs:
1. **AI-assisted PM discovery is real and mature for synthesis work** — expect your PM team to be using these tools or falling behind
2. **Fully autonomous discovery agents don't exist yet** — anyone selling "autonomous product research" is overselling
3. **The coding agent (Claude Code) is becoming the PM's primary power tool** — invest in PM training on coding agents, not just PM-specific SaaS tools
4. **Quality evidence is absent** — demand proof that AI speeds up good discovery, not just any discovery

### For the research system:
1. **This domain sits at Level 3 for synthesis, Level 2 for everything else** — worth tracking but not yet at Level 4
2. **The coding-agent-as-PM-tool pattern is the strongest cross-cutting signal** — connects to Mode 4 thesis
3. **The enterprise PM gap is a potential research opportunity** — if Nordic companies are doing this internally, capturing that signal would be high-value
4. **JTBD + AI is a white space** — potential article/training topic

---

## Source Index

| Source | Type | Used For |
|--------|------|----------|
| sachinrekhi.com/p/ai-powered-customer-discovery | [practitioner direct] | Discovery workflows |
| sachinrekhi.com/p/claude-code-for-product-managers | [practitioner direct] | Claude Code skills |
| allakopylova.medium.com (end-to-end AI workflow) | [practitioner direct] | Interview synthesis workflow |
| producttalk.org (multiple articles) | [practitioner direct] | Torres' AI discovery work |
| lennysnewsletter.com (Torres episode) | [practitioner direct] | Claude Code for PMs |
| medium.com/@haberlah (638 voices) | [practitioner analysis] | PM landscape analysis |
| productboard.com/blog/ai-in-product-management-report | [vendor press release] | Adoption stats (independently conducted) |
| reforge.com/blog (multiple) | [vendor press release] | AI User Interviewer, Discovery Agent |
| christophersilvestri.com (synthetic research) | [practitioner direct] | Synthetic users state of play |
| medium.com/all-about-claude (Aggarwal) | [practitioner direct] | Claude Code + Obsidian workflows |
| github.com/deanpeters/Product-Manager-Skills | [practitioner direct] | Open-source PM skills |
| ccforpms.com | [practitioner direct] | Claude Code PM course |
| maze.co/ai | [vendor press release] | AI moderator claims |
| blog.buildbetter.ai | [vendor press release] | Tool rankings, adoption stats |
| getthematic.com | [domain trade publication] | Vodafone NZ case |
| antmurphy.medium.com | [practitioner direct] | PM market trends |
