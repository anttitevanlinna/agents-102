---
key: share-your-work-1
dest: Builder Claude
runtime: any
origin: exercises/share-your-work
requires:
  - id: challenge-sources
    source: prompt:build-your-challenge-memory-2
  - id: m3-curated-memory
    source: prompt:three-retrievers-one-curator-5
  - id: m5-evidence-artifacts
    source: prompt:hallucination-bakeoff-8
  - id: m6-run-artifacts
    source: prompt:eval-loop-2
produces:
  - id: m7-jtbd
    location: module-7/jtbd.md
---
Read my memory/, sources/, module-3/, module-5/, and module-6/.

Based only on what you find there, draft a Jobs-to-be-Done hypothesis for a
sharing decision I'm working on. Cover four things:

1. The one teammate (named if my memory names them) most likely to benefit from
   what I've built.
2. The job they're trying to get done — in their language, not mine. Functional
   part, and at least one emotional or social part (anxiety, reputation,
   dependency on someone else).
3. Their current hire for this job — what they use today. Excel, a colleague,
   their gut, a vendor tool, nothing. Every job already has an incumbent.
4. Three candidate outcome vectors — what "better" would mean for them:
   - Speed (same job, faster)
   - Quality (same job, less variance, better output)
   - Other — inferred from my context, not assumed. Something specific:
     dependency removed, anxiety reduced, scope they could take on, workload
     shifted, loyalty to an incumbent preserved, reputation protected, a
     recurring meeting they could stop attending.

Then use your ask-questions tool to confirm or correct each piece. Ask one
question, wait for my answer, then ask the next. Do not show the remaining
question list. Ask five to eight questions total, each with three or four
options drawn from my memory. I'll pick.
Don't ask me to type freeform answers — the point is that you already have most
of this on disk.

When I'm done picking, write module-7/jtbd.md with:
- The teammate (named).
- The job, in their language, with functional + emotional/social components.
- The current hire and what's broken about it.
- The outcome statement in this form: "minimize/increase [metric] when [doing
  the job]." Pick the vector that cuts deepest — not all three.

Anchor every claim to a specific file and line in my memory, plus the questions
I answered. Show me the file before saving.
