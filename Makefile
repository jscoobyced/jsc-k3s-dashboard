.PHONY: .setup

cleanup:
	@echo "Deleting all assets."
	@./etc/bin/cleanup.sh
	@rm -f .env

.env:
	@./etc/bin/env.sh

.setup:
	@./etc/bin/setup_k8s.sh
	@./etc/bin/setup.sh
	@openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./code/e2e/data/selfsigned.key -out ./code/e2e/data/selfsigned.crt
	@docker-compose build web webtest


setup: .setup .env

dev:
	@docker-compose up -d web webtest

stop:
	@docker-compose down

# To refactor

build:	
	@echo "Building for production"
	@./etc/bin/build.sh Y

setup-prod: build
	@echo "Configuring YAML"
	@./etc/bin/pre-deploy.sh

prerequisites:
	@echo "Installing pre-requisites to cluster"
	@./etc/bin/permissions.sh
	@./etc/bin/token.sh
	@openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./code/e2e/data/selfsigned.key -out ./code/e2e/data/selfsigned.crt

deploy:
	@echo "Deploying to cluster."
	@./etc/bin/redeploy.sh

undeploy:
	@echo "Undeploying from cluster"
	@./etc/bin/undeploy.sh

