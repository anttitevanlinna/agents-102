#!/usr/bin/env node
'use strict';
// attention-load.js: what a learner must read and scroll, measured on a BUILT
// handbook page the way a learner has it: half a laptop screen beside the agent.
// Instrument for curriculum/attention-design.md. Reports, never gates.
//
//   node curriculum/evals/scripts/attention-load.js [--page site/agents-101/index.html]
//        [--width 720] [--height 800] [--wpm 200] [--modules a,b] [--json] [--full-prompts]
//
// Per module: handbook words outside prompt boxes (callouts on a prompt box
// count here: they are the handbook speaking), prompts and their words, the
// prompt words in view (a prompt shown in short counts its short form), screens,
// words in front of each prompt, prompt boxes taller than 3/4 of the screen,
// prompts that state a reply length (pattern count, approximate), reading slides
// and stretches between prompts.
// --full-prompts opens every prompt shown in short first: the same page as it
// reads without the short view, for a before and after on one build.

const path = require('node:path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '../../..');
const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf('--' + name); return i >= 0 ? argv[i + 1] : def; };
const PAGE = path.resolve(ROOT, opt('page', 'site/agents-101/index.html'));
const W = Number(opt('width', 720)), H = Number(opt('height', 800)), WPM = Number(opt('wpm', 200));
const ONLY = opt('modules', '') ? opt('modules', '').split(',') : null;
const FULL = argv.includes('--full-prompts');
const REPLY_LEN = /\b(in|under|at most|no more than|within)\s+(one|two|three|four|five|six|seven|eight|nine|ten|twelve|\d+)\s+(short\s+)?(lines?|sentences?|bullets?|pieces|words|paragraphs?|snippets)/i;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await page.goto('file://' + PAGE);
  await page.waitForTimeout(600);
  const raw = await page.evaluate((full) => {
    if (full) document.querySelectorAll('.prompt-block--short').forEach((b) => b.classList.remove('prompt-block--short'));
    const vis = (e) => e && e.getBoundingClientRect().height > 0;
    const wc = (t) => (t.match(/[A-Za-z0-9][^\s]*/g) || []).length;
    return [...document.querySelectorAll('section.module')].filter(vis).map((sec) => {
      const els = [...sec.querySelectorAll('h1,h2,h3,p,li,blockquote,td,th,figcaption,.prompt-block')].filter(vis).filter((el) => {
        if (el.classList.contains('prompt-block')) return true;
        if (el.closest('pre') || el.closest('.prompt-block')) return false;
        return !(el.tagName === 'P' && el.closest('li,blockquote,td'));
      });
      const prompts = [], slides = []; let lead = 0, body = 0, slide = null;
      for (const el of els) {
        if (el.classList.contains('prompt-block')) {
          const pre = el.querySelector('pre'), view = el.querySelector('.prompt-short');
          if (!pre) continue;
          const short = vis(view);
          const text = (sel) => [...el.querySelectorAll(sel)].map((n) => n.textContent).join(' ');
          const callouts = short ? wc(text('.prompt-callout')) : 0;
          prompts.push({
            lead, words: wc(pre.textContent), inView: short ? wc(text('.prompt-short__line')) : wc(pre.textContent), short, callouts,
            px: Math.round((short ? view : pre).getBoundingClientRect().height), text: pre.textContent,
          });
          body += callouts; lead = 0; if (slide) slide.prompts++;
          continue;
        }
        const w = wc(el.textContent); body += w;
        if (el.tagName === 'H2' || el.tagName === 'H1') { slide = { words: 0, prompts: 0 }; slides.push(slide); lead = 0; continue; }
        if (el.tagName === 'H3') { lead = 0; if (slide) slide.words += w; continue; }
        lead += w; if (slide) slide.words += w;
      }
      const names = new Set([...sec.querySelectorAll('code')].filter(vis).filter((c) => !c.closest('pre')).map((c) => c.textContent.trim()));
      return { id: sec.id, px: Math.round(sec.getBoundingClientRect().height), body, prompts, slides, names: names.size };
    });
  }, FULL);
  await browser.close();

  const rows = raw.filter((m) => !ONLY || ONLY.includes(m.id)).map((m) => {
    const ps = m.prompts, reading = m.slides.filter((s) => !s.prompts);
    const stretches = []; let run = 0;
    for (const s of m.slides) { if (s.prompts) { if (run) stretches.push(run); run = 0; } else run += s.words; }
    if (run) stretches.push(run);
    return {
      module: m.id, words: m.body, minutes: Math.round(m.body / WPM), prompts: ps.length,
      promptWords: ps.reduce((a, p) => a + p.words, 0), promptWordsInView: ps.reduce((a, p) => a + p.inView, 0),
      shortPrompts: ps.filter((p) => p.short).length, calloutWords: ps.reduce((a, p) => a + p.callouts, 0),
      screens: +(m.px / H).toFixed(1),
      lead30: ps.filter((p) => p.lead <= 30).length, lead60: ps.filter((p) => p.lead > 30 && p.lead <= 60).length,
      leadOver60: ps.filter((p) => p.lead > 60).length, tallPrompts: ps.filter((p) => p.px > H * 0.75).length,
      replyLength: ps.filter((p) => REPLY_LEN.test(p.text)).length,
      readingSlides: reading.length, slidesOver80: reading.filter((s) => s.words > 80).length,
      longestStretch: Math.max(0, ...stretches), names: m.names,
    };
  });
  if (argv.includes('--json')) { console.log(JSON.stringify(rows, null, 1)); return; }
  console.log(`${path.relative(ROOT, PAGE)} at ${W}x${H}, ${WPM} words a minute`);
  console.table(rows);
})();
