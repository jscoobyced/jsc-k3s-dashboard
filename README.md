# JSC Poor man's Kubernetes Dashboard

Initially tested on [Rancher's k3s](https://rancher.com/products/k3s), which includes by default the metrics services. It should work on any kubernetes implementation, but you might have to add the metrics services if they are not already there.

---
## Getting Started
### Dependencies

You need a running docker installation, with `docker-compose`  and `kubectl` commands available.

### New cluster

When using the application for the first time on a cluster, you need to create the service account to access the cluster.  
Have your cluster up and running, then run the following command:
```
make setup MAIN_NODE_IP=<IP of master node> DOCKER_ID=<docker id> SERVICE_IP=<IP of service>
```
Where:
- `<IP of master node>` is the IP of your master node.
- `<docker id>` is the id of your docker repository (not the email address). It is used to create the name of the docker image.
- `<IP of service>` is the IP address to bind the dashboard application. It should be one of your node IP address.

---
## Development

Simply run:
```
make dev MAIN_NODE_IP=<IP of master node>
```
Where:
- `<IP of master node>` is the IP of your master node.

You can then browse to http://0.0.0.0:3000
The application was created using the `create-next-app`, in development mode it has hot redeploy.

---
## Production

You can deploy this code on your cluster so it will self monitor the metrics.  
You will need to have logged-in your docker account on your local machine to be able to push, or to configure your CI environment to be able to push. You can build the image first by running these commands:
```
make build DOCKER_ID=<docker id>
```
Where:
- `<docker id>` is the id of your docker repository (not the email address). It is used to create the name of the docker image.

Run the following command to deploy:
```
make deploy
```

You can then browse to http://&lt;service IP&gt;:8080

You can combine a build and deploy by adding the main node IP address to the deploy command:
```
make deploy MAIN_NODE_IP=<IP of master node>
```
Where `<IP of master node>` is the IP of your master node. If you don't pass the docker id, it will simply redeploy, fetching the most recent image from the registry.
