---
name: assumption-test
description: Pressure-test a plan by extracting and ranking the assumptions it depends on, then designing two-week experiments for the top three. Use on a proposed direction, a guiding policy, or a set of recommendations before anyone commits to them.
---

# Assumption test — what would have to be true

Roger Martin's strategy-as-assumptions. A strategy isn't a prediction of the future — it's a bet on a set of conditions being true. If you can name those conditions and rank them by how much weight they carry, you can test the riskiest ones cheaply before committing.

The question that makes this operational: *what would have to be true for this plan to work?*

**This skill's job is pressure-testing, not reassurance.** If the plan looks good, the temptation is to validate it. Resist. A plan that hasn't had its load-bearing assumptions surfaced is a plan that will break somewhere nobody is watching.

## Input

One of:
- A proposed plan (narrative, bulleted, or prose)
- A guiding policy with implied actions
- A set of recommendations from a meeting or memo

If the input is a pitch deck summary, ask for the actual plan. A deck is not a plan.

## Process

1. **Read the plan at face value.** No critique yet. Write a one-sentence summary of what the plan claims will happen.

2. **Extract every assumption the plan depends on.** Both the explicit ones (named in the plan) and the hidden ones (unstated but required). Hidden assumptions are where plans die — the plan assumes the team has capacity, the vendor delivers on time, the regulator approves, the customer behaves rationally, the data exists and is clean. List 10 to 20. Write each as a declarative sentence: *"Finance will release budget in Q2,"* not *"budget timing."*

3. **Rank by load-bearing weight.** For each assumption, ask: *if this turns out to be false, does the plan bend or does it break?* Assumptions that break the plan rank higher than assumptions that merely bend it. Order the list from most load-bearing to least. If two are tied, rank the harder-to-verify one higher — that's where surprise lives.

4. **Pick the top three.** Ignore the rest for now. Good strategy focuses on the few things that actually matter.

5. **Design one experiment per top-three assumption.** Each experiment must:
   - Run in **two weeks or less** (if it takes longer, it's a project, not a test)
   - Produce an observable signal that either supports or contradicts the assumption
   - Be cheap enough that the person running it doesn't need to ask permission
   - Name a specific person, specific action, specific place

A good experiment looks like: *"Ask three operations managers to describe the invoice-approval process in their own words. If any two give structurally different answers, the assumption that 'the process is standard enough to automate' is wrong."*

## Output

```
Plan in one sentence
...

Assumptions (ranked, most load-bearing first)
1. ...
2. ...
3. ...
4. ...
(continue to ~10-15)

Top three to test

Assumption 1: [restate]
Experiment: [who, what, where, by when — two weeks max]
Signal it would show: [what evidence supports or contradicts]

Assumption 2: [restate]
Experiment: ...
Signal it would show: ...

Assumption 3: [restate]
Experiment: ...
Signal it would show: ...
```

## Notes

- If the user says "all three feel equally important," push back. Equal weight means you haven't ranked them — you've just sorted them alphabetically in your head.
- An experiment that requires a budget line, a committee, or a new hire isn't a two-week experiment. Redesign it until it fits inside what one person can do on a Monday.
- Resist the word *validate*. Experiments don't validate assumptions, they attack them. If the assumption survives an honest attack, that's evidence. If the experiment is shaped to confirm, it's theatre.
