# Worked examples: the course author's own past calls, with their reasons

Each shows text the author REJECTED and text the author KEPT instead, then the author's reason in their own words. Learn the judgement behind the reasons, not the surface words.


## Example git-be9cf5dd-18
- REJECTED: "(nothing)"
  KEPT: "But bit by bit, my brain developed the neural pathways. I could put 1+1 together and see where this all is likely going. Not in detail, but I could still see the patterns."
- Author's reason: The cheezy: "decided otherwise". or I decided to do the right thing. Indirectly patronizing. And I don't really think saying out loud "do the right" thing in this way is good. Also: I did not really do such a choice knowingly. Everybody struggles to see the choices.

## Example git-3ba7c052-44
- REJECTED: "failing"
  KEPT: "failing, then passing"
- REJECTED: "makes"
  KEPT: "keeps"
- REJECTED: "fix checkable. Without it,"
  KEPT: "agent honest as"
- REJECTED: "fix is a guess that happens to compile"
  KEPT: "codebase evolves"
- Author's reason: A guess that happens to compile is again putting the student down. Nobody wants to hear their work is guesses. So: the language on how to critisise needs to be well thought. I have been said to be "gentle on when I point something is not right. Antti seldom points out what is wrong. Even then se says is in a nice way." More deeper: The leadership I wish to have is to try explain the future. Not to put down the current. I know I hate current ways. Still: putting those down usually does not help experiment for the future. We can get direct at imagining the future.

## Example git-65745c75-90
- REJECTED: "(nothing)"
  KEPT: "find"
- REJECTED: "rule you saved is worth more than a pipeline you didn't build."
  KEPT: "place for your rules."
- Author's reason: A was too long and complex. The structure of the "point" layout is simply to get the core of next phase said. A is kind of valid but with wrong frame.

## Example git-63e110a5-97
- REJECTED: "This might not work. That was never a reason"
  KEPT: "The right way moves every day; there is no time"
- REJECTED: "wait; it was"
  KEPT: "test everything. Acting is"
- REJECTED: "reason"
  KEPT: "move from *possibly*"
- REJECTED: "send it and read what came back."
  KEPT: "*I have something*."
- REJECTED: "Nobody can hand"
  KEPT: "Your brain needs the reps to think different. The pathways"
- Author's reason: Stuff maybe not working... never a reason to wait. This puts this into weird passive. The point is you and your journey. 
Bobody can hand you... patronizing. 
"Gift you haven't given yet" - passively forces people to think they have to give gifts.

## Example git-d9fed027-114
- REJECTED: "time, catches the branches you can't see."
  KEPT: "time."
- Author's reason: Adds more real information on the why of the mechanic. I wanted to point at unknown unknowns.

## Example tn-compel-stuff
- REJECTED: "You get"
  KEPT: "You, in a way, compel"
- REJECTED: "putting"
  KEPT: "having"
- REJECTED: "context"
  KEPT: "stuff"
- REJECTED: "front of"
  KEPT: "(cut)"
- REJECTED: "question."
  KEPT: "context."
- Author's reason: B is quite ok. But A is deeper and puts student more in control. Controlling the LLM is a theme that appears without mention often.

## Example tn-loop-verb
- REJECTED: "Run a kit skill on a schedule"
  KEPT: "Loop it, instead of you starting it"
- Author's reason: A puts the more complex and telling concept into the text. Looping > run in terms of what it means.

## Example tn-oldskool-cut
- REJECTED: "(nothing)"
  KEPT: "(Oldskool: ccstatusline or `/statusline` runs it live.)"
- Author's reason: We teach the just-now-possible and best stuff. Not just what claude code happens to have available. When we core basics and very simple stuff like tickboxes, we still give the advanced option for those that want it. Context-command was a checkbox needing filling but statusline is the recommended)

## Example tn-on-your-side
- REJECTED: "Everything built in these four sittings is on your side."
  KEPT: "(cut)"
- REJECTED: "(nothing)"
  KEPT: "All of it on your side."
- Author's reason: 1) sitting is not a good word . 2) what you build is on your side... makes little sense. Just waste of words. 
Version A looks to have similar problem. 

I would now write as it is really is: "all of it in your local version"

## Example tn-read-the-shapes
- REJECTED: "Claude proposes"
  KEPT: "(cut)"
- Author's reason: Just much less words. Word counts I found directly correlate with reading speed and comprehension speed.

## Example tn-permission-testing
- REJECTED: "(nothing)"
  KEPT: "You are testing, and you are learning."
- Author's reason: The duplication here just gives twice the chances the student really realises this is an experiment. It also gives the why of experimental approach.

## Example tn-good-and-bad-work
- REJECTED: "work, and which one you get depends on"
  KEPT: "work. It will be"
- REJECTED: "session it is in."
  KEPT: "session."
- Author's reason: Again: passive stance of student in A. Student should never be helpless.

## Example mn-pre-read-leak
- REJECTED: "Module 3 draws that boundary for your own repo."
  KEPT: "(cut)"
- Author's reason: Too many words. "module 3 draws a boundary" is just un-understandable and bad abstraction.

## Odd-one-out findings on the course slides
- Rejected: The weird rethoric question on the odd-one. (note: This is really interesting a choice. I think I see all slides having too much claude speak and too long sentences. The whole style is too wordy compared to ae101. Can't pick out of these 3)
- Rejected: Calling something a student may make a "toy".
- Rejected: Certainty is fantasy you inherited. both fantasy and inherited give me the biggest creeps. Think of student who would hear this.
- Rejected: Good and neutral handling of feeling and uncertainty.
- Rejected: It puts down the historical sensible practise. It also misrepresents that to make a point.
- Rejected: You are a check <- such twists human into some weird mold. I think student would never call themselves check.

# Reference: point of view and frame done right (from the calibrated sister course)

### Frame: where this is going
## Two frontiers

The model's frontier moves without you. Every release, it can do more.

Your frontier is what you have expressed. It moves when you write, and only then.

Two questions sit on your frontier. Can your system learn fast, and can it learn the right things?

--- end lectures/the-2-frontiers.md



--- exercises/spot-gaps-build-the-loop.md

### Frame: it is your work: the agent works, you judge
## Read the diff and push back on a line

- The agent runs the loop; you read the result. Read the diff. If a line isn't what you'd have written, push back. Quote the line and say why. The agent yields if you push hard enough, so its agreement settles nothing. Whether your argument was actually better is your call.
- Your own wording matters. No pre-made prompt: the compound step reads this scrollback, so your push-back is what becomes a rule.

### Frame: how the machine works
## Eval

An **eval** is a measurement. You hold agent-produced work against a fixed yardstick, across enough runs to get a number: a pass rate, a score, how often one drift shape shows up. One run tells you what happened. The measurement tells you what the system does.

The yardstick stays put and the system learns against it. Add a rule, cut a rule, sharpen a check, and the number moves or it does not. That is how you know a change to the system was a change for the better.

The checks you built are the instruments inside it. *Verifier* when deterministic: tests, lint, a hook that returns true or false. *Judge* when an LLM reads the work. *Gate* when the same check sits in CI and blocks the merge.

### Frame: the theory
## Change on recurrence, not on noise

One stochastic miss is not a process failure. A system with session-to-session variance produces the odd miss even when nothing is wrong. W. Edwards Deming called this **tampering**: chasing ordinary variance case by case adds noise of its own.

React on recurrence. The same failure shape returning is signal. That is when the rule changes, the gate refreshes, or the skill ships.

Watch the regression-to-the-mean trap. After a bad session, the next session is usually better with no change at all. A tweak made right after a failure looks effective even when it did nothing.

### Frame: the trainer to the room
## Freedom to choose

- Set the right pace for the group. Not too fast, not too slow.
- People will finish at different times. Cutting depth and prompts here and there is often the right thing.
- Exercises over lectures and theory. You can come back to the theory any time.
- Protect your working memory. Cut where needed. No need to read the agent's output word for word.
- All modules are designed to cope with missing details from prior modules.

