#!/usr/bin/env python3
"""apply.py <checkout> <variant> — rewrite Module 7's five student files into a variant.
Each edit is an exact (old, new) pair; a miss fails loudly. Variants stack: v2 = v1 + scar, v3 = deep cut + scar, v4 = v3 + story-then-law order, v5 = v4 minus "the one piece"."""
import sys, pathlib
root = pathlib.Path(sys.argv[1]) / "curriculum"; variant = sys.argv[2]
MOD = "trainings/agents-101/personal-to-team.md"; EX1 = "exercises/share-your-work.md"
LEC = "lectures/access-is-not-absorption.md"; EX3 = "exercises/test-the-sharing-plan.md"

V1 = [
 (MOD, """The stack on disk: a memory, synthesis across three source zones, skills that audit the system, a fixed judge, and a generation tactic that got sharper under it. Somewhere in it is a thing that produces output worth checking before a meeting.

The question that shows up on its own: *could this help someone else?*

Hold that feeling. It's not a governance question yet. It's a generous one. At Module 7 it becomes a plan, plainly and against real friction.

Two questions to warm up""", """Two questions to warm up"""),
 (MOD, """

Notice what this prompt insists on: name the path, overwrite in place, quote the before-and-after for every claim. When you're sharpening something for another person to use, "what got sharpened" without the actual lines is a draft pretending to be a finished thing. The before-and-after quote is how you know the sharpening reached the file, not just the summary.""", ""),
 (EX1, """Your memory has been working for you for days now. It catches things you'd have missed, keeps a tone you taught it, and produces something you check before meetings. The question arrives on its own: *could this help someone else?*

Hold the impulse. Then start with the teammate's work.

You are not going to ask *"what should I share with my teammate?"* That question is builder-centered and skips the one thing that decides whether sharing works: **the job** your teammate is trying to get done.""", """*Could this help someone else?* Start with the teammate's work. What decides whether sharing works is **the job** your teammate is trying to get done."""),
 (LEC, """You have a plan now. A shape picked, an owner named or marked unassigned, an assumption you would test first. The rest of this is about the person on the other end of it.""", """The rest of this is about the person on the other end of your plan."""),
 (LEC, """You started from the teammate's job, not from your agent, and the agent did most of that reading: what the person is trying to get done, what they use for it today, what a better week would look like. The outcome sentence you wrote is the contract""", """Start from the teammate's job, not from your agent. The outcome sentence is the contract"""),
 (LEC, """*Share the whole agent* is not on the list, and it is worth being plain about why.""", """*Share the whole agent* is not on the list."""),
 (LEC, """People take up what they already half know. That is not a statement about willingness. It is the plain shape of how anyone absorbs anything: you recognise the new thing by what it resembles in the work you already do, and if it resembles nothing, you have nowhere to put it.""", """People take up what they already half know. Anyone recognises a new thing by what it resembles in their own work. If it resembles nothing, there is nowhere to put it."""),
 (LEC, """Every piece so far was yours to decide. This one is not. You can hand someone the context, the skill, the output, the interface. Whether they pick it up is their decision, made for their own reasons, on a Tuesday you will not be in the room for.

The thing you would most like to hand over is the one thing that will not go. You cannot hand over what you learned getting here. You can hand over four things, and none of them is what you learned.""", """You can hand someone the context, the skill, the output, the interface. Whether they pick it up is their decision, made for their own reasons, on a Tuesday you will not be in the room for. What you learned getting here is not one of the four things."""),
 (LEC, """You felt this an hour ago. The technical plan filled quickly. The people plan stalled on names.

That was not the exercise being hard. That was the exercise being accurate. A missing name is a finding""", """The technical plan fills quickly. The people plan stalls on names.

A missing name is a finding"""),
]

SCAR_SLOT = """The interface is the first piece whose shape depends on somebody whose calendar you do not control.
"""
SCAR = """
## The analysis was ready. The decision never came.

At the start of 2026 I set out to redesign a whole value stream with agents. We picked the slice that takes a company's flagship product to its millions of customers. Many teams touch it.

We built a multi-agent system for the work. About fifteen people across those teams mapped their own part and uploaded their own documents. A central agent pulled it all into one map of how the work flows today.

On the first workshop day, most of them refined that map together. People had fun, and bit by bit they learned how it works. On the second day a smaller group redesigned the flow. We left with a plausible proposal and the analysis to decide on it.

We had chosen this topic with the senior leadership before we started. By the decision meeting, the urgency had gone. New priorities had come up, and fires were burning elsewhere. The proposal got neither a yes nor a no.

{close}

Antti Tevanlinna
"""
CLOSE_CAUSE = "The leadership had not done the analysis. People they trusted had."
CLOSE_HUMAN = "The leadership had not done the analysis. People they trusted had. Companies, even when they go agentic, work first and foremost on the human principle."

V3_DEEP = [
 (LEC, """## This is the interface piece

In the full agent picture, this is the interface piece. It is the first one that has another person on the other side of it.

Context you chose. Boundaries you set. Checks you wrote. Each of those was a decision you could make and remake on your own. The interface is the first piece whose shape depends on somebody whose calendar you do not control.
""", """## This is the interface piece

Context you chose. Boundaries you set. Checks you wrote. The interface is the first piece whose shape depends on somebody whose calendar you do not control.
"""),
 (LEC, """Michael Polanyi, a philosopher of science, had the line for it: *we know more than we can tell.* Your agent runs on the part of your work you could never have written down. The teammate you are handing it to has their own version of that, about their own work, and it is the only place your thing can land.""", """Michael Polanyi, a philosopher of science, had the line for it: *we know more than we can tell.* Your agent runs on the part of your work you never wrote down. Your teammate has their own version, about their own work, and that is where your thing has to land."""),
 (LEC, """The agent file is a page of instructions. It is not where the work lives. The work lives in the memory you curated, in the corrections you made every time a summary rounded a corner, in the judgement you brought to output that looked fine and was not. Hand someone the agent file and you have handed them the shell of a thing whose contents are still on your disk and in your head. They run it, get a generic answer, and quietly stop.""", """The agent file is a page of instructions. The work lives in the memory you curated, in the corrections you made, in the judgement you brought to output that looked fine and was not. Hand someone the agent file and they run it, get a generic answer, and quietly stop."""),
 (LEC, """The interview earned its keep when it found a third outcome past speed and quality: a dependency removed, an anxiety gone, a scope widened. Speed and quality alone means it went shallow.""", """A good interview finds a third outcome past speed and quality: a dependency removed, an anxiety gone, a scope widened."""),
 (EX3, """Before designing a solution, interview for the outcome. Pick the candidate against that outcome. Draft the technical and people plans together. Test the switch, not the solution. A candidate picked because it fits the infrastructure is shopping. A candidate picked because it moves the outcome is design.""", """Interview for the outcome. Pick the candidate against it. Draft the technical and people plans together. Test the switch, not the solution."""),
]


# v4: the story becomes the evidence for the law. Access-is-easy and "people absorb" move to
# right after the scar story; the interface piece moves up beside "you cannot share an agent".
V4_ORDER = [
 (LEC, """[Access is easy; absorption is scarce](slides/access-is-easy.md)

## People absorb what they already half know

People take up what they already half know. Anyone recognises a new thing by what it resembles in their own work. If it resembles nothing, there is nowhere to put it.

Michael Polanyi, a philosopher of science, had the line for it: *we know more than we can tell.* Your agent runs on the part of your work you never wrote down. Your teammate has their own version, about their own work, and that is where your thing has to land.

""", ""),
 (LEC, """Antti Tevanlinna

[What would have to be true""", """Antti Tevanlinna

[Access is easy; absorption is scarce](slides/access-is-easy.md)

## People absorb what they already half know

People take up what they already half know. Anyone recognises a new thing by what it resembles in their own work. If it resembles nothing, there is nowhere to put it.

Michael Polanyi, a philosopher of science, had the line for it: *we know more than we can tell.* Your agent runs on the part of your work you never wrote down. Your teammate has their own version, about their own work, and that is where your thing has to land.

[What would have to be true"""),
]
# v5: v4 + the abstract "one piece you don't decide" slide goes; the lecture runs switch → names.
V5_CUT = [
 (LEC, """## The one piece you don't decide

You can hand someone the context, the skill, the output, the interface. Whether they pick it up is their decision, made for their own reasons, on a Tuesday you will not be in the room for. What you learned getting here is not one of the four things.

""", ""),
]

def run(edits):
    for rel, old, new in edits:
        p = root / rel; t = p.read_text()
        assert t.count(old) == 1, f"{variant}: edit not found once in {rel}: {old[:60]!r}"
        p.write_text(t.replace(old, new))

if variant in ("v1", "v2", "v3", "v4", "v5"): run(V1)
if variant in ("v3", "v4", "v5"): run(V3_DEEP)
if variant in ("v2", "v3", "v4", "v5"):
    close = CLOSE_CAUSE if variant == "v2" else CLOSE_HUMAN
    run([(LEC, SCAR_SLOT, SCAR_SLOT + SCAR.replace("{close}", close))])
if variant in ("v6", "v7", "v8", "v9"):  # regenerated from strategy + rules, exercises fixed (regen.py)
    here = pathlib.Path(__file__).parent / "regen"
    for rel, part in ((MOD, "module"), (LEC, "lecture")):
        p = root / rel; t = p.read_text(); i = t.index("<!-- maintainer -->")
        p.write_text((here / f"{variant}-{part}.md").read_text() + "\n" + t[i:])
if variant in ("v4", "v5"): run(V4_ORDER)
if variant == "v5": run(V5_CUT)
print(f"[apply] {variant} ok")
