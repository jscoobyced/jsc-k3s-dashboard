#!/bin/bash

source .env

# Copy the template YAML of the deployment
cp ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml.tpl ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml
cp ./etc/yaml/jsc-k3s-dashboard/03-service.yaml.tpl ./etc/yaml/jsc-k3s-dashboard/03-service.yaml

# and update the parameters with the passed arguments
sed -i "s/IPADDRESS/${MAIN_NODE_IP}/g" ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml
sed -i "s/DOCKERID/${DOCKER_ID}/g" ./etc/yaml/jsc-k3s-dashboard/02-deployment.yaml
sed -i "s/IPADDRESS/${SERVICE_IP}/g" ./etc/yaml/jsc-k3s-dashboard/03-service.yaml
