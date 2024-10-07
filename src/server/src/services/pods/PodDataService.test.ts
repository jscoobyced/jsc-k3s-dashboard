import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
} from '@jest/globals';
import { defaultK3sPod } from 'jsc-k3s-dashboard-common/src/models/kube/defaults';
import { http, HttpResponse } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';
import { PODS_URL, ServerUrl } from '../api';
import { defaultK3sPodResponse } from './K3sPodResponse';
import { getPodsDataByNodeName } from './PodDataService';

const podUrl = `${ServerUrl}${PODS_URL}`;

// eslint-disable-next-line
const server: SetupServerApi = setupServer(
  http.get(podUrl, () => {
    return HttpResponse.json(defaultK3sPodResponse);
  }),
) as SetupServerApi;

describe('PodDataService', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  it('should fetch pod data', async () => {
    const response = await getPodsDataByNodeName(defaultK3sPod.spec.nodeName);
    expect(response).toEqual([defaultK3sPod]);
  });

  it('should return empty array if fetch fails', async () => {
    server.use(
      http.get(podUrl, () => {
        return HttpResponse.error();
      }),
    );

    const response = await getPodsDataByNodeName(defaultK3sPod.spec.nodeName);
    expect(response).toEqual([]);
  });

  it('should return the default K3sNodeMetric on non HTTP 200 response', async () => {
    server.use(
      http.get(podUrl, () => {
        return HttpResponse.json({ error: 'Not Authorized' }, { status: 401 });
      }),
    );
    const response = await getPodsDataByNodeName(defaultK3sPod.spec.nodeName);
    expect(response).toEqual([]);
  });
});
