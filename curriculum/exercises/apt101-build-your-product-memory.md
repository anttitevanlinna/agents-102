# Exercise: Build your product *memory*

**Time:** 45 minutes.

**What you do:**

A chat forgets. A memory remembers.

Each of you builds a memory from your own material, on your own laptop, pointed at the bet. The product owner brings the analytics, the decisions and the roadmap notes. The designer brings the interviews and the usability notes. The team lead brings the tickets, the retro notes and what the team learned building the last thing. Three memories, one bet, three seats.

The empty `sources/`, `memory/` and `agents/` folders are already in your training folder from prework. Keep the same <span class="rt-code">session</span><span class="rt-cowork">task</span> running. Claude still has your brief, and `./challenge.md` is on disk.

**Through the door.** Only what `team/what-goes-in.md` lets in goes in. The door you agreed decides. Anything it keeps out stays out.

## Phase 1: Curate, ingest, build

*25 min*

A memory is only as good as what goes into it. The temptation is to shovel in whatever is nearest. Three steps: Claude helps you curate a plan, then pulls the content into `sources/`, then builds `memory/` from what is on disk.

Several prompts read all of `sources/` or `memory/` at once. If one starts reading the world, stop it, steer narrower, then say *"continue"*. A hard cap helps: *"ten sources at most."*

## Curate the source plan

Ask Claude to survey what it can reach and ask about your world, then propose a curation plan.

{{prompt:build-your-challenge-memory-1}}

Answer for your own seat. Push back, sharpen, add what's missing. Hold each item against the door: if it isn't on the *in* list, it isn't in the plan.

## Ingest the sources

<span class="rt-cli">Claude Code CLI reads any path you name. For sources outside the training folder, give Claude the absolute path; it reads the file directly.</span><span class="rt-desktop">Claude Code Desktop reads files you attach via the **+** button at the prompt. For sources outside the training folder, attach them with **+** before sending the prompt.</span><span class="rt-cowork">Cowork reads files in the working folders you've selected for this task. Add another folder (your downloads, a notes directory) via the **+** button. To attach a single file for one message, also **+**.</span>

Ask Claude to create one file in `sources/` for every source in the plan.

{{prompt:build-your-challenge-memory-2}}

Look at Claude's three lists. Anything not reachable stays a reference unless you share the file. Never type or paste content yourself; that's the agent's job. Aim for eight to ten items with real content. Stripping is the one edit you make yourself, in your own editor, before Claude sees the file. Strip what the door says to strip before you share it: names, phone numbers, the customer's company.

## Build the memory under a plan

<span class="rt-code">Turn on plan mode first. Tell Claude *"Enable plan mode."* (Or pick *Plan* from the mode dropdown, or press Shift+Tab to cycle.) Claude writes what it is about to do before touching files, and nothing is written until you say go.</span><span class="rt-cowork">Ask Claude to write a plan first. It writes what it is about to do before touching files, so you can steer before anything is written.</span>

Ask Claude to build the memory from every real-content file in `sources/`.

{{prompt:build-your-challenge-memory-3}}

Read the plan. Does the topic split match how you actually think about your customers and the bet? If two topics should be one, say so. If the riskiest assumption from the bet has no topic, ask for one. Then approve.

## Phase 2: Find the soft pages

*5 min*

Ask Claude to audit its own pages for generic top claims.

{{prompt:build-your-challenge-memory-4}}

Could a competitor's memory carry this top claim? If yes, it's soft. That list is your first quality check.

## Phase 3: Make it sharper, not longer

*8 min*

Pick one source that fills a gap the soft pages showed: the interview you skipped, last month's ticket export, the analytics query you meant to save. Check it against the door first.

Ask Claude to integrate the new source into the memory, then paste the link or path after the `New source:` line.

{{prompt:build-your-challenge-memory-7}}

Read Claude's report. Push back if a claim "got sharper" but the top didn't change. Read the dropped claim too. A claim the agent cut is a decision you should see.

## Phase 4: Let it find its own problems

*4 min*

Ask Claude to review the memory for contradictions, missing sources and stale pages.

{{prompt:build-your-challenge-memory-8}}

Approve some, reject some. The memory is now the version you steered, not the version Claude landed alone.

## Phase 5: Compare seats

*3 min*

Laptops half shut. Each of you reads out the top claim of your strongest page, and one soft page. Three memories built on one bet came out different. Where they disagree about the customer, say so out loud, and don't settle it yet.

## Take stock of the memory

**What happened:**

Three memories, built through one door, from three people's own material. Each claim points at a source you chose. Each of you can name a page that came out sharp and a page that came out soft.

**What's next:**

The memory sits still until something reads it. Next, each of you gives it a job.

<!-- maintainer -->

**Quality:** compendium-audited 2026-10-08 (writing@03787e69 story@6d12f3e4 technical@a16b0c55 behavior@dd243e74 pedagogy@03787e69 strategy@8f78989b slides@bb791683)
- judges @a16b0c55: writing PASS (4 findings see instances/agentic-product-teams-101--exercise--apt101-build-your-product-memory.writing.json), story PASS (1 finding see instances/agentic-product-teams-101--exercise--apt101-build-your-product-memory.story.json), technical PASS (1 finding see instances/agentic-product-teams-101--exercise--apt101-build-your-product-memory.technical.json), behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Role in Day 1:** beat 6, after lunch; each person's own material becomes a memory pointed at the bet. Day 2's overnight digest and every Day 2 prompt read it.

**Reuse:** keys `build-your-challenge-memory-1`, `-2`, `-3`, `-4`, `-7`, `-8` (`-5` and `-6` are used in `apt101-send-it-off`; `-9` is not used in this training). Framing in prose: "challenge" = the bet seen from this person's seat; the "revisit after Module 4" line in `-1` is overridden by the door.

**Frameworks:** none named in body; the three layers (sources, memory, rules file) and "sharper, not longer" are named by *Your material is the moat* after, so the take-stock section stops at what each person saw.

**Artefacts:** produces `sources/`, `memory/` (cited topic pages, `memory/index.md`), `memory/soft-pages.md`, all personal. Consumes `./challenge.md`, `team/what-goes-in.md`, `team/bet.md`. Read by `apt101-send-it-off` and every Day 2 prompt.

**Role moves:** each role brings its own material (product owner: analytics, decisions; designer: interviews, usability notes; team lead: tickets, retros, build lessons). Phase 5 lays the three memories side by side without settling the disagreement; Day 2 *gather the evidence* picks it up.

**Per-phase failure mode + escape hatch:** Phase 1 runs long on ingest → cap at ten sources, imperfect is fine; material outside the door creeps in → the plan line is checked against `team/what-goes-in.md` before ingest; Phase 2 the audit calls every page fine → ask for the two pages a competitor could also have written; Phase 3 "longer not sharper" → push back on the top; Phase 4 the review lists only small fixes → ask which contradiction it would fix first; Phase 5 turns into a debate → the trainer stops it at three minutes, the disagreement is Day 2's input.

**Prerequisite:** prework created `~/Documents/apt101/` with empty `sources/`, `memory/`, `agents/`.

**Leap test:** on Monday each person (1) has a cited memory their agents read; (2) can name one soft page and what source would sharpen it; (3) checks a memory claim against its `[sources/…]` citation before repeating it.

**View summary:** Each person builds a memory from their own material, through the door the team agreed, pointed at the bet, then finds its soft pages and makes it sharper. The artefact is three personal memories every agent reads from here on.
