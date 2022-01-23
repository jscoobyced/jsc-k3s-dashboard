env:
	@rm -f .env
	@echo "API_TOKEN=$(shell ./etc/bin/token.sh Y)" >> .env
	@echo "MAIN_NODE_IP=$(MAIN_NODE_IP)" >> .env
	@echo "USERID=$(shell id -u)" >> .env
	@echo "GROUPID=$(shell id -g)" >> .env
	@echo "DOCKER_ID=$(DOCKER_ID)" >> .env
	@echo "SERVICE_IP=$(SERVICE_IP)" >> .env

build:	
	@echo "Building for production"
	@./etc/bin/build.sh Y

setup-prod:
	@make build
	@echo "Configuring YAML"
	@./etc/bin/pre-deploy.sh

prerequisites:
	@echo "Installing pre-requisites to cluster"
	@./etc/bin/permissions.sh
	@./etc/bin/token.sh

first-deploy:
	@echo "Deploying to cluster."
	@./etc/bin/deploy.sh

deploy:
	@echo "Deploying to cluster."
	@./etc/bin/redeploy.sh

setup-dev:
	@docker-compose build web test

undeploy:
	@echo "Undeploying from cluster"
	@./etc/bin/undeploy.sh

cleanup:
	@make undeploy
	@echo "Deleting all assets."
	@./etc/bin/cleanup.sh
	@rm .env

dev:
	@docker-compose up -d web

stop:
	@docker-compose down

tests:
	@docker-compose up --exit-code-from test
