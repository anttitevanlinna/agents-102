# Running notes — Agents 101 story-depth judge, iteration 2

## Prework
Frame: none stated yet — setup checklist (Claude Code, connectors, tarball, snake game, meetings summary, mental-frame read). No narrator, no stance. Proof-lines pattern begins here ("*Proof: ...*") — will recur.

## M1 Getting Going
Frame: context shapes output — "Change the front, change the back" (context-is-king.md). Narrative: LinkedIn → generic site → guardrails phase by phase → yours. Turn: "Read the mental frame... If you only do one thing from this prework, do this" not quite the turn; real turn is exercise's Phase 5 look-back — Claude grades its own work "lovely" and soft, student corrects. POV: "Agreeable answers won the round the model was tuned on" (what-just-happened.md) — this is close to narrator naming the model's own bias, a real position. Stance: "You were the only check in the room" — position that the human, not the model, is the evaluator. Self-doubt present here (re: model's self-grading bias), on the page.

## M2 Building Agent Systems
Frame extends: persistence + automation = system; chat doesn't compound, files do. Narrative turn: "Phase 3 sharpened... pages got sharper instead of longer" — turn from growing-not-compounding fear to demonstrated compounding; "if the answer to 'could a competitor claim this' is ever yes, the memory is growing but not compounding" — stakes named explicitly. Stance: "Plain text beats a database" defended via mechanism (LLM strongest at reading/writing text). POV: still procedural narrator, some "you" address but no personal scar yet.

## M3 Multi-Agent Systems
Frame: "the filesystem is the meeting room" — multi-agent as hiring/coordination, not tech. Narrative turn: the synthesized briefing "sits at that uneasy distance where you'd stake your reputation on some of it and not all of it" (three-minds-one-synthesis.md) — explicit unresolved doubt carried forward, not resolved same-module ("Hold the doubt... Don't fix it here"). Stance: "Start with don't" (when-to-split-an-agent.md) — defends single-agent default against the room's own excitement for multi-agent, working against the training's own "isn't multi-agent cool" momentum. POV: narrator predicts the reader's own future mistake ("Next Monday, you will be tempted to apply it to everything. Don't.") — a stated experience of watching this happen before.

## M4 Security
Frame extends: certainty is a fantasy, only a loop. Narrative turn: "would you bet your job on it being safe? Probably not." — names the module's own emotional core as fear, not mastered confidence. Stance defended with mechanism: "avoidance beats reduction... it costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call" — position held against the training's own commercial interest (explicit, on the page). POV: "That's true for every agent in production anywhere in the world right now" — first-person authority claim, not hedge.

## M5 Grounded Output
Frame: grounded ≠ accurate; empirical method-selection over authority. Turn: "mostly right, ten times over, is mostly wrong" — compounding-error arithmetic as the turn, resolved into compounding-check arithmetic (test-and-fix loop). Stance: "Don't pick a method. Run the candidates" — defended by naming four detectors that fail differently, mechanism not assertion. POV: narrator cites its own worked example against the Mata v. Avianca case — evidence of having actually run the check, not just described it.

## M6 Evaluations
Frame: fixed judge = integrity of loop ("A yardstick you rewrite is not a yardstick," repeated verbatim across two lectures — the frame's load-bearing line). Turn: score goes flat — "It is tempting to read that as 'the work is done.' That is not what happened" (when-the-score-stops-moving.md) — this IS the training doubting its own tools on the page: the eval that seemed like the solution admits its own blind spot. POV strongest here: "You have not checked [the judge] against yourself... you have found what a flat line cannot show you: the judge and you do not agree as often as the number suggests." Self-critique of the training's own central mechanism.

## M7 Personal to Team
Frame: access ≠ absorption. Turn: "the people plan stalled on names" — named as the accurate outcome, not a failure of the exercise. Stance: "'Share the whole agent' is a vendor pitch and is NOT on the list" — explicit refusal of the easy/sellable answer. POV: Polanyi's "we know more than we can tell" cited as the mechanism for why sharing fails — narrator has a theory of its own failure, not just a warning.

## M8 Agents Building Agents
Frame closes the loop: "the tool that builds tools compounds." Turn: "We could have spent today building you one impressive agent to show on Friday... it would have been the wrong thing to sell you" — training naming its own tempting wrong move and refusing it, on the page, at the very end. Stance against commercial interest again: same move as M4. POV: "Nobody in this room knows yet, and the people running this training do not know either" (where-is-this-all-going.md) — narrator explicitly includes itself (the trainers/training) in the uncertainty, the clearest single line of narrator-admits-limits in the whole training.

---

## Frame

**One sentence:** Everything an agent does is downstream of what you feed it and what you hold back — context in Module 1, memory in Module 2, stances in Module 3, access in Module 4, evidence in Module 5, a fixed yardstick in Module 6, absorption in Module 7, and specification itself in Module 8 — so the training is one continuous argument that *giving and withholding, not prompting cleverness, is the whole craft*.

This reads as a frame, load-bearing across the arc, not a slogan restated. Three modules that only make sense through it:

- M1: "Context is whatever you tell it... All of it colors what comes next." (`lectures/context-is-king.md`) — the frame stated in its most naked form, before any system exists to apply it to.
- M4: "More context makes a good answer likelier. Less access makes a bad answer smaller... Now the move is to give it less." (`lectures/practice-of-risk.md`) — the frame inverted; without M1's statement first, "give it less" reads as a random pivot rather than the same lever run backward.
- M6: "The judge stays fixed... A yardstick you rewrite is not a yardstick." (`lectures/evals-as-steering.md`) — what you hold *constant* (the judge) is itself an act of context control; without the frame this reads as a testing-methodology footnote instead of the frame's third variant.

Where it breaks: M7 names the seam itself. "You cannot hand over what you learned getting here. You can hand over four things, and none of them is what you learned." (`lectures/access-is-not-absorption.md`) — the frame's whole machinery (give more, give less, hold fixed) assumes a single actor controlling inputs; the moment a second person enters, the lever stops being pullable by one hand, and the training says so rather than pretending the frame still closes the case.

## Narrative

**Five sentences, with the turn:** A student arrives believing that AI output is generic because the model is limited. Module by module they build something that increasingly looks and works like theirs — a site, a memory, a synthesized answer, an audited system, a benchmarked judge, a self-improving loop — and at every landing point the training tells them to hold their doubt rather than resolve it. By Module 6, that doubt turns out to point at the training's own proudest artifact: the fixed judge that was supposed to be certainty finally arrived is caught, on the page, not seeing what it was never built to see — *"The score went flat because the judge had nothing left to flag, not because the work had nothing left to improve"* (`lectures/when-the-score-stops-moving.md`). The turn is that the training's own central mechanism for removing the human from the loop is shown failing silently, exactly the way the training spent five modules warning the model itself fails silently. The close doesn't repair this with a bigger fix; it reframes the human's job as designing what the system is allowed to never see, which is a demotion dressed as a promotion.

Quoted turn: *"A flat score is real information, but only about the frame the judge can see. The moment the number stops moving is not the moment to walk away. It is the moment the easy signal runs out and your judgment comes back in."*

## Point of view

The narrator is someone who has run this exact loop, watched it fail in the specific way it fails, and is telling the student before it happens to them — not a generic instructor voice reciting best practice. Three places the narrator shows:

- "Agreeable answers won the round the model was tuned on... The self-report is the same kind of output as the thing it is reporting on." (`lectures/what-just-happened.md`) — names a mechanism (RLHF's effect on self-grading), not just a caution.
- "Against the Mata v. Avianca pre-read, source triangulation caught an unsourced 'small firm' descriptor and an unsupported 'ten minutes' estimate... Even a careful teaching case benefits from the check." (`lectures/grounded.md`) — the narrator ran its own detectors against its own teaching material and reports the actual catch, evidence of having done the work, not asserted it.
- "Nobody in this room knows yet, and the people running this training do not know either." (`lectures/where-is-this-all-going.md`) — the narrator explicitly includes the training's own authors inside the uncertainty rather than standing outside it as the one who has already figured it out.

Is the narrator's own failure on the page? Yes, and it is the sharpest instance in the training: `lectures/when-the-score-stops-moving.md` puts the training's flagship mechanism (the fixed-judge eval loop, the thing Module 6's whole Big Idea rests on) on trial and finds it blind by design — "Nothing has been scoring the judge... you have found what a flat line cannot show you: the judge and you do not agree as often as the number suggests." This is the training's own tool caught short, narrated without a rescue.

## Stance

Positions the training could lose a customer over, each with where it is defended rather than merely asserted:

1. **Single-agent is the default; multi-agent is usually overkill.** Defended by mechanism, not preference: "The test is unkind on purpose... can I write one prompt that produces the same quality of output? If yes, you didn't need to split." (`lectures/when-to-split-an-agent.md`) — a sellable, exciting multi-agent capability is talked down on the page.
2. **The cheapest security control is the door you don't open, and that costs the vendor a sale.** "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call." (`lectures/practice-of-risk.md`) — explicitly against the training's own commercial interest, named as such.
3. **You cannot productize a shared agent; the vendor pitch is off the menu.** "'Share the whole agent' is a vendor pitch and is NOT on the list." (`exercises/share-your-work.md`) — a direct swipe at the category of product (agent-as-deliverable) that a training like this could otherwise be selling toward.
4. **The AI-optimism thesis (agents can learn any organizational process, the "bitter lesson" wins) is held as an open question, not asserted.** "We are about to find out." (`lectures/evals-as-steering.md`) — refuses to assert the thing that would make the whole training's premise feel more secure.
5. **The training will not build the demo that sells best.** "We could have spent today building you one impressive agent to show on Friday... it would have been the wrong thing to sell you." (`agents-building-agents.md`) — a closing-module admission that the flashier, more marketable version of Module 8 was available and rejected.

Position #2 and #5 are both held against the training's own commercial interest, and both are on the page, not implied.

## The pair

Stance and self-doubt run together throughout, not as alternating beats but fused into single lines: the training holds a position ("give it less," "don't split," "no vendor pitch") in the same breath it admits its own tools can't verify themselves (M6's judge audit, M3's "hold the doubt," M8's "nobody knows"). This reads as someone who has been there — the doubt is specific to mechanisms the training itself built (the fixed judge, the synthesized briefing, the shared agent), not generic hedging about AI-in-general. A pitch-only training would resolve the M6 flat score as "success"; a hedge-only training would never commit to "start with don't" or "an agent that reaches less... is still the right call." This one does both, in the same modules.

## Scores

Frame: 92 · Narrative: 88 · Point of view: 85 · Stance: 88

## Smallest moves

1. In `lectures/agent-loop-raw.md`, add one line naming where the "text crossing a boundary" frame stops applying (e.g., binary/non-text tool calls), so M4's frame-break is stated as plainly as M7's already is.
2. In `exercises/eval-loop.md`, surface the judge-audit move from `when-the-score-stops-moving.md` as a Phase 5 prompt inside the exercise itself, not only as a following lecture — the strongest self-doubt in the training currently lands one file after the artifact it doubts.
3. In `agents-building-agents.md`'s Key Concepts, add one bullet naming the commercial-interest-against-self move explicitly (mirroring M4's), since it recurs at open and close but is never named as a pattern for the student to notice on their own.

