#!/bin/bash

source .env

curl -ks -H "Authorization: Bearer ${API_TOKEN}" -H "Content-Type: application/json" -X GET "${SERVER_URL}/apis/metrics.k8s.io/v1beta1/nodes/minikube"
