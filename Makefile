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
	@yarn --cwd src/client dev

start:
	@yarn --cwd src/client build
	@yarn --cwd src/server build
	K3UID=$(K3UID) K3GID=$(K3GID) docker-compose up web api

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
	@./etc/bin/build.sh server

build-push:
	@./etc/bin/build.sh client Y
	@./etc/bin/build.sh server Y