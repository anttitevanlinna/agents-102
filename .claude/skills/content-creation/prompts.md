# Prompt design rules

Loaded when writing any prompt block a student copies. Firing-moment compendium: `memory/check_prompts.md` (ship-time check); this file is the canonical generation-time source.

- **Canonical presentation shape — action lead-in, label with destination, blank line, fenced code block.** Every prompt the student is meant to copy ships in this shape, in both module/exercise files and Teacher Claude's chat:

  ```
  Ask Claude to <one-sentence semantic summary of what the prompt does>.

  **Prompt** *(Claude Code)*

  ​```
  <prompt content>
  ​```
  ```

  The **action lead-in** is a single sentence with a command verb (*Ask Claude to…*, *Have Claude…*, *Run X against Y*) summarizing what the prompt achieves. Under 20 words. Prompts get copy-pasted and often run before being fully read; the lead-in is what the skimming student sees.

  The **label** is `**Prompt**` followed by an italic `*(<destination>)*` parenthetical naming where the prompt is pasted: `*(Claude Code)*`, `*(Builder Claude)*`, or with a context note after a comma — `*(Claude Code, fresh session after /clear)*`, `*(Builder Claude, final move of the module)*`. The site renderer turns the label + the following fence into a chrome-wrapped block with a Copy button and a destination chip in the header; in plain markdown chat surfaces (Teacher Claude), the bold label + fenced block carry the same visual chunking. **Do not write `copy → ` inside the parenthetical** — the rendered Copy button IS the copy affordance, and chat readers don't need the instruction either. **Do not write a closing `*(end of prompt)*` line** — the rendered chrome (or, in chat, the closing fence) marks the boundary; the closer is dead weight.

  **Don't** lead in with mechanical narration like *"Now paste this:"* or *"Try this prompt:"* — the label carries the mechanical affordance. The action lead-in above is semantic (*what the prompt does*), not mechanical (*what the student does*); both the semantic lead-in and the mechanical ban hold together. Don't wrap prompts in blockquotes (`>`), inline backticks, or naked indentation. Path-A / Path-B branches: label the path first, then the prompt block under it. After the fenced block, name the expected return shape in one line if it matters (*"Builder writes a file called X and tells you so"*).

- **Match prompt paths to Builder scope — no duplication.** Every path inside a prompt block the student pastes must be written relative to wherever the Builder is currently open. Concretely:
  - **Prework + Module 1** — the Builder is open INSIDE the folder that holds the artifacts (`<training-dir>/prework/` for prework, `<training-dir>/module-1/` for M1). Prompts use **bare filenames** here: `snake.html`, `site.html`, `CLAUDE.md`. A `prework/` or `module-1/` prefix inside one of these prompts would create a duplicated-path bug (`prework/prework/snake.html`).
  - **Module 2 onward** — the Builder is open at the training-dir ROOT (per self-study SKILL.md seam 3) and stays there. Prompts use **single-segment `module-N/` prefixes** for per-module artifacts (`module-6/orchestrator.md`) and **bare references** for crossmodule artifacts (`memory/`, `sources/`, `agents/`, `CLAUDE.md`). Never deeper nesting, never `../memory/`. This shape matches where files actually live from the Builder's perspective and produces the shortest correct prompt.
  - **Why per-module Builder-reopens were rejected for M2+:** every M2+ exercise reads crossmodule artifacts; `../memory/` in every prompt is noisier than `module-N/foo.md` once.
  - **Prose exception:** prose outside prompt blocks may name files by their canonical path (`module-4/residual.md`) for reader orientation even when the prompt below uses a shorter form.
  - **The failure mode this catches:** path duplication from mismatch between Builder scope and prompt path. Every new prompt: where will the Builder be when the student pastes this? Write the path that works from there.

- **Chain prompts by back-reference and deterministic path, never by invented alias.** When a prompt chains on a file an earlier prompt wrote, include the back-reference anchor (*"the file you just created at `notes/X.md`"*) and the deterministic path. Without the anchor, a filename drift between the two prompts lets Claude silent-create a second file and paper over the inconsistency. Without a deterministic path (*"your personal rules file"* instead of `./CLAUDE.local.md`), the chain isn't harness-testable and fails the same way under real-session drift. Back-references are load-bearing: they force the model to reconcile its memory of what it wrote against the path asked for, and they make the chain greppable. Prefer scrollback-review chains (*"review this session end-to-end"*) when possible — transcript is always the authoritative memory; filenames are the fragile one. Fuzzy fallbacks (*"if the file doesn't exist, create it"*) are fine when the intent IS first-create-or-extend (e.g., `CLAUDE.local.md` at birth); harmful when used as filler, because they license silent repair of upstream filename drift.

- **No placeholders mid-prompt.** Don't write `[BRACKETS]` inline that the participant must find-and-replace. Not `[paste or attach]`, not `[your content]`, not `[DIMENSION NAME]` — none of these belong inside a prompt block the student is supposed to copy. Inline editing in Claude Code is tedious. **Every placeholder inside a code fence is a rule violation; check every prompt block you ship.** Handle variable content one of three ways:
  1. **Conversation before** — Claude asks for the values, then assembles the prompt internally
  2. **Conversation after (preferred for simple input)** — the prompt instructs Claude to ask the participant for the values in turn
  3. **Copy-paste right after the prompt** — user copies the prompt, then pastes the data (or attaches a file) as a separate step. The prompt references "the X I just shared" or "the X I'll paste next."

- **Long prompts OK** up to ~1 page. Paragraph structure mandatory for readability.

- **Prefer questions over slots.** If the agent needs simple input, it asks. Don't make the participant edit the prompt.

- **Trust Claude's defaults for output shape.** Don't pad prompts with trailing specifications like *"The file should have a clear title, a Rules section, a Never line, plain markdown, no header block."* Claude infers that from the role and the question set. Specify shape ONLY when the teaching moment depends on it (e.g., a specific scoring format for an eval judge). Otherwise end with destination + "show me before saving." Long prompts look intimidating to business readers and train them to over-specify their own prompts — the opposite of what Module 2 teaches.

- **Main body = golden path only. Troubleshooting goes elsewhere.** Don't inline "if sign-in fails with admin approval, ask IT…" or "if Claude fires all questions at once…" or "if you skipped plan mode by accident…" in the student-facing body. Those are defensive pre-emptions that bloat the happy path and tell the reader *this is going to go wrong*. The right homes for them: (1) the trainer's live Slack/Teams support channel during delivery, (2) the trailing facilitator notes below `<!-- maintainer -->` where watch-fors already live, or (3) the quick reference if the failure mode is generic and reusable. When the body reads like a calm, forward-moving narrative — ask, paste, watch what lands — the student stays in the flow. When it reads like a FAQ of edge cases, the student reads it as a minefield. Pick narrative.

- **"Add X and regenerate" is a trap.** When X should shape the OUTPUT (voice, stance, framing), "add X" reads as "append X as a new section." Claude will grow a bullet list and call it done. Instead say: "rewrite using X as voice-shaping context" or "let X change how the output SOUNDS." Be explicit: is X getting APPENDED (a new section) or INTEGRATED (the whole thing gets rewritten through X's lens)? Name it.

- **Vary closings deliberately.** Each mechanic has different strengths; pick per exercise:
  - **Claude-as-cold-critic** — reproducible, structured, produces an artifact. Use when feedback quality matters. Foreshadows LLM-as-judge.
  - **Pair exchange** — social energy, quick, unexpected angles. Use for bonding or when individual domain expertise matters. Variable quality.
  - **Group discussion** — collective pattern-finding. Use when the room sees what no one alone can (multi-agent, cross-pollination exercises).
  - **Solo retro with Claude** — private learning extraction. Good for module debriefs.
  - **Show-your-work to the room** — public ownership moment. Use for artifact-producing exercises where the reveal matters.

  Don't default to any one. When designing a close, ask: *what does this exercise actually need — structured feedback, social bonding, collective insight, private extraction, or public ownership?* Then pick. "Talk to your neighbor" is not a free pass; neither is "ask Claude for feedback."

- Reference pattern: the "Help me build a steering eval judge" prompt in `curriculum/exercises/steering-eval.md`.
