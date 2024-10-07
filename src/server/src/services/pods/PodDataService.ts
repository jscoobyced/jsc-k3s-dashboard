import {
  K3sPod,
  K3sPodContainer,
} from 'jsc-k3s-dashboard-common/src/models/kube/k3spod';
import { HttpOptions, PODS_URL, ServerUrl } from '../api';
import { K3sPodResponse } from './K3sPodResponse';

const parsePodResponse = (podResponse: K3sPodResponse): K3sPod[] => {
  const pods: K3sPod[] = [];
  for (const item of podResponse.items) {
    const containers: K3sPodContainer[] = item.spec.containers.map(
      (container) => {
        return {
          name: container.name,
          image: container.image,
        };
      },
    );
    const pod: K3sPod = {
      metadata: {
        name: item.metadata.name,
        namespace: item.metadata.namespace,
        creationTimestamp: item.metadata.creationTimestamp,
        labels: {
          app: item.metadata.labels.app,
          tier: item.metadata.labels.tier,
        },
      },
      spec: {
        nodeName: item.spec.nodeName,
        containers,
      },
      status: {
        phase: item.status.phase,
        startTime: item.status.startTime,
      },
    };
    pods.push(pod);
  }
  return pods;
};

export const getPodsDataByNodeName = async (
  nodeName: string,
): Promise<K3sPod[]> => {
  const podsUrl = `${ServerUrl}${PODS_URL}`;
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await fetch(podsUrl, HttpOptions);

    if (response.status === 200) {
      const jsonResponse: K3sPodResponse =
        (await response.json()) as K3sPodResponse;
      const podData = parsePodResponse(jsonResponse);
      const pods = podData.filter((pod) => pod.spec.nodeName === nodeName);
      return pods;
    }
  } catch (error) {
    console.log('Error fetching node:', (error as Error).message);
  } finally {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
  }
  return [];
};
