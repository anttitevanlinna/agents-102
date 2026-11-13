# Pairs from "Antti-directed" maintainer notes. Each names a sentence the note says was cut or replaced.
# The build finds the commit where the sentence left the body and pairs that slide before/after.
# tier gold = Antti picked the words; silver = Antti set the direction ("shorten, free hands", "density pass"), Claude picked the lines.
N = [
 dict(id="mn-pre-read-leak", file="curriculum/trainings/agentic-engineering-101/plan-mode-done-right.md", gone="Module 3 draws that boundary for your own repo", kind="accepted-edit", dim="clarity", tier="gold",
      why="pre-read's trailing clause narrating a later module cut, Antti-directed 2026-08-23; do not restore"),
 dict(id="mn-big-idea-one", file="curriculum/trainings/agentic-engineering-101/plan-mode-done-right.md", gone="A second-pass grilling can press a plan harder", kind="accepted-edit", dim="felt-learning", tier="gold",
      why="Big Idea cut from four sentences to one, Antti-directed 2026-08-12: it summarised a slide the student had not reached"),
 dict(id="mn-connective-orientation", file="curriculum/trainings/agentic-engineering-101/plan-mode-done-right.md", gone="Before the plan-reading move, one orientation", kind="accepted-edit", dim="clarity", tier="gold",
      why="Start-here connective cut, Antti-directed 2026-08-12"),
 dict(id="mn-commit-git-word", file="curriculum/exercises/push-back-on-the-plan.md", gone="Committed changes", kind="antti-wording", dim="clarity", tier="gold",
      why='third push-back axis renamed to Alternatives. Antti: "commit is a git word" (2026-08-12)'),
 dict(id="mn-contrast-material", file="curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md", gone="The contrast is the material.", kind="accepted-edit", dim="clarity", tier="silver",
      why="lean pass, Antti-directed M3/M6 shorten, free hands (2026-08-25)"),
 dict(id="mn-main-lane", file="curriculum/exercises/open-the-side-quest.md", gone="This is your main lane for Module 3.", kind="accepted-edit", dim="orientation", tier="silver",
      why="lean pass, free hands (2026-08-25): dup of the main-quest lead. Contrast tn-side-quest, the side-lane line he kept"),
 dict(id="mn-more-entries", file="curriculum/exercises/threat-model-with-stride.md", gone="It will have more entries than you want to deal with.", kind="accepted-edit", dim="clarity", tier="silver",
      why="lean pass, free hands (2026-08-25): restatement"),
 dict(id="mn-aphorism-kicker", file="curriculum/exercises/map-the-access-surface.md", gone="One sentence buys the time back.", kind="accepted-edit", dim="voice", tier="silver",
      why="lean pass, free hands: aphorism kicker"),
 dict(id="mn-not-typing-markdown", file="curriculum/exercises/author-test-strategy-skill.md", gone="You are not typing markdown into an editor.", kind="accepted-edit", dim="clarity", tier="silver",
      why="lean pass, free hands: the widget header carries it"),
 dict(id="mn-skills-kicker", file="curriculum/lectures/skills-from-the-frontier.md", gone="The judgement these skills carry doesn't have to be in your head", kind="accepted-edit", dim="voice", tier="silver",
      why="lean pass, free hands: kicker, the borrow slide carries the point"),
 dict(id="mn-cant-be-curated", file="curriculum/lectures/skills-from-the-frontier.md", gone="Nobody outside your team can write that skill well", kind="accepted-edit", dim="clarity", tier="silver",
      why="lean pass, free hands: restated the can't-be-curated lead"),
 dict(id="mn-exactly-given", file="curriculum/lectures/test-and-learn.md", gone="The agent works with exactly what you've given it", kind="accepted-edit", dim="clarity", tier="silver",
      why="density pass, Antti-directed 2026-08-29: restated its neighbour"),
 dict(id="mn-readable-enough", file="curriculum/lectures/test-and-learn.md", gone="A result you can read is enough", kind="accepted-edit", dim="clarity", tier="silver",
      why="density pass, Antti-directed 2026-08-29: the aphorism beside it carries the claim"),
]
# Emphasis pass, Antti-directed "go very lightly on the bold" (2026-07-09): slide chunks whose only change is de-bolding.
EMPH = dict(commits=["66927100","31d3b983"], kind="accepted-edit", dim="enjoyment", tier="silver", max_pairs=6,
      why='emphasis pass, Antti-directed "go very lightly on the bold" (2026-07-09): bold = handles only')
