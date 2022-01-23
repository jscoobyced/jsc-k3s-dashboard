import { Formatter } from "../../services/format";
import { Capacity, K3sNode } from "./k3snode";

const parseResponse = (json: any): K3sNode[] => {
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

export const getNodes = async (): Promise<K3sNode[]> => {
  const token = process.env.API_TOKEN as string;
  const mainNodeIp = process.env.MAIN_NODE_IP as string;
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

  const options = {
    headers: { 'Authorization': `Bearer ${token}` }
  }

  return fetch(`https://${mainNodeIp}:6443/api/v1/nodes`, options)
    .then(response => {
      return response.json()
        .then(json => {
          return parseResponse(json)
        })
    })
}