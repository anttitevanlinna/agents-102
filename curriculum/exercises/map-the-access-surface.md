# Exercise: Map the access surface

**What you do:** Invoke the curated access-control analysis skill on the small feature you brought to Module 3. Read what the skill surfaces. Decide, on the record in your repo, which surface it flagged that you'd underweighted, and which surface you know matters that the skill didn't catch. Ship the delta as notes the STRIDE exercise will consume next.

**What happens:** The access-control analysis skill runs a structured pass across the feature: user boundaries, trust boundaries, data flows, tool/connector calls, external integration points, authorization checkpoints. It produces a surface map. You then sit with the map for three minutes and decide what's missing or wrong. Your delta is the artifact, not the raw skill output.

**The point:** STRIDE without an access-surface map is pub-quiz threat modeling. Before you threat-model, you map what you're protecting. The curated skill does the breadth; you own the codebase-specific judgment that the skill can't have.

**Time:** 20 minutes.

---

## Phase 1: invoke the skill (~7 min)

Start a new Claude Code session at your repo root, with the content folder already unzipped from prework (`content/skills/access-control-analysis/` is where the curated skill lives).

**Prompt** *(copy → Claude Code)*

```
Use the access-control-analysis skill at content/skills/access-control-analysis/ to analyse the feature I'm shipping. The feature is [name the feature in one sentence, e.g., "the webhook handler for billing events in src/billing/webhooks.ts"]. Read the skill's instructions, then run it against the feature's code and any adjacent files the skill tells you to read.

Produce the surface map the skill asks for. Save it at content/m3-working/access-surface.md so I can read it alongside you.
```

*(end of prompt)*

Let the skill run. It'll read the code, walk the surfaces, and produce the map. You watch.

## Phase 2: sit with the map (~3 min)

Open the file. Read it end to end without typing anything. Your instinct is going to be to scan; don't. Read.

While you read, hold two questions in mind:

- Which surface did the skill flag that I'd underweighted? (The one that made you go *"oh, that's actually exposed"*.)
- Which surface do I know matters that the skill missed? (The one where your codebase knowledge beats the skill's breadth.)

## Phase 3: write the delta (~7 min)

Now you decide.

**Prompt** *(copy → Claude Code)*

```
I read the access surface map. I'm going to tell you two things, one at a time:

First: which surface the skill flagged that I'd underweighted, and why it matters in this codebase specifically. Ask me after I answer if the reason I gave is codebase-specific or generic; if generic, push me to sharpen it.

Second: which surface the skill missed that I know matters, with the reason I know.

Ask for the first answer. Wait. Then ask for the second.

When you have both, add them to content/m3-working/access-surface.md in a section called "Codebase-tuned delta". Integrate, don't append a loose list. This is the map STRIDE will consume in the next exercise.
```

*(end of prompt)*

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

**Agentic Nerd logic:**
- **P1 blocker — student can't point Claude at the feature.** Nerd runs a three-question conversation: *"which file is the feature mostly in?"* → *"which files does it call or get called by?"* → *"is there an external boundary — webhook, API, queue?"*
- **P1 skill-invocation confusion.** Nerd: *"the skill's SKILL.md tells the agent what to read and how; you don't need to know — you just point Claude at the skill directory and name the feature."*
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
- Curated access-control analysis skill (`content/skills/access-control-analysis/`) — see Pass 2/3 skill authorship TODO

**TODO (Pass 3):**
- Write `content/skills/access-control-analysis/SKILL.md` — Bosser-curated from Saltzer & Schroeder lineage + Shostack's threat-modeling adjacency.
- Worked-example output snippet (what a "surface map" actually looks like for a realistic feature). Defer to first sim.
- Verify `content/m3-working/` as the in-session scratch path — or should working files land in the student's repo directly? Check against delivery architecture (no training-dir state rule). Resolution: `content/m3-working/` is acceptable because the delta feeds Ex2 in-session and doesn't need to persist. Alternative: land the map at `.claude/scratch/m3/access-surface.md` in the student's repo. Pick before first cohort.
- Three-persona simulation.
