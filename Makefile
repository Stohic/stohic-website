# Consistent entry points for the stohic.com marketing site.
# Every target is safe to run from a clean checkout: `make dev` installs first.

.PHONY: help install dev build preview typecheck clean

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

# node_modules is the install marker. Re-runs only when the lockfile is newer,
# so `make dev` on an up-to-date tree skips straight to vite.
node_modules: package-lock.json
	npm ci
	@touch node_modules

install: node_modules ## Install dependencies from the lockfile

dev: node_modules ## Run the dev server with hot reload
	npm run dev

typecheck: node_modules ## Type check without emitting
	npm run typecheck

build: node_modules ## Type check and build to dist/
	npm run build

preview: build ## Build, then serve dist/ locally
	npm run preview

clean: ## Remove build output and installed dependencies
	rm -rf dist node_modules
