# OODA stance-axis test — Hashimoto & Ball — 2026-05-13

**Hypothesis tested:** 5 stance-axes shared by practitioners who got agentic coding working:
1. Scientist-not-engineer disposition
2. Writing-down IS the work
3. Ship cheaper than argue
4. Taste as the irreducible asset
5. Reagents-not-opex cost frame

**Freshness window:** Nov 2025 – May 2026 inclusive. Older pieces marked as historical context only.

---

## Mitchell Hashimoto

**Sources (byline-checked):**

- https://mitchellh.com/writing/my-ai-adoption-journey — **[practitioner direct]** — own blog, Feb 5 2026. Hashimoto's account of going from skeptic to running agents 10–20% of his working day; introduces "harness engineering."
- https://mitchellh.com/writing/building-block-economy — **[practitioner direct]** — own blog, Apr 7 2026. Reframes AI's strength as gluing well-documented components.
- https://mitchellh.com/writing/ghostty-leaving-github — **[practitioner direct]** — own blog, Apr 28 2026. Infrastructure complaint; light on agent stance (mainly GitHub reliability).
- https://simonwillison.net/2026/May/12/mitchell-hashimoto/ — **[practitioner analysis]** — Simon Willison quoting Hashimoto, May 12 2026. Attribution: Willison on Hashimoto, *A quote from Mitchell Hashimoto*. The quoted line is about TDMs/risk-aversion, not directly the five axes.
- https://mitchellh.com/writing/non-trivial-vibing — **[practitioner direct]** — own blog, Oct 11 2025. **Outside freshness window — historical context only** (just barely older than 6 months from 2026-05-13).

**Out-of-window but relevant for byline calibration:** https://zed.dev/blog/agentic-engineering-with-mitchell-hashimoto (June 2025, Zed-published writeup of a Mitchell+Feldman conversation — would be **[practitioner analysis]** if cited, attributed "Zed on Hashimoto").

**Per-axis verdict:**

- **Axis 1 (scientist disposition): HELD.** "anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again" — harness engineering as a reproducible feedback loop, *My AI Adoption Journey*, Feb 5 2026 ([URL](https://mitchellh.com/writing/my-ai-adoption-journey), [practitioner direct]). He also "forced myself to reproduce all my manual commits with agentic ones" — controlled A/B against his own baseline. Same piece. Publishes his own adoption arc from skeptic to convert; treats it as data, not a manifesto.

- **Axis 2 (writing-down IS the work): HELD.** Harness engineering is the writing-down: `AGENTS.md` and tooling that the agent invokes to self-check. "anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again" — *My AI Adoption Journey*, Feb 5 2026 ([URL](https://mitchellh.com/writing/my-ai-adoption-journey), [practitioner direct]). The artefact (harness + AGENTS.md) is the durable output of each failure.

- **Axis 3 (ship cheaper than argue): HELD, with nuance.** *Non-Trivial Vibing* (Oct 2025, historical) frames cost as trivial vs. throughput: "The work took a total of 16 separate sessions totalling $15.98 in token spend… I spent more than that in coffee shops in the two calendar days" ([URL](https://mitchellh.com/writing/non-trivial-vibing), [practitioner direct]). And summarised secondhand: Mitchell frames AI's value as "expanded capacity to experiment, with proof of concepts that took a week now doable in a day" (TeamDay.ai writeup of Mitchell's talks — **[practitioner analysis]**, lower trust). The in-window evidence is thinner than the out-of-window evidence; INSUFFICIENT-SIGNAL on this axis from in-window sources alone, HELD when historical context is admitted.

- **Axis 4 (taste as irreducible): HELD.** "Please don't ever ship AI-written code without a thorough manual review" — *Non-Trivial Vibing*, Oct 2025 (historical, [URL](https://mitchellh.com/writing/non-trivial-vibing), [practitioner direct]). For Ghostty he reviews every line; for throwaway projects he ships unread. The discriminator is taste, applied per-codebase, not a uniform rule. *Building Block Economy* (Apr 7 2026, in-window): "AI is okay at building everything from scratch, but it is _really good_ at gluing together high quality, well documented, and proven components" ([URL](https://mitchellh.com/writing/building-block-economy), [practitioner direct]) — the human's job is choosing the components, i.e. taste.

- **Axis 5 (reagents-not-opex cost frame): INSUFFICIENT-SIGNAL in-window.** Strongest evidence is the Oct 2025 "$15.98 in token spend… more than that in coffee shops" framing (historical). No in-window piece (Nov 2025–May 2026) restates the reagents-not-opex frame in his own byline. He behaves as if it's true (runs agents 10–20% of his working day, multiple sessions per change) but doesn't write the frame down again in-window.

**Beyond the five:** **Codebase scope is a stance-input.** Hashimoto explicitly varies his discipline by project: Ghostty (long-lived) gets line-by-line review; wedding site (2-month lifespan) gets zero review. This is missing from the five-axis hypothesis — it suggests a sixth axis: *codebase-lifetime-driven review discipline.*

**Contradictions:** None visible. The Oct 2025 "thorough manual review" line could read as anti-shipping, but in context it's specifically scoped to long-lived codebases — consistent with Axis 4 (taste-as-lever), not against Axis 3.

---

## Thorsten Ball

**Sources (byline-checked):**

- https://registerspill.thorstenball.com/p/joy-and-curiosity-76 — **[practitioner direct]** — own newsletter, Mar 1 2026. Headlined "747s and coding agents" — direct argument about when to use agents vs. when to write code by hand.
- https://registerspill.thorstenball.com/p/joy-and-curiosity-73 — **[practitioner direct]** — own newsletter, Feb 8 2026. Aesthetic-vs-agent-readability concession.
- https://ampcode.com/how-to-build-an-agent — **[practitioner direct]** — Ball's byline, Apr 15 2025. **Outside freshness window — historical context only.** The "emperor has no clothes" piece showing an agent is "an LLM, a loop, and enough tokens."
- https://registerspill.thorstenball.com/p/a-new-kind-of-code — **[practitioner direct]** — own newsletter, Sep 21 2025. **Outside freshness window — historical context only.**
- https://registerspill.thorstenball.com/p/they-all-use-it — **[practitioner direct]** — own newsletter, Nov 20 2024. **Outside freshness window — historical context only.**

**Per-axis verdict:**

- **Axis 1 (scientist disposition): HELD.** "This week I found myself writing code by hand again. Not a lot, maybe ten, twenty lines in total… Writing code by hand is one way (!) to answer these questions, because you truly bump into what you don't know" — *Joy & Curiosity #76*, Mar 1 2026 ([URL](https://registerspill.thorstenball.com/p/joy-and-curiosity-76), [practitioner direct]). He reverses publicly on his own UUID aesthetic in #73: "I had an aesthetic objection to something I'll barely see… one hundred percent are we optimizing code for readability over writability, except that now the reader is also an agent" — *Joy & Curiosity #73*, Feb 8 2026 ([URL](https://registerspill.thorstenball.com/p/joy-and-curiosity-73), [practitioner direct]). And: "I'm sure I'll look back at this post very quickly and laugh at my naivete" — same piece. Public-reversal-on-evidence is the scientist tell.

- **Axis 2 (writing-down IS the work): PARTIAL / HELD.** Ball *operates* AGENTS.md heavily (Amp uses AGENTS.md as the rule surface, and Ball is the principal voice at Amp). In-window byline-direct evidence of him *theorising* writing-down is thinner: J&C #76 talks about writing *code* by hand, not rules by hand. The strongest writing-down argument is the (historical) *How to Build an Agent* (Apr 2025): "I need you to *feel* how little code it is and I want you to see this with your own eyes in your own terminal" ([URL](https://ampcode.com/how-to-build-an-agent), [practitioner direct]) — the imperative is to write/type the system yourself. HELD if Amp's AGENTS.md surface counts as evidence-by-product; PARTIAL if only first-person byline argument counts.

- **Axis 3 (ship cheaper than argue): HELD.** "If you're not building something _new_ or if you don't even need to learn how the software works… let the agent rip" — *Joy & Curiosity #76*, Mar 1 2026 ([URL](https://registerspill.thorstenball.com/p/joy-and-curiosity-76), [practitioner direct]). "we added more and more people and kept this way of working and now I'm pretty certain that it's because of AI that we work this way" — same piece. Amp's internal culture is shipping-first via agents.

- **Axis 4 (taste as irreducible): HELD.** *Non-trivial-vibing* parallel: Ball's J&C #76 explicitly carves out the *learning* / *new* domain as the human-judgement zone — "if you need _learn_, so you can make better engineering tradeoffs and product decisions, it seems to me that one of the most practical ways… is to get your hands dirty" ([URL](https://registerspill.thorstenball.com/p/joy-and-curiosity-76), [practitioner direct]). The agent handles the well-trodden; the human's irreducible asset is the tradeoff/decision/taste. Historical (Sep 2025, out-of-window) reinforces with *A New Kind of Code*: "An agent doesn't have to be able to write code like a human to be useful… If code up until this year has been bolts and screws, with agents… we now have glue" ([URL](https://registerspill.thorstenball.com/p/a-new-kind-of-code), [practitioner direct]) — value moves from production to selection.

- **Axis 5 (reagents-not-opex cost frame): INSUFFICIENT-SIGNAL.** No in-window Ball byline I retrieved explicitly frames tokens as research budget vs. operational cost. He works at Amp (where cost framing would be commercial, so likely *avoided*), and his Register Spill pieces stay in the craft/learning register rather than the cost register. Not contradicted; just not asserted.

**Beyond the five:** **Learning preservation as design constraint.** Ball's distinctive contribution in J&C #76 is that *agents make you faster but can rob you of the learning loop*: "An agent is happy to pick an answer for you — without telling you. It will just write the code." His axis is *protect the learning surface where building something new* — narrower and more pedagogical than Axis 1's scientist disposition. Worth a sixth axis: *preserve the human learning gradient where it matters.*

**Contradictions:** None against the five. Ball's "747s" framing is *cautionary* about agent overuse, but the caution targets unreflective use, not the convergence stance itself.

---

## Summary (<150 words)

**Stance-convergence verdict: STRONG, with one consistent in-window gap.**

Both Hashimoto and Ball clearly hold Axes 1 (scientist), 3 (ship-over-argue), and 4 (taste). Axis 2 (writing-down) is strongly held by Hashimoto via "harness engineering" and held by Ball via Amp's AGENTS.md surface plus his "type it yourself" imperative — though Ball's in-window byline evidence is thinner than Hashimoto's. Axis 5 (reagents-not-opex cost frame) is the weak axis for both: Hashimoto asserted it in Oct 2025 (out-of-window) and now lives it without re-stating; Ball never asserts it byline-direct in-window. **Recommendation:** keep Axes 1–4 as the convergence backbone; Axis 5 needs either a tighter operationalisation or a different practitioner pair to confirm. Two beyond-the-five candidates surfaced: *codebase-lifetime-driven review discipline* (Hashimoto) and *preserve the learning surface where new* (Ball).
