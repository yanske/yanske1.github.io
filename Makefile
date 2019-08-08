deps: ## Update dependencies (Gemfile & Webpack & Compress image)
	bundle install
	cd _webpack && npm install && webpack
	jpegoptim assets/img/**/*.jpg
	optipng assets/img/**/*.png

dev: ## Build local site
	jekyll s

new_post: ## New blog post template
	@echo "---\nlayout: post\ntitle: Post Title\ndate: $$(date "+%B %d, %Y")\n\
	---\n\nContent ..." >> _posts/$$(date +%Y-%m-%d)-Post-Title.md
	@echo "\033[0;32mCreated\033[0m _posts/$$(date +%Y-%m-%d)-Post-Title.md"

new_project: ## New project page template
	@echo "---\nlayout: project\ntitle: Project Title\ntools: A, B, C\n\
	date: $$(date +%Y-%m-%d)\ndp: icon.png\nimg: body.png\n\
	desc: Short description here\n\
	github: https://github.com/yanske1/project\n---\n\nContent ..."\
	>> _projects/project_title.md
	@echo "\033[0;32mCreated\033[0m _projects/project_title.md"

help: ## Display help message
	@awk 'BEGIN {FS = ":.*##"; \
	printf "Usage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"}\
	/^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 }'\
	$(MAKEFILE_LIST)
