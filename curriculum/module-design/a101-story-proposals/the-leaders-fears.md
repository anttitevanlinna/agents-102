# A101 story proposal: the leader's fears

<!-- maintainer -->

One of the parallel creative-diverge proposals per `trainings/agents-101/story-depth.md`
§ Dispatch shapes. Opening bias: start from what the leader in the chair is afraid of and is
not saying. Nothing here edits curriculum. Drafted student lines are marked **DRAFT**; every
one of them is a card at implementation unless it falls under a §26 exemption.

## 1. Frame

**Every fear you have about agents is either a part you can build or a fact about your
organisation, and telling the two apart is the job.**

The five fears the leader carries into the room, in the words they do not use out loud:

- *I am about to be sold a technology problem I cannot evaluate.*
- *I will approve something that fabricates in front of a customer.*
- *I will roll out access that nobody absorbs, and own the number that proves it.*
- *I will be the last person to know what my own agents did.*
- *The next model makes this quarter's work worthless.*

The frame sorts each one. A fear that names a missing part gets the part built, by the leader's
own hands, in the module where the fear bites. A fear that names a fact about the organisation
gets named as a fact, and no part is offered for it. The training's credibility is in the second
half: it is the only place a leader can tell whether they are being taught or sold.

This is compatible with the frame A101 already runs and nobody named, the *full agent picture*
refrain (context, shelf life, tools and other agents, boundary, checks, loop, interface). The
anatomy is the parts list. The fear is what tells you which part you are missing. The refrain
becomes load-bearing the moment it answers a question the leader actually has.

### Each module as a case of it

- **M1 Getting Going.** Fear: *I will be sold something I cannot evaluate.* Part: context. You
  make one generic thing and one that is yours, and the difference is a file you wrote.
- **M2 Building Agent Systems.** Fear: *the demo never reaches Monday.* Part: shelf life. The
  memory sharpens instead of growing, and it runs without you retyping anything.
- **M3 Multi-Agent Systems.** Fear: *more machinery, less signal.* Part: other agents, and the
  first fact that has no part. Three stances beat one summarizer, and you still cannot tell
  which half of the answer you would stake your name on.
- **M4 Security.** Fear: *I will be the last to know what my agents did.* Part: the boundary.
  Fact: certainty was never on the menu, so the residual is written down and accepted on record.
- **M5 Grounded Output.** Fear: *it fabricates in front of a customer.* Part: the check, chosen
  by measurement rather than by whoever told you about it.
- **M6 Evaluations.** Fear: *I cannot read everything, so I will stop reading.* Part: the loop,
  plus the second check nobody sells you, the one that says what good looks like here.
- **M7 From Personal to Team.** Fear: *access nobody absorbs.* Almost all fact. The technical
  plan fills in twenty minutes and the people plan stalls on names, in the room, in front of you.
- **M8 Agents Building Agents.** Fear: *the next model makes this worthless.* Fact, and the
  question the training refuses to close. The room builds the thing that builds things, and the
  open question leaves with the student.

### Where the frame breaks, as the training would say it to a student

Placement: M7, after the people plan stalls. Two beats, plain, no rescue.

> **DRAFT.** The sorting works until it doesn't. Every fear so far had a part: context, memory,
> a boundary, a check, a loop. This one has a plan and no part. You can build an interface your
> teammate can reach in an afternoon. You cannot build their reason to open it.
>
> And the one underneath it, which is the same shape: nothing you build today checks the
> decision to use what it produced. The agent has no accountability, so it cannot hold any. That
> stays with you, and it is the part of this that does not get automated at any model size.

That is the reversal the judges asked for in a leader-shaped form: M1 to M6 hand over parts,
M7 and M8 hand over facts, and the training says which is which rather than selling a part for
a fact. It also carries the M1 to M3 versus M4 reversal the two judges found (giving the agent
context, then withholding it) as a case rather than as a separate announcement.

## 2. Narrative

The training as a story, five sentences, inside the fixed mood arc.

1. A leader who came in braced to be sold something watches a generic page become theirs in
   forty minutes, and the thing that made the difference was a file they wrote, not a product
   somebody demonstrated (M1, joy; M2, compounding, where the file starts paying interest).
2. They hire six agents on their own live challenge, and the answer comes back fluent, framed,
   and impossible to grade: they would stake their name on some of it and cannot say which part
   (M3, unease, unresolved).
3. Module 4 makes it worse on purpose: the agent reads every document as an instruction, the
   same prompt gives different answers on different days, and the plain output of the loop is
   a residual risk with their signature on it (M4, deeper unease).
4. **The turn:** they stop asking whether the system can be trusted and start measuring it, on
   their own output, with four candidate checks and a scoreboard that names a winner (M5,
   rescue, bounded).
5. The check leaves their hands and runs without them, so they write the second check, the one
   that says what good means here (M6, leverage); they try to hand the whole thing to one named
   colleague and find the part with no mechanism (M7, generosity); and the room builds agents
   that build agents while the question of whether their organisation learns faster than the
   model changes underneath them stays open (M8, forward hunger).

### The turn, drafted

M5 opens on the rescue today. The turn lands harder if the thing under the microscope is named
as theirs before the lecture starts. At the top of `output-quality.md` § Start here, replacing
the current first paragraph's second half:

> **DRAFT.** The briefing you are about to take apart is not a case study. It is the one your
> own agents wrote in Module 3, the one you could not grade. In the next hour you find out how
> much of it you could have sourced, and you find it out by measurement rather than by reading
> it again more carefully.

The existing Avianca and Deloitte pre-read stays where it is and does the work it already does:
other people's failure arrives one module before your own, so the student meets the shape before
they meet it in their own file.

Mood guard: nothing in this turn resolves M3's doubt or M4's residual. It converts one of the
two into something measurable and says so, which is what the current M5 opener already promises.

## 3. Point of view

### Who is telling this

Someone who has built these systems inside companies, has had one of them be wrong in front of
people whose opinion mattered, and who is now telling you what he changed afterwards. Not a
vendor, not an analyst, not a coach. The tell is that he keeps naming the seams instead of
closing them.

The narrator is already audible in A101 and never in an incident. Three existing lines carry the
register exactly, and they are the calibration for anything written into the slot below:

- *"Damn, this is complex stuff. It will still be complex when the next agent gets built."*
  (`lectures/practice-of-risk.md`)
- *"Hold the doubt. Name it to yourself. Don't fix it here."*
  (`exercises/three-minds-one-synthesis.md`)
- *"This is a self-audit of a live agent round. Convenient, not neutral."*
  (`trainings/agents-101/agents-building-agents.md`)

Plain, unflattering, admits what the instrument cannot reach. No first person anywhere, which is
why the point-of-view score sits at 80.

### The scar slot

**Module 4, at the close of `lectures/practice-of-risk.md`, after the loop is named and before
the two exercises.** Not M5: M5 is the rescue, and a first-person failure there gets absorbed by
the fix that follows it. M4 is the one module whose mood can hold an unresolved incident, and it
is the module where the leader's sharpest fear lives (*I will be the last to know what my own
agents did*).

**Shape of the incident.** One agent, one piece of access it legitimately had, one thing it did
or produced that read fine at the time. Told as a sequence of events with dates or a named
occasion, not as a reflection. The account ends with the mechanism that exists now because of
it, and with the residual that is still there.

**What it must show**, in this order:

1. It happened to the narrator, in his own hands, not to a firm in a court record.
2. It was invisible at the time. The output looked right, the report said it went well.
3. What caught it was outside the loop that produced it: another person, a source, a later file.
4. What changed afterwards was a mechanism, not more care. Care is what he already had.
5. What is still unmitigated, named in one sentence, on record, in the module's own vocabulary.

**Length:** twelve to eighteen lines. Longer than an aside, shorter than `story-of-module-6.md`,
which has a capstone to spend that AE101's M6 has and A101's M4 does not.

**The surrounding beat, drafted, with the placeholder marked.** Placed under a new heading after
*The uncomfortable part, said plainly*:

> **DRAFT. ## The one I did not catch**
>
> Everything above is the discipline. Here is what it cost me to learn it.
>
> ```
> [ANTTI'S INCIDENT GOES HERE. Twelve to eighteen lines, first person, past tense.
>  One agent, one access it legitimately had, one output that read fine.
>  Who or what caught it, and how much later.
>  The mechanism that exists now because of it.
>  One sentence on what is still not mitigated.]
> ```
>
> I did not lack care. I had care. What I lacked was a check that sat outside the thing it was
> checking, and I did not know that was a category of thing to have. You are about to build one.
> It will not cover everything. Name what is left and write it down, which is the only part of
> this that has ever worked for me.

That last paragraph is written to survive whichever incident lands in the block: it generalises
from the shape the five requirements above guarantee, not from any specific event. If Antti's
story does not contain a check that sat outside the loop, the paragraph changes and the
requirement list is what changed it.

**Optional echo, two lines, M6.** At the `## The better it gets, the less you watch` beat: one
sentence naming how long it took him to notice he had stopped reading the daily output. This is
the counter-voice for *the human moves one level up*, and a second sighting of the same narrator
is what turns one incident into a point of view rather than an anecdote. Skip it if M6's closer
is already dense; the primary slot carries the score on its own.

## 4. Stance

Positions the training holds that could cost it a customer, with the defence each one has now
and the defence it owes.

### a. "Share the whole agent" is a vendor pitch

Where it appears: `personal-to-team.md` § Pick the sharing shape and § Key Concepts, and
`exercises/share-your-work.md`: *"'Share the whole agent' is a vendor pitch and is NOT on the
list."* Asserted three times, argued nowhere. This is the position every platform vendor in the
room disagrees with, and it is currently the training's weakest-defended strong opinion.

Mechanism it owes, drafted for `personal-to-team.md` § Pick the sharing shape:

> **DRAFT.** The reason is mechanical, not ideological. Open your `agents/` folder and read what
> is actually in the file: instructions that assume your memory, your sources, and your habit of
> pushing back when the answer sounds too smooth. Hand over the file and the teammate gets the
> instructions without the three things that made them work. That is not your agent. That is a
> generic assistant with your name in the header, which is the thing you spent Module 1 learning
> to tell apart.

### b. Certainty is a fantasy you inherited

Where: `lectures/practice-of-risk.md`. Already defended with a mechanism, three named breaks in
the classical story: non-determinism, well-formed English as the attack surface, emergent
capability. The strongest stance on the page. Keep untouched, and let the M4 scar be its scar.

### c. Start with don't

Where: `lectures/when-to-split-an-agent.md`: *"Inside a workflow, start with don't."* Defended
with a test (*can I write one prompt that produces the same quality of output?*) and a cost
(coordination tax). This is the position that loses the customer who came to buy a multi-agent
platform, and it is already argued. Keep, and give it a title so a skimmer meets it.

### d. The organisation that outsources the first ten agents outsources the learning rate

Not on the page. This is the against-commercial-interest position, and it is the one the
training's own business model has the most to lose from. `agents-building-agents.md` § Next
currently pivots into *"the first of five steps, with Make Your Own next"*, which is where a
refusal should be and an upsell is.

Drafted for the M8 close, replacing that pivot:

> **DRAFT.** The obvious next move for us is to offer to build these agents for you. We do not,
> and the reason is not modesty. The agents are the cheap half. The expensive half is your
> organisation getting faster at building the next ten, and a supplier who builds them for you
> is a supplier who does that learning instead of you. It is a real cost to us and it is on the
> record here so you can hold us to it.

### e. Most of what makes your agent good was never written down

Not on the page as a stance, though the material is (`personal-to-team.md`'s absorption beat,
the unlinked `supplementary/personal-to-company-gap.md` quoting Polanyi). Loses the customer who
wanted this to be a platform project with an owner in IT. Drafted for M2, at the Debrief, where
the student has just watched Claude write rules from a session they ran:

> **DRAFT.** Read what Claude just wrote down, then read what it could not. The rules it caught
> are the ones you said out loud during the work. The ones it missed are the ones you have never
> had to say to anyone, because you have never had to hand this job to anybody. That second pile
> is most of what you know, and it is why this cannot be delegated to whoever owns the tools.

### The pair

Stance and self-doubt sit together in this proposal the way two judges already read them: the
scar (§3) and the residual-risk discipline (§4b) are the doubt, positions (a), (c), (d) and (e)
are the ground held. The register rule that keeps them from reading as hedging: doubt is always
attached to an instrument the training itself built, never to the leader's competence.

## 5. The learning-set as consequence

Six learnings. Braid: L1 and L6 are the same file seen from the floor and from the ceiling;
L2 and L3 fuse at the autonomy rung (a check you did not build is an action you cannot allow);
L4 and L5 are the organisation's version of each other (what an organisation can absorb is what
it can learn, and the learning rate is the only thing the next model does not reset).

### L1. Generic becomes yours only where you were specific

**Question carried:** *Which part of this could a competitor have produced?*

- **Planted, M1**, `exercises/personal-site-with-guardrails.md`: *"Generic output comes from
  generic context."* Existing, and the whole exercise enacts it.
- **Complicated, M2**, `lectures/compounding.md`: *"if the answer to 'could a competitor claim
  this?' is ever yes, the memory is growing but not compounding."* Existing. The meaning changes:
  specificity stops being a prompt move and becomes a property of a thing you maintain.
- **Complicated, M3.** New, and this is the counter-voice the step-0 judges asked for twice.
  DRAFT, at the close of `exercises/three-minds-one-synthesis.md`: *"Notice whether the three
  stances disagreed. If they came back agreeing with each other and with you, you did not get
  three views. You got one view in three costumes, and more context would not have fixed it."*
- **Paid off, M7**, in the stance (e) draft above: most of your context was never written down,
  which is why sharing a file is not sharing an agent.
- **Governor:** *Could a competitor claim this?* Already on the page at M2, re-fires unprompted.
- **Counter-voice:** the M3 draft above. More context is not always the fix; sometimes the fix is
  a different stance, and sometimes there is no fix and you were right the first time.
- **Future:** a question. As every model gets better at sounding like anyone, the only thing that
  stays yours is what your organisation has written down that nobody else has.

### L2. Confident is not verified

**Question carried:** *Where does this check touch something the model did not produce?*

- **Planted, M1**, `getting-going.md`: *"The LLM is generous to a rules file it just helped
  write."* Existing, enacted in the Debrief and the cold critic.
- **Complicated, M5 pre-read**, `lectures/module-5-prework.md`: *"Asking the same model 'are you
  sure?' is not a check on the world; it is another fluent answer."* Existing. The meaning
  changes from politeness to mechanism: the check has to leave the loop.
- **Paid off, M5**, `exercises/hallucination-bakeoff.md`: four detectors, one scoreboard, and the
  saved judge that *"names its own limit."* Existing.
- **Complicated again, M6**, `lectures/when-the-score-stops-moving.md`: *"A flat score is real
  information, but only about the frame the judge can see."* Existing, and it is the training
  turning the scrutiny on its own instrument. The skeleton's `## The gate is a claim too` slide
  is the naming beat this owes, after the student has watched their own score go flat.
- **Governor:** *Where does this check touch something the model did not produce?* New, replaces
  nothing; the corpus has the law and not the pre-action question.
- **Counter-voice:** M6, above. The judge has a blind spot and you built it.
- **Future:** a question, already half on the page in `lectures/grounded.md` (*"Later models will
  fabricate less; they won't stop"*). The open half: which of your checks become unnecessary, and
  how would you find out rather than assume?

### L3. Autonomy is earned by the action, not granted to the agent

**Question carried:** *Which rung has this action earned?*

- **Planted, M2**, `lectures/first-scheduled-agent.md`: *"propose or draft only, do not send,
  edit, book, or change anything."* Existing, and felt before it is named.
- **Complicated, M3**, `lectures/agent-that-takes-action.md`: *"Writing a file changes your
  folder. Sending to Slack changes another system."* Existing.
- **Complicated, M4**, `lectures/practice-of-risk.md` and `lectures/module-4-prework.md`: the
  agent reads every document as an instruction, so the boundary stops being about what the agent
  is allowed to do and becomes about what it can be talked into doing. The analogy break named in
  the theory plan lands here as a slide: no employee reads every document as an instruction.
- **Paid off, M5**, `output-quality.md` § Agent Actions: *"The question is not 'do I trust the
  agent?' The question is which rung this action has earned."* Existing, and it re-fires at M6's
  *would you let it send the mail?* without the body asking for it.
- **Governor:** *What is the worst thing it could do with that access?* (M3 to M4 bridge, on the
  page) and *which rung has this action earned?* (M5, on the page).
- **Counter-voice:** Bainbridge, M6, and the scar's optional echo. Each clean run is real evidence
  of competence and real erosion of your watching, and the rung you granted last quarter is the
  one nobody has looked at since.
- **Future:** a question. Which rungs will you still want a human on when the agent is better at
  the task than the human reviewing it?

### L4. Access is not absorption

**Question carried:** *Who absorbs this, and what do they already know?*

- **Planted, M2.** New, and it is the plant the theory plan asks for: the memory is your own
  absorptive capacity made literal. DRAFT for the M2 Debrief, one line: *"What you have not
  written down, it cannot use. That is true of the agent today and it is true of everyone you
  will hand this to later."*
- **Complicated, M4**, `security.md` § Build More Skills For Recurring How: the skill travels and
  the ownership does not. Existing, and currently framed as a benefit only.
- **Paid off, M7**, `personal-to-team.md`: *"Access is easy; absorption is scarce. The technical
  plan fills quickly; the people plan stalls on names."* Existing, and the exercise makes the
  student live it.
- **Callback, M8.** New, the callback all three step-0 judges named. DRAFT at the M8 close:
  *"Twenty agents published into one folder this afternoon. What the room can use tomorrow is not
  what is in the folder. It is the part somebody can cite, to a colleague who was not here."*
- **Governor:** *Who absorbs this, and what do they already know?* New.
- **Counter-voice:** your own absorption is the first bottleneck, not your team's. The week you
  stop reading the morning output is the week the system became a document again.
- **Future:** a question. If access keeps getting cheaper and absorption does not, what is the
  first thing in your organisation that stops scaling?

### L5. The model rotates; what your organisation learned does not

**Question carried:** *Will your organisation learn faster than the model changes underneath it?*

- **Planted, M2.** New, per the skeleton: *"The model will change under this; the memory won't."*
  Seeded as a question, not a reassurance, at the Debrief.
- **Complicated, M5**, `lectures/grounded.md`: *"This isn't a bug that gets patched in the next
  release. It's the shape of the technology."* Existing.
- **Complicated, M6**, `lectures/evals-as-steering.md`: Mollick's question, on the page and then
  dropped. The skeleton's rename (`## Will the bitter lesson apply inside your company?`) is what
  keeps it alive; the body already asks it well.
- **Paid off, M8.** New closer. The question goes out unanswered, with the thing that would
  change the training's own mind attached, which is the forward-looking rung nothing in A101
  currently reaches. DRAFT: *"Here is what would change our mind. If a company with no internal
  competence and a bought platform is shipping better agent work in a year than the ones who
  built their own first, the sequence in this training is wrong, and you will be able to see it
  before we admit it."*
- **Governor:** *What would change our mind?* New, and it is the governor that makes the future
  thread actionable rather than atmospheric.
- **Counter-voice:** the draft above is the counter-voice. The training bets on competence first
  and names the evidence that would sink the bet.
- **Future:** the question itself. Seeded M2, echoed M6, open at M8, never answered.

### L6. Groundedness protects the floor; steering raises the ceiling

**Question carried:** *Is this a floor problem or a ceiling problem?*

This is the orphaned half the step-0 reads could not name. Every beat exists; nothing braids them.

- **Planted, M1**, `getting-going.md` § Key Concepts: *"You are the world's best evaluator of
  your own profile. Your domain expertise is the test."* Existing, and it is a ceiling claim
  sitting in a control module.
- **Complicated, M3**, `multi-agent-systems.md` § Key Concepts: *"the synthesizer averages
  everything into beige"* and *"Frameworks are the synthesizer's spine. Without one, it tends to
  summarise. With a framework, it picks."* Existing, unnamed as a mechanism. This is where the
  leader meets the failure that no check catches: nothing about beige is ungrounded.
- **Complicated, M5**, `lectures/grounded.md`: *"A judge is narrow on purpose."* Existing. The
  meaning changes: the check you just built protects one thing and is blind to the other.
- **Paid off, M6**, `lectures/new-human-role-in-the-loop.md`: *"Groundedness protects the floor.
  Steering raises the ceiling."* Existing, the training's own words, currently arriving as a
  distinction rather than as the payoff of an arc. The student then builds the goal-nudger, which
  is the only place in A101 where they write down what good means.
- **Governor:** *Is this a floor problem or a ceiling problem?* New, one line, fires in a meeting
  about work the leader will never personally run.
- **Counter-voice:** on the page at `exercises/eval-loop.md`: the tactic learns to pass the judge.
  Your taste, once written down, is also a target. DRAFT, one line at M6: *"The tactic got better
  at the judge. Whether it got better is a different question and it is still yours."*
- **Future:** a question. Groundedness checks will ship in every product you buy next year.
  Nobody will ship yours. What is the dimension your company would be known for, and who writes
  it down?

## 6. Titles

Revision of `curriculum/evals/story-depth/a101-skeleton-to-be.md`. Unmarked lines are unchanged
from that skeleton. `(keep)` current line, `(rename)` replaces an existing one, `(new)` does not
exist yet, `(cut)` removes a line the skeleton proposed. Titles carry no jargon before the move
that earns it, no em-dashes, and each is literally true of what sits under it.

```
M1 · Getting Going                                   mood: joy
  EXERCISE · Paint by agent with guardrails
      Phase 1: The boring baseline                  (keep; runs BEFORE the demo)
  LECTURE · Context is King                         (keep title; moves to after Phase 1)
      ## Same question, two answers                 (rename)
      ## It reads the whole conversation every time (rename)
      ## Context is whatever you tell it            (rename)
      ## A file the agent reads every time          (rename)
  LECTURE · Iterate and Learn                        (keep title, gets slides)
      ## You felt context move                      (new)
      ## Why the retro was kind to you              (new)
      ## The report is a hypothesis, not a result   (new)
      ## It amplifies what you bring                (new)
      ## You act on the future to know what's real  (new: existing line)

M2 · Building Agent Systems                          mood: compounding
  LECTURE · Compounding
      ## Two words, held together                   (keep)
      ## Why the sharpening happens                 (keep)
      ## A folder of text, and that is the point    (rename)
      ## It gets better by being edited, not by being clever   (new)
      ## Could a competitor claim this?             (rename)
      ## What you haven't written down, it can't use    (new: the L4 plant and the (e) stance)
  Debrief
      ## Fix the output, then fix the rule that let it through   (new)
      ## The rules it caught are the ones you said out loud      (new: replaces nothing; the
                                                                  tacit half, per stance (e))
      ## The model will change under this; the memory won't      (new: L5 seed)

M3 · Multi-Agent Systems                             mood: unease, unresolved
  LECTURE · When to split an agent (and how)         (keep title, gets slides)
      ## Start with don't                           (new)
      ## Splitting earns its keep when they can't be one   (new)
      ## Three stances beat one summarizer          (new)
      ## Left alone, the synthesizer averages to beige     (new)
      ## A framework makes it pick                  (new)
      ## Nothing you build in Module 5 catches beige       (new: the L6 hinge, and the line
                                                            that keeps M3 unresolved)
  LECTURE · Debugging Stuck Agents                   (keep)
      ## Diagnose before repair                     (new)
      ## Sources, processing, boundary              (new)
  Debrief
      ## The doubt stays. Hold it.                  (new: existing line as a title)
      ## Three costumes, one voice                  (new: the L1 counter-voice)
      ## What's the worst thing it could do with that access?   (new: existing bridge line)

M4 · Security                                        mood: deepened unease
  LECTURE · The discipline of risk                   (keep title, gets slides)
      ## Certainty is a fantasy you inherited       (new: existing line)
      ## Three ways agents break the old story      (new)
      ## No employee reads every document as an instruction   (new)
      ## Assess, mitigate, reassess, decide         (new)
      ## The best mitigation is the door you don't open       (new: existing line)
      ## "I can't tell" is a real answer            (new)
      ## The one I did not catch                    (new: THE SCAR SLOT, §3 above)

M5 · Grounded Output                                 mood: rescue, bounded
  LECTURE · Grounded, and four candidates to measure (keep title, gets slides)
      ## There is truth out there                   (new)
      ## Mostly right, ten times over, is mostly wrong   (new)
      ## "Are you sure?" is another fluent answer   (new)
      ## Four candidates, one scoreboard            (new)
      ## The judge names its own limit              (new)
  LECTURE · Self-consistency after the scoreboard
      ## A drift signal, never proof                (new)
  Agent Actions
      ## Which rung has this action earned?         (new: existing line)
      ## Propose, double-check, apply               (rename)

M6 · Evaluations                                     mood: leverage
  LECTURE · Evals as Steering
      ## Module 5 turned judgment into a judge      (keep)
      ## Groundedness protects the floor            (rename)
      ## Steering raises the ceiling                (new)
      ## A yardstick you rewrite is not a yardstick (rename)
      ## Will the bitter lesson apply inside your company?   (rename)
  LECTURE · When the score stops moving              (keep title, gets slides)
      ## A flat score is information about the judge    (new)
      ## The gate is a claim too                    (new)
  LECTURE · The New Human Role in the Loop
      ## Would you let it send the mail?            (keep)
      ## Two evals, two different jobs              (keep)
      ## Is this a floor problem or a ceiling problem?   (new: the L6 governor, replaces the
                                                          skeleton's "Variety in, selection out,
                                                          memory keeps")
      ## Variety in, selection out, memory keeps    (cut: the braid law is real and it is
                                                     design-side; a leader does not need the
                                                     mechanism's name to run it, and the slide
                                                     costs the module's densest minute)
      ## The human moves one level up               (rename)
      ## The better it gets, the less you watch     (new: counter-voice, carries the scar echo)
      ## When did you last read one of these yourself?   (new: governor)
      ## It got better at the judge. Did it get better?  (new: the L6 counter-voice)
      ## The model rotates. What you built around it learns, or doesn't.   (new: L5 echo)

M7 · From Personal to Team                           mood: generosity
  LECTURE · Access is not absorption                 (new lecture, after the three exercises)
      ## You cannot share an agent                  (new)
      ## What's in the file, and what isn't         (new: the (a) stance mechanism)
      ## Access is easy; absorption is scarce       (new)
      ## People absorb what they already half know  (new)
      ## What would have to be true for them to switch?   (new)
      ## The people plan stalls on names. That is the finding.   (new)
      ## This one has a plan and no part            (new: where the frame breaks, §1)

M8 · Agents Building Agents                          mood: awe, forward hunger
  LECTURE · Where is this all going?                 (new closer, after the forum)
      ## The tool that builds tools compounds       (new)
      ## Absorption, at room scale                  (new: the L4 callback)
      ## The part we could sell you and don't       (new: the against-interest stance (d))
      ## Will your organisation learn faster than the model changes underneath it?   (new)
      ## What would change our mind?                (new)
      ## A flywheel, not a graduation               (new: existing line)
```

Dosage note. M6's closer now runs nine slides. If that is one too many, the pair to move is
`## The gate is a claim too` and `## A flat score is information about the judge` into a short
M6 opener under Mollick's question, which is the same relief valve the skeleton already names.
Do not relieve it by cutting the counter-voices; they are two of the three things carrying
self-challenging in this set.

## 7. What I keep and what I cut

### Keep, untouched

- **The Debrief, all eight instances.** It is A101's most repeated move and it is double-loop
  learning enacted. One line naming it at M2 (the skeleton has it) converts repetition into
  development. Do not add the name eight times.
- **The mood contract**, `bosser-strategy:content-strategy.md`. Every beat above is placed
  against it. M3 and M4 stay unresolved; the scar does not rescue M4.
- **`lectures/practice-of-risk.md`** as the strongest stance and the strongest prose in A101.
  The scar is an addition at its close, not a rewrite of anything above it.
- **`lectures/module-5-prework.md`** (Avianca and Deloitte). Other people's failure one module
  before your own is exactly the right order, and the two-sentence homework is the best
  pre-action move in the training.
- **The Rory seat** in `exercises/three-minds-one-synthesis.md`. It is the deliberate-variance
  mechanism and it is enacted. It gets a name at M3 (*three stances beat one summarizer*) and no
  more theory than that.
- **The four sharing shapes**, `personal-to-team.md` § Key Concepts, verbatim per
  `check_student_facing.md` §34.
- **`exercises/hallucination-bakeoff.md`** end to end. It is the turn.

### Cut

- **`agents-building-agents.md` § Next**, the clause *"Agents 101 is the first of five steps,
  with Make Your Own next"*. It converts a refusal into a catalogue at the exact beat where the
  training's credibility is being priced. Replaced by the (d) stance draft.
- **The triple statement of "agent actions start as text"**: `security.md` § Next,
  `output-quality.md` § Start here, and the blockquote in `evaluations.md` § Run the loop
  without you in it. Three transitions, one idea, none of them a law. Keep the M3 statement in
  `multi-agent-systems.md` § Start here, where it first earns itself, and cut the other three.
  Default move is cut, and this is the clearest instance in the corpus.
- **`evaluations.md`**, the second half of that same blockquote (*"Keep adding connectors to your
  key systems... Stay safe. Start small. Then scale."*). Three imperatives with no mechanism
  under them, in the module that has the most mechanism to teach.
- **`getting-going.md` § Pre-reads before Module 2**, the phrase *"the candidate Lindenberg
  memory-architecture piece if you have room"*. Optional reading named twice across two files
  with no consumer.
- **`multi-agent-systems.md` § Next**, *"Add an agent to solve a critical dependency? Add a
  visualisation of the plan?"*. Two invented suggestions in a module that otherwise runs on the
  student's own challenge.
- **`output-quality.md` § Key Concepts**, the *"Benchmarking as a pattern"* bullet. The section
  below it says the same thing twice more (*"The real move is building the thing that benchmarks
  the detectors"*, *"Empirical method selection over authority"*). Three bullets, one idea.

### Move, do not cut

- **`supplementary/personal-to-company-gap.md`** is not in the `TRAININGS` registry and renders
  nowhere. It carries Polanyi, the absorption bottleneck, and an unsourced statistic. Either
  register it and fix the source stamp, or lift the two sentences that matter into M7 and delete
  the file. It should not stay in the third state it is in now.

## 8. Cost

**What this story gives up.**

- **Applicability, deliberately, at the close.** The M8 ending is a question with an
  against-interest admission attached and no Monday move under it. A101's applicable score is 83
  and it is the training's top factor; this proposal spends some of it, on purpose, at the one
  beat where a governor would read as a sale. Expect applicable to move down a few points, and
  expect that to be the trade the goal spec's prior asks for.
- **Mood, twice.** The M3 slide *nothing you build in Module 5 catches beige* extends M3's unease
  into a second axis, and the M4 scar puts a first-person failure into the module that is already
  the arc's low point. Both are placed where the mood contract says doubt is allowed to sit
  unresolved, and both are still a cost. The guard is the per-beat story judge on M3 and M4; if
  either module's mood score drops, the M3 slide is the first thing to go, not the scar.
- **Breadth.** Six learnings, where the step-0 set had six and the AE101 reference has five. The
  sixth, L6 floor-and-ceiling, is the one that pays for itself least in depth per minute, and it
  is the one the training's own headline is about. Carry share will fall, which is the shape a
  braided set is supposed to have, and it means no single learning in this set will score at the
  top depth rung on its own.
- **One thing the leader wants and does not get.** A sequence. The training will not say which
  process to move first, and the frame's break says so out loud. The customer who came for a
  roadmap leaves with a question and a flywheel, and some of them will notice.

**Which factor I expect to move down:** applicable, by a few points, at the close. Which I
expect to move up: forward-looking, which is the factor the goal spec's prior says to buy, and
self-challenging, on the strength of the scar and the two new counter-voices. Depth should hold
or rise through the braid rather than through new beats. Earned-not-announced is untouched by
this proposal: it is a structural problem with the `## Big Idea` header and the one lever on it
is judge 3's move (`Context is King` after the first guardrail attempt), which the skeleton
already carries.

<!-- /maintainer -->
