#!/bin/bash

./etc/bin/env.sh
source .env

DOCKER_PATH=etc/docker

DOCKER_PUSH=
TAG=${GIT_TAG}

# If we pass the "Y" argument, also push to the docker registry
if [ "${1}" == "Y" ];
then
    DOCKER_PUSH="--push  "
fi

# Build both images
docker buildx build ${DOCKER_PUSH} --build-arg GIT_TAG=${TAG} --platform linux/arm64,linux/amd64 -t ${DOCKER_ID}/jsc-k3s-dashboard:latest -t ${DOCKER_ID}/jsc-k3s-dashboard:${TAG} -f ${DOCKER_PATH}/Dockerfile code/website
