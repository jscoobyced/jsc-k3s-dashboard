#!/bin/bash

. ./etc/bin/source.sh

./etc/bin/undeploy.sh &> /dev/null

kubectl delete secret --namespace jsc-k3s-dashboard jsc-api-token &> /dev/null

kubectl delete -f ./etc/yaml/permission/03-role-binding.yaml &> /dev/null
kubectl delete -f ./etc/yaml/permission/02-role.yaml &> /dev/null
kubectl delete -f ./etc/yaml/permission/01-service-account.yaml &> /dev/null

rm ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml &> /dev/null
rm ./etc/yaml/jsc-k3s-dashboard/03-service.yaml &> /dev/null

if [ -f ~/.kube/config ];
then
    mv ~/.kube/config ~/.kube/config.bak 
fi

echo "Cluster and configuration removed."

K3UID=${K3UID} K3GID=${K3GID} docker-compose down --volumes
