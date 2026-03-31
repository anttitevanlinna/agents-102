Practitioner insight: overworked organisations do WORSE with AI. AI increases generation throughput but review capacity is fixed, so WIP explodes. Little's Law: WIP = Throughput × Cycle Time. Double the generation with same review capacity = double the queue = longer cycle times.

This reframes the absorption bottleneck as a queuing theory problem, not just a cognitive one. The Faros "AI Productivity Paradox" (91% review time increase, zero DORA improvement) isn't paradoxical — it's Little's Law breaking predictably.

**Implication:** Before deploying AI, measure REVIEW capacity, not GENERATION capacity. If review is already constrained, AI makes it worse. Fix the bottleneck first, or deploy AI on the review side (agent-evaluates-agent) before the generation side.

**Gap:** Nobody has connected the absorption bottleneck to queuing theory / Little's Law formally. This framing makes the bottleneck predictable and measurable — you can model when AI deployment will help vs. hurt based on existing review queue depth.
