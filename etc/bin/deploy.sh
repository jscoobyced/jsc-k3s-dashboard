#!/bin/bash

INGRESS_IP=$(kubectl get -n jsc-ns ing -o jsonpath='{.items[0].status.loadBalancer.ingress[0].ip}')

sed "s/IP_ADDRESS/${INGRESS_IP}/g" ./etc/yaml/jsc-k3s-dashboard/04-service-example.yaml > ./etc/yaml/jsc-k3s-dashboard/04-service.yaml

# Deploy the application
kubectl apply -k ./etc/yaml/jsc-k3s-dashboard/
