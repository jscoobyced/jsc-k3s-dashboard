# JSC Poor man's Kubernetes Dashboard

Initially tested on [Rancher's k3s](https://rancher.com/products/k3s), which includes by default the metrics services. It should work on any kubernetes implementation, but you might have to add the metrics services if they are not already there (for minikube, run `minikube addons enable metrics-server`)

---
## Getting Started

### Dependencies

Currently the only OS supported is Linux. You need a running docker installation, with `docker-compose` and also `openssl` and `kubectl` commands available.

The first time, setup the environment variables:
```
make setup
```

This will first check if you have a valid k8s configuration. If you haven't, it will try installing one node with `minikube`. If `minikube` isn't available it will fail and stop. This will also create the self-signed SSL certificates for the test.

If you need to start over, run:
```
make clean
make setup
```

---
## Development

Simply run:
```
make dev
```

You can then browse to http://0.0.0.0:3000
The application was created using the `create-next-app`, in development mode it has hot redeploy.

You can run
```
make stop
```
when done to avoid leaving containers running.

---
## Production

You can deploy this code on your cluster so it will self monitor the metrics. 

### Pre-requisites

You need to add in your repository 2 secret environment variables to push the image to docker hub:
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

You need to obtain them from your docker account. This is necessary for pushing the images to Docker hub. Note the build in Github will automatically occur when you create a release following SEMVER format (i.e. tag and release names are `vX.Y.Z`)

### Deployment

When build is succesful on Github actions, you can deploy
```
make deploy
```

This will deploy to the cluster that is currently configured with you `kubectl` configuration. You might want to change the tag from `latest` to a specific version in the [03-deployment.yaml](./etc/yaml/jsc-k3s-dashboard/03-deployment.yaml) file.

---
## Testing

See [testing.md](./doc/testing.md)