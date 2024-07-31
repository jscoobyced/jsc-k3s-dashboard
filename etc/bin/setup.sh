#!/bin/bash

. ./etc/bin/source.sh

DEV_FILES=$(cat code/website/deps_dev.txt | tr '\n' ' ')
RUN_FILES=$(cat code/website/deps_run.txt | tr '\n' ' ')

cp code/website/package.json.tpl code/website/package.json
rm -Rf ./code/website/.next ./code/website/cache ./code/website/node_modules ./code/website/.vercel ./code/website/yarn.lock ./data

mkdir -p data/db

docker-compose build web

docker-compose run --rm build-web yarn --cwd /app/code/website add $RUN_FILES
docker-compose run --rm build-web yarn --cwd /app/code/website add -D $DEV_FILES

K3UID=${K3UID} K3GID=${K3GID} docker-compose up db -d
for ii in $(seq 1 4); do
    echo "Waiting for db to start and initialize tables. Please wait..."
    sleep 5
done
K3UID=${K3UID} K3GID=${K3GID} docker-compose logs db
K3UID=${K3UID} K3GID=${K3GID} docker-compose stop db