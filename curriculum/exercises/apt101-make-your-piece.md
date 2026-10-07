# Exercise: Make your *piece*

**Time:** 45 minutes.

**What you do:**

Each of you builds your own piece of the chosen bet with Claude, in your own craft: something you could not have built alone before. The designer makes a clickable rough prototype from the interview quotes behind the bet. The product owner builds the experiment that could kill the bet, ready to run. The team lead drafts how the team would work on this bet with agents, then rehearses telling it to a sceptical colleague. At the end you lay the three side by side.

Everyone reads `team/chosen-bet.md` first. All three pieces serve that one bet.

## Phase 1: Build your piece

*35 min*

Each of you on your own laptop, in your own track below.

## Designer: build a prototype that answers one question

Pick the one question your prototype should answer before you ask for a single screen: what the thing does in the customer's day, what using it feels like, or whether it can work at all. The job the customer hires this for, in their words, is your best brief.

Ask Claude to build a clickable rough prototype from the quotes behind the bet.

{{prompt:apt101-d2-designer-prototype}}

Push back when it comes back polished. A finished look makes people believe the design is further along than it is. Rough is the point: the customer reacts to the idea, not the colours. And push back on any quote you don't recognise from the interviews. Ask Claude to find each quote in the interview files; any it can't find goes.

## Product owner: build the cheapest test that could kill the bet

Write down what would kill the bet before you build anything, while nobody in the team has a favourite result yet.

Ask Claude to build the experiment that could prove the bet wrong, ready to run on Monday.

{{prompt:apt101-d2-po-kill-test}}

The test card is Alex Osterwalder's, from Strategyzer. Push back on a threshold you could hit by accident ("some people click"). Push back on a survey that asks what customers would do; ask what they did last time.

## Team lead: draft how the team works on this bet with agents

Ask Claude to draft how your wider team would work on this bet with agents, for the team to decide.

{{prompt:apt101-d2-lead-way-of-working}}

Then rehearse telling it. Ask Claude to play a colleague who has heard change announced before.

{{prompt:apt101-d2-lead-sceptical-colleague}}

Push back on a colleague who folds after one answer. The real one won't. And keep the draft a draft: the point of Monday is that the team decides with you.

## Phase 2: Lay the three side by side

*10 min*

Put the three pieces next to each other on the bet frame of your team board: a screenshot of the prototype, the test card, the first lines of the working agreement.

Each of you looks at the other two pieces from your own craft. Do they test the same bet? Does the prototype show what the fake door promises? Does the working agreement give the agents a job that would have produced today's made-up quote? Where one piece contradicts another, decide together which one changes.

Then one round, piece by piece. The other two point at the part of it that only its maker could have made, and say why. The maker says nothing until both have spoken.

<!-- maintainer -->

**Quality:** compendium-audited 2026-10-07 (technical@d747a00d behavior@0ac6010f pedagogy@761a20a3)
- judges @d747a00d: technical PASS, behavior PASS, pedagogy PASS (3 findings see instances/agentic-product-teams-101--exercise--apt101-make-your-piece.pedagogy.json)

**Role in Day 2:** beat 8, protected. The creativity beat: each role makes a first piece of the chosen bet in its own craft, answering the room's private question of what each of us is for. Placed after the lecture *Each of you makes something*, whose slides set each role's frame (Houde and Hill's prototype questions, the test card, the working agreement). Its last slide (*Imagine it already failed*) carries into beat 9.

**Reuse:** new. New prompts: `apt101-d2-designer-prototype`, `apt101-d2-po-kill-test`, `apt101-d2-lead-way-of-working`, `apt101-d2-lead-sceptical-colleague`.

**Frameworks:** Jobs to be Done (the designer's brief, unnamed beyond "the job the customer hires this for"); prototype questions (Houde and Hill, 1997, in the lecture); test card (Osterwalder, named once in body); *Testing Business Ideas* experiment types (Bland and Osterwalder, in the lecture); working agreement and Marquet's push-authority-to-information (in the lecture).

**Artefacts:**
- Consumes: `team/chosen-bet.md` (choose the bet); the interview quotes carried in `team/chosen-bet.md`; `team/what-goes-in.md` (Day 1).
- Produces: `team/<designer>/prototype.html`; `team/<product-owner>/kill-test.md` plus `fake-door.html` or `survey.md`; `team/<team-lead>/way-of-working.md`. Read by imagine it failed, the Monday list, Day 3 slice, five users (the prototype and fake door) and take it to the team (the working agreement).

**Room:** three solo tracks in parallel, then the trio on the board. Phase 2's contradictions are a human call. Phase 2's closing round is hidden-spine thread 3 on Day 2: each role's answer to what it is for, said by the other two about the piece, never stated in body. Overrun: phase 2 is not cut; trim the rehearsal to three questions instead.

**Leap test:** on Monday each person (1) has a piece only their seat could have made (prototype, kill test, working agreement); (2) can say what it is for in one sentence; (3) can name what the other two pieces need from theirs.

**Failure modes:** phase 2, the three pieces laid out but nobody says which only one person could have made (each names one); phase 1, the designer asks for screens before choosing the question (the prompt asks first); the threshold is unfalsifiable; the working agreement reads as a decision handed down (the prompt frames it as a proposal; the rehearsal tests it).

**View summary:** Each of you builds a first piece of the chosen bet in your own craft: the designer a rough prototype from the interview quotes, the product owner the experiment that could kill the bet, the team lead a working agreement for the team, rehearsed against a sceptical colleague.
