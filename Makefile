# HELP
.PHONY: help

help: ## Makefile help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

dev: ## Start dev env
	sudo -E docker-compose up

bash: ## Access node container command line
	sudo -E docker-compose run node bash

tests: ## Run test on application
	sudo -E docker-compose run node npm run test
	sudo -E docker-compose run node npm run test:e2e

test-coverage: ## Show test coverage
	sudo -E docker-compose run node npm run test:cov