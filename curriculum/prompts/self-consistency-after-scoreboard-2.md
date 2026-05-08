---
key: self-consistency-after-scoreboard-2
dest: Claude Code
runtime: any
origin: lectures/self-consistency-after-scoreboard
---
Compare the first and second briefing.

Read:
- `module-5/briefing.md`
- `module-5/briefing-second-run.md`
- `module-5/claim-pool.md`
- `module-5/adjudicated-claims.md`

Show me the comparison in chat with these sections:

1. Stable claims: claims or recommendations that appear in both briefings and are supported by the adjudicated claims.
2. Drifted claims: same topic, but different number, named entity, recommendation, causal explanation, or framing.
3. First-run-only claims: claims from the first briefing that disappeared in the second.
4. Second-run-only claims: claims from the second briefing that did not appear in the first.
5. Self-consistency issues: claims that are both unsupported or partly grounded AND unstable across runs.

End with three lines:
- What self-consistency caught that the groundedness detectors did not.
- What self-consistency cannot prove.
- Whether the winning groundedness judge should change. Default answer should be no unless the demo shows a concrete failure class the judge can actually detect.
