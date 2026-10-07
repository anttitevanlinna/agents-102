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

**Prompt** · `apt101-d2-designer-prototype`, reads `team/chosen-bet.md` and the interview quotes it carries; asks me which one question the prototype should answer and the job the customer hires it for; builds a clickable rough prototype as one HTML file at `team/<your-name>/prototype.html`, every screen carrying the customer quote it was built from and its source; lists at the end what the prototype does not answer

Push back when it comes back polished. A finished look makes people believe the design is further along than it is. Rough is the point: the customer reacts to the idea, not the colours. And push back on any quote you don't recognise from the interviews. Ask for the source; if there isn't one, it goes.

## Product owner: build the cheapest test that could kill the bet

Write down what would kill the bet before you build anything, while nobody in the team has a favourite result yet.

Ask Claude to build the experiment that could prove the bet wrong, ready to run on Monday.

**Prompt** · `apt101-d2-po-kill-test`, reads `team/chosen-bet.md` and its riskiest assumption; proposes two or three of the cheapest experiments that could prove it wrong (a fake-door page, a short survey, a concierge test) and asks me to pick; writes a test card to `team/<your-name>/kill-test.md` (what must be true, the test, the measure, the threshold below which the bet fails); builds the chosen experiment so it can run, a fake-door page at `team/<your-name>/fake-door.html` or a survey at `team/<your-name>/survey.md`

The test card is Alex Osterwalder's, from Strategyzer. Push back on a threshold you could hit by accident ("some people click"). Push back on a survey that asks what customers would do; ask what they did last time.

## Team lead: draft how the team works on this bet with agents

Ask Claude to draft how your wider team would work on this bet with agents, for the team to decide.

**Prompt** · `apt101-d2-lead-way-of-working`, reads `team/chosen-bet.md`, `team/what-goes-in.md` and today's files in `team/`; drafts a one-page working agreement at `team/<your-name>/way-of-working.md`: what the agents do on this bet, what stays with people (talking to customers, choosing which opportunity to pursue, anything a customer sees before a person reads it), who reads what the agents write and when, and when the team revisits the agreement; written as a proposal the team decides, not a decision

Then rehearse telling it. Ask Claude to play a colleague who has heard change announced before.

**Prompt** · `apt101-d2-lead-sceptical-colleague`, plays a sceptical senior colleague on my wider team who remembers the last change negotiations; I present `team/<your-name>/way-of-working.md` in my own words; they ask one hard question at a time and wait for my answer; after five questions, tells me which answer landed, which did not, and which line in the draft to change

Push back on a colleague who folds after one answer. The real one won't. And keep the draft a draft: the point of Monday is that the team decides with you.

## Phase 2: Lay the three side by side

*10 min*

Put the three pieces next to each other on the bet frame of your team board: a screenshot of the prototype, the test card, the first lines of the working agreement.

Each of you looks at the other two pieces from your own craft. Do they test the same bet? Does the prototype show what the fake door promises? Does the working agreement give the agents a job that would have produced today's made-up quote? Where one piece contradicts another, decide together which one changes.

<!-- maintainer -->

**Role in Day 2:** beat 8, protected. The creativity beat: each role makes a first piece of the chosen bet in its own craft, answering the room's private question of what each of us is for. Placed after the lecture *Each of you makes something*, whose slides set each role's frame (Houde and Hill's prototype questions, the test card, the working agreement). Its last slide (*Imagine it already failed*) carries into beat 9.

**Reuse:** new. New prompts: `apt101-d2-designer-prototype`, `apt101-d2-po-kill-test`, `apt101-d2-lead-way-of-working`, `apt101-d2-lead-sceptical-colleague`.

**Frameworks:** Jobs to be Done (the designer's brief, unnamed beyond "the job the customer hires this for"); prototype questions (Houde and Hill, 1997, in the lecture); test card (Osterwalder, named once in body); *Testing Business Ideas* experiment types (Bland and Osterwalder, in the lecture); working agreement and Marquet's push-authority-to-information (in the lecture).

**Artefacts:**
- Consumes: `team/chosen-bet.md` (choose the bet); the interview quotes carried in `team/chosen-bet.md`; `team/what-goes-in.md` (Day 1).
- Produces: `team/<designer>/prototype.html`; `team/<product-owner>/kill-test.md` plus `fake-door.html` or `survey.md`; `team/<team-lead>/way-of-working.md`. Read by imagine it failed, the Monday list, Day 3 slice, five users (the prototype and fake door) and take it to the team (the working agreement).

**Room:** three solo tracks in parallel, then the trio on the board. Phase 2's contradictions are a human call. Overrun: phase 2 is not cut; trim the rehearsal to three questions instead.

**Failure modes:** the designer asks for screens before choosing the question (the prompt asks first); the threshold is unfalsifiable; the working agreement reads as a decision handed down (the prompt frames it as a proposal; the rehearsal tests it).

**View summary:** Each of you builds a first piece of the chosen bet in your own craft: the designer a rough prototype from the interview quotes, the product owner the experiment that could kill the bet, the team lead a working agreement for the team, rehearsed against a sceptical colleague.
