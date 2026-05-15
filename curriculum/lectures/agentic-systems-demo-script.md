# An agentic system, end to end

This is a 30-minute live demo. You watch; you don't run anything yourself. The point isn't to show off a tool. The point is to make an agentic system inspectable. By the end you'll be able to describe one to a colleague, with edges, files, and a working loop.

You'll see five things.

**The folders are the system.** Before any prompt runs, the workbook you've been reading gets traced back to its source. Module files in `curriculum/`. Rule files (`CLAUDE.md`) that govern how those modules are written. A memory directory of decisions the system has compounded over time. A customer build that turns all of it into the page in front of you. The system isn't hiding anywhere. It's in folders with names.

**Rules are visible to the agent itself.** Claude is asked which rules govern Claude Basics content. The agent answers in seconds, not by guessing but by reading the same `CLAUDE.md` files a person would. The first follow-up question pulls out the audience definition that shapes the workbook's voice. The second pulls a rule you'd never have thought to ask for. The reveal: the agent isn't smart in a vague way. It's smart because the rules are written down, and it reads them.

**One agent works in the background while the demo continues.** Claude is asked to author a full Claude Basics module from an Agents 101 source. A real ten-page job that would take a person most of an afternoon. The session launches. The demo doesn't wait. The work happens while everything else continues. This is the move rollout custodians use most: launch, leave, come back.

**A small fix becomes a system change.** A real gap in this lecture gets spotted. The agent plans the change, edits the file, and proposes the rule update that would have caught the gap in the first place. Two diffs, side by side. The artifact got better, and so did the system that produces the next artifact. The word for what just happened is *compounding*.

**The pattern, named.** Inspect, plan, edit, check, build, compound. That sequence is the difference between asking Claude for help and operating a Claude system. The same moves work whether the artifact is a workbook, a policy document, or the rollout plan you'll write yourself.

If the room and the clock cooperate, five more moves lie in reserve.

**The agent grades its own work.** The session that ran in the background comes back. The agent reads what it wrote and audits it against the same rule files the system carries. It returns the three things it would fix, ranked. It doesn't fix them yet. The agent is judged by the same rules that shaped it.

**Source to customer page, one command.** A build runs against the source. Ten seconds later the deployed customer workbook carries the fix from a moment ago. No release process, no waiting on someone else. The build is part of the system.

**One source, many customers.** A small config file tells the build which customer to render: branding, audience copy, which modules ship. The same curriculum becomes twenty workbooks for twenty cohorts. The plug-in points are visible files, not a hidden CMS.

**Memory the system actually keeps.** A recent rule the system compounded for itself gets opened and walked through. What got missed before. What got added. Where it now fires next time. Chat forgets when the window closes. This writes things down.

**Six audits, at once.** One command fires six different reviewers against one file: writing, story, technical, behavior, pedagogy, strategy. They run in parallel. None waits on the others. Verdicts come back as one structured summary read in thirty seconds.

When the demo closes, the room doesn't have a new piece of software. It has a map.

<!-- maintainer -->

**Lecture meta:** *30-minute live demo for Claude Basics Module 1. Trainer drives; participants watch. Five core beats, plus five optional beats for rooms with time or specific signals. Each beat translates back to the participant's Cowork world (rules file, prompt, saved output, check, repeatable folder). Do not expand into a file-by-file repo tour.*

**Prompt spine, core (5 beats, ~20 min execution):**

**1. Show the folders (3 min, no prompt).** Open the deployed workbook in a browser. Switch to the repo. Click through `curriculum/trainings/claude-basics/`, the module file, `curriculum/lectures/`, the project-root `CLAUDE.md`, `curriculum/CLAUDE.md`, `memory/`, and `site/clients/it-bits/claude-basics/`. The reveal is map-shaped: source, rules, memory, build, deployed page, all visible folders.

**2. Rules, named by the agent (5 min, 3 short prompts).** Load content-generation context first:

> /content-creation

Then three short prompts, one at a time:

> List every rule file that applies when writing Claude Basics content. Just the map, no opening. (~30s)

> Pull the audience definition out of those. Who is this written for? (~45s)

> Pick one rule you think the room would never have guessed exists, and read it back. (~45s)

After the third answer, say one line aloud: *"the agent isn't being clever. It's reading the same files a person would."* Load-bearing translation; don't skip.

**3. Walk-away module clone (3 min, 1 prompt, runs ~8-12 min in background).** Open a second session in Cowork or Claude Code. Paste:

> Read `curriculum/trainings/agents-101/getting-going.md`. Author a Claude Basics version of it as a new draft module. Same Big Idea, reshaped for IT rollout custodians, target ~25 min. Plan first, then write. Save the draft to `curriculum/trainings/claude-basics/getting-going-draft.md`.

Launch. Switch back to the main demo. Don't wait. The work runs in the background while beat 4 happens.

**4. Fix + compound (7 min, 2 prompts).** Pick a real gap in a lecture or module file before the session: somewhere a rule didn't fire that should have. *Canonical example:* a lecture whose maintainer block doesn't carry per-section timing. Verify the gap is still real on the day; if fixed, pick another.

Prompt 1 in the main session:

> Look at `curriculum/lectures/<file>.md`. <Describe the gap.> Plan the fix first, then make it. (~90s plan + 60s edit)

Review the diff with the room. Accept.

Prompt 2:

> This kind of gap shouldn't reach the file. What rule, in which file, would catch it next time? Propose the rule update. (~90s)

Show both diffs side by side. Trainer line: *"the artifact got better, and the system that produces the next artifact got better too."*

**5. Name the pattern (2 min, no prompt).** Inspect, plan, edit, check, build, compound. Six moves. Close on: *"the difference between asking Claude for help and operating a Claude system."*

**Optional beats (pick one or two if time allows; don't try to land all five):**

**6. Return to the walk-away (+4 min, 1 prompt).**

> Audit what you just wrote against `memory/check_student_facing.md` and `memory/check_writing.md`. Call out the worst three things. Don't fix. (~90s)

Use when room energy is still tracking; cut if beats 1-5 ran long.

**7. Build the customer workbook (+3 min, 1 shell command).**

> Build the it-bits Claude Basics workbook from current source and tell me where the output lives. (~30s setup + ~10-20s shell)

Refresh the deployed page after. Use when the room is curious about how their own customer-facing material would flow end to end.

**8. One source, many customers (+3 min, 1 prompt).**

> Walk me through how the it-bits version is customised. What file controls branding, audience copy, and which modules ship? If I wanted to spin up a workbook for a different customer, what's the minimum change? (~60-90s)

Use for buyer-as-participant rooms sizing this for their own org rollout.

**9. Memory: a recent compounded rule (+3 min, 1 prompt).**

> Find the most recent rule the system learned. Open the file, read me what changed and why. (~60s)

Use when the room asks the *"but it just forgets between sessions, right?"* question. Don't volunteer otherwise.

**10. Parallel judges on one file (+5 min, 1 prompt, 6 sub-agents).**

> /curriculum-pre-ship-audit curriculum/lectures/agentic-systems-demo-script.md

While they run, narrate: *"six audits, six angles, running at the same time. None waits on the others."* When verdicts return, scan for any REVISE and translate at least one finding back to a real Cowork move. Use only with 5+ min real surplus. Network-jitter risk; don't promise it.

**Time budget:** 20 min execution (5 core beats) + 10 min slack for room reactions, network jitter, and side questions. Optional beats fit inside the slack when the room is still tracking.

**Trainer prerequisites:**
- Repo cloned, customer build for `it-bits` runnable, deployed workbook page open in a browser tab.
- Two Claude Code sessions ready (main + walk-away). If demoing in Cowork, two browser tabs.
- A real gap in mind for beat 4. Pre-verify it's still unfixed. Canonical example: a lecture missing per-section timing in its maintainer block. Alternatives: an exercise with stale phrasing the rules should have flagged, a module whose Big Idea drifted from the strategy doc.

**Quality:** compendium-audited 2026-05-15 (story@eb1168f technical@eb1168f behavior@eb1168f pedagogy@eb1168f strategy@eb1168f)
- judges @eb1168f: writing REVISE (see-instances/claude-basics--agentic-systems-demo-script.writing.json), story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Agentic systems, shown in the repo*

**Mood contract:** concrete awe. The demo should make system shape inspectable without becoming a coding lesson.
