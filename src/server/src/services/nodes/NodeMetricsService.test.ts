import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
} from '@jest/globals';
import { defaultK3sNodeMetric } from 'jsc-k3s-dashboard-common/src/models/kube/defaults';
import { K3sNodeMetric } from 'jsc-k3s-dashboard-common/src/models/kube/k3snode';
import { http, HttpResponse } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';
import { NODE_METRICS_URL, ServerUrl } from '../api';
import { getNodeMetrics } from './NodeMetricsService';

const nodeName = (defaultK3sNodeMetric).metadata.name;
const nodeUrl = `${ServerUrl}${NODE_METRICS_URL}/${nodeName}`;
const customK3sNodeMetric: K3sNodeMetric = {
  ...(defaultK3sNodeMetric),
  metadata: { name: 'custom-node' },
};

// eslint-disable-next-line
const server: SetupServerApi = setupServer(
   
  http.get(nodeUrl, () => {
     
    return HttpResponse.json(customK3sNodeMetric);
  }),
) as SetupServerApi;

describe('NodeMetricsService', () => {
  beforeAll(() => {
     
    server.listen();
  });
  afterEach(() => {
     
    server.resetHandlers();
  });
  afterAll(() => {
     
    server.close();
  });

  it('should return the correct K3sNodeMetric for getNodeMetrics', async () => {
    const nodeMetricsResponse = await getNodeMetrics(nodeName);
    expect(nodeMetricsResponse.metadata.name).toBe(
      customK3sNodeMetric.metadata.name,
    );
  });

  it('should return the default K3sNodeMetric on error', async () => {
     
    server.use(
       
      http.get(nodeUrl, () => {
         
        return HttpResponse.error();
      }),
    );
    const nodeMetricsResponse = await getNodeMetrics(nodeName);
    expect(nodeMetricsResponse.metadata.name).toBe(nodeName);
  });

  it('should return the default K3sNodeMetric on non HTTP 200 response', async () => {
     
    server.use(
       
      http.get(nodeUrl, () => {
         
        return HttpResponse.json({ error: 'Not Authorized' }, { status: 401 });
      }),
    );
    const nodeMetricsResponse = await getNodeMetrics(nodeName);
    expect(nodeMetricsResponse.metadata.name).toBe(nodeName);
  });
});
