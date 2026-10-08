# Exercise: Take it to the *team*

**Time:** 55 minutes.

**What you do:**

The three of you have worked out a way of working with agents on one bet. Your wider team was not in the room. They will decide whether agents join their work, and they already have a way of doing it.

So you start from their job, not from what you built. This is the Jobs-to-be-Done frame: your team does not want your agents, they want a job done. The way of working the team lead drafted on Day 2 competes with whatever the team uses today.

**The team lead drives** this exercise at their screen, all but Phase 2. The other two answer with you and read what comes back.

## Phase 1: Sketch the way of working

*5 min*

Open `team/five-users.md` at the call you made. The product owner writes two post-its at the head of the *Way of working* frame on your team's Miro board: persevere, pivot or stop, and the one sentence you now believe, held or changed. Everything else in the frame answers to those two.

Then three columns: what the agents do, what stays with people, where the old way still wins. The team lead starts from the draft made on Day 2; the designer and the product owner add what the five users showed you. One post-it per thing, no discussion yet.

## Phase 2: Hand over one file

*7 min*

The trainer pairs your trio with another. **The designer** sends one file across, and only that file: their agent's instructions from `agents/`. The other trio's designer does the same.

Before running it, each designer reads the file they received and writes one sentence on a post-it: what you expect it to return. The run never sees the post-it.

Then run the file as written, in your own folder.

{{prompt:apt101-d3-run-their-file}}

The three of you read what came back beside the post-it. The designer points at the line in the output that went generic and says what their own memory would have said there. Then name one thing the file needed that stayed on its sender's laptop, and tell its sender.

## Phase 3: Interview for the job

*10 min*

Ask Claude to draft the job your wider team is trying to get done, then question you about it. Answer each question together. The designer takes the questions about the job in the team's own words; the product owner takes the questions about the outcome.

Claude reads the call and the sentence at the head of the frame, the bet and the Day 2 draft, then asks you which way the work would travel. The four shapes are:

1. **Share the context.** Your `memory/`, `sources/`, `CLAUDE.md`, and `style.md` travel. Teammates build on top.
2. **Share a skill.** Extract one scoped capability. Teammates plug it in.
3. **Share the output (push).** Schedule the agent. Output lands where the team looks.
4. **Share an interface (pull).** Wrap the agent. Teammates invoke it through a bot, mention, form, or endpoint.

When Claude asks you to pick, pick the shapes that carry the way of working on the board.

{{prompt:apt101-d3-the-job-your-team-hires}}

Read `module-7/jtbd.md`. Does it name your team, how they do the job today, and an outcome you could observe? If it could describe any team in the company, point at the generic line and ask Claude to try that part again.

## Phase 4: Find the bottleneck, draft both plans

*11 min*

Ask Claude to find the one obstacle between your wider team and the way of working, then draft the technical plan and the people plan together.

{{prompt:apt101-d3-bottleneck-and-plans}}

While Claude drafts, split the reading:

- **The product owner** reads `module-7/technical-plan.md`: does it name the outcome it moves and the first real test the team would run?
- **The designer** reads `module-7/people-plan.md`: who reads what the agents produce, who corrects them, who teaches the next person?

A polished technical plan beside a people plan full of `UNASSIGNED` is a finding. Leave the gaps visible. They are Monday's questions.

## Phase 5: Test the switch

*15 min*

Ask Claude what would have to be true for your wider team to switch, and how the switch would fail.

{{prompt:apt101-d3-test-the-switch}}

When Claude asks which assumptions you will test, the three of you choose. The product owner says which one would sink the proposal if it is false.

Push back on the failure story if it blames the team for being slow. The old way stayed because it did the job well enough.

## Phase 6: Put Monday on the board and in the team folder

*7 min*

The plans sit on the team lead's laptop in `module-7/`. The other two need them too, with their own first move in them.

The team lead opens `team/what-goes-in.md` first. On Day 1 it was the three of you deciding what your agents could read. On Monday it is the first thing your wider team decides for itself.

{{prompt:apt101-d3-team-monday}}

Then the board again. Stand at the frame and read it as your wider team will see it on Monday. A part with no name gets one now, or stays visibly empty. It is a proposal. The team that lives with it decides.

<!-- maintainer -->

**Quality:** compendium-audited 2026-10-08 (writing@843767c4 technical@843767c4 behavior@3d7fd713 pedagogy@761a20a3 strategy@1fd93c06 slides@843767c4)
- judges @843767c4: writing PASS (4 findings see instances/agentic-product-teams-101--exercise--apt101-take-it-to-the-team.writing.json), technical PASS (2 findings see instances/agentic-product-teams-101--exercise--apt101-take-it-to-the-team.technical.json), behavior PASS, pedagogy PASS (verify-refuted), strategy PASS, slides PASS

**Role in Day 3:** Transfer: the trio's way of working becomes a proposal the wider team decides on, with a named first move per role in `team/monday.md`.

**Reuse:** the beat order of Agents 101's `share-your-work` (job, bottleneck, two plans, what would have to be true, failure story), rewritten as named APT101 prompts for a trio proposing to its wider team: the Agents 101 keys speak of one teammate and one candidate, and the five users' call has to reach the job interview. Same `module-7/` paths, so § Sharpen the proposal finds the files. Agents 101 runs these over 70 min across three exercises; here 55 min in one, by putting one driver on all of them. Phase 2 (hand over one file) is new: the lecture after names "an agent's instructions are not the agent", so the room runs a stranger's instruction file before the slide says it (recognition before naming, `curriculum/story-craft.md`); the body does not name the result: the designer writes what they expect before the run, then names the line that went generic, what their own memory would have said there, and one thing that stayed on the sender's laptop. 7 min. One failure story, not several: Day 2 ran *imagine it failed*. New: `apt101-d3-run-their-file`, `apt101-d3-the-job-your-team-hires`, `apt101-d3-bottleneck-and-plans`, `apt101-d3-test-the-switch`, `apt101-d3-team-monday`.

**Frameworks:**
- Jobs to be Done (Christensen and collaborators): the frame is named once in the body, the authors only here.
- Absorption bottleneck, technical plan plus people plan (Agents 101 M7).
- "What would have to be true" (Roger Martin), left unnamed: the lecture *From the three of you to your team* asks the question after.
- One failure story (`apt101-d3-test-the-switch`); Klein is named on Day 2's *imagine it failed*, not again here.
- Four sharing strategies verbatim (`check_student_facing.md` §34).

**Artefacts:**
- Produces: *Way of working* frame (board, the call and the sentence at its head), `module-7/jtbd.md`, `branch.md`, `absorption-bottleneck.md`, `technical-plan.md`, `people-plan.md`, `assumptions.md`, `failure-stories.md` (team lead's laptop), `team/monday.md`.
- Consumes: `team/five-users.md` (the call and the sentence, phase 1 and `apt101-d3-the-job-your-team-hires`), `team/chosen-bet.md`, the team lead's Day 2 `team/<team lead>/way-of-working.md`, the designer's `agents/<job>.md` (Day 1 *Send it off*, phase 2, sent to another trio), `team/what-goes-in.md` (Day 1 door, phase 6: the first line of `team/monday.md`, now the wider team's to decide).

**Board:** *Way of working* frame, three columns, set up by the trainer. Rhythm: the call and the sentence at the head, then post-its (phase 1), Claude interviews and plans from the frame and files (phases 3–5), the proposal posted back to the frame and read standing (phase 6).

**Room:** phase 2 needs trios paired before the day; the two designers swap files at the same moment. The sender's file reaches the other trio by chat or the team folder, never with its `memory/`. Claude reaches the board through the Miro connector; without it, a frame screenshot into the chat and the team lead posts the proposal by hand.

**Open:**
- § Sharpen the proposal reuses `a101-m7-debrief-sharing-artifact`, whose registry `requires:` names `share-your-work-6`; with the named prompts here the chain resolves only once their bodies land with `produces:` for the same `module-7/` ids. The prompt-body pass settles it.

**Failure modes:** phase 1, the call written as a hope (ask for persevere, pivot or stop and the sentence held or changed); phase 2, the receiving trio fixes the file before running it (run it as written; the generic line is the finding); phase 3, the job written in the trio's words (ask how the wider team would say it); phase 4, every obstacle technical (ask who would stop using it and why); phase 5, assumptions with no test this week (ask for one); phase 6, a part with no name (it stays visibly empty). A participant who arrives without the Day 1 and Day 2 files works from the team folder's copies.

**Leap test:** on Monday the trio (1) opens with the door as the wider team's first decision; (2) brings a proposal with a name or an open slot on every part; (3) can say which line of their agent file went generic in another trio's hands.

**View summary:** The three of you interview for the job your wider team is trying to get done, find what would stop them taking up your way of working, and imagine it failing six months on. The artefact is `team/monday.md`: a proposal the team decides, with each role's first move.
