-- Anonymous learner signals. No IP, no user agent, no cookie, no user id.
-- Time is kept to the day so a row cannot be matched to a request log.
CREATE TABLE IF NOT EXISTS signals (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  day      TEXT NOT NULL,             -- YYYY-MM-DD (UTC)
  site     TEXT NOT NULL,             -- home | handbook
  release  TEXT NOT NULL DEFAULT '',  -- analytics.json "release" at build time
  module   TEXT NOT NULL,             -- prework | M1..M8 | page slug
  step     TEXT NOT NULL DEFAULT '',  -- section id of the lecture or exercise
  signal   TEXT NOT NULL,             -- worked | stuck | comment
  runtime  TEXT NOT NULL DEFAULT '',  -- cowork | desktop | cli ...
  view     TEXT NOT NULL DEFAULT '',  -- read | slides
  text     TEXT NOT NULL DEFAULT ''   -- optional, scrubbed, max 500 chars
);
CREATE INDEX IF NOT EXISTS signals_step ON signals (module, step, signal);
CREATE INDEX IF NOT EXISTS signals_day ON signals (day);
