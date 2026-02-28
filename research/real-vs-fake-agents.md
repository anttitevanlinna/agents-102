# Real Agents vs. LLM Pipelines -- What's Actually Deployed?

*Research date: 2026-02-21 (updated with fresh evidence sweep)*
*Evidence window: August 2025 -- February 2026*

## The Question

**Hypothesis to test (not confirm):** "Most things called agents are just LLM pipelines."

The sharp version: Is anyone actually deploying multi-turn, reasoning AI agents that adapt their approach, backtrack when things fail, and make autonomous decisions? Or is the entire "agentic AI" wave just workflow automation tools (n8n, Make, Zapier) with an LLM node in the middle -- pipelines that marketers call "agents" because it sounds better?

Claude Code is the reference example of a real agent: multi-turn reasoning, dynamic tool selection, persistent context, backtracking, and autonomous decision-making across a session. The question is whether anything like this exists outside coding -- and if not, why not.

**Confirmation bias guard:** We actively searched for counter-evidence -- practitioners who ARE running real multi-turn agents successfully, domains where real autonomy is working, and what changed in the last 6 months that might make older skepticism obsolete. The honest answer may be "it's mixed."

---

## The Spectrum: From Pipeline to Agent

Not everything is binary. There is a spectrum, and placing things on it honestly reveals where the industry actually is.

### Level 0: Static Automation
Traditional RPA, Zapier/Make workflows with no AI. If X happens, do Y. Deterministic, no LLM involved.

### Level 1: Pipeline with LLM Step
A fixed workflow where one or more steps call an LLM. The workflow graph is hardcoded. The LLM generates text or classifies input, but has no control over what happens next. **This is what most "AI agents" in n8n/Make/Zapier actually are.** The LLM is a node in a DAG, not a decision-maker.

### Level 2: Dynamic Pipeline (Structured Routing)
An LLM decides which branch of a pre-defined graph to follow. LangGraph with conditional edges. The paths exist in advance; the LLM picks one. More flexible than Level 1, but the space of possible actions is fully enumerated by the developer. Sometimes called "orchestrated workflows" or "agentic workflows."

### Level 3: Reactive Agent (Tool-Using, Single Turn)
An LLM receives a task, selects tools, and executes a plan -- but in a single pass. No multi-turn reasoning, no backtracking. If it fails, it fails. Many chatbots with RAG and function calling sit here. OpenAI's function-calling API enables this pattern. Better than a pipeline, but not truly autonomous.

### Level 4: Autonomous Agent (Multi-Turn, Adaptive)
The system reasons across multiple turns, adapts its approach based on results, backtracks when something doesn't work, and maintains persistent context. It decides what to do next based on the situation, not a predefined graph. **Claude Code, Codex, Cursor (in agent mode) operate here for coding tasks.** This is what most people imagine when they hear "AI agent."

### Level 5: Multi-Agent Systems
Multiple Level 4 agents collaborating, delegating, and negotiating. Anthropic's multi-agent research system is the reference implementation: a Lead Claude Agent breaks queries into sub-questions, delegates to specialized subagents that search, reason, and cite independently in parallel [1]. Production deployments at this level remain extremely rare as of Q1 2026.

### Where the industry actually is

Anthropic's own distinction is clear and worth repeating: **Workflows** are systems where LLMs and tools are orchestrated through predefined code paths. **Agents** are systems where LLMs dynamically direct their own processes and tool usage [2]. Anthropic recommends finding the simplest solution possible -- "this might mean not building agentic systems at all, since agentic systems often trade latency and cost for better task performance" [2].

---

## What's Actually Deployed (by Level)

### Level 0-1: The Vast Majority (~80-90% of what's called "AI agents")

This is where most enterprise "agentic AI" lives. Concrete examples:

- **n8n/Make/Zapier "AI agents"**: Workflow automation platforms with LLM nodes. The LLM summarizes, classifies, or generates text within a predefined flow. The workflow tool decides what happens before and after.
- **Most "AI customer service agents"**: Chatbots with RAG that retrieve relevant docs and generate responses. They don't reason, plan, or adapt. They pattern-match and generate.
- **"AI agents" in enterprise SaaS**: Microsoft Dynamics 365, Salesforce Agentforce, ServiceNow -- these embed LLM capabilities into existing business processes. The process flow is predetermined; the LLM fills in specific steps.
- **Invoice/document processing "agents"**: Despite vendor claims of "autonomous agents," these are sophisticated document extraction pipelines with LLM-powered OCR and classification. The workflow is: extract -> classify -> match -> route. The LLM doesn't decide what to do next -- it does extraction better than templates.

**Evidence**: Gartner estimates only ~130 of thousands of claimed "AI agent" vendors are building genuinely agentic systems [3]. SDxCentral's year-end analysis confirmed: of thousands of vendors racing to put out agentic solutions, Gartner estimated only 130 were "the real deal" [4].

### Level 2: Structured Routing (~5-15%)

- **LangGraph/CrewAI/AutoGen deployments**: Developers build explicit state machines where LLMs handle routing decisions. The paths are pre-defined but the LLM chooses between them. LangGraph extends LangChain with graph-based architecture -- nodes are agent steps, edges control flow, enabling cycles, conditionals, and parallel execution [5]. More flexible than Level 1, but still bounded by what the developer anticipated.

- **Customer service platforms (Sierra, Kore.ai, Intercom Fin)**: More sophisticated than basic chatbots. Intercom's Fin AI Agent now participates in 90% of customer conversations and autonomously resolves up to 50% [6]. At Lightspeed Commerce, Fin autonomously resolves up to 65% [7]. These platforms charge per successful resolution rather than per seat [6]. They can handle multi-step conversations within structured domains. But the conversation tree is largely predetermined; the AI fills in the branches.

- **Klarna's cautionary tale**: Initially handled 2.3 million conversations, reduced resolution time from 11 to 2 minutes, projected $40M profit improvement. Then reversed course in mid-2025, rehiring humans after CEO Sebastian Siemiatkowski admitted: "We focused too much on efficiency and cost. The result was lower quality, and that's not sustainable" [8]. The AI couldn't handle nuanced problem-solving. Klarna now runs a human-AI hybrid model.

### Level 3: Reactive Agents with Tool Use (~1-3%)

- **OpenAI Deep Research**: Multi-step web research agent. Browses the web, interprets content, and compiles structured reports with citations for 5-30 minutes autonomously [9]. As of February 2026, can connect to MCP servers and restrict searches to trusted sites [9]. The closest to "real" agency outside coding for information tasks. Genuinely useful but narrow -- information retrieval and synthesis, not business process decisions.

- **ChatGPT Agent** (launched late 2025): Combines browsing, code execution, and tool use in a single session. Represents a step toward Level 4 for consumer use cases.

- **Anthropic's computer use**: Claude controlling a computer via screenshots and mouse/keyboard actions. Available but explicitly not production-ready. Human takeover built in.

### Level 4: Autonomous Multi-Turn Agents (<1%)

- **Coding agents**: Claude Code, OpenAI Codex, Cursor (agent mode), Devin. These genuinely reason across multiple turns, select tools dynamically, and adapt their approach. **This is the only domain where Level 4 agents are in real production use at scale.**

  Anthropic's own data (February 2026) confirms the autonomy is real and growing: Between October 2025 and January 2026, the 99.9th percentile turn duration nearly doubled, from under 25 minutes to over 45 minutes [10]. Users grant more autonomy as they gain experience -- newer users employ full auto-approve roughly 20% of the time, increasing to over 40% by 750 sessions [10].

- **Devin (Cognition)**: The most honest test case. After 18 months: "senior-level at codebase understanding but junior at execution." Excels at tasks with clear requirements that would take a junior engineer 4-8 hours. Migrated Java repos 14x faster than humans. Companies' test coverage rises from 50-60% to 80-90% [11]. But independent testing: failed 14 of 20 tasks [12]. Revenue grew from ~$1M (Sept 2024) to ~$73M (June 2025) [11].

- **Anthropic Claude Agent SDK**: Production framework for building agents beyond coding. Software engineering accounts for roughly 50% of tool usage, but Anthropic reports "experimentation in areas as diverse as back-office automation, marketing, finance, and even medicine and healthcare" [10]. The key word is *experimentation* -- not production deployment.

### Level 5: Multi-Agent Systems (~0% in production)

Multi-agent system inquiries surged 1,445% from Q1 2024 to Q2 2025 [13]. Research from multiple sources shows the reality:

- **MAST-Data study** (arXiv, late 2025): Analyzed 1,600+ traces across 7 popular multi-agent frameworks. Found failure rates ranging from 41% to 86.7% [14]. Identified 14 unique failure modes in 3 categories: system design issues, inter-agent misalignment, and task verification failures [14].
- **The "17x error trap"**: The "bag of agents" anti-pattern -- simply adding more agents without proper coordination creates cascading failures. Data shows accuracy gains begin to saturate or fluctuate beyond a 4-agent threshold [15].
- **Anthropic's multi-agent research system** is the reference implementation that works -- but it's a narrow, internally-built system for web research, not a general-purpose production platform [1].

---

## Where Real Agents Work (If They Do)

### Coding: The One Domain Where Level 4 Agents Work

Coding is currently the only domain with genuine multi-turn, adaptive, autonomous agents in production at scale:

- **Claude Code**: Multi-turn reasoning, dynamic tool selection, persistent context, backtracking. Anthropic's architecture uses an initializer agent that sets up the environment and a coding agent that makes incremental progress in every session, leaving clear artifacts for the next session [16]. Can work autonomously for 45+ minutes per turn [10].
- **OpenAI Codex**: Multi-agent architecture where each agent works in its own isolated environment.
- **Cursor**: IDE-native agent that reasons about code, makes edits, runs tests, iterates.
- **Devin**: Full "AI software engineer" -- autonomous but inconsistent.

**Why coding works for agents**: Code has an objective verification mechanism (tests pass/fail, code compiles/doesn't). The agent gets clear signals about whether its actions worked. Most business domains lack this. A customer service response can't be "compiled" to check if it's correct.

**SWE-bench tells the story**: Performance surged from 1.96% (best model, early 2024) to approximately 75% on SWE-bench Verified by late 2025 [17]. This 38x improvement in roughly 18 months is why coding agents crossed the usefulness threshold.

**Karpathy's reversal is the proof point**: In October 2025, he dismissed AI agents saying they "just don't work" [18]. Three months later (December 2025), he reversed course, concluding that LLM agents -- "particularly Claude and Codex" -- crossed "some kind of threshold of coherence," triggering "a phase change in software engineering" [19]. This wasn't hype -- it was a skeptic changing his mind based on direct experience with coding agents specifically.

### Outside Coding: The Counter-Evidence (Searched Hard)

We specifically searched for real Level 4 agents working outside coding. Here is what we found:

**Customer service -- Level 2-3, not Level 4:**
- Intercom Fin: 50-65% autonomous resolution rate [6][7]. Charges per resolution. Can handle multi-step conversations and take actions (refunds, account changes). But operates within structured conversation trees. Not Level 4 multi-turn reasoning -- Level 2-3 structured routing with good tool integration.
- Sierra: Integrates with backend systems, completes end-to-end actions. More sophisticated than chatbots, but still domain-bounded structured routing.
- The market is transitioning to outcome-based pricing (per resolution vs per seat) -- 6 companies generating $100M+ ARR [6]. This suggests real value being delivered, but the value comes from Level 2-3 systems, not Level 4 autonomy.

**Finance/operations -- mostly Level 1-2 with some Level 3:**
- HPE's "Alfred" (with Deloitte): Agentic AI for forecasting and accounts receivable, cutting financial reporting cycles by ~40% [20]. But this is structured pipeline automation with LLM enhancement, not autonomous reasoning.
- AMD: 80% reduction in time to resolve HR inquiries within 90 days of deploying AI agents [21]. Impressive efficiency, but the "agent" is following predefined HR resolution paths.
- Only 11% of organizations are actively using agentic AI in production; 38% are piloting [21].

**Deep Research -- Level 3-4 for information tasks:**
- OpenAI Deep Research, Anthropic Research feature, Perplexity: Multi-step reasoning, tool use, adaptation. These come closest to Level 4 outside coding. But they operate in a narrow domain (information retrieval and synthesis) with limited real-world consequences.

**The honest verdict on counter-evidence:** Customer service and finance are the strongest counter-evidence areas. Real value is being delivered. But when you look closely at the architecture, even the best deployments (Intercom Fin, Sierra) are Level 2-3 structured routing systems, not Level 4 autonomous reasoners. The value they deliver is real -- it just comes from well-designed pipelines, not from agent autonomy.

---

## Where They Don't (Yet)

### Domains where "agents" are still pipelines dressed up:

1. **Enterprise SaaS "agents"**: Salesforce Agentforce, Microsoft Copilot Agents, ServiceNow AI Agents -- LLM features embedded in existing business process flows. The process is predetermined; the LLM fills in steps.

2. **HR "agents"**: Follow predefined resolution trees. The 80% faster resolution at AMD [21] comes from automating the lookup-and-respond pattern, not from autonomous reasoning about novel HR situations.

3. **Finance "agents"**: Invoice processing, reconciliation, compliance checks. These deliver real ROI through sophisticated Level 1-2 pipelines. The LLM does extraction and classification better than templates, but the workflow is fixed.

4. **Marketing "agents"**: Content generation, campaign optimization. Typically single-turn LLM calls wrapped in workflow automation, not multi-turn reasoning.

5. **Sales "agents"**: Lead qualification, follow-up automation. Described as "learning agents that continuously analyze customer data" -- but in practice, this means an LLM scoring leads based on predefined criteria, not autonomous multi-turn sales strategy.

---

## The "Agent Washing" Problem

### The Term Is Now Official

Gartner formally identified "agent washing" in 2025 -- vendors rebranding existing products (AI assistants, RPA, chatbots) as "agents" without adding genuine agentic capabilities [3]. SDxCentral's analysis confirmed the pattern across the industry [4].

### How Widespread?

**Extremely widespread.** Gartner estimates only ~130 of thousands of claimed "AI agent" vendors build genuinely agentic systems [3]. That means >95% of vendors claiming to offer "AI agents" are agent-washing.

Concrete patterns:
- **RPA vendors** relabeled bots as "agents" (UiPath, Blue Prism, Automation Anywhere all pivoted messaging to "agentic")
- **Chatbot platforms** renamed chatbots to "AI agents" (Intercom, Drift, Zendesk)
- **Workflow automation** added "AI agent" branding to LLM nodes (n8n, Make, Zapier)
- **Enterprise SaaS** embedded LLM features and called them "agents" (Salesforce Agentforce, Microsoft Copilot Agents, ServiceNow AI Agents)

### The LangChain Survey Paradox

The LangChain State of Agent Engineering survey (Dec 2025, 1,340 respondents) reported 57.3% have agents "in production" [5]. This number is almost certainly inflated by definition. The survey respondents are self-selected (LangChain users building "agents"), and "agent in production" likely includes Level 1-2 pipelines. For organizations over 10K employees, the number was 67% [5]. The survey reveals adoption of *something called agents*, not necessarily adoption of Level 4 autonomy.

The same survey found quality is the #1 production barrier (32%), followed by latency (20%) [5]. These are exactly the problems you'd expect with real agentic systems -- suggesting at least some respondents are building genuine agents, not just wrapping LLM calls.

### How to Tell Real from Fake

The test is straightforward:
1. **Does it adapt when its first approach fails?** (Pipelines don't backtrack)
2. **Does it decide what to do next, or follow a predefined path?** (Pipelines have fixed graphs)
3. **Does it maintain context across multiple reasoning steps?** (Single LLM calls don't)
4. **Can it use tools it wasn't explicitly told to use for this task?** (Pipelines have fixed tool assignments)
5. **Would removing the LLM break the workflow logic, or just degrade one step?** (In pipelines, the workflow runs without the LLM -- just worse at one step)

---

## Why Real Agents Are Hard

### 1. The Compound Error Problem (the fundamental barrier)

Even a 5% error rate per step means ~40% chance of at least one error in a 10-step process. At 20 steps with 95% reliability per step, overall success drops to 36% [22]. Carnegie Mellon benchmarks show leading agents complete only 30-35% of multi-step tasks [22].

This is not a model quality problem alone -- it's a mathematical property of sequential decision-making. Until per-step reliability reaches 99%+, multi-step agents will fail too often for enterprise production.

**Evidence from practice**: An Upwork real-world task study found AI agents failed 60-80% of tasks working standalone. When AI agents collaborate with human experts, completion rates surge by 70% [23]. This is the compound error problem in action -- humans catch and correct the errors that would otherwise cascade.

### 2. Cost (multi-turn = expensive)

Each reasoning turn costs an LLM call. A Level 4 agent making 50 decisions to complete a task costs 50x what a single LLM call costs. Anthropic's data shows developers use AI in 60% of their daily workflows, yet they fully delegate (unsupervised) only 0-20% of tasks [24]. The economics of full delegation don't work for most tasks.

### 3. Controllability (the enterprise objection)

Enterprises want predictable, auditable outputs. "The agent decided to do X" is not an acceptable answer for compliance, finance, or healthcare. Anthropic's own research: 80% of current API actions are subject to protective measures (permission restrictions, human approval), and irreversible actions account for only 0.8% of all actions [10]. Even the most autonomous coding agent is heavily sandboxed.

### 4. Infrastructure: MCP Is Solving the Connection Problem

The Model Context Protocol (MCP), launched by Anthropic in November 2024, has become the universal standard for connecting AI agents to enterprise tools -- 97M+ monthly SDK downloads, backed by Anthropic, OpenAI, Google, and Microsoft [25]. OpenAI adopted MCP in March 2025 and is deprecating its Assistants API in favor of MCP-based architectures [25].

MCP is critical infrastructure: it solves the "USB-C for AI" connection problem. Organizations report 40-60% faster agent deployment times [25]. But MCP enables both Level 1-2 pipelines and Level 4 agents -- it's plumbing, not autonomy. Better plumbing makes all levels work better, but doesn't automatically push systems up the autonomy spectrum.

### 5. Verification (why coding wins)

Code has objective verification -- tests pass or fail, code compiles or doesn't. The agent gets clear signals about whether its actions worked. Most business domains lack equivalent verification mechanisms. A customer service response, an HR policy interpretation, a financial forecast -- none of these can be automatically verified the way code can. Without verification, agents can't self-correct, and compound errors go undetected.

---

## What Changed in the Last 6 Months

This section matters because the agentic AI landscape moves fast enough that 6-month-old skepticism can be genuinely obsolete.

### Changes that make older skepticism partially outdated:

1. **Karpathy's reversal (December 2025)**: The most credible skeptic reversed his position. After dismissing agents in October 2025, he concluded in December that coding agents crossed "some kind of threshold of coherence" [19]. This is significant -- a practitioner changing his mind based on direct experience, not hype.

2. **Claude Code autonomy data (October 2025 - January 2026)**: Turn durations nearly doubled (under 25 min to over 45 min). Users grant more autonomy with experience. This is measured behavior change, not vendor claims [10].

3. **SWE-bench from 1.96% to ~75%**: A 38x improvement in coding agent capability in ~18 months [17]. This demonstrates that the underlying models are improving fast enough to move systems up the autonomy spectrum.

4. **MCP ecosystem explosion**: From ~100K downloads to 97M+ monthly in one year. 5,800+ MCP servers, 300+ clients [25]. The infrastructure for agent-tool interaction is maturing rapidly.

5. **Anthropic's multi-agent research system**: A working Level 5 system for research tasks. Lead agent plans, delegates to specialized subagents, results synthesized [1]. Not generalizable yet, but proves the architecture works in at least one domain beyond coding.

6. **Customer service resolution rates climbing**: Intercom Fin at 50-65% autonomous resolution [6][7], with outcome-based pricing proving commercial viability. Not Level 4 autonomy, but Level 2-3 delivering real value.

### Changes that DO NOT invalidate the skepticism:

1. **The compound error problem is mathematical, not just empirical.** Better models help but don't eliminate it. 99% per-step reliability (ambitious) still gives 82% over 20 steps.

2. **Klarna's reversal (May 2025)** remains a cautionary tale. The poster child for AI customer service had to rehire humans [8]. Quality degraded at scale. This happened *after* the models improved.

3. **Multi-agent failure rates remain high**: 41-86.7% across 7 frameworks [14]. The "bag of agents" problem is architectural, not just a model quality issue.

4. **Enterprise governance hasn't caught up**: Only 2% of companies had adequate AI guardrails in 2025. 95% experienced at least one AI incident [21].

5. **Karpathy's reversal was specifically about coding agents.** He has not reversed his position on agents in general. His "decade" estimate for general autonomous agents may still hold.

### The net assessment:

The direction is clear and accelerating. But the acceleration is concentrated in coding agents and coding-adjacent tasks (research, analysis). For general business processes, the gap between Level 2 and Level 4 has narrowed but has not closed. The infrastructure (MCP) is ready. The models are improving. The compound error problem and verification gap remain fundamental barriers.

---

## The Honest Answer

### Testing the hypothesis: "Most things called agents are just LLM pipelines."

**The hypothesis is substantially correct but requires nuance.**

1. **~95% of "AI agents" are Level 0-2**: Pipeline automation with LLM nodes. The workflow is predetermined; the LLM fills in specific steps. Calling these "agents" is marketing, not engineering. Gartner's estimate that only ~130 of thousands of vendors build genuinely agentic systems confirms this [3][4].

2. **Coding is the sole domain with real Level 4 agents at scale**: Claude Code, Codex, Cursor, and Devin demonstrate genuine multi-turn reasoning, dynamic tool selection, and adaptive behavior. They work because code has objective verification (tests, compilation). The 38x improvement on SWE-bench [17] and Karpathy's reversal [19] confirm this is real, not hype.

3. **Customer service is the strongest Level 2-3 counter-evidence**: Real value, real revenue ($100M+ ARR companies), outcome-based pricing [6]. But the architecture is structured routing, not autonomous reasoning. Klarna's reversal [8] shows the limits.

4. **Deep Research tools are real Level 3-4 for information tasks**: Multi-step reasoning, tool use, adaptation. Genuinely useful. But narrow domain with limited real-world consequences.

5. **The "boring tasks" that deliver ROI are Level 1-2**: Document processing, invoice handling, compliance checks, data reconciliation. Real value -- but through sophisticated pipelines, not autonomous agents.

6. **Multi-turn autonomous agents fail too often for production outside coding**: Compound errors, 41-86.7% failure rates in multi-agent systems [14], 60-80% standalone failure [23]. Not production-ready for most business processes.

### The nuance the hypothesis misses:

**First**: The Level 2-3 systems are genuinely useful and getting better. Dismissing them as "just pipelines" understates the real value they deliver. A Level 2 system that resolves 65% of customer service inquiries autonomously [7] is a meaningful business outcome, even if it isn't a "real agent" in the Claude Code sense. The label matters less than the value.

**Second**: The *direction* is clear and accelerating. MCP (97M+ monthly downloads [25]), Claude Code's growing autonomy [10], and the SWE-bench trajectory [17] represent genuine architectural advances. The gap between Level 2 and Level 4 is narrowing. But it hasn't closed for most domains, and the compound error problem [22] means it may never close for domains without objective verification.

**Third**: For training purposes, this distinction is the most valuable insight in the entire agentic AI space. Everyone is confused about what an agent is. Teaching people to distinguish Level 1 pipelines from Level 4 agents -- and to understand *why* the gap exists (verification, reliability, cost, controllability) -- is exactly the kind of sharp, honest framing that cuts through vendor noise. This is the curriculum moment.

### The bottom line

Most "AI agents" are not agents. They are LLM-augmented pipelines. The only domain with real autonomous agents is coding, because code can verify itself. Customer service has the strongest Level 2-3 systems, delivering real value through structured routing. Everything else is either Level 1-2 pipelines with good marketing, or Level 3 tools that work well in narrow domains. The technology for Level 4 agents outside coding is improving fast -- but the compound error problem and the verification gap are structural barriers, not just engineering challenges to be solved with better models.

The industry knows this. That's why Gartner coined "agent washing" [3], why Klarna reversed course [8], why Karpathy reversed only for coding agents specifically [19], and why Anthropic itself advises starting with simple workflows [2]. The honest practitioners are already saying what the hypothesis suggests -- with the important caveat that the Level 2-3 systems delivering real value today should not be dismissed just because they aren't "real agents."

---

## Sources

[1] Anthropic Engineering, "How we built our multi-agent research system," 2025.
https://www.anthropic.com/engineering/multi-agent-research-system

[2] Anthropic, "Building Effective Agents," December 2024.
https://www.anthropic.com/research/building-effective-agents

[3] Gartner, "Agent Washing" identification, 2025. Via SDxCentral and Staffing Industry coverage.
https://www.sdxcentral.com/analysis/was-2025-really-the-year-of-the-ai-agent/

[4] SDxCentral, "Was 2025 really the year of the AI agent?" December 2025.
https://www.sdxcentral.com/analysis/was-2025-really-the-year-of-the-ai-agent/

[5] LangChain, "State of Agent Engineering 2025," December 2025. Survey of 1,340 respondents.
https://www.langchain.com/state-of-agent-engineering

[6] Intercom, "Fin AI Agent" and customer resolution data, 2025-2026.
https://fin.ai/

[7] Intercom/Lightspeed, "How Lightspeed achieves up to 65% resolution rate with Fin AI Agent."
https://fin.ai/customers/lightspeed

[8] Klarna reversal: CEO Siemiatkowski admits AI quality decline, rehires humans, May 2025.
https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396

[9] OpenAI, "Introducing deep research," February 2025 (updated February 2026).
https://openai.com/index/introducing-deep-research/

[10] Anthropic Research, "Measuring AI agent autonomy in practice," February 2026.
https://www.anthropic.com/research/measuring-agent-autonomy

[11] Cognition, "Devin's 2025 Performance Review: Learnings From 18 Months of Agents At Work."
https://cognition.ai/blog/devin-annual-performance-review-2025

[12] Devin independent testing results. Via Trickle and TechPoint reviews, 2025.
https://trickle.so/blog/devin-ai-review

[13] Multi-agent system inquiry growth statistic. Via multiple sources including Anthropic ecosystem data.
[SOURCE: aggregated from vendor reporting]

[14] "Why Do Multi-Agent LLM Systems Fail?" arXiv 2503.13657, March 2025. MAST-Data: 1,600+ traces, 7 frameworks.
https://arxiv.org/abs/2503.13657

[15] "Why Your Multi-Agent System is Failing: Escaping the 17x Error Trap of the 'Bag of Agents,'" Towards Data Science / Sean Moran, January 2026.
https://towardsdatascience.com/why-your-multi-agent-system-is-failing-escaping-the-17x-error-trap-of-the-bag-of-agents/

[16] Anthropic Engineering, "Effective harnesses for long-running agents," November 2025.
https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

[17] SWE-bench Verified leaderboard and historical performance data.
https://epoch.ai/benchmarks/swe-bench-verified

[18] Karpathy on AI agents (October 2025): "They just don't work."
https://simonwillison.net/2025/Oct/18/agi-is-still-a-decade-away/

[19] Karpathy reversal (December 2025): Agents crossed "some kind of threshold of coherence."
https://the-decoder.com/former-tesla-ai-chief-andrej-karpathy-now-codes-mostly-in-english-just-three-months-after-calling-ai-agents-useless/

[20] HPE CFO on agentic AI in finance, January 2026.
https://www.cfodive.com/news/hpe-cfo-puts-agentic-ai-center-2026-finance-priorities/812097/

[21] Agentic AI deployment statistics: 11% in production, AMD HR results, governance gaps.
https://neurons-lab.com/article/agentic-ai-in-financial-services-2026/

[22] Compound error analysis and Carnegie Mellon agent benchmarks.
https://arxiv.org/html/2602.16666
https://www.artiquare.com/why-multi-agent-ai-fails/

[23] Upwork/VentureBeat: AI agents fail 60-80% standalone, 70% improvement with human partners.
[SOURCE: Via HackerNoon and VentureBeat coverage, 2025]
https://hackernoon.com/stop-believing-the-agent-hypethe-numbers-dont-lie

[24] Anthropic, "2026 Agentic Coding Trends Report."
https://resources.anthropic.com/2026-agentic-coding-trends-report

[25] Model Context Protocol ecosystem data: 97M+ monthly SDK downloads, adoption by OpenAI/Google/Microsoft.
https://www.pento.ai/blog/a-year-of-mcp-2025-review

---

## Research Log

### Search Queries Executed (2026-02-21, updated sweep)

1. reddit "real AI agents" vs "just workflows" production 2025 2026
2. Hacker News "AI agent" production reality hype 2025 2026
3. "agent washing" LLM pipeline "not really agents" 2025 2026
4. Anthropic Claude agent architecture multi-turn autonomous 2025 2026
5. LangChain "state of agent engineering" 2025 report findings "in production" percentage architecture
6. Claude Code "real agent" multi-turn autonomous coding agent architecture 2025 2026
7. customer service AI agent autonomous production deployed results 2025 2026
8. Anthropic "building effective agents" blog post agentic workflows vs agents 2025
9. "Klarna" OR "Sierra" OR "Intercom" AI agent customer service autonomous results 2025 2026
10. Hacker News "agents are overhyped" OR "agent hype" OR "most agents are" 2025 2026
11. Andrej Karpathy AI agents opinion 2025 2026 workflows vs agents
12. Anthropic "measuring agent autonomy" research blog 2025 2026 findings
13. "agentic AI" finance operations HR compliance deployed production results 2025 2026
14. Hacker News "current hype around autonomous agents what actually works" production 2025
15. Devin AI agent coding actual results performance review practitioner 2025 2026
16. SDxCentral "was 2025 really year of AI agent" analysis findings
17. Klarna AI customer service "back to humans" OR "rehiring" OR reversal 2025 2026
18. "compound error" OR "error propagation" multi-step AI agent reliability production 2025 2026
19. Anthropic "effective harnesses for long-running agents" engineering blog 2025 2026
20. Anthropic "agentic coding trends report" 2026 findings statistics Claude Code usage
21. "HackerNoon" "stop believing agent hype" numbers evidence 2025 2026
22. Intercom Fin AI agent "resolution rate" production results 2025 2026
23. "model context protocol" MCP agents "tool use" real deployment infrastructure 2025 2026
24. SWE-bench AI agent benchmark coding performance improvement 2025 2026

### Confidence Levels

| Claim | Confidence | Basis |
|-------|-----------|-------|
| ~95% of "AI agents" are Level 0-2 pipelines | 8/10 | Gartner ~130/thousands figure, broad evidence [3][4] |
| Coding is the only domain with Level 4 agents at scale | 9/10 | SWE-bench data [17], Karpathy reversal [19], Anthropic data [10] |
| Customer service is strongest Level 2-3 counter-evidence | 8/10 | Intercom Fin data [6][7], outcome-based pricing, $100M+ ARR companies |
| Deep Research is closest non-coding Level 3-4 | 7/10 | Limited production data, but architecture is genuinely multi-step [9] |
| Agents fail 60-80% standalone outside coding | 8/10 | Carnegie Mellon + Upwork + MAST-Data studies converge [14][22][23] |
| Agent washing is widespread (>95% of vendors) | 8/10 | Gartner estimate + broad pattern evidence [3][4] |
| Compound error is the structural barrier | 9/10 | Mathematical property + empirical confirmation [14][22] |
| MCP is solving the infrastructure problem | 8/10 | 97M+ downloads, multi-vendor adoption [25] |
| Level 2-3 systems deliver real business value | 8/10 | Intercom [6][7], HPE [20], AMD [21] -- genuine efficiency gains |
| Enterprise readiness for Level 4 outside coding is 2-5 years | 6/10 | Karpathy says decade [18]; technology improving fast [17]; uncertain |
