#!/usr/bin/env python3
"""regen.py <variant> — regenerate Module 7's module page and lecture (student bodies only) from the
strategy input and the rule indices, with the three exercises held fixed (they are the maintainer's
selections). One call (GEN_MODEL, default sonnet); writes regen/<variant>-module.md and regen/<variant>-lecture.md, which
apply.py swaps in above each file's maintainer block. Paths resolve from the agents-102 checkout
and its sibling agents-102-core."""
import os, sys, re, pathlib, subprocess
V = sys.argv[1]
HERE = pathlib.Path(__file__).parent
REPO = HERE.parents[3]; CUR = REPO / "curriculum"; CORE = REPO.parent / "agents-102-core"
body = lambda p: p.read_text().split("<!-- maintainer -->")[0].strip()
strategy = (CORE / "strategy/content-strategy.md").read_text().splitlines()
def section(title):
    i = next(n for n, l in enumerate(strategy) if l.strip() == title)
    j = next((n for n in range(i + 1, len(strategy)) if strategy[n].startswith("## ")), len(strategy))
    return "\n".join(strategy[i:j])
idx = lambda s: (CORE / "memory/_index" / ("diamond.md" if s == "diamond" else f"{s}.leads.md")).read_text()
scar = re.search(r"(## The analysis was ready\..*?Antti Tevanlinna)", (HERE / "apply.py").read_text(), re.S).group(1)
close = "The leadership had not done the analysis. People they trusted had. Companies, even when they go agentic, work first and foremost on the human principle." + (" Today, at least. Who knows about the future." if V not in ("v6", "v7") else "")
scar = scar.replace("{close}", close)
ex = "\n\n".join(f"--- {f} (FIXED, do not rewrite)\n{body(CUR / f)}" for f in
    ["exercises/share-your-work.md", "exercises/design-the-sharing-plan.md", "exercises/test-the-sharing-plan.md"])
slides = "\n\n".join(f"--- slides/{s}.md (shared slide, link only, text fixed)\n{body(CUR / 'slides' / (s + '.md'))}" for s in
    ["three-parts-copy", "access-is-easy", "what-would-have-to-be-true"])
prompt = f"""You are writing two student-facing files for Agents 101, a training for builder leaders (CEO, CTO, HR lead) who build and run their own agent: the Module 7 module page and its closing lecture. The three exercises are the maintainer's selections and stay exactly as they are; you write the prose around them.

# Strategy input (the maintainer's, authoritative)
{section("## From Personal to Team")}

{section("## The mood arc (core M1 → M6, extensions M7 → M8)")}

# Module shape (section order and what each section is for)
{(CUR / "module-shape.md").read_text()}

# Rules (generator view; apply them while writing)
{idx("diamond")}
{idx("writing")}
{idx("student_facing")}
{idx("lectures")}
{idx("slides")}

# The maintainer's taste, confirmed rule by rule
{(CUR / "evals/mechanical/persona-student/taste-rules.md").read_text()}

{"# The maintainer's language notes from his blind calls (override anything above that conflicts)" + chr(10) + (HERE / "maintainer-language-notes.md").read_text() if V not in ("v6", "v7") else ""}

# Point-of-view reference: an AE101 lecture the maintainer considers right
{body(CUR / "lectures/story-of-module-6.md")}

# Fixed exercises (in order)
{ex}

# Shared slides you may link from the lecture with [Title](slides/<id>.md)
{slides}

# The maintainer's own scar story, already drafted from his dictation. Place it in the lecture verbatim, as its own `##` slide. It is the narrator's failure on the page.
{scar}

# What to write
1. The module page body, `# From Personal to Team` first. Sections in this order: `## Big Idea`, `## Prework`, `## What You'll Learn`, `## Start here`, then these four link lines exactly, each on its own line:
[Exercise: Interview for the job and pick a candidate](exercises/share-your-work.md)
[Exercise: Design the sharing plan](exercises/design-the-sharing-plan.md)
[Exercise: Test the sharing plan](exercises/test-the-sharing-plan.md)
[Lecture: Access is not absorption](lectures/access-is-not-absorption.md)
then `## Debrief` containing the line {{{{prompt:a101-m7-debrief-sharing-artifact}}}} on its own line, `## Key Concepts`, `## Bring to Module 8`, `## Next`. `## Start here` is framing prose plus the opening question; no session sentence (the exercise opens the session with the Session widget). It may say that `module-7/` will hold the sharing plan and `module-7/monday.md` the next move.
2. The lecture body, `# Lecture: Access is not absorption` first. About 8 minutes in the room, `##` slides of at most 6 sentences. It closes the module after the exercises: it names the law the exercises made the student meet. The idea that must land and be carried home: access is a switch someone flips; absorption happens in other people's weeks, at their pace, for their reasons. Link the three shared slides where they fit. End on one name and one small move.

Write fewer sentences, not shorter ones. No em dashes. Never tell the student what they felt or just did. Never put down the student or current practice. No off-hand witty one-liners.

Answer with exactly two fenced blocks and nothing else:
```module
...module page...
```
```lecture
...lecture...
```"""
(HERE / "regen" / f"{V}-prompt.md").write_text(prompt)
out = subprocess.run(["claude", "-p", "--model", os.environ.get("GEN_MODEL", "sonnet"), "--output-format", "text"], input=prompt, capture_output=True, text=True, timeout=1800).stdout
m = re.search(r"```module\n(.*?)\n```", out, re.S); l = re.search(r"```lecture\n(.*?)\n```", out, re.S)
assert m and l, "regen: missing blocks\n" + out[-2000:]
(HERE / "regen" / f"{V}-module.md").write_text(m.group(1).strip() + "\n")
(HERE / "regen" / f"{V}-lecture.md").write_text(l.group(1).strip() + "\n")
print(f"[regen] {V}: module {len(m.group(1).split())} words, lecture {len(l.group(1).split())} words")
