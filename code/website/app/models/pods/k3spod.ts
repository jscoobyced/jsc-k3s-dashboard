export type K3sPod = {
    metadata: {
      name: string
      namespace: string
      creationTimestamp: string
      labels: {
        app?: string
        tier?: string
      }
    }
    spec: {
      nodeName: string
      containers?: [{
        name: string
        image: string
      }]
    }
    status: {
      phase: string
      startTime: string
    }
  }