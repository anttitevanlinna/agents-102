---
key: author-test-strategy-skill-1
dest: Claude Code
runtime: any
origin: exercises/author-test-strategy-skill
---
I want to author a test-strategy skill for this codebase. Ask me the questions you need to encode it well: the ones that'd make the skill give a teammate on a different service a test strategy tuned to OUR system, not a generic pyramid.

Cover at minimum: which testing framework, what's mocked and what isn't, where the integration boundary actually runs (real dependencies vs. stubs), what "flaky" means in our system (what actually fails intermittently and why), what regression scope looks like on this team, which tests are load-bearing (the ones reviewers always check), what's NOT worth testing here (and why).

Ask ONLY question 1 first. Do not preview questions 2-N. Wait for my reply, then ask the next. Push back if my answer is generic. A test-strategy skill that says "write unit tests first" is useless. I need you to extract codebase-specific detail.

When you have enough, write `~/.claude/skills/test-strategy/SKILL.md` as a personal skill (frontmatter with `name` + `description`, then instructions). Show me before saving.
