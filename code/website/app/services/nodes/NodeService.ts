'use server'

import { Formatter } from '../format'
import { Capacity, K3sNode } from '../../models/nodes/k3snode'
import { K3sNodesResponse } from './K3sNodesResponse'

const parseResponse = (json: K3sNodesResponse): K3sNode[] => {
  if (!json.items) return []
  const nodes: K3sNode[] = []
  const formatter = Formatter()
  for (const item of json.items) {
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
    const node: K3sNode = {
      nodeName: item.metadata.name,
      ipAddress: item.status.addresses[0].address,
      capacity,
      allocatable,
    }
    nodes.push(node)
  }
  return nodes
}

export const getNodes = async (): Promise<K3sNode[]> => {
  const token = process.env.API_TOKEN as string
  const serverUrl = process.env.SERVER_URL as string
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

  const options = {
    headers: { Authorization: `Bearer ${token}` },
  }

  return fetch(`${serverUrl}/api/v1/nodes`, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          const data = parseResponse(json)
          return data
        })
      } else {
        console.log(response.status)
        return []
      }
    })
    .catch((error) => {
      console.log(error)
      return []
    })
}
