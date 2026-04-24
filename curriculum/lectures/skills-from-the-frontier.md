# Skills from the frontier, skills of your own

*10–12 minutes. Lecture primes Exercises 1–3 of Module 3 (Earn the trust).*

---

Two moves today. You're going to INVOKE two skills this module — one for access-control analysis, one for STRIDE threat modeling. Both were written by us, curated from people who earned the right to teach this. Then you're going to AUTHOR one skill yourself — a test-strategy skill tuned to your codebase. Not written for you. Written by you, in conversation with Claude.

That split isn't accidental. It's a claim about what you can produce well on a Tuesday afternoon and what you can't.

## What's a skill, one breath

A skill in Claude Code is a named, scoped capability the agent can invoke. A markdown file with a frontmatter header and a set of instructions, living in `.claude/skills/<name>/SKILL.md` (or equivalent team-kit home). You've used one already without realising it: that second-pass walk-down in Module 2, where Claude asked you one question at a time about unresolved branches, was Matt Pocock's `grill-me` skill (Socratic requirement elicitation, MIT-licensed, on his GitHub). We paraphrased it as a plain prompt in M2 because we hadn't introduced skills as a primitive yet. Today you invoke two more curated ones and author one of your own.

Skills are how agentic knowledge compounds across teammates. A Slack thread about "how to threat-model our webhook paths" dies in 48 hours. A STRIDE skill tuned to your stack lives as long as the repo.

## The three voices in the room today

**Voice one — historical practitioners.** The two security skills you'll invoke didn't spring from nowhere. STRIDE is Loren Kohnfelder and Praerit Garg's 1999 Microsoft memo (yes, that old — threat modeling predates most web frameworks you use). Adam Shostack sharpened it into a discipline in *Threat Modeling: Designing for Security* (2014); if you buy one security book this year, it's that. Access-control analysis threads back further — Saltzer & Schroeder's 1975 paper on the least-privilege principle is still the most-cited piece of computer security writing for a reason.

We curated these skills because doing STRIDE well is the kind of thing a senior security engineer does in their head after ten years of practice. You can learn it. You shouldn't re-derive it from scratch in twenty minutes.

**Voice two — you, right now.** The test-strategy skill you'll author doesn't have a curated version we could ship. Here's why: a good test strategy on your codebase depends on what you already know — which framework you use, where the flaky tests actually fail, what a "unit test" means in a system that talks to five external services, which regressions have historically slipped through review. Nobody outside your team can write that skill well. We shouldn't try.

You can. Because you'll author it the way the training authors everything — through conversation with Claude, not by hand-crafting markdown. Claude asks you what it needs to encode the skill. You push back where your codebase doesn't fit the default. The skill comes out tuned to your system because YOU fed it your system.

**Voice three — the team kit, starting today.** The skill you author at the end of this module ships to the team kit. The home your sponsor named in the pre-engagement contract: shared Git repo, monorepo `.claude/` directory, whatever your team landed on. The first file lands there today. Intercom's 267-skill plugin repo (31% of R&D contributing) was born the same way — one engineer's contribution, then another, then accretion. Not a platform-team design document.

## Why this proportion matters

Two curated, one authored. The ratio tracks the claim we make about the training: *we curate the best practitioner moves; you build what you know best, which is your own system.* Flipped the other way — three authored skills — and you'd be reinventing STRIDE on a Tuesday. Flipped the other way again — three curated skills — and you'd leave with no authored skills of your own, and the team kit wouldn't be born here. This proportion is deliberate.

## What "earn the trust" means

The module title isn't rhetorical. By the end of 1h45, you'll have three things your staff engineer and your CISO would actually read:

- A mapped access surface for the feature you're shipping (from access-control analysis skill)
- An ADR naming one hardening decision under STRIDE pressure (from STRIDE skill)
- A test-strategy skill that codifies how testing actually works on your system, shipped to the team kit

None of those are compliance artifacts. They're the thinking, written down. The word "trust" here doesn't mean "we followed a checklist." It means "the next engineer who touches this feature can see the thinking."

## What to watch for while you work

- **Ex1:** the access-control skill will flag surfaces. Your job isn't to agree — your job is to decide what it got right, what it underweighted, what it missed that you know matters.
- **Ex2:** STRIDE does the breadth, you make one call. Resist the urge to harden against everything. Pick one. Write the ADR.
- **Ex3:** when you author the test-strategy skill, Claude will offer you a generic test-pyramid default. Your codebase is not a pyramid. Push back until the skill reflects how your tests actually work.
- **Across all three:** skills live in specific places. The curated ones were installed as personal skills at prework, so Claude Code auto-discovers them by name — you don't point at a path. The one you author lands at the team-kit path your sponsor named. Don't invent new homes.

Go.

<!-- maintainer -->

**Meta (trainer):**
- **Time:** 10–12 minutes
- **Primary Bloom's level:** Understand + Apply (primes three exercises)
- **Mood target:** earned trust, before the earning. Students leave the lecture with the stance *"these frameworks are real, the authoring move is real, the team kit is real"* — not *"we're about to do security homework."*

**Watch-fors:**
- Too-long history digression on Kohnfelder/Shostack/Saltzer — keep attribution to the one-line namecheck per voice. If the room wants book recs, capture as a reading list for post-module.
- Engineers with prior security depth may want to debate STRIDE vs PASTA or LINDDUN. Acknowledge (*"PASTA and LINDDUN exist, we picked STRIDE for the 20-min exercise because it's what most readers know"*) and move on.
- "Is the test-strategy skill just a better unit-test policy?" — good question, wrong framing. It's a skill that tells Claude how to think about testing THIS codebase when asked. The output isn't a policy document; it's an agentic capability. Clarify with the Ex3 invocation beat ("is the test strategy good?") as the proof.

**Frameworks attributed:**
- STRIDE — Kohnfelder & Garg (Microsoft, 1999). Sharpened by Shostack (*Threat Modeling: Designing for Security*, 2014).
- Least-privilege principle — Saltzer & Schroeder (*The Protection of Information in Computer Systems*, 1975).
- Compound engineering / team kit accretion — Kieran Klaassen (Every Inc.) + Intercom's 267-skill plugin repo (observations/intercom.md).
- Test strategy as discipline — Kent Beck + Google Testing Blog's test-pyramid framing. Named but not leaned on — the student's authored skill is theirs.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.
