import {
  Capacity,
  K3sNode,
  K3sNodeMetric,
  NodeCondition,
} from '../../models/nodes/k3snode'
import { Formatter } from '../format'
import { K3sNodesResponse } from './K3sNodesResponse'
import { getNodeMetrics } from './NodeMetricsService'
import { HttpOptions, NODE_URL, ServerUrl } from './api'

const parseNodeResponse = async (
  nodeResponse: K3sNodesResponse
): Promise<K3sNode[]> => {
  if (!nodeResponse.items) return []
  const nodes: K3sNode[] = []
  const formatter = Formatter()
  for (const item of nodeResponse.items) {
    const capacity: Capacity = {
      cpu: item.status.capacity.cpu,
      memory: formatter.rawUnit(item.status.capacity.memory),
      storage: formatter.rawUnit(item.status.capacity['ephemeral-storage']),
      pods: item.status.capacity.pods,
    }
    const allocatable: Capacity = {
      cpu: item.status.allocatable.cpu,
      memory: formatter.rawUnit(item.status.allocatable.memory),
      storage: formatter.rawUnit(item.status.allocatable['ephemeral-storage']),
      pods: item.status.allocatable.pods,
    }
    const nodeConditions: NodeCondition[] = []
    for (const condition of item.status.conditions) {
      const nodeCondition: NodeCondition = {
        type: condition.type,
        status: condition.status,
        message: condition.message,
      }
      nodeConditions.push(nodeCondition)
    }

    const nodeMetrics: K3sNodeMetric = await getNodeMetrics(item.metadata.name)

    const node: K3sNode = {
      nodeName: item.metadata.name,
      ipAddress: item.status.addresses[0].address,
      capacity,
      allocatable,
      conditions: nodeConditions,
      metrics: nodeMetrics,
    }
    nodes.push(node)
  }
  return nodes
}

export const getNodesData = async (): Promise<K3sNode[]> => {
  const nodesUrl = `${ServerUrl}${NODE_URL}`

  return fetch(nodesUrl, HttpOptions)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          return parseNodeResponse(json).then((data) => {
            return data
          })
        })
      } else {
        return []
      }
    })
    .catch((error) => {
      console.log(error)
      return []
    })
}
