#!/bin/bash

CLUSTER_NAME=$(kubectl config view -o json | jq .clusters | tr -d '\n' | head -n 1)
CLUSTER_READY=true

if [ "" == "$CLUSTER_NAME" ] || [ "null" == "$CLUSTER_NAME" ];
then
    CLUSTER_READY=false
    echo "There is no cluster available."
    MINIKUBE_EXEC=$(which minikube | awk -F '/' '{print $NF}')
    if [ "minikube" == "$MINIKUBE_EXEC" ];
    then
        echo "Installing one with minikube"
        minikube delete
        minikube start
        mv ~/.kube/config ~/.kube/config.mini
        ln -s ~/.kube/config.mini ~/.kube/config
        CLUSTER_READY=true
    fi
else
    echo "Cluster \"$CLUSTER_NAME\" found."
fi

if [ $CLUSTER_READY ];
then
    ./etc/bin/permissions.sh
fi