---
key: hallucination-bakeoff-3
dest: Claude Code
runtime: any
origin: exercises/hallucination-bakeoff
---
Run four detectors on `module-5/claim-pool.md` in parallel. Each detector is a subagent with a different method. Each reads `module-5/claim-pool.md`, `module-5/briefing.md`, `module-5/evidence-roster.md`, and the rostered evidence files named there. Each writes its findings as a list of claim-pool claims flagged, with one line of reasoning per claim.

Detector 1 — Source triangulation. For every claim in the claim pool, check whether that claim appears in at least one file on disk. If no file supports it, flag it UNGROUNDED. Write to `module-5/detectors/source-triangulation.md`.

Detector 2 — Entailment. For every claim in the claim pool, ask: does the briefing say more than the sources actually support? A source that says "one customer complained" doesn't support "the market is unhappy." Flag OVERREACH when the briefing stretches what the source said. Write to `module-5/detectors/entailment.md`.

Detector 3 — Citation integrity. Some claims in the claim pool will cite a source, either inline or implicitly. For each citation, open the cited file and check whether the file actually contains the specific claim attributed to it. Flag CITATION-BROKEN when the citation doesn't back the claim. Write to `module-5/detectors/citation-integrity.md`.

Detector 4 — Counter-evidence search. For every claim in the claim pool, actively look for evidence that contradicts it, not just evidence that supports it. Flag CRUMBLES when disconfirming material exists in the rostered evidence that the briefing ignored. Write to `module-5/detectors/counter-evidence.md`.

One rule across all four detectors: quote each flagged claim exactly as it appears in `module-5/claim-pool.md`. The scorer uses strict substring match; paraphrased findings count as misses.

Spawn all four in parallel. When they finish, confirm that these four files exist: `module-5/detectors/source-triangulation.md`, `module-5/detectors/entailment.md`, `module-5/detectors/citation-integrity.md`, and `module-5/detectors/counter-evidence.md`.
