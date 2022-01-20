#!/bin/bash

# Get the secret account
SANAME=$(kubectl get secrets | grep jsc-service-account | awk '{print $1}')
# Get the associated token
kubectl get secret ${SANAME} -o jsonpath='{.data.token}' | base64 -d > /tmp/token.txt

# Delete the API Token if it exists
kubectl delete secret --namespace jsc-k3s-dashboard jsc-api-token &> /dev/null
# Create the new API Token
kubectl create secret generic --namespace jsc-k3s-dashboard jsc-api-token --from-file=token=/tmp/token.txt &> /dev/null

# Used if you want to output the token before deleting the cached file
# It is used in the Makefile to get the token before starting the application
if [ "$1" = "Y" ];
then
    cat /tmp/token.txt
fi

rm /tmp/token.txt
