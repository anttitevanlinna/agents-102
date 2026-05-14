# Agent C — Stance Probe: Will Larson & Birgitta Böckeler

**Date:** 2026-05-13
**Hypothesis tested:** Practitioners who got agentic coding working share five stance-axes (scientist disposition, writing-down IS the work, ship-cheaper-than-argue, taste as the irreducible asset, reagents-not-opex cost frame).
**Freshness window:** Nov 2025 – May 2026.
**Probe design:**
- Larson = **independent-validator probe** (he externally confirmed Klaassen's compound engineering — does his own practice show the stance?).
- Böckeler = **adversarial-collaborator probe** (Thoughtworks consultancy practitioner — does the stance survive outside the SF product-company cluster?).

---

## Practitioner 1: Will Larson (CTO Imprint; lethain.com)

### Sources (all within freshness window)

1. **Coding at work (after a decade away)** — Nov 19, 2025 — https://lethain.com/coding-at-work/ — [practitioner direct]
2. **Facilitating AI adoption at Imprint** — Dec 7, 2025 — https://lethain.com/company-ai-adoption/ — [practitioner direct]
3. **Building an internal agent: Adding support for Agent Skills** — Dec 26, 2025 — https://lethain.com/agents-skills/ — [practitioner direct]
4. **Building an internal agent: Evals to validate workflows** — Dec 31, 2025 — https://lethain.com/agents-evals/ — [practitioner direct]
5. **Learning from Every's Compound Engineering** — Jan 19, 2026 — https://lethain.com/everyinc-compound-engineering/ — [practitioner direct] (this is the Klaassen-validation post)
6. **Judgment and creativity are all you need** — Mar 11, 2026 — https://lethain.com/judgment-is-all-you-need/ — [practitioner direct]
7. **Agents as scaffolding for recurring tasks** — Apr 12, 2026 — https://lethain.com/agents-as-scaffolding/ — [practitioner direct]

### Per-axis verdict

**Axis 1 — Scientist-not-engineer disposition (codebase as lab; publishes failures; reverses publicly on evidence)** — **HELD (partial)**
- Reverses publicly: in agents-skills he documents the U-turn: *"I was initially a bit skeptical of the problem they solved–can we just use prompts and tools? … For something that I was initially deeply skeptical about, I now wish I had implemented skills much earlier."* — https://lethain.com/agents-skills/ [practitioner direct]
- Strategy-testing language: at Imprint he uses *"strategy testing: identify a few goals, pick an initial approach, and then iterate rapidly"* — https://lethain.com/company-ai-adoption/ [practitioner direct]
- Honest limitation reports: on evals *"they are an essential mechanism for us to evaluate our workflows, but we've found them difficult to consistently operationalize"* — https://lethain.com/agents-evals/ [practitioner direct]
- BUT: does not publish failures externally for scholarship. Transcript-sharing infra is **internal-only** behind SSO — https://lethain.com/sharing-claude-transcripts/ [practitioner direct]. Year-in-review is forward/achievement-focused, not introspective on misses — https://lethain.com/2025-in-review/.

**Axis 2 — Writing-down IS the work (CLAUDE.md / skills / playbooks as primary artefact)** — **HELD**
- *"writing code that fits the existing codebase's patterns and structure, particularly with a well-written `AGENTS.md`'s guidance"* — https://lethain.com/coding-at-work/ [practitioner direct]
- Centralized prompt database in Notion as core infrastructure; the design point is *"anyone on our Helpdesk team can improve the prompt … not just one person"* — https://lethain.com/company-ai-adoption/ [practitioner direct]
- Whole 9-post "Building internal agents" series treats skill files, prompts, eval pipelines as the deliverable — https://lethain.com/agents-series/

**Axis 3 — Ship cheaper than argue (more experiments than meetings; suspicious of strategy debate)** — **HELD**
- *"If they aren't adopting tooling, we predominantly focus on making it easier rather than spending time being skeptical."* — https://lethain.com/company-ai-adoption/ [practitioner direct]
- Built *"a handful of bounded projects" (2–10 hours each)* to develop intuition before organisational rollout — same source. Action-first sequence.
- *"This has worked well for pretty much every problem I've encountered. The end-result is faster, cheaper, and more maintainable."* — https://lethain.com/agents-as-scaffolding/ [practitioner direct]

**Axis 4 — Taste as the irreducible asset (effort goes into brief/verifier/rule, not implementation)** — **HELD (strongly)**
- *"Productivity today is most constrained on judgment"* — https://lethain.com/judgment-is-all-you-need/ [practitioner direct]
- *"The last constraint ahead of us is creativity."* — same. Frames implementation labour as solved; judgment + creativity are what's left.
- Proposes "datapacks" and expert-context-rich skills as mechanisms for **scaling judgment** across teams — same source.

**Axis 5 — Reagents-not-opex cost frame (token spend as research budget)** — **HELD (weak/implicit)**
- *"you can learn for a few dollars of tokens and a couple dozen hours"* — https://lethain.com/coding-at-work/ [practitioner direct]. Casual cost-as-learning-investment framing; doesn't formalise it as a research budget, but does not treat token spend as opex-to-be-minimised either.

### Beyond the five (Larson)

- **Code-driven-over-LLM-driven for recurring workflows.** *"I suspect that I'll have to move more complex workflows away from LLM-driven workflows to get them to work more consistently."* — https://lethain.com/agents-evals/. He uses agents for ambiguous probes and refactors them into deterministic code once the path stabilises — https://lethain.com/agents-as-scaffolding/. This is a sixth axis the five don't name: **scaffolding-then-graduation**.
- **Agentic passive voice** — a writing/attribution norm: *"whenever the actor in a sentence is a model, then it's a passive sentence … please, aspire higher. Write in the active voice."* — https://lethain.com/agentic-passive-voice/. Adjacent to writing-down-IS-the-work, but its own discipline: keep the human as the actor in the prose.

### Contradictions (Larson)

- Axis 1 weakened: he does NOT share Claude transcripts publicly. Transcript repo is *"behind Cloudflare authentication into our SSO"* — https://lethain.com/sharing-claude-transcripts/. Internal scientist, not Klaassen-style public publisher of session traces.

---

## Practitioner 2: Birgitta Böckeler (Thoughtworks; martinfowler.com)

### Sources (all within freshness window)

1. **Context Engineering for Coding Agents** — Feb 5, 2026 — https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html — [practitioner direct] (author byline confirmed)
2. **Harness engineering for coding agent users** — Apr 2, 2026 — https://martinfowler.com/articles/harness-engineering.html — [practitioner direct]
3. **State of Play: AI Coding Assistants (QCon London, April 2026)** — Apr 8, 2026 — https://www.infoq.com/presentations/ai-coding-assistants/ — [practitioner direct] (her own talk, recorded)
4. **State of Play talk — Agile meets Architecture (video)** — Apr 2026 — https://www.youtube.com/watch?v=qB7rsbDfmQg — [practitioner direct]
5. **Harness engineering beyond skills (video with Chris Ford)** — Apr 2026 — https://www.youtube.com/watch?v=uLWOLmeHOSE — [practitioner direct]
6. **Publications index** — https://birgitta.info/ — [practitioner direct]

### Per-axis verdict

**Axis 1 — Scientist-not-engineer disposition** — **HELD (partial)**
- Probabilistic frame: *"we can never be certain of anything … thinking in probabilities is necessary"* — https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html [practitioner direct]
- Open failure-discussion: at QCon she shows real-world agent missteps: *"I still see models do stupid things all the time"* with concrete Reddit examples — https://www.infoq.com/presentations/ai-coding-assistants/ [practitioner direct]
- Does NOT publish reversals on prior positions in the corpus seen — more synthesis-of-the-field than personal U-turns. INSUFFICIENT-SIGNAL on public reversal.

**Axis 2 — Writing-down IS the work** — **HELD (strongly)**
- The harness-engineering frame is itself about writing-down-as-infrastructure: *"Skills that describe coding conventions," "AGENTS.md," "Skills with instructions and bootstrap scripts," "How-to guides from codebase archaeology"* — https://martinfowler.com/articles/harness-engineering.html [practitioner direct]
- *"Agent = Model + Harness"* — same. The harness IS the writing-down. She elevated it to a discipline-term.
- *"Context engineering is curating what the model sees so that you get a better result"* — https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html [practitioner direct]

**Axis 3 — Ship cheaper than argue** — **NOT-HELD / CONTRADICTED**
- Consultancy register surfaces here: she advocates *"build context gradually, and not pump too much stuff in there right from the start"* — careful, not shipping-velocity-first.
- *"A good harness should not necessarily aim to fully eliminate human input, but to direct it to where our input is most important."* — https://martinfowler.com/articles/harness-engineering.html [practitioner direct]. Direction-of-input, not minimise-debate.
- At QCon: *"the honeymoon is definitely also over"* — https://www.infoq.com/presentations/ai-coding-assistants/. Tone is "slow down, sense the risks," not "ship cheaper than argue."
- **This is the adversarial-collaborator finding:** the stance does not transfer cleanly to a consultancy practitioner; Böckeler's incentive is to advise carefully across many clients, not to ship at her own org.

**Axis 4 — Taste as the irreducible asset** — **HELD**
- *"A coding agent has none of this: no social accountability, no aesthetic disgust at a 300-line function, no intuition that 'we don't do it that way here.'"* — https://martinfowler.com/articles/harness-engineering.html [practitioner direct]
- *"intuition you have to build up over time using these tools"* — https://www.infoq.com/presentations/ai-coding-assistants/ [practitioner direct]. Taste/judgment as the human's load-bearing role.

**Axis 5 — Reagents-not-opex cost frame** — **CONTRADICTED**
- Token spend framed AS opex, not as reagents: *"$20 flat rates"* to *"$200 flat rates"* with request-limiting; extensive AI use *"now rivals developer salaries ($91,200+ annually)"* — https://www.infoq.com/presentations/ai-coding-assistants/ [practitioner direct]
- She is **explicitly raising the cost-line alarm**, not reframing token spend as a research budget. Direct contradiction of axis 5.

### Beyond the five (Böckeler)

- **Sensors as harness component** (computational sensors — static analysis, tests, linters wired into the agent loop). Extends "writing-down IS the work" with a deterministic-verification layer the five axes don't name. — https://martinfowler.com/articles/harness-engineering.html and the Chris Ford video.
- **"Does AI lead us back to … waterfall?"** panel framing — https://www.youtube.com/watch?v=iW-4faoku8A — surfaces a process-regression concern absent from the SF cluster.
- **Risk + culture talk axis** — CaSE podcast covers *"Agent Harness, State of Play, Risk and AI Company Culture"*. The cluster the five axes capture talks little about org-culture risk; Böckeler treats it as first-class.

### Contradictions (Böckeler)

- **Axis 3 NOT-HELD.** Caution-and-curate, not ship-cheaper-than-argue.
- **Axis 5 CONTRADICTED.** Tokens framed as cost-line under inflation pressure, not as reagent budget.

---

## Synthesis (148 words)

The five stance-axes split cleanly along the **product-practitioner vs consultancy-practitioner** axis. Larson (CTO at Imprint, building one codebase, validating Klaassen externally) holds four of five strongly — judgment-as-asset, writing-down (AGENTS.md, prompt DB, skill files), strategy-testing-over-debate, reverses-on-evidence — and weakly holds the reagent cost frame. He extends the cluster with a sixth axis the five miss: **scaffolding-then-graduation** (LLM workflows refactored to code once stable). He weakens axis 1 by keeping transcripts internal-only, not publicly published. Böckeler (Thoughtworks, advising many clients) holds writing-down and taste-as-asset strongly — coined "harness engineering" as a name for the writing-down discipline — but **contradicts ship-cheaper-than-argue and reagent-cost framing**. She raises the cost-line alarm; she counsels gradualism. The adversarial-collaborator probe finds: the *artefact* stance survives consultancy context; the *velocity + cost-frame* stance does not. The five-axis cluster is real but **structurally product-company-shaped**.
