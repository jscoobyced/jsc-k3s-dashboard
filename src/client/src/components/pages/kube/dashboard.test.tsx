import { render, screen } from '@testing-library/react';
import { defaultK3sNode } from 'jsc-k3s-dashboard-common/src/models/kube/defaults';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import * as getNodesData from '../../../services/pageContent';
import { nodesRoute } from '../../../services/routing/apiRoutes';
import Dashboard from './dashboard';

const server = setupServer(
  http.get(nodesRoute, () => {
    return HttpResponse.json([defaultK3sNode]);
  }),
);

describe('Dashboard', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  it('renders', async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Information about your cluster');
  });

  it('renders error message', async () => {
    vi.spyOn(getNodesData, 'getNodesData').mockImplementation(() => {
      throw new Error('Error message');
    });
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
    const errorMessage = await screen.findByText('Error message');
    expect(errorMessage).toBeInTheDocument();
  });
});
