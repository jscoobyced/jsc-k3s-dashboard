import dotenv from 'dotenv';
import { getFromProcess } from 'jsc-k3s-dashboard-common/src/services/process';
export const NODES_URL = '/api/v1/nodes';
export const NODE_METRICS_URL = '/apis/metrics.k8s.io/v1beta1/nodes';
export const PODS_URL = '/api/v1/pods';

dotenv.config();

export const ServerUrl = getFromProcess('SERVER_URL', 'http://localhost');

const token = getFromProcess('API_TOKEN', 'DUMMY TOKEN');

export const HttpOptions = {
  method: 'GET',
  'Content-type': 'application/json',
  headers: { Authorization: `Bearer ${token}` },
};
