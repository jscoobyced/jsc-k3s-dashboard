.PHONY: .env
K3UID:= $(shell id -u)
K3GID:= $(shell id -g)

clean:
	@echo "Deleting all assets."
	@./etc/bin/cleanup.sh

setup:
	@./etc/bin/setup_k8s.sh
	@./etc/bin/env.sh
	@./etc/bin/setup.sh

reset: clean setup

dev:
	K3UID=$(K3UID) K3GID=$(K3GID) docker-compose up web -d

stop:
	K3UID=$(K3UID) K3GID=$(K3GID) docker-compose stop

deploy:
	@echo "Deploying to cluster."
	@./etc/bin/deploy.sh

api:
	@./etc/bin/api.sh

undeploy:
	@echo "Deleting from cluster."
	@./etc/bin/undeploy.sh

build:
	@./etc/bin/build.sh

build-push:
	@./etc/bin/build.sh Y