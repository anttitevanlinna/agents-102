## What must happen every time needs its own check
<!--slide:must-happen-needs-a-check-->

An agent can read a rule and still break it. The longer it works, the less you can count on it to follow a rule it read at the start.

So sort what your team keeps into two piles. Taste goes into the agent's instructions: how a summary should read, what a good opportunity sounds like. The agent weighs it and mostly follows it, and that is enough for taste.

What must happen every time gets a check that runs every time, whether or not the agent remembers it. No customer names in anything that leaves the team.

<!-- maintainer -->

**STATUS:** round 3 fixes applied (2026-10-06), APT101 rewrite of `hooks-always-fire` § Hooks for must-happen, prompts for taste (AE101). Not taught (simulation training).

**Carried from home:** must-happen goes in a check the agent has no say over; taste stays in the instructions. The slide claims the shape only and does not say how the check is wired; the mechanism is the runtime's and stays unnamed, and the exercise owns the mechanics. The quote-to-interview example lives on `show-what-good-looks-like` in the same lecture, so this slide keeps only the customer-names example.

<!-- backing -->

**Claims**
- `reads-a-rule-still-breaks-it` · vision · "An agent can read a rule and still break it." ← none-owed — `hooks-always-fire` § Hooks always fire ("Hooks exist because the LLM is forgetful").
- `longer-it-works-less-reliable` · vision · "The longer it works, the less you can count on it to follow a rule it read at the start." ← none-owed — same home.
- `must-happen-gets-a-check` · vision · "What must happen every time gets a check that runs every time" ← none-owed — `hooks-always-fire` § Hooks for must-happen, prompts for taste.
- `check-runs-regardless` · vision · "whether or not the agent remembers it" ← none-owed — the shape, not a platform capability: a check outside the agent's discretion. Which mechanism the training's runtime offers for it is the exercise's to state and verify; Agents 101 `hooks-always-fire` carries the Claude Code instance.

**Frameworks**
(none. Platform primitive, unnamed in body.)

<!-- /backing -->
