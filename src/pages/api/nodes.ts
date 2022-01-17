import type { NextApiRequest, NextApiResponse } from 'next'
import https from 'https';
import { Capacity, K3sNode } from '../../models/k3snode';

type Data = {
  data?: K3sNode[],
  error?: string
}

const getNumber = (data: string) => {
  return +(data.substring(0, data.length - 2));
}

const rawUnit = (value: string): number => {
  let data = +value;
  if (value.indexOf('Ki') > 0) {
    data = getNumber(value) * 1024;
  }
  else if (value.indexOf('Mi') > 0) {
    data = getNumber(value) * 1024 * 1024;
  }
  else if (value.indexOf('Gi') > 0) {
    data = getNumber(value) * 1024 * 1024 * 1024;
  }
  return data;
}

const parseResponse = (data: string): K3sNode[] => {
  const json = JSON.parse(data);
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = process.env.API_TOKEN as string;
  const mainNodeIp = process.env.MAIN_NODE_IP as string;

  const options = {
    rejectUnauthorized: false,
    hostname: mainNodeIp,
    port: 6443,
    path: '/api/v1/nodes',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  }

  let nodes = '';

  const kreq = https.get(options, (kres) => {
    kres.on('data', (data) => {
      nodes += data;
    });

    kres.on('end', () => {
      res.status(200).json({ data: parseResponse(nodes) });
    });
  });

  kreq.on('error', (error) => {
    res.status(500).json({ error: error.message });
  });
}
