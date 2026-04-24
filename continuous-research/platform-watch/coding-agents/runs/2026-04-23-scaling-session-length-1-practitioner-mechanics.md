# Scaling single-session length: practitioner mechanics

**Date:** 2026-04-23
**Question:** When a single Claude Code / Codex / Cursor / Amp session runs for hours (one continuous session, not parallel fanout), what mechanics keep it coherent? What's the longest documented single-session run, and what made it possible?
**Scope:** People-first investigation, last 6 months only. Looking for evidence beyond the three-pattern (reference artifact + plan.md + external verifier) we already have grounded at L3. Specifically: compaction tactics, checkpoint/resume primitives, what breaks past hour 2, and counter-evidence from practitioners who gave up on long single sessions and went parallel.

---

## Per-practitioner findings

### Boris Cherny (Claude Code creator) — Apr 2026

On X/Threads, Cherny explicitly warns against long single sessions: *"leaving an agent session open too long causes a full cache miss which inflates token usage. Start a new conversation instead of resuming stale ones to avoid massive cache rebuilds."* His own workflow runs 10–15 concurrent sessions (5 terminal, 5–10 browser, plus mobile), 3–5 git worktrees in parallel — a fleet, not a marathon.
- [Boris Cherny tips thread](https://www.threads.com/@boris_cherny/post/DUMZr4VElyb/) [practitioner direct]
- [Om Patel quoting Cherny on cache miss](https://x.com/om_patel5/status/2043885581533577686) [practitioner analysis]

**Read:** the platform creator does not believe in long single sessions. He optimises for parallel-fanout with fresh contexts.

### Thariq Shihipar (Anthropic, Claude Code MTS) — Apr 15, 2026

Names the threshold: *"Context rot — model performance degrading as context grows — kicks in around 300–400k tokens on the 1M context model."* Recommends `CLAUDE_CODE_AUTO_COMPACT_WINDOW=400000 claude` to force earlier compaction. Distinguishes three primitives: `/rewind` (remove failed attempts entirely — *"cheaper than correcting"*), `/compact` with hints (*"focus on the auth refactor, drop the test debugging"*), `/clear` for genuinely new tasks. Principle: *"proactive /compact when you sense bad-compact risk."* General rule: *"when you start a new task, you should also start a new session."*
- [Anthropic blog: session management and 1M context](https://claude.com/blog/using-claude-code-session-management-and-1m-context) [practitioner direct — vendor employee]
- [howborisusesclaudecode.com (Thariq tips)](https://howborisusesclaudecode.com/) [practitioner direct]

### Geoffrey Huntley (Ralph) — ongoing through 2026

Explicit ceiling number: *"output clips around 147–152k"* tokens; he runs *one task per loop* against a ~170k budget, then a fresh session takes the next item. State persists in files and git, not in the LLM context. Michael Arnaldi quoted: *"If you're implementing Ralph as part of the agent harness via skill/command/etc you are missing the point of Ralph which is to use always a fresh context."* Documented runs include CURSED's *"three months of autonomous operation"* and a YC hackathon run shipping *"6 repos overnight, ~1,100 commits total."* These are loop-time, not single-session-time.
- [everything is a ralph loop](https://ghuntley.com/loop/) [practitioner direct]
- [HumanLayer: A Brief History of Ralph](https://www.humanlayer.dev/blog/brief-history-of-ralph) [practitioner analysis]
- [ZeroSync: Ralph Loop technical deep-dive](http://www.zerosync.co/blog/ralph-loop-technical-deep-dive) [practitioner analysis] [date unconfirmed]

### Wilson Lin (FastRender) — Jan 14, 2026

Counter-evidence in pure form. Million-line Rust browser engine built by *"close to a week"* of agent runtime — but with planners, sub-planners, workers, and judge agents, *not* one long session. Direct quote from his Cursor write-up: *"At the end of each cycle, a judge agent determined whether to continue, then the next iteration would start fresh."* Cycles, not sessions. *"Periodic fresh starts to combat drift and tunnel vision."*
- [Cursor: Scaling long-running autonomous coding](https://cursor.com/blog/scaling-agents) [practitioner direct]
- [Simon Willison summary](https://simonwillison.net/2026/Jan/23/fastrender/) [practitioner analysis]

### Andrej Karpathy (autoresearch) — early 2026

8-hour autoresearch run on 16 GPUs, ~910 experiments, ~$9 in Claude Code API costs. Runtime is long, but architecture is parallel — *"factorial grids of 10–13 experiments per wave."* In coding, he describes directing *"fleets of AI agents — up to 20 in parallel."* Karpathy is on team parallel, not team marathon-session.
- [SkyPilot: Scaling autoresearch](https://blog.skypilot.co/scaling-autoresearch/) [vendor analysis]
- [autoresearch repo](https://github.com/karpathy/autoresearch) [practitioner direct]

### Vincent Qiao (`/resume` mechanics) — 2026

Documents the durable-state primitive: conversations live at `~/.claude/projects/<encoded-path>/xxx.jsonl` and *"never expire — whether from yesterday or last month, as long as the file exists, it can be restored."* `claude -c` resumes the last conversation. Practical pattern: *"left work yesterday, picking up today."* This extends wall-clock continuity across days but doesn't extend a single live context window — it's a re-hydration trick, not a context-extension trick.
- [Vincent: Claude Code /resume](https://blog.vincentqiao.com/en/posts/claude-code-resume/) [practitioner direct]

### yurukusa (50-day usage tracker) — Feb–Mar 2026

The longest single-session number I could find with a name attached: *"8.5h on 2026-02-28 — cc-loop"* (project name suggests a Ralph-style loop, not a manually-driven session). Aggregate: 115.9 hours across 3,479 sessions over 50 days. Average session ≈ 2 minutes. The distribution itself is the finding — practitioners do not run long sessions; they run many short ones.
- [DEV: 50-day Claude Code tracking](https://dev.to/yurukusa/i-tracked-my-claude-code-usage-50-days-straight-my-hip-flexors-have-opinions-f34) [practitioner direct]

### Armin Ronacher — Feb 2026

Worth flagging as **what I looked for but didn't find**: his recent posts ("A Language For Agents," "The Final Bottleneck") don't address session length at all. The MiniJinja-port piece remains the load-bearing reference in our existing notes; nothing newer from him on this specific topic.

---

## Convergent patterns (3+ independent practitioners)

1. **Context rot crosses a cliff at 300–400k tokens** on the 1M model, well before the hard limit. Named by Thariq (Anthropic), Huntley (147–152k on the 200k model — same fraction), with one unattributed mechanics post (claudefa.st) on the 33–45k unusable buffer. **Convergence: L2, trending toward L3** — only 2 named practitioners plus one unattributed source; needs one more named practitioner direct to lock in L3.

2. **The platform-native answer to "how do I run longer?" is "don't — fan out instead."** Cherny, Wilson Lin, Karpathy, Huntley all converge on parallel sessions / loops with fresh context over single long sessions. Different architectures (worktrees, planner-worker, GPU-grid, Ralph loop) — same underlying move. **Convergence: L3.**

3. **State lives in artefacts, not in context.** Ralph's *"progress lives in your files and git history,"* Wilson Lin's judge-agent-decides-then-fresh-cycle, Vincent's `~/.claude/projects/` JSONL files — same idea, different surfaces. **Consistent L2 across 3 frontier practitioners; pattern matches our prior L3 reference-artefact finding.**

4. **`/compact` with hints beats auto-compact.** Thariq's *"bad-compact risk"* framing matches the broader practitioner advice (60% capacity, not 95%; preserve modified files + test commands via CLAUDE.md). The mechanics are consistent across the Anthropic blog, Thariq's tips, and the third-party guides. **Convergence: L2–L3.**

---

## Counter-evidence

- **Cherny himself argues against the premise.** The Claude Code creator's stated workflow is the strongest counter-signal: long single sessions are an anti-pattern *because of cache economics,* not just context rot.
- **Wilson Lin tried single-agent extended runs and switched to multi-agent cycles.** *"Periodic fresh starts to combat drift and tunnel vision"* is an explicit reversal — the FastRender architecture exists *because* extending one agent failed.
- **Aggregate usage data shows ~2-minute average sessions** even among heavy users (yurukusa). The 8.5-hour outlier was a `cc-loop` run, not a hand-driven session.

The honest read: **no practitioner in the last 6 months publicly documents a 10-hour coherent hand-driven single session as a desirable target.** The frontier has moved past it.

---

## What I looked for but didn't find

- A practitioner-direct write-up of "I ran one Claude Code session for 10+ hours and here's what worked." Nearest equivalents are loop-driven (Ralph, cc-loop) where the *loop* runs long but each *session* is fresh.
- New Armin Ronacher material on session-length specifically.
- Boris Cherny podcast content with hour-level specifics on his own longest sessions (his public content is consistent: he doesn't run them).
- Counter-counter-evidence: a practitioner explicitly arguing single-long-session beats parallel-fanout for a specific class of work. The closest is Vincent Qiao's `/resume` pattern, but that's wall-clock continuity, not single-context continuity.

---

## Curriculum implications for M5

1. **Reframe M5's premise.** If the platform creator's stated position is "don't run long single sessions," then M5's packaging-the-task contrast should land as: *packaging is what lets you fan out to many short sessions safely* — not *packaging is what lets one session run for 10 hours.* (Tagged: Cherny + Lin + Karpathy convergence.)

2. **Teach the three primitives Thariq names** — `/rewind`, `/compact` with hints, `/clear` — by having students hit context rot in M4 and apply each in M5. The 300–400k cliff is a concrete teachable threshold, not a vibe. (Tagged: Thariq L3.)

3. **Make `~/.claude/projects/` JSONL persistence visible.** Most students don't know their conversations are durable on disk. A 5-minute exercise opening one and reading it changes how they think about session boundaries. (Tagged: Vincent direct.)

4. **Include the Ralph-vs-single-session contrast** as a Key Concept callout, not as a build-it-yourself. Students should leave knowing the *pattern shape* (state in files, fresh context per iteration) even if M5 doesn't have them implement it. (Tagged: Huntley + Arnaldi convergence.)

5. **Drop or downgrade any M5 content that frames "10-hour coherent single session" as the goal.** The frontier evidence doesn't support it. The goal is *coherent multi-step work,* and the production answer is fan-out + checkpointing, not session-length-extension. (Tagged: counter-evidence section.)

---

## Convergence assessment

- **Pattern 1: L2 trending toward L3** (2 named practitioners + 1 unattributed mechanics post). **Pattern 2: L3** (Cherny, Wilson Lin, Karpathy, Huntley converging). **Pattern 3: L2 strong, leaning on prior L3 reference-artefact finding** (3 named frontier practitioners).
- **Pattern 4 (compact-with-hints): L2–L3.** Strong from Thariq + Anthropic-direct content, supported by third-party guides; could use one more named-practitioner direct post to lock in L3.
- **Counter-evidence is itself convergent at L3** — multiple frontier practitioners have actively reversed away from single-long-session as the target.

**The strongest finding is the negative one: the practitioner frontier has moved past single-session-length-extension as a worthwhile goal.** That reframes M5 more than any positive mechanic does.
