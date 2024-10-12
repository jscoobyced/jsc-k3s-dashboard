import { render, screen } from '@testing-library/react';
import { defaultHomePageData } from 'jsc-k3s-dashboard-common/src/models/home/defaults';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import * as getHomePageData from '../../services/pageContent';
import { homeRoute } from '../../services/routing/apiRoutes';

import { vi } from 'vitest';
import Home from './home';

const server = setupServer(
  http.get(homeRoute, () => {
    return HttpResponse.json(defaultHomePageData);
  }),
);

describe('Home', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  it('render home page', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Welcome to localhost');
  });

  it('render home page when error', async () => {
    vi.spyOn(getHomePageData, 'getHomePageData').mockImplementation(() => {
      throw new Error('Error message');
    });
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const heading = await screen.findByRole('heading', { level: 1 });
    console.log(heading.textContent);
    expect(heading).toHaveTextContent('Welcome to localhost');
  });
});
