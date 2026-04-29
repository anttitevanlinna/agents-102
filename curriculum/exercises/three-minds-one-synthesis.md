# Exercise: Three minds, one synthesis

**What you do:**

Spawn three subagents inside one session. Each holds a different stance against your curated memory. The main session reads them back, applies a strategy framework, and writes the answer back into your `./crux.md` as a third section.

**What happens:**

Three voices, three short notes. The main session reads them side by side, applies Rumelt's strategy kernel inline, writes the synthesis. Single artifact carries the full strategic frame: crux + question + answer.

**The point:**

Multi-agent's second shape: subagents inside one session. Each runs in its own context, returns and disappears. Quick parallel thinking, bounded return — without juggling four windows.

**Time:** ~22 minutes (15 min synthesis + 7 min Close).

The previous exercise left you with a curated `memory/` (the synthesizer's output) and the same `./crux.md` you've been building since the opening.

Stay in the session that wrote `./crux.md` — the same one you've used since *Name your crux*. In the previous exercise this session was relabelled Session 4 (the synthesizer) while three retriever sessions ran alongside it. The retriever sessions can close now; this one stays open as your main session for the synthesis below.

Wait for the synthesizer's loop to finish — its last move was writing `memory/_synthesis-m3.md` naming what changed. Memory is sharper than it was an hour ago.

Now spawn three minds inside *this* session and synthesize their stances inline. <span class="rt-code">Claude Code calls them **subagents**.</span><span class="rt-cowork">Cowork calls them **agents**.</span> Each runs with its own context window, works in parallel, hands back what it produced. Same shape as the agent files you built in Module 2, but spawned inside this session instead of saved as files.

Three stances in parallel; the main session reads them, applies a framework, and writes the answer back into `./crux.md` as a third section. One prompt does the whole job.

<div class="rt-code">

**Prompt** *(Claude Code)*

```
Spawn three subagents in parallel, each with a different stance. Each reads my curated memory/ (the layer the previous exercise integrated the retrievals into) and writes a short note (under 200 words) to module-3/stances/.

Subagent 1: Backward-from-end planner. Imagine the outcome we want in 12 months. Work backwards. What must be true by month 9, month 6, month 3, next week? What's the first move on Monday?

Subagent 2: Assumption experimenter. Roger Martin's test: for the most attractive option, what would have to be true for it to work? List the load-bearing assumptions. For each, name the cheapest test that could kill it within a week.

Subagent 3: Counterintuitive reframer. What's the obvious answer here? Now, what's the reframe? Question the framing of the question itself. Steal an analogy from an unrelated field. Which bias is operating, and what happens if we invert it? (Be sharp, not glib.)

When the three return, show me the stances side by side, unsummarised, so I read them as three voices. Tell me where memory had conflicts or gaps that weakened any stance.

Then synthesize. Apply Rumelt's strategy kernel — diagnosis (what's really going on, in plain language), guiding policy (one coherent approach that addresses the diagnosis), coherent actions (3–5 concrete moves that follow). Append an `## Answer` section to ./crux.md with the three legs. Name where the three stances disagreed and which one you sided with and why; don't smooth the disagreement. Show me before saving.
```

</div>
<div class="rt-cowork">

**Prompt** *(Claude Code)*

```
Spawn three agents in parallel, each with a different stance. Each reads my curated memory/ (the layer the previous exercise integrated the retrievals into) and writes a short note (under 200 words) to module-3/stances/.

Agent 1: Backward-from-end planner. Imagine the outcome we want in 12 months. Work backwards. What must be true by month 9, month 6, month 3, next week? What's the first move on Monday?

Agent 2: Assumption experimenter. Roger Martin's test: for the most attractive option, what would have to be true for it to work? List the load-bearing assumptions. For each, name the cheapest test that could kill it within a week.

Agent 3: Counterintuitive reframer. What's the obvious answer here? Now, what's the reframe? Question the framing of the question itself. Steal an analogy from an unrelated field. Which bias is operating, and what happens if we invert it? (Be sharp, not glib.)

When the three return, show me the stances side by side, unsummarised, so I read them as three voices. Tell me where memory had conflicts or gaps that weakened any stance.

Then synthesize. Apply Rumelt's strategy kernel — diagnosis (what's really going on, in plain language), guiding policy (one coherent approach that addresses the diagnosis), coherent actions (3–5 concrete moves that follow). Append an `## Answer` section to ./crux.md with the three legs. Name where the three stances disagreed and which one you sided with and why; don't smooth the disagreement. Show me before saving.
```

</div>


Heads-up: the answer often comes back with a longer issue list than feels comfortable — disagreements named, gaps flagged. That's the prompt working as designed; it looks scarier than it is. If the volume is in the way, delegate triage back to Claude.

Optional: paste this back to focus the work.

**Prompt** *(Claude Code, optional)*

```
You choose fixes. Aim for optimal function in the next session that runs on this.
```


**Close. Does this feel right?**

Ask Claude to recap the three retrievals' core claims next to your `## Answer`. Then ask yourself a question you won't be able to avoid asking anyway: *is this actually right?*

You can't tell yet. Three retrievers read plainly, three stances pushed, a framework held the synthesis together, and still, the answer sits at that uneasy distance where you'd stake your reputation on some of it and not all of it, and you can't yet say which is which. That feeling is correct.

Hold the doubt. Name it to yourself. Don't fix it here.

**Module 5 builds the tools to name what's off systematically.** For now, let it stew.

<!-- maintainer -->

**Quality:** draft 2026-04-29 (Pass 1 — split from `three-retrievers-three-minds.md` 2026-04-29; sim/eval not yet run on the split form)

**Role in Module 3:** Third exercise (after `name-your-crux` + `three-retrievers-one-curator`). Reads the curated `memory/` from the previous exercise; produces the `## Answer` section in `./crux.md`. Closes Module 3 with the doubt-naming beat that hands off to Module 5.

**Frameworks riffed on:**
- Rumelt's strategy kernel (synthesis spine, applied inline by the main session) — builds on the crux move Module 2's Debrief inline-named.
- Roger Martin's *what would have to be true?* — Subagent 2's spine; threaded through the curriculum's throughlines (strategy as assumptions).
- Rory Sutherland's counterintuitive reframe — Subagent 3's spine, named out loud.
- One-agent-per-recurring-workflow (Bosser stance) — within-workflow exception: 3 stance subagents earn their keep because the stances are *different stances*, not different access or dialect.

**Plug points:**
- The Rumelt kernel default — can be swapped by challenge type (StoryBrand for positioning challenges, JTBD for product/feature calls, principle of least privilege for access decisions). Swap happens in one line of the consolidated Phase 2 prompt (where the kernel-application instruction lives).
- The Rory seat — optional swap for a premortem voice (Kahneman/Klein) on risk-heavy challenges, or a JTBD interviewer on customer-facing ones. Keep three stances. Keep them genuinely different.

**Philosophy callout (sparing):**
- Belief #2 — act on the future — lands implicitly in the Close. The student just produced a real answer to their real question; the brief comes from what they're already acting on. Not named in body.

**Capability notes (confirmed):**
- Subagent launch phrasing ("spawn three subagents in parallel") confirmed as working in current Claude Code. No check owed.
- Single-prompt-spawns-three-and-synthesizes pattern: structurally sound — Claude can spawn N subagents in one tool-call burst, collate their returns, and continue with main-session work in the same response. Live-confirmed pattern in Phase 2 of the prior consolidated exercise (Antti, 2026-04-29 use of the loop).

**Deferred facilitator notes:**
- Watch-fors: (a) the synthesis (main-session inline, no separate subagent since 2026-04-29 consolidation) left under-prompted will average three stances into beige — the prompt forces conflict-naming before writing the `## Answer`, but coach any room that slips past it; (b) Rory seat produces dad jokes if the student writes "be witty" — coach toward Sutherland's actual move (reframe the problem, steal an analogy, question the anchor); (c) subagent invocation is new for most participants — demo once, then let them drive.
- Time budget: ~15 min synthesis + ~7 min Close = ~22 min total. Over 30 = the synthesis sprawled or got rewritten too many times; under 15 = the doubt-naming beat got skipped.
