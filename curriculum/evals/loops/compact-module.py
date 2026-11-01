#!/usr/bin/env python3
"""compact-module.py <module> <checkout> <out-dir> — one compaction pass over any Agents 101 module:
the module page plus every lecture and exercise it links. Keeps headings, links, prompt/figure lines,
Session widgets, code fences, paths and bold take-homes verbatim; cuts prose toward a glanceable map
at AE101 density, using m7/maintainer-language-notes.md and the taste rules. One opus call per file,
in parallel. Writes <out-dir>/<path under curriculum/> (student body only; apply-compact.py swaps it
in above each file's maintainer block). Prints words before → after and any structure drift."""
import sys, re, pathlib, subprocess, concurrent.futures as cf
MOD, SRC, OUT = sys.argv[1], pathlib.Path(sys.argv[2]) / "curriculum", pathlib.Path(sys.argv[3])
HERE = pathlib.Path(__file__).parent
notes = (HERE / "m7/maintainer-language-notes.md").read_text()
rewrite = (HERE.parents[1] / "language/rewrite-rules.md").read_text()
locked = (HERE.parents[1] / "language/locked-sentences.json").read_text()
taste = (HERE.parent / "mechanical/persona-student/taste-rules.md").read_text()
ref = (HERE.parents[1] / "trainings/agentic-engineering-101/getting-going.md").read_text().split("<!-- maintainer -->")[0]
modrel = f"trainings/agents-101/{MOD}.md"
split = lambda t: (t[:t.find("<!-- maintainer -->")] if "<!-- maintainer -->" in t else t).strip()
files = [modrel] + sorted(set(re.findall(r"\]\(((?:lectures|exercises)/[a-z0-9-]+\.md)\)", split((SRC / modrel).read_text()))))
KEEP = re.compile(r"^(#|\[|\{\{|\*\*Session|```)")
def skeleton(t): return sorted(l for l in t.splitlines() if KEEP.match(l))
def one(rel):
    body = split((SRC / rel).read_text())
    prompt = f"""Compact this Agents 101 student file. Students glance at it in a room while the real work happens in the agent with the prompts; the file is a map of what to do next.

Keep exactly, character for character: every heading line, every link line, every {{{{prompt:...}}}} / {{{{figure:...}}}} line, every **Session** widget, every code fence and its contents, every file path and every bold take-home line. A first-person story signed by the author stays verbatim, all of it.
Cut prose: whole sentences that do not help the student do the work on their own, narration of what the student did or felt, restatements, previews of later modules, closing sentences that add little. Merge what is left into short paragraphs. Target at most about 60 words of prose per `##` slide; a slide that needs more must earn it. Keep every concrete action the student takes, in the fewest words. Do not add new claims, metaphors or sentences. No em dashes.

# The maintainer's language notes (authoritative)
{notes}

# The maintainer's taste rules
{taste}

# Sentence-level rewrite rules
{rewrite}

# Locked sentences: never change or cut any of these
{locked}

# Density reference: an AE101 module page the maintainer considers compacted
{ref}

# File to compact ({rel})
{body}

Answer with one fenced block ```md ... ``` holding the compacted file and nothing else."""
    for attempt in range(2):
        out = subprocess.run(["claude", "-p", "--model", "opus", "--output-format", "text"], input=prompt, capture_output=True, text=True, timeout=1800).stdout
        m = re.search(r"```md\n(.*)\n```", out, re.S)
        if m: break
    if not m: return rel, len(body.split()), 0, "no block returned"
    new = m.group(1).strip() + "\n"
    dst = OUT / rel; dst.parent.mkdir(parents=True, exist_ok=True); dst.write_text(new)
    a, b = skeleton(body), skeleton(new)
    drift = "" if a == b else f"structure drift: -{len(set(a)-set(b))} +{len(set(b)-set(a))} lines"
    return rel, len(body.split()), len(new.split()), drift
with cf.ThreadPoolExecutor(6) as ex:
    for rel, a, b, d in ex.map(one, files): print(f"[compact] {rel}: {a} -> {b} words {d}")
