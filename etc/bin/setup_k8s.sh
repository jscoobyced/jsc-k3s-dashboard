#!/bin/bash

CLUSTER_NAME=""
CLUSTER_READY=false

kubectl config view -o json | jq .clusters[0].name > /dev/null 2>&1
if [ 0 -eq $? ];
then
    CLUSTER_NAME=$(kubectl config view -o json | jq .clusters[0].name)
    if [ "null" != "$CLUSTER_NAME" ];
    then
        CLUSTER_READY=true
    fi
fi

if ! $CLUSTER_READY;
then
    echo "There is no cluster available."
    MINIKUBE_EXEC=$(which minikube | awk -F '/' '{print $NF}')
    if [ "minikube" == "$MINIKUBE_EXEC" ];
    then
        echo "Installing one with minikube"
        minikube delete
        minikube start
        minikube addons enable metrics-server
        mv ~/.kube/config ~/.kube/config.mini
        ln -s ~/.kube/config.mini ~/.kube/config
        CLUSTER_NAME=$(kubectl config view -o json | jq .clusters[0].name)
        if [ "null" != "$CLUSTER_NAME" ];
        then
            CLUSTER_READY=true
        fi
    else
        echo "Please install minikube to create a cluster."
    fi
fi

if $CLUSTER_READY && [ "" != "$CLUSTER_NAME" ];
then
    echo "Cluster \"$CLUSTER_NAME\" found."
    ./etc/bin/permissions.sh
fi