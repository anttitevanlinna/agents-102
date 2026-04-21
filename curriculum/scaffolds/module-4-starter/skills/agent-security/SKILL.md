---
name: agent-security
description: Audit an agent system for access-control risk and agent-STRIDE threats, then suggest agentic mitigations ranked by severity × likelihood. Use when a student asks to audit their agent, check for security risks, run STRIDE, or analyse what the agent can vs. should access.
---

# Agent Security — audit skill

Run this skill against an agent system in the current working directory. The system is usually: a `memory/` folder, a `sources/` folder, an `agents/` folder with one or more `*.md` agent files, a root `CLAUDE.md`, and any prior module outputs (e.g., `module-3/retrievals/`, `module-3/stances/`). Read them first; don't skim.

## What to produce

One report. Write it to the path the user names (default: `module-4/security-report.md`). Two sections.

### Section 1 — Access-control analysis

List every external system the agent can reach. Include:

- **Connectors** mounted via Claude Code (OneDrive, SharePoint, Confluence, Gmail, calendar, anything in Settings → Connectors)
- **Web fetch / web search** — counts as access to the open internet
- **File-write scope** — where in the filesystem the agent writes today (the whole training dir? specific subfolders? outside the training dir?)
- **Tool access** — any `tools/` directory, MCP servers, subagent dispatch
- **Reads that cross trust boundaries** — e.g., reading `sources/` that mixes public and confidential

For each access: is it **necessary** for what the system actually does today? Flag any access the system has but doesn't need. Least-privilege is the rule — capability the agent doesn't need is risk the agent doesn't need.

### Section 2 — Agent-STRIDE

Run agent-STRIDE (see `stride.md`). Six categories, each adapted from classical STRIDE to agent shapes. For each category, name the top one or two **specific** risks in the user's actual system — not generic descriptions. Quote the file or instruction that creates the risk.

For each risk, suggest **one agentic mitigation** (see `mitigations.md`): scope, split, filter, gate, or review. Match the mitigation to the specific risk — don't default to the same shape for everything.

### Ranking

Three-tier, severity × likelihood:

- **High** — could cause a material business harm AND is likely to fire on normal operation (not requiring a sophisticated attacker)
- **Medium** — one of the above; either high-harm-but-rare, or low-harm-but-frequent
- **Low** — unlikely AND low-harm

Rank the risks in the final list, highest first. Show your ranking reasoning in one line per risk.

## Style rules

- **Be specific.** "The agent has broad filesystem write access" is generic; "`agents/synthesizer.md` can write to `agents/`, so a synthesizer run could edit its own or sibling agent instructions" is specific. Quote files. Name paths.
- **Be honest about uncertainty.** If the evidence isn't in the files you read, say so — "I can't tell whether the agent has been used to produce external-facing output yet." Don't guess severity you can't support.
- **Don't propose mitigations you didn't analyse.** If you flag a risk, name the mitigation shape. If you can't name a mitigation with confidence, say "mitigation needs a human call" and name what question the human has to answer.
- **Skip what doesn't apply.** If a STRIDE category doesn't produce a real risk in this specific system, write one line: "No notable risk in this system." Don't invent.

## What not to do

- Don't treat this as a security-theatre checklist. The output is a working document, not a report-card for a CISO.
- Don't produce generic advice ("follow principle of least privilege"). The user knows the principle. They want the specific place they're violating it.
- Don't rank everything "Medium." If you can't distinguish severities, the user can't prioritise.
- Don't claim certainty. Agent systems are non-deterministic; your audit is a snapshot with judgment. Acknowledge the limit.

## The posture

You are an agent-security expert the user is borrowing for one audit. You know the threat model. You know the mitigation shapes. You've seen the common failure modes. You bring that expertise, but you don't own the user's business-risk judgment — you surface the risks, rank them, and leave the accept/mitigate/close-the-door decision to the user.

Read the system. Find the risks. Rank them. Suggest the mitigations. Stop.

Supporting files in this skill:
- `stride.md` — the six agent-STRIDE categories with their agent-adapted meanings and common patterns
- `access-analysis.md` — the access-control checklist and "necessary vs. merely granted" test
- `mitigations.md` — the five agentic mitigation shapes, with when to pick each
