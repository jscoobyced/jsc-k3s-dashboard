.PHONY: .setup
UID:= $(shell id -u)
GID:= $(shell id -g)

clean:
	@echo "Deleting all assets."
	@./etc/bin/cleanup.sh

.env:
	@./etc/bin/env.sh

.setup:
	@./etc/bin/setup_k8s.sh
	@./etc/bin/setup.sh
	@docker-compose build web

setup: .setup .env

dev:
	UID=$(UID) GID=$(GID) docker-compose up -d web

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