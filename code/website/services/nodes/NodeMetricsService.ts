import { K3sNodeMetric } from '../../models/nodes/k3snode';
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
  const noMetrics = {
    metadata: { name: 'No Metrics' },
    usage: { cpu: '0', memory: '0' },
  };
  return fetch(nodesUrl, HttpOptions)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          const data = parseNodeMetricsResponse(json);
          return data;
        });
      } else {
        console.log(response.status, response.statusText);
        return noMetrics;
      }
    })
    .catch((error) => {
      console.log(error);
      return noMetrics;
    });
};
