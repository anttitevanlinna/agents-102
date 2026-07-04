# Will company memory emerge?

You just walked your whole system against a real task and sent it off. The persistent part of what you walked, the rules and notes and skills that outlast the session, is what this training calls memory.

## Personal, team, company: memory's three layers

- **The word is not settled.** Some practitioners say memory, some say context, some just say rules, or the files. The labels collide for a reason worth knowing: *context* already names the live window the agent holds while it works, the part that empties when the session ends. Memory is what survives. Pick whichever word you'll defend.
- **The two questions the label hides: where does this stuff live, and who is allowed to change it?** Walk them across what you just sent off, and three layers appear.
- **Personal.** `./CLAUDE.local.md` (gitignored), your `observations/`, the skills you authored. Written by you, for you. The layer you've watched compound since your first rule.
- **Team.** `./CLAUDE.md`, changed only through PR review. The rules the team agreed were worth sharing. A clear home and a clear gate.
- **Company.** No obvious file. The security convention every team re-learns on its own, the deployment pattern, the house style. Today it lives in wikis nobody opens and in the heads of whoever has been there longest.

## The company layer's open question is its shape

- **Does the third layer get a real home, the way the first two already have?** The personal layer clearly compounds; the evidence sits in your own `observations/`. The team layer has a home and a gate. The company layer is the one still being worked out, in the places betting on it.
- **Some teams are starting to act as if it will.** They git-track their rules instead of keeping them on one laptop; they symlink a shared skills folder so the same rules load wherever an engineer works. If a company's conventions live as memory that loads everywhere, every agent in the building starts from the same baseline instead of relearning it one session at a time.
- **The hard part is not whether to build it. It is the shape.** A company layer done wrong is a tax: memory loaded everywhere, owned by no one, the `CLAUDE.md` equivalent of the staff handbook nobody reads. The question that matters is the smallest shared layer that survives contact with a real org.
- **You'll meet the answers in your own org before any framework hands them to you.** The first time a rule you wrote for yourself turns out to be true for the whole company, you decide what to call it and where it goes. That is the open question.

<!-- maintainer -->

**Slides-only pass (2026-07-02, unaudited):** prose deleted outright where a slide supersedes it (Path A; git carries it). Per-passage verdicts: opening walked-and-sent paragraph KEPT as the closer's setup lede (two sentences; earns "memory" in one breath before the slides use it) · naming-terrain paragraphs CONVERTED (slide-1 bullets 1–2; "no winner yet" folded into "pick whichever word you'll defend") · three-layer list CONVERTED near-verbatim (slide-1 bullets 3–5); "since Module 1" → "since your first rule" (§3 fix: the lived moment, not the module number) · third-layer question + teams-acting + tax paragraphs CONVERTED (slide 2) · "Nobody has cracked the shape yet, and nobody has settled the word" summary line SUBSUMED (both halves already live in their bullets) · closing you'll-meet-the-answers paragraph CONVERTED as slide-2 final bullet. §3 disposition: 1×"Module 1" ref dead; zero `M[0-9]` above the fence.

**Quality:** compendium-audited 2026-05-26 (writing@0ef2ca6 story@0ef2ca6 technical@0ef2ca6 behavior@4c539ba pedagogy@4c539ba strategy@4c539ba) — predates the slide rework; re-audit before ship.
- judges @0ef2ca6: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS

**Lecture meta:** *~3-4 min, now deck-shaped (lede + 2 slides). Module 4 closing lecture. Fires AFTER the send-off, while the agent runs, the reflective coda over the launched run. Names the layering the student just walked (personal / team / company) and opens the company-layer question as a live debate. It does NOT resolve the question, and it does NOT touch how the run will go (that is `reading-the-return`'s M5-prep job, so the Module 4 to Module 5 cliffhanger holds). Meta-frame closer per `check_lectures.md` #1: recognition after the walk, not an abstract claim before it. Opens on the naming terrain (memory / context / rules), deliberately unsettled; the trainer lays out how the terms fit and runs the disagreement as a live discussion, landing nothing. Overlaps the send-off wait, so it adds little to the M4 critical path.*

**Why tentative, and where the tentativeness lives.** The company layer is a believed direction, held by practitioners and inside the project, not a fringe dogfood aside. What is NOT yet figured out is the shape: how a company layer stays small enough to be real, who owns it, how it loads. So the open question in body is the HOW, not the WHETHER. Two threads are deliberately left open in body: the company-layer shape, and the word itself; neither is settled here. Claim-discipline still holds: don't assert a settled implementation shape in body as if the field had converged on one. `training-architecture.md` § Rule files remains the authority on what AE101 actually ships today (team `./CLAUDE.md` + personal `./CLAUDE.local.md`, no company layer yet).

**Vocabulary.** Surfaces the naming disagreement openly instead of defending one word. States the memory/context distinction precisely (context = the live runtime window that empties at session end; memory = what persists), per `check_student_facing.md` §4. Does NOT adopt the run feedback's "rename to context" (it would break that split and collide with Claude Code's auto-memory namespace) but does NOT pretend the word is settled either. The student picks the label; the lecture holds the distinction. The training-wide memory→context decision stays parked; this lecture opens the room-level conversation only.

**Voice.** Martin (frame the move and its alternative) leads; Rory carries the reframe (more shared memory is not automatically better). Risto does NOT lead. The Module 4 to Module 5 gap holds the run's unease open, and forward-optimism would resolve the doubt M5 cashes in.

**Does not steal M6.** M6 teaches the kit, second-skill authoring, and evals. This lecture poses a layering question the curriculum has not decided and M6 does not answer either. No pre-teaching.

**Source note.** The observable moves named (teams git-tracking rules, symlinking a shared skills folder) are general practitioner practice, kept deliberately unattributed and uncounted. If a concrete company example is wanted (e.g. a named skill-marketplace pattern), it needs a verified within-6-months source before it lands in body.

- section-3 sweep 2026-07-02: 2 refs judged, 0 fixed, 0 carve-out. "since your first rule" (body) = lived-arc phrasing, already the §3-compliant fix of the former "since Module 1" (converted in the slides-only pass); "you just walked... and sent it off" (lede) = within-module closer setup, not cross-module sequencing. Zero `M[0-9]`/module-name hits above the fence.
