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

const errorFetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(k3sNodes),
        status: 500,
    }),
) as jest.Mock;

const badJsonFetch = jest.fn(() =>
    Promise.resolve({
        status: 200,
    }),
) as jest.Mock;

const badDataFetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve("{}"),
        status: 200,
    }),
) as jest.Mock;



describe('NodeService', () => {

    it("should parse data if well formatted", async () => {
        const result = await getNodes(_fetch)
        expect(result).toEqual(expected)
    })
    
    it("should return no result if http status is not 200", async () => {
        const result = await getNodes(errorFetch)
        expect(result).toEqual([])
    })
    
    it("should return no result if response doesn't contain JSON", async () => {
        const result = await getNodes(badJsonFetch)
        expect(result).toEqual([])
    })
    
    it("should return no result if JSON isn't list of nodes", async () => {
        const result = await getNodes(badDataFetch)
        expect(result).toEqual([])
    })
})

export { }