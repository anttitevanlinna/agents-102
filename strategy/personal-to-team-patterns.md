# Personal-to-Team Agent Patterns

**Status:** DRAFT / WIP (2026-04-20). Scaffold is mine; the authoritative patterns need Antti's practitioner detail. Examples below are dummies to show the shape — replace with real.

**Purpose — three uses at once:**
1. **Article** — "Design Patterns for Personal-to-Team Agents." Fills a real gap; builder-credibility content.
2. **Skill** — `share-pattern` skill that takes a student's situation and matches to the right pattern(s).
3. **Curriculum material for M7** — pattern catalog students match against their own org's situation, producing a sharing plan.

## Taxonomy — the four canonical strategies

Every sharing pattern is a variant of one of four. This is the top-level taxonomy; the rest of the document is context-specific patterns underneath each.

1. **Share the context** — teammates build their own agents on your memory/, sources/, CLAUDE.md, style.md. They run their own agents against your context.
2. **Share a skill** — extract a scoped capability; teammates plug it into their agents.
3. **Share the output (push)** — deploy on a schedule; output lands where the team sees it.
4. **Share an interface (pull)** — wrap the agent; teammates invoke on demand (Slack bot, web form, HTTP endpoint).

"Share the whole agent" is NOT on the list. It's the vendor pitch. Practitioners share at one of these four layers.

## Pattern format

Every pattern follows the same shape — design-patterns style:

- **Name** — short, memorable
- **Also known as** — synonyms from the field
- **Context** — when this applies (the buyer's situation)
- **Forces** — the tensions the pattern resolves
- **Solution** — the shape of the answer
- **Traps** — the failure modes
- **People-plan implications** — governance, ownership, trust
- **Example** — a real one, named
- **Related patterns** — what this sits next to

---

## Share the context — patterns

### Pattern 1.1: MCP-Native Access (Salesforce / Hubspot / similar SaaS)

- **Context:** Your team uses a SaaS system of record (Salesforce, Hubspot, Zendesk, Jira) with a live API and a maintained MCP server.
- **Forces:** You want teammates' agents to read the real live data, not your yesterday's snapshot. Data changes fast. Access is already governed by the SaaS. Caching creates drift, staleness, and duplicate-source-of-truth problems.
- **Solution:** Don't cache. Don't export. Each teammate's agent reads live via MCP, using their own credentials. Your "shared context" is the MCP config + a few README/CLAUDE.md files describing your team's conventions (how you name accounts, which stages are real, which custom fields matter). The data is always fresh, and governance lives where it already lived (the SaaS platform).
- **Traps:** Performance — if agents hit the API too often, you hit rate limits. Permissions — each teammate sees only what their SaaS role lets them see; surprises are frequent. Confidentiality — don't paste live data into chat threads; keep it in the agent's session.
- **People plan:** Your team lead owns the MCP config and the conventions doc. Each agent user is responsible for their own credentials. Rate-limit mishaps are noticed by the SaaS admin — build a Slack channel for the pings.
- **Example:** [TODO — Antti fills with real]
- **Related:** Pattern 1.2 (Shared-File Context), Pattern 3.2 (Scheduled Export Push).

### Pattern 1.2: Shared-File Context (SharePoint / OneDrive / Google Drive)

- **Context:** Your context lives in files — slide decks, policy PDFs, meeting notes — in a team-shared drive.
- **Forces:** The files are already governed (IT owns the drive, permissions exist). But sync daemons are flaky, conflict copies break agents, and file formats vary.
- **Solution:** Point each teammate's agent at a read-only mount or a synced local copy of the shared drive folder. The agent has a fixed "sources/" path that maps to the shared drive. Governance stays with the drive; the agent is just a reader.
- **Traps:** Sync lag creates out-of-date context. Large binary files (decks) may not be parseable — convert to markdown or text at ingestion time, not at read time. Conflict copies on concurrent edits.
- **People plan:** [TODO]
- **Example:** [TODO]
- **Related:** Pattern 1.1 (MCP-Native), Pattern 1.3 (Git-Backed Context).

### Pattern 1.3: Git-Backed Context (developer-adjacent teams)

- **Context:** [TODO — when the team is comfortable with Git; often data/science/product/eng-adjacent business roles.]
- [TODO]

### Pattern 1.4: [more patterns as Antti identifies them — confidential-data variant, dynamic-data-only variant, etc.]

---

## Share a skill — patterns

### Pattern 2.1: Named Workflow Skill (crux, pre-mortem, etc.)

- **Context:** You've developed a repeatable thinking discipline or workflow that produces a reliable output shape (e.g., applying Rumelt's crux diagnosis to any strategic question).
- **Forces:** The workflow is about HOW to think, not WHAT to know. Teammates have their own data/context but want the same discipline.
- **Solution:** Package the workflow as a skill file — instructions + scoring criteria + format contract. Ship it. Teammates install it, run it against their own inputs. The skill carries the judgment; the data stays theirs.
- **Traps:** Skills that are too tied to the author's examples don't generalize. Versioning — when you update the skill, how do teammates get the update?
- **People plan:** [TODO]
- **Example:** Module 8's `crux`, `assumption-test`, `pre-mortem` skills. [TODO — field use example]
- **Related:** Pattern 2.2 (Verification Method Skill).

### Pattern 2.2: Verification Method Skill (judge-as-skill)

- **Context:** You've built an LLM-as-judge that catches a specific class of error in outputs (hallucination, compliance violation, tone drift).
- **Forces:** The judge works on your outputs because you wrote it for them. Can it work on teammates' outputs?
- **Solution:** [TODO — probably: ship the judge + the test cases it was validated against + an onboarding doc for tuning it to a new domain.]
- **Traps:** [TODO]
- **Example:** [TODO]
- **Related:** Pattern 2.1.

### Pattern 2.3: [more — data-transform skill, summary-shape skill, etc.]

---

## Share the output (push) — patterns

### Pattern 3.1: Scheduled Report to Channel

- **Context:** Your agent produces an output that the team needs regularly (daily dashboard, weekly summary, morning prep).
- **Forces:** Pull doesn't work — teammates forget to invoke. Push works if it lands where they look.
- **Solution:** Scheduled agent (cron / remote trigger / Cowork equivalent) produces the output on a cadence; ships to a Slack/Teams channel the team already reads, or a shared doc they open each morning.
- **Traps:** Drift — the scheduled agent goes wrong and nobody notices for a month. Instrument the output itself with a last-modified line, a confidence note, or a "flag if anomalous."
- **People plan:** Owner pair — one person watches the agent, one watches the consumers. When the team stops reading, that's a signal, not a failure.
- **Example:** [TODO]
- **Related:** Pattern 3.2, Pattern 4.1.

### Pattern 3.2: Event-Triggered Push (alerts, monitors)

- **Context:** [TODO — agent watches a source and pings when something happens.]
- [TODO]

---

## Share an interface (pull) — patterns

### Pattern 4.1: Team Chat Bot (Slack / Teams)

- **Context:** Your team lives in Slack or Teams; people want to invoke the agent without switching surfaces.
- **Forces:** Teammates don't want to install anything. Agent invocations should feel like talking to a colleague.
- **Solution:** Wrap the agent in a bot (Slack app / Teams @mention). Invocation is natural language. Bot owns the auth + rate limiting. Agent runs server-side or on a shared runtime.
- **Traps:** Latency — if the agent takes 30 seconds, people assume it's broken. Response formatting — Slack/Teams markdown is limited. Threading — long responses clutter channels.
- **People plan:** [TODO]
- **Example:** [TODO]
- **Related:** Pattern 4.2.

### Pattern 4.2: [web form / HTTP endpoint / etc.]

---

## Situation → Pattern routing (draft table)

A quick lookup to help buyers find their pattern. Dummy entries; refine.

| Situation | Likely pattern |
|---|---|
| "We use Salesforce / Hubspot / Jira with live data" | 1.1 MCP-Native |
| "Our context is mostly files in SharePoint/OneDrive" | 1.2 Shared-File |
| "The workflow I built is a thinking discipline, not a data play" | 2.1 Named Workflow Skill |
| "I built a judge that catches errors specific to our domain" | 2.2 Verification Method Skill |
| "The team needs this every morning" | 3.1 Scheduled Report |
| "The team lives in Slack" | 4.1 Team Chat Bot |
| "We have N8N / Zapier / Cowork" | [TODO — maps to multiple, typically 3.x or 4.x] |
| "We have nothing but personal Claudes" | 1.2 + 2.x combo — share context as files, ship skills alongside |

---

## Open work

- Fill each `[TODO]` with a real example from Antti's practice or Agentics Helsinki community.
- Decide pattern ID format (1.1 / 1.2 vs. named slugs — for skill invocation `share-pattern:mcp-native` might read better).
- Resolve overlap: some situations legitimately map to multiple patterns (combining share-context + share-skill is common). Do we name the combo pattern, or instruct students to stack?
- **As skill:** the `share-pattern` skill takes the student's situation description + agent artifacts, returns a shortlist of matching patterns with customized people-plan questions.
- **As article:** "Design Patterns for Personal-to-Team Agents" — goes in the article pipeline. Position: practitioner-grade taxonomy nobody else has written because nobody else has scaled enough personal agents to team level to see the pattern.
- **As M7 material:** the catalog becomes a reference the student consults during the M7 exercise; they pick 1–3 patterns, apply them to their situation, produce the technical + people plan.

<!-- maintainer -->

Antti-to-fill list:
- Real example for 1.1 (Salesforce/Hubspot MCP in practice)
- Real example for 1.2 (SharePoint/OneDrive shared-file context — probably F-Secure or Neste material, scrubbed)
- Real example for 2.1 (crux skill deployment — has he seen it used by trainees?)
- Real example for 3.1 (scheduled report — his own research OODA output is one)
- Real example for 4.1 (Slack bot — Agentics Helsinki community has examples)
- Missing patterns to add: confidential-data-variant, dynamic-data-only, git-backed context, event-triggered push, web form, HTTP endpoint, stacking patterns (context+skill common combo)
