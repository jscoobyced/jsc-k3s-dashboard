import { Formatter } from "../format";
import { Capacity, K3sNode } from "../../models/nodes/k3snode";
import { K3sNodesResponse } from "./K3sNodesResponse";
import { Fetch } from "../../models/fetch";

const parseResponse = (json: K3sNodesResponse): K3sNode[] => {
  if (!json.items) return [];
  const nodes: K3sNode[] = [];
  const formatter = Formatter();
  for (const item of json.items) {
    const capacity: Capacity = {
      cpu: item.status.capacity.cpu,
      memory: formatter.rawUnit(item.status.capacity.memory),
      storage: formatter.rawUnit(item.status.capacity['ephemeral-storage']),
      pods: item.status.capacity.pods
    }
    const allocatable: Capacity = {
      cpu: item.status.allocatable.cpu,
      memory: formatter.rawUnit(item.status.allocatable.memory),
      storage: formatter.rawUnit(item.status.allocatable['ephemeral-storage']),
      pods: item.status.allocatable.pods
    }
    const node: K3sNode = {
      nodeName: item.metadata.name,
      ipAddress: item.metadata.annotations['k3s.io/internal-ip'],
      capacity,
      allocatable
    }
    nodes.push(node);
  }
  return nodes;
}

export const getNodes = async (
  /* istanbul ignore next */
  _fetch: Fetch = global.fetch): Promise<K3sNode[]> => {
  const token = process.env.API_TOKEN as string;
  const mainNodeIp = process.env.MAIN_NODE_IP as string;
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

  const options = {
    headers: { 'Authorization': `Bearer ${token}` }
  }

  return _fetch(`https://${mainNodeIp}:6443/api/v1/nodes`, options)
    .then(response => {
      if (response.status === 200) {
        return response.json()
          .then(json => {
            return parseResponse(json)
          })
      } else {
        return []
      }
    })
    .catch(() => [])
}