import { render, screen, waitFor } from '@testing-library/react';
import {
  defaultCommonPageData,
  defaultHomePageData,
} from 'jsc-k3s-dashboard-common/src/models/pages/home';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';
import {
  commonRoute,
  homeRoute,
  pageRoutes,
} from './services/routing/apiRoutes';

const server = setupServer(
  http.get(`${pageRoutes}/${homeRoute}`, () => {
    return HttpResponse.json(defaultHomePageData);
  }),
  http.get(`${pageRoutes}/${commonRoute}`, () => {
    return HttpResponse.json(defaultCommonPageData);
  }),
);

describe('App', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  it('renders default view', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        defaultHomePageData.title,
      );
    });
  });

  it('renders default view on error', async () => {
    server.use(
      http.get(`${pageRoutes}/${homeRoute}`, () => {
        return HttpResponse.error();
      }),
    );
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('');
    });
  });
});
