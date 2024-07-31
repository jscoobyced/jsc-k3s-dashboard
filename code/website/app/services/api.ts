process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

export const NODES_URL = '/api/v1/nodes'
export const NODE_METRICS_URL = '/apis/metrics.k8s.io/v1beta1/nodes'
export const PODS_URL = '/api/v1/pods'

export const ServerUrl = process.env.SERVER_URL as string
const token = process.env.API_TOKEN as string
export const HttpOptions = {
  headers: { Authorization: `Bearer ${token}` },
}
