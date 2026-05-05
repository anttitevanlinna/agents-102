# Exercise: Map the access surface

**Session** *(new, "Module 3 - Earn the trust")*

Start a new Claude Code session at your repo root.

```
/rename m3-access-surface
```

**What you do:** Invoke the curated access-control analysis skill on the small feature you brought to Module 3. Read what the skill surfaces. Decide, on the record in your repo, which surface it called out harder than you would have, and which surface you know matters that the skill didn't catch. Ship the delta as notes the STRIDE exercise will consume next.

**What happened:** The access-control analysis skill runs a structured pass across the feature: user boundaries, trust boundaries, data flows, tool/connector calls, external integration points, authorization checkpoints. It produces a surface map. You read it against your own knowledge of the feature and decide what's missing or wrong. Your delta is the artifact, not the raw skill output.

**The point:** STRIDE without an access-surface map is pub-quiz threat modeling. Before you threat-model, you map what you're protecting. The curated skill does the breadth; you own the codebase-specific judgment that the skill can't have.

**Time:** 20 minutes.

---

## Phase 1: invoke the skill (~7 min)

Start a new Claude Code session at your repo root. The `access-control-analysis` skill was installed as a personal skill during prework, so Claude Code auto-discovers it by name.

First, see what skills your Claude has loaded. In the Claude Code chat, type:

```
/skills
```

You should see `access-control-analysis` and `stride` listed under **User**. (If they don't, the prework install didn't land, see prework Step 4.) The Project list is whatever this repo ships; User is your personal skills. Skills you author later in M3 will land in User too.

Then ask Claude to fill in what `/skills` doesn't show.

**Prompt** *(Claude Code)*

```
List my installed skills. Tell me also their storage location and whether or not they are loaded onto context.
```

Worth a moment of looking, these are the moves Claude has on hand for the rest of this module, and the load-on-invoke behavior matters for context economy later.

Ask Claude to invoke the access-control-analysis skill on the feature you'll name after the colon, and save the surface map to a temp directory.

**Prompt** *(Claude Code)*

```
Invoke the access-control-analysis skill on the feature I'll name. Save the surface map to a temp directory and tell me the path. Use the skill's default output shape; don't prompt me to customize.

The feature is:
```


Answer the one-sentence feature question. Let the skill run. It'll read the code, walk the surfaces, and produce the map. You watch.

## Phase 2: walk the map in conversation (~3 min)

Ask Claude to walk you through the surface map in chat (categories, key findings, ambiguous spots) so you've seen the structured read before deciding your deltas in Phase 3.

**Prompt** *(Claude Code)*

```
Read the surface map you wrote at the path you told me. Walk me through it in chat: what categories of surface you found, the two or three findings that stood out most, and any surface you flagged as ambiguous. Concise — this primes me for the deltas I'll tell you in the next phase.
```

## Phase 3: write the delta (~7 min)

Now you decide.

Ask Claude to integrate the surface the skill called out harder than you would have into the map.

**Prompt** *(Claude Code)*

```
Update the surface-map file in the temp directory to integrate the delta below — pull the item to the top of its category and explain in one line why this codebase's deployment model elevates it. Show me the diff.

The surface the skill called out harder than I would have:
```

Then ask Claude to add the surface the skill missed but you know matters.

**Prompt** *(Claude Code)*

```
Add a new surface to the map that the skill didn't catch but matters in this codebase. One sentence on what it is, one sentence on why the skill missed it (likely codebase-specific: framework, deployment model, team convention). Show me the diff.

The surface the skill missed that I know matters is:
```


Answer. Push back on the sharpening question until the reason names something specific to your codebase. *"The billing webhook re-hits the queue on retry, so the same event gets reprocessed"* beats *"webhooks need auth."*

## Phase 4: handoff check (optional, up to ~3 min)

You're about to hand this map to the STRIDE skill. Glance at it. If a teammate landing on this file cold would miss something the map assumes you know, add a one-line context header. If it reads, close.

Most students skip this. Some want the pause. Your call.

---

## What this sets up

The STRIDE exercise invokes the curated STRIDE skill on the map you just built. The surface map IS the input. If you rushed Phase 2, STRIDE will threat-model a thin map; if you sat with it, STRIDE has something real to chew on.

<!-- maintainer -->


**Quality:** compendium-audited 2026-04-27 (check_writing, check_student_facing #14 + #24, check_prompts §1(d), check_pedagogy, check_platform_and_boundaries)
- compendium-audited 2026-04-27 (this cycle: P1 + P3 prompts reshaped to open-hook per §1(d); "list my installed skills" platform claim softened; M3 audit GO with todos)
- earlier compendium-audited entries — superseded
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Meta (trainer):**
- **Time:** 20 minutes (7 / 3 / 7 / 3)
- **Primary Bloom's level:** Apply + Evaluate
- **Mood target:** earned trust, opening beat. Student leaves the exercise with *"a curated skill did breadth I wouldn't have; I named what only I could name."* Watch for: passivity (*"skill ran, fine"*). Diagnostic: the delta section has 0 entries or generic ones. Fix: Nerd pushes Phase 3 harder.

**Push-back moves** (trainer delivers in cohort; Nerd delivers only in self-study):
- **P1 blocker — student can't point Claude at the feature.** Nerd runs a three-question conversation: *"which file is the feature mostly in?"* → *"which files does it call or get called by?"* → *"is there an external boundary — webhook, API, queue?"*
- **P1 skill-invocation confusion.** Nerd: *"the skill was installed as a personal skill at prework; Claude Code auto-discovers it by name. You don't need a path. Just name the feature in one sentence and let the skill run as a subagent."*
- **P2 skip (student starts typing immediately after skill finishes).** Nerd interrupts: *"three minutes, read the map first. The delta is the teaching moment, not the skill output."*
- **P3 generic delta entry.** Nerd: *"is that reason true for this codebase, or true for any codebase? sharpen to something your codebase has that a generic stack wouldn't."*
- **P3 zero misses.** Student reports the skill caught everything. Nerd: *"that's rare. Look again at the part of your feature you'd describe as 'the weird bit.' Often that's where the skill's generic pass is thinnest."*
- **P4 rush.** Student declares done in 15 min. Nerd: *"read the map as if you were the engineer who didn't write the feature. Does it read?"*

**Watch-fors:**
- Feature sprawl from Connections carries in — student can't point the skill at a single feature. Redirect to a sliceable sub-part.
- Skill output is thin because the feature is tiny. That's a Connections-stage miss; compress this exercise to 15 min and push into STRIDE, flag at Debrief.
- Skill output is overwhelming because the feature is large. Also a Connections miss; focus student on *the surfaces most likely to be reviewed by your staff engineer*.

**Plug points:**
- Student's own feature (from Connections)
- Curated access-control analysis skill — ships in content folder at `content/skills/access-control-analysis/SKILL.md`, installed to `~/.claude/skills/access-control-analysis/SKILL.md` at prework.

**Scratch path:** Claude picks a temp directory for the student's OS (`$TMPDIR`, `/tmp`, or equivalent) and reports the absolute path back. Kept deliberately outside the repo — this is session scratch, not memory. M4 teaches the durable tier (`.claude/memory/`); the contrast between `/tmp/`-tier ephemeral and `.claude/memory/`-tier durable is pedagogy. No gitignore concern; nothing lives in the repo. Windows-native caveat: if a cohort lands without WSL, revisit — `%TEMP%` is fine but path conventions differ.
