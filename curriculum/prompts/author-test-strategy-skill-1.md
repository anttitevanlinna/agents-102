---
key: author-test-strategy-skill-1
dest: Claude Code
runtime: any
origin: exercises/author-test-strategy-skill
requires:
  - id: feature-being-shipped
    source: scrollback (student input at M3 Connections)
  - id: stride-adr
    source: prompt:threat-model-with-stride-3
    conditional: m3-stride-completed
produces:
  - id: test-strategy-skill
    location: ~/.claude/skills/test-strategy/SKILL.md
    consumed-by:
      - prompt:author-test-strategy-skill-2
      - prompt:walk-and-send-off-2
      - prompt:walk-and-send-off-4
      - prompt:diagnose-and-resend-6
      - module:spot-gaps-build-the-loop
---
I want to author a test-strategy skill for this codebase. Ask me the questions you need to encode it well: the ones that'd make the skill give a teammate on a different service a test strategy tuned to OUR system, not a generic pyramid.

Cover at minimum: which testing framework, what's mocked and what isn't, where the integration boundary actually runs (real dependencies vs. stubs), what "flaky" means in our system (what actually fails intermittently and why), what regression scope looks like on this team, which tests are load-bearing (the ones reviewers always check), what's NOT worth testing here (and why).

Use the AskUserQuestion tool to interview me: one question per tool call, wait for my answer, then the next. Push back if my answer is generic. A test-strategy skill that says "write unit tests first" is useless. I need you to extract codebase-specific detail.

When you have enough, write `~/.claude/skills/test-strategy/SKILL.md` as a personal skill (frontmatter with `name` + `description`, then instructions). Show me before saving.
