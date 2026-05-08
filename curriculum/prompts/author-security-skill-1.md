---
key: author-security-skill-1
dest: Claude Code
runtime: any
origin: exercises/author-security-skill
---
Read everything in module-4/policies/. Use those policy references to audit the agent system: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/stances/.

For each rule you can derive from the policy files, produce one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), and one line of evidence from my actual files for that verdict. If you can't tell, say what evidence you'd need to decide.

Write the raw report to outputs/policy-report-raw.md. Be specific. Be plain. An "I can't tell" is a better answer than a confident guess.

Do not create a skill yet. This is the raw run.
