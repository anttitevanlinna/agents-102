# Squint test — A101 skeleton to be (judge 3)

## 1. Big learnings

- Context is authored, not inherited — you tell the agent what it knows. — "Context is whatever you tell it"
- What you write to a file persists as the agent's memory across sessions. — "A file the agent reads every time"
- Agents amplify whatever you bring to them, good or bad. — "It amplifies what you bring"
- Compounding comes from editing accumulated memory, not from being clever in the moment. — "It gets better by being edited, not by being clever"
- Knowledge that isn't written down is invisible to the agent. — "What you haven't written down, it can't use"
- A real fix corrects the rule that let the failure through, not just the output. — "Fix the output, then fix the rule that let it through"
- Splitting an agent into multiple agents should be the last resort, not the default. — "Start with don't" / "Splitting earns its keep when they can't be one"
- Multiple distinct stances beat a single agent that just averages/summarizes. — "Three stances beat one summarizer" / "Left alone, the synthesizer averages to beige"
- Agent risk breaks the old trust model — you can't assume every input is vetted the way a human colleague's request would be. — "No employee reads every document as an instruction"
- The safest mitigation is not exposing the risk at all. — "The best mitigation is the door you don't open"
- Declining to answer ("I can't tell") is itself a legitimate, honest output. — "'I can't tell' is a real answer"
- High-confidence output repeated many times is still wrong if the underlying reliability is bad. — "Mostly right, ten times over, is mostly wrong"
- Asking the model to self-verify doesn't escape the same fluent-but-unreliable process. — "'Are you sure?' is another fluent answer"
- Evals aren't just a safety floor — used well, they raise how good the system can get. — "Groundedness protects the floor" / "Steering raises the ceiling"
- A metric you can edit at will stops being a real standard. — "A yardstick you rewrite is not a yardstick"
- A score that stops moving is telling you something about the judge, not that you've hit a ceiling. — "A flat score is information about the judge"
- Improvement over time runs on variation, selection, and retained memory. — "Variety in, selection out, memory keeps"
- As systems get better, human attention to them naturally erodes — worth naming as a risk. — "The better it gets, the less you watch"
- Giving people access to an agent doesn't mean they've absorbed anything from it. — "Access is not absorption" / "You cannot share an agent" / "Access is easy; absorption is scarce"
- People only take in what's close to what they already half-know. — "People absorb what they already half know"
- The capability to build tools that build tools compounds on itself. — "The tool that builds tools compounds"

## 2. Governors

- Default to not splitting an agent unless it clearly can't work as one. — "Start with don't"
- Diagnose what's actually wrong before attempting a fix. — "Diagnose before repair"
- Ask whether the risk can be designed away entirely before reaching for a mitigation. — "The best mitigation is the door you don't open"
- Let "I can't tell" stand as an acceptable answer rather than forcing false confidence. — "'I can't tell' is a real answer"
- Before granting an agent an action, ask: would you personally let it send this? — "Would you let it send the mail?"
- Periodically ask yourself when you last actually read one of the things you're trusting an agent to check. — "When did you last read one of these yourself?"
- Ask what evidence would actually change your mind before committing to a course. — "What would change our mind?"
- Ask whether your organisation's learning rate can keep pace with how fast the model underneath it changes. — "Will your organisation learn faster than the model changes underneath it?"

## 3. The future

Yes — "Will your organisation learn faster than the model changes underneath it?" (M8). Echoed earlier by "The model rotates. What you built around it learns, or doesn't." (M6) and closed with "A flywheel, not a graduation" (M8).

## 4. Self-doubt

Yes, repeatedly: "The report is a hypothesis, not a result" (M1); "The doubt stays. Hold it." (M3); "A drift signal, never proof" (M5); "The judge names its own limit" (M5); "A yardstick you rewrite is not a yardstick" (M6); "A flat score is information about the judge" (M6); "The gate is a claim too" (M6).

## 5. Blank stretches

- M1 EXERCISE "Paint by agent with guardrails" — only "Phase 1: The boring baseline" is titled; nothing to squint at beyond that one phase name.
- M5 "Agent Actions" — a single line, "Propose, double-check, apply," reads as a mechanical procedure, not an idea.

---

`curriculum/evals/story-depth/squint-after.judge-3.md` — learnings: 21 / governors: 8 / future: yes / self-doubt: yes
