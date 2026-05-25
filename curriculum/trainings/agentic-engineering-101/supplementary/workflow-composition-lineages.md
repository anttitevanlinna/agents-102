# Workflow composition lineages

A walk through composition shapes surfaced from named practitioners' own published work. One named framework, three architectural stances, one move-catalogue, one counter-position, plus a worked-example case study from an AE101 trainer. Seven entries; not a closed set. The field is moving and the curation is partial.

## What this walk covers (and doesn't)

Three reading rules for this supplementary:

1. **One published framework lives in this set: Klaassen's Compound Engineering.** Plugin shipped, framework named, repo active. Other entries publish architectural stances, named methodologies, or scattered moves without putting a framework label on them. Each entry says directly which it is.

2. **There are almost certainly other named frameworks the walk hasn't surfaced.** This supplementary is a starting map drawn from a small sample of practitioners the AE101 research surfaced through OODA cycles in May 2026. New frameworks ship monthly. Treat the walk as a way to read the field, not as an exhaustive index of what exists.

3. **Quote with care.** Synthetic framings ("phase pipeline", "rails not chains") that circulated on third-party write-ups have been removed where the original practitioner did not publish them. The cost: less aphoristic body prose. The benefit: a student or trainer who looks up a quote will actually find it where the supplementary says it lives.

## Compound Engineering, Kieran Klaassen

The one named, published framework in this set. Klaassen ships a Claude Code plugin (`EveryInc/compound-engineering-plugin`) that names the four-step loop directly: **Plan → Work → Assess → Compound**. The plugin's slash commands include `/ce-plan`, `/ce-work`, `/ce-code-review`, `/ce-compound`, with dozens more skills and review agents. The composite chains these by file path, not by in-context handoff. `ce-plan` writes `docs/plans/<slug>.md`; the next step takes that path as a literal argument. Progress lives in git, never in the plan body. Every seam between steps carries a hard gate (file-existence or `git status` checks) that the next step refuses to start without.

The closure step is explicit. `ce-compound` writes structured docs with YAML frontmatter validated against a schema. Klaassen's framing of `ce-compound`'s job: record the lesson so the next agent uses it, not re-derives it. Lessons land on disk where the next fresh agent finds them by convention.

What's missing or contested: Klaassen's own byline is thin in the freshness window (his last own Every.to post is just outside). Current Klaassen material is mostly third-party write-ups plus the plugin itself, which is actively committed-to.

**Read:**
- [Compound Engineering plugin (`EveryInc/compound-engineering-plugin`)](https://github.com/EveryInc/compound-engineering-plugin): start with the README's named slash commands, then walk the corresponding skill files. The plugin ships dozens of skills and review agents; the wiring shape repeats.

## Composition by invocation, Matt Pocock

Pocock ships a public kit of small named skills at `mattpocock/skills` (active, widely forked). Skill names visible at last read: `to-prd`, `to-issues`, `handoff`, `prototype`, `write-a-skill`, `diagnose`, `triage`, `tdd`, `improve-codebase-architecture`, `grill-me`, `grill-with-docs`, `zoom-out`, `caveman`, `git-guardrails-claude-code`, more. Each skill is small (50 to 200 lines of plain English), standalone, and works copy-pasted into a different agent.

The composition pattern is runtime, not authored. There is no `compose` skill, no orchestrator, no master entry point in the repo. The human invokes the skill the task calls for: `/prototype` when prototyping; `/to-prd` when shaping a product brief; `/handoff` when context needs to move to a new thread. Composition happens in the chat, by hand, one skill at a time.

Pocock does not publish a named framework over the kit. The composability framing that has circulated on third-party write-ups ("rails not chains", "weakly coupled") is not in his README. The kit itself, and the discipline of invoking individual skills when the task calls for them, IS the practice. The README's opening sentence is the closest to a stance: *"My agent skills that I use every day to do real engineering, not vibe coding."*

**Read:**
- [mattpocock/skills](https://github.com/mattpocock/skills): read `to-prd`, `to-issues`, `handoff`, `prototype`, `write-a-skill`. Notice what is missing: no `compose` skill, no orchestrator, no main entry point.
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

Two artefacts in the Amp surface, with different bylines and different shapes.

**Feedback Loopable**, by Lewis Metcalf at Sourcegraph (2026-02-05), is a named methodology Metcalf calls *"making it feedback loopable"*: building things for humans using methods built for agents. His three components, verbatim from the post: *"1. Built a playground. 2. Set up Experiments. 3. Made the inner loop fast."* The playground is a shared agent-human environment. Experiments use URL-driven query parameters for reproducibility. The inner loop is sped up by emitting CLI text output rather than screenshots so the agent can iterate faster. This is Metcalf's coined methodology, not an industry-standard framework.

**Handoff**, anonymous team byline at Amp (2025-10-23), is a product feature shipped by Amp, not a framework. The published description: *"Handoff lets you specify your goal for the new thread. Amp then analyzes the current thread and generates a prompt to start the new thread, along with a list of relevant files."* The argument for handoff over compaction: *"It's lossy, for one. Every time you compact a thread, what's in the context window gets replaced with a summary."* Handoff is a single composition seam Amp ships; it does not arrive as part of a broader framework Amp has named.

What's distinctive about the Amp surface: composition seams ship inside Amp's runtime, maintained by Amp's product team. If Amp ships a better `/handoff` next month, the user gets the upgrade without rewriting any skill files. Klaassen and Pocock keep their composition primitives in their own Git repos; Amp keeps its primitives inside the product.

What's contested: most of Amp's specific primitives are platform-specific. Read the posts for the architectural shape and the methodology framing; do not expect the verbatim primitives to translate to Claude Code or Cursor.

**Read:**
- [Feedback Loopable](https://ampcode.com/notes/feedback-loopable): Metcalf's named methodology, three components in his own words.
- [Handoff](https://ampcode.com/news/handoff): the canonical Amp post on the handoff feature; explains why compaction is lossy.

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

The reason Ronacher matters in this walk: any teaching of composition that does not carry his argument alongside teaches the move and silently teaches its decay. Composition fluency erodes the review discipline that originally justified composition. Willison has flagged the same pattern from a different angle, calling it *normalization of deviance*. If you are going to compose, the question Ronacher forces is *what is your review bandwidth?* If the answer is the same as last year, composition is not yet a multiplier.

**Read:**
- [The Final Bottleneck](https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck/): review bandwidth as the constraint composition cannot relax.
- [Agent Psychosis: Are We Going Insane?](https://lucumr.pocoo.org/2026/1/18/agent-psychosis/): Ronacher's stance on unstructured composition loops.
- [Pi: The Minimal Agent Within OpenClaw](https://lucumr.pocoo.org/2026/1/31/pi/): where the disposable-skills posture is named directly.

## Skill stacking system, Dino: the worked example

Dino is an AE101 trainer and a working engineer who, after the May 2026 cohort, shipped a complete composed skill stack and documented its architecture: a three-layer model (skill shape → classification axes → composition mechanisms), a phase-organised skill catalogue, six workflow archetypes (five funnelling into one orchestrator, one standalone), seven design principles. The primary doc and three diagrams ship as the canonical case study at `supplementary/skill-stacking/`.

The stack carries four composition mechanisms that wire skills into workflows:

- *Explicit load.* One skill names another as a precondition.
- *Orchestrator composition.* `/ship` sequences the ship-half of every workflow with stop-conditions and a re-invocation loop. The chain runs `/testing` → optional `/qa` → `/release-notes` → `/cp` → open PR → `/multi-agent-review` (fresh sub-agent) → `/ci` (background) → hand-off.
- *CLAUDE.md routing.* Predicate-driven dispatch from the project's CLAUDE.md. Dino's predicates: *"behavior change"* → `/tdd`; *"dashboard file under src/analytics-dashboard/"* → `/ui`; *"shared credentials or 3rd-party API"* → `/multi-tenant-security`; *"complex plan"* → `/walk-plan`; *"ship it"* → `/ship`.
- *Hand-off pipelines.* One skill's output feeds the next without orchestration.

Around those mechanisms:

- **A single orchestrator** by deliberate design. `/ship` is the only skill that composes others. Every other skill is a leaf. The orchestrator-vs-leaf distinction is named explicitly in the classification axes as its own posture pole, alongside read-only and mutating.
- **Phase-organised skill catalogue.** Five PLAN-phase read-only analysis skills (including AE101's curated `/access-control-analysis` and `/stride`); BUILD-phase mutating skills with mandatory gates that fire positionally (`/tdd` on behavior change; `/ui` on dashboard files; `/multi-tenant-security` on shared-credentials touch); VERIFY (`/testing`, `/qa`, `/chrome-fast`); SHIP (the orchestrator + its sequenced leaves); OPS (`/bug-triage` loops back to BUILD).
- **Seven design principles** that the system enforces. A skill never duplicates another's logic; orchestrators sequence and gate, never reimplement; mandatory gates have tight predicates (*never "always run this," always "run this when file X is touched"*); composition over inheritance; the loop is re-invocation, not internal recursion; fresh sub-agents replace `/clear`; CLAUDE.md is half the system.

Four distinctive moves stand out:

- **Front-loaded read-only analysis.** Five PLAN-phase skills whose only job is to inspect before mutating, an unusually high analysis-to-action ratio.
- **Mandatory gates fire positionally**, mid-workflow, by predicate. `/ui` doesn't fire at session start; it fires when the engineer opens a dashboard file.
- **Re-invocation as control flow.** When a step in `/ship` fails, the chain stops, the engineer fixes the failure, the engineer types `/ship` again. Internal auto-fix loops are deliberately avoided; in Dino's framing, review feedback is interpretive and auto-applying it can regress correct code.
- **CLAUDE.md as half the system.** Half the composition lives in predicate-dispatch rules inside the project's CLAUDE.md, not inside the skill files. Skills are handlers; CLAUDE.md is the dispatcher.

The dispatcher pattern **scales cross-repo**. Dino runs a pure-routing meta-layer (`/aios`) over a company-level map of repos; the meta-layer points an invocation to the right repo, where that repo's CLAUDE.md then takes over and dispatches to skills. Same routing primitive, two scales: predicate → handler within a repo, predicate → repo across repos. The within-repo dispatcher organises one kit; the cross-repo dispatcher organises a company's repos. Composing the dispatcher with itself at the higher scale is a deliberate move, not an automatic one. But the primitive carries.

What's specific to AE101: the two curated security skills from M3 (`/access-control-analysis` and `/stride`) sit inside the PLAN phase as upstream input to the mutating skills. The training's curated kit is part of Dino's shipped composition; the worked example IS a feedback loop.

**Read:**
- [Dino's skill stacking system](trainings/agentic-engineering-101/supplementary/skill-stacking.md): Dino's primary doc. The three-layer model, four composition mechanisms, skill catalogue, six workflow archetypes, seven design principles, in his own words. Three diagrams ship alongside the doc in `supplementary/skill-stacking/`: phase swimlane, `/ship` anatomy, workflow archetypes.

## How to pick what to study

Three filters that work better than ranking:

1. **What shape is your real work?** If you're shipping multi-file engineering changes with clear phases and want a published framework you can install today, Klaassen. If you're already shipping things one skill at a time and want a model for runtime composition, Pocock. If your team is wrestling with parallel-writer chaos, Yan/Cognition. If your team has standardised on Amp's runtime, Metcalf and the Amp surface by default.

2. **How much orchestration do you want to author?** Klaassen is heavy on orchestration (gates, schemas, composite skills). Pocock is light (human picks the chain). Cognition is somewhere in between. Cherny's published moves are the lightest published assembly, individual primitives the human composes mentally. Pick the load you will actually maintain.

3. **What review bandwidth do you have?** Read Ronacher first if the answer is *not much*. Composition without review is the failure mode he names.

Two or three practitioners is enough to track. Watch what they ship in their own venues, not what third-party write-ups distill from them. The composition conversation will keep moving. The shape of work each practitioner handles is the slower-moving signal. And keep an eye out for named frameworks this walk does not yet cover; the curation is partial by design.

<!-- maintainer -->


**Quality:** draft 2026-05-21 (rewritten 2026-05-21 after Cycle 3 confirmation + Antti fact-check; supersedes the 2026-05-20 draft. Five practitioner-grounded shapes plus counter-position; field-totality claims dropped; quote attributions verified against direct sources where possible. 2026-05-24: added Dino's skill-stacking worked-example section + `skill-stacking/` primary doc + three diagrams.)

**Supplementary meta:** *Reading material for AE101 M6 practitioner-mode beat. Pairs with `lectures/composing-the-workflow.md`. Seven sections: one named framework (Klaassen), four shapes (Pocock / Yan-Cognition / Metcalf-Amp / Cherny-moves), one counter-position (Ronacher), one worked-example case study (Dino, AE101 trainer). Closes with three filters for picking what to study first. Explicit scope note in intro: the walk is partial, the field has more named frameworks than this set surfaces, the curation reflects what AE101's OODA cycles caught.*

**Time:** 15–25 min student read; not in-room.

**Delivery mode:** Linked from M6's `composing-the-workflow.md` lecture. Optional reading after M6 closes, or pre-read between M6 and post-cohort follow-up.

**Source verification — MUST DO before first cohort.**

Source-of-truth: `continuous-research/findings/by-pattern/workflow-composition-{1a,1b,2a,2b,3-confirmation}.md` plus the 2026-05-21 direct-source verification batch logged in this session. Cycle 3 confirmed URLs live; the 2026-05-21 pass confirmed verbatim quote attribution against each practitioner's own publication.

- https://github.com/EveryInc/compound-engineering-plugin [practitioner direct, vendor venue] — verify `/ce-plan`, `/ce-work`, `/ce-code-review`, `/ce-compound` slash commands still named in the README. "Dozens of skills + review agents" avoids count-drift; Cycle 2A counted 37 + 51 against the README at that date.
- https://x.com/bcherny/status/2007179832300581177 [practitioner direct] — Cherny's 2026-01-02 X thread. Verify the moves listed in the body (subagents named, hook, /permissions, MCP, long-running options, verifier-2-3x) still match the thread. If X.com access is paywalled at re-verify time, the moves are also documented in CarolinaCherry's digest below as a fallback aggregator.
- https://howborisusesclaudecode.com/ [practitioner analysis] — @CarolinaCherry on Cherny. Fan-curated digest; explicitly labeled in body as third-party aggregation. Cycle 3 (2026-05-21) identified the byline error in earlier OODA cycles; this entry now carries the correct label and is cited as aggregator, not as Cherny-direct.
- https://github.com/mattpocock/skills [practitioner direct] — verify `to-prd`, `to-issues`, `handoff`, `prototype`, `write-a-skill`, `setup-matt-pocock-skills` skill files still exist. Repo grew well beyond the snapshot at Cycle 3; generalise list if specifics drift. The "rails not chains" verbatim was dropped 2026-05-21 because not in his README. Pocock-direct evidence is the kit itself + the README's opening sentence; the runtime-invocation pattern is also corroborated by Antti's direct practitioner observation.
- https://cognition.ai/blog/multi-agents-working [practitioner direct, vendor venue] Walden Yan (2026-04-22) — verify both verbatim quotes: *writes stay single-threaded… contribute intelligence rather than actions* and *Devin Review catches an average of 2 bugs per PR, of which roughly 58% are severe (logic errors, missing edge cases, security vulnerabilities)*. Confirmed 2026-05-21.
- https://cognition.ai/blog/dont-build-multi-agents [practitioner direct, vendor venue] — Cognition 2025 stance; verify live.
- https://ampcode.com/notes/feedback-loopable [practitioner direct, vendor venue] Lewis Metcalf (2026-02-05) — verify Metcalf's three components (*Built a playground / Set up Experiments / Made the inner loop fast*) and his coined methodology phrase (*making it feedback loopable*). Confirmed 2026-05-21. The third component is "Made the inner loop fast" in Metcalf's own words; earlier OODA cycles relabeled it "Verification Loop" — that relabel was dropped 2026-05-21.
- https://ampcode.com/news/handoff [practitioner analysis] (2025-10-23, anonymous team byline) — outside 6-month freshness window for cohorts after 2026-04-23. Body frames as canonical statement of the move; keep as historical context per `check_research_claims.md §2`. Cycle 3 (2026-05-21) corrected the byline label from [practitioner direct] to anonymous-team; supplementary now reflects this.
- https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck/ [practitioner direct] Armin Ronacher (2026-02-13) — verify verbatim quote *If the machine writes the code, the machine better review the code at the same time*. Confirmed 2026-05-21.
- https://lucumr.pocoo.org/2026/1/18/agent-psychosis/ [practitioner direct] Ronacher (2026-01-18) — verify live.
- https://lucumr.pocoo.org/2026/1/31/pi/ [practitioner direct] Ronacher (2026-01-31) — verify verbatim quote *My agent has quite a few skills and crucially I throw skills away if I don't need them*. Confirmed 2026-05-21.

**Freshness:** The Amp handoff post (2025-10-23) is past the 6-month window for cohorts after 2026-04-23. Body frames as canonical statement and historical context per `check_research_claims.md §2`. Do not auto-flag.

**Frameworks attributed:**
- **Compound Engineering** — Kieran Klaassen [practitioner direct, vendor venue]. Named, published, plugin-shipped.
- **Composition by invocation** — Matt Pocock [practitioner direct]. Practice is real and observable; framework label is the curriculum's, not Pocock's.
- **Single writer with advisor agents** — Walden Yan / Cognition [practitioner direct, vendor venue]. Architectural shape published verbatim by Yan; the curriculum-side label is shorthand.
- **Feedback-loopable methodology** — Lewis Metcalf at Sourcegraph Amp [practitioner direct, vendor venue]. His coined methodology.
- **Handoff feature** — Sourcegraph Amp [anonymous team byline]. Vendor feature, not framework.
- **Practitioner moves catalogue** — Boris Cherny [practitioner direct]. Composition primitives published on X; no unified framework label by Cherny.
- **Review-bottleneck counter-position** — Armin Ronacher [practitioner direct]. Argument, not framework.
- **Normalization of deviance (composition fluency erodes review)** — Simon Willison [practitioner direct]; sourced from Cycle 1A practitioner sweep, no direct URL in supplementary body but URL in OODA findings.
- **Skill stacking system** — Dino [practitioner direct, AE101 trainer]. Three-layer model + four composition mechanisms + seven design principles, shipped 2026-05-24 with the primary doc and three diagrams at `skill-stacking/`. The framework label is Dino's own; permission to ship granted by the author.

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
- ~~**Lecture-side reframe.**~~ Closed 2026-05-21: `lectures/composing-the-workflow.md` body now reads *"At least five approaches in active use among the practitioners this curriculum surveys, plus a counter-position arguing the human reviewer is the constraint"* and walks the five approaches + Ronacher counter in one line each. Aligned with the supplementary's framing (five shapes / methodologies / move-catalogues + Ronacher counter; named-framework label reserved for Klaassen).
- **Intercom and Ramp lineages NOT named.** Cycle 1 surfaced them; they're enterprise-org-shaped and live more naturally in a future Engineering Management variant.

**Vision vs. detail:**
- Vision layer: the field is mid-evolution; one published framework + several shapes + one counter-position; honest scope.
- Detail layer: every URL, every named file path, every quote (each verified against the practitioner's own publication 2026-05-21).
