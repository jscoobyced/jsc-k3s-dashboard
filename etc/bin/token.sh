#!/bin/bash

# Create the secret token
kubectl get secret jsc-api-token -o jsonpath='{.data.token}' | base64 -d > /tmp/token.txt

# Used if you want to output the token before deleting the cached file
# It is used in the Makefile to get the token before starting the application
if [ "$1" = "Y" ];
then
    cat /tmp/token.txt
fi

rm /tmp/token.txt
