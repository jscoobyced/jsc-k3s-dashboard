#!/bin/bash

# Deploy the application
kubectl apply -f ./etc/yaml/jsc-k3s-dashboard/01-setup.yaml
kubectl apply -f ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml
kubectl apply -f ./etc/yaml/jsc-k3s-dashboard/03-service.yaml
