#!/bin/bash

kubectl apply -f ./etc/yaml/permission/01-service-account.yaml
kubectl apply -f ./etc/yaml/permission/02-role.yaml
kubectl apply -f ./etc/yaml/permission/03-role-binding.yaml

kubectl apply -f ./etc/yaml/jsc-k3s-dashboard/01-setup.yaml