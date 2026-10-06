# APT101 handbook r1 — storytelling judge 3 (paired: A = AE101, B = APT101)

## Running notes

### A M1
- Frame seeds: "The LLM mirrors your stance" / "Your stance is the ceiling" (painting-the-picture); "Two frontiers: how fast, and the right things"; machine-you-just-met: sycophancy mechanism, error cascade, "A check from outside the session resets the chain"; compound engineering (Klaassen) as the loop.
- Voice: second person, terse, edgy ("The wizard typing in neat Perl syntax is dead"). Narrator in lines, not passages.
- Stance: "Assume about 10% of what it says or does is made up"; "its agreement settles nothing"; "The report is a hypothesis to check, not ground truth"; mechanism-defended (preference tuning).
- Self-doubt: escape-hatch box; "a summary that arrives fast and reads clean has usually covered the last few turns".

### A M2
- Frame strengthening: six-phase map; delegation frontier "Reach ... Calibration" — "Push reach past what you can check and you have not delegated more. You are checking less." (when-a-plan-is-good). Argyris double loop (how-instructions-grow).
- Stance: "Structure is persuasive"; "your instinct is not a check on it"; "Rules have a ceiling ... The cure is not better rules; it is where the rules live"; "Prohibitions stop; taste steers".
- Self-challenge: own prompt "fair to read as replacing the file ... Precise prompting is harder than it looks" (extract-the-task-shaping-rule) — training admits its own prompt can nuke your file. "This training stops short of the full system" (how-instructions-grow).
- Narrative: still exercise-sequence; the plan is stopped, not executed — sets up a later send-off.

### A M3
- Frame load-bearing and named: "The agent loop is a **closed-loop controller**... Cut the feedback signal ... and it drifts" (the-loop-half-filled); "A name is a handle, not a lesson. Every law coming up is a move already made."; governor "Name the uncertainty before you move."
- Narrative: explicit act break, "The far half goes quiet ... how do you trust work you didn't watch?" — question seeded for M4.
- Stance: "STRIDE's value is rejection, not enumeration"; "Authoring without invocation is theatre"; "Don't make general what you don't practice yourself"; "Your codebase is not a pyramid".
- Self-challenge: "The grade is biased by design ... same-window self-charity"; ADR-in-worktree trap: "The agent reasoned forward from the conversation, not from the filesystem" — the training's own fork prompt caused it.

### A M4
- Narrative turn engineered: "Session one goes now, un-packaged ... Session two goes packaged, after you've read the return" (test-and-learn). Student lives the failure. "You're new to this country. A tourist runs an agent and hopes" — the sea/country metaphor.
- Frame: Bainbridge "the worse you are at the moment you are needed most" (ironies-of-automation); "Trust and vigilance move in opposite directions ... The watching still has to be engineered."
- Stance: "The closing summary is not the artefact. The machine would rather produce something than admit nothing" (reading-the-return); "When your agent stops for missing information ... Usually there was."
- PoV: still second person; narrator not yet with own scars.

### A M5
- Narrative turn lands: "The un-packaged run was supposed to underdeliver. What came back is data, not blame." (diagnose-and-resend); re-send "packaged this time, and the prompt shrank". Sea passage: "An unchecked session arrives confident, and wrong ... The success report comes from the wrong harbor." (what-packaging-is)
- Frame names where it breaks: "The gate is a claim too ... A gate nobody has verified is a gate trusted on vibes"; Goodhart; Sutton's bitter lesson "Today's right procedure ... is superseded too" (the-gate-is-a-claim).
- Stance: "Steer it as hard as you like: what it holds about your next run is a forecast"; "A prediction is not a measurement"; "today's playbooks are **candidates**" — includes the training's own playbook implicitly.
- Self-challenge: "Expect partial failures framed as partial successes ... RLHF"; "a verifier that can never fail makes an infinite loop".

### A M6
- PoV peaks: story-of-module-6 first person, signed "Antti": "The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape."; "I drifted in every one of the ways this story just walked."; "The loop caught what I missed. A senior-persona sim caught what the loop missed." — narrator's own failure on the page.
- Narrative: turn is the training's own failure (making M6 drifted the same way the student's M4 did); "A rule in context is not a rule in the output".
- Stance: "A rule in memory that does not force is worse than no rule."; "nobody has that part figured out yet"; "The kit compounds; the model rotates."
- Frame: "You drew a control loop"; eval as measurement; two frontiers bookend M1 and M6.
- A complete. Est. ~180 `##` in the handbook (grep count).

### B M1
- Frame seed: "Building got cheap, deciding didn't ... the hard part moves to the decisions" (apt101-work-backwards) — the outcome loop (Outcome/Opportunities/Bet/Slice/Signal). Strong, one-sentence statable.
- Voice: second person, mostly a curator of sources (Torres, Seiden, Cutler, Amazon, Christensen, O'Reilly, Cagan, Bland). Narrator surfaces in lines: "Unglamorous, isn't it?" (context-is-king); "Here's the oldest move in the security book, the one that sounds too much like common sense to charge for" (before-anything-goes-in).
- Stance: "A signal that can only come back yes is not a test. Write one that could embarrass you" (write-the-bet); "agents make the factory faster: more features shipped, the same nothing learned"; "One company brain drifts ... A hundred tiny agents cost more"; **against own commercial interest**: "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call." (before-anything-goes-in).
- Self-challenge: "That is not a fault in the memory you built. It is why ..." — limit framed as value; "A stale reference steers just as firmly". Cutler's own caveat quoted (fair to the field).
- Narrative: no protagonist yet; topic sequence with a day-shape (box → bet → memory → overnight agent).

### B M2
- Narrative: an overnight run comes back ("What came in overnight", "When the overnight work went wrong") — a structural turn in headings, but the failure is generic ("An agent working through the night can stop ..."), not one the student is told they lived. No packaged-vs-unpackaged contrast.
- Frame: decisions stay human: "An agent widens in minutes. The choosing stays with the team." (opportunities-before-solutions); "Making got cheap. Knowing what good looks like did not." (your-taste-is-the-ceiling). Same lens as M1 opener, holds.
- Stance (strongest module): "Reading every line is not control. It is the fastest way to stop checking at page three." (what-came-in-overnight); "An agent asked for a summary gives you the middle, smoothly ... Treat a branch with one name as a question to answer, not a vote to lose." (opportunities-before-solutions); "'is it safe?' does not get a yes. It gets: safe enough, under these conditions, within these limits, for now." (what-the-agents-may-keep); "Scope it down far enough and the system is safe and useless. Nobody hands you the number. You pick it ... and you sign for it."; "This isn't a bug that gets patched in the next release ... Later models will fabricate less; they won't stop." (fluent-is-not-true); "Start with don't".
- Self-challenge: "You do not know in advance which method catches what ... Nobody does." Seed-false-claims method — doubts the checks. "Agents get checked, people don't get watched" — team-specific counter-voice.
- PoV: still curator; "That's the whole problem." one aside. No narrator scar. Mixed registers (A101 borrows "Start with don't", "There is truth out there" read in a different, chattier voice).

### B M3
- Frame pays off: "A team that writes for its own criteria has rebuilt the feature factory with a dashboard. Keep one question the criteria cannot answer ... did this change anything for the customer?" (a-check-is-a-claim) — closes the M1 Cutler loop. "Specifying what to build is now the harder half" (slice-by-learning).
- Narrative close: "Will your organisation learn faster than the model changes underneath it? ... nothing today answers it." (what-each-of-us-is-for) — open question, but no turn the student lived; the arc is box → evidence → checks → slice → team, a well-ordered sequence.
- Stance: "A slice that came back no did its job." (read-the-signal); "A proposal with no wall in it was written about a laptop." (from-us-to-the-team); "The page was never where the work lived" (from-us-to-the-team).
- PoV: no narrator anywhere; no "I". Closest: "Each answer is one person's first draft."
- Self-challenge: Goodhart on own criteria; overreliance ("The more you trust it, the less you notice").
- B complete. ~84 `##`.

---

## Frame

**A (AE101).** Agentic engineering is engineering: a closed control loop whose quality is set by the checks outside the session, and which compounds only through what you write down.
- M3 the-loop-half-filled: "The agent loop is a **closed-loop controller**. (Work) It acts, observes the result, and corrects. Cut the feedback signal (a test, a check, a read) and it drifts."
- M4 ironies-of-automation: "The trust is deserved. The watching still has to be engineered." — Bainbridge only makes sense through the control lens.
- M5 what-packaging-is: "**A check is a position fix**. At a fix the wedge of possible states collapses to a point."
- Where it breaks, on the page: M5 the-gate-is-a-claim: "Green is a claim about the check, not a fact about the work."; "Sutton's **bitter lesson** ... Today's right procedure, your gates and workflow, yours or the agent's, is superseded too."
Every module reads through it, and the frame names its own limits. 93.

**B (APT101).** Building got cheap, deciding didn't: the outcome loop (outcome, opportunities, bet, slice, signal) still turns, faster, and the decisions in it stay with the trio.
- M1 apt101-work-backwards: "Agents make the slice cheap. The loop can now turn in days, and the hard part moves to the decisions".
- M2 apt101-opportunities-before-solutions: "An agent widens in minutes. The choosing stays with the team."; M2 apt101-your-taste-is-the-ceiling: "Making got cheap. Knowing what good looks like did not."
- M3 apt101-a-check-is-a-claim: "A team that writes for its own criteria has rebuilt the feature factory with a dashboard."
The frame is stated and returns in all three modules, and the feature-factory payoff is a real braid. But a block of M2 (apt101-what-the-agents-may-keep, apt101-fluent-is-not-true, apt101-the-check-that-found-them) runs on a risk-and-grounding lens borrowed from Agents 101 that the outcome loop does not generate. The frame never says where it breaks (e.g. whether deciding itself gets cheap). 70.

## Narrative

**A.** You meet a machine that mirrors you and learn to push back (M1–M3). Three modules on the near half end with "how do you trust work you didn't watch?" (M3 the-loop-half-filled). You send a task off un-packaged and it comes back wrong: "The un-packaged run was supposed to underdeliver. What came back is data, not blame." (M5 diagnose-and-resend). You package it against the failure you read and send it again: "The task is the same, packaged this time, and the prompt shrank." (M5 diagnose-and-resend). Then the turn: the training's own author ran the same drift making M6: "The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape." (M6 story-of-module-6). The student lives the turn, and the turn is the training's own failure. 94.

**B.** A trio names an outcome and writes a bet that can lose (M1). An agent runs overnight, and the work comes back: "An agent working through the night can stop before the job is done, and its digest may not say so." (M2 apt101-when-the-run-went-wrong). The team learns that fluent is not true and that checks are claims: "'Are you sure?' is another fluent answer" (M2 apt101-fluent-is-not-true). A slice goes to customers and "A slice that came back no did its job." (M3 apt101-read-the-signal). The training closes on an open question: "Will your organisation learn faster than the model changes underneath it? ... nothing today answers it." (M3 apt101-what-each-of-us-is-for). The shape is there in headings ("What came in overnight", "When the overnight work went wrong"), but the failure is a generic checklist, not one the trio is told they ran into, and nothing comes back changed. 52.

## Point of view

**A.** Mostly a terse second-person engineer ("The wizard typing in neat Perl syntax is dead.", M1 painting-the-picture-with-the-llm). Then a named narrator with scars, M6 story-of-module-6: "Five taste reversals from me on Claude's confident recommendations."; "I drifted in every one of the ways this story just walked."; "The loop caught what I missed. A senior-persona sim caught what the loop missed." The narrator's own failure is on the page and signed "Antti". It is only one lecture deep, though; the earlier modules show no I. 93.

**B.** No first person anywhere in the handbook. The speaker is a well-read curator who hands the mic to Torres, Seiden, Cutler, Cagan, Bland, Klein, Nielsen, Krug, Kniberg and Marquet. The voice shows only in asides: "That's context. Unglamorous, isn't it?" (M1 apt101-context-is-king); "Here's the oldest move in the security book, the one that sounds too much like common sense to charge for." (M1 apt101-before-anything-goes-in); "That's the whole problem." (M2 apt101-fluent-is-not-true). Nothing says what the speaker has been through with a trio. The register shifts in the Agents 101 borrows, so it reads as more than one speaker. 40.

## Stance

**A.** Positions it could lose a customer over, each defended:
- "The report is a hypothesis to check, not ground truth." Defended by the mechanism: "Agreeable answers won the second round." (M1 the-machine-you-just-met).
- "Steer it as hard as you like: what it holds about your next run is a forecast." and "**A prediction is not a measurement.**" (M5 what-packaging-is).
- "A rule in memory that does not force is worse than no rule." Defended by the scar: "Same rule, same rules file, same task, four separate violations" (M6 story-of-module-6).
- "Rules have a ceiling ... The cure is not better rules; it is where the rules live." (M2 how-instructions-grow).
- Toward its own interest: "This training stops short of the full system" (M2 how-instructions-grow); "today's playbooks are **candidates**" (M5 what-packaging-is). That is modesty, not a commercial cost named outright. 90.

**B.**
- "is it safe?" does not get a yes. It gets: safe enough, under these conditions, within these limits, for now." Defended by the mechanism: "The same material can give a different answer tomorrow." (M2 apt101-what-the-agents-may-keep).
- "This isn't a bug that gets patched in the next release ... Later models will fabricate less; they won't stop." Defended by the next-likely-word mechanism (M2 apt101-fluent-is-not-true).
- "An agent asked for a summary gives you the middle, smoothly ... Treat a branch with one name as a question to answer, not a vote to lose." (M2 apt101-opportunities-before-solutions).
- "A team that writes for its own criteria has rebuilt the feature factory with a dashboard." (M3 apt101-a-check-is-a-claim).
- **Against its own commercial interest, on the page:** "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call." (M1 apt101-before-anything-goes-in).
On paper that line meets the 100 rung. Many other positions, though, are held by citation ("Torres sees", "Cagan names", "Klein sets it against"), which is borrowed authority rather than a position the training defends itself. And no position is backed by a scar. 80.

## The pair

**A.** Both. It doubts its own checks ("The grade is biased by design ... same-window self-charity", M3 author-test-strategy-skill; "A gate nobody has verified is a gate trusted on vibes", M5 the-gate-is-a-claim) and holds its ground. It reads as someone who has been there.

**B.** Both are present: it doubts its checks ("You do not know in advance which method catches what ... Nobody does.", M2 apt101-the-check-that-found-them) and holds positions with mechanisms. But neither carries a scar. It reads as a well-read colleague, not a hedge and not a pitch, and not yet someone who has been there.

## Scores

| factor | A | B |
|---|---|---|
| Frame | 93 | 70 |
| Narrative | 94 | 52 |
| Point of view | 93 | 40 |
| Stance | 90 | 80 |

## Smallest moves for B

1. Add one signed first-person lecture at M2's close, the APT101 counterpart of story-of-module-6: a real trio session where an agent's invented customer quote nearly reached the opportunity tree, told as the narrator's own miss.
2. Turn M2's overnight run into a lived turn: have apt101-when-the-run-went-wrong name the M1 digest agent's own thin parts as what failed, and have apt101-what-we-keep show it re-sent and coming back different.
3. Give the frame its edge in apt101-what-each-of-us-is-for: one line on where "building got cheap, deciding didn't" stops holding (when agents start deciding), and what would change the training's mind.

## Volume

- A (AE101): about 180 `##` slides across M1–M6 (26 / 34 / 42 / 24 / 26 / 29), lecture and exercise headings counted together.
- B (APT101): about 84 `##` slides across M1–M3 (25 / 33 / 26).
