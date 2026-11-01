# Exercise: Prework before Module 3

**Time:** 40 minutes total. 25 reading, 5 noting takeaways, 10 on the helper-agent primer.

**What you do:**

Two reads. Both prime moves the Module 3 exercise leans on. Neither asks you to build anything.

**Reading 1. Five practitioners, automating their work.**

See what a single agent already does for working practitioners who've folded coding agents into daily research, writing, and shipping.

**Pick three. Read one piece each.**

1. **Simon Willison.** Browse his current [coding-agent field notes](https://simonwillison.net/tags/claude-code/). Pick one worked example where he shows the prompt, artifact, test, or correction rather than only announcing a feature.
2. **Edward Harker.** Read his [coding-agent operating notes](https://edwardharker.com/2026/05/16/how-i-use-claude-code/) (16 May 2026). Look for the operating routine around the agent, not a magic prompt.
3. **Armin Ronacher.** Read [The Coming Loop](https://lucumr.pocoo.org/2026/6/23/the-coming-loop/) (23 June 2026). Notice what changes when the human designs the loop and its feedback instead of driving every step.
4. **Thariq Shihipar.** Read [The unreasonable effectiveness of HTML](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html) (20 May 2026). Track why changing the review artifact changes how closely the human stays in the work.
5. **Daniel Bilsborough.** Read [The Practitioner's Guide to Coding Agents](https://partner.danielbilsborough.com/claude-code) (updated 6 August 2026). Look for the plain-text memory and the boundary where consequential work still needs a person.

For each pick, note in plain language: *what is this person automating that they used to do by hand, and what's the move that made it work?* Three bullets, one per practitioner. Keep the note somewhere you'll see on training day.

The aim is to calibrate how much one agent can already do, so you know what coordinating three more buys you.

**Reading 2. Helper agents, in plain language.**

Module 3 Phase 2 spawns three helper agents in one session or task.

*What it is.* A helper agent is one the lead agent dispatches to do one focused job. It gets:

- its own **instructions** (what it's for, what rules it follows);
- its own **context window** (a clean slate, so its work doesn't clutter yours);
- access to the same **filesystem** (it reads and writes in your working directory, same as the lead session or task).

When the job is done, the helper returns a single result to the lead agent and disappears. Several can run in parallel.

*How to launch one.* Ask the lead agent in plain language: *"Launch a helper agent to review the three retrieval files and write its take to `module-3/stances/planner.md`."* For several at once: *"Launch these three helper agents in parallel,"* and list them. The lead agent waits for all three to return, then continues.

*What you'll see.* Your runtime shows a running task or agent entry with a short description for each helper. In Phase 2, each helper writes a stance file to `module-3/stances/` as it completes.

*What you don't need.* No agent definition file and no special command. Plain-language prompting is enough for Phase 2.

For the full reference, <span class="rt-claude rt-code">open the [Claude Code helper-agent documentation](https://code.claude.com/docs/en/sub-agents)</span><span class="rt-codex rt-code">open the [Codex helper-agent documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents)</span><span class="rt-copilot rt-code">open the [GitHub Copilot subagent documentation](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-custom-agents)</span><span class="rt-cowork">open the in-app help and search for *agents*</span>. You're after the shape: *helper with instructions, own context, returns a result. You summon it by asking.*

**What to bring to class:** the three one-line practitioner takeaways.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

- **Atomic — no phase markers.** Two readings and a takeaway note, read alone between sittings; line 3 already carries the 25 / 10 / 5 split and phase slides would chunk a reading list into a deck nobody projects. Line 3 is authored, not generated.

**Frameworks riffed on:**
- Practitioner-before-pattern — read five people doing the thing before hearing the name for the thing. Same move as Module 2's Karpathy-first sequencing.
- Ceiling-before-addition — see what ONE agent does well before adding coordination, so the cost of coordination is visible.

**Prerequisites:**
- An approved agent runtime installed (same as prior modules).
- Module 2 completed; memory in place.
- Web access — all five practitioner sites are public.

**Source verification:**
- `[checked:2026-08-23 result:OK due:cohort]` https://simonwillison.net/tags/claude-code/ — [practitioner direct, dynamic] current worked Claude Code field notes. fallback: select one dated post from the tag before delivery.
- `[checked:2026-08-23 result:OK due:2026-11-16]` https://edwardharker.com/2026/05/16/how-i-use-claude-code/ — [practitioner direct] dated account of a working Claude Code routine. fallback: swap for another dated direct workflow account.
- `[checked:2026-08-23 result:OK due:2026-12-23]` https://lucumr.pocoo.org/2026/6/23/the-coming-loop/ — [practitioner direct] dated account of designing agent loops and feedback. fallback: keep the loop question and swap the reading.
- `[checked:2026-08-23 result:OK due:2026-11-20]` https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html — [vendor practitioner direct] Thariq Shihipar's dated account of changing the review artifact to stay in the loop. fallback: use another dated Claude Code team workflow account.
- `[checked:2026-08-23 result:OK due:cohort]` https://partner.danielbilsborough.com/claude-code — [practitioner direct, maintained] dated account of plain-text memory, long-running work, and human review boundaries. fallback: replace if the maintained page loses its visible update date.
- `[checked:2026-08-23 result:OK due:cohort]` https://code.claude.com/docs/en/sub-agents — [vendor docs, capability] isolated context, delegation, natural-language invocation, and return to the main conversation. fallback: use the documentation index at https://code.claude.com/docs/llms.txt and locate the current subagents page.
- `[checked:2026-09-05 result:OK due:cohort]` https://learn.chatgpt.com/docs/agent-configuration/subagents — [vendor docs, capability] Codex helper-agent workflows, explicit natural-language delegation, parallel execution, and results returned to the lead task. fallback: open the current Codex documentation and locate the subagents page.

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
