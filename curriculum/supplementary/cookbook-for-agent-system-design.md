# Cookbook for Agent System Design

*This is how you do it.* A practitioner's cookbook for turning chat into agent systems you can stake work on. It gives you recipes you can run on Monday, components you can recombine, and two built-out systems that show the stack in the wild.

A real cookbook has three layers: recipes, base preparations, and an index of dishes. *Le Guide Culinaire* is mostly the index; Escoffier's genius was the named preparations, not the dishes. Same shape here.

The eight recipes are deliberately short. They are the base preparations: small, named, reusable. The two canonical dishes are where the detail lives. That is the point: you do not read eight lessons here. You watch the recipes compose into working systems.

Eight recipes. Two canonical dishes. Twelve named components. Eighteen data sources. Twenty named dishes in the index. Mix and match.

## Recipe catalogue

### R1, Make the output genuinely yours

**Use when:** the agent is producing generic prose, pages, pitches, profiles, or memos that need to sound like a real person or company.

**Build:** a first artifact plus the guardrails that make the next one sharper.

**Core moves:** generate the thin baseline; name the real audience; add facts only you know; compare versions; catch fabrication where you are the expert; save the useful rules.

**Test:** someone who knows the subject says "yes, that's it", not merely "that's polished."

**Why:** you are the one evaluator you cannot fool on your own content. Spotting fabrication on something you know cold is the foundation skill for everything that follows.

### R2, Build a compounding system around one live challenge

**Use when:** the work should persist, sharpen, and run again without you rebuilding context every time.

**Build:** `sources/`, `memory/`, `agents/`, a house-style file, a scheduled touch, and the first root rules.

**Core moves:** pick the live challenge; keep sources raw; compile memory with cite-back; create one custom agent; add fresh evidence; let the memory audit itself; schedule the recurring output.

**Test:** the system is still worth reading after a week, and the memory is sharper than the day it started.

**Why:** persistence plus automation equals system. A chat cannot compound; a folder of markdown can.

### R3, Split the work across agents

**Use when:** one agent cannot sensibly cover the access, dialect, or stance the work needs.

**Build:** parallel retrieval plus framework-shaped synthesis.

**Core moves:** split by source zone; write retriever outputs to files; curate returns into memory; run distinct synthesis stances; force disagreement through a framework.

**Test:** the answer is specific enough to bring forward, and the uncertainty is plain enough to inspect.

**Why:** some work needs more than one agent only when access, dialect, or stance differ. Most work doesn't. Learn the move; respect the default.

### R4, Scope an agent your organisation can trust

**Use when:** the agent touches real systems, real data, or a decision somebody else will rely on.

**Build:** a reusable security check, a report with residuals, and operating rules future sessions load before touching the system.

**Core moves:** run policy files raw; package the check as a skill; add named agent-risk patterns; require compliant / violating / "I can't tell"; mitigate one risk; name what remains.

**Test:** the report contains at least one residual you cannot flatten, and the next session knows what to check.

**Why:** certainty about agent safety is a fantasy. The discipline is running the check, not waiting for the check to come back clean. A scoped agent isn't one with no risk; it's one whose residual risk is named, owned, and visible to the next session.

### R5, Earn a judge by benchmarking

**Use when:** quality matters enough that "looks good" is not a decision method.

**Build:** a 30-claim benchmark, a detector scoreboard, and one judge file with a known limit.

**Core moves:** pull claims from a real output; adjudicate against sources; run candidate detectors separately; score precision, recall, and coverage; package the winner.

**Test:** a colleague can read the scoreboard and understand why this judge won and where it stops.

**Why:** quality-method selection in agent work is empirical, not authoritative. A judge picked from a scoreboard you ran is one you'd defend; a judge picked because someone authoritative said so isn't.

### R6, Tighten a generator under a fixed judge

**Use when:** the check should run repeatedly, and the work should improve under the same standard.

**Build:** a re-runnable eval loop with a fixed judge, separate generator, and evolving tactic file.

**Core moves:** freeze the judge; separate generation from judging; run rounds; rewrite the tactic from feedback; keep the score trajectory inspectable.

**Test:** the later output is better by the same yardstick, and the tactic diffs explain what the system learned.

**Why:** this is where the human moves up a level. You stop reviewing every output and start designing the loop. The fixed judge is your delegated taste; the self-improving generator is the work you no longer have to do by hand.

### R7, Share a slice that absorbs

**Use when:** the system works for you and might help someone else.

**Build:** one shareable surface: context, skill, output, or interface. Plus the people plan it needs to survive handoff.

**Core moves:** name the teammate; interview for the job; identify the incumbent; choose the smallest surface; write the technical plan and people plan; test what must be true for them to switch.

**Test:** the teammate can use the slice next week without you sitting beside them.

**Why:** access is the easy half of sharing; absorption is the hard half. Picking the smallest surface that moves the outcome, not the largest one your infrastructure allows, is how you cross that gap.

### R8, Let the system build the next system

**Use when:** you need to decide what agent to build next, and the current system already contains useful evidence.

**Build:** a strategy kernel, suggested agent set, two-week plan, and one new agent generated from the existing stack.

**Core moves:** make the current agent propose the next one; run crux, *what would have to be true?*, and pre-mortem; cross-check proposals; synthesize into coherent actions; sharpen the rule that carried the round.

**Test:** the plan disagrees with at least one obvious option, names the first assumption that could break, and is small enough to run next.

**Why:** the cycle that just sharpened the kernel is the same cycle that sharpens it again next month. Code-generating agents are the meta-tool: the only category where building one tool genuinely makes the next one faster to build.

---

## Canonical Dish 1, The Program Manager Agent

A program manager at a multi-team Nordic software organisation built this over a fortnight in 2026 using Claude Code Desktop on macOS. The problem was not that she lacked visibility. She had meetings, Jira, Confluence, Slack, and a good memory. The problem was that commitments lived in different rooms. A promise made in a leadership meeting became a Jira ticket two days later, got softened in a team sync, then disappeared into a plan page nobody re-read until the date had passed.

The agent's job was simple: keep the live programme state accurate, then draft the smallest useful nudge before a commitment slipped too far.

### The Stack

Three source zones fed the system. Meeting transcripts landed as text files in `sources/transcripts/`. Jira came in through the connector. Active plan files came from Confluence. The raw material stayed raw. The memory at `memory/program-state.md` held the maintained picture: what's moving, what's stuck, what's promised, what's slipping. Every claim pointed back to the meeting, ticket, or plan file it came from.

The custom agent lived at `agents/program-manager.md`. Its rules were narrow:

- Read `memory/program-state.md` first.
- Cite the source for every commitment.
- Treat meeting transcripts as stronger evidence for "who promised what" than later summaries.
- Never send a message directly.
- Draft nudges for approval when a commitment has drifted past the owner's stated date.

The house-style file mattered more than expected. The first nudges were correct and slightly awful: too stern, too ticket-shaped, too easy to ignore. The PM extracted the tone she actually used when a teammate was late but not negligent. The style file said: short, specific, warm, one ask, no moralising. The next drafts sounded like something she would really send.

### The Loop

Each morning, the scheduled agent ran the same sequence.

1. Read yesterday's `memory/program-state.md`.
2. Scan new transcripts, Jira changes, and plan updates.
3. Propose a memory rewrite with cite-back.
4. Identify commitments that moved, slipped, or became ambiguous.
5. Draft one-line nudges for anything past the promised date.
6. Queue the nudges for human approval.
7. Save a short run note: changed, stuck, ambiguous.

That is R2 as the base: sources, memory, custom agent, scheduled touch. R4 sits on top: no outbound message leaves without plan-mode review. R5 appears in miniature: the PM judged nudge quality against her own edits and folded the winning patterns into `style.md`.

### The Edge

The surprise was not that the agent found overdue TODOs. The PM already knew how to do that by hand. The surprise was that some drafts came back better than hers: softer, more specific, and harder to ignore, because the memory had read the meeting where the commitment was made.

The system also exposed a stranger class of work: commitments that were not late because nobody owned them. The agent learned to flag "owner drift" separately from "date drift." That became a rule. If a commitment appeared in a meeting transcript without a named owner, the nudge did not go to the nearest manager. It went back to the PM as an ambiguity.

### What Made It Work

The system had a small job and a hard boundary. It did not "manage the programme." It maintained the state, found drift, and drafted nudges. The PM stayed accountable for judgment. The agent took the tedious part: reading across systems and remembering who said what.

The durable artifact was not the morning output. It was the memory plus rules that made the next morning better. After two weeks, the PM was no longer prompting from scratch. She was steering a small operating system.

**Recipes composed:** R2 as the base, R4 for outbound gates, R5 for nudge-quality scoring, R6 once the daily run started improving the same files repeatedly.

**Reusable pattern:** when commitments are scattered across meetings, tickets, and plans, build a state memory first. Do not start with automation. Start with a maintained picture of the work.

---

## Canonical Dish 2, The Shared-Inbox Triage Agent

A customer-support team at a B2B SaaS company built this in early 2026 with Claude Code and scheduled execution on macOS. The team had a shared inbox that mixed outage reports, billing questions, named-customer escalations, vague procurement threads, security reports, and marketing messages dressed up as urgency.

The old process was human scanning. It worked because experienced people could read between lines. It failed because the inbox never stopped, the cues were uneven, and the most important messages were not always the cleanest ones.

The agent's job was not to answer customers. It read incoming email every 15 minutes, classified the thread, routed critical ones to one Slack channel, and left everything else untouched.

### The Stack

The agent had read-only access to the shared inbox and write-only access to one Slack channel. Nothing else. That boundary was the design.

Two lenses ran on each message.

The policy lens named the business categories: P1 outage signal, security report, named-customer escalation, churn-risk language, billing blocker, procurement blocker, product defect, low-priority support request.

The agent-risk lens named the ways email can poison an agent: prompt injection in the email body, sender spoofing, attachment-only context, urgent-sounding copy with no account match, and instructions that tried to override the agent's routing rules.

Each triage row had three possible verdicts: route, do not route, "I can't tell." The third row was the useful one. A binary classifier would have forced ambiguous messages into false confidence. The team wanted ambiguity surfaced, not hidden.

### The Run

Every 15 minutes the agent did the same work.

1. Fetch new inbox threads.
2. Read the policy lens and agent-risk lens.
3. Produce one row per thread: category, evidence, risk flags, verdict.
4. Route critical messages to Slack with sender, thread link, one-line reason, and source quote.
5. Leave non-critical messages untouched.
6. Put "I can't tell" rows into a review section for a human read.
7. Save the run log for later scoring.

The Slack message was intentionally small. No essay. No auto-reply. No customer-facing action. Just enough for the right human to open the thread fast.

### The Check

The first week produced false positives. The agent routed several marketing messages because they used outage-shaped language. The fix was not "be less alarmed." The team added a source requirement: a P1 route needed either a known customer domain, account identifier, product area, or repeated customer-impact language across the thread. Urgency alone stopped counting.

The more interesting finding came from "I can't tell." The agent flagged about five ambiguous emails per week. Three of them turned out to be the most important threads to escalate, exactly because they did not fit established policy patterns yet. One was an early signal of a new enterprise customer's integration failure. One was a security concern written in non-security language by a non-technical buyer. One was a procurement blocker that looked like routine billing until the account name was matched.

That changed the team's trust in the system. The value was not only faster routing. It was better ambiguity capture.

### What Made It Work

The boundary stayed narrow. Read email. Write one Slack channel. Do not reply. Do not mutate the inbox. Do not create tickets. Every action started as text a human could inspect.

The lenses stayed separate. The policy lens answered "does the business care?" The risk lens answered "is this message trying to steer the agent or distort the route?" Blending those would have made the report feel cleaner and less useful.

The residual risk stayed visible: the policy lens drifts as the business changes. A new customer segment, product line, or escalation path changes what "critical" means. Without periodic re-scoping, the false-negative rate climbs.

**Recipes composed:** R4 as the base, R2 for logs and maintained routing memory, R5 for scoring route quality, R6 once the team started tightening the classifier against the same review set.

**Reusable pattern:** when the cost of a missed message is high, do not ask the agent to be certain. Ask it to route the clear cases and preserve ambiguity for humans.

---

## Canonical Dish 3, The Continuous Research System

This system runs inside the very repository the cookbook lives in. The strategic question is standing rather than seasonal: *what are practitioners actually doing in the agentic space, and which patterns have converged enough to bet on?* The market answer to that question is loud: press releases, analyst predictions, journalist write-ups. The practitioner answer is quieter, more accurate, and harder to find. The system exists to harvest the second answer continuously.

The temptation is to read fewer sources, faster. The discipline is to read more sources, slower, with a sharper rule about what counts as evidence.

### The Stack

Three source zones run in parallel. *Practitioner-direct* covers own blogs, X.com, GitHub repositories, conference talks. *Practitioner-analysis* covers technical teardowns and specialist-journalist interviews. *Academic* covers university research and published benchmarks. The zones are kept separate so the synthesizer can tell where any claim came from. Mixing them blurs provenance and breaks the cite-back rule before it has a chance to fire.

Each finding lives as a dated markdown file. A synthesis index threads convergence across findings. The memory accumulates; old findings stay readable, but old claims stop earning citations after six months.

The hard rule sits one level above the sources: an evidence ladder. Level 0 is commercial content (press releases, analyst predictions, paid frameworks). Level 1 is single-practitioner opinion. Level 2 is single-experiment evidence. Level 3 is convergence (10–20 independent practitioners reporting the same pattern). Level 4 is cross-domain meta-pattern. The system reports at Level 3 by design. Levels 0 and 1 never enter the published memory.

### The Loop

Three gates fire per candidate finding. Is the work *truly agentic*, multi-step autonomous and tool-using, or chatbot-shaped dressed up in agent vocabulary? Is there *independent evidence*, at least one source that does not stand to gain from the claim being true? Is the *outcome specific*, named company plus practice plus measurable result plus URL?

Every claim carries a source-type label and a URL. Freshness window is six months; older sources serve as historical context only, explicitly dated. *"I can't tell"* is a permitted finding state when the evidence is real but not yet at convergence.

### The Check

Four review personas re-fire on every modified file: source-type-auditor (is this commercial content masquerading as practitioner work?), zombie-stat-detector (is this round-number failure rate a small qualitative study stripped of caveats?), freshness-checker (is the source inside the six-month window?), evidence-ladder-classifier (is the claim reported at the level its evidence supports?).

The personas catch what the harvester misses. The harvester wants to publish; the personas want to reject. That asymmetry is the design.

The genuine surprise is not the convergence patterns the system surfaces. It is how often the gates *reject* sources that look credible at first scan: round-number failure stats with no methodology behind them, customer-success pages on supplier sites, journalist write-ups attributed as if the practitioner authored them, and a steady stream of analyst predictions repeated until they sound like data.

### What Made It Work

The hard rule was the ladder, not the harvester. Without the ladder, more reading produces more noise. With the ladder, more reading produces sharper convergence, because Level 3 raises its own bar as the corpus grows.

The four review personas are the rule with teeth. A rule everybody agrees with but nobody enforces is a slogan; a rule that fires automatically on every modified file is infrastructure. The system's value is not the findings it publishes. It is the findings it refuses to publish.

**Recipes composed:** R3 as the base (parallel retrieval, framework-shaped synthesis), R6 for the four review personas as fixed judges that re-fire on every modified file, R2 for the dated-markdown memory and synthesis index, R4 in spirit for the gate discipline and named residuals.

**Reusable pattern:** when the question is "what is true in a noisy field?", the harvester is not the hard part. The rejection rule is. Build the ladder before you build the search.

---

## Components

Twelve named items the recipes lean on: eight pieces and four closed-set lists. Each is small enough to hold in head; each is referenced by name from the Index of agent shapes below. Many of the smaller bits live inside the recipes, `style.md`, `wonder.md`, the personal skill, `challenge.md`, and earn their names there rather than here.

**The three layers.** Raw sources (the originals, untouched), the memory (maintained by the agent, sharpens over time), and the rules file (`./CLAUDE.md` that keeps the shape consistent). The architectural stack of every compounding system. Most agent failures look like bugs and are layer confusion: a rule written into memory, a source written into rules, the system stops behaving like a system. From R2.

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

Twenty named compositions a practitioner would recognise on sight. Each entry: the dish in italics (what it does), then the named components, then the recipes it composes from. The two canonical dishes above are plated and served; this is the index a working practitioner opens to recall a name. Specifics vary by company; the shape is what travels.

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

### More dishes to cook

Written as they stabilise:

- **Cloud deployment.** Start with R2, add R4 before anything writes outward, then R6 once the run repeats. The question is what changes when the folder becomes a runtime.
- **Team sharing.** Use R7 as the dish, with the four sharing strategies as the mirepoix. Context, skill, output, interface; never start by sharing the whole pot.
- **Cross-org reuse.** Combine R1's voice discipline, R4's trust boundary, and R5's measured judge. Reuse fails when taste, policy, or evidence stops travelling.
- **Enterprise integration.** Start with the data source, then choose the narrowest action. CRM, ERP, warehouse, iPaaS: each one needs cite-back, plan-mode review, and residual risk named.
- **Observability and cost control.** Treat logs as sources, not plumbing. R2 keeps the run memory; R5 tells you what to measure; R6 tightens the system under the same yardstick.
- **Handoffs to non-agent systems.** Cook the seam. The agent produces text; another system obeys. Plan-mode review, gate, and "I can't tell" are the base preparation.

Add a recipe when the move is reliable enough that a working practitioner would recommend it to another without caveats. Not before.

<!-- maintainer -->

**Status:** Pass 3.3 — Why-lines restored to recipes, third canonical dish added (continuous research system), Sutherland sting on the three-layers component. Eight short recipes each carrying a Why, three full dishes (program manager agent, shared-inbox triage agent, continuous research system), 12 named components, 18 data sources, 20 indexed dishes. Recipe coverage in worked dishes: R2 (Dish 1), R3 + R6 (Dish 3), R4 (Dish 2). R5 / R7 / R8 still owe a worked example each. Final polish still owes cross-reference tightening and case-consent/source verification before external ship.

**Drift prevention:** when a module's Big Idea or named artefacts change, the matching recipe updates in the same edit. The cookbook is the take-home catalogue; if it lags the module, the buyer-side reading goes stale. Sweep cookbook against module Big Ideas at every cycle close. **Same rule for components and data sources** — when a module renames a component or adds a data source, the relevant Components / Data sources entry updates in the same edit. The Index entries are downstream of both: a renamed component ripples to every Index dish that composes it.

**Canonical-dish discipline (Chez Panisse):** long-form dishes must be real agents built by Antti or a consenting customer. Pseudonymise to CRM standard (no real prospect names — use *"a program manager at a multi-team Nordic software org"* etc.). Date-stamp and runtime-tag every dish. Frame as *one* shape, not THE shape — readers adapt, not copy. Dishes must demonstrate recipe composition across at least three recipes; otherwise the dish is too thin for this chapter.

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
- Pass 3 (2026-05-04): full standalone "moves, in order" write-outs added for all eight recipes, sourced from current module spines and exercise shapes. Training-name reference simplified to "modules"; memory typo fixed.
- Pass 3.1 (2026-05-04): structure flipped after Antti review. Eight long recipes compressed into a short catalogue. Two canonical full worked examples promoted so the cookbook shows recipe composition in real work instead of repeating the module sequence.
- Pass 3.2 (2026-05-04): provenance framing removed from reader-facing prose. Cookbook frame now treats future areas as dishes to cook with the same base preparations, mirepoix, and patterns.
- Pass 3.3 (2026-05-04, late evening): Why-lines restored to each of the eight recipe stubs (the counterintuitive one-liner that gives each recipe its conviction; was lost in the Pass 3.1 compression). Canonical Dish 3 (the continuous research system, which lives in this very repo) added between Dish 2 and Components, restoring R3 + R6 worked-example demonstration that had been cut in Pass 3.1. Sutherland-flavoured sting added to the three-layers component (most agent failures look like bugs and are layer confusion). Net: the cookbook is now spicier without being heavier; recipe coverage in worked dishes climbs from 2 of 8 to 3 of 8.

**Frameworks riffed on:**
- Cookbook-as-genre, two registers held in tension: **Chez Panisse Menu Cookbook** energy for the long-form worked examples (one well-told dinner per recipe), **Escoffier *Le Guide Culinaire / Le Répertoire de la Cuisine*** for the Components and Index chapters (terse catalogue density, named base preparations, mix-and-match composition). Mastering the Art of French Cooking for accessibility across both. The right vibe is *a practitioner's book, not a theory book.*
- Practitioner cookbook writing as the quality bar: concrete recipes, live constraints, and enough judgment to help the reader choose.
- **Rory Sutherland on revisitation** — the best reference docs are revisited because the prose stays alive on every page, not because they are complete. Cuts beat additions.
- **Roger L. Martin on "what would have to be true"** — Pass 1.10 designed against an explicit cold-recall test for the Index, and an explicit "use without glossary lookup" test for Components.

**Why this supersedes the earlier "lifecycle doc" idea:**
- Lifecycle implies one canonical path; cookbook implies many recipes the practitioner composes. The agentic build space is too varied for a single lifecycle to hold plainly.
- Recipes compose; lifecycles gatekeep. The recipe form is anti-gatekeeping.
- Cookbook extends naturally (new recipes, new components, new data sources) without the earlier entries going stale. A lifecycle doc goes stale the moment the world shifts — which it does every quarter.

**Em-dash carve-out for this file (per Antti's 2026-05-04 sign-off):** the cookbook supplement is a take-home reference, not delivered material; em-dashes are allowed in body, sparingly, where the comma reads weak. The PostToolUse rule-14 hook currently strips body em-dashes on every write — to honour the carve-out, the hook needs an explicit exception for `curriculum/supplementary/cookbook-for-agent-system-design.md`. Until that lands, em-dashes survive only in the maintainer block. If the file is ever folded into a module body or split into a delivered surface, audit and refit per rule 14.

**Reference quote (Antti — capture for the opening once polished):**
> "The first thing you build is for you, because you're the only evaluator you can't fool. Then we turn to work — because that's where the system has to stand up."

*(Quote drafted for Antti's voice; edit freely or swap.)*

**Quality:** compendium-audited 2026-05-04 (story@11644c6)
- judges @11644c6: writing grandfathered, story PASS, technical grandfathered, behavior grandfathered
