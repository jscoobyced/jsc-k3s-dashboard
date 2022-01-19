#!/bin/bash

kubectl apply -f ./yml/permission/01-service-account.yaml
kubectl apply -f ./yml/permission/02-role.yaml
kubectl apply -f ./yml/permission/03-role-binding.yaml