# Exercise: Pick the *outcome*

**Time:** 10 minutes.

**What you do:**

Today's opportunity tree hangs from one outcome. Your bet in `team/bet.md` already states one. The doubt you just chose may have shaken it. Before anyone draws a branch, agree which outcome the tree hangs from, and find what stands between your customers and it.

The product owner drives at the shared screen. The designer checks the obstacle against what customers actually said. The team lead checks whether it names something the team can act on.

## Find what stands in the way

Ask Claude to read your product memory and the bet, and find the obstacle between your customers and the outcome you wrote on Day 1: the one that, if it moved, would release the most else.

**Prompt** · `apt101-d2-find-the-obstacle`, reads `memory/`, the outcome in `team/bet.md` and the chosen doubt in `team/doubts.md`; names in one sentence, in customers' words, the obstacle between our customers and that outcome which, if it moved, would release at least three other stuck things, with the memory line it rests on; rejects an answer that restates the outcome, names a category or names a feature; shows it, then saves it to `./crux.md` under `## Crux`

Push back hard when the first answer restates the outcome. "Customers need to finish onboarding faster" is the outcome again. "New admins stall at the import step and wait for us to call them" is an obstacle you can do something about.

## Write down the call it blocks

Ask Claude to name the sharpest decision the obstacle blocks, the one today's tree has to inform, and append it to the same file.

**Prompt** · `apt101-d2-the-call-it-blocks`, reads `./crux.md` and `team/bet.md`; names in one sentence the decision the obstacle blocks that our team has to make in the next few weeks, as a call between options, not a topic; shows it, then appends it to `./crux.md` under `## Question` without touching the lines above

Push back if the question is a topic ("what about onboarding?"). It should be a call one of you would stay late to make.

## Agree the outcome

Read the obstacle and the question beside the outcome in `team/bet.md` and the chosen doubt. Does the doubt change the outcome, or only how sure you are of it? Decide together. The product owner asks Claude to put the outcome you agreed at the top of `./crux.md` under `## Outcome`, the chosen doubt from `team/doubts.md` under `## Doubt` word for word, and save the file to `team/crux.md`. The designer and the team lead each ask their own Claude to take `team/crux.md` as their `./crux.md`, where the evidence run reads it.

<!-- maintainer -->

**Role in Day 2:** beat 2. Fixes the root of today's tree (the agreed outcome) and the decision it informs, in one file every Day 2 prompt reads.

**Reuse:** shape of Agents 101 `name-your-crux` (obstacle, then the decision it blocks), rewritten as `apt101-d2-find-the-obstacle` and `apt101-d2-the-call-it-blocks` so the prompts read the bet, not a `challenge.md` (removes the "your prompt says challenge" seam). Headings stay `## Crux` and `## Question`: the reused `three-retrievers-one-curator`, `three-minds-one-synthesis` and `hallucination-bakeoff` prompts read them. The outcome comes from `team/bet.md`, agreed by the trio; the crux is the obstacle under it; the `## Question` is the decision. `## Outcome` and `## Doubt` go above the prompt's sections, at the product owner's ask; `## Doubt` is how the chosen doubt reaches the retrievers in `apt101-gather-the-evidence`, which read `./crux.md`.

**Frameworks:** Rumelt's crux (*Good Strategy / Bad Strategy*) carried by the reused prompt; the body says "obstacle" and never names the term, because the trio picks the outcome and the word is not needed. The outcome statement from Day 1.

**Artefacts:**
- Consumes: `memory/` (Day 1, product memory); `team/bet.md`; `team/doubts.md` (read the digest).
- Produces: `./crux.md` (outcome, chosen doubt, crux, question; product owner's folder, then copied), `team/crux.md`; each person's `./crux.md`, which the retrievers in `apt101-gather-the-evidence` read.

**Room:** one driver (product owner) at the shared screen; the designer checks the obstacle against customer evidence, the team lead checks it is actionable by the team. Outcome decision is the trio's (workshop §11).

**View summary:** You agree the one outcome today's opportunity tree hangs from, and find with Claude the obstacle between your customers and it, plus the decision it blocks.
