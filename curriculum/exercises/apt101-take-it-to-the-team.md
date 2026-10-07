# Exercise: Take it to the *team*

**Time:** 55 minutes.

**What you do:**

The three of you have worked out a way of working with agents on one bet. Your wider team was not in the room. They will decide whether agents join their work, and they already have a way of doing it.

So you start from their job, not from what you built. This is the Jobs-to-be-Done frame: your team does not want your agents, they want a job done. The way of working the team lead drafted on Day 2 is one candidate for that job. It competes with whatever the team uses today.

**The team lead drives** this whole exercise at their screen. The other two answer with you and read what comes back. Where Claude says *teammate*, read *your wider team*. Where it says *candidate*, read *the way of working*.

## Phase 1: Sketch the way of working

*5 min*

Post-its first, on the *Way of working* frame of your team's Miro board. Three columns: what the agents do, what stays with people, where the old way still wins. The team lead starts from the draft made on Day 2; the designer and the product owner add what the five users showed you. One post-it per thing, no discussion yet.

## Phase 2: Interview for the job

*13 min*

Ask Claude to draft the job your wider team is trying to get done, then question you about it. Answer each question together. The designer takes the questions about the job in the team's own words; the product owner takes the questions about the outcome.

Claude reads your memory and the folders from the earlier days, then compares sharing shapes from a patterns file. The four shapes are:

1. **Share the context.** Your `memory/`, `sources/`, `CLAUDE.md`, and `style.md` travel. Teammates build on top.
2. **Share a skill.** Extract one scoped capability. Teammates plug it in.
3. **Share the output (push).** Schedule the agent. Output lands where the team looks.
4. **Share an interface (pull).** Wrap the agent. Teammates invoke it through a bot, mention, form, or endpoint.

When Claude asks you to pick, pick the shapes that carry the way of working on the board.

<div class="rt-code">

{{prompt:share-your-work-1}}

</div>
<div class="rt-cowork">

{{prompt:share-your-work-2}}

</div>

This is a heavy read. If Claude ranges too wide, interrupt with *"tell me what you've found so far, narrow to the files that bear on this team, then continue."*

Read `module-7/jtbd.md`. Does it name your team, how they do the job today, and an outcome you could observe? If it could describe any team in the company, point at the generic line and ask Claude to try that part again.

## Phase 3: Find the bottleneck, draft both plans

*15 min*

Ask Claude to find the one obstacle between your team and the way of working.

{{prompt:share-your-work-3}}

Then ask Claude to draft the technical plan and the people plan together.

{{prompt:share-your-work-4}}

While Claude drafts, split the reading:

- **The product owner** reads `module-7/technical-plan.md`: does it name the outcome it moves and the first real test the team would run?
- **The designer** reads `module-7/people-plan.md`: who reads what the agents produce, who corrects them, who teaches the next person?

A polished technical plan beside a people plan full of `UNASSIGNED` is a finding. Leave the gaps visible. They are Monday's questions.

## Phase 4: Test the switch, imagine it failed

*15 min*

Ask Claude to list what would have to be true for your team to switch.

{{prompt:share-your-work-5}}

When Claude asks which assumptions you will test, the three of you choose. The product owner says which one would sink the proposal if it is false.

Then ask Claude to imagine it is six months later and the team went back to the old way.

{{prompt:share-your-work-6}}

Push back on the social failure story if it blames the team for being slow. The old way stayed because it did the job well enough. The story should say what it did that yours did not.

## Phase 5: Put Monday on the board and in the team folder

*7 min*

`module-7/monday.md` sits on the team lead's laptop. The other two need it too, with their own first move in it.

**Prompt** · `apt101-d3-team-monday`, read `module-7/monday.md`, `module-7/people-plan.md`, the *Way of working* frame on our Miro board, `team/five-users.md` and `team/chosen-bet.md`; ask each of us in turn for our first Monday move (product owner: the next slice and its signal; designer: the next five users; team lead: the conversation with the team); write `team/monday.md` with the proposal in five lines, the three moves verbatim with names, and the question the team decides; then post the proposal back to the frame beside our post-its, with a name on every part

Then the board again. Stand at the frame and read it as your wider team will see it on Monday. A part with no name gets one now, or stays visibly empty. It is a proposal. The team that lives with it decides.

<!-- maintainer -->

**Role in Day 3:** Transfer: the trio's way of working becomes a proposal the wider team decides on, with a named first move per role in `team/monday.md`.

**Reuse:** `share-your-work` keys `share-your-work-1` / `share-your-work-2` (rt-code / rt-cowork pair), `-3`, `-4` (from `design-the-sharing-plan`), `-5`, `-6` (from `test-the-sharing-plan`), unchanged. Framing in prose: teammate = the wider team; candidate = the way of working. Agents 101 runs these over 70 min across three exercises; here 55 min in one, by putting one driver on all of them. New: `apt101-d3-team-monday`.

**Frameworks:**
- Jobs to be Done (Christensen and collaborators): the frame is named once in the body, the authors only here.
- Absorption bottleneck, technical plan plus people plan (Agents 101 M7).
- "What would have to be true" (Roger Martin), left unnamed: the lecture *From the three of you to your team* asks the question after.
- Pre-mortem failure stories (`share-your-work-6`); Klein is named on Day 2's *imagine it failed*, not again here.
- Four sharing strategies verbatim (`check_student_facing.md` §34).

**Artefacts:**
- Produces: *Way of working* frame (board), `module-7/jtbd.md`, `branch.md`, `absorption-bottleneck.md`, `technical-plan.md`, `people-plan.md`, `assumptions.md`, `failure-stories.md`, `monday.md` (team lead's laptop), `team/monday.md`.
- Consumes: `memory/`, `sources/`, `module-3/`, `module-5/`, `module-6/` (read by `share-your-work-1`), the team lead's Day 2 way-of-working piece in `team/<team lead>/`, `team/five-users.md`, `team/chosen-bet.md`.

**Board:** *Way of working* frame, three columns, set up by the trainer. Rhythm: post-its (phase 1), Claude interviews and plans from files (phases 2–4), the proposal posted back to the frame and read standing (phase 5). Claude reaches the board through the Miro connector; without it, a frame screenshot into the chat and the team lead posts the proposal by hand. `share-your-work-1..6` never read the board; the post-its reach them only through the trio's answers.

**Open:**
- `share-your-work-1/2` read `patterns/personal-to-team-patterns.md`, which ships in the Agents 101 starter. APT101 has no starter yet; the file must ship in it or the candidate step has nothing to compare against.
- `share-your-work-1/2` do not read `team/`; the way-of-working draft reaches Claude only through the body's instruction to pick against it. The prompt-body pass decides whether an APT101 variant earns a key.
- `share-your-work-1` needs the ask-questions tool (Claude Code); `-2` is the Cowork twin.

**View summary:** The three of you interview for the job your wider team is trying to get done, find what would stop them taking up your way of working, and imagine it failing six months on. The artefact is `team/monday.md`: a proposal the team decides, with each role's first move.
