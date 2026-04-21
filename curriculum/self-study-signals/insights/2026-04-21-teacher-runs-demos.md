**Context:** Two-Claude design refinement, 2026-04-21.

**Signal:** The two-Claude split (Teacher coaches / Builder executes) was over-applied. Both Claudes can run prompts; the right split isn't *who runs what tool* but *who's the audience and who owns the artifact*.

**Reframe:**
- **Teacher runs illustrative/demo prompts** — anywhere the student is meant to *watch*, not operate (the Context-is-King two-prompt comparison, lecture demos, side-by-side runs). Teacher is the model in the demo; the student reads the conversation unfold. No file lands in training-dir.
- **Builder runs the student's exercise work** — anywhere the artifact has to be the student's own (personal site, memory pages, agents, eval runs, audits, debrief artifacts). Files land in training-dir. The student is the operator; that's what makes the work theirs.

**Split test:** *"Does the file land in the training-dir?"* Yes → Builder. No → Teacher.

**Why this is right:**
- In a cohort the trainer runs the demo on the projector; the student watches. Self-study collapsed that into the student running it themselves in Builder, which destroyed the watch-vs-do distinction. Letting Teacher run the demo restores the distinction.
- It also gives Teacher a more concrete role beyond facilitation talk — first agentic event of every lecture is Teacher *doing* something the student observes.

**Codified in self-study SKILL.md:**
- New section "What Teacher runs vs. what Builder runs" with the split test and execution-mode discipline (clean demarcation, no facilitator commentary mid-demo).
- C2/C3 lecture handling updated: lecture demos are Teacher's to run, not Builder's.

**Test next:** Antti runs Module 1 lecture (Context is King) in self-study, sees Teacher execute the two-prompt demo inline. If it lands, sweep other lectures for demo prompts that should be Teacher-run. Currently the lecture file probably tells the *student* to run the demo — needs an update to "Teacher runs this" once we confirm the pattern.
