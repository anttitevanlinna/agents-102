#!/usr/bin/env python3
"""regen-module.py <module> <strategy-section> <base-dir> <out-dir> [--big-idea TEXT] [--story FILE]
Regenerate an Agents 101 module page and its linked lectures (student bodies only) from the strategy
section, the rule leads, the maintainer's language notes and taste rules. Exercises and slides stay
as they are in <base-dir> (a curriculum/-relative tree, e.g. a compaction c2, falling back to the repo).
--big-idea overrides the strategy's Big Idea (the maintainer's newest call). --story places a signed
first-person story verbatim as the opening lecture's first slide. One opus call per file, in parallel.
Writes <out-dir>/<path under curriculum/>; also copies the base exercises/slides so <out-dir> is a
complete variant for apply-compact.py."""
import sys, re, pathlib, subprocess, shutil, argparse, concurrent.futures as cf
ap = argparse.ArgumentParser(); ap.add_argument("module"); ap.add_argument("section"); ap.add_argument("base"); ap.add_argument("out")
ap.add_argument("--big-idea"); ap.add_argument("--story"); a = ap.parse_args()
HERE = pathlib.Path(__file__).parent; CUR = HERE.parents[1]; CORE = CUR.parents[1] / "agents-102-core"
BASE, OUT = pathlib.Path(a.base), pathlib.Path(a.out)
split = lambda t: (t[:t.find("<!-- maintainer -->")] if "<!-- maintainer -->" in t else t).strip()
src = lambda rel: split(((BASE / rel) if (BASE / rel).exists() else (CUR / rel)).read_text())
strategy = (CORE / "strategy/content-strategy.md").read_text().splitlines()
def section(title):
    i = next(n for n, l in enumerate(strategy) if l.strip() == title)
    j = next((n for n in range(i + 1, len(strategy)) if strategy[n].startswith("## ")), len(strategy))
    return "\n".join(strategy[i:j])
idx = lambda s: (CORE / "memory/_index" / ("diamond.md" if s == "diamond" else f"{s}.leads.md")).read_text()
modrel = f"trainings/agents-101/{a.module}.md"
mod = src(modrel)
links = re.findall(r"\]\(((?:lectures|exercises)/[a-z0-9-]+\.md)\)", mod)
lectures = [l for l in dict.fromkeys(links) if l.startswith("lectures/")]
exercises = [l for l in dict.fromkeys(links) if l.startswith("exercises/")]
slides = sorted({s for l in lectures for s in re.findall(r"\]\(slides/([a-z0-9-]+)\.md\)", src(l))})
story = pathlib.Path(a.story).read_text().strip() if a.story else ""
ctx = f"""# Strategy input for this module (the maintainer's, authoritative)
{section(a.section)}

{section("## The mood arc (core M1 → M6, extensions M7 → M8)")}
# The whole training strategy file (read in full; the section above is this module's slice)
{chr(10).join(strategy)}

{"# The maintainer's newest Big Idea for this module (overrides the strategy text)" + chr(10) + a.big_idea if a.big_idea else ""}

# Rules (generator view)
{idx("diamond")}
{idx("writing")}
{idx("student_facing")}
{idx("lectures")}
{idx("slides")}

# Maintainer's taste rules
{(CUR / "evals/mechanical/persona-student/taste-rules.md").read_text()}

# Maintainer's language notes (override anything above that conflicts)
{(HERE / "m7/maintainer-language-notes.md").read_text()}

# Sentence rewrite rules
{(CUR / "language/rewrite-rules.md").read_text()}

# Locked sentences: keep any that appear in the file you rewrite
{(CUR / "language/locked-sentences.json").read_text()}

# Module shape
{(CUR / "module-shape.md").read_text()}

# Density and point-of-view reference: an AE101 module the maintainer considers right
{split((CUR / "trainings/agentic-engineering-101/getting-going.md").read_text())}

# The module's exercises (FIXED, for reference; do not rewrite them)
""" + "\n\n".join(f"--- {e}\n{src(e)}" for e in exercises) + "\n\n# Shared slides the lectures link (FIXED)\n" + "\n\n".join(f"--- slides/{s}.md\n{src('slides/' + s + '.md')}" for s in slides)
def one(rel):
    first_lecture = lectures and rel == lectures[0]
    ask = f"""{ctx}

# File to rewrite ({rel}), current version
{src(rel)}

Rewrite this file so the module lands its Big Idea: a student asked cold afterwards should state it in their own words. Keep every heading that other files link to, every link line, every {{{{prompt:...}}}} / {{{{figure:...}}}} line, every **Session** widget and every file path exactly; you may add or drop `##` slides between them. Glanceable: at most about 60 words of prose per slide, fewer sentences, the agent does the work and the student judges it. Every sentence must help the student do the work on their own. No em dashes. Never tell the student what they felt or just did. Never put down the student or current practice.
{"Open this lecture with the maintainer's story below as its own `##` slide, verbatim and signed, right after the title and any cover marker:" + chr(10) + story if first_lecture and story else ""}

Answer with one fenced block ```md ... ``` holding the whole file and nothing else."""
    for _ in range(2):
        out = subprocess.run(["claude", "-p", "--model", "opus", "--output-format", "text"], input=ask, capture_output=True, text=True, timeout=1800).stdout
        m = re.search(r"```md\n(.*)\n```", out, re.S)
        if m: break
    if not m: return rel, "FAILED"
    d = OUT / rel; d.parent.mkdir(parents=True, exist_ok=True); d.write_text(m.group(1).strip() + "\n")
    return rel, f"{len(src(rel).split())} -> {len(m.group(1).split())} words"
for rel in exercises + [f"slides/{s}.md" for s in slides]:
    if (BASE / rel).exists(): d = OUT / rel; d.parent.mkdir(parents=True, exist_ok=True); shutil.copy(BASE / rel, d)
with cf.ThreadPoolExecutor(6) as ex:
    for rel, r in ex.map(one, [modrel] + lectures): print(f"[regen] {rel}: {r}")
