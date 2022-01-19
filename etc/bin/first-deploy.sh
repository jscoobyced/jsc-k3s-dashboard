#!/bin/bash

cp ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml.tpl ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml
sed -i "s/IPADDRESS/${1}/g" ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml

kubectl apply -f ./yml/jsc-k3s-dashboard/01-setup.yaml
kubectl apply -f ./yml/jsc-k3s-dashboard/02-deployment.yaml
kubectl apply -f ./yml/jsc-k3s-dashboard/03-service.yaml