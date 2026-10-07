# Exercise: Choose the *bet*

**Time:** 20 minutes.

**What you do:**

Prune the tree back to what has evidence behind it, then choose the one branch Day 3 builds. Claude checks what stands behind each branch, using the judge you kept in *Catch it making things up*. The three of you do the cutting and the choosing.

The product owner drives at the shared screen. The designer and the team lead work on the bet frame of the team board.

## Phase 1: See what stands behind each branch

*5 min*

Ask Claude to check every branch of the tree against its evidence and mark the result on the board.

{{prompt:apt101-d2-whats-behind-each-branch}}

Push back when a branch is marked solid on one ticket or one enthusiastic interview line. "Customers said they would love this" is not evidence of what they do.

## Phase 2: Prune and choose

*10 min*

Board first. Move every branch with nothing behind it to the side of the frame. Not deleted: the reason stays on its sticky, and a branch that comes back with evidence next week can come back on the tree.

For what is left, place each branch on two axes, as on Day 1's assumption map: how much the outcome depends on it, and how much evidence stands behind it. Each of you has a move here:

- **Product owner:** which branch moves the outcome most, and which test could prove it wrong cheaply.
- **Designer:** which branch is closest to what customers actually did, quotes and all.
- **Team lead:** which branch the team can carry next week without dropping what it already runs.

Choose one. The choice is yours, not Claude's, and not a count of stickies. If two of you want different branches, the one with a single name on it and real evidence behind it deserves the longest look.

## Phase 3: Write the chosen bet

*5 min*

Ask Claude to write the chosen branch as a bet the team can test.

{{prompt:apt101-d2-write-the-chosen-bet}}

The hypothesis statement is Jeff Gothelf and Josh Seiden's, from *Lean UX*. Push back if the signal can only say yes. "Users like it" is not a signal. "Ten of forty admins finish the import without calling us" is.

## Take stock

One bet, written so it can lose, with the evidence behind it and the branches you set aside still on the board. Each of you makes a piece of it next.

<!-- maintainer -->

**Quality:** compendium-audited 2026-10-07 (behavior@21214fc5)
- judges @21214fc5: behavior PASS

**Role in Day 2:** beat 7, first after lunch. Turns the attributed tree into one chosen bet, with evidence and its riskiest assumption, that beat 8 builds pieces of and Day 3 slices.

**Reuse:** new. New prompts: `apt101-d2-whats-behind-each-branch`, `apt101-d2-write-the-chosen-bet`. Applies the Day 2 judge (`judges/groundedness-judge.md`) to the team's own tree, the propose-double-check-apply move from Agents 101 M5's debrief made concrete.

**Frameworks:** hypothesis statement (Gothelf and Seiden, *Lean UX*, named once in body); assumption map axes, importance × evidence (Bland and Osterwalder, introduced Day 1, echoed here without the name).

**Artefacts:**
- Consumes: `team/tree.md` (grow the tree); `judges/groundedness-judge.md` (catch it making things up); `./crux.md`; `team/bet.md`; bet frame on the team's Miro board (trainer-built).
- Produces: `team/chosen-bet.md` (product owner drives; read by make your piece, imagine it failed, keep and run tonight, Day 3 story map and five users); set-aside branches marked in `team/tree.md`.

**Room:** product owner drives the screen; all three on the board; each role has its own lens in phase 2. Decision is the trio's, never vote-counted or agent-adjudicated (workshop §11); the real constraint is that Day 3 builds one branch only (§10). Nothing is written over (§6): pruned branches move aside with their reason.

**Failure modes:** the team picks the branch it liked before lunch and the judge's verdicts are skimmed (point at the sticky); the signal can only say yes (push back in phase 3).

**View summary:** You check every branch of your tree against its evidence with the judge you built, set aside what has nothing behind it, and choose one bet, written as a hypothesis statement with a signal that could say no.
