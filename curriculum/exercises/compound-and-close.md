# Compound and *close the loop*

**Time:** 30 minutes.

**What you do:** let Claude review the whole session and write your `./CLAUDE.local.md` from session evidence. Wire one MCP connector. Close the bug's ticket outside the repo.

**What you build:** three things that close the first compound loop outside the repo: a rules file written from session evidence, a live connector into your tracker, and a close-out note that lands where your team reads it.

**The point:** the compound step (plan → work → review → compound, Kieran Klaassen's loop) doesn't interview you with three retro questions. The session is the evidence; Claude reviews it and writes. You push back where it misread.

The PR shipped. Now compound the session, then close the bug's ticket. That's the first move outside the repo.

## Write your rules file from the session

- The session is the evidence. Claude reviews the whole scrollback in one shot and drafts your rules from how you actually worked. No three-question retro; the compound step reads what happened and writes.
- You are not drafting from a blank page. The agent reads the session for you. Your job is to push back where it misreads.

> **Long session, long read.** Claude reviews the whole scrollback in one shot. If the review stalls or runs past a couple of minutes, interrupt with `Esc`, narrow to the orient and introspect phases first, and say `continue`.

{{prompt:compound-and-close-1}}


## Push back where the summary misreads

- Quote the moment back at Claude. Read Claude's summary. Push back where it misreads. Quote the specific session moment back at Claude. That push-back is the reflection move.
- The rules file is yours now. Born from the session, extended by every module after this one.
- The `.gitignore` edit is your call. If `CLAUDE.local.md` wasn't already ignored, the compound step added it to your `.gitignore`. That is an uncommitted change now. What you do with it is your call.

## Reach past the repo with a connector

- Your agent's reach stops at the repo. Real engineering work spans tickets, pull requests, CI, chat, documentation: the system around the code. **MCP** is the protocol Claude Code uses to connect to that system. Three words land together: **connector** (the wire into a work app), **action** (a verb with effect in the world), **tool** (the umbrella for anything the model can call). Full primer in [MCP and connectors](../trainings/agentic-engineering-101/reference/mcp-and-connectors.md).
- One connector, two actions (read + update), closes the loop you just ran on the bug, in the tracker your team actually lives in.

## Wire one connector into your tracker

- Pick the cleanest path for your tracker. Three work:
 1. **GitHub Issues:** check `gh auth status` in your session. Claude runs `gh` for you via Bash, no MCP install needed.
 2. **MCP connector to your tracker** (Linear, Jira, other): follow the install line in [MCP and connectors](../trainings/agentic-engineering-101/reference/mcp-and-connectors.md) for your tracker. If tenant admin approval is required, it's worth asking, not today.
 3. **Manual paste:** Claude writes the close-out; you paste it into the tracker UI yourself. Five seconds, no tool setup.
- The teaching moment is the agent reaching across a tool boundary with a real engineering note, not the install choreography. For paths 1 or 2, get your connector up and running.

> **Connector added after this session started?** Check MCP status and authenticate with `/mcp`. If the new connector still isn't there, exit the session and resume it with `claude --resume <session-id>`.

> **Quick timebox note.** Second connectors and deeper MCP debugging may regress to install yak-shaving. One connector firing on one ticket is the proof the loop closes outside the repo. The rest is homework.

## Send the close-out note to the ticket

Ask Claude to read the ticket for your bug and report what's on it. Paste a ticket ID, a URL, or "create me a new one" if there isn't one.

{{cut:compound-and-close-2|project-admin}}


Claude reads the ticket (or confirms there isn't one). Then ask Claude to write the close-out (root cause, how you fixed it, a link to the PR), update the ticket, and report what it wrote.

{{cut:compound-and-close-3|project-admin}}


## Read the close-out and ship it

- Read the close-out; push back if it's stiff or wrong. Tell Claude how your team actually writes ticket comments. It'll adjust.
- Ship the update (or paste it into the tracker yourself on path 3, manual paste). The bug fix is now visible where it should be: in the tracker your team reads, not only in the repo.

## Sweep the session into your rules file one more time

- One more pass before close. Anything earned since the first compound pass at the top of this exercise (the ticket close-out, the push-backs, the connector path you picked) that didn't land yet?

Ask Claude to sweep the session for anything earned since the first compound and integrate.

{{prompt:compound-and-close-4}}

## Close the session, the loop is closed

**What happened:** Your rules file was born from how you actually worked, not from a template. The first move outside the repo happened on a real job: the ticket for the bug you just shipped. Claude reviewed the session, you pushed back where it misread, and the close-out landed in the tracker where your team reads it.

The loop ran. The PR is open, the rules file was born from session evidence, the ticket is updated where your team reads it. Setup in place.

You can close this session now. `./CLAUDE.local.md` stays behind; whether it earns its keep shows up the next time a session reads it.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** Handles kept bold: the naming moments **MCP** / **connector** / **action** / **tool** (one handle per named term) and the three tracker-path menu items (**GitHub Issues** / **MCP connector to your tracker** / **Manual paste**); all other bullet leads de-bolded. Widget chrome (`**Time:**`, `**What you do:**`, `**What you build:**`, `**The point:**`, `**What happened:**`) and blockquote callouts untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

**Quality:** compendium-audited 2026-07-08 (writing@3605eee story@88a1dd4 technical@88a1dd4 behavior@88a1dd4 pedagogy@3605eee slides@47f3357)
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy grandfathered, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Apply (wire the connector, close the ticket) + Analyze (read the retro summary against session moments).
- **Time:** 30 min inside M1's 2h slot. Third of three exercises on the same bug / same repo.

**Themes planted** (content-strategy § "Recurring themes"):
- **Theme 2 (compounding builds the system)** — the retro extends `./CLAUDE.local.md` from session evidence. Klaassen attribution earned here (Claude cites the practitioner if one fits).
- **Theme 4 (self-aware, grain of salt)** — the retro's 3–5 line summary is Claude's account; the student verifies against the file.

**Frameworks riffed on:**
- **Compound engineering** — Kieran Klaassen (Every Inc.). Plan → Work → Review → Compound. Convergence Level 3. Source: `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md`. URL: `every.to/source-code/compound-engineering-the-definitive-guide` `[practitioner direct]`. Attributed inside Claude's retro summary, not in a lecture.
- **Three-block memory** — Paweł Huryn (productcompass.pm). Level 2 single-experiment. Source: `continuous-research/insights.md` lines 1051–1065. URL: `productcompass.pm/p/claude-md-snippets` `[practitioner direct]`. Materials seeded across the three M1 exercises; the three-block *frame* earns its name in M4 when the materials get rearranged.

**Watch-fors:**
- **Retro confabulation.** Claude's 3–5 line summary name-drops moments without quoting. Trainer push: *"quote the specific session moment that made you add rule X. If you can't, take it out."*
- **MCP install gate.** Corporate tenant blocks connector install. Tenant-admin fallback named per tracker in `reference/mcp-and-connectors.md`. Do not treat as blocker — fallback path always exists.

**Decision points:**
- **Sponsor stated a tracker the cohort's Claude Code can't connect to.** Fall back to create-a-markdown-ticket in the repo; close-out converts to *"write a ticket into `docs/tickets/` and link the PR."* Sponsor gets a signal.

**Plug points:**
- Sponsor-stated tracker (Linear / Jira / GitHub Issues / other).
- Push-back moves at retro and MCP gate (trainer delivers).

**Arc:**
- Picks up from: `fix-tests-first` — the rule seeded at that exercise is the file the retro rewrites.
- Hands off to: M1 Bridge → M2 (plan mode at depth on multi-file work).

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the engineer exhibits on their own codebase by the next working day):
1. **Compounds one rule from session evidence into `./CLAUDE.local.md`** after a non-trivial session, integrating rather than appending. Falsifiable: file mtime + content shows a session-derived rule added since the prior version, with the rule quoting a specific session moment that earned it.
2. **Closes a bug ticket via connector or `gh` from the agent**, not manually via the tracker UI, at least once. Falsifiable: ticket comment authored by Claude / `gh` API appears in the tracker history.
3. **Quotes the specific session moment that earned a rule** when reviewing Claude's compound summary, instead of rubber-stamping. Falsifiable: scrollback shows a *"quote the moment"* or *"which session beat earned this"* turn before the rule lands.

**Per-phase failure mode + escape hatch** (per `check_pedagogy.md` rule 47 — every phase shipping a forcing function names its dominant failure and one recovery move):

| Phase forcing function | Dominant failure mode | Escape hatch |
|---|---|---|
| Compound — *"Claude reviews the whole session, writes from evidence, you push back"* | Retro confabulation — Claude name-drops moments without quoting | Trainer push: *"quote the specific session moment that made you add rule X. If you can't, take it out."* |
| Compound — *"integrate, don't append"* | Self-charity on rule self-review — Claude under-flags weak rules in its own summary | Body callout below the prompt names the push-back; if the student rubber-stamps, push: *"read each rule aloud — does it quote a specific moment, or just summarize a theme?"* |
| MCP — *"close the ticket via the agent, not the tracker UI"* | MCP install gate — corporate tenant blocks connector install | Tenant-admin fallback per tracker; path 3 (manual paste of Claude-written close-out) is always available |
| MCP — *"one connector, two actions (read + update)"* | Connector install exceeds timebox — second-connector debugging eats the slot | Timebox callout in body names this; trainer calls path 3 if install bleeds past the budget |
| Close-out — *"write the close-out then push back if stiff"* | Close-out rubber-stamp — student ships the agent's first draft without reading | Trainer push: *"read the close-out aloud — does it sound like how your team writes ticket comments?"* |

**Accept-with-mitigation** (per `check_pedagogy.md` §50 and §51 — judge findings carried as design-intent, not blockers):

- **§32 forced-engagement on compound-and-close-1 prompt:** the prompt offers structured output (rules file rewrite) for student acceptance, and §32 wants the engagement step inside the fence. Mitigation: body prose immediately below the prompt (*"Read Claude's summary. Push back where it misreads. Quote the moment from your session back at Claude."*) IS the engagement step. Convenience-bias callout (§50) covers the self-charity risk — keeping the engagement in body keeps the prompt copy-paste-clean.
- **§50 convenience-bias callout on self-review:** the compound prompt asks Claude to review its own session and propose rules. Self-charity bias is real. Mitigation: same body callout names the push-back move with the *"quote the moment"* harsher alternative. Fence stays convenient; body carries the design accept.
