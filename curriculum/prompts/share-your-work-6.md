---
key: share-your-work-6
dest: Builder Claude
runtime: any
origin: exercises/test-the-sharing-plan
requires:
  - id: m7-jtbd
    source: artifact:m7-jtbd
  - id: m7-technical-plan
    source: prompt:share-your-work-4
  - id: m7-people-plan
    source: prompt:share-your-work-4
  - id: m7-assumptions
    source: prompt:share-your-work-5
produces:
  - id: m7-artifacts
    location: module-7/jtbd.md, module-7/branch.md, module-7/absorption-bottleneck.md, module-7/technical-plan.md, module-7/people-plan.md, module-7/assumptions.md, module-7/failure-stories.md
  - id: m7-monday
    location: module-7/monday.md
---
It is six months from now. My teammate
kept using their current hire. My candidate sat unused, or they tried it twice
and fired it.

Read module-7/jtbd.md, module-7/technical-plan.md, module-7/people-plan.md, and
module-7/assumptions.md.

Write three failure stories, each a short paragraph:
- Most likely social failure — about the incumbent, the teammate, the
  workflow. "They trust their own spreadsheet more than any agent output" is
  usually closer than "it broke technically."
- Most likely technical failure — what broke, how it broke.
- The failure I'm not seeing — bias your thinking toward what I seem to be
  assuming will go fine.

For each story, one sentence: the early warning sign I'd see in week two if
this were starting to happen.

Save to module-7/failure-stories.md.

Then write module-7/monday.md with exactly three entries:
- The named teammate I will talk to first.
- The one question I will ask about their job. It must ask how they do the job
  today, not whether they want my agent.
- The first assumption marked "SELECTED THIS WEEK" in
  module-7/assumptions.md and the concrete test I will run.

Before saving module-7/monday.md, challenge one thing: is the outcome in
module-7/jtbd.md really the teammate's outcome, or my builder's wish dressed in
their language? If the evidence supports a correction, update the outcome and
any dependent Monday entry. Show me both files before saving.
