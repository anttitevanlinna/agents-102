# AE101 verification yarn: how it runs, so you can copy it

Module order as taught: M1 getting-going, M2 plan-mode-done-right, M3 earn-the-trust, M4 run-the-first-experiment, M5 learn-from-the-test, M6 spot-gaps-build-the-loop. Paths are relative to `curriculum/`. Text read only above `<!-- maintainer -->`.

## 1. Where verification shows up, module by module

**M1. Here it means: don't take the agent's word for it; a check outside the session beats confidence.**
- "The account is a reconstruction, not ground truth. ... Assume about 10% of what it says or does is made up." (exercises/orient-and-introspect.md): spot-check the agent's self-report.
- "The point: pushing back is core work." / "The agent yields if you push hard enough, so its agreement settles nothing." (exercises/fix-tests-first.md): your read of the diff is the check.
- "The report is a hypothesis to check, not ground truth." (lectures/the-machine-you-just-met.md): why it holds: sycophancy.
- "A check from outside the session resets the chain. A failing test does not care how confident the answer sounded." (the-machine-you-just-met.md): why it holds: errors stack.
- "Ask only what it added, and the agent finds something to have added." (exercises/compound-and-close.md): a prompt needs an escape hatch, or its answer can't be trusted.

**M2. Here it means: checking before the work runs; calibration as the ceiling on how much you can delegate.**
- "The first plan is plausible. Plausible isn't good enough, and you are the one who can tell the difference." (module Big Idea)
- "Verification. How you know the result is any good." (lectures/the-whole-map.md): the word gets a fixed place on the map.
- "*"Run the tests"* is cosmetic; ... is a gate." (lectures/when-a-plan-is-good.md): a check has to be able to fail.
- "read the flagged steps in the revised plan, not the agent's report of them" (exercises/push-back-on-the-plan.md): check the artefact, not the summary of it.
- "Push reach past what you can check and you have not delegated more. You are checking less." (when-a-plan-is-good.md): calibration.

**M3. Here it means: trust is checking you can run without being there; checking your own output; control comes from probing.**
- "Trust isn't watching harder. It's verification you can run without being there." (module Big Idea)
- "Authoring without invocation is theatre." (exercises/author-test-strategy-skill.md)
- "The grade is biased by design. ... same-window self-charity." (author-test-strategy-skill.md): the checker shares the maker's blind spots.
- "The agent reasoned forward from the conversation, not from the filesystem." (exercises/threat-model-with-stride.md): check where a file actually landed.
- "**Control is interrogation.** ... You can always read more; you can never read all." (lectures/the-loop-half-filled.md)
- "how do you trust work you didn't watch?" (the-loop-half-filled.md): hands off to M4.

**M4. Here it means: once the work runs unwatched, checking becomes a job; the session itself is the test.**
- "On a long session, this stops being a glance and becomes a job." (lectures/the-far-half.md)
- "when the agent takes a hundred steps alone, what makes you trust the result at the end?" (the-far-half.md)
- "A tourist runs an agent and hopes; a practitioner runs a test and reads the data." (lectures/test-and-learn.md)
- "It declares done on the part it managed. Tests pass, the summary is confident" (lectures/what-keeps-a-long-running-session-going.md)
- "The question is not how many checks the repo has. It is what notices first when this particular session goes wrong." (same file)
- "The trust is deserved. The watching still has to be engineered." (lectures/ironies-of-automation.md)

**M5. Here it means: build the verifier from a failure you actually saw; then check the checker.**
- "each failure you find earns the check that would have caught it" (lectures/reading-the-return.md)
- "A built-but-untested verifier is no verifier." (exercises/diagnose-and-resend.md)
- "A copy that silently skipped still reports as done." (exercises/fork-the-worktree.md)
- "**A check is a position fix**." / "The success report comes from the wrong harbor." (lectures/what-packaging-is.md)
- "Green is a claim about the check, not a fact about the work." (lectures/the-gate-is-a-claim.md)
- "**A prediction is not a measurement.**" (what-packaging-is.md)

**M6. Here it means: a check as a measurement across many runs (eval); rules unchecked by the loop don't hold.**
- "Read the checks you built as evals: a pass rate, not a pass" (module What You'll Learn)
- "One run tells you what happened. The measurement tells you what the system does." (lectures/composing-the-workflow.md)
- "Expect over-credit on the packaging. A fair push-back is *"name one thing the verifier missed, concretely."*" (exercises/spot-gaps-build-the-loop.md)
- "The grep pass caught each one. The LLM self-check did not." (lectures/story-of-module-6.md)
- "A rule in context is not a rule in the output" (story-of-module-6.md, heading)
- "The loop caught what the subagents missed. I caught what the loop missed. You will catch what I missed." (same)

## 2. The technique

**No recap slides, no theme label.** No module has a "Verification" section or callout. In body prose the word *verification* shows up in only three places: the map phase (M2, M4), the M3 Big Idea, and the "verification step" plan criterion. The yarn runs on a small set of everyday words and sentence shapes instead.

**Recurring words, used as plain tools:** *check* (the main one), *push back*, *read* (the diff, the return, the plan file), *hypothesis / claim / not ground truth*, *gate*, *verifier*, *done / done-done*, *evidence*, *trust*. Two fixed contrasts come back in new settings:
- the agent's report vs the real state: "self-report is a hypothesis" (M1) → "the closing summary is not the artefact" (M5) → "Green is a claim about the check" (M5) → "A rule in context is not a rule in the output" (M6). Same contrast each time, one level further out.
- confident vs right: "does not care how confident the answer sounded" (M1) → "fluent and confident is its default finish whether the work is right or not" (M5) → "An unchecked session arrives confident, and wrong" (M5).

**Load-bearing phrases repeated word for word and named by their origin, never re-explained.** "Assume about 10%" (M1 exercise) comes back as "Assume about 10% of it is wrong" (M2 Key Concepts) and as "Same prior as the repo read in Module 1: assume about 10%..." (M5). "Agreeable answers won the preference round" is an M1 heading and returns in M5's re-send step. "You are checking less" closes the delegation frontier in both M2 and M5. "The M1 countermove rides along" (M5) and "The countermove from M1 goes to work" (M3) bring back the ranked-list move with a module number, not a summary.

**How the meaning grows.** Each step widens what gets checked and who checks it:
- *what gets checked:* agent self-report → plan → your own authored skill → an unwatched long session → the verifier itself → the rules system over many runs.
- *who checks:* you → a second read by the agent → a subagent in fresh context → a hook that "always fire[s]" → judge / gate → eval pass rate → a hold-out "the agent never sees".
- *what verification means:* refusing to take the agent's word → a gate that can fail → trust you don't have to stand by for → a job → a position fix → a measurement.

The reason why is given once and early (M1: sycophancy, error cascade). Later modules only point back at it.

**Where it sits on the slide:**
- *Big Idea:* states it outright only once (M3). Elsewhere it is implied: M2 "you are the one who can tell the difference"; M4 "The session is how you find out what's missing."
- *"The point:" line on each exercise* carries it in five words or so: "pushing back is core work", "the first pass is plausible, and usually not good enough", "send it off plainly and you find out what you can't steer yet".
- *Headings* are imperatives or claims that contain the check: "Read the self-report, then spot-check it", "Check the copy landed", "Prove the verifier actually fires", "Passing is not proof", "Gates decay".
- *Exercise steps:* a check sits right after an action, as a short step of its own: run the fork, then `ls` the worktree; draft the ADR, then "Check where the ADR landed"; save the rule, then "ask Claude to confirm it added the rule and kept the old ones".
- *Callout boxes* warn about failure in the opposite direction: "a summary that arrives fast and reads clean has usually covered the last few turns and skipped the rest."
- *Debrief lectures* name a move only after it has been done: "You just ran the same loop"; "That is why the failing test came before the fix"; "A name is a handle, not a lesson. Every law coming up is a move already made."
- *Key Concepts* boil it down to one claim each: "The agent's self-report is a hypothesis, not ground truth" (M1); "A verification step that could fail is a gate; one that always passes is decoration" (M2).
- *Pre-reads / Next* set up the next meaning ahead of time: "Verification asymmetry" before M5; Klaassen "runs the verifier 10 consecutive times before trusting it" before M6's eval.

**Sentences that carry it while doing another job.** The yarn rides on logistics, git, timeboxing and prompt notes:
- Git setup: "A rules file that didn't copy changes two variables instead of one, and the contrast stops meaning anything."
- Timeboxing: "Two push-backs on two axes, plus one check that the regeneration held".
- Nudging a stalled run: "Past ten or so interventions, you have become the agent; call it and read the transcript."
- A prompt-design note: "The escape hatch is deliberate. ... with no moment to point at, have Claude take the line back out of the file."
- Tool tips: "It can also stop short, and that one is harder to catch because a confident answer arrives either way."

**It closes by turning on the author.** M5 turns the theme on its own tools ("The gate is a claim too"). M6 turns it on how the course itself was made: the author's own session leaked a banned word, and the verifier loop caught it. Applied to the person teaching it, the theme earns its claims without a summary slide.

## 3. Five do/don't pairs

1. **DO** hang the theme on what happens after a mechanical step. "Look at the worktree yourself ... A copy that silently skipped still reports as done." (fork-the-worktree.md)
   **DON'T** add a "Verification tip" box or a "remember to verify" line that sits apart from the action.
2. **DO** call back with a module number and a fixed phrase, and stop there. "Same prior as the repo read in Module 1: assume about 10% of the account misrepresents the run" (diagnose-and-resend.md)
   **DON'T** write a recap ("In Module 1 we learned that verification matters because...") or explain the reason a second time.
3. **DO** give the theme a mechanism the reader can reason with. "A check from outside the session resets the chain. A failing test does not care how confident the answer sounded." (the-machine-you-just-met.md)
   **DON'T** reach for a slogan with no mechanism ("trust but verify", "always double-check AI output").
4. **DO** have the reader act first and name the move afterwards, in the debrief. "Orient, fix, close, compound. You just ran that loop. The agent's first read was partly wrong." (the-machine-you-just-met.md)
   **DON'T** open a module by defining the theme and then have the exercises illustrate the definition.
5. **DO** reuse one contrast but point it at a bigger target each module, ending with the checking tool itself. "Green is a claim about the check, not a fact about the work." (the-gate-is-a-claim.md)
   **DON'T** repeat the module 1 meaning at the same scale ("check the agent's output") in every module. If the meaning stays the same size, it reads as nagging.
