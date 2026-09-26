# From Personal to Team

## Big Idea
You can't really share an agent. You can share context, a skill, the output, or an interface. The hard part is not access; it is absorption.

## Prework

No new reading packet. Walk in with one example where people had access to a tool or process but real use did not follow.

## What You'll Learn
After this module, you will be able to:
- **Interview** for your teammate's job-to-be-done using the agentic Jobs-to-be-Done pattern (Clayton Christensen and collaborators), and write the outcome statement as the design contract
- **Select** the smallest shareable form (share context / share a skill / share the output / share an interface) for the outcome the teammate wants moved
- **Redesign** for shared use: technical plan + people plan (ownership, governance, operating, accountability, propagation)
- **Test** the switch the teammate would make and surface the assumptions they'd need to absorb
- **Name** the likely adoption failure before it happens, including the social failure that's hardest to see

## Start here

Start a fresh <span class="rt-code">Claude Code session</span><span class="rt-cowork">Cowork task</span> at `~/Documents/agents-101/`.

You start with the agent system you built across Modules 2-6. By the end, `module-7/` holds the sharing plan and `module-7/monday.md` holds the next move.

The stack on disk: a memory, synthesis across three source zones, skills that audit the system, a fixed judge, and a generation tactic that got sharper under it. Somewhere in it is a thing that produces output worth checking before a meeting.

The question that shows up on its own: *could this help someone else?*

Hold that feeling. It's not a governance question yet. It's a generous one. At Module 7 it becomes a plan, plainly and against real friction.

Two questions to warm up: who's the one person who came to mind just now? And what makes you hesitate about actually handing this to them?

[Exercise: Interview for the job and pick a candidate](exercises/share-your-work.md)

[Exercise: Design the sharing plan](exercises/design-the-sharing-plan.md)

[Exercise: Test the sharing plan](exercises/test-the-sharing-plan.md)

[Lecture: Access is not absorption](lectures/access-is-not-absorption.md)

## Debrief

Five minutes. Claude reviews the sharing deliverable and sharpens whichever sharing-artifact file you produced (a skill file, an interface description, an output schedule, a context export). The evidence is what's in your Module 7 folder: your JTBD outcome statement, the patterns you picked, the technical plan, the people plan, assumptions, and failure stories. Claude reviews, rewrites the sharing artifact in place, reports what changed. You push back on anything that's off.

{{prompt:a101-m7-debrief-sharing-artifact}}

> **Watch for slowness.** When you push back on the rewrite, Claude should Edit the section you flagged, not rewrite the whole file. The prompt above tells it to. If Claude reaches for Write on the whole artifact anyway, push back: *"Edit just the section I named."*

Notice what this prompt insists on: name the path, overwrite in place, quote the before-and-after for every claim. When you're sharpening something for another person to use, "what got sharpened" without the actual lines is a draft pretending to be a finished thing. The before-and-after quote is how you know the sharpening reached the file, not just the summary.

## Push back on the summary

Push back where Claude's summary is wrong. *"The teammate's job wasn't vague, you just didn't see it"* / *"you pulled too much out of the skill, put the edge cases back."* The artifact: the sharpened sharing file itself, plus one line in your Module 7 next-step file naming the first move. Save the conversation. It's the bridge to when work resumes.

## Key Concepts
- The job comes first, the candidate second; the outcome sentence is the contract.
- Access is easy; absorption is scarce.
- Four ways to share: the context, a skill, the output (push), an interface (pull). Never the whole agent.
- What would have to be true for them to switch?

## Bring to Module 8

**Run `module-7/monday.md`.** Test one assumption. Ask for one name. Talk to one person. Module 8 works from what happened when the sharing plan touched the real organisation, so it needs a plan that has touched one.

Come to Module 8 without one tested assumption or named person and you'll be reconstructing the contact while the opening exercise is already using the evidence. Your call.

Once the evidence is written down, end this module's <span class="rt-code">session</span><span class="rt-cowork">task</span>; Module 8 starts fresh at `~/Documents/agents-101/`.

## Next

The sharing plan leaves the room and meets the organisation. What comes back from that contact is Module 8's raw material.

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
