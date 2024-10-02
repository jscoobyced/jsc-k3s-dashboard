import { K3sNode } from './k3snode';

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
  metrics: {
    metadata: {
      name: 'dummy-metric',
    },
    usage: {
      cpu: '1',
      memory: '1',
    },
  },
  conditions: [
    {
      type: 'Ready',
      status: 'True',
      message: 'Ready',
    },
  ],
};
