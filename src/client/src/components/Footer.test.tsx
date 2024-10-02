import { render, screen, waitFor } from '@testing-library/react';
import { defaultCommonPageData } from 'jsc-k3s-dashboard-common/src/models/home/defaults';
import { MemoryRouter } from 'react-router-dom';
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
