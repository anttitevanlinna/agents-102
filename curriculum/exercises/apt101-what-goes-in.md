# Exercise: What goes *in*

**Time:** 15 minutes.

**What you do:**

Next, each of you builds a memory from your own material. Before anything goes in, each of you pins the bet in your own words, scouts where your material lives, and then the three of you agree on the door: what may go into the agents, and what stays out.

Keep the same <span class="rt-code">session</span><span class="rt-cowork">task</span> running. Each of you works on your own laptop for the first two moves.

## Phase 1: Pin the bet in your own folder

*6 min*

Each of your agents reads one short brief at your training-directory root, `./challenge.md`: the bet you just wrote, seen from your own seat. What you're trying, what you already know, where you are stuck.

Ask Claude to interview you, one question at a time, and write the brief.

**Prompt** · `apt101-d1-pin-the-bet`, reads `team/bet.md`; asks me three questions one at a time (what my hypothesis in it tries, what I already know from my own material, where I am stuck), using my words, not the bet file's; writes my answers as a half-page brief to `./challenge.md`, headed by the outcome and my hypothesis quoted from `team/bet.md`

Answer in your own words. The product owner's brief will lean on the outcome, the designer's on the customers, the team lead's on what the team can build and how. That difference is the point; three agents will read three briefs.

## Phase 2: Scout where your material lives

*3 min*

Ask Claude where you'd go scouting for raw material on this bet.

**Prompt** · `apt101-d1-scout-the-material`, reads `./challenge.md`; asks me where the material on this bet lives in my own work (interview notes, ticket exports, analytics, retro notes, shared folders, anything else I name), then lists each source with where it is, what is in it, and whether it holds people's names; shows the list and saves nothing

Answer for your own world. Keep the list on screen. It is what the door is about to decide.

## Phase 3: Agree the door

*6 min*

Once a source is in, its lines turn up in summaries and in every page built from it. Taking it out later means finding everything it touched. So the three of you decide first.

Your company's rules on what may go through an AI tool are the outer edge. The door sits inside it, and it is yours: what this team is comfortable sending to the agents for this bet, today.

The team lead drives at the shared screen and asks Claude to write the door from the three scouting lists.

**Prompt** · `apt101-d1-the-door`, ask each of us to read out our scouting list, then write `team/what-goes-in.md`: what may go in, what stays out (with the reason in our words), and what we strip before it goes in, each line attributed to who said it

Go through each kind of material out loud. One question for each: does the agent need this to read the bet, or is it just there? Customer names in interview notes, phone numbers in a ticket export, a colleague's name in a retro note or ticket, the folder nobody remembers sharing: decide them now, by name.

It will cost a source somebody wanted in. That is the door working. Anyone may say no to a source, and a no needs no defending.

## Take stock of the door

**What happened:**

Three briefs, each pointing at the same bet from a different seat. One door, agreed by all three of you, written down before anything went in.

**What's next:**

Next, each of you builds your memory through that door.

<!-- maintainer -->

**Role in Day 1:** beat 5; the one plain data beat in APT101 (no governance, no legal). Day 2's beat sheet owes this: "the team agrees what may go into the agents before anything goes in."

**Reuse:** shape of Agents 101 `name-your-challenge` (interview → brief, then scouting), rewritten as `apt101-d1-pin-the-bet` and `apt101-d1-scout-the-material` so the prompts speak of the bet and the trio's own sources (removes the "Claude's prompt calls it your challenge" seam). The file stays `./challenge.md`: the reused `build-your-challenge-memory-*` prompts read it. The scouting list stays in scrollback, where `build-your-challenge-memory-1` picks it up. New: `apt101-d1-the-door`.

**Frameworks:** none named; the door is the data-minimisation move ("the door you don't open") taught by the lecture *Send it off* before beat 7, so the exercise produces it and the lecture names it.

**Artefacts:** produces `./challenge.md` (personal; points at `team/bet.md`) and `team/what-goes-in.md` (driver: team lead). Consumes `team/bet.md`. `team/what-goes-in.md` is read by `apt101-build-your-product-memory` (curation) and Day 2's digest read.

**Workshop shape:** scope of sharing declared before contribution (workshop §8); each line attributed (§5); a no is a decision by humans (§11).

**Watch-for:** a trio that lets everything in to save time. The trainer asks for one named thing that stays out.

**View summary:** Each person pins the bet in their own brief and scouts their own material, then the trio agrees what may go into the agents and what stays out. The artefact is the team's door, written before anything goes in.
