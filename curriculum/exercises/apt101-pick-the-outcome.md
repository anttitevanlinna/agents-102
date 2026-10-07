# Exercise: Pick the *outcome*

**Time:** 10 minutes.

**What you do:**

Today's opportunity tree hangs from one outcome. Your bet in `team/bet.md` already states one. The doubt you just chose may have shaken it. Before anyone draws a branch, agree which outcome the tree hangs from, and find what stands between your customers and it.

The product owner drives at the shared screen. The designer and the team lead each keep `team/bet.md` and `team/doubts.md` open on their own laptops, and push back from there.

## Find what stands in the way

Ask Claude to read your product memory and find the obstacle that, if it moved, would release the most else. Richard Rumelt calls it the **crux**. Claude's prompt treats `challenge.md` as your challenge; yours points at the bet, so the crux it finds is what stands between your customers and the outcome you wrote on Day 1.

{{prompt:name-your-crux-1}}

Push back hard when the first answer restates the outcome. "Customers need to finish onboarding faster" is the outcome again. "New admins stall at the import step and wait for us to call them" is an obstacle you can do something about.

## Write down the call it blocks

Ask Claude to name the sharpest decision the crux blocks and append it to the same file. Here the decision is the one today's tree has to inform.

{{prompt:name-your-crux-2}}

Push back if the question is a topic ("what about onboarding?"). It should be a call one of you would stay late to make.

## Agree the outcome

Read the crux and the question beside the outcome in `team/bet.md` and the chosen doubt. Does the doubt change the outcome, or only how sure you are of it? Decide together. The product owner writes the outcome you agreed at the top of `./crux.md` under `## Outcome`, then copies the file to `team/crux.md`. The designer and the team lead copy `team/crux.md` into their own training folders as `./crux.md`, because the evidence run reads it from there.

<!-- maintainer -->

**Role in Day 2:** beat 2. Fixes the root of today's tree (the agreed outcome) and the decision it informs, in one file every Day 2 prompt reads.

**Reuse:** Agents 101 `name-your-crux`, keys `name-your-crux-1`, `name-your-crux-2`, unchanged. The crux prompt rejects goals by its own rule, so the outcome is not asked of it: the outcome comes from `team/bet.md`, agreed by the trio; the crux is the obstacle under it; the `## Question` is the decision. `## Outcome` is written by the product owner, by hand, above the prompt's sections.

**Frameworks:** Rumelt's crux (*Good Strategy / Bad Strategy*); the outcome statement from Day 1.

**Artefacts:**
- Consumes: `memory/`, `./challenge.md` (Day 1, product memory); `team/bet.md`; `team/doubts.md` (read the digest).
- Produces: `./crux.md` (product owner's folder, then copied), `team/crux.md`; each person's `./crux.md`, which the retrievers in `apt101-gather-the-evidence` read.

**Room:** one driver (product owner) at the shared screen; the others read and push back from their own laptops. Outcome decision is the trio's (workshop §11).

**View summary:** You agree the one outcome today's opportunity tree hangs from, and find with Claude the obstacle between your customers and it, plus the decision it blocks.
