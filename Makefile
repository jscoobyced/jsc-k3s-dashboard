API_TOKEN:= $(shell ./etc/bin/token.sh Y)

cleanup:
	@echo "Deleting all assets."
	@./etc/bin/cleanup.sh

setup:
	@echo "Building for production"
	@./etc/bin/build.sh $(DOCKER_ID) Y
	@echo "Configuring YAML and deploying it"
	@./etc/bin/first-deploy.sh $(MAIN_NODE_IP) $(DOCKER_ID) $(SERVICE_IP)

build:
	@echo "Building for production"
	@echo ./etc/bin/build.sh $(DOCKER_ID) Y

deploy:
	@echo "Deploying to cluster."
	@./etc/bin/redeploy.sh $(MAIN_NODE_IP)

undeploy:
	@echo "Undeploying from cluster"
	@./etc/bin/undeploy.sh

dev:
	@docker-compose build web
	@docker-compose run --rm -e MAIN_NODE_IP="$(MAIN_NODE_IP)" -e API_TOKEN="$(API_TOKEN)" --service-ports web 