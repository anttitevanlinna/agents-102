# Our product, our system

## Big Idea

Learn to do AI as a team, and stay in control of it.

## Prework

Come as a team of three: a product owner, a designer and a team lead who work on the same product. Each of you brings:

- **A laptop with Claude installed and signed in.** <span class="rt-code">Claude Code, desktop app.</span><span class="rt-cowork">Claude Desktop with Cowork.</span>
- **A training folder** at `~/Documents/apt101/`, with three empty folders inside: `sources/`, `memory/` and `agents/`.
- **Your own material on the product,** somewhere you can reach from that laptop: interview notes, a ticket export, an analytics dashboard or export, retro notes. Your own seat's material, not the whole company's.
- **The link to your product's public page:** website, app store listing or sales one-pager.

Arrive without your own material and you build a memory of nothing. Your call.

## What You'll Learn

After this day, you will be able to:
- **Write** your product's promise backwards from the customer, and watch the agent's work change as you tell it more
- **Formulate** one bet as an outcome and hypotheses that can lose, with the riskiest assumption marked
- **Decide** together what may go into the agents before anything goes in
- **Build** a memory from your own material, and find its soft pages
- **Schedule** an agent for one recurring job, and write the rules it follows from what you saw today

## How we work in this room

- The three of you are one team. Room beats name who drives at the shared screen; the other two work the board, answer and argue.
- Each of you runs Claude on your own laptop. In the team folder, write only to your own folder; the driver writes the team's files at the root.
- Group work lives on your team's Miro board. What the agents keep reading lives in files.
- Exercises over lectures. Cut depth where you need to; every beat copes with a missing detail from the one before.

## Start here

**The question, to the three of you:** what is the last thing your team built that nobody asked for? Not a disaster. The feature that shipped, worked, and quietly went unused. Who decided to build it, and what were you sure of at the time?

[Lecture: You knew the craft; building rationed it](lectures/apt101-building-rationed-it.md)

[Lecture: Now building is cheap](lectures/apt101-building-is-cheap.md)

[Lecture: Start from your customer's sentence](lectures/apt101-work-backwards.md)

[Exercise: Paint the product box](exercises/apt101-paint-the-product-box.md)

[Lecture: The agent knows only what you tell it](lectures/apt101-only-what-you-tell-it.md)

[Exercise: Write the bet](exercises/apt101-write-the-bet.md)

[Lecture: Your first bet](lectures/apt101-write-the-bet.md)

[Exercise: What goes in](exercises/apt101-what-goes-in.md)

[Exercise: Build your product memory](exercises/apt101-build-your-product-memory.md)

[Lecture: Your material is the moat](lectures/apt101-your-material-is-the-moat.md)

[Lecture: Send it off](lectures/apt101-it-runs-overnight.md)

[Exercise: Send it off](exercises/apt101-send-it-off.md)

## Write down how you worked

Ten minutes. Each of you writes your first `./CLAUDE.md` at your training-directory root: the rules file every agent in your folder reads from now on. It already holds one line, the Styling line from the digest setup; keep it. Claude writes the rest from today's session. You push back on anything off.

{{prompt:a101-m2-debrief-claude-md}}

Read its summary. Push back on anything that doesn't match the day: *"No, that rule's too strict."* *"You missed the part where the door kept the interview notes out."* What Claude leaves out is often the signal. A tidy summary that skips the moment you re-prompted three times is the tell.

## Put the team's rules in one file

Three rules files, written from three seats, will differ. Each of you asks Claude to copy your `./CLAUDE.md` into your own folder in the team folder. Then the team lead drives at the shared screen and asks Claude to lay the three side by side.

**Prompt** · `apt101-d1-team-rules`, read each `team/<name>/CLAUDE.md`, write `team/team-rules.md` with the rules all three of us arrived at, each attributed, and list the rules only one of us wrote as open questions for Day 2

Read the open questions out loud. Agree on nothing yet. Each person's own file stays as it is; the team file is what you share.

## Key Concepts

- Building got cheap; the outcome, the bet and the signal are still decisions.
- The box was generic until you told Claude what only you knew.
- A bet that can't lose isn't a test; the riskiest assumption is the one that matters most with least behind it.
- The door comes before the material.
- Your own material makes the agent's answers yours.

## Bring to Day 2

**Your laptop, with the overnight digest scheduled and the laptop plugged in.** Day 2 opens on what came back. A digest that didn't run means you start the day reading someone else's.

## Next

Before Day 2, three agents read three memories against one bet, and write to you in your own company's look. On Day 2 the three of you read them, and decide what is actually true.

<!-- maintainer -->

**STATUS:** built from the build plan (`curriculum/module-design/apt101-build-plan.md` § Day 1), 2026-10-07, for the `simulation: true` training Agentic Product Teams 101. Not taught. Big Idea = the adopted positioning line (strategy, 2026-10-05), kept as the Day 1 module's; the day's story heading in the squint and build plan is *You were right all along*, and the H1 stays the registered module title (`site/layouts/curriculum.js`) so nav and file agree.

**Mood target:** vindication with a pulse: the craft they knew was right, and building their own box and memory in one day proves the cost has moved. The unease is planted (Phase 6 of *Send it off*: "does it sound sure of itself?"), not named; Day 2 names it.

**Board:** one Miro board per team, set up by the trainer, Day 1 frames: *Product box*, *Bet* (outcome stickies, hypotheses with names, assumption 2x2, dots). Text agents keep reading stays in files.

**Meta (trainer):**
- **Transitions:** open 10 @start "Start here" · close 10 @end "Write down how you worked" · team rules 5 @end "Put the team's rules in one file"
- **Where these numbers come from:** the build plan's beat sheet (beats 1 and 8). Every other beat has a file of its own that prices it.
- **Beat minutes vs lectures:** exercise `**Time:**` = the beat sheet's minutes, matching their Agents 101 sources. The "before / after" lectures sit on top of the beat minutes, except the beat-2 opener, which is lectures only. Totals: the beat sheet, `curriculum/module-design/apt101-build-plan.md` § Day 1 (`calculate-time.js` does not know this training yet).
- **Primary Bloom's level:** Apply (box, memory, agent) → Evaluate (riskiest assumption, the door, the cold read).
- **Materials (trainer):** a Miro board per team with the Day 1 frames; a team folder per team, posted in chat, with one empty subfolder per person; the fallback digest for Day 2 beat 1.
- **Prework time:** 15 minutes, plus finding your own material.

**Artefact contracts**
| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Product box | `team/product-box.html` | `apt101-paint-the-product-box` (designer drives) | `apt101-write-the-bet`; Day 3 `apt101-five-users` |
| Bet | `team/bet.md` (outcome, attributed hypotheses, assumption map) | `apt101-write-the-bet` (product owner drives) | `./challenge.md` via `apt101-what-goes-in`; Day 2 outcome; Day 3 story map |
| Hypotheses | `team/<name>/hypothesis.md` | `apt101-write-the-bet` (each) | `team/bet.md` (copied verbatim) |
| The door | `team/what-goes-in.md` | `apt101-what-goes-in` (team lead drives) | `apt101-build-your-product-memory` curation; Day 2 digest read |
| Brief | `./challenge.md` (personal) | `apt101-what-goes-in` (`name-your-challenge-1`) | every memory and agent prompt; Day 2 |
| Sources, memory | `sources/`, `memory/`, `memory/soft-pages.md` (personal) | `apt101-build-your-product-memory` | `apt101-send-it-off`; every Day 2 prompt |
| Agent | `agents/<job>.md` | `apt101-send-it-off` (`build-your-challenge-memory-5`) | Day 2 onward |
| Style | `./style.md` | `apt101-send-it-off` (`personal-agent-homework-1`) | every HTML output |
| Overnight digest | `module-2/morning-agent/morning.md`, `latest.html` | `apt101-send-it-off` | Day 2 beat 1 `apt101-read-the-digest` |
| Rules file | `./CLAUDE.md` (personal) | Day 1 close (`a101-m2-debrief-claude-md`) | every later run; sharpened at Day 2 close |
| Team rules | `team/team-rules.md` | Day 1 close (`apt101-d1-team-rules`, team lead drives) | Day 2 close |

**Prompt chain note:** `a101-m2-debrief-claude-md` declares `requires: working-tree-scaffold` from `a101-prework-extract-tarball`. APT101 has no tarball; the Prework section asks for the three empty folders by hand. Resolve at the prompt-body pass if the chain checker objects.

**Close shape:** review → rewrite → report (A101 M2 debrief, key reused), then a team-lead move that lays three rules files side by side and records disagreement as open questions rather than merging it away.
