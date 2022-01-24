import { K3sNode } from '../../models/nodes/k3snode';
import { K3sNodesResponse } from './K3sNodesResponse';
import { getNodes } from './NodeService'

const k3sNodes: K3sNodesResponse = {
    items: [{
        metadata: {
            name: "test-node",
            annotations: {
                "k3s.io/internal-ip": "127.0.0.1"
            }
        },
        status: {
            allocatable: {
                cpu: 4,
                memory: "500 Mi",
                "ephemeral-storage": "29575420Ki",
                pods: 100
            },
            capacity: {
                cpu: 4,
                memory: "512 Mi",
                "ephemeral-storage": "29575420Ki",
                pods: 100
            }
        }
    }]
}

const expected: K3sNode[] = [{
    allocatable:
    {
        cpu: 4,
        memory: 524288000,
        pods: 100,
        storage: 30285230080
    },
    capacity: {
        cpu: 4,
        memory: 536870912,
        pods: 100,
        storage: 30285230080
    },
    ipAddress: "127.0.0.1",
    nodeName: "test-node"
}]

const _fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(k3sNodes),
        status: 200,
    }),
) as jest.Mock;

describe('NodeService', () => {

    it("can get node data", async () => {
        const result = await getNodes(_fetch)
        expect(result).toEqual(expected)
    })
})

export { }