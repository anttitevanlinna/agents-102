# Exercise: Prework before Module 3

**What you do:**

Two reads. Together, 30–40 minutes. Both prime moves the Module 3 exercise leans on. Neither asks you to build anything. Just to arrive with your eyes calibrated.

**Reading 1. Five practitioners, automating their life.**

Before you build multi-agent, see what a single well-shaped agent already does in the wild. Not toy demos. Working practitioners who've folded **Claude Code** and **OpenClaw** (the open-source counterpart to Claude Code in the agent-coding space) into daily research, writing, shipping. You don't need to install OpenClaw for anything in this training; you're just seeing how practitioners pick between the two.

Five people worth knowing. **Pick three. Read one piece each.**

1. **Simon Willison** (*simonwillison.net*). Daily public journal of using Claude Code, OpenClaw, and his own `llm` CLI on real projects: Datasette, research notes, blog automation. Browse the recent "Claude Code" and "OpenClaw" tags.
2. **Andrej Karpathy** (*karpathy.ai + X.com/karpathy*). Showed you the LLM Wiki pattern already in Module 2 prework; has been publicly comparing Claude Code and OpenClaw on coding-agent workflows (including the recent Fortune interview on "the loopy era of AI"). Look at his recent threads and podcast appearances.
3. **Thorsten Ball** (*thorstenball.com + the Sourcegraph blog*). Direct, opinionated Claude Code vs. OpenClaw comparisons from someone who ships tooling for both. Read his most recent piece.
4. **Mitchell Hashimoto** (*mitchellh.com*). HashiCorp founder, now Ghostty. Writes candidly about using Claude Code as daily driver on his own codebases and poking at OpenClaw for self-hosted work. Find his "how I use Claude Code" posts.
5. **Geoffrey Huntley** (*ghuntley.com*). Long-form on agentic coding and personal workflow automation; OSS-leaning, so OpenClaw shows up. Read his most recent "agents" piece.

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

For the full reference, search *"<span class="rt-code">Claude Code subagents</span><span class="rt-cowork">Cowork agents</span>"* in Anthropic's docs or open Claude's in-app help. You're after the shape: *helper with instructions, own context, returns a result. You summon it by asking.*

**What to bring to class:** the three one-line practitioner takeaways. That's it. Module 3 runs on the memory you already built in Module 2.

**Time:** 30–40 minutes total. 25 reading, 5 noting takeaways, 10 on the <span class="rt-code">subagent</span><span class="rt-cowork">agent</span> primer.

<!-- maintainer -->

**Quality:** draft 2026-04-29 (Reading 2 forked Code/Cowork 2026-04-29 from REVISE; not yet sim-passed or mechanical-tested)

**Frameworks riffed on:**
- Practitioner-before-pattern — read five people doing the thing before hearing the name for the thing. Same move as Module 2's Karpathy-first sequencing.
- Ceiling-before-addition — see what ONE agent does well before adding coordination, so the cost of coordination is visible.

**Prerequisites:**
- Claude Code installed (same as prior modules).
- Module 2 completed; memory in place.
- Web access — all five practitioner sites are public.

**URL verification owed (before first delivery):**
- Confirm each of the five practitioners has a piece from the last 6 months that explicitly covers Claude Code or OpenClaw in personal-workflow terms. The names and domains are solid; specific recent titles should be captured closer to delivery so freshness holds. Karpathy is anchored by the Mar 21 2026 Fortune piece ("state of psychosis — OpenClaw") + the No Priors podcast episode — both logged in `continuous-research/findings/archive/`. For the other four, run a quick per-practitioner crawl to confirm a recent OpenClaw-adjacent or dual-tool piece; swap any whose recent output has drifted.
- Subagent documentation URL — find the current Anthropic docs URL and either link it directly or update the "search for..." instruction with the exact path. Verify via `claude-code-guide` capability check.
- OpenClaw context sentence — verify the Jensen Huang / CEO-strategy quote is current and still quotable by the time of first delivery. If NVIDIA's positioning has shifted, swap for a more current anchor.

**Capability notes (confirmed, no check owed):**
- Subagent launch phrasing ("Launch a subagent to…" / "Launch these three subagents in parallel") confirmed by Antti as working reliably in current Claude Code — no `claude-code-guide` check needed.
- The visible UI element label ("Task block" vs "Agent block") may vary between CLI and desktop; accept variance in student-facing copy.

**Watch-fors:**
- Participant goes deep on one practitioner and skips the other two — fine; three takeaways from one piece is less valuable than one takeaway from each of three, but better than a skim of all five. Coach in the Module 3 opening Connections: "which practitioner surprised you most?"
- Participant treats the subagent primer as configuration doc-reading and tries to memorize the frontmatter schema — redirect: "shape, not syntax. You'll paste prompts tomorrow, not write YAML."
- Participant hits a paywall or dead link on one of the practitioner sites — swap for another from the list; the shape of the exercise survives with any three.

**Why this composition (vs. alternatives):**
- Karpathy's LLM Wiki was Module 2 prework; listed here but NOT the assigned single piece — keeps the Module 2 reading distinct and primes students to read something of his *other* than the Wiki post. The Fortune "loopy era of AI" / OpenClaw interview (Mar 21 2026) is the target.
- The five selected span: tooling-maker (Ball), builder (Hashimoto), researcher-communicator (Willison), teacher-researcher (Karpathy), workflow-practitioner (Huntley). Different vantage points on the same "one agent, real work" move; all plausibly dual-tool (Claude Code + OpenClaw) though per-practitioner verification is in the URL-verification block above.
- Alternative candidates considered but not selected: Matt Pocock (too novice-angled — Module 2 prework already cites his plan-mode video), Steve Yegge (Sourcegraph, adjacent to Ball — duplication), Armin Ronacher (strong candidate — swap-in if any of the five drifts or doesn't actually cover OpenClaw).
- OpenClaw anchors: `continuous-research/findings/archive/computer-use-and-nordic-signals-march-24-2026.md` (positions OpenClaw as the OSS fourth path alongside Claude Code Computer Use, OpenAI Operator, Perplexity Computer), `continuous-research/findings/archive/cycle-70-march-24-2026-h18.md` + `practitioner-signals-march-2026-cycle-update.md` (Karpathy's Fortune piece + No Priors podcast), `continuous-research/platform-watch/cross-platform/runs/2026-03-22-cycle48.md` (ClawHub supply-chain incidents — CVE-2026-25253). Research exists; the prework can lean on it.

**Deferred per student-facing-first rule:**
- Facilitator notes: Module 3 opening Connections can start with "which practitioner surprised you most?" as a warm entry into the multi-agent frame.
- Variant note: for the Mid-Management training, replace the subagent primer with a higher-level reading on team-scale agent coordination (reuse the practitioner list as-is; the "ceiling" calibration holds).
