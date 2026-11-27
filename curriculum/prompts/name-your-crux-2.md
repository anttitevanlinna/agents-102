---
key: name-your-crux-2
dest: Claude Code
runtime: any
origin: exercises/name-your-crux
requires:
  - id: crux-md
    source: prompt:name-your-crux-1
produces:
  - id: crux-md
    location: ./crux.md (append Question section)
---
Open ./crux.md and read the crux you just saved. What is the sharpest decision this crux blocks for me? One sentence: a real call I would stay late to make, not a topic or a summary. "What's the right next move to unblock the crux over the next 90 days?" is a decent default. "Should we kill option A?" is better if my memory shows I am at that point.

Append a `## Question` section to ./crux.md with the decision question. Leave the crux above as it is. Show me before saving.
