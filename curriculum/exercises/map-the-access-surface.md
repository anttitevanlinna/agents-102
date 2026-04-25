# Exercise: Map the access surface

**What you do:** Invoke the curated access-control analysis skill on the small feature you brought to Module 3. Read what the skill surfaces. Decide, on the record in your repo, which surface it flagged that you'd underweighted, and which surface you know matters that the skill didn't catch. Ship the delta as notes the STRIDE exercise will consume next.

**What happens:** The access-control analysis skill runs a structured pass across the feature: user boundaries, trust boundaries, data flows, tool/connector calls, external integration points, authorization checkpoints. It produces a surface map. You read it against your own knowledge of the feature and decide what's missing or wrong. Your delta is the artifact, not the raw skill output.

**The point:** STRIDE without an access-surface map is pub-quiz threat modeling. Before you threat-model, you map what you're protecting. The curated skill does the breadth; you own the codebase-specific judgment that the skill can't have.

**Time:** 20 minutes.

---

## Phase 1: invoke the skill (~7 min)

Start a new Claude Code session at your repo root. The `access-control-analysis` skill was installed as a personal skill during prework, so Claude Code auto-discovers it by name.

Before you invoke, confirm it's there. Ask Claude: *"list my installed skills."* You should see `access-control-analysis` and `stride`. If not, prework's install step didn't finish; re-run it before continuing.

Ask Claude to invoke the access-control-analysis skill on the feature you brought to M3 and save the surface map to a temp directory of its choosing.

**Prompt** *(Claude Code)*

```
Invoke the access-control-analysis skill as a subagent against the feature I brought to Module 3. First ask me to name the feature in one sentence: which file it mostly lives in, what it does, what the external or user-facing surface is. Wait for my answer.

Then run the skill in a fresh-context subagent so its structured pass doesn't pollute this thread. When it returns, save the surface map to a session-scratch location OUTSIDE this repo. Pick a sensible temp path for my OS (something under $TMPDIR, /tmp, or equivalent), create the directory, and tell me the absolute path. This is scratch, not memory; it doesn't belong in the repo.
```


Answer the one-sentence feature question. Let the skill run. It'll read the code, walk the surfaces, and produce the map. You watch.

## Phase 2: walk the map in conversation (~3 min)

Ask Claude to walk you through the surface map in chat — categories, key findings, ambiguous spots — so you've seen the structured read before deciding your deltas in Phase 3.

**Prompt** *(Claude Code)*

```
Read the surface map you wrote at the path you told me. Walk me through it in chat: what categories of surface you found, the two or three findings that stood out most, and any surface you flagged as ambiguous. Concise — this primes me for the deltas I'll tell you in the next phase.
```

## Phase 3: write the delta (~7 min)

Now you decide.

Ask Claude to interview you for the two deltas and integrate them into the map.

**Prompt** *(Claude Code)*

```
I read the access surface map. I'm going to tell you two things, one at a time:

First: which surface the skill flagged that I'd underweighted, and why it matters in this codebase specifically. Ask me after I answer if the reason I gave is codebase-specific or generic; if generic, push me to sharpen it.

Second: which surface the skill missed that I know matters, with the reason I know.

Ask for the first answer. Wait. Then ask for the second.

When you have both, add them to the surface map file you wrote earlier (the path you told me) in a section called "Codebase-tuned delta". Integrate, don't append a loose list. This is the map STRIDE will consume in the next exercise.
```


Answer. Push back on the sharpening question until the reason names something specific to your codebase. *"The billing webhook re-hits the queue on retry, so the same event gets reprocessed"* beats *"webhooks need auth."*

## Phase 4: handoff check (optional, up to ~3 min)

You're about to hand this map to the STRIDE skill. Glance at it. If a teammate landing on this file cold would miss something the map assumes you know, add a one-line context header. If it reads, close.

Most students skip this. Some want the pause. Your call.

---

## What this sets up

The STRIDE exercise invokes the curated STRIDE skill on the map you just built. The surface map IS the input. If you rushed Phase 2, STRIDE will threat-model a thin map; if you sat with it, STRIDE has something real to chew on.

<!-- maintainer -->

**Meta (trainer):**
- **Time:** 20 minutes (7 / 3 / 7 / 3)
- **Primary Bloom's level:** Apply + Evaluate
- **Mood target:** earned trust, opening beat. Student leaves the exercise with *"a curated skill did breadth I wouldn't have; I named what only I could name."* Watch for: passivity (*"skill ran, fine"*). Diagnostic: the delta section has 0 entries or generic ones. Fix: Nerd pushes Phase 3 harder.
- **Quality:** compendium-audited 2026-04-25 (check_writing v2026-04-25 voice-quartet, check_student_facing v2026-04-25 agent-vocab + #21 sharpened, check_pedagogy v2026-04-25 progression-with-variations, check_prompts)

**Push-back moves** (trainer delivers by default in cohort; Nerd delivers in self-study and opt-in cohort):
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
