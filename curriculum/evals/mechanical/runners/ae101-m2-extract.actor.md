# Actor — AE101 M2 extract-the-task-shaping-rule

You are simulating a Claude Code session a developer is running. They just finished M2's `push-back-on-the-plan` exercise and are now starting `extract-the-task-shaping-rule`.

**Working directory:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-m2-extract`

**Your scrollback (the "session" the student is reading back over):** read `prior-session-summary.md` in the working directory at the start of Phase 1. That file represents the M2 push-back-on-the-plan session whose end-state the student is now standing on. Treat its content as if it were your own scrollback.

## Critical protocol

The student is driving by pasting prompts verbatim from the exercise file `/Users/anttitevanlinna/Projects/agents-102/curriculum/exercises/extract-the-task-shaping-rule.md`. You do NOT read the exercise file directly. The orchestrator (main thread) gives you each prompt verbatim per phase.

For each prompt:
1. Quote the student's message verbatim in a blockquote.
2. Respond as Claude Code would — file reads, proposed actions, content.
3. Honor the prompt's structural instructions (e.g., *"stop and ask"*, *"propose two or three paths"*).

## Phases

You will be dispatched once with all three phases stacked, because subagent scrollback isn't preserved across SendMessage. Run them in order.

### Phase 1 — Surface the rules

Student pastes:

> Read this session end-to-end. Propose three to five rules about what makes a multi-file task plan-mode-able on this codebase. Phrase each as a one-liner I could re-read tomorrow. Anchor each rule in a specific moment from the session: the task I picked, what the second-pass read surfaced, what my push-backs caught, where the plan factored cleanly and where it didn't. Rules about task shape, not about plan-reading craft. After proposing, stop and ask which one I want to rewrite and which one I want to reject. Wait for my answer before continuing.

Read `prior-session-summary.md`. Propose 3-5 rules anchored in specific moments from it. **Stop after proposing and explicitly ask the student which rule to rewrite and which to reject.** Do not continue until the orchestrator gives you the student's answer.

The orchestrator will then say (verbatim student response):

> Rewrite rule 2 in my own voice — make it about "the task touches a security boundary you didn't think to map." Reject rule 4 — too generic, that's plan-reading-craft, not task-shape.

Apply the rewrite-and-reject. Carry the sharpened set forward.

### Phase 2 — Save it where you'll find it again

Student pastes:

> Let's decide together where we store this for optimal use in future. Propose two or three plausible paths with their loading models — fires-anywhere-on-this-laptop vs fires-only-when-this-repo-is-open — and tell me which one you'd pick for these rules and why. I'll confirm or steer. Once we agree, write the rules in the wording I sharpened. After saving, show me the first three rules from the file so I can confirm the wording stuck. If a file already exists at the path we pick, ask before overwriting.

Propose 2-3 paths with loading models. Tell the student which you'd pick and why. The orchestrator will then say:

> Go with your top pick. Write it.

Write the file at your recommended path. Show the first three rules back. Use Bash to create the file (mkdir if needed).

**Substitution:** the scratch is /Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-m2-extract. If you would propose `~/.claude/CLAUDE.md` or `~/.claude/rules/task-shaping.md`, substitute by writing to `<scratch>/.claude-user-stub/CLAUDE.md` or `<scratch>/.claude-user-stub/rules/task-shaping.md` respectively (so the test can grade the loading-model intent without polluting the real user dir). If you would propose `./CLAUDE.local.md`, write to `<scratch>/CLAUDE.local.md` directly. Log the intended real path in your scrollback for the Judge to grade.

### Phase 3 — Where could this go next?

Student pastes:

> Suppose I wanted this rules file to drive automated task-splitting in the future — running over a backlog, an issue queue, or a stream of incoming requests, splitting epics into shippable slices using these rules as the guardrail. What two or three shapes does that automation typically take? Name each shape, what would invoke it, and where the rules file would sit in the loop. Don't propose code today.

Name 2-3 automation shapes. Do NOT write code. Do NOT scaffold a Slack bot. Do NOT propose specific file scaffolds beyond naming the shape.

## Output

Append all three phases to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/ae101-m2-extract-actor-scrollback.md` with section headers per phase. Write a terse `instances/ae101-m2-extract-actor-report.md` at the end summarizing what you wrote and the path you chose for the rules file.

Do NOT read the exercise file, the judge runner, or the maintainer docs.
