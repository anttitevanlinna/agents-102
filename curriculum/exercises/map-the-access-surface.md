# Exercise: Map the access surface

**Time:** 20 minutes.

**Window:** *m3-security* (the main lane from *Open the side quest*; m3-quality stays parked).

**What you do:** Invoke the curated access-control analysis skill on the small feature you brought to Module 3. Read what the skill surfaces. Decide, on the record in your repo, which surface it called out harder than you would have, and which surface you know matters that the skill didn't catch. Ship the delta as notes the STRIDE exercise will consume next.

**The point:** STRIDE without an access-surface map is pub-quiz threat modeling. Before you threat-model, you map what you're protecting. The curated skill does the breadth; you own the codebase-specific judgment that the skill can't have.

---

## Phase 1: invoke the skill

The `access-control-analysis` skill was installed as a personal skill during prework, so Claude Code auto-discovers it by name in the m3-security session.

First, see what skills your Claude has loaded. In the Claude Code chat, type:

```
/skills
```

You should see `access-control-analysis` and `stride` listed under **User**. (If they're missing, check prework Step 4.) The Project list is whatever this repo ships; User is your personal skills. Skills you author later in Module 3 will land in User too.

Then ask Claude to fill in what `/skills` doesn't show.

{{prompt:map-the-access-surface-1}}

Worth a moment of looking, these are the moves Claude has on hand for the rest of this module, and the load-on-invoke behavior matters for context economy later.

Ask Claude to invoke the access-control-analysis skill on the feature you'll name after the colon, and save the surface map to a temp directory.

{{prompt:map-the-access-surface-2}}


Paste a plan path, a ticket link, a design-doc path, or the feature description, Claude reads whatever you give it. Then send. Claude will narrate what the skill is doing before the map appears; skip past the opening and look for the saved path when it lands. The skill walks the surfaces and produces the map. You watch.

## Phase 2: walk the map in conversation

Ask Claude to walk you through the surface map in chat (categories, key findings, ambiguous spots) so you've seen the structured read before deciding your deltas in Phase 3.

{{prompt:map-the-access-surface-3}}

## Phase 3: write the delta

Now you decide which surface goes on each side of the delta. Two reads:

- Where did the map flag something you'd have under-weighted? Lower-risk in your read, higher-risk in the skill's.
- What's missing that you know matters? Often the "weird bit" of your feature, the part you'd describe as not-quite-standard.

If neither is obvious from a quick scan, ask Claude in chat to propose two or three candidates per side with a one-line reason each. Pick from those, push back if the reasons read generic.

Ask Claude to integrate the surface the skill called out harder than you would have into the map.

{{prompt:map-the-access-surface-4}}

Then ask Claude to add the surface the skill missed but you know matters.

{{prompt:map-the-access-surface-5}}


Answer. Push back on the sharpening question until the reason names something specific to your codebase. *"The billing webhook re-hits the queue on retry, so the same event gets reprocessed"* beats *"webhooks need auth."*

## Phase 4: handoff check

You're about to hand this map to the STRIDE skill. Glance at it. If a teammate landing on this file cold would miss something the map assumes you know, add a one-line context header. If it reads, close.

Most people skip this. Some want the pause. Your call.

---

**What happened:** You ended with a short delta-note in your repo: the surfaces the skill called out harder than you would have, and the surfaces you knew mattered that the skill didn't catch. The delta is the artifact, not the raw skill output.

## What this sets up

The STRIDE exercise invokes the curated STRIDE skill on the map you just built. The surface map IS the input. If you rushed Phase 2, STRIDE will threat-model a thin map; if you sat with it, STRIDE has something real to chew on.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-22 (writing@1a9e10b story@1a9e10b technical@1a9e10b behavior@1a9e10b pedagogy@1a9e10b strategy@1a9e10b)
- judges @1a9e10b: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Meta (trainer):**
- **Time:** 20 minutes (7 / 3 / 7 / 3)
- **Primary Bloom's level:** Apply + Evaluate
- **Mood target:** earned trust, opening beat. Student leaves the exercise with *"a curated skill did breadth I wouldn't have; I named what only I could name."* Watch for: passivity (*"skill ran, fine"*). Diagnostic: the delta section has 0 entries or generic ones. Fix: trainer pushes Phase 3 harder.

**Push-back moves:**
- **P1 blocker — student can't point Claude at the feature.** Trainer runs a three-question conversation: *"which file is the feature mostly in?"* → *"which files does it call or get called by?"* → *"is there an external boundary — webhook, API, queue?"*
- **P1 skill-invocation confusion.** Trainer push: *"the skill was installed as a personal skill at prework; Claude Code auto-discovers it by name. You don't need a path. Just name the feature in one sentence and let the skill run as a subagent."*
- **P2 skip (student starts typing immediately after skill finishes).** Trainer interrupts: *"three minutes, read the map first. The delta is the teaching moment, not the skill output."*
- **P3 generic delta entry.** Trainer push: *"is that reason true for this codebase, or true for any codebase? sharpen to something your codebase has that a generic stack wouldn't."*
- **P3 zero misses.** Student reports the skill caught everything. Trainer push: *"that's rare. Look again at the part of your feature you'd describe as 'the weird bit.' Often that's where the skill's generic pass is thinnest."*
- **P4 rush.** Student declares done in 15 min. Trainer push: *"read the map as if you were the engineer who didn't write the feature. Does it read?"*

**Watch-fors:**
- Feature sprawl from Connections carries in — student can't point the skill at a single feature. Redirect to a sliceable sub-part.
- Skill output is thin because the feature is tiny. That's a Connections-stage miss; compress this exercise to 15 min and push into STRIDE, flag at Debrief.
- Skill output is overwhelming because the feature is large. Also a Connections miss; focus student on *the surfaces most likely to be reviewed by your staff engineer*.

**Plug points:**
- Student's own feature (from Connections)
- Curated access-control analysis skill — ships in content folder at `content/skills/access-control-analysis/SKILL.md`, installed to `~/.claude/skills/access-control-analysis/SKILL.md` at prework.

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the student exhibits on their own codebase by the next working day):
1. **Invokes the access-control-analysis skill as a subagent on a real PR or feature before code review.** Falsifiable: PR comment quotes the skill's structured output, or a commit message references a surface the skill flagged.
2. **Writes a delta note that names one surface the skill called out harder than expected AND one surface the skill missed.** Falsifiable: a delta artifact in the repo (file, PR description, or scrollback paste) with both shapes present, not generic ("webhooks need auth") but codebase-specific ("the billing webhook re-hits the queue on retry").
3. **Adds at least one codebase-specific surface to the map that the generic skill didn't catch.** Falsifiable: the delta note contains a surface entry with a one-line reason naming a codebase invariant (auth pattern, retry shape, integration boundary) the skill wouldn't know.

**Scratch path:** Claude picks a temp directory for the student's OS (`$TMPDIR`, `/tmp`, or equivalent) and reports the absolute path back. Kept deliberately outside the repo — this is session scratch, not the durable tier. M4 teaches that tier (`observations/`); the contrast between `/tmp/`-tier ephemeral and `observations/`-tier durable is pedagogy. No gitignore concern; nothing lives in the repo.
