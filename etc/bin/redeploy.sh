#!/bin/bash

./etc/bin/build.sh ${1} Y
kubectl apply -f ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml