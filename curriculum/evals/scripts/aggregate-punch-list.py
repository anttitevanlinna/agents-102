#!/usr/bin/env python3
"""Aggregate writing-class judge JSONs into a markdown punch list.

Usage:
    aggregate-punch-list.py <instances-dir> [--class writing|story|technical|behavior]
"""

import json
import sys
from pathlib import Path


def main(argv):
    if len(argv) < 2:
        print(__doc__, file=sys.stderr)
        sys.exit(2)
    instances_dir = Path(argv[1])
    cls = "writing"
    if "--class" in argv:
        cls = argv[argv.index("--class") + 1]

    pass_files = []
    pass_with_todos = []
    revise_files = []

    for jp in sorted(instances_dir.glob(f"*.{cls}.json")):
        try:
            data = json.loads(jp.read_text())
        except json.JSONDecodeError as exc:
            print(f"BROKEN JSON: {jp.name}: {exc}", file=sys.stderr)
            continue
        verdict = data.get("verdict", "?")
        blocking = data.get("blocking_findings_count", 0)
        todos = data.get("todos_count", 0)
        rules = data.get("rules_evaluated", [])
        slug = jp.name.replace(f".{cls}.json", "")
        revises = [
            r for r in rules
            if r.get("verdict") == "REVISE"
        ]
        record = {
            "slug": slug,
            "blocking": blocking,
            "todos": todos,
            "revises": revises,
            "fp_dropped": (data.get("fp_filtered") or {}).get("dropped_count", 0),
        }
        if verdict == "REVISE":
            revise_files.append(record)
        elif todos > 0:
            pass_with_todos.append(record)
        else:
            pass_files.append(record)

    total = len(pass_files) + len(pass_with_todos) + len(revise_files)
    total_blocking = sum(r["blocking"] for r in revise_files)
    total_todos = sum(r["todos"] for r in pass_with_todos + revise_files)
    total_fp = sum(r["fp_dropped"] for r in pass_files + pass_with_todos + revise_files)

    print(f"# {cls.title()}-class punch list — {total} files\n")
    print(
        f"**{len(pass_files)} PASS** · "
        f"**{len(pass_with_todos)} PASS-with-todos** · "
        f"**{len(revise_files)} REVISE**  "
        f"({total_blocking} blocking findings, {total_todos} TODOs across all files; "
        f"{total_fp} false positives stripped by post-filter)\n"
    )

    if revise_files:
        print(f"\n## REVISE ({len(revise_files)})\n")
        for r in revise_files:
            print(f"### {r['slug']} — {r['blocking']} blocking, {r['todos']} TODOs")
            for rule in r["revises"]:
                tag = "BLOCK" if rule.get("blocking") else "todo"
                ev = (rule.get("evidence") or "").replace("\n", " ")[:200]
                fix = rule.get("fix") or rule.get("fix_hint") or ""
                fix = fix.replace("\n", " ")[:200]
                rule_lead = (rule.get("rule_lead") or "")[:80]
                print(
                    f"- [{tag}] **{rule.get('compendium')}#{rule.get('rule_index','?')}** "
                    f"— {rule_lead}\n"
                    f"  - {ev}\n"
                    f"  - **fix:** {fix}\n" if fix else
                    f"  - {ev}\n"
                )
            print()

    if pass_with_todos:
        print(f"\n## PASS-with-todos ({len(pass_with_todos)})\n")
        for r in pass_with_todos:
            print(f"### {r['slug']} — {r['todos']} TODOs")
            for rule in r["revises"]:
                ev = (rule.get("evidence") or "").replace("\n", " ")[:200]
                rule_lead = (rule.get("rule_lead") or "")[:80]
                print(f"- {rule.get('compendium')}#{rule.get('rule_index','?')} — {rule_lead} :: {ev}")
            print()

    if pass_files:
        print(f"\n## PASS ({len(pass_files)})\n")
        for r in pass_files:
            print(f"- {r['slug']}")


if __name__ == "__main__":
    main(sys.argv)
