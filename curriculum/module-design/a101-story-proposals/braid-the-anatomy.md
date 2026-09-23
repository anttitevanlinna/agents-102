# Braid the anatomy

Story proposal for Agents 101. One of the creative-diverge set per
`trainings/agents-101/story-depth.md` § Dispatch shapes. Opening bias: **invent nothing, braid
what is already on the page.** The frame, the plot, the narrator and most of the stance lines
below are quotations. Everything I draft is gathered in § What this proposal draws, at the end,
so the cost of adopting it can be read as a list of sentences rather than a vibe.

Nothing here edits curriculum.

---

## 1. Frame

> **An agent is an assembly you can name part by part, and every part is one decision: what you
> give it, and what you keep back.**

The training already runs this frame. It is the refrain two storytelling judges found
independently, stated in the same construction in six lectures, and never once said at the level
of the whole arc:

- *"In the full agent picture, this is the first piece: context. Later you add tools, goals,
  checks, boundaries, and loops."* (M1, `context-is-king.md`)
- *"In the full agent picture, Module 2 adds shelf life."* (M2, `compounding.md`)
- *"In the full agent picture, other agents are part of the tool surface."* (M3,
  `when-to-split-an-agent.md`)
- *"In the full agent picture, this is the boundary piece."* (M4, `practice-of-risk.md`)
- *"In the full agent picture, this is the check."* (M5, `grounded.md`)
- *"In the full agent picture, evals turn checks into a loop."* (M6, `evals-as-steering.md`)
- *"At this point the full picture is visible: model, context, tools, goal, loop, checks,
  boundary, interface."* (M6 close, `new-human-role-in-the-loop.md`)

The refrain has a hole. Its own list ends on **interface**, and the interface piece is the only
part of the anatomy that never gets its refrain line, although M7 is the module that teaches it.
M8 has no line either, and M8 is where the leader stops assembling by hand.

The second half of the frame sentence is the third judge's reading, which is the same frame with
the leader's decision inside it: *a training about context, what you feed the system, what you
withhold, and who stays responsible for the gap.* Anatomy plus withholding plus accountability.
That is a builder leader's frame and not an engineer's: the parts are delegation decisions, and
each one is a thing you decide about work you will not personally do.

### Each module as a case of it

| Module | The piece | The decision, in the leader's terms |
|---|---|---|
| M1 Getting Going | context | Give it your world and the output stops being generic. *"Phase 1 is fine. Phase 6 is yours."* |
| M2 Building Agent Systems | shelf life | The giving becomes a file, so it survives the session. *"A folder of markdown files. That's it."* |
| M3 Multi-Agent Systems | other agents | Give the work more than one stance, and give up the single head that answers for it. *"Three stances beat one summarizer."* |
| M4 Security | boundary | The first piece you decide by subtraction. *"Should the agent have write access to that system? If not, scope down before you scope up."* |
| M5 Grounded Output | the check | Give it evidence, withhold your belief until a claim is traceable. *"Grounded means traceable to a real piece of evidence."* |
| M6 Evaluations | the loop | Give the system your standard so it applies while you are absent, and hold one thing still. *"A yardstick you rewrite is not a yardstick."* |
| M7 From Personal to Team | interface | The piece that faces other people, and the first one you cannot decide alone. *"Access is easy; absorption is scarce."* |
| M8 Agents Building Agents | the assembling | You hand over the building and keep the deciding. *"The agents produced the options. The human picks."* |

Only through the frame do M1 and M4 read as the same kind of move rather than two unrelated
topics. That is the test the rubric sets, and the corpus passes it today without saying so.

### Where the frame breaks, stated as the training would state it to a student

Three breaks. The first is the one two judges asked for by name. All three are drafted lines,
placed after the move that earns them.

**Break 1, at M4, after the mitigation menu.** The training spends three modules teaching you to
give the agent more, then spends a module teaching you to give it less.

> Three modules of this training taught you to give the agent more: more context, longer shelf
> life, more stances at the table. This module teaches the opposite move on the same dial. Both
> are true, and the difference is what happens when the agent is wrong. More context makes a good
> answer likelier. Less access makes a bad answer smaller.

**Break 2, at M7, after the people plan stalls.** The frame says every part is your decision.
Absorption is the part that is not.

> Every piece so far was yours to decide. This one is not. You can hand someone the context, the
> skill, the output, the interface. Whether they pick it up is their decision, made for their own
> reasons, on a Tuesday you will not be in the room for.

**Break 3, at M8, in the close.** The anatomy is stable, the thing it is made of is not. This is
also the future thread's last echo, so it does double duty and is the reason the proposal can
afford three breaks.

> The parts have not changed all year. Context, tools, boundary, checks, loop, interface. What
> the model can do with each of them has changed twice. The assembly is the durable half.

---

## 2. Narrative

The mood arc is fixed and the plot below lives inside it: joy, compounding, unease, deeper
unease, rescue, leverage, generosity, forward hunger. M3 and M4 stay open until M5. M8 ends
hungry.

**Five sentences.**

1. A leader who has been getting the same competent, generic paragraphs everyone gets learns in
   one hour that the whole variable is context, and walks out with something that sounds like
   them.
2. They point the move at the challenge they actually get paid to move, and the memory gets
   sharper instead of longer, which is the first thing they have built that compounds.
3. Then they run this training's best instrument on that challenge, three retrievers, three
   stances, a framework holding the synthesis together, and it hands back an answer they would
   half stake their reputation on without being able to say which half.
4. The recovery is not more context but less and narrower: a boundary that decides what the agent
   may never see, a benchmark that decides what counts as traceable, and a loop that keeps
   applying the standard while they are out of the room.
5. Which leaves them one level up, handing the assembly first to other people and then to the
   agent itself, carrying the one question the training refuses to answer.

**The turn is sentence 3, and it is the training's own move failing in front of the student.**
The anchor's top rung asks for exactly that, and A101 already has the scene. It happens at the
close of `three-minds-one-synthesis.md`:

> *"You can't tell yet. Three retrievers read plainly, three stances pushed, a framework held the
> synthesis together, and still, the answer sits at that uneasy distance where you'd stake your
> reputation on some of it and not all of it, and you can't yet say which is which. That feeling
> is correct. Hold the doubt."*

What that beat does not say is that the failure belongs to the training, not to the student. One
drafted sentence, placed immediately before *"Hold the doubt"*, converts a good beat into the
narrative turn:

> Everything you just did is the move this training teaches, run properly. It still handed you
> something you cannot vouch for.

That is the whole change to the plot. It does not resolve M3's unease; it sharpens it by naming
whose failure it is, which the mood contract wants.

Two smaller placements the plot needs, both using lines that exist:

- **M5 is written as the rescue and says so**, and it already refuses to over-rescue: *"This
  module is the rescue. Not full closure: your Module 3 doubt and your Module 4 residuals stay
  where they are."* Keep verbatim. It is the plot's hinge sentence.
- **M6 carries the promotion**, already written: *"The destination is not 'the human disappears.'
  That is the lazy story. The better story is stranger: the human moves one level up."* In this
  plot that line is the consequence of the turn, not the turn itself, and it reads better for it.

---

## 3. Point of view

**Who is telling this.** Someone who builds these systems for their own work and has put them in
front of other people's organisations, and who has been wrong in both places. Not a vendor
narrating capability, not a neutral handbook. The narrator is already on the page in asides and
admissions; what is missing is one incident.

**The register, in three sentences that already exist.** These are the calibration; anything
drafted for the narrator should sit inside this range.

1. *"You built something. It works. Would you bet your job on it being safe? Probably not."*
   (`practice-of-risk.md`) The narrator assumes the feeling because the narrator has had it.
2. *"You cannot hire three agents and expect the output to be three times as good... please, for
   the sake of your sanity, write the one prompt."* (`when-to-split-an-agent.md`) The
   exasperation of someone who has paid the coordination cost.
3. *"Nobody knows where agents are going. Not Anthropic, not your board, not the people running
   this training."* (`what-just-happened.md`) The narrator refuses the authority position that
   this kind of training defaults to, and puts itself in the same boat as the room.

### The scar slot

I cannot write Antti's incident and I am not going to invent one. What follows is the slot.

**Module: M4, inside `practice-of-risk.md`.** Placed after *"The work is the loop"* and before
*"The best mitigation is the one you don't need."* Reason: the scar has to defend the door you do
not open, which is the training's strongest against-interest position and currently its most
asserted one. It also lands where the frame reverses, so the narrator's failure and the frame's
break are the same beat. A scar here deepens M4's unease rather than resolving it, which is what
the mood contract asks for.

**Shape of incident:** the narrator gave an agent access that was reasonable at the time. The
agent used exactly that access, did what it was told, and produced something the narrator did not
want. The narrator found out afterwards, from an artifact, not from watching. No tidy fix at the
end; the fix was a door closed, and the residual is named.

**What it must show, or it is not worth the space:**

- The decision was the narrator's own, not a client's, not a cautionary tale about somebody else.
- The gap between *it did what I told it* and *I did not want that*. The agent is not the villain.
- One specific door, nameable in a sentence. Not "a security incident".
- How the narrator learned. If the answer is "I was watching", the incident does not carry the
  module, because the whole module is about systems you are not watching.
- No resolution beyond the door. M4 does not resolve.

**Length:** eight to fourteen lines, first person, signed like `story-of-module-6.md` is signed.
Shorter than the AE101 one because A101's narrator has not been first-person before this point
and the switch should be an event.

**The surrounding beat, drafted, with the placeholder marked.**

> Two of the four steps above are easy to teach and hard to do. Assess and mitigate are a method.
> Naming the residual out loud is a thing people avoid, because it is a sentence with your name
> next to it.
>
> So here is one of mine.
>
> **[ANTTI'S INCIDENT GOES HERE. One door, opened by me, used exactly as opened, and how I found
> out afterwards. Eight to fourteen lines, first person, no resolution past the door I closed.]**
>
> I did not get better at security that week. I got shorter. The system I run now reaches fewer
> places than the one I was proud of, and it is the only change that has held.

**Fallback slot, if M4 is wrong.** M7, against *"the people plan stalls on names"*: an incident
where the narrator shared something that worked and nobody used it. That is the leader-shaped
scar and it defends the absorption position rather than the boundary one. Weaker choice for point
of view, because M7's generosity mood makes a scar read as a caution rather than a wound, and
because the M4 slot buys the frame break at the same time. One scar, not two.

---

## 4. Stance

The positions this training would lose a customer over. Four exist and are defended; two are
asserted and I draft the defence; one does not exist and is the against-interest rung the judges
asked for.

**1. Multi-agent is usually the wrong call, said inside the multi-agent module.** Defended by
mechanism already. *"Inside a workflow, start with don't."* Three named tests (access, dialect,
stance) and the bluff test: *"can I write one prompt that produces the same quality of output?"*
Keep untouched.

**2. Certainty is not available, and the discipline is the answer.** *"Certainty is a fantasy you
inherited."* Defended with three mechanisms (non-determinism, the instruction set as attack
surface, emergent capability) and the medicine analogy. Keep untouched.

**3. The plainest setup beats the tooling somebody would rather sell you.** *"Every fancier setup
that promised to 'fix' this added a layer that the model had to work around."* Defended by
mechanism: text is what the model is strongest at. Against our own interest already, and it says
so: *"the one that sounds too much like common sense to charge for."* Keep untouched.

**4. The agent check does not replace security.** *"Concluding that the agent check replaces
security ships a breach."* Defended by naming the failure it prevents. Keep untouched.

**5. "Share the whole agent" is a vendor pitch.** Asserted, every judge said so. Drafted defence,
two sentences, placed in `personal-to-team.md` directly under the four shapes, in the frame's own
vocabulary so it earns its keep twice:

> An agent is context, a boundary, a set of checks and somebody who answers for what it does. The
> first three copy in an afternoon. The fourth does not copy at all, which is why the product
> being sold as a shared agent is always three of the four parts, with the fourth still sitting
> with whoever built it.

**6. The scar's position, at M4.** Once the incident is on the page, the door-you-do-not-open rule
is defended by a scar rather than by common sense, and the against-interest reading sharpens: the
trainer's own best fix reduced what their system can do.

**7. Against our own commercial interest, drafted, at M8.** The training closes on a flywheel and
then pivots into naming the next four steps of the product ladder. Judges flagged the pivot as
where the refusal gets spent. The drafted replacement holds the refusal and names its price:

> We could have spent today building you one impressive agent to show on Friday. It would have
> demoed well and it would have been the wrong thing to sell you, because the agent that matters
> in six months is one nobody in this room has thought of yet, built by somebody who is not you.
> What you take out of here is the ability to build the one you have not thought of. That is
> slower, it is harder to put on a slide, and it is the only part that is still worth anything
> after the model changes.

**The pair.** Two of three judges already read A101 as someone who has been there rather than as
a pitch or a hedge. The scar and item 7 push the stance side; the beige counter-voice below pushes
the doubt side. The pair should be read again after both land, because an against-interest refusal
plus a first-person failure in the same arc is also how a training starts sounding pleased with
its own modesty.

---

## 5. The learning-set as consequence

Five learnings. A, B and E exist and need naming and echoes. C is the orphan-beats braid and is
the one piece of real construction in this proposal. D exists as a one-module headline and needs a
plant and a callback, which is the move all three step-0 judges converged on.

C and B are braided at M6, where the training already runs both halves of one mechanism twice and
calls it nothing: variety in, selection out, memory keeps.

### A. The anatomy

**Question carried:** *Which piece of the agent am I actually deciding about, and what does it get
to see?*

- **Planted, M1**, `context-is-king.md`: *"In the full agent picture, this is the first piece:
  context."*
- **Complicated, M2**, `compounding.md`: *"Module 2 adds shelf life."* The piece stops dying at
  the end of the session.
- **Complicated, M3**, `when-to-split-an-agent.md`: *"other agents are part of the tool surface."*
  A part of the anatomy turns out to be another whole anatomy.
- **Complicated, M4**, `practice-of-risk.md`: *"this is the boundary piece."* First piece decided
  by subtraction, and the frame's break (§1, Break 1) is drafted here.
- **Paid off, M6**, `new-human-role-in-the-loop.md`: *"At this point the full picture is visible:
  model, context, tools, goal, loop, checks, boundary, interface."*
- **Owed, M7:** the interface piece never gets its refrain line although the list promises one.
  Drafted, in `personal-to-team.md`: *"In the full agent picture, this is the interface piece. It
  is the first one that has another person on the other side of it."*
- **Owed, M8:** the refrain's last turn, drafted: *"You just described a piece and something else
  built it. The parts did not change. Who assembles them did."*
- **Governor:** *Which piece is this, and what does it get to see?* Fires in a meeting about an
  agent the leader will never run, which is the theory plan's test for a leader's governor.
- **Counter-voice:** more context does not fix generic output. The case is already in the corpus
  and never used this way: the synthesizer with three rich stances in front of it still averages
  them into beige. Drafted, one line at M3: *"The beige answer was not short of context. It had
  three stances and could not choose between them."*
- **Future:** a question, not a prediction. The parts have been stable while what the model does
  with each has not. Landed as Break 3 at M8.

### B. Confident is not verified, and neither is the check

A101's strongest existing learning (step-0 depth 85 to 100) plus the one control law the corpus
lacks outright: the gate is a claim too.

**Question carried:** *This came back confident. What would close it?*

- **Planted, M1 Debrief:** *"The LLM is generous to a rules file it just helped write."* The law
  under it is unnamed until M5. Theory plan wants it named at the M1 close, after the move.
- **Complicated, M3:** the turn, *"you'd stake your reputation on some of it and not all of it."*
- **Complicated, M4:** *"'I can't tell' is a real answer."* Not a failure, an artifact.
- **Complicated, M5 pre-read:** *"asking the same model 'are you sure?' is not a check on the
  world; it is another fluent answer."*
- **Paid off, M5:** the benchmark. Four detectors, one scorer, and the winning judge *"plainly
  names its own blind spot."*
- **Paid off again, M6:** `when-the-score-stops-moving.md`: *"A flat score is real information,
  but only about the frame the judge can see."* This is A101's version of the gate being a claim,
  already written, and nobody named it as the same idea.
- **Governor:** *Would you let it send the mail? What would have to be true?* Already the M6
  closer's spine.
- **Counter-voice:** the judge you built is also unverified. The corpus has the half about what
  the judge cannot see; the missing half is the judge's false-pass rate against your own
  judgement. Drafted, at M6: *"You have not checked the judge against yourself. Score a handful of
  outputs by hand, compare, and you will find out whether your judge passes work you would
  reject."*
- **Future:** the top rung the rubric says no A101 learning reaches. Drafted governor at M8:
  *"What would change our mind about this check?"*

### C. Variety is something you put in; the default is beige

The braid. Every beat below is already on the page and no cold reader named the learning, because
nothing connects them.

**Question carried:** *Who in this system is allowed to disagree?*

- **Planted, M1**, `personal-site-with-guardrails.md` Phase 4: anti-branding. *"Complaining is
  easier than praising... invert the easy thing."* The student's first deliberate act of putting
  variance in on purpose, and it is the phase that makes the site theirs.
- **Complicated, M3:** the three stances, the Rory seat, and the named failure with no mechanism
  under it: *"the synthesizer averages everything into beige."* Plus the rescue:
  *"Frameworks are the synthesizer's spine. Without one, it tends to summarise. With a framework,
  it picks."*
- **Complicated, M5:** the benchmark is the same mechanism wearing a lab coat. Four detectors
  *"chosen because they fail in different directions, so the scoreboard gives you real spread."*
  Variety generated on purpose, then selected against evidence.
- **Paid off, M6:** the two evals. *"Groundedness protects the floor. Steering raises the
  ceiling. Do not collapse them."* The training's own headline, in its own words, at the place
  where the mechanism has run twice.
- **Paid off at room scale, M8:** the proposal forum. *"Do not average the room."* Twenty agents
  generate, a synthesizer selects, the kernel retains, and the rule that keeps it honest is that
  every claim cites the file it came from.
- **Naming beat, drafted, M6, after the two-evals slide:** *"You have run this twice without
  calling it anything. Something generates more than one candidate, something else picks, and
  what wins gets written down. The floor eval and the ceiling eval are the picking half. The
  three stances and the four detectors were the generating half."*
- **Governor:** *Who here is allowed to disagree, and what makes it pick?*
- **Counter-voice:** the training's own warning, unchanged. *"You cannot hire three agents and
  expect the output to be three times as good."* Variety has a coordination cost and most of the
  time you write the one prompt.
- **Future:** a question. The floor gets cheaper with every model release; nobody has shown the
  ceiling does. Drafted, M6 or M8: *"Each model release makes the floor cheaper to hold. No
  release so far has told anyone what good means in your company."*

### D. Access is not absorption

Today a single-module headline: stated at M7, restated inside M7, no plant, no callback. All three
step-0 judges named the same smallest move.

**Question carried:** *Who absorbs this, and what do they already know?*

- **Plant, drafted, M2:** the memory is the student's own absorptive capacity, made literal. In
  `compounding.md`, under the tacit-knowledge beat: *"The agent can only work from what somebody
  wrote down. Most of what you know about your own company, nobody has."*
- **Complicated, M4:** the security skill travels and that is the point, *"Give a teammate the
  skill, install it in their runtime, and they can call the same method."* A teammate who has it
  installed and does not know when to run it has access and nothing else. Drafted half-line only.
- **Named, M7:** *"Access is easy; absorption is scarce. The technical plan fills quickly; the
  people plan stalls on names."* Keep verbatim; it is the best leader sentence in the corpus.
- **Paid off, M8, drafted callback:** the shared folder is a rollout in miniature. *"Everyone in
  the room had access to every other folder. Look at the kernel and count how many folders it
  actually cites. That ratio is your rollout."*
- **Governor:** *Who absorbs this, and what do they already know?*
- **Counter-voice:** the training's own artifact refuses to travel either. Drafted, M7: *"You
  cannot hand over what you learned in the last six modules. You can hand over four things, and
  none of them is the six modules."*
- **Future:** a question. Does the organisation's capacity to take something up grow as fast as
  its access does? The leader's version, and the only future question in this set that is about
  people rather than models.

### E. The model rotates; what the organisation learned does not

The future thread. Today the training asks it once, at M6, through Mollick, and drops it.

**Question carried:** *Will your organisation learn faster than the model changes underneath it?*

- **Plant, drafted, M2 Debrief:** *"The model will change under this. The memory will not."*
- **Complicated, M5:** already written, and it is a vendor-adjacent training naming a permanent
  limit. *"This isn't a bug that gets patched in the next release. It's the shape of the
  technology. Later models will fabricate less; they won't stop."*
- **Complicated, M6:** Mollick's question, already the module's opener. *"Will the bitter lesson
  apply inside your company?"*
- **Paid off, M8, drafted:** Break 3 plus the question itself as the closing beat, before *"a
  flywheel, not a graduation."*
- **Governor:** *What would change our mind?*
- **Counter-voice:** the bitter lesson cuts at us. Drafted, M8: *"Some of what you built in these
  eight modules will be obsolete within a year. The interesting question is which half, and
  nobody in this room knows yet."*
- **Future:** this learning is the future thread, and it must stay a question. The rubric scores a
  prediction negative, and the temptation at M8 is to answer it with the flywheel.

### The braid, in one paragraph

A generates the set: every learning is a question about one part of the assembly. B and C are the
two halves of one mechanism and meet at M6, which is why the spine reveal belongs there and not at
M1. D is A applied to a part the leader does not control. E is what A is worth once the model
underneath it rotates. The carry is spread across A, B and C rather than sitting on one, which the
rubric reports as carry share and which is the deliberate trade named in § 8.

---

## 6. Titles

My revision of `curriculum/evals/story-depth/a101-skeleton-to-be.md`. `(keep)` is already on the
page, `(rename)` replaces a current title, `(new)` does not exist. **Where I differ from the
skeleton-to-be I mark `[delta]` and say why in one clause.** Titles are student-facing: no
em-dashes, no term planted before the beat that earns it, each one literally true of what sits
under it.

```
M1 · Getting Going                                    mood: joy
  EXERCISE · Paint by agent with guardrails
      Phase 1: The boring baseline                   (keep; runs BEFORE the lecture)
      Phase 4: Anti-branding, the mirror             (keep) [delta: this is learning C's plant,
                                                      no title change, but it stops being an
                                                      exercise phase and starts being cited]
  LECTURE · Context is King                          (keep title; moves after Phase 1)
      ## Same question, two answers                  (rename)
      ## It reads the whole conversation every time  (keep)
      ## Context is whatever you tell it             (keep)
      ## The first piece of the picture              (new) [delta: skeleton-to-be has no slide
                                                      for the refrain's first instance; the line
                                                      is in the body already]
      ## A file it reads every time                  (rename: The move you're about to make)
  LECTURE · Iterate and Learn                        (keep title, gets slides)
      ## You felt context move                       (new)
      ## Why the retro was kind to you               (new)
      ## The report is a hypothesis, not a result    (new)
      ## You act on the future to know what's real   (new: existing line)

M2 · Building Agent Systems                           mood: compounding
  LECTURE · Compounding
      ## Two words, held together                    (keep)
      ## Why the sharpening happens                  (keep)
      ## A folder of text, and that is the point     (rename)
      ## It gets better by being edited              (new)
      ## Could a competitor claim this?              (rename)
      ## It can only use what someone wrote down     (new: learning D's plant) [delta: skeleton
                                                      says "What you haven't written down, it
                                                      can't use"; mine puts the agent in the
                                                      subject slot, which is the fact]
  Debrief
      ## Fix the output, then fix the rule           (new)
      ## The model will change under this            (new: learning E's plant)

M3 · Multi-Agent Systems                              mood: unease, unresolved
  LECTURE · When to split an agent (and how)          (keep title, gets slides)
      ## Start with don't                            (new: existing line)
      ## Split when they can't be one                (new)
      ## Three stances beat one summarizer           (new: existing line)
      ## Left alone, it averages to beige            (new: existing line)
      ## A framework makes it pick                   (new: existing line)
      ## Other agents are part of the tool surface   (new) [delta: the refrain line is in this
                                                      lecture's body and had no slide]
  LECTURE · Debugging Stuck Agents                    (keep)
      ## Diagnose before repair                      (new)
      ## Sources, processing, boundary               (new)
  Debrief
      ## The doubt stays. Hold it.                   (new: existing line)
      ## What's the worst it could do with access?   (new: the M4 hand-off, existing line)

M4 · Security                                         mood: deepened unease
  LECTURE · The discipline of risk                    (keep title, gets slides)
      ## Certainty is a fantasy you inherited        (new: existing line)
      ## Three ways agents break the old story       (new)
      ## Assess, mitigate, reassess, decide          (new)
      ## "I can't tell" is a real answer             (new: existing line)
      ## One door I opened                           (new: THE SCAR SLOT) [delta: not in the
                                                      skeleton at all; this is the point-of-view
                                                      artefact and it needs a title on the wall]
      ## Now the move is to give it less             (new: the frame's break) [delta: skeleton
                                                      had the analogy break instead; the
                                                      reversal is the bigger sentence and two
                                                      judges asked for it by name]
      ## The best mitigation is the door you don't open  (new: existing line)
  [cut from skeleton-to-be] ## No employee reads every document as an instruction
      Reason: it is the analogy break, and it competes with the frame break on the same wall.
      Keep it in body prose where it costs nothing.

M5 · Grounded Output                                  mood: rescue, bounded
  LECTURE · Grounded, and four candidates to measure  (keep title, gets slides)
      ## There is truth out there                    (new: existing line)
      ## Mostly right, ten times over, is mostly wrong (new)
      ## "Are you sure?" is another fluent answer    (new: existing line)
      ## Four candidates that fail differently       (new) [delta: skeleton says "Four
                                                      candidates, one scoreboard"; mine names
                                                      why there are four, which is learning C]
      ## The judge names its own limit               (new)
      ## This is the check                           (new: the refrain) [delta: the refrain line
                                                      is in the body and had no slide]
  LECTURE · Self-consistency after the scoreboard
      ## A drift signal, never proof                 (new)
  Agent Actions
      ## Which rung has this action earned?          (new: existing line)
      ## Propose, double-check, apply                (rename: Agent Actions)

M6 · Evaluations                                      mood: leverage; the braid lands here
  LECTURE · Evals as Steering
      ## Module 5 turned judgment into a judge       (keep)
      ## Groundedness protects the floor             (rename: The second kind)
      ## Steering raises the ceiling                 (new)
      ## A yardstick you rewrite is not a yardstick  (rename: What you build now)
      ## Will the bitter lesson apply here?          (rename: The question to hold)
  LECTURE · When the score stops moving               (keep title, gets slides)
      ## A flat score is information about the judge (new)
      ## You haven't checked the judge yet           (new: learning B's counter-voice) [delta:
                                                      skeleton has "The gate is a claim too",
                                                      which plants AE101's phrase; the plain
                                                      version says the same thing and asks for
                                                      a move]
  LECTURE · The New Human Role in the Loop
      ## Would you let it send the mail?             (keep)
      ## Two evals, two different jobs               (keep)
      ## Variety in, selection out, memory keeps     (new: the braid named)
      ## The human moves one level up                (rename: The human does not disappear)
      ## The better it gets, the less you watch      (new: the counter-voice)
      ## When did you last read one yourself?        (new: the governor)
      ## The full picture, and what it is made of    (new) [delta: skeleton closes M6 on the
                                                      future echo; I move the future echo to M8
                                                      and close M6 on the assembly, because M6
                                                      is the anatomy's payoff and M8 is the
                                                      future thread's]
  Dosage note: this lecture now carries the braid, the counter-voice and the assembly. If that is
  too dense, "You haven't checked the judge yet" and "The better it gets, the less you watch"
  move to a short M6 opener under Mollick's question, as the skeleton-to-be already proposed.

M7 · From Personal to Team                            mood: generosity
  LECTURE · Access is not absorption                  (new lecture, after the three exercises)
      ## You cannot share an agent                   (new)
      ## Three parts copy, one does not              (new: the vendor-pitch defence) [delta: not
                                                      in the skeleton; this is the stance line
                                                      three judges said was asserted]
      ## Access is easy; absorption is scarce        (new: existing line)
      ## People absorb what they already half know   (new)
      ## This is the interface piece                 (new: the refrain's missing line)
      ## What would have to be true for them to switch? (new: attributed in the exercise already)
      ## The one piece you don't decide              (new: the frame's second break)
      ## The people plan stalls on names             (new: existing line)

M8 · Agents Building Agents                           mood: awe, forward hunger
  LECTURE · Where is this all going?                  (new closer, after the forum)
      ## You described it; something else built it   (new: the refrain's last turn) [delta:
                                                      skeleton opens on "The tool that builds
                                                      tools compounds", which is the Big Idea
                                                      restated; mine names what the student just
                                                      watched happen]
      ## Count the folders the kernel cites          (new: learning D's callback) [delta:
                                                      skeleton says "Absorption, at room scale";
                                                      mine is the move, not the label]
      ## The parts hold; the model rotates           (new: the frame's third break)
      ## Which half of this is obsolete next year?   (new: learning E's counter-voice)
      ## Will your organisation learn faster than the model changes underneath it?  (new)
      ## What would change our mind?                 (new)
      ## A flywheel, not a graduation                (new: existing line)
```

Titles I refuse and why, so the next pass does not re-propose them: *The full agent picture* as a
training-level title at M1 or in prework. It pre-announces the thesis, which is the one rung the
*earned, not announced* anchor forbids outright, and A101 already pays that tax at every `## Big
Idea`. The assembly gets named where the student can already see most of it, at M6, and each piece
gets named at the module that hands it over. The training-level view belongs in the prework's
anatomy read, which the student meets as a two-page reference and not as a promise.

---

## 7. Keep and cut

**Keep, load-bearing under this story.** The mood arc and its per-module contract. Every `In the
full agent picture` line. The Debrief ritual in all eight modules, which is learning B's engine and
the training's most repeated move. The M3 close (`three-minds-one-synthesis.md`), unchanged except
for the one turn sentence. M5's *"This module is the rescue. Not full closure"*. The four sharing
shapes, verbatim per `check_student_facing.md` §34. `when-to-split-an-agent.md` entire; it is the
best-defended stance in the corpus and the counter-voice for learning C. *"A flywheel, not a
graduation."*

**Cut, with files.**

1. **`security.md` § Next and `output-quality.md` § Start here state the same paragraph**, that
   agent actions start as text, in near-identical wording, and `evaluations.md` carries a third
   version in a blockquote. Three statements of the same idea, none of which changes its meaning,
   which the depth anchor scores at zero. Cut two, keep the M3 opener where the idea first
   arrives (`multi-agent-systems.md` § Start here, *"text is also where action starts"*), and let
   M5 refer back in a clause rather than restating.
2. **`personal-to-team.md` § Interview for the job and § Pick the sharing shape** walk through
   what the three exercises then do, before the student has done them. The module narrating its
   own exercises, `check_student_facing.md` §33 and §26. Cut both sections; the Key Concepts
   already hold the content and the exercises hold the move. This is also what makes room for the
   M7 lecture the skeleton adds.
3. **`agents-building-agents.md` § Next, the product-ladder clause** (*"Agents 101 is the first of
   five steps, with Make Your Own next"*). Two judges flagged it as the beat where the refusal
   gets spent. Cut the ladder, keep *"you leave with a flywheel, not a graduation."*
4. **`evaluations.md` § Start here, the connector encouragement blockquote** (*"Keep adding
   connectors to your key systems... Stay safe. Start small. Then scale."*). It is a different
   module's advice arriving mid-rescue, and *start small then scale* is the one sentence in the
   corpus that sounds like a vendor deck.
5. **`what-just-happened.md` § Mental models only come from doing**, second half. The beat above
   it (*"You act on the future to know what's real"*) already lands the claim and is the future
   thread's seed; the second beat restates it in softer words and dilutes the seed. Cut to its
   first two sentences.

Nothing else. The default move on existing A101 text is cut, and the reason this proposal cuts
little is that the corpus is dense already; what it is short of is connective sentences, which is
what § 5 drafts.

---

## 8. Cost

**What this story gives up.**

*Applicable in practice is the factor I expect to move down.* It is A101's top factor today at 83,
and the anatomy frame puts one more question between the leader and the move: *which piece is this?*
is a framing question, not a Tuesday action, and it competes for the same module-minutes as the
governors that currently re-fire unprompted. I would rather spend from 83 than from depth, which
matches the goal spec's own prior. If the judge reports applicable holding at 83 and
forward-looking flat, this proposal did not land.

*An open future costs applicability, and this set buys a lot of open future.* Learning E is a
question by construction, the M8 close refuses to answer it, and the against-interest paragraph at
§4.7 declines to sell the thing the room would find easiest to act on. That is the trade the
rubric predicts and I am making it on purpose.

*Counter-voices cost mood.* Five learnings each carry one, and two of them land in the second half
where the mood is supposed to be rising: the judge you have not checked at M6, and *you cannot hand
over what you learned* at M7. M6's leverage and M7's generosity are the two moods most at risk. The
guard is that both counter-voices hand over a move rather than a doubt, which is what keeps a
counter-voice from reading as a hedge. If the story judge's per-beat mood scores drop at M6 or M7,
the counter-voice is the thing to move, not the naming beat.

*Depth costs breadth.* Five learnings, each developed across at least three modules. The sixth
candidate I left out is the human moving one level up, which step 0 scored strongly and which has
no counter-voice on the page. In this proposal it is not a learning of its own; it is the shape of
learning A once the anatomy is complete, and the Bainbridge counter-voice sits under learning B
instead, where the watching and the checking are the same act. If Antti wants it as a sixth
learning, the price comes out of C, which is the newest and the least proven.

*The risk this proposal carries that the others may not.* It is the conservative one. It proposes
almost no new story, so if the judges' reading of the corpus was generous, naming the frame only
makes a mediocre frame explicit. The test is cheap: the frame either survives being said out loud
at M4, M7 and M8, or it reads as a label bolted onto eight topics, and a cold reader will say which
within one pass.

---

## What this proposal draws

Every sentence below is mine, not the corpus's. Everything else in this file is a quotation, a
placement, or a title.

- The frame sentence (§1) and the three break passages (§1, at M4, M7, M8).
- One turn sentence at M3 (§2).
- The scar slot's surrounding beat, three sentences plus the marked placeholder (§3).
- The vendor-pitch defence, two sentences (§4.5).
- The against-interest close at M8, one paragraph (§4.7).
- Per learning: one plant or callback line each for D and E, one counter-voice line each for A, B,
  C, D and E, one naming beat for the braid at M6, the refrain's two missing lines at M7 and M8
  (§5).
- Titles marked `(new)` in §6 that are not quotations of existing body lines.

The rest is placement, cuts, and one first-person incident that only Antti can write.
