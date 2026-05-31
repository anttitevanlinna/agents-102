---
key: diagnose-and-resend-3
dest: Claude Code
runtime: any
origin: exercises/diagnose-and-resend
requires:
  - id: three-failure-lens-read
    source: prompt:diagnose-and-resend-2
produces:
  - id: validation-mapping
    location: scrollback (each failure mapped to re-readable-spec / working-doc / automated-check)
    consumed-by:
      - prompt:diagnose-and-resend-4
      - prompt:diagnose-and-resend-6
---
For each of the three failures we just named, walk it backwards: what specific validation would have caught it in minutes, not hours?

Practitioners running multi-hour coding agents in the last six months converge on three validation categories. Use these as the answer shape:

- A re-readable spec: scope + success criteria + constraints the agent can diff its in-progress work against, mid-run. Holds the goal pinned down when the conversation grows.
- A working document the agent owns and updates: durable state the agent re-reads when its working window fills. Phase breakdown, current-phase marker, decisions log, what-didn't-work list. Survives compaction.
- An automated check on produced work: tests, lint, compile, a deterministic hook, or an LLM judge. Fires on agent output and decides pass/fail against a quality bar.

For each failure I diagnosed, map it to the validation category that would have caught it. Be specific: not "a re-readable spec" generically, but what THAT spec would have said to catch THIS particular goal-drift moment. Name when the validation would have fired (start of run, mid-run, end-of-task, on commit).

Don't name frameworks or practitioners by label ("Ronacher's three-pattern," "Huntley's Ralph," etc.) — walk from the specific failure to the specific validation. The naming happens later.
