---
name: agent-audit
description: Audit an agent system through two lenses, policy and agent security. Use when asked to audit, review or check an agent system before it runs for real.
---
<!-- SYNTHETIC. The neighbour's Module 4 skill, handed over unedited. Fictional. -->

# Agent audit

Two lenses, one report.

## Policy lens
Read every policy file the user names (or `module-4/policies/` if none is named). Turn each rule into a row: rule id, what it requires, evidence in the system, verdict (compliant, violation, I can't tell). Quote the file and line for every verdict.

## Agent-security lens
Check four patterns across `agents/`, `memory/`, `sources/` and the root instructions:
1. Prompt injection: instructions inside sources that an agent could follow.
2. Secrets: keys, passwords or personal data an agent could copy out.
3. Tool confusion: an agent granted tools its job does not need.
4. Supply chain: skills or files from outside the user's system.

## Output
Write `outputs/agent-audit.md`: the two tables, then the three findings that matter most, each with the file it lives in. Never fix anything; report only.
