# Theory times *people-knowledge*

The notes you just wrote are half of a diagnosis. The other half is a set of lenses: ways of looking at people and teams that others have tested before you. Neither half works alone.

## Lenses others have tested

Three lenses run through this training.

- **ADKAR** looks at one person at a time. Change sticks when a person moves through Awareness, Desire, Knowledge, Ability and Reinforcement, in that order. Someone stuck at Desire needs something different from someone stuck at Ability, and more training does nothing for the first.
- **The adoption curve** looks at the team. Some people try a new practice early, most wait until they see it work for someone like them, and a few hold out. What you push should match where most of your team actually is.
- **Kotter** looks at how movement spreads through an organisation: urgency, a coalition, a direction, early wins. Use it to read what is happening, not as a script to follow.

These are lenses, not a plan. They help you notice things. They cannot tell you what this team will do.

## You bring your people

Who trusts whom. Who teaches quietly without being asked. Who came out of the last reorg believing that anything announced from above will be gone in six months. Who is the best engineer on the team and the most sceptical about agents, and why both are true.

No framework carries that, and no research does either. You wrote some of it down a few minutes ago.

## Agents multiply both

Theory without your people gives you generic advice: *"address resistance, find champions."* Your people without theory leaves you where you are now, with good instincts and no way to test them.

Put the two together and an agent can do real work with them: place each person, notice where your notes contradict each other, point at who you know least about. It multiplies what you bring. It replaces neither half. Where your notes are thin, the agent's work is thin, however good the framework.

## Where the team sits on the curve

For engineering teams working with agents, the adoption curve has four recognisable steps:

1. **Chatting.** People ask an assistant questions and paste the answers.
2. **Custom assistants.** People set up assistants with their own instructions and reuse them.
3. **Agentic workflows.** People hand an agent a real task and let it work across files and tools.
4. **Compounding engineering.** People build the tools, skills and agents that make everyone else faster.

Ramp's product lead, Geoff Charles, described almost exactly this ladder when he wrote up how the company moved its whole staff onto AI, from people who sometimes used a chat assistant up to systems builders who level up everyone else. Ramp is a fast-moving US fintech, and its tone about people on the bottom rung would not travel well to most Nordic companies. The ladder itself does.

Most teams are spread across all four steps. That spread is what you are about to put on the page.

<!-- maintainer -->

**Quality:** compendium-audited 2026-09-30 (story@518a2710 technical@518a2710 pedagogy@518a2710 strategy@518a2710 slides@518a2710)
- judges @518a2710: writing REVISE (1/3 see instances/engineering-management--lecture--theory-times-people-knowledge.writing.json), story PASS, technical PASS, behavior REVISE (0/0 see instances/engineering-management--lecture--theory-times-people-knowledge.behavior.json), pedagogy PASS, strategy PASS, slides PASS

## Design (EM proving run 2026-09-30)

- **Placement:** after `write-your-team-notes`, before `install-your-leadership-memory`. Names the frameworks the install prompt uses, so the placements Claude writes are legible on first read. Short (`check_lectures.md` §2).
- **Claim:** theory × people-knowledge = actionable insight; agents amplify the multiplication and substitute for neither (strategy § The correlation at the heart of the training). Belief served: *my knowledge of my people is my irreducible edge; agents amplify it, they don't substitute for it.*
- **Frameworks as lenses, not path** (strategy § Likely frameworks; settled preference "frameworks support inquiry"). Kotter is named in one line and not taught as eight steps.
- **Ladder step names** follow the spine (chatting → custom assistants → agentic workflows → compounding engineering) and the strategy's Chasm mapping. Ramp's L0–L3 is cited as the practitioner operationalisation, paraphrased; the body does not claim the step names are Ramp's.
- **Practitioner slot:** Ramp / Charles takes M1's one student-side attribution (`check_writing.md` §11). Fin (Intercom)'s per-person tiering stays in the maintainer block of the install exercise.
- **Transfer caveat** stated once, plainly (`case-library.md` § Ramp, transfer caveats; strategy § Two things the research candidly doesn't know).
- **No prompt.** Nothing here needs the student's machine.
- **No cross-module sequencing in body** (`check_lectures.md` §3).

## Source verification

- geoffintech-charles `[checked:2026-05-25 result:OK due:2026-10-08]` https://x.com/geoffintech/status/2042002590758572377 — [practitioner direct] Geoff Charles (Ramp CPO), *"How to get your company AI pilled"*, 2026-04-08; the L0–L3 proficiency ladder (L0 sometimes uses ChatGPT → L3 systems builders who level up everyone else). Stamp and due inherited from `curriculum/exercises/read-your-stack.md` / `observations/ramp.md`. fallback: drop the attribution, keep the four steps as our own synthesis.
- ramp-transfer-caveat `[checked:2026-09-30 result:OK due:none]` `continuous-research/observations/ramp.md` § transfer caveats — [practitioner direct] *"If you're L0 you will most likely not be at the company"*; velocity-culture caveat. fallback: cut the caveat sentence.
- adkar `[checked:2026-09-30 result:OK due:none]` theory-construct:ADKAR — [cultural-vocab] Jeff Hiatt / Prosci, ADKAR model; cited by name. fallback: none needed.
- adoption-curve `[checked:2026-09-30 result:OK due:none]` theory-construct:adoption-curve — [cultural-vocab] Rogers' diffusion curve as extended by Geoffrey Moore, *Crossing the Chasm*. fallback: none needed.
- kotter `[checked:2026-09-30 result:OK due:none]` theory-construct:Kotter — [cultural-vocab] John Kotter, *Leading Change*. fallback: none needed.

## Meta

- **Time:** 8 min.
