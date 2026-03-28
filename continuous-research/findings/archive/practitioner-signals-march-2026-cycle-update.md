# Practitioner Signals — March 2026 Cycle Update

*Cycle update building on practitioner-signals-march-2026.md. Research date: March 23, 2026.*

---

## Summary of New Signals Since Last Cycle

**Three significant developments found:**
1. **Karpathy's No Priors podcast (March 20)** — Major new signal. "Haven't typed a line of code since December." Running parallel agents on tiled monitors. Coined "agentic engineering" as a discipline.
2. **Harrison Chase / LangChain — significant trajectory change.** Deep Agents launch, NVIDIA partnership, $1.25B raise. Chase now pushing "harness engineering" and "context engineering" concepts. Previous assessment of "no significant shift" is outdated.
3. **Simon Willison's agentic engineering fireside chat (March 14)** and the chardet relicensing controversy (March 5) — two new substantive signals on agents reshaping software practice.

**One gap partially closed:**
- Mollick's "The Shape of the Thing" URL confirmed: https://www.oneusefulthing.org/p/the-shape-of-the-thing

**Gaps that persist:**
- No Nordic practitioners publishing about agent deployment
- No first-person practitioner accounts of agents in HR, compliance, or finance
- No Dex Horthy new writing found (12-Factor Agents remains his last major output)

---

## Practitioner Updates

### 1. Andrej Karpathy — NEW: No Priors Podcast (March 20, 2026)

**What's new:** Karpathy appeared on No Priors podcast with Sarah Guo. This is a major signal update beyond the autoresearch release already tracked.

**Key new claims:**
- "I don't think I've typed like a line of code probably since December" — the shift happened in December 2025 when he went from 80/20 human/agent to 20/80, then to zero manual coding
- "Code's not even the right verb anymore" — he now "expresses his will to agents for 16 hours a day"
- Runs **multiple coding agents in parallel on a tiled monitor**, assigning features to each and reviewing outputs as they return
- Describes being in a "state of psychosis" trying to figure out what's possible
- Built "Dobby the House Elf" — a home agent controlling sound, lighting, HVAC, security, pool via WhatsApp natural language commands
- Coding agent skills are "atrophying" because agents crossed a "coherence threshold" around December 2025

**Position update:** Previous: "Building autonomous research agents (autoresearch)." Updated: **Fully agentic workflow across all work. Zero manual coding since December 2025. Framing this as "agentic engineering" — a new discipline of decomposing work, managing parallel agent workstreams, and catching errors before they compound.**

**Sources:**
- https://podscripts.co/podcasts/no-priors-artificial-intelligence-technology-startups/andrej-karpathy-on-code-agents-autoresearch-and-the-loopy-era-of-ai [practitioner direct — podcast transcript]
- https://fortune.com/2026/03/21/andrej-karpathy-openai-cofounder-ai-agents-coding-state-of-psychosis-openclaw/ [general press — bare facts only]
- https://glenrhodes.com/andrej-karpathys-no-priors-podcast-take-on-the-phase-shift-in-engineering-and-second-order-effects-of-coding-agents/ [practitioner analysis]

**Evidence level:** Level 2 (single practitioner, but extremely high-profile and specific about workflow changes).

**Relevance to our training:** The "parallel agents on tiled monitor" workflow and the "December threshold" claim are powerful teaching signals. The discipline of decomposing work for agents maps directly to our Module 8 (Agents Building Agents) and the broader curriculum arc. The "Dobby" home agent is a memorable example of agents beyond coding — relevant to our "other 90% of the company" thesis, even if it's personal rather than business.

---

### 2. Ethan Mollick — Confirmed: "The Shape of the Thing" (early March 2026)

**What's new:** URL confirmed for latest post. Also found "Signs and Portents" and "Thinking Like an AI" in recent archives but could not confirm exact dates.

**"The Shape of the Thing" key points:**
- Exponential progress since April 2025 across video, benchmarks, and agent capability
- METR Long Tasks graph cited as "the most famous evaluation in AI today"
- Community response captured the core tension: "the gap between 'AI can pass expert-level tests' and 'my company still can't figure out how to use it' feels like the real story of 2026 so far"

**Position update:** Stable. Mollick continues to be cautiously bullish on capability while emphasizing the organizational adoption gap. His "management as AI superpower" thesis (January 27) remains his most actionable contribution — delegation frameworks from other fields (military five-paragraph orders, film shot lists, architectural design intent, consultant engagement scopes) work as agent instructions.

**Sources:**
- https://www.oneusefulthing.org/p/the-shape-of-the-thing [practitioner direct]
- https://www.oneusefulthing.org/p/management-as-ai-superpower [practitioner direct]
- https://x.com/emollick/status/2016195898745692183 [practitioner direct]

**Evidence level:** Level 1 (opinion from highly credible practitioner).

**Relevance:** The "delegation frameworks as agent instructions" insight from January is directly relevant to Module 1 (Getting Going) — participants could try military-style task delegation to agents as an exercise. The adoption gap observation validates our entire business model.

---

### 3. Simon Willison — NEW: Two Significant March Posts

#### 3a. Fireside Chat on Agentic Engineering (March 14, 2026)

**What's new:** Willison spoke at the Pragmatic Summit in San Francisco. Video available on YouTube.

**Key claims:**
- Described **stages of AI adoption for developers**: asking ChatGPT questions → coding agents writing code for you → agents writing more code than you do
- **Open source concern:** Projects being "flooded with junk contributions" — people trying to get GitHub to disable pull requests
- **Lethal Trifecta reiterated:** Private data access + untrusted content exposure + exfiltration vector = exploitable agents. Example: digital assistant tricked into forwarding password reset emails
- **Sandboxing as the primary defense:** Running agents in constrained environments is the most important security measure
- **Subagents for context management:** Simple but effective way to handle large tasks without burning top-level context

**Source:** https://simonwillison.net/2026/Mar/14/pragmatic-summit/ [practitioner direct]

#### 3b. Can Coding Agents Relicense Open Source? (March 5, 2026)

**What's new:** The chardet relicensing controversy — a developer used Claude Code to rewrite the Python chardet library from LGPL to MIT. Original author Mark Pilgrim objected. This raises fundamental questions about AI-generated code and licensing.

**Key insight:** "When the cost of generating code goes down that much, and we can re-implement it from test suites alone, what does that mean for the future of software?"

**Complicating factors Willison identified:**
1. The developer was deeply familiar with the original codebase (not a true "clean room")
2. Claude Code referenced parts of the original codebase during the rewrite
3. Claude was likely trained on chardet's code

**Source:** https://simonwillison.net/2026/Mar/5/chardet/ [practitioner direct]

**Position update:** Previous: "Stable." Updated: **Still the most rigorous independent analyst. March 2026 adds two new themes: (a) the organizational disruption of agent-generated contributions to open source, and (b) the legal/licensing implications of agent-written code. Both extend beyond pure technical analysis into the institutional effects of agents.**

**Evidence level:** Level 2 (practitioner direct, specific cases).

**Relevance to our training:** The chardet case is a powerful Module 4 (Security) or Module 7 (Agent Platforms) teaching example — agents don't just have technical risks, they have legal and licensing risks. The "junk PR" problem is relevant to any organization deploying coding agents.

---

### 4. Swyx (Shawn Wang) — No Major New Signal

**What's new since last cycle:** The February 2 tweet ("context engineering is as important to inference as data engineering is to training") and "Scaling without Slop" (January 23) were already captured conceptually.

**Latent Space 2026 plans:** 7+ AI Engineer events globally (up from 4 in 2025). More podcast hosts, expanding into education and "AI for Science."

**No new March 2026 posts found specifically on context engineering.**

**Position update:** Unchanged. Community builder amplifying the context engineering concept.

**Source:** https://www.latent.space/p/2026 [practitioner direct]

---

### 5. Harrison Chase / LangChain — SIGNIFICANT UPDATE: Previous "No Shift" Assessment Is Wrong

**What's new:** Three major developments found that change the assessment:

#### 5a. Deep Agents Launch (March 2026 update, originally July 2025)

LangChain open-sourced **Deep Agents** — a batteries-included agent harness built on LangGraph. 9.9K GitHub stars in 5 hours. MIT licensed.

Key features: task planning, sub-agent spawning, long-term memory, context management, virtual filesystem. Chase explicitly stated it was "primarily inspired by Claude Code."

**Chase's framing:** "LangGraph is the runtime. LangChain is the abstraction. Deep Agents are the harness." This is a clear strategic pivot from "framework" to "harness" — pre-built agent systems, not just building blocks.

**Sources:**
- https://github.com/langchain-ai/deepagents [practitioner direct]
- https://opendatascience.com/harrison-chase-on-deep-agents-the-next-evolution-in-autonomous-ai/ [domain trade publication]

#### 5b. NVIDIA Partnership (March 16, 2026)

Enterprise-grade agentic AI platform built with NVIDIA. LangChain joined the Nemotron Coalition. Chase presented at GTC 2026.

**Source:** https://blog.langchain.com/nvidia-enterprise/ [vendor press release — Level 0 for claims, factual for partnership]

#### 5c. "Harness Engineering" and Context Engineering

In VentureBeat interview, Chase stated: "When agents mess up, they mess up because they don't have the right context; when they succeed, they succeed because they have the right context." The trend is "giving the LLM itself more control over context engineering, letting it decide what it sees and what it doesn't see."

**Internal result claimed:** LangChain's own GTM agent (built on Deep Agents) drove 250% more lead-to-opportunity conversions, tripled pipeline, reclaimed 1,320 hours/month.

**Source:**
- https://venturebeat.com/orchestration/langchains-ceo-argues-that-better-models-alone-wont-get-your-ai-agent-to-production [general press — interview with practitioner]
- https://topaiproduct.com/2026/03/15/langchains-gtm-agent-drove-250-more-conversions-now-the-framework-behind-it-is-open-source/ [domain trade publication]

**Caveat:** The GTM conversion claim is a vendor metric about their own product. Level 0 for evidence purposes. But the strategic pivot from "framework vendor" to "harness + context engineering" vendor is real and observable.

**Position update:** Previous: "No significant shift." Updated: **Major strategic pivot. Chase moved from "framework for building agents" to "harness for running agents" — a shift from developer tools to operational systems. Actively pushing "context engineering" as the key discipline, converging with Swyx/Dex Horthy's terminology. LangChain is now positioning as the enterprise agent platform, not just the open-source library.**

**Evidence level:** Level 1-2 (strategic pivot is observable; internal results are vendor claims).

---

### 6. Dex Horthy — No New Writing Found

**What's new:** No new blog posts or significant public output found since the 12-Factor Agents material. The framework continues to be cited widely (DZone, Medium, dev.to analyses in early 2026), but Horthy himself appears quiet.

**The LangChain blog acknowledged 12-Factor Agents as "a very good read"** and noted that many points relate to context engineering.

**Source:** https://github.com/humanlayer/12-factor-agents [practitioner direct — unchanged]

**Position update:** Unchanged. 12-Factor Agents has become an industry reference, but no new practitioner output detected.

---

## Cross-Cutting Themes

### Theme 1: "Agentic Engineering" Is Converging as a Named Discipline

Three independent practitioners are now using this term or close variants:
- **Karpathy:** Coined "agentic engineering" (February 2026) — "you are not writing the code directly 99% of the time"
- **Willison:** Gave a fireside chat titled "agentic engineering" at the Pragmatic Summit (March 14)
- **Chase:** Pushing "harness engineering" as a related concept — pre-built agent systems with planning, memory, subagents

This is approaching **Level 3 convergence** on terminology. The discipline is coalescing around: decomposing work for agents, managing parallel agent workstreams, context engineering, and quality assurance of agent output.

**Relevance:** Our training IS agentic engineering training. The term validates the entire curriculum arc.

### Theme 2: Context Engineering Solidifying

Multiple independent signals:
- **Swyx** promoted the concept (originated by Dex Horthy)
- **Chase** adopted it as LangChain's strategic framing
- **QCon London 2026** hosted a full talk on it
- **Aurimas Griciūnas** published "State of Context Engineering in 2026" (March 2026)
- **Faros AI** published first-person account of context engineering for enterprise codebases
- **Anthropic** published guide on context engineering for agents (September 2025, still referenced)

**Evidence level:** Level 3 (convergence). Multiple independent practitioners, conference talks, and tools converging on the same concept and terminology.

**Source:** https://www.newsletter.swirlai.com/p/state-of-context-engineering-in-2026 [practitioner analysis]

### Theme 3: The "December 2025 Threshold" — Coding Agents Crossed a Line

Karpathy specifically identified December 2025 as when coding agents became reliable enough to flip from "human writes most code" to "agent writes most code." This is a single-practitioner claim but from an extremely credible source.

**Not yet convergence** — we need 10-20 independent practitioners confirming the same December threshold to call it Level 3. But it's a strong Level 2 signal worth tracking.

---

## Updated Source Roster (Cycle Update)

| Person | Previous Position | Current Position (March 23, 2026) | Shift |
|--------|------------------|-------------------------------------|-------|
| Karpathy | Autoresearch, autonomous ML agents | Zero coding since Dec 2025. Parallel agent workflows. "Agentic engineering" as discipline. | Significant ↑↑ |
| Mollick | "Co-intelligence → managing agents" | Stable. Adoption gap is the story. Management skills = AI superpower. | Stable |
| Willison | Agents for non-developers, quality concerns | Agentic engineering fireside chat. Agents reshaping open source licensing. Junk PR problem. | Moderate ↑ |
| Swyx | "Context engineering" promoter | Unchanged. 7 AI Engineer events planned for 2026. | Stable |
| Chase | "No significant shift" | **REVISED:** Deep Agents launch, NVIDIA partnership, "harness engineering" pivot. Major strategic shift. | Significant ↑↑ |
| Dex Horthy | 12-Factor Agents | No new output. Framework still widely cited. | No change |

### Practitioners to add to watch list:
- **Aurimas Griciūnas** — SwirlAI Newsletter, "State of Context Engineering in 2026." Practitioner-level analysis of the discipline.
- **Brandon Waselnuk** — QCon London 2026 speaker on context engineering. Worth tracking.
- **Dan Blanchard** — chardet rewrite developer. Not a thought leader, but the case is a reference for agent-generated code implications.

---

## What We Did Not Find (Updated)

1. **No Nordic practitioners writing publicly about agent deployment in business processes.** The gap persists. The structural explanation holds: Nordic builders publish less publicly than US/UK counterparts.
2. **No Dex Horthy new writing.** He appears to have gone quiet after 12-Factor Agents gained traction.
3. **No first-person practitioner writing about agents in HR, compliance, or finance.** Enterprise deployment stories remain concentrated in coding, customer service, and sales/marketing.
4. **No independent Claude Cowork deployment stories** — still zero practitioner feedback found.
5. **No Mikko Alasaarela / Agentics Helsinki public output** in March 2026.
6. **No counter-evidence to the "December threshold" claim** — but also no independent confirmation beyond Karpathy. Worth monitoring.

---

## Implications for Our Training

1. **"Agentic engineering" is the term to use.** Karpathy coined it, Willison presented on it, Chase is building tools for it. Our training teaches it. We should adopt the term.

2. **Module 1 exercise opportunity:** Mollick's insight that delegation frameworks (military orders, film shot lists, PRDs) work as agent instructions is a concrete exercise — have participants try different delegation styles and compare agent output quality.

3. **Module 4 (Security) teaching case:** The chardet relicensing controversy is a vivid, current example of agent-created legal risk that goes beyond prompt injection.

4. **Module 7 (Agent Platforms) update needed:** LangChain's pivot to "harness engineering" (Deep Agents) represents a real shift in the platform landscape. The distinction between frameworks, runtimes, and harnesses is now a meaningful taxonomy.

5. **The adoption gap IS our market:** Both Mollick ("remarkably little has changed in most organizations") and the METR benchmarks showing exponential capability growth confirm that the gap between what agents can do and what organizations are doing with them is widening. This gap is exactly where our training lives.

---

*Next research actions:*
- Track whether "December 2025 threshold" gets independently confirmed by other practitioners
- Monitor Aurimas Griciūnas and Brandon Waselnuk for continued context engineering output
- Search for first-person HR/compliance/finance agent deployment accounts (the persistent gap)
- Check for Dex Horthy comeback or new project
