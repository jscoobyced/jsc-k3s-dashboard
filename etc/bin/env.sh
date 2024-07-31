#!/bin/bash

DOCKER_CREDENTIAL=$(jq -r .credsStore ~/.docker/config.json)
TAG=$(git describe --tags --abbrev=0)

echo "API_TOKEN=$(./etc/bin/token.sh Y)" > .env
echo "SERVER_URL=$(kubectl config view --minify --output jsonpath="{.clusters[*].cluster.server}")" >> .env
echo "USERID=$(id -u)" >> .env
echo "GROUPID=$(id -g)" >> .env
echo "DOCKER_ID=$(docker-credential-$DOCKER_CREDENTIAL list | jq -r '. | to_entries[] | select(.key | contains("docker.io")) | last(.value)')" >> .env
echo "GIT_TAG=$TAG" >> .env
echo "MARIADB_ROOT_PASSWORD=mysecurepassword" >> .env
echo "MARIADB_USER=k3s-user" >> .env
echo "MARIADB_PASSWORD=mysecurepassword" >> .env
echo "MARIADB_DATABASE=k3s" >> .env
echo "SITE_NAME=my-k3s-dashboard.io" >> .env

echo "Environment variables set in .env file"