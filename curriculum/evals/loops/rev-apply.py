#!/usr/bin/env python3
"""rev-apply.py <checkout> <variant> — a variant named after a git revision: the student-facing
curriculum (trainings, lectures, exercises, slides, prompts) as it stood at that revision.
Use with BASE_REV to compare two points in history, e.g. before and after a language sweep:
  BASE_REV=1059873 loop.sh security curriculum/evals/loops/rev-apply.py v1@28dc7d0 <out>   (variant v1 = text at 28dc7d0)"""
import sys, subprocess
co, rev = sys.argv[1], sys.argv[2].split("@")[-1]
paths = ["curriculum/trainings", "curriculum/lectures", "curriculum/exercises", "curriculum/slides", "curriculum/prompts"]
subprocess.run(["git", "-C", co, "checkout", rev, "--", *paths], check=True)
print(f"[rev-apply] {rev}")
