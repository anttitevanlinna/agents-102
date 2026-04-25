# M3 (earn-the-trust) — pre-ship eval

Target: `curriculum/trainings/agentic-engineering-101/earn-the-trust.md`
Cycle focus: relocation of the team-worthy flag instruction from a mid-Job-1 prose aside into the closing reporting requirement of the Debrief prompt.

## File-level verdict

**APPROVE WITH TODOs.** The Debrief still delivers the "team-worthy is your call, not Claude's" pedagogical move, the relocation is internally consistent with Job 1's mechanics, and no essential judge fails — but two contributory items (em-dash discipline in body, plus a soft ambiguity on what the integrate-don't-append boundary covers in Job 2) warrant maintainer-block TODOs before first cohort.

## Essential judges

### Mood fidelity (M3 mood: earned trust through hardening + skill-authoring)
**APPROVE.** The Debrief carries the mood pickup cleanly. *"You earned the first two signatures. Your staff engineer sees a test-strategy skill tuned to this codebase, your CISO sees a STRIDE decision with an ADR"* (Bridge, line 84) — that's earned-trust spoken aloud, not theatrical. The Debrief prompt's two-job structure (codebase pattern → sharpen authored skill) keeps the student in the seat that earned the trust, with Claude as reviewer not author. Maintainer mood-target line (99) explicitly calls the mood and names the diagnostic for drift.

### LO match — Debrief delivers named LOs
**APPROVE.** Debrief touches the load-bearing LOs:
- *"Author a test-strategy skill through conversation"* → Job 2 sharpens the authored skill from session evidence.
- *"Evaluate the authored skill by asking it to disclose its own weakest part, then pushing back on the critique"* → push-back instruction line 80 (*"Push back on the summary; quote the session moment when something's wrong"*).
- *"Ship one authored skill personal-first, and know when it's a team PR"* → relocated team-worthy flag in the closing 3–5 line report directly addresses the *"know when it's a team PR"* half of the LO. This is the cycle's specific gain: the LO now has explicit Debrief-side delivery it lacked before.
- *"Discriminate when a job belongs in a subagent vs the main thread"* — covered upstream in Ex1/Ex2/Ex3, not Debrief; appropriate.

### Banned-word clean (per check_writing.md)
**APPROVE.** One grep hit on `practice` (line 132, *"composite practice"*) but it sits in the maintainer block (cut at line 94) and is adjective-use, not the activity-noun the ban targets. No `honest`, `delve`, `crucial`, `importantly`, `substrate`, `ritual`, `ceremony`. The Big Idea uses *"the way I work with my agent"* construction throughout — the practice-as-noun fix from the prior eval cycle held.

### Student-POV consistency (always "you", never "the student")
**APPROVE.** Body reads in second person throughout. *"Before the agent runs bigger work alone, earn your staff engineer's and CISO's trust on a small piece you're shipping this week"* (Big Idea). The Debrief prompt is first-person (*"I"*) since it's the student speaking to Claude — correct register for a copy-paste prompt block. Maintainer block uses *"the student"* — appropriate, that's trainer-POV.

### No placeholders in fenced prompts
**APPROVE.** The Debrief fenced block (lines 60–77) contains zero `[BRACKETS]`. Every reference is a back-reference to session artifacts (*"the access-control skill's output,"* *"the ADR I wrote,"* *"the test-strategy skill file I authored,"* *"the scrollback for decisions I made"*) — exactly the chain-by-back-reference pattern check_prompts §5 requires. The path `./CLAUDE.local.md` is deterministic and consistent across Job 1 and the closing requirement.

### Skill invocation by name (check_prompts.md §4)
**APPROVE for the Debrief prompt.** The Debrief prompt references *"the access-control skill"* and *"the STRIDE skill"* by their installed names, no paths. The Meta block (line 10) names the install paths but that's trainer-facing prose describing what ships, not a copy-paste prompt — exempt.

### Delivery architecture: AE101 = student's own repo, no module-folder prefixes, `./` on CLAUDE.local.md
**APPROVE.** This is the cleanest essential pass. The Debrief writes to `./CLAUDE.local.md` (Builder-scope, gitignored, personal — line 72). No `module-3/` prefix anywhere. The maintainer line 100 explicitly calls the architecture: *"all compounding artifacts (ADR, authored skill, `CLAUDE.local.md` update) live in the student's real repo… no training-dir state."* The team-promotion path is named as a separate human-coordinated PR (line 100), not auto-PR'd — matches the pre-engagement contract and the Builder-scope rule precisely.

## Contributory judges

### Tech terms earned on first use
**APPROVE.** AE101 is engineer audience; SKILL.md, ADR, STRIDE, webhook, gitignore, scrollback are all native register. STRIDE earns its full name in the lecture (per the eval instance); ADR is named with its convention naturally in flow.

### Prompt action lead-in (check_prompts §2)
**APPROVE.** Line 56: *"Ask Claude to review the session, integrate one codebase-specific pattern into `CLAUDE.local.md`, and sharpen the authored test-strategy skill from session evidence."* — semantic, command-verb, under 30 words, summarizes the two jobs the prompt does. Lands.

### Em-dash discipline in body prose (check_student_facing §14)
**APPROVE WITH TODO.** Three em-dashes in student-facing body:
- Line 72 (inside fenced prompt — exempt because it's the student's voice to Claude, not narrative prose).
- Line 90 (Pre-reads): *"Read — Simon Willison, [The lethal trifecta…]"*
- Line 92 (Pre-reads): *"Optional deeper scan — [OWASP Top 10…]"*

The Pre-reads dashes are the structural "label — link" pattern and are arguably on the bubble; check_student_facing §14 extends the site ban to *all* student-facing curriculum. Replaceable with colons (*"Read: Simon Willison…"*). **TODO for first cohort polish, not blocker.**

### Link format (target title, not filename) — check_student_facing §18
**APPROVE.** Lecture and exercise links use sentence-case titles (*"Skills from the frontier, skills of your own,"* *"Map the access surface,"* etc.). Pre-read links use the article's actual title. No code-span paths in body.

### Vocabulary discipline (LLM/agent/Claude — check_student_facing §21)
**APPROVE.** Body uses *agent* for acting-context (*"Before the agent runs bigger work alone"*) and *Claude* for conversational counterpart (*"conversation with Claude"*). No conflation, no chatbot drift.

### Action-verb section headers (check_student_facing §17)
**APPROVE.** *"What You'll Learn,"* *"Connections,"* *"Lectures,"* *"Exercises,"* *"Key Concepts (Emergent),"* *"Debrief,"* *"Bridge,"* *"Pre-reads before M3"* — module-level section headers follow the canonical module shape from `curriculum/CLAUDE.md`. Acceptable as declarative scaffold per §17 ("Lectures and reference sections may use declarative noun-phrase headers").

## Special check — team-worthy flag relocation

**APPROVE.** The relocation is a clean improvement.

**Does the Debrief still deliver the "team-worthy decision is yours, not Claude's" pedagogical move?** Yes — and arguably more cleanly than before. The closing report requirement (line 76) says: *"the pattern you named in `./CLAUDE.local.md` and whether it's team-worthy (one every engineer on this codebase would benefit from)."* That's Claude reporting its read of team-worthiness, with the implicit handoff to the student to override. Reinforced by the post-prompt instruction (line 80): *"Any team-worthy flag is your decision; nothing auto-PR'd."* — the explicit ownership transfer happens in student-facing prose right under the prompt, where the student reads it after running.

**Does the relocated flag conflict with anything earlier in the prompt?** No. Job 1 (line 72) tells Claude to integrate a *named pattern* into `./CLAUDE.local.md` — the writing happens locally, no team scope mentioned. The closing requirement then asks Claude to *report* whether the pattern it just wrote is team-worthy. Write-then-assess is the right order; the previous mid-Job-1 placement risked the flag being read as a precondition on what gets written, which would have leaked team-promotion semantics into the personal-file write.

**Does it match the AE101 strategy doc's Debrief contract?** Maintainer line 100 names the contract: *"team-worthy rules get flagged for separate PR against team `CLAUDE.md`"* and *"authored skill ships personal-first… with sponsor-stated team-kit home as the eventual destination via human conversation (not an auto-PR)."* The relocated flag delivers exactly that contract — Claude flags, student decides, human-coordinated promotion follows separately. Match.

**Is the integrate-don't-append rule for Job 2 still clear?** Mostly. Line 74 carries it: *"Integrate, don't append."* Soft ambiguity: the integrate-don't-append rule was originally written for the rules-file rewrite (Job 1's `CLAUDE.local.md`); Job 2 (sharpening the authored test-strategy skill in place) inherits the same instruction by adjacency. A first-cohort reader could plausibly wonder whether *"integrate"* in Job 2 means rewrite-in-place (correct interpretation) or merge-into-Job-1's pattern (incorrect). Worth a one-line maintainer note clarifying Job 2's integrate-don't-append targets the SKILL.md file, not the `CLAUDE.local.md` rule. **TODO, not blocker.**

## TODOs (log in maintainer block)

- **Em-dashes in Pre-reads (lines 90, 92):** replace `Read — ` and `Optional deeper scan — ` with colon form (`Read: `, `Optional deeper scan:`) before first cohort. Extends check_student_facing §14 ban consistently.
- **Job 2 integrate-don't-append clarification:** add a maintainer note that *"Integrate, don't append"* in Job 2 (line 74) refers to rewriting the test-strategy SKILL.md in place, not merging Job 2's edits into Job 1's `CLAUDE.local.md` pattern. Pre-empts a plausible first-cohort misread.
- **Watch-for first-cohort signal:** maintainer block already names "Debrief generic rule" pushback (line 110) — verify in first sim that the relocated team-worthy flag doesn't pull Claude toward generic team-vs-personal pronouncements rather than codebase-grounded ones. If drift observed, sharpen the flag wording from *"one every engineer on this codebase would benefit from"* to *"one every engineer on this codebase would have hit, given today's session evidence."*

## Summary

- **File-level verdict:** APPROVE WITH TODOs.
- **REVISE-grade essentials:** 0.
- **TODOs:** 3 (em-dash polish, Job 2 integrate-clarification maintainer note, first-cohort watch-for signal).
