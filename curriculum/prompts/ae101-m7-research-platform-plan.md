---
key: ae101-m7-research-platform-plan
dest: Claude Code
context: M7 independent research and candidate plan
runtime: any
origin: exercises/research-and-select-agent-platform
requires:
  - id: m7-shared-challenge
    source: external
produces:
  - id: m7-research-policy
    location: docs/agent-platform/candidates/<student-slug>/research-policy.md
  - id: m7-search-trace
    location: docs/agent-platform/candidates/<student-slug>/search-trace.md
  - id: m7-evidence-ledger
    location: docs/agent-platform/candidates/<student-slug>/evidence-ledger.md
  - id: m7-candidate-plan
    location: docs/agent-platform/candidates/<student-slug>/plan.md
---
Read `docs/agent-platform/challenge.md`. Do not read any other participant's plan.

Ask for my name. Then ask me to state exactly three criteria for how you should search the internet for this challenge. Ask for one criterion at a time and wait for each answer. Do not propose the criteria for me. Preserve my wording, then ask what each criterion should exclude, prefer, or force you to do.

Create a lowercase slug from my name and use it as the final directory under `docs/agent-platform/candidates/`. Save my three criteria and their interpretations to `research-policy.md` in that directory before searching.

Before the first search, create `search-trace.md`, `evidence-ledger.md`, and `plan.md` with their required headings. The classroom research budget is at most eight search queries and twelve opened sources. Start drafting after six accepted sources cover the worker, AWS execution, duplicate or cancellation behavior, credential boundary, and trace handling. Use the remaining budget only for a named gap or counter-evidence. Do not spend the whole phase trying to make the source set exhaustive.

Research the challenge independently under those three criteria. Append to `search-trace.md` after each query and source before searching again. Record every query used, every source opened, whether the source was accepted or rejected, which criterion caused that decision, contradictions and missing evidence, and why you stopped searching.

Write `evidence-ledger.md`. Map every consequential architecture claim to its source URL, source date, and the criterion that admitted it. Separate sourced facts, your inferences, and unresolved claims.

Write `plan.md` for a private AWS platform running headless Codex or Claude Code behind a replaceable worker contract. Cover the task boundary, success and correct no-action conditions, trigger and admission policy, queue, timeout, retry, cancellation, idempotency, isolated workspace, context assembly, state, custom tool contracts, authorization, credential brokering, verification, trace events, masking and retention assumptions, output, pull-request, approval, escalation, incident paths, one concrete AWS mapping, rejected alternatives, and what evidence could reverse each consequential decision. Breadth with explicit gaps beats a polished section that leaves the rest unwritten.

Do not provision resources. Do not read or imitate peer plans.

In chat, return only the candidate packet path and the three architecture decisions most vulnerable to peer challenge.
