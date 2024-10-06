import { defaultK3sNodeMetric } from 'jsc-k3s-dashboard-common/src/models/kube/defaults';
import { K3sNodeMetric } from 'jsc-k3s-dashboard-common/src/models/kube/k3snode';
import { HttpOptions, NODE_METRICS_URL, ServerUrl } from '../api';
import { NodeMetricsResponse } from './K3sNodesResponse';

const parseNodeMetricsResponse = (
  nodeMetricsResponse: NodeMetricsResponse,
): K3sNodeMetric => {
  const nodeMetric: K3sNodeMetric = {
    metadata: {
      name: nodeMetricsResponse.metadata.name,
    },
    usage: {
      cpu: nodeMetricsResponse.usage.cpu,
      memory: nodeMetricsResponse.usage.memory,
    },
  };
  return nodeMetric;
};

export const getNodeMetrics = async (
  nodeName: string,
): Promise<K3sNodeMetric> => {
  const nodesUrl = `${ServerUrl}${NODE_METRICS_URL}/${nodeName}`;
  const noMetrics: K3sNodeMetric = defaultK3sNodeMetric;
  try {
    const response = await fetch(nodesUrl, HttpOptions);

    if (response.status === 200) {
      const jsonResponse: NodeMetricsResponse =
        (await response.json()) as NodeMetricsResponse;
      const data = parseNodeMetricsResponse(jsonResponse);
      return data;
    }
  } catch (error) {
    console.log('Error fetching node metrics:', (error as Error).message);
  }
  return noMetrics;
};
