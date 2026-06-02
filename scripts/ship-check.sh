#!/usr/bin/env bash
# ship-check.sh — release gate for the HNG14 Stage 8b portfolio.
# The portfolio's equivalent of a Newman pack: it verifies truth-and-traceability
# facts a tired reviewer would otherwise catch. Honest by design — if a check
# can't run, it WARNs loudly rather than silently passing.
#
# Usage:
#   BUILD_DIR=out ./scripts/ship-check.sh           # check built files
#   URL=http://localhost:5173 ./scripts/ship-check.sh   # check a running server
#
# Exit 0 only if every HARD check passes. WARNs never fail the build but must be
# read. Configure expected sections via REQUIRED_SECTIONS.

set -uo pipefail

BUILD_DIR="${BUILD_DIR:-out}"
URL="${URL:-}"
FAILS=0
WARNS=0

red(){ printf '\033[31m%s\033[0m\n' "$*"; }
grn(){ printf '\033[32m%s\033[0m\n' "$*"; }
ylw(){ printf '\033[33m%s\033[0m\n' "$*"; }
fail(){ red   "FAIL: $*"; FAILS=$((FAILS+1)); }
warn(){ ylw   "WARN: $*"; WARNS=$((WARNS+1)); }
pass(){ grn   "PASS: $*"; }

# --- Resolve the HTML to inspect -------------------------------------------
HTML=""
if [[ -n "$URL" ]]; then
  if command -v curl >/dev/null; then
    HTML="$(curl -fsSL "$URL" 2>/dev/null)" || fail "could not fetch $URL"
  else
    warn "curl not found; cannot fetch URL"
  fi
else
  if [[ -f "$BUILD_DIR/index.html" ]]; then
    HTML="$(cat "$BUILD_DIR/index.html")"
  elif [[ -f "index.html" ]]; then
    HTML="$(cat index.html)"; BUILD_DIR="."
  else
    fail "no index.html in '$BUILD_DIR' and no URL given — nothing to check"
  fi
fi
if command -v perl >/dev/null; then
  VISIBLE_HTML="$(printf '%s' "$HTML" | perl -0777 -pe 's#<script\b[^>]*>.*?</script>##gis; s#<style\b[^>]*>.*?</style>##gis; s#<template\b[^>]*>.*?</template>##gis')"
else
  VISIBLE_HTML="$HTML"
  warn "perl not found; text-derived checks may include framework script payload"
fi
TEXT="$(printf '%s' "$VISIBLE_HTML" | sed 's/<[^>]*>/ /g')"

# --- 1. Required sections ---------------------------------------------------
REQUIRED_SECTIONS=("profile" "project" "skill" "featured" "reflection" "contact")
for s in "${REQUIRED_SECTIONS[@]}"; do
  if printf '%s' "$HTML" | grep -qiE "id=\"[^\"]*$s|>$s|$s</"; then
    pass "section present: $s"
  else
    fail "required section missing or unlabelled: $s"
  fi
done

# --- 2. Deep-dive sub-parts -------------------------------------------------
for p in "problem" "architecture|request flow" "endpoint|module|route" "challenge"; do
  if printf '%s' "$TEXT" | grep -qiE "$p"; then pass "deep-dive part: $p"
  else warn "deep-dive part not detected (check manually): $p"; fi
done

# --- 3. Claim markers must not survive into shipped copy --------------------
if printf '%s' "$HTML" | grep -qiE '\[CONFIRM\]|TODO|FIXME|XXX|\?\?\?|Lorem ipsum'; then
  fail "unfilled claim marker found in output (CONFIRM/TODO/FIXME/Lorem)"
else
  pass "no claim markers in output"
fi

# --- 4. Buzzword scan (advisory) -------------------------------------------
BUZZ='cutting-edge|synergy|synergistic|world-class|ninja|rockstar|seamless\b|revolutionary|leverage\b|robust scalable|bleeding-edge'
if printf '%s' "$TEXT" | grep -qiE "$BUZZ"; then
  warn "possible buzzwords present — review against C-1/G-1: $(printf '%s' "$TEXT" | grep -ioE "$BUZZ" | sort -u | tr '\n' ' ')"
else
  pass "no obvious buzzwords"
fi

# --- 5. Secret scan ---------------------------------------------------------
SECRET='AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]+|-----BEGIN [A-Z ]*PRIVATE KEY-----|postgres(ql)?:\/\/[^ "]*:[^ "@]*@'
SCAN_TARGET="$HTML"
[[ -d "$BUILD_DIR" && "$BUILD_DIR" != "." ]] && SCAN_TARGET="$SCAN_TARGET $(grep -rIEh "$SECRET" "$BUILD_DIR" 2>/dev/null || true)"
if printf '%s' "$SCAN_TARGET" | grep -qE "$SECRET"; then
  fail "possible secret/credential detected — scrub before ship (G-3)"
else
  pass "secret scan clean"
fi

# --- 6. PII scan (advisory) -------------------------------------------------
if printf '%s' "$TEXT" | grep -qE '\+?[0-9][0-9 ()-]{8,}[0-9]'; then
  warn "a phone-number-like string is present — confirm it's intended (G-3)"
fi

# --- 7. Internal anchors resolve -------------------------------------------
ANCHORS="$(printf '%s' "$HTML" | grep -oE 'href="#[^"]+"' | sed 's/href="#//;s/"//' | sort -u)"
for a in $ANCHORS; do
  if printf '%s' "$HTML" | grep -qE "id=\"$a\""; then :; else fail "nav anchor #$a has no matching element id"; fi
done
[[ -n "$ANCHORS" && $FAILS -eq 0 ]] && pass "internal anchors resolve"

# --- 8. External link integrity (HTTP 200) ----------------------------------
if command -v curl >/dev/null; then
  LINKS="$(printf '%s' "$HTML" | grep -oE 'href="https?://[^"]+"' | sed 's/href="//;s/"//' | sort -u)"
  if [[ -z "$LINKS" ]]; then warn "no external links found to check"; fi
  for l in $LINKS; do
    code="$(curl -o /dev/null -sL -w '%{http_code}' --max-time 15 "$l" 2>/dev/null)"
    if [[ "$code" == "200" || "$code" == "301" || "$code" == "302" ]]; then
      pass "link $code: $l"
    else
      fail "link returned $code (not live): $l  — revive or reframe (G-2)"
    fi
  done
else
  warn "curl not found; skipped link integrity (DO NOT submit without checking links)"
fi

# --- 9. Image resolution (local files only) ---------------------------------
if [[ -d "$BUILD_DIR" && "$BUILD_DIR" != "." ]]; then
  for img in $(printf '%s' "$HTML" | grep -oE 'src="[^"]+\.(png|jpg|jpeg|webp|svg|gif)"' | sed 's/src="//;s/"//'); do
    case "$img" in
      http*) : ;; # external imgs covered by link check
      *) [[ -f "$BUILD_DIR/${img#/}" || -f "$img" ]] && pass "image present: $img" || fail "image missing: $img" ;;
    esac
  done
fi

# --- 10. Read-time estimate -------------------------------------------------
WORDS="$(printf '%s' "$TEXT" | wc -w | tr -d ' ')"
MINS=$(( (WORDS + 199) / 200 ))
if (( MINS <= 5 )); then pass "read-time ~${MINS} min (${WORDS} words) — within 3–5 min budget"
else warn "read-time ~${MINS} min (${WORDS} words) — over 5 min, consider cutting (E-13)"; fi

# --- 11. Lighthouse (advisory) ----------------------------------------------
if command -v lighthouse >/dev/null && [[ -n "$URL" ]]; then
  warn "run 'lighthouse $URL --only-categories=performance,accessibility' and confirm ≥90 (advisory)"
fi

echo "--------------------------------------------------"
if (( FAILS > 0 )); then
  red "ship-check: $FAILS FAIL, $WARNS WARN — NOT shippable."
  exit 1
else
  grn "ship-check: 0 FAIL, $WARNS WARN — hard checks pass. Read WARNs before submitting."
  exit 0
fi
