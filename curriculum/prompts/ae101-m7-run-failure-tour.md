---
key: ae101-m7-run-failure-tour
dest: Claude Code
context: M7 unattended-agent failure tour
runtime: any
origin: exercises/build-and-prove-agent-platform
produces:
  - id: m7-failure-tour
    location: docs/agent-platform/failure-tour.md
---
Set up and walk me through the supplied unattended-agent failure lab. Do not redesign it yet.

Use the shipped lab at `~/Documents/ae101-content/labs/unattended-agent/` in place. If that path is missing, stop and report the missing prerequisite. Do not copy, edit, or generate a replacement lab.

Run its test suite once. If the baseline does not pass, stop and report the failing command and output. Do not repair the baseline during this phase.

The lab has four named faults: `effect-without-authorization`, `duplicate-effect`, `effect-after-timeout`, and `raw-sensitive-payload`. Walk them one at a time. Before each run, ask me which invariant should reject the fault, which component should own that invariant, and what unsafe outcome follows if the boundary accepts it. Wait for my answer. Then run only the fault you just named with `npm run tour --` followed by its exact name, show the boundary's actual reason plus the unchanged state or trace count, and ask me to reconcile my prediction with the result before continuing.

Write `docs/agent-platform/failure-tour.md`. For each fault, record my prediction, the actual rejection, the boundary that owns the decision, and one production question the local lab does not answer. End with the three distinctions the later design must preserve: worker versus platform, proposal versus authorization, and tool completion versus verified outcome.

Do not edit the lab, search the internet, or write an architecture yet. In chat, return only the baseline result, the four rejection reasons, and the path to the failure-tour record.
