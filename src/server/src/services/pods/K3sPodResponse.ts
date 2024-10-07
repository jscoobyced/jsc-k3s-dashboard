export interface K3sPodResponse {
  items: [
    {
      metadata: {
        name: string;
        namespace: string;
        creationTimestamp: string;
        labels: {
          app?: string;
          tier?: string;
        };
      };
      spec: {
        nodeName: string;
        volumes: [
          {
            name: string;
            persistentVolumeClaim?: {
              claimName: string;
            };
          },
        ];
        volumeMounts: [
          {
            name: string;
            mountPath: string;
          },
        ];
        containers: [
          {
            name: string;
            image: string;
            env?: [
              {
                name: string;
                value?: string;
                valueFrom?: {
                  secretKeyRef: {
                    name: string;
                    key: string;
                  };
                };
              },
            ];
            resources?: {
              requests: {
                cpu?: string;
                memory?: string;
                ephemeralStorage?: string;
              };
              limits: {
                cpu?: string;
                memory?: string;
                ephemeralStorage?: string;
              };
            };
          },
        ];
      };
      status: {
        phase: string;
        startTime: string;
        conditions: [
          {
            type: string;
            status: string;
            lastProbeTime: string;
            lastTransitionTime: string;
          },
        ];
      };
    },
  ];
}

export const defaultK3sPodResponse: K3sPodResponse = {
  items: [
    {
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
        volumes: [
          {
            name: 'dummy-volume',
            persistentVolumeClaim: {
              claimName: 'dummy-pvc',
            },
          },
        ],
        volumeMounts: [
          {
            name: 'dummy-volume',
            mountPath: '/dummy-path',
          },
        ],
        containers: [
          {
            name: 'dummy-container',
            image: 'dummy-image',
            env: [
              {
                name: 'dummy-env',
                value: 'dummy-value',
              },
            ],
            resources: {
              requests: {
                cpu: '1',
                memory: '1',
                ephemeralStorage: '1',
              },
              limits: {
                cpu: '1',
                memory: '1',
                ephemeralStorage: '1',
              },
            },
          },
        ],
      },
      status: {
        phase: 'Running',
        startTime: '2021-01-01T00:00:00Z',
        conditions: [
          {
            type: 'Ready',
            status: 'True',
            lastProbeTime: '2021-01-01T00:00:00Z',
            lastTransitionTime: '2021-01-01T00:00:00Z',
          },
        ],
      },
    },
  ],
};
