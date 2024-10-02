import { K3sNode } from 'jsc-k3s-dashboard-common/src/models/kube/k3snode';
import { K3sPod } from '../models/pods/k3spod';

export const mockNode: K3sNode = {
  nodeName: 'node1',
  ipAddress: '192.168.1.120',
  capacity: {
    cpu: 4,
    storage: 100,
    memory: 2000,
    pods: 110,
  },
  allocatable: {
    cpu: 2,
    storage: 50,
    memory: 1000,
    pods: 50,
  },
  metrics: {
    metadata: {
      name: 'node1',
    },
    usage: {
      cpu: '1',
      memory: '500',
    },
  },
  conditions: [
    {
      type: 'Ready',
      status: 'True',
      message: 'Kubelet is healthy',
    },
    {
      type: 'OutOfDisk',
      status: 'False',
      message: 'Kubelet has enough disk space',
    },
  ],
};

export const mockPod: K3sPod = {
  metadata: {
    name: 'pod1',
    namespace: 'default',
    labels: {
      app: 'nginx',
      tier: 'frontend',
    },
    creationTimestamp: '2021-06-01T10:00:00Z',
  },
  spec: {
    nodeName: 'node1',
    containers: [
      {
        name: 'nginx',
        image: 'nginx:latest',
      },
    ],
  },
  status: {
    phase: 'Running',
    startTime: '2021-06-01T10:00:00Z',
  },
};
