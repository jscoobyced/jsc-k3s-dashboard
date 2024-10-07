import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { defaultK3sNode } from 'jsc-k3s-dashboard-common/src/models/kube/defaults';
import { http, HttpResponse } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';
import { NODES_URL, ServerUrl } from '../api';
import { defaultK3sNodeResponse } from './K3sNodesResponse';
import { getNodesData } from './NodeDataService';

const nodeUrl = `${ServerUrl}${NODES_URL}`;

// eslint-disable-next-line
const server: SetupServerApi = setupServer(
  http.get(nodeUrl, () => {
    return HttpResponse.json(defaultK3sNodeResponse);
  }),
) as SetupServerApi;

jest.mock('./NodeMetricsService', () => ({
  getNodeMetrics: jest.fn().mockReturnValue(defaultK3sNode.metrics),
}));

describe('NodeDataService', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  it('should return the correct K3sNode for getNodesData', async () => {
    const nodeResponse = await getNodesData();
    expect(nodeResponse).toStrictEqual([defaultK3sNode]);
  });

  it('should return the default K3sNode on error', async () => {
    server.use(
      http.get(nodeUrl, () => {
        return HttpResponse.error();
      }),
    );
    const nodeResponse = await getNodesData();
    expect(nodeResponse).toStrictEqual([]);
  });

  it('should return the default K3sNode on non HTTP 200 response', async () => {
    server.use(
      http.get(nodeUrl, () => {
        return HttpResponse.json({ error: 'Not Authorized' }, { status: 401 });
      }),
    );
    const nodeResponse = await getNodesData();
    expect(nodeResponse).toStrictEqual([]);
  });
});
