.DEFAULT_GOAL := check

.PHONY: check

check: ## Run exactly the local validation CI runs (frozen install, format, lint, typecheck)
	bun install --frozen-lockfile
	bun run format:check
	bun run lint
	bun run check
