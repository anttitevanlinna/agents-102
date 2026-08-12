---
key: extract-the-task-shaping-rule-2
dest: Claude Code
runtime: any
origin: exercises/extract-the-task-shaping-rule
requires:
  - id: task-shaping-rules-draft
    source: prompt:extract-the-task-shaping-rule-1
  - id: story-shaping-rules
    source: prompt:extract-the-task-shaping-rule-4
produces:
  - id: task-shaping-rules-file
    location: student-picked (./CLAUDE.local.md, ~/.claude/CLAUDE.md, or notes folder)
    consumed-by:
      - prompt:extract-the-task-shaping-rule-3
      - module:run-the-first-experiment
---
Let's decide together where we store this for optimal use in future. Propose two or three plausible paths with their loading models — fires-anywhere-on-this-laptop vs fires-only-when-this-repo-is-open — and tell me which one you'd pick for these rules and why. I'll confirm or steer.

Once we agree, write both sets into that file: the session rules in the wording I sharpened, and the story rules you read off the ticket. If a file already exists at that path, integrate into it. Don't append and don't replace it; it may already hold rules from an earlier session and those stay.

After saving, show me the first three rules from the file so I can confirm the wording stuck.
