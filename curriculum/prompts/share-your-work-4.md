---
key: share-your-work-4
dest: Builder Claude
runtime: any
origin: exercises/design-the-sharing-plan
requires:
  - id: m7-jtbd
    source: artifact:m7-jtbd
  - id: m7-branch
    source: external
  - id: m7-bottleneck
    source: prompt:share-your-work-3
produces:
  - id: m7-technical-plan
    location: module-7/technical-plan.md
  - id: m7-people-plan
    location: module-7/people-plan.md
---
Read module-7/jtbd.md, module-7/branch.md, and module-7/absorption-bottleneck.md. Draft two files in
parallel now — a technical plan and a people plan. Both are about whether this
teammate can actually fire their current hire and start using my candidate.

If either plan already exists, read it first and revise it in place. Preserve
supported detail; replace only what the current JTBD, branch, or bottleneck
evidence changes.

File 1: module-7/technical-plan.md — how the candidate delivers the outcome.
- What exactly I ship (files, skills, config, runtime).
- How the teammate receives it (zip, repo, connector, invite).
- What "it moves the outcome metric for them" looks like — concrete, measurable.
- The first real test case they'd run, against the job from the JTBD brief.

File 2: module-7/people-plan.md — equally load-bearing. Cover all five:
- Ownership: named person accountable. Not a role.
- Governance: who can add to the memory, change the rules, see the output.
- Operating: who notices when the outcome metric slips. What they do about it. If the obvious name is also the person who benefits most, name a second person who'd notice independently — otherwise the only alarm is the person with a reason to silence it.
- Accountability: who decides the candidate is no longer doing the job — who
  fires the hire.
- Propagation: who teaches the next person, when.

Ask only for a detail that blocks the draft. Don't invent names. If I don't know, write
"UNASSIGNED — Monday's question" and keep moving. Missing names are findings,
not failures.

Show me both before saving.
