#!/usr/bin/env python3
"""build-page.py — embed cards.json into template.html → calls.html (the published page)."""
import json, pathlib
d = pathlib.Path(__file__).parent
cards = json.dumps(json.loads((d / "cards.json").read_text()), ensure_ascii=False).replace("</", "<\\/")
(d / "calls.html").write_text((d / "template.html").read_text().replace("__CARDS__", cards))
print("[page] calls.html")
