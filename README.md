# JSC Poor man's Kubernetes Dashboard

Initially tested on [Rancher's k3s](https://rancher.com/products/k3s), which includes by default the metrics services. It should work on any kubernetes implementation, but you might have to add the metrics services if they are not already there.

## Getting Started

### Dependencies

#### Version 1

You need a running docker installation, with `docker-compose`  and `kubectl` command.

#### New cluster

When using the application for the first time on a cluster, you need to create the service account to access the cluster. Run the following commands:
```
./etc/bin/newcluster.sh
```

### Development

Simply run:
```
make dev MAIN_NODE_IP="10.0.0.1"
```

Change the IP address in the command above of your k3s master node IP address.

## Production

You can deploy this code on your cluster so it will self monitor the metrics.
First build the image:
```
./etc/bin/build.sh <your_docker_id> Y
```

Where:
- `<your_docker_id>` is the id of your docker repository (not the email address). It is used to create the name of the docker image.
- `Y` means it will push the images to your docker registry

You will need to have logged-in your docker account on your local machine to be able to push, or to configure your CI environment to be able to push.

Then deploy to your cluster. The first time you deploy, run.
Then run these commands:
```
./etc/bin/first-deploy.sh <IP of master node>
```
Where `<IP of master node>` is the IP of your master node.

The next times you want to deploy, you only need to run:
```
./etc/bin/redeploy.sh <IP of master node>
```
Where `<IP of master node>` is the IP of your master node.
