#!/bin/bash

if [ $# -ne 3 ];
then
    echo "Usage: $0 <main node IP address> <docker id> <deployment IP>"
fi

# Copy the template YAML of the deployment
cp ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml.tpl ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml
cp ./etc/yaml/jsc-k3s-dashboard/03-service.yaml.tpl ./etc/yaml/jsc-k3s-dashboard/03-service.yaml
# and update the parameters with the passed arguments
sed -i "s/IPADDRESS/${1}/g" ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml
sed -i "s/DOCKERID/${2}/g" ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml
sed -i "s/IPADDRESS/${3}/g" ./etc/yaml/jsc-k3s-dashboard/03-service.yaml

# Create the service account
./etc/bin/permissions.sh

# Deploy the application
./etc/bin/deploy.sh

# Create token
./etc/bin/token.sh