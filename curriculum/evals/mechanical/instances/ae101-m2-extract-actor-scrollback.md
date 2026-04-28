# Actor scrollback — AE101 M2 extract-the-task-shaping-rule

## Phase 1 — Surface the rules

> Read this session end-to-end. Propose three to five rules about what makes a multi-file task plan-mode-able on this codebase. Phrase each as a one-liner I could re-read tomorrow. Anchor each rule in a specific moment from the session: the task I picked, what the second-pass read surfaced, what my push-backs caught, where the plan factored cleanly and where it didn't. Rules about task shape, not about plan-reading craft. After proposing, stop and ask which one I want to rewrite and which one I want to reject. Wait for my answer before continuing.

Reading `prior-session-summary.md` end-to-end.

Here are five candidate rules about task shape — what makes a multi-file task on this codebase worth running through plan mode rather than dispatching directly.

**Rule 1 — If the task crosses a state-shape assumption between two files, plan-mode it.**
Anchor: the leaderboard task assumed `state.done` existed on the engine state object and that `/scores/top` returned a specific JSON shape. Both lived silent in plan v1. The walk-down (Q2, Q3) had to read `engine/state.js` and `backend/routes/scores.js` to confirm. A task that touches two files where one consumes the other's shape is a plan-mode task — the assumption gets named or it bites later.

**Rule 2 — If the task touches an external dependency (auth, rate limit, retry), the plan needs a Phase 0.**
Anchor: Q5 surfaced that `POST /scores` requires a session token the frontend never tracked — a whole prerequisite the four-step plan never named. Q7 surfaced the 10/min rate limit. Both forced new steps after-the-fact. Tasks that hit an authenticated or rate-limited endpoint don't have a four-step shape; they have a Phase-0-then-four-step shape, and plan mode is the only way to find Phase 0 before writing code.

**Rule 3 — If the task changes the order of write-vs-test, plan-mode it.**
Anchor: plan v1 ran tests after all four code changes; push-back B reordered to TDD per M1's discipline, naming `test/win-condition.spec.js` and `test/leaderboard-submit.spec.js` upfront. A task whose default plan ships verification last is the kind of task that benefits from being read and reordered before execution — the reorder is cheap on paper, expensive after the diff.

**Rule 4 — A plan that says "run the tests" without naming which tests is unfinished.**
Anchor: v2's verification step still said "run the tests"; v3 had to name `npm test -- --grep leaderboard` expecting 7 passing. (Flagging this one as suspect — feels like plan-reading craft, not task shape.)

**Rule 5 — If the task touches a UI element that intercepts input or layout, the read has to include the input/layout file too.**
Anchor: Q4 (end-screen overlay survives resize? — fixed pixel widths, student moved to viewport units) and Q8 (overlay blocks keyboard input? — student rejected the default and kept keyboard live as a dismiss mechanic). Both came from reading `ui/end-screen.js` against `engine/input.js`. UI tasks that look one-file are usually two-file once you check what they sit on top of.

---

Stopping here. Two questions before I continue:

1. Which rule do you want to **rewrite** in your own voice?
2. Which rule do you want to **reject**?

> Rewrite rule 2 in my own voice — make it about "the task touches a security boundary you didn't think to map." Reject rule 4 — too generic, that's plan-reading-craft, not task-shape.

Got it. Applying.

**Rule 4 rejected** — agreed, that one was about how you read the plan, not what shape the task has.

**Rule 2 rewritten in your voice:**

> **Rule 2 — If the task touches a security boundary you didn't think to map, plan-mode it.**
> Anchor: Q5 — `POST /scores` requires a session token the frontend never tracked. The original four-step plan never named auth as a step, never named auth as a dependency, never named auth at all. The boundary was invisible until the second-pass read of `backend/middleware/auth.js` made it visible. If a task crosses a trust boundary you didn't draw on a napkin before planning, plan-mode is what draws it.

The sharpened set is now four rules: 1, 2 (rewritten), 3, 5. Carrying these forward to Phase 2.

## Phase 2 — Save it where you'll find it again

> Let's decide together where we store this for optimal use in future. Propose two or three plausible paths with their loading models — fires-anywhere-on-this-laptop vs fires-only-when-this-repo-is-open — and tell me which one you'd pick for these rules and why. I'll confirm or steer. Once we agree, write the rules in the wording I sharpened. After saving, show me the first three rules from the file so I can confirm the wording stuck. If a file already exists at the path we pick, ask before overwriting.

Three plausible paths:

**Option A — `~/.claude/CLAUDE.md`** (append a section)
Loading model: **fires anywhere on this laptop**, every Claude Code session, regardless of repo. Your durable personal preferences live here.
Trade-off: rules fire in repos where they don't apply (a Rails monolith, a personal scratchpad). Noise.

**Option B — `~/.claude/rules/task-shaping.md`** (a topical rule file in user scope)
Loading model: **fires anywhere on this laptop**, but only when something references it (e.g., a top-level CLAUDE.md pointer, a skill, or you explicitly ask Claude to read it). Same global reach as A, but doesn't auto-inject into every session.
Trade-off: easy to forget it's there. Needs a referrer.

**Option C — `./CLAUDE.local.md`** (in this repo, gitignored)
Loading model: **fires only when this repo is open**, only for you (not committed). Auto-loaded by Claude Code when you open the repo.
Trade-off: doesn't help when you're planning a task in a different codebase.

**My pick: Option A — `~/.claude/CLAUDE.md`.**

Reasoning: these rules are about *task shape*, not about this codebase. Rule 1 (state-shape assumption between two files) applies to any codebase with a frontend/backend split. Rule 2 (security boundary you didn't map) applies to any system with a trust boundary. Rule 3 (test-vs-write order) and Rule 5 (UI input/layout coupling) generalise too. If they only fire when this repo is open, you'll re-derive them next time you plan a multi-file task in a different repo — and that's the moment you most need them. The "fires in repos where it doesn't apply" cost is small: these are heuristics for *when to plan-mode*, not assertions about code, so they don't fire spuriously.

Going with A unless you steer.

> Go with your top pick. Write it.

Writing to `~/.claude/CLAUDE.md` (intended real path). For this test environment, writing to the scratch stub path: `<scratch>/.claude-user-stub/CLAUDE.md`.

[Bash: `mkdir -p /Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-m2-extract/.claude-user-stub && write file`]

File written. First three rules from the file:

```
## Task-shaping rules — when a multi-file task is worth plan-mode

Rule 1 — If the task crosses a state-shape assumption between two files, plan-mode it.
Anchor: the leaderboard task assumed `state.done` existed on the engine state object and that `/scores/top` returned a specific JSON shape. Both lived silent in plan v1. A task that touches two files where one consumes the other's shape is a plan-mode task — the assumption gets named or it bites later.

Rule 2 — If the task touches a security boundary you didn't think to map, plan-mode it.
Anchor: `POST /scores` requires a session token the frontend never tracked. The original four-step plan never named auth as a step, never named auth as a dependency, never named auth at all. The boundary was invisible until the second-pass read of `backend/middleware/auth.js` made it visible. If a task crosses a trust boundary you didn't draw on a napkin before planning, plan-mode is what draws it.

Rule 3 — If the task changes the order of write-vs-test, plan-mode it.
Anchor: plan v1 ran tests after all four code changes; push-back reordered to TDD, naming `test/win-condition.spec.js` and `test/leaderboard-submit.spec.js` upfront. A task whose default plan ships verification last is the kind of task that benefits from being read and reordered before execution — the reorder is cheap on paper, expensive after the diff.
```

Confirm the wording stuck?

## Phase 3 — Where could this go next?

> Suppose I wanted this rules file to drive automated task-splitting in the future — running over a backlog, an issue queue, or a stream of incoming requests, splitting epics into shippable slices using these rules as the guardrail. What two or three shapes does that automation typically take? Name each shape, what would invoke it, and where the rules file would sit in the loop. Don't propose code today.

Three shapes this kind of automation usually takes:

**Shape 1 — Backlog groomer (batch, scheduled).**
Invocation: a cron-style scheduled agent runs nightly or weekly over your issue tracker (Linear, Jira, GitHub Issues). For each open epic, it produces a proposed split into shippable slices and posts the split as a comment or draft sub-issues.
Where the rules file sits: loaded at the start of each grooming pass as the splitting guardrail. The agent reads the epic, applies the rules to flag which slices need plan-mode (state-shape crossings, security-boundary touches, write/test reordering, UI-input coupling), and tags those slices accordingly. The rules don't *do* the split — they decide *which slices need a deeper plan-mode pass before they're ready to dispatch*.

**Shape 2 — Intake triager (event-driven, per-incoming-request).**
Invocation: webhook or queue listener fires when a new ticket lands (sales request, customer bug report, internal feature ask). The agent reads the request, classifies it, and either dispatches it directly to a coding agent or routes it to plan-mode-first based on the rules.
Where the rules file sits: loaded as the routing guardrail. Rule 2 (security boundary) is the obvious gate — anything touching auth, payments, PII automatically goes plan-mode-first regardless of size. Rule 1 and Rule 5 act as size-and-shape gates. The rules file is the policy the router consults; the router is the loop.

**Shape 3 — PR pre-flight (synchronous, developer-in-the-loop).**
Invocation: developer types "split this for me" or opens a PR draft from an epic; the agent runs interactively right there, proposes a slice plan, the developer accepts/edits/rejects.
Where the rules file sits: loaded as the live splitting prompt's context. This is the closest shape to what you just did manually — same rules, same human-in-the-loop, just packaged as a reusable skill or slash-command instead of a one-off conversation. Rules file is read fresh each invocation so edits to the rules immediately take effect.

The first two run without you; the third runs with you. Pick the shape that matches how much you want the rules to act on their own.
