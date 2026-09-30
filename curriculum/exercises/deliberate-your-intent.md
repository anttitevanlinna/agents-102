# Exercise: Write your *intent*

**Time:** 25 minutes.

**What you do:** set three agents arguing for three shapes of your team, then decide.

**What you build:** `intent.md`, one paragraph your coalition can read and push back on.

**The point:** an intent you can revise beats a vision you have to defend.

## Phase 1: Let three shapes argue

*12 min*

Your two crux sit in Team Knowledge as hypotheses tagged `crux`. Each shape your team could take has to earn its place by moving them: keep the hierarchy you have, flatten it, or a hybrid of the two.

Read your memory and start three subagents, each arguing one shape at its strongest.

{{prompt:em-deliberate-intent}}

Subagents keep the three arguments apart: each one argues without hearing the others, so none of them drifts toward the middle to be agreeable. The fourth reads all three with fresh eyes.

The flattening argument will talk about your own role. Let it. You get to question the shape of your job as seriously as the shape of the team.

**If every argument lands on the hybrid,** the agents are being polite. Tell the agent which argument went soft and ask for its strongest case again.

## Phase 2: Pick a shape and write the paragraph

*13 min*

Tell the agent which shape you are taking, or which mix, and why, in your own words. There is no correct pick. Half of these bets miss, and the ones you run with conviction teach you the most.

Write `intent.md` from the shape you just chose.

{{prompt:em-write-intent}}

Push back if the paragraph reads like a poster. A good intent names a crux, a direction, and something about the team's week that someone could check. If it could hang in any company's hallway, it is not yours yet.

<!-- maintainer -->

- **Prompts:** `em-deliberate-intent` (argue + synthesis, no file writes) → manager names the pick in chat → `em-write-intent` (writes `intent.md` + Decision Journal entry). Split per prompts §35 (iteration apart from persistence) and so the pick is the manager's typed move, not a menu the agent resolves.
- **Reads:** `crux`-tagged hypotheses in Team Knowledge (from `em-find-two-crux`, decision 3 of the Pass 3 decisions), coalition tier (`em-schedule-coalition-checkin`), Decision Journal first-move entry (`em-shortlist-and-first-move`).
- **Postures** come from `lectures/intent-not-vision.md` slide 2. Bound: an argument that moves no crux is out of bounds (fence). Fourth subagent proposes only; the manager decides (pedagogy §10).
- **Coalition ownership** (strategy M4 row: coalition-owned): v1 is the manager's draft; `## Put it in someone's hands` in the module is where a coalition member first reads and edits it (Pass 3 decision 7). *What you build* says so.
- **Failure modes:** hybrid-by-default (niceness tax, prompts §14) → body callout + the fence's "at its strongest"; vision-poster paragraph → Phase 2 push-back line; manager freezes on the pick → trainer names the conviction-over-correctness line in the body and moves on.
- **Trainer:** Phase 1 is where the room goes quiet on the flattening argument. Do not rescue it; ask one person what surprised them.
- **Leap test (Monday):**
  - opens `intent.md` before a planning conversation and checks the proposed work against the crux it names
  - says the intent to one coalition member in their own words, without slides, and notes what they pushed back on
  - journals a revision to `intent.md` the first time a set-aside shape's objection turns out right, instead of defending the paragraph
