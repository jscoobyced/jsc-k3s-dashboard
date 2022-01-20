#!/bin/bash

kubectl delete -f ./etc/yaml/jsc-k3s-dashboard/03-service.yaml
kubectl delete -f ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml
kubectl delete -f ./etc/yaml/jsc-k3s-dashboard/01-setup.yaml
