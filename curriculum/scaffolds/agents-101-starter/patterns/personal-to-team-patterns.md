# Personal-to-Team Agent Patterns

A design-language catalog. Four top-level strategies, with context-specific patterns underneath each. Pick one to three. Stack where the outcome calls for it.

Some patterns ship with a full field example; others carry `[TODO]` fields — that's your prompt to invent the example against your own situation. The scaffold (name, context, forces, solution, traps, people plan) is always there.

## The four canonical strategies

Every sharing pattern is a variant of one of these four:

1. **Share the context** — teammates build their own agents on your `memory/`, `sources/`, `CLAUDE.md`, `style.md`. They run their own agents against your context.
2. **Share a skill** — extract a scoped capability; teammates plug it into their agents.
3. **Share the output (push)** — deploy on a schedule; output lands where the team sees it.
4. **Share an interface (pull)** — wrap the agent; teammates invoke on demand (Slack bot, web form, HTTP endpoint).

"Share the whole agent" is NOT on the list. It's the vendor pitch. Practitioners share at one of these four layers.

## Pattern format

Every pattern follows the same shape:

- **Name** — short, memorable
- **Context** — when this applies (your situation)
- **Forces** — the tensions the pattern resolves
- **Solution** — the shape of the answer
- **Traps** — the failure modes
- **People-plan implications** — governance, ownership, trust
- **Example** — a real one (or `[TODO]` — invent for your situation)
- **Related patterns** — what this sits next to

---

## Share the context — patterns

### Pattern 1.1: MCP-Native Access (Salesforce / Hubspot / similar SaaS)

- **Context:** Your team uses a SaaS system of record (Salesforce, Hubspot, Zendesk, Jira) with a live API and a maintained MCP server.
- **Forces:** You want teammates' agents to read live data, not yesterday's snapshot. Data changes fast. Access is already governed by the SaaS. Caching creates drift, staleness, and duplicate-source-of-truth problems.
- **Solution:** Don't cache. Don't export. Each teammate's agent reads live via MCP, using their own credentials. Your "shared context" is the MCP config plus a few `CLAUDE.md` / README files describing your team's conventions (how you name accounts, which stages are real, which custom fields matter). Data stays fresh; governance lives where it already lived.
- **Traps:** Rate limits if agents hit the API too often. Permissions surprises — each teammate sees only what their SaaS role lets them see. Confidentiality — don't paste live data into chat threads; keep it in the agent's session.
- **People plan:** Team lead owns the MCP config and the conventions doc. Each agent user is responsible for their own credentials. Rate-limit mishaps get noticed by the SaaS admin — build a channel for the pings.
- **Example:** `[TODO — invent for your situation]`
- **Related:** 1.2 (Shared-File Context), 3.2 (Scheduled Export Push).

### Pattern 1.2: Shared-File Context (SharePoint / OneDrive / Google Drive)

- **Context:** Your context lives in files — slide decks, policy PDFs, meeting notes — in a team-shared drive.
- **Forces:** Files are already governed (IT owns the drive, permissions exist). But sync daemons are flaky, conflict copies break agents, and formats vary.
- **Solution:** Point each teammate's agent at a read-only mount or a synced local copy of the shared folder. The agent has a fixed `sources/` path that maps to the drive. Governance stays with the drive; the agent is a reader.
- **Traps:** Sync lag creates out-of-date context. Large binary files (decks) may not parse — convert to markdown or text at ingestion time, not at read time. Conflict copies on concurrent edits.
- **People plan:** Drive owner remains IT/team lead. Agent consumers responsible for their own sync health. Set a weekly re-index cadence if the source set changes fast.
- **Example:** `[TODO]`
- **Related:** 1.1 (MCP-Native), 1.3 (Git-Backed).

### Pattern 1.3: Git-Backed Context (developer-adjacent teams)

- **Context:** Your team is comfortable with Git; often data/science/product/eng-adjacent business roles.
- **Forces:** Versioning matters. Audit trail matters. The team already uses PRs as the review mechanism.
- **Solution:** Put `memory/`, `sources/`, and conventions in a repo. Teammates clone, pull, open in their own Claude Code. Updates go through PRs. History is free.
- **Traps:** Non-technical teammates will bounce off Git. Large binaries bloat the repo. Secrets leak fast — strip before commit.
- **People plan:** Repo owner controls merges. Reviewers enforce the "distinctive not descriptive" rule on new memory pages. Onboarding doc required — it's a higher floor than 1.2.
- **Example:** `[TODO]`
- **Related:** 1.2, 2.1.

---

## Share a skill — patterns

### Pattern 2.1: Named Workflow Skill (crux, pre-mortem, etc.)

- **Context:** You've developed a repeatable thinking discipline that produces a reliable output shape (e.g., applying Rumelt's crux diagnosis to any strategic question).
- **Forces:** The workflow is about HOW to think, not WHAT to know. Teammates have their own data but want the same discipline.
- **Solution:** Package the workflow as a skill file — instructions, scoring criteria, format contract. Ship it. Teammates install it, run it against their own inputs. Skill carries the judgment; data stays theirs.
- **Traps:** Skills too tied to the author's examples don't generalize. Versioning — when you update, how do teammates get the update?
- **People plan:** Skill author is maintainer. Pull requests on the skill file. Teammates pin version if stability matters more than freshness.
- **Example:** A teammate packages a recurring crux-diagnosis workflow as a skill after proving it on their own work.
- **Related:** 2.2 (Verification Method Skill).

### Pattern 2.2: Verification Method Skill (judge-as-skill)

- **Context:** You've built an LLM-as-judge that catches a specific class of error (hallucination, compliance violation, tone drift).
- **Forces:** The judge works on your outputs because you wrote it for them. Can it work on teammates' outputs?
- **Solution:** Ship the judge file plus the test cases it was validated against plus a short onboarding doc for tuning it to a new domain.
- **Traps:** The judge's thresholds were tuned for your content; other domains need recalibration before trust. Don't ship without test cases — teammates can't re-validate without them.
- **People plan:** Original author consults on tuning. Each consumer team owns their tuned variant.
- **Example:** `[TODO]`
- **Related:** 2.1.

---

## Share the output (push) — patterns

### Pattern 3.1: Scheduled Report to Channel

- **Context:** Your agent produces an output the team needs regularly (daily dashboard, weekly summary, morning prep).
- **Forces:** Pull doesn't work — teammates forget to invoke. Push works if it lands where they look.
- **Solution:** Scheduled agent (cron / remote trigger / Cowork equivalent) produces the output on a cadence; ships to a Slack/Teams channel the team already reads, or a shared doc they open each morning.
- **Traps:** Drift — the scheduled agent goes wrong and nobody notices for a month. Instrument the output with a last-modified line, a confidence note, or a "flag if anomalous."
- **People plan:** Owner pair — one person watches the agent, one watches the consumers. When the team stops reading, that's a signal, not a failure.
- **Example:** `[TODO]`
- **Related:** 3.2, 4.1.

### Pattern 3.2: Event-Triggered Push (alerts, monitors)

- **Context:** The agent watches a source and pings when something happens — not on a schedule, on a condition.
- **Forces:** False alerts train people to ignore the channel. Missed alerts defeat the purpose.
- **Solution:** Define the trigger condition precisely. Start with a high-threshold version that fires rarely; loosen only after the team trusts it.
- **Traps:** Threshold creep. Alert fatigue. Downstream action unclear — alerts without a named owner-of-response rot fast.
- **People plan:** Named responder on each alert. Escalation path if responder is out. Silence = someone is handling it, not "nobody noticed."
- **Example:** `[TODO]`
- **Related:** 3.1.

---

## Share an interface (pull) — patterns

### Pattern 4.1: Team Chat Bot (Slack / Teams)

- **Context:** Your team lives in Slack or Teams; people want to invoke the agent without switching surfaces.
- **Forces:** Teammates don't want to install anything. Invocations should feel like talking to a colleague.
- **Solution:** Wrap the agent in a bot (Slack app / Teams @mention). Invocation is natural language. Bot owns auth plus rate limiting. Agent runs server-side or on a shared runtime.
- **Traps:** Latency — if the agent takes 30 seconds, people assume it's broken. Formatting — Slack/Teams markdown is limited. Threading — long responses clutter channels.
- **People plan:** Bot owner responsible for uptime and upgrades. A named "first-response" person for "the bot is acting weird" pings.
- **Example:** `[TODO]`
- **Related:** 4.2.

### Pattern 4.2: Web Form / HTTP Endpoint

- **Context:** The invocation is structured enough to fit a form, or another system needs to call yours programmatically.
- **Forces:** Structure beats freeform when inputs are predictable. Auth matters the moment it's a URL.
- **Solution:** Thin form or endpoint in front of the agent. Inputs typed. Output rendered where the caller expects it.
- **Traps:** Form scope creep. Unauthenticated endpoints get abused. Rate limits missing until they're suddenly needed.
- **People plan:** Owner of the endpoint also owns its auth story. Sunset plan if usage drops.
- **Example:** `[TODO]`
- **Related:** 4.1.

---

## Situation → Pattern routing

A quick lookup to help you find your starting point. Stack freely.

| Situation | Likely pattern |
|---|---|
| "We use Salesforce / Hubspot / Jira with live data" | 1.1 MCP-Native |
| "Our context is mostly files in SharePoint/OneDrive" | 1.2 Shared-File |
| "The team is Git-comfortable" | 1.3 Git-Backed |
| "The workflow I built is a thinking discipline, not a data play" | 2.1 Named Workflow Skill |
| "I built a judge that catches errors specific to our domain" | 2.2 Verification Method Skill |
| "The team needs this every morning" | 3.1 Scheduled Report |
| "An alert, not a report" | 3.2 Event-Triggered Push |
| "The team lives in Slack" | 4.1 Team Chat Bot |
| "Another system will call mine" | 4.2 Web Form / HTTP |
| "We have nothing but personal Claudes" | 1.2 + 2.x combo — share context as files, ship skills alongside |

---

## How to use this during the exercise

You are not picking infrastructure. You are picking what moves the teammate's outcome metric.

- Read the four top-level strategies.
- Scan the pattern names under each.
- Pick one to three whose **mechanism** moves your outcome — not whose tech stack matches yours.
- Where a pattern's Example says `[TODO]`, write your own against your situation. The scaffold (context, forces, solution, traps, people plan) is there.
- Stack where the outcome calls for it. Context + skill is a common combo; scheduled-push backed by shared-file context is another.

A candidate picked because it fits the infrastructure is shopping. A candidate picked because it moves the outcome is design.
