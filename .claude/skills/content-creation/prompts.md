# Prompt design rules

Generation-time companion to `SKILL.md` for prompt-block work. Firing-moment authority is `memory/check_prompts.md` + compounded entries (`2026-04-25-prompts-*`, `2026-04-26-platform-bare-paths-renderer-rewrites.md`). This file holds only prompts.md-unique operational mechanics + pointers.

For canonical shape (action lead-in, label with destination, fenced block, no `copy →`, no `*(end of prompt)*`), placeholder ban, back-reference chaining, multi-sample structural enforcement, markdown-shout ban inside fences, runtime-fork paired-divs, runtime-mechanical asymmetry, skill-by-name-not-path: see `memory/check_prompts.md`.

## Agents 101-specific: prompt paths match Builder scope

Every path inside a prompt block must be written relative to wherever the Builder is currently open. The training has two scopes (per `curriculum/CLAUDE.md` § *Material Distribution*):

- **Prework + Module 1** — Builder is open INSIDE the artifact folder (`<training-dir>/prework/`, `<training-dir>/module-1/`). Prompts use **bare filenames**: `snake.html`, `site.html`, `CLAUDE.md`. A `prework/` or `module-1/` prefix here creates the duplicated-path bug (`prework/prework/snake.html`).
- **Module 2 onward** — Builder is open at the training-dir ROOT and stays there. Prompts use **single-segment `module-N/` prefixes** for per-module artifacts (`module-6/orchestrator.md`) and **bare references** for crossmodule artifacts (`memory/`, `sources/`, `agents/`, `CLAUDE.md`). Never deeper nesting, never `../memory/`.

Per-module Builder-reopens were rejected for M2+: every M2+ exercise reads crossmodule artifacts; `../memory/` in every prompt is noisier than `module-N/foo.md` once.

**Prose exception:** prose outside prompt blocks may name files by canonical path (`module-4/residual.md`) for reader orientation even when the prompt below uses a shorter form.

Before shipping any new prompt, ask: where will the Builder be when the student pastes this? Write the path that works from there.

## Output-shape and length

- **Long prompts OK** up to ~1 page. Paragraph structure mandatory for readability.
- **Prefer questions over slots.** If the agent needs simple input, it asks. Don't make the participant edit the prompt.
- **Trust Claude's defaults for output shape.** Don't pad prompts with trailing specifications like *"The file should have a clear title, a Rules section, a Never line, plain markdown, no header block."* Claude infers from role + question set. Specify shape ONLY when the teaching moment depends on it (e.g., a specific scoring format for an eval judge). Otherwise end with destination + "show me before saving." Long prompts look intimidating to business readers and train them to over-specify their own prompts — the opposite of what Module 2 teaches.

## Body discipline

- **Main body = golden path only. Troubleshooting goes elsewhere.** Don't inline *"if sign-in fails…"* / *"if Claude fires all questions at once…"* / *"if you skipped plan mode…"* in the student-facing body. Defensive pre-emptions bloat the happy path and tell the reader *this is going to go wrong*. Right homes: (1) the trainer's live Slack/Teams support channel during delivery, (2) trailing facilitator notes below `<!-- maintainer -->`, (3) the quick reference if the failure mode is generic and reusable. Body reads as calm forward narrative; FAQ-of-edge-cases reads as minefield. Pick narrative.
- **"Add X and regenerate" is a trap.** When X should shape OUTPUT (voice, stance, framing), *"add X"* reads as *"append X as a new section"*. Claude grows a bullet list and calls it done. Instead say: *"rewrite using X as voice-shaping context"* or *"let X change how the output SOUNDS."* Be explicit: is X getting APPENDED (new section) or INTEGRATED (rewritten through X's lens)? Name it.

## Vary closings deliberately

Each closing mechanic has different strengths; pick per exercise:

- **Claude-as-cold-critic** — reproducible, structured, produces an artifact. Use when feedback quality matters. Foreshadows LLM-as-judge.
- **Pair exchange** — social energy, quick, unexpected angles. Use for bonding or when individual domain expertise matters. Variable quality.
- **Group discussion** — collective pattern-finding. Use when the room sees what no one alone can.
- **Solo retro with Claude** — private learning extraction. Good for module debriefs.
- **Show-your-work to the room** — public ownership moment. Use for artifact-producing exercises where the reveal matters.

Don't default to any one. Ask: *what does this exercise actually need — structured feedback, social bonding, collective insight, private extraction, or public ownership?* Then pick. *"Talk to your neighbor"* is not a free pass; neither is *"ask Claude for feedback."*

## Reference

The "Help me build a steering eval judge" prompt in `curriculum/exercises/steering-eval.md`.
