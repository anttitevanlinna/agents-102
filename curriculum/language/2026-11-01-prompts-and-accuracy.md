# Prompts and accuracy passes (Agents 101, Modules 1-6 and 8)

## Prompts: not where the wordiness is

`scripts/prompt-compact.js` drafted a shorter body for each of the 76 prompts these modules use (median 127 words, p90 264). A second, independent read listed any instruction a draft lost. Results: 13 drafts keep every instruction and save 5% of their words (1,421 -> 1,343); 45 lose an instruction (sharpen/add/drop directives, "specific", one-at-a-time order, forcing lines); 13 could not be shortened; 5 changed a token or path. Even the lossy drafts only saved 11%. Nearly every prompt line is a behavioural instruction, so nothing was proposed for approval. Prompt bodies stay gated (check_prompts §22).

## Accuracy: how agents really work

`scripts/accuracy-pass.js` read every page against `curriculum/language/accuracy-brief.md` (platform rules §6, §6d, §7, vocabulary rules §4, §13, §21, the runtime contract, the maintainer's steers) and returned 90 candidate sentences. Each was reviewed by hand: 53 fixed, 37 left (style rather than error, link titles, Cowork's "task" wording, eval "runs", lines already restored for key points). Main fixes: context vs memory, what loads automatically (only the root instructions file; other files when a prompt names them; skills are available, not loaded), a named actor instead of "it", "chat window" to "session", a count error ("a backward planner and a reframer ... pretending to be three"), "later models will" to "may", and forward narration in the compounding lecture.

Key points, 12 simulated students per side: Getting Going, Building Agent Systems, Multi-Agent Systems, Evaluations, Agents Building Agents and Security held or rose (security escalate 8 -> 9, door 9 -> 7). Grounded Output dipped on grounded (6 -> 3) and narrow-beats-broad (11 -> 7); none of its edits touch either point, but the two edits nearest them ("only a model of what usually comes next in language that looks like yours", "describes what it intended, not what is in the file") were reverted to be safe.

Five genuinely uncertain sentences are queued in `2026-11-01-uncertain-pairs.jsonl` for the Module 7 thread's calls page.
