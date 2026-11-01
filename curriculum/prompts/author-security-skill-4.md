---
key: author-security-skill-4
dest: Claude Code
runtime: code
origin: exercises/author-security-skill
requires:
  - id: authored-security-skill
    source: prompt:author-security-skill-3
produces:
  - id: installed-security-skill
    location: "{{artifact:project-skills}}/agent-audit/SKILL.md"
---
Install the authored skill at module-4/skills/agent-audit/ as a project skill at {{artifact:project-skills}}/agent-audit/. Confirm the installed path so I can verify it.
