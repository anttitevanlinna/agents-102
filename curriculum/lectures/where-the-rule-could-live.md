# Where the rule could live

You have a `.md` file with three to five rules about how multi-file tasks want to be factored on your codebase. Three shapes for what happens to a file like this in real use.

## Three shapes for the file

- **Slack triage.** A request lands in a thread; `@Claude` routes it into Claude Code on the web, or a Slack app hands the thread to an agent runtime. The agent reads the thread plus your `.md` file and replies with the suggested slice or the next question: this is a one-liner, this is a feature slice and here is how it splits, this is an epic in three shippable pieces.
- **Issue webhook.** A teammate opens, edits, or labels a GitHub issue; a GitHub Actions workflow or GitHub App picks it up. The agent reads the issue against your `.md` file, proposes labels, asks for missing info, or splits it into shippable sub-issues. Your file decides what counts as shippable.
- **Scheduled read.** Once a sprint, a scheduled agent reads the backlog top-to-bottom against the `.md` file and proposes a re-shape: which items want to merge, which want to split, which want to die. You arrive to a proposal, not a queue.

## The file is steady; the agent moves

- The `.md` file is the steady part; the agent is the moving part. In all three shapes, the triage gets sharper because the file gets sharper, not because the agent gets bigger. Improvement invested in the durable artifact carries; the agent under it can be swapped without losing a thing.
- The file travels. Slack thread, issue event, sprint cadence; Claude Code on the web, GitHub Actions, a scheduled agent. Trigger and runtime are wiring choices; the file rides along unchanged. Once it exists, you have the guardrail, and every shape above is a deployment decision, not a rewrite.
- **Agents build agents.** The agent that reads your `.md` file and splits a backlog can itself be built by another agent reading a different `.md` file: yours about how *you* author skills, how *you* test them, how *you* ship them. Today the file exists.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** slide 1 keeps bullets with the three shape-name handles (**Slack triage** / **Issue webhook** / **Scheduled read**); slide 2 de-bolded except **Agents build agents** (recurring arc handle, becomes an M6 lecture title), per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Lede untouched. Wording near-verbatim; no claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

**Slides-only pass (2026-07-02, unaudited):** covered region DELETED (Path A). Per-passage verdicts: three-shapes prose sections CONVERTED to one slide, one bullet per shape (capability-grounded wording preserved: Slack app / `@Claude`-to-web routing, GitHub Actions `issues` events, scheduled agent — do not imply Claude Code runs inside Slack) · per-shape tail lines (steady part / policy / spec triplet) SUBSUMED by slide 2's first bullet · "Each is real; each is downstream" softener CUT · ticket-pair paragraph CUT (it depended on `extract-the-task-shaping-rule-4`, itself a `{{cut:}}` candidate; if the cull reverses, the exercise carries the connection) · "M3 starts with a feature you're shipping" bridge CUT (module `## Next` owns the bridge) · intro line KEPT as the closer's setup lede. File is now lede + two slides.

**Quality:** compendium-audited 2026-07-08 (story@0fafbbe technical@0fafbbe behavior@0fafbbe pedagogy@0fafbbe strategy@0fafbbe slides@47f3357) — predates the slide rework; re-audit before ship.
- judges @47f3357: writing grandfathered, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
- cohorts: none yet

**Lecture meta:** *Meta-frame closer, now deck-shaped. ~3 min reading-aloud. Forward-looking; voice tilts Risto (Siilasmaa) on slide 2 — points at what becomes possible, cues the move now. Mood-arc check: M2 is grounded competence — Risto-tilt appropriate at the closer; the lecture defers application rather than promising it. Slide 2 is the naming beat, placed AFTER the shapes so it lands as recognition (`check_lectures §1`).*

**Attribution discipline:** the three shapes ship un-attributed in body. Reasoning: at M2 the cohort is two modules in and hasn't met the practitioners yet; name-dropping reads as authority-borrowing rather than crediting. The deeper attributions land where they're earned: Klaassen + Every's compound-engineering anchor across M5–M6; Ronacher's reference-artifact pattern at M5's verifier build. Per `check_writing.md` #11. Closer beat *"agents build agents"* is Antti's verbatim frame — kept per `check_writing.md` #10.

**Frameworks riffed on (deferred from body):**
- Slack-triage shape — Klaassen / Every compound-engineering pattern `[practitioner direct]`. Reference: `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md`. Earned-landing at M5–M6 as compound-engineering anchor.
- Scheduled-read shape — fixed-spec reference-artifact pattern (Ronacher) `[practitioner direct]`. Earned-landing at M5's verifier build.

**Capability/source notes (2026-04-29):**
- Slack trigger wording grounded in Slack Events API / workflow trigger model: Slack app or workflow receives message/event/webhook, then external code or custom step calls the agent runtime. Do not imply Claude Code runs inside Slack.
- GitHub issue wording grounded in GitHub Actions `issues` events and webhooks. In-repo default is usually a workflow on issue events; external integrations use webhooks or GitHub Apps.

**Attribution cap (`check_writing.md` #11):** main exercise body cites Pocock + Klaassen + Martin; this lecture adds zero new student-side names.

**Philosophy callout budget:** zero. The closer carries the forward gesture without naming a belief.
