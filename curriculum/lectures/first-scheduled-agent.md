# Demo: 1st scheduled agent

The demo is small on purpose. One scheduled agent reads a bit of work context, follows one hard guardrail, and takes one safe action: it writes an output you can inspect.

The context might be a calendar, a short note, or a file in the training folder. The guardrail is simple: propose or draft only, do not send, edit, book, or change anything. The schedule gives the agent a pulse: it runs again without a fresh prompt and writes the next result in the same place.

That is the first system boundary. Context tells the agent what world it is in. The guardrail tells it what not to do. The schedule makes it come back. Module 2 uses the same three ingredients for your challenge memory.

**Time:** 3-5 minutes.

<!-- maintainer -->

**Quality:** draft 2026-04-30

**Role in Module 2:** Short trainer demo before the main memory exercise. Shows context + guardrail + schedule as the smallest visible agent system. Keep proposal-only unless runtime support and cohort permissions are verified.
