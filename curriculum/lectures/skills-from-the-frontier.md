# Skills from the frontier, skills of your own

## What a skill is

- A **skill** is a named, scoped capability the agent can invoke. A markdown file with a frontmatter header and a set of instructions, living in `.claude/skills/<name>/SKILL.md` or an equivalent team-kit home. Claude Code discovers it by name and pulls the body in when the work calls for it.
- One frontier skill already reached you as a plain prompt. The second-pass walk-down against your Module 2 plan file, where Claude asked you one question at a time about unresolved branches, was patterned on Matt Pocock's `grill-me` skill (Socratic requirement elicitation, MIT-licensed, on his GitHub). It arrived unpackaged because skills hadn't yet been introduced as a primitive. Today the packaging arrives: you invoke two curated skills and author one of your own.
- Skills are how agentic knowledge compounds across teammates. A Slack thread about "how to threat-model our webhook paths" dies in 48 hours. A STRIDE skill tuned to your stack lives as long as the repo.

## Borrowed judgement, or your own

- Security practitioners. The two curated skills compress decades of judgement. STRIDE is Loren Kohnfelder and Praerit Garg's 1999 Microsoft memo, sharpened into a discipline by Adam Shostack's *Threat Modeling: Designing for Security* (2014). Access-control analysis threads back to Saltzer and Schroeder's 1975 least-privilege paper, still the most-cited piece of computer security writing. The judgement these skills carry doesn't have to be in your head to be in your hands.
- You, right now. The test-strategy skill you author has no curated version, and can't: a good test strategy depends on which framework you use, where the flaky tests actually fail, what "unit test" means in a system that talks to five external services. Nobody outside your team can write that skill well. Curating it would be theatre. So you author it in conversation: Claude asks what it needs to encode, and you push back where your codebase doesn't fit the default.

## Your authored skill starts personal, then compounds

- Your skills folder, starting today. The skill you author ships to your personal `~/.claude/skills/test-strategy/`, auto-discovered in every session you run. Personal-first is the pattern your kit already follows: your `./CLAUDE.local.md` rules file is personal and gitignored, and the first authored skill lands the same way. Promotion to a team home is a human conversation and then a PR, later.
- A team kit is born from personal skills. Intercom's 267-skill plugin repo (153 contributors, 31% of R&D by Intercom's own count, as of April 2026) was born exactly that way: one engineer's personal skill, then a teammate's, then accretion.

## Two curated, one authored

- The proportion is a claim about what you can produce well on a Tuesday afternoon. Frontier practitioner moves are curated for you; you build what you know best, which is your own system.
- Three authored skills, and you'd be reinventing STRIDE on a Tuesday. Decades of threat-modeling judgement don't get re-derived in twenty minutes; they get invoked.
- Three curated skills, and the team kit is never born here. You'd leave with nothing authored, and the skill only your team can write would still not exist.
- **Don't make general what you don't practice yourself.** That's the principle underneath the split. The curated skills come from people who did the work; the one you author covers what only you do.

## Three trust artifacts the next engineer checks

- The module's title, *Earn the trust*, isn't rhetorical. By the module's end, three things exist that your staff engineer and your CISO would actually read: a mapped access surface for the feature you're shipping, an ADR naming one hardening decision under STRIDE pressure, and a test-strategy skill codifying how testing actually works on your system.
- None of them are compliance artifacts. Each is the thinking, written down: what was considered, what was decided, and under which constraint.
- The test for trust is the next engineer. Not "we followed a checklist" but: whoever touches this feature next can see the reasoning and check it against the code.

## The tool flags; you make the call

- The access-control skill flags surfaces; deciding is your job. What it got right, what it underweighted, what it missed that you know matters. Agreement is not the job; the delta is.
- STRIDE does the breadth; you make one call. Resist the urge to harden against everything. Pick one threat worth the work and write the decision down as an ADR.
- The authoring conversation will offer a generic test-pyramid default. Your codebase is not a pyramid. Push back until the skill reflects how your tests actually work.
- Skills live in specific places. The curated ones were installed as personal skills at prework, so Claude Code auto-discovers them by name; you don't point at a path. The one you author lands in your personal kit at `~/.claude/skills/test-strategy/`. Don't invent new homes.

Go.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** all slides kept bullets; bold reduced to two handles — the term **skill** at its slide-1 definition and the principle line **Don't make general what you don't practice yourself** on *Two curated, one authored*. All other leads de-bolded (Borrowed judgement, personal-then-compounds, trust artifacts, and arming slides now carry zero bold); "Go." kicker untouched. Per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

**Slides-only pass (2026-07-02, unaudited):** covered regions DELETED (Path A — prose superseded by the slides; git carries it). Per-passage verdicts: opening "Two moves today" agenda CUT (slide titles carry the agenda; the Tuesday-afternoon claim FOLDED into *Two curated, one authored*) · "What's a skill, one breath" CONVERTED to slide 1 — §3 fix: "in Module 2" / "landed as a plain prompt in M2" de-sequenced to content phrasing ("the second-pass walk-down against your plan … arrived unpackaged"); Pocock credit preserved inline · three-voices prose CONVERTED to one slide, one bullet per voice — §3 fix: "M1 was `CLAUDE.local.md` … M3 is your first authored skill" de-sequenced to kit-pattern phrasing (rules file personal + gitignored; first authored skill lands the same way) · "Why this proportion matters" CONVERTED (the two flips became two bullets) · "What earn the trust means" CONVERTED; "end of 1h45" → "by the module's end" (runtime stays in maintainer Meta) · "What to watch for" CONVERTED to the arming slide; Ex1/Ex2/Ex3 labels dropped (bullets name the move — keeps the lecture re-placeable) · STALE FIX: "The one you author lands at the team-kit path your sponsor named" contradicted the personal-first contract (voice three + module maintainer watch-for); now names `~/.claude/skills/test-strategy/` · "Don't make general …" KEPT as slide-3 bullet · "Go." KEPT as closing kicker. §3 grep above the fence: clean.

**Quality:** compendium-audited 2026-07-08 (writing@689e7e0 story@689e7e0 technical@689e7e0 behavior@689e7e0 pedagogy@689e7e0 strategy@689e7e0 slides@47f3357) — predates the slide rework; re-audit before ship.
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS (override-r2-module-number-is-arc-earned-spine-vocab-per-carve-out-see-instances/ae101--skills-from-the-frontier.slides.json)
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Lecture meta:** *10–12 minutes. Lecture primes Exercises 1–3 of Module 3 (Earn the trust).*
**Meta (trainer):**
- **Time:** 10–12 minutes
- **Primary Bloom's level:** Understand + Apply (primes three exercises)
- **Mood target:** earned trust, before the earning. Students leave the lecture with the stance *"these frameworks are real, the authoring move is real, the team kit is real"* — not *"we're about to do security homework."*

**Watch-fors:**
- Too-long history digression on Kohnfelder/Shostack/Saltzer — keep attribution to the one-line namecheck per voice. If the room wants book recs, capture as a reading list for post-module.
- Engineers with prior security depth may want to debate STRIDE vs PASTA or LINDDUN. Acknowledge (*"PASTA and LINDDUN exist, we picked STRIDE for the 20-min exercise because it's what most readers know"*) and move on.
- "Is the test-strategy skill just a better unit-test policy?" — good question, wrong framing. It's a skill that tells Claude how to think about testing THIS codebase when asked. The output isn't a policy document; it's an agentic capability. Clarify with the Ex3 invocation beat ("is the test strategy good?") as the proof.

**Frameworks attributed:**
- STRIDE — Kohnfelder & Garg (Microsoft, 1999) `[academic/research]`. Sharpened by Shostack (*Threat Modeling: Designing for Security*, 2014) `[academic/research]`.
- Least-privilege principle — Saltzer & Schroeder (*The Protection of Information in Computer Systems*, 1975) `[academic/research]`.
- Compound engineering / team kit accretion — Kieran Klaassen (Every Inc.) `[practitioner direct]` + Intercom's 267-skill plugin repo `[practitioner direct]` (Darragh Curran, *"2x – nine months later: We did it. You can too."*, [ideas.fin.ai/p/2x-nine-months-later](https://ideas.fin.ai/p/2x-nine-months-later), 2026-04-16; re-verified live 2026-05-22 — 153 contributors / 267 skills / 31% of R&D confirmed in source). Evolving deployment data — re-verify before each cohort and refresh date anchor in body.
- Test strategy as discipline — Kent Beck `[practitioner direct]` + Google Testing Blog's test-pyramid framing `[practitioner analysis]`. Named but not leaned on — the student's authored skill is theirs.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

- vendor-self-report hedge 2026-07-02: theory-completeness-review minor #6 (Intercom caveat maintainer-side only) — body now flags "31% of R&D by Intercom's own count" inline; matches the "<org>'s own numbers" flag shape.
- section-3 sweep 2026-07-02: 5 refs judged, 0 fixed, 5 compliant — grill-me walk-down recall (voice slide) and personal-first kit recall already de-sequenced to content phrasing in the slides pass; "the module title / by the module's end" = within-module scoping, not cross-module sequencing; "installed at prework" = provenance that precedes any placement, survives re-placement; "the next engineer" = false positive (engineer, not module). Body grep `M[0-9]` + module-name refs: clean.
