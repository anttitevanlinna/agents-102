# Exercise: Prework before Module 3

**Time:** 40 minutes total. 25 reading, 5 noting takeaways, 10 on the <span class="rt-code">subagent</span><span class="rt-cowork">agent</span> primer.

**What you do:**

Two reads. Both prime moves the Module 3 exercise leans on. Neither asks you to build anything. Just to arrive with your eyes calibrated.

**Reading 1. Five practitioners, automating their work.**

Before you build multi-agent, see what a single well-shaped agent already does in the wild. Not toy demos. Working practitioners who've folded Claude Code into daily research, writing, and shipping.

Five people worth knowing. **Pick three. Read one piece each.**

1. **Simon Willison.** Browse his current [Claude Code field notes](https://simonwillison.net/tags/claude-code/). Pick one worked example where he shows the prompt, artifact, test, or correction rather than only announcing a feature.
2. **Edward Harker.** Read [How I use Claude Code](https://edwardharker.com/2026/05/16/how-i-use-claude-code/) (16 May 2026). Look for the operating routine around the agent, not a magic prompt.
3. **Armin Ronacher.** Read [The Coming Loop](https://lucumr.pocoo.org/2026/6/23/the-coming-loop/) (23 June 2026). Notice what changes when the human designs the loop and its feedback instead of driving every step.
4. **Thariq Shihipar.** Read [The unreasonable effectiveness of HTML](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html) (20 May 2026). Track why changing the review artifact changes how closely the human stays in the work.
5. **Daniel Bilsborough.** Read [Claude Code: The Practitioner's Guide](https://partner.danielbilsborough.com/claude-code) (updated 6 August 2026). Look for the plain-text memory and the boundary where consequential work still needs a person.

For each one you pick, note one thing in plain language: *what is this person automating that they used to do by hand, and what's the move that made it work?* Three bullets, one per practitioner. Keep the note somewhere you'll see on training day.

This isn't about copying their setups. It's about calibrating the ceiling: how much one agent, well-shaped, can already do. So that when Module 3 adds three more, you know what the added coordination is buying you.

**Reading 2. <span class="rt-code">Claude Code's subagents</span><span class="rt-cowork">Cowork's agents</span>, in plain language.**

Module 3 Phase 2 spawns three <span class="rt-code">subagents</span><span class="rt-cowork">agents</span> in one <span class="rt-code">session</span><span class="rt-cowork">task</span>. Ten minutes of orientation saves you from learning the mechanic cold in the room.

*What it is.* <span class="rt-code">A subagent in Claude Code</span><span class="rt-cowork">An agent in Cowork</span> is a helper the main agent dispatches to do one focused job. It gets:

- its own **instructions** (what it's for, what rules it follows);
- its own **context window** (a clean slate, so its work doesn't clutter yours);
- access to the same **filesystem** (it reads and writes in your working directory, same as the main <span class="rt-code">session</span><span class="rt-cowork">task</span>).

When the job is done, it returns a single result to the main agent and disappears. You can dispatch several in parallel.

*How to launch one.* You don't type a special command. You ask Claude, in plain language, to use one. *"Launch <span class="rt-code">a subagent</span><span class="rt-cowork">an agent</span> to review the three retrieval files and write its take to `module-3/stances/planner.md`."* Claude picks it up and dispatches. To run several at once: *"Launch these three <span class="rt-code">subagents</span><span class="rt-cowork">agents</span> in parallel,"* and list them. Claude fires them together, waits for all three to return, then continues.

*What you'll see.* While <span class="rt-code">a subagent</span><span class="rt-cowork">an agent</span> is working, it appears in your transcript as a running **Task** or **Agent** block (usually collapsed, with a short description of what it's doing). You can't chat with it; it's running its own conversation separately. When it finishes, the block closes with a short result, and Claude's main <span class="rt-code">session</span><span class="rt-cowork">task</span> picks up from there. In the Phase 2 exercise, three Task blocks will run side by side, each one writing a stance file to `module-3/stances/` as it completes.

*What you don't need.* You don't need to write an agent definition file for Module 3. You don't need to use the `/agents` slash command. Defining your own reusable <span class="rt-code">subagents</span><span class="rt-cowork">agents</span> is a later move; launching ones that the main <span class="rt-code">session</span><span class="rt-cowork">task</span> describes on the fly is what Phase 2 uses, and plain-language prompting is enough.

For the full reference, <span class="rt-code">open Anthropic's [subagent documentation](https://code.claude.com/docs/en/sub-agents)</span><span class="rt-cowork">open Claude's in-app help and search for *agents*</span>. You're after the shape: *helper with instructions, own context, returns a result. You summon it by asking.*

**What to bring to class:** the three one-line practitioner takeaways. That's it. Module 3 runs on the memory you already built in Module 2.

<!-- maintainer -->

- **Atomic — no phase markers.** Two readings and a takeaway note, read alone between sittings; line 3 already carries the 25 / 10 / 5 split and phase slides would chunk a reading list into a deck nobody projects. Line 3 is authored, not generated.

**Frameworks riffed on:**
- Practitioner-before-pattern — read five people doing the thing before hearing the name for the thing. Same move as Module 2's Karpathy-first sequencing.
- Ceiling-before-addition — see what ONE agent does well before adding coordination, so the cost of coordination is visible.

**Prerequisites:**
- Claude Code installed (same as prior modules).
- Module 2 completed; memory in place.
- Web access — all five practitioner sites are public.

**Source verification:**
- `[checked:2026-08-23 result:OK due:cohort]` https://simonwillison.net/tags/claude-code/ — [practitioner direct, dynamic] current worked Claude Code field notes. fallback: select one dated post from the tag before delivery.
- `[checked:2026-08-23 result:OK due:2026-11-16]` https://edwardharker.com/2026/05/16/how-i-use-claude-code/ — [practitioner direct] dated account of a working Claude Code routine. fallback: swap for another dated direct workflow account.
- `[checked:2026-08-23 result:OK due:2026-12-23]` https://lucumr.pocoo.org/2026/6/23/the-coming-loop/ — [practitioner direct] dated account of designing agent loops and feedback. fallback: keep the loop question and swap the reading.
- `[checked:2026-08-23 result:OK due:2026-11-20]` https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html — [vendor practitioner direct] Thariq Shihipar's dated account of changing the review artifact to stay in the loop. fallback: use another dated Claude Code team workflow account.
- `[checked:2026-08-23 result:OK due:cohort]` https://partner.danielbilsborough.com/claude-code — [practitioner direct, maintained] dated account of plain-text memory, long-running work, and human review boundaries. fallback: replace if the maintained page loses its visible update date.
- `[checked:2026-08-23 result:OK due:cohort]` https://code.claude.com/docs/en/sub-agents — [vendor docs, capability] isolated context, delegation, natural-language invocation, and return to the main conversation. fallback: use the documentation index at https://code.claude.com/docs/llms.txt and locate the current subagents page.

**Capability notes (confirmed, no check owed):**
- Subagent launch phrasing ("Launch a subagent to…" / "Launch these three subagents in parallel") confirmed by Antti as working reliably in current Claude Code — no `claude-code-guide` check needed.
- The visible UI element label ("Task block" vs "Agent block") may vary between CLI and desktop; accept variance in student-facing copy.

**Watch-fors:**
- Participant goes deep on one practitioner and skips the other two — fine; three takeaways from one piece is less valuable than one takeaway from each of three, but better than a skim of all five. Coach in the Module 3 opening Connections: "which practitioner surprised you most?"
- Participant treats the subagent primer as configuration doc-reading and tries to memorize the frontmatter schema — redirect: "shape, not syntax. You'll paste prompts tomorrow, not write YAML."
- Participant hits a paywall or dead link on one of the practitioner sites — swap for another from the list; the shape of the exercise survives with any three.

**Why this composition (vs. alternatives):**
- Karpathy's LLM Wiki stays distinct as Module 2 prework instead of being assigned twice.
- The five selected span researcher-communicator (Willison), product builder (Harker), framework maintainer (Ronacher), Claude Code team practitioner (Shihipar), and business operator (Bilsborough). Different vantage points on the same "one agent, real work" move.
- Mitchell Hashimoto's *My AI Adoption Journey* remains a strong alternative, but its 5 February 2026 publication date has moved just outside the six-month current-practice window. Thorsten Ball and Geoffrey Huntley remain alternatives when they publish a directly relevant, dated piece inside that window.
- Pre-2026-05-14 versions of this file framed the reading as Claude Code vs. a fabricated "OpenClaw" tool. The hallucination propagated into `continuous-research/findings/archive/` (`computer-use-and-nordic-signals-march-24-2026.md`, `cycle-70-march-24-2026-h18.md`, `practitioner-signals-march-2026-cycle-update.md`) and `continuous-research/platform-watch/cross-platform/runs/2026-03-22-cycle48.md` (referenced "ClawHub" + a fabricated CVE). Sweep those before any rebuild that leans on the archive.

**Deferred per student-facing-first rule:**
- Facilitator notes: Module 3 opening Connections can start with "which practitioner surprised you most?" as a warm entry into the multi-agent frame.
- Variant note: for the Mid-Management training, replace the subagent primer with a higher-level reading on team-scale agent coordination (reuse the practitioner list as-is; the "ceiling" calibration holds).
