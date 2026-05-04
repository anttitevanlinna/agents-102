# Lecture: Self-consistency after the scoreboard

The benchmark you just ran asked one question: *is this claim grounded in the evidence?*

Self-consistency asks a different question: *if the agent writes the briefing again from the same evidence, what stays stable and what drifts?*

That is useful, but it is not the yardstick. A claim can be stable and still unsupported if both runs repeat the same bad assumption. A claim can be grounded and still be phrased differently. Drift is a warning signal, not proof of fabrication.

This is why self-consistency sits after the scoring, not inside the scoring panel. The scoreboard tells you which groundedness detector earned the judge file. Self-consistency is a teacher demo that shows another shape of uncertainty: the model's answer may not be reproducible even when the evidence surface stays fixed.

This is optional. If you run it, you don't need the output to complete Module 5.

Two runs is a demo, not a measurement. With N=2, a claim that appears in both could still be the model's bias toward a popular framing. A claim that drifts could be an edge case in the next sample. The signal starts to firm up around N=5 to 10. Patterns emerge from the noise. For a production check (the kind Module 6's eval loop wires up), you'd want N=20 to 30, where stability across runs starts to mean something. Today's two-run is an illustration of a different kind of uncertainty, not yet the full technique you'd ship.

Ask Claude to spawn a subagent that regenerates the briefing from the same evidence surface, blind to the first run.

**Prompt** *(Claude Code)*

```
Spawn one subagent to generate a second briefing from the same evidence surface.

The subagent reads:
- `./crux.md`
- `module-5/evidence-roster.md`
- the rostered evidence files named in `module-5/evidence-roster.md`

The subagent must NOT read:
- `module-5/briefing.md`
- `module-5/claim-pool.md`
- `module-5/adjudicated-claims.md`
- `module-5/scoreboard.md`
- anything in `module-5/detectors/`

Write a one-page briefing on the same challenge to `module-5/briefing-second-run.md`.

When the subagent finishes, do not summarize the briefing in chat. Only confirm that `module-5/briefing-second-run.md` exists.
```

Ask Claude to compare the two briefings in chat, naming what stayed, what drifted, and what the groundedness detectors didn't catch.

**Prompt** *(Claude Code)*

```
Compare the first and second briefing.

Read:
- `module-5/briefing.md`
- `module-5/briefing-second-run.md`
- `module-5/claim-pool.md`
- `module-5/adjudicated-claims.md`

Show me the comparison in chat with these sections:

1. Stable claims: claims or recommendations that appear in both briefings and are supported by the adjudicated claims.
2. Drifted claims: same topic, but different number, named entity, recommendation, causal explanation, or framing.
3. First-run-only claims: claims from the first briefing that disappeared in the second.
4. Second-run-only claims: claims from the second briefing that did not appear in the first.
5. Self-consistency issues: claims that are both unsupported or partly grounded AND unstable across runs.

End with three lines:
- What self-consistency caught that the groundedness detectors did not.
- What self-consistency cannot prove.
- Whether the winning groundedness judge should change. Default answer should be no unless the demo shows a concrete failure class the judge can actually detect.
```

The take-home move is not "always run self-consistency." The take-home move is: have a multi-method judge ready for outputs you ship. Point the same shape at a customer email, a pricing memo, a positioning draft, anything you'd want a check on before it goes out.

Ask Claude to build a multi-method judge against any other output you want to quality-control.

**Prompt** *(Claude Code)*

```
I have output I want to quality-control against fabrication. Build me a judge prompt that checks for these failure modes:

- Source triangulation: does every specific claim appear in at least one evidence file?
- Entailment: does the output say more than the evidence supports?
- Citation integrity: when a citation is made, does the evidence file actually contain the claim?
- Counter-evidence search: actively look for sources that contradict each claim, not just ones that support.

Keep the techniques that fit my output; swap any that don't for methods that catch my output's specific failure modes.

Ask me what output I'm checking, where my evidence lives, and what short filename to use under `judges/`. Then write the judge as a markdown file at that path. Short heading, one paragraph naming what it checks and why, then the prompt itself (the thing I'd paste at Claude to run the judge). Keep it under 20 lines. End with a one-line "Known limit:" naming what the judge can't catch.
```

**Time:** 8-10 minutes if demoed live; 3 minutes if taught as contrast only.

<!-- maintainer -->

**Placement in module:** Immediately after the Hallucination benchmark exercise. The judge is already saved. This lecture/demo contrasts groundedness scoring with reproducibility drift without reopening the detector panel.

**Teacher move:** Show, then name the boundary. Self-consistency is useful because it surfaces unstable claims. It is insufficient because stability is not truth. Do not let the room demote the scoreboard in favor of a more mysterious check.

**Student action:** Optional. If time is tight, trainer runs the demo on screen and students keep the concept. If self-study, students may run both prompts and read the comparison in chat scrollback (or ask Claude to save it to a file if they want to keep it).

**Quality:** compendium-audited 2026-05-04 (writing@92b7e79 story@92b7e79 technical@92b7e79 behavior@92b7e79)
- judges @92b7e79: writing PASS, story PASS, technical PASS, behavior PASS
