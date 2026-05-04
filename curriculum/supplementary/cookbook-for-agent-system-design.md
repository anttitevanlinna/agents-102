# Cookbook for Agent System Design

*This is how you do it.* A practitioner's cookbook, the moves, in sequence, that take someone from a chat conversation to a real agent system they can stake their reputation on. Not theory. Recipes you can run on Monday.

All eight recipes map to the modules, written out here as standalone how-to. After the training, you own them. New recipes get added as they mature: cloud deployment, team sharing, cross-org promotion, the rest.

A real cookbook has three layers: recipes, base preparations (the small named bits that recombine), and an index of dishes. *Le Guide Culinaire* is mostly the index, Escoffier's genius was the named preparations, not the dishes. Same shape here.

Eight recipes. Twelve named components the recipes lean on. Eighteen data sources you'll actually reach for. Twenty named dishes in the index. Mix and match.

Read any recipe in order or any recipe standalone. They stand alone; together they compose.

## Recipe 1, A piece of output that is genuinely yours

*Referenced from: Module 1 (getting-going).*

**What you end with:** one artifact, a site, a memo, a profile page, a pitch, that sounds like you, not like Claude. Specific to your situation, written in your voice, correct on the facts only you know.

**The moves, in order:**

1. Generate the plain version first. Ask for the artifact with almost no context and save the output. This is the baseline you will beat.
2. Name who it is for. A profile, site, pitch, or memo is never for "everyone." Pick the colleague, buyer, manager, or team member whose reaction matters.
3. Give the agent the facts only you know. What you have done, what you care about, where you are different, what the first version got wrong.
4. Ask for the second version against that frame. The goal is not more polish. The goal is more you.
5. Read the two versions side by side. The baseline shows the statistical default. The second version shows what context changed.
6. Hunt the fabrication where you are the expert. A wrong title, inflated claim, generic strength, or invented detail is the cheapest possible eval: you know the answer cold.
7. Turn the useful discoveries into a guardrails file. Save the rules that made the artifact sharper: what to include, what to avoid, what voice means here, what facts must never be guessed.
8. Iterate until the output crosses the mirror test: not "impressive", not "professional", but recognisably yours.

**The test:** a colleague who knows you reads it and says "yeah, that's you." Not "that's impressive", "that's you."

**Why this is recipe 1:** you are the one evaluator you can't fool on your own content. Learning to spot fabrication on something you know cold is the foundation skill for everything that follows.

---

## Recipe 2, A compounding system around one live challenge

*Referenced from: Module 2 (building-agent-systems).*

**What you end with:** a text-on-disk memory for one real decision you're making, curated from three source zones (internal wiki, internal collab suite, curated internet), served by a custom agent that cites back to sources, and a daily scheduled touch that renders in your company's house style.

**The moves, in order:**

1. Pick the live challenge. Not a task. The thing you actually need to move at work, and where better synthesis would change what you do next.
2. Write the challenge in one file. The agent needs a centre of gravity: what you are trying to decide, what matters, what would count as progress.
3. Curate three source zones. Use your wiki or long-form docs, your active work surface, and one outside practitioner source. The point is not volume; it is triangulation.
4. Keep raw sources raw. Put originals under `sources/`. Do not rewrite them into memory yet. Originals stay citeable.
5. Ask the agent to compile the first memory. The memory is maintained prose: what is known, what is uncertain, what source supports each claim.
6. Review the plan before the agent rewrites files. A memory that compounds is allowed to change, but not silently.
7. Create the custom agent as a markdown file. Give it a job, the memory it reads, the sources it may cite, and the rules it follows before giving advice.
8. Add a second batch of evidence. Watch whether the memory sharpens or merely grows. If it only grows, the structure is wrong.
9. Let the memory audit itself. Ask what pages are stale, duplicated, thin, or missing. The audit is how the system starts maintaining itself.
10. Schedule a daily touch. The system becomes real when it runs while you are elsewhere and returns something you still want to read.
11. Extract house style into `style.md`. Stop re-specifying the same tone, format, and visual conventions in every prompt.
12. Compound the directory rules into `./CLAUDE.md`. Every future session should inherit what this run learned about sources, memory, agents, and citations.

**The test:** a week after training, you're still reading the morning output, and the memory is noticeably sharper than the day you built it.

**Why this is recipe 2:** persistence + automation = system. A chat can't compound. A folder of markdown can.

***Worked example, a program manager agent.*** A program manager at a multi-team Nordic software org built one of these over a fortnight in 2026 (Claude Code Desktop, macOS). Three source zones: weekly leadership-and-team meeting transcripts dropped into `sources/transcripts/`, the team's Jira read through the connector, and the active plan files in Confluence. The memory at `memory/program-state.md` got rewritten daily, *what's moving, what's stuck, what's promised, what's slipping*, citing back to the source each claim came from. A custom agent at `agents/program-manager.md` ran every morning on a schedule: scan for TODOs that had drifted past the owner's committed date, draft a one-line Slack nudge, and queue it for human approval before sending. (The gate is Recipe 4 layered on Recipe 2, an outbound action never leaves the agent unreviewed.) The surprise wasn't that the agent caught the slipping TODOs, the PM already did that by hand. The surprise was the drafts came back *better than her own*: softer, more specific, and harder to ignore, because the memory had read the meeting where the commitment was actually made.

---

## Recipe 3, A multi-agent system that answers a strategic question

*Referenced from: Module 3 (multi-agent-systems).*

**What you end with:** a fan-in pipeline that retrieves from three source zones in parallel (three Claude Code sessions on shared files), then synthesises through three subagent stances in one session (backward-from-end planner, Martin's *what would have to be true?*, Sutherland-style reframer), guardrailed by a strategic framework (Rumelt's kernel by default). Output is a framework-shaped answer to your real strategic question, and a plain note of what about the answer you're not sure about.

**The moves, in order:**

1. Write the strategic question where the system can see it. A vague question produces a beige synthesis. Name the crux sharply enough that an answer could disagree with you.
2. Split retrieval by source zone, not by random topic. One agent reads the wiki, one reads the active work surface, one reads curated external material. Different access and dialect earn the split.
3. Give each retriever a file to write. The filesystem is the meeting room. Agents that only talk back in chat cannot be composed cleanly.
4. Let the retrievers run in parallel. Answer only the confirmations they need. Do not normalise their voices by hand; the differences are useful input.
5. Have the main session curate the returns into memory. Retrieval produces raw material. Curation decides what belongs in the working picture.
6. Spawn three stances for synthesis. Use a backward-from-end planner, a *what would have to be true?* experimenter, and a counterintuitive reframer.
7. Give the synthesizer a framework. Rumelt's strategy kernel is the default: diagnosis, guiding policy, coherent actions. Without a spine, the agent summarises instead of deciding.
8. Force disagreement into the answer. Ask what the sources conflict on, what each stance sees that the others miss, and which claim should stay uncertain.
9. Save the synthesis as the working answer. It should be specific enough to bring to a senior stakeholder as a starting draft.
10. Write the doubt down. Save the sentence you would not stake your reputation on yet. That unease is not a defect; it is the raw material for Recipe 5.

**The test:** the answer is specific enough that you'd bring it to your CEO as a starting draft, and plain enough that you know which sentence you wouldn't stake your reputation on yet.

**Why this is recipe 3:** some work genuinely needs more than one agent, when access, dialect, or stance differ, coordination earns its keep. Most work doesn't. Learn the move; respect the default.

***Worked example, the continuous research system in this repo.*** `continuous-research/` is a Recipe 3 in production. The standing strategic question: *what are practitioners actually doing in the agentic space, and which patterns have converged enough to bet on?* Three source zones run in parallel, practitioner-direct (own blogs, X.com, GitHub, conference talks), practitioner-analysis (technical teardowns, specialist-journalist interviews), academic (university research, benchmarks). A synthesis stance combines the retrievals against an explicit evidence ladder (Level 0 commercial → Level 4 cross-domain meta-pattern). Findings live as dated markdown; a synthesis index threads convergence. The framework guardrail is the ladder itself plus three gates per finding (truly agentic? independent evidence? specific outcome?). Every claim carries a source-type label and a URL; freshness window is six months. (The four review personas, source-type-auditor, zombie-stat-detector, freshness-checker, evidence-ladder-classifier, are Recipe 6 layered on Recipe 3: fixed judges that re-fire on every modified file.) The surprise wasn't the convergence patterns the system surfaced. The surprise was how often the gates *rejected* sources that look credible at first scan: round-number failure stats with no methodology behind them, customer-success pages on supplier sites, journalist write-ups attributed as if the practitioner authored them.

---

## Recipe 4, A scoped agent your organisation can trust

*Referenced from: Module 4 (security).*

**What you end with:** a working agent audited against two lenses (your company's policy + named agent-risk patterns), a reusable security check authored as a personal skill, a security report with residuals named, not solved, and 1–5 short security operating rules compounded into your root `./CLAUDE.md` so future sessions remember the boundaries.

**The moves, in order:**

1. Start with the policies as source material. Run the relevant company, customer, or baseline policy files raw against the agent system once. Let the rough report show what expertise is missing.
2. Package the useful check as a personal skill. Two lenses travel together: the policy lens, and the agent-risk lens.
3. Name the agent-risk patterns inside the check. Prompt injection direct, prompt injection indirect, secrets-in-context, tool-confusion, skill supply-chain. If the lens does not name the classes, it drifts into generic caution.
4. Install and load the skill in the runtime you actually use. A check that only lives in the training transcript is not reusable expertise.
5. Run the skill against the full agent system. It reads the rules file, memory, sources, agents, and outputs. The system is the thing being checked, not one reply.
6. Require three verdicts per rule: compliant, violating, and "I can't tell." The third verdict is where the useful ambiguity lives.
7. Pick one risk to mitigate. Do not clear the backlog. Run the full loop once on a real risk.
8. Choose one mitigation shape: scope, split, filter, gate, or review. Narrow the agent, separate duties, filter input, require approval, or add a human read.
9. Name the residual plainly. The goal is not a clean report. The goal is a system whose remaining risk is visible to the next session.
10. Compound one to five security operating rules into `./CLAUDE.md`. Future agents should know what to check before they touch this system again.

**The test:** the security report names a residual risk you can't yet remove, and the operating rules in `./CLAUDE.md` would tell a future session exactly what to check before touching this system again. "I can't tell" appears at least once, plainly, and you don't try to flatten it.

**Why this is recipe 4:** certainty about agent safety is a fantasy. The discipline is running the check, not waiting for the check to come back clean. A scoped agent isn't one with no risk; it's one whose residual risk is named, owned, and visible to the next session.

***Worked example, incoming email triage.*** A customer-support team at a B2B SaaS company built one of these in early 2026 (Claude Code, scheduled execution on macOS). The agent reads incoming email from a shared inbox every 15 minutes. Two lenses run on each message: a policy lens (what counts as P1, outage signal, security report, named-customer escalation, churn-risk language), and an agent-risk lens (prompt injection in the email body, sender spoofing, attachment-only context, urgent-sounding marketing dressed as a real escalation). Critical ones get routed to one Slack channel with a one-line summary, original sender, and a link back to the thread. Non-critical ones stay in the inbox untouched. The scope is read-only on email and write-only-to-one-Slack-channel; nothing else. The surprise wasn't that the agent caught the obvious P1s. The surprise was the *"I can't tell"* column, the agent flagged five emails per week as ambiguous, and three of them turned out to be the most important threads to escalate, *exactly because* they didn't fit the established policy patterns yet. Residual owned plainly: the policy lens drifts as the business changes; without quarterly re-scoping, the false-negative rate climbs.

---

## Recipe 5, A judge you've earned by benchmarking

*Referenced from: Module 5 (output-quality).*

**What you end with:** a 30-claim benchmark you wrote yourself against your own output, four candidate detection methods scored against it, a winning method synthesised into a reusable judge file at `judges/groundedness-judge.md` with stated scope and one named "known limit", a judge you can defend in production because you measured it, not because someone authoritative recommended it.

**The moves, in order:**

1. Bring back the answer from Recipe 3. Use the synthesis that felt useful and not fully trustworthy. A synthetic benchmark on throwaway text teaches less.
2. Build a 30-claim pool. Pull claims from the answer: facts, comparisons, implications, numbers, named entities, and recommendations that depend on evidence.
3. Adjudicate the claims against the sources. Each row needs a verdict and the evidence behind it. This is the benchmark, not the detector.
4. Run several detection methods on the same claim pool. Source triangulation, entailment, citation integrity, and counter-evidence search are the default panel.
5. Keep the methods separate. Parallel agents write their own detector outputs. If they share a scratchpad, they contaminate the comparison.
6. Score the methods against the benchmark. Precision, recall, coverage, and useful failure notes matter more than elegance.
7. Pick the winner from the scoreboard. The point is not which method sounds clever. The point is which method matched your benchmark on this output.
8. Package the winner as `judges/groundedness-judge.md`. State what it catches, what evidence it needs, and one known limit.
9. Keep the scoreboard. A judge without the scoreboard is a rule someone wrote. A judge with the scoreboard is a measured choice.
10. Add a trigger to `./CLAUDE.md`. Future sessions should know which outputs need this judge before anyone relies on them.

**The test:** you can hand a colleague the scoreboard and the judge file, and they understand both why this method won AND what it can't reach, without you in the room to explain.

**Why this is recipe 5:** quality-method selection in agent work is empirical, not authoritative. A judge picked from a scoreboard you ran is one you'd defend; a judge picked because someone authoritative said so isn't.

---

## Recipe 6, A self-improving generator under a fixed judge

*Referenced from: Module 6 (evaluations).*

**What you end with:** a re-runnable eval loop on disk where the judge from Recipe 5 stays unchanged across rounds, a generation tactic file (`./generation-tactic.md`) rewritten between rounds from per-claim judge feedback, and a score trajectory you can read off the artefacts, same yardstick, sharper output each cycle.

**The moves, in order:**

1. Freeze the judge from Recipe 5. Copy its path into the run notes. The judge is the yardstick; it does not move during the loop.
2. Write the starting generator tactic. Keep it minimal. The tactic is what the loop is allowed to improve.
3. Make the main session the orchestrator. It dispatches generation, dispatches judging, reads feedback, rewrites the tactic, and repeats.
4. Separate generation from judging. The generator does the work. The judge reads the output against the fixed yardstick. The generator does not grade itself.
5. Run round one. Save the output, judge report, and tactic version under `module-6/`.
6. Rewrite `./generation-tactic.md` from the judge feedback. Name the failure class each new rule prevents. Vague wisdom does not count.
7. Run round two under the same judge. The generator changes. The judge stays fixed. That is why the score trajectory means anything.
8. Repeat for the agreed number of rounds. Three is enough to feel the slope without turning the exercise into machinery-watching.
9. Read the diffs, not just the final score. The tactic changes are the record of what the system learned.
10. Leave the loop inspectable. A future session should be able to open `module-6/` and see what changed, when, and why.

**The test:** you can walk away during the loop and come back to a sharper generator the same yardstick still can't fault, and the per-round tactic diffs read like a record of what the system actually learned.

**Why this is recipe 6:** this is where the human moves up a level. You stop reviewing every output and start designing the loop, the standards, and what "better" means. The fixed judge is your delegated taste; the self-improving generator is the work you no longer have to do by hand.

---

## Recipe 7, Sharing a slice of your system that absorbs

*Referenced from: Module 7 (personal-to-team).*

**What you end with:** an outcome statement for the job your teammate is trying to get done (interviewed agentic-JTBD style, not guessed), a chosen sharing surface from the four that work, share *context*, share a *skill*, share the *output*, or share an *interface*, a technical plan AND a people plan covering ownership, governance, operating, accountability, propagation, and a named likely adoption failure with the social part visible.

**The moves, in order:**

1. Name the teammate before the solution. If you cannot name who this helps, you are designing for applause.
2. Interview for the job. Have the agent read your memory, draft a Jobs-to-be-Done hypothesis, then ask targeted questions to fill the gaps.
3. Write the outcome statement. Use the job as the contract: what should increase, decrease, speed up, become easier, or stop depending on you.
4. Identify the incumbent. Every job already has something hired for it: a spreadsheet, a meeting, a colleague, a dashboard, gut feel, or nothing.
5. Choose the smallest sharing surface that moves the outcome. Context, skill, output, or interface. Whole-agent sharing is not on the list.
6. Write the technical plan. What travels, where it lives, what it can read, what it can write, who can change it, and how it gets updated.
7. Write the people plan with equal weight. Owner, receiver, operating cadence, accountability, support path, propagation. Missing names are findings.
8. Run the switch test. What would have to be true for the teammate to fire the incumbent and use your candidate instead?
9. Name the likely adoption failure before it happens. The technical failure is usually visible. The social failure hides until someone quietly goes back to the old way.
10. Sharpen the artifact the teammate actually touches. Not the plan, not the explanation. The skill file, interface spec, output schedule, or context export.

**The test:** the teammate could read your sharing artefact, take the smallest surface you offered, and use it next week, without you sitting next to them, without a training session, and without rebuilding their workflow.

**Why this is recipe 7:** access is the easy half of sharing; absorption is the hard half. The bottleneck isn't *can they reach it?* but *can they fit it into their existing work fast enough that they keep using it?* Picking the smallest surface that moves the outcome, not the largest one your infrastructure allows, is how you cross that gap.

---

## Recipe 8, A flywheel that builds the next agent

*Referenced from: Module 8 (agents-building-agents).*

**What you end with:** a strategy kernel (Rumelt-shape: diagnosis, guiding policy, coherent actions) grounded in your real agent system and your real company question, a suggested agent set to add over the next two weeks, and a two-week plan that names what you'll test, what you'll learn, and which assumption breaks first, produced through three thinking disciplines run at room scale: Rumelt on *crux*, Martin on *what would have to be true?*, Klein-and-Kahneman on *pre-mortem*.

**The moves, in order:**

1. Extend your own system first. Ask the agent to propose one new agent that would make the existing system stronger, using the memory, judges, skills, and sharing plan already on disk.
2. Make the agent build the next agent. The meta-tool becomes visible when the system writes a useful addition to itself.
3. Connect the shared deliberation folder. Each participant writes to their own folder. One or two central synthesizers write to the shared root.
4. Seed the room with one real sponsor challenge. The question should matter enough that a weak answer would be obvious.
5. Publish context manifests. Every participant's agent names what it read, what it could not find, and what it inferred without a source.
6. Run the three thinking disciplines at room scale. Crux names the central obstacle. *What would have to be true?* turns the proposal into assumptions. Pre-mortem finds the failure before the plan flatters itself.
7. Cross-check before proposing. Agents read neighbouring stances and publish what changed in their own view.
8. Let the central synthesizer select, then invite pushback. Selection without critique converges too fast.
9. Produce the strategy kernel, suggested agent set, and two-week plan. Diagnosis, guiding policy, coherent actions. Agents to build next. First tests to run.
10. Audit the round and sharpen the rule that carried the most weight. The flywheel is not the final answer. It is the way the next answer gets sharper.

**The test:** the kernel passes the *no-puff* test, it actually disagrees with at least one obvious option, names a real obstacle, picks a coherent set of moves. The agent set is sized to be built in two weeks. The plan names which assumption would break the strategy if false.

**Why this is recipe 8:** the cycle that just sharpened the kernel is the same cycle that sharpens it again next month. Code-generating agents are the meta-tool, the only category where building one tool genuinely makes the next one faster to build. The flywheel is not metaphor; it is what the artefacts actually do.

---

## Components

Twelve named items the recipes lean on: eight pieces and four closed-set lists. Each is small enough to hold in head; each is referenced by name from the Index of agent shapes below. Many of the smaller bits live inside the recipes, `style.md`, `wonder.md`, the personal skill, `challenge.md`, and earn their names there rather than here.

**The three layers.** Raw sources (the originals, untouched), the memory (maintained by the agent, sharpens over time), and the rules file (`./CLAUDE.md` that keeps the shape consistent). The architectural stack of every compounding system. From R2.

**The cite-back rule.** Every claim in agent output points to the source file or URL it came from. Without it, agents smoothly hallucinate each other's memory. With it, the pushback rounds have something to push back at. Used everywhere from R2 onward.

**Plan-mode review.** The agent writes the proposed action, the email body, the ticket update, the command, before taking it. You read and approve. Only then does it execute. The single most reusable safety primitive. From R2.

**The house-style file.** `style.md`, your company's voice, format, and visual conventions extracted into a single file the agent reads on every output. Stop re-specifying voice in every prompt. From R2.

**The calibrated rubric.** A scoring rubric you've benchmarked against your own verdicts, with worked examples per row. Different from a rubric you wrote and trust in advance. From R5.

**Public-footprint scan.** LinkedIn, news, hires, fundraises, GitHub, X, conference talks, pulled in parallel for a named entity. The first move for any prospect-shaped, supplier-shaped, or candidate-shaped dish. The agent treats public web differently from the company's wiki; this names that move.

**Two-register output.** Same content, two audiences: engineer-changelog plus customer-announce, board-narrative plus ops-dashboard. Held under a fixed editorial judge so the registers don't drift apart. From R6.

**The "I can't tell" verdict.** Three rows per check, not two: pass, fail, *"I can't tell."* The third row is where ambiguity gets named instead of forced. Counter-intuitively, the most useful column for the human reviewer. From R4.

---

The four named lists the recipes lean on:

**The five named agent-risk patterns.** Prompt injection direct, prompt injection indirect, secrets-in-context, tool-confusion, skill supply-chain. The closed set of attack classes specific to LLM agents. From R4.

**The five mitigations.** Scope, split, filter, gate, review. The closed set of moves available when a risk is named. Pick one, name the residual. From R4.

**The three thinking disciplines.** Crux (Rumelt), what would have to be true (Roger Martin), pre-mortem (Klein-and-Kahneman). Three distinct postures that interrogate a problem from different angles before synthesis. From R3 (alone) and R8 (at room scale).

**The four sharing strategies.** Share *context*, share a *skill*, share the *output*, share an *interface*. The four surfaces that absorb. *"Share the whole agent"* is not on the list; whole-agent sharing rarely survives real handoff. From R7.

---

## Data sources

Eighteen sources in five families. Names, access mode, what each is good for. Reach for what's wired into your environment first; ask Claude to suggest the second stop.

### Internal knowledge, files

**Wiki.** Confluence, Notion, internal-Wiki. The institutional long-form: strategy, runbooks, RFCs, architecture. Read via connector or local export. Authored by people who often have left; usually 18 months out of date and full of truth.

**Document store.** SharePoint, OneDrive, Google Drive, Box. Decks, spreadsheets, contracts, signed PDFs. Read via connector or local export. The drawer everyone owns; nobody curates.

**Local files.** `sources/`, `~/Downloads`, exported reports. Read directly. The fastest source surface, no connector, no auth, no rate limit.

### Internal systems, records

**CRM.** Salesforce, HubSpot, Pipedrive, Microsoft Dynamics. Accounts, contacts, opportunities, prior touches. Read via connector. The single richest source for any customer-facing dish.

**Project / ticketing.** Jira, Linear, Asana, Monday, ClickUp. Tickets, sprints, owners, due dates. Read via connector. What the team committed to, who's owning it, what's stuck.

**Support tickets.** Zendesk, Intercom, Help Scout, Freshdesk. Customer conversations, bug reports, themes. Read via connector. Customer-truth, before it gets sanitised into roadmap items.

**People systems.** Workday, BambooHR, Personio (HRIS); Greenhouse, Lever (ATS). People records, hiring pipeline, performance history. Read via connector. The people layer underneath any management dish.

**Data warehouse.** Snowflake, BigQuery, Redshift, Databricks. Structured event and activity data. Read via SQL through connector or MCP. The numbers underneath any narrative, read it for the questions you're already asking, not the dashboard you'd build.

**Dashboards / BI.** Tableau, Looker, Metabase, Power BI. Pre-aggregated views, named metrics, recurring reports. Read via connector. Faster than the warehouse for known questions; slower for novel ones.

**Product analytics.** Amplitude, Mixpanel, PostHog, Heap. Event streams, funnels, retention cohorts. Read via connector. Where customer behaviour lives, distinct from what they say.

**Code / repos.** GitHub, GitLab, Bitbucket. Source code, READMEs, issues, PRs, release notes. Read via connector or local clone. What was actually shipped, vs. what was promised in the wiki.

### Conversation streams

**Chat / messaging.** Slack, Microsoft Teams, Discord. Channel posts (read-only), pinned messages, decisions made in threads. Read via connector. Where decisions actually get made; rarely written down twice.

**Meeting transcripts.** Read AI, Otter, Granola, Zoom recordings. Verbatim of what got said, who pushed back, what got committed. Read as exported text files. The fastest path to *what did the customer actually want?*

**Email.** Gmail, Outlook, shared inbox. Threads, labels, attachments. Read via connector. Slower than chat, more decision-heavy than dashboards. The shared-inbox pattern (R4 worked example) is one of the most useful dishes.

**Calendar.** Google Calendar, Microsoft 365. Past meetings, upcoming meetings, attendees, durations. Read via connector. Less for content, more for *who am I about to meet?*

### External, public footprint

**Public web.** Any URL. Read via fetch or browser tool. Press, blogs, regulatory filings, public docs.

**Public profiles.** LinkedIn (people / companies), GitHub profiles, X, conference sites. Read via fetch. The public-footprint scan's home base.

**Filings & registries.** SEC EDGAR, Companies House, regulator portals, patent offices. Read via fetch or specialised connector. The candid reading material for due-diligence dishes; everything else is dressed up.

### The catch-all

**Specialised SaaS surfaces.** Stripe (billing), QuickBooks (accounting), Marketo (marketing automation), DocuSign (contracts), your product's own docs site. Read via connector or API. Anything mission-critical-but-niche to your function; assume one or two are the load-bearing source for any dish in that function.

---

## Index of agent shapes

Twenty named compositions a practitioner would recognise on sight. Each entry: the dish in italics (what it does), then the named components, then the recipes it composes from. The three preceding long-form examples (R2 program manager agent, R3 the continuous research system, R4 incoming email triage) are the dishes plated and served; this is the index a working practitioner opens to recall a name. Specifics vary by company; the shape is what travels.

**Sales prospect outreach drafter.** *One personalised first-touch per account, hook drawn from the file, not the boilerplate.* Public-footprint scan + cite-back rule + plan-mode review. R2 + R6.

**RFP / proposal response drafter.** *Response sections drafted from prior wins; clauses needing legal flagged.* Three layers + two-register output + plan-mode review. R3 + R6.

**Contract clause-review.** *Standard / non-standard / "I can't tell" per clause, with policy citation.* Five named agent-risk patterns (as the second lens) + "I can't tell" verdict + the five mitigations. R4 + R5.

**Customer-onboarding kickoff brief.** *A kickoff brief grounded in actuals, not the CSM's intuition.* Three layers + cite-back rule + house-style file. R2 + R5.

**Quarterly business review brief.** *A QBR narrative the CSM edits; the brief itself is the share surface.* Three layers + calibrated rubric + two-register output. R2 + R5 + R7.

**Monthly-close variance commentary.** *Variances over threshold surfaced; the narrative drafted, why this variance, what changed, what to watch next month.* Three layers + calibrated rubric + cite-back rule. R2 + R5.

**Knowledge-base curator.** *What becomes a permanent KB entry vs. ephemeral chatter, decided; the entry drafted; queued for review.* Three layers + plan-mode review + four sharing strategies. R2 + R7.

**Customer-support reply drafter.** *A reply drafted for the support agent to review and send.* Three layers + plan-mode review + house-style file. R2 + R6.

**Board / leadership weekly narrative briefing.** *The narrative of the week, not the numbers, the story, drafted under a fixed editorial judge that holds the voice.* Three layers + house-style file + two-register output. R2 + R6.

**Agent-build coach.** *A strategy kernel, a suggested agent set for the next two weeks, a pre-mortem on what would break first.* Three thinking disciplines, packaged as a recurring agent. R8.

**Roadmap-synthesis brief.** *A quarter-shape: themes, bets, named not-doings.* Three layers + three thinking disciplines. R3 + R6.

**Competitive teardown.** *What they're building, what they're charging, where they're hiring.* Public-footprint scan + cite-back rule. R3 + R5.

**Supplier due-diligence scan.** *A scored brief with policy-fit and red-flag rows.* Public-footprint scan + five named agent-risk patterns + "I can't tell" verdict. R4 + R5.

**All-hands narrative drafter.** *The quarter's narrative drafted under a fixed editorial judge that holds the tone.* Three layers + house-style file + two-register output. R2 + R6.

**Customer-renewal risk scorer.** *An at-risk list with one-line "what changed"; routed to the CSM for the call.* Calibrated rubric + cite-back rule + plan-mode review. R4 + R5.

**Discovery-call prep brief.** *A one-page brief: company shape, likely pain, three opening questions.* Public-footprint scan + cite-back rule + plan-mode review. R2 + R6.

**Marketing campaign brief.** *The brief drafted: creative platform, key proof points, channel mix, success metric.* House-style file + calibrated rubric + two-register output. R2 + R5.

**One-on-one prep brief.** *Open threads, last week's commitments, what shifted, two questions to lead with.* Three layers + cite-back rule + plan-mode review. R2 + R6.

**Performance-review drafter.** *Six-month patterns surfaced; a review drafted to the calibrated rubric for the manager to edit.* Three layers + calibrated rubric + cite-back rule. R2 + R5.

**Customer escalation triage.** *Routed to the right owner with the evidence attached; ambiguous ones flagged for human read.* Five named agent-risk patterns (as the second lens) + "I can't tell" verdict + plan-mode review. R4 + R5.

---

### Recipes beyond the training

Written as they stabilise:

- **Cloud deployment.** Moving a working local system to a hosted runtime (Cowork / Routines / equivalent). What changes, what breaks, what becomes easier.
- **Team sharing.** Promoting memories and agents from personal scope to shared scope, without the usual collaboration-software rot.
- **Cross-org reuse.** Pattern libraries, agent marketplaces, the sensible portions of each.
- **Integration with existing enterprise systems.** ERP, CRM, data warehouse, iPaaS.
- **Observability and cost control.** Watching what the agent actually does and what it costs when it does.
- **Handoffs to non-agent systems.** The seams where automation ends and human work begins, by design, not by accident.

Add a recipe when the move is reliable enough that a working practitioner would recommend it to another without caveats. Not before.

<!-- maintainer -->

**Status:** Pass 3 draft — full "moves, in order" write-outs for R1–R8, Rory/Roger revisitation shape preserved. Eight recipes, 12 named components, 18 data sources, 20 indexed dishes each carrying a *what-it-does* gloss before the components-formula. Three real-life worked examples seeded under recipes (R2 program manager agent, R3 the continuous research system in this repo, R4 incoming email triage). Recipe moves are now standalone enough for take-home reading; final polish still owes cross-reference tightening and missing worked examples for R1/R5/R6/R7/R8.

**Drift prevention:** when a module's Big Idea or named artefacts change, the matching recipe updates in the same edit. The cookbook is the take-home catalogue; if it lags the module, the buyer-side reading goes stale. Sweep cookbook against module Big Ideas at every cycle close. **Same rule for components and data sources** — when a module renames a component or adds a data source, the relevant Components / Data sources entry updates in the same edit. The Index entries are downstream of both: a renamed component ripples to every Index dish that composes it.

**Worked-example discipline (Chez Panisse):** every long-form worked example is a real agent built by Antti or a consenting customer. Pseudonymise to CRM standard (no real prospect names — use *"a program manager at a multi-team Nordic software org"* etc.). Date-stamp and runtime-tag every example. Frame as *one* shape, not THE shape — students adapt, not copy. Examples that explicitly demonstrate recipe-composition (Recipe N core + Recipe M layer) reinforce the "they stand alone; together they compose" claim and should be preferred where the underlying agent really does compose. Ceiling: one canonical example per recipe.

**Index discipline (Escoffier + gloss):** the *Index of agent shapes* is indicative archetypes, not a portfolio of customer builds. **Each entry is two reads, not one** (Pass 1.10): an italicised one-line of what the dish does, then the components-formula and recipe pin. Cold-recall test: a graduate one month out should grok an entry without flipping back to Components. Index entries don't claim a specific build; they claim *this is a recognisable agent shape*. The line between Chez Panisse worked examples (real, dated, runtime-tagged) and Escoffier index entries (archetype, no build claim) must stay visible to the reader.

**Components discipline (12, not 28):** components are named techniques the recipes already lean on; the chapter makes them addressable from the Index. Naming bar: a candidate component must (a) have a name a practitioner could recall, (b) recur across more than one recipe or be a closed set the audience would name on sight, (c) be small enough to be a building block, not a whole recipe, AND (d) appear by name in at least two Index entries OR be a closed-set named list (5 risk patterns, 5 mitigations, 3 thinking disciplines, 4 sharing strategies). Failing (d), the bit lives inline in the recipe that introduces it. Pass 1.10 cut 16 entries that were either single-use or already named in recipe bodies; the cookbook stopped doubling as a glossary.

**Build order:**
- Pass 1 (2026-04-19): structural placeholder, Recipes 1–3 seeded.
- Pass 1.5 (2026-05-02): Recipes 4–8 promoted from "Future recipes" bullets to current-shape stubs that name micro-catalogues. Closes the buyer-visible drift gap before first-cohort sales.
- Pass 1.7 (2026-05-02): first three real-life worked examples added (R2 PM agent, R3 research system, R4 email triage). Recipes 1, 5, 6, 7, 8 still owe one each — sourced from Antti's own engagements first, customer work with explicit consent only.
- Pass 1.8 (2026-05-02): Escoffier-flavoured *Index of agent shapes* added (10 archetypes, 2–4 lines each). Distinct from worked examples — index entries don't claim specific builds, they claim recognisable shapes. Distribution across recipes: R2 (7), R3 (1), R4 (1), R5 (4), R6 (4), R7 (2), R8 (1).
- Pass 1.9 (2026-05-04): Three-chapter Escoffier reorganisation. (a) Opening introduces *Le Guide Culinaire* as the load-bearing analogy and names the three chapters that follow the recipes. (b) **Components** chapter — 28 named techniques in 9 families. (c) **Data sources** chapter — 18 named raw-material sources in 5 families. (d) Index of agent shapes refit to terse format (*name. components. recipes.*) and expanded from 10 to 20 entries. Combined recipe distribution across all 20 dishes: R2 ×12, R3 ×3, R4 ×4, R5 ×9, R6 ×8, R7 ×2, R8 ×1.
- Pass 1.10 (2026-05-04, late): Rory & Roger pass — cookbook tightened for revisitation. (a) Components cut from 28 → 12 (eight named pieces + four closed-set lists). The dropped 16 fold into recipe bodies where they earn at moment of use; the cookbook no longer doubles as a glossary. (b) Index of agent shapes — each of the 20 entries gets a one-line *what it does* gloss before the components-formula; cold-recall now works without a Components lookup. (c) Escoffier opening tightened from ~150 words to ~70. Same load-bearing analogy, less lecture. (d) Data sources lead-in stripped of fonds-chapter framing; the section is reference, not metaphor. Net: shorter, denser, easier to land on a Tuesday morning. Highest-impact change is the Index gloss; biggest cut is the Components shrink.
- Pass 2 (as each module reaches Pass 3): promote the module's exercise body into a standalone recipe in this cookbook, decoupled from training-specific framing (no "Phase 1 / Phase 2" internal numbering; just the moves).
- Pass 3 (2026-05-04): full standalone "moves, in order" write-outs added for all eight recipes, sourced from current module spines and exercise shapes. Training-name reference simplified to "modules"; memory typo fixed. Remaining polish: cross-references, consistent voice sweep after module drift, examples-in-line for Recipes 1/5/6/7/8.

**Frameworks riffed on:**
- Cookbook-as-genre, two registers held in tension: **Chez Panisse Menu Cookbook** energy for the long-form worked examples (one well-told dinner per recipe), **Escoffier *Le Guide Culinaire / Le Répertoire de la Cuisine*** for the Components and Index chapters (terse catalogue density, named base preparations, mix-and-match composition). Mastering the Art of French Cooking for accessibility across both. The right vibe is *a practitioner's book, not a theory book.*
- Practitioner cookbook writing as the quality bar: concrete recipes, live constraints, and enough judgment to help the reader choose.
- **Rory Sutherland on revisitation** — the best reference docs are revisited because the prose stays alive on every page, not because they are complete. Cuts beat additions.
- **Roger L. Martin on "what would have to be true"** — Pass 1.10 designed against an explicit cold-recall test for the Index, and an explicit "use without glossary lookup" test for Components.

**Why this supersedes the earlier "lifecycle doc" idea:**
- Lifecycle implies one canonical path; cookbook implies many recipes the practitioner composes. The agentic build space is too varied for a single lifecycle to hold plainly.
- Recipes compose; lifecycles gatekeep. The training is anti-gatekeeping.
- Cookbook extends naturally (new recipes, new components, new data sources) without the earlier entries going stale. A lifecycle doc goes stale the moment the world shifts — which it does every quarter.

**Em-dash carve-out for this file (per Antti's 2026-05-04 sign-off):** the cookbook supplement is a take-home reference, not delivered material; em-dashes are allowed in body, sparingly, where the comma reads weak. The PostToolUse rule-14 hook currently strips body em-dashes on every write — to honour the carve-out, the hook needs an explicit exception for `curriculum/supplementary/cookbook-for-agent-system-design.md`. Until that lands, em-dashes survive only in the maintainer block. If the file is ever folded into a module body or split into a delivered surface, audit and refit per rule 14.

**Reference quote (Antti — capture for the opening once polished):**
> "The first thing you build is for you, because you're the only evaluator you can't fool. Then we turn to work — because that's where the system has to stand up."

*(Quote drafted for Antti's voice; edit freely or swap.)*

**Quality:** draft 2026-05-04 — Pass 3 recipe write-out; re-audit needed.
- compendium-audited 2026-05-03 (writing@bb9c1d5 story@bb9c1d5 technical@bb9c1d5) — INVALIDATED by Pass 1.9 + Pass 1.10 restructure and Pass 3 recipe write-out. Re-fire writing / story / technical class judges before next ship.
- judges @bb9c1d5: writing PASS, story PASS, technical PASS, behavior N/A (pre-Pass-1.9 state)
