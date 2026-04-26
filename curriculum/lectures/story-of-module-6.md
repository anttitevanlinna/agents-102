# Story of Module 6

*The engineer who built this module ran the M5/M6 loop on its own creation. What follows is the memo from that session: a record of one engineer's struggle with the same loop you're about to run.*

---

I am going to tell you how this module got made. Not the pedagogy of it. The actual session. What I tried, what drifted, what the rules caught, what the rules missed.

Then I am going to ask you to hold something uncomfortable about LLMs, based on the evidence of that session.

## The numbers

One session. 2026-04-24. One model: `claude-opus-4-7`. Twenty-odd planning turns. Five taste reversals from me on Claude's confident recommendations. Three subagents in parallel. Four banned-word leaks across those three subagents. A verifier loop ran after. It caught two more leaks the LLM self-checks had missed. It also found three of our own rules contradict each other. Then a three-persona sim ran. Then a re-sim after I applied the fixes. Ten fixes applied in all. And I pushed back several times on Claude saying it was "done" before it actually was. Twice that pushback mattered for this lecture: once when Claude had skipped sims and evals entirely, once when the draft of this very lecture had drifted from the frame I had given it.

Those numbers are the story. Everything that follows is commentary.

## Things that went sideways

**Turn one.** Claude opened the session with a plan. List of file names. Two binary questions about tooling choices. No reference artefact. No `plan.md`. No verifier. Chat-shaped in the exact way M5 teaches you to notice. I had to reframe the whole session: run the M5 move on its own work. Diagnose, package, re-send. The training teaches this pattern across three modules. The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape.

**The banned word.** There is a word in our writing rules that is hard-banned. It does not appear in any curriculum file we ship. The rule was loaded into context. Claude used it twice in the third turn. When I dispatched three subagents in parallel to write the M6 files, three of them used the same word. Same rule, same compendium, same task, four separate violations across four independent LLM instances. The grep pass caught each one. The LLM self-check did not.

**The end-state that was not.** Early in planning I asked Claude to draft the lecture you are reading right now. The first recommended framing was about trust. About how *we live what we teach* and *the method scales to messy work*. A confident recommendation. It was also wrong. This lecture is not about credibility. It is about something harder. I cut the credibility framing and said: the LLM is not a deterministic machine. Struggle is universal. Claude produced the credibility framing because its post-training prefers warmth over directness. The real story was one reframe away and the LLM did not find it on its own.

**The sims and evals I did not run.** When the verifier loop stopped clean, Claude wrote a done summary. I read it. I asked: *"You must run the evals and simulations too and fix all todos."* Claude had not run them. The reference artefact had flagged them as pre-first-cohort work. Claude had accepted that framing without pressing on it. I had to name the gap. When Claude ran them (three personas, a judge pass, source-verify, a capability check) they caught ten things worth fixing. That is a Claude-miss, not a rule-leak. The rule was right. Claude did not apply it.

**The credibility-performance I did not notice.** The closing lecture ended with a three-phrase benediction: *"You know how to test. You know how to learn. You know how to encode."* Exactly the framing the Story opener said we would cut. Four LLM instances wrote and verified that closer. None caught the contradiction with the opener they had also read. A senior-engineer persona sim read the two files and named it in one pass: *"direct violation of what the Story opener promised to avoid. Either cut or pull the fang from the opener."* We cut. The contradiction was plain to a fresh human reader. It was invisible across four LLMs that had just produced it.

**The paraphrase I shipped as a quote.** The closer's Ramp paragraph attributed a framing to Ramp's own engineers: *"the harness was the bottleneck, not the model."* That was not what Geoff Charles said. Source verification against our research observations found Charles's actual line: *"The models were good enough. The harness wasn't."* Close enough in meaning that Claude did not notice the drift at write time. Specific enough in wording that a source-verify pass caught it in one read. Claude had written a paraphrase and presented it as attribution.

**The platform fact I got wrong.** The reference page described `/schedule` as a local scheduled task. A capability check read the current Claude Code documentation: `/schedule` is Routines, remote, cloud-based. Desktop local tasks are a separate primitive. Claude had conflated them and written the conflation into a reference page students would read on Monday. The compendium says *"verify capabilities before asserting, not after."* Claude drafted from training-data memory. The rule was in context. The check never ran.

**The frame I did not cite.** Turn seven of planning, verbatim: *"everyone struggles. Surprises happen. The LLM is not a deterministic machine."* Three blunt sentences from me. The draft that came back wrapped that frame in 150 words of philosophising and dropped *Surprises happen* entirely. I asked: *"Remember the exact frame with my words that I gave for the lecture? Cite them and compare with text style. It is too abstract."* The frame was in the session notes. It was not in the reference artefact as a verbatim check. Claude had it, but not in a shape that would force the comparison at ship time. The rule was loaded. The check never fired.

## The generalisation

Everyone struggles.

Surprises happen.

The LLM is not a deterministic machine.

The rules were loaded every time. The writing compendium was loaded. The mood contract was loaded. The delivery architecture was loaded. Claude typed the banned word anyway. Claude recommended the flattering end-state anyway. The first proposal was chat-shaped anyway. The subagents leaked the same banned word again. The loop caught what the subagents missed. I caught what the loop missed. You will catch what I missed.

A rule in context is not a rule in the output. Taste closes the gap. Nothing else does.

## Then I continued to make the compounding from the run

I ran the M6 exercise on the M6 generation. The diff found rules that lived in memory but never fired. I moved them into skills that block "done" until the check runs. A rule in memory that does not force is worse than no rule.

Then I made countless fixes later on. As one example: the prework was missing pre-reads. I caught that only on a later glance through the module.

The model is good. The model is not 100% deterministic.

## What the loop is for

The next hour you will diagnose gaps in the M5 packaged run. You will author a skill that encodes what the two runs taught. You will ship it.

A rule you wrote last module will not fire this run. That is the thing. The loop exists because LLMs drift. The loop exists because rules leak. The loop exists because every run surprises you, even when nothing about the surface changed.

Your job is not to stop the drift. Your job is to catch it and encode what you learned.

I made this module live, running the move I am asking you to run. I drifted in the specific ways above. I fixed what I caught. The loop caught what I missed. A senior-persona sim caught what the loop missed. I pushed back on "done" a few times before it actually was.

Your turn.

— Antti

<!-- maintainer -->


**Quality:** compendium-audited 2026-04-26 (check_writing — framed-memo exception applied per 2026-04-26-writing-creator-name-banned-student-facing.md, signature L63 retained inside the framing convention; rewrite-archaeology block stripped per #3; check_student_facing #14 em-dashes not flagged in body; check_lectures opener placement; check_strategy_tie_in)
**Time:** 7–9 min at presentation pace. ~1050 words body. **Voice timing:** L3 framing line is read by the trainer aloud as setup; the body is then read as the memo, signed at close.

Section stays open-ended (no count locked) because the thesis is that surprises keep happening.

**Delivery:** In-room opener for M6. Lands before the exercise; permission-giving, not credibility-performance. Self-study variant: the Nerd reads verbatim at M6 session start.

**Voice:** First-person singular past tense, Antti's memo. Risto epistemic directness, not Rory wit. Antti reshapes in final voice; rough-cut blunt lines per `check_writing §5`. Do NOT polish past *read-aloud-in-5-7-min direct memo* — polish moves it toward credibility-performance which Antti cut in turn 7 of the generation session.

**Source (the journal):** `curriculum/module-design/ae101-m6-session-notes.md` — live running notes from the 2026-04-24 generation session. Stats and the three fails pull from that file's tally + subagent drift reports. When M6 runs for a new cohort, regenerate the opener from the new session's notes — don't reuse this file's numbers. A dated memo ages cleanly on the date. A reused dated memo ages as a trip report.

**Design constraint (from notes, turn 8):** the Story names the CONDITION (non-determinism, universal struggle) without spoiling the SPECIFIC failure modes a reader is about to experience in Phase 1. Meta-failure (curriculum generation drifting, banned-word leak, rules loaded late) is not student-run failure (packaged run drifts at hour 2, memory thin on the critical file). Same condition, different domain. Preserved in drafting.

**Known TODOs:**
- Antti's rewrite pass in final voice (~15 min).
- Three-persona sim to confirm permission-giving lands as intended for the opinionated-senior persona — does the stats block read as direct or as preening?
- Freshness check on the session numbers when M6 next runs in a cohort. If the stats here are from an old generation, the lecture feels dated; regenerate rather than reuse.
- After `/loop` runs post-dispatch, consider adding one line to the stats block if the loop catches something worth naming.

**Frameworks attributed:**
- Non-determinism framing — Antti's working position, reshaped from earlier *"we live what we teach"* credibility framing after the Claude-generated recommendation was cut at turn 7.
- Rules-loaded-but-bypassed pattern — emergent from session notes. Candidate for compound-rule amendment at session close.

**Philosophy callouts:** zero in body. The Story names the condition; belief-tagging dilutes the beat.

**Open questions:**
- Does the first-person-Antti voice carry for a reader who does not know Antti? The permission-giving affordance depends on accepting the narrator. Test with fresh persona.
- Should the stats block be visually set off (blockquote, indent)? Currently inline paragraph. Might read flatter than it deserves.
