import { K3sPod } from '../../models/pods/k3spod'
import { HttpOptions, PODS_URL, ServerUrl } from '../api'
import { K3sPodResponse } from './K3sPodResponse'

const parsePodResponse = async (
  podResponse: K3sPodResponse
): Promise<K3sPod[]> => {
  if (!podResponse.items) return []
  const pods: K3sPod[] = []
  for (const item of podResponse.items) {
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
        containers: item.spec.containers,
      },
      status: {
        phase: item.status.phase,
        startTime: item.status.startTime,
      },
    }
    pods.push(pod)
  }
  return pods
}

export const getPodsData = async (): Promise<K3sPod[]> => {
  const podsUrl = `${ServerUrl}${PODS_URL}`

  return fetch(podsUrl, HttpOptions).then((response) => {
    if (response.status === 200) {
      return response.json().then((json) => {
        return parsePodResponse(json).then((data) => {
          return data
        })
      })
    } else {
      return []
    }
  })
}
