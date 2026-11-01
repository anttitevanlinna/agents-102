# Concrete-sentence removal: a watch metric, not a rule (2026-11-01)

The question: does the v3 judge's lean toward shorter text eat examples and numbers? `mkconcrete.py` builds 24 pairs from Agents 101 module slides. In each, one concrete sentence is deleted: one holding a digit, inline code, a file path or a quoted example. "Module N" does not count, and neither do links or "Start a fresh session" lines. No LLM chooses the sentence. `../../check-judge.sh` runs this set next to the AE101 anchor.

The damaged-module check had scored this kind of damage at 88%. That number was inflated: the LLM-picked "concrete" sentences included aphorisms, and the cut pairs were mixed in among obvious put-down damage. On the clean set:

| rules | runs | concrete removal (original picked) | history holdout | AE101 anchor |
|---|---|---|---|---|
| v3 (on main) | 2 | 54%, 46% | 87% | 99–100% |
| + "the most concrete sentence stays" | 2 | 67%, 58% | not run | 97–100% |
| + "say it once at its most concrete; the last concrete instance stays" | 2 | 50%, 52% | 86% | 100% |

Antti's own history argues against a blunt rule. In the 150 history pairs, 17 cuts removed a sentence this detector calls concrete, and Antti chose the shorter side in 13 of them: the cardiologist example, the plan filename, the migration-errors example, a Dex Horthy quote. A "concrete stays" rule would buy about 12 points here and cost agreement with his calls. The narrow wording ("keep the last concrete instance") moves nothing.

Decision: no rule; `taste-rules.md` stays v3. The open question is the label. Antti has not said whether deleting these sentences is damage. Eight of these pairs are sent to the calls page as judge-unsure cards; his answers decide whether this becomes an alert. Until then `check-judge.sh` reports it as a watch, alerting only below 40%. The AE101 anchor keeps its 90% alert.
