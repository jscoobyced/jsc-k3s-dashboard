#!/bin/bash

DOCKERPATH=etc/docker

# Create ARM64 Dockerfile
cp ${DOCKERPATH}/Dockerfile ${DOCKERPATH}/Dockerfile.arm64
sed -i 's/FROM node/FROM arm64v8\/node/g' ${DOCKERPATH}/Dockerfile.arm64

# Build both images
#docker buildx build --platform linux/arm64 -t jscdroiddev/jsc-k3s-dashboard:arm64-latest -f ${DOCKERPATH}/Dockerfile.arm64 src
docker build -t jscdroiddev/jsc-k3s-dashboard:latest -f ${DOCKERPATH}/Dockerfile src

