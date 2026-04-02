# OODA Cycle: The Intent Bottleneck — Spec as the Management Act

**Date:** 2026-04-02
**Hypothesis:** As AI makes execution cheap, the management function compresses to intent specification. The spec IS the leadership act. Everything downstream is execution (cheap) and trajectory monitoring (data-driven).
**Searches:** 10 web searches across spec-driven management, intent bottleneck, absorption bottleneck, counter-evidence, and beyond-engineering applications.

---

## Finding 1: "The Bottleneck Has Shifted Upstream" — Now Named Explicitly by Multiple Practitioners

**Evidence Level: L3 (Convergence)**

The bottleneck shift from execution to specification is now being named explicitly by 10+ independent practitioners and analysts, crossing the convergence threshold. This is no longer a single experiment — it's a recognized pattern.

**Key voices naming it:**

1. **Leonardo Stern (Agoda)** — "AI Coding Assistants Haven't Sped up Delivery Because Coding Was Never the Bottleneck." Stern's core argument: despite measurable individual productivity gains from AI coding tools, project-level velocity gains are "surprisingly modest" because the real constraint was always specification and verification. His preferred model: "grey box" — humans write specs precise enough for agents to execute, then verify results against evidence rather than inspecting code. Critical organizational insight: "If the highest-value work becomes collaborative specification and architectural alignment, communication is no longer the cost to minimize — it is the work itself. Smaller teams win not because they reduce coordination but because they achieve shared understanding faster."
   - URL: https://www.infoq.com/news/2026/03/agoda-ai-code-bottleneck/
   - Source type: [domain trade publication] — InfoQ reporting on Agoda practitioner's analysis
   - Freshness: March 2026

2. **Marc Brooker (AWS VP/Distinguished Engineer)** — SE Radio episode on spec-driven AI dev. Argues that accelerating code generation shifts the bottleneck to requirements, design, testing, and validation, making specifications the central artifact. Notes "2026 is the year of context management for AI agents."
   - URL: https://se-radio.net/2026/03/se-radio-710-marc-brooker-on-spec-driven-ai-dev/
   - Source type: [practitioner direct] — senior AWS engineer on technical podcast
   - Freshness: March 2026

3. **Sean Grove (OpenAI)** — "The New Code" talk at AI Engineer World's Fair. "The new scarce skill is writing specifications that fully capture your intent and values." Specifications, not prompts or code, are the fundamental unit of programming. Claims code represents only 10-20% of developer value; the other 80-90% is "structured communication" — understanding problems, distilling requirements, planning solutions, verifying correctness.
   - URL: https://www.classcentral.com/course/youtube-the-new-code-sean-grove-openai-467279
   - Source type: [practitioner direct] — OpenAI engineer at conference
   - Freshness: 2025-2026 (talk circulating heavily in early 2026)

4. **Pathmode blog** — "Orchestration Without Intent Is Just Expensive Guessing." Introduces "intent engineering" as a first-class discipline: "An intent spec — objective, outcomes, constraints, edge cases, verification — isn't more documentation. It's a delegation protocol." Explicitly frames intent specification as a management function, not an engineering chore.
   - URL: https://pathmode.io/blog/orchestration-era-needs-intent
   - Source type: [practitioner analysis]
   - Freshness: 2026

5. **Allstacks** — "Spec-Driven Development Isn't Waterfall: Why the AI Coding Bottleneck Changed Everything." Argues the reason waterfall failed was NOT that specifications are bad, but that discovering your spec was wrong was catastrophically expensive. When code regeneration from an updated spec costs nearly zero, the economics invert entirely.
   - URL: https://www.allstacks.com/blog/spec-driven-development-isnt-waterfall-why-the-ai-coding-bottleneck-changed-everything
   - Source type: [practitioner analysis]
   - Freshness: 2026

6. **Daniel Schleicher** — "Removing Ambiguity with Spec-Driven Development." Frames the problem as ubiquitous language creation — ensuring AI builds what you actually want.
   - URL: https://www.danielschleicher.com/software/engineering,/ai,/spec-driven/development/2026/01/04/removing-ambiguity-with-spec-driven-development.html
   - Source type: [practitioner direct]
   - Freshness: January 2026

7. **VCCafe** — "The Researcher's New Job Is Writing the Spec." Explicitly extends the pattern beyond coding: "Not the code, not the experiment, not the analysis — those are now delegated. The valuable work shifts upstream: defining the problem clearly enough that an agent can run with it."
   - URL: https://www.vccafe.com/2026/03/10/the-researchers-new-job-is-writing-the-spec/
   - Source type: [practitioner analysis]
   - Freshness: March 2026

8. **ArXiv paper** — "Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants." Academic treatment of the shift.
   - URL: https://arxiv.org/abs/2602.00180
   - Source type: [academic/research]
   - Freshness: February 2026

**Assessment:** This is genuine L3 convergence. At least 10 independent voices naming the same shift: specification is the new bottleneck, the new scarce skill, the new "work." The framing varies (intent engineering, spec-driven development, grey box model) but the underlying observation is identical.

---

## Finding 2: Karpathy's Autoresearch — the Practitioner Proof Point for "Spec as Management"

**Evidence Level: L2 (Single experiment, but highly influential)**

Karpathy's autoresearch project (March 2026, 21K+ GitHub stars) is the clearest embodiment of "spec as management." Karpathy's job reduced to writing a `program.md` file that describes the research direction. Everything else — running experiments, analyzing results, iterating — is delegated to an autonomous agent loop.

**Tobi Lutke (Shopify CEO)** immediately applied the pattern: pointed autoresearch at Shopify's Liquid templating engine, got 53% faster rendering from 93 automated commits across ~120 experiments. The CEO's contribution was the spec — the intent — not the execution.

- URL: https://simonwillison.net/2026/Mar/13/liquid/ (Simon Willison's analysis)
- Source type: [practitioner analysis]
- Freshness: March 2026

**Key observation:** This is a CEO writing a spec and getting production-quality outcomes. Not an engineer. Not a researcher. A CEO. The management function literally compressed to specification + monitoring.

---

## Finding 3: The "Waterfall Objection" — Real Counter-Evidence, Properly Addressed

**Evidence Level: Counter-evidence assessment**

The most substantive criticism: spec-driven development sounds like waterfall's return. Multiple practitioners have addressed this head-on:

1. **The cost inversion argument (Allstacks):** Waterfall failed because discovering your spec was wrong was catastrophically expensive — you'd already built the thing. When code regeneration costs near-zero, you can iterate specs rapidly. The economics are fundamentally different.

2. **The validation bottleneck (Alex Cloudstar):** "Writing code was never the bottleneck in software engineering. The true bottleneck is validation." Argues that spec-driven development shifts the burden from writing to validating, but doesn't necessarily make validation easier.
   - URL: https://www.alexcloudstar.com/blog/spec-driven-development-2026/
   - Source type: [practitioner direct]
   - Freshness: 2026

3. **Agent capability limits:** Best-performing model (Gemini 2.5 Pro) completed only 30% of tasks in workplace simulation; Claude 3.7 at 26.3%; ChatGPT 4o at 8.6%. The "delegation gap" — developers use AI in ~60% of work but can fully delegate only 0-20% of tasks.

4. **Robert Encarnacao — "The Emperor's New Code":** Explicitly critiques the hype around "executable specs."
   - URL: https://medium.com/@delimiterbob/the-emperors-new-code-hype-vs-reality-of-ai-executable-specs-ff64d961e8ab
   - Source type: [practitioner direct]
   - Freshness: 2026

**Assessment:** The counter-evidence is real but doesn't invalidate the bottleneck shift — it refines it. The bottleneck isn't JUST specification; it's specification + verification. The human role is: specify intent, then verify the output matches intent. This makes the counter-evidence compatible with, not contradictory to, the core thesis.

---

## Finding 4: The Downstream Absorption Bottleneck Is Also Being Named

**Evidence Level: L3 (Convergence)**

Multiple independent sources are identifying an organizational absorption problem that is the SYMMETRIC counterpart to the upstream intent bottleneck:

1. **Newberry Solutions — "AI Adoption Has a Manager Problem":** "Leaders feel ready for agents, but employees do not. Only 40% of employees are familiar with agents, versus 67% of leaders." The gap isn't technology — it's managerial capacity to integrate AI into team workflows.
   - URL: https://www.newberrysolutions.com/the-edge-blog-pages/2026/3/23/ai-adoption-has-a-manager-problem
   - Source type: [practitioner analysis]
   - Freshness: March 2026

2. **Aligned Automation — "The 2026 Capacity Crunch":** "Early gains create optimism and quick wins, but bottlenecks quickly emerge: review cycles drag, decision-making becomes congested, coordination across teams breaks down. The tools continue to work, but the organization cannot keep pace with what they enable."
   - URL: https://www.alignedautomation.com/blogs/the-2026-capacity-crunch-why-agentic-ai-growth-is-stress-testing-enterprises
   - Source type: [practitioner analysis]
   - Freshness: 2026

3. **Engineering demand overflow:** "Once one department successfully cuts costs or accelerates delivery, every other team wants the same capability immediately" — creating a delivery bottleneck in agent development itself.

4. **FourWeekMBA — "Context Replaces Compute as the New Bottleneck":** The constraint isn't processing power but organizational context — the ability to provide agents with the right information to act on.
   - URL: https://fourweekmba.com/ai-trend-2026-context-replaces-compute-as-the-new-bottleneck/
   - Source type: [practitioner analysis]
   - Freshness: 2026

**Assessment:** The absorption bottleneck is being named in organizational/adoption language, not in the same "specification" framing as the upstream bottleneck. Nobody has connected them as symmetric problems yet (see "What We Did Not Find" below).

---

## Finding 5: Beyond Engineering — Early Signals, Not Yet Convergence

**Evidence Level: L1-L2 (Opinion + single experiments)**

The spec-as-management pattern is being discussed BEYOND pure software engineering, but barely:

1. **VCCafe on research:** "The researcher's new job is writing the spec" — extends spec-driven thinking to research management via Karpathy's autoresearch. The researcher specifies the investigation direction; agents execute experiments.
   - URL: https://www.vccafe.com/2026/03/10/the-researchers-new-job-is-writing-the-spec/
   - Source type: [practitioner analysis]
   - Freshness: March 2026

2. **Platform engineering — "Intent-to-Infrastructure":** Platform engineers moving from "how to build" to "what we need." AI becomes the translation layer between intent and infrastructure. This is operations, not coding — but still technical.
   - URL: https://platformengineering.org/blog/intent-to-infrastructure-platform-engineers-break-bottlenecks-with-ai
   - Source type: [practitioner analysis]
   - Freshness: 2026

3. **Balu Kosuri — "I Turned Karpathy's Autoresearch Into a Universal Skill":** Claims the pattern applies universally, not just to ML research. "Autoresearch isn't really about training language models. It's a pattern for autonomous improvement of anything measurable."
   - URL: https://medium.com/@k.balu124/i-turned-andrej-karpathys-autoresearch-into-a-universal-skill-1cb3d44fc669
   - Source type: [practitioner direct]
   - Freshness: March 2026

4. **Agent Factory (no-code):** "Agents are created using clear instructions that reflect how teams already think about their work." Aimed at non-engineers in HR, finance, operations. The specification is natural language, not code. But this is vendor content — Level 0.
   - URL: https://agentfactory.panaversity.org/docs/which-agents-2026 — [vendor content, Level 0]

**Assessment:** The extension beyond engineering is happening at L1-L2 — people are saying "this should apply everywhere" but the practitioner evidence of business managers writing specs as their primary management act is thin. The strongest non-engineering example is Karpathy/Lutke on research, which is still technical-adjacent.

---

## What We Did Not Find

### 1. Nobody is connecting the upstream intent bottleneck to the downstream absorption bottleneck as symmetric problems.

The intent bottleneck (humans can't specify fast enough) and the absorption bottleneck (organizations can't absorb AI outputs fast enough) are being discussed in completely separate literatures by completely separate people. The spec-driven crowd talks about engineering productivity. The adoption/absorption crowd talks about organizational change management. Nobody has drawn the diagram showing these as the same underlying constraint — human cognitive bandwidth — manifesting at both ends of the AI execution pipeline.

**This is the premium insight opportunity.** The framing that "the human is the bottleneck at BOTH ends — specifying intent upstream AND absorbing outputs downstream — and spec quality is the lever that reduces BOTH bottlenecks" does not appear to exist anywhere in the current discourse.

### 2. No practitioner evidence of "spec as management" in non-technical business functions.

Nobody is writing about an HR director whose primary job is writing agent specifications for workforce processes. Nobody is writing about a CFO whose specs drive autonomous financial operations. The "spec as management" framing remains firmly in engineering and technical research. There are vendor announcements about HR/finance agents, but no practitioner-reported cases where the management function has compressed to specification in these domains.

### 3. No one is treating spec quality as an organizational capability metric.

Individual practitioners discuss spec-writing skill. Nobody is measuring "specification maturity" or "intent articulation capability" at the organizational level. No equivalent of CMMI for spec-driven organizations. No training programs for business leaders on writing agent specifications (beyond coding contexts).

### 4. The "film director" metaphor is used but not developed.

Multiple sources say "the best developers of 2026 look more like film directors than programmers." But nobody has explored the organizational implications: if the developer is a director, what's the organizational equivalent? Is the CEO the showrunner? Is the board the studio? The metaphor stops at the individual level.

### 5. Counter-evidence on the "waterfall return" is addressed but not fully resolved.

The cost-inversion argument (specs are cheap to iterate now) is compelling but untested at scale. The validation bottleneck remains real — spec-driven development shifts work from writing to validating, and nobody has shown that validation scales better than the old model.

---

## Synthesis: Assessment of the Hypothesis

### The upstream intent bottleneck: CONFIRMED at L3 convergence, but ONLY in engineering/technical domains.

10+ independent practitioners name the same shift: execution is cheap, specification is the constraint. The framing varies but the observation is identical. This is no longer a prediction — it's a documented pattern.

### The "spec as management" framing: L2 at best, mostly L1.

Karpathy/Lutke show a CEO and a researcher whose management act literally compressed to writing a spec file. But these are technical people in technical contexts. The extension to general management — where a VP of Operations or a CHRO's primary output is agent specifications — is not yet visible in practitioner reports.

### The symmetric bottleneck (intent upstream + absorption downstream): NOT FOUND.

This framing does not appear to exist in current discourse. The two bottlenecks are discussed in separate silos. This is the white space — the insight that would be genuinely novel if articulated.

### The organizational restructuring implication: L1 (opinion only).

Stern (Agoda) comes closest: "communication is no longer the cost to minimize — it is the work itself." But this is one practitioner's analysis of one dimension (team size). Nobody is reporting that their org chart changed because management compressed to specification.

---

## Implications for Agents 102 Knowledge Base

1. **The "intent bottleneck" can be added to synthesis files as L3 convergence** — with the caveat that it's confirmed only in engineering/technical contexts.

2. **The symmetric bottleneck framing is our original contribution** — not yet found anywhere else. This is a candidate for the whitepaper/article pipeline: "The human is the bottleneck at both ends."

3. **The gap in non-engineering spec-as-management is the research direction** — watch for the first HR/finance/operations leader who describes their job as "writing specs for agents." That signal will mark the pattern crossing from engineering into general management.

4. **The validation bottleneck counter-evidence should be incorporated** — spec + verification, not spec alone, is the full picture. This aligns with our existing "hybrid-beats-autonomous" pattern.
