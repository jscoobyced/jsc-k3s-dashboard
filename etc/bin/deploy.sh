#!/bin/bash

# Check if the cluster is ready
INGRESS_IP=""
kubectl get -n jsc-ns ing -o jsonpath='{.items[0].status.loadBalancer.ingress[0].ip}' > /dev/null 2>&1

if [ 0 -ne $? ];
then
    MINIKUBE_EXEC=$(which minikube | awk -F '/' '{print $NF}')
    if [ "minikube" == "$MINIKUBE_EXEC" ];
    then
        INGRESS_IP=$(minikube profile list -l -o json | jq .valid[0].Config.Nodes[0].IP | tr -d '"')
    fi
else
    INGRESS_IP=$(kubectl get -n jsc-ns ing -o jsonpath='{.items[0].status.loadBalancer.ingress[0].ip}')
fi

sed "s/IP_ADDRESS/${INGRESS_IP}/g" ./etc/yaml/jsc-k3s-dashboard/04-service-example.yaml > ./etc/yaml/jsc-k3s-dashboard/04-service.yaml

# Deploy the application
kubectl apply -k ./etc/yaml/jsc-k3s-dashboard/
