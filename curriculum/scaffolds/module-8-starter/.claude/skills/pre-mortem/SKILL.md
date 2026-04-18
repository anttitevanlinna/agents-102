---
name: pre-mortem
description: Imagine the plan has already failed and work backward to name the specific mechanisms. Use on a finished plan or strategy kernel before committing. Default horizon is 18 months. Output is a concrete failure scenario, 3-5 named risks, and one early warning signal per risk.
---

# Pre-mortem — the plan failed, what happened

Gary Klein's pre-mortem, sharpened by Daniel Kahneman. Post-mortems happen after failure. Pre-mortems happen before. The move: assume the plan has already failed, then work backward. The reason it works is a trick of cognition — humans are much better at explaining a concrete outcome than at predicting a fuzzy one. "What might go wrong?" generates platitudes. "It's 18 months later and this failed — tell me the story" generates real risks.

**Platitudes are banned.** "Risk of poor execution" is zero-signal. So is "stakeholder alignment" and "change management." This skill surfaces concrete mechanisms: the specific market move, the specific team dynamic, the specific decision that wasn't made. If a risk could apply to any plan at any company, it's not a risk, it's a weather report.

## Input

- A plan, strategy kernel, or guiding-policy-plus-actions artifact
- Optional: a time horizon (default 18 months)

If the plan is vague, ask for the version that has specific actions and specific owners. You can't pre-mortem a wish.

## Process

1. **Anchor the horizon.** State the date — "it's [today + horizon] and we're looking back at the plan we set out with." Make it feel real. Specific dates trigger different thinking than vague "someday."

2. **Describe the failure concretely.** Three to five sentences, past tense. Not *"the plan didn't work out."* Something like: *"By month 14, only 2 of the 5 processes had any agent running on them. The data team had built what the guiding policy asked for, but the operations teams treated the agents as IT's problem. The SVP who sponsored this moved to another role in month 9 and her successor reopened the platform debate. By month 18, the project was quietly folded into a larger 'digital' program and the competence that had been built started to disperse."* That level of texture.

3. **Work backward to 3 to 5 risks.** For each, name:
   - **The mechanism** — what specifically happened, in plain language. Not "market shift" but *"two major Nordic competitors launched cheaper agent-enabled customer service a quarter before our own rollout, reframing the board's patience."*
   - **Why it produced the failure** — the causal step from this risk to the scenario you just described.

   Three is the floor, five the ceiling. Fewer than three and you haven't worked hard enough. More than five and the list stops being actionable.

4. **One early warning signal per risk.** A signal is something someone could observe in the next month or two that would tell them this risk is starting to play out. A good signal is specific and observable: *"two consecutive monthly check-ins where the operations director reschedules"* beats *"declining engagement."* If you can't name a signal, the risk isn't crisp enough — sharpen it.

## Output

```
Horizon
It's [date]. The plan is [horizon] old. It failed.

What happened (3-5 sentences, past tense, concrete)
...

Risks that produced this

Risk 1: [name in one line]
Mechanism: ...
Why it produced the failure: ...
Early warning signal: ...

Risk 2: [name in one line]
Mechanism: ...
Why it produced the failure: ...
Early warning signal: ...

(repeat for 3-5 total)
```

## Notes

- If the user protests that the failure scenario is "too pessimistic," good — that's the skill working. Cheerful pre-mortems are broken pre-mortems.
- Re-read the failure scenario out loud once before listing risks. If it could be the failure of any plan (team burned out, priorities shifted, budgets cut), it isn't doing its job — rewrite with the specific plan's specifics in it.
- Avoid the temptation to immediately propose mitigations. The skill produces risks and signals. Mitigations are a separate conversation, because some risks are worth accepting.
