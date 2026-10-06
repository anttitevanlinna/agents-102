# A101 handbook r1 — judge 2 (paired: A=AE101, B=A101)

## Running notes

### A (AE101) M1
- Frame seeds: "The LLM mirrors your stance... Your stance is the ceiling" (painting-the-picture); "Errors stack until a check resets them... A check from outside the session resets the chain" (the-machine-you-just-met). Feedback-control lens present early.
- Stance: "The wizard typing in neat Perl syntax is dead."; "The report is a hypothesis to check, not ground truth."; "Assume about 10% of what it says or does is made up" (orient-and-introspect). Mechanism given (sycophancy from preference tuning).
- POV: thin first-person; voice of an engineer in asides ("oldskool").
### A M2
- Frame: six phases map; "Push reach past what you can check and you have not delegated more. You are checking less." (when-a-plan-is-good) — check sets complexity ceiling.
- Stance: "Rules have a ceiling"; "Prohibitions stop; taste steers"; "This training stops short of the full system" (how-instructions-grow) — names its own limit.
- Self-doubt: "Precise prompting is harder than it looks" (extract-the-task-shaping-rule) — the training's own prompt may nuke the file.
### A M3
- Frame explicit: "The agent loop is a **closed-loop controller**... Cut the feedback signal and it drifts" (the-loop-half-filled); "Control is interrogation"; "The branch is the permission". Recognition-before-naming: "A name is a handle, not a lesson. Every law coming up is a move already made."
- Stance: "Don't make general what you don't practice yourself"; "STRIDE's value is rejection, not enumeration"; "Authoring without invocation is theatre"; "same-window self-charity" (author-test-strategy-skill) — doubts its own check.
- Narrative hinge set up: "The far half goes quiet... how do you trust work you didn't watch?"
- Failure shown: ADR lands in worktree because "The agent reasoned forward from the conversation, not from the filesystem" (threat-model-with-stride).
### A M4
- Narrative turn designed: "Session one goes now, un-packaged... Session two goes packaged, after you've read the return" (test-and-learn). Lived failure: "The un-packaged run was supposed to underdeliver" (M5 diagnose-and-resend).
- Frame: Bainbridge "Monitoring and takeover run on the same reps" (ironies-of-automation); "Trust and vigilance move in opposite directions... The trust is deserved. The watching still has to be engineered."
- Stance: "The closing summary is not the artefact. The machine would rather produce something than admit nothing" (reading-the-return).
### A M5
- Frame payoff: sea passage — "A check is a position fix"; "Fence the reef, not the open water" (what-packaging-is).
- Stance vs field/own tools: "The model has read the field... what it holds about your next run is a forecast"; "A prediction is not a measurement"; "today's playbooks are **candidates**".
- Training doubts its own check: "The gate is a claim too... A gate nobody has verified is a gate trusted on vibes"; Goodhart "Gates decay"; Sutton bitter lesson = frame names where it breaks: "Retire what the next model outgrows" (the-gate-is-a-claim).
### A M6
- POV peak: story-of-module-6 first person, signed "Antti": "I drifted in every one of the ways this story just walked"; "The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape." — the training's own failure on the page.
- Stance: "A rule in context is not a rule in the output"; "A rule in memory that does not force is worse than no rule"; "Nobody reviews 500K lines by hand" (agents-that-build-agents).
- Close: "There is no last turn... The kit compounds; the model rotates." Frame returns (two frontiers bookend M1/M6).
- A summary: frame = agentic engineering is feedback control (check resets drift; reach bounded by calibration). Breaks named (Sutton, Goodhart, gate-is-a-claim). Narrative = un-packaged send-off fails → diagnose → packaged re-send; then the author's own M6 session fails the same way.

### B (A101) M1
- Frame seed: "Context is whatever you tell it... every useful thing in this training is built on this one idea" (context-is-king); "The rest of the training is seven more instances of the same move. Iterate, learn, encode." (what-just-happened) — frame stated as a method, not a lens with laws.
- Narrative: joy beat clearly designed (site gets sharper; "Generic output comes from generic context. The LLM didn't get better between Phase 1 and Phase 6. You did.").
- Stance: "Nobody knows where agents are going. Not Anthropic, not your board, not the people running this training... Reading a McKinsey report... is not the same category of activity"; StoryBrand "Half of LinkedIn uses it, and it shows, badly". Self-doubt: "Why the look-back was kind to you"; "You were the only check in the room".
- POV: second-person instructor; narrator surfaces only in asides ("Banter expected", "Unglamorous, isn't it?").
### B M2
- Frame: "This is the same mechanism from Module 1: context shapes output, run at system scale... The loop is the product."; "*generic AI becomes your AI when you shape the context that surrounds it.* ... That's the point the whole training turns on" (compounding). Frame announced as thesis.
- Stance: "the simplest possible setup beats the fancy ones... Every fancier setup that promised to 'fix' this added a layer that the model had to work *around*" (compounding) — defended with a mechanism (models read/write text). "A memory about 'our company' is a landfill. A memory about *this decision, this month* is a weapon" (name-your-challenge).
- Limit named: "It can only use what someone wrote down" (compounding).
- Joy beat continues; slight pitchiness: "Chat literally cannot do this."; "Either alone is a toy."
### B M3
- Narrative turn (unease) lived: "Everything you just did is the move this training teaches, run properly. It still handed you something you cannot vouch for. Hold the doubt... let it stew." (three-minds-one-synthesis) — strongest storytelling beat so far; the training's method produces doubt.
- Stance against its own spectacle: "Four sessions for one question is more than the work strictly needs... The four is for the feeling." (three-retrievers); "A whole module just showed you multi-agent works. Next Monday, you will be tempted to apply it to everything. Don't."; "Start with don't"; "the company brain... ages badly" (when-to-split-an-agent). Defended with mechanism (coordination cost, seams).
- Frame thread: "In the full agent picture, other agents are part of the tool surface" — the "agent picture" accumulation is the frame device, additive not lensing.
### B M4
- Stance peak: "Certainty is a fantasy you inherited" defended by mechanism (non-determinism, instruction-set attack surface, emergent capability) (practice-of-risk). Against own commercial interest ON PAGE: "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call." (practice-of-risk).
- Narrative: "deeper unease" designed: "The uncomfortable feeling is the evidence"; "The unease that remains is what the loop is supposed to produce" (audit-your-agent). Turn reframes the M2-3 build: "Everything you have built so far gave the agent more... Now the move is to give it less."
- POV still second-person; one narrator blurt "Damn, this is complex stuff."
- M5 prework: Mata v Avianca, Deloitte — organisational missing check; "Verification has to leave the generation loop and touch the source." Others' failures, not narrator's.
### B M5
- Rescue beat: "Mostly right, ten times over, is mostly wrong" → "A test-and-fix loop collapses the error rate... The compounding-error math is the problem; the compounding-check math is the answer." (grounded). Pays off M3's "let it stew".
- Stance: "Don't pick a method. Run the candidates... Nobody does. Not the framework authors, not the blog posts"; "This isn't a bug that gets patched in the next release. It's the shape of the technology." (grounded). "The judge names its own limit".
- Self-check on teaching case: "Against the Mata v. Avianca pre-read... Citation integrity caught a direct quote that did not appear in the linked sanctions order... Even a careful teaching case benefits from the check." — near the training's own failure, but impersonal (whose story? not attributed).
### B M6
- Frame: bitter lesson vs garbage can (Mollick) — "We are about to find out." (evals-as-steering); "Groundedness protects the floor. Steering raises the ceiling."; "A yardstick you rewrite is not a yardstick."
- Training doubts its own check: "A flat score is information about the judge"; "You haven't checked the judge yet... It is still nobody's job to grade the judge"; "If the model stops fabricating, what is your judge for?" (when-the-score-stops-moving). Strong self-challenge.
- Narrative recap: new-human-role walks M1→M5 as one mail; "The destination is not 'the human disappears.' That is the lazy story." Bainbridge-shaped irony without naming: "The better it gets, the less you watch".
### B M7
- Stance defended: "*'Share the whole agent'* is a vendor pitch" (share-your-work) → defended in access-is-not-absorption: "An agent is context, a boundary, a set of checks and somebody who answers for what it does. The first three copy in an afternoon. The fourth does not copy at all, which is why the product being sold as a shared agent is always three of the four parts".
- Narrative: "The people plan stalled on names... That was not the exercise being hard. That was the exercise being accurate." — a lived beat named after.
- Frame device again: "In the full agent picture, this is the interface piece."
### B M8
- Close: "Count the folders the kernel cites... That ratio is your rollout, in miniature" (where-is-this-all-going) — stance against board-percentage promises, lived in-room.
- Frame names where it may break: "Which half of this is obsolete next year?... the people running this training do not know either"; "Will your organisation learn faster than the model changes underneath it?"; "What would change our mind?"
- Self-doubt on its own product: "The kernel came out of the same move as your first briefing: agents read, agents argued, something chose, and nothing in the room checked it."
- Slight pitch: sponsor line "You are now agent builders" (joint-double-diamond).
- B summary: frame = the agent picture (parts you decide: context, memory, agents, boundary, check, loop, interface) on the spine "context shapes output"; additive taxonomy rather than a generative lens. Narrative = designed mood arc, lived. POV = second-person instructor, no narrator with a history; asides only.

---

## Frame

**A, AE101.** The frame in one sentence: agentic engineering is feedback control, where a check from outside the session resets drift, and how far you can safely delegate is capped by how well you can check. Three modules that only make sense through it:
- M1 · lectures/the-machine-you-just-met: "A check from outside the session resets the chain. A failing test does not care how confident the answer sounded."
- M3 · lectures/the-loop-half-filled: "The agent loop is a **closed-loop controller**. (Work) It acts, observes the result, and corrects. Cut the feedback signal (a test, a check, a read) and it drifts."
- M5 · lectures/what-packaging-is: "**A check is a position fix**. At a fix the wedge of possible states collapses to a point".
- Where the frame breaks, named by the training itself: M5 · lectures/the-gate-is-a-claim: "Green is a claim about the check, not a fact about the work"; "**Goodhart's law:** ... The agent is an optimizer aimed straight at your gate"; "Sutton's **bitter lesson**: ... Today's right procedure, your gates and workflow, yours or the agent's, is superseded too."
- Score **95**. Every module reads through the lens, and the training names where its own checks fail.

**B, A101.** The frame in one sentence: context shapes output, so generic AI becomes *yours* when you shape what surrounds it, and the agent is a set of parts you decide one at a time. "The full agent picture" is the scaffolding that carries this frame from module to module.
- M1 · lectures/context-is-king: "Context is whatever you tell it... every useful thing in this training is built on this one idea."
- M2 · lectures/compounding: "This is the same mechanism from Module 1: context shapes output, run at system scale... *generic AI becomes your AI when you shape the context that surrounds it.* ... That's the point the whole training turns on".
- M7 · lectures/access-is-not-absorption: "The agent file is a page of instructions. It is not where the work lives. The work lives in the memory you curated". M7 only makes sense through the frame: you cannot share the context-shaped part.
- Where it breaks: M4 · lectures/practice-of-risk: "Everything you have built so far gave the agent more. More context... Now the move is to give it less. Both moves are right". M6 · lectures/evals-as-steering: "Or maybe the garbage can wins... We are about to find out." M8 · lectures/where-is-this-all-going: "Which half of this is obsolete next year?... the people running this training do not know either."
- Weakness: the device that runs through every module ("In the full agent picture, this is the boundary piece / the check / the interface piece", M4/M5/M7) is a locator, not a lens. It says where a module sits; it does not generate the learning the way the feedback-control lens does in AE101. M3 (when-to-split-an-agent) reads mostly as its own topic.
- Score **80**.

## Narrative

**A, AE101.** You meet a machine that mirrors you and learn that a check resets its errors. You plan, codify and author on the near half of the map, where feedback is quick. Then the far half goes quiet: you send a task off un-packaged and it comes back wrong ("The un-packaged run was supposed to underdeliver", M5 · exercises/diagnose-and-resend). You diagnose it, package it and re-send it ("Session two goes packaged, after you've read the return", M4 · lectures/test-and-learn). In the turn, the author's own module-writing session fails the same way: "The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape." (M6 · lectures/story-of-module-6).
- Score **92**. The turn is the training's own failure, but it arrives late and in one lecture.

**B, A101.** You change the context and watch a generic site become yours: "The LLM didn't get better between Phase 1 and Phase 6. You did." (M1 · exercises/personal-site-with-guardrails). You build a memory and then a crowd of agents, and the method, run properly, leaves you holding an answer you cannot vouch for. In the turn: "Everything you just did is the move this training teaches, run properly. It still handed you something you cannot vouch for. Hold the doubt... let it stew." (M3 · exercises/three-minds-one-synthesis). The unease deepens into risk, "The unease that remains is what the loop is supposed to produce" (M4 · exercises/audit-your-agent). Then the rescue comes as arithmetic: "The compounding-error math is the problem; the compounding-check math is the answer." (M5 · lectures/grounded). The close turns the doubt back on the room's own product: "nothing in the room checked it. Hold that doubt the way you held it then." (M8 · lectures/where-is-this-all-going).
- Score **85**. The plot is designed, the student lives through it, and the turn is the training's own method failing, repeated at the close. It falls short of 100 because nobody in the story is failing in person.

## Point of view

**A, AE101.** The speaker is a practitioner-author, Antti, who built this module live with Claude and shows his scars.
- M6 · lectures/story-of-module-6: "I am going to tell you how this module got made... What I tried, what drifted, what the rules caught, what the rules missed."
- Same file: "I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed."
- M1 · lectures/painting-the-picture-with-the-llm: "The wizard typing in neat Perl syntax is dead." M1 · exercises/orient-and-introspect: "(`/context` is oldskool...)". The voice shows in asides before the story.
- Score **95**. The narrator's own failure is on the page and signed.

**B, A101.** The speaker is a second-person instructor with no stated history. The narrator surfaces only in asides.
- M1 · exercises/personal-site-with-guardrails: "**Time:** 45 minutes. Banter expected." M1 · lectures/context-is-king: "Unglamorous, isn't it?"
- M4 · lectures/practice-of-risk: "Damn, this is complex stuff."
- M3 · lectures/when-to-split-an-agent: "please, for the sake of your sanity, write the one prompt."
- The closest thing to a self-failure is impersonal. M5 · lectures/grounded: "Citation integrity caught a direct quote that did not appear in the linked sanctions order... Even a careful teaching case benefits from the check." Nobody says who wrote the quote.
- Score **48**. The voice is consistent and has edge, but no one says what they have been through.

## Stance

**A, AE101.** The positions it could lose a customer over:
- M5 · lectures/what-packaging-is: "Ask for best practice and that is what answers: a well-read average... what it holds about your next run is a forecast." "**A prediction is not a measurement.**" Defended by mechanism: frozen weights, missing local evidence.
- M6 · lectures/story-of-module-6: "A rule in context is not a rule in the output." "A rule in memory that does not force is worse than no rule." Defended by a scar: four banned-word leaks.
- M5 · lectures/the-gate-is-a-claim: "Push reach past your calibration and you are not delegating more. You are checking less."
- M2 · lectures/how-instructions-grow: "This training stops short of the full system". It admits its own limit, though not against its commercial interest.
- Score **92**.

**B, A101.** The positions it could lose a customer over:
- M4 · lectures/practice-of-risk: "Certainty is a fantasy you inherited". Defended with three mechanisms: non-determinism, the instruction set as attack surface, emergent capability.
- Held against its own commercial interest, on the page. M4 · lectures/practice-of-risk: "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call."
- M7 · exercises/share-your-work: "*'Share the whole agent'* is a vendor pitch". Defended in M7 · lectures/access-is-not-absorption: "The first three copy in an afternoon. The fourth does not copy at all, which is why the product being sold as a shared agent is always three of the four parts".
- It deflates its own spectacle. M3 · exercises/three-retrievers-one-curator: "Four sessions for one question is more than the work strictly needs... The four is for the feeling." M3 · lectures/when-to-split-an-agent: "A whole module just showed you multi-agent works. Next Monday, you will be tempted to apply it to everything. Don't."
- M1 · lectures/what-just-happened: "Nobody knows where agents are going. Not Anthropic, not your board, not the people running this training." This one is asserted more than defended.
- Score **88**. It meets the 100 anchor on one line. The rest is defended by mechanism rather than by a scar.

## The pair

**A:** someone who has been there. AE101 doubts its own gates ("A gate nobody has verified is a gate trusted on vibes") and holds its ground ("A rule in context is not a rule in the output").

**B:** also both. The doubt is heavy: "Hold the doubt" (M3), "The uncomfortable feeling is the evidence" (M4), "It is still nobody's job to grade the judge" (M6 · when-the-score-stops-moving), "nothing in the room checked it" (M8). The ground is held: the vendor-pitch line and the costs-us-too line. The doubt comes in an institutional voice, though, so it reads as a designed arc rather than a scar. Two lines leak toward pitch: "Chat literally cannot do this." (M2 · build-your-challenge-memory) and the sponsor's "You are now agent builders" (M8 · joint-double-diamond).

## Scores

| factor | A (AE101) | B (A101) |
|---|---|---|
| Frame | 95 | 80 |
| Narrative | 92 | 85 |
| Point of view | 95 | 48 |
| Stance | 92 | 88 |

## Smallest moves for B

1. Tell the M5 teaching-case catch in the first person: say who wrote the pre-read whose quote was not in the sanctions order, and what the detector caught, so the narrator's own failure is on the page.
2. Seed "Would you let it send the mail?" in M1 and echo it at the M4 unease, so M6 new-human-role pays off a question the student has carried instead of recapping the modules.
3. Name the frame's break point (bitter lesson vs garbage can) in M1 beside "context is king", so M8's "which half is obsolete" lands as the frame breaking rather than a fresh question.

## Volume

Counted from the `##` lines in the handbook as read through `read-curriculum.js` with maintainer tails stripped:
- **A (AE101): about 181 `##` slides** across 37 files.
- **B (A101): about 170 `##` slides** across 31 files.
