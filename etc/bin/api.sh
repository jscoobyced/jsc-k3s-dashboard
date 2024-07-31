#!/bin/bash

source .env

curl -ks -H "Authorization: Bearer ${API_TOKEN}" -H "Content-Type: application/json" \
    -X GET "${SERVER_URL}/api/v1/namespaces/jsc-ns/pods" | jq .items[0]
