---
type: observation
subject: Armin Ronacher
subject_handles: ["@mitsuhiko", "lucumr.pocoo.org", "github.com/mitsuhiko"]
role: Creator of Flask (Python web framework), Sentry CTO, engineering pragmatist
domain: coding-agents
evidence_level: 2
updated: 2026-07-19
first_observed: cycle 91 (WIP/Little's Law signal, April 6, 2026)
observation_file_created: cycle 119 (May 31, 2026)
---

# Observation: Armin Ronacher (@mitsuhiko)

## Why he matters

Flask creator. Sentry CTO. Engineering pragmatist known for honest technical takes that prove out over time. Cited in cycle 91 as independent confirmation of the WIP/Little's Law bottleneck. Not a vendor, not an analyst — builds production infrastructure and publishes what he learns. As of May 2026, he has shipped a Go infrastructure service where 90% of code is AI-written and built Pi (a minimal coding agent) using the agent itself. His beliefs are grounded in months of production use, not conference slides.

## Core belief: tools, not agents; human responsibility, not machine agency

Ronacher's clearest public framing (May 26, 2026): he uses "clanker" instead of "agent" to prevent anthropomorphization. "If my coding tool opens a pull request, I opened that pull request, not the machine." This is not word games — it reflects a belief that the human developer retains full ownership and responsibility for AI outputs. He is skeptical of framings that attribute agency or moral status to LLMs.

[practitioner direct] https://lucumr.pocoo.org/2026/5/26/clankers/ — May 26, 2026

## What he believes about when agentic coding works

**Language choice matters more than practitioners admit:**
- Go is his strong recommendation for backend agentic projects. Reasons: explicit context system (agents understand it intuitively), fast test caching, structural interfaces, stable ecosystem with minimal churn. "Go is sloppy... Substitute 'developers' with 'agents,' and it perfectly captures why Go's simplicity benefits agentic coding."
- Python creates friction through magical patterns (pytest fixtures), complex async semantics, slow interpreter startup. These produce incorrect code in hard-to-resolve loops.
- Agents perform significantly better on languages well-represented in their training weights.

**Tooling design is load-bearing:**
- Tools must be: fast, user-friendly, protected against misuse, and observable. Slow tools create expensive inference loops directly → higher cost, lower productivity.
- Logging is infrastructure, not ancillary. Routes application output to files agents can consult for autonomous diagnosis. When debug mode logs emails to stdout, agents can complete sign-in flows without human intervention — this is "a tool" in his framework.
- Custom bespoke tools outperform MCP implementations. Excessive MCP causes "context rot." The upfront tool loading MCP requires makes hot-reloading nearly impossible: "that makes it very hard to impossible to fully reload what tools can do without trashing the complete cache."

**Code architecture must accommodate agents:**
- Prefer simple, descriptive function names over classes and inheritance. Agents reason better about flat structures.
- Use plain SQL — "You get excellent SQL out of agents and they can match the SQL they write with the SQL logs."
- Keep permission checks locally visible. "Hiding permission checks in another file... will almost guarantee you that the AI will forget to add permission checks." This is a security-relevant observation, not style preference.
- Favor code generation over dependencies — agents can write code that exactly matches the problem; dependencies introduce versioning surface area.

**Parallelization unlocks scale:**
- Run multiple agents against segmented state (separate database checkouts, Docker containers). Individual agent speed is bounded; parallelization breaks the constraint.
- Session trees (branches for side-quests) prevent context corruption. Agents can fix a broken tool without polluting the main session context.

[practitioner direct] https://lucumr.pocoo.org/2025/6/12/agentic-coding/ — June 12, 2025
[practitioner direct] https://speakerdeck.com/mitsuhiko/agentic-coding-the-future-of-software-development-with-agents — June 30, 2025

## What he believes fails

**Over-engineering is the characteristic failure mode:**
Agents add defensive layers rather than enforce invariants. His formulation (May 2026): "the clanker will often add a tolerant reader. Then it will add a fallback, then maybe a migration, then more debug output." The correct fix is almost always to make the bad state impossible, not to handle it gracefully.

**Slop issue reports create compounding waste:**
AI-generated or AI-modified bug reports contain "plausible but wrong diagnosis" — the reported problem is plausible but the diagnosis is wrong, creating an investigation that burns time. Worse: these expand scope dramatically, turning "a narrow bug observation into a much expanded surface area full of hypotheses." His solution: explicit instructions to agents to independently verify behavior from code, not just accept the issue's framing. (/is prompt in Pi workflow: "Independently verify behavior and derive your own analysis from the code.")

**Refactoring timing is critical:**
Projects reach complexity thresholds where agents start producing regressions. Too early refactoring is wasteful; too late means regressions accumulate faster than agents can fix them. Recognizing the threshold requires human judgment.

[practitioner direct] https://lucumr.pocoo.org/2026/5/24/pi-oss/ — May 24, 2026
[practitioner direct] https://lucumr.pocoo.org/2026/1/31/pi/ — January 31, 2026

## His tooling setup (current as of 2025-2026)

- Platform: Claude Code (Max subscription, ~$100/month)
- Model: Sonnet (prefers over Opus — "perfectly adequate")
- Alias: `claude-yolo` — skips permission prompts for trusted environments
- Sandboxing: Dockerized environments to manage risk of yolo mode
- Environment: Go for backend, Makefile-based tooling, pidfile protection against duplicate service spawning, continuous logging
- Agent: Pi (his own minimal coding agent, built using Pi itself) — minimal core, maximum extensibility, session trees

## Practitioner stance on AI tools broadly

Ronacher occupies a specific position: technically deep engagement with agentic tools combined with skepticism about their anthropomorphization and uncritical adoption. His April 2026 post ("The Center Has a Bias") argues that meaningful AI criticism requires actual use — informed critical engagement, not abstract rejection. He is among the most vocal critics of over-engineering and slop, having built real systems with these tools for over a year.

He self-describes as a builder who takes responsibility for AI outputs: "I opened that pull request, not the machine." This puts him in the minority among practitioners who frame AI agents as autonomous actors.

[practitioner direct] https://lucumr.pocoo.org/2026/4/11/the-center-has-a-bias/ — April 11, 2026

## X.com observation (May 2026)

"Claude Code feels like a tool that is used by the developers for the purpose it's written. I'm sure most coding agents are used by their developers, but I wonder what the percentage of code changes to their agents come from using their own agent." — raises the meta-platform question: are coding agent builders actually using their own agents to build coding agents?

[practitioner direct] https://x.com/mitsuhiko/status/1954643774203924832

## "The Coming Loop" (June 23, 2026) — Identity shift crystallized

**Most direct belief statement yet.** Ronacher published "The Coming Loop" on June 23, 2026 — a post that moves from *how he works* to *what he believes about what's happening*.

Core claim: "I don't prompt Claude anymore. I have loops running that prompt Claude and figuring out what to do. My job is to write loops."

This is an identity statement, not a workflow description. The engineering identity has shifted from code-writer to loop-architect.

Additional belief claims from the post:
- Models are "mortally terrified of exceptions" (citing Karpathy) — they generate defensive, fallback-heavy code that avoids strong invariants. Expert intervention must counteract this at architecture level.
- Comprehension erosion: "we may no longer understand the whole system in the same way" — honest acknowledgment of a systemic quality that pre-agentic development didn't have.
- Loops excel in bounded domains: code porting, performance exploration, security scanning — temporary artifacts, not lasting systems.
- Teams are merging code they cannot fully explain; people converse through LLM indirection rather than directly.
- **Honest ambivalence:** "I have no doubts that this looping future is going to be our future despite the fact that I presently resent it." — practitioners who crossed the threshold are not evangelists, they're pragmatists with reservations.

This ambivalence framing is significant: it separates the experienced practitioner voice from the hype layer. Ronacher is not saying "this is great" — he is saying "this is real and I have mixed feelings about it." That's the most credible practitioner signal.

Convergence note: Osmani (June 15, addyosmani.com) independently reached the same belief about expertise concentration: "The hard part of engineering moved from writing code to deciding whether to trust it." Two named practitioners, writing independently, same week, same belief.

[practitioner direct] https://lucumr.pocoo.org/2026/6/23/the-coming-loop/ — June 23, 2026

## "The Tower Keeps Rising" (July 13, 2026) — Silent incoherence as the CTO-level risk

**Fourth 2026 post. Thesis: AI agents remove the coordination friction that previously synchronized team understanding.** Tower of Babel parallel inverted: in the original, communication failure halted construction; with agents, construction continues despite the collapse. Code compiles, tests pass, AI explanations generate on demand — but the shared mental model has eroded.

Key mechanism named: "Some of it was the process by which your understanding became mine, and by which both of us discovered whether we still agreed about how the system worked." Code review friction was a synchronization mechanism, not just a quality gate. Removing the friction removes the synchronization.

New failure mode: "the code can compile, the tests can pass, and the explanations can be generated on demand" — the traditional failure signals are all gone; incoherence accumulates silently. Engineers can add OAuth and caching in parallel via agents without any coordination or interface negotiation — the forced synchronization that used to spread shared understanding no longer triggers.

Most quotable: "The tower does not fall, and so we do not notice what was lost. It just keeps rising."

Belief trajectory: third consecutive post on a hardening theme — "I write loops" (June 23) → "models break tools" (July 4) → "teams ship incoherence without knowing it" (July 13). The risk vector migrates upward: individual code quality → tool reliability → team epistemology.

Convergence: Osmani (July 9, "Own the Outer Loop") independently named "cognitive debt" the same week — engineers accept AI output without understanding it. Two practitioners, independent, same week cluster, same underlying concern. Approaching L3 for the absorption-bottleneck pattern.

Simon Willison curated with quote July 14 — earliest amplification signal.

[practitioner direct] https://lucumr.pocoo.org/2026/7/13/the-tower-keeps-rising/ — July 13, 2026

## Evidence status

All claims are from Ronacher's own blog (lucumr.pocoo.org) and X.com — primary source only. Level 2: single practitioner, consistent body of work over 12+ months. Not convergence-level individually, but the June 23 post combined with Osmani (June 15) creates L3 directional convergence on the belief that expertise concentrates at architecture/judgment layer. July 13 "Tower Keeps Rising" + Osmani July 9 "Own the Outer Loop" creates a second L3-approaching convergence cluster: silent incoherence accumulation as the new team-level risk. Useful as: (1) leading-indicator voice, (2) counter to vendor narratives about AI autonomy, (3) concrete technical conditions for successful agentic coding deployments, (4) honest ambivalence framing that distinguishes experienced practitioners from enthusiasts, (5) team epistemology risk framing (new July 2026).

## What to watch

- Whether "The Tower Keeps Rising" framing gets cited by other practitioners — the "synchronization mechanism" observation names a concrete mechanism that tends to propagate
- Whether the July 13 + Osmani convergence reaches full L3 for the absorption-bottleneck pattern
- His assessment of Dynamic Workflows (shipped May 28, 2026) — given his opinions on orchestration architecture, his verdict would be high-signal
- Whether his Pi agent gets broader adoption — evidence of practitioners building minimal agents over managed platforms
