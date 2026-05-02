---
url: https://klaassen.example/posts/compound-engineering
source_type: practitioner direct
cached: 2026-07-14
---

# Klaassen — compound engineering (paraphrased summary)

Cached paraphrased summary of Kieran Klaassen's writing on compound engineering — the practice of treating each engineering cycle as input to the next.

## Core claim

Each shipped agentic improvement should make the next one cheaper to ship. The compounding lives in the artefacts — memory pages, agent files, evals, skill files — not in the act of using a chat tool.

## Three rules

1. **Files outlive sessions.** If today's session leaves nothing on disk, the next session starts from zero.
2. **Each cycle leaves at least one new artefact** — a memory page sharpened, a new agent file, an eval that catches the failure mode you just hit.
3. **Sharpen don't accrete.** Memory grows by rewriting, not by appending; agents grow by rule-tightening, not by feature creep.

## Diagnostic for "is this compounding?"

If you remove the artefacts and re-run the same workflow tomorrow with a fresh context window, do you get the same quality? If yes, the compounding lives in the files (good). If no — if it lived in the trainer's memory, the chat scrollback, or the engineer's head — it didn't compound.

## Implications

- Test layers, agent definitions, memory pages, skill files — these are the substrate of compounding. Slack threads and chat scrollback are not.
- A rollout that ends with "everyone uses Claude Code" has not compounded. A rollout that ends with "every team has a memory, an agent, and an eval set checked into a repo" has.
