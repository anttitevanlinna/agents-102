#!/usr/bin/env python3
"""Sweep curriculum body prose for auto-fixable and report-only banned patterns.

The eval-class-router hook auto-fixes em-dash and a few substitutable banned
words silently on each Edit/Write. But pre-existing residuals in files that
haven't been touched since the hook landed slip through. This script does a
one-time sweep across a named file set:

- **Auto-fix in place** (silent, matches hook substitution table):
    `\s*—\s*` (em-dash with optional surrounding whitespace) → `, `
    Body-only (above `<!-- maintainer -->`, outside ``` fences).

- **Report only** (judgment-required substitution; no auto-fix):
    `\bhonest`, `\bdelve`, `\bimportantly`, `\bcrucial`, `\bsubstrate`,
    `\bleverage` (verb), `\bsynergize`, `\bparadigm shift`, `\bhonestly`,
    `ritual`, `ceremony` (when used as nouns).

Usage:
    sweep-banned.py <file> [<file> ...]
"""

import re
import sys
from pathlib import Path


REPORT_PATTERNS = [
    (re.compile(r"\bhonest(ly)?\b", re.I), "honest/honestly"),
    (re.compile(r"\bdelve\b", re.I), "delve"),
    (re.compile(r"\bimportantly\b", re.I), "importantly"),
    (re.compile(r"\bcrucial(ly)?\b", re.I), "crucial(ly)"),
    (re.compile(r"\bsubstrate\b", re.I), "substrate"),
    (re.compile(r"\bsynergize\b", re.I), "synergize"),
    (re.compile(r"\bparadigm shift\b", re.I), "paradigm shift"),
    (re.compile(r"\bleverage\s+(the|a|an|its|their|our|your)\b", re.I), "leverage (verb)"),
    (re.compile(r"\b(ritual|ceremony)\b", re.I), "ritual/ceremony"),
]


def body_regions(text):
    """Return (cut_line, fence_ranges). cut_line is None if absent."""
    lines = text.splitlines()
    cut = None
    fences = []
    in_fence = False
    fence_start = None
    for i, line in enumerate(lines, start=1):
        s = line.strip()
        if cut is None and s == "<!-- maintainer -->":
            cut = i
        if s.startswith("```"):
            if not in_fence:
                in_fence = True
                fence_start = i
            else:
                fences.append((fence_start, i))
                in_fence = False
                fence_start = None
    if in_fence and fence_start is not None:
        fences.append((fence_start, len(lines)))
    return cut, fences


def is_body(line_no, cut, fences):
    if cut is not None and line_no >= cut:
        return False
    for s, e in fences:
        if s <= line_no <= e:
            return False
    return True


def sweep_one(path: Path):
    text = path.read_text()
    cut, fences = body_regions(text)
    lines = text.splitlines(keepends=True)
    autofix_changes = []
    reports = []

    for i, line in enumerate(lines, start=1):
        if not is_body(i, cut, fences):
            continue

        new_line = line
        if "—" in new_line:
            count = new_line.count("—")
            new_line = re.sub(r"\s*—\s*", ", ", new_line)
            autofix_changes.append((i, "em-dash", count))

        if new_line != line:
            lines[i - 1] = new_line

        for rx, label in REPORT_PATTERNS:
            for m in rx.finditer(new_line):
                reports.append((i, label, m.group(0), new_line.rstrip("\n").strip()[:120]))

    if autofix_changes:
        path.write_text("".join(lines))

    return autofix_changes, reports


def main(argv):
    if len(argv) < 2:
        print(__doc__, file=sys.stderr)
        sys.exit(2)
    files = [Path(p) for p in argv[1:]]
    total_autofix = 0
    total_report = 0
    print("# Sweep report\n")
    for f in files:
        if not f.exists():
            print(f"## {f} — MISSING")
            continue
        autofix, reports = sweep_one(f)
        if not autofix and not reports:
            continue
        print(f"## {f}")
        if autofix:
            for line_no, kind, count in autofix:
                print(f"  AUTOFIX line {line_no}: {kind} ({count})")
            total_autofix += sum(c for _, _, c in autofix)
        if reports:
            for line_no, label, match, snippet in reports:
                print(f"  REPORT  line {line_no}: {label} -> '{match}' :: {snippet}")
            total_report += len(reports)
        print()
    print(f"# Totals: autofix {total_autofix}, report-only {total_report}")


if __name__ == "__main__":
    main(sys.argv)
