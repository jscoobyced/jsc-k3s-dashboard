import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from './Menu';

describe('Menu', () => {
  it('renders default menu', () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>,
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('navigation').childElementCount).toBe(1);
    expect(screen.getByRole('navigation').children[0].childElementCount).toBe(
      3,
    );
  });
});
