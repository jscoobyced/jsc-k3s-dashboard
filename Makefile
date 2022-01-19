API_TOKEN:= $(shell ./etc/bin/permissions.sh Y)

setup:
	echo "Nothing to do here"

dev:
	docker-compose run -e MAIN_NODE_IP="$(MAIN_NODE_IP)" -e API_TOKEN="$(API_TOKEN)" --service-ports web 