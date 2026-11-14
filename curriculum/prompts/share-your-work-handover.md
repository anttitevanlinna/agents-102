---
key: share-your-work-handover
dest: Builder Claude
runtime: any
origin: exercises/share-your-work
requires:
  - id: authored-security-skill
    source: prompt:author-security-skill-3
  - id: challenge-agent
    source: prompt:build-your-challenge-memory-5
produces:
  - id: m7-handover
    location: module-7/handover.md
    note: written on the neighbour's system, sent back, saved by the sender
---
My neighbour handed me two files: a skill and an agent's instructions. They are in handover-in/. Their memory and sources stayed with them.

Run both on my system, on a real piece of my own work. Do not fix either file first.

Then write the report my neighbour gets back. Use exactly these headings:

## Received
The two file paths and the coding agent you ran them in.

## Skill
What you ran it on. Worked, partly worked, or broke. Why, quoting the line that decided it.

## Agent
What you ran it on. Worked, went generic, or failed. What I needed from it and could not get. Name every file or folder it reached for that I don't have. Quote the line in its instructions that assumed my neighbour's own memory or files.

## What would have travelled
One of: the context, a skill, the output, a way to ask it. One line on why.

Save as handover-out.md and show it to me. I send it back; my neighbour saves it as module-7/handover.md.
