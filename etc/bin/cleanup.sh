#!/bin/bash

kubectl delete -f ./etc/yaml/permission/03-role-binding.yaml
kubectl delete -f ./etc/yaml/permission/02-role.yaml
kubectl delete -f ./etc/yaml/permission/01-service-account.yaml

kubectl delete secret --namespace jsc-k3s-dashboard jsc-api-token &> /dev/null

rm ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml
rm ./etc/yaml/jsc-k3s-dashboard/03-service.yaml
rm ./code/e2e/data/selfsigned.*