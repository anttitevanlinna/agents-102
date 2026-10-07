# Exercise: Grow the *opportunity* tree

**Time:** 45 minutes.

**What you do:**

Grow an opportunity solution tree for the outcome you agreed in *Pick the outcome*. Teresa Torres draws it with the outcome at the root, the customer needs, pains and wishes under it as opportunities, and the ideas that might address each one hanging below. Each of you sketches alone first, on the team's Miro board. Then Claude merges the three sketches, keeping every name on every branch. Then each of you questions the merged tree from your own role.

The trainer has set up a frame for the tree on your team board. If your company has not enabled the Miro connector, a screenshot or export of the frame goes into the chat instead.

## Phase 1: Sketch alone

*8 min*

No talking, no Claude. Each of you, in your own sticky colour, on your own side of the frame. The outcome from `./crux.md` sits at the top.

Write the opportunities you have seen in your own material: what customers struggled with, asked for, worked around. Under each, one or two ideas. Your name or colour on every sticky, so the merge can keep it.

Put down the opportunity only you would think of. The ones all three of you saw will turn up anyway.

## Phase 2: Merge with every name kept

*10 min*

The designer drives at the shared screen: the designer sat closest to what customers actually said. While Claude merges, the product owner checks each merged branch against the outcome at the root, and the team lead marks on the board every branch only one person found, so none of them goes missing in the merge.

Ask Claude to merge the three sketches into one tree against the outcome, keeping each branch's names.

{{prompt:apt101-d2-merge-the-tree}}

Push back on a merge that reads like the average of the three of you. If your single-name branch disappeared into a bigger one, ask for it back. If a cut has no reason you can argue with, ask for the reason.

## Phase 3: Read the evidence three ways

*12 min*

Each of you, on your own laptop, back in your first <span class="rt-code">session</span><span class="rt-cowork">task</span>. Ask Claude to send three minds through your memory, each from a different angle, and write back what they find.

Three subagents fanning out at once. If one starts reading the world, stop it, steer narrower, then say *"continue"*.

<div class="rt-code">

Ask Claude to spawn three subagents with different stances, then synthesize their notes back into `./crux.md`.

{{prompt:three-minds-one-synthesis-1}}

</div>
<div class="rt-cowork">

Ask Claude to spawn three agents with different stances, then synthesize their notes back into `./crux.md`.

{{prompt:three-minds-one-synthesis-2}}

</div>

Each of you keeps the read closest to your role:

- **Product owner: the assumption tester.** What would have to be true for the branch you like best to pay off?
- **Designer: the reframer.** Is the question itself wrong? What did customers do that nobody asked about?
- **Team lead: the planner working back from the outcome.** What has to be true in three months, and who on the team does it?

If the answer comes back with a longer list of issues than you have time for, hand the triage back.

{{prompt:three-minds-one-synthesis-3}}

## Phase 4: Question the tree from your role

*15 min*

Back to the board. Each of you adds your challenges to the merged tree on stickies in your colour, from the stance you kept: the product owner on the branch whose assumptions are thinnest, the designer on the branch that is really a solution or misread the customer, the team lead on the branch the team could not carry.

Then the designer asks Claude to record the challenges in the tree file, each with its author's name.

{{prompt:apt101-d2-add-the-challenges}}

The tree is not finished, and it should not be. You choose from it in *Choose the bet*.

<!-- maintainer -->

**Quality:** compendium-audited 2026-10-07 (writing@7ff539b9 technical@1faabaa8 behavior@21214fc5 pedagogy@20018100)
- judges @7ff539b9: writing PASS, technical PASS, behavior PASS, pedagogy PASS (3 findings see instances/agentic-product-teams-101--exercise--apt101-grow-the-tree.pedagogy.json)

**Role in Day 2:** beat 4. Produces the team's opportunity solution tree, attributed per branch, and each person's three-stance read of the evidence. Placed after *Go back to your customers*; *Widen before you choose* names afterwards what the trio just did (alone first, merge keeps the single-name branch, the outcome makes the merge choose).

**Reuse:** Agents 101 `three-minds-one-synthesis`, keys `three-minds-one-synthesis-1`, `-2` (runtime fork), `-3`, unchanged; its planner / assumption tester / reframer stances are mapped to roles in body prose. New: `apt101-d2-merge-the-tree`, `apt101-d2-add-the-challenges`. Keeping `three-minds-one-synthesis-1` also writes `module-3/stances/` and the `## Answer` in `./crux.md`, which `hallucination-bakeoff-1` requires.

**Frameworks:** opportunity solution tree (Teresa Torres, named once in body); alone-before-merge (1-2-4-All, named in the lecture after, not here); Martin's what-would-have-to-be-true and Rumelt's kernel ride inside the reused prompt.

**Artefacts:**
- Consumes: `./crux.md` (outcome, crux, question); `memory/`, `sources/` (gather the evidence); the tree frame on the team's Miro board (trainer-built).
- Produces: merged tree frame on the board; `team/tree.md` (designer drives; branches with authors and each branch's source sentence quoted with file and owner, so readers on any laptop check against the quote; challenges with names); each person's `module-3/stances/` and `## Answer` in `./crux.md`.

**Room:** phase 1 solo in silence on the board; phase 2 designer drives, product owner checks branches against the outcome, team lead marks single-name branches on the board; phase 3 solo; phase 4 all three on the board, designer records. Attribution comes from the sticky's name or colour, stated by the person who wrote it (workshop §5); nothing is written over (§6): Claude lists cuts, the trio makes them at *Choose the bet*.

**Failure modes:** phase 1, one person's colour fills the frame (trainer: equal sticky count each, then stop); phase 2, merge averages toward the middle (push back for the single-name branch) and "opportunities" that are features (Torres's more-than-one-way test, inside the merge prompt); phase 3, a stance read taken as agreement (ask which stance disagreed, and with what); phase 4, challenges written in the room's majority colour (each in their own colour, on their own branch); no Miro connector throughout (screenshot fallback).

**Leap test:** on Monday each person (1) can point to a branch in `team/tree.md` only one of them found, kept with its name; (2) checks a branch against the source sentence quoted under it before quoting it to anyone; (3) has one challenge in their own colour that changed the tree.

**View summary:** You grow an opportunity solution tree from the agreed outcome: sketched alone on the team board, merged by Claude with every branch's names kept, then questioned by each of you from your own role.
