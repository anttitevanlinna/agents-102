**Context:** Mid-test process observation, 2026-04-21.

**Signal:** Doing a vocabulary sweep (e.g., "Workbench" → "Builder," then "window" → "session") serially in the main thread eats a lot of context and visible churn while the user is trying to keep teaching pace. For Antti, watching one Edit after another is signal-poor; he'd rather see a one-line *"sweep done — N files, here's the diff summary."*

**Pattern (for future):** for any single-term-replacement sweep across more than ~5 files, dispatch a background subagent with `run_in_background: true`. Subagent prompt:

1. Find all occurrences of TERM in scope SCOPE
2. Apply substitution RULE (with surface/context guards — e.g., "skip 'window' inside 'chat window' or 'time window' constructions")
3. Verify with a second grep pass
4. Write a summary file to `curriculum/evals/instances/sweep-YYYY-MM-DD-TERM.md` with: files touched, substitutions made, ambiguous cases left for human review
5. Reply to orchestrator with a 5-line summary

Main thread then reads the summary, reports to Antti, and only opens individual files if a flagged ambiguity needs taste judgment.

**Triggers for the pattern:**
- Any banned-word ban announced mid-session (likely 5+ existing hits)
- Any vocabulary rename (Workbench → Builder, window → session)
- Any cross-cutting style fix (e.g., "every prompt block must use the new shape")

**Don't use the pattern for:** single-file edits, fixes that need taste-judgment per spot (e.g., "is this 'tool' generic English or the agent-tools concept?"), edits where the user is reading along beat by beat.
