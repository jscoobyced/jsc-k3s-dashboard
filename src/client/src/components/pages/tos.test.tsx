import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TermOfUse from './tos';

describe('Info', () => {
  it('renders', () => {
    render(
      <MemoryRouter>
        <TermOfUse />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Terms and conditions for',
    );
  });
});
