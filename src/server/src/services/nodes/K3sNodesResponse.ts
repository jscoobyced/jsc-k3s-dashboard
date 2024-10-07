export interface K3sNodesResponse {
  items: [
    {
      metadata: {
        name: string;
        annotations: {
          'k3s.io/internal-ip': string;
        };
      };
      status: {
        addresses: [
          {
            address: string;
            type: string;
          },
        ];
        allocatable: {
          cpu: number;
          memory: string;
          'ephemeral-storage': string;
          pods: number;
        };
        capacity: {
          cpu: number;
          memory: string;
          'ephemeral-storage': string;
          pods: number;
        };
        conditions: [
          {
            type: string;
            status: string;
            message: string;
          },
        ];
      };
    },
  ];
}

export interface NodeMetricsResponse {
  metadata: {
    name: string;
  };
  usage: {
    cpu: string;
    memory: string;
  };
}

export const defaultK3sNodeResponse: K3sNodesResponse = {
  items: [
    {
      metadata: {
        name: 'dummy-node',
        annotations: {
          'k3s.io/internal-ip': '192.168.1.1',
        },
      },
      status: {
        addresses: [
          {
            address: '192.168.1.1',
            type: 'InternalIP',
          },
        ],
        allocatable: {
          cpu: 1,
          memory: '1',
          'ephemeral-storage': '1',
          pods: 1,
        },
        capacity: {
          cpu: 1,
          memory: '1',
          'ephemeral-storage': '1',
          pods: 1,
        },
        conditions: [
          {
            type: 'Ready',
            status: 'True',
            message: 'Ready',
          },
        ],
      },
    },
  ],
};
