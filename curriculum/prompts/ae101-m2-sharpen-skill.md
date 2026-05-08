---
key: ae101-m2-sharpen-skill
dest: Claude Code
runtime: any
origin: agentic-engineering-101/earn-the-trust
---
Read the test-strategy SKILL.md I authored earlier. Read this scrollback: the access-control output, the STRIDE decision and ADR, the moment I invoked the skill on the security-tested feature, the place I pushed back.

First: find the one section of the skill where session evidence shows it underdelivered (a convention I named in conversation that isn't encoded, a codebase-specific failure mode the skill missed, an assumption I had to correct mid-invocation). Rewrite that section in place. Do not append a critique addendum. Show me before and after, two or three lines each.

Then, separately: if one rule about how I worked with security skills, wrote ADRs, or authored skills on this codebase earned itself this session, integrate it into ./CLAUDE.local.md (integrate, don't append; personal file, not team ./CLAUDE.md). Name the moment, not the rule. Quote the specific session beat. If the rule is team-worthy, flag it in your summary so I can open a separate PR against ./CLAUDE.md later. If nothing earned itself, say so and skip the rules-file write.
