# Exercise: Test your intent on the *team* first

**Time:** 15 minutes.

**What you do:** have agents react to `intent.md` as the kinds of people on your team, each grounded in what your memory knows.

**What you build:** `rehearsal.md`, the line that lands, the line that loses someone, and one revision.

**The point:** you hear the objection before anyone has to make it.

## Phase 1: Hear the team before you are in the room

*9 min*

Each agent speaks for a kind of person your team actually has, built from Team Knowledge, never a named colleague. The people stay yours to talk to; the agents only help you listen first.

Read `intent.md` and Team Knowledge, and start one subagent for each kind of person on your team.

{{prompt:em-rehearse-reactions}}

Each subagent sees only the entries about its kind of person, so the early adopter's enthusiasm cannot soften the sceptic's reaction.

Where a subagent says it had nothing to stand on, that is the most useful line in the file. It is a person you know less about than you thought, and the gap is now in Team Knowledge as something to find out.

## Phase 2: Choose the one revision

*6 min*

Pick the reaction you want to act on. The proposed revision is a starting point: take it, change it, or write your own. Tell the agent to apply one revision to `intent.md` and log it in the Decision Journal.

One revision, not five. An intent rewritten for every reaction stops saying anything.

<!-- maintainer -->

- **Prompt:** `em-rehearse-reactions` writes `rehearsal.md` + Team Knowledge gaps, does not touch `intent.md`. The revision is a conversational move (student_facing §12), no fence: the manager chooses, the agent applies and journals.
- **Kinds, not named people.** Spine: grounded in named Team Knowledge entries, never a persona alone. Strategy § Coalition as companions: no simulation of a named colleague; the fence forbids it and the body says why in one line.
- **Thin spots = the agentic payoff.** Same discipline as M1's "thin notes are named, not guessed". Gaps land in Team Knowledge where the weekly diagnostic reads them.
- **Hard exclusion held:** rehearsal is hearing, not persuading ("selling AI to the team" is out of scope). Nothing in body or fence frames it as messaging craft.
- **Failure modes:** every kind reacts the same → grounding is thin; the gaps in Phase 1 are the answer, not a rerun. Manager wants to revise for every reaction → Phase 2's one-revision line.
- **Timing:** 20 → 15 at Pass 3 to fit the 105-min cap (decision 8).
- **Leap test (Monday):**
  - runs the rehearsal prompt on a real team message before sending it, and changes one line because of it
  - adds a Team Knowledge entry for a person the rehearsal could not ground, after asking them directly
  - names to a coalition member which line of the intent they expect to lose someone, and which kind of person
