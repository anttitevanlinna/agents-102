# Exercise: Paint the product *box*

**Time:** 45 minutes. Banter expected.

**Session** *(new, "Day 1 - Our product, our system")*

<span class="rt-code">Start a new Claude Code session at your training-directory root, `~/Documents/apt101/`.</span><span class="rt-cowork">Start a new Cowork task with your training-directory root, `~/Documents/apt101/`, as the working folder.</span>

```
/rename apt101-day-1
```

**What you do:**

The three of you paint the box your product would come in. The sketch grows on your team's board; Claude paints it as one page. Five passes, each one changing only what Claude is told, from a box any competitor could print to a box only you could. Then a fresh read tells you which line is still generic.

**Who drives.** The designer drives Claude at the shared screen and saves the page to the team folder. The product owner and the team lead work the board, answer out loud and argue with each other. Every pass overwrites `team/product-box.html`, so the latest version always lives there.

**Reach the board and the team folder.** The trainer posts both in chat: your team's Miro board, with a frame for the box, and the team folder. All three of you link the team folder now; each of you writes to it in later exercises. Only the driver's Claude needs the board.

<div class="rt-code">

Ask Claude to link the team folder into your training folder as `team/`, then paste the path the trainer posted.

{{prompt:apt101-d1-link-the-team-folder}}

</div>
<div class="rt-cowork">

Add the team folder to this task with the **+** button, next to your training folder. Wherever a prompt says `team/`, Claude uses that folder.

</div>

Claude reads the board through the Miro connector; if your company hasn't turned it on, paste a screenshot of the frame into the chat instead.

## Phase 1: The boring baseline

*5 min*

Open your product's public page: the website front page, the app store listing, or the sales one-pager. Select all, copy, and paste it after the colon. Navigation, footer and all. The mess is the point.

Ask Claude to paint a product box from your public page.

{{prompt:apt101-d1-box-baseline}}

Open the page. It works. It reads like a box. It is also a box your nearest competitor could print with their logo on it. Keep it that way for now: you need it generic to feel what the next passes change.

## Phase 2: Write it backwards from your customer

*10 min*

Amazon teams write the press release before anything is built, in the customer's words, and call it **working backwards**. The release names the customer, the problem in their words, what changes for them, a quote a real customer could say, and the top reasons the product could still fail.

Post-its first. Three minutes, no talking: each of you puts stickies on the box frame, one per beat you can answer. Each beat has an owner. The product owner writes what changes for the customer. The designer writes the customer's problem and a sentence a customer actually said. The team lead writes why it could fail: what is hard to build, what the team has never shipped before.

Then name the framework, tune it, ask Claude to run it. Claude knows working backwards already, so you don't have to recite it. The tune here: the box face carries the customer's promise, and the press release sits behind it.

Ask Claude to read the box frame, walk you through the beats the stickies leave open, then repaint the box.

{{prompt:apt101-d1-read-the-board}}

Back to the board. Where Claude's wording beat a sticky, the sticky's author moves it; where a sticky beat Claude's wording, say so and the driver asks for it back.

One pattern to watch: the customer quote. Claude will offer a smooth one. Ask whose sentence it is. If nobody in the room has heard a customer say something like it, replace it with a line you have heard.

## Phase 3: What only your product does

*7 min*

Every product in your category promises speed, ease and peace of mind. Each of you adds stickies to the frame: things your product does that a competitor's doesn't, one line each. Small and true beats big and vague. *"Imports the bank's own CSV without a mapping step"* beats *"seamless integrations."* Pick three together.

The team lead usually knows the true version of each line: what is actually built, and what is still a slide.

Ask Claude to read the three only-us stickies and repaint the box on them.

{{prompt:apt101-d1-box-only-us}}

## Phase 4: What your customers would never say

*8 min*

Praising your own product is hard; complaining about the alternatives is easy. Invert the easy thing. On the frame, stickies for the specific things your customers hate about the way they do the job today, and the words they would never use about your product. Not categories (*"complexity"*) but the real complaint (*"I export to Excel to check what the dashboard says"*).

The designer leads this one: interviews, support calls, usability sessions. The other two add what they've heard in tickets and sales calls.

Ask Claude to repaint the box from what your customers hate and the words they'd never use.

{{prompt:apt101-d1-box-never-say}}

## Phase 5: Make it yours

*8 min*

Open prompts. The driver changes; anyone may take the keyboard. Colour, layout, the one line the customer reads first, a back panel that answers the question your sales team gets every week. Steal a look by naming it: *"make it feel like our own website"* or *"the box an outdoor brand would print"*. Iterate until the three of you would put it on the table in a customer meeting.

Put a screenshot of the final box on the frame, next to the stickies it came from.

## Phase 6: A fresh read

*7 min*

Claude has been painting this box for half an hour, and it reads its own work kindly in the chat where it made it. A read with no memory of building it is sharper.

Ask Claude for a cold read of the box: the line a competitor couldn't print, and the line they could.

{{prompt:apt101-d1-box-cold-read}}

Read the two quotes out loud. Then put the Phase 1 baseline in your head next to the page on the screen. You told Claude different things between the two, and nothing else changed.

Push back if the "most generic line" comes back soft (*"could be a touch more specific"*). Ask for the line a competitor could paste onto their own box today. Put it on the frame as a sticky of its own.

## Take stock of the box

**What happened:**

Same model, five boxes. The first came from your public page. The last came from three people who know the product, arguing over a board full of stickies. Each of you can point at the line on the final box that came from you.

**What's next:**

You keep this box. The bet is written against it next, and on Day 3 five people from outside the team look at it. Keep the generic line the fresh read found; it is the first thing to fix.

<!-- maintainer -->

**Role in Day 1:** beat 3, the first hands-on beat; the opener after the two lectures; the trio meets the Agents 101 Module 1 mechanism (context shapes output) on its own product, before *Start from your customer's sentence* and *The agent knows only what you tell it* name what it did.

**Reuse:** shape only, from `personal-site-with-guardrails` (baseline → framework → strengths → anti-mirror → free iteration → look back) and `a101-m1-debrief-cold-critic` (cold read, unique line vs generic line). All prompts new: `apt101-d1-box-baseline`, `apt101-d1-read-the-board`, `apt101-d1-box-only-us`, `apt101-d1-box-never-say`, `apt101-d1-box-cold-read`. The cold-read prompt body will spawn a fresh reader (subagent); the body lead-in avoids the word.

**Board:** Miro frame *Product box*, set up by the trainer. Rhythm per phase: stickies first, Claude reads the frame (connector, screenshot fallback), then the board again. The HTML page is the file the agents read later; the board holds the sketch and the attribution.

**Frameworks:** Working Backwards press release (Bryar and Carr), Hohmann's Product Box (named by the lecture after, once the trio has painted its own), anti-branding / via negativa (inverted from the A101 mirror), Jobs to be Done in the "what changes for them" beat.

**Artefacts:** produces `team/product-box.html` (driver: designer) and the box frame on the board. Consumed by `apt101-write-the-bet` (Day 1) and `apt101-five-users` (Day 3). The lecture *The product box keeps the agents on course* points the agents at it.

**Taught around it:** *Start from your customer's sentence* after (it names the box game and working backwards once the trio has played both), then *The agent knows only what you tell it*. The take-stock section stops at what the trio saw; the lectures name the move and the mechanism.

**Per-phase failure mode + escape hatch:**

| Phase | Dominant failure | Escape hatch |
|---|---|---|
| 1 Baseline | Team curates the paste, the contrast vanishes | Paste the full public page, chrome and all |
| 2 Working backwards | Invented customer quote accepted | Ask whose sentence it is; replace with one heard |
| 3 Only us | Category claims (*"seamless"*) | Team lead names what is actually built |
| 4 Never say | Categories instead of complaints | Replace each with the sentence a customer said |
| 5 Make it yours | Styling eats the cold read | Time-box; the cold read is protected |
| 6 Cold read | Soft "generic" pick | Ask for the line a competitor could paste today |

**Capability check owed:** Miro connector read of a frame's stickies, from both Claude Code and Cowork. Screenshot fallback assumed throughout.

**Leap test:** a product box the trio would show a customer; a felt difference between the baseline and the final box, with each person pointing at their own line; the generic line named.

**View summary:** The trio sketches its product's box on the team board and Claude paints it in five passes, changing only what Claude is told, from a box any competitor could print to one only they could. The artefact is a product box page every later agent is measured against.
