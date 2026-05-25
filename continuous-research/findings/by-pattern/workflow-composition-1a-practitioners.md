# Workflow composition — Cycle 1A practitioner sweep

Research question: How do the best practitioners currently compose workflows?
Date: 2026-05-20
Cycle: 1A (practitioner-by-practitioner sweep)
Freshness window: since 2025-11-20
Purpose: Inform AE101 Module 6 composition-move design (final module).

## Per-practitioner findings

### Kieran Klaassen (Every / Cora)
**What they're composing:** A repeatable four-step loop — **Plan → Work → Assess → Compound** — packaged as a Claude Code plugin, where the output of each step is the input of the next, and the final step writes learnings back into CLAUDE.md so the next loop starts smarter.
**Specific moves:**
- **Compound Engineering loop (Plan/Work/Assess/Compound)** — Sub-agents research in parallel during Plan; review agents (security, architecture, quality) triage during Assess; Compound captures lessons into discoverable artifacts. — https://creatoreconomy.so/p/how-to-make-claude-code-better-every-time-kieran-klaassen [practitioner analysis] (2026-02-08)
- **Compound Engineering Camp / plugin** — Distillation of the loop as installable slash commands; 7,000+ GitHub stars. — https://every.to/source-code/compound-engineering-camp-every-step-from-scratch [practitioner analysis] — Katie Parrott on Klaassen's system, *Every* (2026-03-13); treat metrics as self-reported
- **`/LFG` composite skill** — "One prompt to go from 0 to production" — explicit chain primitive that calls Plan + Work + Assess sub-skills.
**Three-gates:** Agentic? Y · Independent evidence? Y (Larson externally validated; widely forked plugin) · Specific outcome? Partial — plugin stars + Every's "5 products with single-person teams" claim, but no independent throughput metric.
**Representative quote:** "The core idea is a four-step loop: Plan, work, review, compound. Each step has a specific input and a specific output."
**Notes:** Direct Klaassen byline since 2025-11-20 is thin — last own post was "Stop Coding and Start Planning" (2025-11-06, just outside window). Current material is third-party write-ups + X.com posts pointing back to the plugin. Treat product/customer counts as vendor-self-reported.

### Armin Ronacher
**What they're composing:** Notably, NOT composing in the kit-of-primitives sense. Ronacher's 6-month output argues the opposite — composition cannot fix the **human-review bottleneck**, only throttle inflow. His "skills" are deliberately disposable, not chained.
**Specific moves:**
- **The Final Bottleneck** — "If the machine writes the code, the machine better review the code at the same time" — implicit machine-writer → machine-reviewer → human pipeline, presented as inevitable not recommended. — https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck/ [practitioner direct] (2026-02-13)
- **Disposable-skills posture** — From earlier `Pi` post (2026-01-31, just inside window): "I throw skills away if I don't need them." Writing-down IS the work, but the artefacts are local and ephemeral, not a marketplace.
- **Pushing Local Models** — https://lucumr.pocoo.org/2026/5/8/local-models/ [practitioner direct] (2026-05-08) — focus + polish, not composition.
**Three-gates:** Agentic? Y · Independent evidence? Y (CircleCI 8M-PR dataset confirms his Little's Law framing) · Specific outcome? Y (MiniJinja Go port: $60, 2.2M tokens).
**Representative quote:** "It cannot really be automated... for as long as I carry responsibilities and am accountable, this will remain true."
**Notes:** Ronacher is the **counter-evidence anchor** for this research question. He's a fellow traveller in workflow craft, but his core claim is that workflow composition is mostly throttling, not multiplication.

### Boris Cherny (Anthropic, Claude Code lead)
**What they're composing:** A **phase-pipeline of specialised subagents** — spec → draft → simplify → verify — run in parallel across 5+ git worktrees, with subagents stored in `.claude/agents/` as the composition primitive.
**Specific moves:**
- **Subagent pipeline** — `code-simplifier`, `verify-app`, `code-architect`, `build-validator`, `oncall-guide` — each automates "the most common workflows I do for most PRs."
- **`/go` composite skill** — "Many of my prompts look like 'Claude do blah blah /go'" — one skill that chains verify + simplify + PR creation.
- **Worktree-parallel execution** — 5 tabs, each its own git checkout, system notifications for input. Plus 5-10 web Claudes with `teleport` to hand off between web and local.
- **Verifier-2-3x claim** — giving the agent a way to verify (browser automation, bash, test suite) improves output quality 2-3x.
- — https://howborisusesclaudecode.com/ [practitioner analysis] — @CarolinaCherry fan-digest *of* Cherny, NOT Cherny's own byline; treat every Cherny quote drawn from it as paraphrase (parts dated Jan–Apr 2026). The clean [practitioner direct] Cherny source is the Threads post below.
- — Original Threads post: https://www.threads.com/@boris_cherny/post/DTBVlMIkpcm [practitioner direct]
**Three-gates:** Agentic? Y · Independent evidence? Y (widely forked at https://github.com/meleantonio/ChernyCode and as community skill packs) · Specific outcome? Partial — 2-3x quality claim is self-reported, no methodology or definition of "quality".
**Representative quote:** "Coding becomes a pipeline of phases: spec, draft, simplify, verify. Each phase benefits from a different mind."
**Notes:** This is the most explicit "primitive kit → composition" statement of any practitioner sampled. Cherny treats subagents as **the** composition primitive.

### Matt Pocock
**What they're composing:** A **toolkit of 50–200 line markdown skills** with deliberately weak coupling — composition happens at the human's discretion, not via an orchestrator. The cohort layer adds a taught pattern (Plan/Execute/Clear, Ralph Wiggum loop, AGENTS.md, feedback loops, autonomous agent loops) over the toolkit.
**Specific moves:**
- **`mattpocock/skills` repo** — `grill-me`, `grill-with-docs`, `tdd`, `diagnose`, `triage`, `improve-codebase-architecture`, `to-prd`, `to-issues`, `zoom-out`, `prototype`, `caveman`, `handoff`, `write-a-skill`. ~54k GitHub stars in ~90 days. — https://github.com/mattpocock/skills [practitioner direct] (initial commit 2026-02-03)
- **`/setup-matt-pocock-skills`** — per-repo config scaffolder (issue tracker, triage labels, domain doc layout); explicit dependency-injection point that other skills consume.
- **"YOLO vs OH NO" framing** — "design your process, encode it as skills, let the agent ride the rails you laid" — composition as rail-laying, not orchestration.
- **Cohort taught-stack** — Plan/Execute/Clear, AGENTS.md, custom skills, multi-phase planning, feedback loops, autonomous loops, Ralph Wiggum loop. — https://www.aihero.dev/cohorts/claude-code-for-real-engineers-2026-04 [practitioner direct, vendor venue] (cohort ran 2026-03-30 to 2026-04-13)
**Three-gates:** Agentic? Y · Independent evidence? Y (54k stars; multiple independent reviews) · Specific outcome? Partial (token-reduction claims via `/caveman` ~75% self-reported, no methodology or baseline).
**Representative quote:** "These skills are designed to be small, easy to adapt, and composable. They work with any model."
**Notes:** The composition philosophy is **explicit weak coupling** — no DSL, no orchestrator, plain English. Copy a skill into a different agent and it still works. This is the polar opposite of an orchestrator-heavy framework.

### Simon Willison
**What they're composing:** **Parallel-agent + black-box-team** model — fires multiple Claude Codes simultaneously, treats them like external contractors, validates by empirical use rather than line-by-line review.
**Specific moves:**
- **Parallel agents** — "I can fire up four agents in parallel and have them work on four different problems... I feel the effects before noon" (Lenny's Podcast, 2026-04-03). [SOURCE NEEDED — supply episode URL; a podcast interview write-up is [practitioner analysis], not practitioner-direct]
- **Agentic Engineering Patterns project** — Design-Patterns-style catalogue, 1–2 chapters/week. Published: "Writing code is cheap now", "Red/green TDD". — https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/ [practitioner direct] (2026-02-23)
- **Use-test trumps review-test** — "I want somebody to have used the thing... a vibe-coded thing you've used every day for the past two weeks is much more valuable" — composition is validated by usage in production, not by inspection. — https://simonwillison.net/2026/May/6/vibe-coding-and-agentic-engineering/ [practitioner direct] (2026-05-06)
- **LLM tool refactor** — https://simonwillison.net/2026/Apr/29/llm/ [practitioner direct] — supporting agent composition at the CLI tool layer.
**Three-gates:** Agentic? Y · Independent evidence? Y (covered cross-domain: StrongDM, Intercom) · Specific outcome? Y (own daily practice documented).
**Representative quote:** "I've started to blur agentic engineering with vibe coding, which is quite upsetting" — composition has eroded his own review discipline (normalization of deviance).
**Notes:** Willison is composing but he's **flagging stance-internal risk** — that the very fluency of composition can erode the verification discipline that makes it work.

### Darragh Curran + Brian Scanlan + team (Intercom)
**What they're composing:** The most organisationally elaborate composition surfaced — **13 plugins + 100+ skills + lifecycle hooks + sub-agent PR-review architecture + eval-gated auto-approval**, distributed via an internal marketplace, instrumented at every Claude Code lifecycle event.
**Specific moves:**
- **Plugin/skill marketplace** — 31% of R&D contributes; 267 named skills. Auto-updating; one engineer's improvement propagates to all 473 R&D staff. — https://ideas.fin.ai/p/2x-nine-months-later [practitioner direct, vendor venue] Curran byline (2026-04-16)
- **Named plugins:** Admin Tools MCP (production visibility with safety gates), Flaky Test Fixer (9-step forensic, 20-category taxonomy), QA Pipeline (7-stage), Claude4Data (30+ analytics skills), Video Transcript Skill. — https://ideas.fin.ai/p/how-we-use-claude-code-today-at-intercom [practitioner direct, vendor venue] Brian Scanlan byline (2026-03-19)
- **Hooks-as-composition-glue** — PreToolUse blocks unauthorized PR creation; PostToolUse detects command failures; SessionEnd analyses transcripts with Haiku for gaps. Lifecycle events become composition seams.
- **PR-review sub-agent architecture** — decomposes review into 5 sub-tasks: problem-statement quality, diff-to-intent alignment, safety detection, logical correctness, best-practices. Won't approve large PRs (forced break-down). — https://www.intercom.com/blog/ai-is-approving-our-pull-requests-heres-how-we-made-it-safe/ [practitioner direct, vendor venue] Mykhailov + Young (2026-04-21)
- **Tier metric:** 19.2% PRs auto-approved (target >50%); 497 fully-autonomous PR cycles in 4 weeks of rollout.
**Three-gates:** Agentic? Y · Independent evidence? Y (Anthropic case study cross-references; community plugin at https://github.com/intercom/claude-plugin-external) · Specific outcome? Y — but metrics vendor-self-reported (revert-rate 0.53% AI vs 5.39% human, defect backlog −54%, ship time −39%, cost-per-PR halved, 6x output for top 5%).
**Representative quote:** "All technical work is becoming agent-first. This is the top priority for R&D."
**Notes:** **Highest signal for the curriculum question.** Intercom is the only sample where composition is a **distributed-team primitive** rather than a single-practitioner setup. Metrics need [vendor venue] caveat; mechanism is the durable signal.

### Geoff Charles + team (Ramp)
**What they're composing:** A **350-skill marketplace ("Dojo") with a recommendation layer ("Sensei")** that routes role-relevant skills to employees based on tool usage and recent activity. Skills are markdown in Git — forkable, reviewable as code.
**Specific moves:**
- **Dojo skills marketplace (350+)** — Sales: Gong call analysis + battlecard generator. Support: Zendesk investigation. Finance: spend-anomaly detection. Engineering: PR-review + repo-specific debugging. — https://aicatchup.com/practices/internal-ai-workspaces-playbook [practitioner analysis] (2026, undated specific)
- **Sensei recommendation system** — surfaces skills based on employee role, tool usage, recent activity.
- **Version control as composition substrate** — "version-controlled, code-reviewed artifacts rather than closed prompts."
- **99.5% AI adoption claim** — https://digitalstrategies.tuck.dartmouth.edu/what-ramps-99-5-ai-adoption-rate-means-for-educators/ [academic/research] (2026; reports Ramp's self-reported figure — the 99.5% remains vendor-self-reported)
**Three-gates:** Agentic? Partial (skills are mostly retrieve-and-summarise workflows, not multi-step autonomous) · Independent evidence? Y (Tuck case study, Charles' own talks) · Specific outcome? Partial (99.5% adoption metric is Ramp-self-reported).
**Representative quote (not from Charles direct in this sweep):** "One person's breakthrough should become everyone's baseline." — Goddijn (Ramp), companion piece.
**Notes:** Could not find a 6-month-fresh **Charles-byline** piece on Ramp's own site (most recent posts pre-window or product-newsletter). Conference talk evidence (https://www.youtube.com/watch?v=RBqT2PHWdBg — [unlabeled; byline check owed before use]) exists but not opened in this sweep. Mechanism is well-attested via third-party analysis.

### Sourcegraph Amp team (Quinn Slack, Lewis Metcalf, Harry Charlesworth)
**What they're composing:** **Context-preserving handoffs + feedback-loopable playgrounds + sub-agents** — composition primitives that solve specific named failure modes (lossy compaction, untestable agent output, single-agent context overflow).
**Specific moves:**
- **Handoff (replaces compaction)** — `/handoff <new goal>` extracts what matters for next task from current thread; user-editable draft in new thread; "move work into new threads without losing your built-up context." — https://ampcode.com/news/handoff [practitioner direct, vendor venue] (2025-10-23 — slightly outside window but referenced as still-current canonical move)
- **Feedback Loopable** — three-part composition: Playground (shared agent-human env) + Experiments (URL-encoded reproducible state) + Verification Loop (headless CLI text feedback over screenshots). — https://ampcode.com/notes/feedback-loopable [practitioner direct, vendor venue] Lewis Metcalf (2026-02-05)
- **How to Pair with an Agent** — chain shape: specification → reference implementation → embedded verification → iteration. "Trust isn't a feeling, it's a passing test suite." — https://ampcode.com/notes/how-to-pair-with-an-agent [practitioner direct, vendor venue] Harry Charlesworth (2026-01-14)
- **Sub-agents in Amp** — distinct from Claude Code's subagents; Amp has them as a first-class primitive (June 2025 announce, still current).
**Three-gates:** Agentic? Y · Independent evidence? Partial (Mitchell Hashimoto + others reference Amp, but this is also Sourcegraph's own product) · Specific outcome? Partial (mechanism well-documented, throughput claims thin).
**Representative quote:** "A playground is an environment for both Amp and the human to play. It's a way to make a problem easy to stretch and break, so we can find the edges in a controlled way." — Metcalf
**Notes:** Vendor-venue, but practitioner bylines (Metcalf, Charlesworth, Slack, Hashimoto). Mechanism > metrics here. Handoff is the named composition primitive most likely to converge with Klaassen-Compound and Cherny-pipeline.

### Optional: Paweł Huryn
**What they're composing:** Multi-agent orchestration in **n8n** (workflow-automation tool with MCP/A2A), aimed at PMs not engineers. Persistent knowledge system that learns from every session.
- "Not a prompt library. Not a workflow. A persistent knowledge system that learns from every session." — substack note, 2026 [SOURCE NEEDED — supply Substack post URL]
- Recommends: orchestration skills, ReAct vs Plan-and-Execute, evals from day one.
**Three-gates:** Agentic? Y · Independent evidence? Partial · Specific outcome? Partial (5.2M X impressions self-reported).
**Notes:** Different audience (PM, not eng). Useful as **non-engineer composition** reference but not a primary signal for AE101.

---

## Convergence scan

Named moves appearing across **3+ independent practitioners**:

1. **Specialised-subagents-as-composition-primitive** (5 practitioners: Klaassen Plan-agents + Assess-agents; Cherny code-simplifier/verify-app/code-architect; Curran PR-review 5 sub-tasks; Pocock skills-as-subagents-in-spirit; Amp explicit subagents). **L2 — early convergence signal (N=5, two sources vendor-venue/partial-agentic; L3 needs 10–20).** The unit of composition is a named, narrow, repeatable subagent — not a monolithic prompt.

2. **Verifier-embedded-in-loop** (6 practitioners: Klaassen Assess step; Cherny verify-app + 2-3x claim; Charlesworth/Amp "trust is a passing test suite"; Pocock `tdd` + `diagnose`; Curran AI-PR-review gates; Willison empirical-use-test). **L2 — early convergence signal (N=6; L3 needs 10–20).** Verification is composed in-line, not bolted on after.

3. **Plan→Work→Verify pipeline shape** (4 practitioners explicitly named: Klaassen Plan/Work/Assess/Compound; Cherny spec/draft/simplify/verify; Pocock Plan/Execute/Clear; Amp specification→reference→verification→iteration). **L2 — early convergence signal (N=4; L3 needs 10–20).** The phase sequence is near-identical across independent vocabularies.

4. **Skills-as-version-controlled-markdown** (4 practitioners: Pocock public repo; Ramp Dojo Git-backed; Intercom plugin marketplace; Klaassen plugin). **L2 — early convergence signal (N=4, two of four vendor-venue; L3 needs 10–20).** Composition primitives are markdown files in Git, not prompt-library SaaS.

5. **Parallel-agents-in-worktrees** (3 practitioners: Cherny 5 tabs/worktrees; Willison 4-agents-before-noon; Intercom 497 autonomous PRs in 4 weeks). **L2 — early convergence signal (N=3; L3 needs 10–20)**, but operationally heavier than the others — requires accept-loss + recovery patterns.

6. **Context-handoff as named primitive** (3 practitioners: Amp `/handoff`; Pocock `handoff` skill; Cherny `teleport` web-to-local). **L2 — early convergence signal (N=3; L3 needs 10–20).** Solving the cross-session context loss is a recognised, named composition seam.

7. **Compound/learn-back into CLAUDE.md or equivalent** (3 practitioners: Klaassen Compound step; Cherny "Each tip refines my CLAUDE.md"; Pocock per-repo `/setup` scaffolder). **L2 — early convergence signal (N=3; L3 needs 10–20).** The loop closes on persistent memory; without this step, the system doesn't compound.

**The strongest 4-way overlap is moves 1 + 2 + 3 + 4: a kit of small markdown subagents that compose into a plan→work→verify→learn pipeline.** That's the strongest candidate composition shape from this curated sample (N=3–6 practitioners per move) — a hypothesis for the M6 design call to test, not a validated industry pattern.

## Counter-evidence flags

- **Ronacher: composition cannot solve the review bottleneck**, only throttle inflow. He keeps skills disposable and posts experiments individually, not as chained loops. If composition is the curriculum frame, Ronacher's review-bandwidth argument is the disconfirming-evidence anchor — name it explicitly.
- **Willison's normalization-of-deviance warning**: composition fluency erodes the review discipline that originally justified composition. The very practitioners who can compose stop verifying.
- **Pocock: no orchestrator, no DSL, no required chaining** — explicit anti-position on heavy composition frameworks. Skills are weakly coupled by design; the human picks the chain at runtime.
- **Curran/Intercom counter-flag**: Intercom is large, structured, well-instrumented. Their composition depends on hooks + audit + sub-agents that smaller teams don't have. Composition-as-org-primitive may not scale down to 3-person teams without an SRE-grade telemetry layer.
- **Ramp adoption-as-success metric**: 99.5% adoption is a participation rate, not a throughput-per-employee number. Cf. Intercom's per-PR metric, which is more rigorous.

## What I did not find

- **Klaassen own byline** in the freshness window (his last own Every.to post is 2025-11-06 "Stop Coding and Start Planning", days outside window). Current Klaassen material is third-party write-ups (Katie Parrott at Every; Creator Economy summary; podcast write-ups) and X.com short posts. The plugin itself + Larson's validation post (2026-01-19) carry the load.
- **Geoff Charles fresh byline** on Ramp's blog within window — most recent posts under his author page are pre-Nov-2025 and product-newsletter shaped. Conference talks (YouTube, Speaker Deck) exist but not opened in this sweep. The Dojo mechanism is well-attested via Goddijn + Buchan companion pieces and Tuck case study.
- **Matt Pocock cohort recordings/post-cohort write-ups** — cohort ran 2026-03-30 to 2026-04-13. No public post-cohort retrospective from Pocock surfaced; cohort content behind enrollment paywall. Skills repo + X posts + AIHero curriculum page carry the signal.
- **Boris Cherny long-form** — `howborisusesclaudecode.com` is the canonical source (he posted on Threads pointing there). No deeper Anthropic-blog post-mortem in window.
- **Paweł Huryn** — searched but his focus is n8n/PM-audience, not engineer-grade composition. Tangential to AE101.
- **Daniel Sottiaux** — nothing surfaced in two searches; either pseudonymous or not active in this material window.
- **Klaassen X-thread (`2020638198649811203`)** — returned 402 paywall; quote not captured directly. Substance covered via the Creator Economy + Every write-ups.

---

## Curriculum implication (one paragraph for the M6 design call)

The composition move worth teaching in M6 is **"compose a named kit of 3–5 small markdown subagents into a plan→work→verify→learn loop, version-controlled, with one step that writes a learning back into the project's persistent memory."** That's the strongest candidate shape (L2 supporting evidence, N=3–6 practitioners per move — not yet L3) across Klaassen, Cherny, Pocock (implicitly), Intercom, Ramp, and Amp. Single-step authoring is already covered at M3/M6 first half; the missing move is the **wiring**: how the output of one subagent becomes the input of the next, and how the final step closes the loop on persistent memory so the next cycle starts smarter. Ronacher's counter-position (composition is throttling, not multiplication) and Willison's normalization-of-deviance warning belong as the failure-mode callouts inside the same module — otherwise the curriculum teaches the move and silently teaches its decay.
