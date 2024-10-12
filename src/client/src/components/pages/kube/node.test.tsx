import { render, screen } from '@testing-library/react';
import { defaultK3sPod } from 'jsc-k3s-dashboard-common/src/models/kube/defaults';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import * as getPodsByNodeName from '../../../services/pageContent';
import { podsRoute } from '../../../services/routing/apiRoutes';
import Nodes from './node';

const nodeName = 'test';
const testRoute = `/${podsRoute}/${nodeName}`;
const server = setupServer(
  http.get(testRoute, () => {
    return HttpResponse.json([defaultK3sPod]);
  }),
);

describe('Node', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  it('renders when no nodename', async () => {
    render(
      <MemoryRouter>
        <Nodes />
      </MemoryRouter>,
    );
    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Information about node');
    const table = await screen.findByRole('table', {
      description: 'Pods list',
    });
    expect(table.childElementCount).toBe(3);
  });

  it('renders with nodename', async () => {
    render(
      <MemoryRouter initialEntries={[`/node/${nodeName}`]}>
        <Routes>
          <Route path="/node/:nodeName" element={<Nodes />} />
        </Routes>
      </MemoryRouter>,
    );
    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(`Information about ${nodeName} node`);
    const table = await screen.findByRole('table', {
      description: 'Pods list',
    });
    expect(table.childElementCount).toBe(3);
  });

  it('renders error message', async () => {
    vi.spyOn(getPodsByNodeName, 'getPodsByNodeName').mockImplementation(() => {
      throw new Error('Error message');
    });
    render(
      <MemoryRouter initialEntries={['/node/test']}>
        <Routes>
          <Route path="/node/:nodeName" element={<Nodes />} />
        </Routes>
      </MemoryRouter>,
    );
    const errorMessage = await screen.findByText('Error message');
    expect(errorMessage).toBeInTheDocument();
  });
});
