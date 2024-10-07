export interface K3sPodContainer {
  name: string;
  image: string;
}

export interface K3sPod {
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
    containers?: K3sPodContainer[];
  };
  status: {
    phase: string;
    startTime: string;
  };
}
