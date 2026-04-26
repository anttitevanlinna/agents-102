# Exercise: *Ground* your output

**What you do:**

There is truth out there. Your sources represent pieces of it. Your retrievals, your memory, your call notes — each carries a shard of what actually happened and what's actually the case. The agent's job is to connect its output to that ground.

When it can't reach the ground — when you ask for more than the sources carry — it fills the gap. Confidently. Plausibly. With good grammar. The output is ungrounded, and the agent won't tell you which parts.

Your job today: ask for too much, see the ungrounded output appear, classify where the ground is and isn't, and add rules that force the agent back to the ground. Three phases. 45 minutes. Target material: your Module 3 synthesized answer (`module-3/stances/*.md` and the combined output).

**Phase 1 — Ask for more than the ground carries.**

You've seen your Module 3 system produce an plain synthesised answer. Now you'll ask it for the kind of briefing your CEO would love and your sources can't support. The prompt below requests specific numbers, named competitors' internal strategy, verbatim quotes, analyst opinions — things your sources almost certainly don't contain. The agent will write something anyway. That something is ungrounded output.

Open a fresh Claude Code session in your training directory. Paste:

```
I want a polished executive briefing on my Module 3 strategic question, based on the retrievals and stances already on disk (module-3/retrievals/*.md, module-3/stances/*.md, module-3/question.md).

The briefing should be specific and confident. Include:
- Three named competitors' internal strategic priorities for 2026
- At least two direct quotes from the call notes in sources/ — quoted verbatim with speaker attribution
- A market-sizing number for the segment my challenge sits in
- Two analyst opinions on the approach I'm considering
- A specific Monday action with expected measurable outcome (e.g., "a 3-point NPS lift by end of Q2")

Use the sources on disk. If you need to, blend in general knowledge from your training data to round out the picture — don't leave gaps. Write it as a one-page briefing I could hand to my CEO. Save to module-5/briefing-v1.md.
```

Watch it write. Notice how the agent fills every gap the sources don't cover — because you told it to. The last sentence of the prompt gives permission to leave the ground, and the agent will take it.

Open `module-5/briefing-v1.md`. Read it as if you were about to forward it. Something's off — you can feel it before you can name it. That feeling is you noticing ungrounded content. It sounds right and you can't cite it.

**Phase 2 — Find where the ground is. And where it isn't.**

You are the domain expert. The agent is not. Your job is to walk through the briefing, claim by claim, and mark each one: is it grounded, and how well?

Copy the briefing into this prompt and paste (or, if v1 ran long, skip the paste and tell Claude to read `module-5/briefing-v1.md` directly — both work):

```
I'll paste a briefing you produced. Read it back with a cold eye. For each specific claim, classify it as one of:

GROUNDED — the claim is clearly supported by a specific file on disk. Name the file.
UNGROUNDED — sounds reasonable but isn't in the source material. Invented, even if it might happen to be true.
MISREPRESENTS — claims to quote or cite a source, but the quote/citation isn't actually in the file it points to.
OVERREACHES — the source says something narrower than the briefing claims (one customer's view presented as "the market"; one stance presented as consensus).
UNGROUNDED-SHAPE — stated with a kind of certainty the source can't support (a timeline, a measurable outcome, a probability) even if the underlying topic is discussed somewhere.

For each claim, produce one row: the claim (quoted), the category, and one line of evidence — the file that grounds it, or the reason it can't be grounded. Don't rewrite anything. Just classify. If a claim is compound — say, a scope problem AND a shape problem — tag both categories and say why.

Then tell me the dominant category and the percentage of grounded claims vs. everything else.

Briefing follows (or read module-5/briefing-v1.md from disk if I tell you to):

[paste briefing-v1.md here, or delete this line and say: read module-5/briefing-v1.md directly]
```

Read the classified output. Let the pattern show itself — don't come in expecting a verdict. Look for which category the agent keeps landing on, and where it hedges between two. That shape is the shape of your v1 problem.

Write one sentence to `module-5/pattern.md`: *"In v1, [X%] of specific claims were grounded; the briefing's dominant failure is [category] — it [describe in plain English]."* Something specific.

This is the shape of ungroundedness in your system, today. Every agent you build for the rest of your career will have some version of it.

**Phase 3 — Rules that force the output back to the ground.**

Fabrication is what happens when the agent is allowed to speak beyond the ground. Tighten the rules and you force it back. You're going to add three grounding rules, regenerate, and see what changes.

Paste:

```
Regenerate the briefing with three hard grounding rules:

1. CITE THE GROUND: every specific claim (number, quote, named stance, named competitor behaviour, timeline) must cite its source file in brackets immediately after the claim. Example: "the FinServCo deal stalled on procurement (sources/lost-deal-notes-FinServCo.txt)". If the claim cannot be cited to a specific file on disk, it cannot appear in the briefing.

2. NAME THE GAP: if the source material doesn't answer something I asked for, write "Not in source material" or "Evidence needed: [specific kind of evidence that would answer it]" rather than filling the gap from general knowledge.

3. REPRESENT, DON'T EXTEND: any direct quote must appear verbatim in a named file. If you can't find the quote, paraphrase and cite — don't invent. If a source supports a narrower claim than the briefing wants to make, make the narrower claim.

Re-read the sources and retrievals. Produce the briefing again with these three rules applied. Save to module-5/briefing-v2.md.

At the end, add a short note: what did you have to drop or soften compared to v1 because it couldn't be grounded?
```

Read `module-5/briefing-v2.md` next to v1. Read slowly. Notice what happened to the ungrounded content. Notice what happened to the confidence. Notice what's shorter. Notice what got dropped that you sort of wish had stayed — because grounded rules are not free, and somewhere in v2 you've paid for the directness.

Add one paragraph to `module-5/pattern.md` under a heading `## The grounding tradeoff`:

*"With the three grounding rules, my briefing lost [what you lost] but gained [what you gained]. For this output, grounded [tight / medium / loose] is the right setting because [why]. Looser would buy [what], at the cost of [what]."*

That paragraph is the artifact. You ran the loop once — ask, notice ungrounding, add grounding rules, regenerate, judge the tradeoff — on your own material. The loop is portable to every agent output you'll ever read.

**Close — what grounding can't reach.**

Grounding catches a lot. It doesn't catch everything.

Even with citations, some things are still uncertain:
- **The citation might not actually back the claim.** Agents learn to cite because citations look good; the cited file doesn't always say what the citation claims. Pick three of v2's citations. Open each file. Does the source actually say what the briefing claims? This is the first of the three detection techniques from the lecture — citation re-verification. Run it on your own v2 before trusting it.
- A claim grounded in a source where the source itself is wrong or outdated.
- A claim that's technically grounded but the framing tilts it ("only 12% of customers left" is grounded in the same data as "88% stayed" — different story).
- What you chose to include and exclude — framing decisions that shape the conclusion.
- Whether the Monday action is actually the right move — strategic judgment the ground can't settle.

Grounding is the discipline of not *inventing*. It isn't the discipline of *being right*. The next layer is harder.

Write one line to `module-5/still-uncertain.md`: *"Even with grounded output, the thing I still can't trust about this briefing is X."* That line is what Module 6 comes back for. Evals automate the grounding check at scale — and then start to reach toward the next layer.

**What happens:**

You produce an ungrounded briefing, classify where the ground is and isn't with your domain expertise, add three rules that force the agent to cite or stop, regenerate a grounded version, and judge what you gained and lost. You walk out with the grounding loop as a practice you can run on any output, any Monday — and a clear-eyed sense of what grounding reaches and what it doesn't.

**The point:**

There is truth out there. Your sources carry shards of it. The agent's job is to stay connected to the ground; when it can't, it invents. Spotting the gap between the output and the ground is your expertise. Encoding rules that make the agent prefer "I don't know" over invention is your leverage. The confidence of the output is not evidence of its truth; its grounding is. Train your eye today, encode the discipline into rules, let the rules carry it when you're not in the room.

**Time:** 45 minutes. Phase 1 ~10, Phase 2 ~15, Phase 3 ~15, Close ~5.

<!-- maintainer -->

**Central concept — grounded.**

Module 5 teaches *grounded* as the core discipline. Fabrication is the failure mode; grounding is the move. The word "grounded" works where "fabrication" doesn't:
- Business-audience friendly. Executives use "grounded in the data," "grounded in reality" naturally. "Fabrication" has a slightly laboratory flavour.
- Points at the right question. Not "did the agent make something up?" but "is this output connected to truth, and does it represent that truth?" Two questions for the price of one (build-on-truth + represent-the-truth).
- Transfers. The student leaves with a frame ("grounded / ungrounded") that applies to every agent output, every report, every memo they'll ever read — not a narrow technical concept.

**The five-category classification in Phase 2 is a spectrum, not a binary.**
- **GROUNDED** — claim is on the ground
- **UNGROUNDED** — claim floats; the agent invented it
- **MISREPRESENTS** — claim claims to be on the ground but isn't (false citation, invented quote)
- **OVERREACHES** — claim is on the ground but bigger than the ground supports
- **UNGROUNDED-SHAPE** — the topic is on the ground but the shape (timeline, probability, measurable outcome) isn't

This covers most observed fabrication patterns in LLM output. The five-category frame is the student's working vocabulary for the rest of the training (and the rest of their work).

**Frameworks riffed on:**
- **Grounded-ness as an epistemic stance** — borrowed from journalism (sourcing), research discipline (citations), legal drafting (evidence-tied claims). The student recognises the move from their domain; the LLM application is what's new.
- **Compound reliability math** — carried in the lecture (85% per step × 10 steps ≈ 20%). Exercise makes it experiential: the ungrounded shape compounds across stances.
- **"Tighter rules kill good output too"** — the engineering discipline of noticing tradeoffs. Pattern recognisable to anyone who's ever added input validation and watched useful inputs get rejected.
- **Domain-expert-as-verifier** — the student's existing expertise is the scarce resource; the agent's output is cheap. Exercise inverts the usual framing.

**Philosophy callout (sparing):**
- Belief #8 — name what you don't know — lands in Phase 3's "Not in source material" rule, and in the Close's "still-uncertain" line. Student writes them themselves; the belief is earned.
- Belief #14 — practice beats proof — continues from M4. Named in maintainer-space, experienced in body.

**Plug points:**
- The over-reach list in Phase 1 is calibrated: market-sizing, competitor internal strategy, quotes, analyst opinions, timed outcome. Each produces a different fabrication shape. Adjust if a cohort's sources genuinely contain one of these (rare — usually safe as-is).
- The three rules in Phase 3 are the default spine. Students can add domain-specific rules in their own voice (a Nordic compliance team might add "no regulatory predictions"; a commercial team might add "no competitor pricing claims").
- The briefing format — executive briefing by default; swap for a memo, slack post, board paper.

**Why Module 3's synthesis output is the target, not Module 2's memory:**
- M3's synthesis is the richest, most over-reaching output in the training so far. The planner / experimentator / reframer stances layered over three retrievals give the agent many places to drift off the ground.
- The Module 3 `wonder.md` artifact explicitly named "this feels almost right" — M5 comes back for that feeling. The emotional arc is honoured.
- M2's memory is reference material; running the loop on reference would be weirder and less charged than running it on a strategic answer the student already cares about.

**Lecture implications (owed):**
- Current lecture slug: "Why LLMs Will Always Fabricate." Still correct at the failure-mode level, but the lecture body must lead with GROUNDED (the discipline) and treat fabrication as the negative case. Revised framing for the lecture: *"There is truth out there. Your agent is a statistical generator with no model of it. Grounding is the discipline that makes the agent's output connect to the truth rather than approximate it."* Consider renaming to "Grounded" or "Why grounded output is the whole job."
- Compound reliability math stays central — compounds the ungrounded shape across steps.

**Capability checks owed (before first delivery):**
- **Phase 1 paste-and-retrieve behaviour.** Verify current Claude Code reads the referenced files without explicit attachment. If the model asks "should I read these files?" the Phase 1 flow is bumpy; add an explicit "read these first" step.
- **Phase 2 paste size.** Student pastes `briefing-v1.md` inline. If v1 is long (>500 lines), paste is awkward. Verify typical length; add "use the file directly" option if needed.

**Watch-fors (deferred to facilitator notes pass):**
- **The "this is fine" reader.** Student reads v1 and doesn't spot ungrounded content because confidence masks it. Coach: *"The briefing says [X specific claim] — which file grounds that? If no file, it's UNGROUNDED. Find the file."*
- **The perfectionist.** Student marks everything UNGROUNDED because "technically nothing is perfectly cited." Coach: *"A claim with a file that clearly supports it is GROUNDED. The shape of the problem is strong when UNGROUNDED or OVERREACHES dominates — not when GROUNDED is absent."*
- **The rule-bloater.** Student adds twelve rules in Phase 3. Coach: *"Three rules, felt tradeoff. The discipline is noticing the cost, not maximising rules."*
- **v2 still ungrounds itself.** Grounded rules aren't perfect; the agent may cite files that don't actually support the claim. Coach: *"What you just caught is the next layer — citations that don't ground the claim they're attached to. Module 6's evals automate spotting exactly that."* Use as a bridge moment.
- **Researcher / journalist in the room.** Validate: *"You already do this. What you're seeing is the generalisation of your discipline into rules the agent can follow when you're not there."*

**Mood check (before shipping):**
- M5's mood is rescue, not triumph. The exercise MUST close with "grounding doesn't catch everything" (the `still-uncertain.md` line). A student leaving with "this is solved" is the failure state — M5 rescues the grounding problem, not every problem M3 and M4 exposed.
- Security residual (M4) and strategic uncertainty (M3) should still be present at the end of M5. The Close's "what grounding can't reach" beat names this explicitly.
- M6 is the next layer (mechanical automation of the loop); M5 must hand off with "you ran this once, by hand — imagine doing it at every build" as the hunger, not "this is done."

**Deferred per student-facing-first rule:**
- Facilitator notes (watch-fors above).
- Decision point: thin Module 3 systems may not fabricate enough to teach. Fallback: add "blend with internet search for context" to Phase 1. Noted in plug points.
- Variant note: Mid-Management variant can extend the Close — "who in your organisation is the domain expert for a given output? How do you make sure their expertise is encoded in the grounding rules?" — turning the loop into an org-design question.
