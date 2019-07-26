deps: ## Update dependencies (Gemfile & Webpack)
	bundle install
	cd _webpack && npm install && webpack

dev: ## Build local site
	jekyll s

help: ## Display help message
	@awk 'BEGIN {FS = ":.*##"; \
		printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ \
		{ printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
