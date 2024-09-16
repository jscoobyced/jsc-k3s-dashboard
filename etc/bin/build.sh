#!/bin/bash

./etc/bin/env.sh
source .env

DOCKER_PATH=etc/docker

DOCKER_PUSH=
SIDE=client

# Client-side or server-side
if [ "${1}" == "serverside" ];
then
    SIDE=server
fi

# If we pass the "Y" argument, also push to the docker registry
if [ "${2}" == "Y" ];
then
    DOCKER_PUSH="--push  "
fi

build_it() {
    echo "  🛠️   Building ${1}"
    docker buildx build ${5} --build-arg GIT_TAG=${2} \
        --platform linux/arm64,linux/amd64 \
        -t ${3}/jsc-k3s-dashboard-${1}:latest \
        -t ${3}/jsc-k3s-dashboard-${1}:${2} \
        -f ${4}/Dockerfile.${1} .
}

build_it ${SIDE} ${GIT_TAG} ${DOCKER_ID} ${DOCKER_PATH} ${DOCKER_PUSH}
