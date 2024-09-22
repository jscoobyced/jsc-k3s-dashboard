import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Info from './info';

describe('Info', () => {
  it('renders', () => {
    render(
      <MemoryRouter>
        <Info />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Information',
    );
  });
});
