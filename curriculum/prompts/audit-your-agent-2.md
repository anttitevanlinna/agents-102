---
key: audit-your-agent-2
dest: Claude Code
runtime: any
origin: exercises/audit-your-agent
---
Apply the agent-security lens to every agent in agents/. Run both checks: what each agent can reach, and the named risk patterns the lens carries.

For access control: for each agent in agents/, list every outside system or sensitive place the agent can reach (connectors, retrievals, file writes beyond the training directory). Is each access necessary for what the agent actually does? Flag anything the agent has access to but doesn't need.

For the named risk patterns (prompt injection direct and indirect, secrets-in-context-and-scrollback, tool-confusion, skill supply-chain): for each pattern, name the top one or two specific risks across the agents, not generic definitions. Quote the agent file or behaviour that creates the risk.

For each risk flagged, suggest one mitigation for how the agent works - scope, split, filter, gate, or review - matched to the specific risk. These sit on top of the normal company controls already in place (network controls, identity and access management, logging, vendor/security review), not replacing them. Rank the risks by severity x likelihood, three-tier (high / medium / low).

Write the report to outputs/security-report.md. Include the ranked mitigation suggestions.
