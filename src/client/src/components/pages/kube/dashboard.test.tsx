import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import * as getNodesData from '../../../services/kube/NodeService';
import Dashboard from './dashboard';

describe('Dashboard', () => {
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
