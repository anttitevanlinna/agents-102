#!/usr/bin/env python3
"""compact.py <src-variant> <out-variant> — one compaction pass over Module 7's student files as
they stand in lab <src-variant> (module page, lecture, three exercises). Keeps every heading,
link, prompt line, widget, code fence and file path; cuts prose to a glanceable map at AE101
density. One opus call per file, in parallel; writes regen/<out>-<part>.md, swapped in by apply.py."""
import sys, re, pathlib, subprocess, concurrent.futures as cf
SRC, OUT = sys.argv[1], sys.argv[2]
LAB = pathlib.Path(sys.argv[3]); HERE = pathlib.Path(__file__).parent
PARTS = {"module": "trainings/agents-101/personal-to-team.md", "lecture": "lectures/access-is-not-absorption.md",
         "ex1": "exercises/share-your-work.md", "ex2": "exercises/design-the-sharing-plan.md", "ex3": "exercises/test-the-sharing-plan.md"}
notes = (HERE / "maintainer-language-notes.md").read_text()
taste = (HERE.parents[1] / "mechanical/persona-student/taste-rules.md").read_text()
ref = (HERE.parents[2] / "trainings/agentic-engineering-101/getting-going.md").read_text().split("<!-- maintainer -->")[0]
def one(part):
    rel = PARTS[part]; t = (LAB / SRC / "curriculum" / rel).read_text(); i = t.find("<!-- maintainer -->")
    body = t[:i].strip() if i >= 0 else t.strip()
    prompt = f"""Compact this Agents 101 student file. Students glance at it in a room while the real work happens in Claude Code with the prompts; the file is a map of what to do next.

Keep exactly, character for character: every heading line, every link line, every {{{{prompt:...}}}} / {{{{figure:...}}}} line, every **Session** widget, every code fence, file path and bold take-home line, and the scar story slide signed "Antti Tevanlinna" (verbatim, all of it).
Cut prose: whole sentences that do not help the student do the work on their own, narration, restatements, previews of later modules. Merge what is left into short paragraphs. Target at most about 60 words of prose per `##` slide; a slide that needs more must earn it. Do not add new claims, metaphors or sentences. No em dashes.

# The maintainer's language notes (authoritative)
{notes}

# The maintainer's taste rules
{taste}

# Density reference: an AE101 module page the maintainer considers compacted
{ref}

# File to compact
{body}

Answer with one fenced block ```md ... ``` holding the compacted file and nothing else."""
    out = subprocess.run(["claude", "-p", "--model", "opus", "--output-format", "text"], input=prompt, capture_output=True, text=True, timeout=1800).stdout
    m = re.search(r"```md\n(.*)\n```", out, re.S); assert m, f"{part}: no block\n{out[-1500:]}"
    (HERE / "regen" / f"{OUT}-{part}.md").write_text(m.group(1).strip() + "\n")
    return part, len(body.split()), len(m.group(1).split())
with cf.ThreadPoolExecutor(5) as ex:
    for p, a, b in ex.map(one, PARTS): print(f"[compact] {OUT} {p}: {a} -> {b} words")
