#!/bin/bash

# Create secret
SANAME=$(kubectl get secrets | grep jsc-service-account | awk '{print $1}')
kubectl get secret ${SANAME} -o jsonpath='{.data.token}' | base64 -d > /tmp/token.txt
kubectl delete secret --namespace jsc-k3s-dashboard jsc-api-token > /dev/null
kubectl create secret generic --namespace jsc-k3s-dashboard jsc-api-token --from-file=token=/tmp/token.txt > /dev/null

if [ "$1" = "Y" ];
then
    cat /tmp/token.txt
fi

rm /tmp/token.txt
