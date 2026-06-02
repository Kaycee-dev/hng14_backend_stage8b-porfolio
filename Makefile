# HNG14 Stage 8b portfolio — make targets

BUILD_DIR ?= out
URL ?=

.PHONY: help ship-check ship-check-url

help:
	@echo "make ship-check            # gate against built files in \$$BUILD_DIR (default: dist)"
	@echo "make ship-check-url URL=…  # gate against a running server"

ship-check:
	@BUILD_DIR=$(BUILD_DIR) bash scripts/ship-check.sh

ship-check-url:
	@URL=$(URL) bash scripts/ship-check.sh
