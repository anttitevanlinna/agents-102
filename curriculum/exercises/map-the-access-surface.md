# Map the access surface, own the *delta*

**Time:** 20 minutes.

**Window:** the main quest window (*m3-security*).

**What you do:** invoke the curated access-control skill on the feature you brought, and name what it missed.

**What you build:** an access-surface map plus the delta only you can add.

**The point:** STRIDE without an access-surface map is pub-quiz threat modeling.

---

## Take the ranked ten, leave the rest on disk

- From here on, outputs get big. The access map runs pages, the STRIDE walk after it runs longer, and soon two windows produce at once.
- The countermove from M1 goes to work: tell the agent what output you want. The prompts here route the heavy output to disk and keep the chat read short, the saved map first, then a walk-through of what stood out.
- Your read is the short list, plus the two or three entries your own knowledge of the codebase flags. The file holds the rest until a decision needs it.
- When an answer balloons into an essay anyway, say so: ranked list first, ten lines.

## Phase 1: Run the curated skill on your feature and save the map

*7 min*

- You invoke; the skill does the breadth walk. The `access-control-analysis` skill was installed as a personal skill during prework, so Claude Code auto-discovers it by name in the m3-security session.
- See what skills your Claude has loaded first. In the Claude Code chat, type:

```
/skills
```

- You should see `access-control-analysis` and `stride` listed under **User**. (If they're missing, check back where the prework extracted the bundle and installed the curated skills.) The Project list is whatever this repo ships; User is your personal skills.

Ask Claude to list its installed skills, with storage location and context-load status.

{{prompt:map-the-access-surface-1}}

These are the moves Claude has on hand for the rest of this module. Only each skill's name and description sit in context until you invoke one; the body loads then.

## Point the skill at your feature

Pick the feature and let the skill run. Ask Claude to invoke the access-control-analysis skill on the feature you type after the colon, and save the surface map to a temp directory.

{{prompt:map-the-access-surface-2}}

The plan path you noted at Module 2's close is the best input here: it names the files, the flows, and the scope the feature actually touches. Paste it, or a ticket link, a design-doc path, or the feature description; Claude reads whatever you give it. Then send. Claude narrates what the skill is doing before the map appears; skip past the opening and look for the saved path when it lands.

## Kick off the pass, then work the other window

- The access-control pass is a breadth walk and takes a few minutes. That wait is the two-window move Module 3 installs: kick off a long task in one window, do active work in the other, come back when the first lands.
- Switch to your m3-quality window now. While the map builds in m3-security, start *Author your test-strategy skill* there. It opens as a question-at-a-time conversation about how your codebase tests, so a couple of answers fit the wait. When the map lands back in m3-security, switch back to walk it and write the delta.

## Phase 2: Read the map back before you decide the delta

*3 min*

- You're back in m3-security now; the map landed here. The rest of this exercise runs in this window.
- See the structured read before you decide. Ask Claude to walk you through the surface map in chat: categories, key findings, ambiguous spots.

{{prompt:map-the-access-surface-3}}

## Phase 3: Add the surface the skill over-called, and the one it missed

*7 min*

- You decide which surface goes on each side of the delta.
- **The over-call.** Where did the map flag something you'd have under-weighted? Lower-risk in your read, higher-risk in the skill's.
- **The miss.** What's missing that you know matters? Often the "weird bit" of your feature, the part you'd describe as not-quite-standard.
- If neither is obvious from a quick scan, ask Claude in chat to propose two or three candidates per side with a one-line reason each. Pick from those; push back if the reasons read generic.

Ask Claude to integrate the surface the skill called out harder than you would have into the map.

{{prompt:map-the-access-surface-4}}

Then ask Claude to add the surface the skill missed but you know matters.

{{prompt:map-the-access-surface-5}}

## Push back until the reason names your codebase

- Answer, then sharpen. Push back until the reason names something specific to your codebase. *"The billing webhook re-hits the queue on retry, so the same event gets reprocessed"* beats *"webhooks need auth."*

## Phase 4: Add the context header a cold reader needs

*3 min*

- You're about to hand this map to the STRIDE skill. Glance at it. If a teammate landing on this file cold would miss something the map assumes you know, add a one-line context header. If it reads clean, move on.

**What happened:** A short delta-note is on the record, and it is the artifact STRIDE reads next, not the raw skill output.

## What this sets up

The STRIDE exercise invokes the curated STRIDE skill on the map you just built. The surface map IS the input. If you rushed Phase 2, STRIDE threat-models a thin map; if you worked the delta, STRIDE has something real to chew on.

<!-- maintainer -->

**Lean pass (2026-08-25, Antti-directed M3/M6 shorten, free hands):** cut "One sentence buys the time back." (aphorism kicker, §16c); "Skills you author later in Module 3 land in User too." (forward plant; author exercise owns the destination); "The skill walks the surfaces and produces the map." (restatement); "Both windows are already open… focus switch, not a new session."; Phase-2 "You want the structured read in front of you…" (restated its own lead); the bare "Your call." bullet under Phase 4. Do not restore. Carded and kept (Antti 2026-08-25): the *What this sets up* slide — the sow-here-reap-at-STRIDE motivation stays; do not re-card.

**§48's premature-stop half is deliberately absent from the opener callout (declined 2026-08-15, after a pedagogy judge flagged it as a TODO).** §48 wants recovery named in both directions; this file's opener names only the over-read direction (*take the ranked ten, leave the rest on disk*). That is the failure this beat actually has: M3 is the first heavy curated-skill output and the risk is drowning in it. A shallow-stop callout here would be a gate for a defect that does not fire — Phase 2 already walks the student through reading the map before any decision, and `check_platform_and_boundaries.md` §34 is explicit that a check written for a failure nobody has seen is speculation wearing a gate's clothing. The judge reached the same read and filed it non-blocking. Re-add only if a cohort run shows a student declaring the access map done on a shallow pass.

**View summary:** You invoke a curated security skill on a real feature, then compare its access-surface map with what you know about the codebase. The saved artifact combines broad automated coverage with the codebase-specific delta only you can supply.

**The selective-reading opener chunk.** *Take the ranked ten, leave the rest on disk* sits between the header block and Phase 1 — M3 is where the M1 countermove (tell the agent what output you want) becomes load-bearing: first heavy curated-skill output, two windows. Its claim "prompts route heavy output to disk, chat read short" holds against `map-the-access-surface-2` (saves to temp, reports path) and `-3` ("Concise"); if those prompt bodies change shape, re-check it. A companion prompt-sharpen card (ranked bound on `-3`) is open for maintainer approval.

**Emphasis:** handles only — the delta menu pair **The over-call.** / **The miss.** (one handle per item on the Phase 3 menu slide) and the on-screen **User** skills-list label. Widget chrome (`**Time:**`, `**Window:**`, `**What you do:**`, `**What you build:**`, `**The point:**`, `**What happened:**`) is not emphasis. Per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`.

**Skill-introspection (`map-the-access-surface-1`) and map-walkthrough (`map-the-access-surface-3`) prompts kept, not cut.** `-1` was flagged `low-yield`, `-3` `redundant-slot`. Both are light read/introspect beats, not concurrent-heavy execution, so cutting them reclaims none of the load the cull targeted. `-1` goes one level past `/skills` — storage location on disk plus whether skill bodies are loaded into context (the lazy-load lesson the line after it leans on). `-3` is the read-back-and-prime step before the Phase 3 delta, distinct from the map generation in `-2`. Not cut candidates.

**Quality:** compendium-audited 2026-08-28 (writing@0e4f7c9e story@0e4f7c9e technical@8cc00874 behavior@1c765f2 pedagogy@1abb84c6 strategy@1c765f2 slides@0e4f7c9e)
- judges @8cc00874: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS

**Meta (trainer):**
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

<!-- backing -->

Claims
- `stride-without-a-map-is-pub-quiz-threat-modeling` · vision · "STRIDE without an access-surface map is pub-quiz threat modeling." ← none-owed
- `outputs-get-big-from-here` · vision · "From here on, outputs get big." ← none-owed
- `tell-the-agent-what-output-you-want` · vision · "tell the agent what output you want" ← none-owed
- `route-heavy-output-to-disk` · vision · "The prompts here route the heavy output to disk and keep the chat read short" ← none-owed
- `your-read-is-the-short-list-plus-your-delta` · vision · "Your read is the short list, plus the two or three entries your own knowledge of the codebase flags." ← none-owed

Sources
(none. The exercise runs a curated skill against the student's own feature and asserts nothing about the field. The security frameworks it sits inside are named in the sibling STRIDE exercise, which carries their attribution.)

Frameworks
- Access-trust gap · [borrow:none] · law:access-trust-gap · ← none — the delta only the student can add is the gap between what access analysis surfaces and what a maintainer knows
- Absorption bottleneck · [borrow:none] · law:absorption-bottleneck · ← none — the ranked-ten-to-disk move is this law applied to a single exercise's output

Stance `[stance:2026-08-01 level:L0]`
- holds: nothing about the field. **The one claim with any edge is the pub-quiz line, and it is a position rather than a finding** — an assertion about what makes threat modelling useful, delivered as an opinion the exercise then demonstrates.
- contested: nothing.
- would-move-it: nothing published. The exercise depends on a curated skill we ship, so its real dependency is internal.

OODA
- question: none standing on the field. The dependency to watch is the curated access-control skill this exercise invokes.
- roster: none external.
- last-run: 2026-08-01

<!-- /backing -->
