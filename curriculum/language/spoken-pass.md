# Spoken pass (Agents 101 → AE101 bar)

Not student-facing. Wording pass run 2026-11-27 on Modules 1-6 after the compaction passes. Sibling of `rewrite-rules.md` (cuts); this one decompresses.

**Why.** Lints green, text still hard. Compaction overshot: A101 median sentence 8 words vs AE101 10; "you" in 24% of sentences vs 31%. Shorthand, not length, is the defect. Do not answer it with another cut.

**Test per sentence.** Would a proficient agentic business person say it out loud to a colleague? No → rewrite as speech.

**Four defects, in hit order**
1. Shorthand nobody says: verbless stacks, semicolon chains, "X in, Y out" slogans → subject + verb + object; split at the semicolon.
2. No actor: "gets absorbed", "the rise can be believed" → name who acts: the agent, the judge, the helper, you. Repeat the noun over "it".
3. Coined word before it is earned (tactic, roster, lens, kernel, seam, goal-nudger, noise) → plain word, or one explaining clause at first use. Prompt vocabulary stays matched: body does not rename what the prompt names (Beat stays Beat).
4. Body disagrees with prompt: body promises an output the prompt never writes, or previews the prompt clause by clause → read the prompt body first; lead-in = the ask + what the student does with the answer.

**Keep**
- Maintainer's first-person lines verbatim. Locked sentences.
- Lead-in tells the student to run the prompt; never restates it (`compounding.md` maintainer note 2026-08-29).
- Student acts through the agent: "ask the agent to show", not "open the file and edit".
- Unease stays open, never declared. No "your gut", no "the uncomfortable feeling".
- Longer is allowed when it buys a subject or a verb; changed text grew ~10%.

**Procedure per module**
1. `node scripts/read-training.js agents-101 --modules <slug>`; read as the stranger.
2. Skim each `prompts/<key>.md` body the page leads into.
3. Edit student body only; update maintainer notes that name a renamed header.
4. `node scripts/gates.js`; `node scripts/check-new-sentences.js --update`; commit with the index.
5. Before/after pairs for the maintainer: project files `language-pass/pairs.py <repo> <base> <head> <files>` → review page. Never report the pass as good from scores; show pairs.

**Not covered here.** Prompt bodies (gated, `prompt-ok`), step order and structure, Prework / Bring / Next blocks, supplementaries, Modules 7-8.
