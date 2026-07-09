# MCP and connectors — reference

Flat lookup. How to wire your agent to a ticket tracker (and other outside-the-repo systems) in Claude Code. Updated as the install surface changes; the exercise body stays stable.

**Last verified: 2026-05-14** against Claude Code MCP docs, Atlassian remote MCP server docs, Linear MCP changelog, GitHub MCP server repo, local `claude mcp add --help`.

## Three paths to a work-app action

Three ways an action becomes callable in a Claude Code session:

1. **Claude.ai connector inheritance.** A connector added at [claude.ai/customize/connectors](https://claude.ai/customize/connectors) is automatically available when the CLI is logged in to the same account. Best path for Jira and Linear.
2. **`claude mcp add` from the command line.** Install an MCP server directly. Covers connectors not in the Claude.ai directory, project-scoped servers (`.mcp.json` in the repo), and local stdio MCPs.
3. **First-party CLI via Bash.** When the work app ships a CLI (`gh`, `aws`, `gcloud`), Claude calls it through Bash — no MCP. Best ergonomics where the CLI exists; `gh` is the canonical case.

Per-tracker install commands below. Plugins distribute Path 2 at scale — see the [Plugins and marketplaces](#plugins-and-marketplaces--mcp-servers-bundled-for-distribution) section.

**Vocabulary.** MCP is the protocol. **Connector** = the wire into a work app (the word Claude Code's configuration uses). **Action** = a verb with effect in the world (*read ticket, comment, close*). **Tool** = the umbrella term for anything the model can call. A first-party CLI exposes actions through Bash; an MCP server exposes them through the protocol. Same end state from the agent's point of view.

**Sources:** [Claude Code MCP docs](https://code.claude.com/docs/en/mcp) · [Use MCP servers from Claude.ai](https://code.claude.com/docs/en/mcp#use-mcp-servers-from-claude-ai) · [Anthropic Directory](https://claude.ai/directory) · [Model Context Protocol spec](https://modelcontextprotocol.io/introduction)

## GitHub Issues

**Default for AE101: `gh` CLI (Path 3).** GitHub ships [`gh`](https://cli.github.com), an official CLI pre-installed on most developer machines. Claude Code's Bash tool calls it directly — no MCP server, no PAT management, no allowlist work for IT.

```
gh auth status     # check
gh auth login      # if not signed in
```

Ask Claude to *read issue NNN*, *comment on issue NNN with this body*, *open a PR from this branch*, or *check the failing GH Action*. Claude runs `gh issue view`, `gh issue comment`, `gh pr create`, `gh run view`, `gh api`, etc. via Bash. The surface is broad: every GitHub REST/GraphQL endpoint is reachable via `gh api`, so `gh` covers what the MCP server covers for nearly every practical task.

**When to add the official GitHub MCP server instead.** Pick MCP (Path 1 or Path 2) when you want discoverable tool definitions in `/mcp`, structured arguments rather than CLI prose, multiple GitHub accounts in one Claude session (`gh` is single-account), or you're working with another agent runtime that lacks shell access.

**MCP install (Path 2):**

```
claude mcp add --transport http github https://api.githubcopilot.com/mcp/ --header "Authorization: Bearer YOUR_PAT"
```

Trailing slash is canonical. Requires a GitHub fine-grained Personal Access Token with appropriate scopes (commonly `repo` for issue/PR access; pick narrower scopes if your work is read-only). OAuth via Claude.ai inheritance (Path 1) is the smoother modern option where supported.

**Sources:** [`gh` CLI](https://cli.github.com) · [`gh` manual](https://cli.github.com/manual/) · [GitHub MCP server repo](https://github.com/github/github-mcp-server) · [GitHub PAT settings](https://github.com/settings/personal-access-tokens)

## Jira — Atlassian Rovo MCP (official)

Atlassian's Rovo MCP Server hit GA on 2026-02-04, covering Jira, Confluence, Compass, and Bitbucket (Jira Service Management rides on Jira). OAuth 2.1 flow. Docs: [support.atlassian.com/rovo/docs/getting-started-with-the-atlassian-remote-mcp-server](https://support.atlassian.com/rovo/docs/getting-started-with-the-atlassian-remote-mcp-server/).

**Easiest path: Claude.ai inheritance.** Add Atlassian at [claude.ai/customize/connectors](https://claude.ai/customize/connectors), complete OAuth, then start a Claude Code session logged in to the same account. The connector appears in `/mcp`. No `claude mcp add` needed. On Team and Enterprise Claude.ai plans, only admins can add at this surface.

**CLI install (when you want project scope or a different Claude.ai account):**
```
claude mcp add --transport http jira https://mcp.atlassian.com/v1/mcp/authv2
```

Then in Claude Code:
```
/mcp
```

Browser opens; you sign in to your Atlassian org; scopes approve at user level. **Once your org's first 3LO consent is complete and the domain is allowed, individual engineers don't need per-install admin approval** — admins control product scopes and which domains can connect, not whether individuals can install after that.

**Note:** the older `https://mcp.atlassian.com/v1/sse` endpoint stops working 2026-06-30 per [Atlassian's support docs](https://support.atlassian.com/rovo/docs/getting-started-with-the-atlassian-remote-mcp-server/). The current canonical endpoint is `/v1/mcp/authv2`.

**Sources:** [Atlassian Rovo MCP docs](https://support.atlassian.com/rovo/docs/getting-started-with-the-atlassian-remote-mcp-server/) · [Atlassian admin console](https://admin.atlassian.com/) · [Composio (Jira MCP bridge)](https://composio.dev/)

## Linear — first-party MCP (official)

Linear publishes its own MCP server. Reference: [linear.app/changelog](https://linear.app/changelog) (search "MCP").

**Easiest path: Claude.ai inheritance.** Add Linear at [claude.ai/customize/connectors](https://claude.ai/customize/connectors), complete OAuth, then start a Claude Code session logged in to the same account. The connector appears in `/mcp`. On Team and Enterprise Claude.ai plans, only admins can add at this surface.

**CLI install:**
```
claude mcp add --transport http linear https://mcp.linear.app/mcp
```

Cleanest UX of the three trackers for solo engineers, regardless of path.

**Fallbacks when a tenant blocks the first-party server:** Composio or Merge Agent Handler host third-party bridges; a local stdio MCP with a personal Linear API token works without any external host.

**Sources:** [Linear changelog](https://linear.app/changelog) · [Linear MCP endpoint](https://mcp.linear.app/mcp) · [Linear API token settings](https://linear.app/settings/account/security)

## Other trackers (Asana, Shortcut, Azure DevOps, ServiceNow, etc.)

Check the [Anthropic Directory](https://claude.ai/directory) for reviewed connectors and your tracker's own docs. Most have a third-party MCP or a CLI fallback (like `gh`).

**Sources:** [Anthropic Directory](https://claude.ai/directory) · [Model Context Protocol examples](https://modelcontextprotocol.io/examples)

## Plugins and marketplaces — MCP servers bundled for distribution

A Claude Code **plugin** is a packaged extension that can bundle skills, agents, hooks, MCP servers, LSP servers, and background monitors into one installable unit. A **marketplace** is a catalog (a `marketplace.json` file hosted in a git repo) that lists plugins and where to fetch them. Plugins distributed this way are the most ergonomic path when one MCP server needs to land on many machines — a team marketplace install replaces N copies of `claude mcp add`.

**How MCPs ride inside plugins.** A plugin author puts a standard `.mcp.json` at the plugin root; when the plugin is enabled, every server in that file loads automatically. Plugin-provided MCP servers occupy their own scope in Claude Code's precedence hierarchy (above Claude.ai connectors, below user / project / local-CLI scopes), so a server installed via Path 2 still wins on URL collisions. Plugins can ship more than MCP — a single plugin can deliver a tracker server plus the skills and agents that use it — but for tracker workflows the MCP-bundle dimension is the one this page covers.

**Add a marketplace, then install a plugin:**

```
/plugin marketplace add owner/repo
/plugin install plugin-name@marketplace-name
```

The first argument to `marketplace add` accepts a GitHub `owner/repo`, a full git URL (`https://gitlab.com/company/plugins.git`), or a local path. Refresh a marketplace's catalog with `/plugin marketplace update`. Non-interactive equivalents exist as `claude plugin marketplace ...` for scripting.

**Official vs team marketplaces.** Anthropic operates a set of official marketplaces (reserved names include `claude-plugins-official`, `anthropic-marketplace`, `agent-skills`). Teams and individuals host their own — public or private — by putting `marketplace.json` in a git repo. Private repositories work the same as any other git operation: Claude Code reuses your existing credentials (`gh auth login`, macOS Keychain, `ssh-agent`, `git-credential-store`).

**Enterprise pre-registration.** The managed settings file (`managed-settings.json` on supported OSes) can pre-register approved marketplaces via `extraKnownMarketplaces` (so users don't need to run `/plugin marketplace add` at all) and restrict additions via `strictKnownMarketplaces`. Pairs with `managed-mcp.json` as the second half of tenant-side plugin policy.

**When to reach for plugin distribution over plain `claude mcp add`.** When the same connector needs to land on a team of N (one marketplace registration, one install command, one update path); when the MCP comes with companion skills or agents you want shipped alongside; when you want versioned releases and `/plugin marketplace update` semantics rather than ad-hoc re-adds. For a one-off solo install on one machine, plain Path 1 or Path 2 stays simpler.

**Sources:** [Claude Code plugins overview](https://code.claude.com/docs/en/plugins) · [Discover and install plugins](https://code.claude.com/docs/en/discover-plugins) · [Create and distribute a marketplace](https://code.claude.com/docs/en/plugin-marketplaces) · [Plugins reference (manifest + scope)](https://code.claude.com/docs/en/plugins-reference) · [Anthropic plugins on GitHub](https://github.com/anthropics/claude-plugins-official)

## What Claude Code doesn't do yet (as of 2026-05-14)

Current gaps:

- No standalone GUI marketplace for arbitrary MCP server install. MCP servers ride inside plugins: the in-CLI `/plugin` Discover tab installs plugin-bundled MCPs (e.g. `atlassian`, `linear`, `github` from `claude-plugins-official`), and OAuth connectors install at [claude.ai/customize/connectors](https://claude.ai/customize/connectors) and inherit into Claude Code (Team/Enterprise: admin-only). There is no in-CLI picker for adding a raw `claude mcp add --transport http <url>` server outside of a plugin. Claude Desktop's Settings → Connectors panel manages built-in OAuth connectors, not arbitrary MCP servers.
- No single-click OAuth across every MCP connector (Rovo, Linear, and Anthropic Directory connectors support it; most others don't).
- No in-chat picker of connector actions.

When any of these land, this file updates. The training's exercises stay stable across changes.

**Sources:** [Claude Code MCP docs](https://code.claude.com/docs/en/mcp) · [Claude.ai connector panel](https://claude.ai/customize/connectors) · [Anthropic Directory](https://claude.ai/directory)

<!-- maintainer -->

**Canonical home:** `curriculum/trainings/agentic-engineering-101/reference/mcp-and-connectors.md`. Ships in content folder's `reference/` directory to students.

**Update cadence:** re-verify on each cohort delivery; full audit via `claude-code-guide` monthly or at any Claude Code release known to touch MCP.

**When this reference needs an update.** Run the update when any of these happen:

- A cohort reports an install command that no longer works
- `claude-code-guide` flags a new MCP install surface (marketplace, settings panel, single-click flow)
- Atlassian, Linear, or GitHub ship an MCP change (new endpoint, deprecated endpoint, OAuth scope change)
- A new tracker becomes common enough in cohorts to warrant a section

Bump the **Last verified** date at the top. Note what changed in the commit message. The exercises reading this file don't change.

**Source verification (2026-05-14, subagent fact-check pass):** 22 claims checked against authoritative sources — 1 FAIL (`/plugin` Discover-tab GUI contradicted "no GUI marketplace" framing — rewritten), 3 DRIFTs (Rovo coverage list, Atlassian admin-gating absoluteness, managed-settings filename framing — all softened), 16 PASS, 1 UNVERIFIED-adjacent (Linear "no admin gate" matches practitioner behavior; changelog doesn't quote the negation — left as-is).

**Source verification (2026-05-14):**
- Claude Code MCP docs: https://code.claude.com/docs/en/mcp `[platform docs]` — confirms `claude mcp add --transport http <name> <url>` + `--header` flag shape; SSE transport deprecated in favour of HTTP; documents Claude.ai connector inheritance ("MCP servers you've added in Claude.ai are automatically available in Claude Code") and the `ENABLE_CLAUDEAI_MCP_SERVERS=false` opt-out; documents `managed-mcp.json` as the canonical enterprise-policy filename with OS-specific install paths and exclusive-control semantics
- Atlassian remote MCP server docs: https://support.atlassian.com/rovo/docs/getting-started-with-the-atlassian-remote-mcp-server/ `[platform docs]` — canonical endpoint `/v1/mcp/authv2`; `/v1/sse` sunset 2026-06-30
- Linear MCP: https://linear.app/changelog `[platform docs]` — endpoint `https://mcp.linear.app/mcp`; `/sse` deprecated
- GitHub MCP server: https://github.com/github/github-mcp-server `[platform docs]` — endpoint `https://api.githubcopilot.com/mcp/` (trailing slash canonical); fine-grained PAT, scopes per repo access required
- Anthropic Directory: https://claude.ai/directory `[platform docs]` — replaces the older `modelcontextprotocol.io/servers` URL referenced before 2026-Q2; reviewed connector listings; same MCP infrastructure as Claude Code
- Claude.ai connector panel: https://claude.ai/customize/connectors `[platform docs]` — install surface for connectors that inherit into Claude Code; Team/Enterprise admin-gated
- `gh` CLI: https://cli.github.com `[platform docs]`
- Composio Jira MCP bridge: https://composio.dev/ `[third-party bridge docs]` (the old `/content/jira-mcp-server` deep link 404s as of 2026-05-25)

**Why a reference file and not inline in the exercise:**
Claude Code's MCP surface moves. Atlassian deprecates endpoints. New connectors land monthly. If the exercise body carries install specifics, every cohort delivery ships against stale instructions within a quarter. The reference file is the single point of update; exercises point at it; students get current instructions without editorial churn.

**Quality:** compendium-audited 2026-05-03 (story@bb9c1d5 behavior@bb9c1d5)
- judges @bb9c1d5: writing grandfathered, story PASS, technical grandfathered, behavior PASS
