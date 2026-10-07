## "Are you sure?" is another fluent answer
<!--slide:another-fluent-answer-->

When something comes back and you can't tell whether it is grounded, the cheap move is to ask the agent. Are you sure? Check that again. What comes back is another answer from the same place the first one came from, in the same confident voice.

Large language models generate the next likely word. Not the next true word; the next likely one. They're trained on text where people spoke confidently, cited specifically, wrote fluently, and the models learned to produce language that looks like all of that, whether the underlying material supports it or not. Fluency is not evidence. Confidence is not correctness. The model has no way to tell you which parts of its output are grounded and which are plausible-sounding fill.

If a model stopped making things up on your sources, what would your judge show?

<!-- maintainer -->

**STATUS:** APT101 rewrite of `grounded` § "Are you sure?" is another fluent answer (Agents 101), 2026-10-07, Day 2 § Fluent is not true. Id differs from the home's `are-you-sure`: that file is the Agents 101 slide itself, so this rewrite takes its own name. Not taught (simulation training). Owes judging rounds.

**Carried from home:** the first two paragraphs, word for word. The home's closing prediction (not a bug patched in the next release; later models fabricate less and won't stop) is replaced by a question the trio can answer with the judge it kept in `apt101-catch-it-making-things-up`, which this lecture follows. The question asks what evidence would change their mind; the slide makes no forecast about models.

<!-- backing -->

**Claims**
- `next-likely-word` · vision · "Large language models generate the next likely word. Not the next true word; the next likely one." ← none-owed — `grounded` § "Are you sure?" is another fluent answer, word for word.
- `fluency-not-evidence` · vision · "Fluency is not evidence. Confidence is not correctness." ← none-owed — same home, word for word.
- `judge-answers-the-forecast` · vision · "If a model stopped making things up on your sources, what would your judge show?" ← none-owed — a question, no claim; points at the judge from `apt101-catch-it-making-things-up`.

**Frameworks**
(none.)

<!-- /backing -->
