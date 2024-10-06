import { K3sNode, K3sNodeMetric } from './k3snode';

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
