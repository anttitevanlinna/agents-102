---
key: build-your-challenge-memory-8
dest: Claude Code
runtime: any
origin: exercises/build-your-challenge-memory
requires:
  - id: challenge-memory
    source: prompt:build-your-challenge-memory-7
produces:
  - id: memory-audit
    location: scrollback
callouts:
  - at: Report up to six
    say: A limit, and permission to find nothing, keep the agent from inventing issues.
  - at: Of the issues you found
    say: Agents state every finding with the same confidence. This line asks which one to doubt.
---
Review the memory for real problems of three kinds: contradictions between topic pages; claims that need a source pointer but don't have one; older pages that likely went stale given what's in the newer sources. Also check that index.md links every page in memory/.

Report up to six, real issues only. If a category is clean, say so and move on. An empty category is a valid finding, not a quota to fill. For each, propose a specific fix and rate severity: high (would mislead a decision), medium (missing signal), low (cosmetic).

Of the issues you found, name the one you're least sure is real and say why. That's the one I should scrutinize first.

Don't apply anything yet. Ask me to approve or reject each one.
