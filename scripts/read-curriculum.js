'use strict';
// read-curriculum.js — read a curriculum markdown file the way every reader
// must: with its slide-file includes (`[T](slides/<id>.md)`) inlined, so a
// lecture whose slides were cut into curriculum/slides/ reads exactly as it
// did. Raw fs reads of lecture/exercise/module files see include lines instead
// of slides; tests/slide-files equivalence catches a reader that forgot this.
const fs = require('fs');
const path = require('path');
const CR = require('../site/layouts/curriculum.js');

const ROOT = path.resolve(__dirname, '..');

// The slides dir of the curriculum tree this file lives in (a test sandbox
// carries its own curriculum/), else this repo's.
function slidesDirFor(absPath) {
  const parts = path.resolve(absPath).split(path.sep);
  const i = parts.lastIndexOf('curriculum');
  return i >= 0 ? path.join(parts.slice(0, i + 1).join(path.sep), 'slides') : path.join(ROOT, 'curriculum', 'slides');
}

function slideReader(slidesDir) {
  return id => {
    const f = path.join(slidesDir, id + '.md');
    return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null;
  };
}

function inlineSlides(text, absPath) {
  return CR.inlineSlideFiles(text, slideReader(slidesDirFor(absPath)));
}

function readCurriculumMd(absPath) {
  return inlineSlides(fs.readFileSync(absPath, 'utf8'), absPath);
}

module.exports = { readCurriculumMd, inlineSlides, slidesDirFor, slideReader };
