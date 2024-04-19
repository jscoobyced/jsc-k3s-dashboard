.PHONY: .setup
UID:= $(shell id -u)
GID:= $(shell id -g)

cleanup:
	@echo "Deleting all assets."
	@./etc/bin/cleanup.sh

.env:
	@./etc/bin/env.sh

.setup:
	@./etc/bin/setup_k8s.sh
	@./etc/bin/setup.sh
	@openssl req -x509 -nodes -days 365 -newkey rsa:2048 -subj "/C=TH/ST=Bangkok/L=Bangkok/O=R&D/CN=webtest" -keyout ./code/e2e/data/selfsigned.key -out ./code/e2e/data/selfsigned.crt
	@docker-compose build web webtest

setup: .setup .env

dev:
	UID=$(UID) GID=$(GID) docker-compose up -d web webtest

stop:
	UID=$(UID) GID=$(GID) docker-compose down

deploy:
	@echo "Deploying to cluster."
	@./etc/bin/deploy.sh

undeploy:
	@echo "Deleting from cluster."
	@./etc/bin/undeploy.sh

build:
	@./etc/bin/build.sh