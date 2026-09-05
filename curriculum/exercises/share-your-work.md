# Exercise: Interview for the job and pick a candidate

**Time:** 25 minutes.

**Session** *(new, "Module 7 - Personal to team")*

Start a new session or task at your training-directory root.

Name it `m7-personal-to-team` if your runtime supports session names.

Your memory has been working for you for days now. It catches things you'd have missed, keeps a tone you taught it, and produces something you check before meetings. The question arrives on its own: *could this help someone else?*

Hold the impulse. Then start with the teammate's work.

You are not going to ask *"what should I share with my teammate?"* That question is builder-centered and skips the one thing that decides whether sharing works: **the job** your teammate is trying to get done. This is the Jobs-to-be-Done frame from Clayton Christensen and collaborators. Your teammate doesn't want your agent. They want a job done. Your agent, your skill, your output, your interface: any of those is a candidate for hire. Does it do the job better than what they currently use?

The starting question is theirs, not yours: *what job is my teammate trying to get done, and which sharing shape does it?*

## Interview for the job

This is a heavy read across the working set, and a shallow confident finish is as risky as over-reading. If the agent ranges too wide, interrupt with *"tell me what you've found so far, narrow to the files that bear on this teammate, then continue."* If it declares the job after a thin pass, say *"there's more here. Keep reading before you settle the hypothesis."*

<div class="rt-code">

{{prompt:share-your-work-1}}

</div>
<div class="rt-cowork">

{{prompt:share-your-work-2}}

</div>

Read `module-7/jtbd.md`. The test is specificity: does it name one teammate, their current way of doing the job, and an outcome you could observe? If it could describe anyone in the room, point to the generic line and ask the agent to try that part again.

## Pick against the outcome

The agent then compares candidates from `patterns/personal-to-team-patterns.md` against that outcome and writes your choice to `module-7/branch.md`.

The four sharing strategies are:

1. **Share the context.** Your `memory/`, `sources/`, root instructions, and `style.md` travel. Teammates build on top.
2. **Share a skill.** Extract one scoped capability. Teammates plug it in.
3. **Share the output (push).** Schedule the agent. Output lands where the team looks.
4. **Share an interface (pull).** Wrap the agent. Teammates invoke it through a bot, mention, form, or endpoint.

*"Share the whole agent"* is a vendor pitch and is NOT on the list.

Read `module-7/branch.md`. Every picked candidate should name how it moves the teammate's outcome; infrastructure should appear only as a constraint. If the reason is merely *"we already have the platform,"* send it back.

## Carry the two files forward

You now have the teammate's job and a candidate selected against it. [Design the sharing plan](design-the-sharing-plan.md) finds what would stop that candidate from being absorbed and turns it into a technical plan plus a people plan.

<!-- maintainer -->

**Atomic — no phase markers.** The interview produces the outcome test used immediately to select the candidate.

**Leap test — next working day:**

- Opens `module-7/jtbd.md` and can name the teammate, incumbent, and observable outcome without reconstructing the interview.
- Rejects a sharing candidate whose only advantage is infrastructure fit and records the mechanism in `module-7/branch.md`.
- Uses the narrow/continue recovery on a heavy memory read instead of restarting or accepting a shallow finish.

**Failure modes and escape hatches:**

- **Interview:** the hypothesis could describe anyone. Point to one generic claim and have the agent anchor it to a specific memory line or replace it.
- **Candidate selection:** the student picks what the company already runs. Ask which outcome the candidate moves; if there is no concrete mechanism, send the choice back.

**Capability gate:** the Claude Code branch requires the ask-questions tool. Confirm it before delivery. If it is unavailable, resolve the environment or run the Cowork branch; do not replace the bounded interview with freeform chat.

**Why this is one bounded exercise:** interview and candidate selection are one decision. The first file supplies the outcome test the second file applies; there is no useful pause or independent deliverable between them.

**Framework attributions:** Clayton Christensen and collaborators — Jobs-to-be-Done; Bob Moesta — switch interviews; Anthony Ulwick — outcome statements. The module body repeats the sharing taxonomy because it must frame the full module; this reusable exercise repeats it because it must also run independently.

**Quality:** compendium-audited 2026-08-25 (writing@a4be944f story@a4be944f technical@a4be944f behavior@a4be944f pedagogy@a4be944f strategy@a4be944f slides@a4be944f)
- judges @a4be944f: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
