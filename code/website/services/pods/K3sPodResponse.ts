export type K3sPodResponse = {
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
};
