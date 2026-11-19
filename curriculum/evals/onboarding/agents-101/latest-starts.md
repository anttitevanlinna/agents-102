# Agents 101 first-start impressions

**Simulated verdict: 4/5 stars.** All 30 reads gave 4 stars and predicted getting going. None gave 5. This is a content-reading judgement, not a learner completion rate.

Ten personas, three independent cold calls each. Claude Desktop installation and Cowork access are assumed. Readers also assume the described video demonstrations are available, as requested. The release currently has text placeholders for those videos.

| Condition | Mean stars | Distribution |
| --- | --- | --- |
| Original order | 3.03/5 | 29 × 3, 1 × 4 |
| Game first, assumed videos | 3.80/5 | 6 × 3, 24 × 4 |
| Game first, plain folder/file directions, assumed videos | 4.00/5 | 30 × 4 |

Order, wording and the video assumption change together. The comparison does not isolate which caused the score difference.

| Persona | Attempt 1 | Attempt 2 | Attempt 3 | Predicted getting going |
| --- | --- | --- | --- | --- |
| Novice business leader | 4 | 4 | 4 | yes / yes / yes |
| Product operations leader | 4 | 4 | 4 | yes / yes / yes |
| Technical builder | 4 | 4 | 4 | yes / yes / yes |
| Cautious HR leader | 4 | 4 | 4 | yes / yes / yes |
| Skeptical finance leader | 4 | 4 | 4 | yes / yes / yes |
| Solo consultant | 4 | 4 | 4 | yes / yes / yes |
| Browser-first marketing user | 4 | 4 | 4 | yes / yes / yes |
| Regular Cowork user | 4 | 4 | 4 | yes / yes / yes |
| Windows office user | 4 | 4 | 4 | yes / yes / yes |
| Impatient ten-minute skimmer | 4 | 4 | 4 | yes / yes / yes |

Scale: 1 cannot start; 2 needs substantial help; 3 gets going with detours; 4 clear with minor hesitation; 5 quick and obvious throughout.

## What the readers notice

The route to the first result is short: create the training folder, start a Cowork task, paste one request, open and play the game. Downloading the starter, setting the reading cue and using a calendar come afterward.

Remaining hesitation centres on finding New task, choosing a folder in Cowork, knowing what completion looks like, and opening the saved HTML file. Several readers rely on the assumed demonstrations. The later archive and folder-instruction step still looks technical. Native click paths and permission behaviour remain unobserved.

## Reactions

**Novice business leader, attempt 1 (4/5):**

> I think I'd get my game fairly quickly. The path is short, the prompt is copyable, and the double-click payoff is concrete. The one place I'd slow down is the Cowork step, since I've never done it and a single sentence is all I get. If the video really covers it, I'm fine. If not, I'd poke around the app for a bit. I wouldn't give up, though.

**Windows office user, attempt 1 (4/5):**

> Pretty straightforward. Folder, task, paste, play. I felt I could get the game going without help. The main friction was small things: Mac wording, not knowing exactly where 'New task' is, and the scary Unix material right below the game step. Not quite snappy-and-obvious, but close.

**Impatient ten-minute skimmer, attempt 1 (4/5):**

> Pretty good. The route is short: one folder, one task, one paste, then I'm playing snake. I'd get there inside ten minutes. The only friction is the setup before the first prompt and not knowing exactly what 'beside' means. I'd keep going because the payoff looks close.

## Evidence and limits

All calls use claude-sonnet-5-5. Numeric variation is zero in the latest batch; narratives vary. These are synthetic personas from one model family, not 30 independent humans. No app actions, game play or elapsed start times were observed in these reads. The question explicitly requests hesitation, so it is a critical reading rather than a neutral satisfaction survey.

The selected HTML retains navigation, cover, Start and Prework in the Cowork visibility state. Hidden runtime alternatives and initially closed panel bodies are omitted. Linked later readings exist outside the excerpt. This tests the startup content, not its painted visual discoverability.

The Mac/Windows picker was added after the 4-star reads. Its detection, local override, persistence and captions have automated and browser checks. It has no separate persona rating.

Rated HTML SHA-256: 6cef4e4687ca4265836a4a0978062330b883cb8b58baca658065eab3b8aeaa8f. Selected HTML SHA-256: 8c30f20ec549a0d56f7d259177b78ef0218ab738fc966f454dd1f347d89a973c.

Raw evidence: curriculum/evals/onboarding/agents-101/out/html-ratings-cb6c76dd-a60f-4f25-aae1-c4ccd910ae2b. Each condition retains startup.html, question.txt, personas.json, prompts, replies and CLI receipts under its evidence directory. [Structured results](latest-starts.json) retain all 30 current judgements, source hashes and earlier condition locations.
