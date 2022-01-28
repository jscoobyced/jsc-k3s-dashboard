export type K3sNodesResponse = {
    items: [{
        metadata: {
            name: string,
            annotations: {
                "k3s.io/internal-ip": string
            }
        },
        status: {
            allocatable: {
                cpu: number,
                memory: string,
                "ephemeral-storage": string,
                pods: number
            },
            capacity: {
                cpu: number,
                memory: string,
                "ephemeral-storage": string,
                pods: number
            }
        }
    }]
}