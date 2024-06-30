export type K3sNodesResponse = {
  items: [
    {
      metadata: {
        name: string
        annotations: {
          'k3s.io/internal-ip': string
        }
      }
      status: {
        addresses: [
          {
            address: string
            type: string
          }
        ]
        allocatable: {
          cpu: number
          memory: string
          'ephemeral-storage': string
          pods: number
        }
        capacity: {
          cpu: number
          memory: string
          'ephemeral-storage': string
          pods: number
        }
        conditions: [
          {
            type: string
            status: string
            message: string
          }
        ]
      }
    }
  ]
}

export type NodeMetricsResponse = {
  metadata: {
    name: string
  }
  usage: {
    cpu: string
    memory: string
  }
}