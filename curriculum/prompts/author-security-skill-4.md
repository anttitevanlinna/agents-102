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
    location: "{{artifact:project-skills}}/security-audit/SKILL.md"
---
Install the authored skill at module-4/skills/security-audit/ as a project skill at {{artifact:project-skills}}/security-audit/. Confirm the installed path so I can verify it.
