import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { defaultCommonPageData } from '../models/pages/home';
import Footer from './Footer';

describe('Footer', () => {
  it('renders default footer', async () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByRole('contentinfo')).toHaveTextContent(
        defaultCommonPageData.siteName,
      );
      expect(screen.getByRole('contentinfo')).toHaveTextContent(
        defaultCommonPageData.year.toString(),
      );
      expect(screen.getByRole('contentinfo')).toHaveTextContent(
        defaultCommonPageData.version,
      );
    });
  });
});
