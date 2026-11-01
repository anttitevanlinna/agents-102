# From Personal to Team

## Big Idea

You can't really share an agent. You can share the context, a skill, the output, or an interface, and choosing between them is a strategy decision.

## Prework

**Bring one example from your own organisation where people got access to a tool and did not use it.** A licence rollout, a portal, or a shared drive works.

## What You'll Learn

After this module, you will be able to:

- **Interview** for a teammate's job before choosing what to share
- **Pick** one of four sharing strategies against the outcome that job needs
- **Find** the absorption bottleneck and draft the technical plan and the people plan together
- **Test** the switch assumptions and name one person and one test to take out of the room

## Start here

What would you want a teammate to have: your `memory/` folder, one of your skills, the morning output, or a way to ask the agent a question in Slack? And why that one?

The agent writes the sharing plan into `module-7/`. `module-7/monday.md` holds the next move: one person, one question, one test.

[Exercise: Interview for the job and pick a candidate](exercises/share-your-work.md)

[Exercise: Design the sharing plan](exercises/design-the-sharing-plan.md)

[Exercise: Test the sharing plan](exercises/test-the-sharing-plan.md)

[Lecture: Access is not absorption](lectures/access-is-not-absorption.md)

## Debrief

Who gets your context, who gets a skill, who wants only the output, and who would use an @mention? It is rarely the same person across all four.

{{prompt:a101-m7-debrief-sharing-artifact}}

## Key Concepts

- Start with the teammate's job, not with what you built.
- The four sharing strategies are share the context, share a skill, share the output (push), and share an interface (pull).
- Pick the candidate against the outcome. Infrastructure is a constraint, not a reason.
- The absorption bottleneck is the obstacle that keeps several others hard.
- Write the technical plan and the people plan together.
- Test what would have to be true for the teammate to switch.
- Access is a switch someone flips. Absorption happens in other people's weeks.

## Bring to Module 8

**Bring `module-7/monday.md` and what the named person said.** Their answer is the evidence. The plan is still the hypothesis.

## Next

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@19381896 story@19381896 technical@725101ec behavior@725101ec pedagogy@19381896 strategy@19381896 slides@19381896)
- judges @19381896: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @12bf0d81: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,personal-to-team,agents-building-agents]

**Key Concepts minimal (2026-09-24, Antti-directed).** A glance list of handles, nothing born here: every law on it is earned in the lecture that follows the exercise, `access-is-not-absorption.md`.

**Mood target:** Generous impulse — the student starts from one teammate's job, not an abstract rollout obligation.

**Decision note 2026-09-23.** Executes `curriculum/module-design/a101-story-proposals/blend.md` § M7. § Interview for the job and § Pick the sharing shape are cut: both narrated the three exercises before the student ran them (`check_student_facing.md` §33 and §26), and the exercise `share-your-work.md` carries the four sharing strategies verbatim per §34 together with the vendor-pitch close. The Key Concepts *Sharing shapes* bullet is trimmed to its design-language clause so the vendor-pitch mechanism lands once, in the new closing lecture `access-is-not-absorption.md`, which is linked after the three exercises and before Debrief. That lecture also carries the absorption beat and the *access is not absorption* line. The point-of-view scar slot is unfilled: its fallback home is recorded in the lecture's maintainer block, nothing ships in either body.

**Push-back moves / Watch-fors / Decision points:** [M7 run sheet](trainer-modules.md#m7-glance) owns the live cues, recovery paths, protected beats, and cut order.

**Meta (trainer):**
- **Transitions:** framing 6 @start "Framing: start here, the one person who came to mind" · debrief 5 @end "Debrief" · bridge 3 @end "Bridge"
- **Where these numbers come from:** framing from this block's own **Framing time:** line, taken at its ceiling; debrief from the body ("Five minutes."). The closing lecture prices itself in `access-is-not-absorption.md`. Every other beat here has no file of its own, so nothing else prices it.
- **Primary Bloom's level:** Analyze → Evaluate
- **Framing time:** 4–6 minutes. § Start here runs straight into the first exercise; the job-to-be-done reframe and the four shapes are the exercise's own opening, and the law they demonstrate lands in the closing lecture. Whether the minutes this frees stay with the lecture or go back to the exercises is Antti's call in the room.
- **Materials (trainer):** Pattern catalog ships in the Agents 101 starter at `patterns/personal-to-team-patterns.md` — student's Builder Claude reads it directly from the training directory. Branch-selection framing ready. The student's one access-without-use example is the complete prework load; there is no three-walls or strategy reading packet. **No pre-shipped strategy skills** (M4 is the canonical personal-skill authoring module). The exercise's crux, assumption-test, and pre-mortem moves remain facilitator background, not required student reading.
- **Plug points:** Participant's organization (who would own this?); buyer infrastructure reality (cloud agent platform vs. personal Claudes only).

**Artefact contracts**
| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Module 7 sharing package | `module-7/jtbd.md`, `module-7/branch.md`, `module-7/absorption-bottleneck.md`, `module-7/technical-plan.md`, `module-7/people-plan.md`, `module-7/assumptions.md`, `module-7/failure-stories.md` | M7 three sharing exercises | M7 Debrief; M8 prework and sponsor-question grounding |
| Module 7 sharing artifact | chosen file under `module-7/` | M7 Debrief rewrite | M8 run-next-step prework and post-training adoption test |
| Module 7 next-step file | `module-7/monday.md` | M7 test-the-sharing-plan closing prompt | M8 prework and `joint-double-diamond-3` stance ground |

**Plug Points (trainer):**

> PLUG POINT: Branch selection — does your company have cloud agent infrastructure (N8N / Cowork / Power Automate / Make / an internal runtime), or only personal Claudes?
> Default: students pick live, based on what they can actually deploy to this week — not what procurement might approve in Q3. Branch B (personal Claudes only) is the plain path for most Nordic buyers on day one. It's not a consolation prize.

> PLUG POINT: Ownership model — who in your organization would own this?
> Default: if you can't name a person, write UNASSIGNED. That's Monday's question for your manager. Missing names are findings, not failures.
