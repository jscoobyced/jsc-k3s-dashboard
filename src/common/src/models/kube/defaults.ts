import { K3sNode, K3sNodeMetric } from './k3snode';
import { K3sPod } from './k3spod';

export const defaultK3sNodeMetric: K3sNodeMetric = {
  metadata: {
    name: 'dummy-metric',
  },
  usage: {
    cpu: '1',
    memory: '1',
  },
};

export const defaultK3sNode: K3sNode = {
  nodeName: 'dummy-node',
  ipAddress: '192.168.1.1',
  capacity: {
    cpu: 1,
    storage: 1,
    memory: 1,
    pods: 1,
  },
  allocatable: {
    cpu: 1,
    storage: 1,
    memory: 1,
    pods: 1,
  },
  metrics: defaultK3sNodeMetric,
  conditions: [
    {
      type: 'Ready',
      status: 'True',
      message: 'Ready',
    },
  ],
};

export const defaultK3sPod: K3sPod = {
  metadata: {
    name: 'dummy-pod',
    namespace: 'default',
    creationTimestamp: '2021-01-01T00:00:00Z',
    labels: {
      app: 'dummy-app',
      tier: 'dummy-tier',
    },
  },
  spec: {
    nodeName: 'dummy-node',
    containers: [
      {
        name: 'dummy-container',
        image: 'dummy-image',
      },
    ],
  },
  status: {
    phase: 'Running',
    startTime: '2021-01-01T00:00:00Z',
  },
};
