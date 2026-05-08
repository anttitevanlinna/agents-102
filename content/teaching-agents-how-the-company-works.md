---
title: "The Companies Winning With AI Are Teaching Agents How the Company Works"
slug: "teaching-agents-how-the-company-works"
date: "2026-05-08"
status: "draft"
target: "newsletter"
audience: "CTOs, product/engineering leaders, AI transformation owners"
---

# The Companies Winning With AI Are Teaching Agents How the Company Works

Status: rough cut.

This is intentionally long.

It is not polished.

It is a research-backed article basis for Antti rewrite.

Core thesis:

Skills-first holds.

But skills are not the whole story.

Skills are the discovery mechanism.

Shared context is the scaling mechanism.

## Candidate opening lines

The first job is not to choose the AI platform.

The first job is to teach your people enough AI to discover what the agent does not know.

The second job is to turn those discoveries into shared company context.

Alternative:

Every company says it wants AI adoption.

The better companies are doing something more specific.

They are teaching agents how the company works.

Alternative:

The software companies that crossed from individual AI use to team throughput did not win because they bought better tools.

They won because they made company context executable.

Alternative:

The skill is not prompting.

The skill is turning intent into verifiable work.

The institution-level move is turning repeated intent into reusable context.

## The uncomfortable finding

We went looking for the transition case.

The named enterprise case where AI moves from individual ability into team-level throughput.

Not a vendor announcement.

Not a CEO memo.

Not a demo.

A practitioner publishing the operating shape.

What changed.

What got measured.

Who owns the new work.

What the organization can now do that it could not do before.

The traditional-enterprise case is still thin.

C.H. Robinson is the strongest traditional logistics signal.

Berner is the first Nordic non-software scale signal after lowering the threshold to 300 people.

Both matter.

Neither yet gives the full playbook.

Software gives us the clearer picture.

Cloudflare.

Spotify.

LinkedIn.

Apollo.

OpenAI.

Every.

Ramp.

Zencoder, with caveats.

These cases are not identical.

Some are large.

Some are small.

Some are AI vendors.

Some are normal software companies.

But they rhyme.

They do not treat AI as a personal productivity tool.

They turn it into an engineering system.

The repeated pattern is:

Competence creates the pull.

Context creates the scale.

Verification creates the trust.

Platform ownership creates the institution.

This is the part that changes the management question.

Not: how do we roll out AI tools?

Not: how do we reorganize for AI?

The better question:

What company knowledge must become executable for agents, and who owns keeping it true?

## Skills-first still holds

The skills-first hypothesis holds.

With precision.

Skills-first beats strategy-first.

Skills-first beats platform-first.

Skills-first beats org-design-first.

But skills-only does not scale.

The strongest version is:

Teach people to work with agents.

Watch what context they keep supplying.

Harvest the repeated context into shared infrastructure.

Give that infrastructure an owner.

Then measure throughput.

This is not a cute sequence.

It is the sequence the evidence keeps pointing toward.

At F-Secure, the pattern appeared from the inside.

People learned to build with Claude Code.

They started building dashboards, agents, apps, and workflows around their real work.

Nobody had to assign every use case.

Competence created pull.

Then the walls appeared.

Where is the data?

Where does this run?

How do I share it?

How does someone else find it?

Who checks whether it is right?

Those are better problems than the usual AI strategy problems.

They are concrete.

They are grounded in actual attempted work.

They are not vendor-shaped.

They reveal the company-specific context that agents need.

The same mechanism appears in the external software cases.

Apollo rolled AI tooling across 250+ engineers.

Cursor usage reached 92 percent weekly active usage.

That sounds like success.

But Apollo reported about 15 percent organization-level productivity gain.

Cycle time stayed flat.

Frontend super users were different.

Where context was strong, they reached 3 to 4 times PR velocity.

That is the whole story in miniature.

Tool adoption alone did not create the 10x organization.

The gains appeared where the work was bounded, context was available, and people knew how to use the tool inside a real delivery loop.

Apollo is useful because it is sober.

It says the quiet thing out loud.

Usage is not value.

Weekly active users are not throughput.

The organization does not become AI-native because the graph goes up.

It becomes AI-native when teams can turn more intent into reviewed, integrated, working output.

## The pattern in software

Software is the best reference case because the evidence is no longer vague.

We have practitioner-direct cases with operational detail.

Cloudflare built an internal AI engineering stack.

Spotify built Honk for background coding agents.

LinkedIn built CAPT to give coding agents organizational context.

OpenAI describes harness engineering.

Every describes compound engineering.

Ramp packages product-shaping work into a Claude Code skill.

These are not the same architecture.

But they converge on the same move.

Make the company legible to agents.

Not just documents.

Not just prompts.

Legible working context.

Instructions.

Playbooks.

Tools.

Ownership maps.

Service catalogs.

Verification loops.

Review gates.

Telemetry.

Runtime constraints.

Human escalation.

This is why software is ahead.

Software already has many of these primitives.

Repos.

Tests.

CI.

Pull requests.

Service catalogs.

Ownership metadata.

Issue trackers.

Build systems.

Logs.

Review culture.

Agents did not create this foundation.

They exploited it.

Most business functions do not yet have the equivalent.

That is why the software cases matter beyond software.

They show the shape of the missing layer.

## Cloudflare did not just buy coding assistants

Cloudflare is the cleanest scaled case we found.

In April 2026, Cloudflare published the internal AI engineering stack it built for itself.

The numbers are unusually concrete.

3,683 internal users used AI coding tools in 30 days.

That was 60 percent of the company.

It was 93 percent of R&D.

295 teams used agentic tools and coding assistants.

Cloudflare routed 47.95 million AI requests and 241.37 billion tokens through its internal AI Gateway in that 30-day window.

The stack matters more than the adoption number.

Cloudflare built around identity, access, model routing, cost tracking, data retention, MCP servers, sandboxing, Backstage, AGENTS.md, internal standards, telemetry, and AI code review.

This is the difference between tool rollout and institution-level throughput.

An individual engineer can use Claude Code or Cursor alone.

A company needs authentication.

A company needs routing.

A company needs internal tools exposed safely.

A company needs the agent to know which service is owned by which team.

A company needs the agent to know the standards of the repo it is changing.

A company needs review before merge.

A company needs telemetry.

A company needs a way to update context when the agent exposes a gap.

Cloudflare also attacked the absorption bottleneck directly.

It did not only make code generation faster.

It put AI code review into CI.

The code review system ran 131,246 review runs across 48,095 merge requests in 5,169 repositories in 30 days.

Median review time was 3 minutes 39 seconds.

P99 was 10 minutes 21 seconds.

The average cost was $1.19.

The system had specialized reviewers for security, performance, code quality, documentation, release management, AGENTS.md, and internal compliance.

There was a coordinator agent.

There was a break-glass mechanism.

Humans overrode the flow 288 times, equal to 0.6 percent of merge requests.

This is not full autonomy.

It is a governed throughput system.

It accepts that humans remain responsible for architecture and cross-system judgment.

But it moves review capacity closer to generation capacity.

That is the software lesson.

AI increases output.

The organization must increase absorption.

Cloudflare did both.

## Spotify shows the Nordic software version

Spotify is the strongest Nordic software-at-scale case.

It is especially useful because it is not a greenfield AI-native startup.

It is a large software organization with existing engineering systems.

Spotify built Honk by extending Fleet Management with background coding agents.

Engineers define fleet-wide changes in natural language.

Agents run in the background.

They create pull requests.

Humans review.

By November 2025, Spotify had more than 1,500 merged production PRs from the system.

It reported 60 to 90 percent time savings for migration work.

Hundreds of developers interacted with the agent.

The follow-up posts are more interesting than the headline.

Part 2 is context engineering.

Spotify learned that the agent needed clear task setup, examples, desired end states, version-controlled prompts, limited tools, and one-change-at-a-time constraints.

Part 3 is feedback loops.

Spotify built deterministic verifiers for formatting, build, and tests.

The agent runs in a limited, sandboxed environment.

An LLM judge vetoed about a quarter of sessions.

The agent recovered about half of those.

Part 4 is the real case study.

Two deprecated datasets had about 1,800 direct downstream pipelines and several thousand indirect impacts.

Manual migration was estimated at about 10 engineering weeks.

Using Backstage, Fleet Management, and Honk, Spotify rolled out 240 automated migration PRs.

The caveat is the lesson.

Spotify paused some migrations because lack of standardization made prompts brittle.

That matters.

Agents did not remove the need for standardization.

They made standardization more valuable.

Test coverage became more valuable.

Backstage became more valuable.

Fleet Management became more valuable.

Context became more valuable.

The agent did not float above the organization.

It ran through the organization’s existing engineering machinery.

Where the machinery was strong, the agent worked.

Where the machinery was weak, the agent exposed the weakness.

## LinkedIn names the missing layer

LinkedIn may be the most useful case for the thesis.

It built CAPT.

Contextual Agent Playbooks and Tools.

The name is clunky.

The idea is sharp.

LinkedIn’s diagnosis was simple:

Generic coding agents do not know the organization.

They do not know internal services.

They do not know frameworks.

They do not know data systems.

They do not know team workflows.

They do not know where the truth lives.

CAPT gives off-the-shelf coding agents organizational context.

It does this through MCP access to internal systems and executable playbooks.

The system supports 1,000+ engineers.

More than 500 playbooks have been authored.

LinkedIn reports about 70 percent faster issue triage in many areas.

It reports roughly 3 times faster common data-analysis workflows.

This is the cleanest articulation of the move from personal ability to team throughput.

The playbook is not a training slide.

It is not a wiki page.

It is procedural company knowledge the agent can invoke.

It includes purpose, inputs, file references, step-by-step instructions, and tool calls.

It can be central or local.

It can be instrumented.

It can be updated.

It can become part of normal work.

This is what many companies are missing.

They have documents humans can read.

They do not have playbooks agents can execute.

They have systems humans can click.

They do not have tool access agents can use safely.

They have informal know-how in teams.

They do not have a mechanism for converting repeated know-how into shared executable context.

LinkedIn is a strong case because it makes the abstraction visible.

AI transformation is partly a context-management problem.

Not context in the vague LLM sense.

Company context.

Where things are.

Who owns them.

Which workflow applies.

Which exception matters.

Which check must pass.

Which tool is safe.

Which human gets paged.

## OpenAI calls it harness engineering

OpenAI gives another name to the same pattern.

Harness engineering.

The OpenAI guide describes building an internal product with no manually written code.

Roughly 1 million lines across application logic, tests, CI, docs, observability, and tooling.

Roughly 1,500 PRs over five months.

The tempting takeaway is "AI wrote all the code."

That is the shallow takeaway.

The deeper takeaway is that the human work changed.

Humans designed the environment.

Humans specified intent.

Humans built feedback loops.

Humans made repo knowledge the system of record.

Humans enforced architecture and taste.

Humans made the agent’s work legible.

That word matters.

Legible.

The agent has to see what good looks like.

The system has to expose the right constraints.

The repo has to carry the working memory.

The checks have to make failure visible.

This is what "teaching AI" means in practice.

It is not a workshop about prompt tips.

It is not a one-time system prompt.

It is the design of a work environment where agents can understand, act, fail, recover, and be corrected.

## Every and Ramp show the small-team version

Every gives the small-team version.

Compound engineering.

Plan.

Work.

Review.

Compound.

The final step is the interesting step.

Compound means storing the lesson from the work back into artifacts future agents can use.

Bugs become rules.

Review findings become checks.

Architecture decisions become context.

Preferences become instructions.

The next run starts smarter because the previous run left a trace.

This is the same pattern at small scale.

The artifact may be a CLAUDE.md file.

It may be a skill.

It may be a checklist.

It may be an eval.

The mechanic is what matters.

Work produces learning.

Learning becomes context.

Context improves future work.

Ramp shows the product-management version.

The reported Claude Code PM skill launches parallel research across competitors, Gong calls, Zendesk tickets, and the codebase.

It shapes a spec with context, principles, requirements, alternatives, and open questions.

This is not just "a PM uses AI."

It is a reusable workflow that knows where product evidence lives.

It turns discovery context into a repeatable agentic pattern.

This is where the software lesson starts spilling beyond coding.

The function changes when its context can be packaged into reusable workflows.

Not because everyone becomes a programmer.

Because agents can operate across the function’s evidence base.

## The common denominator

The successful software cases have seven things in common.

First, they start with skilled users.

Not passive users.

Builders.

People who can describe work to an agent, notice failure, correct it, and improve the next run.

Second, they make context explicit.

Repo instructions.

AGENTS.md.

CLAUDE.md.

Skills.

Playbooks.

Service catalogs.

Standards.

Architecture notes.

Ownership metadata.

Third, they connect tools safely.

MCP or equivalent.

Code search.

Tickets.

Docs.

Observability.

Data platforms.

Internal systems.

Not everything.

The right things.

With permissions.

Fourth, they verify.

Tests.

Builds.

Formatters.

CI.

AI review.

Human review.

LLM judges.

Stop hooks.

Sandboxes.

Fifth, they narrow use cases before broadening.

Migrations.

Issue triage.

Data-analysis workflows.

Product shaping.

Code review.

Fleet-wide changes.

They do not begin with "replace engineering."

Sixth, they measure workflow throughput.

PRs merged.

Review time.

Issue triage time.

Migration effort.

Weekly usage plus delivery metrics.

Token volume plus team adoption.

Not vibes.

Seventh, someone owns the shared layer.

Developer Productivity at Cloudflare.

Fleet Management and platform work at Spotify.

CAPT at LinkedIn.

Compound engineering loops at Every.

Product leadership mechanics at Ramp.

The exact owner varies.

The need for ownership does not.

## What this replaces

This replaces generic AI training.

Generic AI training teaches people to use a tool.

This teaches people to expose the company context agents need.

This replaces platform-first transformation.

Platform-first asks: which vendor should we buy?

This asks: what work can our people now see, and what shared context would make that work repeatable?

This replaces passive knowledge management.

Passive knowledge management writes documents humans might read.

This turns the best parts of knowledge into artifacts agents can use during work.

This replaces governance as policy theater.

Policy says what agents may not do.

This adds the operating layer that controls what agents can access, how they act, how they are checked, and who sees the trace.

This replaces org-design-first transformation.

Org-design-first asks how the boxes should move.

This asks where the work actually changes.

What roles have shifted.

What context must be shared.

Where verification is overloaded.

Which capabilities now need an owner.

The org may still change.

But it changes in response to learned work.

Not in anticipation of imagined work.

## The org-design finding

The research started with an org-design question.

Has any named enterprise redesigned the org first for AI, then measured outcomes 6+ months later?

We did not find a clean case.

Not in traditional enterprise.

Not in Nordic non-software.

Not even cleanly in software.

The software cases do not start by collapsing reporting lines.

They redesign the work environment.

They redesign the context layer.

They redesign review.

They redesign the role of senior engineers.

They redesign how knowledge is captured.

They redesign how agents touch tools.

They redesign how throughput is measured.

Zencoder is the sharpest redesign-shaped case.

It reports 170 percent throughput with 80 percent headcount.

It says QA moved toward system architecture.

It says humans define intent and validate outcomes while AI executes the middle.

But Zencoder is an AI coding vendor.

That makes it high-signal and caveated.

Atlassian has the clearest announcement-stage org posture.

But not enough measured outcome depth yet.

The practical conclusion:

For now, the strongest evidence says org design follows adoption.

The sequence is not:

Redesign the org.

Then deploy AI.

The sequence is:

Build competence.

Observe changed work.

Build shared context and verification.

Move ownership to a real team.

Then adjust roles, capacity, reporting, and incentives around what has proven valuable.

That is less satisfying than a target operating model.

It is more believable.

## The skill layer and the context layer

This is the key distinction.

The skill layer lives in people.

Can they work with agents?

Can they decompose a task?

Can they write a useful spec?

Can they ask for a plan?

Can they detect drift?

Can they verify output?

Can they teach the agent from correction?

Can they turn a one-off success into a repeatable instruction?

The context layer lives in the institution.

Does the agent know the repo?

Does it know the service owner?

Can it reach the ticket?

Can it read the design doc?

Can it query the data?

Can it run the test?

Can it see the standard?

Can it invoke the playbook?

Can it produce a trace?

Can the organization update the context when reality changes?

Skills-first is the right start because the institution does not know what context matters yet.

People discover that by trying.

They discover it when the agent fails.

They discover it when the agent asks for the same thing ten times.

They discover it when the same onboarding explanation appears in every prompt.

They discover it when every useful agent needs the same data source.

They discover it when every successful workflow has the same manual check.

Those repeated needs are the map.

That is the context backlog.

The company should manage it like product work.

Not as a side pile of prompt snippets.

As institutional infrastructure.

## The operating model I would test

Start with a cohort.

Not everyone.

Not leadership only.

A real cross-section of builders and domain experts.

Teach them to use agentic tools on real work.

The goal is not training completion.

The goal is useful attempts.

Ask every participant to keep a context diary.

What did the agent need to know?

Where did you fetch that knowledge?

What did you paste repeatedly?

What did the agent misunderstand?

What did you check manually?

Which tool did you wish it could use?

Which permission blocked you?

Which output was hard to verify?

Which instruction should exist for everyone?

After two or three weeks, review the diary.

Do not start with the biggest use-case list.

Start with repeated context needs.

Group them into buckets.

Repo or project instructions.

Team playbooks.

MCP/tool access.

Data access.

Service and ownership maps.

Verification checks.

Security rules.

Human escalation paths.

Telemetry.

Runtime and sharing.

Then decide where each item belongs.

Some context belongs in local repo files.

Some belongs in skills.

Some belongs in a central playbook.

Some belongs in Backstage or an equivalent catalog.

Some belongs in MCP servers.

Some belongs in CI.

Some belongs in governance policy.

Some belongs in training.

Some does not belong in an agent at all.

Then assign ownership.

Not abstract ownership.

Named team ownership.

Developer Productivity.

Platform Engineering.

Data Platform.

Security.

Product Ops.

People Ops.

Finance Ops.

The owner depends on the domain.

But the question is stable:

Who keeps this context true?

Then measure work.

Not just adoption.

Cycle time.

Review time.

Rework.

Defects.

Time to triage.

Migration effort.

Time from intent to PR.

Time from question to analysis.

Human review load.

Number of repeatable playbooks.

Number of context updates triggered by failed work.

The metric should be close to the work.

Apollo teaches the warning.

Tool usage can be high while cycle time stays flat.

Cloudflare teaches the counter.

AI review moved a real queue.

Spotify teaches the constraint.

Standardized, testable systems absorb agents better.

LinkedIn teaches the architecture.

The shared organizational context layer is the multiplier.

## What transfers beyond software

The transfer is not "every function should copy software."

That is too easy and too wrong.

Software has an unusual advantage.

Its work is already wrapped in executable checks.

Business functions must find their equivalent.

Finance has reconciliations.

Accounting has audit trails.

Customer support has resolution, escalation, customer satisfaction, and quality sampling.

Sales has CRM hygiene, forecast accuracy, meeting prep, message quality, and conversion signals.

HR has policies, cases, manager guidance, and sensitive judgment.

Operations has SOPs, exception handling, capacity plans, and service levels.

Legal has clause libraries, approval workflows, redlines, and partner review.

Each function needs its own test suite.

Not always automated.

Not always deterministic.

But explicit.

What does good look like?

What can the agent check?

What must a human check?

What is reversible?

What is a one-way door?

What context is local?

What context is company-wide?

What context is too sensitive to expose?

What correction should become permanent?

The danger is copying the visible artifacts without the underlying loop.

AGENTS.md by itself is not the win.

A skills marketplace by itself is not the win.

MCP by itself is not the win.

The win is the learning loop.

Work reveals missing context.

People correct it.

The correction becomes shared context.

Shared context improves future work.

Verification catches the next failure.

The system learns.

That loop can transfer.

The artifacts will differ by function.

## The risk

The context layer can become dangerous.

Bad instructions scale bad work.

Stale playbooks are worse than stale docs because agents execute them.

MCP access expands blast radius.

Skills can hide state-changing actions.

Marketplace mechanics can distribute unsafe workflows.

Local hacks can become company defaults without enough scrutiny.

This is why context infrastructure cannot be treated as a prompt library.

It needs lifecycle management.

Review.

Versioning.

Testing.

Ownership.

Deprecation.

Telemetry.

Security.

The software world already knows this pattern.

Code can be powerful, stale, insecure, duplicated, and badly owned.

So can agent context.

The difference is that many companies will discover this late.

They will celebrate a skills marketplace before asking who reviews skills.

They will connect tools before asking how agent identity works.

They will create playbooks before asking who retires obsolete ones.

They will push adoption before measuring absorption.

The better companies will treat context as production material.

Not as enablement collateral.

## The management question

The executive question changes.

Old question:

How many people are using AI?

Better question:

Which workflows now produce more reviewed, integrated, useful output?

Old question:

Which AI platform should we standardize on?

Better question:

What shared context do our best agentic workflows keep needing?

Old question:

How do we train everyone?

Better question:

How do we turn the learning from trained people into institutional assets?

Old question:

How do we govern AI?

Better question:

How do we govern the context, tools, identities, checks, and traces through which agents act?

Old question:

How should we reorganize for AI?

Better question:

Which parts of work have already changed enough that ownership, capacity, and incentives must change?

This is a more useful management surface.

It is closer to reality.

It also avoids the false comfort of a giant redesign.

## The answer so far

What did we learn?

The software cases that succeeded have a common shape.

They did not win by handing everyone a chat interface.

They did not win by mandating "AI-first" in isolation.

They did not win by redrawing the org chart first.

They created skilled users.

They exposed missing context.

They captured repeated context.

They connected tools.

They constrained the agent.

They verified output.

They measured workflow throughput.

They gave the shared layer an owner.

That is the pattern.

Skills-first holds because skills create sight.

People who can build with agents see better opportunities.

They also see the missing infrastructure earlier.

They reveal where company knowledge is trapped in heads, wikis, systems, and rituals.

But the company only captures value when that discovery becomes shared context.

The phrase I would keep:

Teach the people first.

Then teach the company to teach the agents.

The end state is not "everyone prompts better."

The end state is that the organization gets better at making its work legible, executable, checkable, and improvable by agents.

That is the institutional capability.

That is what software is showing first.

## Candidate closing lines

The first wave of AI adoption was people learning to talk to models.

The second wave is companies learning to teach agents how work actually happens.

Alternative:

The company that wins is not the one with the most licenses.

It is the one whose best work becomes easiest for agents to understand, execute, and improve.

Alternative:

The agent does not need another motivational memo.

It needs the company to become legible.

Alternative:

Skills-first is still right.

But the prize is not skilled individuals.

The prize is an institution that can turn skill into shared context, and shared context into throughput.

## Source notes

These notes are for verification before publication.

They should be compressed or removed from the final article.

Cloudflare internal AI engineering stack.

Source: Cloudflare Engineering, "The AI engineering stack we built internally - on the platform we ship", April 20, 2026.

URL: https://blog.cloudflare.com/internal-ai-engineering-stack/

Type: practitioner direct.

Used for: 3,683 internal users, 60 percent company adoption, 93 percent R&D adoption, 295 teams, AI Gateway request/token volume, Access, AI Gateway, MCP Portal, Sandbox SDK, Backstage, AGENTS.md, Developer Productivity ownership.

Cloudflare AI code review.

Source: Cloudflare Engineering, "Orchestrating AI Code Review at scale", April 20, 2026.

URL: https://blog.cloudflare.com/ai-code-review/

Type: practitioner direct.

Used for: 131,246 review runs, 48,095 merge requests, 5,169 repositories, median review duration, P99, cost, specialized reviewers, coordinator, break-glass rate.

Spotify Honk Part 1.

Source: Spotify Engineering, "1,500+ PRs Later: Spotify's Journey with Our Background Coding Agent", November 6, 2025.

URL: https://engineering.atspotify.com/2025/11/spotifys-background-coding-agent-part-1

Type: practitioner direct.

Used for: 1,500+ merged production PRs, 60 to 90 percent migration time savings, hundreds of developers, Fleet Management extension, natural-language fleet changes.

Spotify Honk Part 2.

Source: Spotify Engineering, "Background Coding Agents: Context Engineering", November 20, 2025.

URL: https://engineering.atspotify.com/2025/11/context-engineering-background-coding-agents-part-2

Type: practitioner direct.

Used for: task setup, examples, desired end states, limited tools, version-controlled prompts, context engineering as operating discipline.

Spotify Honk Part 3.

Source: Spotify Engineering, "Background Coding Agents: Predictable Results Through Strong Feedback Loops", December 9, 2025.

URL: https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3

Type: practitioner direct.

Used for: deterministic verifiers, sandbox, stop hooks, LLM judge vetoing about one quarter of sessions, recovery from about half of vetoes.

Spotify Honk Part 4.

Source: Spotify Engineering, "Background Coding Agents: Supercharging Downstream Consumer Dataset Migrations", April 22, 2026.

URL: https://engineering.atspotify.com/2026/4/background-coding-agents-dataset-migrations-honk-part-4

Type: practitioner direct.

Used for: 1,800 downstream pipelines, several thousand indirect impacts, 10 engineering weeks estimated manual effort, 240 automated migration PRs, standardization and testability lesson.

LinkedIn CAPT.

Source: LinkedIn Engineering, "Contextual agent playbooks and tools: How LinkedIn gave AI coding agents organizational context", January 27, 2026.

URL: https://www.linkedin.com/blog/engineering/ai/contextual-agent-playbooks-and-tools-how-linkedin-gave-ai-coding-agents-organizational-context

Type: practitioner direct.

Used for: CAPT, MCP tools, executable playbooks, 1,000+ engineers, 500+ playbooks, about 70 percent faster issue triage, roughly 3x faster common data-analysis workflows.

LinkedIn QCon framing.

Source: QCon AI Boston 2026, "Context Engineering at LinkedIn: How We Built an Organizational Context Layer for AI Agents with MCP".

URL: https://boston.qcon.ai/presentation/boston2026/context-engineering-linkedin-how-we-built-organizational-context-layer-ai

Type: conference program / practitioner talk listing.

Used for: organizational context layer language, meta-tools plus skills framing, multi-role extension beyond engineers.

OpenAI harness engineering.

Source: OpenAI, "Harness engineering: leveraging Codex in an agent-first world", February 11, 2026.

URL: https://openai.com/index/harness-engineering/

Type: practitioner direct.

Used for: harness engineering, roughly 1 million lines, roughly 1,500 PRs, no manually written code, human role as environment design, intent specification, feedback loops, repo knowledge as system of record, agent legibility.

Apollo measurement playbook.

Source: Apollo.io Engineering, "How We Measured AI Tooling Productivity Gain Across 250+ Engineers at Apollo.io", January 16, 2026.

URL: https://www.apollo.io/tech-blog/how-we-measured-ai-tooling-productivity-gain-across-250-engineers-at-apolloio

Type: practitioner direct.

Used for: 250+ engineers, 92 percent weekly Cursor usage, about 15 percent organization-level productivity gain, flat cycle time, frontend super users at 3 to 4 times PR velocity, squad champions and manager alignment.

Every compound engineering.

Source: Every, "Compound Engineering Camp: Every Step, From Scratch", March 13, 2026, updated April 7, 2026.

URL: https://every.to/source-code/compound-engineering-camp-every-step-from-scratch

Type: practitioner-interview write-up.

Used for: plan/work/review/compound loop, lessons stored as future context, plugin adoption signal.

Ramp product-shaping skill.

Source: Peter Yang, "Inside Ramp, the $32B Company Where AI Agents Run Everything", March 15, 2026.

URL: https://creatoreconomy.so/p/inside-ramp-the-32b-company-ai-agents-geoff-charles

Type: practitioner-interview write-up.

Used for: Claude Code PM skill, competitor research, Gong calls, Zendesk tickets, codebase research, product-shaping spec.

AGENTS.md standardization.

Source: Linux Foundation / Agentic AI Foundation, "Linux Foundation Announces the Formation of the Agentic AI Foundation", December 9, 2025.

URL: https://aaif.io/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation-aaif-anchored-by-new-project-contributions-including-model-context-protocol-mcp-goose-and-agents-md/

Type: standards body / ecosystem announcement.

Used for: AGENTS.md becoming an AAIF project, 60,000+ open-source project adoptions, support across agent tools.

Context engineering academic paper.

Source: Mohsenimofidi et al., "Context Engineering for AI Agents in Open-Source Software", revised February 5, 2026.

URL: https://arxiv.org/abs/2510.21413

Type: academic / research.

Used for: 466 open-source projects, AGENTS.md emerging as standard, structure still unsettled.

Agent Skills academic paper.

Source: Ling et al., "Agent Skills: A Data-Driven Analysis of Claude Skills for Extending Large Language Model Functionality", February 8, 2026.

URL: https://arxiv.org/abs/2602.08004

Type: academic / research.

Used for: 40,285 skills analyzed, skills as reusable procedural modules, software engineering dominance, redundancy and safety risks.

Zencoder operating case.

Source: Andrew Filev, "When AI turns software development inside-out: 170% throughput at 80% headcount", VentureBeat, March 28, 2026.

URL: https://venturebeat.com/orchestration/when-ai-turns-software-development-inside-out-170-throughput-at-80-headcount/

Type: practitioner direct via domain trade publication.

Used for: 170 percent throughput, 80 percent headcount, QA role shift, humans define intent and validate outcomes. Caveated because Zencoder is an AI coding vendor.

