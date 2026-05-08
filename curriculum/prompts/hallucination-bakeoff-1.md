---
key: hallucination-bakeoff-1
dest: Claude Code
runtime: any
origin: exercises/hallucination-bakeoff
---
Spawn one subagent to create the benchmark target.

The briefing is the test corpus. Aim for roughly 10% fabrication or misrepresentation so the detectors have something to catch. You cannot make that number precise. Treat it as a direction, not a target metric.

Instructions for the subagent:
- Use the strategic question in `./crux.md` under `## Question`.
- Use the material in `module-3/stances/`.
- Choose a bounded evidence roster before writing the briefing. Start from curated topic pages in `memory/`. Add raw files from `sources/` only when a memory page points to them or the challenge clearly needs the underlying source. Use at least 5 and at most 20 files total.
- Save the roster to `module-5/evidence-roster.md` with each selected file path, whether it is curated memory or raw source, and a one-line reason it belongs.
- Use only the rostered evidence files as the evidence surface for the briefing.
- Produce a one-page briefing on the challenge.
- Include three specific named entities relevant to the challenge (companies, teams, systems, customers, products, policies, or people).
- Include at least two verbatim quotes from rostered evidence files.
- Include at least one number or measurable claim.
- Include two claims that use outside/common knowledge beyond the files.
- Include a next action with a measurable outcome.
- Where the sources do not cover something, blend in general knowledge. Do not hedge.
- Do not browse the web.
- Save the briefing to `module-5/briefing.md`.

When the subagent finishes, do not summarize the briefing in chat. Only confirm that `module-5/evidence-roster.md` and `module-5/briefing.md` exist.
