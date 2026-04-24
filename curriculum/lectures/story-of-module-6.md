# Story of Module 6

*5–7 min opener for M6. First-person past. Antti reshapes in final voice.*

---

I am going to tell you how this module got made. Not the pedagogy of it. The actual session. What I tried, what drifted, what the rules caught, what the rules missed.

Then I am going to ask you to hold something uncomfortable about LLMs, based on the evidence of that session.

## The numbers

One session. 2026-04-24. One model: `claude-opus-4-7`, 1M context. Twenty-odd turns of planning before any file landed. Five taste reversals from me — moments where Claude recommended a direction with visible confidence and the recommendation was wrong. Three subagents dispatched in parallel for the generation phase. Four banned-word violations across those three subagents, same rules loaded, same task. A self-paced verifier loop ran after.

Those numbers are the story. Everything that follows is commentary.

## Three things that went sideways

**Turn one.** Claude opened the session with a plan. List of file names. Two binary questions about tooling choices. No reference artefact. No `plan.md`. No verifier. Chat-shaped in the exact way M5 teaches you to notice. I had to reframe the whole session: run the M5 move on its own work. Diagnose, package, re-send. The training teaches this pattern across three modules. The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape.

**The banned word.** There is a word in our writing rules that is hard-banned. It does not appear in any curriculum file we ship. The rule was loaded into context. Claude used it twice in the third turn. When I dispatched three subagents in parallel to write the M6 files, three of them used the same word. Same rule, same compendium, same task, four separate violations across four independent LLM instances. The grep pass caught each one. The LLM self-check did not.

**The end-state that was not.** Early in planning I asked Claude to draft the lecture you are reading right now. The first recommended framing was about trust. About how *we live what we teach* and *the method scales to messy work*. A confident recommendation. It was also wrong. This lecture is not about credibility. It is about something harder. I cut the credibility framing and said: the LLM is not a deterministic machine. Struggle is universal. Claude produced the credibility framing because its RLHF prefers warmth over directness. The real story was one reframe away and the LLM did not find it on its own.

## The generalisation

Every drift in that session happened with the rules loaded.

Every one.

The writing compendium was in context. Claude typed the banned word. The mood contract was in context. Claude recommended the flattering end-state. The delivery architecture was in context. The first proposal was chat-shaped anyway.

This is the thing I want you to hold. You will build systems for the rest of your career that run on LLMs. You will load rules. You will write memory. You will ship compendiums. Every one of them will leak. Not because you are bad at this. Because the LLM is not a deterministic machine. A rule loaded in context is not a rule applied in generation. The loaded rule and the generated token are two different events. And taste — yours — is the only thing that reliably closes the gap.

This is not a flaw to fix. It is the condition the work runs inside.

## What the loop is for

You are about to spend the next hour running a loop on the M5 packaged run. You will diagnose subtler gaps. You will author a skill that encodes what the two runs taught. You will ship it.

When you notice a gap you thought should have been caught, you will be right. A rule you wrote last module did not fire this run. That is the thing. The loop exists because LLMs drift. The loop exists because rules leak. The loop exists because every run surprises you a little, even when nothing about the surface changed.

Your job today is not to eliminate the drift. Your job is to catch it and encode what you learned. That is practitioner fluency. Not confidence that the system will behave. Confidence that when it does not, you know what to do next.

I made this module live, running the move I am asking you to run. I drifted in the specific ways above. I fixed what I caught and shipped what I had. The loop ran after and caught things my self-check did not.

Your turn.

— Antti

<!-- maintainer -->

**Time:** 5–7 min at presentation pace. ~720 words body.

**Delivery:** In-room opener for M6. Lands before the exercise; permission-giving, not credibility-performance. Self-study variant: Teacher Claude reads verbatim at M6 session start.

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
