# Scaling by parallelism vs. extending a single session — OODA 2026-04-23

**Question:** In the last 6 months (Oct 2025 → Apr 2026), where is practitioner consensus moving — toward longer single sessions or toward more parallel-short sessions with orchestration?

**Scope:** people-first read of named practitioners (Ronacher, Karpathy, Charles/Ramp, Wilson Lin/Cursor, Quigley/Sanity, Spotify Honk team, Carlini/Anthropic). Feeds Agentic Engineering 101 M5 (the "send-off" / packaging module).

**Headline:** the consensus has moved toward **parallel-short with file-based orchestration as the default**, with single-session multi-hour reframed as one valid task shape (not the destination). The practitioner population publishing fanout patterns vastly outnumbers those publishing single-session heroics. But the parallel champions are converging on a non-trivial substrate (worktrees + markdown handoff + judge agent + cap on N), and the dissent on coordination overhead is sharp enough to take seriously.

---

## Single-session evidence (last 6 months)

- **Ronacher / MiniJinja port (Jan 2026).** Still the load-bearing single-session artifact: 10h, 2.2M tokens, Rust→Go incremental port with reused snapshot tests. [practitioner direct] https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/
- **Ronacher / Pi (Jan 2026).** Built a *minimal* single-agent harness; argues most agent complexity is unnecessary for the long-running case if the task shape is right. [practitioner direct] https://lucumr.pocoo.org/2026/1/31/pi/
- **Ronacher / "A Language for Agents" (Feb 2026).** Doubles down on the single-coherent-loop framing; treats parallel as a separate problem class. [practitioner direct] https://lucumr.pocoo.org/2026/2/9/a-language-for-agents/
- **Ronacher / "Agent Psychosis" (Jan 2026).** Explicit caution about over-running; not a counter to single-session, but to *unsupervised-anything*. [practitioner direct] https://lucumr.pocoo.org/2026/1/18/agent-psychosis/

**No fresh "I ran a 24h single session and it worked" post surfaced this cycle.** The single-session champions are mostly Ronacher; the rest of the named roster has migrated.

## Parallel-fanout evidence (last 6 months)

- **Karpathy (Dec 2025 → Mar 2026):** 10–20 concurrent agents, ~20 min each, "state of psychosis," hasn't written code by hand since December. The Mar 2026 No Priors interview is the most-cited synthesis. [practitioner direct] https://x.com/karpathy/status/2026731645169185220 ; [practitioner analysis] https://pjfp.com/andrej-karpathy-on-autoresearch-ai-agents-and-why-he-stopped-writing-code-full-breakdown-of-his-2026-no-priors-interview/
- **Ramp / Geoff Charles (recurring through Q1 2026):** 6–10 parallel agents, each writes a markdown file, synthesizer reads files. 50% of production code AI-generated [self-reported, no methodology], projected 80%+. [practitioner direct, podcast] https://creatoreconomy.so/p/inside-ramp-the-32b-company-ai-agents-geoff-charles
- **Wilson Lin / Cursor / FastRender (Jan 2026):** hundreds of concurrent agents, planner → sub-planner → worker → judge hierarchy, ~1M LOC Rust browser engine in weeks. [practitioner direct, video] https://www.youtube.com/watch?v=bKrAcTf2pL4 ; [practitioner analysis] https://simonwillison.net/2026/Jan/23/fastrender/
- **Spotify Honk (Nov 2025 → Apr 2026):** 1,500+ PRs in part 1 (Nov 2025), 650+/month at steady state, 1,000 PRs in 10 days at current rate. Sits on Fleet Management infra (since 2022). The standalone Spotify Engineering posts (Nov/Dec 2025) are the load-bearing source: https://engineering.atspotify.com/2025/11/spotifys-background-coding-agent-part-1 ; https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3 . The Apr 2026 piece is co-published with Anthropic [practitioner direct, co-marketing — treat numbers as self-reported] https://engineering.atspotify.com/2026/4/anthropic-agentic-development
- **Sanity / Quigley (Sep 2025, still recirculating — at the 6-month freshness boundary; historical anchor, not current evidence):** runs multiple Claudes "like a small team of developers who reset their memory each morning." [practitioner direct] https://www.sanity.io/blog/first-attempt-will-be-95-garbage
- **Anthropic / Carlini (Feb 2026):** 16 parallel Claude Opus 4.6 instances, 2 weeks, ~2,000 sessions, $20K, 100K-line C compiler. Internal proof-of-concept that agent-team coordination scales. [practitioner direct] https://www.anthropic.com/engineering/building-c-compiler
- **Imbue / mngr (Q1 2026):** product framing "usefully run hundreds of Claudes in parallel." [vendor press release — Level 0; vendor-named pattern, not evidence] https://imbue.com/product/mngr/

## The handoff substrate — what coordinates the fanout?

Strong convergence on three primitives, used in combination:

1. **Git worktrees per agent.** Claude Code shipped CLI worktree support (`claude -w`) Q1 2026 [date approximate]; Boris Cherny's announcement is the practitioner-direct anchor. JetBrains added first-class worktree UI in 2026.1 (Mar). Tools: `worktrunk`, `parallel-code`, Anthropic's built-in. [practitioner direct] https://www.threads.com/@boris_cherny/post/DVAAnexgRUj
2. **Markdown-per-agent handoff (Ramp pattern).** Each agent writes `findings-{agent}.md`; orchestrator reads all files; synthesizer consumes the directory. Convergent across Ramp, Spotify, FastRender's planner→worker handoff, and the Carlini compiler team's task list.
3. **Judge / verifier agent at merge.** FastRender ends each cycle with a judge deciding "done?" Anthropic's compiler team uses the same. ComposioHQ ships an open-source orchestrator with built-in CI-fix and merge-conflict resolution [vendor repo — proof of category, not of convergence] https://github.com/ComposioHQ/agent-orchestrator

**Shared `plan.md` mutated by parallel agents** (Ralph-style) is the *minority* pattern at parallel scale — file-locking and stomping break it past N=2–3. The Ramp split (one markdown *per* agent) is the convergent fix.

## Migration patterns

- **Single → parallel:** Karpathy is the loudest. Spotify went from individual Claude Code use to Honk's fleet pattern over 2025. Sanity's Quigley narrates the same arc inside a single engineer. Pattern: once a practitioner has the substrate (worktrees + markdown), they don't go back.
- **Parallel → single:** no named practitioner publicly reverted. Closest is Ronacher's *implicit* position — Pi and "A Language for Agents" argue for one coherent loop done right, treating parallel as a separate (and harder) problem class. Not a reversion, more a refusal to migrate.

## Counter-evidence and dissent

- **Coordination overhead is real.** Multi-agent pipelines accumulate latency and token overhead vs. single-agent equivalents — the directional claim is widely repeated, but the specific numbers we previously cited come from a [vendor blog] (Level 0) and have been dropped: https://fast.io/resources/multi-agent-orchestration-patterns/ . Treat the *pattern* (overhead exists) as directional; the magnitude needs a controlled study.
- **3–5 parallel is the practical ceiling for most.** "Most developers find 3–5 parallel worktrees is a practical upper bound before context-switching overhead between terminals becomes its own problem." [practitioner analysis, multiple] — Karpathy's 10–20 and Cursor's hundreds are outliers running on dedicated harness infra, not a vanilla terminal setup.
- **Cursor's FastRender quality dissent.** The Register and SIG analyzed the actual repo and found "shoddy code at scale" — over a million LOC, but uneven quality, much unused. [tech press] https://www.theregister.com/2026/01/22/cursor_ai_wrote_a_browser/ ; [practitioner analysis] https://www.softwareimprovementgroup.com/blog/quality-of-fastrender/ — parallel scale produces *throughput*, not necessarily *cohesion*.
- **Cost wall at scale.** Carlini's compiler: $20K for 2 weeks of 16 agents. Böckeler / Thoughtworks projects ~$91K/eng/year at 2026 usage rates as the real ceiling — note this is Böckeler's projection, not a measured rate. [practitioner analysis] https://martinfowler.com/articles/harness-engineering.html
- **No "we tried parallel and reverted" published post.** Suspicious absence — career risk, or genuinely no one is going back. Worth probing next cycle.

## Honest comparison

| Criterion | Single-session multi-hour | Parallel-short fanout |
|---|---|---|
| Total scope per wall-clock hour | Linear, capped by one model | Multiplied by N, capped by orchestration overhead |
| Engineer attention | High at start, low after align | Low per-agent; high at synthesis/merge |
| Failure mode | Context rot, plausible-but-wrong | Stomping, merge conflicts, incoherence across agents |
| Cost per result | Predictable ($/hour) | Multiplicative; can spike ($20K compiler) |
| Artifact cohesion | High (one mind, one loop) | Low without explicit judge + merge discipline |

## Convergence assessment

- **Parallel fanout with file-based handoff: L2 climbing toward L3.** 7 named practitioners (Spotify, Ramp, Cursor/Wilson Lin, Anthropic-internal/Carlini, Karpathy, Sanity/Quigley, Imbue) — below the 10–20 floor for L3, and tools/worktree ecosystem don't count toward the practitioner tally. Same substrate and same diagnosis (markdown beats shared scrollback) across all 7, so the *direction* is clear; promote to L3 once 3+ more named practitioners publish the same pattern.
- **Single-session multi-hour: L2.** Ronacher is doing it well; no convergence around him. The pattern works for known task shapes (incremental ports, one-mind features) but the practitioner population publishing it is small and shrinking relative to the parallel cohort.
- **The combined pattern (parallel sessions, each itself multi-hour) is L2 climbing.** Spotify Honk and Carlini's compiler are both "parallel × long-running." This is where the frontier is heading.

## Curriculum implications for M5

1. **Single-session mastery is a stepping stone, not the destination — say so explicitly.** M5's "multi-hour send-off" exercise teaches the substrate (plan.md, file-state, walk-away test) by *doing it once, alone*. That's pedagogically right because parallel-fanout requires the same primitives, plus orchestration. Teach the primitive in isolation, then unlock the multiplier.
2. **Frame the destination honestly.** The practitioner direction of travel is parallel-short with file-based handoff (Ramp's 6–10 markdown agents is the simplest replicable pattern). If M5 stops at "you can run one agent for 4 hours," it sells the student short. Add a closing beat: "the next move is N of these in parallel, with markdown as the wire format — that's M6/M7 territory."
3. **Name the failure modes that change between modes.** Single-session: context rot, plausible-but-wrong. Parallel: stomping, merge conflicts, lost cohesion. Different countermeasures (compaction + verifier vs. worktrees + judge). Don't let students assume the parallel pattern is "just N times what you learned in M5."
4. **The 3–5 ceiling is the honest beginner number.** Karpathy's 10–20 and Cursor's hundreds need infrastructure students don't have on day one. Teach 2–3 parallel as the realistic on-laptop pattern; reference the higher numbers as "with infra you'll build later."
5. **Cost as a first-class topic.** $20K-for-a-compiler and $91K/eng/year are the numbers CTOs will hear. M5's debrief should include "what did this run cost, and would you authorize it on a real ticket?" Otherwise the training produces enthusiasts who can't get budget.

## What I looked for and didn't find

- A practitioner who tried parallel fanout and published a "went back to single-session" post. Suspicious gap.
- Hard numbers on the merge-cost-eats-the-gains hypothesis. The fast.io coordination-overhead numbers are directional, not controlled.
- Nordic practitioners doing parallel fanout beyond Spotify and Sanity. Klarna, Wolt, Supercell, Ericsson: still silent.
- A serious published comparison of "16 parallel Claudes for $20K" vs. "1 Claude for 16x the time" on the same task. Would settle the cost question.

---

**Cycle author:** Opus 4.7. Web access available; 4 web searches + prior-cycle reads. Every URL one-click verifiable.
