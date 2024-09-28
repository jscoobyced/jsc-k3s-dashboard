#!/bin/bash

. ./etc/bin/source.sh


CLIENTSIDE="client"
SERVERSIDE="server"
COMMON="common"

build_web() {
    echo "    🛠️   Building $1"
    # Reset package.json
    cp src/$1/package.tpl.json src/$1/package.json
    # Delete older node_modules, yarn.lock, dist and coverage
    rm -Rf ./src/$1/node_modules ./src/$1/yarn.lock ./src/$1/dist ./src/$1/coverage
    # Format dependencies to a single line
    DEV_FILES=$(cat src/$1/deps_dev.txt | tr '\n' ' ')
    RUN_FILES=$(cat src/$1/deps_run.txt | tr '\n' ' ')
    # Install dependencies
    if [ "$RUN_FILES" != "" ]; then
        echo "    📦   Installing dependencies"
        BUILD_SRC=$1 docker-compose run --rm build-web yarn --cwd /app/src/$1 add $RUN_FILES > /dev/null
    fi
    # Install dev dependencies
    if [ "$DEV_FILES" != "" ]; then
        echo "    📦   Installing dev dependencies"
        BUILD_SRC=$1 docker-compose run --rm build-web yarn --cwd /app/src/$1 add -D $DEV_FILES > /dev/null
    fi
    # Build common package if it is the common package
    if [ "$1" == "$COMMON" ]; then
        BUILD_SRC=$1 docker-compose run --rm build-web yarn --cwd /app/src/$1 build > /dev/null
        cp src/$1/package.json src/$1/dist/package.json
    fi
}

rm -Rf ./data
mkdir -p data/db


build_web $COMMON
build_web $CLIENTSIDE
build_web $SERVERSIDE

# K3UID=${K3UID} K3GID=${K3GID} docker-compose up db -d
# for ii in $(seq 1 4); do
#     echo "Waiting for db to start and initialize tables. Please wait..."
#     sleep 5
# done
# K3UID=${K3UID} K3GID=${K3GID} docker-compose logs db
# K3UID=${K3UID} K3GID=${K3GID} docker-compose stop db