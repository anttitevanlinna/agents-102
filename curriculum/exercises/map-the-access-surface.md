# Map the access surface, own the *delta*

**Time:** 20 minutes.

**Window:** the main quest window (*m3-security*).

**What you do:** Invoke the curated access-control analysis skill on the small feature you brought to Module 3. Read what it surfaces. Decide, on the record in your repo, which surface it called out harder than you would have, and which surface you know matters that the skill didn't catch. Ship the delta as notes the STRIDE exercise consumes next.

**What you build:** an access-surface map, plus the delta only you can add. Two surfaces: the one the curated skill called out harder than you would have, and the one you know matters that the skill missed. The delta is the artifact STRIDE chews on next, not the raw skill output.

**The point:** STRIDE without an access-surface map is pub-quiz threat modeling. Before you threat-model, you map what you're protecting. The curated skill does the breadth; you own the codebase-specific judgment the skill can't have.

---

## Phase 1: Run the curated skill on your feature and save the map

- **You invoke; the skill does the breadth walk.** The `access-control-analysis` skill was installed as a personal skill during prework, so Claude Code auto-discovers it by name in the m3-security session. You aren't on the hook for walking every surface. The skill and its subagent do that; you own the codebase-specific judgment the skill can't have.
- **See what skills your Claude has loaded first.** In the Claude Code chat, type:

```
/skills
```

- You should see `access-control-analysis` and `stride` listed under **User**. (If they're missing, check prework Step 4.) The Project list is whatever this repo ships; User is your personal skills. Skills you author later in Module 3 land in User too.

{{cut:map-the-access-surface-1|low-yield}}

Worth a moment of looking. These are the moves Claude has on hand for the rest of this module, and the load-on-invoke behavior matters for context economy later.

## Point the skill at your feature

Name the feature and let the skill run. Ask Claude to invoke the access-control-analysis skill on the feature you name after the colon, and save the surface map to a temp directory.

{{prompt:map-the-access-surface-2}}

Paste a plan path, a ticket link, a design-doc path, or the feature description; Claude reads whatever you give it. Then send. Claude narrates what the skill is doing before the map appears; skip past the opening and look for the saved path when it lands. The skill walks the surfaces and produces the map.

## Kick off the run, then work the other window

- **The access-control pass is a breadth walk and takes a few minutes.** That wait is the two-window move Module 3 installs: kick off a long run in one window, do active work in the other, come back when the first lands.
- **Switch to your m3-quality window now.** While the map builds in m3-security, start authoring the test-strategy skill there (Exercise 3, Phase 1). When the map lands back in m3-security, switch back to walk it and write the delta. Both windows are already open from *Open the side quest*; this is a focus switch, not a new session.

## Phase 2: Read the map back before you decide the delta

- **You're back in m3-security now; the map landed here.** The rest of this exercise runs in this window.
- **See the structured read before you decide.** Ask Claude to walk you through the surface map in chat: categories, key findings, ambiguous spots. You want the structured read in front of you before you name your deltas in Phase 3.

{{cut:map-the-access-surface-3|redundant-slot}}

## Phase 3: Add the surface the skill over-called, and the one it missed

- **You decide which surface goes on each side of the delta.** Two reads.
- **The over-call.** Where did the map flag something you'd have under-weighted? Lower-risk in your read, higher-risk in the skill's.
- **The miss.** What's missing that you know matters? Often the "weird bit" of your feature, the part you'd describe as not-quite-standard.
- **If neither is obvious from a quick scan,** ask Claude in chat to propose two or three candidates per side with a one-line reason each. Pick from those; push back if the reasons read generic.

Ask Claude to integrate the surface the skill called out harder than you would have into the map.

{{prompt:map-the-access-surface-4}}

Then ask Claude to add the surface the skill missed but you know matters.

{{prompt:map-the-access-surface-5}}

## Push back until the reason names your codebase

- **Answer, then sharpen.** Push back on the sharpening question until the reason names something specific to your codebase. *"The billing webhook re-hits the queue on retry, so the same event gets reprocessed"* beats *"webhooks need auth."*

## Phase 4: Add the context header a cold reader needs

- **You're about to hand this map to the STRIDE skill.** Glance at it. If a teammate landing on this file cold would miss something the map assumes you know, add a one-line context header. If it reads, close.
- **Most people skip this; some want the pause. Your call.**

**What happened:** You ended with a short delta-note in your repo: the surfaces the skill called out harder than you would have, and the surfaces you knew mattered that the skill didn't catch. The delta is the artifact, not the raw skill output.

## What this sets up

The STRIDE exercise invokes the curated STRIDE skill on the map you just built. The surface map IS the input. If you rushed Phase 2, STRIDE threat-models a thin map; if you sat with it, STRIDE has something real to chew on.

<!-- maintainer -->


**Quality:** compendium-audited 2026-07-08 (writing@0ef2ca6 story@1a9e10b technical@0ef2ca6 behavior@1a9e10b pedagogy@1a9e10b strategy@1a9e10b slides@47f3357)
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
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
