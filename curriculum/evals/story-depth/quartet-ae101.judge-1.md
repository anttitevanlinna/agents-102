# Storytelling judge — Agentic Engineering 101 — quartet — judge 1

## Running notes (per module, one line each: frame / narrative / narrator / positions)

- **prework.md** — frame: context you load is what scales (repo pick, skills, bug). narrative: setup only, no turn yet. narrator: none, impersonal instructional. positions: none yet, just logistics.
- **getting-going.md (M1)** — frame: "the agent's self-report is a hypothesis, not ground truth," context = what you load. narrative: bug fix as trust-under-test; loop = orient→fix→close→compound. narrator: impersonal "you," but `the-machine-you-just-met.md` names sycophancy plainly. positions: "assume about 10% of what it says or does is made up" — stance on trusting agent self-report, defended by the failing-test mechanism.
- **plan-mode-done-right.md (M2)** — frame continues: "a rule that doesn't load doesn't exist, and where you put it decides when it fires." narrative: plan mode as a check before implementation, "reach without calibration... you are checking less." narrator: still impersonal. positions: "structure is persuasive," push back twice against plausible plans — position against approval-inflation, defended by the five-criteria mechanism.
- **earn-the-trust.md (M3)** — frame: curated skills = borrowed context/judgment vs. authored skill = your own codebase's context; "only each skill's name and description sit in context until you invoke one." narrative: two-window split (security main quest, quality side quest), STRIDE + test-strategy authored live. narrator: still impersonal but strong stance voice ("Don't make general what you don't practice yourself"). positions: "Agents don't unilaterally change shared team infrastructure. You do" — defended by the personal-first-then-PR mechanism; ADRs deliberately don't auto-load — frame's first stated break (not everything gets loaded).
- **run-the-first-experiment.md (M4)** — frame: gap-audit against what you've built (rules/memory/skills = your context), sent un-packaged on purpose. narrative turn setup: "The task went out un-packaged: no plan file, no verifier, no reference artefact. Nothing but what you already had" — deliberately courting failure as the experiment's control condition. narrator: impersonal. positions: "Cancel is legitimate; traces are data" — stance against sunk-cost babysitting.
- **learn-from-the-test.md (M5)** — frame: packaging (reference/plan.md/verifier) *is* durable context engineered against three named failure modes. narrative: diagnose-then-repackage-then-resend, the A/B against the same task. narrator: still impersonal, quoting Dex Horthy for a scar ("the longer your file gets, the more Claude seems to treat individual sections as optional"). positions: "the gate is a claim too" — self-doubt about your own checks, defended by hold-outs/integrity checks/repeat sampling.
- **spot-gaps-build-the-loop.md (M6)** — frame breaks open fully: rules decay, context needs pruning not just loading ("cut one stale rule the diagnosis killed"), skills as composed workflow. narrative turn lands here: `story-of-module-6.md` — the trainer's own AI-authored module drifted, leaked a banned word four separate times, shipped a fabricated quote, and a sim caught what four LLM passes missed. narrator: first-person, signed "Antti," failure on the page. positions: "The model is good. It is still not 100% deterministic" — stance held against the training's own commercial interest, defended by the trainer's own scar, not asserted.

---

## Frame

**One sentence:** the training is a lens on *what you put in front of the LLM is what gets scaled back at you* — every module is really an exercise in loading, curating, and eventually pruning context, never in prompting harder.

Three modules that only make sense through it:

- M1: *"Whatever you put in front of the LLM is what the LLM scales. The rules file. The prompt. What sits on disk for the agent to read."* (`lectures/painting-the-picture-with-the-llm.md`) — the entire loop (orient→fix→close→compound) is staged as building the first piece of loaded context, `./CLAUDE.local.md`.
- M2: *"A rule that doesn't load doesn't exist, and where you put it decides when it fires."* (`plan-mode-done-right.md`, Key Concepts) — plan-mode push-back is framed as sharpening what gets loaded into the next generation pass, not as a one-off correction.
- M5: *"plan.md the agent owns and mutates... re-reads it when the working window fills."* (`lectures/what-packaging-is.md`) — packaging is explicitly three shapes of context (reference, plan, verifier) engineered against three named ways context rots or drifts.

Where the frame breaks, stated in the training's own terms: M3's ADRs are deliberately *not* loaded — *"ADRs don't auto-load like `CLAUDE.md` and `CLAUDE.local.md` do... most teams don't [wire them]: ADRs accumulate, the window is finite, and rejected alternatives shouldn't sit in live context"* (`exercises/threat-model-with-stride.md`) — and M2/M6 both name a ceiling on loading itself: *"Rules have a ceiling... every always-loaded rule rides into every session, billed against the same attention that does the work"* (`lectures/how-instructions-grow.md`), paid off in M6's *"Ask Claude to read your rules file against the diagnosis and cut the one rule it killed"* (`exercises/spot-gaps-build-the-loop.md`). The frame doesn't just hold; the training names the exact point past which more loading stops helping.

## Narrative

Five sentences, with the turn:

A student arrives with a machine that flatters, confabulates, and reports success it hasn't earned, and the whole training is the discipline of not believing it by default. Module by module they hand it more rope — a bug, a plan, a security surface, an unsupervised multi-hour session — and each larger delegation reveals a new shape the machine's confidence can take while being wrong. Each miss becomes a rule, a skill, or a check written to disk, so the next session inherits the correction instead of repeating the mistake. In the closing module the trainer turns the same lens on himself and shows the identical drift infecting the very curriculum he wrote about drift, across four separate LLM passes, in a rule that was loaded into context the entire time: *"The rules were loaded every time... Claude typed the banned word anyway"* (`lectures/story-of-module-6.md`) — the turn. The training doesn't end on mastery; it ends on proof that the loop was never optional, not even for the person who built it.

The turn, quoted directly: *"Same rule, same rules file, same task, four separate violations across four independent LLM instances. The grep pass caught each one. The LLM self-check did not."* (`lectures/story-of-module-6.md`)

## Point of view

Who is telling this: for five modules, an impersonal instructional voice ("you," no stated "I"); in Module 6 the mask drops and the narrator is explicitly the trainer, signed by name.

Three places the narrator shows:

1. *"I am going to tell you how this module got made. Not the pedagogy of it. The actual session. What I tried, what drifted, what the rules caught, what the rules missed."* (`lectures/story-of-module-6.md`)
2. *"I had to name the gap. When Claude ran them (three personas, a judge pass, source-verify, a capability check) they caught ten things worth fixing. That is a Claude-miss, not a rule-leak."* (`lectures/story-of-module-6.md`)
3. Signed close: *"I made this module live, running the move I am asking you to run. I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed... Your turn. Antti"* (`lectures/story-of-module-6.md`)

Is the narrator's own failure on the page: yes, explicitly and by name, in the closing module — but the "I" is otherwise absent from the training; the first five modules never surface a stated narrator, only an address to "you." The failure-on-the-page anchor is fully met where it appears; the narrator's presence across the whole arc is not.

## Stance

Positions the training could lose a customer over:

- **No plan mode on trivial work.** Against a vendor instinct to sell process everywhere. Defended by mechanism, not assertion: *"No plan mode here. On a trivial bug, plan mode is overhead"* (`exercises/fix-tests-first.md`), paired with the five-criteria test in M2 that makes plan mode earn its slot rather than default to it.
- **Curated skills are for invoking, not for replacing your own judgment; the codebase-specific skill has to be authored, not bought.** *"A test-strategy skill authored on your codebase is worth more than a perfect generic one. Your codebase teaches the skill, not the manual"* (`earn-the-trust.md`, Key Concepts) — a stance against the platform-sells-everything pitch, defended by the push-back mechanic in `author-test-strategy-skill.md` ("No, we don't mock the database").
- **Agents don't get to touch shared team infrastructure unilaterally.** *"Agents don't unilaterally change shared team infrastructure. You do"* (`exercises/author-test-strategy-skill.md`) — defended by the wall/crossing mechanism run through M5–M6 (`./CLAUDE.local.md` first, team `CLAUDE.md` only by PR after a human conversation).
- **A gate you haven't verified isn't a gate.** *"A gate nobody has verified is a gate trusted on vibes"* (`lectures/the-gate-is-a-claim.md`) — this is a position against the comfort of shipping any automated check and calling it done; defended by naming the specific failure modes (miscalibrated judge, gamed gate, lucky sample) and their countermoves, not just asserted.
- **Against the training's own commercial interest:** the closing module documents the trainer's own AI-authored curriculum leaking a banned word four times, shipping a fabricated quote, and missing its own contradiction across four LLM passes — undercutting the pitch that AI-authored process is reliable, in a course selling exactly that process. *"The model is good. It is still not 100% deterministic"* (`lectures/story-of-module-6.md`). This is a scar, not an asserted humility line — it names the specific artefact, the specific failure, and the specific catch.

## The pair

Stance and self-doubt run together throughout, not just in M6. The training doubts its own tools structurally — *"assume about 10% of what it says or does is made up"* (M1), *"same-window self-audits under-flags"* (M3), *"the gate is a claim too"* (M5) — while still holding hard positions (no plan mode on trivial work, agents don't touch team infra, invoke curated skills rather than re-deriving them). It reads as someone who has been there: the doubt is procedural and specific (named failure modes, named catches), and the stance is defended by mechanism rather than declared by fiat, culminating in the trainer's own documented failure in M6. Not a hedge (the positions are held, not softened into neutrality) and not a pitch (the training actively undercuts its own reliability claim on the page).

## Scores

Frame: 95 · Narrative: 95 · Point of view: 88 · Stance: 92

## Smallest moves

1. Give the impersonal narrator one first-person moment earlier than M6 — even a single sentence in M1 or M4 — so the POV isn't concentrated entirely in the closing module.
2. Add one explicit line in M2 or M3 naming the frame directly ("this is a context-loading problem, not a prompting problem") so a skimming reader who misses the Key Concepts catches the throughline without reconstructing it.
3. Pull one more scar-shaped quote (beyond Dex Horthy's) from a named practitioner earlier than M5, so the stance-with-mechanism pattern shows up before two-thirds of the way through.
