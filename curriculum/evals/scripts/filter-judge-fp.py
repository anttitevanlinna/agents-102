#!/usr/bin/env python3
"""Strip systematic false positives from a writing-class judge JSON.

The judge prompt explicitly exempts maintainer-block content (below
`<!-- maintainer -->`) and fenced code blocks (between ``` markers), but
Haiku-class judges drop the constraint under load. This script enforces
the exemption deterministically by reading the source file, computing
the cut line + fence ranges, then dropping any flag whose evidence cites
a line outside the body region.

Usage:
    filter-judge-fp.py <source.md> <judge.json> [--in-place]

Without --in-place, prints the filtered JSON to stdout.
"""

import json
import re
import sys
from pathlib import Path


LINE_RE = re.compile(r"[Ll]ine\s+(\d+)")


def body_predicate(source_path: Path):
    """Return a function `is_body(line_no:int) -> bool`."""
    lines = source_path.read_text().splitlines()
    cut = None
    fences = []
    in_fence = False
    fence_start = None
    for i, line in enumerate(lines, start=1):
        stripped = line.strip()
        if cut is None and stripped == "<!-- maintainer -->":
            cut = i
        if stripped.startswith("```"):
            if not in_fence:
                in_fence = True
                fence_start = i
            else:
                fences.append((fence_start, i))
                in_fence = False
                fence_start = None
    if in_fence and fence_start is not None:
        fences.append((fence_start, len(lines)))

    def is_body(line_no: int) -> bool:
        if cut is not None and line_no >= cut:
            return False
        for start, end in fences:
            if start <= line_no <= end:
                return False
        return True

    return is_body, cut, fences


def extract_line_no(evidence):
    if not evidence:
        return None
    m = LINE_RE.search(evidence)
    if not m:
        return None
    return int(m.group(1))


def filter_judge_json(source_path: Path, judge_path: Path):
    is_body, cut, fences = body_predicate(source_path)
    data = json.loads(judge_path.read_text())
    rules = data.get("rules_evaluated", [])
    kept = []
    dropped = []
    for rule in rules:
        if rule.get("verdict") != "REVISE":
            kept.append(rule)
            continue
        line_no = extract_line_no(rule.get("evidence"))
        if line_no is None:
            kept.append(rule)
            continue
        if is_body(line_no):
            kept.append(rule)
        else:
            dropped.append(
                {
                    "compendium": rule.get("compendium"),
                    "rule_index": rule.get("rule_index"),
                    "rule_lead": rule.get("rule_lead"),
                    "evidence": rule.get("evidence"),
                    "reason": (
                        f"line {line_no} below maintainer-cut at line {cut}"
                        if cut is not None and line_no >= cut
                        else f"line {line_no} inside fenced code block"
                    ),
                }
            )
    data["rules_evaluated"] = kept
    blocking = sum(
        1
        for r in kept
        if r.get("verdict") == "REVISE" and r.get("blocking") is True
    )
    todos = sum(
        1
        for r in kept
        if r.get("verdict") == "REVISE" and r.get("blocking") is False
    )
    data["blocking_findings_count"] = blocking
    data["todos_count"] = todos
    data["verdict"] = "REVISE" if blocking > 0 else "PASS"
    data["fp_filtered"] = {
        "maintainer_cut_line": cut,
        "fence_ranges": fences,
        "dropped_count": len(dropped),
        "dropped": dropped,
    }
    return data


def main(argv):
    if len(argv) < 3:
        print(__doc__, file=sys.stderr)
        sys.exit(2)
    source_path = Path(argv[1])
    judge_path = Path(argv[2])
    in_place = "--in-place" in argv[3:]
    data = filter_judge_json(source_path, judge_path)
    out = json.dumps(data, indent=2, ensure_ascii=False)
    if in_place:
        judge_path.write_text(out + "\n")
        print(
            f"{judge_path.name}: kept {len(data['rules_evaluated'])} rules, "
            f"dropped {data['fp_filtered']['dropped_count']} FPs, "
            f"verdict {data['verdict']} "
            f"(blocking {data['blocking_findings_count']}, "
            f"todos {data['todos_count']})"
        )
    else:
        print(out)


if __name__ == "__main__":
    main(sys.argv)
