# Exercise: What goes *in*

**Time:** 15 minutes.

**What you do:**

Next, each of you builds a memory from your own material. Before anything goes in, each of you pins the bet in your own words, scouts where your material lives, and then the three of you agree on the door: what may go into the agents, and what stays out.

Keep the same <span class="rt-code">session</span><span class="rt-cowork">task</span> running. Each of you works on your own laptop for the first two moves.

## Phase 1: Pin the bet in your own folder

*6 min*

Each of your agents reads one short brief at your training-directory root, `./challenge.md`. Claude's prompt calls it your challenge. Here the challenge is the bet you just wrote, seen from your own seat: what you're trying, what you already know, where you are stuck.

Ask Claude to interview you with three focusing questions and write the brief to `./challenge.md`.

{{prompt:name-your-challenge-1}}

Answer from `team/bet.md`, in your own words. The product owner's brief will lean on the outcome, the designer's on the customers, the team lead's on what the team can build and how. That difference is the point; three agents will read three briefs. If Claude shows all three questions at once, ask for one at a time.

## Phase 2: Scout where your material lives

*3 min*

Ask Claude where you'd go scouting for raw material on this bet.

{{prompt:name-your-challenge-2}}

Claude asks about a wiki and shared drives. Answer for your own world: the interview notes, the ticket export, the analytics dashboard, the retro board. Keep the list on screen. It is what the door is about to decide.

## Phase 3: Agree the door

*6 min*

Once a source is in, its lines turn up in summaries and in every page built from it. Taking it out later means finding everything it touched. So the three of you decide first.

Your company's rules on what may go through an AI tool are the outer edge. The door sits inside it, and it is yours: what this team is comfortable sending to the agents for this bet, today.

The team lead drives at the shared screen and asks Claude to write the door from the three scouting lists.

**Prompt** · `apt101-d1-the-door`, ask each of us to read out our scouting list, then write `team/what-goes-in.md`: what may go in, what stays out (with the reason in our words), and what we strip before it goes in, each line attributed to who said it

Go through each kind of material out loud. One question for each: does the agent need this to read the bet, or is it just there? Customer names in interview notes, phone numbers in a ticket export, the folder nobody remembers sharing: decide them now, by name.

It will cost a source somebody wanted in. That is the door working. Anyone may say no to a source, and a no needs no defending.

## Take stock of the door

**What happened:**

Three briefs, each pointing at the same bet from a different seat. One door, agreed by all three of you, written down before anything went in.

**What's next:**

Next, each of you builds your memory through that door.

<!-- maintainer -->

**Role in Day 1:** beat 5; the one plain data beat in APT101 (no governance, no legal). Day 2's beat sheet owes this: "the team agrees what may go into the agents before anything goes in."

**Reuse:** keys `name-your-challenge-1` (produces `./challenge.md`, here = the bet from this person's seat) and `name-your-challenge-2` (scouting list in scrollback, feeds `build-your-challenge-memory-1`). New: `apt101-d1-the-door`. The A101 key wording ("challenge", Confluence / OneDrive) is framed in body prose, not edited.

**Frameworks:** none named; the door is the data-minimisation move ("the door you don't open") taught by the lecture *Send it off* before beat 7, so the exercise produces it and the lecture names it.

**Artefacts:** produces `./challenge.md` (personal; points at `team/bet.md`) and `team/what-goes-in.md` (driver: team lead). Consumes `team/bet.md`. `team/what-goes-in.md` is read by `apt101-build-your-product-memory` (curation) and Day 2's digest read.

**Workshop shape:** scope of sharing declared before contribution (workshop §8); each line attributed (§5); a no is a decision by humans (§11).

**Watch-for:** a trio that lets everything in to save time. The trainer asks for one named thing that stays out.

**View summary:** Each person pins the bet in their own brief and scouts their own material, then the trio agrees what may go into the agents and what stays out. The artefact is the team's door, written before anything goes in.
