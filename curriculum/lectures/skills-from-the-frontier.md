# Skills from the frontier, skills of your own

## What a skill is

- A **skill** is a named, scoped capability the agent can invoke. A markdown file with a frontmatter header and a set of instructions, living in `.claude/skills/<name>/SKILL.md` or an equivalent team-kit home. Claude Code discovers it by name and pulls the body in when the work calls for it.
- One frontier skill already reached you as a plain prompt. The second-pass walk-down against your plan file, where Claude asked you one question at a time about unresolved branches, was patterned on Matt Pocock's `grill-me` skill (MIT-licensed on GitHub, and billed there as "a relentless interview to sharpen a plan or design"). It arrived unpackaged because skills hadn't yet been introduced as a primitive. Today the packaging arrives: you invoke two curated skills and author one of your own.
- Skills are how agentic knowledge compounds across teammates. A Slack thread about "how to threat-model our webhook paths" dies in 48 hours. A STRIDE skill tuned to your stack lives as long as the repo.

## Borrowed judgement, or your own

- Security practitioners. The two curated skills compress decades of judgement. STRIDE is Loren Kohnfelder and Praerit Garg's 1999 Microsoft memo, sharpened into a discipline by Adam Shostack's *Threat Modeling: Designing for Security* (2014). Access-control analysis threads back to Saltzer and Schroeder's 1975 least-privilege paper, still cited half a century on. The judgement these skills carry doesn't have to be in your head to be in your hands.
- You, right now. The test-strategy skill you author has no curated version, and can't: a good test strategy depends on which framework you use, where the flaky tests actually fail, what "unit test" means in a system that talks to five external services. Nobody outside your team can write that skill well. Curating it would be theatre. So you author it in conversation: Claude asks what it needs to encode, and you push back where your codebase doesn't fit the default.

## Your authored skill starts personal, then compounds

- Your skills folder, starting today. The skill you author ships to your personal `~/.claude/skills/test-strategy/`, auto-discovered in every session you run. Personal-first is the pattern your kit already follows: your `./CLAUDE.local.md` rules file is personal and gitignored, and the first authored skill lands the same way. Promotion to a team home is a human conversation and then a PR, later.
- A team kit is born from personal skills. Intercom's 267-skill plugin repo (153 contributors, 31% of R&D headcount are active contributors, by Intercom's own count, as of April 2026) was born exactly that way: one engineer's personal skill, then a teammate's, then accretion.

## Two curated, one authored

- The proportion is a claim about what you can produce well on a Tuesday afternoon. You build what you know best, which is your own system.
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

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** all slides kept bullets; bold reduced to two handles — the term **skill** at its slide-1 definition and the principle line **Don't make general what you don't practice yourself** on *Two curated, one authored*. All other leads de-bolded (Borrowed judgement, personal-then-compounds, trust artifacts, and arming slides now carry zero bold); "Go." kicker untouched. Per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Slides-only pass (2026-07-02, unaudited):** covered regions DELETED (Path A — prose superseded by the slides; git carries it). Per-passage verdicts: opening "Two moves today" agenda CUT (slide titles carry the agenda; the Tuesday-afternoon claim FOLDED into *Two curated, one authored*) · "What's a skill, one breath" CONVERTED to slide 1 — §3 fix: "in Module 2" / "landed as a plain prompt in M2" de-sequenced to content phrasing ("the second-pass walk-down against your plan … arrived unpackaged"); Pocock credit preserved inline · three-voices prose CONVERTED to one slide, one bullet per voice — §3 fix: "M1 was `CLAUDE.local.md` … M3 is your first authored skill" de-sequenced to kit-pattern phrasing (rules file personal + gitignored; first authored skill lands the same way) · "Why this proportion matters" CONVERTED (the two flips became two bullets) · "What earn the trust means" CONVERTED; "end of 1h45" → "by the module's end" (runtime stays in maintainer Meta) · "What to watch for" CONVERTED to the arming slide; Ex1/Ex2/Ex3 labels dropped (bullets name the move — keeps the lecture re-placeable) · STALE FIX: "The one you author lands at the team-kit path your sponsor named" contradicted the personal-first contract (voice three + module maintainer watch-for); now names `~/.claude/skills/test-strategy/` · "Don't make general …" KEPT as slide-3 bullet · "Go." KEPT as closing kicker. §3 grep above the fence: clean.

**Quality:** compendium-audited 2026-08-02 (writing@5117a2c story@5117a2c technical@5117a2c behavior@5117a2c pedagogy@5117a2c strategy@5117a2c slides@5117a2c)
- judges @5117a2c: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
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

<!-- backing -->

Format → `curriculum/backing-format.md`.

**Claims**
- `skill-is-a-file` · detail · "A markdown file with a frontmatter header and a set of instructions, living in `.claude/skills/<name>/SKILL.md`" ← cc-skills-docs
- `auto-discovery-by-name` · detail · "Claude Code discovers it by name and pulls the body in when the work calls for it" ← cc-skills-docs
- `grill-me-provenance` · detail · "patterned on Matt Pocock's `grill-me` skill (MIT-licensed on GitHub, and billed there as "a relentless interview to sharpen a plan or design")" ← pocock-grill-me
- `skills-compound-across-teammates` · vision · "Skills are how agentic knowledge compounds across teammates" ← none-owed
- `stride-provenance` · borrowed · "STRIDE is Loren Kohnfelder and Praerit Garg's 1999 Microsoft memo, sharpened into a discipline by Adam Shostack's *Threat Modeling: Designing for Security* (2014)" ← kohnfelder-garg-1999, shostack-2014
- `least-privilege-provenance` · borrowed · "Access-control analysis threads back to Saltzer and Schroeder's 1975 least-privilege paper" ← saltzer-schroeder-1975
- `saltzer-still-cited` · detail · "still cited half a century on" ← saltzer-schroeder-1975, saltzer-citation-count
- `intercom-team-kit-accretion` · detail · "Intercom's 267-skill plugin repo (153 contributors, 31% of R&D headcount are active contributors, by Intercom's own count, as of April 2026)" ← curran-2x-nine-months
- `two-curated-one-authored` · vision · "The proportion is a claim about what you can produce well on a Tuesday afternoon" ← none-owed
- `dont-generalise-unpracticed` · vision · "Don't make general what you don't practice yourself" ← none-owed
- `personal-skills-path` · detail · "ships to your personal `~/.claude/skills/test-strategy/`, auto-discovered in every session you run" ← cc-skills-docs
- `three-trust-artifacts` · vision · "three things exist that your staff engineer and your CISO would actually read" ← none-owed

**Sources**
- curran-2x-nine-months `[checked:2026-07-26 result:OK due:cohort]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Darragh Curran, "2x – nine months later: We did it. You can too." 153 contributors / 267 skills / 31% of R&D headcount confirmed live in source. kb:observations/intercom.md fallback: drop the numbers, say "a large practitioner-built plugin repo, born from personal skills."
- cc-skills-docs `[checked:2026-07-29 result:OK due:cohort]` https://code.claude.com/docs/en/skills — [capability] all three body claims confirmed on the page: personal path `~/.claude/skills/<skill-name>/SKILL.md` (all projects) vs project `.claude/skills/<skill-name>/SKILL.md`; "Every skill needs a `SKILL.md` file with two parts: YAML frontmatter … and markdown content"; discovery without a path ("Claude uses skills when relevant, or you can invoke one directly with `/skill-name`"). fallback: none — if discovery-by-name changed, three body claims and the M3 exercise chain all move.
- pocock-grill-me `[checked:2026-07-29 result:OK due:2027-01-29]` https://github.com/mattpocock/skills — [practitioner direct] Pocock's own repo ("Skills For Real Engineers. Straight from my .agents directory"), MIT © 2026 Matt Pocock — both confirmed. The skill is two files. `skills/productivity/grill-me/SKILL.md` is a 4-line invoker whose `description:` is the body's quoted phrase, "A relentless interview to sharpen a plan or design." The method sits in `skills/productivity/grilling/SKILL.md`: *"Interview me relentlessly about every aspect of this until we reach a shared understanding. Walk down each branch of the decision tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer… Do not act on it until I confirm."* **Do not gloss this as "Socratic"** — the skill proposes an answer and waits for confirmation; Socratic method surfaces contradictions instead of proposing. Opposite moves. fallback: name the skill and the one-at-a-time decision-tree interview, no gloss.
- kohnfelder-garg-1999 `[checked:2026-07-29 result:OK due:none]` https://shostack.org/files/microsoft/The-Threats-To-Our-Products.docx — [academic/research] the original 1999 memo, live (the `adam.shostack.org` path 301s here; use this one). Corroborated by Kohnfelder's own retrospective https://medium.com/@lorenkohnfelder/threat-modeling-retrospective-72910908533c — [practitioner direct] "In 1999 I participated in a task force… The technique that came to be known as STRIDE was first described in *The threats to our products*." Minor: Kohnfelder's post does not name Garg in that passage; the joint attribution rests on secondary accounts. Foundational, `due:none`.
- shostack-2014 `[checked:2026-07-29 result:OK due:none]` https://www.wiley.com/en-us/Threat+Modeling:+Designing+for+Security-p-9781118809990 — [academic/research] Wiley, 17 Feb 2014, ISBN 978-1118809990. Foundational.
- saltzer-schroeder-1975 `[checked:2026-07-29 result:OK due:none]` https://www.cs.virginia.edu/~evans/cs551/saltzer/ — [academic/research] *The Protection of Information in Computer Systems*, Proc. IEEE 63(9):1278–1308, DOI 10.1109/PROC.1975.9939. IEEE Xplore canonical (ieeexplore.ieee.org/document/1451869) is bot-walled — BLOCKED there, verified via Semantic Scholar metadata + this free mirror. Backs the provenance claim only, NOT the superlative.
- saltzer-citation-count `[checked:2026-07-29 result:OK due:none]` https://www.semanticscholar.org/paper/10.1109/PROC.1975.9939 — [academic/research] 2,962 citations, 178 influential. Backs "still cited half a century on" and nothing stronger. **Never claim "the most-cited piece of computer security writing"** — 2,962 is a landmark but an order of magnitude below the field's most-cited, and no source asserts it. Shostack's own phrasing is the hedged ceiling if a stronger line is ever wanted: "one of the most cited, least read works in computer security history" (https://shostack.org/blog/the-security-principles-of-saltzer-and-schroeder) `[practitioner direct]`. fallback: drop the clause; the provenance sentence stands alone.
- klaassen-compound-engineering `[checked:2026-07-30 result:CAVEAT due:cohort]` https://every.to/source-code/compound-engineering-how-every-codes-with-agents — [practitioner direct, vendor venue] Shipper + Klaassen, co-bylined, Dec 11 2025; four-step naming verbatim and in printed order. CAVEAT, two of them: Dec 2025 is outside the 6-mo window, so cite as the framework's origin rather than fresh evidence; and Klaassen expanded the loop on 2026-05-29 (`every.to/p/compound-engineering-gets-an-upgrade`) to *"Ideate → brainstorm → plan → work → review → polish → compound → repeat"*, which moves `compound` off fourth place. Name, mechanism and attribution all hold — only the ordinal moved. Never attach a step number to this framework without re-counting first. Stamp carried from `how-this-training-was-built.md`; keep the two in step.

**Frameworks**
- STRIDE · [borrow:security engineering] · law:none · ← kohnfelder-garg-1999, shostack-2014
- Least privilege · [borrow:security engineering] · law:none · ← saltzer-schroeder-1975
- Compound engineering / team-kit accretion · [borrow:practitioner-coined] · law:the-compound-ladder · ← klaassen-compound-engineering, curran-2x-nine-months
- Test pyramid · [borrow:software testing] · law:none · ← cultural-vocab. Named in body as a generic default the authored skill pushes back on; no credit obligation under `check_writing.md §6` counter-rule.

**Stance** `[stance:2026-07-29 level:L2]`
- holds: the personal-skill → team-kit path runs in production at two independent orgs with the same shape — an internal marketplace, auto-updating, contribution spread across a wide slice of R&D rather than a central team building for everyone else. Intercom: 267 skills, 153 contributors, 31% of R&D. Ramp's Dojo: 350+ skills, packaged by non-engineers as well.
- contested: the evidence level, inside our own KB. `observations/ramp.md` reads the paired Intercom + Ramp signal as "Level 3 convergence"; `check_research_claims.md §4` sets the L3 threshold at 10–20 independent practitioners and says six is not enough. Two strong single-org cases is L2. The lecture's body does not lean on a convergence claim, so nothing above the divider is overclaimed — but the KB and the rule disagree and one of them should move.
- would-move-it: a third and fourth independent org publishing contribution-spread numbers for a skill repo (→ L3, and the lecture could say "this is how team kits form" rather than "this is how one formed"). Or the first published account of a team kit that decayed — no maintainer, skills rotting against a moved codebase — which would put a counterweight slide into the lecture.

**OODA**
- question: does personal-skill → team-kit accretion hold outside Intercom and Ramp, and has anyone published a kit that decayed? Both halves are precise. **L3 trigger:** a third org publishing a contribution-spread number. Vercel is the standing near-miss — ~100 skills behind one internal agent, non-developers authoring, contributor count unpublished. **Decay half:** hunt an observed case, not a warning. Practitioners naming rot as a risk to design against (Scanlan, Karlsson on drift after model updates) is not the falsifier and does not earn the counterweight slide.
- roster: Darragh Curran + Brian Scanlan (Intercom), Geoff Charles (Ramp), Kieran Klaassen + Dan Shipper (Every), Matt Pocock, Simon Willison, Armin Ronacher, Thariq Shihipar (Anthropic), Andrew Qu (Vercel); plus `platform-watch/coding-agents/state.md` for skills-ecosystem deltas.
- last-run: 2026-07-29

<!-- /backing -->

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

- vendor-self-report hedge 2026-07-02: theory-completeness-review minor #6 (Intercom caveat maintainer-side only) — body now flags "31% of R&D by Intercom's own count" inline; matches the "<org>'s own numbers" flag shape.
- section-3 sweep 2026-07-02: 5 refs judged, 0 fixed, 5 compliant — grill-me walk-down recall (voice slide) and personal-first kit recall already de-sequenced to content phrasing in the slides pass; "the module title / by the module's end" = within-module scoping, not cross-module sequencing; "installed at prework" = provenance that precedes any placement, survives re-placement; "the next engineer" = false positive (engineer, not module). Body grep `M[0-9]` + module-name refs: clean.
