#!/bin/bash

./etc/bin/env.sh
source .env

DOCKER_PATH=etc/docker

DOCKER_PUSH=

# If we pass the "Y" argument, also push to the docker registry
if [ "${1}" == "Y" ];
then
    DOCKER_PUSH="--push  "
fi

build_it() {
    echo "  🛠️   Building ${1}"
    docker buildx build ${DOCKER_PUSH} --build-arg GIT_TAG=${GIT_TAG} \
        --platform linux/arm64,linux/amd64 \
        -t ${DOCKER_ID}/jsc-k3s-dashboard-${1}:latest \
        -t ${DOCKER_ID}/jsc-k3s-dashboard-${1}:${GIT_TAG} \
        -f ${DOCKER_PATH}/Dockerfile.${1} .
}
