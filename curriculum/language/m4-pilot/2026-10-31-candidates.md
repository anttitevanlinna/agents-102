# M4 rewrite candidates, 2026-10-31

Source: persona-student M4 pilot, original page 88b4d019 (12 logs, 3 personas, live and page-only). Ranked by how many personas went dead on the sentence. Options are proposals: no pair reviewer agrees with the maintainer well enough to pick (see `../pair-review/`). Candidates go to the batched calibration list; nothing here is applied. Several surviving candidates may still be lines past calls kept (permission lines such as the grill warning); whether sim-driven rewrites reach the maintainer at all waits on the rubric batch, section 1.

## 1. trainings/agents-101/security.md#prework

**Now:** The Module 4 prework adds two reads: (1) personal skills as the package format that carries expertise into your agent, (2) agent risk layered on top of normal security work.

Dead 11, lift 0, personas: cfo-sceptic, cto-builder, ingrid.

Students said:

- cfo-sceptic (boredom): nothing new
- cfo-sceptic (boredom): nothing new. It's a reading list.
- cto-builder (boredom): nothing new, more reading homework

Diagnosis: The sentence announces that two more reads exist and describes them in abstract nouns (package format, layered risk), so it adds homework without telling the reader anything they can use or want.

Options:

- The Module 4 prework adds two reads: personal skills, and agent risk on top of normal security work.
- CUT

## 2. exercises/audit-your-agent.md#phase-1-load-the-reusable-check

**Now:** Type `/` in the prompt and look for `/security-audit` in the autocomplete list.

Dead 5, lift 0, personas: cfo-sceptic, cto-builder, ingrid.

Students said:

- cfo-sceptic (boredom): nothing new
- cfo-sceptic (boredom): nothing new
- cto-builder (boredom): nothing new, check the skill loaded

Diagnosis: The sentence is a routine UI check that readers already know how to do, so they flag it as nothing new; the next sentence ('That means the skill loaded') already gives the result.

Options:

- CUT
- Type `/` and look for `/security-audit`.

## 3. lectures/agent-loop-raw.md

**Now:** A tool call is not a new species of work.

Dead 5, lift 0, personas: cfo-sceptic, cto-builder, ingrid.

Students said:

- cfo-sceptic (boredom): The agent writes a command and the system runs it. Fine, but I don't see the cost or the risk in it.
- ingrid (boredom): A tool call is just text that the runtime turns into an action, so the boundary is where risk sits. It's a useful framing, but a detour from my pricing decision.
- cfo-sceptic (boredom): The agent writes text and the system turns it into actions. That's fair enough.

Diagnosis: The sentence is a figure of speech ('new species of work') that restates the mechanism the slide just explained, and readers already at home with tool calls hear it as a flourish with no claim, cost or risk attached.

Options:

- CUT
- A tool call is text. The runtime makes it an action.

## 4. lectures/practice-of-risk.md#certainty-is-a-fantasy-you-inherited

**Now:** The story works because classical software is deterministic (same input, same output).

Dead 4, lift 0, personas: cfo-sceptic, cto-builder, ingrid.

Students said:

- cto-builder (boredom): nothing new, determinism vs not
- cto-builder (boredom): nothing new. deterministic software vs agents is old news for my engineers
- ingrid (boredom): nothing new, I know old security was deterministic

Diagnosis: The sentence states the determinism premise this audience already holds, so it adds no new information and only sets up a contrast they can see coming.

Options:

- CUT
- The story works because classical software repeats itself: same input, same output.

## 5. lectures/practice-of-risk.md#the-discipline-is-what-carries (WITHDRAWN: protected)

Withdrawn. The file's maintainer block records this line as the Module 4 mood contract, taken from the content strategy on purpose. The step now skips sentences a maintainer block quotes. Kept below for the record only.

**Now:** Damn, this is complex stuff.

Dead 3, lift 0, personas: cfo-sceptic, cto-builder, ingrid.

Students said:

- cfo-sceptic (frustration): Nothing new. It is rhetoric, with no figure attached.
- cfo-sceptic (frustration): nothing new. It's a pep talk, and still no figure for what this costs.
- cfo-sceptic (frustration): nothing new

Diagnosis: The line is a mood beat that repeats what the slide already says (the loop is hard, the discipline carries) and gives a sceptical reader no fact, so it reads as a pep talk.

Options:

- CUT
- This is complex, and the next agent will be too.

## 6. exercises/audit-your-agent.md#separate-prototype-from-production

**Now:** You must do the work.

Dead 3, lift 0, personas: cfo-sceptic, cto-builder, ingrid.

Students said:

- ingrid (boredom): nothing new, it's two lines with no content
- ingrid (boredom): nothing new. It's a thin point with no substance behind it.
- ingrid (boredom): Nothing new. Production needs more than one mitigation.

Diagnosis: 'You must do the work' is a bare command that adds no content: the slide has already said risk control separates prototype from production, and 'the work' names no work, so the reader gets an order with nothing to do.

Options:

- CUT
- One mitigation is a start. A production agent needs one for each risk.
- Repeat this for every risk you found, not just one.

## 7. trainings/agents-101/security.md#bring-to-module-5

**Now:** Come to Module 5 without the two missing-check sentences and you'll be reconstructing them while the benchmark is already comparing detectors.

Dead 3, lift 0, personas: cfo-sceptic, cto-builder, ingrid.

Students said:

- cto-builder (boredom): homework: one sentence per case. I'd probably skip it and catch up live
- cto-builder (frustration): Homework: one sentence per case. I'd probably skip it.
- ingrid (frustration): Homework with a mild threat attached, and I'm not sure what the two cases are yet.

Diagnosis: The sentence reads as a threat attached to homework, and the 'two cases' it points at aren't named on the slide, so students feel nagged and shrug it off.

Options:

- CUT
- Skip the two sentences and you'll be catching up during Module 5.
- Without the two sentences, you'll be catching up while Module 5 moves on.

## 8. exercises/author-security-skill.md#answer-the-grill-then-sharpen-the-lenses

**Now:** Push back until the report shape is narrow enough that you will actually read it on Monday.

Dead 2, lift 0, personas: cfo-sceptic, cto-builder, ingrid.

Students said:

- cfo-sceptic (boredom): nothing new
- cto-builder (boredom): nothing new, iterate the output

Diagnosis: It is the third 'keep iterating' instruction in a row, so after 'Iterate in place' it adds nothing new, and the Monday-read test is a nice image buried in a long clause.

Options:

- CUT
- Push back until the report is short enough to read on Monday.

## 9. exercises/author-security-skill.md#take-stock-of-the-packaged-check

**Now:** The policy files are source material.

Dead 2, lift 1, personas: cfo-sceptic, cto-builder, ingrid.

Students said:

- ingrid (boredom): nothing new, it restates that the skill is the expert
- ingrid (surprise): What I built today is a check, not a prompt, and it still works next week.
- ingrid (boredom): nothing new, a summary of what I just did

Diagnosis: The sentence sets up a source-versus-expert contrast that the next two lines restate, so it adds nothing the reader hasn't just done and gives no new fact or stake.

Options:

- CUT
- The policy files are the source. The check is what you keep.

## 10. exercises/author-security-skill.md#phase-3-author-both-lenses

**Now:** You'll get a lot of questions.

Dead 5, lift 0, personas: cfo-sceptic, ingrid.

Students said:

- cfo-sceptic (frustration): Another round of questions before I get anything out of it.
- cfo-sceptic (confusion): The agent made a reusable audit file. I don't know what it cost or how long it took.
- cfo-sceptic (frustration): A long round of questions before I get anything back.

Diagnosis: The sentence warns of cost (a lot of questions) and gives no payoff or limit, so the sceptic hears unpaid work while Ingrid, who can see the skill at the end, stays engaged.

Options:

- The questions are how the skill gets built.
- CUT
