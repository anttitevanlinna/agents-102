'use strict';
// guard.js — cheap checks against an editing loop gaming the fast measure.
// slogan(page, bigIdea): sentences that echo the Big Idea's own wording (>= half its content words).
// The fast measure rewards saying the idea; a page that repeats its wording everywhere teaches a slogan.
// Held-out personas (legal-lead, public-head, sales-vp, founder-small) never
// appear in a fast cycle: run.js --personas with them is the gate's second opinion. Taste and story
// judges are owed every 3 accepted cycles and always before main (loop.sh, unchanged).
const STOP = new Set('a an the and or of to in on for is are be it its your you we our with as at by that this from how what when not no can into than then so if is'.split(' '));
const words = (s) => (s.toLowerCase().match(/[a-z][a-z'-]+/g) || []).filter((w) => !STOP.has(w) && w.length > 2);
function slogan(page, big) {
  const key = new Set(words(big)); if (!key.size) return 0;
  return page.split(/(?<=[.!?])\s+|\n+/).filter((s) => { const w = new Set(words(s)); let k = 0; for (const x of key) if (w.has(x)) k++; return k / key.size >= 0.5; }).length;
}
module.exports = { slogan, HOLDOUT: ['legal-lead', 'public-head', 'sales-vp', 'founder-small'] };
