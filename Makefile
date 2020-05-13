deps: ## Update dependencies (Gemfile & Webpack & Compress image)
	bundle install
	cd _webpack && npm install && webpack
	jpegoptim assets/img/**/*.jpg
	optipng assets/img/**/*.png

dev: ## Build local site
	jekyll s --trace

new_post: ## New blog post template. Usage: make new_post title="Post Title"
	@echo "---\nlayout: post\ntitle: $(title)\ndate: $$(date "+%B %d, %Y")\n\
	---\n\nContent ..." >> _posts/$$(date +%Y-%m-%d)-$$(echo $(title) | sed -e 's/ /-/g').md
	@echo "\033[0;32mCreated\033[0m _posts/$$(date +%Y-%m-%d)-$$(echo $(title) | sed -e 's/ /-/g').md"

help: ## Display help message
	@awk 'BEGIN {FS = ":.*##"; \
	printf "Usage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"}\
	/^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 }'\
	$(MAKEFILE_LIST)
