Cycle 90 research: Two specific analytical framings from practitioner signals have zero external convergence:

1. **Little's Law applied to AI WIP:** AI increases generation rate (lambda), review capacity is fixed (mu), so WIP explodes. Overworked orgs do WORSE with AI. Not found in any published source. Agile/Kanban literature uses Little's Law but not in AI WIP context.

2. **Decision speed as real bottleneck (Goldratt TOC):** AI accelerates creation (cheap part of the process), leaves decision-making (the expensive constraint) unchanged. The AI productivity paradox is explained by Goldratt: fixing non-constraints doesn't improve throughput. Not found in any practitioner source in AI context. Andy Bromberg's Stanford TOC lecture applies it to LLM architecture (system prompts as constraints), not human decision speed.

**Gap:** Both framings are novel synthesis that unify existing concepts. The Little's Law framing is particularly clean because it makes a specific falsifiable prediction (orgs with low slack do worse with AI). The Goldratt framing is clean because it predicts exactly where the productivity paradox comes from. Neither is documented externally.

---

**Cycle 91 UPDATE:** Little's Law/WIP signal upgraded to Level 3 convergence — CircleCI 8M+ PR dataset + Ronacher + Bowley + Thoughtworks all confirm independently. Decision speed bottleneck (TOC framing) remains Level 1 — still no external convergence.

**Cycle 92 UPDATE:** Multi-domain opinion convergence emerging for decision speed bottleneck — Harrington (supply chain, "hierarchical approval structures"), Fryrear (marketing, TOC framing explicitly), EM360Tech (general) all name the mechanism independently. Three domains, Level 1 opinions, no deployment data. Moving toward Level 2 but not there. Next signal to watch: practitioner reporting "our approval cycle is the measured bottleneck after AI deployment."

**Cycle 93 UPDATE (April 9, 2026):** Opinion convergence expanded significantly. Now 7-8 independent voices across 5-6 domains:
- Duperrin (management/HR, April 7 2026): "If every AI suggestion triggers a series of validation meetings or manual reconciliations, it means the system is designed to slow down decision-making." [practitioner direct]
- Dr. Lisa Lang (TOC expert, Feb 2026): "In AI-enabled organizations the constraint is NOT 'attention' or 'humans' — it's 'critical systemic judgment'." [practitioner direct]
- Andriy Mandyev (developer, Feb 2026): "What's left is the hard part on repeat: decide, delegate, review. Decide, delegate, review." [practitioner direct]
- Andy Bromberg (LLM practitioner, Feb 2026): "The LLM is almost never the constraint." [practitioner direct]
- HBR April 2026: "Decision-Making by Consensus Doesn't Work in the AI Era" — 403 blocked, cannot classify. PRIORITY FETCH.
- Logilica/Huuck (Dec 2025): 77% of merge approvals remain human-controlled despite 67% AI coding adoption. [practitioner analysis with third-party data]

Still Level 1 overall. No practitioner has reported measured decision cycle times before/after AI deployment in a non-engineering domain. The measurement gap is real: engineering teams publish PR cycle time data; business teams (marketing, finance, operations) do not yet publish decision latency data.

**Closest to Level 2:** Faros AI (10K developers, July 2025) — PR review time +91%, merge time 1.2 → 3.5 days post-AI. But this is engineering merge approval (technical), not business decision cycle (strategic). Already captured in absorption-bottleneck.md at L3/4.

**Counter-evidence searched:** No credible independent evidence that AI speeds up strategic business decisions. All speed-up claims are vendor-sourced (Level 0) or cover routine approval automation, not strategic judgment.

**Next signal needed:** Any practitioner in marketing, finance, operations, or supply chain reporting measured decision latency before/after AI deployment. The HBR April 2026 article (https://hbr.org/2026/04/decision-making-by-consensus-doesnt-work-in-the-ai-era) may contain this — blocked in April 9 research session.
