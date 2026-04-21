**Context:** Self-study skill design — surfaces / context-switching. Raised live during 2026-04-21 test session.

**Signal:** Three surfaces (Teacher Claude / Builder Claude / localhost site) is one too many. Antti, using Teacher as the main hub, noticed the jumping cost. The site as live teaching surface duplicates what Teacher can do better — read canonical lecture files inline, paced, with mood-arc commentary.

**Reframe:** **Site = recap surface, not teaching surface.** Teacher reads lectures verbatim from disk and surfaces them in chat (paced, with one live sentence between sections, no paraphrase). After each lecture and each exercise, Teacher gives a recap link to the official rendered page so the student sees what they just lived through, on the official material. End-of-module: link to the full module page. The site becomes the *artifact of progress*, not the *medium of instruction*.

**Why this works:**
- One fewer jump per teaching beat (Teacher → Builder, not Teacher → site → Builder)
- Mood arc lands live (Teacher witnesses; the page can't)
- No localhost fuss in flow
- Site keeps existing for trainer-led cohorts, optional re-read, Antti's editorial review
- Student still sees the official material — just after living it

**What changed in repo:**
- `.claude/skills/self-study/SKILL.md`: C2/C3 section rewritten — Teacher reads inline, gives recap link after each lecture/exercise/module. Setup step 7 reframed as "recap server." "Don't lecture" do-not rule rewritten as "Don't paraphrase the lecture; read it verbatim."
- `curriculum/trainings/bootstrap/prework.md`: server-start step reframed as "recap site" with new "Prompt" presentation shape.
- New canonical Prompt presentation rule added to both SKILL files (label + action hint + fenced block).

**Open contradiction worth noting:** Self-study now has Teacher auto-start the server in setup step 7, but prework.md still has the student "ask Claude to start the server" as their first agentic move. In trainer-led mode the student does it; in self-study, Teacher already did. Either rewrite prework to handle both paths cleanly or have Teacher in self-study walk the student through running the prompt themselves (preserving the teaching moment) instead of pre-starting. Decide later.
