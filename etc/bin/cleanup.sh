#!/bin/bash

./etc/bin/undeploy.sh

kubectl delete -f ./etc/yaml/permission/03-role-binding.yaml
kubectl delete -f ./etc/yaml/permission/02-role.yaml
kubectl delete -f ./etc/yaml/permission/01-service-account.yaml

rm ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml
rm ./etc/yaml/jsc-k3s-dashboard/03-service.yaml