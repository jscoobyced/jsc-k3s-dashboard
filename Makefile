TAG := $(shell git describe --tags --abbrev=0 --exact-match)

env:
	@rm -f .env
	@echo "API_TOKEN=$(shell ./etc/bin/token.sh Y)" >> .env
	@echo "MAIN_NODE_IP=$(MAIN_NODE_IP)" >> .env
	@echo "USERID=$(shell id -u)" >> .env
	@echo "GROUPID=$(shell id -g)" >> .env
	@echo "DOCKER_ID=$(DOCKER_ID)" >> .env
	@echo "SERVICE_IP=$(SERVICE_IP)" >> .env
	@echo "TAG=$(shell git describe --tags --abbrev=0 --exact-match)" >> .env

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
	@openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./code/e2e/data/selfsigned.key -out ./code/e2e/data/selfsigned.crt

first-deploy:
	@echo "Deploying to cluster."
	@./etc/bin/deploy.sh

deploy:
	@echo "Deploying to cluster."
	@./etc/bin/redeploy.sh

setup-dev:
	yarn --cwd code/app install
	yarn --cwd code/app test
	@docker-compose build web cypress webtest

undeploy:
	@echo "Undeploying from cluster"
	@./etc/bin/undeploy.sh

cleanup:
	@make undeploy
	@echo "Deleting all assets."
	@./etc/bin/cleanup.sh
	@rm .env

dev:
	@sed -i "s/TAG=.*/TAG=$(TAG)/g" .env.dev
	@docker-compose up -d web webtest

stop:
	@docker-compose down

ui-tests:
	@make setup-dev
	@docker-compose up --exit-code-from cypress webtest web cypress

unit-tests:
	yarn --cwd code/app test $(COVERAGE)

ci:
	@make stop
	@make ui-tests
	@COVERAGE="--coverage --coverageFrom='./src/'" make unit-tests
