# Exercise: Write the *bet*

**Time:** 35 minutes.

**What you do:**

The box says what the product promises. The bet says what you'll try next, and how you'd know it failed. The three of you write one outcome, three hypotheses (one from each of you), and map the assumptions under them on your team's board. Then you mark the one that would sink the bet and has the least behind it.

Keep the same <span class="rt-code">session</span><span class="rt-cowork">task</span> running. Claude still has the box, and `team/product-box.html` is on disk.

**Who drives.** The product owner drives Claude at the shared screen and writes `team/bet.md`, the file every agent reads from here on. The board's *Bet* frame holds the stickies and the assumption map. The designer and the team lead each write their own hypothesis on their own laptop, into their own folder in the team folder.

## Phase 1: One outcome

*8 min*

An outcome is what your customers do differently once the product works for them. Not *"ship the onboarding flow"*, but *"new accounts send their first invoice in the first week."* One outcome, for the next few months, that the box earns.

Post-its first. Two minutes, no talking: each of you puts one candidate outcome on a sticky in the *Bet* frame.

Ask Claude to read the three candidates, interview the three of you down to one outcome, and write it to the bet file.

{{prompt:apt101-d1-bet-outcome}}

The product owner answers first. The designer checks the *who*: is it a customer you have actually met? The team lead checks the *seen how*: can the team see that change today, or would someone have to build the measurement first?

Push back on an outcome that is really an output. If it names something you ship, ask what the customer does differently once it ships.

## Phase 2: Three hypotheses, one each

*12 min*

Each of you has a hunch about what would move that outcome. Write it so it can lose. The shape comes from Lean UX:

*We believe [this capability] for [these people] will achieve [this outcome]. We'll know we're right when [signal].*

The signal is the line that matters. Write one that could come back no, with a number and a window. *"Users like it"* can only say yes.

Each of you, on your own laptop, asks Claude to turn your hunch into one hypothesis statement.

{{prompt:apt101-d1-bet-hypothesis}}

Three seats, three hunches. The product owner's usually concerns value: will they want it. The designer's usually concerns use: will they get it. The team lead's usually concerns the build or the business: can we, should we. Different is good. Don't converge yet.

Then the product owner asks Claude to bring the three into the bet file, word for word.

{{prompt:apt101-d1-bet-gather}}

Read the three out loud. Each author says one sentence on why theirs, and puts their hypothesis on the frame as a sticky with their name on it. No editing someone else's line.

## Phase 3: Map the assumptions

*12 min*

Under every hypothesis sit assumptions: that customers want it (desirable), that the business should do it (viable), that the team can build it (feasible). Some matter a lot and have nothing behind them. Those are where you start. The map is Bland and Osterwalder's: importance on one axis, evidence on the other, drawn as a 2x2 on the *Bet* frame.

Ask Claude to list the assumptions under each hypothesis, sorted desirable, viable and feasible, as stickies for the board.

{{prompt:apt101-d1-bet-assumptions}}

Claude drafts the stickies. Where each one sits is the team's call. Each of you takes the assumptions under your own hypothesis and drags them onto the 2x2, saying out loud as you go: does the bet die if this is wrong? Do we have anything behind it beyond our own belief? The other two may move a sticky only by asking.

One pattern to watch: every sticky ends up in the important half. Push until a few drop. A map where everything matters ranks nothing.

## Phase 4: Mark the riskiest and write it down

*3 min*

One dot each, on the assumption that is important and has the least evidence behind it. If the dots split, leave them split.

Ask Claude to read the map and record it in the bet file.

{{prompt:apt101-d1-bet-record-map}}

If the three of you disagree, the bet file keeps both and the reason each of you gave. That disagreement is worth more than a tidy map.

## Take stock of the bet

**What happened:**

You wrote a bet that can lose, with each of your names on a line of it. One assumption is marked. Everything you build in the next three days either tests it or doesn't.

**What's next:**

In a moment the bet becomes what each of your agents works on. Before Day 2, one of them reads your own material against it.

<!-- maintainer -->

**Quality:** compendium-audited 2026-10-07 (behavior@0ac6010f)
- judges @0ac6010f: behavior PASS

**Role in Day 1:** beat 4; the trio's first written bet. Read by every agent from here on via `./challenge.md` in `apt101-what-goes-in`.

**Reuse:** new. Prompts: `apt101-d1-bet-outcome`, `apt101-d1-bet-hypothesis`, `apt101-d1-bet-gather`, `apt101-d1-bet-assumptions`, `apt101-d1-bet-record-map`.

**Board:** Miro frame *Bet*: outcome stickies, the three hypotheses with names, the assumption 2x2 and the dots. Rhythm: stickies → Claude reads / drafts → board → Claude records in `team/bet.md`. The board holds the conversation; `team/bet.md` is what the agents keep reading.

**Frameworks:** outcome statement (Seiden, named in the morning lecture); hypothesis statement in the Gothelf and Seiden Lean UX form; assumption map, desirable / viable / feasible × importance / evidence (Bland and Osterwalder). The lecture after, *Your first bet*, names O'Reilly's three-line hypothesis form and Bland's three questions (desirable, viable, feasible); the body says "Lean UX" for the template so the two don't compete for one attribution. Flagged for the maintainer: lecture form (O'Reilly) and exercise form (Gothelf and Seiden) differ slightly.

**Artefacts:** produces `team/bet.md` (outcome, three attributed hypotheses, assumption map, riskiest marked; driver: product owner), `team/<name>/hypothesis.md` (each person) and the Bet frame. Consumes `team/product-box.html`. `team/bet.md` is read by `apt101-what-goes-in` (as the challenge), Day 2 *pick the outcome*, Day 3 *map the story*.

**Workshop shape:** Claude drafts, humans place (Phase 3). Hypotheses copied verbatim with attribution, nothing written over (Phase 2). Split dots are recorded, not resolved by Claude.

**Taught around it:** *Your first bet* after. Take-stock stops at what the trio did.

**View summary:** The trio writes one outcome, a hypothesis from each person in a form that can lose, and maps the assumptions on the team board, then marks the riskiest together. The artefact is the bet file every agent reads from here on.
