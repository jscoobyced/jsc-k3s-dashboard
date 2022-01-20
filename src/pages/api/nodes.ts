import type { NextApiRequest, NextApiResponse } from 'next'
import { Capacity, K3sNode } from '../../models/k3snode';
import { rawUnit } from '../../services/format';

type Data = {
  data?: K3sNode[],
  error?: string
}

const parseResponse = (json: any): K3sNode[] => {
  const nodes: K3sNode[] = [];
  for (const item of json.items) {
    const capacity: Capacity = {
      cpu: item.status.capacity.cpu,
      memory: rawUnit(item.status.capacity.memory),
      storage: rawUnit(item.status.capacity['ephemeral-storage']),
      pods: item.status.capacity.pods
    }
    const allocatable: Capacity = {
      cpu: item.status.allocatable.cpu,
      memory: rawUnit(item.status.allocatable.memory),
      storage: rawUnit(item.status.allocatable['ephemeral-storage']),
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = process.env.API_TOKEN as string;
  const mainNodeIp = process.env.MAIN_NODE_IP as string;
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

  const options = {
    headers: { 'Authorization': `Bearer ${token}` }
  }

  const result = await fetch(`https://${mainNodeIp}:6443/api/v1/nodes`, options);
  const json = await result.json();
  const nodes = parseResponse(json);
  res.status(200).json({ data: nodes });
}
