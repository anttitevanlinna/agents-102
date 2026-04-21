# OODA synthesis — long-running agentic tasks — 2026-04-21

Three parallel tracks (Opus 4.7 specifics, practitioner patterns, internal state) plus synthesis. Written for curriculum design of Agents 102 / Agentic Engineering 101 Module 3.

## The three-finding headline

**1. Long-running crossed from demo to daily workflow in the Dec 2025 → Apr 2026 window.** Level 3 convergence. Karpathy's public flip is the marker. Named practitioners: Ronacher's 10-hour MiniJinja port, Cherny's own workflow (Claude Code creator), Ramp's parallel-markdown pattern (Geoff Charles), Cursor's FastRender, Ralph Wiggum loop now shipping as an official Anthropic plugin. Six independent sources, same pattern.

**2. The pattern has three durable components. All file-based.**
- **Reference artifact** the agent diffs against (snapshot tests, specs as submodules, existing codebase)
- **Plan.md the agent mutates** — file-based state, not scrollback
- **External verifier** — agent-stop hook, judge agent, or deterministic check. Without it you get "plausible but wrong."

This is M2's file-based agentic RAG applied at multi-hour scale. Not a new area — the next scale of the same practice.

**3. Opus 4.7 doesn't earn its own pedagogy yet.** Released 2026-04-16 (5 days ago). Three mechanism changes worth naming — task budgets with running countdown, improved file-system memory across sessions, more regular progress updates. But counter-evidence holds it honest: Ronacher still picks Sonnet for agentic coding; HN 3-day side-by-side shows 4.7 *worse* on one-shot edits (74.5% vs 83.8%); argue-loops and hallucinated commit hashes in hour one. Anchor M3 to the mechanism changes, not to "4.7 is better at long-running." That convergence doesn't exist yet.

## Curriculum implication — M3 reframes

Not *"a new capability called long-running tasks."* M3 is **walk-away on the memory you built in M2.** The capability is M2's file-based practice applied at multi-hour scale. The pedagogical hinge: if memory lives in scrollback, walking away is impossible. If memory lives in files, walking away is the natural next move.

This tightens the 2×2 in content-strategy: the **how axis is precondition for the technical axis.** Without compounding-engineering practice (memory in files, skills saved, sources curated), long-running tasks fail. Without team-integration practice (shared plan.md, shared verifier, shared reference artifact), factory pattern doesn't ship. The technical side rides on the how.

## Failure modes to pre-teach in M3

Students will hit these in the first hour. Naming them upfront saves them from blaming themselves.

- **Argue-loops** — 4.7 specifically has a "legendarily bad" arguing tendency per practitioner reports
- **Hallucinated commit hashes** — named by practitioners on 4.7
- **Context rot** — coherence degrades as the window fills
- **Goal drift** — the agent quietly shifts what it's trying to do
- **Plausible-but-wrong** — the output looks right and isn't; external verifier catches this
- **Context amnesia in multi-agent setups** — subagent returns, main session has lost the thread

## Infrastructure reality — recovery isn't advanced, it's table stakes

~99.34% uptime across recent months = ~6 hours downtime/month. A 6-hour agent task has a ~60% chance of hitting an infrastructure incident. M3 cannot teach walk-away without teaching recovery. Recovery patterns must arrive alongside the long-running pattern, not after it.

## Counter-evidence worth carrying

- **Ronacher, "Agents Are Hard"** — long-running does not rescue task shapes the model can't reason about stepwise. Wrong task shape in, garbage out, regardless of hours given.
- **Ralph Wiggum loop is explicitly for PoCs** — practitioners say so. Don't sell long-running as "ship production code while you sleep." Sell it as "produce a first-pass artifact that's 70% there in hours instead of days."
- **Session freshness** (Willison + Józefiak, independent) — no cross-session memory carry. Compounding happens via files the agent wrote, not via model memory.

## The M3 exercise shape (direct consequence)

The three durable patterns dictate the exercise:

1. Student picks a task that has a natural **reference artifact** (a failing test suite, a spec to implement against, a migration target)
2. Student writes a **plan.md** the agent will mutate as it works
3. Student sets up one **external verifier** (agent-stop hook, or a cheap judge agent from M4's toolkit pulled forward)
4. Launch the multi-hour run on the student's own work
5. Lunch. Return.
6. Read what the agent did. Read what it missed. Sharpen the plan, sharpen the verifier, update the memory with what you learned about your codebase from the run

Debrief: what the student learned about their *codebase* from the agent's run — not what they learned about Claude. The agent is a surfacing instrument.

## What I looked for and didn't find

- **No Intercom / Ramp / Cherny / Karpathy public post specifically on Opus 4.7** as of 2026-04-21. Re-run this OODA at 4.7-release + 6 weeks.
- **No controlled measurement of multi-hour failure rates** — nobody has published one. The L2 numbers we have (Box 7.1 vs 16.3 LLM calls; DEV 8h field report) are single-case.
- **No named practitioner running 4–8h unattended with documented outcomes.** Throughput (Intercom 2,539 CI jobs/day) isn't the same as duration. Gap persists.

## Source files
- `continuous-research/platform-watch/coding-agents/runs/2026-04-21-internal-state-check.md`
- `continuous-research/platform-watch/coding-agents/runs/2026-04-21-opus-47-long-running.md`
- `continuous-research/platform-watch/coding-agents/runs/2026-04-21-practitioner-long-running.md`
