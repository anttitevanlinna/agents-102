# Cookbook for Agent System Design

*This is how you do it.* A practitioner's cookbook — the moves, in sequence, that take someone from a chat conversation to a real agent system they can stake their reputation on. Not theory. Recipes you can run on Monday.

The first three recipes are the Bootstrap training's spine, written out as standalone how-to. After Bootstrap, you own them. New recipes get added as they mature — cloud deployment, team sharing, cross-org promotion, the rest.

Read any recipe in order or any recipe standalone. They stand alone; together they compose.

## Recipe 1 — A piece of output that is genuinely yours

*Referenced from: Module 1 (getting-going).*

**What you end with:** one artifact — a site, a memo, a profile page, a pitch — that sounds like you, not like Claude. Specific to your situation, written in your voice, correct on the facts only you know.

**The moves, in order:**

*(To be written out as Pass 3 completes. Current Module 1 exercise file is the seed. Pattern: baseline without context → the differentiation frame (colleague-as-buyer, StoryBrand-adjacent) → strengths that serve them → look back at the baseline to find the fabrication → anti-branding via mirror → free iteration until "this is me." Store learnings as a `CLAUDE.md` guardrails file. The guardrails file is the first durable artifact.)*

**The test:** a colleague who knows you reads it and says "yeah, that's you." Not "that's impressive" — "that's you."

**Why this is recipe 1:** you are the one evaluator you can't fool on your own content. Learning to spot fabrication on something you know cold is the foundation skill for everything that follows.

---

## Recipe 2 — A compounding system around one live challenge

*Referenced from: Module 2 (building-agent-systems).*

**What you end with:** a text-on-disk memory for one real decision you're making, curated from three source zones (internal wiki, internal collab suite, curated internet), served by a custom agent that cites back to sources, and a daily scheduled touch that renders in your company's house style.

**The moves, in order:**

*(To be written out as Pass 3 completes. Current Module 2 exercise + homework files are the seed. Pattern: pick a live challenge (prework) → curate three sources with Claude's help → load into a memory with plan-mode review → build a custom agent as a markdown file with rules → add sources, watch pages sharpen not grow → let the memory audit itself → schedule a daily touch → extract the house style into `style.md` → every HTML output inherits it. The root `CLAUDE.md` grows across the whole training, one rule at a time.)*

**The test:** a week after training, you're still reading the morning output, and the memory is noticeably sharper than the day you built it.

**Why this is recipe 2:** persistence + automation = system. A chat can't compound. A folder of markdown can.

---

## Recipe 3 — A multi-agent system that answers a strategic question

*Referenced from: Module 3 (multi-agent-systems).*

**What you end with:** a fan-in pipeline that retrieves from three source zones in parallel (three Claude Code sessions on shared files), then synthesises through three subagent stances in one session (backward-from-end planner, Martin's *what would have to be true?*, Sutherland-style reframer), guardrailed by a strategic framework (Rumelt's kernel by default). Output is a framework-shaped answer to your real strategic question — and an plain note of what about the answer you're not sure about.

**The moves, in order:**

*(To be written out as Pass 3 completes. Current Module 3 exercise file is the seed. Pattern: write the strategic question → open four Claude Code sessions on the shared directory → paste three retriever prompts (one per source zone) → let them run in parallel, answer their confirmations → main session spawns three subagent stances → stances return, then synthesiser combines against the framework → note the uneasy distance in `module-3/wonder.md`. The uneasy distance is the feature, not the bug — Recipe 5 picks it up.)*

**The test:** the answer is specific enough that you'd bring it to your CEO as a starting draft, and plain enough that you know which sentence you wouldn't stake your reputation on yet.

**Why this is recipe 3:** some work genuinely needs more than one agent — when access, dialect, or stance differ, coordination earns its keep. Most work doesn't. Learn the move; respect the default.

---

## Future recipes

These are the recipes that extend the cookbook beyond Bootstrap. Placeholders now; built out as each graduates from experiment to reliable practice.

- **Recipe 4 — A scoped agent your organisation can trust.** Skills, permissions, policy guardrails. From Module 4.
- **Recipe 5 — An agent output you can stake your reputation on.** The quality loop: generate → evaluate → tighten rules → regenerate. Named fabrication patterns and how to catch them. From Module 5.
- **Recipe 6 — A set of evals that steer output, not just test it.** Convergence evals + steering evals. The eval as assumption. From Module 6.
- **Recipe 7 — Promoting your personal system to your team.** Shared access, named owners, the handover. From Module 7.
- **Recipe 8 — An agent that builds other agents.** Meta-capability, compounding by construction. From Module 8.

### Recipes beyond the training

Written as they stabilise:

- **Cloud deployment.** Moving a working local system to a hosted runtime (Cowork / Routines / equivalent). What changes, what breaks, what becomes easier.
- **Team sharing.** Promoting memorys and agents from personal scope to shared scope — without the usual collaboration-software rot.
- **Cross-org reuse.** Pattern libraries, agent marketplaces, the sensible portions of each.
- **Integration with existing enterprise systems.** ERP, CRM, data warehouse, iPaaS.
- **Observability and cost control.** Watching what the agent actually does and what it costs when it does.
- **Handoffs to non-agent systems.** The seams where automation ends and human work begins — by design, not by accident.

Add a recipe when the practice is reliable enough that a working practitioner would recommend it to another without caveats. Not before.

<!-- maintainer -->

**Status:** stub, Pass 1 structural. Recipes 1–3 have seeded content in their module exercise files; full write-outs are deferred to Pass 3 of each module (when the module's content has stabilised).

**Build order:**
- Pass 1 (now, 2026-04-19): this structural placeholder.
- Pass 2 (as each module reaches Pass 3): promote the module's exercise body into a standalone recipe in this cookbook, decoupled from training-specific framing (no "Phase 1 / Phase 2" internal numbering; just the moves).
- Pass 3 (near training completion): final polish pass, cross-references, consistent voice, examples-in-line for each recipe.

**Frameworks riffed on:**
- Cookbook-as-genre (Chez Panisse Menu Cookbook energy; Mastering the Art of French Cooking for accessibility). The right vibe is *a practitioner's book, not a theory book.*
- Practitioner cookbook writing as the quality bar: concrete recipes, live constraints, and enough judgment to help the reader choose.

**Why this supersedes the earlier "lifecycle doc" idea:**
- Lifecycle implies one canonical path; cookbook implies many recipes the practitioner composes. The agentic build space is too varied for a single lifecycle to hold plainly.
- Recipes compose; lifecycles gatekeep. We're anti-gatekeeping.
- Cookbook extends naturally (new recipes) without the earlier recipes going stale. A lifecycle doc goes stale the moment the world shifts — which it does every quarter.

**Reference quote (Antti — capture for the opening once polished):**
> "The first thing you build is for you, because you're the only evaluator you can't fool. Then we turn to work — because that's where the system has to stand up."

*(Quote drafted for Antti's voice; edit freely or swap.)*
