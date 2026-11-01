# Exercise: Three minds, one synthesis

**Time:** ~22 minutes (15 min synthesis + 7 min Close).

**What you do:** Spawn three helper agents with different stances on your curated memory. The main session synthesizes their notes into `./crux.md`.

Stay in the session that wrote `./crux.md`; close the retriever sessions. Wait for `memory/_synthesis-m3.md` to be written.

If a helper starts reading the world, stop it, steer narrower, then say *"continue"*.

<div class="rt-code">

Ask the agent to spawn three helpers with different stances, then apply Rumelt's kernel to synthesize their notes into `./crux.md`.

{{prompt:three-minds-one-synthesis-1}}

</div>
<div class="rt-cowork">

Ask the agent to spawn three helpers with different stances, then apply Rumelt's kernel to synthesize their notes into `./crux.md`.

{{prompt:three-minds-one-synthesis-2}}

</div>

The answer often comes with a long issue list. If the volume is in the way, ask the agent to choose the fixes that aim for optimal function in the next session.

{{prompt:three-minds-one-synthesis-3}}

**Close. Does this feel right?**

Optional: ask the agent to recap the three retrievals' core claims next to your `## Answer`. You can't yet tell if it is right; that is expected. Hold the doubt, name it, don't fix it here.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story grandfathered, technical grandfathered, behavior grandfathered, pedagogy PASS, strategy PASS, slides PASS

- **Atomic — no phase markers.** One synthesis run; the Close is a move inside it, not a beat beside it. Line 3 already states the 15 + 7 split. Line 3 is authored, not generated.

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

**View summary:** You spawn three subagents inside one session, each holding a different stance against your memory, then have the main session read them back, apply a strategy kernel and write the answer. The artifact is a synthesis you cannot yet vouch for.
