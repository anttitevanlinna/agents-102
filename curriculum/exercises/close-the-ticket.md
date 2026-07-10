# Close the ticket *outside the repo*

**Time:** about 15 minutes, on your own.

**What you do:** wire one MCP connector into your tracker, then have Claude close the bug's ticket with a real close-out note.

**What you build:** a live connector into your tracker and a close-out note that lands where your team reads it.

**The point:** your agent's reach stops at the repo. The move that reaches past that boundary is a real one: the ticket for the bug you shipped in Module 1. One connector, and the loop closes where your team actually reads it.

Module 1 shipped the PR and compounded your rules file. The bug is fixed. The move that reaches outside the repo is closing its ticket, from the agent, not by hand.

## Reach past the repo with a connector

- Your agent's reach stops at the repo. Real engineering work spans tickets, pull requests, CI, chat, documentation: the system around the code. **MCP** is the protocol Claude Code uses to connect to that system. Three words land together: **connector** (the wire into a work app), **action** (a verb with effect in the world), **tool** (the umbrella for anything the model can call). Full primer in [MCP and connectors](../trainings/agentic-engineering-101/reference/mcp-and-connectors.md).
- One connector, two actions (read + update), closes the loop you just ran on the bug, in the tracker your team actually lives in.

## Wire one connector into your tracker

- Pick the cleanest path for your tracker. Three work:
 1. **GitHub Issues:** check `gh auth status` in your session. Claude runs `gh` for you via Bash, no MCP install needed.
 2. **MCP connector to your tracker** (Linear, Jira, other): follow the install line in [MCP and connectors](../trainings/agentic-engineering-101/reference/mcp-and-connectors.md) for your tracker. If tenant admin approval is required, it's worth asking, not right now.
 3. **Manual paste:** Claude writes the close-out; you paste it into the tracker UI yourself. Five seconds, no tool setup.
- The teaching moment is the agent reaching across a tool boundary with a real engineering note, not the install choreography. For paths 1 or 2, get your connector up and running.

> **Connector added after this session started?** Check MCP status and authenticate with `/mcp`. If the new connector still isn't there, exit the session and resume it with `claude --resume <session-id>`.

> **Quick timebox note.** Second connectors and deeper MCP debugging can regress to install yak-shaving. One connector firing on one ticket is the proof the loop closes outside the repo. The rest can wait.

## Send the close-out note to the ticket

Ask Claude to read the ticket for your bug and report what's on it. Paste a ticket ID, a URL, or "create me a new one" if there isn't one.

{{prompt:compound-and-close-2}}

Claude reads the ticket (or confirms there isn't one). Then ask Claude to write the close-out (root cause, how you fixed it, a link to the PR), update the ticket, and report what it wrote.

{{prompt:compound-and-close-3}}

## Read the close-out and ship it

- Read the close-out; push back if it's stiff or wrong. Tell Claude how your team actually writes ticket comments. It'll adjust.
- Ship the update (or paste it into the tracker yourself on path 3, manual paste). The bug fix is now visible where it should be: in the tracker your team reads, not only in the repo.

## What happened

The move outside the repo happened on a real job: the ticket for the bug you shipped in Module 1. Claude read the ticket, wrote the close-out, and the note landed in the tracker where your team reads it. The loop that started with a failing test closed where the work is actually visible.

<!-- maintainer -->

**Homework exercise — M1 close-out beat, pulled out of the in-class `compound-and-close` flow so the mandatory path stays personal-only (rules file), with the tracker connector as opt-in enhancement per `check_pedagogy.md §17`.** No Quality line yet: this file needs a `curriculum-pre-ship-audit` pass before ship. Prompts `compound-and-close-2` / `-3` are re-parented here (bodies unchanged; `origin:` frontmatter points at this file).

**Emphasis budget (`check_slides.md §9`) — attested multi-handle slides, inherited from `compound-and-close`'s 2026-07-09 pass:** the *Reach past the repo* slide keeps one bold handle per named term (**MCP** / **connector** / **action** / **tool**); the *Wire one connector* slide keeps the three tracker-path menu items bold (**GitHub Issues** / **MCP connector to your tracker** / **Manual paste**). Both are the deliberate one-handle-per-item shape, not the pre-pass bolded-lead monoculture. Leave for a slides judge.

**Meta (trainer):**
- **Primary Bloom's level:** Apply (wire the connector, close the ticket).
- **Time:** about 15 min, homework after Module 1. Optional enhancement, not a gate on any downstream module.
- **Delivery architecture** (working-dir model, no training-dir state, MCP install per tracker): canonical in `training-architecture.md` + `reference/mcp-and-connectors.md`. Not restated here.
- **Session continuity:** runs against the Module 1 repo and the bug shipped there. Cleanest picked up in the same M1 session (warm scrollback resolves *"the bug we just fixed"*); a fresh session works too, the student points Claude at the PR or pastes the ticket ID.

**Push-back moves (trainer / self-directed):**
- **MCP install gate** — corporate tenant blocks connector install. Tenant-admin fallback per tracker in `reference/mcp-and-connectors.md`; path 3 (manual paste of the Claude-written close-out) is always available. Never a blocker.
- **Close-out rubber-stamp** — student ships the agent's first draft without reading. Push: *"read the close-out aloud, does it sound like how your team writes ticket comments?"*

**Decision points:**
- **Sponsor stated a tracker the cohort's Claude Code can't connect to.** Fall back to a markdown ticket in the repo: close-out converts to *"write a ticket into `docs/tickets/` and link the PR."* Sponsor gets a signal.

**Plug points:**
- Sponsor-stated ticket tracker (Linear / Jira / GitHub Issues / other) — MCP install per tracker; tenant-admin fallback documented in `reference/mcp-and-connectors.md`.

**Leap test (Monday):** three observable outcomes the engineer exhibits on their own codebase by the next working day:
- **Closes a bug ticket via connector or `gh` from the agent**, not manually via the tracker UI, at least once. Falsifiable: a ticket comment authored by Claude / the `gh` API appears in the tracker history.
- **Wires one connector (or confirms `gh auth`) so the agent can reach the tracker** from inside a session. Falsifiable: `/mcp` shows a live tracker connector, or `gh auth status` is green and used from Bash.
- **Pushes back on a stiff close-out before shipping it.** Falsifiable: scrollback shows a revise-the-comment turn before the ticket update lands.

**Arc:**
- Picks up from: `compound-and-close` — the rules file is compounded and the PR is shipped; this closes the bug's ticket outside the repo.
- Hands off to: nothing by stable path. The closed ticket lives in the team's tracker, not the training corpus (terminal artifact).
