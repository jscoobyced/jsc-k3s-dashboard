#!/bin/bash

source .env

DOCKER_PATH=etc/docker

# Create ARM64 Dockerfile from the amd64 default version
cp ${DOCKER_PATH}/Dockerfile ${DOCKER_PATH}/Dockerfile.arm64
sed -i 's/FROM node/FROM arm64v8\/node/g' ${DOCKER_PATH}/Dockerfile.arm64

# Build both images
docker buildx build --platform linux/arm64 -t ${DOCKER_ID}/jsc-k3s-dashboard:arm64-latest -f ${DOCKER_PATH}/Dockerfile.arm64 src
docker build -t ${DOCKER_ID}/jsc-k3s-dashboard:latest -f ${DOCKER_PATH}/Dockerfile src

# If we pass the "Y" argument, also push to the docker registry
if [ "${1}" == "Y" ];
then
    docker push ${DOCKER_ID}/jsc-k3s-dashboard:arm64-latest
    docker push ${DOCKER_ID}/jsc-k3s-dashboard:latest
fi