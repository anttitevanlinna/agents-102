---
key: hallucination-bakeoff-1-frozen
dest: Claude Code
runtime: any
origin: exercises/hallucination-bakeoff
requires:
  - id: m3-briefing-baseline
    source: prompt:three-minds-one-synthesis-4
  - id: m3-agent-work
    source: artifact:m3-agent-work
  - id: m3-curated-memory
    source: prompt:three-retrievers-one-curator-5
produces:
  - id: m5-evidence-roster
    location: module-5/evidence-roster.md
  - id: m5-briefing
    location: module-5/briefing.md
---
Spawn one subagent to set up the benchmark target.

The target is the Module 3 briefing as it was, unchanged.

Instructions for the subagent:
- Read the strategic question under `## Question` in `module-3/briefing-baseline.md`. Do not open the rest of the file yet.
- Choose a bounded evidence roster from that question alone. Start from curated topic pages in `memory/`. Add raw files from `sources/` only when a memory page points to them or the question clearly needs the underlying source. Use at least 5 and at most 20 files total.
- Save the roster to `module-5/evidence-roster.md` with each selected file path, whether it is curated memory or raw source, and a one-line reason it belongs.
- Then copy the `## Answer` section of the file word for word to `module-5/briefing.md`. Do not fix, extend or reword it.
- Do not browse the web.

When the subagent finishes, do not summarize the briefing in chat. Only confirm that `module-5/evidence-roster.md` and `module-5/briefing.md` exist.
