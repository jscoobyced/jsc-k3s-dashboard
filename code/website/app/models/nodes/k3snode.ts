export type Capacity = {
  cpu: number
  storage: number
  memory: number
  pods: number
}

export type NodeCondition = {
  type: string
  status: string
  message: string
}

export type K3sNode = {
  nodeName: string
  ipAddress: string
  capacity: Capacity
  allocatable: Capacity
  conditions: NodeCondition[]
}
