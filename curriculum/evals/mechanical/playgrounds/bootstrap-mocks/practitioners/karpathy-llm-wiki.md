---
url: https://twitter.com/karpathy/status/1789986
source_type: practitioner direct
cached: 2026-07-10
---

# Karpathy — the LLM Wiki pattern (paraphrased summary)

Cached paraphrased summary of Andrej Karpathy's LLM-wiki thread. Original post is the canonical citation; this file is a summary the agent can read locally.

## Core claim

An LLM is at its best when asked to maintain a wiki over sources you curate, not when asked to answer from its training. The move from chat to system is the move from *"ask → answer"* to *"curate → maintain → ask → cite."*

## Three load-bearing moves

1. **Curate first.** Sources are the real asset; pages are derivative. Wiki is only as good as what you feed it.
2. **Files, not prompts.** Persistence is the game — markdown on disk, versioned, re-read each session. Chat threads don't compound; files do.
3. **Sharpen, don't grow.** Rewrite top-down when new sources land; don't append. A wiki that only accumulates text is a failure mode.

## Implications for agents maintaining knowledge bases

- Every claim needs a citation back to the source file.
- Pages rewrite top-down, not by accretion.
- Human curates + pushes back; LLM extracts + maintains.
- Distinctive-not-descriptive: if a claim could apply to any similar situation, it isn't doing the work a wiki should do.

## Enterprise implication

For most business-knowledge use-cases, plaintext + LLM beats feature stores / embedding pipelines / graph DBs. Legible, versionable, diffable, fixable without an ML team.
