# Workflow composition lineages

A walk through composition shapes surfaced from named practitioners' own published work. One named framework, three architectural stances, one move-catalogue, one counter-position, plus a worked-example case study from an AE101 trainer. Seven entries; not a closed set. The field is moving and the curation is partial.

## What this walk covers (and doesn't)

Reading rules for this supplementary:

1. **One published framework.** Klaassen's Compound Engineering is the only one in this set: plugin shipped, framework named, repo active. Other entries publish architectural stances, named methodologies, or scattered moves without putting a framework label on them. Each entry says directly which it is.

2. **The map is partial.** There are almost certainly other named frameworks this walk never reached. It is a starting map drawn from a small sample of practitioners the AE101 research surfaced in May 2026. New frameworks ship monthly. Treat the walk as a way to read the field, not as an exhaustive index of what exists.

3. **Quote with care.** Synthetic framings ("phase pipeline", "rails not chains") that circulated on third-party write-ups have been removed where the original practitioner did not publish them. A student or trainer who looks up a quote will find it where the supplementary says it lives.

## Compound Engineering, Kieran Klaassen

The one named, published framework in this set. Klaassen ships a Claude Code plugin (`EveryInc/compound-engineering-plugin`) that names its loop directly: **brainstorm → plan → work → simplify → review → compound**, one slash command per stage (`/ce-brainstorm`, `/ce-plan`, `/ce-work`, `/ce-simplify-code`, `/ce-code-review`, `/ce-compound`), with dozens more skills and review agents. The stage count and the stage names have both moved since the plugin first shipped, and his written prose has named them differently again. Check the README against the post before you quote either. The composite chains these by file path, not by in-context handoff. `ce-plan` writes `docs/plans/<slug>.md`; the next step takes that path as a literal argument. Progress lives in git, never in the plan body. Every seam between steps carries a hard gate (file-existence or `git status` checks) that the next step refuses to start without.

The closure step is explicit. `ce-compound` writes structured docs with YAML frontmatter validated against a schema. Klaassen's framing of `ce-compound`'s job: record the lesson so the next agent uses it, not re-derives it. Lessons land on disk where the next fresh agent finds them by convention.

What's missing or contested: Klaassen's own byline is thin in the freshness window (his last own Every.to post is just outside). Current Klaassen material is mostly third-party write-ups plus the plugin itself, which is actively committed-to.

**Read:**
- [Compound Engineering plugin (`EveryInc/compound-engineering-plugin`)](https://github.com/EveryInc/compound-engineering-plugin): start with the README's named slash commands, then walk the corresponding skill files. The plugin ships dozens of skills and review agents; the wiring shape repeats.

## Composition by invocation, Matt Pocock

Pocock ships a public kit of small named skills at `mattpocock/skills` (active, widely forked). Skill names visible at last read: `to-spec`, `to-tickets`, `implement`, `handoff`, `prototype`, `triage`, `tdd`, `improve-codebase-architecture`, `grill-me`, `grill-with-docs`, `wayfinder`, `wizard`, `teach`, more. Each skill is small (50 to 200 lines of plain English), standalone, and works copy-pasted into a different agent.

The composition pattern is runtime, not authored. For most of the kit's life there was no `compose` skill, no orchestrator, no master entry point in the repo. The human invokes the skill the task calls for: `/prototype` when prototyping; `/to-spec` when shaping a product brief; `/handoff` when context needs to move to a new thread. Composition happens in the chat, by hand, one skill at a time.

A router has since arrived. The repo's README describes `ask-matt` as *"a router over the user-invoked skills in this repo."* The stance that there should be no main entry point held for a long stretch and then moved. Read the kit for the invocation discipline; do not read the absence of an orchestrator as a permanent position.

Pocock does not publish a named framework over the kit. The composability framing that has circulated on third-party write-ups ("rails not chains", "weakly coupled") is not in his README. The kit itself, and the discipline of invoking individual skills when the task calls for them, IS the practice. The README's opening sentence is the closest to a stance: *"My agent skills that I use every day to do real engineering - not vibe coding."*

**Read:**
- [mattpocock/skills](https://github.com/mattpocock/skills): read `to-spec`, `to-tickets`, `handoff`, `prototype`, `writing-for-agents`. Notice how few seams there are between them, then read `ask-matt` and see what a router over the same kit looks like.
- [setup-matt-pocock-skills](https://github.com/mattpocock/skills/blob/main/skills/engineering/setup-matt-pocock-skills/SKILL.md): the per-repo config scaffolder; other skills read what this writes.

## Single writer with advisor agents, Walden Yan and Cognition

Cognition's evolved 2026 position on multi-agent architecture, published as *Multi-Agents: What's Actually Working* (Walden Yan, 2026-04-22). The architectural claim is verbatim: *"multi-agent systems work best today when writes stay single-threaded and the additional agents contribute intelligence rather than actions."*

This is a hard evolution from Cognition's 2025 *Don't Build Multi-Agents* stance. They tried parallel writers; conflicting implicit choices (style, edge cases) broke the work. Parallel reviewers feeding a single writer did not.

The shape: one writer agent does the actual code-writing. Other agents advise. Yan's published metric: *"Devin Review catches an average of 2 bugs per PR, of which roughly 58% are severe (logic errors, missing edge cases, security vulnerabilities)."* Closure happens in the writer's working memory; advisors return intelligence contributions, not actions. No separate compound skill.

Cognition does not put a framework label on the shape itself. The "single writer with advisors" framing in this supplementary is the curriculum's shorthand; the operational claim and the metric are Yan's.

**Read:**
- [Multi-Agents: What's Actually Working](https://cognition.ai/blog/multi-agents-working): Yan's evolved 2026 position; the verbatim *writes-stay-single-threaded* line lives here.
- [Don't Build Multi-Agents](https://cognition.ai/blog/dont-build-multi-agents): Cognition's original 2025 stance; pair with the evolved post for the trajectory.

## Feedback-loopable methodology and shipped primitives, Sourcegraph Amp

Amp published twice here, with different bylines and different shapes.

**Feedback Loopable**, by Lewis Metcalf at Sourcegraph (2026-02-05), is a named methodology Metcalf calls *"making it feedback loopable"*: building things for humans using methods built for agents. His three components, verbatim from the post: *"1. Built a playground. 2. Set up Experiments. 3. Made the inner loop fast."* The playground is a shared agent-human environment. Experiments use URL-driven query parameters for reproducibility. The inner loop is sped up by emitting CLI text output rather than screenshots so the agent can iterate faster. This is Metcalf's coined methodology, not an industry-standard framework.

**Handoff**, anonymous team byline at Amp (2025-10-23), was a product feature Amp shipped, not a framework. The published description: *"Handoff lets you specify your goal for the new thread. Amp then analyzes the current thread and generates a prompt to start the new thread, along with a list of relevant files."* The argument for handoff over compaction: *"It's lossy, for one. Every time you compact a thread, what's in the context window gets replaced with a summary."* Amp reversed that argument in May 2026, retired Handoff, and now compacts automatically. It was a single composition seam Amp shipped and later withdrew; it never arrived as part of a broader framework Amp had named.

What's distinctive about Amp: composition seams ship inside Amp's runtime, maintained by Amp's product team. The Handoff reversal is the clearest demonstration. Amp changed its mind about the whole mechanism and users got the new behaviour without rewriting a single skill file, which is the upside and the exposure in one move. Klaassen and Pocock keep their composition primitives in their own Git repos; Amp keeps its primitives inside the product, and can retire one.

What's contested: most of Amp's specific primitives are platform-specific. Read the posts for the architectural shape and the methodology framing; do not expect the verbatim primitives to translate to Claude Code or Cursor.

**Read:**
- [Feedback Loopable](https://ampcode.com/notes/feedback-loopable): Metcalf's named methodology, three components in his own words.
- [Handoff](https://ampcode.com/news/handoff): Amp's 2025 post on the handoff feature; explains why they considered compaction lossy.
- [Amp, Rebuilt](https://ampcode.com/news/neo): the 2026 reversal. Compaction replaces handoff.

## Practitioner moves without a published framework, Boris Cherny

Cherny ships composition moves publicly on X (the 2026-01-02 thread is the canonical recent run-down). What he names directly:

- Slash commands for every "inner loop" workflow, checked into git in `.claude/commands/`, used many times a day.
- Subagents that automate common workflows. He names two by example, `code-simplifier` and `verify-app`, then "and so on." The other subagent names that circulate in third-party digests (`code-architect`, `build-validator`, `oncall-guide`, others) come from scattered tips, not from this one thread.
- A PostToolUse hook for formatting code: *"Claude usually generates well-formatted code out of the box, and the hook handles the last 10% to avoid formatting errors in CI later."*
- `/permissions` over `--dangerously-skip-permissions`, checked into `.claude/settings.json` and shared with the team.
- MCP for tools (Slack, BigQuery, Sentry): agent picks up the human's existing tool surface.
- For long-running tasks, three options: prompt Claude to verify its work with a background agent when it's done; an agent Stop hook for determinism; or the `ralph-wiggum` plugin (originally from @GeoffreyHuntley).
- The single tip Cherny names as most important: *"give Claude a way to verify its work. If Claude has that feedback loop, it will 2-3x the quality of the final result."*

Cherny does not publish a unified framework over these moves. There is no Cherny-bylined post that names a "phase pipeline" architecture or a `/go` composite skill that orchestrates the named subagents. Synthetic write-ups exist (e.g., the fan-curated `howborisusesclaudecode.com` aggregator by @CarolinaCherry collects scattered tips into a unified-looking page); those are third-party distillations, not Cherny's publications.

The shape, plainly: Cherny ships composition primitives a practitioner can adopt one at a time. The unification is in the reader's head, not in his published artefacts.

**Read:**
- Cherny's [X thread starting 2026-01-02](https://x.com/bcherny/status/2007179832300581177): the canonical recent run-down of his composition moves in his own words. The thread carries the moves listed above; treat any further unification as third-party synthesis.
- [@CarolinaCherry's fan-curated digest, *How Boris Uses Claude Code*](https://howborisusesclaudecode.com/): useful as an aggregator across Cherny's scattered tips; not Cherny's own writing, attributable as *CarolinaCherry on Cherny*.

## Counter-position, Armin Ronacher

Ronacher is not running a composition lineage. He's arguing against treating composition as a multiplier. His core claim in *The Final Bottleneck*: *"If the machine writes the code, the machine better review the code at the same time."* Code generation accelerated; the pull-request review now turns into the constraint. Composing more primitives upstream does not relax that constraint. The throttle on agent throughput is the human review, not the prompt.

Ronacher's posture on skills is disposable. From *Pi: The Minimal Agent Within OpenClaw*: *"My agent has quite a few skills and crucially I throw skills away if I don't need them."* No marketplace, no Git-checked-in kit, no orchestrator over the skills. The artefact of his work is the shipped code, not the rules that produced it. *Agent Psychosis: Are We Going Insane?* extends the argument to unstructured composition loops: dopamine-driven workflows with no critical thinking trade short-term satisfaction for long-term review debt.

The reason Ronacher matters in this walk: any teaching of composition that does not carry his argument alongside teaches the move and silently teaches its decay. Composition fluency erodes the review discipline that originally justified composition. If you are going to compose, the question Ronacher forces is *what is your review bandwidth?* If the answer is the same as last year, composition is not yet a multiplier.

**Read:**
- [The Final Bottleneck](https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck/): review bandwidth as the constraint composition cannot relax.
- [Agent Psychosis: Are We Going Insane?](https://lucumr.pocoo.org/2026/1/18/agent-psychosis/): Ronacher's stance on unstructured composition loops.
- [Pi: The Minimal Agent Within OpenClaw](https://lucumr.pocoo.org/2026/1/31/pi/): where the disposable-skills posture is named directly.

## Skill stacking system, Dino: the worked example

Dino is an AE101 trainer and a working engineer who, after the May 2026 cohort, shipped a complete composed skill stack and documented its architecture: a three-layer model (skill shape → classification axes → composition mechanisms), a phase-organised skill catalogue, six workflow archetypes (five funnelling into one orchestrator, one standalone), and the design principles that hold it together. The primary doc and three diagrams ship as the canonical case study at `supplementary/skill-stacking/`.

The stack wires skills into workflows through composition mechanisms:

- *Explicit load.* One skill names another as a precondition.
- *Orchestrator composition.* `/ship` sequences the ship-half of every workflow with stop-conditions and a re-invocation loop. The chain runs `/testing` → optional `/qa` → `/release-notes` → `/cp` → open PR → `/multi-agent-review` (fresh sub-agent) → `/ci` (background) → hand-off.
- *CLAUDE.md routing.* Predicate-driven dispatch from the project's CLAUDE.md. Dino's predicates: *"behavior change"* → `/tdd`; *"dashboard file under src/analytics-dashboard/"* → `/ui`; *"shared credentials or 3rd-party API"* → `/multi-tenant-security`; *"complex plan"* → `/walk-plan`; *"ship it"* → `/ship`.
- *Hand-off pipelines.* One skill's output feeds the next without orchestration.

Around those mechanisms:

- **A single orchestrator** by deliberate design. `/ship` is the only skill that composes others. Every other skill is a leaf. The orchestrator-vs-leaf distinction is named explicitly in the classification axes as its own posture pole, alongside read-only and mutating.
- **Phase-organised skill catalogue.** Five PLAN-phase read-only analysis skills (including AE101's curated `/access-control-analysis` and `/stride`); BUILD-phase mutating skills with mandatory gates that fire positionally (`/tdd` on behavior change; `/ui` on dashboard files; `/multi-tenant-security` on shared-credentials touch); VERIFY (`/testing`, `/qa`, `/chrome-fast`); SHIP (the orchestrator + its sequenced leaves); OPS (`/bug-triage` loops back to BUILD).
- **Design principles** the system enforces. A skill never duplicates another's logic; orchestrators sequence and gate, never reimplement; mandatory gates have tight predicates (*never "always run this," always "run this when file X is touched"*); composition over inheritance; the loop is re-invocation, not internal recursion; fresh sub-agents replace `/clear`; CLAUDE.md is half the system.

Distinctive moves stand out:

- **Front-loaded read-only analysis.** Five PLAN-phase skills whose only job is to inspect before mutating, an unusually high analysis-to-action ratio.
- **Mandatory gates fire positionally**, mid-workflow, by predicate. `/ui` doesn't fire at session start; it fires when the engineer opens a dashboard file.
- **Re-invocation as control flow.** When a step in `/ship` fails, the chain stops, the engineer fixes the failure, the engineer types `/ship` again. Internal auto-fix loops are deliberately avoided; in Dino's framing, review feedback is interpretive and auto-applying it can regress correct code.
- **CLAUDE.md as half the system.** Half the composition lives in predicate-dispatch rules inside the project's CLAUDE.md, not inside the skill files. Skills are handlers; CLAUDE.md is the dispatcher.

The dispatcher pattern **scales cross-repo**. Dino runs a pure-routing meta-layer (`/aios`) over a company-level map of repos; the meta-layer points an invocation to the right repo, where that repo's CLAUDE.md then takes over and dispatches to skills. Same routing primitive, two scales: predicate → handler within a repo, predicate → repo across repos. The within-repo dispatcher organises one kit; the cross-repo dispatcher organises a company's repos. Composing the dispatcher with itself at the higher scale is a deliberate move, not an automatic one. But the primitive carries.

<!--flag:module:earn-the-trust-->What's specific to AE101: the two curated security skills from M3 (`/access-control-analysis` and `/stride`) sit inside the PLAN phase as upstream input to the mutating skills. The training's curated kit is part of Dino's shipped composition; the worked example IS a feedback loop.<!--/flag:module:earn-the-trust-->

**Read:**
- [Dino's skill stacking system](trainings/agentic-engineering-101/supplementary/skill-stacking.md): Dino's primary doc. The three-layer model, four composition mechanisms, skill catalogue, six workflow archetypes, seven design principles, in his own words. Diagrams ship alongside the doc in `supplementary/skill-stacking/`: phase swimlane, `/ship` anatomy, workflow archetypes.

## How to pick what to study

Filters that work better than ranking:

1. **What shape is your real work?** If you're shipping multi-file engineering changes with clear phases and want a published framework you can install today, Klaassen. If you're already shipping things one skill at a time and want a model for runtime composition, Pocock. If your team is wrestling with parallel-writer chaos, Yan/Cognition. If your team has standardised on Amp's runtime, Metcalf and Amp by default.

2. **How much orchestration do you want to author?** Klaassen is heavy on orchestration (gates, schemas, composite skills). Pocock is light (the human picks the chain, though a router has since shipped). Cognition is somewhere in between. Cherny's published moves are the lightest published assembly, individual primitives the human composes mentally. Pick the load you will actually maintain.

3. **What review bandwidth do you have?** Read Ronacher first if the answer is *not much*. Composition without review is the failure mode he names.

Track two or three practitioners and you stay current. Watch what they ship in their own venues, not what third-party write-ups distill from them. You will see the composition conversation keep moving, so read each practitioner for the shape of work they handle: that moves slower and tells you more. Keep an eye out for named frameworks this walk does not yet cover, because the curation is partial by design.

<!-- maintainer -->

**Slide deixis accepted:** "moves listed above" (check_slides.md §12) — the Cherny moves sit in the same `##` chunk as the Read: list that points back at them, ten lines up on one slide.

**Slide size accepted:** Skill stacking system, Dino: the worked example — reading walk, never projected; splitting a practitioner entry across two slides costs more than the overflow.
**Slide size accepted:** Feedback-loopable methodology and shipped primitives, Sourcegraph Amp — same, one practitioner per section is the page's whole structure.
**Slide size accepted:** Practitioner moves without a published framework, Boris Cherny — same.
**Slide size accepted:** Counter-position, Armin Ronacher — same.
**Slide size accepted:** Compound Engineering, Kieran Klaassen — same.
**Slide size accepted:** Composition by invocation, Matt Pocock — same.
**Slide size accepted:** How to pick what to study — the three filters are read together or not at all.

**Supplementary meta:** *Reading material for AE101 M6 practitioner-mode beat. Pairs with `lectures/composing-the-workflow.md`. Seven sections: one named framework (Klaassen), four shapes (Pocock / Yan-Cognition / Metcalf-Amp / Cherny-moves), one counter-position (Ronacher), one worked-example case study (Dino, AE101 trainer). Closes with three filters for picking what to study first. Explicit scope note in intro: the walk is partial, the field has more named frameworks than this set surfaces, the curation reflects what AE101's OODA cycles caught.*

**Time:** 15–25 min student read; not in-room.

**Delivery mode:** Linked from M6's `composing-the-workflow.md` lecture. Optional reading after M6 closes, or pre-read between M6 and post-cohort follow-up.

<!-- backing -->

Claims
- `the-walk-is-partial-by-design` · vision · "What this walk covers (and doesn't)" ← none-owed
- `klaassen-compound-engineering` · detail · "**brainstorm → plan → work → simplify → review → compound**, one slash command per stage (`/ce-brainstorm`, `/ce-plan`, `/ce-work`, `/ce-simplify-code`, `/ce-code-review`, `/ce-compound`)" ← every-ce-plugin
- `pocock-composition-by-invocation` · detail · "For most of the kit's life there was no `compose` skill, no orchestrator, no master entry point in the repo" ← pocock-skills
- `pocock-router-arrived` · detail · "The repo's README describes `ask-matt` as *\"a router over the user-invoked skills in this repo.\"*" ← pocock-skills
- `yan-single-writer-with-advisors` · detail · "Single writer with advisor agents, Walden Yan and Cognition" ← cognition-multi-agents-working, cognition-dont-build
- `metcalf-feedback-loopable` · detail · "making it feedback loopable" ← amp-feedback-loopable
- `handoff-was-a-feature-not-a-framework` · detail · "**Handoff**, anonymous team byline at Amp (2025-10-23), was a product feature Amp shipped, not a framework." ← amp-handoff, amp-neo, amp-context-guide
- `cherny-moves-without-a-framework` · detail · "Practitioner moves without a published framework, Boris Cherny" ← cherny-thread, howborisusesclaudecode
- `ronacher-counter-position` · detail · "Counter-position, Armin Ronacher" ← ronacher-bottleneck, ronacher-pi, ronacher-psychosis
- `dino-single-orchestrator-by-design` · detail · "**A single orchestrator** by deliberate design. `/ship` is the only skill that composes others." ← dino-skill-stacking
- `dino-design-principles` · detail · "**Design principles** the system enforces." ← dino-skill-stacking
- `dino-gates-fire-positionally` · detail · "**Mandatory gates fire positionally**, mid-workflow, by predicate." ← dino-skill-stacking
- `pick-what-resembles-your-day` · vision · "Filters that work better than ranking" ← none-owed

Sources
- every-ce-plugin `[checked:2026-08-29 result:OK due:cohort]` https://github.com/EveryInc/compound-engineering-plugin — [practitioner direct, vendor venue] README's "The loop" section confirmed verbatim: *"The core loop is six steps: brainstorm the requirements, plan the implementation, work through the plan, simplify what you wrote, review the result, then compound the learning"*; same six commands (`/ce-brainstorm`, `/ce-plan`, `/ce-work`, `/ce-simplify-code`, `/ce-code-review`, `/ce-compound`); 80/20 planning-vs-execution ratio verbatim ("80% is in planning and review, 20% is in execution"). due:cohort — a live plugin's shipped command structure, re-test each cohort rather than on a calendar clock. fallback: cite the README verbs, never a remembered stage list.
- pocock-skills `[checked:2026-08-29 result:OK due:cohort]` https://github.com/mattpocock/skills — [practitioner direct] README opener confirmed verbatim (dash form, "real engineering - not vibe coding", body quote matches). Body's Read: list names verified against the live roster: `to-spec` (né to-prd, CHANGELOG PR #734), `to-tickets` (absorbed to-issues, PR #464), `writing-for-agents` (né write-a-skill → writing-great-skills), plus `handoff` and `prototype` unchanged. `ask-matt`'s quote "a router over the user-invoked skills in this repo" is verbatim in the repo README, not in the skill's own SKILL.md description (which reads "a router over the skills in this repo"); the no-orchestrator claim is dated in the body rather than asserted as current. Deep link https://github.com/mattpocock/skills/blob/main/skills/engineering/setup-matt-pocock-skills/SKILL.md resolves (200). **The framework label "composition by invocation" is the curriculum's, not Pocock's** — the practice is real and observable, the name is ours. due:cohort — this repo has renamed skills twice already; re-walk the Read: list names each cohort, not just the root URL.
- cognition-multi-agents-working `[checked:2026-05-25 result:OK due:2026-11-25]` https://cognition.ai/blog/multi-agents-working — [practitioner direct, vendor venue] Yan, 2026-04-22, both quotes verbatim. fallback: the 2-bugs / 58%-severe Devin Review figure is vendor-self-reported — keep it flagged.
- cognition-dont-build `[checked:2026-05-25 result:OK due:none]` https://cognition.ai/blog/dont-build-multi-agents — [practitioner direct, vendor venue] Yan, 2025-06-12: the historical 2025 stance. **Durable account, `due:none`** — the body dates it correctly and cites it as the earlier position in a lineage that visibly moved, so it cannot go stale; it can only be superseded, and it already has been by the 2026 post above. fallback: historical context only.
- amp-feedback-loopable `[checked:2026-05-25 result:OK due:2026-11-25]` https://ampcode.com/notes/feedback-loopable — [practitioner direct, vendor venue] Metcalf, 2026-02-05: three components plus *"making it feedback loopable"* verbatim. fallback: vendor-venue methodology — treat as practitioner-coined, never as industry standard.
- amp-handoff `[checked:2026-08-29 result:OK due:none]` https://ampcode.com/news/handoff — [vendor press release] Handoff and the "lossy compaction" quotes verified verbatim, 2025-10-23. Durable account, due:none: this is what Amp announced and argued that day, and re-reading it in six months won't change that it happened — body already frames it in past tense and dates the 2026-05-06 reversal (see amp-neo). fallback: keep as dated history and say what happened to it.
- amp-neo `[checked:2026-08-01 result:OK due:2027-02-01]` https://ampcode.com/news/neo — [practitioner direct, vendor venue] Amp, 2026-05-06: *"So handoff is out. Compaction is in."* · *"Handoff is gone. As described above, compaction made it obsolete."* Compaction now runs automatically at 90% fill. fallback: cite as one team's reversal, never as a trend.
- amp-context-guide `[checked:2026-08-29 result:CAVEAT due:cohort]` https://ampcode.com/guides/context-management — [vendor press release] Not gone: live at 200, same URL, unmoved. Amp's own banner: "Archived - This guide was written in November 2025 for an earlier model and context-management era." Still describes Handoff as live, still never mentions compaction — exactly what this section argues. Cited deliberately as evidence of vendor-doc staleness (see Stance); never cite for current behaviour. **The reversal is this section's whole teaching point** — a shipped primitive can be retired under you, which is exactly what the lineage walk exists to show. due:cohort — re-check in case Amp finally updates or removes it. fallback: cite the dated news posts instead.
- cherny-thread `[checked:2026-05-25 result:OK due:cohort]` https://x.com/bcherny/status/2007179832300581177 — [practitioner direct] Cherny's own "how I use Claude Code" thread, 2026-01-02, verified via the X oEmbed endpoint (x.com 402s to direct fetch; oEmbed returns author and text). fallback: describe the moves without the permalink.
- howborisusesclaudecode `[checked:2026-05-25 result:OK due:2026-11-25]` https://howborisusesclaudecode.com/ — [practitioner analysis] CarolinaCherry on Cherny, a fan-compiled aggregator. **Not Cherny-direct: use only as an aggregator, and never attribute its unifications to Cherny.** This is the source-laundering failure mode `check_research_claims.md §1` was written for, kept here deliberately labelled rather than dropped. fallback: use the thread above.
- ronacher-bottleneck `[checked:2026-05-25 result:OK due:2026-11-25]` https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck/ — [practitioner direct] Ronacher, 2026-02-13, quote verbatim. fallback: none needed.
- ronacher-pi `[checked:2026-05-25 result:OK due:2026-11-25]` https://lucumr.pocoo.org/2026/1/31/pi/ — [practitioner direct] Ronacher, 2026-01-31: *"I throw skills away if I don't need them"*, re-verified. fallback: none needed.
- ronacher-psychosis `[checked:2026-05-25 result:OK due:2026-11-25]` https://lucumr.pocoo.org/2026/1/18/agent-psychosis/ — [practitioner direct] Ronacher, 2026-01-18, paraphrase faithful. fallback: none needed.
- dino-skill-stacking `[checked:2026-05-25 result:ATTESTED due:none]` (internal — `supplementary/skill-stacking.md`) — [maintainer-attested] Dino's worked-example skill stack, shipped in-repo with the author's permission; file plus three diagrams confirmed on disk. The three-layer model, four composition mechanisms and seven design principles are Dino's own labels. In-repo artefact, does not expire. fallback: none — it is in the repo.

Frameworks
- Compound engineering · [borrow:none] · law:the-compound-ladder · ← every-ce-plugin — named, published, plugin-shipped
- Composition by invocation · [borrow:none] · law:none · ← pocock-skills — **the label is the curriculum's, not Pocock's**
- Single writer with advisor agents · [borrow:none] · law:none · ← cognition-multi-agents-working — the architectural shape is Yan's, published verbatim; the shorthand is ours
- Feedback-loopable methodology · [borrow:none] · law:none · ← amp-feedback-loopable — Metcalf's coinage
- Skill stacking · [borrow:none] · law:none · ← dino-skill-stacking — Dino's own framework label
- Requisite variety · [borrow:cybernetics] · law:requisite-variety · ← cultural-vocab — the lineages differ because the jobs differ

Stance `[stance:2026-08-01 level:L2]`
- holds: that composition has several live lineages and no winner. Seven named practitioners or teams, each with published artefacts, and the page's own design refuses to rank them — three filters at the close rather than a winners' table. **The divergence IS the finding, and it is well evidenced.**
- contested: everything downstream of that. The clearest evidence is Amp's reversal — a shipped primitive retired under its users inside seven months, with the vendor's own archived guide still teaching the dead mechanism three months later. Cognition moved sharply between 2025 and 2026 too. **Two of seven lineages visibly changed position inside the window**, which is a stronger argument for "unsettled" than any single practitioner's opinion.
- decided: **Amp's stale Handoff documentation stays visible as the page's own thesis, 2026-08-01.** The archived context-management guide still describes Handoff as live three months after the feature was retired, while every Chronicle post footer links it. No action is owed on our side, and it is worth keeping named because it is the sharpest available illustration of what this page argues: a vendor's documentation and its shipped behaviour can disagree in public for a quarter.
- would-move-it: a third Cognition position, or another vendor retiring a composition primitive, both of which are section updates rather than reframings. What would actually move the page is convergence — practitioners arriving at one shape — which would turn a lineage walk into a recommendation and require the ranking section the watch-fors forbid.

OODA
- question: has any lineage moved again, has a new named framework landed, and has anyone retired another shipped composition primitive?
- roster: Kieran Klaassen, Matt Pocock, Walden Yan and Cognition, Lewis Metcalf and the Amp Chronicle, Boris Cherny, Armin Ronacher, Simon Willison
- last-run: 2026-08-01

<!-- /backing -->

**Attribution-cap exception (per `check_writing.md` rule 11):** This supplementary IS a practitioner-by-practitioner walk; each named practitioner gets one section. The cap-at-one-per-module rule is about not over-citing one practitioner; the walk structure means each appears in their own dedicated section, which is the shape of the artefact. Future judges should not re-flag.

**Watch-fors:**
- **Scope creep.** The walk is partial by design. If a new named framework lands in the freshness window (e.g. a new practitioner publishes a coherent kit + framework + name), add a section rather than expanding existing sections to absorb the new material. Each section stays scoped to one practitioner / one publication surface.
- **Re-laundering.** Future OODA cycles must apply the fan-digest source-laundering check (`check_research_claims.md §1`) before citing any third-party-aggregated practitioner site. The byline-check failure that drove the 2026-05-21 rewrite is a recurrent failure mode in research workflows; the new compendium rule is the forcing function.
- **Lineage stability over 6 months.** The Cognition stance in particular evolved sharply from 2025 to 2026; if Cognition publishes a third position, the section needs updating. Same for Amp — vendor-shipped primitives change quarterly.
- The supplementary should NOT acquire a "ranking" section. Three filters at the close, not a winners' table. The pedagogical claim is *pick what resembles your day*, not *best lineage is X*.
- Ronacher counter-position must stay. If composition becomes universally accepted within 12 months, the counter section gets shorter, not deleted; there is always at least one strong voice arguing against any prevailing move.

**Open TODOs:**
- **Klaassen own-byline freshness.** If he ships fresh own-byline content within the freshness window, swap any "third-party write-up" framing for his own words.
- **Cherny long-form.** If Cherny / Anthropic publish a definitive successor to the X thread that names a unified framework, swap the "moves catalogue" section for the framework section.
- **Frameworks the walk doesn't cover.** Track new named frameworks as they surface in research. Candidates to investigate: any Anthropic-published official pattern catalogue; Hugging Face / LangChain framework releases (if any cross the agent-not-chatbot threshold); other practitioner-published kits. Add a section if they pass the three gates and carry a named framework.
- **Intercom and Ramp lineages NOT named.** Cycle 1 surfaced them; they're enterprise-org-shaped and live more naturally in a future Engineering Management variant.

**Vision vs. detail:**
- Vision layer: the field is mid-evolution; one published framework + several shapes + one counter-position; honest scope.
- Detail layer: every URL, every named file path, every quote (each verified against the practitioner's own publication 2026-05-21).

**Quality:** compendium-audited 2026-08-29 (writing@4a722813 story@0cea7581 technical@4a722813 pedagogy@b55cd28b strategy@1071b36b slides@4a722813)
- judges @4a722813: writing PASS, story PASS, technical PASS, behavior N/A (no prompt blocks on this page), pedagogy PASS, strategy PASS, slides PASS
