# Lecture: Self-consistency after the scoreboard

The benchmark you just ran asked one question: *is this claim grounded in the evidence?*

Self-consistency asks a different question: *if the agent writes the briefing again from the same evidence, what stays stable and what drifts?*

That is useful, but it is not the yardstick. A claim can be stable and still unsupported if both runs repeat the same bad assumption. A claim can be grounded and still be phrased differently. Drift is a warning signal, not proof of fabrication.

This is why self-consistency sits after the scoring, not inside the scoring panel. The scoreboard tells you which groundedness detector earned the judge file. Self-consistency shows another shape of uncertainty: the model's answer may not be reproducible even when the evidence surface stays fixed.

This is optional. If you run it, you don't need the output to complete Module 5.

Two runs is a demo, not a measurement. With N=2, a claim that appears in both could still be the model's bias toward a popular framing. A claim that drifts could be an edge case in the next sample. The signal starts to firm up around N=5 to 10. Patterns emerge from the noise. For a production check (the kind Module 6's eval loop wires up), you'd want N=20 to 30, where stability across runs starts to mean something. Today's two-run is an illustration of a different kind of uncertainty, not yet the full technique you'd ship.

Ask Claude to spawn a subagent that regenerates the briefing from the same evidence surface, blind to the first run.

{{prompt:self-consistency-after-scoreboard-1}}

Ask Claude to compare the two briefings in chat, naming what stayed, what drifted, and what the groundedness detectors didn't catch.

{{prompt:self-consistency-after-scoreboard-2}}

The take-home move is not "always run self-consistency." The take-home move is: have a multi-method judge ready for outputs you ship. Point the same shape at a customer email, a pricing memo, a positioning draft, anything you'd want a check on before it goes out.

Ask Claude to build a multi-method judge against any other output you want to quality-control.

{{prompt:self-consistency-after-scoreboard-3}}

<!-- maintainer -->

**Time:** 8-10 minutes if demoed live; 3 minutes if taught as contrast only.

**Placement in module:** Immediately after the Hallucination benchmark exercise. The judge is already saved. This lecture/demo contrasts groundedness scoring with reproducibility drift without reopening the detector panel.

**Teacher move:** Show, then name the boundary. Self-consistency is useful because it surfaces unstable claims. It is insufficient because stability is not truth. Do not let the room demote the scoreboard in favor of a more mysterious check.

**Student action:** Optional. If time is tight, trainer runs the demo on screen and students keep the concept. If self-study, students may run both prompts and read the comparison in chat scrollback (or ask Claude to save it to a file if they want to keep it).

**Quality:** compendium-audited 2026-05-04 (writing@92b7e79 story@92b7e79 technical@92b7e79 behavior@92b7e79)
- judges @92b7e79: writing PASS, story PASS, technical PASS, behavior PASS
