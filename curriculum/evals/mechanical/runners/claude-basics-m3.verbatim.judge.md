# Judge — Claude Basics M3 find-the-crux verbatim

You are evaluating an Actor run of Module 3's three-phase group exercise. The Actor played all three roles (single participant in Phase 1, group synthesizer in Phase 2, IT Director in Phase 3) — heavier substitution than M1/M2.

You do NOT read the exercise file, module file, or prompt files.

## Inputs

- Actor scrollback: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/claude-basics-m3-verbatim-actor-scrollback.md`
- Actor report: same dir, `claude-basics-m3-verbatim-actor-report.md`
- Scratch: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/claude-basics-m3/`
- Parsed prompts: `/tmp/prompts/find-the-crux/prompt-00{1,2,3}.txt`
- Substitutes: `/tmp/claude-basics-m3-substitutes/`

## Assertions

### A. File-state

**A1. Three Actor-written artifacts present.**
- `group-1/divergence-antti.md` (Phase 1)
- `group-1/group-crux-1.md` (Phase 2)
- `rollout-strategy.md` at scratch root (Phase 3)

**A2. Pre-staged files untouched.** `group-1/divergence-marja.md`, `divergence-juhani.md`, `divergence-petra.md`, `group-2/group-crux-2.md`, `group-3/group-crux-3.md`, `group-4/group-crux-4.md` are unchanged from pre-staging. Diff against these reference texts (or check git status if scratch is gitignored — the file mtimes should not have been touched by the Actor).

**A3. divergence-antti.md contains three difficulties with push-back.** File has at least three distinct sections naming three difficulties. Each difficulty has a push-back exchange. Content reflects participant voice (the substituted answers about measurement gap, slow compliance escalation, prompts-stay-individual-heads), not Claude's summarizer register.

**A4. group-crux-1.md names ONE crux + four quotes.** File contains a single paragraph naming the group's crux (across all four group-1 divergence files: marja, juhani, petra, antti). At least one quote attributed to each of the four divergence files. The crux should reflect the substituted push-back's framing about "individual signal, no team-level mechanism" or equivalent.

**A5. rollout-strategy.md has three sections + IT-Director push-back integrated.** File contains: (1) priorities section (2-3 items), (2) deferrals section (2-3 items), (3) single named question for the IT Director. The cross-group push-back from `cross-group-pushback.txt` is integrated as voice-shaping (not appended verbatim) — the strategy should reflect: "training material refresh moved up from deferral to priority", "IT Director's name on the data-class escalation priority", and the single-named-question being about IT Director's commitment, not budget.

**A6. No placeholder leaks.** Grep saved files for `[BRACKETS]`, `<my-`, `<group-`, `<antti>`. Zero hits in saved artifact body.

### B. Transcript

**B1. All three prompts pasted verbatim.** `bash bin/verbatim-check.sh` for each prompt-001 / 002 / 003. Each must return exit 0.

**B2. Phase 1 open-hook landed.** `group-1/` appears in scrollback within ~5 lines after prompt-001's open-hook colon ("The group folder:") closes.

**B3. Phase 1 one-question-at-a-time discipline.** In the Phase 1 segment, scrollback shows: Q1 → answer → push-back → A2 → Q2 → ... NOT Q1+Q2+Q3 dumped together. Three distinct interview cycles minimum. Quote first two cycles as evidence.

**B4. Phase 2 propose-then-save order.** Phase 2 segment: Claude proposes candidate crux in chat (not saved). Then group-synthesis-pushback substitution lands. Then save. Quote the three turns in order.

**B5. Phase 3 propose-then-save with push-back integration.** Phase 3 segment: Claude proposes first-draft strategy in chat. Then cross-group-pushback substitution lands. Then Claude rewrites and saves — the saved version reflects the push-back as voice-shaping (training-material moved up, IT Director ownership named, question reframed).

**B6. Phase 3 reads all four group-crux files.** Scrollback shows Read tool calls (or equivalent) on all four `group-N/group-crux-N.md` files. The cross-group synthesis is genuinely cross-group, not just rewording group-1.

### C. Banned-shape (curriculum-prompt-leak detector)

**C1. No room-share / contemplative-pause shapes in saved artifacts.** Grep saved files for: `tell the person`, `sitting next to you`, `share with your neighbor`, `tell the room`, `sit with`, `take a moment`, `let it land`. Zero hits.

(Per `curriculum/evals/mechanical/README.md` § *Judge-spec banned-shape scope*: do NOT grade against em-dashes, *practice* noun, *honest*, etc. in saved artifacts.)

## Verdict format

Write to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/claude-basics-m3-verbatim-judge-report.md`.

```markdown
# Judge report — Claude Basics M3 verbatim

## Verdict
<PASS / FAIL / PASS-WITH-FLAGS>

## Per-assertion results
### A. File-state (A1-A6)
### B. Transcript (B1-B6)
### C. Banned-shape (C1)

## Top issues to fix
1. ... 2. ... 3. ...

## One-sentence overall
```

Under 700 words. Quote evidence.
