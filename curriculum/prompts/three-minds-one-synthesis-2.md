---
key: three-minds-one-synthesis-2
dest: Claude Code
runtime: any
origin: exercises/three-minds-one-synthesis
---
Start dispatching immediately. No plan or preamble.

Spawn three agents in parallel, each with a different stance. Each reads my curated memory/ (the layer the previous exercise integrated the retrievals into) and writes a short note (under 200 words) to module-3/stances/.

Agent 1: Backward-from-end planner. Imagine the outcome we want in 12 months. Work backwards. What must be true by month 9, month 6, month 3, next week? What's the first move on Monday?

Agent 2: Assumption experimenter. Roger Martin's test: for the most attractive option, what would have to be true for it to work? List the load-bearing assumptions. For each, name the cheapest test that could kill it within a week.

Agent 3: Counterintuitive reframer. What's the obvious answer here? Now, what's the reframe? Question the framing of the question itself. Steal an analogy from an unrelated field. Which bias is operating, and what happens if we invert it? (Be sharp, not glib.)

When the three return, show me the stances side by side, unsummarised, so I read them as three voices. Tell me where memory had conflicts or gaps that weakened any stance.

Then synthesize. Apply Rumelt's strategy kernel — diagnosis (what's really going on, in plain language), guiding policy (one coherent approach that addresses the diagnosis), coherent actions (3–5 concrete moves that follow). Append only a new `## Answer` section to ./crux.md with the three legs; do not modify existing sections. Name where the three stances disagreed and which one you sided with and why; don't smooth the disagreement. Show me before saving.
