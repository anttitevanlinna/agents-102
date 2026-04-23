# Compound and close

**What you do:** let Claude review the whole session and write your `./CLAUDE.local.md` from session evidence. Wire one MCP connector. Close the bug's ticket outside the repo.

**What happens:** your rules file is born from how you actually worked, not from a template. The first move outside the repo happens on a real job: the ticket for the bug you just shipped.

**The point:** the compound step doesn't interview you with three retro questions. The session is the evidence; Claude reviews it and writes. You push back where it misread. Then the loop closes where the team actually reads it: the tracker.

**Time:** 30 minutes.

The PR shipped. The move is warm. Now compound it, then make the first move outside the repo.

## Compound (~10 min)

**Prompt** *(copy → Claude Code)*

```
Review this session end-to-end: the orientation and introspection, the /context read, the TDD bug fix, the diff push-back. Write ./CLAUDE.local.md at the root of this repo (create it if it doesn't exist; add it to .gitignore if it's not already; if the file already exists, integrate, don't append). This is my personal gitignored rules file, not the team ./CLAUDE.md. Add rules that came from how we actually worked, not rules that sound good. Name the shape of the loop we ran and cite the practitioner who wrote it up if one fits.

If any rule is team-worthy (one every engineer on this codebase should know) flag it in the summary below, don't PR it. I'll decide whether to open a separate PR against team ./CLAUDE.md.

Tell me in 3–5 lines: what you wrote and why, grounded in specific session moments. I shouldn't need to open the file to know.
```

*(end of prompt)*

Read Claude's summary. Push back where it misreads. Quote the moment. That push-back is the reflection move. The rules file is yours, born from the session, extended by every module after this one.

## MCP — why your agent needs to reach outside the repo (~5 min)

Up to this point, your agent's reach stops at the repo. Real engineering work spans tickets, pull requests, CI, chat, documentation: the system around the code. **MCP** is the protocol Claude Code uses to connect to that system. Three words that land together: **connector** (the wire into a work app), **action** (a verb with effect in the world), **tool** (the umbrella for anything the model can call). Full primer in [MCP and connectors](../reference/mcp-and-connectors.md).

One connector, two actions (read + update), is enough to close the loop you just ran on the bug in the tracker your team actually lives in.

## Close the ticket (~15 min)

Wire one connector to your ticket tracker, read the ticket matching the bug you just fixed, update it with a close-out note and the PR link. Your sponsor named the tracker (Linear, Jira, GitHub Issues, or similar) in the pre-engagement contract. Use that one.

**Two-minute setup.** If your tracker is GitHub Issues: in Claude Code, check `gh auth status`. Claude runs `gh` for you via Bash, no MCP install needed. For Linear or Jira: follow the install line in [MCP and connectors](../reference/mcp-and-connectors.md) for your tracker. That reference stays current with Claude Code's install surface; this exercise doesn't carry the command itself so it can't go stale.

Once the connector (or `gh`) is live:

**Prompt** *(copy → Claude Code)*

```
Read the ticket for the bug we just fixed. Tell me what it says: the reporter, the description, any comments on it. If you can't find a matching ticket, search by the bug's keywords; if there still isn't one, say so and we'll create one.
```

*(end of prompt)*

Claude reads the ticket (or confirms there isn't one). Then:

**Prompt** *(copy → Claude Code)*

```
Update the ticket: short close-out note naming what the root cause was and how we fixed it, link to the PR you opened earlier. If we needed to create the ticket just now, create it first, then update. Show me what you'll write before you post it.
```

*(end of prompt)*

Read the close-out. If Claude wrote something stiff or wrong, push back. Tell it how your team actually writes ticket comments. It'll adjust.

Ship the update. The bug fix is now visible where it should be: in the tracker your team reads, not only in the repo.

You ran the loop. You have a PR, a rules file born from session evidence, and a ticket that closed itself from inside Claude Code. Your setup is in place.

<!-- maintainer -->

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
- **Retro confabulation.** Claude's 3–5 line summary name-drops moments without quoting. Nerd push: *"quote the specific session moment that made you add rule X. If you can't, take it out."*
- **MCP install gate.** Corporate tenant blocks connector install. Tenant-admin fallback named per tracker in `reference/mcp-and-connectors.md`. Do not treat as blocker — fallback path always exists.

**Decision points:**
- **Sponsor stated a tracker the cohort's Claude Code can't connect to.** Fall back to create-a-markdown-ticket in the repo; close-out converts to *"write a ticket into `docs/tickets/` and link the PR."* Sponsor gets a signal.

**Plug points:**
- Sponsor-stated tracker (Linear / Jira / GitHub Issues / other).
- Agentic Nerd push-back moves at retro and MCP gate.

**Arc:**
- Picks up from: `fix-tests-first` — the rule seeded at that exercise is the file the retro rewrites.
- Hands off to: M1 Bridge → M2 (plan mode at depth on multi-file work).
