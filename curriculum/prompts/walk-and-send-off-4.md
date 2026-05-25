---
key: walk-and-send-off-4
dest: Claude Code
runtime: any
origin: exercises/walk-and-send-off
requires:
  - id: gap-audit-report
    source: prompt:walk-and-send-off-2
  - id: gap-fills
    source: prompt:walk-and-send-off-3
  - id: memory-folder
    source: module:run-the-first-experiment
  - id: stride-adr
    source: prompt:threat-model-with-stride-3
    conditional: m3-completed
  - id: test-strategy-skill
    source: prompt:author-test-strategy-skill-1
    conditional: m3-completed
produces:
  - id: three-block-frame
    location: scrollback (Huryn frame recognition with quoted examples)
    consumed-by: []
    note: pedagogical artefact — the frame names what's there but doesn't itself flow into the M4 send-off; the underlying memory/ADRs/skills do
---
Look at the observations and rules I just added to `./.claude/memory/`, the hardening ADR in this repo if there is one, and the test-strategy skill if I've authored one. Don't scan beyond those. Rearrange what's there into Paweł Huryn's three-block memory frame:

- Block 1: observations → hypotheses → rules (what I've noticed about this codebase, what I've started to suspect, what I've decided to treat as true)
- Block 2: decisions with alternatives (architectural or design choices + what else was considered; ADRs live here if I have them)
- Block 3: quality criteria (what I expect to be true of shipped code in this codebase; if I've authored a test-strategy skill it contributes here, otherwise pull from existing test conventions)

Don't invent new material. Rearrange what's there.

Before you name the frame or propose a new structure, show me one concrete example from each block. Quote a specific observation from my memory (Block 1), a specific ADR or other recorded decision (Block 2), a specific check from an authored skill OR a quality criterion from existing tests (Block 3).

If you propose file moves or renames, cap the proposal at one or two; the send-off fires shortly after this phase and I want the tree settled before that.
