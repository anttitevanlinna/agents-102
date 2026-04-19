# Access-control analysis

What the agent CAN reach, and what it SHOULD reach. The gap between the two is the audit target.

Use this file as the lens for Section 1 of the agent-security audit.

## The two-column walk

Produce a table. Every row is one access the agent has. Two columns: **What the agent can reach** and **Is it necessary?**

### What to include in "can reach"

- **Connectors** — anything mounted via Claude Code (OneDrive, SharePoint, Google Drive, Gmail, calendar, Slack, Confluence, Jira, Notion, GitHub). Check `Settings → Connectors` in Claude Code desktop, or the connector configuration in the working directory.
- **Web fetch** — counts as access to the entire public internet
- **Web search** — same, but scoped to query results (slightly narrower)
- **File reads** — any file the agent reads, including those outside the immediate working directory if the agent has been pointed at them
- **File writes** — where in the filesystem the agent writes. Default: the training directory. If the agent's been granted broader scope (the whole `~/Documents/`, the home directory, specific external paths), record it.
- **Agent instruction files** — can the agent edit `agents/*.md`, root `CLAUDE.md`, or `brain/*.md`? This is a form of access that's often overlooked.
- **Tool access** — any `tools/` directory, MCP servers configured, `/skill` invocations, subagent dispatch, shell command execution
- **Skill access** — what skills are in `skills/` and what they themselves reach (skills can add their own connectors, tools, or file writes)

### How to decide "is it necessary"

For each access, ask three questions:

1. **What does the agent do with it today?** Quote one specific use — "the synthesizer reads `module-3/retrievals/*.md` to combine stances." If the agent has the access but doesn't use it, that's the first finding.
2. **Could the system do its job without this access?** If yes, the access is convenient, not necessary.
3. **What's the harm if this access is exploited?** Read access to commercial-sensitive material has disclosure risk; write access to shared systems has tamper risk; tool access has elevation risk.

Necessary = the agent can't do its current job without it. Merely granted = it's there because it was there, or because the platform gave it by default.

### Flag in the report

Any access where the answer to "is it necessary" is **no** or **not sure**. Default-grants are the most common finding — students install connectors during Module 2 for one use case and never revoke them. A OneDrive connector granted to read a positioning doc is still granted three modules later when the agent is summarising customer call notes.

## Common patterns to catch

**Broad write scope.** "The agent writes to the whole training directory" is usually true and usually more than needed. Most exercises only need writes to the current module's subfolder. Scoping writes to `module-N/` is a legitimate agentic mitigation.

**Stale connectors.** A connector configured in a prior module but not used today. Still active, still accessible, still a risk surface. No longer necessary.

**Read access to write-risky folders.** An agent that reads `sources/` when `sources/` contains files with different sensitivity levels (some public, some commercial-confidential). The agent has no model of sensitivity unless the rules tell it.

**Self-modifying access.** The agent can edit `agents/*.md` or root `CLAUDE.md`. Usually granted by default (the agent has write access to the whole training dir, which includes instruction files). Almost never necessary. Scoping writes out of `agents/` is a common first mitigation.

**Inherited subagent access.** When the parent agent dispatches a subagent, the subagent usually inherits the full parent context — all connectors, all filesystem access, all tools. Is the subagent doing something that needs all of that? If not, the dispatching prompt can narrow it ("a subagent that reads only `module-3/retrievals/` and writes only to `module-3/stances/`").

**Tool-chain composition.** Two tools that are each fine on their own compose into something broader. Read-a-file + send-an-email = exfiltration. Read-from-connector + write-to-connector = data movement. Read + summarise + publish = unreviewed output.

**External path writes.** The agent writes to paths outside the training directory (user's Documents, Desktop, Downloads). Usually unintentional. Usually flaggable.

## How to present the findings

A short list of flagged accesses, each with:
- **What** (the access, quoted specifically — path, connector name, tool)
- **Currently used for** (one line, quote the file or prompt that uses it)
- **Necessary?** (yes / no / not sure — if "not sure," say what question the user has to answer)
- **Risk if exploited** (one line, in plain language)
- **Suggested mitigation** (scope / split / filter / gate / review — pick one shape from `mitigations.md`)

Don't list every single access; list the flagged ones. A clean access pattern gets a one-line summary ("no broadly-scoped writes, no stale connectors, no self-modifying paths — access is appropriately scoped"). Most systems will have 2–5 flagged items.

## The rule to remember

Least privilege is not a slogan. It's a forcing function. Every access you remove is a category of future risk you don't have to mitigate, monitor, or apologise for. The first question in any access-control audit isn't "how do we defend this access?" — it's "do we need this access?"

If the answer is no, the cheapest mitigation has already won.
