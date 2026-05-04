# Actor — Agents 101 M5 scorer

Status: done

Scoreboard: module-5/scoreboard.md

Winner: Entailment + Counter-Evidence (two-method ensemble; single winner: Entailment)

Judge: judges/groundedness-judge.md

Still-uncertain: module-5/still-uncertain.md

Substitutions: take-home prompt-007 truncated

---

## Summary

Benchmark scored 9 claims against four detectors (source-triangulation, entailment, citation-integrity, counter-evidence) plus a fifth emerged from Phase 1 (self-consistency). Adjudication classified claims as GROUNDED (4), PARTLY GROUNDED (1), or UNGROUNDED (4).

**Entailment** and **Counter-Evidence** both achieved 100% precision and 100% recall. **Entailment** is the primary victor for its ability to detect rhetorical overreach at the statement level — the core quality concern for an executive briefing. **Counter-Evidence** partners as ensemble co-winner by actively searching for disconfirming material, catching quantified fabrications.

**Top problem detected:** The briefing layers four externally-sourced assertions (DevEx 3-5x adoption rate, Jukka's 18% metric, Stripe/Figma competitor patterns, artefact persistence research) without grounding them in the Kaleva evidence roster. These appear as organizational facts when they are external benchmarks or unsourced claims.

Judge written; all outputs on disk.
