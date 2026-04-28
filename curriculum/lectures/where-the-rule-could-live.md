# Where the rule could live

**Time:** 4–5 minutes.

You have a `.md` file with three to five rules about how multi-file tasks want to be factored on your codebase. Three shapes for what happens to a file like this in practice. Each is real; each is downstream of where you are today.

## Slack-triage shape

A new request lands in Slack. An agent reads it, consults your `.md` file, and replies in the thread: *this is a one-liner, ship it from main; this is a feature slice, here's how it splits; this is an epic, here are the three shippable pieces.* The agent triages against the file and posts its read back into the conversation that produced the request.

The `.md` file is the steady part. The agent is the moving part. The triage gets sharper because the file gets sharper, not because the agent gets bigger.

## Issue-webhook shape

A teammate opens a GitHub issue. A webhook fires. A scheduled agent reads the issue against your `.md` file, splits the work into shippable sub-issues, and links them back. Your `.md` file decides what counts as shippable.

The `.md` file is the policy. The webhook is the trigger. You change the policy by editing the file; nothing else moves.

## Scheduled-read shape

Once a sprint, an agent reads your backlog top-to-bottom against the `.md` file and proposes a re-shape: which items want to merge, which want to split, which want to die. You arrive to a proposal, not a queue.

The `.md` file is the spec. The schedule is the cadence. A fixed spec the agent re-reads at run start so it can't drift mid-task.

## What this means today

Three different shapes; one common piece. The `.md` file. Once you have it, you have a guardrail. From there, you run an agent with the guardrail on whatever material fits — a Slack channel, an issue queue, a sprint backlog — in whatever runtime fits — a webhook, a schedule, a triage bot.

Agents build agents. The agent that reads the `.md` file and splits a backlog can be built by another agent that reads a different `.md` file: yours about how *you* author skills, how *you* test them, how *you* ship them. M3 starts there. Today the file exists.

M3 starts with a feature you're shipping.

<!-- maintainer -->


**Quality:** sim-passed 2026-04-28
- compendium-audited 2026-04-28 (check_writing v2026-04-26 voice-quintet + #11 attribution-cap; check_lectures v2026-04-24 #1 meta-frame-closer; check_student_facing v2026-04-27; check_strategy_tie_in v2026-04-25; check_research_claims — body ships un-attributed by deliberate strategic choice, named landings deferred to M5–M6)
- sim-passed 2026-04-28 (Mid-competent 8.0 / Opinionated-senior 7.0 — gripes "agents build agents" as bumper-sticker but Antti's verbatim-frame-cite holds per check_writing #10; Nitpicker — "guardrail" metaphor flagged but kept; "memory" framing stripped + practitioner names stripped per Antti corrections, all same cycle)
- mechanical-tested: not applicable — lecture is read-aloud content, no prompt-chain to execute. Coverage flows through `extract-the-task-shaping-rule.md`'s mechanical run, which exercises the lecture's hand-off into Phase 3.
- cohorts: none yet

**Lecture meta:** *Meta-frame closer. ~4–5 min reading-aloud. Forward-looking; voice tilts Risto (Siilasmaa) — points at what becomes possible, cues the move now. Mood-arc check: M2 is grounded competence, past sustained unease — Risto-tilt is appropriate at the closer because the leverage horizon is what M2 is building toward, and the lecture explicitly defers application rather than promising it.*

**Attribution discipline:** the three shapes ship un-attributed in body. Reasoning: at M2 the cohort is two modules in and hasn't met the practitioners yet; name-dropping reads as authority-borrowing rather than crediting. The deeper attributions land where they're earned: Klaassen + Every's compound-engineering anchor across M5–M6; Ronacher's reference-artifact pattern at M5's verifier build. Per `check_writing.md` #11 (one well-placed cite is the credit, two is bookkeeping). Closer beat *"agents build agents"* is Antti's verbatim frame — kept per `check_writing.md` #10.

**Meta:**
- **Time:** 4–5 min, inside M2's 1h45 slot (Connections 10 / Lecture A 8 / Exercise A 50 / Exercise B 12 / Lecture B 4–5 / Debrief 10 / Bridge 5 + buffer).
- **Pedagogy:** meta-frame closer (per `check_lectures.md` #1) — names the leverage horizon AFTER the student has the rules file in hand. Told before, this would be a feature pitch; told after, it is recognition of what the artifact already enables.
- **Mood target:** forward-looking optimism; the *unleashed leverage* mood that lands fully at M6 gets a one-paragraph preview here. Honors M2's grounded-competence contract by closing on capture-not-application.
- **Voice check:** AE101 voice quintet — Risto leads the closer, Boris on the shape paragraphs (factual, terse). No banned words. No em-dashes. No `practice` (noun); no `ritual`/`ceremony`; no `substrate`; no `leverage` (verb).
- **Frameworks riffed on (deferred from body):**
  - Slack-triage shape — Klaassen / Every compound-engineering pattern. Reference: `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md`. Earned-landing at M5–M6 as compound-engineering anchor.
  - Scheduled-read shape — fixed-spec reference-artifact pattern (Ronacher). Earned-landing at M5's verifier build.
- **Attribution cap (`check_writing.md` #11):** main exercise body cites Pocock + Klaassen + Martin; this lecture adds zero new student-side names. Within budget; M2's named-practitioner load stays where it earned its keep.
- **Philosophy callout budget:** zero. The closer carries the forward gesture without naming a belief.

**Maintainer TODO (genuinely pre-cohort):**
- mechanical-test on first real cohort delivery
