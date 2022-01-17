API_TOKEN:= $(shell ./etc/permissions.sh Y)

setup:
	echo "Nothing to do here"

dev:
	MAIN_NODE_IP="192.168.1.120" API_TOKEN="$(API_TOKEN)" yarn --cwd src dev