# MCP and connectors — reference

Flat lookup. How to wire your agent to a ticket tracker (and other outside-the-repo systems) in Claude Code. Updated as the install surface changes; the exercise body stays stable.

**Last verified: 2026-04-23** against Claude Code MCP docs, Atlassian Rovo MCP, `gh` CLI.

## The CLI-first reality (as of 2026-Q2)

Claude Code today installs MCP servers from the command line — `claude mcp add ...`. No GUI marketplace yet; no Settings → Connectors panel. One command, one time, per connector.

If that feels off for a training that's otherwise agent-first: you're right. Treat connector install as one-time setup per tracker, not a repeating step.

Three words that land together:

- **Connector** — the wire into a work app (the word Claude Code's configuration uses)
- **Action** — a verb with effect in the world (*read ticket, comment on ticket, close ticket*)
- **Tool** — the umbrella term for anything the model can call

MCP is the protocol. Connectors are the things you install. Actions are what they expose.

## Per-tracker install

### GitHub Issues — two clean paths

**Path A — `gh` CLI (simplest).** `gh` is GitHub's official CLI, pre-installed on most developer machines, and Claude Code's Bash tool calls it directly. No MCP needed.

```
gh auth status     # check
gh auth login      # if not signed in
```

Ask Claude to *read issue NNN* or *comment on issue NNN with this body*. Claude runs `gh issue view` / `gh issue comment` via Bash.

**Path B — official GitHub MCP server.** If you want the full MCP tooling surface in Claude Code (discoverable actions, structured arguments):

```
claude mcp add --transport http github https://api.githubcopilot.com/mcp --header "Authorization: Bearer YOUR_PAT"
```

Requires a GitHub Personal Access Token with repo scope. More capability than `gh`; more setup.

**Default recommendation for AE101:** Path A. Students get the Bash-driven loop without extra auth dance.

### Jira — Atlassian Rovo MCP (official)

Atlassian's Rovo MCP Server hit GA on 2026-02-04, covering Jira, Confluence, Compass, JSM, and Bitbucket. OAuth 2.1 flow.

**Install:**
```
claude mcp add --transport http jira https://mcp.atlassian.com/v1/mcp
```

Then in Claude Code:
```
/mcp
```

Browser opens; you sign in to your Atlassian org; scopes approve at user level. **Individual engineers don't need admin approval** — admins control which tools connect, not whether individuals can install.

**Note:** the older `/sse` endpoint stops working 2026-06-30. Use `/mcp` path for new setups.

### Linear — first-party MCP (official)

Linear now publishes its own MCP server. No admin gate; OAuth at user level.

**Install:**
```
claude mcp add --transport http linear https://mcp.linear.app/mcp
```

Cleanest UX of the three trackers for solo engineers.

**Fallbacks when a tenant blocks the first-party server:** Composio or Merge Agent Handler host third-party bridges; a local stdio MCP with a personal Linear API token works without any external host.

### Other trackers (Asana, Shortcut, Azure DevOps, ServiceNow, etc.)

Check the [MCP server directory](https://modelcontextprotocol.io/servers) and your tracker's own docs. Most have a third-party MCP or a CLI fallback (like `gh`).

## Tenant-admin fallbacks — when IT gates install

Corporate tenants may lock MCP install via `managed-mcp.json`, allowlists, or OAuth scope pinning. Practical fallbacks:

1. **GitHub Issues + `gh`.** `gh` is not an MCP — it's a CLI most orgs already approve. Claude calls it via Bash. Works in nearly every tenant.
2. **Jira where Rovo is pre-approved.** Many large orgs pre-approve `mcp.atlassian.com` — check before assuming it's gated.
3. **Local stdio MCP with personal API token.** Runs on your machine; no external URL to block. Works for Linear and for Jira when Rovo is unavailable.
4. **Service-desk ticket to IT.** Legitimate path for a regulated tenant. Name the connector you need and the business reason (training, productivity); most IT orgs approve it within a few days.

## What Claude Code doesn't do yet (as of 2026-04-23)

Flagged for honesty, not complaint:

- No GUI marketplace or Settings → Connectors panel for MCP install in Claude Code (claude.ai has one, gated to admins on Team/Enterprise)
- No single-click OAuth across every connector (Rovo and Linear support it; most others don't)
- No in-chat picker of connector actions

When any of these land, this file updates. The training's exercises stay stable across changes.

## When this reference needs an update

Run the update when any of these happen:

- A cohort reports an install command that no longer works
- `claude-code-guide` flags a new MCP install surface (marketplace, settings panel, single-click flow)
- Atlassian, Linear, or GitHub ship an MCP change (new endpoint, deprecated endpoint, OAuth scope change)
- A new tracker becomes common enough in cohorts to warrant a section

Bump the **Last verified** date at the top. Note what changed in the commit message. The exercises reading this file don't change.

<!-- maintainer -->

**Canonical home:** `curriculum/reference/mcp-and-connectors.md`. Ships in content folder's `reference/` directory to students.

**Update cadence:** re-verify on each cohort delivery; full audit via `claude-code-guide` monthly or at any Claude Code release known to touch MCP.

**Source verification (2026-04-23):**
- Claude Code MCP docs: https://code.claude.com/docs/en/mcp.md `[platform docs]`
- Atlassian Rovo MCP: https://www.atlassian.com/platform/rovo-mcp `[platform docs]`
- `gh` CLI: https://cli.github.com `[platform docs]`
- Composio Jira setup: https://composio.dev/content/jira-mcp-server `[third-party bridge docs]`

**Why a reference file and not inline in the exercise:**
Claude Code's MCP surface moves. Atlassian deprecates endpoints. New connectors land monthly. If the exercise body carries install specifics, every cohort delivery ships against stale instructions within a quarter. The reference file is the single point of update; exercises point at it; students get current instructions without editorial churn.

**Quality:** compendium-audited 2026-05-03 (story@bb9c1d5 behavior@bb9c1d5)
- judges @bb9c1d5: writing grandfathered, story PASS, technical grandfathered, behavior PASS
