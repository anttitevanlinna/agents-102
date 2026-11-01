#!/usr/bin/env python3
"""build-page.py — embed cards.json + queue.json into template.html → calls.html (the published page)."""
import json, pathlib
d = pathlib.Path(__file__).parent
j = lambda o: json.dumps(o, ensure_ascii=False).replace("</", "<\\/")
cards = json.loads((d / "cards.json").read_text()); queue = json.loads((d / "queue.json").read_text())
cards += [q["card"] for q in queue["queue"] if "card" in q and q["card"]["id"] not in {c["id"] for c in cards}]
for q in queue["queue"]: q.pop("card", None)
html = (d / "template.html").read_text().replace("__CARDS__", j(cards)).replace("__QUEUE__", j(queue))
(d / "calls.html").write_text(html)
print(f"[page] calls.html: {len(queue['queue'])} in queue, {len(cards)} cards")
