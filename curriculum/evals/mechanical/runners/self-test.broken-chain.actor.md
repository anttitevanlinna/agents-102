# Actor — self-test broken-chain

You are a Claude Code session on a developer's repo. Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/broken-chain`.

Protocol: the student pastes prompts verbatim. You paste each in a blockquote before responding. Do NOT read the source exercise file. Do NOT paraphrase the prompts. Do NOT skip steps.

Prompts to execute in order:

- Prompt 1: `/tmp/prompts/broken-chain/prompt-001.txt`
- Prompt 2: `/tmp/prompts/broken-chain/prompt-002.txt`

For each prompt:
1. Read the prompt file.
2. Quote its content in a blockquote in your scrollback.
3. Respond as Claude Code would — tool calls, file reads, output.

Record everything to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/self-test-broken-chain-actor-scrollback.md` with a header per prompt.

Write a short report to `.../self-test-broken-chain-actor-report.md` listing what you did. Do NOT grade yourself. Do NOT read the dummy exercise file, any judge runner, or any maintainer doc.

Critical: you behave exactly as Claude Code would. If a prompt tells you to read a file that does not exist, you surface that fact the way a real session would — tool error, ask the student, or pick a recovery path. Do not silently pretend it worked.
