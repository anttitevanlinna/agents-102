# How instructions grow

## Some rules grow into skills

Start with real work. Capture the smallest useful lesson in `./CLAUDE.local.md`, then sharpen it from evidence. Share a short standing rule through `./CLAUDE.md` when the team should inherit it.

When a rule expands into a repeatable way of doing a job, extract it into a **skill**: instructions and supporting material Claude loads when that work calls for them.

{{figure:instructions-route}}

This is one common route, not a promotion ladder.

## The second loop
<!--tier:1-->

[Chris Argyris called the deeper move double-loop learning](https://hbr.org/1977/09/double-loop-learning-in-organizations). The first loop corrects the action. The second questions the governing rule or assumption that shaped the action.

{{figure:double-loop}}

`./CLAUDE.local.md` and `./CLAUDE.md` shape every session in their scope. A skill joins context when the work calls for it.

## Rules have a ceiling
<!--tier:2-->

You can make rules now. The ceiling comes sooner than you'd guess: every always-loaded rule rides into every session, billed against the same attention that does the work. Past a point the context bloats, and quality degrades in ways that are hard to pin. The work starts passing your rules and missing your point.

The cure is not better rules; it is where the rules live. Keep `./CLAUDE.md` and `./CLAUDE.local.md` lean: principles, with the why attached. Move the rest into skills, loaded only when the work calls for them. A file that is only ever added to never shrinks; when a later session disproves a rule, take it out.

This training stops short of the full system: rules that prune themselves, evidence that routes itself to the right file, a team deciding what loads for everyone. Exact details of the context information lifecycle are for your team to automate right, in a way that fits your team workflow.

## Prohibitions stop; taste steers
<!--tier:2-->

A rules file that grows only from corrections turns into a list of don'ts. Prohibitions are weak instructions: each one stops a single behaviour and puts nothing in its place. Anyone who has told a child "don't do that" knows the result. Acting right is learned from what good looks like, and from hearing it when it happens.

The positive form is also shorter. Saying what you want, with the reason, usually takes fewer words than the cage of no-statements built around everything you don't. And it generalizes: a taste statement steers in situations no prohibition anticipated. So when a session gets something exactly right, that is worth a rule too. Capture the good example beside the corrections.

## Keep your context where it loads optimally

Variations of the rule and context management prompts you have run work on every type of context engineering file: CLAUDE files, skills, rule files, and whatever you have rolled yourself. Moving material between them is also something you ask Claude to do.

This one runs on the screen; you can run this too on your files.

{{prompt:ae101-m2-name-what-moves}}

Optional, before your rules files grow: [The context ceiling and token efficiency](trainings/agentic-engineering-101/supplementary/the-context-ceiling.md) on what an overloaded rules file does to quality, and where the rules go instead.

<!-- maintainer -->

**Lecture meta:** *M2 closing lecture, after the save-if-earned rule integration and before Key Concepts. Five projected slides, order: route, second loop, ceiling, taste, keep-where-it-loads. The first slide teaches one common evidence-to-rule-to-skill route while explicitly refusing a universal promotion ladder. The second names Argyris's double-loop distinction through the context mechanism the student has already used. The third names the rules ceiling (Antti-directed 2026-08-19): you can make rules now, the ceiling comes soon, symptoms are context bloat and hard-to-pin quality degradation, cure is lean CLAUDE files plus on-demand skills. Third slide grew a third paragraph 2026-08-23 (Antti-directed): a prune clause (the file can shrink) and a declared stop, naming the full context-lifecycle system as beyond this training and the team's to automate in its own workflow. The training knowingly teaches toward a CLAUDE-file ceiling because the full double-loop system does not fit the arc; the slide declares the scaffold rather than hiding it. Closing sentence is Antti's wording. The lecture closes on *Keep your context where it loads optimally* (Antti-directed 2026-08-23; reordered to last the same day so the live return is the final thing seen, and the supplement link rides it): the compound/integrate prompts generalise to every context file, moving material between files is a Claude ask, and `ae101-m2-name-what-moves` names what would move. Trainer runs the prompt on the demo repo and reads the return aloud (`check_lectures.md` §6); "none" is a fine return, the shape is the lesson. Students may run it on their own files; the body says so in offer grammar. Naming only, nothing is written, so no artefact contract. The same generalisation sat as a trailing paragraph in the module's save-the-rule section for a few hours and was cut as a duplicate; the slide is its home. Still number-free and vision-grade; the deep treatment lives in `supplementary/the-context-ceiling.md`, linked from the final slide (Antti-directed 2026-08-19, a deliberate exception to the supplements-link-from-modules convention — the link rides the slide so Key Concepts stays in standard form with no preamble; this lecture is AE101-only, so the training-specific path does not break shared-library re-placement). The fourth slide carries the positive-form half (Antti-directed 2026-08-19): prohibitions stop behaviour without teaching the replacement (the child analogy is Antti's, keep it); stating taste with the why is shorter than the no-statement cage and generalizes past it; good runs earn rules too, not only corrections. Mood: grounded competence; the student leaves able to place the artifacts without being told every artifact must move.*

**Time:** 7 minutes. The fifth slide's live prompt run on the demo repo is the two minutes added 2026-08-23.

**Placement constraint:** Skill use and authoring still land at M3. M2 names the destination and its loading behavior but does not invoke, install, or author a skill.

**Figure contract:** Both slides use self-contained inline SVG, the same cream/teal/rust engineering-diagram family as `the-whole-map.md` and the closed-loop control prototype. No external assets or JS. The first figure's dashed direct path from repeated work to `SKILL.md` and its bottom caption are load-bearing: removing either turns a common route into a universal ladder. The second figure keeps context distinct from durable instructions; skills join context on demand rather than auto-loading in full.

<!-- backing -->

**Claims**
- `local-rule-scope` · detail · "Capture the smallest useful lesson in `./CLAUDE.local.md`" ← claude-memory
- `repo-rule-scope` · detail · "Share a short standing rule through `./CLAUDE.md` when the team should inherit it" ← claude-memory
- `skill-loading` · detail · "instructions and supporting material Claude loads when that work calls for them" ← claude-skills
- `common-route-not-ladder` · vision · "This is one common route, not a promotion ladder" ← none-owed
- `double-loop-distinction` · borrowed · "The first loop corrects the action. The second questions the governing rule or assumption that shaped the action." ← argyris-double-loop
- `claude-files-shape-scope` · detail · "`./CLAUDE.local.md` and `./CLAUDE.md` shape every session in their scope" ← claude-memory
- `skill-joins-context` · detail · "A skill joins context when the work calls for it" ← claude-skills
- `rule-load-quality-ceiling` · vision · "Past a point the context bloats, and quality degrades in ways that are hard to pin." ← none-owed — rule-load ceiling, theory-plan.md §3 candidate; sourced mechanism (Wiegold, context rot) lives in `supplementary/the-context-ceiling.md`
- `rules-pass-point-missed` · vision · "The work starts passing your rules and missing your point." ← none-owed
- `prohibitions-dont-teach` · vision · "Prohibitions are weak instructions: each one stops a single behaviour and puts nothing in its place." ← none-owed
- `positive-form-compresses` · vision · "Saying what you want, with the reason, usually takes fewer words than the cage of no-statements built around everything you don't." ← none-owed
- `good-runs-earn-rules` · vision · "when a session gets something exactly right, that is worth a rule too" ← none-owed

**Sources**
- claude-memory `[checked:2026-08-04 result:OK due:cohort]` https://code.claude.com/docs/en/memory — [capability] Project `CLAUDE.md` is shared team instruction; `CLAUDE.local.md` is personal project-specific instruction. Both load into session context within their scope. fallback: name the repo's own instruction files and remove the auto-load wording.
- claude-skills `[checked:2026-08-04 result:OK due:cohort]` https://code.claude.com/docs/en/skills — [capability] Skills package reusable instructions and supporting files; their full content loads when Claude invokes them rather than occupying every session's context. Project and personal skill locations both exist. fallback: say "reusable instruction package" and remove the loading claim.
- argyris-double-loop `[checked:2026-08-04 result:OK due:none]` https://hbr.org/1977/09/double-loop-learning-in-organizations — [academic/research] Argyris presents the distinction between correction within existing objectives and learning that challenges underlying policies and objectives. fallback: keep the two feedback paths and remove the name.

**Frameworks**
- Double-loop learning · [borrow:organisational learning] · law:double-loop-learning · ← argyris-double-loop
- Closed-loop feedback · [borrow:control theory] · law:is-a-closed-loop-controller · ← cultural-vocab

Stance `[stance:2026-08-04 level:L2]`
- holds: Durable instructions improve through evidence from real work. CLAUDE files and skills differ in loading behavior and can be personal or shared.
- contested: There is no universal route from a CLAUDE file to a skill. Strong practitioners also author skills directly from repeated workflows, and most durable rules remain rules.
- decided: The first slide shows CLAUDE files feeding skills as one common route, plus a separate direct path from repeated work to skills. No promotion action becomes mandatory in an exercise prompt.
- would-move-it: Claude Code removes the distinction between always-in-scope CLAUDE instructions and on-demand skills, or field practice converges on a single mandatory promotion lifecycle.

OODA
- question: How do strong agentic engineers decide that an always-on rule has become an on-demand procedure, and how often do skills emerge without a prior CLAUDE rule?
- roster: Boris Cherny, Kieran Klaassen, Simon Willison, Armin Ronacher, Anthropic's Claude Code team
- last-run: 2026-08-04

<!-- /backing -->

**Quality:** compendium-audited 2026-09-05 (writing@08946dd8 story@324b81d7 technical@08946dd8 behavior@a1ddfae2 pedagogy@a1ddfae2 strategy@08946dd8 slides@c0c37913)
- judges @08946dd8: writing PASS (2 todos see instances/ae101--lecture--how-instructions-grow.writing.json), story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS (1 todo see instances/ae101--lecture--how-instructions-grow.slides.json)
