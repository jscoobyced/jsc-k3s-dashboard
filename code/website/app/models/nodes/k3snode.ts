export type Capacity = {
    cpu: number,
    storage: number,
    memory: number,
    pods: number
}

export type K3sNode = {
    nodeName: string,
    ipAddress: string,
    capacity: Capacity,
    allocatable: Capacity
}
