#!/bin/bash

. ./etc/bin/source.sh


CLIENTSIDE="clientside"
SERVERSIDE="serverside"

build_web() {
    echo "  🛠️   Building $1"
    cp src/$1/package.tpl.json src/$1/package.json
    rm -Rf ./src/$1/node_modules ./src/$1/yarn.lock
    DEV_FILES=$(cat src/$1/deps_dev.txt | tr '\n' ' ')
    RUN_FILES=$(cat src/$1/deps_run.txt | tr '\n' ' ')
    BUILD_SRC=$1 docker-compose run --rm build-web yarn --cwd /app/src/$1 add $RUN_FILES > /dev/null
    BUILD_SRC=$1 docker-compose run --rm build-web yarn --cwd /app/src/$1 add -D $DEV_FILES > /dev/null
}

rm -Rf ./data
mkdir -p data/db


build_web $CLIENTSIDE
build_web $SERVERSIDE

# K3UID=${K3UID} K3GID=${K3GID} docker-compose up db -d
# for ii in $(seq 1 4); do
#     echo "Waiting for db to start and initialize tables. Please wait..."
#     sleep 5
# done
# K3UID=${K3UID} K3GID=${K3GID} docker-compose logs db
# K3UID=${K3UID} K3GID=${K3GID} docker-compose stop db