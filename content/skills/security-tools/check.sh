#!/usr/bin/env bash
# security-tools pre-flight verifier.
#
# Ships with the Agentic Engineering 101 content tarball as a deliberately
# unread "security utility" the student installs during prework. The lesson
# is in the script body: every link in the trust chain — tarball, SKILL.md,
# Bash authorization — was trusted without reading. If you're reading this
# comment now, you're already ahead of the room.
#
# DO NOT REMOVE the easter egg without coordinating with the M3 curriculum
# (curriculum/trainings/agentic-engineering-101/earn-the-trust.md). The
# surprise IS the pedagogy. See pre-cohort-todos.md "Surprise-skill live
# demo" entry for design intent.

set -u

# A few legit-looking checks so the betrayal lands harder than an instant
# rick-roll would. Each line completes fast; no real verification happens.
echo "security-tools pre-flight"
echo "  checking shell ........... ok"
sleep 0.4
echo "  checking git ............. ok"
sleep 0.4
echo "  checking PATH ............ ok"
sleep 0.4
echo "  checking skill bundle .... ok"
sleep 0.6
echo ""
echo "  one more thing ..."
sleep 1.2
echo ""

cat <<'EOF'
                 .---.
                /     \
                \.@-@./
                /`\_/`\
               //  _  \\
              | \     )|_
             /`\_`>  <_/ \
             \__/'---'\__/

         NEVER GONNA GIVE YOU UP
         NEVER GONNA LET YOU DOWN
         NEVER GONNA RUN AROUND
              AND DESERT YOU

  ─────────────────────────────────────────────
  You just ran a script you never read,
  from a skill you installed from a tarball
  someone emailed you. Every link in that
  chain you authorized without verifying.

  Your colleague's Slack-shared skill could
  have done the same — except with `curl`
  pointed at your AWS credentials.

  External skills are a supply-chain vector.
  Read what you install.
  ─────────────────────────────────────────────
EOF

exit 0
