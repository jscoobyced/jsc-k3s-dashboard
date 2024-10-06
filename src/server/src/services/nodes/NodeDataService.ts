import {
  Capacity,
  K3sNode,
  K3sNodeMetric,
  NodeCondition,
} from 'jsc-k3s-dashboard-common/src/models/kube/k3snode';
import { rawUnit } from 'jsc-k3s-dashboard-common/src/services/format';
import { HttpOptions, NODES_URL, ServerUrl } from '../api';
import { K3sNodesResponse } from './K3sNodesResponse';
import { getNodeMetrics } from './NodeMetricsService';

const parseNodeResponse = async (
  nodeResponse: K3sNodesResponse,
): Promise<K3sNode[]> => {
  const nodes: K3sNode[] = [];
  for (const item of nodeResponse.items) {
    const capacity: Capacity = {
      cpu: item.status.capacity.cpu,
      memory: rawUnit(item.status.capacity.memory),
      storage: rawUnit(item.status.capacity['ephemeral-storage']),
      pods: item.status.capacity.pods,
    };
    const allocatable: Capacity = {
      cpu: item.status.allocatable.cpu,
      memory: rawUnit(item.status.allocatable.memory),
      storage: rawUnit(item.status.allocatable['ephemeral-storage']),
      pods: item.status.allocatable.pods,
    };
    const nodeConditions: NodeCondition[] = [];
    for (const condition of item.status.conditions) {
      const nodeCondition: NodeCondition = {
        type: condition.type,
        status: condition.status,
        message: condition.message,
      };
      nodeConditions.push(nodeCondition);
    }

    const nodeMetrics: K3sNodeMetric = await getNodeMetrics(item.metadata.name);

    const node: K3sNode = {
      nodeName: item.metadata.name,
      ipAddress: item.status.addresses[0].address,
      capacity,
      allocatable,
      conditions: nodeConditions,
      metrics: nodeMetrics,
    };
    nodes.push(node);
  }
  return nodes;
};

export const getNodesData = async (): Promise<K3sNode[]> => {
  const nodesUrl = `${ServerUrl}${NODES_URL}`;
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await fetch(nodesUrl, HttpOptions);

    if (response.status === 200) {
      const jsonResponse: K3sNodesResponse =
        (await response.json()) as K3sNodesResponse;
      const data = await parseNodeResponse(jsonResponse);
      return data;
    }
  } catch (error) {
    console.log('Error fetching node:', error, (error as Error).message);
  } finally {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
  }
  return [];
};
