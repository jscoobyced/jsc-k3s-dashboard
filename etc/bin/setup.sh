#!/bin/bash

DEV_FILES=$(cat code/website/deps_dev.txt | tr '\n' ' ')
RUN_FILES=$(cat code/website/deps_run.txt | tr '\n' ' ')

cp code/website/package.json.tpl code/website/package.json
rm -Rf ./code/website/.next ./code/website/cache ./code/website/node_modules ./code/website/.vercel ./code/website/yarn.lock

yarn --cwd code/website add $RUN_FILES
yarn --cwd code/website add -D $DEV_FILES
