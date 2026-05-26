# Will company memory emerge?

You just walked your whole system against a real task and sent it off. The persistent part of what you walked, the rules and notes and skills that outlast the session, is what this training calls memory.

The word is not settled. Some practitioners call it context. Others use neither and just say rules, or the files. The labels collide for a reason worth knowing: context already names something else, the live window the agent holds while it works, the part that empties when the session ends. Memory is what survives. Same thing, different camps, no winner yet.

Pick whichever word you'll defend. The label matters less than the two questions it hides: where does this stuff live, and who is allowed to change it? Walk those across what you sent off, and three layers appear.

**Personal.** `./CLAUDE.local.md` (gitignored), your `observations/`, the skills you authored. Written by you, for you. This is the layer you've watched compound since Module 1.

**Team.** `./CLAUDE.md`, changed only through PR review. The rules the team agreed were worth sharing. It has a clear home and a clear gate.

**Company.** No obvious file. The security convention every team re-learns on its own, the deployment pattern, the house style. Today it lives in wikis nobody opens and in the heads of whoever has been there longest.

So the question underneath the walk: does the third layer get a real home, the way the first two already have?

Some teams are starting to act as if it will. They git-track their rules instead of keeping them on one laptop. They symlink a shared skills folder so the same rules load wherever an engineer works. If a company's conventions live as memory that loads everywhere, every agent in the building starts from the same baseline instead of relearning it one session at a time.

The hard part is not whether to build it. It is the shape. A company layer done wrong is a tax: memory loaded everywhere, owned by no one, the `CLAUDE.md` equivalent of the staff handbook nobody reads. The question that matters is the smallest shared layer that survives contact with a real org.

Nobody has cracked the shape yet, and nobody has settled the word. The personal layer clearly compounds, and you have the evidence in your own `observations/`. The team layer has a home. The company layer is the one still being worked out, in the places betting on it.

You'll meet the answers in your own org before any framework hands them to you. The first time a rule you wrote for yourself turns out to be true for the whole company, you decide what to call it and where it goes. That is the open question.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-24 (writing@4c539ba story@4c539ba technical@4c539ba behavior@4c539ba pedagogy@4c539ba strategy@4c539ba)
- judges @4c539ba: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS

**Lecture meta:** *~3-4 min. Module 4 closing lecture. Fires AFTER the send-off, while the agent runs, the reflective coda over the launched run. Names the layering the student just walked (personal / team / company) and opens the company-layer question as a live debate. It does NOT resolve the question, and it does NOT touch how the run will go (that is `reading-the-return`'s M5-prep job, so the Module 4 to Module 5 cliffhanger holds). Meta-frame closer per `check_lectures.md` #1: recognition after the walk, not an abstract claim before it. Opens on the naming terrain (memory / context / rules), deliberately unsettled; the trainer lays out how the terms fit and runs the disagreement as a live discussion, landing nothing. Overlaps the send-off wait, so it adds little to the M4 critical path.*

**Why tentative, and where the tentativeness lives.** The company layer is a believed direction, held by practitioners and inside the project, not a fringe dogfood aside. What is NOT yet figured out is the shape: how a company layer stays small enough to be real, who owns it, how it loads. So the open question in body is the HOW, not the WHETHER. Two threads are deliberately left open in body: the company-layer shape, and the word itself; neither is settled here. Claim-discipline still holds: don't assert a settled implementation shape in body as if the field had converged on one. `training-architecture.md` § Rule files remains the authority on what AE101 actually ships today (team `./CLAUDE.md` + personal `./CLAUDE.local.md`, no company layer yet).

**Vocabulary.** Surfaces the naming disagreement openly instead of defending one word. States the memory/context distinction precisely (context = the live runtime window that empties at session end; memory = what persists), per `check_student_facing.md` §4. Does NOT adopt the run feedback's "rename to context" (it would break that split and collide with Claude Code's auto-memory namespace) but does NOT pretend the word is settled either. The student picks the label; the lecture holds the distinction. The training-wide memory→context decision stays parked; this lecture opens the room-level conversation only.

**Voice.** Martin (frame the move and its alternative) leads; Rory carries the reframe (more shared memory is not automatically better). Risto does NOT lead. The Module 4 to Module 5 gap holds the run's unease open, and forward-optimism would resolve the doubt M5 cashes in.

**Does not steal M6.** M6 teaches the kit, second-skill authoring, and evals. This lecture poses a layering question the curriculum has not decided and M6 does not answer either. No pre-teaching.

**Source note.** The observable moves named (teams git-tracking rules, symlinking a shared skills folder) are general practitioner practice, kept deliberately unattributed and uncounted. If a concrete company example is wanted (e.g. a named skill-marketplace pattern), it needs a verified within-6-months source before it lands in body.
