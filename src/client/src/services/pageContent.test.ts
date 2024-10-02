import {
  defaultCommonPageData,
  defaultHomePageData,
} from 'jsc-k3s-dashboard-common/src/models/home/defaults';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { getCommonPageData, getHomePageData } from './pageContent';
import { commonRoute, homeRoute, pageRoutes } from './routing/apiRoutes';

const expectedData = {
  id: 1,
  name: 'test',
};

console.log(`${pageRoutes}/${homeRoute}`);
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
});
