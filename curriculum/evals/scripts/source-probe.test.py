#!/usr/bin/env python3
"""Tests for source-probe.py — the parsing/matching core plus one offline
end-to-end pass over a file:// fixture, so the fetch path is exercised without
network. Run: python3 curriculum/evals/scripts/source-probe.test.py"""

import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
probe = __import__("source-probe")


class ParseStamp(unittest.TestCase):
    def test_full_stamp_line(self):
        line = ('- cherny-via-jadhav `[checked:2026-08-30 result:CAVEAT due:none]` '
                'https://example.com/tips — [practitioner analysis] Verified live: '
                '*"If Claude has a feedback loop to verify its own work"* — quote. '
                'fallback: drop it.')
        s = probe.parse_stamp_line(line)
        self.assertEqual(s["checked"], "2026-08-30")
        self.assertEqual(s["result"], "CAVEAT")
        self.assertEqual(s["due"], "none")
        self.assertEqual(s["url"], "https://example.com/tips")
        self.assertIn("If Claude has a feedback loop to verify its own work", s["quotes"])

    def test_no_url_stamp_is_skipped(self):
        line = ('- `[checked:2025-09-02 result:ATTESTED due:none]` '
                'attested:Antti 2025-09-02 meetup — [maintainer-attested] demo.')
        self.assertIsNone(probe.parse_stamp_line(line))

    def test_short_quotes_dropped(self):
        line = ('- x `[checked:2026-01-01 result:OK due:none]` https://e.com — '
                '[practitioner direct] says *"yes"* and *"a much longer span that '
                'is worth checking on the page"*.')
        s = probe.parse_stamp_line(line)
        self.assertEqual(len(s["quotes"]), 1)
        self.assertTrue(s["quotes"][0].startswith("a much longer"))


class Normalize(unittest.TestCase):
    def test_curly_quotes_and_dashes_fold(self):
        page = "It “2-3x’s” the quality — he said"
        needle = "It \"2-3x's\" the quality — he said"
        self.assertIn(probe.normalize(needle), probe.normalize(page))

    def test_html_is_stripped_and_entities_unescaped(self):
        html = "<p>the loop&rsquo;s <b>working</b>\n  memory</p><script>x&amp;y</script>"
        self.assertIn("the loop's working memory", probe.strip_html(html))
        self.assertNotIn("x&y", probe.strip_html(html))

    def test_inline_tag_boundary_does_not_split_punctuation(self):
        # "now</em>. But" strips to "now . But" — the space an inline tag leaves
        # before punctuation must not defeat a verbatim match.
        html = "<p>I too am the bottleneck <em>now</em>. But you know what?</p>"
        self.assertIn(probe.normalize("I too am the bottleneck now. But you know what?"),
                      probe.strip_html(html))


class PubDate(unittest.TestCase):
    def test_meta_article_published_time(self):
        html = '<meta property="article:published_time" content="2026-01-11T08:00:00Z">'
        self.assertEqual(probe.find_pub_date(html), "2026-01-11")

    def test_json_ld_date_published(self):
        html = '<script type="application/ld+json">{"datePublished": "2026-02-15"}</script>'
        self.assertEqual(probe.find_pub_date(html), "2026-02-15")

    def test_absent_returns_none(self):
        self.assertIsNone(probe.find_pub_date("<p>no dates here</p>"))


class Plus6(unittest.TestCase):
    def test_plain(self):
        self.assertEqual(probe.plus6("2026-04-16"), "2026-10-16")

    def test_year_rollover(self):
        self.assertEqual(probe.plus6("2026-08-30"), "2027-02-28")

    def test_month_end_clamp(self):
        self.assertEqual(probe.plus6("2026-12-31"), "2027-06-30")


class EndToEndOffline(unittest.TestCase):
    def test_file_fixture_probes_live_quote_and_pub(self):
        tmp = tempfile.mkdtemp()
        page = os.path.join(tmp, "page.html")
        with open(page, "w") as f:
            f.write('<meta property="article:published_time" content="2026-01-11">'
                    "<p>Grabs all human comments from the PR and feeds them on.</p>")
        md = os.path.join(tmp, "doc.md")
        with open(md, "w") as f:
            f.write("- shapira `[checked:2026-07-11 result:OK due:2027-01-11]` "
                    f"file://{page} — [practitioner direct] "
                    '*"Grabs all human comments from the PR"* holds. fallback: cut.\n'
                    "- gone `[checked:2026-01-01 result:OK due:none]` "
                    f"file://{tmp}/missing.html — [practitioner direct] "
                    '*"a span that is not going to be found anywhere"*. fallback: cut.\n')
        rows = probe.probe_paths([md], timeout=5)
        by_url = {r["url"]: r for r in rows}
        live = by_url[f"file://{page}"]
        self.assertTrue(live["reachable"])
        self.assertEqual(live["quotes_missing"], [])
        self.assertEqual(live["pub"], "2026-01-11")
        # due equals checked+6mo, pub says otherwise -> proposal fires
        self.assertEqual(live["propose_due"], "2026-07-11")
        dead = by_url[f"file://{tmp}/missing.html"]
        self.assertFalse(dead["reachable"])


if __name__ == "__main__":
    unittest.main(verbosity=1)
