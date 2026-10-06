## What must happen every time needs its own check
<!--slide:must-happen-needs-a-check-->

An agent can read a rule and still break it. The longer it works, the less you can count on it to follow a rule it read at the start.

So sort what your team keeps into two piles. Taste goes into the agent's instructions: how a summary should read, what a good opportunity sounds like. The agent weighs it and mostly follows it, and that is enough for taste.

What must happen every time gets a check that runs every time, whether or not the agent remembers it. Every quote in the digest traced to its interview. No customer names in anything that leaves the team.

<!-- maintainer -->

**STATUS:** first cut (2026-10-06), APT101 rewrite of `hooks-always-fire` § Hooks for must-happen, prompts for taste (AE101). Not taught (simulation training). Owes judging rounds.

**Carried from home:** must-happen goes in a check the agent has no say over; taste stays in the instructions. The slide claims the shape only and does not say how the check is wired (in Claude Code, a hook; the exercise owns the mechanics).

<!-- backing -->

**Claims**
- `reads-a-rule-still-breaks-it` · vision · "An agent can read a rule and still break it." ← none-owed — `hooks-always-fire` § Hooks always fire ("Hooks exist because the LLM is forgetful").
- `longer-it-works-less-reliable` · vision · "The longer it works, the less you can count on it to follow a rule it read at the start." ← none-owed — same home.
- `must-happen-gets-a-check` · vision · "What must happen every time gets a check that runs every time" ← none-owed — `hooks-always-fire` § Hooks for must-happen, prompts for taste.
- `check-runs-regardless` · detail · "whether or not the agent remembers it" ← cc-hooks-docs

**Sources**
- cc-hooks-docs `[checked:2026-08-28 result:OK due:cohort]` https://code.claude.com/docs/en/hooks — [capability] hooks fire on named events with no model discretion over whether the script runs. Stamp inherited from `hooks-always-fire`.

**Frameworks**
(none. Platform primitive, unnamed in body.)
