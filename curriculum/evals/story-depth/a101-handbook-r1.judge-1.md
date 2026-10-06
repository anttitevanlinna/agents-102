# A101 handbook r1 — storytelling judge 1

Paired read: A = AE101, B = A101 (agents-101). Running notes per module.

## Running notes

### A (AE101) M1
- Frame seeds: "The LLM mirrors your stance... Your stance is the ceiling" (painting-the-picture); sycophancy as mechanism (the-machine-you-just-met "Agreeable answers won the preference round"); error cascade + "A check from outside the session resets the chain" — engineering/control lens. Two frontiers named at open.
- Stance: "Assume about 10% of what it says or does is made up" (orient-and-introspect); "The agent yields if you push hard enough, so its agreement settles nothing" (fix-tests-first). POV: second person, instructional; no first-person narrator yet.
### A M2
- Frame continues: six phases map; "What you can test and check sets your complexity ceiling"; "Push reach past what you can check and you have not delegated more. You are checking less." Argyris double loop. "Rules have a ceiling" — self-limits ("This training stops short of the full system"). "Prohibitions stop; taste steers" (analogy, mild voice). Precise-prompting self-doubt: "This prompt is fair to read as replacing the file... Precise prompting is harder than it looks." — training doubting its own prompt.
### A M3
- Frame load-bearing: the-loop-half-filled names "closed-loop controller", "Local success, global drift", compound ladder, double loop; governor "Name the uncertainty before you move". "Control is interrogation"; "The branch is the permission". Stance: "Don't make general what you don't practice yourself"; "Authoring without invocation is theatre"; "The grade is biased by design... same-window self-charity" (doubts own check). Fin/Intercom 267 skills stat.
- ADR-in-worktree beat: "The agent reasoned forward from the conversation, not from the filesystem" — training's own prompt framing caused the miss, named on page.
### A M4
- Narrative set-up: "Session one goes now, un-packaged... Session two goes packaged" (test-and-learn); "You're new to this country. A tourist runs an agent and hopes". Bainbridge (ironies) "may now be an inexperienced one"; "Trust and vigilance move in opposite directions... when did you last do this kind of work by hand?" Reading the return: "The machine would rather produce something than admit nothing".
### A M5
- Narrative turn: "The task is the same, packaged this time, and the prompt shrank" (diagnose-and-resend); sea passage "An unchecked session arrives confident, and wrong... The success report comes from the wrong harbor" (what-packaging-is). Stance: "what it holds about your next run is a forecast"; "A prediction is not a measurement". Frame breaks / self-doubt: the-gate-is-a-claim "Green is a claim about the check, not a fact about the work"; Goodhart; Deming tampering; Sutton "Today's right procedure, your gates and workflow... is superseded too" = frame names where it breaks.
### A M6
- POV peak: story-of-module-6 first person, Antti, dated session, own failures ("I pushed back several times on Claude saying it was 'done'", "The three-phrase closer I didn't catch", "I drifted in every one of the ways this story just walked"). The training's own construction failing on the page = narrative 100-rung and POV 100-rung. "A rule in context is not a rule in the output". Close: "There is no last turn... The kit compounds; the model rotates." "nobody has that part figured out yet".
- AE101 volume: grep '^## ' ≈181 headings across the handbook (includes exercise phase headings).

### B (A101) M1
- Same dinner opener as AE101 ("Same words. Different answer."), cardiologist variation; "every useful thing in this training is built on this one idea". Site exercise: StoryBrand tuned, anti-branding (Grant, Patagonia, Taleb via negativa) — voice edgy: "Half of LinkedIn uses it, and it shows, badly". "The LLM didn't get better between Phase 1 and Phase 6. You did." what-just-happened: "The rest of the training is seven more instances of the same move. Iterate, learn, encode." Stance: "Nobody knows where agents are going. Not Anthropic, not your board, not the people running this training." "Reading a McKinsey report... One produces opinions about a future. The other produces muscle memory". "You were the only check in the room" — sycophancy mechanism "Agreeable answers won the round". POV: second person; narrator not present as person.
### B M2 (partial)
- "A memory about 'our company' is a landfill. A memory about this decision, this month is a weapon." Challenge-picking; prework Karpathy LLM wiki.
- M2 cont.: compounding lecture — "Either one alone is a toy"; "The loop is the product"; frame-statement: "That's the point the whole training turns on: generic AI becomes your AI when you shape the context that surrounds it." Stance vs tools: "the simplest possible setup beats the fancy ones... Every fancier setup that promised to 'fix' this added a layer". Limit: "The agent can only work from what somebody wrote down." Homework: scheduled morning agent. Narrative: forward reference "Every module after this leans on the memory you just built."
### B M3
- Mood turn (unease): three-minds-one-synthesis close: "Everything you just did is the move this training teaches, run properly. It still handed you something you cannot vouch for. Hold the doubt... let it stew." = training's own method producing doubt, on page. when-to-split: "Start with don't"; "The test is unkind on purpose. Business people who have just seen multi-agent work want to split everything. Resist it."; "A whole module just showed you multi-agent works. Next Monday, you will be tempted to apply it to everything. Don't." — stance against own module's spectacle. "The four is for the feeling" — admits over-design. Seams lecture. Debugging: sources/processing/boundary.
### B M4
- Stance peak: practice-of-risk "Certainty is a fantasy you inherited"; "If that sounds less like engineering and more like medicine, it is."; "Avoidance beats reduction. Scope beats patch. Don't-open beats mitigate."; AGAINST OWN COMMERCIAL INTEREST: "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call." Voice: "Damn, this is complex stuff." Mood (deeper unease): audit-your-agent "The uncomfortable feeling is the evidence"; "The unease that remains is what the loop is supposed to produce". "Prototype vs production... You must do the work." Give-it-less reverses M1–M3 direction = a turn: "Everything you have built so far gave the agent more... Now the move is to give it less."
- M5 prework: Mata v Avianca + Deloitte/DEWR cases — scars, but other people's. "Verification has to leave the generation loop and touch the source."
### B M5 (grounded)
- "There is truth out there... That's the whole problem." 85%^10 compounding; "This isn't a bug that gets patched in the next release. It's the shape of the technology." "Nobody does. Not the framework authors, not the blog posts". Rescue beat: "One generation pass is a trap; a test-and-fix loop is the escape." Self-challenge: Mata pre-read run through the four detectors — training's own teaching case caught ("Citation integrity caught a direct quote that did not appear in the linked sanctions order... Even a careful teaching case benefits from the check") = training's own failure on page, but brief, impersonal.
- hallucination-bakeoff: "The 10% is a slight joke"; "Not intuition. Measurement." (rescue mood). Mild over-certainty: "You don't argue with it; you read it."
### B M6
- Frame frame-ish: Mollick bitter lesson vs garbage can, "We are about to find out." "humans will not cope with all the detail". "Evals are how you write down what good means so the system can keep applying it when you are not in the chair." "A yardstick you rewrite is not a yardstick." "Groundedness protects the floor. Steering raises the ceiling." when-the-score-stops-moving: "A flat score is information about the judge"; "Nothing has been scoring the judge" — doubts own tool (80 rung self-challenge); "If the model stops fabricating, what is your judge for?" new-human-role: recap thread M1→M5 as "Would you let it send the mail?" — strongest narrative spine; "The destination is not 'the human disappears.' That is the lazy story."; "Variety in, selection out, memory keeps" (closest to an explicit frame); Bainbridge-shaped "The better it gets, the less you watch... Here is the part that does not resolve." "When did you last read one yourself?"
### B M7
- Stance defended: share-your-work "'Share the whole agent' is a vendor pitch and is NOT on the list."; access-is-not-absorption mechanism: "An agent is context, a boundary, a set of checks and somebody who answers for what it does. The first three copy in an afternoon. The fourth does not copy at all"; "a name does not travel inside a folder"; Polanyi. "The people plan stalls on names... That was not the exercise being hard. That was the exercise being accurate." Picture piece: "This is the interface piece... the first one that has another person on the other side of it."
### B M8
- extend-your-system "watching the builder disappear". joint-double-diamond forum; "You do not graduate. You have a flywheel." where-is-this-all-going: "Count the folders the kernel cites... That ratio is your rollout, in miniature"; "The parts hold; the model rotates"; "Nobody in this room knows yet, and the people running this training do not know either."; "Will your organisation learn faster than the model changes underneath it?"; "What would change our mind?"; close echoes M3 unease: "The kernel came out of the same move as your first briefing: agents read, agents argued, something chose, and nothing in the room checked it. Hold that doubt the way you held it then."
- A101 volume: grep '^## ' ≈170 headings.

---

## Frame

**A — AE101.** Frame in one sentence: *agentic engineering is engineering* — a closed-loop control problem in which external checks (position fixes) bound drift, and what the loop learns compounds onto disk. Load-bearing across modules:
- M1, `the-machine-you-just-met`: "A check from outside the session resets the chain. A failing test does not care how confident the answer sounded."
- M3, `the-loop-half-filled`: "The agent loop is a **closed-loop controller**. (Work) It acts, observes the result, and corrects. Cut the feedback signal (a test, a check, a read) and it drifts."
- M5, `what-packaging-is`: "**A check is a position fix**. At a fix the wedge of possible states collapses to a point".
- Where it breaks, M5, `the-gate-is-a-claim`: "Green is a claim about the check, not a fact about the work", and "Sutton's **bitter lesson**... Today's right procedure, your gates and workflow, yours or the agent's, is superseded too." Also M5, `what-packaging-is`: "Whether this field ever settles into a real best practice is an open question."
M2's map, M4's far half and M6's control-loop figure don't make sense without the lens. The frame names its own break (the gate decays, and the bitter lesson retires the procedure). → **93**

**B — A101.** Frame in one sentence: *an agent is a picture you assemble piece by piece (context, memory, other agents, boundary, check, loop, interface), and generic AI becomes yours by the pieces you add and the ones you keep back.* It is threaded explicitly, one piece per module:
- M1, `context-is-king`: "In the full agent picture, this is the first piece: context."
- M2, `compounding`: "That's the point the whole training turns on: *generic AI becomes your AI when you shape the context that surrounds it.*"
- M4, `practice-of-risk`: "In the full agent picture, this is the boundary piece... More capability without boundaries is not progress. It is just more blast radius."
- M7, `access-is-not-absorption`: "In the full agent picture, this is the interface piece. It is the first one that has another person on the other side of it."
- Where it breaks, M7: "Every piece so far was yours to decide. This one is not."; M8, `where-is-this-all-going`: "The parts hold; the model rotates."
The frame is load-bearing in M2, M4 and M7, and M7 names the piece where the builder's control ends, which is a real break. The ceiling is lower than A's because a second frame competes with the first, M6's *"Variety in, selection out, memory keeps"* (`new-human-role-in-the-loop`). The "full picture" line also reads as a tag appended at the end of each lecture, not a lens that generates its argument. M3's split lecture and M5's grounding lecture would read the same without it. → **74**

## Narrative

**A.** In five sentences: an engineer meets a steerable machine that mirrors them and compounds a rules file. They learn to plan and to package skills while the feedback loop stays short. Then they send a long task off un-packaged, and it comes back drifted, confident and wrong. The turn comes when they diagnose that run and re-send it packaged: "The task is the same, packaged this time, and the prompt shrank" (M5, `diagnose-and-resend`). Then the training shows its own making failing: "Turn one. Claude opened the session with a plan... It still opened with the un-packaged shape" (M6, `story-of-module-6`). Supporting lines: "Session one goes now, un-packaged... Session two goes packaged, after you've read the return" (M4, `test-and-learn`) and "An unchecked session arrives confident, and wrong... The success report comes from the wrong harbor" (M5, `what-packaging-is`). The turn is the training's own failure. → **95**

**B.** In five sentences: a leader feels context move and builds a site that sounds like them (joy). They build a memory that compounds, then run four agents and three stances on their real challenge. The turn is that this method, run properly, hands back something they cannot vouch for: "Everything you just did is the move this training teaches, run properly. It still handed you something you cannot vouch for. Hold the doubt" (M3, `three-minds-one-synthesis`). Risk deepens the unease ("The uncomfortable feeling is the evidence", M4, `audit-your-agent`), and measurement then rescues it: "One generation pass is a trap; a test-and-fix loop is the escape" (M5, `grounded`). Leverage arrives as the human moves up a level, and the close returns to the turn: "The kernel came out of the same move as your first briefing: agents read, agents argued, something chose, and nothing in the room checked it. Hold that doubt the way you held it then" (M8, `where-is-this-all-going`). The M6 recap "Would you let it send the mail?" (`new-human-role-in-the-loop`) ties M1 through M5 into one want. The student lives the turn, and it is the training's own method falling short. It is not the training's own *making* failing, and the protagonist has no named obstacle beyond "doubt". → **82**

## Point of view

**A.** The narrator is Antti, a practitioner who built this module with Claude and was caught out by it. That surfaces mainly in M6, `story-of-module-6`, which is dated and in first person: "One session. 2026-04-24. One model: `claude-opus-4-7`... Five taste reversals from me"; "The three-phrase closer I didn't catch"; "I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed." Elsewhere the narrator speaks in lines, for example "This prompt is fair to read as replacing the file with only this rule, which would nuke the old rules... Precise prompting is harder than it looks" (M2, `extract-the-task-shaping-rule`), and "The fork prompt called the worktree 'the side-quest'... The agent reasoned forward from the conversation" (M3, `threat-model-with-stride`). The narrator's own failure is on the page, but mostly confined to one lecture. → **94**

**B.** The training speaks in the second person. A voice shows in asides: "Damn, this is complex stuff. It will still be complex when the next agent gets built" (M4, `practice-of-risk`); "please, for the sake of your sanity, write the one prompt" (M3, `when-to-split-an-agent`); "The 10% is a slight joke" (M5, `hallucination-bakeoff`); "Nobody in this room knows yet, and the people running this training do not know either" (M8, `where-is-this-all-going`). The narrator has no stated experience: no "I", no dated session, no scar of their own. Even the training's own slip is told impersonally: "Citation integrity caught a direct quote that did not appear in the linked sanctions order... Even a careful teaching case benefits from the check" (M5, `grounded`). The scars on the page belong to other people (Schwartz, Deloitte). That places B above the asides rung (40) and well short of a narrator with experience (80). → **52**

## Stance

**A.** Positions that could lose a customer, each defended:
- "Assume about 10% of what it says or does is made up" (M1, `orient-and-introspect`), defended by the sycophancy mechanism: "Agreeable answers won the second round" (M1, `the-machine-you-just-met`).
- "what it holds about your next run is a forecast... **A prediction is not a measurement**" (M5, `what-packaging-is`), defended by the claim that the evidence is local.
- "A rule in context is not a rule in the output" (M6, `story-of-module-6`), defended by four banned-word leaks.
- "The grade is biased by design... same-window self-charity" (M3, `author-test-strategy-skill`).
- "Push reach past what you can check and you have not delegated more. You are checking less" (M2, `when-a-plan-is-good`; M5).
Against its own interest: "This training stops short of the full system" (M2, `how-instructions-grow`), and its playbooks are "candidates" (M5). Neither is sharply commercial. → **91**

**B.** Positions that could lose a customer, each defended:
- "*'Share the whole agent'* is a vendor pitch" (M7, `share-your-work`), defended with a mechanism: "The first three copy in an afternoon. The fourth does not copy at all... a name does not travel inside a folder" (M7, `access-is-not-absorption`).
- "Certainty is a fantasy you inherited" (M4, `practice-of-risk`), defended by non-determinism, injection and emergent capability.
- "Start with don't... Next Monday, you will be tempted to apply it to everything. Don't." (M3, `when-to-split-an-agent`). This argues against the spectacle of its own module.
- "the simplest possible setup beats the fancy ones... Every fancier setup that promised to 'fix' this added a layer" (M2, `compounding`).
- "This isn't a bug that gets patched in the next release. It's the shape of the technology" (M5, `grounded`).
Against its own commercial interest, on the page: "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call" (M4, `practice-of-risk`). Some positions are only asserted, for example the McKinsey jab in M1, `what-just-happened`, and "You don't argue with it; you read it" in M5, which over-certifies the scoreboard. → **86**

## The pair

**A.** Strong self-challenge ("Green is a claim about the check", "Gates decay", the doubted self-grade, Story of M6) sits alongside firm ground ("forecast, not a measurement", "a rule in context is not a rule in the output"). It reads as **someone who has been there (both)**.

**B.** Strong self-challenge ("Nothing has been scoring the judge", "If the model stops fabricating, what is your judge for?", "Here is the part that does not resolve", "Hold that doubt") sits alongside defended stances (vendor pitch, certainty, start with don't, against own commercial interest). It also reads as **both**. Because no narrator owns the scars, it reads as someone who has been there *by inference*: a well-argued guide, not a witness.

## Scores

| factor | A (AE101) | B (A101) |
|---|---|---|
| Frame | 93 | 74 |
| Narrative | 95 | 82 |
| Point of view | 94 | 52 |
| Stance | 91 | 86 |

## Smallest moves for B

1. Put one first-person, dated scar passage on the page, for example a judge or memory the maintainer trusted that passed something wrong, at M6 `when-the-score-stops-moving`, so the narrator crosses from asides to stated experience with their own failure.
2. Retell the M5 `grounded` teaching-case catch as the training's own failure ("our pre-read shipped a quote the court never wrote, and here is how you would have known"), so the turn becomes the training's own failure, not a generic lesson.
3. Name "the full agent picture" as the frame in M1 in one sentence. Make M3 and M5 argue *from* it, not append it, and fold M6's "variety in, selection out, memory keeps" into it as the loop piece so there is one lens, not two.

## Volume

- A (AE101): about 181 `##` slides across 6 modules (rough count of rendered `##` headings, exercise phase headings included).
- B (A101): about 170 `##` slides across 8 modules (same method).
