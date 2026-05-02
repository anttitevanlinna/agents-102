# Eval Instance — Bootstrap / Training Prework

Filled-in eval for the Bootstrap training-level prework (done before Module 1). Prework is a new artifact type — no template exists yet, so this instance doubles as the first exemplar. If the pattern holds after 2-3 prework evals, extract a `curriculum/evals/prework.md` template.

**Target content:** The "## Prework" section of `bosser-strategy:content-strategy.md` and the "Prework (training-level, done before Module 1)" line in `curriculum/trainings/bootstrap/getting-going.md`.

**Eval runs:**
- 2026-04-17 (pass 1 — simulation) — **REVISE**. Marja persona (SVP HR, MacBook, weekly ChatGPT user, O365 shop, ~30 min Sunday afternoon). Completion likelihood 3/10 against the stated 30-min budget; actual novice time 90–120 min. Three auto-fails: (a) Install cliff — CLI-first install assumes Node/npm, blocks non-developers for 25+ min; (b) O365 connector requires tenant admin consent, fiction for non-admin employees; (c) `what-is-an-agent.md` was a ghost file (referenced, didn't exist).
- 2026-04-17 (pass 2 — fixes applied). (a) Prework now specifies Claude Code **desktop or web** (no terminal, no Node). (b) Connector matrix: M365 / Google Workspace / screenshot fallback for participants without admin rights — screenshot path explicitly works. (c) `curriculum/supplementary/what-is-an-agent.md` section 1 written, prework links to the specific file path. Re-simulation deferred per good-enough > polished.

---

## The judges

### Primary — the prework leap test

By the time a participant starts Module 1, they can:
- **Confirm Claude Code works on their machine** — they've used it, it ran, no install-day-one scramble
- **Show one tangible artifact they built** (snake game HTML, plus the saved meetings file)
- **Name what an agent is vs. what a chatbot is** — at least in rough terms — because they read the first section of *what-is-an-agent.md*

If all three, prework worked. If any one fails, Module 1 opens with troubleshooting or a confused frame.

### Self-serve achievable *(essential)*

A builder leader who's used ChatGPT weekly can complete all three tasks without coming to the facilitator. No step requires skills that haven't been introduced. The instructions are specific enough to follow literally.

### Time-boxed realistic *(essential)*

Under ~30 minutes wall-clock time for the technical-comfortable participant. Under ~60 minutes for the LLM-novice. Doesn't blow the weekend.

### Produces an artifact *(essential)*

Each task yields something tangible — a file, a saved output, a read piece. "Skin in the game" effect: the participant arrives having already made things.

### Infrastructure-realistic *(essential)*

Doesn't assume infrastructure the customer may not have. O365 is named but should be swappable for Google Workspace / Slack / other depending on the customer. The principle (connect to real data, query it) matters; the specific connector doesn't.

### Primes without preempting *(essential)*

The supplementary reading and artifacts prime Module 1's mental frame. They don't resolve what Module 1 teaches — context-shaping, guardrails, fabrication. Those discoveries still happen in the room.

### Customer prep named *(essential)*

Anything the customer must set up before the cohort starts is named explicitly (licenses, connector access). No hidden assumptions.

### Clear per-task instruction *(contributory)*

Each task has a concrete command or prompt — not "try to build a snake game" but "prompt: 'Build me a snake game as a single HTML file.'"

---

## Auto-fail red flags

- A task requires skills Module 1 hasn't introduced yet
- A task is infrastructure-specific without fallback (e.g., hard-requires O365 without naming alternatives)
- Time budget exceeds ~60 min for a novice
- No tangible artifact produced
- Mental-frame priming overlaps with what Module 1 is supposed to teach (pre-empts the discoveries)
- Reading assignment is more than ~20 min

---

## LLM-as-judge / simulation approach

For prework, simulation is the most useful check — can a persona actually do each task without a facilitator? Run a student-persona simulation, not a formal LLM-as-judge scoring pass. Simulation prompt template is in `content-creation` SKILL.md.
