import {
  defaultCommonPageData,
  defaultHomePageData,
} from 'jsc-k3s-dashboard-common/src/models/home/defaults';
import { defaultK3sNode } from 'jsc-k3s-dashboard-common/src/models/kube/defaults';
import { K3sNode } from 'jsc-k3s-dashboard-common/src/models/kube/k3snode';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
  getCommonPageData,
  getHomePageData,
  getNodesData,
} from './pageContent';
import {
  commonRoute,
  homeRoute,
  nodesRoute,
  pageRoutes,
} from './routing/apiRoutes';

const expectedData = {
  id: 1,
  name: 'test',
};

const server = setupServer(
  http.get(`${pageRoutes}/${homeRoute}`, () => {
    return HttpResponse.json(expectedData);
  }),
  http.get(`${pageRoutes}/${commonRoute}`, () => {
    return HttpResponse.json(expectedData);
  }),
);

describe('pageContent', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  it('fetches getHomePageData', async () => {
    const data = await getHomePageData();
    expect(data).toEqual(expectedData);
  });

  it('fetches default getHomePageData when error', async () => {
    server.use(
      http.get(`${pageRoutes}/${homeRoute}`, () => {
        return HttpResponse.json({}, { status: 500 });
      }),
    );
    const data = await getHomePageData();
    expect(data).toEqual(defaultHomePageData);
  });

  it('fetches default getCommonPageData when error', async () => {
    server.use(
      http.get(`${pageRoutes}/${commonRoute}`, () => {
        return HttpResponse.json({}, { status: 500 });
      }),
    );
    const data = await getCommonPageData();
    expect(data).toEqual(defaultCommonPageData);
  });

  it('fetches default nodes data when error', async () => {
    server.use(
      http.get(`${pageRoutes}/${nodesRoute}`, () => {
        return HttpResponse.json({}, { status: 500 });
      }),
    );
    const data = await getNodesData();
    const defaultNode: K3sNode = {
      ...defaultK3sNode,
      nodeName: 'Default Node',
    };
    expect(data).toEqual([defaultNode]);
  });
});
