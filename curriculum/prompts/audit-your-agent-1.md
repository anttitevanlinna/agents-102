---
key: audit-your-agent-1
dest: Claude Code
runtime: any
origin: exercises/audit-your-agent
---
/security-audit — load the skill

Apply the policy lens to the agent system: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/stances/.

For each rule the policy lens carries, produce one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), and one line of evidence from my actual files for that verdict. If you can't tell, say what evidence you'd need to decide.

Write the packaged-lens report to outputs/policy-report.md. If outputs/policy-report-raw.md exists, briefly note one way the packaged report is sharper, narrower, or more specific than the raw run. Be specific. Be plain. An "I can't tell" is a better answer than a confident guess.

Read the memory and agent files properly - don't skim. Quote the specific lines or files that support each verdict.

After writing the report, read outputs/policy-report.md back to yourself and tell me:
1. The top three surprises - rows where the verdict is not what a careful reader would have predicted.
2. The three rows where "I can't tell" is most likely hiding a real compliance gap.
3. One row that looks compliant on the surface but where you would still push back.

Keep each point to one or two sentences. Quote the specific rule name so I can find the row.
