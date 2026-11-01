You are writing two student-facing files for Agents 101, a training for builder leaders (CEO, CTO, HR lead) who build and run their own agent: the Module 7 module page and its closing lecture. The three exercises are the maintainer's selections and stay exactly as they are; you write the prose around them.

# Strategy input (the maintainer's, authoritative)
## From Personal to Team

**Big idea:** You can't really share an agent. You can share context, a skill, the output, or an interface — and the choice is a strategy decision, not a deployment decision.

**Mood (deliberate):** Generosity as a natural consequence. By M7 the student's challenge memory has been quietly working for them for days — it produced outputs they trust, spotted mistakes they corrected, and became something they check before meetings. The mood isn't *"I should scale this because governance says so"* — it's *"this is starting to work. I wonder if others could benefit?"* A generative impulse, not a compliance impulse. That distinction matters: a system shared from enthusiasm promotes differently from one shared from obligation. The friction in M7's exercise (picking a strategy, shipping it, seeing what the receiver actually experiences) lands plainly because the student wants the sharing to work.

**Four known sharing strategies — pick one, ship it. "Share the whole agent" is not a strategy; it's a vendor pitch that doesn't hold up in practice.**

Vendors sell agent marketplaces. Practitioners don't share agents. Four strategies actually work in the field:

1. **Share the context.** Give teammates your `memory/`, `sources/`, root `CLAUDE.md`, `style.md`. They build their own agent on top of your curation. Each person's agent looks slightly different; the context is shared; the curation compounds across the team. Lowest coordination cost; highest trust requirement (your teammates have to trust your curation).
2. **Share a skill.** Extract one scoped capability as a skill file — a policy-check skill, a brand-voice skill, a citation-format skill. Teammates plug it into their own agents. Skills travel further than agents because they're bounded. (This is also where Module 4's skills-as-security-architecture work pays off — scoping is the sharing mechanism.)
3. **Share the output (push).** Deploy the agent on a schedule or in the cloud; put the output somewhere the team sees it (an intranet page, the team's shared drive, a morning email). People consume what the agent produces without running it themselves. Scheduled, one-way, artifact-shaped.
4. **Share an interface (pull).** Wrap the agent in something people can invoke — a Slack bot, a Teams @mention, a web form, a simple endpoint. The agent waits; the interface is the handle. Teammates ask in their own words and get the agent's answer on demand. Higher engineering lift (someone keeps the interface up) but zero trust cost and highest conversational fluency.

Strategies 3 and 4 are close cousins with opposite defaults: 3 is *push* (the agent pushes output to you on a schedule), 4 is *pull* (you pull the agent's attention when you need it). Most teams want one or the other, not both.

Prework: one access-without-use example from the student's own organisation. That is the complete prework load. There is no Three-walls packet and no Rumelt/Martin/Klein reading packet. The patterns catalog (`patterns/personal-to-team-patterns.md` in the student starter; strategy source in the private catalog) is consulted live during the exercise. Crux, assumption-test, and pre-mortem are plain inline moves, not assigned readings or pre-shipped skills. The close writes `module-7/monday.md`, which names the first assumption, person, and real-world contact to test before Module 8.

- Connections: "Your challenge memory has been quietly working for you for a day and a half. What would you want your teammate to actually *have* — your folder, one of your skills, the morning output, or a way to ask it a question in Slack? And why that one?"
- Exercise 1: **Interview for the job and pick a candidate** — The agent reads the accumulated working set, runs a bounded Jobs-to-be-Done interview, writes `module-7/jtbd.md`, then compares 1–3 candidates from the **personal-to-team patterns catalog** against the teammate's outcome and writes `module-7/branch.md`. Two branches remain first-class: cloud agent infrastructure and personal Claudes only. They are constraints on delivery, not the reason to choose a candidate.
- Exercise 2: **Design the sharing plan** — Apply Rumelt's *crux* inline as the absorption-bottleneck test, then write **technical plan AND people plan** side by side. Missing people-plan names remain `UNASSIGNED — Monday's question`; a perfect technical plan cannot complete the activity by itself.
- Exercise 3: **Test the sharing plan** — Apply Roger Martin's *assumption-test* and Gary Klein's *premortem* inline, select two or three tests, and write `module-7/monday.md` with one named person, one job question, and one assumption test. **No pre-shipped strategy skills** — M4 remains the canonical personal-skill authoring module. Hardness remains a feature: unfinished rollout work becomes Monday's evidence, but the named contact and first test must leave the room.
- **Why split, not duplicate:** these are three bounded cognitive activities with distinct artifact chains and natural stopping points. They remain linked in the module body rather than copied there. The only deliberate repetition is the four-strategy taxonomy in the module frame and Exercise 1, because each surface must run independently.
- Teaching moment: "Shared agent" sounds sensible and is vendor-shaped ceremony. The real sharing is at context, skill, output (push), or interface (pull) — and the choice between the four IS the design decision. Different challenges want different strategies; different teams absorb different strategies. The room will split across all four, and that's the point.
- Concept (emergent): Sharing layers — context, skill, output, interface — each with a different coordination cost, trust requirement, fidelity, and engineering lift. None of them is "ship the agent." Push (output) and pull (interface) are the two ways to deliver a running agent's value without making the consumer run one.
- Reflection: "Who in your organisation would you share context with? Who should get a skill? Who just wants the output? Who'd actually use an @mention? And why is it almost never the same person across all four?"
- Bridge: You can build agents, secure them, evaluate them, and ship any of four shared versions to your team. What if you didn't have to build each one by hand?

---


## The mood arc (core M1 → M6, extensions M7 → M8)

The emotional shape of the first six modules is deliberately engineered and now complete on its own. Each module's mood feeds the next; resolving a mood early steals the next module's teaching moment.

- **M1 — joyful creation.** *"I made this. It's me."* Context + guardrails produce output that's genuinely yours. Empowerment is the payoff.
- **M2 — satisfied compounding.** *"It runs while I sleep."* Persistence + automation turn a one-shot into a system. Ownership is the payoff.
- **M3 — unsettled competence.** *"I wonder if this is right?"* Multi-agent works; the output sits at an uneasy distance from trust. Doubt is planted, deliberately unresolved.
- **M4 — deepened unease.** *"Damn, this is complex stuff."* Skills reveal what the agents were doing underneath. The problem gets more texture, not less. The doubt compounds.
- **M5 — mechanical rescue.** *"Ahh, this is actually fixable."* Fabrication has patterns; the loop (spot → tighten → regenerate) works. Relief, earned plainly.
- **M6 — unleashed leverage.** *"We can automate the loop."* Evals run the spotting-and-steering industrial. Empowered builder returns. If the training ends here, the final landing is complete: the human does not disappear; the human moves one level up and designs what the loop checks, what stays fixed, what changes, and what "better" means.
- **M7 — generous impulse.** *"This is starting to work. I wonder if others could benefit?"* Generosity as a natural consequence — sharing from enthusiasm, not from obligation. The axis shifts from personal-mastery to team-ownership. Four strategies that actually work: share context, share a skill, share the output (push), share an interface (pull — e.g., Slack bot). "Share the whole agent" is not on the list — that's the vendor pitch.
- **M8 — awe and curiosity.** *"Oh shit. Where is this all going?"* The flywheel lands. Agents building agents; trajectory accelerating; no visible ceiling. Awe at what the stack can actually do, curiosity about what comes next. The student leaves Agents 101 wanting the next move, not feeling done.

**The core six-module rhythm in one line:** joy → compound → unease → deeper unease → rescue → leverage. Build, doubt, fix, automate the loop.

**The extension rhythm:** generosity → awe. Share, then self-amplify.

Any edit that makes M3's output feel clean, or M4's security feel tidy, steals from M5 and M6. Any edit that makes M7 feel like a governance chore steals the generous impulse. Any edit that makes M8 feel like a tidy graduation ceremony steals the forward hunger — the right ending is *"I want the next move,"* not *"we're done here."* Honour the arc.

---


# Module shape (section order and what each section is for)
# Module file shape + cross-doc links

Canonical template + include/link mechanics. Loaded at Pass 1 of the three-pass build (`check_pedagogy.md`) + any session creating a new module file or editing includes/cross-doc links. Pointer from `curriculum/CLAUDE.md`.

## Module File Shape

```markdown
# [Title]

## Big Idea
[One sentence: what the module is for. See § Big Idea below.]

## Prework
[What the student walks in holding, plus the stakes line if they don't. Optional gap reading.]

## What You'll Learn
After this module, you will be able to:
- **[verb]** [thing]

## Start here
[The opening question to the room, then the run of includes. Lectures and exercises
are inlined by standalone links in document order — there are no `## Lectures` /
`## Exercises` container headings.]

[Lecture: The whole map](lectures/the-whole-map.md)

[Exercise: Push back on the plan](exercises/push-back-on-the-plan.md)

## [The module's own teaching sections]
[Named for the move, not for the format: `Send the task off`, `Set up the worktree`,
`Sharpen the skill from evidence`, `Human close`. As many as the module needs, each
carrying its own prompts and includes. This is where a module differs from its siblings.]

## Key Concepts
[Reminders of what the module's own beats already taught. See § Key Concepts below.
Goes AFTER the last teaching section — see the placement note there.]

## Optional challenges
[Optional. A short menu of side quests for a student ahead of the room. Gap material:
sits with Bring/Pre-reads, above `## Next`.]

## Bring to Module [N]
[Only when the next module needs the student to arrive with something. Bold the ask,
then the stakes line.]

## Pre-reads before Module [N]
[Optional. Lands in the gap between sittings.]

## Next
[Where the arc goes, and what closes here. LAST — see the placement note below.]
```

**Placement: `## Next` is the last section of the body.** Gap material, what to bring, what to read, sits above it. One `##` is one slide, so the final section is the last thing on the wall while a room packs up, and it used to be a reading list: the forward beat fired two slides early and then drained into admin. Risto raised it twice. Moved 2026-08-13 across prework, M1, M3, M4, M5; M2 and M6 already ended on `## Next` and were left alone, which is the tell that the old order had been half-abandoned in practice before anyone wrote it down.

**Prework is the same rule with a different last section.** It has no `## Next`, so its closing beat is `## Bring to Module 1`, which ends on the opening question the student carries into the room, and `## Pre-read before Module 1` sits above it. Naming the pre-read below the closing beat put it where a student who reads "Bring to Module 1" as the end never scrolls.

**What this costs, and it is real:** those five `## Next` paragraphs were written as connective tissue between a close and some admin. They now carry the close. Read them as closers, not as bridges, before the next cohort.

**Two sections belong to the training's first module only:** `## How we work in this room` and `## Freedom to choose` sit in M1 between `What You'll Learn` and `Start here`. They set the room's contract once; a later module repeating them is drift.

**`## Meta` lives below the `<!-- maintainer -->` fence,** with Bloom level, timings and trainer materials. It is not a student-facing section.

## Big Idea

**Meaning, not steps.** One sentence saying what the module is *for*, the thing a student would repeat to a colleague. The sequence of moves belongs in `## What You'll Learn` one section below, which states it in the more precise register; a Big Idea that lists the phases is that section in worse prose. Ceiling ~30 words, and most should land well under. Reference: AE101 M4, *"Prep your first long run. Whatever you've built so far is what the agent gets, and the run is how you find out what's missing."*

Test: **strike every verb the student performs. Is anything left?** If not, it is a recipe. *"Take one task into plan mode, push back twice, then let a second read walk the branches"* is a correct summary of M2 and says nothing about why M2 exists.

Cut on sight:
- **Arc-positioning**, which module produced the evidence, what later modules ride on, where this sits in the training. `## What You'll Learn` states the same arc one section below in the more precise register, so a prose restatement is the duplicate, not the summary. §33's exemption for this section is narrow: it may name what the module *earns*, not where the module *sits*.
- **Repo dialect**, *team kit accretion*, *the three-pattern*, *un-packaged*-as-noun. Projected on a wall to engineers who have not read our maintainer blocks.
- **Framing preambles**, *"Before the agent runs bigger work alone, …"*. Start on the verb.

Won't fit in one sentence → **it belongs below the `<!-- maintainer -->` fence, not above it in four.** Relocation costs nothing: `check_strategy_tie_in.md` fires on it there, and `eval-class-router.sh` keys the `strategy@` class off a literal `^## Big Idea` at any depth. Precedent: AE101 M2, 2026-08-12, Antti-directed.

## Key Concepts

**Reminders, not new material.** Every bullet restates something the student met in this module's own exercises and lectures. A bullet carrying information that appears nowhere else is the section teaching, which is the one thing it must not do, the invariant is *concepts emerge from doing*. Test: for each bullet, name the beat it recaps. Can't → it is new material wearing a recap's clothes, and the student meets a term (*un-packaged*, *gap analysis*) without the experience that earns it.

**Placement: after the last teaching section, before `## Next`.** A recap above a teaching beat can only recap half the module, and the bullets covering the other half are briefing wearing a recap's clothes. Check what sits below the block before writing a bullet: a bullet recapping a section the reader has not reached yet is the same defect from the other side. **M5 carries the one legitimate exception**, and it is structural rather than sloppy: `## The whole map?` sits after Key Concepts but renders only in the four-sitting cut (`<!--flag:no-module:spot-gaps-build-the-loop-->`), so in the shipped six-module arc the block is already last. Moving it below a flag-gated section would break the cut where M5 is not the finale.

One idea per bullet, module's own voice, tactical. Lead with the discipline, not the failure mode. Do not front-run a later module.

**The rest of the spec lives where it fires:** `check_strategy_tie_in.md` §§3/4/5/6, theme instancing, the 1–3 breadcrumb clauses (5–8 words, no label, no bold), and the vary-between-adjacent-modules rule. That compendium auto-loads on this surface; this section is the shape, not the whole contract.

## Module include

Standalone link, href = `exercises/<slug>.md` or `lectures/<slug>.md`:

```markdown
[Exercise: Raw LLM](exercises/raw-llm.md)
```

Requirements:
- Link = entire paragraph, on its own line, no surrounding prose.
- Href is exact `exercises/<slug>.md` or `lectures/<slug>.md` (kebab-case, no subdirs).
- Target file exists.

Missing target → renders as-is (Pass 1 can reference future Pass 2 files).

## Cross-doc links, bare paths in source

Write the slug-bearing path the same way from any depth. `rewriteCrossDocLinks` in `site/layouts/curriculum.js` accepts `(?:\.\.\/)*` prefixes and rewrites:

- `(exercises|lectures)/<slug>.md` → `curriculum.html?file=<kind>/<slug>` (shared library)
- `trainings/<training>/(reference|supplementary)/<slug>.md` → `curriculum.html?file=trainings/<training>/<kind>/<slug>` (training-specific)

Forbidden in source:
- Hardcoded `curriculum.html?file=...` URLs (renderer leak).
- Depth-counted `../` prefixes (bookkeeping the author shouldn't track).

Maintainer-block bare-path text (no markdown link) is exempt from rewrite.

Standalone-include = renderer fetches + inlines file content. Inline body links = URL-rewrite only.

→ `memory/compounded/2026-04-26-platform-bare-paths-renderer-rewrites.md`


# Rules (generator view; apply them while writing)
# Diamond rules (T0) — always on

The 21 rules that shape what gets written, across every surface. This is not the rulebook; it is the part that changes a sentence before it is typed.

**How the tiers work.** Writing on a surface → read that surface's `_index/<surface>.leads.md` (T1, every lead, ~1KB). A lead marked `⚠` carries an exception or a hard-grep list → read that rule's body (T2) before you ship. Full compendiums (T3) are for eval judges and for editing rules — not for writing prose.

**Adding or changing a rule** still happens in `memory/check_*.md`; tier membership is one frontmatter line. After any rule edit: `node curriculum/evals/scripts/build-rule-index.js` **then** `node curriculum/evals/scripts/compendium-drift.js --repin`. Skip the rebuild and this index goes stale and the hooks fail closed to T3; skip the repin and every pinned verdict was taken against the old wording.

**pedagogy** — full index: `_index/pedagogy.leads.md` (60 rules)
⚠ §22 Rule in memory without forcing function = worse than no rule.

**platform_and_boundaries** — full index: `_index/platform_and_boundaries.leads.md` (52 rules)
  §1 Training platform comes from the training's runtime contract.
⚠ §4 Verify capabilities BEFORE asserting, not after.
  §37 Measure the defect before proposing the fix, and again before repeating it to the maintainer.
  §42 Before deleting anything, ask what its FIRING would look like — reference-grep can't tell live from abandoned.

**prompts** — full index: `_index/prompts.leads.md` (49 rules)
  §1 No placeholders inside fences.

**research_claims** — full index: `_index/research_claims.leads.md` (17 rules)
⚠ §1 Source URL + type label — mandatory.
  §3 Zombie stat guard.

**strategy_tie_in** — full index: `_index/strategy_tie_in.leads.md` (8 rules)
⚠ §3 Lead with discipline, not failure mode.

**student_facing** — full index: `_index/student_facing.leads.md` (36 rules)
  §1 Aspirational destination, never corrective gap.
  §14 No em-dashes. Simple sentences.
  §26 Cut NVA: true but not moving student forward.
⚠ §33 The curriculum does not narrate itself — subject test, then deletion test.

**writing** — full index: `_index/writing.leads.md` (28 rules)
  §1 Banned words — grep zero-tolerance.
⚠ §3 No stale markers, no "fixed" retrospectives, no session biography.
⚠ §4 Register match.
⚠ §7 Always "you", never "the student"; teacher framing stays out of body.
  §9 Over-hedge detector.
⚠ §14 Watch out for planting jargon too early.
  §19 Machine-cadence fat — the shape of good prose without the content.
⚠ §21 A slogan that is false as stated is not punchy framing — run the truth test before reaching for §12.


# writing — rule index (T1)

28 rules. Leads only — this is the generator's view. `◆` = diamond (already in context from session start). `⚠` = body carries an exception, carve-out or hard-grep list: **read the rule body (T2) before shipping this surface.**

T2: `node curriculum/evals/scripts/rule.js writing <N>` — or `awk` the chunk out of `memory/check_writing.md`.
T3 (full file) is for eval judges and rule authoring, not for writing prose.

<!-- generated from check_writing.md@f261820eef98 — do not edit; run build-rule-index.js -->

◆  §1 Banned words — grep zero-tolerance.
   §2 Ritual / ceremony — hard ban
◆⚠ §3 No stale markers, no "fixed" retrospectives, no session biography.
◆⚠ §4 Register match.
   §5 Rough-cut drafts for articles.
 ⚠ §6 Credit original when paraphrasing named technique.
◆⚠ §7 Always "you", never "the student"; teacher framing stays out of body.
   §8 Don't smuggle terms of art from maintainer into body.
◆  §9 Over-hedge detector.
   §10 Verbatim-frame-cite in reference artefact.
 ⚠ §11 Cap practitioner attribution at one student-side mention per module.
 ⚠ §12 Punchy framing keeps punch; carve-out lives downstream.
 ⚠ §13 Value-prop / positioning framing belongs in sales copy + project strategy docs, NOT student-facing curriculum body.
◆⚠ §14 Watch out for planting jargon too early.
   §15 Audit closer when trimming body-prose forcing function.
 ⚠ §16 The `
 ⚠ §17 No combative verbs about the agent in body prose.
   §18 Headers must be literally true about the mechanism.
◆  §19 Machine-cadence fat — the shape of good prose without the content.
 ⚠ §20 Don't state a count the adjacent list already holds.
◆⚠ §21 A slogan that is false as stated is not punchy framing — run the truth test before reaching for §12.
 ⚠ §22 A claim binds to every body that states it, not just the one holding the stamp.
   §23 A rule set reconstructed at session start goes stale inside the session — re-derive it per target, not per sweep.
   §24 One doc per scarce-attention audience; delta-only.
   §25 Trainer-facing text is self-contained.
   §26 A sentence saying how you'd know points at the outcome, not the nearest artifact.
 ⚠ §27 Say it once, at its most concrete, then at most one sentence that generalises it. Style, not a gate.
 ⚠ §28 Body prose stands without the trainer — no cue-card prose.

# student_facing — rule index (T1)

36 rules. Leads only — this is the generator's view. `◆` = diamond (already in context from session start). `⚠` = body carries an exception, carve-out or hard-grep list: **read the rule body (T2) before shipping this surface.**

T2: `node curriculum/evals/scripts/rule.js student_facing <N>` — or `awk` the chunk out of `memory/check_student_facing.md`.
T3 (full file) is for eval judges and rule authoring, not for writing prose.

<!-- generated from check_student_facing.md@94dccb151b08 — do not edit; run build-rule-index.js -->

◆  §1 Aspirational destination, never corrective gap.
 ⚠ §2 Earn every technical term on first use.
   §3 Business-audience word ban (Agents 101 default).
   §4 Memory vs context — use deliberately.
 ⚠ §5 Golden path only in body — THIS RULE HAS AN EXCEPTION; read to the boundary before cutting anything.
   §6 Trust Claude's defaults for structure.
   §7 Q1/Q2/Q3 retro interview is banned at every module. Compound-shape varies per module — never repeat same Debrief.
   §8 Don't smuggle another module's voice.
 ⚠ §9 Don't ask student to manually diff or spot-check Claude's output as error-catching.
   §10 Simulation personas never alone.
   §11 No "What research says" callout boxes
   §12 Student moves stay in conversation with agent.
   §13 Specify which CLAUDE.md layer — every time.
◆  §14 No em-dashes. Simple sentences.
 ⚠ §17 Section headers use command verbs when section is about doing something.
 ⚠ §18 Inline links use target's title, never filename.
   §20 Disambiguate shared-word collisions with Claude Code primitives on first student-authored use.
 ⚠ §21 LLM-vs-agent-vs-Claude vocabulary discipline.
 ⚠ §22 No time-of-day anchors in body prose.
   §23 Reflection beats stay invisible in flow.
   §24 No meta-ask when student has already decided.
 ⚠ §25 `.md` is default file type for student artifacts across curriculum.
◆  §26 Cut NVA: true but not moving student forward.
 ⚠ §27 Body "read it" / "look at it" / "notice X" after chat-print = dead weight.
   §28 Forward-callout closer: student as grammatical subject.
   §29 Operational reminders live at moment of use, not only where introduced.
 ⚠ §30 Echo the training's theory spine before inventing a synonym.
 ⚠ §31 Name the artifact, not the act.
   §32 Name the outcome; don't walk a professional through trivial mechanics.
◆⚠ §33 The curriculum does not narrate itself — subject test, then deletion test.
   §34 Four sharing strategies (Agents 101 M7 canonical) — use verbatim.
 ⚠ §35 Agents 101 M2+ Debrief — canonical shape.
   §36 Trust the prompt over the scaffold.
   §37 Mood is a design constraint, not a garnish.
 ⚠ §38 Exercise headers pass the build-squint test.
 ⚠ §39 Self-study is invisible in the training flow.

<!-- numbering lint: dupes=[] gaps=[15,16,19] diamond-ghosts=[] -->

# lectures — rule index (T1)

7 rules. Leads only — this is the generator's view. `◆` = diamond (already in context from session start). `⚠` = body carries an exception, carve-out or hard-grep list: **read the rule body (T2) before shipping this surface.**

T2: `node curriculum/evals/scripts/rule.js lectures <N>` — or `awk` the chunk out of `memory/check_lectures.md`.
T3 (full file) is for eval judges and rule authoring, not for writing prose.

<!-- generated from check_lectures.md@f4c90d1bf952 — do not edit; run build-rule-index.js -->

   §1 Meta-frame lectures = closers, not openers.
   §2 Minimal lecturing before contrast-mood exercises.
 ⚠ §3 No cross-module sequencing in lecture bodies.
 ⚠ §4 Slide/lecture headers pass the squint test AND the truth clause.
 ⚠ §5 A slide's BODY is size-bounded, not just its header (§4's sibling).
 ⚠ §6 A prompt inside a lecture is a trainer show-and-tell, never a room follow-along.
   §7 A new training's lectures start from the slide corpus, not from fresh prose.

# slides — rule index (T1)

17 rules. Leads only — this is the generator's view. `◆` = diamond (already in context from session start). `⚠` = body carries an exception, carve-out or hard-grep list: **read the rule body (T2) before shipping this surface.**

T2: `node curriculum/evals/scripts/rule.js slides <N>` — or `awk` the chunk out of `memory/check_slides.md`.
T3 (full file) is for eval judges and rule authoring, not for writing prose.

<!-- generated from check_slides.md@7865d967f182 — do not edit; run build-rule-index.js -->

 ⚠ §1 Referent resolution under a sequential deck read.
 ⚠ §2 Cross-file and positional callbacks.
   §3 Every backward reference points at a beat that exists.
   §4 Live-demo beats survive a text read.
   §5 No orphan slides.
   §6 Header self-carries at projection distance.
   §7 LLM-cadence caps.
   §8 Internal dialect never lands on a slide.
 ⚠ §9 Emphasis budget — bold is for handles, and go very lightly.
   §10 Presence precedes content — verify against the composed deck, not long-read.
   §11 Numbering — position is computed, content ordinals are linted.
   §12 Page geometry dies at the cut; reading order survives.
   §13 In-deck links work now; whether they EARN their place is open.
 ⚠ §14 Slide size — 210 words / 6 bullets, and the cap is machine-checked.
   §15 Heading grammar is the mood switch, and it is load-bearing.
   §16 A bullet earns its slot or dies — three classes that read as rigour and carry nothing.
   §17 A retitled slide re-earns its bullets against the new header.


# The maintainer's taste, confirmed rule by rule
# Maintainer taste rules (v2, 2026-11-01)

Source: Taste Studio answers (past-call rationales, blind picks, triads, teach-back) and curriculum/taste-notes.md. Use with `pairs.js --rules taste-rules.md`. Frames and point of view are from AE101, the calibrated reference.

## Stance
- Students are adult, self-motivated professionals. Never make them helpless or passive: no sentence where things happen to them, where they must wait, or where someone has to hand them something.
- No put-downs of the student's current work or ways, or of past practice, even as a joke. A put-down tells someone they did something deliberately wrong; assume they have tried their best. Describe the future that is now possible. No moralising and no congratulating ("You watched it work").

## Point of view (AE101 frames)
- Good frames: where this is going; it is your work (the agent works, the student judges); how the machine works; the theory; the trainer talking to the room about pace and choice ("Your call.").
- Drift to reject: a narrator telling the student what they just did or felt ("You felt context move", "The unease you feel…", "You were the only check in the room"). Unease may stay open, but is never declared.

## Register
- Neutral by default. Cut LLM-invented highlights: one-sentence witty remarks, rhetorical questions, loaded words ("toy", "fantasy you inherited"), made-up concepts ("the wall"). A metaphor stays only if the training builds it and returns to it across beats; keep few.

## Length
- Fewer words read faster. Agents 101 runs long on sentences per slide, not on sentence length, so cut whole low-value sentences: forward hints, closers, restatements. Simple, but with deep theory underneath.
- Longer wins only when the extra words carry the author's own rough first-person voice (used sparingly), a permission or experiment framing that lands twice with its why, orientation at a window switch, or repetition that steers toward a new mindset. Not for routine steps.

## Words
- Verb precision: "read" implies reading all of it, and so does "check"; prefer "spot-check" where that is the act.
- Use the word that carries the concept if it is famous enough now ("loop" yes, "hillclimb" not yet). Never an abstraction the student cannot picture ("module 3 draws a boundary").
- Use a famous name only if most students know it.
- Narrate a tool feature only when it is less known (transcripts yes, compaction no). Otherwise tell them to ask the agent.

## Content
- A concrete action the student can take tomorrow beats a framework recited in bullets.
- Teach 3–6 months ahead: what the best practitioners are just getting repeatedly working, plus a few staples. Offer the advanced option on basic steps.
- Hands-on as soon as possible; heavier theory after.
- No untrue or always-true-only-sometimes claims.


# Point-of-view reference: an AE101 lecture the maintainer considers right
# Story of Module 6

I am going to tell you how this module got made. Not the pedagogy of it. The actual session. What I tried, what drifted, what the rules caught, what the rules missed.

Then I am going to ask you to hold something uncomfortable about LLMs, based on the evidence of that session.

## The numbers

One session. 2026-04-24. One model: `claude-opus-4-7`. Twenty-odd planning turns. Five taste reversals from me on Claude's confident recommendations. Three subagents in parallel. Four banned-word leaks across those three subagents. A verifier loop ran after. It caught two more leaks the LLM self-checks had missed. It also found three of our own rules contradict each other. Then a three-persona sim ran. Then a re-sim after I applied the fixes. Ten fixes applied in all. And I pushed back several times on Claude saying it was "done" before it actually was. Once it mattered for this lecture: the draft had drifted from what I'd actually told it to write.

Those numbers are the story. Everything that follows is commentary.

## Things that went sideways

Turn one. Claude opened the session with a plan. List of file names. Two binary questions about tooling choices. No reference artefact. No `plan.md`. No verifier. Chat-shaped in the exact way M5 teaches you to notice. I had to reframe the whole session: run the M5 move on its own work. Diagnose, package, re-send. The training teaches this pattern across three modules. The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape.

The banned word. There is a word in our writing rules that is hard-banned. It does not appear in any curriculum file we ship. The rule was loaded into context. Claude used it twice in the third turn. When I dispatched three subagents in parallel to write the M6 files, three of them used the same word. Same rule, same rules file, same task, four separate violations across four independent LLM instances. The grep pass caught each one. The LLM self-check did not.

The end-state that was not. Early in planning I asked Claude to draft the lecture you are reading right now. The first recommended framing was about trust. About how *we live what we teach* and *the method scales to messy work*. A confident recommendation. It was also wrong. This lecture is not about credibility. It is about something harder. I cut the credibility framing and said: the LLM is not a deterministic machine. Struggle is universal. Claude produced the credibility framing. Our read: much is caused by post-training preferring warmth over directness. The real story was one reframe away and the LLM did not find it on its own.

The sims and evals I did not run. When the verifier loop stopped clean, Claude wrote a done summary. I read it. I asked: *"You must run the evals and simulations too and fix all todos."* Claude had not run them. The reference artefact had flagged them as pre-first-cohort work. Claude had accepted that framing without pressing on it. I had to name the gap. When Claude ran them (three personas, a judge pass, source-verify, a capability check) they caught ten things worth fixing. That is a Claude-miss, not a rule-leak. The rule was right. Claude did not apply it.

The three-phrase closer I didn't catch. The closing lecture ended with a three-phrase benediction: *"You know how to test. You know how to learn. You know how to encode."* Exactly the framing I said, a few paragraphs above, we would cut. Four LLM instances wrote and verified that closer. None caught the contradiction with what they had also read. A senior-engineer persona sim read the two files and named it in one pass: *"direct violation of what this opener promised to avoid. Either cut or pull the fang from it."* We cut. The contradiction was plain to a keen reader. It was invisible across four LLMs that had just produced it.

The paraphrase I shipped as a quote. The closer's Ramp paragraph attributed a framing to Ramp's own engineers: *"the harness was the bottleneck, not the model."* That was not what Geoff Charles said. Source verification against our research observations found Charles's actual line: *"The models were good enough. The harness wasn't."* Close enough in meaning that Claude did not notice the drift at write time. Specific enough in wording that a source-verify pass caught it in one read. Claude had written a paraphrase and presented it as attribution.

The frame I did not cite. Turn seven of planning, verbatim: *"everyone struggles. Surprises happen. The LLM is not a deterministic machine."* Three blunt sentences from me. The draft that came back wrapped that frame in 150 words of philosophising and dropped *Surprises happen* entirely. I asked: *"Remember the exact frame with my words that I gave for the lecture? Cite them and compare with text style. It is too abstract."* The frame was in the session notes. It was not in the reference artefact as a verbatim check. Claude had it, but not in a shape that would force the comparison at ship time. The rule was loaded. The check never ran.

## A rule in context is not a rule in the output

Everyone struggles.

Surprises happen.

The LLM is not a deterministic machine.

The rules were loaded every time: the rules file, the tone brief, the session-timing plan, all sitting in context before the first turn. Claude typed the banned word anyway. It recommended the flattering end-state anyway, and its first proposal came out chat-shaped despite every one of those rules being right there. The subagents leaked the same banned word again. The loop caught what the subagents missed. I caught what the loop missed. You will catch what I missed.

Taste closes the gap.

## Then I compounded the session

I ran the M6 prompts on the M6 generation, comparing the two sessions side by side. That comparison found rules that lived in memory but were never enforced. I moved them into skills that block "done" until the check runs. A rule in memory that does not force is worse than no rule.

The model is good. It is still not 100% deterministic.

## What the loop is for

You have just diagnosed gaps in the M5 packaged session and mapped the work you repeat across your stack.

A rule you wrote last module will not apply this session. That is the thing. The loop exists because LLMs drift. The loop exists because rules leak. The loop exists because every session surprises you, even when the task looked the same.

Your job is not to stop the drift. Your job is to catch it and encode what you learned.

I made this module live, running the move I am asking you to run. I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed. A senior-persona sim caught what the loop missed.

Your turn.

Antti

# Fixed exercises (in order)
--- exercises/share-your-work.md (FIXED, do not rewrite)
# Exercise: Interview for the job and pick a candidate

**Time:** 25 minutes.

**Session** *(new, "Module 7 - Personal to team")*

Start a new session or task at your training-directory root.

Name it `m7-personal-to-team` if your runtime supports session names.

Your memory has been working for you for days now. It catches things you'd have missed, keeps a tone you taught it, and produces something you check before meetings. The question arrives on its own: *could this help someone else?*

Hold the impulse. Then start with the teammate's work.

You are not going to ask *"what should I share with my teammate?"* That question is builder-centered and skips the one thing that decides whether sharing works: **the job** your teammate is trying to get done. This is the Jobs-to-be-Done frame from Clayton Christensen and collaborators. Your teammate doesn't want your agent. They want a job done. Your agent, your skill, your output, your interface: any of those is a candidate for hire. Does it do the job better than what they currently use?

The starting question is theirs, not yours: *what job is my teammate trying to get done, and which sharing shape does it?*

## Interview for the job

This is a heavy read across the working set, and a shallow confident finish is as risky as over-reading. If the agent ranges too wide, interrupt with *"tell me what you've found so far, narrow to the files that bear on this teammate, then continue."* If it declares the job after a thin pass, say *"there's more here. Keep reading before you settle the hypothesis."*

<div class="rt-code">

{{prompt:share-your-work-1}}

</div>
<div class="rt-cowork">

{{prompt:share-your-work-2}}

</div>

Read `module-7/jtbd.md`. The test is specificity: does it name one teammate, their current way of doing the job, and an outcome you could observe? If it could describe anyone in the room, point to the generic line and ask the agent to try that part again.

## Pick against the outcome

The agent then compares candidates from `patterns/personal-to-team-patterns.md` against that outcome and writes your choice to `module-7/branch.md`.

The four sharing strategies are:

1. **Share the context.** Your `memory/`, `sources/`, root instructions, and `style.md` travel. Teammates build on top.
2. **Share a skill.** Extract one scoped capability. Teammates plug it in.
3. **Share the output (push).** Schedule the agent. Output lands where the team looks.
4. **Share an interface (pull).** Wrap the agent. Teammates invoke it through a bot, mention, form, or endpoint.

*"Share the whole agent"* is a vendor pitch and is NOT on the list.

Read `module-7/branch.md`. Every picked candidate should name how it moves the teammate's outcome; infrastructure should appear only as a constraint. If the reason is merely *"we already have the platform,"* send it back.

## Carry the two files forward

You now have the teammate's job and a candidate selected against it. [Design the sharing plan](design-the-sharing-plan.md) finds what would stop that candidate from being absorbed and turns it into a technical plan plus a people plan.

--- exercises/design-the-sharing-plan.md (FIXED, do not rewrite)
# Exercise: Design the sharing plan

**Time:** 23 minutes.

`module-7/jtbd.md` names the job. `module-7/branch.md` names the candidate. Now find the obstacle that decides whether the teammate can actually absorb it, then draft both halves of the plan.

## Find the absorption bottleneck

*5 min*

The obstacle is usually not the first technical limitation a builder sees. The agent compares the technical, social, political, habitual, governance, and trust obstacles and writes the load-bearing one.

{{prompt:share-your-work-3}}

Read `module-7/absorption-bottleneck.md`. A good bottleneck explains why several other obstacles stay hard. If removing it would solve only itself, ask the agent to cluster the obstacles again.

## Draft both plans

*18 min*

The technical plan and people plan carry equal weight. Missing names remain visible as `UNASSIGNED — Monday's question`; the agent does not invent them.

{{prompt:share-your-work-4}}

Read the two files side by side. `module-7/technical-plan.md` should name what moves the outcome and the first real test. `module-7/people-plan.md` should name who owns, governs, operates, judges, and propagates it. A polished technical file beside a people file full of unnamed roles is the finding, not a finished rollout.

## Carry the plan forward

[Test the sharing plan](test-the-sharing-plan.md) checks the assumptions underneath these plans, imagines the failure, and writes the first real-world contact to `module-7/monday.md`.

--- exercises/test-the-sharing-plan.md (FIXED, do not rewrite)
# Exercise: Test the sharing plan

**Time:** 22 minutes.

The technical and people plans are hypotheses. This exercise tests the switch they assume, names the failure that could hide behind a clean technical build, and turns one assumption into a conversation.

## Test the switch assumptions

*10 min*

Use Roger Martin's question: *what would have to be true for this teammate, doing this job, to fire their current hire and use my candidate?*

{{prompt:share-your-work-5}}

`module-7/assumptions.md` now records the two or three tests you selected for this week.

## Name the likely failure and Monday move

*12 min*

Six months from now, the teammate went back to the incumbent. The agent writes three failure stories, then turns the strongest evidence into one named conversation and one test.

{{prompt:share-your-work-6}}

The agent carries the strongest failure pressure into `module-7/monday.md`: one person, one question about how they do the job today, and one selected assumption with its test.

## Take the transferable move with you

Before designing a solution, interview for the outcome. Pick the candidate against that outcome. Draft the technical and people plans together. Test the switch, not the solution. A candidate picked because it fits the infrastructure is shopping. A candidate picked because it moves the outcome is design.

# Shared slides you may link from the lecture with [Title](slides/<id>.md)
--- slides/three-parts-copy.md (shared slide, link only, text fixed)
## Three parts copy, one does not
<!--slide:three-parts-copy-->

An agent is context, a boundary, a set of checks and somebody who answers for what it does. The first three copy in an afternoon. The fourth does not copy at all, which is why the product being sold as a shared agent is always three of the four parts, with the fourth still sitting with whoever built it.

Accountability is the part with a name on it, and a name does not travel inside a folder.

--- slides/access-is-easy.md (shared slide, link only, text fixed)
## Access is easy; absorption is scarce
<!--slide:access-is-easy-->

Many companies have rolled out access far ahead of trust. People can reach the agent. That does not mean they know when to use it, trust it with real work, or have a way to encounter it in the flow of the day.

Access is a switch somebody flips, and it completes in a minute. Absorption happens in other people's weeks, at their pace, for their reasons. The two get reported as one number and they are not one thing.

--- slides/what-would-have-to-be-true.md (shared slide, link only, text fixed)
## What would have to be true for them to switch?
<!--slide:what-would-have-to-be-true-->

Every job your teammate has already has a current solution: a spreadsheet, a colleague, a gut call that has worked well enough for years. Your candidate is not competing with nothing. It is competing with that.

So ask the question the other way round. Not *how do I get them to adopt this?* but *what would have to be true for them to switch?* The answers come back small and specific. It has to land where they already look. It has to be right the first time they try it. Somebody they trust has to have used it first and said so.

# The maintainer's own scar story, already drafted from his dictation. Place it in the lecture verbatim, as its own `##` slide. It is the narrator's failure on the page.
## The analysis was ready. The decision never came.

At the start of 2026 I set out to redesign a whole value stream with agents. We picked the slice that takes a company's flagship product to its millions of customers. Many teams touch it.

We built a multi-agent system for the work. About fifteen people across those teams mapped their own part and uploaded their own documents. A central agent pulled it all into one map of how the work flows today.

On the first workshop day, most of them refined that map together. People had fun, and bit by bit they learned how it works. On the second day a smaller group redesigned the flow. We left with a plausible proposal and the analysis to decide on it.

We had chosen this topic with the senior leadership before we started. By the decision meeting, the urgency had gone. New priorities had come up, and fires were burning elsewhere. The proposal got neither a yes nor a no.

The leadership had not done the analysis. People they trusted had. Companies, even when they go agentic, work first and foremost on the human principle.

Antti Tevanlinna

# What to write
1. The module page body, `# From Personal to Team` first. Sections in this order: `## Big Idea`, `## Prework`, `## What You'll Learn`, `## Start here`, then these four link lines exactly, each on its own line:
[Exercise: Interview for the job and pick a candidate](exercises/share-your-work.md)
[Exercise: Design the sharing plan](exercises/design-the-sharing-plan.md)
[Exercise: Test the sharing plan](exercises/test-the-sharing-plan.md)
[Lecture: Access is not absorption](lectures/access-is-not-absorption.md)
then `## Debrief` containing the line {{prompt:a101-m7-debrief-sharing-artifact}} on its own line, `## Key Concepts`, `## Bring to Module 8`, `## Next`. `## Start here` tells the student to start a fresh session at `~/Documents/agents-101/` and that `module-7/` will hold the sharing plan and `module-7/monday.md` the next move.
2. The lecture body, `# Lecture: Access is not absorption` first. About 8 minutes in the room, `##` slides of at most 6 sentences. It closes the module after the exercises: it names the law the exercises made the student meet. The idea that must land and be carried home: access is a switch someone flips; absorption happens in other people's weeks, at their pace, for their reasons. Link the three shared slides where they fit. End on one name and one small move.

Write fewer sentences, not shorter ones. No em dashes. Never tell the student what they felt or just did. Never put down the student or current practice. No off-hand witty one-liners.

Answer with exactly two fenced blocks and nothing else:
```module
...module page...
```
```lecture
...lecture...
```