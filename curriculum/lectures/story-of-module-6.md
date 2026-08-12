# Story of Module 6

*The engineer who built this module ran the M5/M6 loop on its own creation. What follows is the memo from that session: a record of one engineer's struggle with the same loop you're about to run.*

I am going to tell you how this module got made. Not the pedagogy of it. The actual session. What I tried, what drifted, what the rules caught, what the rules missed.

Then I am going to ask you to hold something uncomfortable about LLMs, based on the evidence of that session.

## The numbers

One session. 2026-04-24. One model: `claude-opus-4-7`. Twenty-odd planning turns. Five taste reversals from me on Claude's confident recommendations. Three subagents in parallel. Four banned-word leaks across those three subagents. A verifier loop ran after. It caught two more leaks the LLM self-checks had missed. It also found three of our own rules contradict each other. Then a three-persona sim ran. Then a re-sim after I applied the fixes. Ten fixes applied in all. And I pushed back several times on Claude saying it was "done" before it actually was. Twice that pushback mattered for this lecture: once when Claude had skipped sims and evals entirely, once when the draft of this very lecture had drifted from what I'd actually told it to write.

Those numbers are the story. Everything that follows is commentary.

## Things that went sideways

Turn one. Claude opened the session with a plan. List of file names. Two binary questions about tooling choices. No reference artefact. No `plan.md`. No verifier. Chat-shaped in the exact way M5 teaches you to notice. I had to reframe the whole session: run the M5 move on its own work. Diagnose, package, re-send. The training teaches this pattern across three modules. The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape.

The banned word. There is a word in our writing rules that is hard-banned. It does not appear in any curriculum file we ship. The rule was loaded into context. Claude used it twice in the third turn. When I dispatched three subagents in parallel to write the M6 files, three of them used the same word. Same rule, same rules file, same task, four separate violations across four independent LLM instances. The grep pass caught each one. The LLM self-check did not.

The end-state that was not. Early in planning I asked Claude to draft the lecture you are reading right now. The first recommended framing was about trust. About how *we live what we teach* and *the method scales to messy work*. A confident recommendation. It was also wrong. This lecture is not about credibility. It is about something harder. I cut the credibility framing and said: the LLM is not a deterministic machine. Struggle is universal. Claude produced the credibility framing. Our read: much is caused by post-training preferring warmth over directness. The real story was one reframe away and the LLM did not find it on its own.

The sims and evals I did not run. When the verifier loop stopped clean, Claude wrote a done summary. I read it. I asked: *"You must run the evals and simulations too and fix all todos."* Claude had not run them. The reference artefact had flagged them as pre-first-cohort work. Claude had accepted that framing without pressing on it. I had to name the gap. When Claude ran them (three personas, a judge pass, source-verify, a capability check) they caught ten things worth fixing. That is a Claude-miss, not a rule-leak. The rule was right. Claude did not apply it.

The three-phrase closer I didn't catch. The closing lecture ended with a three-phrase benediction: *"You know how to test. You know how to learn. You know how to encode."* Exactly the framing I said, a few paragraphs above, we would cut. Four LLM instances wrote and verified that closer. None caught the contradiction with what they had also read. A senior-engineer persona sim read the two files and named it in one pass: *"direct violation of what this opener promised to avoid. Either cut or pull the fang from it."* We cut. The contradiction was plain to a fresh human reader. It was invisible across four LLMs that had just produced it.

The paraphrase I shipped as a quote. The closer's Ramp paragraph attributed a framing to Ramp's own engineers: *"the harness was the bottleneck, not the model."* That was not what Geoff Charles said. Source verification against our research observations found Charles's actual line: *"The models were good enough. The harness wasn't."* Close enough in meaning that Claude did not notice the drift at write time. Specific enough in wording that a source-verify pass caught it in one read. Claude had written a paraphrase and presented it as attribution.

The platform fact I got wrong. The reference page described `/schedule` as a local scheduled task. A capability check read the current Claude Code documentation: `/schedule` is Routines, remote, cloud-based. Desktop local tasks are a separate primitive. Claude had conflated them and written the conflation into a reference page the cohort would read on Monday. The rules file says *"verify capabilities before asserting, not after."* Claude drafted from training-data memory. The rule was in context. The check never ran.

The frame I did not cite. Turn seven of planning, verbatim: *"everyone struggles. Surprises happen. The LLM is not a deterministic machine."* Three blunt sentences from me. The draft that came back wrapped that frame in 150 words of philosophising and dropped *Surprises happen* entirely. I asked: *"Remember the exact frame with my words that I gave for the lecture? Cite them and compare with text style. It is too abstract."* The frame was in the session notes. It was not in the reference artefact as a verbatim check. Claude had it, but not in a shape that would force the comparison at ship time. The rule was loaded. The check never ran.

## The generalisation

Everyone struggles.

Surprises happen.

The LLM is not a deterministic machine.

The rules were loaded every time: the rules file, the tone brief, the session-timing plan, all sitting in context before the first turn. Claude typed the banned word anyway. It recommended the flattering end-state anyway, and its first proposal came out chat-shaped despite every one of those rules being right there. The subagents leaked the same banned word again. The loop caught what the subagents missed. I caught what the loop missed. You will catch what I missed.

A rule in context is not a rule in the output. Taste closes the gap. Nothing else does.

## Then I compounded the session

I ran the M6 exercise on the M6 generation, comparing the two sessions side by side. That comparison found rules that lived in memory but were never enforced. I moved them into skills that block "done" until the check runs. A rule in memory that does not force is worse than no rule.

Then I made countless fixes later on. As one example: the prework was missing pre-reads. I caught that only on a later glance through the module.

The model is good. It is still not 100% deterministic.

## What the loop is for

The next hour you will diagnose gaps in the M5 packaged session, map the work you repeat across your stack, and leave holding the prompt that builds your kit.

A rule you wrote last module will not apply this session. That is the thing. The loop exists because LLMs drift. The loop exists because rules leak. The loop exists because every session surprises you, even when the task looked the same.

Your job is not to stop the drift. Your job is to catch it and encode what you learned.

I made this module live, running the move I am asking you to run. I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed. A senior-persona sim caught what the loop missed. I pushed back on "done" a few times before it actually was.

Your turn.

Antti

<!-- maintainer -->

**Slide deixis accepted:** "paragraphs above" (check_slides.md §12) — *"the framing I said, a few paragraphs above, we would cut"* points inside its own `## Things that went sideways` chunk, four paragraphs up on the same slide. Story lecture, read not projected; the geometry is true where it stands.

**Quality:** compendium-audited 2026-08-03 (writing@5fc7188 story@5fc7188 technical@b3143a4 behavior@b3143a4 pedagogy@5fc7188 strategy@b3143a4 slides@5fc7188)
- judges @5fc7188: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
- source-verified 2026-05-25: Geoff Charles quote confirmed verbatim against ramp.md (practitioner direct, 2026-04-09); public X primary paywalled — attribution disposition open for maintainer (see source-verification block below)
**Time:** 9 min at presentation pace. ~1050 words body. **Voice timing:** L3 framing line is read by the trainer aloud as setup; the body is then read as the memo, signed at close.

Section stays open-ended (no count locked) because the thesis is that surprises keep happening.

**Delivery:** In-room opener for M6. Lands before the exercise; permission-giving, not credibility-performance.

**Voice:** First-person singular past tense, Antti's memo. Risto epistemic directness, not Rory wit. Antti reshapes in final voice; rough-cut blunt lines per `check_writing §5`. Do NOT polish past *read-aloud-in-5-7-min direct memo* — polish moves it toward credibility-performance which Antti cut in turn 7 of the generation session.

**Source (the journal):** `curriculum/module-design/ae101-m6-session-notes.md` — live running notes from the 2026-04-24 generation session. Stats and the three fails pull from that file's tally + subagent drift reports. When M6 runs for a new cohort, regenerate the opener from the new session's notes — don't reuse this file's numbers. A dated memo ages cleanly on the date. A reused dated memo ages as a trip report.

**Design constraint (from notes, turn 8):** the Story names the CONDITION (non-determinism, universal struggle) without spoiling the SPECIFIC failure modes a reader is about to experience in Phase 1. Meta-failure (curriculum generation drifting, banned-word leak, rules loaded late) is not student-run failure (packaged run drifts at hour 2, memory thin on the critical file). Same condition, different domain. Preserved in drafting.

**Known TODOs:**
- Antti's rewrite pass in final voice (~15 min).

<!-- backing -->

Claims
- `session-tally` · detail · "One session. 2026-04-24. One model: `claude-opus-4-7`. Twenty-odd planning turns. Five taste reversals from me on Claude's confident recommendations." ← ae101-m6-session-notes
- `four-banned-word-leaks` · detail · "Three subagents in parallel. Four banned-word leaks across those three subagents." ← ae101-m6-session-notes
- `verifier-caught-two-more` · detail · "It caught two more leaks the LLM self-checks had missed. It also found three of our own rules contradict each other." ← ae101-m6-session-notes
- `ten-fixes-applied` · detail · "Ten fixes applied in all." ← ae101-m6-session-notes
- `opened-chat-shaped` · detail · "No reference artefact. No `plan.md`. No verifier. Chat-shaped in the exact way M5 teaches you to notice." ← ae101-m6-session-notes
- `same-rule-four-violations` · detail · "Same rule, same rules file, same task, four separate violations across four independent LLM instances." ← ae101-m6-session-notes
- `sims-and-evals-not-run` · detail · "Claude had not run them. The reference artefact had flagged them as pre-first-cohort work." ← ae101-m6-session-notes
- `charles-actual-line` · detail · "The models were good enough. The harness wasn't." ← geoffintech-charles
- `paraphrase-shipped-as-quote` · detail · "Claude had written a paraphrase and presented it as attribution." ← ae101-m6-session-notes, geoffintech-charles
- `schedule-is-routines-remote` · detail · "`/schedule` is Routines, remote, cloud-based. Desktop local tasks are a separate primitive." ← ae101-m6-session-notes, cc-schedule-capability
- `everyone-struggles` · vision · "Everyone struggles." ← none-owed
- `llm-is-not-deterministic` · vision · "The LLM is not a deterministic machine." ← none-owed
- `post-training-warmth-read` · vision · "Our read: much is caused by post-training preferring warmth over directness." ← none-owed — an owned inference, labeled as one in body. The literature edge (Sharma et al. on sycophancy) lives in painting-the-picture-with-the-llm's ledger, where the "driven in part by" hedge is marked load-bearing; do not strengthen here either.
- `rule-in-context-is-not-rule-in-output` · vision · "A rule in context is not a rule in the output. Taste closes the gap. Nothing else does." ← none-owed
- `rule-in-memory-that-does-not-force` · vision · "A rule in memory that does not force is worse than no rule." ← none-owed
- `loop-exists-because-llms-drift` · vision · "The loop exists because LLMs drift. The loop exists because rules leak." ← none-owed
- `catch-it-and-encode-it` · vision · "Your job is not to stop the drift. Your job is to catch it and encode what you learned." ← none-owed

Sources
- ae101-m6-session-notes `[checked:2026-04-24 result:ATTESTED due:none]` attested:Antti 2026-04-24 M6-generation-session — [maintainer-attested] `curriculum/module-design/ae101-m6-session-notes.md`, live running notes from the session. Every number in the memo pulls from that file's tally and its subagent drift reports. The maintainer ran the session: first-hand primary, no URL owed (`check_research_claims.md §1`). **`due:none` is right here, and the reason matters** — this is a dated memo about one session that happened, not a claim about how sessions go. It cannot go stale, only be superseded. fallback: none. **Regeneration, not re-verification, is the maintenance move:** when M6 runs for a new cohort, regenerate the opener from that cohort's notes. A dated memo ages cleanly on its date; a reused dated memo ages as a trip report.
- geoffintech-charles `[checked:2026-05-25 result:OK due:2026-11-25]` https://x.com/geoffintech/status/2042002590758572377 — [practitioner direct] Geoff Charles (Ramp), 2026-04-09: *"The models were good enough. The harness wasn't."* Verified via `observations/ramp.md` plus the X oEmbed workaround; the x.com page 402s, the quote is confirmed. kb:observations/ramp.md **Load-bearing in an unusual way: the memo's whole point is that our paraphrase drifted from this line, so the verbatim IS the claim.** The documented reframe other files fall back to — "Ramp's engineers' framing converges on: the harness was the bottleneck, not the model" — is precisely the paraphrase this passage is about, and firing it here would delete the anecdote. fallback: if the quote ever fails verification, cut the paragraph rather than soften it.
- cc-schedule-capability `[checked:2026-04-24 result:OK due:cohort]` https://code.claude.com/docs/en/ — [capability] The capability check the memo describes: `/schedule` is Routines, remote and cloud-backed; Desktop local tasks are a separate primitive. Stamped here because the memo asserts it as a fact about the product, not only as something that happened in a session. **Corroborates `the-loop-has-a-name`'s three-scheduling-primitives bullet, which carries no stamp of its own** — the same underlying check, recorded in the wrong file. fallback: re-test before a cohort; if the split has changed, this passage becomes dated-historical and needs an inline date.

Frameworks
- Non-determinism as the condition · [borrow:none] · law:none · ← none — Antti's working position, reshaped from an earlier "we live what we teach" credibility framing after the Claude-generated recommendation was cut at turn 7
- Rules-loaded-but-bypassed · [borrow:none] · law:none · ← ae101-m6-session-notes — a loaded rule is not an enforced rule; this observation is what pushed the corpus toward forcing functions
- Double-loop learning · [borrow:Argyris & Schön] · law:double-loop-learning · ← cultural-vocab — "then I compounded the session" is the second loop: not fixing the leak, changing the rule that let it leak

Stance `[stance:2026-08-01 level:L4]`
- holds: everything in it, at the highest rung available. First-hand maintainer testimony about a session the maintainer ran, with the artefacts still on disk. There is no evidence problem here and there never will be — **the only failure mode is age, and age is handled by regeneration rather than by re-checking.**
- contested: nothing. The single external claim is verified, and the memo's argument does not depend on it — the anecdote is about our own paraphrase drifting, so the quote's job is to be the thing we got wrong.
- would-move-it: nothing about the field. What retires this lecture is a new M6 generation session producing a new memo. Watch instead for the model name ageing in body: `claude-opus-4-7` was correct on 2026-04-24 and is increasingly a period detail — which is fine in a dated memo and wrong the moment the memo stops reading as dated.

OODA
- question: has M6 been regenerated for a new cohort, and does this memo still describe the session the shipped module came from?
- roster: none external. This file's OODA is a read of `curriculum/module-design/ae101-m6-session-notes.md` against the module's own git history.
- last-run: 2026-08-01

<!-- /backing -->

**Philosophy callouts:** zero in body. The Story names the condition; belief-tagging dilutes the beat.

**Open questions:**
- Does the first-person-Antti voice carry for a reader who does not know Antti? The permission-giving affordance depends on accepting the narrator. Test with fresh persona.
- Should the stats block be visually set off (blockquote, indent)? Currently inline paragraph. Might read flatter than it deserves.
