# Cookbook for Agent System Design

*This is how you do it.* A practitioner's cookbook, the moves, in sequence, that take someone from a chat conversation to a real agent system they can stake their reputation on. Recipes you can run on Monday.

The first three recipes are the Agents 101 training's spine, written out as standalone how-to. After Agents 101, you own them. New recipes get added as they mature, cloud deployment, team sharing, cross-org promotion, the rest.

Read any recipe in order or any recipe standalone. They stand alone; together they compose. Several recipes show their *what you end with*, *the test*, and *why* now; the move-by-move write-ups land as each module's content stabilises, recipe shape first, full detail as it earns the ink.

## Recipe 1, A piece of output that is genuinely yours

*Referenced from: Module 1 (getting-going).*

**What you end with:** one artifact, a site, a memo, a profile page, a pitch, that sounds like you, not like Claude. Specific to your situation, written in your voice, correct on the facts only you know.

**The test:** a colleague who knows you reads it and says "yeah, that's you." Not "that's impressive", "that's you."

**Why this is recipe 1:** you are the one evaluator you can't fool on your own content. Learning to spot fabrication on something you know cold is the foundation skill for everything that follows.

---

## Recipe 2, A compounding system around one live challenge

*Referenced from: Module 2 (building-agent-systems).*

**What you end with:** a text-on-disk memory for one real decision you're making, curated from three source zones (internal wiki, internal collab suite, curated internet), served by a custom agent that cites back to sources, and a daily scheduled touch that renders in your company's house style.

**The test:** a week after training, you're still reading the morning output, and the memory is noticeably sharper than the day you built it.

**Why this is recipe 2:** persistence + automation = system. A chat can't compound. A folder of markdown can.

***Worked example, a program manager agent.*** A program manager at a multi-team Nordic software org built one of these over a fortnight in 2026 (Claude Code Desktop, macOS). Three source zones: weekly leadership-and-team meeting transcripts dropped into `sources/transcripts/`, the team's Jira read through the connector, and the active plan files in Confluence. The memory at `memory/program-state.md` got rewritten daily, *what's moving, what's stuck, what's promised, what's slipping*, citing back to the source each claim came from. A custom agent at `agents/program-manager.md` ran every morning on a schedule: scan for TODOs that had drifted past the owner's committed date, draft a one-line Slack nudge, and queue it for human approval before sending. (The gate is Recipe 4 layered on Recipe 2, an outbound action never leaves the agent unreviewed.) The surprise wasn't that the agent caught the slipping TODOs, the PM already did that by hand. The surprise was the drafts came back *better than her own*: softer, more specific, and harder to ignore, because the memory had read the meeting where the commitment was actually made.

---

## Recipe 3, A multi-agent system that answers a strategic question

*Referenced from: Module 3 (multi-agent-systems).*

**What you end with:** a fan-in pipeline that retrieves from three source zones in parallel (three Claude Code sessions on shared files), then synthesises through three subagent stances in one session (backward-from-end planner, Martin's *what would have to be true?*, Sutherland-style reframer), guardrailed by a strategic framework (Rumelt's kernel by default). Output is a framework-shaped answer to your real strategic question, and a plain note of what about the answer you're not sure about.

**The test:** the answer is specific enough that you'd bring it to your CEO as a starting draft, and plain enough that you know which sentence you wouldn't stake your reputation on yet.

**Why this is recipe 3:** some work genuinely needs more than one agent, when access, dialect, or stance differ, coordination earns its keep. Most work doesn't. Learn the move; respect the default.

***Worked example, the continuous research system in this repo.*** `continuous-research/` is a Recipe 3 in production. The standing strategic question: *what are practitioners actually doing in the agentic space, and which patterns have converged enough to bet on?* Three source zones run in parallel: people writing about their own work, people analysing other people's work, and university research. A synthesis step combines the retrievals against tight rules: every claim has a URL, the kind of source matches the kind of claim, and nothing older than six months counts as current evidence. Findings live as dated markdown; an index threads what's converged. (Four fixed review judges re-fire on every modified file. That's Recipe 6 layered on Recipe 3.) The surprise wasn't what the system found. The surprise was how often the rules disqualified sources that looked credible at first scan: round-number failure stats with no methodology, customer-success pages on supplier sites, journalist write-ups attributed as if the practitioner authored them.

---

## Recipe 4, A scoped agent your organisation can trust

*Referenced from: Module 4 (security).*

**What you end with:** a working agent audited against two lenses (your company's policy + named agent-risk patterns), a reusable security check authored as a personal skill, a security report with residuals named, not solved, and 1–5 short security operating rules compounded into your root `./CLAUDE.md` so future sessions remember the boundaries.

**The test:** the security report names a residual risk you can't yet remove, and the operating rules in `./CLAUDE.md` would tell a future session exactly what to check before touching this system again. "I can't tell" appears at least once, plainly, and you don't try to flatten it.

**Why this is recipe 4:** certainty about agent safety is a fantasy. The discipline is running the check, not waiting for the check to come back clean. A scoped agent isn't one with no risk; it's one whose residual risk is named, owned, and visible to the next session.

***Worked example, incoming email triage.*** A customer-support team at a B2B SaaS company built one of these in early 2026 (Claude Code, scheduled execution on macOS). The agent reads incoming email from a shared inbox every 15 minutes. Two lenses run on each message: a policy lens (what counts as P1, outage signal, security report, named-customer escalation, churn-risk language), and an agent-risk lens (prompt injection in the email body, sender spoofing, attachment-only context, urgent-sounding marketing dressed as a real escalation). Critical ones get routed to one Slack channel with a one-line summary, original sender, and a link back to the thread. Non-critical ones stay in the inbox untouched. The scope is read-only on email and write-only-to-one-Slack-channel; nothing else. The surprise wasn't that the agent caught the obvious P1s. The surprise was the *"I can't tell"* column, the agent flagged five emails per week as ambiguous, and three of them turned out to be the most important threads to escalate, *exactly because* they didn't fit the established policy patterns yet. Residual owned plainly: the policy lens drifts as the business changes; without quarterly re-scoping, the false-negative rate climbs.

---

## Recipe 5, A judge you've earned by benchmarking

*Referenced from: Module 5 (output-quality).*

**What you end with:** a 30-claim benchmark you wrote yourself against your own output, four candidate detection methods scored against it, a winning method synthesised into a reusable judge file at `judges/groundedness-judge.md` with stated scope and one named "known limit", a judge you can defend in production because you measured it, not because someone authoritative recommended it.

**The test:** you can hand a colleague the scoreboard and the judge file, and they understand both why this method won AND what it can't reach, without you in the room to explain.

**Why this is recipe 5:** quality-method selection in agent work is empirical, not authoritative. A judge picked from a scoreboard you ran is one you'd defend; a judge picked because someone authoritative said so isn't.

---

## Recipe 6, A self-improving generator under a fixed judge

*Referenced from: Module 6 (evaluations).*

**What you end with:** a re-runnable eval loop on disk where the judge from Recipe 5 stays unchanged across rounds, a generation tactic file (`./generation-tactic.md`) rewritten between rounds from per-claim judge feedback, and a score trajectory you can read off the artefacts, same yardstick, sharper output each cycle.

**The test:** you can walk away during the loop and come back to a sharper generator the same yardstick still can't fault, and the per-round tactic diffs read like a record of what the system actually learned.

**Why this is recipe 6:** this is where the human moves up a level. You stop reviewing every output and start designing the loop, the standards, and what "better" means. The fixed judge is your delegated taste; the self-improving generator is the work you no longer have to do by hand.

---

## Recipe 7, Sharing a slice of your system that absorbs

*Referenced from: Module 7 (personal-to-team).*

**What you end with:** an outcome statement for the job your teammate is trying to get done (interviewed agentic-JTBD style, not guessed), a chosen sharing surface from the four that work, share *context*, share a *skill*, share the *output*, or share an *interface*, a technical plan AND a people plan covering ownership, governance, operating, accountability, propagation, and a named likely adoption failure with the social part visible.

**The test:** the teammate could read your sharing artefact, take the smallest surface you offered, and use it next week, without you sitting next to them, without a training session, and without rebuilding their workflow.

**Why this is recipe 7:** access is the easy half of sharing; absorption is the hard half. The bottleneck isn't *can they reach it?* but *can they fit it into their existing work fast enough that they keep using it?* Picking the smallest surface that moves the outcome, not the largest one your infrastructure allows, is how you cross that gap.

---

## Recipe 8, A flywheel that builds the next agent

*Referenced from: Module 8 (agents-building-agents).*

**What you end with:** a strategy kernel (Rumelt-shape: diagnosis, guiding policy, coherent actions) grounded in your real agent system and your real company question, a suggested agent set to add over the next two weeks, and a two-week plan that names what you'll test, what you'll learn, and which assumption breaks first, produced through three thinking disciplines run at room scale: Rumelt on *crux*, Martin on *what would have to be true?*, Klein-and-Kahneman on *pre-mortem*.

**The test:** the kernel passes the *no-puff* test, it actually disagrees with at least one obvious option, names a real obstacle, picks a coherent set of moves. The agent set is sized to be built in two weeks. The plan names which assumption would break the strategy if false.

**Why this is recipe 8:** the cycle that just sharpened the kernel is the same cycle that sharpens it again next month. Code-generating agents are the meta-tool, the only category where building one tool genuinely makes the next one faster to build. The flywheel is not metaphor; it is what the artefacts actually do.

---

## Index of agent shapes

Escoffier-flavoured. Indicative shapes a practitioner would recognise, each is a real archetype many companies build; specifics vary by company. The three full worked examples earlier are real-build evidence; this index is the wider catalogue. Each entry names sources, action, and which recipes it composes.

**Sales prospect outreach drafter.** Reads the target list, each prospect's public footprint (LinkedIn, news, hires, fundraises), and the team's prior-converted touches. Drafts one personalised first-touch per account citing a real hook, not a generic *"loved your article"* opener. Composes R2 + R6.

**RFP / proposal response drafter.** Pulls from prior winning proposals, the product knowledge base, and pricing rules. Drafts response sections; flags clauses needing legal review. Composes R3 + R6.

**Contract clause-review.** Reads incoming third-party contracts against standard MSA terms (policy lens) and ambiguity-as-risk patterns (auto-renewal, indemnity scope, jurisdiction shifts). Returns *standard / non-standard / "I can't tell"* per clause with policy citation. Composes R4 + R5.

**Customer-onboarding kickoff brief.** Reads the signed contract, the statement of work, the customer's website, and recent sales calls. Produces a kickoff brief built from the record: commitments, pricing, decisions made on calls. Composes R2 + R5.

**Quarterly business review (QBR) brief.** Reads usage telemetry, support history, prior QBR commitments, and the customer's stated objectives. Drafts a QBR narrative the CSM edits, then shares as the deliverable, the brief itself is the share surface. Composes R2 + R5 + R7.

**Monthly-close variance commentary.** Reads the ledger, the budget, and prior-period commentary. Surfaces variances over threshold and drafts the narrative: *why this variance, what changed, what to watch next month.* Composes R2 + R5.

**Knowledge-base curator.** Watches Slack channels, Confluence edits, and recent decisions. Decides what should become permanent KB entries vs. ephemeral chatter, drafts the entry, queues for review. Composes R2 + R7.

**Customer-support reply drafter.** Reads the incoming ticket, prior similar tickets, product docs, and recent fixes. Drafts a reply for the support agent to review and send. Composes R2 + R6.

**Board / leadership weekly narrative briefing.** Reads dashboards, project trackers, and recent decisions. Drafts the *narrative* of the week, not the numbers, the story, under a fixed editorial judge that holds the voice steady. Composes R2 + R6.

**Agent-build coach (the flywheel).** Reads your existing agent system, your active business question, and your Module 7 sharing plans. Drafts a strategy kernel, a suggested agent set for the next two weeks, and a pre-mortem on what would break first. Composes R8.

---

### Recipes beyond the training

Written as they stabilise:

- **Cloud deployment.** Moving a working local system to a hosted runtime (Cowork / Routines / equivalent). What changes, what breaks, what becomes easier.
- **Team sharing.** Promoting memorys and agents from personal scope to shared scope, without the usual collaboration-software rot.
- **Cross-org reuse.** Pattern libraries, agent marketplaces, the sensible portions of each.
- **Integration with existing enterprise systems.** ERP, CRM, data warehouse, iPaaS.
- **Observability and cost control.** Watching what the agent actually does and what it costs when it does.
- **Handoffs to non-agent systems.** The seams where automation ends and human work begins, by design, not by accident.

Add a recipe when the move is reliable enough that a working practitioner would recommend it to another without caveats. Not before.

<!-- maintainer -->

**Status:** Pass 1.8 — all 8 recipes have current-shape stubs aligned with the present module Big Ideas (refresh 2026-05-02). Each recipe names its module's micro-catalogue (M4's 5 risk patterns, M5's 4-detector benchmark + `groundedness-judge.md`, M6's fixed-judge + `generation-tactic.md` pattern, M7's four sharing strategies, M8's three thinking disciplines + kernel/agent-set/plan). Three real-life worked examples seeded (R2 program manager agent, R3 the continuous research system in this repo, R4 incoming email triage) — Chez Panisse genre, ~150–200 words each, real-build evidence. Plus an Escoffier-flavoured *Index of agent shapes* (10 archetypes, 2–4 lines each) at the foot of the recipe sections. Full write-outs of "the moves, in order" still deferred to Pass 3 of each module (when the module's content has stabilised).

**Drift prevention:** when a module's Big Idea or named artefacts change, the matching recipe updates in the same edit. The cookbook is the take-home catalogue; if it lags the module, the buyer-side reading goes stale. Sweep cookbook against module Big Ideas at every cycle close.

**Per-recipe seed patterns (Pass 3 work-out reference — moved out of body 2026-05-03 so students don't read process notes mid-recipe):**

*Recipe 1 — A piece of output that is genuinely yours.* Current Module 1 exercise file is the seed. Pattern: baseline without context → the differentiation frame (colleague-as-buyer, StoryBrand-adjacent) → strengths that serve them → look back at the baseline to find the fabrication → anti-branding via mirror → free iteration until "this is me." Store learnings as a `CLAUDE.md` guardrails file. The guardrails file is the first durable artifact.

*Recipe 2 — A compounding system around one live challenge.* Current Module 2 exercise + homework files are the seed. Pattern: pick a live challenge (prework) → curate three sources with Claude's help → load into a memory with plan-mode review → build a custom agent as a markdown file with rules → add sources, watch pages sharpen not grow → let the memory audit itself → schedule a daily touch → extract the house style into `style.md` → every HTML output inherits it. The root `CLAUDE.md` grows across the whole training, one rule at a time.

*Recipe 3 — A multi-agent system that answers a strategic question.* Current Module 3 exercise file is the seed. Pattern: write the strategic question → open four Claude Code sessions on the shared directory → paste three retriever prompts (one per source zone) → let them run in parallel, answer their confirmations → main session spawns three subagent stances → stances return, then synthesiser combines against the framework → note the uneasy distance in `module-3/wonder.md`. The uneasy distance is the feature, not the bug; Recipe 5 picks it up.

*Recipe 4 — A scoped agent your organisation can trust.* Current Module 4 exercise files are the seed. Pattern: run customer policy reference files raw once → package the useful check as a personal skill carrying two lenses (policy + agent-risk with named attack classes) → install the skill in your runtime → load it against your agent system → audit returns compliant / violating / "I can't tell" rows per rule → pick one risk and apply a mitigation (scope, split, filter, gate, review) → name the residual risk plainly → compound 1–5 short security rules into root `./CLAUDE.md`. The five named agent-risk patterns: prompt injection direct, prompt injection indirect, secrets-in-context, tool-confusion, skill supply-chain.

*Recipe 5 — A judge you've earned by benchmarking.* Current Module 5 exercise files are the seed. Pattern: take Module 3's synthesised briefing as the test corpus → write a 30-claim benchmark with verdicts grounded in retrieval evidence → run four detection methods in parallel against the benchmark → score each method's agreement with your verdicts → declare a winner with stated reasoning → package the winning method as `judges/groundedness-judge.md` carrying its scope and one named "known limit" → keep the scoreboard as the explanation. Three Claude sessions plus a scorer is the typical fan-out shape.

*Recipe 6 — A self-improving generator under a fixed judge.* Current Module 6 exercise files are the seed. Pattern: open `judges/groundedness-judge.md` as the fixed yardstick → main session orchestrates the loop, generation and judging happen in separate agents → round 1: generate with current tactic → judge produces per-claim feedback → main session rewrites `./generation-tactic.md` from the feedback → round 2: generate again under same judge → repeat for N rounds → keep all run artifacts under `module-6/` so the trajectory is readable. The judge is sacred; it does not move. The generator is what tightens.

*Recipe 7 — Sharing a slice of your system that absorbs.* Current Module 7 exercise files are the seed. Pattern: name the teammate and the job they're trying to get done → run an agentic JTBD interview where the agent reads your memory, drafts a hypothesis, then asks targeted questions → write the outcome statement → choose the smallest sharing surface that moves the outcome (context / skill / output / interface) → produce the technical plan → produce the people plan → run a switch-test with the teammate to surface the assumptions they'd have to absorb → name the likely failure before it happens. "Share the whole agent" is not on the list; the four that work are slices, each one absorbable.

*Recipe 8 — A flywheel that builds the next agent.* Current Module 8 exercise files are the seed. Pattern: connect the shared deliberation folder → buyer/sponsor seeds `challenge.md` → each participant gets a folder named after them → main session reads the full agent system, the Module 7 next-step file, and the sponsor challenge → three thinking-discipline subagent stances run against the question (crux / what-would-have-to-be-true / pre-mortem) → one or two central synthesizer agents write the kernel, the agent set, and the two-week plan to the shared root → student leaves with a flywheel they can run again next month on a new question.

**Worked-example discipline (Chez Panisse):** every long-form worked example is a real agent built by Antti or a consenting customer. Pseudonymise to CRM standard (no real prospect names — use *"a program manager at a multi-team Nordic software org"* etc.). Date-stamp and runtime-tag every example. Frame as *one* shape, not THE shape — students adapt, not copy. Examples that explicitly demonstrate recipe-composition (Recipe N core + Recipe M layer) reinforce the "they stand alone; together they compose" claim and should be preferred where the underlying agent really does compose. Ceiling: one canonical example per recipe.

**Index discipline (Escoffier):** the *Index of agent shapes* is indicative archetypes, not a portfolio of customer builds. 2–4 lines per entry, naming sources, action, and composed recipes. Index entries don't claim a specific build; they claim *this is a recognisable agent shape*. The line between Chez Panisse worked examples (real, dated, runtime-tagged) and Escoffier index entries (archetype, no build claim) must stay visible to the reader — that's why the Index opens with a one-line frame separating the two.

**Build order:**
- Pass 1 (2026-04-19): structural placeholder, Recipes 1–3 seeded.
- Pass 1.5 (2026-05-02): Recipes 4–8 promoted from "Future recipes" bullets to current-shape stubs that name micro-catalogues. Closes the buyer-visible drift gap before first-cohort sales.
- Pass 1.7 (2026-05-02): first three real-life worked examples added (R2 PM agent, R3 research system, R4 email triage). Recipes 1, 5, 6, 7, 8 still owe one each — sourced from Antti's own engagements first, customer work with explicit consent only.
- Pass 1.8 (2026-05-02): Escoffier-flavoured *Index of agent shapes* added (10 archetypes, 2–4 lines each). Distinct from worked examples — index entries don't claim specific builds, they claim recognisable shapes. Distribution across recipes: R2 (7), R3 (1), R4 (1), R5 (4), R6 (4), R7 (2), R8 (1).
- Pass 2 (as each module reaches Pass 3): promote the module's exercise body into a standalone recipe in this cookbook, decoupled from training-specific framing (no "Phase 1 / Phase 2" internal numbering; just the moves).
- Pass 3 (near training completion): final polish pass, cross-references, consistent voice, examples-in-line for each recipe.

**Frameworks riffed on:**
- Cookbook-as-genre, two registers held in tension: **Chez Panisse Menu Cookbook** energy for the long-form worked examples (one well-told dinner per recipe), **Escoffier *Le Guide Culinaire / Le Répertoire de la Cuisine*** for the Index (terse 3–4-line catalogue density). Mastering the Art of French Cooking for accessibility across both. The right vibe is *a practitioner's book, not a theory book.*
- Practitioner cookbook writing as the quality bar: concrete recipes, live constraints, and enough judgment to help the reader choose.

**Why this supersedes the earlier "lifecycle doc" idea:**
- Lifecycle implies one canonical path; cookbook implies many recipes the practitioner composes. The agentic build space is too varied for a single lifecycle to hold plainly.
- Recipes compose; lifecycles gatekeep. We're anti-gatekeeping.
- Cookbook extends naturally (new recipes) without the earlier recipes going stale. A lifecycle doc goes stale the moment the world shifts — which it does every quarter.

**Reference quote (Antti — capture for the opening once polished):**
> "The first thing you build is for you, because you're the only evaluator you can't fool. Then we turn to work — because that's where the system has to stand up."

*(Quote drafted for Antti's voice; edit freely or swap.)*

**Quality:** compendium-audited 2026-05-03 (writing@bb9c1d5 story@bb9c1d5 technical@bb9c1d5)
- judges @bb9c1d5: writing PASS, story PASS, technical PASS, behavior N/A (no-student-prompt-blocks)
