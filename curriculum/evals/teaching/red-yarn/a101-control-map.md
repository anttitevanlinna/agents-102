# A101 control-yarn map (student-facing text only)

Paths: module pages = curriculum/trainings/agents-101/<m>.md; L = curriculum/lectures/, E = curriculum/exercises/, S = curriculum/slides/, P = curriculum/prompts/. "Heading" = the `##` slide. Grid meaning: G1..G8 = the module's grid cell above; "other" = a different control meaning.

## 1. EXISTING CONTROL SLIDES

### M1 (G1 evaluator who cannot be fooled on own material)
- getting-going `## Push back on what the retro missed`: "The LLM is generous to a rules file it just helped write. Push back on anything that doesn't match your sense of the work." G1.
- getting-going `## Get a cold read`: "**Then, use a cold critic.**" ... "Your read outweighs the agent's." G1 plus the cold-critic device.
- getting-going Key Concepts: "Your domain expertise is the test." G1 in other words.
- L what-just-happened `## The report is a hypothesis, not a result`: "Read what comes back as a claim about the work, not a verdict on it... Where it doesn't, yours counts." G1.
- L what-just-happened `## Why the look-back was kind to you`: "the self-report is the same kind of output as the thing reported on." G1.
- L what-just-happened `## The agent generated, you decided`: "Your own knowledge of the subject stood between the generic draft and the page... Only you could catch a wrong line about you, so start with your own profile." This is the G1 sentence, without the word "evaluator".
- E personal-site-with-guardrails Phase 5 note: "LLMs go easy on their own output. If picks come back soft, ask the agent to over-flag with no charity. Or open a fresh task... run the same prompt cold." Phase 7 end: "Push back on anything that doesn't match what you did."
- P a101-m1-debrief-rules-retro: "Assume the rules file is at least 30% wrong or thin"; "don't defend the file as-is." P a101-m1-debrief-cold-critic: "read it cold, with no memory of building it."
- S first-piece-of-the-picture: "Tools, goals, checks, boundaries, and loops come later and depend on it." Names the yarn's parts in advance. S a-file-it-reads-every-time: "That's a guardrail. That's your turn."
- L module-2-prework `## Put a plan before action` (linked from M1 page "Bring to Module 2"): "Ask it for a plan first, then approve or revise it." Other (G2 early).

### M2 (G2 plan first, acts on your approval)
- L module-2-prework `## Put a plan before action` (above). Page Prework: "(3) Plan-mode primer."
- L first-scheduled-agent (title "Demo: 1st scheduled agent"): "propose or draft only, do not send, edit, book, or change anything." G2 plus G4 boundary.
- E build-your-challenge-memory `## Keep the heavy reads under control`: "Ask for a plan first." / `## Build the memory under a plan`: "wait for your approval before it touches files"; "Read the plan... Otherwise approve." G2. Closing: "Ask for a plan on anything that touches many files or compounds over steps."
- E same, prompt build-your-challenge-memory-8: "Don't apply anything yet. Ask me to approve or reject each one." Post: "Reject proposals that miss; the agent applies the ones you approve." Propose-check-apply, in embryo.
- E same, prompts -4 and -2: "Assume at least one of the three has a generic top claim"; "Never pull it in on your own." Self-audit and boundary.
- E same Phase 5: "Citations show whether the agent read the memory or the LLM filled in from training data." Source check (G5 in embryo).
- Page `## Push back on the summary`: "What the agent leaves out is often the signal." G1.
- Page `## Fix the output, then fix the rule`: "Every miss is context the agent still lacks." Other (fixing, not controlling).
- Page `## Next`: "Keep the first version proposal-only: the agent drafts, ranks, or prepares; you decide what leaves the system." G2.
- S three-layers-one-folder: "Sharpen the memory, never the sources, or you lose the evidence." Other (evidence kept).

### M3 (G3 nothing checks the handoffs; the doubt is the missing control)
- Page Big Idea: "Handoffs are where work gets lost, so check them." G3.
- Page `## Nothing here checks any of it`: "The audit reads how your agents handed work to each other. It does not check whether the briefing is true." G3, explicit.
- Page `## The doubt stays. Hold it.`: "The synthesized briefing's correctness stays an open question today." G3, explicit.
- E three-minds-one-synthesis close: "You can't yet tell if the answer is right. That is expected. Name the doubt; don't fix it here."
- L when-to-split-an-agent `## Handoffs are where work gets lost`: "Open the files where one agent handed to the next." E three-retrievers-one-curator end: "Find one number or phrase that the synthesizer dropped or smoothed... Should it have survived?" G5 in embryo (read the file).
- L debugging-stuck-agents `## Sources, processing, boundary`: "Boundary: ... add a human gate, move the risky step from 'do' to 'propose.'" G4 + G2.
- L agent-that-takes-action: "writes the message first and sends only after approval. If the channel is missing or the message needs judgment, the agent stops." G2 on a real outside system.
- P a101-m3-debrief-handoff-rules: "Audit harshly. Diplomatic summaries are a failing grade"; "A seam without evidence doesn't count." Page `## Push back on the summary`.
- Page Bring to M4: "what's the worst thing it could do with that access?"; P three-retrievers prompts: "do not fill from prior knowledge" ([NOT FOUND]). Other (G4/G5 lead-ins).

### M4 (G4 boundaries; what you cannot tell)
- Page Big Idea: "You can't tell if your agent is safe from its output. Run a check; don't wait for certainty." G4 + G1 flip.
- Key Concepts: ""I can't tell" is a real answer." E author-security-skill prompt 1: "An "I can't tell" is a better answer than a confident guess."
- E audit-your-agent Phase 4 + `## Take stock of the loop you ran`: "assess, mitigate, reassess the residual, decide." Phase 4 end: "The risk remains. That is expected. Name it, accept it on record, and stop there."
- L practice-of-risk: `## Assess, then mitigate` (scope, split, filter, gate "human approves", review "a second agent judges"); S reassess-the-residual: "the residual risk is X; if Y happens, we made it less likely, not prevented it" and ""I can't tell" is a real answer. Closing it takes evidence, not a better guess."; S give-it-less; S door-you-dont-open: "The best mitigation is the door you don't open."
- E audit-your-agent `## Escalate to a person when judgment runs out`: "Still not sure? Ask a person." G4 (what you cannot tell).
- Page `## Bring to Module 5` + L module-5-prework: "the missing organisational check was X." G5 bridge.
- P a101-m4-debrief-security-rules: "Be harsher than feels right"; Page push back line: "that residual is too vague, name the file or behaviour." Cookbook R4 repeats the "I can't tell" row.

### M5 (G5 a check has to touch the source)
- Key Concepts: "Asking the agent 'are you sure?' returns another fluent answer. A check has to touch the source." G5, verbatim handle.
- S are-you-sure (`## "Are you sure?" is another fluent answer`) and S why-the-llm-fabricates (in L module-5-prework): "Verification has to leave the generation loop and touch the source."
- L grounded `## The judge names its own limit`; E hallucination-bakeoff Phase 4 prompt: "add a one-line 'Known limit:'". Key Concepts: "The winning judge names its own limit."
- Page `## Notice what the prompt insists on`: "The agent's report says what it intended, the file says what happened." G5 (only place stated).
- Page `## Propose, double-check, apply`: "the agent proposes, you check the proposal against the judge or the source, then the agent applies it." Repeated in L grounded `## In the full agent picture, this is the check`. G2 continued.
- Page `## Which rung has this action earned?` -> supplementary/what-is-an-agent `## The autonomy ladder`: "Not: 'Should I trust the agent?' Better: what is the agent allowed to do at this rung?" Other (G6 prefigured).
- L grounded `## Steering without reading every line`: "A check that goes to the ground lets you steer text you do not read." G5 + G1.
- E hallucination-bakeoff `## Keep the main session blind`: "Don't open it yet." (blind judge, = cold critic). Phase 5: "Write one line... what the judge caught, or what it could not check." Prompt 5 "strict substring match".
- S mostly-right-ten-times: "A full workflow with no check compounds every miss." Page `## Push back on the summary` (one line).

### M6 (G6 you own the yardstick; would you let it act?)
- L new-human-role-in-the-loop `## Would you let it send the mail?`: "What would have to be true before you let the agent hit send?" then recaps M1-M5 as bullets (see 2). G6, explicit.
- `## The human moves one level up`: "design the loop: what the agent can reach, ... what stays fixed, what may change, what gets checked every time, what 'better' means, where the human still belongs"; "draft only, review first, send to yourself first, or automatic when the groundedness judge passes..."; "Some categories never go without a human."
- Key Concepts: "You design the loop and own the yardstick." Repeats in E eval-loop `## Take the judge from object to yardstick` and L the new human role `# ...` opening.
- L evals-as-steering `## A yardstick you rewrite is not a yardstick`: "If the judge moved, the score means nothing." E eval-loop: SHA check, "Never edit judges/groundedness-judge.md", "Spot-check the judge. Mark three claims... yourself before you read its verdicts." P eval-loop-2: judge subagent "Give it no extra rules."
- L when-the-score-stops-moving `## You haven't checked the judge yet`: "Nothing scores the judge." `## A flat score is information about the judge or the work.`
- L new-human-role `## When did you last read one yourself?`: "This check has no instrument, only a date." G6 + G1 returned. `## I drifted too`; `## The better it gets, the less you watch`.
- Page `> The same pattern applies to actions...` (Check the proposal before it becomes the action.). Page Next: "The judge stays fixed."
- L evals-as-steering `## The answer is never "the eval passed"`: "What would have to be true for this eval to be the right one?"

### M7 (G7 who owns it, who uses it)
- L access-is-not-absorption S three-parts-copy: "An agent is context, a boundary, a set of checks and somebody who answers for what it does. The first three copy in an afternoon. The fourth does not copy at all." G7, strongest sentence.
- E design-the-sharing-plan prompt: people plan = "Ownership: named person accountable. Not a role." "Operating: who notices when the outcome metric slips." "Accountability: who decides the candidate is no longer doing the job." "UNASSIGNED — Monday's question." G7, control as roles.
- L access-is-not-absorption `## Each strategy asks something different...`: "someone has to keep it running and answer for it when it is wrong."
- Page `## Debrief`/P a101-m7-debrief-sharing-artifact: "If the people plan had no names, say so plainly"; "If you cannot quote the before-line, do not claim the change." E test-the-sharing-plan: "challenge one thing: is the outcome... really the teammate's outcome, or my builder's wish."
- E share-your-work `## Pick against the outcome`: "*Share the whole agent* is not on the list." Other.

### M8 (G8 each new agent is checked like the first)
- L where-is-this-all-going `## A flywheel, not a graduation`: "a hundred agents is a matter of describing them, one gap at a time, each checked like the first." G8, only explicit instance.
- L where-is-this-all-going `## Your agent can improve your agent`: "The eval loop rewrote a generation tactic from judge feedback while the judge stayed fixed. Point the same loop at one of your agents." G8 via G6.
- E extend-your-system Phase 1: "Run the old and the new version once and compare." Prompt extend-your-system-1: "Rules — carry forward the rules my existing agents follow (cite the memory file for every claim, never invent, ask when a source is thin)"; "Hard lines"; "Show me the file before saving. After I approve..." Phase 4 heading "Run and judge": "Push back in the session"; end "a new agent in agents/ you trust to run again."
- E joint-double-diamond Phase 1-3, prompt -8: "every claim cites file"; "context-manifest... what it carries and what it doesn't" (= known limit); "cross-check"; "agent-set: ...first evaluation or judge" per agent.
- P a101-m8-debrief-flywheel-sharpen + page `## Push back on the summary`: "Name one critique raised in the session that did not change the rewritten file. Quote the critique and the unchanged line." (same move as M5, M7).
- Page Key Concepts: "Parts hold; the model rotates." S parts-hold-model-rotates: "context, tools, boundary, checks, loop, interface."

## 2. CONTINUATIONS (recurring phrases, locations)

- "Push back on the summary" slot: M2 page `## Push back on the summary`; M3 page same; M5 same; M6 same; M8 same. M1 is "## Push back on what the retro missed"; M4 same move as an unheaded line ("Push back where the summary is wrong"); M7 page has no such section (only inside prompt a101-m7-debrief: "when I push back on something specific, use Edit"). Counts of "push back": M1 3, M2 5, M3 4, M4 3, M5 1, M6 2, M7 2, M8 13. Explicit return: M6 `Push back ... "Which rule did you claim to remove but keep under another name? Quote both lines."`, M8 "Quote the critique and the unchanged line." Different wording, same handle.
- "cold": only M1 (`## Get a cold read`, cold-critic prompt, exercise Phase 5 "run the same prompt cold"). Later versions in other words: M5 "Keep the main session blind / Don't open it yet"; M6 judge subagent "and nothing else. Give it no extra rules". Could be one handle: "a reader who didn't write it" (cold).
- "The agent's report says what it intended, the file says what happened": M5 only (`## Notice what the prompt insists on`). Same move without the line: M1 "The report is a hypothesis, not a result"; M3 "Open the files where one agent handed to the next" and prompt "exact filenames git diff would show"; M4 "copy the exact rule text you changed"; M7/M8 "quote the before-and-after line... If you cannot quote the before-line, do not claim the change"; M6 "Which rule did you claim to remove... Quote both lines."
- Propose / check / apply: M2 "proposal-only", "Don't apply anything yet. Ask me to approve or reject"; M3 "sends only after approval", "from 'do' to 'propose'"; M4 gate "(human approves)"; M5 `## Propose, double-check, apply` + L grounded "Have the agent propose. Check the proposal... Then apply."; M6 page quote + "Would you let it send the mail?"; M8 "After I approve". Three wordings: "propose-only", "propose, double-check, apply", "plan first/approve".
- "I can't tell": M4 only (18 hits: Learn bullet, Key Concepts, prompts 1/3, audit prompt, Phase 4 text, S reassess-the-residual, Recipe 4). Returns as phrase in M6 `## Would you let it send the mail?`: "which risks it can't tell (Module 4)"; as "name the doubt" M3; as "not enough evidence" in P a101-m5-debrief ("say 'not enough evidence' instead of smoothing"); as "what it could not check" M5 Phase 5.
- "Known limit": M5 (page bullet, L grounded heading, prompt hallucination-bakeoff-8, exercise text; page "Which rung": "the known limit of the judge"). Same idea M8 "context-manifest... what it doesn't".
- "You are the evaluator / your read wins": M1 "Your read outweighs the agent's", "yours counts"; M6 "When did you last read one yourself?"; M6 Spot-check the judge "Mark three claims yourself". The word "evaluator" appears nowhere in A101 body text; it is verbatim only in supplementary cookbook R1 ("you are the one evaluator you cannot fool on your own content").
- Recap chain: L new-human-role-in-the-loop `## Would you let it send the mail?` lists M1 "Sounds like it came from your world", M2 sources, M3 searches/stances, M4 "Boundaries: what it can read, what it never says, which risks it can't tell", M5 judge. The page links the yarn explicitly.
- "yardstick": M6 only (6 uses), "one level up": M6 only ("YOU, ONE LEVEL UP" in the agent-picture figure too).
- "checked like the first": M8 L where-is-this-all-going only. "Same loop, now pointed at the system itself": M8 Key Concepts.
- "check" as noun: Learn bullet or Big Idea in M3 ("so check them"), M4 ("Run a check"), M5 ("A check has to touch the source"), M7 prework/lecture "the missing organisational check" (M4 Bring to M5), M8 "checked like the first".

## 3. GAPS (existing sentences that could carry the grid meaning by rewording)

- M1: what-just-happened `## The agent generated, you decided`: "Your own knowledge of the subject stood between the generic draft and the page." Carries G1 but is framed as authorship. Also Key Concepts "Your domain expertise is the test." and `## The report is a hypothesis...`: "Where it doesn't, yours counts." Neither names the role or says it persists past M1; the cold critic is not named as the control.
- M2: Page What You'll Learn: "**Review** a plan before the agent acts." and L module-2-prework "Use it when the next step may write several files or edit anything you care about. Skip it for quick one-turn work." Plan-first is taught as workflow hygiene ("Keep the heavy reads under control"). Rewording these two could state "the agent plans, you approve, it acts".
- M3: page `## Nothing here checks any of it` already carries G3. Weaker: lecture when-to-split-an-agent `## Handoffs are where work gets lost`: "Open the files where one agent handed to the next. That is where to look." and E three-minds-one-synthesis "Name the doubt; don't fix it here." Both say where to look but not "no one is checking this; that is the missing control". Also debugging-stuck-agents "Boundary: ... add a human gate" is control language placed under debugging.
- M4: Page `## Bring to Module 5` ("the missing organisational check was X") and E audit-your-agent "The uncomfortable feeling is the evidence" are close; the grid's "what you cannot tell" fits "Still not sure? Ask a person." already.
- M6: `## Take the judge from object to yardstick` carries G6; the "would you let it act" question appears once (L new-human-role). Page Key Concepts "You design the loop and own the yardstick." could take the question.
- M7: S three-parts-copy: "An agent is context, a boundary, a set of checks and somebody who answers for what it does... Accountability is the part with a name on it" and E design-the-sharing-plan "Operating: who notices when the outcome metric slips." Both are G7. Gap is the Key Concepts line "The absorption bottleneck... access is a switch", and the page Debrief ("Who gets your context, who gets a skill...") which speak only of adoption/trust (8 uses of "trust", all adoption).
- M8: L where-is-this-all-going `## Every improvement is learning that compounds`: "Each fix an agent makes to another agent stays on disk"; E extend-your-system Phase 4 "Spot-check the output for its weakness"; Take-stock "The next gap gets a new agent in 25 minutes". These praise speed; the control (judge/hard lines/approval) is in the prompt only. "each checked like the first" lives in one late sentence.
- M7/M8 pages have no "known limit" or "I can't tell" echo; M7 page has no "Push back on the summary" heading.

## 4. FIGURES

- No SVG/mmd in agents-101 module pages. Inline SVG only via `{{figure:...}}`.
- A101 uses one: figures/agent-picture.md in L new-human-role-in-the-loop `## The full picture, and what it is made of` (M6 closer). Shows the loop, a dashed BOUNDARY wall, "ALLOWED?" gate, KEPT BACK (send mail, payments, salary sheet, private notes), "YOU, ONE LEVEL UP", footer "Inside the wall is what you give it. Outside is what you keep back." No judge/check node drawn. Also used in a claude-basics variant? Only mentioned: claude-basics personal-site-with-guardrails cites the A101 lecture "minus its agent-picture slide".
- figures/delegation-frontier.md (reach x calibration; chat-shaped work, controlled assistance, reckless autonomy, calibrated agency; "frontier" curve) is not in A101. AE101 uses it twice: L when-a-plan-is-good `## What you can test and check sets your complexity ceiling` (plan-mode-done-right, AE101 M2) and L the-gate-is-a-claim closer (learn-from-the-test, AE101 M5).
- Other figures (map-engine*, double-loop*, student-closed-loop, session/skill-sea-passage, instructions-route, pocock-skill-system) are not A101-linked; student-closed-loop, double-loop, map-engine-filled are AE101 lectures. Not read.
- A101 text-only equivalent: supplementary/what-is-an-agent `## The autonomy ladder` (six rungs, "earn the next rung"), linked from M5 page.

## 5. Best common handle and counts

Counts (prose + prompts, module pages + linked lectures/exercises/slides/prompts, figure SVG excluded; module-N-prework counted with N; files counted once). Format M1..M8:
- check: 1, 10, 8, 29, 42, 21, 4, 19 (total 134)
- push back: 3, 5, 4, 3, 1, 2, 2, 13 (33)
- judge: 0, 0, 1, 7, 43, 104, 1, 8 (164, but 147 in M5-M6)
- approve: 0, 7, 1, 1, 1, 0, 0, 1 (11)
- verify: 0, 1, 0, 1, 3, 1, 0, 0 (6)
- control: 0, 4, 0, 11, 0, 0, 0, 0 (15; mostly "company controls", "planning control", "under control")
- trust: 0, 0, 1, 2, 1, 1, 8, 2 (15; M7 8 are adoption trust)
- residual (M4 22), "can't tell" (M4 18 of 22), "known limit" (M5 5), "cold" (M1 5).

Best handle: **"check"** (as a noun, "the check"). It is the only candidate present in all eight modules (1 in M1, 4 in M7 are the thin spots, which matches where the grid is weakest). It is already the grid's own word: "Run a check; don't wait for certainty" (M4 Big Idea), "A check has to touch the source" (M5), "so check them" (M3), "the missing organisational check" (M4 to M5 bridge), "checked like the first" (M8), "what gets checked every time" (M6). "Judge" is M5-M6 jargon (147 of 164), "control"/"approve" are rare or mean something else, "trust" is adoption in M7, and "push back" is the gesture (33, in every module) rather than the thing. Pair: you check; push back is how.
