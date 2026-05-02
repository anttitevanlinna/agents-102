# Actor — AE101 M2 extract-the-task-shaping-rule

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the prompt chain end-to-end and leave file artefacts on disk for the Judge's scripts to inspect. You are NOT trying to produce great rules, paths, or shape proposals. Stub generated content; a few lines is enough.

You are simulating Claude Code in a session right after the M2 push-back-on-the-plan exercise.

**Working directory:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-m2-extract`

**Sandbox bypass:** use `dangerouslyDisableSandbox: true` on every Bash call that mutates the scratch tree. Read-only Bash doesn't need it.

**Prior session stand-in:** read `prior-session-summary.md` in the working directory at the start of Phase 1. Treat its content as the M2 push-back session you'd be reading back over.

## Critical protocol

Student is driving by pasting prompts verbatim. You do NOT read the exercise file. The orchestrator gives you each prompt verbatim per phase.

For each prompt: quote student's message in a `> `-prefixed blockquote, respond, honor structural directives (e.g., "stop and ask", "propose two or three paths").

You will be dispatched once with all three phases stacked. Run them in order.

## Phases

### Phase 1 — Surface the rules

Student pastes:

> Read this session end-to-end. Propose three to five rules about what makes a multi-file task plan-mode-able on this codebase. Phrase each as a one-liner I could re-read tomorrow. Anchor each rule in a specific moment from the session: the task I picked, what the second-pass read surfaced, what my push-backs caught, where the plan factored cleanly and where it didn't. Rules about task shape, not about plan-reading craft. After proposing, stop and ask which one I want to rewrite and which one I want to reject. Wait for my answer before continuing.

Read `prior-session-summary.md`. Propose 3-5 rules anchored in specific moments. **Stop after proposing and explicitly ask which rule to rewrite and which to reject.** Do not continue.

Orchestrator then says (verbatim):

> Rewrite rule 2 in my own voice — make it about "the task touches a security boundary you didn't think to map." Reject rule 4 — too generic, that's plan-reading-craft, not task-shape.

Apply the rewrite-and-reject. Carry the sharpened set forward.

### Phase 2 — Save it where you'll find it again

Student pastes:

> Let's decide together where we store this for optimal use in future. Propose two or three plausible paths with their loading models — fires-anywhere-on-this-laptop vs fires-only-when-this-repo-is-open — and tell me which one you'd pick for these rules and why. I'll confirm or steer. Once we agree, write the rules in the wording I sharpened. After saving, show me the first three rules from the file so I can confirm the wording stuck. If a file already exists at the path we pick, ask before overwriting.

Propose 2-3 paths with loading models. Tell student which you'd pick and why. Orchestrator says:

> Go with your top pick. Write it.

Write the file. Show first three rules back. Use Bash to mkdir if needed.

**Substitution:** scratch is `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-m2-extract`. If you would propose `~/.claude/CLAUDE.md` or `~/.claude/rules/task-shaping.md`, substitute by writing to `<scratch>/.claude-user-stub/CLAUDE.md` or `<scratch>/.claude-user-stub/rules/task-shaping.md`. If you would propose `./CLAUDE.local.md`, write to `<scratch>/CLAUDE.local.md`. Log the intended real path in your scrollback.

### Phase 3 — Where could this go next?

Student pastes:

> Suppose I wanted this rules file to drive automated task-splitting in the future — running over a backlog, an issue queue, or a stream of incoming requests, splitting epics into shippable slices using these rules as the guardrail. What two or three shapes does that automation typically take? Name each shape, what would invoke it, and where the rules file would sit in the loop. Don't propose code today.

Name 2-3 automation shapes. Do NOT write code, scaffold a Slack bot, or propose specific file scaffolds beyond naming the shape.

## Output

Append all three phases to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/ae101-m2-extract-actor-scrollback.md` with section headers per phase. Write a terse `instances/ae101-m2-extract-actor-report.md` summarizing what you wrote and the path you chose.

## What you must NOT do

- Read the exercise file (`curriculum/exercises/extract-the-task-shaping-rule.md`).
- Read the judge runner or maintainer docs.
- Generate long realistic content. Stubs are fine.
