# Running notes — Agents 101 story-depth judge, iteration 2

## Prework
Frame: five concrete proofs (snake game, meetings summary, connector check, tarball unpack, 2-page read) — competence-by-doing, not by reading. Narrative: none yet, setup only. Narrator: task-instruction voice, occasional aside ("a snake game... a small, permanent, perfectly useless thing to own"). Positions: "Proof: X" refrain repeated 4x — early tell that the training's spine is show-don't-tell.

## M1 Getting Going
Frame: context is the whole mechanism — "The guardrail IS the control." Narrative: baseline (generic) → StoryBrand tune → strengths → anti-branding mirror → free iteration → packaged rules file. A turn exists: Phase 5 "Look back" where the model grades its own generic lines charitably and the lecture "Iterate and Learn" names it directly ("Agreeable answers won the round the model was tuned on... The self-report is the same kind of output as the thing it is reporting on"). Narrator: present, gives a specific reading of what happened ("You felt it move"), first stated experience.  Positions: "You are the world's best evaluator of your own profile" — defended via the cold-critic exercise showing where it fails (praise carries forward, picks come back soft).

## M2 Building Agent Systems
Frame holds: memory as the shelf-life extension of Module 1's context. Narrative turn: Phase 3 "compounding" — "The second batch made the first batch better. Chat literally cannot do this." Lecture `compounding.md` names the limit against its own claim: "It can only use what someone wrote down... Most of what you know about your own company, nobody has." Narrator experience: "You just did something a chat can't do." Stance: "Plain text beats databases" defended mechanistically ("reading it is reading, updating it is writing... every fancier setup that promised to fix this added a layer the model had to work around") — a position that could lose enterprise-tooling-minded customers (no vector DB, no RAG infra sell). Also a stance against its own commercial interest implicitly (no upsell to a platform).

## M3 Multi-Agent Systems
Big turn of the training so far: "Three minds, one synthesis" close — "you can't yet say which is which. That feeling is correct... It still handed you something you cannot vouch for. Hold the doubt. Name it to yourself. Don't fix it here." This is a narrator confessing the method's own output can't be trusted yet — narrative turn candidate for "the training's own failure." Stance: "Start with don't" / "single-agent is the plain default" defended against the training's own commercial appeal of multi-agent theatrics: "A whole module just showed you multi-agent works. Next Monday, you will be tempted to apply it to everything. Don't." — position against its own showcase, arguably against commercial interest (a consultancy could upsell more agents; this tells the customer not to buy more). "More agents is not more rigour" / "the beige answer was not short of context... could not choose between them" — the seam where synthesis fails is named, not hidden.

## M4 Security
Strongest anti-commercial-interest line found so far, in `practice-of-risk.md`: "Expect it to cost you a feature somebody in your company wanted. It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call." Also: "Certainty is a fantasy you inherited" / "You don't get secure / not secure. You get safe enough, under these conditions, within these limits, for now." Narrator confesses discomfort as the baseline state, not a hazard to remove: "the residual moves while you watch... If that feels uncomfortable, it should." Frame still holds (context/boundary mechanism); this module names where more-is-better breaks: "More context makes a good answer likelier. Less access makes a bad answer smaller... Scope it down far enough and the system is safe and useless. Nobody hands you the number." M5-prework brings in Mata v. Avianca / Deloitte-DEWR as real external failures — training's own worked exercises stay hypothetical by comparison; worth checking whether training ever puts ITS OWN system's fabrication on the page (candidate site for point-of-view 100).

## M5 Output Quality
Payoff of M3's held doubt: `hallucination-bakeoff.md` Phase 1 — "Your target is the ungrounded briefing from Module 3. You'll reuse the Module 3 synthesized answer as the test corpus... The briefing already lives somewhere on the edge of ungroundedness; that's why it's the right test." The training turns its own earlier deliverable (the thing it told the student to "hold the doubt" on) into the flawed specimen under the microscope — the narrator's own prior output is what gets dissected. This is the strongest candidate yet for narrative-100 ("the turn is the training's own failure") and POV-100 ("narrator's own failure on the page"), since it is literally the training's artifact, not a hypothetical, that gets cut open. Frame: "grounded ≠ accurate... traceable to evidence" — holds. Stance: "Don't pick a method. Run the candidates" — empirical-over-authority defended via the scoreboard mechanism itself (four detectors, precision/recall), not asserted.

## M6 Evaluations
Frame-break named explicitly: `when-the-score-stops-moving.md` — "A flat score is information about the judge... The score went flat because the judge had nothing left to flag, not because the work had nothing left to improve... You have not checked it against yourself." The training's own central promise (self-improving loop) is shown to have a blind spot it built into itself. `new-human-role-in-the-loop.md` closes with unresolved doubt about autonomy itself: "Every clean week is real evidence the loop is working, and real erosion of your ability to tell when it stops working. Those are the same weeks... you lose the eye that made you worth putting in charge of it, slowly enough that nothing announces it." That is a scar on the training's own central sales mechanism (autonomy), stated plainly, not resolved. Stance: "Groundedness protects the floor. Steering raises the ceiling... Do not collapse them" — defended with the two-mail thought experiment (grounded-but-vague vs ungrounded-but-sharp).

## M7 Personal to Team
Position against a real vendor temptation: `share-your-work.md` — "*'Share the whole agent'* is a vendor pitch and is NOT on the list." `access-is-not-absorption.md`: "The agent file is a page of instructions. It is not where the work lives... which is why the product being sold as a shared agent is always three of the four parts, with the fourth still sitting with whoever built it." Named failure inside the module's own exercise: "The technical plan filled quickly. The people plan stalled on names... That was not the exercise being hard. That was the exercise being accurate."

## M8 Agents Building Agents
Closing turn folds M3's doubt back in explicitly: `where-is-this-all-going.md` — "The kernel came out of the same move as your first briefing: agents read, agents argued, something chose, and nothing in the room checked it. Hold that doubt the way you held it then." Frame-breaking admission about the room's centerpiece exercise: "Everyone in the room had access to every other folder... Now open the kernel and count how many folders it actually cites. That ratio is your rollout, in miniature... What the room took up from each other is the smaller number." The flywheel's own mechanism (agents reading agents, autonomy, synthesis) is shown to reproduce Module 7's absorption problem and Module 3's unverified-synthesis problem at room scale, on the page, unresolved. Closing stance against certainty: "Will your organisation learn faster than the model changes underneath it? ... nothing today answers it."

## Supplementary (what-is-an-agent.md, pointed sections)
Autonomy ladder (M5 pointer): rungs 1-6, "The move is not to jump from rung 1 to rung 6. The move is to earn the next rung." Reinforces stance already established (propose-then-act, M5/M6). LLM vs chat (prework pointer): "the whole conversation is re-read on every turn. The illusion of memory is a trick of the interface" — grounds Frame (context) at the literal mechanism level from the first page onward.

---

## Frame

**One sentence:** Everything an agent produces is a function of the context/boundary you hand it, so every module is the same discovery run at a bigger radius — prompt (M1) → file (M2) → multiple boundaries and stances (M3-M4) → measured evidence (M5-M6) → another person's context (M7) → the assembly rules themselves, handed to another builder (M8).

Three modules that only make sense through it:

- M1 `lectures/context-is-king.md`: "Same words. Different answer... That's context. Unglamorous, isn't it? And yet every useful thing in this training is built on this one idea." — states the frame outright, in the second lecture of the whole training.
- M2 `lectures/compounding.md`: "This is the same mechanism from Module 1: context shapes output, run at system scale. The context for this work is what the previous work produced." — the module's entire teaching point is explicitly the same frame, one shelf-life longer.
- M4 `lectures/practice-of-risk.md`: "Everything you have built so far gave the agent more... Now the move is to give it less... More context makes a good answer likelier. Less access makes a bad answer smaller." — security is the frame's negative space, not a new topic; the module only reads as a coherent unit if you already hold "context is the mechanism" from M1.

Where the frame breaks, named on the page: M7 `lectures/access-is-not-absorption.md` — "Access is easy; absorption is scarce... People take up what they already half know" — handing someone more context (access) stops producing better output once the receiver's own frame won't hold it; and M8 `lectures/where-is-this-all-going.md` — "Access was instant and complete. What the room took up from each other is the smaller number" — the room gave every agent maximal context and the kernel still cites only a fraction of it. The frame names its own edge, twice, at the two points a second person enters the loop.

## Narrative

**Five sentences, with a turn:**
A student arrives wanting output that's genuinely theirs, not the generic thing any LLM produces from a résumé. Across Modules 2-3 they build a system — memory, three retrievers, three synthesizing stances — that does real work on their actual challenge, and by Module 3's close it hands back something better than they could have written alone. But they can't tell which of it to trust: "the answer sits at that uneasy distance where you'd stake your reputation on some of it and not all of it, and you can't yet say which is which... Hold the doubt. Name it to yourself. Don't fix it here" (`multi-agent-systems.md` / `exercises/three-minds-one-synthesis.md`). Two modules later the training turns around and cuts open that exact artifact as the flawed specimen under the microscope: "Your target is the ungrounded briefing from Module 3... The briefing already lives somewhere on the edge of ungroundedness; that's why it's the right test" (`exercises/hallucination-bakeoff.md`). The doubt never fully resolves — it recurs, named, at the training's last lecture: "The kernel came out of the same move as your first briefing: agents read, agents argued, something chose, and nothing in the room checked it. Hold that doubt the way you held it then" (`lectures/where-is-this-all-going.md`) — so the shape the student lives through is not doubt-then-resolution but doubt carried competently, which the training treats as the actual skill.

Quoted turn: *"It still handed you something you cannot vouch for. Hold the doubt. Name it to yourself. Don't fix it here."* (`multi-agent-systems.md`, exercise *Three minds, one synthesis*)

## Point of view

Who is speaking: a practitioner close enough to the student's desk to use "you" throughout, giving direct instructions, but repeatedly stepping back from its own recommended techniques to flag where they mislead.

Three places the narrator shows itself, not just the exercise:
- `getting-going.md` / `lectures/what-just-happened.md`: "Agreeable answers won the round the model was tuned on... The self-report is the same kind of output as the thing it is reporting on." — the narrator distrusts the tool it just had the student rely on, in the same breath.
- `security.md` / `lectures/practice-of-risk.md`: "Nobody hands you the number. You pick it, you write down what is left, and you sign for it... Damn, this is complex stuff." — a visible, informal aside breaking the instructional register.
- `agents-building-agents.md` / `lectures/where-is-this-all-going.md`: "Nobody in this room knows yet, and the people running this training do not know either." — the narrator explicitly includes its own makers inside the uncertainty it's naming, not just the student.

Is the narrator's own failure on the page: yes, repeatedly and by design, not as a single confession but as a running thread. `evaluations.md` / `lectures/when-the-score-stops-moving.md` tells the student to audit the very judge the training just spent a module building with them: "You have not checked it against yourself... the judge and you do not agree as often as the number suggests." `agents-building-agents.md` admits the room-scale flagship exercise produced an unverified kernel: "nothing in the room checked it." The training's own central deliverables (the Module 3 briefing, the Module 6 judge, the Module 8 kernel) are each, on the page, named as unverified or only partially verified.

## Stance

Positions the training could lose a customer over, each with a mechanism or scar, not an assertion:

1. **Plain text and files beat databases/RAG infrastructure.** Defended mechanistically, not asserted: `building-agent-systems.md` / `lectures/compounding.md` — "reading it is reading, updating it is writing. Nothing sits between the model and what it's best at. Every fancier setup that promised to 'fix' this added a layer that the model had to work *around*." Costs a platform/tooling sale.
2. **An agent should reach less, even when that's a worse product to sell.** Defended against the training's own economics, explicitly: `security.md` / `lectures/practice-of-risk.md` — "Expect it to cost you a feature somebody in your company wanted. It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call." Held against the training's own commercial interest, on the page.
3. **Default to one agent; multi-agent is the exception, not the aspiration.** Defended right after the training's own flashiest demo: `multi-agent-systems.md` / `lectures/when-to-split-an-agent.md` — "A whole module just showed you multi-agent works. Next Monday, you will be tempted to apply it to everything. Don't." Undercuts the module's own sales pitch immediately after making it.
4. **You cannot share an agent; "share the whole agent" is a vendor pitch, not on the menu.** `personal-to-team.md` / `exercises/share-your-work.md`: "'Share the whole agent' is a vendor pitch and is NOT on the list." Refuses the easiest product to package and sell.
5. **Autonomy is earned rung by rung, never granted wholesale.** `supplementary/what-is-an-agent.md` (autonomy ladder, M5 pointer): "The move is not to jump from rung 1 to rung 6. The move is to earn the next rung." Refuses the "full autonomy" pitch that would be the more impressive demo.

Positions 2 and 3 are explicitly held against the training's own commercial or dramatic interest, on the page, not just implied.

## The pair

Stance and self-doubt run together throughout, not on alternating pages: the same lecture that tells the student to give the agent less access (`practice-of-risk.md`) also tells them nobody hands them the right number; the same exercise that has the student build a groundedness judge (`hallucination-bakeoff.md`) is immediately followed by a lecture instructing them to distrust that judge (`when-the-score-stops-moving.md`). This reads as someone who has been there — both stance and doubt, braided, never resolved into either pure confidence or pure hedge. It is not a hedge (there are hard positions, several against the training's own interest) and not a pitch (the training repeatedly undercuts its own flagship deliverables on the page).

## Scores

Frame: 94 · Narrative: 88 · Point of view: 92 · Stance: 90

## Smallest moves

1. Add one line inside `three-minds-one-synthesis.md` explicitly forward-pointing to the Module 5 exercise ("this exact file becomes the test case in two modules") so the M3→M5 payoff is visible at the moment of the doubt, not only in retrospect.
2. In `when-the-score-stops-moving.md`, name what the "afternoon" self-check against the judge actually looks like in one concrete line, so the narrator's admitted gap gets a mechanism the student can run, not just a confession.
3. Pull the M8 "count the folders the kernel cites" beat earlier into the Debrief prompt itself, so the room's absorption failure gets measured on the page inside the exercise, not only named afterward in the lecture.

