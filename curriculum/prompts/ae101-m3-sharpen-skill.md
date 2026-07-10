---
key: ae101-m3-sharpen-skill
dest: Claude Code
runtime: any
origin: agentic-engineering-101/earn-the-trust
requires:
  - id: test-strategy-skill
    source: prompt:author-test-strategy-skill-1
  - id: access-surface-map
    source: prompt:map-the-access-surface-2
  - id: stride-adr
    source: prompt:threat-model-with-stride-3
  - id: test-strategy-output
    source: prompt:author-test-strategy-skill-2
  - id: claude-local-md
    source: prompt:compound-and-close-1
    conditional: m1-completed
produces:
  - id: test-strategy-skill
    location: ~/.claude/skills/test-strategy/SKILL.md (in-place sharpening update)
    consumed-by:
      - prompt:walk-and-send-off-2
      - prompt:diagnose-and-resend-6
      - module:spot-gaps-build-the-loop
  - id: claude-local-md
    location: ./CLAUDE.local.md (in-place integration of security-working rules if a rule earned itself)
    conditional: rule-earned-itself
    consumed-by:
      - prompt:walk-and-send-off-2
      - prompt:diagnose-and-resend-6
      - prompt:spot-gaps-build-the-loop-2
---
Read the test-strategy skill file at `~/.claude/skills/test-strategy/SKILL.md`. Read this scrollback: the access-control output, the STRIDE decision and ADR, the moment the skill was invoked on the security-tested feature, the critique exchange.

First: find the one section of the skill where invocation evidence shows it underdelivered (a convention the skill claims that the invocation didn't enforce, a codebase-specific failure mode the skill missed, an assumption the invocation had to correct). Rewrite that section in place. Do not append a critique addendum. Show me before and after, two or three lines each.

Then, separately: if one rule about how I worked with security skills, wrote ADRs, or sequenced the access-map → STRIDE → test-strategy flow earned itself this session, integrate it into ./CLAUDE.local.md (integrate, don't append; personal file, not team ./CLAUDE.md). Name the moment, not the rule. Quote the specific session beat. If the rule is team-worthy, flag it in your summary so I can open a separate PR against ./CLAUDE.md later. If nothing earned itself, say so and skip the rules-file write.
