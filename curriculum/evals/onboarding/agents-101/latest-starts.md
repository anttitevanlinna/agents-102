# Agents 101 first-start impressions

**Simulated verdict: 3/5 stars.** 29 of 30 reads gave 3 stars; 1 gave 4; none gave 5. Descriptive mean: 3.0/5.

Ten personas, three independent cold model calls each. Each call receives the same selected HTML and question, without previous answers. Cowork access and Claude Desktop installation are assumed. Scope is the imagined route to the first game, not the whole prework or training. No app actions, file generation, game play or human timings were observed.

| Persona | Attempt 1 | Attempt 2 | Attempt 3 | Predicted getting going |
| --- | --- | --- | --- | --- |
| Novice business leader | 3 | 3 | 3 | yes / yes / yes |
| Product operations leader | 3 | 3 | 3 | yes / yes / yes |
| Technical builder | 3 | 3 | 4 | yes / yes / yes |
| Cautious HR leader | 3 | 3 | 3 | yes / yes / yes |
| Skeptical finance leader | 3 | 3 | 3 | yes / yes / yes |
| Solo consultant | 3 | 3 | 3 | yes / yes / yes |
| Browser-first marketing user | 3 | 3 | 3 | yes / yes / yes |
| Regular Cowork user | 3 | 3 | 3 | yes / yes / yes |
| Windows office user | 3 | 3 | 3 | yes / uncertain / yes |
| Impatient ten-minute skimmer | 3 | 3 | 3 | yes / yes / yes |

Scale: 1 cannot start; 2 needs substantial help; 3 gets going with detours; 4 clear with minor hesitation; 5 quick and obvious throughout.

## What the readers keep noticing

- Copy-ready prompts and a concrete game make starting feel possible.
- The first visible result comes after folder setup, connector decisions, a download, extraction and configuration. Readers repeatedly ask to reach the game earlier.
- The Cowork folder-instructions step names what to enter but gives no location for the setting. Readers describe hunting, guessing or skipping it.
- Shell, tarball and CLAUDE.md language makes several nontechnical readers wonder whether they are doing the setup correctly.

These are reported perceptions. Connectors have a real keep-going fallback; readers sometimes overlook it or describe the step as compulsory. The shell command is for the agent. The CLAUDE.md cue and Cowork folder setting serve different purposes even when readers perceive duplication. A suggested game-first route would still need to create its output folder.

## Reactions

**Novice business leader, attempt 1 (3/5):**

> I'd get going, but not feel snappy. The game is a nice, concrete goal, yet I'd be stuck behind a folder path, a tarball download, a shell command and a CLAUDE.md instruction I don't understand before I get to it. I'd keep wondering whether I was doing it right.

**Technical builder, attempt 1 (3/5):**

> The route is clear and linear, so I would get going without help. But it's not snappy. I am a fast builder and want the snake game in about two minutes, and instead I do admin first: connectors, a download, a tarball, and a settings step I have to find myself. I'd likely jump ahead to step 4 and come back to the setup later.

**Windows office user, attempt 2 (3/5):**

> I'd probably get there, but it wouldn't feel snappy. The tilde path and the tar/shell wording make me feel this wasn't written for me, and the snake game is buried behind setup I don't understand. I'd be anxious about breaking something.

**Impatient ten-minute skimmer, attempt 1 (3/5):**

> I'd probably start, since the steps are concrete and the copy buttons help. But the setup chores keep pushing the fun bit away, and I'd hit the CLAUDE.md and folder-instructions jargon with no idea where to click. It feels fine, not snappy.


Predicted willingness: 29 yes, 0 no, 1 uncertain. This is self-report from simulated readers. The skimmer predicts starting while also saying the ten-minute limit could prevent reaching the game. The Windows reader gives 3 stars while one attempt is uncertain about starting. Preserve these tensions; do not turn them into a learner completion rate.

## Variation and evidence

Nine personas give 3/3/3. The technical builder gives 3/3/4. Repeating the question changes wording more than scores in this batch. All calls use the same model family, so agreement does not establish independent human agreement or a success probability. The request explicitly asks about hesitation, so this is a critical reading rather than a neutral satisfaction survey.

Model: claude-sonnet-5-5. Source revision: e59d9b70c4446a15f9e09e8edfa285d71fae7505. Source HTML SHA-256: 3264801c72d0428e04050f09662857e7394eb91b92d7c93cadd137daf3d889ad. Selected HTML SHA-256: 5171bc1f1ddffb4cb7bab4f1f4e79ae2645d07b50123f9233ce06521997e96b9.

Raw evidence: curriculum/evals/onboarding/agents-101/out/html-ratings-56837357-b4ad-4d0c-ad52-84c1fb9d438c. It contains startup.html, question.txt, personas.json, all 30 input prompts/replies and CLI receipts. [Structured results](latest-starts.json) preserve each judgement.

The HTML selection retains navigation, cover, Start and Prework, applies the Cowork visibility state, and withholds initially closed Pause/Resume contents. Linked later reading remains outside the excerpt. This tests reading the startup material, not painted visual discoverability.

An earlier 30-read batch is retained at curriculum/evals/onboarding/agents-101/out/html-ratings-f5ad99e0-c528-4256-8de4-df2eaec79aa2. Its JSON format example contained a numeric 3-star score. This report uses a fresh batch with that example removed; the HTML, personas, scale and substantive question stay the same.
