# Practitioner Signals — March 2026

*Tracking what key practitioners are saying and doing. Research date: March 23, 2026.*

---

## Andrej Karpathy: From Coding Agents to Autonomous Research Agents

**Major shift detected.** Karpathy released **Autoresearch** (March 6, 2026) — a system enabling AI agents to autonomously conduct LLM training research overnight. Agents modify training code, run 5-minute experiments, evaluate results, and iterate automatically while humans sleep.

- Source: https://github.com/karpathy/autoresearch [practitioner direct]
- Evidence: 50.4K stars, 7K forks, 34 commits. Community forks for MacOS, Windows, AMD platforms.

**Karpathy's framing:** "Research is now entirely the domain of autonomous swarms of AI agents running across compute cluster megastructures." Researchers program high-level instructions via a `program.md` file rather than manually editing training code.

**Position shift:** In December 2025, Karpathy said "coding agents work, everything else is slop." By March 2026, he's building autonomous research agents — extending the frontier beyond coding into scientific experimentation. This is a significant trajectory change.

**Relevance to our research:** Still in the coding/ML domain (not business processes), but the pattern matters: agents that run overnight, iterate autonomously, and present results in the morning. This pattern will migrate to business processes (audit overnight, report in morning; reconcile overnight, flag exceptions in morning).

**Evidence level:** Level 2 (single experiment, but from a highly credible practitioner).
**Finding category:** Context (technical infrastructure, not business process).

---

## Ethan Mollick: "AI Has Moved from Co-Intelligence to Managing Agents"

**Publication:** March 12, 2026 (oneusefulthing.org)

Key claims:
- AI has transitioned from "co-intelligence" (humans prompting AI) to an era of **managing AI agents** that handle "hours of human work" in minutes
- AI agents score 94% on Google-Proof Q&A benchmarks (vs. 34% for humans outside their field)
- Achieving 82% parity with top-performing humans on complex tasks (GDPval benchmark)
- Highlights StrongDM's "Software Factory" — three engineers, rules: "Code must not be written by humans" and "Code must not be reviewed by humans," spending ~$1,000/day on AI tokens

**Critical nuance:** Despite benchmarks, Mollick notes "companies are still very early in adopting AI" and "remarkably little has changed in most organizations."

- Source: [SOURCE NEEDED — blog post referenced but specific URL not captured]
- Source type: [practitioner direct]

**Relevance:** Mollick's "remarkably little has changed" observation aligns with our Nordic finding of low adoption (19% weekly GenAI use). The gap between benchmark capability and organizational adoption IS the story — and the training opportunity.

**Evidence level:** Level 1 (opinion from highly credible practitioner).
**Finding category:** Context.

---

## Simon Willison: Practical Agent Use + Security Warnings

**March 2026 activity:** Prolific as always. Key relevant signals:

### Coding Agents for Non-Developers
Willison demonstrated Claude Code and OpenAI Codex for data journalism — data exploration, cleaning, visualization, web scraping. Cost: $23 in API tokens for a full workshop.

**Key quote:** "Material aimed at data journalists is equally applicable to anyone else with data to explore."

- Source: https://simonwillison.net/2026/Mar/22/starlette/ [practitioner direct]
- Source: https://simonwillison.net (March 2026 posts) [practitioner direct]

**Relevance:** Willison is demonstrating agents in the hands of non-engineers (journalists) — exactly the use case our training targets. The $23 cost point makes this accessible.

### Agent Security: The "Lethal Trifecta"
Willison identifies three properties that, when combined, create exploitable agent vulnerabilities:
1. Access to private data
2. Exposure to untrusted content (injection vector)
3. Ability to externally communicate (exfiltration path)

- Source: Referenced from June 2025 posts (stale by freshness rule, but the framework remains current)

**Relevance:** Directly relevant to Module 4 (Security) in our curriculum. The "lethal trifecta" is a memorable, teachable framework.

### Autoresearch Pattern
Willison covered Karpathy's autoresearch and a community extension (Dan Woods running 90 experiments via Claude Code to optimize local LLM inference). Willison expressed skepticism about quality validation — noting claims were "insufficiently documented."

- Source: https://simonwillison.net/2026/Mar/18/ [practitioner direct]

**Position update:** Willison remains the most rigorous independent technical analyst. His March 2026 stance: agents work well for structured tasks (data journalism, coding), but quality validation of autonomous agent output remains a real problem. This is a continuity, not a shift.

---

## Swyx (Shawn Wang): "Context Engineering" as the New Paradigm

**Key signal:** Swyx promoted the concept of "context engineering" — coined by @dexhorthy — as the central challenge in agent development. "Everything that makes agents good is context engineering."

- Source: https://x.com/swyx/status/1940877277476409563 [practitioner direct]
- Source: https://qconlondon.com/presentation/mar2026/context-engineering-building-knowledge-engine-ai-agents-need [conference talk — QCon London 2026]

**The concept:** Context engineering = the practice of reliably supplying LLMs with necessary external information. Moving from optimizing individual components to reasoning over billions of tokens in production. This is the enterprise challenge — not the model, but what you feed the model.

**Relevance:** This maps to our training's emphasis on organizational context. When we say "the organization's own people know their requirements, systems, and constraints" — that IS context engineering. The term gives a technical name to what we've been describing as the consulting pattern.

**Evidence level:** Level 1 (practitioner opinion, but emerging terminology with conference traction).
**Finding category:** Context (conceptual framework, not deployment).

---

## Harrison Chase / LangChain: No Significant Shift Detected

No major public statements or trajectory changes found for Harrison Chase in March 2026. LangGraph continues as the primary agent orchestration framework.

[SOURCE NEEDED — no specific March 2026 output found]

---

## Nordic Practitioners: Gap Remains

**We still have zero named Nordic practitioners on our source roster.** This remains the biggest gap in our research coverage.

### Partial signals found:
- **Kalle Pirhonen (Finland)** — AI producer at Ilta-Sanomat (Finland's biggest news media), started April 2025. Focus on automating news gathering processes. Selected for AI Journalism Lab: Builders cohort (Jan 2026).
  - Source: https://www.journalism.cuny.edu/2026/01/meet-the-24-practitioners-selected-for-the-ai-journalism-lab-builders-cohort-in-partnership-with-nordic-ai/ [domain trade publication]

- **AI & Business Strategies 2026 (Helsinki)** — cross-industry event targeting business leaders. Could be a source for Nordic practitioner contacts.
  - Source: https://www.ainordic.com/ [event listing]

- **Mikko Alasaarela / Agentics Helsinki:** No new public output found in March 2026.
  - [SOURCE NEEDED]

**Assessment:** The Nordic practitioner gap is structural — Nordic builders publish less publicly than US/UK counterparts. Antti's direct network (Agentics Helsinki, F-Secure contacts) remains the primary channel for Nordic practitioner signals.

---

## Enterprise Agent Failures: New Data Points

Research on agent failures in enterprise (March 2026):

- **EY survey:** 64% of companies with annual turnover above $1 billion have lost more than $1 million to AI failures. 80% of organizations report risky agent behaviors (unauthorized system access, improper data exposure).
  - Source: [SOURCE NEEDED — referenced in search synthesis]

- **Compounding error rate:** An agent achieving 85% accuracy per action results in only ~20% success rate on a 10-step workflow. This is a mathematical constraint, not a quality issue.
  - Source: https://composio.dev/blog/why-ai-agent-pilots-fail-2026-integration-roadmap [practitioner analysis]

- **Three leading failure causes:** Dumb RAG (bad memory management), Brittle Connectors (broken I/O), Polling Tax (no event-driven architecture). Integration issues, not LLM failures.
  - Source: https://composio.dev/blog/why-ai-agent-pilots-fail-2026-integration-roadmap [practitioner analysis]

- **Prediction:** By late 2026, a large percentage of agentic initiatives will be quietly shut down — not because models failed, but because enterprises failed to govern execution.
  - Source: https://www.helpnetsecurity.com/2026/03/03/enterprise-ai-agent-security-2026/ [domain trade publication]

**Evidence level:** Level 2-3 (multiple independent sources reporting the same pattern — agent pilots fail on integration and governance, not on model capability).

**Relevance:** This directly supports our convergence finding #2 (governance as prerequisite) and the training's emphasis on governance over technology. The 85% × 10 steps = 20% success framing is a powerful teaching tool for Module 6 (Evals).

---

## Source Roster Updates

| Person | Previous Position | March 2026 Position | Shift |
|--------|------------------|---------------------|-------|
| Karpathy | "Coding agents work, everything else is slop" (Dec 2025) | Building autonomous research agents (autoresearch). Expanding beyond coding. | Significant ↑ |
| Mollick | — | "Co-intelligence → managing agents." Organizations still very early. | Stable, cautiously bullish |
| Willison | Rigorous skeptic, agent security focus | Demonstrating agents for non-developers. Quality validation remains concern. | Stable |
| Swyx | AI Engineer community builder | "Context engineering" as the paradigm. | Conceptual contribution |
| Chase | LangGraph orchestration | No significant shift detected | — |

### New additions to watch:
- **Kalle Pirhonen** (Finland) — AI producer at Ilta-Sanomat. First named Nordic practitioner candidate.
- **Dan Woods** — autoresearch experiments with Claude Code (via Willison's coverage).

---

## What We Did Not Find

1. **No Nordic practitioners writing publicly about agent deployment in business processes.** The gap from February persists.
2. **No Mikko Alasaarela / Agentics Helsinki public output** in March 2026.
3. **No Harrison Chase trajectory change** — LangChain/LangGraph appears in maintenance mode rather than frontier-pushing.
4. **No practitioner writing about agents in HR, compliance, or finance** from a first-person deployment perspective. The practitioner signal remains concentrated in coding and customer service.
