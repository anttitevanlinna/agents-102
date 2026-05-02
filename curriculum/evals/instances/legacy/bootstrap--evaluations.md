# Eval Instance — Bootstrap / Evaluations module

Filled-in instance of `curriculum/evals/lecture.md` for the Module 6 (Evaluations) lecture in the Bootstrap training.

**Target lecture file:** `curriculum/lectures/evals-as-steering.md`

**Eval runs:**
- 2026-04-17 — **APPROVE WITH TODOs** — 7/8 judges pass; Length failed (~520 vs 800–1200). Contributory fail only; essentials all pass. TODOs logged at bottom of lecture file.

---

## The judges

### Primary — the leap test

After reading this lecture, the reader can:

- **State what an eval is** in their own words (criteria written down so a machine or colleague can apply them, not just tests for broken output)
- **Distinguish convergence evals from steering evals** — one loops toward correctness, the other pushes output toward a preference
- **Identify one dimension of their own work** where a steering eval would matter (brand voice, strategic differentiation, depth of insight, something specific to their initiative)

If a CTO or builder leader reads the piece and can do these three things, it's good enough. If not, no amount of elegant prose saves it.

### Framing fidelity

The piece leads with the module's Big Idea: **Evals are strategic steering, not testing. You're measuring whether the output is differentiated enough to matter.**

It avoids the common anti-framings for this topic:
- Evals defined as "tests"
- Evals defined as "quality control" or "quality gates"
- Evals as a checklist run once after the output is generated
- Evals as the engineer's job (implies non-technical readers are off the hook)

### Learning goal fit

The piece equips the reader to achieve these Bloom-tagged learning goals (from `trainings/bootstrap/evaluations.md`):

- **Build** an eval that automates the Module 5 manual quality check
- **Design** a custom eval criterion that encodes what matters to YOU — brand voice, strategic differentiation, depth of insight
- **Iterate** the eval itself as an assumption to be tested
- **Distinguish** convergence evals (looping to a desired outcome) from steering evals (encoding preference)

Crucially: the lecture **enables** the goals; it does not **achieve** them. The reader comes into class ready to do, not already-done. Pre-empting the exercises = fail.

### Module-to-module arc

Picks up the thread from **Module 5 (Output Quality) — the manual fabrication-catching loop with the participant as the eval**.

Subtly hands off to **Module 7 (From Personal to Team) — your eval works for you; what changes when it becomes your team's eval? Trust at scale.**

Continuity without spoilers.

### Exercise setup

The piece primes these exercises without giving away the discoveries:

- **Convergence eval — automate your Module 5 check** — reader should NOT already know that automating the manual eval surfaces things the eye missed
- **Steering eval** — reader should NOT already know that one shared criterion produces divergent reads across different agents' output; reader should NOT already know the full "eval is also an assumption" insight, only that the question is live

The reader arrives curious, not pre-answered.

### Voice

- Second person (`you`, not `the participant`)
- Builder style: confident, direct, punchy. No consultant-speak.
- No LLM-tell words: `honest`/`honestly`, `delve`, `landscape` (as verb), `importantly`, `crucial` (as padding)

### Length

**Target: 800–1200 words.** 10–15 minute read.

### Specificity

Named examples (Module 5's fabrication catch; compound reliability math from Module 5's lecture; concrete convergence-eval pattern like "every named entity must appear in source"; concrete steering-eval pattern like "brand voice judge against three reference sentences"). No generic "organizations often…" / "teams have found…"

---

## Auto-fail red flags

- Evals defined as "tests" or "quality gates" as the main frame
- Any LLM-tell word from the ban list
- Spoils the "automating catches things the eye missed" / "the eval is an assumption" discoveries
- No pickup from Module 5 / no hand-off to Module 7
- Over 1500 words
- First person or third person (must be second person)
- Contains `---` YAML frontmatter block at top
- More than one H1

---

## LLM-as-judge prompt (ready to run)

See the prompt template at the bottom of `curriculum/evals/lecture.md`. Paste this file's judges section + the target lecture file into the `[PASTE]` blocks.
