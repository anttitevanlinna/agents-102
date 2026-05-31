---
key: spot-gaps-build-the-loop-study
dest: Claude Code
runtime: any
origin: exercises/spot-gaps-build-the-loop
requires:
  - id: two-run-gap-map
    source: prompt:spot-gaps-build-the-loop-1
produces:
  - id: repeated-work-inventory
    location: scrollback (the kinds of work that recur across my stack, grouped, with a quoted instance or two per group)
    consumed-by:
      - prompt:spot-gaps-build-the-loop-shapes
---
Go through my work across everything I do, not just this repo. I want to see the kinds of work I do over and over.

My Claude Code sessions across every project live under `~/.claude/projects/`, one folder per repo I've worked in. Read across them. If there are other repos you should look at that aren't in there, ask me where they are.

Group what you find by the kind of work it is, the way of working that repeats, not the feature. For each group, give it a short name and quote an instance or two so I can see it's real. Don't filter to what looks important. Show me what actually recurs, including the dull stuff. Rank the groups by how often they show up and give me the top six or so, the ones I actually repeat, not the ones that look impressive.
